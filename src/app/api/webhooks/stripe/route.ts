import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// In Stripe SDK v20, current_period_end moved from Subscription to
// SubscriptionItem. This helper returns the ISO string from the first item.
function periodEndFromSub(subscription: Stripe.Subscription): string | null {
  const ts = subscription.items.data[0]?.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`❌ Webhook signature error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`✉️ Stripe webhook: ${event.type}`);

  // ── 1. CHECKOUT COMPLETED → grant Pro ──────────────────────────────────────
  // Fired once when a customer successfully subscribes for the first time.
  // We fetch the subscription to get current_period_end for pro_expires_at.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string | null;

    if (!userId) {
      console.error('❌ checkout.session.completed missing client_reference_id');
      return NextResponse.json({ received: true });
    }

    let periodEnd: string | null = null;
    if (subscriptionId) {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      periodEnd = periodEndFromSub(sub);
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        is_pro: true,
        stripe_customer_id: customerId,
        pro_source: 'stripe',
        pro_expires_at: periodEnd,
        subscription_status: 'active',
      })
      .eq('id', userId);

    if (error) console.error('❌ Supabase update error (checkout.session.completed):', error);
    else console.log(`🎉 User ${userId} upgraded to Pro (expires ${periodEnd})`);
  }

  // ── 2. SUBSCRIPTION UPDATED ─────────────────────────────────────────────────
  // Fired on every subscription change: renewal, cancellation intent, plan change.
  //
  // KEY FIX: cancel_at_period_end=true means the user CANCELLED but is still
  // within their paid period. We set subscription_status='canceled' and record
  // the expiry, but is_pro stays TRUE — Pro is only revoked on subscription.deleted.
  // Pro is also kept (with status='past_due') when payment fails, so the user
  // isn't punished while Stripe retries.
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const periodEnd = periodEndFromSub(subscription);

    console.log(`🔍 subscription.updated — status: ${subscription.status}, cancel_at_period_end: ${subscription.cancel_at_period_end}`);

    let isPro: boolean;
    let subscriptionStatus: string;

    if (subscription.status === 'active' && !subscription.cancel_at_period_end) {
      isPro = true;
      subscriptionStatus = 'active';
    } else if (subscription.status === 'active' && subscription.cancel_at_period_end) {
      // Cancelled but still in paid period — keep Pro access
      isPro = true;
      subscriptionStatus = 'canceled';
    } else if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
      // Payment failed — keep Pro while Stripe retries, surface a warning in UI
      isPro = true;
      subscriptionStatus = 'past_due';
    } else {
      // Any other terminal status — revoke
      isPro = false;
      subscriptionStatus = 'expired';
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        is_pro: isPro,
        pro_source: 'stripe',
        pro_expires_at: periodEnd,
        subscription_status: subscriptionStatus,
      })
      .eq('stripe_customer_id', customerId);

    if (error) console.error('❌ Supabase update error (subscription.updated):', error);
    else console.log(`✅ Profile updated — is_pro: ${isPro}, status: ${subscriptionStatus}, expires: ${periodEnd}`);
  }

  // ── 3. SUBSCRIPTION DELETED ─────────────────────────────────────────────────
  // Fired when the paid period actually ends after cancellation, or when
  // immediately deleted. This is the ONLY place is_pro is set to false.
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;
    const periodEnd = periodEndFromSub(subscription);

    console.log(`📉 subscription.deleted for customer ${customerId}`);

    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        is_pro: false,
        pro_expires_at: periodEnd,
        subscription_status: 'expired',
      })
      .eq('stripe_customer_id', customerId);

    if (error) console.error('❌ Supabase update error (subscription.deleted):', error);
    else console.log(`✅ Pro revoked for customer ${customerId}`);
  }

  // ── 4. INVOICE PAID → keep pro_expires_at fresh on each renewal ─────────────
  // Fires after every successful recurring payment, including the first one.
  // Updates pro_expires_at so the About page always shows the correct renewal date.
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    const subscriptionId = invoice.parent?.subscription_details?.subscription as string | null | undefined;

    if (subscriptionId) {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      const periodEnd = periodEndFromSub(sub);

      // Respect cancel_at_period_end: user cancelled but is still in paid period.
      // Do not flip subscription_status back to 'active' or revoke early.
      const isCancelAtPeriodEnd = sub.cancel_at_period_end === true
      const subscriptionStatus =
        sub.status === 'active' && isCancelAtPeriodEnd ? 'canceled' : 'active'
      const isPro =
        sub.status === 'active' ||
        sub.status === 'past_due' ||
        sub.status === 'unpaid'

      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_pro: isPro,
          pro_source: 'stripe',
          pro_expires_at: periodEnd,
          subscription_status: subscriptionStatus,
        })
        .eq('stripe_customer_id', customerId);

      if (error) console.error('❌ Supabase update error (invoice.paid):', error);
      else console.log(`🔄 Renewal confirmed for customer ${customerId}, expires ${periodEnd}, status: ${subscriptionStatus}`);
    }
  }

  return NextResponse.json({ received: true });
}
