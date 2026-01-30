import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`✉️ Webhook received: ${event.type}`);

  // 1. HANDLE SUCCESSFUL PAYMENT
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    const customerId = session.customer as string;

    if (userId) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ is_pro: true, stripe_customer_id: customerId })
        .eq('id', userId);

      if (error) console.error('❌ Supabase Update Error:', error);
      else console.log('🎉 User profile updated to PRO');
    }
  }

  // 2. HANDLE CANCELLATION OR DOWNGRADE
  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // DEBUG LOGS - These will appear in your terminal
    console.log(`🔍 Event Type: ${event.type}`);
    console.log(`🔍 Cancel at period end: ${subscription.cancel_at_period_end}`);
    console.log(`🔍 Subscription Status: ${subscription.status}`);

    if (event.type === 'customer.subscription.deleted' || subscription.cancel_at_period_end === true) {
      console.log(`📉 MATCH FOUND: Downgrading ${customerId}`);

      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ is_pro: false })
        .eq('stripe_customer_id', customerId);

      if (error) {
        console.error('❌ Supabase Error:', error);
      } else {
        console.log('✅ Success: Badge should return now.');
      }
    } else {
      console.log('ℹ️ Update received, but not a cancellation yet.');
    }
  }

  return NextResponse.json({ received: true });
}