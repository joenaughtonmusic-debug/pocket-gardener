This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: node_modules, .next, dist, build, .env, .env.local, package-lock.json
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
public/
  favicon.ico
  file.svg
  globe.svg
  icon.png
  manifest.json
  next.svg
  pglogo.png
  vercel.svg
  window.svg
src/
  app/
    about/
      page.tsx
    api/
      checkout/
        route.ts
      identify/
        route.ts
      portal/
        route.ts
      render-garden/
        route.ts
      webhooks/
        stripe/
          route.ts
    auth/
      auth-error/
        page.tsx
      callback/
        route.ts
    calendar/
      page.tsx
    dashboard/
      page.tsx
    diary/
      page.tsx
    error/
      page.tsx
    feature/
      page.tsx
    guides/
      feeding/
        page.tsx
      pests/
        page.tsx
      planting/
        page.tsx
      tools/
        page.tsx
      weeds/
        page.tsx
      page.tsx
    identify/
      page.tsx
    lib/
      stripe.ts
      supabaseClient.ts
    login/
      page.tsx
    match/
      page.tsx
    plants/
      [id]/
        page.tsx
      actions.ts
      page.tsx
    success/
      page.tsx
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  components/
    Diary/
      PhotoUploader.tsx
      TaskBadge.tsx
    AddPlantButton.tsx
    GoogleSignIn.tsx
    Navigation.tsx
    PageHelp.tsx
    PlantThumbnail.tsx
    QuickAddButton.tsx
    UpgradeButton.tsx
    WelcomeOverlay.tsx
  proxy.ts
  supabaseServer.ts
.gitignore
capacitor.config.ts
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
repomix-output.xml
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="src/app/api/portal/route.ts">
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name) { return cookieStore.get(name)?.value } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get the stripe_customer_id we just saved!
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Create a portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
</file>

<file path="src/app/api/render-garden/route.ts">
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // Cast to string to fix TS error
});

export async function POST(req: Request) {
  try {
    const { plantList, zoneDetails } = await req.json();

    // We added "Botanical" and "Horticultural" to keep the safety filter happy
   const prompt = `A very simple 2D garden.
    Perspective: Bird's-eye view looking straight down.
    Components: One central rectangle lawn and three simple perimeter garden beds.
    Contents: The garden beds contain basic plant symbols representing: ${plantList}.
    Style: Basic landscape 2D drawing/ planting plan in colour. Please only use the plants from the ${plantList}. 
    Visual Type: It must look like a simple, clean diagram for a landscaping hobbyist.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });

    // Added safety check to fix 'response.data is possibly undefined' error
    if (response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      return NextResponse.json({ url: imageUrl });
    } else {
      throw new Error("OpenAI returned an empty image data array.");
    }

  } catch (error: any) {
    console.error("DALL-E Error:", error);
    // Provide a more descriptive error message back to your frontend
    return NextResponse.json(
      { error: error.message || "Failed to generate render" }, 
      { status: 500 }
    );
  }
}
</file>

<file path="src/app/api/webhooks/stripe/route.ts">
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
</file>

<file path="src/app/auth/auth-error/page.tsx">
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-[#eef7f2] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Login Issue</h1>
        <p className="text-gray-600 mb-6">
          The link might have expired or was already used. Magic links only work once!
        </p>
        <Link href="/login" className="bg-[#2d5a3f] text-white px-8 py-3 rounded-full font-bold">
          Try Again
        </Link>
      </div>
    </main>
  );
}
</file>

<file path="src/app/diary/page.tsx">
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ClipboardList, Scissors, Droplets, Save, RotateCcw, ChevronDown, Calendar } from 'lucide-react'
import Navigation from '../../components/Navigation'

// Pre-defined tasks for the "Shelf"
const TASK_LIBRARY = [
  { id: 'trim', label: 'Trimmed Hedges', icon: <Scissors size={14}/> },
  { id: 'water', label: 'Watered', icon: <Droplets size={14}/> },
  { id: 'mow', label: 'Mowed Lawn', icon: '🚜' },
  { id: 'feed', label: 'Fertilized', icon: '🌿' },
]

function LeafConfetti() {
  return (
    <div className="absolute top-1/2 left-0 pointer-events-none z-50">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1], x: -40 - Math.random() * 80, y: -20 + Math.random() * 60, rotate: Math.random() * 360 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: "easeOut" }}
          className="absolute text-[20px] filter drop-shadow-sm"
        >
          🍃
        </motion.span>
      ))}
    </div>
  )
}

export default function GardenDiary() {
  const [activeTasks, setActiveTasks] = useState<any[]>([])
  const [dailyArchives, setDailyArchives] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  // Fix hydration by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const addToPad = (task: any) => {
    const uniqueId = `${task.id}-${Math.random().toString(36).substr(2, 9)}`;
    setActiveTasks(prev => [...prev, { ...task, id: uniqueId, status: 'ready' }]);
  }

  const completeTask = (taskId: string) => {
    setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'animating' } : t));
    setTimeout(() => {
        setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    }, 2500); 
  }

  const resetToday = () => {
    if (confirm("Clear today's work? This cannot be undone.")) {
      setActiveTasks([]);
    }
  }

  const saveDay = () => {
    if (activeTasks.length === 0) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'short' }),
      tasks: activeTasks.filter(t => t.status === 'completed')
    };

    setDailyArchives(prev => [newEntry, ...prev]);
    setActiveTasks([]);
  }

  // Don't render the dynamic parts until mounted to prevent hydration errors
  const currentDateLabel = mounted ? new Date().toLocaleDateString() : ""

  return (
    <main className="min-h-screen bg-[#f0f4f1] p-4 pb-40 text-gray-900 flex flex-col">
      <header className="mb-6 pt-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">Diary Pad</h1>
          <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1 min-h-[1em]">
            {mounted && `Session: ${currentDateLabel}`}
          </p>
        </div>
        <div className="flex gap-2">
            <button onClick={resetToday} className="p-2 bg-white rounded-full shadow-sm text-red-400 border border-red-50 active:scale-90 transition-transform"><RotateCcw size={18} /></button>
            <button onClick={saveDay} className="p-2 bg-green-600 rounded-full shadow-md text-white active:scale-90 transition-transform"><Save size={18} /></button>
        </div>
      </header>

      <div className="flex gap-4 flex-1">
        <aside className="w-20 flex flex-col gap-3">
          {TASK_LIBRARY.map((task) => (
            <button key={task.id} onClick={() => addToPad(task)} className="bg-white border-2 border-white shadow-sm rounded-2xl p-3 flex flex-col items-center gap-1 active:scale-90 transition-all">
              <span className="text-green-700">{task.icon}</span>
              <span className="text-[7px] font-black uppercase text-center">{task.label}</span>
            </button>
          ))}
        </aside>

        <section className="flex-grow bg-white rounded-[2.5rem] shadow-2xl border-b-8 border-gray-200 p-6 relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <ClipboardList size={16} className="text-green-800" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-800">Today's Work</span>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto">
            <AnimatePresence mode='popLayout'>
              {activeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="relative p-4 rounded-3xl bg-green-50/50 border border-green-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black uppercase ${task.status === 'completed' ? 'text-green-500 line-through' : 'text-green-950'}`}>
                      {task.label}
                    </span>
                    <button 
                        disabled={task.status !== 'ready'}
                        onClick={() => completeTask(task.id)}
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-green-500 border-green-500' : task.status === 'animating' ? 'bg-green-200 border-green-200' : 'bg-white border-gray-200'}`}
                    >
                        {task.status === 'completed' ? <Check size={16} className="text-white" strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                    </button>
                  </div>

                  {task.status === 'animating' && (
                    <div className="relative h-24 mt-2 bg-white rounded-2xl overflow-hidden border border-green-50">
                        <div className="absolute bottom-1 left-0 w-full h-12 z-10 opacity-80" style={{ backgroundImage: 'url("https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/1000_F_202501258_LXa3HAvoZDKfsyZsu4AYML3ltk6QJNuU.jpg")', backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'bottom'}} />
                        <motion.div initial={{ left: "-30%" }} animate={{ left: "110%", rotate: [1, -1, 1] }} transition={{ left: { duration: 2.2, ease: "linear" }, rotate: { repeat: Infinity, duration: 0.1 } }} className="absolute bottom-0 w-24 h-24 z-40 flex items-center justify-center">
                            <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/trimmer%20v2.png" alt="Trimmer" className="w-full h-full object-contain" />
                            <LeafConfetti />
                        </motion.div>
                        <motion.div initial={{ width: 0 }} animate={{ width: "105%" }} transition={{ duration: 2.2, ease: "linear" }} className="absolute bottom-1 left-0 h-12 bg-white/40 z-20 mix-blend-overlay" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6">
             <p className="text-[9px] font-black uppercase text-gray-400 mb-2 border-t pt-4 border-dashed">Past Entries</p>
             <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {dailyArchives.map((day) => (
                  <details key={day.id} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                    <summary className="list-none p-3 flex justify-between items-center cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-green-800" />
                        <span className="text-[10px] font-black uppercase text-green-900">{day.date}</span>
                      </div>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
                    </summary>
                    <div className="p-3 pt-0 space-y-1">
                      {day.tasks.map((t: any) => (
                        <div key={t.id} className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-2">
                           <div className="w-1 h-1 bg-green-400 rounded-full" /> {t.label}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
             </div>
          </div>
        </section>
      </div>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/error/page.tsx">
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">⚠️</span>
        </div>

        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2 block">
          Transaction Interrupted
        </span>
        
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">
          Something went wrong
        </h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed px-4">
          We couldn't process your payment. No charges were made to your card. Please try again or contact support if the issue persists.
        </p>

        <div className="pt-2">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-5 rounded-[1.5rem] shadow-xl shadow-green-900/20 active:scale-95 transition-all text-[11px]"
          >
            Back to Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Pocket Gardener • Auckland
        </p>
      </div>
    </main>
  );
}
</file>

<file path="src/app/guides/pests/page.tsx">
'use client'
import { useState } from "react";
import Navigation from "../../../components/Navigation";
import Link from "next/link";

const pestList = [
  { name: "Aphids", note: "Small sap suckers on buds/new leaves. Spray with Plant Soap and Neem oil.", type: "Insect", solution: "Plant Soap + Neem" },
  { name: "Black Spot", note: "Common fungal disease, especially on Roses. Dark brown/black spots.", type: "Fungal", solution: "Yates Super Shield + Thrive" },
  { name: "Camellia Flower Blight", note: "Remove diseased blooms. Apply fresh mulch in spring to stop spore spread.", type: "Fungal", solution: "Fungicidal Soil Drench" },
  { name: "Caterpillars", note: "Look for holes in middle of leaves. Pick off by hand or use specialized spray.", type: "Insect", solution: "Manual removal / Kiwicare" },
  { name: "Citrus Scab", note: "Rough, scabby growth on fruit and leaves. Common in Auckland humid weather.", type: "Fungal", solution: "Copper Spray" },
  { name: "Mealybug", note: "White cotton-like clusters. Look for 'Sooty Mould' as a sign they are present.", type: "Insect", solution: "Neem + Plant Soap" },
  { name: "Mildew", note: "White powdery coating on leaves. Often caused by poor air circulation.", type: "Fungal", solution: "Fungicide / Improve airflow" },
  { name: "Mites (Spider Mites)", note: "Tiny pests causing yellowing/mottled leaves. Loves hot, dry spots.", type: "Insect", solution: "Mite-specific spray" },
  { name: "Scale Insects", note: "Tiny sap suckers with protective shells. Often found on stems.", type: "Insect", solution: "Horticultural Oil / Neem" },
  { name: "Slugs & Snails", note: "Eats leaves from outer edge in. Loves Ligularia and Hibiscus.", type: "Pest", solution: "Snail Pellets / Quash" },
  { name: "Sooty Mould", note: "Black 'soot' on leaves. Actually a fungus growing on pest 'honeydew'.", type: "Fungal", solution: "Kill the insects first!" },
  { name: "Thrips", note: "Causes silvering of leaves with black dots. Common on Ficus and Rhododendrons.", type: "Insect", solution: "Imidacloprid (Bad) or Neem (Mild)" },
  { name: "Whitefly", note: "Tiny white flying insects. Can be very damaging. Look under leaves.", type: "Insect", solution: "Neem + Plant Soap" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function PestsDetail() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Pests & Diseases</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Diagnosis & Cures</p>
      </header>

      <div className="grid gap-3">
        {pestList.map((pest) => (
          <div key={pest.name} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{pest.name}</h3>
                <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase ${pest.type === 'Fungal' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                  {pest.type}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight mb-3 italic">{pest.note}</p>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider border border-green-100">
                  ✔ {pest.solution}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/planting/page.tsx">
'use client'
import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Search, Shovel, Droplets, 
  Wind, ShieldCheck, AlertTriangle, CheckCircle2, XCircle,
  ThermometerSun, Sprout, Car, ArrowLeft 
} from 'lucide-react';

export default function PlantingGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 bg-white font-sans text-slate-900">
      
      {/* NAVIGATION - BACK TO GUIDES */}
      <nav className="mb-8">
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Guides</span>
        </Link>
      </nav>

      {/* HEADER */}
      <header className="mb-12 border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
          Auckland Planting Guide
        </h1>
        <p className="text-slate-600 font-bold leading-relaxed max-w-2xl">
          Before you plant, make sure to get the right plants for your area. For site-specific selection (sun, soil, drainage), use the Plant Match Maker. This guide focuses on what to do once you’ve chosen your plants.
        </p>
      </header>

      <div className="space-y-16">
        
        {/* SECTION 1: SOURCING & HEALTH */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">1</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Sourcing Healthy Plants</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] flex flex-col">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><ShoppingBag size={14}/> Reputable Nurseries</h3>
              <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">Look for nurseries that grow locally, keep stock well-watered, and space plants properly. Avoid plants that have been sitting dry or crowded.</p>
              
              <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200 mb-4 flex items-start gap-3">
                <Car className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] font-black text-amber-800 uppercase tracking-tight leading-snug">
                  Bonus Tip: Ensure plants are in a covered vehicle or trailer if travelling back via a motorway to prevent wind-burn.
                </p>
              </div>

              <div className="mt-auto bg-white p-4 rounded-2xl border border-slate-100 text-[11px] font-bold text-green-700 uppercase tracking-tight">
                Once home, plant as soon as possible. Keep them watered and out of hot sun/wind until they are in the ground.
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem]">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Search size={14}/> Quality Check</h3>
              <div className="flex gap-4">
                <div className="space-y-3 flex-1">
                  <p className="text-[11px] font-bold uppercase text-slate-400">✅ Look For:</p>
                  <p className="text-xs font-bold leading-relaxed">New growth, especially healthy new growth is a great sign (new growth usually has a lighter colour leaf compared to the rest of the plant).</p>
                  <img 
                    src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20growth%20image.png" 
                    alt="New growth diagram" 
                    className="rounded-xl border border-slate-200 w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <p className="text-[11px] font-bold uppercase text-slate-400">❌ Avoid:</p>
                <p className="text-xs font-bold leading-relaxed text-red-700">Yellow/brown leaves, black spots, wilted growth, pests, mushy soil, or broken stems.</p>
                <p className="text-[11px] font-bold uppercase text-slate-400 mt-4">🧪 Roots:</p>
                <p className="text-xs font-bold leading-relaxed">Should be light colored. Avoid heavily root-bound plants where roots wrap tightly around the pot.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE PREP */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">2</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Before You Dig</h2>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
            <p className="text-sm font-bold leading-relaxed text-slate-600">
              Check for underground services (water, power, gas, irrigation). Ensure you are planting in the right position for sun and space—refer back to the Plant Match Maker for spacing rules.
            </p>
            <div className="border-l-4 border-amber-400 pl-6 py-2">
                <h4 className="font-black uppercase text-xs mb-2">The Auckland Clay/Drainage Test</h4>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    If you have heavy clay, fill your hole with water. If it hasn't drained after 1–2 hours, you must improve drainage or plant slightly higher than the ground level. Remember that clay soil has it's benefits (it holds nutrients and moisture), just make sure to add garden mix (organic matter) and it will improve over time!
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: PLANTING PROCESS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">3</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">The Planting Process</h2>
          </div>

          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Shovel size={14}/> 1. Digging & Root Prep</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Dig the hole the same depth as the root ball and slightly wider. Loosen the soil at the bottom of the hole to help the roots establish. 
                            <br/><br/>
                            <strong>If root bound:</strong> Gently loosen the roots with your hands or make a few vertical cuts.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Sprout size={14}/> 2. Soil & Backfill</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Have good quality garden mix on hand. Backfill using a mix of your existing soil and garden mix. <strong>Do not replace all the soil with compost;</strong> this helps the plant adapt.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Ideal Planting Depth & Prep</p>
                    <img 
                      src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_Generated_Image_4x0g9e4x0g9e4x0g.png" 
                      alt="Planting depth diagram" 
                      className="rounded-2xl shadow-sm mx-auto"
                    />
                </div>
            </div>

            {/* RE-DESIGNED STEP-BY-STEP BOX */}
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900"><CheckCircle2 size={20}/></div>
                    <h3 className="font-black uppercase text-sm tracking-[0.2em] text-emerald-400">Step-by-Step Planting</h3>
                </div>
                <div className="grid gap-6">
                    {[
                        { num: '01', text: 'Place root ball level with ground' },
                        { num: '02', text: 'Backfill with soil mix & gently firm/compact soil with hands or standing on soil' },
                        { num: '03', text: 'Water thoroughly; middle of plant and area surrounding plant' },
                        { num: '04', text: 'Now is a good time for a liquid (seaweed) feed and a light handful of granular slow release fertiliser' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                            <span className="text-emerald-500/50 font-black italic text-lg leading-none pt-1">{step.num}</span>
                            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed text-slate-300 group-hover:text-white transition-colors">{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AFTERCARE */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">4</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Establishing Your Plant</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Droplets size={14}/> Watering & Feeding</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Water is critical for 2-8 weeks. Apply slow-release granules around the base, but <strong>never directly against the stem</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20fert%20image.png" alt="Fertilizer placement" className="rounded-2xl border border-slate-100 shadow-sm" />
                </div>
            </div>
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Wind size={14}/> Staking & Wind</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Stake tall plants or hedge plants in wind-exposed areas. Use soft ties and allow slight movement. Remove stakes once established.
                </p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 p-8 rounded-[2rem] border border-green-100 flex gap-6 items-center">
            <div className="hidden lg:block text-4xl">🍂</div>
            <div>
                <h3 className="font-black uppercase text-xs tracking-widest text-green-800 mb-2">Mulching (Highly Recommended)</h3>
                <p className="text-xs font-bold text-green-700 leading-relaxed">
                    Apply mulch 50–75mm thick. Keep it away from the stem. Mulch retains moisture, reduces weeds, and protects roots.
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: AUCKLAND SPECIFIC */}
        <section className="bg-slate-50 p-8 rounded-[2rem]">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-6 flex items-center gap-2"><ThermometerSun size={14}/> Auckland Specific Notes</h3>
            <ul className="grid lg:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                <li className="flex gap-2"><span>•</span> Best planting times: Autumn and Spring</li>
                <li className="flex gap-2"><span>•</span> Avoid extreme heat or very wet conditions</li>
                <li className="flex gap-2"><span>•</span> Clay soils are common — but don't panic clay is good! It holds nutrients and moisture.</li>
                <li className="flex gap-2"><span>•</span> Wind exposure is a major factor for young plants</li>
            </ul>
        </section>

        {/* DO & DON'T */}
        <section className="grid lg:grid-cols-2 gap-8 border-t border-slate-100 pt-16">
            <div className="p-8 bg-green-50 rounded-3xl">
                <h3 className="text-green-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><CheckCircle2 size={16}/> The Do's</h3>
                <ul className="text-[11px] font-bold text-green-800 space-y-3">
                    <li>• Choose healthy plants</li>
                    <li>• Loosen the root ball if bound</li>
                    <li>• Use garden mix with existing soil</li>
                    <li>• Water in thoroughly</li>
                    <li>• Stake tall or exposed plants</li>
                    <li>• Monitor closely for the first few weeks</li>
                </ul>
            </div>
            <div className="p-8 bg-red-50 rounded-3xl">
                <h3 className="text-red-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><XCircle size={16}/> The Don'ts</h3>
                <ul className="text-[11px] font-bold text-red-800 space-y-3">
                    <li>• Don't plant too deep</li>
                    <li>• Don't leave roots tightly bound</li>
                    <li>• Don't use compost as backfill</li>
                    <li>• Don't forget to water after planting</li>
                    <li>• Don't over-fertilize at planting time</li>
                    <li>• Don't pile up mulch around the stem</li>
                </ul>
            </div>
        </section>

        {/* DISCLAIMER */}
        <footer className="flex gap-4 items-start border-t border-slate-100 pt-12 opacity-50">
            <AlertTriangle size={18} className="text-slate-400 shrink-0"/>
            <p className="text-[10px] font-bold text-slate-800 uppercase leading-loose tracking-wider">
                This guide provides general planting advice only. Always check for underground services before digging. Plant performance depends on site conditions, weather, and ongoing care.
            </p>
        </footer>
      </div>
    </div>
  );
}
</file>

<file path="src/app/lib/stripe.ts">
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Stripe Publishable Key is missing!');
    }
    stripePromise = loadStripe(key || '');
  }
  return stripePromise;
};
</file>

<file path="src/app/plants/actions.ts">
'use server'

import { createSupabaseServer } from "../../supabaseServer";
import { revalidatePath } from "next/cache";

// Action to Add a Plant
export async function addToGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  // 1. Check if this plant is already in the user's garden
  const { data: existing } = await supabase
    .from("user_plants")
    .select("id")
    .eq("user_id", user.id)
    .eq("plant_id", plantId)
    .single();

  if (existing) {
    return { success: false, error: "This plant is already in your garden!" };
  }

  // 2. If not, add it
  const { error } = await supabase
    .from("user_plants")
    .insert([
      { user_id: user.id, plant_id: plantId }
    ]);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}

// Action to Remove a Plant
export async function removeFromGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("user_plants")
    .delete()
    .eq("user_id", user.id)
    .eq("plant_id", plantId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}
</file>

<file path="src/app/globals.css">
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
</file>

<file path="src/components/Diary/PhotoUploader.tsx">

</file>

<file path="src/components/Diary/TaskBadge.tsx">
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Check, X } from 'lucide-react'

export default function TaskBadge({ taskName, actionIcon, onComplete }: any) {
  const [status, setStatus] = useState<'idle' | 'animating' | 'completed'>('idle')
  const [showPhoto, setShowPhoto] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const handleStart = () => {
    setStatus('animating')
    setTimeout(() => {
      setStatus('completed')
      if (onComplete) onComplete()
    }, 1500)
  }

  if (status === 'completed') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/50 border border-white p-3 px-6 rounded-full flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 p-1 rounded-full"><Check size={12} strokeWidth={4}/></span>
          <span className="text-[11px] font-black uppercase text-green-950 tracking-tight">{taskName}</span>
        </div>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Just now</span>
      </motion.div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-white shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-green-950 uppercase tracking-tighter leading-none">{taskName}</h3>
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-2">Ready to log</p>
        </div>
        
        <button 
          onClick={() => setShowPhoto(!showPhoto)}
          className={`p-3 rounded-2xl transition-all ${showPhoto ? 'bg-amber-400 text-green-950' : 'bg-green-50 text-green-700'}`}
        >
          <Camera size={18} strokeWidth={3} />
        </button>
      </div>

      {showPhoto && !image && (
        <div className="mb-4 p-4 border-2 border-dashed border-green-100 rounded-2xl flex flex-col items-center">
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id={`file-${taskName}`} 
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) setImage(URL.createObjectURL(file));
                }}
            />
            <label htmlFor={`file-${taskName}`} className="text-[9px] font-black uppercase text-green-700 cursor-pointer">
                + Add Progress Photo
            </label>
        </div>
      )}

      {image && (
        <div className="relative w-full h-32 mb-4 rounded-2xl overflow-hidden border-2 border-white shadow-inner">
            <img src={image} className="w-full h-full object-cover" />
            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={12}/></button>
        </div>
      )}

      {/* The Hedge Trimmer Animation Area */}
      <div className="relative h-6 bg-green-950 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ left: "-10%" }}
          animate={status === 'animating' ? { left: "100%" } : { left: "-10%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 text-xl z-10"
        >
          {actionIcon}
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={status === 'animating' ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-green-400/40"
        />
      </div>

      <button 
        onClick={handleStart}
        disabled={status === 'animating'}
        className="w-full mt-4 bg-green-800 py-4 rounded-2xl text-[11px] font-black uppercase text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
      >
        {status === 'animating' ? 'Working...' : 'Log Activity'}
      </button>
    </div>
  )
}
</file>

<file path="src/components/GoogleSignIn.tsx">
'use client'

import { createBrowserClient } from '@supabase/ssr'

export default function GoogleSignIn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This ensures the user comes back to your site after Google says OK
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Login error:', error.message)
      alert('Error: ' + error.message)
    }
  }

  return (
    <button 
      onClick={handleLogin}
      className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 p-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
        className="w-5 h-5"
      />
      <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
        Continue with Google
      </span>
    </button>
  )
}
</file>

<file path="src/components/PageHelp.tsx">
'use client'

import { useState } from 'react'

interface PageHelpProps {
  title: string;
  description: string;
  bullets?: string[];
  example?: string;
}

export default function PageHelp({ title, description, bullets, example }: PageHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-6 h-6 rounded-full border border-green-200 flex items-center justify-center text-green-600 text-[10px] font-black hover:bg-green-50 transition-colors shadow-sm"
      >
        i
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-green-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-green-900 uppercase italic tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">
              {description}
            </p>
            
            {bullets && (
              <ul className="space-y-2 mb-4">
                {bullets.map((b, i) => (
                  <li key={i} className="text-[11px] text-gray-500 flex gap-2 items-start">
                    <span className="text-green-500">•</span> {b}
                  </li>
                ))}
              </ul>
            )}

            {example && (
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 mb-6">
                <p className="text-[10px] text-green-800 font-bold uppercase tracking-widest mb-1">Example</p>
                <p className="text-[11px] text-green-700 italic leading-relaxed">{example}</p>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-green-900 text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
</file>

<file path="src/components/QuickAddButton.tsx">
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function QuickAddButton({ plantId, plantName }: { plantId: number, plantName: string }) {
  const [adding, setAdding] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() 
    
    setAdding(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to add plants!")
      setAdding(false)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Check if the user is PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single();

    // 2. If not Pro, count their current plants
    if (!profile?.is_pro) {
      const { count, error: countError } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden Full! Free accounts are limited to 3 plants. Upgrade to Pro for unlimited garden space!");
        setAdding(false)
        return; // Stop here!
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: user.id, 
        plant_id: plantId, 
        is_project: false, 
        status: 'Ongoing' 
      }])

    if (!error) {
      alert(`Added ${plantName} to your garden! 🌿`)
    } else {
      console.error("Error adding plant:", error.message)
    }
    
    setAdding(false)
  }

  return (
    <button 
      onClick={handleQuickAdd}
      disabled={adding}
      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
        adding ? 'bg-gray-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
      }`}
    >
      <span className="text-xl font-black">{adding ? '...' : '+'}</span>
    </button>
  )
}
</file>

<file path="src/proxy.ts">
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// We are naming the function 'proxy' and exporting it as the default
// This satisfies the Next.js 16/Turbopack "proxy" requirement
export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This is the "Heartbeat" that prevents the auto-logout
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
</file>

<file path="src/supabaseServer.ts">
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // This can be ignored if called from a Server Component
          }
        },
      },
    }
  )
}
</file>

<file path="capacitor.config.ts">
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pocketgardener.app',
  appName: 'Pocket Gardener',
  webDir: 'out', // Changed from 'public' to 'out'
  server: {
    androidScheme: 'https'
  }
};

export default config;
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

<file path="public/manifest.json">
{
  "name": "Pocket Gardener",
  "short_name": "Pocket Gardener",
  "description": "Garden management for Aucklanders.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#2d5a3f",
  "theme_color": "#2d5a3f",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
</file>

<file path="src/app/api/checkout/route.ts">
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") ?? "";
    const cookieStore = await cookies(); // Next.js 15+ requirement

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
      },
      line_items: [
  {
    price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, 
    quantity: 1,
  },
],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
</file>

<file path="src/app/api/identify/route.ts">
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const apiKey = process.env.PLANTID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch("https://plant.id/api/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify({
        images: [base64Image],
        latitude: -36.8485,
        longitude: 174.7633,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { error: "Plant.id request failed", details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
</file>

<file path="src/app/guides/feeding/page.tsx">
'use client'

import Navigation from "../../../components/Navigation";
import Link from "next/link";

const feedingCategories = [
  {
    title: "The Quick Boost",
    icon: "🌊",
    sections: [
      { 
        name: "Liquid Seaweed", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/1090-6204_Marshalls-Liquid-Seaweed-1-Litre-6.jpeg",
        description: "Think of this as a quick health 'boost'. Perfect for new plantings, stressed plants, or a quick spring pick-me-up.",
        proTip: "Apply to the leaves (foliar feeding) early in the morning for the fastest absorption and great as a soil drench.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "The Long Game",
    icon: "⏳",
    sections: [
      { 
        name: "Slow-Release Granular", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/shutterstock_1087283084.jpg",
        description: "The backbone of your garden. These broken-down pellets feed your plants steadily over 3-4 months.",
        proTip: "In Auckland, apply these in early Spring and early Autumn when the rain will help wash them into the clay.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "Nutrient Balance",
    icon: "🍋",
    sections: [
      { 
        name: "Correcting Yellow Leaves", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Epsom_salt_for_gardeners_grande.jpeg",
        description: "If your leaves are turning yellow but the veins stay green (Interveinal Chlorosis), your plant is likely 'Magnesium hungry'. This is very common with Citrus and Gardenias in local soils.",
        proTip: "Dissolve 1 tablespoon of Epsom Salts in a 10L watering can for a quick green-up (alternatively purchase Magenesium Chelate and apply as a liquid drench or spray).",
        objectPosition: "center"
      }
    ]
  }
];

export default function FeedingGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Feeding</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Nutrition for Auckland Gardens</p>
      </header>

      <div className="space-y-10">
        {feedingCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.sections.map((item) => (
                <div key={item.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* IMAGE SLOT */}
                  <div className="h-52 w-full bg-gray-50 border-b border-gray-50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.objectPosition }}
                      onError={(e) => { 
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">
                      {item.description}
                    </p>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/30">
                      <p className="text-[10px] font-bold text-blue-900 leading-snug">
                        <span className="uppercase mr-2 font-black text-[8px] opacity-50">Pro Tip</span> 
                        {item.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/tools/page.tsx">
'use client'

import Navigation from "../../../components/Navigation";
import Link from "next/link";

const toolCategories = [
  {
    title: "Weeding & Detail",
    icon: "🌱",
    tools: [
      { 
        name: "Japanese Niwashi", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/niwashi-traditional-right.jpeg",
        description: "The ultimate tool for Auckland clay. The angled blade cuts through weeds at the root and breaks up hard ground with ease.",
        proTip: "Keep the inner edge sharp with a whetstone for effortless weeding.",
        // Default centering is fine here
        objectPosition: "center center"
      }
    ]
  },
  {
    title: "Trimming & Shaping",
    icon: "✂️",
    tools: [
      { 
        name: "Pole Hedge Trimmers", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/Pole%20hedge%20trimmer.png",
        description: "Essential for keeping hedges like Griselinia or Pittosporum square without needing a ladder.",
        proTip: "Long-reach poles save your back and ensure a straighter line on tall boundary hedges.",
        // Shift view down to show the head/mechanism
        objectPosition: "top center" 
      }
    ]
  },
  {
    title: "Digging & Planting",
    icon: "⛏️",
    tools: [
      { 
        name: "Trench Spade", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/trench%20spade.jpg",
        description: "A narrow, heavy-duty spade. Perfect for digging precise holes in tight spots or transplanting established plants.",
        proTip: "The slim profile makes it much easier to slice through thick roots than a standard square spade.",
        // Lift view up to show the spade head
        objectPosition: "bottom center" 
      }
    ]
  },
  {
    title: "Pruning",
    icon: "🌳",
    tools: [
      { 
        name: "Bypass Secateurs", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/GTO-SCLH-burgon-and-ball-left-handed-bypass-secateurs-02.jpeg",
        description: "Your everyday companion for clean cuts on living stems.",
        proTip: "Always choose bypass (scissor-action) over anvil style to avoid crushing the plant's 'veins'.",
        // Default centering is fine here
        objectPosition: "center center"
      }
    ]
  }
];

export default function ToolsGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">The Tool Kit</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Recommended for Auckland Gardens</p>
      </header>

      <div className="space-y-8">
        {toolCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.tools.map((tool) => (
                <div key={tool.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* TOOL IMAGE CONTAINER */}
                  <div className="h-60 w-full bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                    <img 
                      src={tool.image} 
                      alt={tool.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        // Apply the custom object position from the tool data
                        objectPosition: tool.objectPosition || 'center' 
                      }}
                      onError={(e) => { 
                        // Using Privet as the ultimate fallback
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl leading-none">{tool.name}</h3>
                      <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Essential</span>
                    </div>
                    
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-5 font-medium">
                      {tool.description}
                    </p>
                    
                    <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                      <p className="text-[11px] font-bold text-green-800 leading-snug">
                        <span className="uppercase mr-2 font-black text-[9px] text-green-900/40">Pro Tip</span> 
                        {tool.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/weeds/page.tsx">
'use client'
import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr'
import Navigation from "../../../components/Navigation";
import Link from "next/link";

export default function WeedsDetail() {
  const [weeds, setWeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchWeeds() {
      const { data, error } = await supabase
        .from('weeds')
        .select('*')
        .order('name', { ascending: true });
      
      if (data) setWeeds(data);
      setLoading(false);
    }
    fetchWeeds();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Common Weeds</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Identification & Eradication</p>
      </header>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-sm aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={selectedImage} className="w-full h-full object-cover" alt="Enlarged weed" />
            <button className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full font-bold">✕</button>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2.5rem] mb-8">
        <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-2">Expert Tip</h4>
        <p className="text-xs text-amber-900/80 leading-relaxed font-medium italic">
          "Stump Pasting" means applying herbicide to the fresh cut within 30 seconds.
        </p>
      </div>

      <div className="grid gap-3">
        {loading ? (
          <p className="text-center text-xs font-bold text-gray-400 py-10 uppercase tracking-widest">Loading Weeds...</p>
        ) : (
          weeds.map((weed) => (
            <div key={weed.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors">
              <button 
                onClick={() => setSelectedImage(weed.image_url)}
                className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100 relative group"
              >
                <img 
                  src={weed.image_url || "/placeholder-weed.jpg"} 
                  className="w-full h-full object-cover" 
                  alt={weed.name}
                  onError={(e) => { e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg" }}
                />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{weed.name}</h3>
                  <span className="text-[7px] font-black bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 uppercase">{weed.type}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-tight font-medium">{weed.note}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/lib/supabaseClient.ts">
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
</file>

<file path="src/components/AddPlantButton.tsx">
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function AddPlantButton({ plantId }: { plantId: number }) {
  const [loading, setLoading] = useState<'owned' | 'project' | null>(null)
  const [isAdded, setIsAdded] = useState(false)
  const [checking, setChecking] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkExisting() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('user_plants')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('plant_id', plantId)
          .maybeSingle()

        if (data) setIsAdded(true)
      }
      setChecking(false)
    }
    checkExisting()
  }, [plantId, supabase])

  async function handleAdd(isProject: boolean) {
    setLoading(isProject ? 'project' : 'owned')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      alert("Please log in to add plants!")
      setLoading(null)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Fetch the user's profile to see if they are PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', session.user.id)
      .single();

    // 2. If not Pro, count their current entries (including projects)
    if (!profile?.is_pro) {
      const { count } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden limit reached! Free accounts can only track 3 plants. Upgrade to Pro for unlimited garden space!");
        setLoading(null);
        return; // Stop the process here
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: session.user.id, 
        plant_id: plantId,
        is_project: isProject 
      }])

    if (!error) {
      setIsAdded(true)
    } else {
      alert("Error: " + error.message)
    }
    setLoading(null)
  }

  if (checking) return <div className="w-full h-[70px] bg-gray-50 animate-pulse rounded-[2.5rem]" />

  // IF ALREADY ADDED: Show confirmation
  if (isAdded) {
    return (
      <div className="w-full bg-[#f1f9f4] border border-green-100 py-6 rounded-[2.5rem] flex items-center justify-center gap-3">
        <span className="text-green-600 font-bold">✓</span>
        <span className="text-[11px] font-black text-green-800 uppercase tracking-[0.2em]">In Your Garden</span>
      </div>
    )
  }

  // IF NOT ADDED: Show two options
  return (
    <div className="space-y-4">
      <button 
        onClick={() => handleAdd(false)}
        disabled={loading !== null}
        className="w-full bg-[#2d5a3f] text-white py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'owned' ? 'Adding...' : '+ Add to My Garden'}
      </button>

      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-100 flex-grow"></div>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">or</span>
        <div className="h-px bg-gray-100 flex-grow"></div>
      </div>

      <button 
        onClick={() => handleAdd(true)}
        disabled={loading !== null}
        className="w-full bg-white border border-gray-100 text-gray-400 py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'project' ? 'Saving...' : '☆ Future Project'}
      </button>
    </div>
  )
}
</file>

<file path="src/components/PlantThumbnail.tsx">
'use client'

interface PlantThumbnailProps {
  plant: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlantThumbnail({ plant, size = 'md' }: PlantThumbnailProps) {
  // Styles adjusted for better responsiveness and quality control
  const styles = {
    sm: "w-12 h-12 rounded-xl text-xl",
    md: "w-24 h-24 rounded-2xl text-3xl",
    // lg now ensures the image doesn't stretch to infinity on desktop/tablets
    lg: "w-full aspect-square max-w-[500px] rounded-[2rem] text-[100px]"
  };

  // CHECK: Does the plant exist and does it have a non-empty image_url?
  const hasValidImage = plant?.image_url && plant.image_url.trim() !== "";

  return (
    <div className={`${styles[size]} bg-[#f0f7f3] flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner`}>
      {hasValidImage ? (
        <img 
          src={plant.image_url} 
          alt={plant.common_name || 'Plant'} 
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          // If the image link is broken/dead, hide it and show emoji instead
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-emoji');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
      ) : null}

      {/* Fallback Emoji: Hidden by default IF we have an image, but shown if image fails */}
      <div className={`fallback-emoji select-none pointer-events-none absolute inset-0 flex items-center justify-center ${hasValidImage ? 'hidden' : ''}`}>
        {plant?.plant_type === 'Fruit' ? '🍋' : '🌿'}
      </div>
    </div>
  );
}
</file>

<file path="src/components/UpgradeButton.tsx">
'use client';

import { useState } from 'react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Call your internal Next.js API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // 2. Redirect to the Stripe URL provided by your API
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error: any) {
      console.error('Stripe Error:', error);
      alert(error.message || 'Something went wrong with the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-[#2d5a3f] hover:bg-[#1e3d2a] text-white font-bold uppercase tracking-[0.1em] py-3 px-6 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-[11px]"
    >
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          <span>🌿</span>
          <span>Upgrade to Pro ($12.99 per month)</span>
        </>
      )}
    </button>
  );
}
</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

repomix-output.md
*-repomix*.md
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use 'export' if we are specifically building for Capacitor
  output: process.env.IS_CAPACITOR ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
</file>

<file path="repomix-output.xml">
This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: repomix-output.xml, pocket-gardener-repomix-updated.md, node_modules, .next, dist, build, .git
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
public/
  favicon.ico
  file.svg
  globe.svg
  icon.png
  manifest.json
  next.svg
  pglogo.png
  vercel.svg
  window.svg
src/
  app/
    about/
      page.tsx
    api/
      checkout/
        route.ts
      identify/
        route.ts
      portal/
        route.ts
      render-garden/
        route.ts
      webhooks/
        stripe/
          route.ts
    auth/
      auth-error/
        page.tsx
      callback/
        route.ts
    calendar/
      page.tsx
    dashboard/
      page.tsx
    diary/
      page.tsx
    error/
      page.tsx
    feature/
      page.tsx
    guides/
      feeding/
        page.tsx
      pests/
        page.tsx
      planting/
        page.tsx
      tools/
        page.tsx
      weeds/
        page.tsx
      page.tsx
    identify/
      page.tsx
    lib/
      stripe.ts
      supabaseClient.ts
    login/
      page.tsx
    match/
      page.tsx
    plants/
      [id]/
        page.tsx
      actions.ts
      page.tsx
    success/
      page.tsx
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  components/
    Diary/
      PhotoUploader.tsx
      TaskBadge.tsx
    AddPlantButton.tsx
    GoogleSignIn.tsx
    Navigation.tsx
    PageHelp.tsx
    PlantThumbnail.tsx
    QuickAddButton.tsx
    UpgradeButton.tsx
    WelcomeOverlay.tsx
  proxy.ts
  supabaseServer.ts
.gitignore
capacitor.config.ts
eslint.config.mjs
next.config.ts
package.json
postcss.config.mjs
README.md
tsconfig.json
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="src/app/api/portal/route.ts">
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name) { return cookieStore.get(name)?.value } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get the stripe_customer_id we just saved!
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    // Create a portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
</file>

<file path="src/app/api/render-garden/route.ts">
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // Cast to string to fix TS error
});

export async function POST(req: Request) {
  try {
    const { plantList, zoneDetails } = await req.json();

    // We added "Botanical" and "Horticultural" to keep the safety filter happy
   const prompt = `A very simple 2D garden.
    Perspective: Bird's-eye view looking straight down.
    Components: One central rectangle lawn and three simple perimeter garden beds.
    Contents: The garden beds contain basic plant symbols representing: ${plantList}.
    Style: Basic landscape 2D drawing/ planting plan in colour. Please only use the plants from the ${plantList}. 
    Visual Type: It must look like a simple, clean diagram for a landscaping hobbyist.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });

    // Added safety check to fix 'response.data is possibly undefined' error
    if (response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url;
      return NextResponse.json({ url: imageUrl });
    } else {
      throw new Error("OpenAI returned an empty image data array.");
    }

  } catch (error: any) {
    console.error("DALL-E Error:", error);
    // Provide a more descriptive error message back to your frontend
    return NextResponse.json(
      { error: error.message || "Failed to generate render" }, 
      { status: 500 }
    );
  }
}
</file>

<file path="src/app/api/webhooks/stripe/route.ts">
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
</file>

<file path="src/app/auth/auth-error/page.tsx">
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-[#eef7f2] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Login Issue</h1>
        <p className="text-gray-600 mb-6">
          The link might have expired or was already used. Magic links only work once!
        </p>
        <Link href="/login" className="bg-[#2d5a3f] text-white px-8 py-3 rounded-full font-bold">
          Try Again
        </Link>
      </div>
    </main>
  );
}
</file>

<file path="src/app/calendar/page.tsx">
'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import {
  ShoppingCart,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
} from 'lucide-react'
import Navigation from '../../components/Navigation'
import PageHelp from '../../components/PageHelp'

type TaskCandidate = {
  id: string
  title: string
  note: string
  taskType: string
  score: number
  urgency: 'must' | 'should' | 'could'
  minutes: number
  tools: string[]
  shopping: string[]
  isGeneral?: boolean
  canBundle: boolean
}

type PlantRow = {
  id: number
  common_name: string | null
  plant_type: string | null
  task_category: string | null
  maintenance_level: string | null
  trim_cycle: number | null
  feed_cycle: number | null
  trim_notes: string | null
  feed_notes: string | null
}

type UserPlantRow = {
  id: number
  quantity: number | null
  length_metres: number | null
  nickname: string | null
  personal_notes: string | null
  is_sick: boolean | null
  current_issue: string | null
  current_remedy: string | null
  current_shopping_tags: string[] | null
  plants: PlantRow | null
}

type MonthlyCareRow = {
  id: number
  month_number: number
  plant_type: string | null
  care_note: string | null
}

type TaskRuleRow = {
  id: number
  plant_category: string | null
  task_type: string | null
  trigger_type: string | null
  trigger_month: number | null
  frequency_per_year: number | null
  base_priority: number | null
  estimated_minutes: number | null
  tool_tags: string[] | null
  shopping_tags: string[] | null
}

type TaskStatusRow = {
  task_key: string
  is_done: boolean
}

function parseArrayField(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function prettyTag(tag: string): string {
  return tag.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildRuleNote(rule: TaskRuleRow, plant: PlantRow, qty: number): string {
  const name = plant.common_name || 'plant'
  const action = (rule.task_type || 'care').toLowerCase()

  if (action === 'trim') {
    return `You should trim your ${name.toLowerCase()} this month.`
  }

  if (action === 'prune') {
    return `You should prune your ${name.toLowerCase()} this month.`
  }

  if (action === 'feed') {
    return qty > 1
      ? `Time to feed your ${qty} ${name.toLowerCase()} plants.`
      : `Time to feed your ${name.toLowerCase()}.`
  }

  if (action === 'check') {
    return `Check your ${name.toLowerCase()} for seasonal maintenance.`
  }

  if (action === 'tidy') {
    return `Time to tidy your ${name.toLowerCase()}.`
  }

  if (action === 'divide') {
    return `Consider dividing your ${name.toLowerCase()} this month.`
  }

  return `Seasonal ${action} task for your ${name.toLowerCase()}.`
}

function inferToolsFromCareNote(note: string): string[] {
  const lower = note.toLowerCase()
  const tools = new Set<string>()

  if (lower.includes('prune') || lower.includes('trim') || lower.includes('cut back')) {
    tools.add('Secateurs')
  }

  if (lower.includes('hedge')) {
    tools.add('Hedge Shears')
  }

  if (lower.includes('spray')) {
    tools.add('Sprayer')
  }

  if (lower.includes('mulch')) {
    tools.add('Gloves')
  }

  return Array.from(tools)
}

function inferShoppingFromCareNote(note: string, plantName?: string | null): string[] {
  const lower = note.toLowerCase()
  const shopping = new Set<string>()

  if (lower.includes('feed') || lower.includes('fertilis')) {
    shopping.add('Granular Fertiliser')
  }

  if (lower.includes('slug') || lower.includes('snail')) {
    shopping.add('Slug Pellets')
  }

  if (
    plantName &&
    ['meyer lemon', 'lemon', 'lime', 'mandarin', 'orange', 'grapefruit'].includes(
      plantName.toLowerCase()
    ) &&
    (lower.includes('feed') || lower.includes('spring'))
  ) {
    shopping.add('Citrus Fertiliser')
    shopping.add('Epsom Salts')
  }

  return Array.from(shopping)
}

function priorityToUrgency(score: number): 'must' | 'should' | 'could' {
  if (score >= 85) return 'must'
  if (score >= 55) return 'should'
  return 'could'
}

function urgencyToLabel(urgency: 'must' | 'should' | 'could'): string {
  if (urgency === 'must') return 'Priority Level 1'
  if (urgency === 'should') return 'Priority Level 2'
  return 'Priority Level 3'
}

function getAucklandDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date)

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value || 0)

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
  }
}

function getDefaultActiveWeek() {
  const { year, month, day } = getAucklandDateParts()

  const firstOfMonthUtc = new Date(Date.UTC(year, month - 1, 1))
  const mondayIndex = (firstOfMonthUtc.getUTCDay() + 6) % 7
  const firstMondayDay = mondayIndex === 0 ? 1 : 8 - mondayIndex

  if (day < firstMondayDay) return 1

  return Math.min(4, Math.floor((day - firstMondayDay) / 7) + 1)
}

export default function CalendarPage() {
  const [loading, setLoading] = useState(true)
  const [weekLoading, setWeekLoading] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [activeWeek, setActiveWeek] = useState(getDefaultActiveWeek())
  const [allPlants, setAllPlants] = useState<UserPlantRow[]>([])
  const [monthlyCare, setMonthlyCare] = useState<MonthlyCareRow[]>([])
  const [taskRules, setTaskRules] = useState<TaskRuleRow[]>([])
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({})
  const [taskDoneMessage, setTaskDoneMessage] = useState<string | null>(null)

  const taskDoneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }
    }
  }, [])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const today = new Date()
  const currentMonthNum = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      month: 'numeric',
    }).format(today)
  )
  const currentMonthName = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    month: 'long',
  }).format(today)
  const currentYear = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
    }).format(today)
  )

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() - today.getDay() + i)
    return d
  })

  useEffect(() => {
    async function loadData() {
      if (!hasLoadedOnce) {
        setLoading(true)
      } else {
        setWeekLoading(true)
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        setWeekLoading(false)
        return
      }

      setGardenPhoto(user.user_metadata?.garden_photo || null)

      const [plantsRes, careRes, rulesRes, statusRes] = await Promise.all([
  supabase
    .from('user_plants')
    .select(
      `
        id,
        quantity,
        length_metres,
        nickname,
        personal_notes,
        is_sick,
        current_issue,
        current_remedy,
        current_shopping_tags,
        plants (
          id,
          common_name,
          plant_type,
          task_category,
          maintenance_level,
          trim_cycle,
          feed_cycle,
          trim_notes,
          feed_notes
        )
      `
    )
    .eq('user_id', user.id)
    .eq('is_project', false),
        supabase
          .from('auckland_monthly_care')
          .select('id, month_number, plant_type, care_note')
          .eq('month_number', currentMonthNum),
        supabase.from('plant_task_rules').select('*'),
        supabase
          .from('user_task_status')
          .select('task_key, is_done')
          .eq('user_id', user.id)
          .eq('week_number', activeWeek)
          .eq('month_number', currentMonthNum)
          .eq('year_number', currentYear),
      ])

      if (plantsRes.error) console.error('Error loading user plants:', plantsRes.error)
      if (careRes.error) console.error('Error loading monthly care:', careRes.error)
      if (rulesRes.error) console.error('Error loading task rules:', rulesRes.error)
      if (statusRes.error) console.error('Error loading task status:', statusRes.error)

      const safePlants: UserPlantRow[] = (plantsRes.data ?? []).map((row: any) => ({
  id: row.id,
  quantity: row.quantity ?? 1,
  length_metres: row.length_metres ?? null,
  nickname: row.nickname ?? null,
  personal_notes: row.personal_notes ?? null,
  is_sick: row.is_sick ?? false,
  current_issue: row.current_issue ?? null,
  current_remedy: row.current_remedy ?? null,
  current_shopping_tags: row.current_shopping_tags ?? [],
  plants: row.plants
    ? {
        id: row.plants.id,
        common_name: row.plants.common_name ?? null,
        plant_type: row.plants.plant_type ?? null,
        task_category: row.plants.task_category ?? null,
        maintenance_level: row.plants.maintenance_level ?? null,
        trim_cycle: row.plants.trim_cycle ?? null,
        feed_cycle: row.plants.feed_cycle ?? null,
        trim_notes: row.plants.trim_notes ?? null,
        feed_notes: row.plants.feed_notes ?? null,
      }
    : null,
}))

      const statusMap: Record<string, boolean> = {}
      ;((statusRes.data ?? []) as TaskStatusRow[]).forEach((row) => {
        statusMap[row.task_key] = row.is_done
      })

      setAllPlants(safePlants)
      setMonthlyCare((careRes.data ?? []) as MonthlyCareRow[])
      setTaskRules((rulesRes.data ?? []) as TaskRuleRow[])
      setTaskStatus(statusMap)

      setLoading(false)
      setWeekLoading(false)
      setHasLoadedOnce(true)
    }

    loadData()
  }, [currentMonthNum, currentYear, activeWeek, hasLoadedOnce, supabase])

  async function toggleTask(task: TaskCandidate, done: boolean) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('user_task_status').upsert(
      {
        user_id: user.id,
        task_key: task.id,
        week_number: activeWeek,
        month_number: currentMonthNum,
        year_number: currentYear,
        is_done: done,
      },
      { onConflict: 'user_id,task_key,week_number,month_number,year_number' }
    )

    if (error) {
      console.error('Error updating task status:', error)
      return
    }

    setTaskStatus((prev) => ({
      ...prev,
      [task.id]: done,
    }))

    if (done && task.id.startsWith('sick-')) {
      const userPlantId = Number(task.id.replace('sick-', ''))

      const { error: clearError } = await supabase
        .from('user_plants')
        .update({
          is_sick: false,
          current_issue: null,
          current_remedy: null,
          current_shopping_tags: null,
        })
        .eq('id', userPlantId)

      if (clearError) {
        console.error('Error clearing unhealthy plant state:', clearError)
      } else {
        setAllPlants((prev) =>
          prev.map((plant) =>
            plant.id === userPlantId
              ? {
                  ...plant,
                  is_sick: false,
                  current_issue: null,
                  current_remedy: null,
                  current_shopping_tags: [],
                }
              : plant
          )
        )

        await supabase
          .from('plant_logs')
          .update({
            status: 'Resolved',
            resolved_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('user_plant_id', userPlantId)
          .eq('status', 'Ongoing')
      }
    }

    if (done) {
      const type = (task.taskType || '').toLowerCase()

      let message = 'Task completed'

      if (type === 'trim') {
        message = `${task.title} trimmed`
      } else if (type === 'prune') {
        message = `${task.title} pruned`
      } else if (type === 'feed') {
        message = `${task.title} fed`
      } else if (type === 'check') {
        message = `${task.title} checked`
      } else if (type === 'tidy') {
        message = `${task.title} tidied`
      } else if (type === 'sick') {
        message = `${task.title} issue resolved`
      }

      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }

      setTaskDoneMessage(message)

      taskDoneTimeoutRef.current = setTimeout(() => {
        setTaskDoneMessage(null)
      }, 2200)
    }
  }

  const agenda = useMemo(() => {
    if (!allPlants.length) {
      return {
        sickTasks: [] as TaskCandidate[],
        tasks: [] as TaskCandidate[],
        shoppingList: [] as string[],
        toolsList: ['Watering Can'],
      }
    }

    const sickCandidates: TaskCandidate[] = []
    const candidates: TaskCandidate[] = []
    const finalShopping = new Set<string>()
    const finalTools = new Set<string>(['Watering Can'])

    allPlants.forEach((up) => {
      const p = up.plants
      if (!p) return

      const commonName = up.nickname || p.common_name || 'Plant'

      if (up.is_sick) {
  const issueText = up.current_issue?.trim()
  const remedyText = up.current_remedy?.trim()
  const shoppingTags = parseArrayField(up.current_shopping_tags).map(prettyTag)

  let sickNote = 'This plant needs attention.'
  if (issueText && remedyText) {
    sickNote = `${issueText} — ${remedyText}`
  } else if (issueText) {
    sickNote = issueText
  } else if (remedyText) {
    sickNote = remedyText
  }

  const needsSprayer = shoppingTags.some((tag) => {
    const lower = tag.toLowerCase()
    return (
      lower.includes('spray') ||
      lower.includes('neem') ||
      lower.includes('oil') ||
      lower.includes('fungicide')
    )
  })

  if (needsSprayer) {
    finalTools.add('Garden Sprayer')
  }

  sickCandidates.push({
    id: `sick-${up.id}`,
    title: commonName,
    note: sickNote,
    taskType: 'sick',
    score: 999,
    urgency: 'must',
    minutes: 15,
    tools: [],
    shopping: shoppingTags,
    canBundle: false,
  })
}
    })

    allPlants.forEach((up, index) => {
      const p = up.plants
      if (!p) return

      const qty = up.quantity || 1
      const commonName = up.nickname || p.common_name || 'Plant'
      const plantType = p.plant_type || ''
      const taskCategory = (p.task_category || plantType || '').trim().toLowerCase()

      const assignedWeek = (index % 4) + 1
      const shouldShowThisWeek = assignedWeek === activeWeek

      if (!shouldShowThisWeek) return

      const plantSpecificCare = monthlyCare.find((c) => {
        const careType = (c.plant_type || '').trim().toLowerCase()
        return (
          careType === (p.common_name || '').toLowerCase() ||
          careType === plantType.toLowerCase() ||
          careType === taskCategory
        )
      })

      if (plantSpecificCare?.care_note) {
        const monthlyCareScore =
          taskCategory === 'hedge' &&
          /trim|prune|cut back/.test(plantSpecificCare.care_note.toLowerCase())
            ? 115
            : 90

        candidates.push({
          id: `care-${up.id}`,
          title: qty > 1 ? `${qty}x ${commonName}` : commonName,
          note: plantSpecificCare.care_note,
          taskType: 'care',
          score: monthlyCareScore,
          urgency: priorityToUrgency(monthlyCareScore),
          minutes: Math.max(10, 15 * qty),
          tools: inferToolsFromCareNote(plantSpecificCare.care_note),
          shopping: inferShoppingFromCareNote(plantSpecificCare.care_note, p.common_name),
          canBundle: false,
        })
      }

      const matchingRules = taskRules.filter((r) => {
        const ruleCategory = (r.plant_category || '').trim().toLowerCase()
        const ruleMonth = Number(r.trigger_month)
        return ruleCategory === taskCategory && ruleMonth === currentMonthNum
      })

      if (matchingRules.length > 0) {
        matchingRules.forEach((rule, ruleIndex) => {
          const isHedgeTrim =
            (rule.task_type || '').trim().toLowerCase() === 'trim' &&
            taskCategory === 'hedge'

          const baseScore = isHedgeTrim ? 120 : rule.base_priority || 50
          const finalScore = plantSpecificCare ? Math.max(60, baseScore - 10) : baseScore

          candidates.push({
  id: `rule-${up.id}-${rule.id || ruleIndex}`,

  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,

  note: buildRuleNote(rule, p, qty),
  taskType: rule.task_type || 'care',
  score: finalScore,
  urgency: priorityToUrgency(finalScore),

  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 15)
      : Math.max(5, (rule.estimated_minutes || 15) * qty),

  tools: parseArrayField(rule.tool_tags).map(prettyTag),
  shopping: parseArrayField(rule.shopping_tags).map(prettyTag),
  canBundle: true,
})
        })
      } else if (!plantSpecificCare) {
        candidates.push({
  id: `fallback-${up.id}`,
  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,
  note: `General maintenance check for your ${commonName.toLowerCase()}.`,
  taskType: 'check',
  score: 30,
  urgency: 'could',
  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 2)
      : 10,
  tools: [],
  shopping: [],
  canBundle: false,
})
      }
    })

    const finalTasks: TaskCandidate[] = []
    const bundleGroups = new Map<string, TaskCandidate[]>()

    candidates.forEach((candidate) => {
      if (candidate.canBundle) {
        const key = candidate.taskType.toLowerCase()
        bundleGroups.set(key, [...(bundleGroups.get(key) || []), candidate])
      } else {
        finalTasks.push(candidate)
      }
    })

    bundleGroups.forEach((tasks, type) => {
      if (tasks.length === 1) {
        finalTasks.push(tasks[0])
        return
      }

      const mergedTitles = tasks.map((t) => t.title).join(', ')
      const mergedTools = Array.from(new Set(tasks.flatMap((t) => t.tools)))
      const mergedShopping = Array.from(new Set(tasks.flatMap((t) => t.shopping)))
      const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0)
      const bestScore = Math.max(...tasks.map((t) => t.score))

      finalTasks.push({
        id: `bundle-${type}`,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Jobs`,
        note: `Time to ${type} these plants: ${mergedTitles}.`,
        taskType: type,
        score: bestScore,
        urgency: priorityToUrgency(bestScore),
        minutes: totalMinutes,
        tools: mergedTools,
        shopping: mergedShopping,
        canBundle: false,
      })
    })

    const visibleSickTasks = sickCandidates.filter((task) => !taskStatus[task.id])

    const sortedTasks = finalTasks
      .filter((task) => !taskStatus[task.id])
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.minutes - b.minutes
      })
      .slice(0, 4)

    ;[...visibleSickTasks, ...sortedTasks].forEach((task) => {
      task.tools.forEach((tool) => finalTools.add(tool))
      task.shopping.forEach((item) => finalShopping.add(item))
    })

    return {
      sickTasks: visibleSickTasks,
      tasks: sortedTasks,
      shoppingList: Array.from(finalShopping),
      toolsList: Array.from(finalTools),
    }
  }, [allPlants, monthlyCare, taskRules, activeWeek, currentMonthNum, taskStatus])

  const priorityLevel1Tasks = agenda.tasks.filter((task) => task.urgency === 'must')
  const priorityLevel2And3Tasks = agenda.tasks.filter((task) => task.urgency !== 'must')

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center font-black text-green-800 tracking-widest text-[10px]">
        SYNCING SMART CALENDAR...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <section className="relative h-[60vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0f4f1] via-transparent to-transparent z-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-15" />
        <img
          src={
            gardenPhoto ||
            'https://images.unsplash.com/photo-1558905619-17254261b646?q=80&w=2000'
          }
          alt="Garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pb-20">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20 mb-4">
            <MapPin size={10} className="text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Auckland • {currentMonthName}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {currentMonthName.toUpperCase()} <span className="text-amber-400">TO-DO</span>
            </h1>

            <PageHelp
              title="Calendar"
              description="Your weekly garden plan based on your plants, season, and any issues you've logged."
              bullets={[
                "Priority Level 1 tasks are the most important right now.",
                "Sick plants appear at the top and can be resolved here.",
                "Shopping and tools update automatically based on your tasks."
              ]}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {weekDays.map((date, i) => (
              <div
                key={i}
                className={`flex flex-col items-center min-w-[50px] p-3 rounded-2xl border ${
                  date.getDate() === today.getDate()
                    ? 'bg-amber-400 border-amber-400'
                    : 'bg-black/40 border-white/10 backdrop-blur-sm'
                }`}
              >
                <span
                  className={`text-[10px] font-black uppercase ${
                    date.getDate() === today.getDate() ? 'text-green-950' : 'text-white/60'
                  }`}
                >
                  {date.toLocaleDateString('en-NZ', { weekday: 'short' })}
                </span>
                <span
                  className={`text-sm font-black ${
                    date.getDate() === today.getDate() ? 'text-green-950' : 'text-white'
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 -mt-10 relative z-30 space-y-3">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-2 flex items-center justify-between border border-gray-100">
          <button
            onClick={() => setActiveWeek((prev) => Math.max(1, prev - 1))}
            className="p-4 text-gray-300"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center flex flex-col items-center">
            <p className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1">
              Weekend Plan
            </p>

            <p className="font-black text-green-950 uppercase italic text-sm">
              Week {activeWeek} Agenda
            </p>
          </div>

          <button
            onClick={() => setActiveWeek((prev) => Math.min(4, prev + 1))}
            className="p-4 text-gray-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        {agenda.sickTasks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] px-2 italic">
              Needs Attention
            </h2>

            <div className="space-y-3">
              {agenda.sickTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 rounded-[2.5rem] border-2 border-red-200 bg-red-50 shadow-md flex gap-4 items-start"
                >
                  <div className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-100">
                    <input
                      type="checkbox"
                      checked={taskStatus[task.id] || false}
                      onChange={(e) => toggleTask(task, e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start w-full gap-4">
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-tight text-red-900">
                          {task.title}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-red-600">
                          Needs Attention
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-60 shrink-0">
                        <Clock size={10} />
                        <span className="text-[10px] font-bold uppercase">
                          {task.minutes >= 60
                            ? `${(task.minutes / 60).toFixed(1)} HRS`
                            : `${Math.round(task.minutes)} MIN`}
                        </span>
                      </div>
                    </div>

                    <p className="text-[15px] font-normal leading-relaxed mt-3 text-red-800">
                      {task.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-green-900/30 uppercase tracking-[0.3em] px-2 italic">
            Priority Tasks
          </h2>

          <div className="space-y-3">
            {priorityLevel1Tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 rounded-[2.5rem] border-2 border-amber-300 bg-amber-50/60 shadow-md flex gap-4 items-start"
              >
                <div className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-200">
                  <input
                    type="checkbox"
                    checked={taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className="w-4 h-4 accent-green-800"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start w-full gap-4">
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-tight text-green-950">
                        {task.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-amber-700">
                        {urgencyToLabel(task.urgency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-70 shrink-0">
                      <Clock size={10} />
                      <span className="text-[10px] font-bold uppercase">
                        {task.minutes >= 60
                          ? `${(task.minutes / 60).toFixed(1)} HRS`
                          : `${Math.round(task.minutes)} MIN`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[16px] font-normal leading-relaxed mt-3 text-gray-700">
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {priorityLevel1Tasks.length > 0 && priorityLevel2And3Tasks.length > 0 && (
              <div className="py-2">
                <div className="border-t border-gray-300" />
              </div>
            )}

            {priorityLevel2And3Tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 rounded-[2.5rem] border bg-white border-white text-gray-900 shadow-sm flex gap-4 items-start"
              >
                <div className="mt-1 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-green-50">
                  <input
                    type="checkbox"
                    checked={taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className="w-4 h-4 accent-green-700"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start w-full gap-4">
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-tight text-green-950">
                        {task.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-amber-600">
                        {urgencyToLabel(task.urgency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-60 shrink-0">
                      <Clock size={10} />
                      <span className="text-[10px] font-bold uppercase">
                        {task.minutes >= 60
                          ? `${(task.minutes / 60).toFixed(1)} HRS`
                          : `${Math.round(task.minutes)} MIN`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] font-normal leading-relaxed mt-3 text-gray-700">
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {agenda.sickTasks.length === 0 && agenda.tasks.length === 0 && (
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm text-sm text-gray-500 italic">
                No tasks for this week yet.
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-[2.5rem] p-7 border border-white shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center shadow-md shadow-amber-900/10">
                <ShoppingCart size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Supplies
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.shoppingList.length > 0 ? (
                agenda.shoppingList.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400 italic px-1">
                  No specific products needed.
                </li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-[2.5rem] p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center">
                <Wrench size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Tool Kit
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.toolsList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {taskDoneMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-green-900 text-white px-5 py-3 rounded-full shadow-2xl text-[10px] font-black uppercase tracking-widest">
          {taskDoneMessage}
        </div>
      )}

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/diary/page.tsx">
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ClipboardList, Scissors, Droplets, Save, RotateCcw, ChevronDown, Calendar } from 'lucide-react'
import Navigation from '../../components/Navigation'

// Pre-defined tasks for the "Shelf"
const TASK_LIBRARY = [
  { id: 'trim', label: 'Trimmed Hedges', icon: <Scissors size={14}/> },
  { id: 'water', label: 'Watered', icon: <Droplets size={14}/> },
  { id: 'mow', label: 'Mowed Lawn', icon: '🚜' },
  { id: 'feed', label: 'Fertilized', icon: '🌿' },
]

function LeafConfetti() {
  return (
    <div className="absolute top-1/2 left-0 pointer-events-none z-50">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1], x: -40 - Math.random() * 80, y: -20 + Math.random() * 60, rotate: Math.random() * 360 }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: "easeOut" }}
          className="absolute text-[20px] filter drop-shadow-sm"
        >
          🍃
        </motion.span>
      ))}
    </div>
  )
}

export default function GardenDiary() {
  const [activeTasks, setActiveTasks] = useState<any[]>([])
  const [dailyArchives, setDailyArchives] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  // Fix hydration by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const addToPad = (task: any) => {
    const uniqueId = `${task.id}-${Math.random().toString(36).substr(2, 9)}`;
    setActiveTasks(prev => [...prev, { ...task, id: uniqueId, status: 'ready' }]);
  }

  const completeTask = (taskId: string) => {
    setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'animating' } : t));
    setTimeout(() => {
        setActiveTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    }, 2500); 
  }

  const resetToday = () => {
    if (confirm("Clear today's work? This cannot be undone.")) {
      setActiveTasks([]);
    }
  }

  const saveDay = () => {
    if (activeTasks.length === 0) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'short' }),
      tasks: activeTasks.filter(t => t.status === 'completed')
    };

    setDailyArchives(prev => [newEntry, ...prev]);
    setActiveTasks([]);
  }

  // Don't render the dynamic parts until mounted to prevent hydration errors
  const currentDateLabel = mounted ? new Date().toLocaleDateString() : ""

  return (
    <main className="min-h-screen bg-[#f0f4f1] p-4 pb-40 text-gray-900 flex flex-col">
      <header className="mb-6 pt-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">Diary Pad</h1>
          <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mt-1 min-h-[1em]">
            {mounted && `Session: ${currentDateLabel}`}
          </p>
        </div>
        <div className="flex gap-2">
            <button onClick={resetToday} className="p-2 bg-white rounded-full shadow-sm text-red-400 border border-red-50 active:scale-90 transition-transform"><RotateCcw size={18} /></button>
            <button onClick={saveDay} className="p-2 bg-green-600 rounded-full shadow-md text-white active:scale-90 transition-transform"><Save size={18} /></button>
        </div>
      </header>

      <div className="flex gap-4 flex-1">
        <aside className="w-20 flex flex-col gap-3">
          {TASK_LIBRARY.map((task) => (
            <button key={task.id} onClick={() => addToPad(task)} className="bg-white border-2 border-white shadow-sm rounded-2xl p-3 flex flex-col items-center gap-1 active:scale-90 transition-all">
              <span className="text-green-700">{task.icon}</span>
              <span className="text-[7px] font-black uppercase text-center">{task.label}</span>
            </button>
          ))}
        </aside>

        <section className="flex-grow bg-white rounded-[2.5rem] shadow-2xl border-b-8 border-gray-200 p-6 relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
            <ClipboardList size={16} className="text-green-800" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-800">Today's Work</span>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto">
            <AnimatePresence mode='popLayout'>
              {activeTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="relative p-4 rounded-3xl bg-green-50/50 border border-green-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black uppercase ${task.status === 'completed' ? 'text-green-500 line-through' : 'text-green-950'}`}>
                      {task.label}
                    </span>
                    <button 
                        disabled={task.status !== 'ready'}
                        onClick={() => completeTask(task.id)}
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-green-500 border-green-500' : task.status === 'animating' ? 'bg-green-200 border-green-200' : 'bg-white border-gray-200'}`}
                    >
                        {task.status === 'completed' ? <Check size={16} className="text-white" strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                    </button>
                  </div>

                  {task.status === 'animating' && (
                    <div className="relative h-24 mt-2 bg-white rounded-2xl overflow-hidden border border-green-50">
                        <div className="absolute bottom-1 left-0 w-full h-12 z-10 opacity-80" style={{ backgroundImage: 'url("https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/1000_F_202501258_LXa3HAvoZDKfsyZsu4AYML3ltk6QJNuU.jpg")', backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'bottom'}} />
                        <motion.div initial={{ left: "-30%" }} animate={{ left: "110%", rotate: [1, -1, 1] }} transition={{ left: { duration: 2.2, ease: "linear" }, rotate: { repeat: Infinity, duration: 0.1 } }} className="absolute bottom-0 w-24 h-24 z-40 flex items-center justify-center">
                            <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/trimmer%20v2.png" alt="Trimmer" className="w-full h-full object-contain" />
                            <LeafConfetti />
                        </motion.div>
                        <motion.div initial={{ width: 0 }} animate={{ width: "105%" }} transition={{ duration: 2.2, ease: "linear" }} className="absolute bottom-1 left-0 h-12 bg-white/40 z-20 mix-blend-overlay" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6">
             <p className="text-[9px] font-black uppercase text-gray-400 mb-2 border-t pt-4 border-dashed">Past Entries</p>
             <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {dailyArchives.map((day) => (
                  <details key={day.id} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                    <summary className="list-none p-3 flex justify-between items-center cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-green-800" />
                        <span className="text-[10px] font-black uppercase text-green-900">{day.date}</span>
                      </div>
                      <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
                    </summary>
                    <div className="p-3 pt-0 space-y-1">
                      {day.tasks.map((t: any) => (
                        <div key={t.id} className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-2">
                           <div className="w-1 h-1 bg-green-400 rounded-full" /> {t.label}
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
             </div>
          </div>
        </section>
      </div>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/error/page.tsx">
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">⚠️</span>
        </div>

        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2 block">
          Transaction Interrupted
        </span>
        
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">
          Something went wrong
        </h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed px-4">
          We couldn't process your payment. No charges were made to your card. Please try again or contact support if the issue persists.
        </p>

        <div className="pt-2">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-5 rounded-[1.5rem] shadow-xl shadow-green-900/20 active:scale-95 transition-all text-[11px]"
          >
            Back to Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Pocket Gardener • Auckland
        </p>
      </div>
    </main>
  );
}
</file>

<file path="src/app/guides/feeding/page.tsx">
'use client'

import Navigation from "../../../components/Navigation";
import Link from "next/link";

const feedingCategories = [
  {
    title: "The Quick Boost",
    icon: "🌊",
    sections: [
      { 
        name: "Liquid Seaweed", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/1090-6204_Marshalls-Liquid-Seaweed-1-Litre-6.jpeg",
        description: "Think of this as a quick health 'boost'. Perfect for new plantings, stressed plants, or a quick spring pick-me-up.",
        proTip: "Apply to the leaves (foliar feeding) early in the morning for the fastest absorption and great as a soil drench.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "The Long Game",
    icon: "⏳",
    sections: [
      { 
        name: "Slow-Release Granular", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/shutterstock_1087283084.jpg",
        description: "The backbone of your garden. These broken-down pellets feed your plants steadily over 3-4 months.",
        proTip: "In Auckland, apply these in early Spring and early Autumn when the rain will help wash them into the clay.",
        objectPosition: "center"
      }
    ]
  },
  {
    title: "Nutrient Balance",
    icon: "🍋",
    sections: [
      { 
        name: "Correcting Yellow Leaves", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/Epsom_salt_for_gardeners_grande.jpeg",
        description: "If your leaves are turning yellow but the veins stay green (Interveinal Chlorosis), your plant is likely 'Magnesium hungry'. This is very common with Citrus and Gardenias in local soils.",
        proTip: "Dissolve 1 tablespoon of Epsom Salts in a 10L watering can for a quick green-up (alternatively purchase Magenesium Chelate and apply as a liquid drench or spray).",
        objectPosition: "center"
      }
    ]
  }
];

export default function FeedingGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Feeding</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Nutrition for Auckland Gardens</p>
      </header>

      <div className="space-y-10">
        {feedingCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.sections.map((item) => (
                <div key={item.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* IMAGE SLOT */}
                  <div className="h-52 w-full bg-gray-50 border-b border-gray-50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.objectPosition }}
                      onError={(e) => { 
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">
                      {item.description}
                    </p>
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/30">
                      <p className="text-[10px] font-bold text-blue-900 leading-snug">
                        <span className="uppercase mr-2 font-black text-[8px] opacity-50">Pro Tip</span> 
                        {item.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/pests/page.tsx">
'use client'
import { useState } from "react";
import Navigation from "../../../components/Navigation";
import Link from "next/link";

const pestList = [
  { name: "Aphids", note: "Small sap suckers on buds/new leaves. Spray with Plant Soap and Neem oil.", type: "Insect", solution: "Plant Soap + Neem" },
  { name: "Black Spot", note: "Common fungal disease, especially on Roses. Dark brown/black spots.", type: "Fungal", solution: "Yates Super Shield + Thrive" },
  { name: "Camellia Flower Blight", note: "Remove diseased blooms. Apply fresh mulch in spring to stop spore spread.", type: "Fungal", solution: "Fungicidal Soil Drench" },
  { name: "Caterpillars", note: "Look for holes in middle of leaves. Pick off by hand or use specialized spray.", type: "Insect", solution: "Manual removal / Kiwicare" },
  { name: "Citrus Scab", note: "Rough, scabby growth on fruit and leaves. Common in Auckland humid weather.", type: "Fungal", solution: "Copper Spray" },
  { name: "Mealybug", note: "White cotton-like clusters. Look for 'Sooty Mould' as a sign they are present.", type: "Insect", solution: "Neem + Plant Soap" },
  { name: "Mildew", note: "White powdery coating on leaves. Often caused by poor air circulation.", type: "Fungal", solution: "Fungicide / Improve airflow" },
  { name: "Mites (Spider Mites)", note: "Tiny pests causing yellowing/mottled leaves. Loves hot, dry spots.", type: "Insect", solution: "Mite-specific spray" },
  { name: "Scale Insects", note: "Tiny sap suckers with protective shells. Often found on stems.", type: "Insect", solution: "Horticultural Oil / Neem" },
  { name: "Slugs & Snails", note: "Eats leaves from outer edge in. Loves Ligularia and Hibiscus.", type: "Pest", solution: "Snail Pellets / Quash" },
  { name: "Sooty Mould", note: "Black 'soot' on leaves. Actually a fungus growing on pest 'honeydew'.", type: "Fungal", solution: "Kill the insects first!" },
  { name: "Thrips", note: "Causes silvering of leaves with black dots. Common on Ficus and Rhododendrons.", type: "Insect", solution: "Imidacloprid (Bad) or Neem (Mild)" },
  { name: "Whitefly", note: "Tiny white flying insects. Can be very damaging. Look under leaves.", type: "Insect", solution: "Neem + Plant Soap" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function PestsDetail() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Pests & Diseases</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Diagnosis & Cures</p>
      </header>

      <div className="grid gap-3">
        {pestList.map((pest) => (
          <div key={pest.name} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{pest.name}</h3>
                <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase ${pest.type === 'Fungal' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                  {pest.type}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight mb-3 italic">{pest.note}</p>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider border border-green-100">
                  ✔ {pest.solution}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/planting/page.tsx">
'use client'
import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, Search, Shovel, Droplets, 
  Wind, ShieldCheck, AlertTriangle, CheckCircle2, XCircle,
  ThermometerSun, Sprout, Car, ArrowLeft 
} from 'lucide-react';

export default function PlantingGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 bg-white font-sans text-slate-900">
      
      {/* NAVIGATION - BACK TO GUIDES */}
      <nav className="mb-8">
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Guides</span>
        </Link>
      </nav>

      {/* HEADER */}
      <header className="mb-12 border-b border-slate-100 pb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">
          Auckland Planting Guide
        </h1>
        <p className="text-slate-600 font-bold leading-relaxed max-w-2xl">
          Before you plant, make sure to get the right plants for your area. For site-specific selection (sun, soil, drainage), use the Plant Match Maker. This guide focuses on what to do once you’ve chosen your plants.
        </p>
      </header>

      <div className="space-y-16">
        
        {/* SECTION 1: SOURCING & HEALTH */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">1</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Sourcing Healthy Plants</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] flex flex-col">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><ShoppingBag size={14}/> Reputable Nurseries</h3>
              <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">Look for nurseries that grow locally, keep stock well-watered, and space plants properly. Avoid plants that have been sitting dry or crowded.</p>
              
              <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200 mb-4 flex items-start gap-3">
                <Car className="text-amber-600 shrink-0" size={18} />
                <p className="text-[11px] font-black text-amber-800 uppercase tracking-tight leading-snug">
                  Bonus Tip: Ensure plants are in a covered vehicle or trailer if travelling back via a motorway to prevent wind-burn.
                </p>
              </div>

              <div className="mt-auto bg-white p-4 rounded-2xl border border-slate-100 text-[11px] font-bold text-green-700 uppercase tracking-tight">
                Once home, plant as soon as possible. Keep them watered and out of hot sun/wind until they are in the ground.
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem]">
              <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Search size={14}/> Quality Check</h3>
              <div className="flex gap-4">
                <div className="space-y-3 flex-1">
                  <p className="text-[11px] font-bold uppercase text-slate-400">✅ Look For:</p>
                  <p className="text-xs font-bold leading-relaxed">New growth, especially healthy new growth is a great sign (new growth usually has a lighter colour leaf compared to the rest of the plant).</p>
                  <img 
                    src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20growth%20image.png" 
                    alt="New growth diagram" 
                    className="rounded-xl border border-slate-200 w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <p className="text-[11px] font-bold uppercase text-slate-400">❌ Avoid:</p>
                <p className="text-xs font-bold leading-relaxed text-red-700">Yellow/brown leaves, black spots, wilted growth, pests, mushy soil, or broken stems.</p>
                <p className="text-[11px] font-bold uppercase text-slate-400 mt-4">🧪 Roots:</p>
                <p className="text-xs font-bold leading-relaxed">Should be light colored. Avoid heavily root-bound plants where roots wrap tightly around the pot.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE PREP */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">2</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Before You Dig</h2>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[2rem] space-y-6">
            <p className="text-sm font-bold leading-relaxed text-slate-600">
              Check for underground services (water, power, gas, irrigation). Ensure you are planting in the right position for sun and space—refer back to the Plant Match Maker for spacing rules.
            </p>
            <div className="border-l-4 border-amber-400 pl-6 py-2">
                <h4 className="font-black uppercase text-xs mb-2">The Auckland Clay/Drainage Test</h4>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    If you have heavy clay, fill your hole with water. If it hasn't drained after 1–2 hours, you must improve drainage or plant slightly higher than the ground level. Remember that clay soil has it's benefits (it holds nutrients and moisture), just make sure to add garden mix (organic matter) and it will improve over time!
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: PLANTING PROCESS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">3</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">The Planting Process</h2>
          </div>

          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Shovel size={14}/> 1. Digging & Root Prep</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Dig the hole the same depth as the root ball and slightly wider. Loosen the soil at the bottom of the hole to help the roots establish. 
                            <br/><br/>
                            <strong>If root bound:</strong> Gently loosen the roots with your hands or make a few vertical cuts.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2 text-slate-400"><Sprout size={14}/> 2. Soil & Backfill</h3>
                        <p className="text-xs font-bold leading-relaxed text-slate-600">
                            Have good quality garden mix on hand. Backfill using a mix of your existing soil and garden mix. <strong>Do not replace all the soil with compost;</strong> this helps the plant adapt.
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Ideal Planting Depth & Prep</p>
                    <img 
                      src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_Generated_Image_4x0g9e4x0g9e4x0g.png" 
                      alt="Planting depth diagram" 
                      className="rounded-2xl shadow-sm mx-auto"
                    />
                </div>
            </div>

            {/* RE-DESIGNED STEP-BY-STEP BOX */}
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl border border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900"><CheckCircle2 size={20}/></div>
                    <h3 className="font-black uppercase text-sm tracking-[0.2em] text-emerald-400">Step-by-Step Planting</h3>
                </div>
                <div className="grid gap-6">
                    {[
                        { num: '01', text: 'Place root ball level with ground' },
                        { num: '02', text: 'Backfill with soil mix & gently firm/compact soil with hands or standing on soil' },
                        { num: '03', text: 'Water thoroughly; middle of plant and area surrounding plant' },
                        { num: '04', text: 'Now is a good time for a liquid (seaweed) feed and a light handful of granular slow release fertiliser' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                            <span className="text-emerald-500/50 font-black italic text-lg leading-none pt-1">{step.num}</span>
                            <span className="text-xs font-bold uppercase tracking-widest leading-relaxed text-slate-300 group-hover:text-white transition-colors">{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AFTERCARE */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-black">4</div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Establishing Your Plant</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Droplets size={14}/> Watering & Feeding</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Water is critical for 2-8 weeks. Apply slow-release granules around the base, but <strong>never directly against the stem</strong>.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <img src="https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/garden%20assets/plant%20vectors/Gemini_planting%20guide%20v1%20fert%20image.png" alt="Fertilizer placement" className="rounded-2xl border border-slate-100 shadow-sm" />
                </div>
            </div>
            <div className="space-y-6">
                <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 flex items-center gap-2"><Wind size={14}/> Staking & Wind</h3>
                <p className="text-xs font-bold leading-relaxed text-slate-600">
                    Stake tall plants or hedge plants in wind-exposed areas. Use soft ties and allow slight movement. Remove stakes once established.
                </p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 p-8 rounded-[2rem] border border-green-100 flex gap-6 items-center">
            <div className="hidden lg:block text-4xl">🍂</div>
            <div>
                <h3 className="font-black uppercase text-xs tracking-widest text-green-800 mb-2">Mulching (Highly Recommended)</h3>
                <p className="text-xs font-bold text-green-700 leading-relaxed">
                    Apply mulch 50–75mm thick. Keep it away from the stem. Mulch retains moisture, reduces weeds, and protects roots.
                </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: AUCKLAND SPECIFIC */}
        <section className="bg-slate-50 p-8 rounded-[2rem]">
            <h3 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-6 flex items-center gap-2"><ThermometerSun size={14}/> Auckland Specific Notes</h3>
            <ul className="grid lg:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                <li className="flex gap-2"><span>•</span> Best planting times: Autumn and Spring</li>
                <li className="flex gap-2"><span>•</span> Avoid extreme heat or very wet conditions</li>
                <li className="flex gap-2"><span>•</span> Clay soils are common — but don't panic clay is good! It holds nutrients and moisture.</li>
                <li className="flex gap-2"><span>•</span> Wind exposure is a major factor for young plants</li>
            </ul>
        </section>

        {/* DO & DON'T */}
        <section className="grid lg:grid-cols-2 gap-8 border-t border-slate-100 pt-16">
            <div className="p-8 bg-green-50 rounded-3xl">
                <h3 className="text-green-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><CheckCircle2 size={16}/> The Do's</h3>
                <ul className="text-[11px] font-bold text-green-800 space-y-3">
                    <li>• Choose healthy plants</li>
                    <li>• Loosen the root ball if bound</li>
                    <li>• Use garden mix with existing soil</li>
                    <li>• Water in thoroughly</li>
                    <li>• Stake tall or exposed plants</li>
                    <li>• Monitor closely for the first few weeks</li>
                </ul>
            </div>
            <div className="p-8 bg-red-50 rounded-3xl">
                <h3 className="text-red-700 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><XCircle size={16}/> The Don'ts</h3>
                <ul className="text-[11px] font-bold text-red-800 space-y-3">
                    <li>• Don't plant too deep</li>
                    <li>• Don't leave roots tightly bound</li>
                    <li>• Don't use compost as backfill</li>
                    <li>• Don't forget to water after planting</li>
                    <li>• Don't over-fertilize at planting time</li>
                    <li>• Don't pile up mulch around the stem</li>
                </ul>
            </div>
        </section>

        {/* DISCLAIMER */}
        <footer className="flex gap-4 items-start border-t border-slate-100 pt-12 opacity-50">
            <AlertTriangle size={18} className="text-slate-400 shrink-0"/>
            <p className="text-[10px] font-bold text-slate-800 uppercase leading-loose tracking-wider">
                This guide provides general planting advice only. Always check for underground services before digging. Plant performance depends on site conditions, weather, and ongoing care.
            </p>
        </footer>
      </div>
    </div>
  );
}
</file>

<file path="src/app/lib/stripe.ts">
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Stripe Publishable Key is missing!');
    }
    stripePromise = loadStripe(key || '');
  }
  return stripePromise;
};
</file>

<file path="src/app/plants/actions.ts">
'use server'

import { createSupabaseServer } from "../../supabaseServer";
import { revalidatePath } from "next/cache";

// Action to Add a Plant
export async function addToGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  // 1. Check if this plant is already in the user's garden
  const { data: existing } = await supabase
    .from("user_plants")
    .select("id")
    .eq("user_id", user.id)
    .eq("plant_id", plantId)
    .single();

  if (existing) {
    return { success: false, error: "This plant is already in your garden!" };
  }

  // 2. If not, add it
  const { error } = await supabase
    .from("user_plants")
    .insert([
      { user_id: user.id, plant_id: plantId }
    ]);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}

// Action to Remove a Plant
export async function removeFromGarden(plantId: string) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("user_plants")
    .delete()
    .eq("user_id", user.id)
    .eq("plant_id", plantId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/plants/${plantId}`);
  return { success: true };
}
</file>

<file path="src/app/globals.css">
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
</file>

<file path="src/components/Diary/PhotoUploader.tsx">

</file>

<file path="src/components/Diary/TaskBadge.tsx">
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Check, X } from 'lucide-react'

export default function TaskBadge({ taskName, actionIcon, onComplete }: any) {
  const [status, setStatus] = useState<'idle' | 'animating' | 'completed'>('idle')
  const [showPhoto, setShowPhoto] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const handleStart = () => {
    setStatus('animating')
    setTimeout(() => {
      setStatus('completed')
      if (onComplete) onComplete()
    }, 1500)
  }

  if (status === 'completed') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/50 border border-white p-3 px-6 rounded-full flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 p-1 rounded-full"><Check size={12} strokeWidth={4}/></span>
          <span className="text-[11px] font-black uppercase text-green-950 tracking-tight">{taskName}</span>
        </div>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Just now</span>
      </motion.div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-white shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-green-950 uppercase tracking-tighter leading-none">{taskName}</h3>
          <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mt-2">Ready to log</p>
        </div>
        
        <button 
          onClick={() => setShowPhoto(!showPhoto)}
          className={`p-3 rounded-2xl transition-all ${showPhoto ? 'bg-amber-400 text-green-950' : 'bg-green-50 text-green-700'}`}
        >
          <Camera size={18} strokeWidth={3} />
        </button>
      </div>

      {showPhoto && !image && (
        <div className="mb-4 p-4 border-2 border-dashed border-green-100 rounded-2xl flex flex-col items-center">
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id={`file-${taskName}`} 
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if(file) setImage(URL.createObjectURL(file));
                }}
            />
            <label htmlFor={`file-${taskName}`} className="text-[9px] font-black uppercase text-green-700 cursor-pointer">
                + Add Progress Photo
            </label>
        </div>
      )}

      {image && (
        <div className="relative w-full h-32 mb-4 rounded-2xl overflow-hidden border-2 border-white shadow-inner">
            <img src={image} className="w-full h-full object-cover" />
            <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={12}/></button>
        </div>
      )}

      {/* The Hedge Trimmer Animation Area */}
      <div className="relative h-6 bg-green-950 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ left: "-10%" }}
          animate={status === 'animating' ? { left: "100%" } : { left: "-10%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 text-xl z-10"
        >
          {actionIcon}
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={status === 'animating' ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-green-400/40"
        />
      </div>

      <button 
        onClick={handleStart}
        disabled={status === 'animating'}
        className="w-full mt-4 bg-green-800 py-4 rounded-2xl text-[11px] font-black uppercase text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
      >
        {status === 'animating' ? 'Working...' : 'Log Activity'}
      </button>
    </div>
  )
}
</file>

<file path="src/components/GoogleSignIn.tsx">
'use client'

import { createBrowserClient } from '@supabase/ssr'

export default function GoogleSignIn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This ensures the user comes back to your site after Google says OK
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Login error:', error.message)
      alert('Error: ' + error.message)
    }
  }

  return (
    <button 
      onClick={handleLogin}
      className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 p-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="Google logo" 
        className="w-5 h-5"
      />
      <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">
        Continue with Google
      </span>
    </button>
  )
}
</file>

<file path="src/components/PageHelp.tsx">
'use client'

import { useState } from 'react'

interface PageHelpProps {
  title: string;
  description: string;
  bullets?: string[];
  example?: string;
}

export default function PageHelp({ title, description, bullets, example }: PageHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-6 h-6 rounded-full border border-green-200 flex items-center justify-center text-green-600 text-[10px] font-black hover:bg-green-50 transition-colors shadow-sm"
      >
        i
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-green-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-green-900 uppercase italic tracking-tighter mb-4">
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">
              {description}
            </p>
            
            {bullets && (
              <ul className="space-y-2 mb-4">
                {bullets.map((b, i) => (
                  <li key={i} className="text-[11px] text-gray-500 flex gap-2 items-start">
                    <span className="text-green-500">•</span> {b}
                  </li>
                ))}
              </ul>
            )}

            {example && (
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 mb-6">
                <p className="text-[10px] text-green-800 font-bold uppercase tracking-widest mb-1">Example</p>
                <p className="text-[11px] text-green-700 italic leading-relaxed">{example}</p>
              </div>
            )}

            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-green-900 text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
</file>

<file path="src/components/QuickAddButton.tsx">
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function QuickAddButton({ plantId, plantName }: { plantId: number, plantName: string }) {
  const [adding, setAdding] = useState(false)
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() 
    
    setAdding(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to add plants!")
      setAdding(false)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Check if the user is PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single();

    // 2. If not Pro, count their current plants
    if (!profile?.is_pro) {
      const { count, error: countError } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden Full! Free accounts are limited to 3 plants. Upgrade to Pro for unlimited garden space!");
        setAdding(false)
        return; // Stop here!
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: user.id, 
        plant_id: plantId, 
        is_project: false, 
        status: 'Ongoing' 
      }])

    if (!error) {
      alert(`Added ${plantName} to your garden! 🌿`)
    } else {
      console.error("Error adding plant:", error.message)
    }
    
    setAdding(false)
  }

  return (
    <button 
      onClick={handleQuickAdd}
      disabled={adding}
      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
        adding ? 'bg-gray-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
      }`}
    >
      <span className="text-xl font-black">{adding ? '...' : '+'}</span>
    </button>
  )
}
</file>

<file path="src/proxy.ts">
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// We are naming the function 'proxy' and exporting it as the default
// This satisfies the Next.js 16/Turbopack "proxy" requirement
export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This is the "Heartbeat" that prevents the auto-logout
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
</file>

<file path="src/supabaseServer.ts">
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServer() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // This can be ignored if called from a Server Component
          }
        },
      },
    }
  )
}
</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
</file>

<file path="capacitor.config.ts">
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pocketgardener.app',
  appName: 'Pocket Gardener',
  webDir: 'out', // Changed from 'public' to 'out'
  server: {
    androidScheme: 'https'
  }
};

export default config;
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

<file path="public/manifest.json">
{
  "name": "Pocket Gardener",
  "short_name": "Pocket Gardener",
  "description": "Garden management for Aucklanders.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#2d5a3f",
  "theme_color": "#2d5a3f",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
</file>

<file path="src/app/api/checkout/route.ts">
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin") ?? "";
    const cookieStore = await cookies(); // Next.js 15+ requirement

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
      },
      line_items: [
  {
    price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, 
    quantity: 1,
  },
],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
</file>

<file path="src/app/api/identify/route.ts">
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const apiKey = process.env.PLANTID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const response = await fetch("https://plant.id/api/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify({
        images: [base64Image],
        latitude: -36.8485,
        longitude: 174.7633,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { error: "Plant.id request failed", details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
</file>

<file path="src/app/guides/tools/page.tsx">
'use client'

import Navigation from "../../../components/Navigation";
import Link from "next/link";

const toolCategories = [
  {
    title: "Weeding & Detail",
    icon: "🌱",
    tools: [
      { 
        name: "Japanese Niwashi", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/niwashi-traditional-right.jpeg",
        description: "The ultimate tool for Auckland clay. The angled blade cuts through weeds at the root and breaks up hard ground with ease.",
        proTip: "Keep the inner edge sharp with a whetstone for effortless weeding.",
        // Default centering is fine here
        objectPosition: "center center"
      }
    ]
  },
  {
    title: "Trimming & Shaping",
    icon: "✂️",
    tools: [
      { 
        name: "Pole Hedge Trimmers", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/Pole%20hedge%20trimmer.png",
        description: "Essential for keeping hedges like Griselinia or Pittosporum square without needing a ladder.",
        proTip: "Long-reach poles save your back and ensure a straighter line on tall boundary hedges.",
        // Shift view down to show the head/mechanism
        objectPosition: "top center" 
      }
    ]
  },
  {
    title: "Digging & Planting",
    icon: "⛏️",
    tools: [
      { 
        name: "Trench Spade", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/trench%20spade.jpg",
        description: "A narrow, heavy-duty spade. Perfect for digging precise holes in tight spots or transplanting established plants.",
        proTip: "The slim profile makes it much easier to slice through thick roots than a standard square spade.",
        // Lift view up to show the spade head
        objectPosition: "bottom center" 
      }
    ]
  },
  {
    title: "Pruning",
    icon: "🌳",
    tools: [
      { 
        name: "Bypass Secateurs", 
        image: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/guides/GTO-SCLH-burgon-and-ball-left-handed-bypass-secateurs-02.jpeg",
        description: "Your everyday companion for clean cuts on living stems.",
        proTip: "Always choose bypass (scissor-action) over anvil style to avoid crushing the plant's 'veins'.",
        // Default centering is fine here
        objectPosition: "center center"
      }
    ]
  }
];

export default function ToolsGuide() {
  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-[10px] font-black uppercase tracking-widest text-green-700 mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">The Tool Kit</h1>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Recommended for Auckland Gardens</p>
      </header>

      <div className="space-y-8">
        {toolCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h2 className="text-[10px] font-black text-green-800 uppercase tracking-[0.3em]">{category.title}</h2>
            </div>
            
            <div className="space-y-6">
              {category.tools.map((tool) => (
                <div key={tool.name} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group">
                  {/* TOOL IMAGE CONTAINER */}
                  <div className="h-60 w-full bg-gray-50 border-b border-gray-100 overflow-hidden relative">
                    <img 
                      src={tool.image} 
                      alt={tool.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        // Apply the custom object position from the tool data
                        objectPosition: tool.objectPosition || 'center' 
                      }}
                      onError={(e) => { 
                        // Using Privet as the ultimate fallback
                        e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg"; 
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-gray-800 uppercase italic tracking-tight text-xl leading-none">{tool.name}</h3>
                      <span className="bg-orange-50 text-orange-600 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Essential</span>
                    </div>
                    
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-5 font-medium">
                      {tool.description}
                    </p>
                    
                    <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                      <p className="text-[11px] font-bold text-green-800 leading-snug">
                        <span className="uppercase mr-2 font-black text-[9px] text-green-900/40">Pro Tip</span> 
                        {tool.proTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/guides/weeds/page.tsx">
'use client'
import { useState, useEffect } from "react";
import { createBrowserClient } from '@supabase/ssr'
import Navigation from "../../../components/Navigation";
import Link from "next/link";

export default function WeedsDetail() {
  const [weeds, setWeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchWeeds() {
      const { data, error } = await supabase
        .from('weeds')
        .select('*')
        .order('name', { ascending: true });
      
      if (data) setWeeds(data);
      setLoading(false);
    }
    fetchWeeds();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40">
      <header className="mb-8 pt-4">
        <Link href="/guides" className="text-green-800 text-[10px] font-black uppercase tracking-widest mb-2 block">← Back to Guides</Link>
        <h1 className="text-3xl font-black text-green-900 italic uppercase leading-none">Common Weeds</h1>
        <p className="text-xs text-gray-500 font-bold mt-1">Identification & Eradication</p>
      </header>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-sm aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={selectedImage} className="w-full h-full object-cover" alt="Enlarged weed" />
            <button className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full font-bold">✕</button>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2.5rem] mb-8">
        <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-2">Expert Tip</h4>
        <p className="text-xs text-amber-900/80 leading-relaxed font-medium italic">
          "Stump Pasting" means applying herbicide to the fresh cut within 30 seconds.
        </p>
      </div>

      <div className="grid gap-3">
        {loading ? (
          <p className="text-center text-xs font-bold text-gray-400 py-10 uppercase tracking-widest">Loading Weeds...</p>
        ) : (
          weeds.map((weed) => (
            <div key={weed.id} className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors">
              <button 
                onClick={() => setSelectedImage(weed.image_url)}
                className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden border border-gray-100 relative group"
              >
                <img 
                  src={weed.image_url || "/placeholder-weed.jpg"} 
                  className="w-full h-full object-cover" 
                  alt={weed.name}
                  onError={(e) => { e.currentTarget.src = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/privet.jpeg" }}
                />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{weed.name}</h3>
                  <span className="text-[7px] font-black bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 uppercase">{weed.type}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 leading-tight font-medium">{weed.note}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/lib/supabaseClient.ts">
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
</file>

<file path="src/app/match/page.tsx">
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Sun, Droplets, Ruler, ChevronRight, Plus, X, Shovel } from 'lucide-react'
import Navigation from "../../components/Navigation"
import PlantThumbnail from "../../components/PlantThumbnail"
import PageHelp from '../../components/PageHelp'

// Configuration for Visual Sliders
const SUN_OPTIONS = ['Full Sun', 'Part Shade', 'Full Shade'];
const SOIL_OPTIONS = ['Healthy/loam', 'Clay', 'Sandy', 'Potting Mix'];
const WATER_OPTIONS = ['Holds Water', 'Drains Well', 'Dry', 'Under a Roof'];
const SIZE_OPTIONS = ['<1m', '1-2m', '2-4m', '4m+'];

// Visual Asset Mapping
const SUN_IMAGES = [
  'https://img.freepik.com/free-photo/penang-malaysia-march-25-2024_58702-16918.jpg?semt=ais_incoming&w=740&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80',
  'https://www.juliebawdendavis.com/wp-content/uploads/2024/05/Shade-Garden-plant-and-flower-in-garden-zone-at-coffee-cafe-ou-2023-11-27-05-18-40-utc-1024x683.jpg'
];

const SOIL_IMAGES = [
  'https://www.familyhandyman.com/wp-content/uploads/2021/12/GettyImages-1411589688.jpg?fit=700,700', // Loam
  'https://www.telegraph.co.uk/content/dam/gardening/2016/03/02/clay_trans_NvBQzQNjv4Bq2tiKoEXXnMogTwbjBHNCEqNpFR3XzR3Ec7ZpvUpPAOA.jpg?imwidth=640', // Clay
  'https://images.ctfassets.net/3s5io6mnxfqz/2NtZAbCMNH8DDAY7GQz2Gu/83ae589dc93ee115cc1b74bfb7c1db99/AdobeStock_271102263_2.jpeg', // Sandy
  'https://www.marthastewart.com/thmb/9L878wbTxNsqMSkH1BXUlpmcZH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-22093204211-c155b91cf01d45168b0170cbf938368d.jpg' // Potting Mix
];

const WATER_IMAGES = [
  'https://www.saga.co.uk/helix-contentlibrary/saga/magazine/articles/2024/july/gettyimages-945124834-how-to-cope-with-waterlogged-soil_hero.jpg', // Holds Water
  'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/hgic_soils_soil_cross_section_1600.jpg?itok=B6yNaByH', // Drains Well
  'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2010/04/dry_soil/9670553-3-eng-GB/Dry_soil_pillars.jpg', // Dry
  'https://www.thespruce.com/thmb/Z4V-26SsiT_2Qul7tsZya5XeZPg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1198218813-e5051f347a814c2ab5d6129b2cdc2ead.jpg' // Under a Roof
];

const SIZE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20small.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20mdeiium.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20hedge.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20tree.png'
];

export default function MatchPage() {
  const [sunIdx, setSunIdx] = useState(0);
  const [soilIdx, setSoilIdx] = useState(0);
  const [waterIdx, setWaterIdx] = useState(1);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAddToProject = async (plantId: string) => {
    const { error } = await supabase.from('project_plants').insert([{ plant_id: plantId }]);
    if (!error) { alert('Added to your project!'); setSelectedPlant(null); }
  }

  useEffect(() => {
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement', [SUN_OPTIONS[sunIdx]])
        .contains('soil_type', [SOIL_OPTIONS[soilIdx]])
        .contains('water_behavior', [WATER_OPTIONS[waterIdx]])
        .contains('mature_size', [SIZE_OPTIONS[sizeIdx]])
      
      if (data) setMatches([...data].sort((a, b) => (a.common_name || "").localeCompare(b.common_name || "")))
      setLoading(false)
    }
    getLiveMatches()
  }, [sunIdx, soilIdx, waterIdx, sizeIdx, supabase])

  return (
    <main className="min-h-screen bg-[#f0f4f1] text-gray-900 pb-40">
      <div className="max-w-2xl mx-auto p-6">
        
        <header className="mb-8 pt-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">The Matchmaker</h1>
            <p className="text-[10px] text-green-700/60 font-black uppercase tracking-[0.2em] mt-2">Precision planting</p>
          </div>
          <PageHelp title="Matchmaker" description="Slide to see what thrives." bullets={["4 Dynamic sliders"]} />
        </header>

        <div className="space-y-10 mb-12">
          {/* SUN SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Sun size={14}/> Sun Exposure</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SUN_OPTIONS[sunIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SUN_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: sunIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="2" step="1" value={sunIdx} onChange={(e) => setSunIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* SOIL SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Shovel size={14}/> Soil Type</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SOIL_OPTIONS[soilIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SOIL_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: soilIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="3" step="1" value={soilIdx} onChange={(e) => setSoilIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* DRAINAGE SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Droplets size={14}/> Drainage</label>
              <span className="text-xs font-black italic uppercase text-green-950">{WATER_OPTIONS[waterIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {WATER_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: waterIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="3" step="1" value={waterIdx} onChange={(e) => setWaterIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* MATURE SIZE SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Ruler size={14}/> Mature Size</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SIZE_OPTIONS[sizeIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-white">
              {SIZE_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-500 ease-out" 
                  style={{ 
                    backgroundImage: `url("${url}")`, 
                    opacity: sizeIdx === i ? 1 : 0,
                    transform: sizeIdx === i ? 'scale(1)' : 'scale(0.9)' 
                  }} 
                />
              ))}
              <input type="range" min="0" max="3" step="1" value={sizeIdx} onChange={(e) => setSizeIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-green-900/10 rounded-full appearance-none cursor-pointer accent-green-900 z-10" />
            </div>
          </div>
        </div>

        {/* RESULTS LIST */}
        <section className="relative pt-8 border-t border-green-900/5">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">Recommended ({matches.length})</h3>
            {loading && <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin"></div>}
          </div>
          <div className="space-y-3">
            {matches.map((p) => (
              <button key={p.id} onClick={() => setSelectedPlant(p)} className="w-full flex items-center justify-between p-4 bg-white rounded-[2rem] border border-transparent shadow-sm active:scale-[0.98] transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0"><PlantThumbnail plant={p} size="sm" /></div>
                  <div><span className="font-black text-green-950 text-sm uppercase block leading-none mb-1">{p.common_name}</span><span className="text-[10px] text-gray-400 font-bold uppercase italic">{p.plant_type}</span></div>
                </div>
                <ChevronRight size={18} className="text-gray-300"/>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL POPUP */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <div className="absolute inset-0 bg-green-950/60 backdrop-blur-sm" onClick={() => setSelectedPlant(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden animate-in slide-in-from-bottom-10">
            <button onClick={() => setSelectedPlant(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mb-4 shadow-xl"><PlantThumbnail plant={selectedPlant} size="lg" /></div>
              <h2 className="text-2xl font-black text-green-950 uppercase italic leading-none">{selectedPlant.common_name}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase italic mt-2">{selectedPlant.botanical_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-[#f0f4f1] p-4 rounded-2xl"><p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Growth</p><p className="text-sm font-bold text-green-950">{selectedPlant.mature_size?.[0] || SIZE_OPTIONS[sizeIdx]}</p></div>
               <div className="bg-[#f0f4f1] p-4 rounded-2xl"><p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Type</p><p className="text-sm font-bold text-green-950">{selectedPlant.plant_type || 'Shrub'}</p></div>
            </div>
            <button onClick={() => handleAddToProject(selectedPlant.id)} className="w-full bg-amber-400 text-green-950 font-black uppercase py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
              <Plus size={16} strokeWidth={3} /> Add to Project
            </button>
          </div>
        </div>
      )}
      <Navigation />
    </main>
  )
}
</file>

<file path="src/components/AddPlantButton.tsx">
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function AddPlantButton({ plantId }: { plantId: number }) {
  const [loading, setLoading] = useState<'owned' | 'project' | null>(null)
  const [isAdded, setIsAdded] = useState(false)
  const [checking, setChecking] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkExisting() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data } = await supabase
          .from('user_plants')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('plant_id', plantId)
          .maybeSingle()

        if (data) setIsAdded(true)
      }
      setChecking(false)
    }
    checkExisting()
  }, [plantId, supabase])

  async function handleAdd(isProject: boolean) {
    setLoading(isProject ? 'project' : 'owned')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      alert("Please log in to add plants!")
      setLoading(null)
      return
    }

    // --- NEW: LIMIT CHECK START ---
    // 1. Fetch the user's profile to see if they are PRO
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', session.user.id)
      .single();

    // 2. If not Pro, count their current entries (including projects)
    if (!profile?.is_pro) {
      const { count } = await supabase
        .from('user_plants')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (count !== null && count >= 3) {
        alert("🌿 Garden limit reached! Free accounts can only track 3 plants. Upgrade to Pro for unlimited garden space!");
        setLoading(null);
        return; // Stop the process here
      }
    }
    // --- NEW: LIMIT CHECK END ---

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        user_id: session.user.id, 
        plant_id: plantId,
        is_project: isProject 
      }])

    if (!error) {
      setIsAdded(true)
    } else {
      alert("Error: " + error.message)
    }
    setLoading(null)
  }

  if (checking) return <div className="w-full h-[70px] bg-gray-50 animate-pulse rounded-[2.5rem]" />

  // IF ALREADY ADDED: Show confirmation
  if (isAdded) {
    return (
      <div className="w-full bg-[#f1f9f4] border border-green-100 py-6 rounded-[2.5rem] flex items-center justify-center gap-3">
        <span className="text-green-600 font-bold">✓</span>
        <span className="text-[11px] font-black text-green-800 uppercase tracking-[0.2em]">In Your Garden</span>
      </div>
    )
  }

  // IF NOT ADDED: Show two options
  return (
    <div className="space-y-4">
      <button 
        onClick={() => handleAdd(false)}
        disabled={loading !== null}
        className="w-full bg-[#2d5a3f] text-white py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'owned' ? 'Adding...' : '+ Add to My Garden'}
      </button>

      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-100 flex-grow"></div>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">or</span>
        <div className="h-px bg-gray-100 flex-grow"></div>
      </div>

      <button 
        onClick={() => handleAdd(true)}
        disabled={loading !== null}
        className="w-full bg-white border border-gray-100 text-gray-400 py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-[11px] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {loading === 'project' ? 'Saving...' : '☆ Future Project'}
      </button>
    </div>
  )
}
</file>

<file path="src/components/PlantThumbnail.tsx">
'use client'

interface PlantThumbnailProps {
  plant: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlantThumbnail({ plant, size = 'md' }: PlantThumbnailProps) {
  // Styles adjusted for better responsiveness and quality control
  const styles = {
    sm: "w-12 h-12 rounded-xl text-xl",
    md: "w-24 h-24 rounded-2xl text-3xl",
    // lg now ensures the image doesn't stretch to infinity on desktop/tablets
    lg: "w-full aspect-square max-w-[500px] rounded-[2rem] text-[100px]"
  };

  // CHECK: Does the plant exist and does it have a non-empty image_url?
  const hasValidImage = plant?.image_url && plant.image_url.trim() !== "";

  return (
    <div className={`${styles[size]} bg-[#f0f7f3] flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner`}>
      {hasValidImage ? (
        <img 
          src={plant.image_url} 
          alt={plant.common_name || 'Plant'} 
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          // If the image link is broken/dead, hide it and show emoji instead
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-emoji');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
      ) : null}

      {/* Fallback Emoji: Hidden by default IF we have an image, but shown if image fails */}
      <div className={`fallback-emoji select-none pointer-events-none absolute inset-0 flex items-center justify-center ${hasValidImage ? 'hidden' : ''}`}>
        {plant?.plant_type === 'Fruit' ? '🍋' : '🌿'}
      </div>
    </div>
  );
}
</file>

<file path="src/components/UpgradeButton.tsx">
'use client';

import { useState } from 'react';

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Call your internal Next.js API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // 2. Redirect to the Stripe URL provided by your API
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error: any) {
      console.error('Stripe Error:', error);
      alert(error.message || 'Something went wrong with the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-[#2d5a3f] hover:bg-[#1e3d2a] text-white font-bold uppercase tracking-[0.1em] py-3 px-6 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-[11px]"
    >
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          <span>🌿</span>
          <span>Upgrade to Pro ($12.99 per month)</span>
        </>
      )}
    </button>
  );
}
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use 'export' if we are specifically building for Capacitor
  output: process.env.IS_CAPACITOR ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
</file>

<file path="src/app/auth/callback/route.ts">
export const dynamic = 'force-dynamic'; // This tells Next.js NOT to try and make this static
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // We check for a 'next' param, defaulting to dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    
    // Create the response object first so we can attach the session to it
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
                // ADDED: This specific line fixes the mobile/Safari login loop
                response.cookies.set(name, value, options)
              })
            } catch (error) {
              // This catch is fine, but on iPhones, if this fails, the loop starts
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: Using the response object we created above
      return response
    }

    console.error("❌ HANDSHAKE ERROR:", error.message)
  }

  // FAIL: If no code or exchange failed, send back to login
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
</file>

<file path="src/app/identify/page.tsx">
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
import PageHelp from '../../components/PageHelp'

export default function IdentifyPage() {
  const [plants, setPlants] = useState<any[]>([])
  const [userPlantIds, setUserPlantIds] = useState<Set<number>>(new Set())
  const [filteredPlants, setFilteredPlants] = useState<any[]>([])
  
  // Filter States
  const [typeFilter, setTypeFilter] = useState('')
  const [isNative, setIsNative] = useState('')
  const [flowerColor, setFlowerColor] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      
      // 1. Fetch all master plants
      const { data: allPlants } = await supabase.from('plants').select('*')
      
      if (allPlants) {
        // DEDUPLICATION LOGIC: Only keep the first instance of each plant name
        const uniqueMap = new Map();
        allPlants.forEach(p => {
          const name = p.common_name.trim();
          if (!uniqueMap.has(name)) {
            uniqueMap.set(name, p);
          }
        });
        setPlants(Array.from(uniqueMap.values()));
      }

      // 2. Fetch user's current plants to show checkmarks
      if (user) {
        const { data: userPlants } = await supabase
          .from('user_plants')
          .select('plant_id')
          .eq('user_id', user.id)
        
        if (userPlants) {
          const ids = new Set(userPlants.map(p => Number(p.plant_id)))
          setUserPlantIds(ids)
        }
      }
    }
    fetchData()
  }, [supabase])

  useEffect(() => {
    let list = [...plants]

    if (typeFilter) list = list.filter(p => p.plant_type === typeFilter)
    if (flowerColor) list = list.filter(p => p.flower_color === flowerColor)
    if (isNative) {
      const nativeBool = isNative === 'Yes'
      list = list.filter(p => p.is_native === nativeBool)
    }

    // Simplified sort to be strictly alphabetical by common_name
    const sortedList = list.sort((a, b) => {
      return a.common_name.localeCompare(b.common_name)
    })

    setFilteredPlants(sortedList)
  }, [typeFilter, isNative, flowerColor, plants])

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Identify</h1>
          <PageHelp 
            title="Identify Plants"
            description="Trying to figure out what is growing in your garden? Use these filters to narrow down the search."
            bullets={[
              "Filter by Category (Hedges, Trees, etc.)",
              "Filter by Native or Exotic status",
              "Filter by Flower Color to match what you see",
              "A checkmark (✓) means the plant is already in your garden"
            ]}
          />
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mt-2">Auckland Plant Finder</p>
      </header>

      {/* FILTERS SECTION */}
      <div className="space-y-3 mb-10">
        <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
          <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Plant Category</label>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {['Hedge', 'Shrub', 'Tree', 'Flower', 'Palm', 'Flax', 'Groundcover', 'Climber', 'Fruit'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Native?</label>
            <select 
              value={isNative}
              onChange={(e) => setIsNative(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Origin</option>
              <option value="Yes">NZ Native</option>
              <option value="No">Exotic</option>
            </select>
          </div>

          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Flowers</label>
            <select 
              value={flowerColor}
              onChange={(e) => setFlowerColor(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Color</option>
              {['White', 'Pink', 'Red', 'Blue', 'Yellow', 'Purple', 'Orange'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2">
          {filteredPlants.length} Plants Found
        </h2>
        
        <div className="grid grid-cols-1 gap-2">
          {filteredPlants.map((plant) => (
            <Link href={`/plants/${plant.id}`} key={plant.id} className="block group">
              <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 group-active:scale-[0.98] transition-all">
                <div className="w-14 h-14 flex-shrink-0">
                  <PlantThumbnail plant={plant} size="sm" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-none truncate">
                        {plant.common_name}
                    </h3>
                    {userPlantIds.has(Number(plant.id)) && (
                      <span className="text-green-500 font-bold text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 italic mt-1 font-medium truncate">
                    {plant.scientific_name}
                  </p>
                </div>
                <div className="text-gray-200 pr-2 group-hover:text-green-600 transition-colors text-lg">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/login/page.tsx">
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // This client handles the "Send" part of the Magic Link
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // CLEAN REDIRECT: We send them to /auth/callback and let the 
    // route handler deal with the final destination to avoid loops.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("❌ Login Error:", error.message)
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Check your email! Your Magic Link is on the way.')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error("❌ Google Error:", error.message)
  }

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl shadow-green-900/5 text-center">
        {/* Branding */}
        <div className="text-5xl mb-8">🌿</div>
        <h1 className="text-3xl font-black text-green-900 mb-2 tracking-tight">Pocket Gardener</h1>
        <p className="text-gray-400 text-sm mb-10 font-medium italic">Save your Auckland garden</p>
        
        {/* Magic Link Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all text-sm font-medium text-gray-700"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-[#2d5a3f] hover:bg-[#254b34] text-white font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending link...' : 'Get Magic Link'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 italic bg-white px-4">
            or
          </div>
        </div>

        {/* Social Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-white border border-gray-100 hover:border-green-200 text-gray-700 font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Feedback Message */}
        {message && (
          <p className={`mt-6 text-xs font-bold p-4 rounded-2xl animate-pulse ${
            message.includes('Error') ? 'text-red-500 bg-red-50' : 'text-green-700 bg-green-50'
          }`}>
            {message}
          </p>
        )}
      </div>

      {/* App Navigation */}
      <Navigation />
      
      <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
        Designed for Auckland Gardeners
      </p>
    </main>
  )
}
</file>

<file path="src/app/layout.tsx">
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Viewport handles the 'zoom' and 'theme color' for the phone's status bar
export const viewport: Viewport = {
  themeColor: "#2d5a3f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 2. Metadata handles the Manifest, Icons, and Apple App settings
export const metadata: Metadata = {
  title: "Pocket Gardener",
  description: "Garden management for Aucklanders.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pocket Gardener",
  },
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
</file>

<file path="src/components/WelcomeOverlay.tsx">
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Only show to brand new visitors
    const hasVisited = localStorage.getItem('hasVisitedGardenApp');
    if (!hasVisited) setIsVisible(true);
  }, []);

  const slides = [
    { 
      title: "Expert Garden Management", 
      desc: "Track every plant in your Auckland garden with custom care schedules.", 
      icon: "🏡" 
    },
    { 
      title: "The Garden Matchmaker", 
      desc: "Find the perfect plants for your specific soil and sun conditions.", 
      icon: "✅" 
    },
    { 
      title: "Gardening Guides", 
      desc: "In-depth local advice for weeds, pests, and Auckland planting seasons.", 
      icon: "📖" 
    },
    { 
      title: "Pro Tip", 
      desc: "Look for the 'i' icon at the top of any page for instant help and tips!", 
      icon: "ℹ️" 
    }
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      localStorage.setItem('hasVisitedGardenApp', 'true');
      setIsVisible(false);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#2d5a3f] flex flex-col items-center justify-center p-8 text-center text-white">
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden text-9xl select-none">
         <div className="absolute -top-10 -left-10 rotate-12">🌿</div>
         <div className="absolute bottom-20 -right-10 -rotate-12">🌳</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-xs relative z-10"
        >
          <div className="text-8xl mb-10 drop-shadow-2xl">{slides[currentSlide].icon}</div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-green-100/80 font-medium leading-relaxed text-sm">
            {slides[currentSlide].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS & BUTTON */}
      <div className="absolute bottom-16 w-full px-10 flex flex-col items-center gap-8">
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/20'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-white text-[#2d5a3f] rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all"
        >
          {currentSlide === slides.length - 1 ? "Start Gardening →" : "Next"}
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/app/about/page.tsx">
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

const getSupabase = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

export default function AboutPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()

    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email ?? null)
          
          // Check Pro Status for the Manage button
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .single()
          
          if (profile) setIsPro(profile.is_pro)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [])

  const handleSignOut = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // NEW: Handle redirection to Stripe Customer Portal
  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true)
      const response = await fetch('/api/portal', { method: 'POST' })
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Could not find an active subscription session.")
      }
    } catch (err) {
      console.error(err)
      alert("Error connecting to billing portal.")
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      <div className="h-[35vh] bg-[#2d5a3f] relative flex items-end justify-center pb-10">
        <button 
          onClick={() => router.back()} 
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold active:scale-90 transition-transform z-20"
        >
          ←
        </button>
        <div className="text-center relative z-10">
          {/* UPDATED LOGO BOX: Matches Dashboard Styling */}
          <div className="w-20 h-20 bg-white rounded-[2rem] mx-auto mb-4 flex items-center justify-center border-2 border-white/50 shadow-2xl overflow-hidden">
            <img 
              src="/pglogo.png" 
              alt="Pocket Gardener Logo"
              className="w-14 h-14 object-contain" 
            />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.1em]">The Pocket Gardener</h1>
        </div>
      </div>

      <div className="px-8 pt-10 space-y-10">
        
        {/* 1. MEMBERSHIP STATUS & PORTAL */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">Subscription</h2>
          <div className="bg-gray-50 p-7 rounded-[2.5rem] border border-gray-100">
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Current Plan</p>
                <p className="text-sm font-bold text-green-900 mb-6">{isPro ? "🌿 Pro Plan" : "Standard Plan"}</p>
                
                {isPro && (
                  <button 
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full py-4 rounded-2xl bg-[#2d5a3f] text-white font-black uppercase tracking-widest text-[9px] shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    {portalLoading ? "Loading Portal..." : "Manage or Cancel Subscription"}
                  </button>
                )}
                {!isPro && (
                   <p className="text-[10px] text-gray-400 italic">Upgrade on your dashboard to unlock all features.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 2. MISSION STATEMENT */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">The Mission</h2>
          <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium italic">
              "To help Aucklanders master their backyards through local, month-by-month advice and simple digital tools."
            </p>
          </div>
        </section>

        {/* 3. SIGN OUT (MOVED TO BOTTOM) */}
        <section className="pt-4">
          <div className="px-1 mb-4 flex justify-between items-center">
             <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Account</h2>
             {userEmail && <span className="text-[9px] font-bold text-gray-400 lowercase italic">{userEmail}</span>}
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full py-4 rounded-2xl bg-white text-red-500 border border-red-100 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
          >
            Sign Out
          </button>
        </section>

        <footer className="pt-4 text-center">
          <p className="text-[8px] font-black text-gray-200 uppercase tracking-[0.4em]">
            v1.0 • Pocket Gardener NZ
          </p>
        </footer>
      </div>

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/success/page.tsx">
'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 1. This component handles the logic and UI
function SuccessContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl animate-bounce">🌿</span>
        </div>

        <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] mb-2 block">
          Payment Received
        </span>
        
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">
          You're All Set!
        </h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed px-4">
          Your garden limits have been lifted. You now have full access to the Plant Identifier, Garden Builder, and all Expert Guides.
        </p>

        <div className="pt-2">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-5 rounded-[1.5rem] shadow-xl shadow-green-900/20 active:scale-95 transition-all text-[11px]"
          >
            Go to My Garden Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Happy Gardening, Auckland
        </p>
        
        <p className="mt-3 text-[8px] text-gray-300 font-bold uppercase tracking-widest">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}

// 2. Main page export with Suspense wrapper
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fbf9] flex items-center justify-center">
        <p className="text-green-900 font-black uppercase tracking-widest text-[11px] animate-pulse">
          Loading Garden Data...
        </p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
</file>

<file path="src/app/page.tsx">
import Link from "next/link";
import { createSupabaseServer } from "../supabaseServer";

export default async function LandingPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Get the current Auckland month (e.g., 4 for April)
  const currentMonthNumber = new Date().getMonth() + 1; 
  const monthName = new Date().toLocaleString('en-NZ', { month: 'long' });
  const monthShort = new Date().toLocaleString('en-NZ', { month: 'short' });

  // 2. Fetch the Expert Advice from Supabase (for the guest preview box)
  const { data: featured } = await supabase
    .from('featured_advice')
    .select('*')
    .eq('month_number', currentMonthNumber)
    .single();

  // 3. Fallback logic for the Expert Advice box
  const displayData = featured || {
    plant_name: "Star Jasmine",
    care_note: "A generally hardy and fast growing vine with fragrant flowers in November, add to your garden to see specific care and plant health advice.",
    image_url: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/star-jasmine-trachelospermum-jasminoides-garden-design_18028.webp",
  };

  // 4. FEATURED GARDEN IMAGE (Pulling from your Garden Archive)
  // This matches your April 2026 featured photo
  const featuredGardenImg = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260129134358.jpg";

  return (
    <main className="min-h-screen bg-[#f8fbf9] text-gray-900">
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/10">
        
        {/* Softened Shadow: from-black/40 instead of heavy green/90 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />
        
        {/* DYNAMIC IMAGE: Now pulls your actual featured garden photo */}
        <img 
          src={featuredGardenImg} 
          alt="Featured Auckland Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-16">
          <div className="flex justify-end">
            {!user && (
              <Link href="/login" className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-green-900 shadow-sm">
                Sign In
              </Link>
            )}
          </div>

          <div className="pb-6">
            <h1 className="text-2xl font-black text-white italic uppercase mb-6 leading-none tracking-tighter [text-shadow:_0_1px_10px_rgb(0_0_0_/_20%)]">
              Featured: {monthName}
            </h1>
            
            <Link 
              href={user ? "/calendar" : "/login"} 
              className="inline-block w-full text-center bg-white text-[#2d5a3f] py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-xl active:scale-95 transition-all"
            >
              {user ? "View My Calendar" : "Start Your Garden"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC GUEST PREVIEW (Advice section) */}
      {!user && (
        <section className="px-8 -mt-10 relative z-30 mb-12">
          <div className="bg-white rounded-[3rem] shadow-xl border border-green-50 overflow-hidden">
             <img 
               src={displayData.image_url} 
               className="w-full h-48 object-cover" 
               alt={displayData.plant_name} 
             />
             
             <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full inline-block mb-3">
                      Expert Advice • {monthShort}
                    </span>
                    <h3 className="text-xl font-black text-gray-800 tracking-tight">
                      {displayData.plant_name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">
                    {displayData.emoji || '🌿'}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed font-medium italic mb-6">
                  "{displayData.care_note}"
                </p>

                <Link href="/login" className="block w-full py-4 bg-gray-50 text-gray-400 text-center rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                  + Add to My Garden
                </Link>
             </div>
          </div>
        </section>
      )}

      {/* 3. CORE FEATURES */}
      <section className="px-8 py-8 space-y-12">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/plants" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Library</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">Plant Finder</p>
          </Link>
          
          <Link href="/guides" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">📖</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Guides</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">In depth guides</p>
          </Link>
        </div>

        <div className="text-center pb-12">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Explore Auckland Favorites</p>
          <Link href="/plants" className="inline-flex items-center gap-3 text-[11px] font-black text-green-800 bg-green-50 px-10 py-5 rounded-full border border-green-100 tracking-widest uppercase shadow-inner">
            A-Z Plant Library ➔
          </Link>
        </div>
      </section>

      <footer className="pb-24 text-center">
         <Link href="/about" className="group inline-flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-all">
           {/* Small, subtle version of your logo instead of the 'Designed by' text */}
           <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all">
             <img 
               src="/pglogo.png" 
               alt="Pocket Gardener" 
               className="w-12 h-12 object-contain"
             />
           </div>
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
             Pocket Gardener • v1.0
           </span>
         </Link>
      </footer>
    </main>
  );
}
</file>

<file path="src/app/guides/page.tsx">
'use client'
import Navigation from "../../components/Navigation";
import Link from "next/link";
import PageHelp from "../../components/PageHelp";
import { Target, ArrowRight } from 'lucide-react'; 

export default function GuidesPage() {
  const categories = [
    { name: "Pests and Diseases", icon: "🐜", href: "/guides/pests", desc: "Diagnosis & Cures" },
    { name: "Garden Tools", icon: "🛠️", href: "/guides/tools", desc: "The Editor's Kit" },
    { name: "Feeding", icon: "🧪", href: "/guides/feeding", desc: "Nutrients & Fertilizers" },
  ];

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-32">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-green-900 leading-none">Expert Guides</h1>
          <PageHelp 
            title="Expert Guides"
            description="Access specialized knowledge for maintaining your Auckland garden throughout the year."
            bullets={[
              "The Planting Masterclass for new additions",
              "Weed identification and removal strategies",
              "Specific guides for pests, tools, and maintenance"
            ]}
          />
        </div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Grow like a pro</p>
      </header>

      {/* FEATURED: PLANTING MASTERCLASS */}
      <section className="mb-6">
        <Link href="/guides/planting" className="block no-underline">
          <div className="bg-[#2d5a3f] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden active:scale-[0.98] transition-all group">
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block text-white">Essential Reading</span>
              <h2 className="text-2xl font-bold mb-2 tracking-tight leading-none">The Ultimate Planting Guide<br/></h2>
              <p className="text-green-100 text-sm mb-6 leading-relaxed opacity-90 max-w-[220px]">
                Give your plants the best chance at success.
              </p>
              <div className="bg-white text-[#2d5a3f] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest inline-block group-hover:bg-green-50 transition-colors">
                Read Guide
              </div>
            </div>
            <span className="absolute -bottom-4 -right-4 text-8xl opacity-10">🪴</span>
          </div>
        </Link>
      </section>

      {/* COMMON WEEDS BUTTON */}
      <section className="mb-4 relative z-10">
        <Link href="/guides/weeds" className="block no-underline">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🥀</div>
              <div>
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Common Weeds</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Identification & Kill Guide</p>
              </div>
            </div>
            <span className="text-gray-200 group-hover:text-amber-600 transition-colors text-xl mr-2">→</span>
          </div>
        </Link>
      </section>

      {/* CATEGORY LIST */}
      <section className="flex flex-col gap-4 relative z-10 mb-12">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={cat.href} 
            className="block no-underline cursor-pointer"
          >
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-active:bg-green-50 transition-colors">{cat.icon}</div>
                <div>
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </div>
              <span className="text-gray-200 group-hover:text-green-600 transition-colors text-xl mr-2">→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* DISCOVERY SECTION */}
      <section className="space-y-4">
        <h2 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
          <span>Discovery Tools</span>
          <span className="h-[1px] bg-green-200 flex-grow"></span>
        </h2>

        <div className="grid grid-cols-1">
          {/* Matchmaker Tool Button */}
          <Link 
  href="/match" // Ensure this matches your actual file path (e.g., /app/matchmaker/page.tsx)
  className="w-full bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all no-underline"
>
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
      <Target className="text-green-800" size={22} />
    </div>
    <div>
      <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Plant Matchmaker</h3>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Find the perfect match for your space</p>
    </div>
  </div>
  <ArrowRight size={14} className="text-gray-200 group-hover:text-green-600 transition-colors mr-2" />
</Link>
        </div>
      </section>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/plants/[id]/page.tsx">
'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from "../../../components/Navigation"
import PlantThumbnail from "../../../components/PlantThumbnail"
import { Check, Search, Sparkles, Quote } from 'lucide-react'

export default function PlantDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const id = params?.id
  const mode = searchParams?.get('mode')

  const [plant, setPlant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [userPlantRecordId, setUserPlantRecordId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [activeRemedyId, setActiveRemedyId] = useState<string | null>(null)
  const [remedies, setRemedies] = useState<any[]>([])
  const [personalNote, setPersonalNote] = useState("")
  const [nickname, setNickname] = useState<string | null>(null)
  const [plantPhotos, setPlantPhotos] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [issueHistory, setIssueHistory] = useState<any[]>([])

  const [quantity, setQuantity] = useState<number>(1)
  const [lengthMetres, setLengthMetres] = useState<string>("")

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const getLevelStyles = (level: string) => {
    const l = level?.toLowerCase();
    if (l === 'hardy' || l === 'high') return { bg: 'bg-[#1B5E20]', text: 'text-white' };
    if (l === 'semi-hardy' || l === 'medium') return { bg: 'bg-[#4CAF50]', text: 'text-white' };
    return { bg: 'bg-[#C8E6C9]', text: 'text-[#1B5E20]' };
  }

  const isHedgePlant = (plant?.task_category || plant?.plant_type || '').toLowerCase() === 'hedge'

  async function fetchIssueHistory(userPlantId: string) {
    const { data } = await supabase
      .from('plant_logs')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setIssueHistory(data)
  }

  async function handleResolveIssue(logId: string) {
    setIsProcessing(true)
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)

    if (!error) {
      if (userPlantRecordId) fetchIssueHistory(userPlantRecordId)
    }
    setIsProcessing(false)
  }

  async function fetchPlantPhotos(userPlantId: string) {
    const { data } = await supabase
      .from('plant_photos')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setPlantPhotos(data)
  }

  async function handleAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userPlantRecordId) return
    try {
      setUploadingPhoto(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${userPlantRecordId}-${Date.now()}.${fileExt}`
      const filePath = `plant-progress/${fileName}`
      await supabase.storage.from('weed-images').upload(filePath, file)
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(filePath)
      const { error } = await supabase.from('plant_photos').insert([{ user_plant_id: userPlantRecordId, photo_url: publicUrl }])
      if (!error) fetchPlantPhotos(userPlantRecordId)
    } catch (err) {
      console.error(err)
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleUpdateNickname() {
    if (!userPlantRecordId) return
    const newNickname = window.prompt(`Give your ${plant.common_name} a nickname:`, nickname || "")
    if (newNickname !== null) {
      const { error } = await supabase.from('user_plants').update({ nickname: newNickname }).eq('id', userPlantRecordId)
      if (!error) setNickname(newNickname)
    }
  }

  useEffect(() => {
    async function fetchPlantAndStatus() {
      if (!id) return

      const { data: plantData } = await supabase.from("plants").select("*").eq('id', id).single()
      if (plantData) setPlant(plantData)

      const { data: remedyData } = await supabase
        .from('plant_remedies')
        .select('*')
        .or(`specific_plant_id.eq.${id},is_universal.eq.true`)

      if (remedyData) setRemedies(remedyData)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userPlantRecord } = await supabase
          .from('user_plants')
          .select('id, personal_notes, nickname, quantity, length_metres')
          .eq('user_id', user.id)
          .eq('plant_id', Number(id))
          .single()

        if (userPlantRecord) {
          setUserPlantRecordId(userPlantRecord.id)
          setPersonalNote(userPlantRecord.personal_notes || plantData?.pro_tip || "")
          setNickname(userPlantRecord.nickname)
          setQuantity(userPlantRecord.quantity || 1)
          setLengthMetres(
            userPlantRecord.length_metres !== null && userPlantRecord.length_metres !== undefined
              ? String(userPlantRecord.length_metres)
              : ""
          )
          fetchIssueHistory(userPlantRecord.id)
          fetchPlantPhotos(userPlantRecord.id)
        } else {
          setQuantity(1)
          setLengthMetres("")
        }
      }

      setLoading(false)
    }

    fetchPlantAndStatus()
  }, [id, supabase])

 async function handleLogIssue(issueType: string, remedyTitle?: string) {
  if (!userPlantRecordId) return
  setIsProcessing(true)

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('plant_logs').insert([{
    user_id: user?.id,
    user_plant_id: userPlantRecordId,
    issue_type: issueType,
    status: 'Ongoing'
  }])

  if (!error) {
    await supabase
      .from('user_plants')
      .update({
        is_sick: true,
        current_issue: issueType,
        current_remedy: remedyTitle || null,
      })
      .eq('id', userPlantRecordId)

    alert(`Logged: ${issueType}. I'll check back in with you in 30 days!`)
    fetchIssueHistory(userPlantRecordId)
  }

  setIsProcessing(false)
}

  async function handleRemove() {
    if (!userPlantRecordId || !window.confirm(`Remove ${plant.common_name}?`)) return
    setIsDeleting(true)
    const { error } = await supabase.from('user_plants').delete().eq('id', userPlantRecordId)
    if (!error) router.push('/dashboard')
    setIsDeleting(false)
  }

  async function handleAddToProject() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const safeQuantity = isHedgePlant
  ? null
  : Number.isFinite(quantity) && quantity > 0
  ? quantity
  : 1

const safeLengthMetres =
  isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
    ? Number(lengthMetres)
    : null

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: Number(id),
  is_project: true,
  status: 'Planning',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}])

    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  async function handleDirectAdd() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const safeQuantity = isHedgePlant
  ? null
  : Number.isFinite(quantity) && quantity > 0
  ? quantity
  : 1

const safeLengthMetres =
  isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
    ? Number(lengthMetres)
    : null

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: Number(id),
  is_project: false,
  status: 'Ongoing',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}])

    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  const filteredRemedies = remedies.filter(r => {
    if (!isSearching) return r.specific_plant_id === Number(id)
    const searchString = (r.issue_type + (r.search_keywords || "") + r.remedy_title).toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(r => r.specific_plant_id === Number(id))
  const universalMatches = filteredRemedies.filter(r => r.is_universal === true && r.specific_plant_id !== Number(id))

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest text-xs">Loading...</div>
  if (!plant) return <div className="p-20 text-center">Plant not found.</div>

  const hardinessStyle = getLevelStyles(plant.hardiness_level)
  const maintenanceStyle = getLevelStyles(plant.maintenance_level)

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      <div className="h-[45vh] bg-[#f0f7f3] relative flex items-center justify-center pt-8 pb-16">
        <button onClick={() => router.back()} className="absolute top-12 left-6 z-30 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-gray-400">←</button>
        <div className="relative z-10 w-48 h-48 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white group">
          <PlantThumbnail
            plant={plantPhotos[0] ? { ...plant, image_url: plantPhotos[0].photo_url } : plant}
            size="lg"
          />
          {userPlantRecordId && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md py-3 text-[8px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {uploadingPhoto ? 'Uploading...' : 'Update Main Photo'}
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="px-8 -mt-10 bg-white rounded-t-[3.5rem] relative z-20 border-t border-gray-100">
        <header className="pt-10 mb-8 relative">
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>

          <div className="absolute top-14 right-0 flex flex-col gap-3 items-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">{plant.hardiness_level}</span>
              <div className={`w-8 h-8 rounded-lg ${hardinessStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${hardinessStyle.text}`}>{plant.hardiness_level?.[0]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">
                {plant.maintenance_level === 'Medium' ? 'moderate care' : `${plant.maintenance_level?.toLowerCase()} care`}
              </span>
              <div className={`w-8 h-8 rounded-lg ${maintenanceStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${maintenanceStyle.text}`}>{plant.maintenance_level?.[0]}</span>
              </div>
            </div>
          </div>

          <div className="pr-32">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-green-900 tracking-tight uppercase italic leading-tight">
                {nickname || plant.common_name}
              </h1>
              {userPlantRecordId && (
                <button onClick={handleUpdateNickname} className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all">
                  <span className="text-[10px] text-gray-400">✎</span>
                </button>
              )}
            </div>
            {nickname && <p className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] mb-1 italic">{plant.common_name}</p>}
            <p className="text-sm font-medium italic text-gray-400">{plant.scientific_name}</p>
          </div>
        </header>

        <section className="mb-10 relative">
          <div className="bg-green-900 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
            <Quote className="absolute -top-2 -left-2 text-white/5 w-24 h-24 rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">The Gardener's View</span>
              </div>
              <p className="text-white text-[15px] font-medium italic leading-relaxed">
                {plant.description || plant.overview || "This plant is a hardy addition to the New Zealand landscape, known for its resilience and unique aesthetic."}
              </p>
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleAddPhoto} className="hidden" accept="image/*" />
        </section>

        <div className="mb-10 flex flex-col items-center gap-4">
          {userPlantRecordId && !mode && (
            <div className="w-full text-center py-4 bg-green-50 rounded-2xl border border-green-100 text-[10px] font-black text-green-700 uppercase tracking-widest italic">
              In Your Garden
            </div>
          )}

          {((mode === 'builder') || (!mode && !userPlantRecordId)) && (
            <div className="w-full bg-gray-50 rounded-[2rem] border border-gray-100 p-5">
              <div className="grid grid-cols-1 gap-4">
  {isHedgePlant ? (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Hedge Length (Lineal Metres)
      </label>
      <input
        type="number"
        min={0}
        step="0.1"
        value={lengthMetres}
        onChange={(e) => setLengthMetres(e.target.value)}
        placeholder="Enter hedge length"
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
      <p className="mt-2 text-[10px] font-bold text-gray-400 italic">
        Hedge tasks use lineal metres rather than plant count.
      </p>
    </div>
  ) : (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Quantity
      </label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
    </div>
  )}

                {!mode && !userPlantRecordId && (
                  <button
                    onClick={handleDirectAdd}
                    disabled={isProcessing}
                    className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all mt-2"
                  >
                    {isProcessing ? 'Adding...' : 'Add to My Garden'}
                  </button>
                )}

                {mode === 'builder' && (
                  <>
                    <button
                      onClick={handleAddToProject}
                      disabled={isProcessing}
                      className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all"
                    >
                      {isProcessing ? 'Adding...' : 'Add to Project List'}
                    </button>

                    <button
                      onClick={handleDirectAdd}
                      disabled={isProcessing}
                      className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] border-b border-green-700/20 pb-1 italic hover:text-green-700 transition-colors"
                    >
                      or add directly to current garden
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="mb-10 px-2">
          <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 underline decoration-green-200 decoration-4 underline-offset-4">Care Requirements</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-2xl pt-1">✂️</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Trimming</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.trim_notes || 'Trim on a seasonal basis or as needed.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🧪</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Feeding</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.feed_notes || 'Liquid and granular feed following trim.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🩺</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Health</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.health_notes || 'Check for signs of wilting or browning (see issues below).'}</p>
              </div>
            </div>
          </div>
        </section>

        {userPlantRecordId && personalNote && (
          <div className="mb-10 p-7 bg-amber-50/40 rounded-[2.5rem] border-2 border-red-200">
            <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] mb-3">💡 Gardener's Pro Tip</h4>
            <p className="w-full text-[13px] text-gray-700 leading-relaxed font-medium italic">{personalNote}</p>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mb-10 px-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em]">⚠️ Common Issues</h4>
              {isSearching && (
                <button onClick={() => { setIsSearching(false); setSearchQuery("") }} className="text-[10px] font-bold text-orange-500 uppercase">Clear</button>
              )}
            </div>

            {isSearching && (
              <div className="mb-4 relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search symptoms (e.g. brown leaf, bugs)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 ring-orange-400"
                />
              </div>
            )}

            <div className="space-y-3">
              {!isSearching && specificMatches.length > 0 ? (
                specificMatches.slice(0, 3).map((r) => (
                  <div key={r.id} className="overflow-hidden">
                    <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                        <span className="text-[7px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Plant Specific</span>
                      </div>
                      <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeRemedyId === r.id && (
                      <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100 animate-in fade-in">
                        <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                        <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                        <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                      </div>
                    )}
                  </div>
                ))
              ) : !isSearching && (
                <div className="text-center py-4 opacity-40 italic text-[11px] text-orange-800 font-bold uppercase tracking-widest">No specific issues listed</div>
              )}

              {isSearching && universalMatches.length > 0 && (
                <>
                  <div className="pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Global Database Results</div>
                  {Array.from(new Map(universalMatches.map(item => [item.issue_type, item])).values()).map((r: any) => (
                    <div key={r.id} className="overflow-hidden">
                      <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex flex-col items-start">
                          <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{r.category || 'General'}</span>
                        </div>
                        <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {activeRemedyId === r.id && (
                        <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100">
                          <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                          <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                          <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {!isSearching && (
                <div className="mt-6 p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 italic">Can't see the issue here?</p>
                  <button
                    onClick={() => setIsSearching(true)}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-[10px] font-black text-green-800 uppercase tracking-widest active:scale-95 transition-all"
                  >
                    <Search size={12} />
                    Search Global Database
                  </button>
                </div>
              )}

              {isSearching && filteredRemedies.length === 0 && (
                <div className="text-center py-10 text-[11px] text-gray-400 font-bold uppercase italic">No matches found for "{searchQuery}"</div>
              )}
            </div>
          </div>
        )}

        {userPlantRecordId && issueHistory.length > 0 && (
          <div className="mb-10 px-2 border-t border-gray-50 pt-8">
            <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em] mb-4">📜 Issue History</h4>
            <div className="space-y-4">
              {issueHistory.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex-grow">
                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{log.issue_type}</p>
                    <p className="text-[10px] text-gray-400 italic">Logged: {new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {log.status === 'Ongoing' && (
                      <button
                        onClick={() => handleResolveIssue(log.id)}
                        disabled={isProcessing}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-800 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all"
                      >
                        <Check size={10} strokeWidth={4} />
                        Resolve
                      </button>
                    )}
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {log.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mt-8 text-center pb-20">
            <button onClick={handleRemove} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 hover:text-red-400 transition-colors italic">
              × Remove from My Garden
            </button>
          </div>
        )}
      </div>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/components/Navigation.tsx">
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  // Define paths where the navigation bar should be hidden
  const hideOnPaths = ['/', '/login'];

  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-6 left-3 right-3 max-w-md mx-auto bg-white/90 backdrop-blur-lg border border-gray-100 rounded-full py-2 shadow-2xl z-50">
      <div className="grid grid-cols-5 items-center w-full px-1">
        
        {/* Calendar */}
  <Link href="/calendar" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/calendar' ? 'scale-125 mb-1' : 'opacity-70'}`}>🗓️</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/calendar' ? 'text-green-950' : 'text-gray-400'}`}>Calendar</span>
  </Link>

  {/* GARDEN */}
  <Link href="/dashboard" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/dashboard' ? 'scale-125 mb-1' : 'opacity-70'}`}>🏡</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/dashboard' ? 'text-green-950' : 'text-gray-400'}`}>Garden</span>
  </Link>
  
  {/* LIBRARY */}
  <Link href="/plants" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/plants' ? 'scale-125 mb-1' : 'opacity-70'}`}>🌿</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/plants' ? 'text-green-950' : 'text-gray-400'}`}>Library</span>
  </Link>

  {/* GUIDES */}
  <Link href="/guides" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/guides' ? 'scale-125 mb-1' : 'opacity-70'}`}>📖</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/guides' ? 'text-green-950' : 'text-gray-400'}`}>Guides</span>
  </Link>

  {/* FEATURE */}
  <Link href="/feature" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/feature' ? 'scale-125 mb-1' : 'opacity-70'}`}>🖼️</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/feature' ? 'text-green-950' : 'text-gray-400'}`}>Feature</span>
  </Link>
        
      </div>
    </nav>
  );
}
</file>

<file path="package.json">
{
  "name": "pocket-gardener",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@capacitor/cli": "^8.0.2",
    "@capacitor/core": "^8.0.2",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@stripe/stripe-js": "^8.6.4",
    "@supabase/auth-helpers-nextjs": "^0.15.0",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.101.1",
    "browser-image-compression": "^2.0.2",
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.563.0",
    "next": "16.1.3",
    "openai": "^6.17.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "stripe": "^20.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
</file>

<file path="src/app/dashboard/page.tsx">
'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, AlertCircle, Search, X } from 'lucide-react'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
import WelcomeOverlay from '../../components/WelcomeOverlay'
import UpgradeButton from '../../components/UpgradeButton'

interface Plant {
  id: string;
  common_name: string;
  scientific_name?: string;
  plant_type?: string;
  image_url?: string;
}

interface UserPlant {
  id: string;
  plant_id: number;
  is_project: boolean;
  nickname?: string;
  plants: Plant;
  latest_photo?: string;
  is_sick?: boolean;
}

interface PlantRemedy {
  id: string | number;
  issue_type: string;
  remedy_title?: string | null;
  remedy_description?: string | null;
  category?: string | null;
  specific_plant_id?: number | null;
  is_universal?: boolean | null;
  search_keywords?: string | null;
  shopping_tags?: string[] | null;
}

export default function MyGardenDashboard() {
  const [ownedPlants, setOwnedPlants] = useState<UserPlant[]>([])
  const [projectPlants, setProjectPlants] = useState<UserPlant[]>([])
  const [followUpAlerts, setFollowUpAlerts] = useState<any[]>([])
  const [featuredTip, setFeaturedTip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Gardener")
  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isPro, setIsPro] = useState(false)

  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueSearchQuery, setIssueSearchQuery] = useState("")
  const [selectedUnhealthyPlant, setSelectedUnhealthyPlant] = useState<UserPlant | null>(null)
  const [remedies, setRemedies] = useState<PlantRemedy[]>([])
  const [loadingRemedies, setLoadingRemedies] = useState(false)
  const [savingIssue, setSavingIssue] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[new Date().getMonth()];

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'Summer': return '☀️';
      case 'Autumn': return '🍂';
      case 'Winter': return '❄️';
      case 'Spring': return '🌱';
      default: return '💡';
    }
  };

  const getSeasonName = (m: number) => {
    if ([7, 8, 9].includes(m)) return 'Spring';
    if ([10, 11, 0].includes(m)) return 'Summer';
    if ([1, 2, 3].includes(m)) return 'Autumn';
    return 'Winter';
  };

  async function getGarden() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUserName(user.user_metadata?.display_name || "Gardener")
        setGardenPhoto(user.user_metadata?.garden_photo || null)

        const [profileRes, plantsRes] = await Promise.all([
          supabase.from('profiles').select('is_pro').eq('id', user.id).maybeSingle(),
          supabase
            .from('user_plants')
            .select(`id, plant_id, is_project, nickname, is_sick, plants (*)`)
            .eq('user_id', user.id),
        ]);

        if (profileRes.data) setIsPro(profileRes.data.is_pro);

        if (plantsRes.data) {
          const plants = plantsRes.data as any[];
          const sorted = [...plants].sort((a, b) => 
            (a.plants?.common_name || "").localeCompare(b.plants?.common_name || "")
          );

          setOwnedPlants(sorted.filter(p => !p.is_project));
          setProjectPlants(sorted.filter(p => p.is_project));

          const ownedIds = plants.filter(p => !p.is_project).map(p => p.plant_id);
          if (ownedIds.length > 0) {
            const season = getSeasonName(new Date().getMonth());
            supabase.from('expert_tips')
              .select('*, plants(common_name)')
              .in('plant_id', ownedIds)
              .or(`season.eq.${season},season.eq.Any`)
              .limit(1)
              .maybeSingle()
              .then(({ data }) => { if (data) setFeaturedTip(data); });
          }
        }

        const thirtyDaysAgo = new Date(); 
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: logs } = await supabase.from('plant_logs')
          .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
          .eq('user_id', user.id)
          .eq('status', 'Ongoing')
          .lte('created_at', thirtyDaysAgo.toISOString());

        if (logs) setFollowUpAlerts(logs);
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    getGarden(); 
  }, []);

  async function handleResolveIssue(logId: string, plantName: string) {
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)

    if (!error) {
      alert(`Great news about your ${plantName}!`)
      getGarden()
    }
  }

  async function openIssueModalForPlant(item: UserPlant) {
    setSelectedUnhealthyPlant(item)
    setIssueSearchQuery("")
    setShowIssueModal(true)
    setLoadingRemedies(true)

    const { data, error } = await supabase
      .from('plant_remedies')
      .select('*')
      .or(`specific_plant_id.eq.${item.plant_id},is_universal.eq.true`)

    if (error) {
      console.error('Error loading remedies:', error)
      setRemedies([])
    } else {
      setRemedies((data ?? []) as PlantRemedy[])
    }

    setLoadingRemedies(false)
  }

  function closeIssueModal() {
    setShowIssueModal(false)
    setIssueSearchQuery("")
    setSelectedUnhealthyPlant(null)
    setRemedies([])
  }

  async function handleToggleUnhealthy(item: UserPlant, checked: boolean) {
    if (checked) {
      await supabase
        .from('user_plants')
        .update({ is_sick: true })
        .eq('id', item.id)

      await openIssueModalForPlant(item)
      return
    }

    await supabase
      .from('user_plants')
      .update({
        is_sick: false,
        current_issue: null,
        current_remedy: null,
        current_shopping_tags: null,
      })
      .eq('id', item.id)

    getGarden()
  }

  async function handleSelectIssue(remedy: PlantRemedy) {
    if (!selectedUnhealthyPlant) return

    setSavingIssue(true)

    const remedyText = remedy.remedy_title && remedy.remedy_description
      ? `${remedy.remedy_title}: ${remedy.remedy_description}`
      : remedy.remedy_description || remedy.remedy_title || null

    const { data: { user } } = await supabase.auth.getUser()

    const [updateRes, logRes] = await Promise.all([
      supabase
        .from('user_plants')
        .update({
          is_sick: true,
          current_issue: remedy.issue_type,
          current_remedy: remedyText,
          current_shopping_tags: remedy.shopping_tags || [],
        })
        .eq('id', selectedUnhealthyPlant.id),
      supabase
        .from('plant_logs')
        .insert([{
          user_id: user?.id,
          user_plant_id: selectedUnhealthyPlant.id,
          issue_type: remedy.issue_type,
          status: 'Ongoing',
        }])
    ])

    if (updateRes.error) {
      console.error('Error updating unhealthy plant:', updateRes.error)
    }
    if (logRes.error) {
      console.error('Error inserting plant log:', logRes.error)
    }

    setSavingIssue(false)
closeIssueModal()
getGarden()
window.location.href = '/calendar'
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return;

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) return;

      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('weed-images').upload(`garden-photos/${fileName}`, file);
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(`garden-photos/${fileName}`);
      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } });
      setGardenPhoto(publicUrl);
    } catch (err) { 
      alert("Error uploading photo"); 
    } finally { 
      setUploading(false); 
    }
  };

  const handleBulkMove = async () => {
    const { error } = await supabase
      .from('user_plants')
      .update({ is_project: false })
      .in('id', selectedIds)

    if (!error) { 
      setSelectedIds([]); 
      getGarden(); 
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin"></div>
        <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading Your Garden...</p>
      </div>
    </div>
  )

  const groupedByType = ownedPlants.reduce((acc, item) => {
    const type = item.plants?.plant_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const sortedCategories = Object.keys(groupedByType).sort();

  const filteredRemedies = remedies.filter((r) => {
    if (!issueSearchQuery.trim()) return true
    const searchString = `${r.issue_type || ''} ${r.remedy_title || ''} ${r.remedy_description || ''} ${r.search_keywords || ''}`.toLowerCase()
    return searchString.includes(issueSearchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(
    (r) => Number(r.specific_plant_id) === Number(selectedUnhealthyPlant?.plant_id)
  )
  const universalMatches = filteredRemedies.filter(
    (r) => r.is_universal === true && Number(r.specific_plant_id) !== Number(selectedUnhealthyPlant?.plant_id)
  )

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <WelcomeOverlay />

      <section className="relative h-[55vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/20 mb-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />
        
        <img 
          src={gardenPhoto || "https://pristinegardens.co.nz/wp-content/uploads/2022/07/20220115_152342.jpg"} 
          alt="My Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-12">
          <div className="flex justify-end">
            <Link href="/about" className="group flex flex-col items-center gap-1.5 active:scale-95 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-white/50 shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img 
                  src="/pglogo.png" 
                  alt="Pocket Gardener Logo"
                  className="w-9 h-9 object-contain" 
                />
              </div>
              <span className="text-[7px] font-black text-white uppercase tracking-[0.2em] [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Profile
              </span>
            </Link>
          </div>

          <div className="pb-4">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none mb-4 [text-shadow:_0_2px_10px_rgb(0_0_0_/_30%)]">
              My Garden
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {userName}
                </p>
                <button 
                  onClick={async () => {
                    const n = window.prompt("Name:", userName); 
                    if (n) { 
                      await supabase.auth.updateUser({ data: { display_name: n } }); 
                      getGarden(); 
                    }
                  }} 
                  className="text-green-400 hover:scale-110 transition-transform"
                >
                  <Pencil size={10} strokeWidth={3} />
                </button>
              </div>

              {isPro && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-500 p-2.5 rounded-full text-white shadow-lg active:scale-90 transition-all border border-green-400"
                >
                  <Camera size={14} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
        
        {uploading && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Saving View...</span>
          </div>
        )}
      </section>

      <div className="px-6 space-y-12">
        {!isPro && (
          <section>
            <div className="bg-green-950 rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border-4 border-amber-400/20">
              <div className="relative z-10">
                <div className="bg-amber-400 text-green-950 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full mx-auto w-fit mb-4">
                  Pro Membership
                </div>
                <h2 className="text-xl font-black mb-2 uppercase tracking-tighter text-white italic leading-none">Unlimited Growth</h2>
                <p className="text-[10px] text-green-200/60 font-medium italic mb-6 px-4">Unlock identification, expert guides, and custom garden photos.</p>
                <UpgradeButton />
              </div>
            </div>
          </section>
        )}

        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <AlertCircle size={14} className="text-amber-500" strokeWidth={3} />
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Priority Follow-up</h2>
            </div>
            {followUpAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                <div className="flex gap-4 mb-4">
                  <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  <div>
                    <h3 className="text-sm font-black text-green-950 uppercase leading-tight">{alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[10px] text-amber-600 mt-1 font-black uppercase tracking-widest italic">{alert.issue_type} check-in</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name)} className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-lg active:scale-95 transition-all">
                    Recovered!
                  </button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-amber-400 py-3 rounded-2xl text-[9px] font-black uppercase text-green-950 text-center active:scale-95 shadow-lg transition-all">
                    Remedies
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {featuredTip && (
          <section>
            <div className="bg-green-900 rounded-[2.5rem] shadow-2xl p-8 border-b-4 border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{getSeasonIcon(featuredTip.season)}</span>
                <div className="flex flex-col">
                  <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Season Insight</span>
                  <span className="text-white/60 text-[9px] font-black uppercase tracking-widest italic">{featuredTip.plants?.common_name}</span>
                </div>
              </div>
              <p className="text-white text-lg font-medium italic leading-relaxed">"{featuredTip.tip_text}"</p>
            </div>
          </section>
        )}

        {ownedPlants.length > 0 && (
          <section className="space-y-8">
            <div className="pt-2 space-y-10">
              {sortedCategories.map((category) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
                    <span>{category}s</span>
                    <span className="h-[1px] bg-green-200 flex-grow"></span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {groupedByType[category].map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/60 p-4 rounded-[2rem] border border-white shadow-sm"
                      >
                        <Link 
                          href={`/plants/${item.plants?.id}?mode=my-garden`} 
                          className="flex items-center justify-between hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlantThumbnail plant={item.plants} size="sm" />
                            <div>
                              <h4 className="text-s font-black text-green-950 uppercase">
                                {item.nickname || item.plants?.common_name || "Unknown Plant"}
                              </h4>
                              <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">
                                {item.plants?.scientific_name}
                              </p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-gray-300" />
                        </Link>

                        <div className="mt-3 pt-3 border-t border-gray-100">
  <label
    className={`flex items-center gap-2 text-[10px] uppercase tracking-wider rounded-full px-3 py-2 border transition-all active:scale-[0.98] cursor-pointer ${
      item.is_sick
        ? 'bg-red-50 border-red-100 text-red-600 font-black'
        : 'bg-gray-50 border-gray-100 text-gray-400 font-bold active:bg-red-50 active:text-red-500'
    }`}
  >
    <input
      type="checkbox"
      checked={item.is_sick || false}
      onChange={(e) =>
        handleToggleUnhealthy(item, e.target.checked)
      }
      className="accent-red-500"
    />
    Plant is unhealthy
  </label>
</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projectPlants.length > 0 && (
          <section className="space-y-4 pb-10">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">Upcoming Projects</h2>
            <div className="space-y-3">
              {projectPlants.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
                    }} 
                    className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all z-10 ${selectedIds.includes(item.id) ? 'bg-amber-400 border-amber-400 text-green-950' : 'bg-white border-gray-200 text-transparent'}`}
                  >
                    <Check size={24} strokeWidth={4} />
                  </button>
                  <Link href={`/plants/${item.plants?.id}?mode=my-garden`} className="flex-grow bg-white p-4 rounded-[1.5rem] border border-white flex items-center gap-4 active:scale-95 shadow-sm">
                    <PlantThumbnail plant={item.plants} size="sm" />
                    <div className="flex-grow">
                      <h3 className="text-s font-black text-green-950 uppercase leading-none">{item.plants?.common_name || "Unknown Plant"}</h3>
                      <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">Planned</span>
                    </div>
                    <ArrowRight size={14} className="text-green-950 ml-auto" strokeWidth={3} />
                  </Link>
                </div>
              ))}
              {selectedIds.length > 0 && (
                <button onClick={handleBulkMove} className="w-full bg-green-900 text-amber-400 text-[11px] font-black py-5 rounded-3xl uppercase tracking-widest shadow-2xl mt-4 animate-in zoom-in-95 duration-200 flex items-center justify-center gap-2">
                  <Check size={16} strokeWidth={4} />
                  Confirm {selectedIds.length} Plants are Planted
                </button>
              )}
            </div>
          </section>
        )}
      </div>

      {showIssueModal && selectedUnhealthyPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">
                  Plant is unhealthy
                </p>
                <h3 className="text-lg font-black text-green-950 uppercase italic">
                  {selectedUnhealthyPlant.nickname || selectedUnhealthyPlant.plants?.common_name}
                </h3>
              </div>
              <button
                onClick={closeIssueModal}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search issue or symptom..."
                  value={issueSearchQuery}
                  onChange={(e) => setIssueSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-full px-5 py-4 pr-12 text-sm font-bold outline-none focus:border-orange-200"
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>

              {loadingRemedies ? (
                <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Loading issues...
                </div>
              ) : (
                <>
                  {specificMatches.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] px-1">
                        Plant specific
                      </div>
                      {specificMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-orange-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
  Add to Calendar
</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {universalMatches.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                        General issues
                      </div>
                      {universalMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-gray-100 bg-white active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
  Add to Calendar
</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredRemedies.length === 0 && (
                    <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-300 italic">
                      No issue matches your search
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/feature/page.tsx">
'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronRight, Camera, User, Plus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'

const GARDEN_ARCHIVE = [
  {
    id: 'apr-26',
    month: 'April 2026',
    style: 'Sub-tropical',
    submittedBy: 'Joe from Auckland',
    description: 'Subtropical garden with multiple textures, colours and heights.',
    image: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260129134358.jpg',
    plantNames: ['Rhododendron Vireya', 'Kentia Palm', 'Gardenia', 'Buxus Japonica', 'Star Jasmine']
  },
  {
    id: 'mar-26',
    month: 'March 2026',
    style: 'Lush garden',
    submittedBy: 'Sarah from Titirangi',
    description: 'A selection of lush plants and natives to create a full and thriving garden.',
    image: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260113164903.jpg',
    plantNames: ['Tractor Seat Plant', 'Lomandra', 'Pratia', 'Puriri']
  }
]

export default function GardenFeatures() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [favorites, setFavorites] = useState<string[]>([])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [currentPlants, setCurrentPlants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const current = GARDEN_ARCHIVE[featuredIndex]

  // 1. Fetch Featured Plants (UI Display)
  useEffect(() => {
    async function fetchPlantDetails() {
      if (!current?.plantNames?.length) return
      setLoading(true)
      
      const { data, error } = await supabase
        .from('plants')
        .select('id, common_name, image_url')
        .in('common_name', current.plantNames)

      if (error) {
        console.error('Error fetching featured plants:', error)
        setCurrentPlants([])
      } else if (data) {
        const uniqueMap = new Map();
        data.forEach((p) => { if (!uniqueMap.has(p.common_name)) uniqueMap.set(p.common_name, p); });
        const sorted = Array.from(uniqueMap.values()).sort((a: any, b: any) => a.common_name.localeCompare(b.common_name))
        setCurrentPlants(sorted)
      }
      setLoading(false)
    }
    fetchPlantDetails()
  }, [featuredIndex, supabase])

  // 2. Load Favorites
  useEffect(() => {
    const saved = localStorage.getItem('garden-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id]
    setFavorites(newFavs)
    localStorage.setItem('garden-favorites', JSON.stringify(newFavs))
  }

  const handlePlantClick = (plantId: number) => {
    router.push(`/plants/${plantId}`)
  }

  // 3. The Professional Formatted Email Logic
  const handleEmailSubmit = async () => {
    setLoading(true)
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      alert("Please log in to submit your garden!");
      setLoading(false)
      return;
    }

    const { data: userPlants, error: plantsError } = await supabase
      .from('user_plants')
      .select(`
        plant_id,
        plants (
          common_name
        )
      `)
      .eq('user_id', user.id);

    if (plantsError) {
      console.error('DEBUG - Query Error:', plantsError);
      alert(`Database Error: ${plantsError.message}`);
      setLoading(false)
      return;
    }

    const plantListText = (userPlants && userPlants.length > 0)
      ? userPlants
          .map((item: any) => {
            const p = item.plants;
            return Array.isArray(p) ? p[0]?.common_name : p?.common_name;
          })
          .filter(Boolean)
          .join(', ')
      : "No plants in my garden yet";

    // --- UPDATED EMAIL FORMATTING ---
    const recipient = "pocketgardeneruploads@gmail.com";
    const subject = "Pocket Gardener Feature Submission";
    
    // Using \r\n inside the join for ultimate reliability across devices
    const bodyText = [
      'Hi Pocket Gardener,',
      '',
      "I'd love to feature my garden in the app!",
      '',
      'My garden style: [Type here]',
      'My location: [Type here]',
      `My current app plants: ${plantListText}`,
      '',
      'Please attach photos of your garden to this email before sending.'
    ].join('\r\n');

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    setLoading(false);
    window.location.href = mailtoUrl;
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-40">
      <section className="relative h-[55vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={current.image} 
            className="w-full h-full object-cover" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-green-500 text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest">Community Feature</span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{current.month}</p>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">{current.style}</h1>
            <div className="flex items-center gap-1.5 opacity-80">
                <User size={10} className="text-green-400" />
                <p className="text-[10px] font-bold uppercase tracking-tight">Featured: {current.submittedBy}</p>
            </div>
          </div>
          <button onClick={() => toggleFavorite(current.id)} className={`p-4 rounded-3xl backdrop-blur-md transition-all active:scale-75 ${favorites.includes(current.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/20'}`}>
            <Heart size={20} fill={favorites.includes(current.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </section>

      <section className="p-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 -mt-10 relative z-20">
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">
            <span className="text-green-700 font-black mr-1 text-[10px] uppercase">The Story:</span>
            {current.description}
          </p>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Featured Plants (A-Z)</h2>
          <div className="grid grid-cols-1 gap-3">
            {loading ? (
              <div className="text-[10px] font-bold text-gray-300 animate-pulse uppercase text-center">Syncing...</div>
            ) : (
              currentPlants.map((plant) => (
                <button key={plant.id} onClick={() => handlePlantClick(plant.id)} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl border border-gray-100 transition-all active:scale-[0.97] hover:bg-green-50/50 group w-full text-left">
                  <img src={plant.image_url} alt={plant.common_name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white" />
                  <div className="flex-1">
                    <h3 className="text-[11px] font-black uppercase text-gray-800 tracking-tight leading-none group-hover:text-green-800 transition-colors">{plant.common_name}</h3>
                    <p className="text-[8px] font-bold text-green-600/60 uppercase mt-1">Tap for care info</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 group-hover:border-green-200 transition-all">
                    <Plus size={14} className="text-gray-400 group-hover:text-green-600" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="px-6 mb-8">
        <button onClick={handleEmailSubmit} className="w-full bg-green-900 rounded-[2rem] p-6 text-white flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="text-left">
                <h4 className="text-sm font-black uppercase italic tracking-tight">Feature your garden?</h4>
                <p className="text-[10px] opacity-70">Send a photo to be featured next month</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/30 transition-colors">
                <Camera size={20} />
            </div>
        </button>
      </section>

      <section className="px-6 space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Garden Archive</h2>
        {GARDEN_ARCHIVE.map((garden, index) => (
          <button key={garden.id} onClick={() => setFeaturedIndex(index)} className={`w-full flex items-center gap-4 p-3 rounded-3xl transition-all border ${featuredIndex === index ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 shadow-sm'}`}>
            <img src={garden.image} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 text-left">
              <p className="text-[8px] font-black text-gray-400 uppercase">{garden.month}</p>
              <h4 className="text-xs font-black uppercase text-green-950">{garden.style}</h4>
            </div>
            <ChevronRight size={16} className={featuredIndex === index ? 'text-green-600' : 'text-gray-200'} />
          </button>
        ))}
      </section>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/plants/page.tsx">
'use client'

import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Camera,
  RefreshCw,
  Plus,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Mail,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";
import Navigation from "../../components/Navigation";
import PlantThumbnail from "../../components/PlantThumbnail";
import PageHelp from "../../components/PageHelp";

// Full Weed Registry for AI Recognition (Auckland/NZ Focus)
const COMMON_WEEDS = [
  { scientific: "Ligustrum", common: "Privet (Tree/Chinese)" },
  { scientific: "Ulex europaeus", common: "Gorse" },
  { scientific: "Tradescantia fluminensis", common: "Tradescantia (Wandering Will)" },
  { scientific: "Asparagus aethiopicus", common: "Asparagus Fern" },
  { scientific: "Asparagus asparagoides", common: "Climbing Asparagus" },
  { scientific: "Acanthus mollis", common: "Acanthus (Bear’s Breeches)" },
  { scientific: "Zantedeschia aethiopica", common: "Arum Lily" },
  { scientific: "Convolvulus", common: "Bindweed" },
  { scientific: "Calystegia", common: "Convolvulus" },
  { scientific: "Solanum dulcamara", common: "Deadly Nightshade" },
  { scientific: "Solanum nigrum", common: "Black Nightshade" },
  { scientific: "Rumex obtusifolius", common: "Dock" },
  { scientific: "Lonicera japonica", common: "Honeysuckle" },
  { scientific: "Cymbalaria muralis", common: "Ivy Leaved Toadflax" },
  { scientific: "Nephrolepis cordifolia", common: "Ladder Fern" },
  { scientific: "Allium triquetrum", common: "Onion Weed" },
  { scientific: "Oxalis", common: "Oxalis" },
  { scientific: "Solanum mauritianum", common: "Tobacco Tree (Wooly Nightshade)" },
  { scientific: "Foeniculum vulgare", common: "Wild Fennel" },
  { scientific: "Hedychium", common: "Wild Ginger" },
  { scientific: "Jasminum polyanthum", common: "Wild Jasmine" }
];

interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string;
  sun_requirement: string | string[] | null;
  image_url?: string | null;
  plant_type?: string | null;
  task_category?: string | null;
  is_star_performer?: boolean;
  is_native?: boolean;
  flower_color?: string | null;
}

export default function LibraryPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantImage, setSelectedPlantImage] = useState<Plant | null>(null);
  const [showIdentifier, setShowIdentifier] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [aiMatch, setAiMatch] = useState<Plant | null>(null);
  const [aiResultName, setAiResultName] = useState<string | null>(null);
  const [detectedWeed, setDetectedWeed] = useState<{ scientific: string, common: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNative, setIsNative] = useState("");
  const [flowerColor, setFlowerColor] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [existingPlantIds, setExistingPlantIds] = useState<number[]>([]);
  const [openAddPlantId, setOpenAddPlantId] = useState<number | null>(null);
  const [addQuantity, setAddQuantity] = useState<number>(1);
  const [addLengthMetres, setAddLengthMetres] = useState<string>("");
  const [isAddingPlantId, setIsAddingPlantId] = useState<number | null>(null);
  const quantityInputRef = useRef<HTMLInputElement | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchPlants() {
      const { data: rawPlants } = await supabase
        .from("plants")
        .select("*")
        .order('common_name', { ascending: true });

      if (rawPlants) {
        const uniquePlantsMap = new Map();
        rawPlants.forEach((plant) => {
          const name = plant.common_name.trim();
          if (!uniquePlantsMap.has(name)) {
            uniquePlantsMap.set(name, plant);
          }
        });
        setPlants(Array.from(uniquePlantsMap.values()));
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userPlants } = await supabase
          .from('user_plants')
          .select('plant_id')
          .eq('user_id', user.id)
          .eq('is_project', false);

        if (userPlants) {
          setExistingPlantIds(userPlants.map((p: any) => p.plant_id));
        }
      }

      setLoading(false);
    }

    fetchPlants();
  }, [supabase]);

  useEffect(() => {
  if (openAddPlantId && quantityInputRef.current) {
    quantityInputRef.current.focus();
  }
}, [openAddPlantId]);

  // STABLE CLIENT DOWNSCALE APPROACH (Prevents Mobile Crashes)
  async function downscaleOnClient(file: File): Promise<Blob> {
    const MAX = 1200;
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = url;
      });

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const scale = Math.min(1, MAX / Math.max(w, h));
      const targetW = Math.max(1, Math.round(w * scale));
      const targetH = Math.max(1, Math.round(h * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("Canvas context error");

      ctx.drawImage(img, 0, 0, targetW, targetH);

      return await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
          "image/jpeg",
          0.7
        );
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setAiMatch(null);
    setAiResultName(null);
    setDetectedWeed(null);

    try {
      const blob = await downscaleOnClient(file);
      e.target.value = "";

      const formData = new FormData();
      formData.append("image", blob, "plant.jpg");

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Identification failed");

      const data = await response.json();
      const scientificName = data.result?.classification?.suggestions?.[0]?.name
        || data.suggestions?.[0]?.scientific_name;

      if (scientificName) {
        setAiResultName(scientificName);
        const weedMatch = COMMON_WEEDS.find(w =>
          scientificName.toLowerCase().includes(w.scientific.toLowerCase())
        );

        if (weedMatch) {
          setDetectedWeed(weedMatch);
          setIsScanning(false);
          return;
        }

        const genus = scientificName.split(' ')[0];
        const { data: dbMatch } = await supabase
          .from("plants")
          .select("*")
          .or(`scientific_name.ilike.%${scientificName}%,common_name.ilike.%${scientificName}%,scientific_name.ilike.%${genus}%,common_name.ilike.%${genus}%`)
          .order('is_native', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbMatch) setAiMatch(dbMatch);
      } else {
        setAiResultName("Unknown Plant");
      }
    } catch (err: any) {
      console.error(err);
      alert("Scan error. Please try selecting a photo from your gallery instead.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleOpenAddPanel = (plantId: number) => {
    setOpenAddPlantId(plantId);
    setAddQuantity(1);
    setAddLengthMetres("");
  };

  const handleConfirmAdd = async (plant: Plant) => {
    try {
      setIsAddingPlantId(plant.id);

      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session?.user) {
        alert("Please log in first!");
        return;
      }

      const isHedge =
  (plant.task_category || plant.plant_type || '').toLowerCase() === 'hedge';

const safeQuantity = isHedge
  ? null
  : Number.isFinite(addQuantity) && addQuantity > 0
  ? addQuantity
  : 1;

const safeLengthMetres =
  isHedge && addLengthMetres.trim() !== '' && !Number.isNaN(Number(addLengthMetres))
    ? Number(addLengthMetres)
    : null;

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: plant.id,
  is_project: false,
  status: 'Ongoing',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}]);

      if (error) {
        console.error(error);
        alert("Could not add plant.");
        return;
      }

      setExistingPlantIds(prev => [...prev, plant.id]);
      setOpenAddPlantId(null);
      setAddQuantity(1);
      setAddLengthMetres("");
    } finally {
      setIsAddingPlantId(null);
    }
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.plant_type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNative = isNative === "" ? true : (isNative === "Yes" ? plant.is_native === true : plant.is_native === false);
    const matchesColor = flowerColor === "" ? true : plant.flower_color === flowerColor;
    const matchesType = typeFilter === "" ? true : plant.plant_type === typeFilter;
    return matchesSearch && matchesNative && matchesColor && matchesType;
  });

  const groupedPlants = filteredPlants.reduce((acc: any, plant) => {
    const firstLetter = plant.common_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(plant);
    return acc;
  }, {});

  const alphabet = Object.keys(groupedPlants).sort();

  if (loading) return <div className="p-20 text-center text-gray-400 font-black uppercase text-[10px]">Loading Library...</div>;

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Plant Library</h1>
          <PageHelp
            title="Plant Library"
            description="Browse database or use AI identification."
            bullets={["Search by name", "Identify via photo upload", "Add to garden"]}
          />
        </div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
          A-Z Plant Index
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-sm font-bold shadow-sm outline-none focus:border-green-200 transition-colors"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
          {searchQuery ? (
            <X size={16} onClick={() => setSearchQuery("")} className="cursor-pointer text-gray-400" />
          ) : (
            <Search size={18} />
          )}
        </div>
      </div>

      {/* Identifier Tool */}
      <div className="mb-10 transition-all duration-300">
        <button
          onClick={() => setShowIdentifier(!showIdentifier)}
          className={`w-full p-7 rounded-[2.5rem] text-left relative overflow-hidden shadow-lg transition-all duration-300 ${showIdentifier ? 'bg-white border border-green-100 shadow-green-900/5' : 'bg-[#2d5a3f] text-white'
            }`}
        >
          <div className="relative z-10">
            <h3 className={`font-black text-xl mb-1 uppercase italic tracking-tight ${showIdentifier ? 'text-[#2d5a3f]' : 'text-white'}`}>
              {showIdentifier ? 'Close Identifier' : 'Identify a Plant'}
            </h3>
            <div className={`text-[11px] font-medium leading-relaxed ${showIdentifier ? 'text-gray-400' : 'text-green-100/80'}`}>
              {showIdentifier ? (
                'Upload your photo below'
              ) : (
                <>
                  <div>Not sure what plant you have?</div>
                  <div className="text-green-200 mt-1">Upload a photo here</div>
                </>
              )}
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
            {showIdentifier ? <ChevronUp className="text-[#2d5a3f]" size={32} /> : <ChevronDown className="text-white" size={32} />}
          </div>
        </button>

        {showIdentifier && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-[2rem] border-2 border-dashed border-green-100 p-8 text-center shadow-sm">
              {!isScanning && !aiResultName ? (
                <div className="flex flex-col items-center gap-2">
                  <input type="file" accept="image/*" onChange={handleFileUpload} id="gallery-input" className="hidden" />
                  <label htmlFor="gallery-input" className="cursor-pointer group flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#2d5a3f] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <ImageIcon size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase mt-3 tracking-widest text-green-900">Select From Gallery</span>
                  </label>
                </div>
              ) : isScanning ? (
                <div className="py-2">
                  <RefreshCw className="animate-spin mx-auto text-green-600 mb-2" size={24} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 italic">Analyzing Plant...</p>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-300">
                  {aiMatch ? (
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-2xl border border-green-100">
                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase text-green-600">Database Match Found</span>
                        <h4 className="font-black text-sm uppercase text-green-900 leading-none">{aiMatch.common_name}</h4>
                      </div>
                      <Link href={`/plants/${aiMatch.id}`} className="bg-green-600 text-white p-2 rounded-xl">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : detectedWeed ? (
                    <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                        <AlertTriangle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Invasive Species</span>
                      </div>
                      <h4 className="font-black text-sm uppercase text-red-900 leading-tight mb-3">{detectedWeed.common}</h4>
                      <Link
                        href="/guides/weeds"
                        className="w-full bg-red-600 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                      >
                        How to Kill It →
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase text-gray-400">AI Result (Not in library)</span>
                        <h4 className="font-black text-sm uppercase text-slate-800 leading-tight">{aiResultName}</h4>
                      </div>
                      <a
                        href={`mailto:hello@yourdomain.com?subject=Library%20Addition%20Request:%20${aiResultName}`}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform mt-3"
                      >
                        <Mail size={12} /> Request Addition
                      </a>
                    </div>
                  )}
                  <button onClick={() => { setAiResultName(null); setAiMatch(null); setDetectedWeed(null); }} className="mt-4 text-[9px] font-black text-gray-300 uppercase hover:text-gray-500 tracking-widest">Reset Scanner</button>
                </div>
              )}
            </div>

            {/* Manual Filters */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase font-black text-gray-300 bg-[#f8fbf9] px-2 w-max mx-auto tracking-widest">Or Filter Manually</div>
            </div>

            <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
              <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Plant Category</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {['Hedge', 'Shrub', 'Tree', 'Flower', 'Palm', 'Flax', 'Groundcover', 'Climber', 'Fruit'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
                <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1 block">Native?</label>
                <select value={isNative} onChange={(e) => setIsNative(e.target.value)} className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer">
                  <option value="">Any Origin</option>
                  <option value="Yes">NZ Native</option>
                  <option value="No">Exotic</option>
                </select>
              </div>
              <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
                <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1 block">Flowers</label>
                <select value={flowerColor} onChange={(e) => setFlowerColor(e.target.value)} className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer">
                  <option value="">Any Color</option>
                  {['White', 'Pink', 'Red', 'Blue', 'Yellow', 'Purple', 'Orange'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* A-Z Index */}
      <div className="space-y-10">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2 mb-[-2rem]">
          {filteredPlants.length} Plants Available
        </h2>

        {alphabet.length > 0 ? (
          alphabet.map((letter) => (
            <div key={letter}>
              <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em] mb-4 px-2">{letter}</h2>
              <div className="grid grid-cols-1 gap-4">
                {groupedPlants[letter].map((plant: Plant) => {
                  const isAlreadyAdded = existingPlantIds.includes(plant.id);
                  const isOpen = openAddPlantId === plant.id;
                  const isHedge =
                    (plant.task_category || plant.plant_type || '').toLowerCase() === 'hedge';

                  return (
                    <div key={plant.id} className="relative group">
                      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-green-100 transition-all duration-200 overflow-hidden">
                        <div className="flex items-center p-5">
                          <button onClick={() => setSelectedPlantImage(plant)} className="w-14 h-14 flex-shrink-0 transition-transform active:scale-90">
                            <PlantThumbnail plant={plant} size="sm" />
                          </button>

                          <Link href={`/plants/${plant.id}`} className="flex-grow flex items-center justify-between ml-4 active:scale-[0.98] transition-transform">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-black text-gray-800 text-sm uppercase leading-none mb-1">{plant.common_name}</h3>
                                {plant.is_native && (
                                  <span className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-black uppercase">Native</span>
                                )}
                              </div>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">{plant.plant_type || 'General'}</p>
                            </div>
                            <div className="text-gray-200 group-hover:text-green-600 group-hover:translate-x-1 transition-all text-lg mr-12">→</div>
                          </Link>

                          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
                           {isAlreadyAdded ? (
  <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-700">
    <CheckCircle size={18} />
  </div>
) : !isOpen ? (
  <button
    onClick={() => handleOpenAddPanel(plant.id)}
    className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
  >
    <Plus size={18} />
  </button>
) : null}
                          </div>
                        </div>

                        {isOpen && !isAlreadyAdded && (
                          <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-[#fbfdfb]">
                            <div className="grid grid-cols-1 gap-3">
  {isHedge ? (
    <div>
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        Hedge Length (Lineal Metres)
      </label>
      <input
        type="number"
        min={0}
        step="0.1"
        value={addLengthMetres}
        onChange={(e) => setAddLengthMetres(e.target.value)}
        placeholder="Enter hedge length"
        className="w-full p-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-200"
      />
    </div>
  ) : (
    <div>
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        Quantity
      </label>
      <input
        ref={quantityInputRef}
        type="number"
        min={1}
        value={addQuantity}
        onChange={(e) => setAddQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-full p-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-200"
      />
    </div>
  )}

                              <div className="flex gap-2 pt-1">
                                <button
                                  onClick={() => handleConfirmAdd(plant)}
                                  disabled={isAddingPlantId === plant.id}
                                  className="flex-1 py-3 rounded-2xl bg-[#2d5a3f] text-white text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
                                >
                                  {isAddingPlantId === plant.id ? 'Adding...' : 'Add to My Garden'}
                                </button>

                                <button
                                  onClick={() => {
                                    setOpenAddPlantId(null);
                                    setAddQuantity(1);
                                    setAddLengthMetres("");
                                  }}
                                  className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">No plants match your search</p>
          </div>
        )}
      </div>
      <div className="mt-12 p-8 rounded-[2.5rem] bg-white border border-dashed border-gray-200 text-center shadow-sm mx-2">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight mb-2">
            Can't find your plant?
          </h3>
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6 px-4">
            If we're missing something from your garden, let us know and we'll add it for you.
          </p>
          <a
            href="mailto:pocketgardeneruploads@gmail.com?subject=Library Addition Request"
            className="inline-flex items-center gap-2 bg-green-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
          >
            <Mail size={14} /> Request Addition
          </a>
        </div>

      {selectedPlantImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedPlantImage(null)}
        >
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setSelectedPlantImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/10 rounded-full p-2"
            >
              <X size={20} />
            </button>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={selectedPlantImage.image_url || "https://via.placeholder.com/600x600?text=No+Image"}
                alt={selectedPlantImage.common_name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-black text-green-900 uppercase">
                  {selectedPlantImage.common_name}
                </h3>
                <p className="text-sm italic text-gray-400">
                  {selectedPlantImage.scientific_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  );
}
</file>

</files>
</file>

<file path="src/app/auth/callback/route.ts">
export const dynamic = 'force-dynamic'; // This tells Next.js NOT to try and make this static
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // We check for a 'next' param, defaulting to dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const cookieStore = await cookies()
    
    // Create the response object first so we can attach the session to it
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
                // ADDED: This specific line fixes the mobile/Safari login loop
                response.cookies.set(name, value, options)
              })
            } catch (error) {
              // This catch is fine, but on iPhones, if this fails, the loop starts
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: Using the response object we created above
      return response
    }

    console.error("❌ HANDSHAKE ERROR:", error.message)
  }

  // FAIL: If no code or exchange failed, send back to login
  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
</file>

<file path="src/app/calendar/page.tsx">
'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'
import {
  ShoppingCart,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
} from 'lucide-react'
import Navigation from '../../components/Navigation'
import PageHelp from '../../components/PageHelp'

type TaskCandidate = {
  id: string
  title: string
  note: string
  taskType: string
  score: number
  urgency: 'must' | 'should' | 'could'
  minutes: number
  tools: string[]
  shopping: string[]
  isGeneral?: boolean
  canBundle: boolean
}

type PlantRow = {
  id: number
  common_name: string | null
  plant_type: string | null
  task_category: string | null
  maintenance_level: string | null
  trim_cycle: number | null
  feed_cycle: number | null
  trim_notes: string | null
  feed_notes: string | null
}

type UserPlantRow = {
  id: number
  quantity: number | null
  length_metres: number | null
  nickname: string | null
  personal_notes: string | null
  is_sick: boolean | null
  current_issue: string | null
  current_remedy: string | null
  current_shopping_tags: string[] | null
  plants: PlantRow | null
}

type MonthlyCareRow = {
  id: number
  month_number: number
  plant_type: string | null
  care_note: string | null
}

type TaskRuleRow = {
  id: number
  plant_category: string | null
  task_type: string | null
  trigger_type: string | null
  trigger_month: number | null
  frequency_per_year: number | null
  base_priority: number | null
  estimated_minutes: number | null
  tool_tags: string[] | null
  shopping_tags: string[] | null
}

type TaskStatusRow = {
  task_key: string
  is_done: boolean
}

function parseArrayField(value: unknown): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function prettyTag(tag: string): string {
  return tag.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildRuleNote(rule: TaskRuleRow, plant: PlantRow, qty: number): string {
  const name = plant.common_name || 'plant'
  const action = (rule.task_type || 'care').toLowerCase()

  if (action === 'trim') {
    return `You should trim your ${name.toLowerCase()} this month.`
  }

  if (action === 'prune') {
    return `You should prune your ${name.toLowerCase()} this month.`
  }

  if (action === 'feed') {
    return qty > 1
      ? `Time to feed your ${qty} ${name.toLowerCase()} plants.`
      : `Time to feed your ${name.toLowerCase()}.`
  }

  if (action === 'check') {
    return `Check your ${name.toLowerCase()} for seasonal maintenance.`
  }

  if (action === 'tidy') {
    return `Time to tidy your ${name.toLowerCase()}.`
  }

  if (action === 'divide') {
    return `Consider dividing your ${name.toLowerCase()} this month.`
  }

  return `Seasonal ${action} task for your ${name.toLowerCase()}.`
}

function inferToolsFromCareNote(note: string): string[] {
  const lower = note.toLowerCase()
  const tools = new Set<string>()

  if (lower.includes('prune') || lower.includes('trim') || lower.includes('cut back')) {
    tools.add('Secateurs')
  }

  if (lower.includes('hedge')) {
    tools.add('Hedge Shears')
  }

  if (lower.includes('spray')) {
    tools.add('Sprayer')
  }

  if (lower.includes('mulch')) {
    tools.add('Gloves')
  }

  return Array.from(tools)
}

function inferShoppingFromCareNote(note: string, plantName?: string | null): string[] {
  const lower = note.toLowerCase()
  const shopping = new Set<string>()

  if (lower.includes('feed') || lower.includes('fertilis')) {
    shopping.add('Granular Fertiliser')
  }

  if (lower.includes('slug') || lower.includes('snail')) {
    shopping.add('Slug Pellets')
  }

  if (
    plantName &&
    ['meyer lemon', 'lemon', 'lime', 'mandarin', 'orange', 'grapefruit'].includes(
      plantName.toLowerCase()
    ) &&
    (lower.includes('feed') || lower.includes('spring'))
  ) {
    shopping.add('Citrus Fertiliser')
    shopping.add('Epsom Salts')
  }

  return Array.from(shopping)
}

function priorityToUrgency(score: number): 'must' | 'should' | 'could' {
  if (score >= 85) return 'must'
  if (score >= 55) return 'should'
  return 'could'
}

function urgencyToLabel(urgency: 'must' | 'should' | 'could'): string {
  if (urgency === 'must') return 'Priority Level 1'
  if (urgency === 'should') return 'Priority Level 2'
  return 'Priority Level 3'
}

function getAucklandDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date)

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value || 0)

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
  }
}

function getDefaultActiveWeek() {
  const { year, month, day } = getAucklandDateParts()

  const firstOfMonthUtc = new Date(Date.UTC(year, month - 1, 1))
  const mondayIndex = (firstOfMonthUtc.getUTCDay() + 6) % 7
  const firstMondayDay = mondayIndex === 0 ? 1 : 8 - mondayIndex

  if (day < firstMondayDay) return 1

  return Math.min(4, Math.floor((day - firstMondayDay) / 7) + 1)
}

export default function CalendarPage() {
  const [loading, setLoading] = useState(true)
  const [weekLoading, setWeekLoading] = useState(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [activeWeek, setActiveWeek] = useState(getDefaultActiveWeek())
  const [allPlants, setAllPlants] = useState<UserPlantRow[]>([])
  const [monthlyCare, setMonthlyCare] = useState<MonthlyCareRow[]>([])
  const [taskRules, setTaskRules] = useState<TaskRuleRow[]>([])
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({})
  const [taskDoneMessage, setTaskDoneMessage] = useState<string | null>(null)

  const taskDoneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }
    }
  }, [])

  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const today = new Date()
  const currentMonthNum = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      month: 'numeric',
    }).format(today)
  )
  const currentMonthName = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    month: 'long',
  }).format(today)
  const currentYear = Number(
    new Intl.DateTimeFormat('en-NZ', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
    }).format(today)
  )

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() + i - 3)
    return d
  })

  useEffect(() => {
    async function loadData() {
      if (!hasLoadedOnce) {
        setLoading(true)
      } else {
        setWeekLoading(true)
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        setWeekLoading(false)
        return
      }

      setGardenPhoto(user.user_metadata?.garden_photo || null)

      const [plantsRes, careRes, rulesRes, statusRes] = await Promise.all([
  supabase
    .from('user_plants')
    .select(
      `
        id,
        quantity,
        length_metres,
        nickname,
        personal_notes,
        is_sick,
        current_issue,
        current_remedy,
        current_shopping_tags,
        plants (
          id,
          common_name,
          plant_type,
          task_category,
          maintenance_level,
          trim_cycle,
          feed_cycle,
          trim_notes,
          feed_notes
        )
      `
    )
    .eq('user_id', user.id)
    .eq('is_project', false),
        supabase
          .from('auckland_monthly_care')
          .select('id, month_number, plant_type, care_note')
          .eq('month_number', currentMonthNum),
        supabase.from('plant_task_rules').select('*'),
        supabase
          .from('user_task_status')
          .select('task_key, is_done')
          .eq('user_id', user.id)
          .eq('week_number', activeWeek)
          .eq('month_number', currentMonthNum)
          .eq('year_number', currentYear),
      ])

      if (plantsRes.error) console.error('Error loading user plants:', plantsRes.error)
      if (careRes.error) console.error('Error loading monthly care:', careRes.error)
      if (rulesRes.error) console.error('Error loading task rules:', rulesRes.error)
      if (statusRes.error) console.error('Error loading task status:', statusRes.error)

      const safePlants: UserPlantRow[] = (plantsRes.data ?? []).map((row: any) => ({
  id: row.id,
  quantity: row.quantity ?? 1,
  length_metres: row.length_metres ?? null,
  nickname: row.nickname ?? null,
  personal_notes: row.personal_notes ?? null,
  is_sick: row.is_sick ?? false,
  current_issue: row.current_issue ?? null,
  current_remedy: row.current_remedy ?? null,
  current_shopping_tags: row.current_shopping_tags ?? [],
  plants: row.plants
    ? {
        id: row.plants.id,
        common_name: row.plants.common_name ?? null,
        plant_type: row.plants.plant_type ?? null,
        task_category: row.plants.task_category ?? null,
        maintenance_level: row.plants.maintenance_level ?? null,
        trim_cycle: row.plants.trim_cycle ?? null,
        feed_cycle: row.plants.feed_cycle ?? null,
        trim_notes: row.plants.trim_notes ?? null,
        feed_notes: row.plants.feed_notes ?? null,
      }
    : null,
}))

      const statusMap: Record<string, boolean> = {}
      ;((statusRes.data ?? []) as TaskStatusRow[]).forEach((row) => {
        statusMap[row.task_key] = row.is_done
      })

      setAllPlants(safePlants)
      setMonthlyCare((careRes.data ?? []) as MonthlyCareRow[])
      setTaskRules((rulesRes.data ?? []) as TaskRuleRow[])
      setTaskStatus(statusMap)

      setLoading(false)
      setWeekLoading(false)
      setHasLoadedOnce(true)
    }

    loadData()
  }, [currentMonthNum, currentYear, activeWeek, hasLoadedOnce, supabase])

  async function toggleTask(task: TaskCandidate, done: boolean) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('user_task_status').upsert(
      {
        user_id: user.id,
        task_key: task.id,
        week_number: activeWeek,
        month_number: currentMonthNum,
        year_number: currentYear,
        is_done: done,
      },
      { onConflict: 'user_id,task_key,week_number,month_number,year_number' }
    )

    if (error) {
      console.error('Error updating task status:', error)
      return
    }

    setTaskStatus((prev) => ({
      ...prev,
      [task.id]: done,
    }))

    if (done && task.id.startsWith('sick-')) {
      const userPlantId = Number(task.id.replace('sick-', ''))

      const { error: clearError } = await supabase
        .from('user_plants')
        .update({
          is_sick: false,
          current_issue: null,
          current_remedy: null,
          current_shopping_tags: null,
        })
        .eq('id', userPlantId)

      if (clearError) {
        console.error('Error clearing unhealthy plant state:', clearError)
      } else {
        setAllPlants((prev) =>
          prev.map((plant) =>
            plant.id === userPlantId
              ? {
                  ...plant,
                  is_sick: false,
                  current_issue: null,
                  current_remedy: null,
                  current_shopping_tags: [],
                }
              : plant
          )
        )

        await supabase
          .from('plant_logs')
          .update({
            status: 'Resolved',
            resolved_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('user_plant_id', userPlantId)
          .eq('status', 'Ongoing')
      }
    }

    if (done) {
      const type = (task.taskType || '').toLowerCase()

      let message = 'Task completed'

      if (type === 'trim') {
        message = `${task.title} trimmed`
      } else if (type === 'prune') {
        message = `${task.title} pruned`
      } else if (type === 'feed') {
        message = `${task.title} fed`
      } else if (type === 'check') {
        message = `${task.title} checked`
      } else if (type === 'tidy') {
        message = `${task.title} tidied`
      } else if (type === 'sick') {
        message = `${task.title} issue resolved`
      }

      if (taskDoneTimeoutRef.current) {
        clearTimeout(taskDoneTimeoutRef.current)
      }

      setTaskDoneMessage(message)

      taskDoneTimeoutRef.current = setTimeout(() => {
        setTaskDoneMessage(null)
      }, 2200)
    }
  }

  const agenda = useMemo(() => {
    if (!allPlants.length) {
      return {
        sickTasks: [] as TaskCandidate[],
        tasks: [] as TaskCandidate[],
        shoppingList: [] as string[],
        toolsList: ['Watering Can'],
      }
    }

    const sickCandidates: TaskCandidate[] = []
    const candidates: TaskCandidate[] = []
    const finalShopping = new Set<string>()
    const finalTools = new Set<string>(['Watering Can'])

    allPlants.forEach((up) => {
      const p = up.plants
      if (!p) return

      const commonName = up.nickname || p.common_name || 'Plant'

      if (up.is_sick) {
  const issueText = up.current_issue?.trim()
  const remedyText = up.current_remedy?.trim()
  const shoppingTags = parseArrayField(up.current_shopping_tags).map(prettyTag)

  let sickNote = 'This plant needs attention.'
  if (issueText && remedyText) {
    sickNote = `${issueText} — ${remedyText}`
  } else if (issueText) {
    sickNote = issueText
  } else if (remedyText) {
    sickNote = remedyText
  }

  const needsSprayer = shoppingTags.some((tag) => {
    const lower = tag.toLowerCase()
    return (
      lower.includes('spray') ||
      lower.includes('neem') ||
      lower.includes('oil') ||
      lower.includes('fungicide')
    )
  })

  if (needsSprayer) {
    finalTools.add('Garden Sprayer')
  }

  sickCandidates.push({
    id: `sick-${up.id}`,
    title: commonName,
    note: sickNote,
    taskType: 'sick',
    score: 999,
    urgency: 'must',
    minutes: 15,
    tools: [],
    shopping: shoppingTags,
    canBundle: false,
  })
}
    })

    allPlants.forEach((up, index) => {
      const p = up.plants
      if (!p) return

      const qty = up.quantity || 1
      const commonName = up.nickname || p.common_name || 'Plant'
      const plantType = p.plant_type || ''
      const taskCategory = (p.task_category || plantType || '').trim().toLowerCase()

      const assignedWeek = (index % 4) + 1
      const shouldShowThisWeek = assignedWeek === activeWeek

      if (!shouldShowThisWeek) return

      const plantSpecificCare = monthlyCare.find((c) => {
        const careType = (c.plant_type || '').trim().toLowerCase()
        return (
          careType === (p.common_name || '').toLowerCase() ||
          careType === plantType.toLowerCase() ||
          careType === taskCategory
        )
      })

      if (plantSpecificCare?.care_note) {
        const monthlyCareScore =
          taskCategory === 'hedge' &&
          /trim|prune|cut back/.test(plantSpecificCare.care_note.toLowerCase())
            ? 115
            : 90

        candidates.push({
          id: `care-${up.id}`,
          title: qty > 1 ? `${qty}x ${commonName}` : commonName,
          note: plantSpecificCare.care_note,
          taskType: 'care',
          score: monthlyCareScore,
          urgency: priorityToUrgency(monthlyCareScore),
          minutes: Math.max(10, 15 * qty),
          tools: inferToolsFromCareNote(plantSpecificCare.care_note),
          shopping: inferShoppingFromCareNote(plantSpecificCare.care_note, p.common_name),
          canBundle: false,
        })
      }

      const matchingRules = taskRules.filter((r) => {
        const ruleCategory = (r.plant_category || '').trim().toLowerCase()
        const ruleMonth = Number(r.trigger_month)
        return ruleCategory === taskCategory && ruleMonth === currentMonthNum
      })

      if (matchingRules.length > 0) {
        matchingRules.forEach((rule, ruleIndex) => {
          const isHedgeTrim =
            (rule.task_type || '').trim().toLowerCase() === 'trim' &&
            taskCategory === 'hedge'

          const baseScore = isHedgeTrim ? 120 : rule.base_priority || 50
          const finalScore = plantSpecificCare ? Math.max(60, baseScore - 10) : baseScore

          candidates.push({
  id: `rule-${up.id}-${rule.id || ruleIndex}`,

  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,

  note: buildRuleNote(rule, p, qty),
  taskType: rule.task_type || 'care',
  score: finalScore,
  urgency: priorityToUrgency(finalScore),

  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 15)
      : Math.max(5, (rule.estimated_minutes || 15) * qty),

  tools: parseArrayField(rule.tool_tags).map(prettyTag),
  shopping: parseArrayField(rule.shopping_tags).map(prettyTag),
  canBundle: true,
})
        })
      } else if (!plantSpecificCare) {
        candidates.push({
  id: `fallback-${up.id}`,
  title:
    taskCategory === 'hedge' && up.length_metres
      ? `${up.length_metres}m ${commonName}`
      : qty > 1
      ? `${qty}x ${commonName}`
      : commonName,
  note: `General maintenance check for your ${commonName.toLowerCase()}.`,
  taskType: 'check',
  score: 30,
  urgency: 'could',
  minutes:
    taskCategory === 'hedge'
      ? Math.max(10, (up.length_metres || 0) * 2)
      : 10,
  tools: [],
  shopping: [],
  canBundle: false,
})
      }
    })

    const finalTasks: TaskCandidate[] = []
    const bundleGroups = new Map<string, TaskCandidate[]>()

    candidates.forEach((candidate) => {
      if (candidate.canBundle) {
        const key = candidate.taskType.toLowerCase()
        bundleGroups.set(key, [...(bundleGroups.get(key) || []), candidate])
      } else {
        finalTasks.push(candidate)
      }
    })

    bundleGroups.forEach((tasks, type) => {
      if (tasks.length === 1) {
        finalTasks.push(tasks[0])
        return
      }

      const mergedTitles = tasks.map((t) => t.title).join(', ')
      const mergedTools = Array.from(new Set(tasks.flatMap((t) => t.tools)))
      const mergedShopping = Array.from(new Set(tasks.flatMap((t) => t.shopping)))
      const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0)
      const bestScore = Math.max(...tasks.map((t) => t.score))

      finalTasks.push({
        id: `bundle-${type}`,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Jobs`,
        note: `Time to ${type} these plants: ${mergedTitles}.`,
        taskType: type,
        score: bestScore,
        urgency: priorityToUrgency(bestScore),
        minutes: totalMinutes,
        tools: mergedTools,
        shopping: mergedShopping,
        canBundle: false,
      })
    })

    const visibleSickTasks = sickCandidates.filter((task) => !taskStatus[task.id])

    const sortedTasks = finalTasks
      .filter((task) => !taskStatus[task.id])
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.minutes - b.minutes
      })
      .slice(0, 4)

    ;[...visibleSickTasks, ...sortedTasks].forEach((task) => {
      task.tools.forEach((tool) => finalTools.add(tool))
      task.shopping.forEach((item) => finalShopping.add(item))
    })

    return {
      sickTasks: visibleSickTasks,
      tasks: sortedTasks,
      shoppingList: Array.from(finalShopping),
      toolsList: Array.from(finalTools),
    }
  }, [allPlants, monthlyCare, taskRules, activeWeek, currentMonthNum, taskStatus])

  const priorityLevel1Tasks = agenda.tasks.filter((task) => task.urgency === 'must')
  const priorityLevel2And3Tasks = agenda.tasks.filter((task) => task.urgency !== 'must')

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center font-black text-green-800 tracking-widest text-[10px]">
        SYNCING SMART CALENDAR...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <section className="relative h-[60vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0f4f1] via-transparent to-transparent z-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-15" />
        <img
          src={
            gardenPhoto ||
            'https://images.unsplash.com/photo-1558905619-17254261b646?q=80&w=2000'
          }
          alt="Garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-[100] flex flex-col justify-end p-8 pb-20">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20 mb-4">
            <MapPin size={10} className="text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Auckland • {currentMonthName}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8 relative z-50">
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {currentMonthName.toUpperCase()} <span className="text-amber-400">TO-DO</span>
            </h1>

            <PageHelp
              title="Calendar"
              description="Your weekly garden plan based on your plants, season, and any issues you've logged."
              bullets={[
                "Priority Level 1 tasks are the most important right now.",
                "Sick plants appear at the top and can be resolved here.",
                "Shopping and tools update automatically based on your tasks."
              ]}
            />
          </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {weekDays.map((date, i) => {
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()

              return (
                <div
                  key={i}
                  className={`flex flex-col items-center min-w-[50px] p-3 rounded-2xl border ${
                    isToday
                      ? 'bg-amber-400 border-amber-400'
                      : 'bg-black/40 border-white/10 backdrop-blur-sm'
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase ${
                      isToday ? 'text-green-950' : 'text-white/60'
                    }`}
                  >
                    {date.toLocaleDateString('en-NZ', { weekday: 'short' })}
                  </span>
                  <span
                    className={`text-sm font-black ${
                      isToday ? 'text-green-950' : 'text-white'
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="px-6 -mt-10 relative z-30 space-y-3">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-2 flex items-center justify-between border border-gray-100">
          <button
            onClick={() => setActiveWeek((prev) => Math.max(1, prev - 1))}
            className="p-4 text-gray-300"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center flex flex-col items-center">
            <p className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1">
              Weekend Plan
            </p>

            <p className="font-black text-green-950 uppercase italic text-sm">
              Week {activeWeek} Agenda
            </p>
          </div>

          <button
            onClick={() => setActiveWeek((prev) => Math.min(4, prev + 1))}
            className="p-4 text-gray-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="px-6 py-10 space-y-10">
        {agenda.sickTasks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] px-2 italic">
              Needs Attention
            </h2>

            <div className="space-y-3">
              {agenda.sickTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 rounded-[2.5rem] border-2 border-red-200 bg-red-50 shadow-md flex gap-4 items-start"
                >
                  <div className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-100">
                    <input
                      type="checkbox"
                      checked={taskStatus[task.id] || false}
                      onChange={(e) => toggleTask(task, e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start w-full gap-4">
                      <div>
                        <h3 className="font-black uppercase text-sm tracking-tight text-red-900">
                          {task.title}
                        </h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-red-600">
                          Needs Attention
                        </p>
                      </div>

                      <div className="flex items-center gap-1 opacity-60 shrink-0">
                        <Clock size={10} />
                        <span className="text-[10px] font-bold uppercase">
                          {task.minutes >= 60
                            ? `${(task.minutes / 60).toFixed(1)} HRS`
                            : `${Math.round(task.minutes)} MIN`}
                        </span>
                      </div>
                    </div>

                    <p className="text-[15px] font-normal leading-relaxed mt-3 text-red-800">
                      {task.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-green-900/30 uppercase tracking-[0.3em] px-2 italic">
            Priority Tasks
          </h2>

          <div className="space-y-3">
            {priorityLevel1Tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 rounded-[2.5rem] border-2 border-amber-300 bg-amber-50/60 shadow-md flex gap-4 items-start"
              >
                <div className="mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-200">
                  <input
                    type="checkbox"
                    checked={taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className="w-4 h-4 accent-green-800"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start w-full gap-4">
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-tight text-green-950">
                        {task.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-amber-700">
                        {urgencyToLabel(task.urgency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-70 shrink-0">
                      <Clock size={10} />
                      <span className="text-[10px] font-bold uppercase">
                        {task.minutes >= 60
                          ? `${(task.minutes / 60).toFixed(1)} HRS`
                          : `${Math.round(task.minutes)} MIN`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[16px] font-normal leading-relaxed mt-3 text-gray-700">
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {priorityLevel1Tasks.length > 0 && priorityLevel2And3Tasks.length > 0 && (
              <div className="py-2">
                <div className="border-t border-gray-300" />
              </div>
            )}

            {priorityLevel2And3Tasks.map((task) => (
              <div
                key={task.id}
                className="p-6 rounded-[2.5rem] border bg-white border-white text-gray-900 shadow-sm flex gap-4 items-start"
              >
                <div className="mt-1 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-green-50">
                  <input
                    type="checkbox"
                    checked={taskStatus[task.id] || false}
                    onChange={(e) => toggleTask(task, e.target.checked)}
                    className="w-4 h-4 accent-green-700"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start w-full gap-4">
                    <div>
                      <h3 className="font-black uppercase text-sm tracking-tight text-green-950">
                        {task.title}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] mt-1 text-amber-600">
                        {urgencyToLabel(task.urgency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-60 shrink-0">
                      <Clock size={10} />
                      <span className="text-[10px] font-bold uppercase">
                        {task.minutes >= 60
                          ? `${(task.minutes / 60).toFixed(1)} HRS`
                          : `${Math.round(task.minutes)} MIN`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] font-normal leading-relaxed mt-3 text-gray-700">
                    {task.note}
                  </p>
                </div>
              </div>
            ))}

            {agenda.sickTasks.length === 0 && agenda.tasks.length === 0 && (
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm text-sm text-gray-500 italic">
                No tasks for this week yet.
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-[2.5rem] p-7 border border-white shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center shadow-md shadow-amber-900/10">
                <ShoppingCart size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Supplies
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.shoppingList.length > 0 ? (
                agenda.shoppingList.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400 italic px-1">
                  No specific products needed.
                </li>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-[2.5rem] p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-800 rounded-2xl flex items-center justify-center">
                <Wrench size={18} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-green-950 uppercase tracking-tight">
                Tool Kit
              </h2>
            </div>

            <ul className="space-y-3">
              {agenda.toolsList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs font-bold text-gray-600 border-b border-gray-50 pb-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {taskDoneMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-green-900 text-white px-5 py-3 rounded-full shadow-2xl text-[10px] font-black uppercase tracking-widest">
          {taskDoneMessage}
        </div>
      )}

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/identify/page.tsx">
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
import PageHelp from '../../components/PageHelp'

export default function IdentifyPage() {
  const [plants, setPlants] = useState<any[]>([])
  const [userPlantIds, setUserPlantIds] = useState<Set<number>>(new Set())
  const [filteredPlants, setFilteredPlants] = useState<any[]>([])
  
  // Filter States
  const [typeFilter, setTypeFilter] = useState('')
  const [isNative, setIsNative] = useState('')
  const [flowerColor, setFlowerColor] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      
      // 1. Fetch all master plants
      const { data: allPlants } = await supabase.from('plants').select('*')
      
      if (allPlants) {
        // DEDUPLICATION LOGIC: Only keep the first instance of each plant name
        const uniqueMap = new Map();
        allPlants.forEach(p => {
          const name = p.common_name.trim();
          if (!uniqueMap.has(name)) {
            uniqueMap.set(name, p);
          }
        });
        setPlants(Array.from(uniqueMap.values()));
      }

      // 2. Fetch user's current plants to show checkmarks
      if (user) {
        const { data: userPlants } = await supabase
          .from('user_plants')
          .select('plant_id')
          .eq('user_id', user.id)
        
        if (userPlants) {
          const ids = new Set(userPlants.map(p => Number(p.plant_id)))
          setUserPlantIds(ids)
        }
      }
    }
    fetchData()
  }, [supabase])

  useEffect(() => {
    let list = [...plants]

    if (typeFilter) list = list.filter(p => p.plant_type === typeFilter)
    if (flowerColor) list = list.filter(p => p.flower_color === flowerColor)
    if (isNative) {
      const nativeBool = isNative === 'Yes'
      list = list.filter(p => p.is_native === nativeBool)
    }

    // Simplified sort to be strictly alphabetical by common_name
    const sortedList = list.sort((a, b) => {
      return a.common_name.localeCompare(b.common_name)
    })

    setFilteredPlants(sortedList)
  }, [typeFilter, isNative, flowerColor, plants])

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Identify</h1>
          <PageHelp 
            title="Identify Plants"
            description="Trying to figure out what is growing in your garden? Use these filters to narrow down the search."
            bullets={[
              "Filter by Category (Hedges, Trees, etc.)",
              "Filter by Native or Exotic status",
              "Filter by Flower Color to match what you see",
              "A checkmark (✓) means the plant is already in your garden"
            ]}
          />
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mt-2">Auckland Plant Finder</p>
      </header>

      {/* FILTERS SECTION */}
      <div className="space-y-3 mb-10">
        <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
          <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Plant Category</label>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {['Hedge', 'Shrub', 'Tree', 'Flower', 'Palm', 'Flax', 'Groundcover', 'Climber', 'Fruit'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Native?</label>
            <select 
              value={isNative}
              onChange={(e) => setIsNative(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Origin</option>
              <option value="Yes">NZ Native</option>
              <option value="No">Exotic</option>
            </select>
          </div>

          <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
            <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Flowers</label>
            <select 
              value={flowerColor}
              onChange={(e) => setFlowerColor(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
            >
              <option value="">Any Color</option>
              {['White', 'Pink', 'Red', 'Blue', 'Yellow', 'Purple', 'Orange'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2">
          {filteredPlants.length} Plants Found
        </h2>
        
        <div className="grid grid-cols-1 gap-2">
          {filteredPlants.map((plant) => (
            <Link href={`/plants/${plant.id}`} key={plant.id} className="block group">
              <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex items-center gap-4 group-active:scale-[0.98] transition-all">
                <div className="w-14 h-14 flex-shrink-0">
                  <PlantThumbnail plant={plant} size="sm" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-none truncate">
                        {plant.common_name}
                    </h3>
                    {userPlantIds.has(Number(plant.id)) && (
                      <span className="text-green-500 font-bold text-xs">✓</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 italic mt-1 font-medium truncate">
                    {plant.scientific_name}
                  </p>
                </div>
                <div className="text-gray-200 pr-2 group-hover:text-green-600 transition-colors text-lg">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/login/page.tsx">
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // This client handles the "Send" part of the Magic Link
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // CLEAN REDIRECT: We send them to /auth/callback and let the 
    // route handler deal with the final destination to avoid loops.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("❌ Login Error:", error.message)
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Check your email! Your Magic Link is on the way.')
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) console.error("❌ Google Error:", error.message)
  }

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-xl shadow-green-900/5 text-center">
        {/* Branding */}
        <div className="text-5xl mb-8">🌿</div>
        <h1 className="text-3xl font-black text-green-900 mb-2 tracking-tight">Pocket Gardener</h1>
        <p className="text-gray-400 text-sm mb-10 font-medium italic">Save your Auckland garden</p>
        
        {/* Magic Link Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full px-6 py-5 rounded-[1.5rem] border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/10 transition-all text-sm font-medium text-gray-700"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-[#2d5a3f] hover:bg-[#254b34] text-white font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending link...' : 'Get Magic Link'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 italic bg-white px-4">
            or
          </div>
        </div>

        {/* Social Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full bg-white border border-gray-100 hover:border-green-200 text-gray-700 font-bold py-5 rounded-[1.5rem] uppercase tracking-widest text-[11px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Feedback Message */}
        {message && (
          <p className={`mt-6 text-xs font-bold p-4 rounded-2xl animate-pulse ${
            message.includes('Error') ? 'text-red-500 bg-red-50' : 'text-green-700 bg-green-50'
          }`}>
            {message}
          </p>
        )}
      </div>

      {/* App Navigation */}
      <Navigation />
      
      <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
        Designed for Auckland Gardeners
      </p>
    </main>
  )
}
</file>

<file path="src/app/match/page.tsx">
'use client'

import { useState, useEffect, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'
import { Sun, Droplets, Ruler, ChevronRight, Plus, X, Shovel } from 'lucide-react'
import Navigation from "../../components/Navigation"
import PlantThumbnail from "../../components/PlantThumbnail"
import PageHelp from '../../components/PageHelp'

// Configuration for Visual Sliders
const SUN_OPTIONS = ['Full Sun', 'Part Shade', 'Full Shade'];
const SOIL_OPTIONS = ['Healthy/loam', 'Clay', 'Sandy', 'Potting Mix'];
const WATER_OPTIONS = ['Holds Water', 'Drains Well', 'Dry', 'Under a Roof'];
const SIZE_OPTIONS = ['<1m', '1-2m', '2-4m', '4m+'];

// Visual Asset Mapping
const SUN_IMAGES = [
  'https://img.freepik.com/free-photo/penang-malaysia-march-25-2024_58702-16918.jpg?semt=ais_incoming&w=740&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80',
  'https://www.juliebawdendavis.com/wp-content/uploads/2024/05/Shade-Garden-plant-and-flower-in-garden-zone-at-coffee-cafe-ou-2023-11-27-05-18-40-utc-1024x683.jpg'
];

const SOIL_IMAGES = [
  'https://www.familyhandyman.com/wp-content/uploads/2021/12/GettyImages-1411589688.jpg?fit=700,700', // Loam
  'https://www.telegraph.co.uk/content/dam/gardening/2016/03/02/clay_trans_NvBQzQNjv4Bq2tiKoEXXnMogTwbjBHNCEqNpFR3XzR3Ec7ZpvUpPAOA.jpg?imwidth=640', // Clay
  'https://images.ctfassets.net/3s5io6mnxfqz/2NtZAbCMNH8DDAY7GQz2Gu/83ae589dc93ee115cc1b74bfb7c1db99/AdobeStock_271102263_2.jpeg', // Sandy
  'https://www.marthastewart.com/thmb/9L878wbTxNsqMSkH1BXUlpmcZH4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-22093204211-c155b91cf01d45168b0170cbf938368d.jpg' // Potting Mix
];

const WATER_IMAGES = [
  'https://www.saga.co.uk/helix-contentlibrary/saga/magazine/articles/2024/july/gettyimages-945124834-how-to-cope-with-waterlogged-soil_hero.jpg', // Holds Water
  'https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-03/hgic_soils_soil_cross_section_1600.jpg?itok=B6yNaByH', // Drains Well
  'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2010/04/dry_soil/9670553-3-eng-GB/Dry_soil_pillars.jpg', // Dry
  'https://www.thespruce.com/thmb/Z4V-26SsiT_2Qul7tsZya5XeZPg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1198218813-e5051f347a814c2ab5d6129b2cdc2ead.jpg' // Under a Roof
];

const SIZE_IMAGES = [
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20small.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20mdeiium.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20hedge.png',
  'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/weed-images/garden-photos/ChatGPT%20Image%20Apr%203,%202026,%2012_56_23%20PM%20tree.png'
];

export default function MatchPage() {
  const [sunIdx, setSunIdx] = useState(0);
  const [soilIdx, setSoilIdx] = useState(0);
  const [waterIdx, setWaterIdx] = useState(1);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null)

  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const handleAddToProject = async (plantId: string) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session?.user) {
      alert('Please log in first!')
      return
    }

    const { error } = await supabase.from('user_plants').insert([{
      user_id: session.user.id,
      plant_id: Number(plantId),
      is_project: true,
      status: 'Planning',
    }])

    if (!error) { alert('Added to your project!'); setSelectedPlant(null); }
  }

  useEffect(() => {
    async function getLiveMatches() {
      setLoading(true)
      const { data } = await supabase
        .from('plants')
        .select('*')
        .contains('sun_requirement', [SUN_OPTIONS[sunIdx]])
        .contains('soil_type', [SOIL_OPTIONS[soilIdx]])
        .contains('water_behavior', [WATER_OPTIONS[waterIdx]])
        .contains('mature_size', [SIZE_OPTIONS[sizeIdx]])
      
      if (data) setMatches([...data].sort((a, b) => (a.common_name || "").localeCompare(b.common_name || "")))
      setLoading(false)
    }
    getLiveMatches()
  }, [sunIdx, soilIdx, waterIdx, sizeIdx, supabase])

  return (
    <main className="min-h-screen bg-[#f0f4f1] text-gray-900 pb-40">
      <div className="max-w-2xl mx-auto p-6">
        
        <header className="mb-8 pt-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-green-950 tracking-tighter italic uppercase leading-none">The Matchmaker</h1>
            <p className="text-[10px] text-green-700/60 font-black uppercase tracking-[0.2em] mt-2">Precision planting</p>
          </div>
          <PageHelp title="Matchmaker" description="Slide to see what thrives." bullets={["4 Dynamic sliders"]} />
        </header>

        <div className="space-y-10 mb-12">
          {/* SUN SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Sun size={14}/> Sun Exposure</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SUN_OPTIONS[sunIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SUN_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: sunIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="2" step="1" value={sunIdx} onChange={(e) => setSunIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* SOIL SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Shovel size={14}/> Soil Type</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SOIL_OPTIONS[soilIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {SOIL_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: soilIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="3" step="1" value={soilIdx} onChange={(e) => setSoilIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* DRAINAGE SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Droplets size={14}/> Drainage</label>
              <span className="text-xs font-black italic uppercase text-green-950">{WATER_OPTIONS[waterIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-gray-100">
              {WATER_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{ backgroundImage: `url("${url}")`, opacity: waterIdx === i ? 1 : 0 }} />
              ))}
              <input type="range" min="0" max="3" step="1" value={waterIdx} onChange={(e) => setWaterIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-white/30 backdrop-blur-md rounded-full appearance-none cursor-pointer accent-white z-10" />
            </div>
          </div>

          {/* MATURE SIZE SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 flex items-center gap-2"><Ruler size={14}/> Mature Size</label>
              <span className="text-xs font-black italic uppercase text-green-950">{SIZE_OPTIONS[sizeIdx]}</span>
            </div>
            <div className="relative h-44 w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white bg-white">
              {SIZE_IMAGES.map((url, i) => (
                <div key={i} className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-500 ease-out" 
                  style={{ 
                    backgroundImage: `url("${url}")`, 
                    opacity: sizeIdx === i ? 1 : 0,
                    transform: sizeIdx === i ? 'scale(1)' : 'scale(0.9)' 
                  }} 
                />
              ))}
              <input type="range" min="0" max="3" step="1" value={sizeIdx} onChange={(e) => setSizeIdx(parseInt(e.target.value))} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-1.5 bg-green-900/10 rounded-full appearance-none cursor-pointer accent-green-900 z-10" />
            </div>
          </div>
        </div>

        {/* RESULTS LIST */}
        <section className="relative pt-8 border-t border-green-900/5">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">Recommended ({matches.length})</h3>
            {loading && <div className="w-4 h-4 border-2 border-green-900/20 border-t-green-900 rounded-full animate-spin"></div>}
          </div>
          <div className="space-y-3">
            {matches.map((p) => (
              <button key={p.id} onClick={() => setSelectedPlant(p)} className="w-full flex items-center justify-between p-4 bg-white rounded-[2rem] border border-transparent shadow-sm active:scale-[0.98] transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0"><PlantThumbnail plant={p} size="sm" /></div>
                  <div><span className="font-black text-green-950 text-sm uppercase block leading-none mb-1">{p.common_name}</span><span className="text-[10px] text-gray-400 font-bold uppercase italic">{p.plant_type}</span></div>
                </div>
                <ChevronRight size={18} className="text-gray-300"/>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL POPUP */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <div className="absolute inset-0 bg-green-950/60 backdrop-blur-sm" onClick={() => setSelectedPlant(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden animate-in slide-in-from-bottom-10">
            <button onClick={() => setSelectedPlant(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mb-4 shadow-xl"><PlantThumbnail plant={selectedPlant} size="lg" /></div>
              <h2 className="text-2xl font-black text-green-950 uppercase italic leading-none">{selectedPlant.common_name}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase italic mt-2">{selectedPlant.botanical_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-[#f0f4f1] p-4 rounded-2xl"><p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Growth</p><p className="text-sm font-bold text-green-950">{selectedPlant.mature_size?.[0] || SIZE_OPTIONS[sizeIdx]}</p></div>
               <div className="bg-[#f0f4f1] p-4 rounded-2xl"><p className="text-[10px] font-black uppercase text-green-800/40 mb-1">Type</p><p className="text-sm font-bold text-green-950">{selectedPlant.plant_type || 'Shrub'}</p></div>
            </div>
            <button onClick={() => handleAddToProject(selectedPlant.id)} className="w-full bg-amber-400 text-green-950 font-black uppercase py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
              <Plus size={16} strokeWidth={3} /> Add to Project
            </button>
          </div>
        </div>
      )}
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/layout.tsx">
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Viewport handles the 'zoom' and 'theme color' for the phone's status bar
export const viewport: Viewport = {
  themeColor: "#2d5a3f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 2. Metadata handles the Manifest, Icons, and Apple App settings
export const metadata: Metadata = {
  title: "Pocket Gardener",
  description: "Garden management for Aucklanders.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pocket Gardener",
  },
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
</file>

<file path="src/components/WelcomeOverlay.tsx">
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Only show to brand new visitors
    const hasVisited = localStorage.getItem('hasVisitedGardenApp');
    if (!hasVisited) setIsVisible(true);
  }, []);

  const slides = [
    { 
      title: "Expert Garden Management", 
      desc: "Track every plant in your Auckland garden with custom care schedules.", 
      icon: "🏡" 
    },
    { 
      title: "The Garden Matchmaker", 
      desc: "Find the perfect plants for your specific soil and sun conditions.", 
      icon: "✅" 
    },
    { 
      title: "Gardening Guides", 
      desc: "In-depth local advice for weeds, pests, and Auckland planting seasons.", 
      icon: "📖" 
    },
    { 
      title: "Pro Tip", 
      desc: "Look for the 'i' icon at the top of any page for instant help and tips!", 
      icon: "ℹ️" 
    }
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      localStorage.setItem('hasVisitedGardenApp', 'true');
      setIsVisible(false);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#2d5a3f] flex flex-col items-center justify-center p-8 text-center text-white">
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden text-9xl select-none">
         <div className="absolute -top-10 -left-10 rotate-12">🌿</div>
         <div className="absolute bottom-20 -right-10 -rotate-12">🌳</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-xs relative z-10"
        >
          <div className="text-8xl mb-10 drop-shadow-2xl">{slides[currentSlide].icon}</div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-green-100/80 font-medium leading-relaxed text-sm">
            {slides[currentSlide].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS & BUTTON */}
      <div className="absolute bottom-16 w-full px-10 flex flex-col items-center gap-8">
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/20'
              }`} 
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-white text-[#2d5a3f] rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl active:scale-95 transition-all"
        >
          {currentSlide === slides.length - 1 ? "Start Gardening →" : "Next"}
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/app/about/page.tsx">
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Navigation from '../../components/Navigation'

const getSupabase = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  )
}

export default function AboutPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()

    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserEmail(user.email ?? null)
          
          // Check Pro Status for the Manage button
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .single()
          
          if (profile) setIsPro(profile.is_pro)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUserData()
  }, [])

  const handleSignOut = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // NEW: Handle redirection to Stripe Customer Portal
  const handleManageSubscription = async () => {
    try {
      setPortalLoading(true)
      const response = await fetch('/api/portal', { method: 'POST' })
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Could not find an active subscription session.")
      }
    } catch (err) {
      console.error(err)
      alert("Error connecting to billing portal.")
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      <div className="h-[35vh] bg-[#2d5a3f] relative flex items-end justify-center pb-10">
        <button 
          onClick={() => router.back()} 
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold active:scale-90 transition-transform z-20"
        >
          ←
        </button>
        <div className="text-center relative z-10">
          {/* UPDATED LOGO BOX: Matches Dashboard Styling */}
          <div className="w-20 h-20 bg-white rounded-[2rem] mx-auto mb-4 flex items-center justify-center border-2 border-white/50 shadow-2xl overflow-hidden">
            <img 
              src="/pglogo.png" 
              alt="Pocket Gardener Logo"
              className="w-14 h-14 object-contain" 
            />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.1em]">The Pocket Gardener</h1>
        </div>
      </div>

      <div className="px-8 pt-10 space-y-10">
        
        {/* 1. MEMBERSHIP STATUS & PORTAL */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">Subscription</h2>
          <div className="bg-gray-50 p-7 rounded-[2.5rem] border border-gray-100">
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Current Plan</p>
                <p className="text-sm font-bold text-green-900 mb-6">{isPro ? "🌿 Pro Plan" : "Standard Plan"}</p>
                
                {isPro && (
                  <button 
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full py-4 rounded-2xl bg-[#2d5a3f] text-white font-black uppercase tracking-widest text-[9px] shadow-md active:scale-95 transition-all disabled:opacity-50"
                  >
                    {portalLoading ? "Loading Portal..." : "Manage or Cancel Subscription"}
                  </button>
                )}
                {!isPro && (
                   <p className="text-[10px] text-gray-400 italic">Upgrade on your dashboard to unlock all features.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 2. MISSION STATEMENT */}
        <section>
          <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 px-1">The Mission</h2>
          <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[13px] text-gray-600 leading-relaxed font-medium italic">
              "To help Aucklanders master their backyards through local, month-by-month advice and simple digital tools."
            </p>
          </div>
        </section>

        {/* 3. SIGN OUT (MOVED TO BOTTOM) */}
        <section className="pt-4">
          <div className="px-1 mb-4 flex justify-between items-center">
             <h2 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Account</h2>
             {userEmail && <span className="text-[9px] font-bold text-gray-400 lowercase italic">{userEmail}</span>}
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full py-4 rounded-2xl bg-white text-red-500 border border-red-100 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
          >
            Sign Out
          </button>
        </section>

        <footer className="pt-4 text-center">
          <p className="text-[8px] font-black text-gray-200 uppercase tracking-[0.4em]">
            v1.0 • Pocket Gardener NZ
          </p>
        </footer>
      </div>

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/success/page.tsx">
'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 1. This component handles the logic and UI
function SuccessContent() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#f8fbf9] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl animate-bounce">🌿</span>
        </div>

        <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] mb-2 block">
          Payment Received
        </span>
        
        <h1 className="text-3xl font-black text-green-900 tracking-tight italic mb-4">
          You're All Set!
        </h1>
        
        <p className="text-[13px] text-gray-500 font-medium italic mb-10 leading-relaxed px-4">
          Your garden limits have been lifted. You now have full access to the Plant Identifier, Garden Builder, and all Expert Guides.
        </p>

        <div className="pt-2">
          <Link 
            href="/dashboard" 
            className="block w-full bg-green-900 text-white font-black uppercase tracking-widest py-5 rounded-[1.5rem] shadow-xl shadow-green-900/20 active:scale-95 transition-all text-[11px]"
          >
            Go to My Garden Dashboard
          </Link>
        </div>

        <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Happy Gardening, Auckland
        </p>
        
        <p className="mt-3 text-[8px] text-gray-300 font-bold uppercase tracking-widest">
          A receipt has been sent to your email.
        </p>
      </div>
    </main>
  );
}

// 2. Main page export with Suspense wrapper
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fbf9] flex items-center justify-center">
        <p className="text-green-900 font-black uppercase tracking-widest text-[11px] animate-pulse">
          Loading Garden Data...
        </p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
</file>

<file path="src/app/guides/page.tsx">
'use client'
import Navigation from "../../components/Navigation";
import Link from "next/link";
import PageHelp from "../../components/PageHelp";
import { Target, ArrowRight } from 'lucide-react'; 

export default function GuidesPage() {
  const categories = [
    { name: "Pests and Diseases", icon: "🐜", href: "/guides/pests", desc: "Diagnosis & Cures" },
    { name: "Garden Tools", icon: "🛠️", href: "/guides/tools", desc: "The Editor's Kit" },
    { name: "Feeding", icon: "🧪", href: "/guides/feeding", desc: "Nutrients & Fertilizers" },
  ];

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-32">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-green-900 leading-none">Expert Guides</h1>
          <PageHelp 
            title="Expert Guides"
            description="Access specialized knowledge for maintaining your Auckland garden throughout the year."
            bullets={[
              "The Planting Masterclass for new additions",
              "Weed identification and removal strategies",
              "Specific guides for pests, tools, and maintenance"
            ]}
          />
        </div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Grow like a pro</p>
      </header>

      {/* FEATURED: PLANTING MASTERCLASS */}
      <section className="mb-6">
        <Link href="/guides/planting" className="block no-underline">
          <div className="bg-[#2d5a3f] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden active:scale-[0.98] transition-all group">
            <div className="relative z-10">
              <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block text-white">Essential Reading</span>
              <h2 className="text-2xl font-bold mb-2 tracking-tight leading-none">The Ultimate Planting Guide<br/></h2>
              <p className="text-green-100 text-sm mb-6 leading-relaxed opacity-90 max-w-[220px]">
                Give your plants the best chance at success.
              </p>
              <div className="bg-white text-[#2d5a3f] px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest inline-block group-hover:bg-green-50 transition-colors">
                Read Guide
              </div>
            </div>
            <span className="absolute -bottom-4 -right-4 text-8xl opacity-10">🪴</span>
          </div>
        </Link>
      </section>

      {/* COMMON WEEDS BUTTON */}
      <section className="mb-4 relative z-10">
        <Link href="/guides/weeds" className="block no-underline">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🥀</div>
              <div>
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Common Weeds</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Identification & Kill Guide</p>
              </div>
            </div>
            <span className="text-gray-200 group-hover:text-amber-600 transition-colors text-xl mr-2">→</span>
          </div>
        </Link>
      </section>

      {/* CATEGORY LIST */}
      <section className="flex flex-col gap-4 relative z-10 mb-12">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            href={cat.href} 
            className="block no-underline cursor-pointer"
          >
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-active:bg-green-50 transition-colors">{cat.icon}</div>
                <div>
                  <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.desc}</p>
                </div>
              </div>
              <span className="text-gray-200 group-hover:text-green-600 transition-colors text-xl mr-2">→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* DISCOVERY SECTION */}
      <section className="space-y-4">
        <h2 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
          <span>Discovery Tools</span>
          <span className="h-[1px] bg-green-200 flex-grow"></span>
        </h2>

        <div className="grid grid-cols-1">
          {/* Matchmaker Tool Button */}
          <Link 
  href="/match" // Ensure this matches your actual file path (e.g., /app/matchmaker/page.tsx)
  className="w-full bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all no-underline"
>
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
      <Target className="text-green-800" size={22} />
    </div>
    <div>
      <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Plant Matchmaker</h3>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Find the perfect match for your space</p>
    </div>
  </div>
  <ArrowRight size={14} className="text-gray-200 group-hover:text-green-600 transition-colors mr-2" />
</Link>
        </div>
      </section>

      <Navigation />
    </main>
  );
}
</file>

<file path="src/app/page.tsx">
import Link from "next/link";
import { createSupabaseServer } from "../supabaseServer";

export default async function LandingPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Get the current Auckland month (e.g., 4 for April)
  const currentMonthNumber = new Date().getMonth() + 1; 
  const monthName = new Date().toLocaleString('en-NZ', { month: 'long' });
  const monthShort = new Date().toLocaleString('en-NZ', { month: 'short' });

  // 2. Fetch the Expert Advice from Supabase (for the guest preview box)
  const { data: featured } = await supabase
    .from('featured_advice')
    .select('*')
    .eq('month_number', currentMonthNumber)
    .single();

  // 3. Fallback logic for the Expert Advice box
  const displayData = featured || {
    plant_name: "Star Jasmine",
    care_note: "A generally hardy and fast growing vine with fragrant flowers in November, add to your garden to see specific care and plant health advice.",
    image_url: "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/star-jasmine-trachelospermum-jasminoides-garden-design_18028.webp",
  };

  // 4. FEATURED GARDEN IMAGE (Pulling from your Garden Archive)
  // This matches your April 2026 featured photo
  const featuredGardenImg = "https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260129134358.jpg";

  return (
    <main className="min-h-screen bg-[#f8fbf9] text-gray-900">
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/10">
        
        {/* Softened Shadow: from-black/40 instead of heavy green/90 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />
        
        {/* DYNAMIC IMAGE: Now pulls your actual featured garden photo */}
        <img 
          src={featuredGardenImg} 
          alt="Featured Auckland Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-16">
          <div className="flex justify-end">
            {!user && (
              <Link href="/login" className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-green-900 shadow-sm">
                Sign In
              </Link>
            )}
          </div>

          <div className="pb-6">
            <h1 className="text-2xl font-black text-white italic uppercase mb-6 leading-none tracking-tighter [text-shadow:_0_1px_10px_rgb(0_0_0_/_20%)]">
              Featured: {monthName}
            </h1>
            
            <Link 
              href={user ? "/calendar" : "/login"} 
              className="inline-block w-full text-center bg-white text-[#2d5a3f] py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-xl active:scale-95 transition-all"
            >
              {user ? "View My Calendar" : "Start Your Garden"}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC GUEST PREVIEW (Advice section) */}
      {!user && (
        <section className="px-8 -mt-10 relative z-30 mb-12">
          <div className="bg-white rounded-[3rem] shadow-xl border border-green-50 overflow-hidden">
             <img 
               src={displayData.image_url} 
               className="w-full h-48 object-cover" 
               alt={displayData.plant_name} 
             />
             
             <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full inline-block mb-3">
                      Expert Advice • {monthShort}
                    </span>
                    <h3 className="text-xl font-black text-gray-800 tracking-tight">
                      {displayData.plant_name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl">
                    {displayData.emoji || '🌿'}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed font-medium italic mb-6">
                  "{displayData.care_note}"
                </p>

                <Link href="/login" className="block w-full py-4 bg-gray-50 text-gray-400 text-center rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-gray-100">
                  + Add to My Garden
                </Link>
             </div>
          </div>
        </section>
      )}

      {/* 3. CORE FEATURES */}
      <section className="px-8 py-8 space-y-12">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/plants" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">🔍</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Library</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">Plant Finder</p>
          </Link>
          
          <Link href="/guides" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm active:scale-95 transition-all">
            <div className="text-2xl mb-3">📖</div>
            <h3 className="font-extrabold text-sm text-green-900 leading-tight">Guides</h3>
            <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">In depth guides</p>
          </Link>
        </div>

        <div className="text-center pb-12">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Explore Auckland Favorites</p>
          <Link href="/plants" className="inline-flex items-center gap-3 text-[11px] font-black text-green-800 bg-green-50 px-10 py-5 rounded-full border border-green-100 tracking-widest uppercase shadow-inner">
            A-Z Plant Library ➔
          </Link>
        </div>
      </section>

      <footer className="pb-24 text-center">
         <Link href="/about" className="group inline-flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-all">
           {/* Small, subtle version of your logo instead of the 'Designed by' text */}
           <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all">
             <img 
               src="/pglogo.png" 
               alt="Pocket Gardener" 
               className="w-12 h-12 object-contain"
             />
           </div>
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
             Pocket Gardener • v1.0
           </span>
         </Link>
      </footer>
    </main>
  );
}
</file>

<file path="src/components/Navigation.tsx">
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  // Define paths where the navigation bar should be hidden
  const hideOnPaths = ['/', '/login'];

  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-6 left-3 right-3 max-w-md mx-auto bg-white/90 backdrop-blur-lg border border-gray-100 rounded-full py-2 shadow-2xl z-50">
      <div className="grid grid-cols-5 items-center w-full px-1">
        
        {/* Calendar */}
  <Link href="/calendar" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/calendar' ? 'scale-125 mb-1' : 'opacity-70'}`}>🗓️</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/calendar' ? 'text-green-950' : 'text-gray-400'}`}>Calendar</span>
  </Link>

  {/* GARDEN */}
  <Link href="/dashboard" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/dashboard' ? 'scale-125 mb-1' : 'opacity-70'}`}>🏡</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/dashboard' ? 'text-green-950' : 'text-gray-400'}`}>Garden</span>
  </Link>
  
  {/* LIBRARY */}
  <Link href="/plants" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/plants' ? 'scale-125 mb-1' : 'opacity-70'}`}>🌿</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/plants' ? 'text-green-950' : 'text-gray-400'}`}>Library</span>
  </Link>

  {/* GUIDES */}
  <Link href="/guides" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/guides' ? 'scale-125 mb-1' : 'opacity-70'}`}>📖</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/guides' ? 'text-green-950' : 'text-gray-400'}`}>Guides</span>
  </Link>

  {/* FEATURE */}
  <Link href="/feature" className="flex flex-col items-center group">
    <span className={`text-lg transition-transform ${pathname === '/feature' ? 'scale-125 mb-1' : 'opacity-70'}`}>🖼️</span>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/feature' ? 'text-green-950' : 'text-gray-400'}`}>Feature</span>
  </Link>
        
      </div>
    </nav>
  );
}
</file>

<file path="package.json">
{
  "name": "pocket-gardener",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@capacitor/cli": "^8.0.2",
    "@capacitor/core": "^8.0.2",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@stripe/stripe-js": "^8.6.4",
    "@supabase/auth-helpers-nextjs": "^0.15.0",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.101.1",
    "browser-image-compression": "^2.0.2",
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.563.0",
    "next": "16.1.3",
    "openai": "^6.17.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "stripe": "^20.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
</file>

<file path="src/app/plants/[id]/page.tsx">
'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../lib/supabaseClient'
import Navigation from "../../../components/Navigation"
import PlantThumbnail from "../../../components/PlantThumbnail"
import { Check, Search, Sparkles, Quote } from 'lucide-react'

export default function PlantDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const id = params?.id
  const mode = searchParams?.get('mode')

  const [plant, setPlant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [userPlantRecordId, setUserPlantRecordId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [activeRemedyId, setActiveRemedyId] = useState<string | null>(null)
  const [remedies, setRemedies] = useState<any[]>([])
  const [personalNote, setPersonalNote] = useState("")
  const [nickname, setNickname] = useState<string | null>(null)
  const [plantPhotos, setPlantPhotos] = useState<any[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [issueHistory, setIssueHistory] = useState<any[]>([])

  const [quantity, setQuantity] = useState<number>(1)
  const [lengthMetres, setLengthMetres] = useState<string>("")

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const getLevelStyles = (level: string) => {
    const l = level?.toLowerCase();
    if (l === 'hardy' || l === 'high') return { bg: 'bg-[#1B5E20]', text: 'text-white' };
    if (l === 'semi-hardy' || l === 'medium') return { bg: 'bg-[#4CAF50]', text: 'text-white' };
    return { bg: 'bg-[#C8E6C9]', text: 'text-[#1B5E20]' };
  }

  const isHedgePlant = (plant?.task_category || plant?.plant_type || '').toLowerCase() === 'hedge'

  async function fetchIssueHistory(userPlantId: string) {
    const { data } = await supabase
      .from('plant_logs')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setIssueHistory(data)
  }

  async function handleResolveIssue(logId: string) {
    setIsProcessing(true)
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)

    if (!error) {
      if (userPlantRecordId) fetchIssueHistory(userPlantRecordId)
    }
    setIsProcessing(false)
  }

  async function fetchPlantPhotos(userPlantId: string) {
    const { data } = await supabase
      .from('plant_photos')
      .select('*')
      .eq('user_plant_id', userPlantId)
      .order('created_at', { ascending: false })
    if (data) setPlantPhotos(data)
  }

  async function handleAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userPlantRecordId) return
    try {
      setUploadingPhoto(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${userPlantRecordId}-${Date.now()}.${fileExt}`
      const filePath = `plant-progress/${fileName}`
      await supabase.storage.from('weed-images').upload(filePath, file)
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(filePath)
      const { error } = await supabase.from('plant_photos').insert([{ user_plant_id: userPlantRecordId, photo_url: publicUrl }])
      if (!error) fetchPlantPhotos(userPlantRecordId)
    } catch (err) {
      console.error(err)
    } finally {
      setUploadingPhoto(false)
    }
  }

  async function handleUpdateNickname() {
    if (!userPlantRecordId) return
    const newNickname = window.prompt(`Give your ${plant.common_name} a nickname:`, nickname || "")
    if (newNickname !== null) {
      const { error } = await supabase.from('user_plants').update({ nickname: newNickname }).eq('id', userPlantRecordId)
      if (!error) setNickname(newNickname)
    }
  }

  useEffect(() => {
    async function fetchPlantAndStatus() {
      if (!id) return

      const { data: plantData } = await supabase.from("plants").select("*").eq('id', id).single()
      if (plantData) setPlant(plantData)

      const { data: remedyData } = await supabase
        .from('plant_remedies')
        .select('*')
        .or(`specific_plant_id.eq.${id},is_universal.eq.true`)

      if (remedyData) setRemedies(remedyData)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userPlantRecord } = await supabase
          .from('user_plants')
          .select('id, personal_notes, nickname, quantity, length_metres')
          .eq('user_id', user.id)
          .eq('plant_id', Number(id))
          .single()

        if (userPlantRecord) {
          setUserPlantRecordId(userPlantRecord.id)
          setPersonalNote(userPlantRecord.personal_notes || plantData?.pro_tip || "")
          setNickname(userPlantRecord.nickname)
          setQuantity(userPlantRecord.quantity || 1)
          setLengthMetres(
            userPlantRecord.length_metres !== null && userPlantRecord.length_metres !== undefined
              ? String(userPlantRecord.length_metres)
              : ""
          )
          fetchIssueHistory(userPlantRecord.id)
          fetchPlantPhotos(userPlantRecord.id)
        } else {
          setQuantity(1)
          setLengthMetres("")
        }
      }

      setLoading(false)
    }

    fetchPlantAndStatus()
  }, [id, supabase])

 async function handleLogIssue(issueType: string, remedyTitle?: string) {
  if (!userPlantRecordId) return
  setIsProcessing(true)

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('plant_logs').insert([{
    user_id: user?.id,
    user_plant_id: userPlantRecordId,
    issue_type: issueType,
    status: 'Ongoing'
  }])

  if (!error) {
    await supabase
      .from('user_plants')
      .update({
        is_sick: true,
        current_issue: issueType,
        current_remedy: remedyTitle || null,
      })
      .eq('id', userPlantRecordId)

    alert(`Logged: ${issueType}. I'll check back in with you in 30 days!`)
    fetchIssueHistory(userPlantRecordId)
  }

  setIsProcessing(false)
}

  async function handleRemove() {
    if (!userPlantRecordId || !window.confirm(`Remove ${plant.common_name}?`)) return
    setIsDeleting(true)
    const { error } = await supabase.from('user_plants').delete().eq('id', userPlantRecordId)
    if (!error) router.push('/dashboard')
    setIsDeleting(false)
  }

  async function handleAddToProject() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const safeQuantity = isHedgePlant
  ? null
  : Number.isFinite(quantity) && quantity > 0
  ? quantity
  : 1

const safeLengthMetres =
  isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
    ? Number(lengthMetres)
    : null

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: Number(id),
  is_project: true,
  status: 'Planning',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}])

    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  async function handleDirectAdd() {
    setIsProcessing(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      setIsProcessing(false)
      alert("Please log in first!")
      return
    }

    const safeQuantity = isHedgePlant
  ? null
  : Number.isFinite(quantity) && quantity > 0
  ? quantity
  : 1

const safeLengthMetres =
  isHedgePlant && lengthMetres.trim() !== '' && !Number.isNaN(Number(lengthMetres))
    ? Number(lengthMetres)
    : null

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: Number(id),
  is_project: false,
  status: 'Ongoing',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}])

    if (!error) router.push('/dashboard')
    setIsProcessing(false)
  }

  const filteredRemedies = remedies.filter(r => {
    if (!isSearching) return r.specific_plant_id === Number(id)
    const searchString = (r.issue_type + (r.search_keywords || "") + r.remedy_title).toLowerCase()
    return searchString.includes(searchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(r => r.specific_plant_id === Number(id))
  const universalMatches = filteredRemedies.filter(r => r.is_universal === true && r.specific_plant_id !== Number(id))

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest text-xs">Loading...</div>
  if (!plant) return <div className="p-20 text-center">Plant not found.</div>

  const hardinessStyle = getLevelStyles(plant.hardiness_level)
  const maintenanceStyle = getLevelStyles(plant.maintenance_level)

  return (
    <main className="min-h-screen bg-white pb-40 text-gray-900">
      <div className="h-[45vh] bg-[#f0f7f3] relative flex items-center justify-center pt-8 pb-16">
        <button onClick={() => router.back()} className="absolute top-12 left-6 z-30 bg-white/90 w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-gray-400">←</button>
        <div className="relative z-10 w-48 h-48 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white group">
          <PlantThumbnail
            plant={plantPhotos[0] ? { ...plant, image_url: plantPhotos[0].photo_url } : plant}
            size="lg"
          />
          {userPlantRecordId && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md py-3 text-[8px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {uploadingPhoto ? 'Uploading...' : 'Update Main Photo'}
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="px-8 -mt-10 bg-white rounded-t-[3.5rem] relative z-20 border-t border-gray-100">
        <header className="pt-10 mb-8 relative">
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>

          <div className="absolute top-14 right-0 flex flex-col gap-3 items-end">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">{plant.hardiness_level}</span>
              <div className={`w-8 h-8 rounded-lg ${hardinessStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${hardinessStyle.text}`}>{plant.hardiness_level?.[0]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 italic lowercase">
                {plant.maintenance_level === 'Medium' ? 'moderate care' : `${plant.maintenance_level?.toLowerCase()} care`}
              </span>
              <div className={`w-8 h-8 rounded-lg ${maintenanceStyle.bg} flex items-center justify-center shadow-sm`}>
                <span className={`text-[10px] font-black ${maintenanceStyle.text}`}>{plant.maintenance_level?.[0]}</span>
              </div>
            </div>
          </div>

          <div className="pr-32">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black text-green-900 tracking-tight uppercase italic leading-tight">
                {nickname || plant.common_name}
              </h1>
              {userPlantRecordId && (
                <button onClick={handleUpdateNickname} className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 active:scale-90 transition-all">
                  <span className="text-[10px] text-gray-400">✎</span>
                </button>
              )}
            </div>
            {nickname && <p className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] mb-1 italic">{plant.common_name}</p>}
            <p className="text-sm font-medium italic text-gray-400">{plant.scientific_name}</p>
          </div>
        </header>

        <section className="mb-10 relative">
          <div className="bg-green-900 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
            <Quote className="absolute -top-2 -left-2 text-white/5 w-24 h-24 rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">The Gardener's View</span>
              </div>
              <p className="text-white text-[15px] font-medium italic leading-relaxed">
                {plant.description || plant.overview || "This plant is a hardy addition to the New Zealand landscape, known for its resilience and unique aesthetic."}
              </p>
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleAddPhoto} className="hidden" accept="image/*" />
        </section>

        <div className="mb-10 flex flex-col items-center gap-4">
          {userPlantRecordId && !mode && (
            <div className="w-full text-center py-4 bg-green-50 rounded-2xl border border-green-100 text-[10px] font-black text-green-700 uppercase tracking-widest italic">
              In Your Garden
            </div>
          )}

          {((mode === 'builder') || (!mode && !userPlantRecordId)) && (
            <div className="w-full bg-gray-50 rounded-[2rem] border border-gray-100 p-5">
              <div className="grid grid-cols-1 gap-4">
  {isHedgePlant ? (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Hedge Length (Lineal Metres)
      </label>
      <input
        type="number"
        min={0}
        step="0.1"
        value={lengthMetres}
        onChange={(e) => setLengthMetres(e.target.value)}
        placeholder="Enter hedge length"
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
      <p className="mt-2 text-[10px] font-bold text-gray-400 italic">
        Hedge tasks use lineal metres rather than plant count.
      </p>
    </div>
  ) : (
    <div>
      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
        Quantity
      </label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-300"
      />
    </div>
  )}

                {!mode && !userPlantRecordId && (
                  <button
                    onClick={handleDirectAdd}
                    disabled={isProcessing}
                    className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all mt-2"
                  >
                    {isProcessing ? 'Adding...' : 'Add to My Garden'}
                  </button>
                )}

                {mode === 'builder' && (
                  <>
                    <button
                      onClick={handleAddToProject}
                      disabled={isProcessing}
                      className="w-full py-6 rounded-[2.5rem] bg-[#2d5a3f] text-white font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 transition-all"
                    >
                      {isProcessing ? 'Adding...' : 'Add to Project List'}
                    </button>

                    <button
                      onClick={handleDirectAdd}
                      disabled={isProcessing}
                      className="text-[10px] font-black text-green-700/50 uppercase tracking-[0.2em] border-b border-green-700/20 pb-1 italic hover:text-green-700 transition-colors"
                    >
                      or add directly to current garden
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="mb-10 px-2">
          <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 underline decoration-green-200 decoration-4 underline-offset-4">Care Requirements</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-2xl pt-1">✂️</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Trimming</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.trim_notes || 'Trim on a seasonal basis or as needed.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🧪</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Feeding</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.feed_notes || 'Liquid and granular feed following trim.'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl pt-1">🩺</span>
              <div>
                <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Health</h4>
                <p className="text-xs text-gray-500 leading-relaxed italic">{plant.health_notes || 'Check for signs of wilting or browning (see issues below).'}</p>
              </div>
            </div>
          </div>
        </section>

        {userPlantRecordId && personalNote && (
          <div className="mb-10 p-7 bg-amber-50/40 rounded-[2.5rem] border-2 border-red-200">
            <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] mb-3">💡 Gardener's Pro Tip</h4>
            <p className="w-full text-[13px] text-gray-700 leading-relaxed font-medium italic">{personalNote}</p>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mb-10 px-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em]">⚠️ Common Issues</h4>
              {isSearching && (
                <button onClick={() => { setIsSearching(false); setSearchQuery("") }} className="text-[10px] font-bold text-orange-500 uppercase">Clear</button>
              )}
            </div>

            {isSearching && (
              <div className="mb-4 relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search symptoms (e.g. brown leaf, bugs)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 ring-orange-400"
                />
              </div>
            )}

            <div className="space-y-3">
              {!isSearching && specificMatches.length > 0 ? (
                specificMatches.slice(0, 3).map((r) => (
                  <div key={r.id} className="overflow-hidden">
                    <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                        <span className="text-[7px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Plant Specific</span>
                      </div>
                      <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeRemedyId === r.id && (
                      <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100 animate-in fade-in">
                        <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                        <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                        <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                      </div>
                    )}
                  </div>
                ))
              ) : !isSearching && (
                <div className="text-center py-4 opacity-40 italic text-[11px] text-orange-800 font-bold uppercase tracking-widest">No specific issues listed</div>
              )}

              {isSearching && universalMatches.length > 0 && (
                <>
                  <div className="pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Global Database Results</div>
                  {Array.from(new Map(universalMatches.map(item => [item.issue_type, item])).values()).map((r: any) => (
                    <div key={r.id} className="overflow-hidden">
                      <button onClick={() => setActiveRemedyId(activeRemedyId === r.id ? null : r.id)} className={`w-full py-4 px-6 rounded-2xl border flex items-center justify-between transition-all ${activeRemedyId === r.id ? 'bg-white border-orange-400 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex flex-col items-start">
                          <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight">{r.issue_type}</span>
                          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{r.category || 'General'}</span>
                        </div>
                        <span className={`text-orange-400 font-bold transition-transform ${activeRemedyId === r.id ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      {activeRemedyId === r.id && (
                        <div className="p-4 mt-1 bg-white rounded-2xl border border-orange-100">
                          <p className="text-[10px] font-black text-orange-800 uppercase mb-1">{r.remedy_title}</p>
                          <p className="text-xs text-gray-600 italic leading-relaxed mb-4">"{r.remedy_description}"</p>
                          <button
  onClick={() =>
  handleLogIssue(
    r.issue_type,
    `${(r as any).remedy_title}: ${(r as any).remedy_description}`
  )
}
  disabled={isProcessing}
  className="w-full py-2 bg-orange-50 text-orange-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 active:scale-95 transition-all"
>
  Log this issue
</button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {!isSearching && (
                <div className="mt-6 p-6 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 italic">Can't see the issue here?</p>
                  <button
                    onClick={() => setIsSearching(true)}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm text-[10px] font-black text-green-800 uppercase tracking-widest active:scale-95 transition-all"
                  >
                    <Search size={12} />
                    Search Global Database
                  </button>
                </div>
              )}

              {isSearching && filteredRemedies.length === 0 && (
                <div className="text-center py-10 text-[11px] text-gray-400 font-bold uppercase italic">No matches found for "{searchQuery}"</div>
              )}
            </div>
          </div>
        )}

        {userPlantRecordId && issueHistory.length > 0 && (
          <div className="mb-10 px-2 border-t border-gray-50 pt-8">
            <h4 className="text-[14px] font-black text-black-800 uppercase tracking-[0.2em] mb-4">📜 Issue History</h4>
            <div className="space-y-4">
              {issueHistory.map((log) => (
                <div key={log.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex-grow">
                    <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{log.issue_type}</p>
                    <p className="text-[10px] text-gray-400 italic">Logged: {new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {log.status === 'Ongoing' && (
                      <button
                        onClick={() => handleResolveIssue(log.id)}
                        disabled={isProcessing}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-800 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-all"
                      >
                        <Check size={10} strokeWidth={4} />
                        Resolve
                      </button>
                    )}
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {log.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userPlantRecordId && (
          <div className="mt-8 text-center pb-20">
            <button onClick={handleRemove} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 hover:text-red-400 transition-colors italic">
              × Remove from My Garden
            </button>
          </div>
        )}
      </div>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/feature/page.tsx">
'use client'

import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronRight, Camera, User, Plus } from 'lucide-react'
import Navigation from '../../components/Navigation'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'

const GARDEN_ARCHIVE = [
  {
    id: 'apr-26',
    month: 'April 2026',
    style: 'Sub-tropical',
    submittedBy: 'Joe from Auckland',
    description: 'Subtropical garden with multiple textures, colours and heights.',
    image: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260129134358.jpg',
    plantNames: ['Rhododendron Vireya', 'Kentia Palm', 'Gardenia', 'Buxus Japonica', 'Star Jasmine']
  },
  {
    id: 'mar-26',
    month: 'March 2026',
    style: 'Lush garden',
    submittedBy: 'Sarah from Titirangi',
    description: 'A selection of lush plants and natives to create a full and thriving garden.',
    image: 'https://sonxnuxhrivzgcevtdtc.supabase.co/storage/v1/object/public/plants/IMG20260113164903.jpg',
    plantNames: ['Tractor Seat Plant', 'Lomandra', 'Pratia', 'Puriri']
  }
]

export default function GardenFeatures() {
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const [favorites, setFavorites] = useState<string[]>([])
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [currentPlants, setCurrentPlants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const current = GARDEN_ARCHIVE[featuredIndex]

  // 1. Fetch Featured Plants (UI Display)
  useEffect(() => {
    async function fetchPlantDetails() {
      if (!current?.plantNames?.length) return
      setLoading(true)
      
      const { data, error } = await supabase
        .from('plants')
        .select('id, common_name, image_url')
        .in('common_name', current.plantNames)

      if (error) {
        console.error('Error fetching featured plants:', error)
        setCurrentPlants([])
      } else if (data) {
        const uniqueMap = new Map();
        data.forEach((p) => { if (!uniqueMap.has(p.common_name)) uniqueMap.set(p.common_name, p); });
        const sorted = Array.from(uniqueMap.values()).sort((a: any, b: any) => a.common_name.localeCompare(b.common_name))
        setCurrentPlants(sorted)
      }
      setLoading(false)
    }
    fetchPlantDetails()
  }, [featuredIndex, supabase])

  // 2. Load Favorites
  useEffect(() => {
    const saved = localStorage.getItem('garden-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id]
    setFavorites(newFavs)
    localStorage.setItem('garden-favorites', JSON.stringify(newFavs))
  }

  const handlePlantClick = (plantId: number) => {
    router.push(`/plants/${plantId}`)
  }

  // 3. The Professional Formatted Email Logic
  const handleEmailSubmit = async () => {
    setLoading(true)
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      alert("Please log in to submit your garden!");
      setLoading(false)
      return;
    }

    const { data: userPlants, error: plantsError } = await supabase
      .from('user_plants')
      .select(`
        plant_id,
        plants (
          common_name
        )
      `)
      .eq('user_id', user.id);

    if (plantsError) {
      console.error('DEBUG - Query Error:', plantsError);
      alert(`Database Error: ${plantsError.message}`);
      setLoading(false)
      return;
    }

    const plantListText = (userPlants && userPlants.length > 0)
      ? userPlants
          .map((item: any) => {
            const p = item.plants;
            return Array.isArray(p) ? p[0]?.common_name : p?.common_name;
          })
          .filter(Boolean)
          .join(', ')
      : "No plants in my garden yet";

    // --- UPDATED EMAIL FORMATTING ---
    const recipient = "pocketgardeneruploads@gmail.com";
    const subject = "Pocket Gardener Feature Submission";
    
    // Using \r\n inside the join for ultimate reliability across devices
    const bodyText = [
      'Hi Pocket Gardener,',
      '',
      "I'd love to feature my garden in the app!",
      '',
      'My garden style: [Type here]',
      'My location: [Type here]',
      `My current app plants: ${plantListText}`,
      '',
      'Please attach photos of your garden to this email before sending.'
    ].join('\r\n');

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    setLoading(false);
    window.location.href = mailtoUrl;
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] pb-40">
      <section className="relative h-[55vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img 
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={current.image} 
            className="w-full h-full object-cover" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-green-500 text-[8px] font-black uppercase px-2 py-1 rounded-md tracking-widest">Community Feature</span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{current.month}</p>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">{current.style}</h1>
            <div className="flex items-center gap-1.5 opacity-80">
                <User size={10} className="text-green-400" />
                <p className="text-[10px] font-bold uppercase tracking-tight">Featured: {current.submittedBy}</p>
            </div>
          </div>
          <button onClick={() => toggleFavorite(current.id)} className={`p-4 rounded-3xl backdrop-blur-md transition-all active:scale-75 ${favorites.includes(current.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/20'}`}>
            <Heart size={20} fill={favorites.includes(current.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </section>

      <section className="p-6">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 -mt-10 relative z-20">
          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">
            <span className="text-green-700 font-black mr-1 text-[10px] uppercase">The Story:</span>
            {current.description}
          </p>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Featured Plants (A-Z)</h2>
          <div className="grid grid-cols-1 gap-3">
            {loading ? (
              <div className="text-[10px] font-bold text-gray-300 animate-pulse uppercase text-center">Syncing...</div>
            ) : (
              currentPlants.map((plant) => (
                <button key={plant.id} onClick={() => handlePlantClick(plant.id)} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl border border-gray-100 transition-all active:scale-[0.97] hover:bg-green-50/50 group w-full text-left">
                  <img src={plant.image_url} alt={plant.common_name} className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white" />
                  <div className="flex-1">
                    <h3 className="text-[11px] font-black uppercase text-gray-800 tracking-tight leading-none group-hover:text-green-800 transition-colors">{plant.common_name}</h3>
                    <p className="text-[8px] font-bold text-green-600/60 uppercase mt-1">Tap for care info</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 group-hover:border-green-200 transition-all">
                    <Plus size={14} className="text-gray-400 group-hover:text-green-600" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="px-6 mb-8">
        <button onClick={handleEmailSubmit} className="w-full bg-green-900 rounded-[2rem] p-6 text-white flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="text-left">
                <h4 className="text-sm font-black uppercase italic tracking-tight">Feature your garden?</h4>
                <p className="text-[10px] opacity-70">Send a photo to be featured next month</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl group-hover:bg-white/30 transition-colors">
                <Camera size={20} />
            </div>
        </button>
      </section>

      <section className="px-6 space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Garden Archive</h2>
        {GARDEN_ARCHIVE.map((garden, index) => (
          <button key={garden.id} onClick={() => setFeaturedIndex(index)} className={`w-full flex items-center gap-4 p-3 rounded-3xl transition-all border ${featuredIndex === index ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 shadow-sm'}`}>
            <img src={garden.image} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 text-left">
              <p className="text-[8px] font-black text-gray-400 uppercase">{garden.month}</p>
              <h4 className="text-xs font-black uppercase text-green-950">{garden.style}</h4>
            </div>
            <ChevronRight size={16} className={featuredIndex === index ? 'text-green-600' : 'text-gray-200'} />
          </button>
        ))}
      </section>
      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/dashboard/page.tsx">
'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { createSupabaseBrowserClient } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Camera, ArrowRight, Check, AlertCircle, Search, X } from 'lucide-react'
import Navigation from '../../components/Navigation'
import PlantThumbnail from '../../components/PlantThumbnail'
import WelcomeOverlay from '../../components/WelcomeOverlay'
import UpgradeButton from '../../components/UpgradeButton'

interface Plant {
  id: string;
  common_name: string;
  scientific_name?: string;
  plant_type?: string;
  image_url?: string;
}

interface UserPlant {
  id: string;
  plant_id: number;
  is_project: boolean;
  nickname?: string;
  plants: Plant;
  latest_photo?: string;
  is_sick?: boolean;
}

interface PlantRemedy {
  id: string | number;
  issue_type: string;
  remedy_title?: string | null;
  remedy_description?: string | null;
  category?: string | null;
  specific_plant_id?: number | null;
  is_universal?: boolean | null;
  search_keywords?: string | null;
  shopping_tags?: string[] | null;
}

export default function MyGardenDashboard() {
  const [ownedPlants, setOwnedPlants] = useState<UserPlant[]>([])
  const [projectPlants, setProjectPlants] = useState<UserPlant[]>([])
  const [followUpAlerts, setFollowUpAlerts] = useState<any[]>([])
  const [featuredTip, setFeaturedTip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [userName, setUserName] = useState<string>("Gardener")
  const [gardenPhoto, setGardenPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isPro, setIsPro] = useState(false)

  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueSearchQuery, setIssueSearchQuery] = useState("")
  const [selectedUnhealthyPlant, setSelectedUnhealthyPlant] = useState<UserPlant | null>(null)
  const [remedies, setRemedies] = useState<PlantRemedy[]>([])
  const [loadingRemedies, setLoadingRemedies] = useState(false)
  const [savingIssue, setSavingIssue] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[new Date().getMonth()];

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'Summer': return '☀️';
      case 'Autumn': return '🍂';
      case 'Winter': return '❄️';
      case 'Spring': return '🌱';
      default: return '💡';
    }
  };

  const getSeasonName = (m: number) => {
    if ([7, 8, 9].includes(m)) return 'Spring';
    if ([10, 11, 0].includes(m)) return 'Summer';
    if ([1, 2, 3].includes(m)) return 'Autumn';
    return 'Winter';
  };

  async function getGarden() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUserName(user.user_metadata?.display_name || "Gardener")
        setGardenPhoto(user.user_metadata?.garden_photo || null)

        const [profileRes, plantsRes] = await Promise.all([
          supabase.from('profiles').select('is_pro').eq('id', user.id).maybeSingle(),
          supabase
            .from('user_plants')
            .select(`id, plant_id, is_project, nickname, is_sick, plants (*)`)
            .eq('user_id', user.id),
        ]);

        if (profileRes.data) setIsPro(profileRes.data.is_pro);

        if (plantsRes.data) {
          const plants = plantsRes.data as any[];
          const sorted = [...plants].sort((a, b) => 
            (a.plants?.common_name || "").localeCompare(b.plants?.common_name || "")
          );

          setOwnedPlants(sorted.filter(p => !p.is_project));
          setProjectPlants(sorted.filter(p => p.is_project));

          const ownedIds = plants.filter(p => !p.is_project).map(p => p.plant_id);
          if (ownedIds.length > 0) {
            const season = getSeasonName(new Date().getMonth());
            supabase.from('expert_tips')
              .select('*, plants(common_name)')
              .in('plant_id', ownedIds)
              .or(`season.eq.${season},season.eq.Any`)
              .limit(1)
              .maybeSingle()
              .then(({ data }) => { if (data) setFeaturedTip(data); });
          }
        }

        const thirtyDaysAgo = new Date(); 
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: logs } = await supabase.from('plant_logs')
          .select(`*, user_plants (plants (common_name, id, image_url, plant_type))`)
          .eq('user_id', user.id)
          .eq('status', 'Ongoing')
          .lte('created_at', thirtyDaysAgo.toISOString());

        if (logs) setFollowUpAlerts(logs);
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    getGarden(); 
  }, []);

  async function handleResolveIssue(logId: string, plantName: string) {
    const { error } = await supabase
      .from('plant_logs')
      .update({ status: 'Resolved', resolved_at: new Date().toISOString() })
      .eq('id', logId)

    if (!error) {
      alert(`Great news about your ${plantName}!`)
      getGarden()
    }
  }

  async function openIssueModalForPlant(item: UserPlant) {
    setSelectedUnhealthyPlant(item)
    setIssueSearchQuery("")
    setShowIssueModal(true)
    setLoadingRemedies(true)

    const { data, error } = await supabase
      .from('plant_remedies')
      .select('*')
      .or(`specific_plant_id.eq.${item.plant_id},is_universal.eq.true`)

    if (error) {
      console.error('Error loading remedies:', error)
      setRemedies([])
    } else {
      setRemedies((data ?? []) as PlantRemedy[])
    }

    setLoadingRemedies(false)
  }

  function closeIssueModal() {
    setShowIssueModal(false)
    setIssueSearchQuery("")
    setSelectedUnhealthyPlant(null)
    setRemedies([])
  }

  async function handleToggleUnhealthy(item: UserPlant, checked: boolean) {
  if (checked) {
    // Do not mark the plant as sick yet.
    // Only open the issue picker.
    await openIssueModalForPlant(item)
    return
  }

  await supabase
    .from('user_plants')
    .update({
      is_sick: false,
      current_issue: null,
      current_remedy: null,
      current_shopping_tags: null,
    })
    .eq('id', item.id)

  getGarden()
}

  async function handleSelectIssue(remedy: PlantRemedy) {
    if (!selectedUnhealthyPlant) return

    setSavingIssue(true)

    const remedyText = remedy.remedy_title && remedy.remedy_description
      ? `${remedy.remedy_title}: ${remedy.remedy_description}`
      : remedy.remedy_description || remedy.remedy_title || null

    const { data: { user } } = await supabase.auth.getUser()

    const [updateRes, logRes] = await Promise.all([
      supabase
        .from('user_plants')
        .update({
          is_sick: true,
          current_issue: remedy.issue_type,
          current_remedy: remedyText,
          current_shopping_tags: remedy.shopping_tags || [],
        })
        .eq('id', selectedUnhealthyPlant.id),
      supabase
        .from('plant_logs')
        .insert([{
          user_id: user?.id,
          user_plant_id: selectedUnhealthyPlant.id,
          issue_type: remedy.issue_type,
          status: 'Ongoing',
        }])
    ])

    if (updateRes.error) {
      console.error('Error updating unhealthy plant:', updateRes.error)
    }
    if (logRes.error) {
      console.error('Error inserting plant log:', logRes.error)
    }

    setSavingIssue(false)
    closeIssueModal()
    getGarden()
    router.push('/calendar')
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return;

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) return;

      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('weed-images').upload(`garden-photos/${fileName}`, file);
      const { data: { publicUrl } } = supabase.storage.from('weed-images').getPublicUrl(`garden-photos/${fileName}`);
      await supabase.auth.updateUser({ data: { garden_photo: publicUrl } });
      setGardenPhoto(publicUrl);
    } catch (err) { 
      alert("Error uploading photo"); 
    } finally { 
      setUploading(false); 
    }
  };

  const handleBulkMove = async () => {
    const { error } = await supabase
      .from('user_plants')
      .update({ is_project: false })
      .in('id', selectedIds)

    if (!error) { 
      setSelectedIds([]); 
      getGarden(); 
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-800/20 border-t-green-800 rounded-full animate-spin"></div>
        <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Loading Your Garden...</p>
      </div>
    </div>
  )

  const groupedByType = ownedPlants.reduce((acc, item) => {
    const type = item.plants?.plant_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const sortedCategories = Object.keys(groupedByType).sort();

  const filteredRemedies = remedies.filter((r) => {
    if (!issueSearchQuery.trim()) return true
    const searchString = `${r.issue_type || ''} ${r.remedy_title || ''} ${r.remedy_description || ''} ${r.search_keywords || ''}`.toLowerCase()
    return searchString.includes(issueSearchQuery.toLowerCase())
  })

  const specificMatches = filteredRemedies.filter(
    (r) => Number(r.specific_plant_id) === Number(selectedUnhealthyPlant?.plant_id)
  )
  const universalMatches = filteredRemedies.filter(
    (r) => r.is_universal === true && Number(r.specific_plant_id) !== Number(selectedUnhealthyPlant?.plant_id)
  )

  return (
    <main className="min-h-screen bg-[#f0f4f1] pb-40 text-gray-900">
      <WelcomeOverlay />

      <section className="relative h-[55vh] w-full overflow-hidden rounded-b-[4rem] shadow-2xl shadow-green-900/20 mb-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10" />
        
        <img 
          src={gardenPhoto || "https://pristinegardens.co.nz/wp-content/uploads/2022/07/20220115_152342.jpg"} 
          alt="My Garden"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 pt-12">
          <div className="flex justify-end">
            <Link href="/about" className="group flex flex-col items-center gap-1.5 active:scale-95 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-white/50 shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img 
                  src="/pglogo.png" 
                  alt="Pocket Gardener Logo"
                  className="w-9 h-9 object-contain" 
                />
              </div>
              <span className="text-[7px] font-black text-white uppercase tracking-[0.2em] [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Profile
              </span>
            </Link>
          </div>

          <div className="pb-4">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none mb-4 [text-shadow:_0_2px_10px_rgb(0_0_0_/_30%)]">
              My Garden
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/90">
                  {userName}
                </p>
                <button 
                  onClick={async () => {
                    const n = window.prompt("Name:", userName); 
                    if (n) { 
                      await supabase.auth.updateUser({ data: { display_name: n } }); 
                      getGarden(); 
                    }
                  }} 
                  className="text-green-400 hover:scale-110 transition-transform"
                >
                  <Pencil size={10} strokeWidth={3} />
                </button>
              </div>

              {isPro && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-500 p-2.5 rounded-full text-white shadow-lg active:scale-90 transition-all border border-green-400"
                >
                  <Camera size={14} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
        
        {uploading && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Saving View...</span>
          </div>
        )}
      </section>

      <div className="px-6 space-y-12">
        {!isPro && (
          <section>
            <div className="bg-green-950 rounded-[3rem] p-8 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border-4 border-amber-400/20">
              <div className="relative z-10">
                <div className="bg-amber-400 text-green-950 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full mx-auto w-fit mb-4">
                  Pro Membership
                </div>
                <h2 className="text-xl font-black mb-2 uppercase tracking-tighter text-white italic leading-none">Unlimited Growth</h2>
                <p className="text-[10px] text-green-200/60 font-medium italic mb-6 px-4">Unlock identification, expert guides, and custom garden photos.</p>
                <UpgradeButton />
              </div>
            </div>
          </section>
        )}

        {followUpAlerts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <AlertCircle size={14} className="text-amber-500" strokeWidth={3} />
              <h2 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Priority Follow-up</h2>
            </div>
            {followUpAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
                <div className="flex gap-4 mb-4">
                  <PlantThumbnail plant={alert.user_plants?.plants} size="sm" />
                  <div>
                    <h3 className="text-sm font-black text-green-950 uppercase leading-tight">{alert.user_plants?.plants?.common_name}</h3>
                    <p className="text-[10px] text-amber-600 mt-1 font-black uppercase tracking-widest italic">{alert.issue_type} check-in</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleResolveIssue(alert.id, alert.user_plants?.plants?.common_name)} className="flex-1 bg-green-800 py-3 rounded-2xl text-[9px] font-black uppercase text-white shadow-lg active:scale-95 transition-all">
                    Recovered!
                  </button>
                  <Link href={`/plants/${alert.user_plants?.plants?.id}?mode=my-garden`} className="flex-1 bg-amber-400 py-3 rounded-2xl text-[9px] font-black uppercase text-green-950 text-center active:scale-95 shadow-lg transition-all">
                    Remedies
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {featuredTip && (
          <section>
            <div className="bg-green-900 rounded-[2.5rem] shadow-2xl p-8 border-b-4 border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{getSeasonIcon(featuredTip.season)}</span>
                <div className="flex flex-col">
                  <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Season Insight</span>
                  <span className="text-white/60 text-[9px] font-black uppercase tracking-widest italic">{featuredTip.plants?.common_name}</span>
                </div>
              </div>
              <p className="text-white text-lg font-medium italic leading-relaxed">"{featuredTip.tip_text}"</p>
            </div>
          </section>
        )}

        {ownedPlants.length > 0 && (
          <section className="space-y-8">
            <div className="pt-2 space-y-10">
              {sortedCategories.map((category) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-[12px] font-black text-green-800/40 uppercase tracking-[0.3em] px-2 flex items-center gap-3">
                    <span>{category}s</span>
                    <span className="h-[1px] bg-green-200 flex-grow"></span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {groupedByType[category].map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/60 p-4 rounded-[2rem] border border-white shadow-sm"
                      >
                        <Link 
                          href={`/plants/${item.plants?.id}?mode=my-garden`} 
                          className="flex items-center justify-between hover:bg-white transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlantThumbnail plant={item.plants} size="sm" />
                            <div>
                              <h4 className="text-s font-black text-green-950 uppercase">
                                {item.nickname || item.plants?.common_name || "Unknown Plant"}
                              </h4>
                              <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">
                                {item.plants?.scientific_name}
                              </p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-gray-300" />
                        </Link>

                        <div className="mt-3 pt-3 border-t border-gray-100">
  <label
    className={`flex items-center gap-2 text-[10px] uppercase tracking-wider rounded-full px-3 py-2 border transition-all active:scale-[0.98] cursor-pointer ${
      item.is_sick
        ? 'bg-red-50 border-red-100 text-red-600 font-black'
        : 'bg-gray-50 border-gray-100 text-gray-400 font-bold active:bg-red-50 active:text-red-500'
    }`}
  >
    <input
      type="checkbox"
      checked={item.is_sick || false}
      onChange={(e) =>
        handleToggleUnhealthy(item, e.target.checked)
      }
      className="accent-red-500"
    />
    Plant is unhealthy
  </label>
</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projectPlants.length > 0 && (
          <section className="space-y-4 pb-10">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 italic">Upcoming Projects</h2>
            <div className="space-y-3">
              {projectPlants.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
                    }} 
                    className={`w-12 h-12 rounded-[1rem] border-2 flex items-center justify-center transition-all z-10 ${selectedIds.includes(item.id) ? 'bg-amber-400 border-amber-400 text-green-950' : 'bg-white border-gray-200 text-transparent'}`}
                  >
                    <Check size={24} strokeWidth={4} />
                  </button>
                  <Link href={`/plants/${item.plants?.id}?mode=my-garden`} className="flex-grow bg-white p-4 rounded-[1.5rem] border border-white flex items-center gap-4 active:scale-95 shadow-sm">
                    <PlantThumbnail plant={item.plants} size="sm" />
                    <div className="flex-grow">
                      <h3 className="text-s font-black text-green-950 uppercase leading-none">{item.plants?.common_name || "Unknown Plant"}</h3>
                      <span className="text-[8px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-2">Planned</span>
                    </div>
                    <ArrowRight size={14} className="text-green-950 ml-auto" strokeWidth={3} />
                  </Link>
                </div>
              ))}
              {selectedIds.length > 0 && (
                <button onClick={handleBulkMove} className="w-full bg-green-900 text-amber-400 text-[11px] font-black py-5 rounded-3xl uppercase tracking-widest shadow-2xl mt-4 animate-in zoom-in-95 duration-200 flex items-center justify-center gap-2">
                  <Check size={16} strokeWidth={4} />
                  Confirm {selectedIds.length} Plants are Planted
                </button>
              )}
            </div>
          </section>
        )}
      </div>

      {showIssueModal && selectedUnhealthyPlant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">
                  Plant is unhealthy
                </p>
                <h3 className="text-lg font-black text-green-950 uppercase italic">
                  {selectedUnhealthyPlant.nickname || selectedUnhealthyPlant.plants?.common_name}
                </h3>
              </div>
              <button
                onClick={closeIssueModal}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search issue or symptom..."
                  value={issueSearchQuery}
                  onChange={(e) => setIssueSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-full px-5 py-4 pr-12 text-sm font-bold outline-none focus:border-orange-200"
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>

              {loadingRemedies ? (
                <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Loading issues...
                </div>
              ) : (
                <>
                  {specificMatches.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] px-1">
                        Plant specific
                      </div>
                      {specificMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-orange-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
  Add to Calendar
</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {universalMatches.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                        General issues
                      </div>
                      {universalMatches.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleSelectIssue(r)}
                          disabled={savingIssue}
                          className="w-full text-left p-4 rounded-[1.5rem] border border-gray-100 bg-white active:scale-[0.98] transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">
                                {r.issue_type}
                              </p>
                              {r.remedy_title && (
                                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
                                  {r.remedy_title}
                                </p>
                              )}
                              {r.remedy_description && (
                                <p className="text-xs text-gray-600 italic leading-relaxed mt-2">
                                  {r.remedy_description}
                                </p>
                              )}
                              {r.shopping_tags && r.shopping_tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {r.shopping_tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[8px] font-black uppercase tracking-widest bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest shrink-0">
  Add to Calendar
</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredRemedies.length === 0 && (
                    <div className="py-10 text-center text-[10px] font-black uppercase tracking-widest text-gray-300 italic">
                      No issue matches your search
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  )
}
</file>

<file path="src/app/plants/page.tsx">
'use client'

import { useEffect, useState, useRef, useMemo } from "react";
import { createSupabaseBrowserClient } from "../lib/supabaseClient";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Camera,
  RefreshCw,
  Plus,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Mail,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";
import Navigation from "../../components/Navigation";
import PlantThumbnail from "../../components/PlantThumbnail";
import PageHelp from "../../components/PageHelp";

// Full Weed Registry for AI Recognition (Auckland/NZ Focus)
const COMMON_WEEDS = [
  { scientific: "Ligustrum", common: "Privet (Tree/Chinese)" },
  { scientific: "Ulex europaeus", common: "Gorse" },
  { scientific: "Tradescantia fluminensis", common: "Tradescantia (Wandering Will)" },
  { scientific: "Asparagus aethiopicus", common: "Asparagus Fern" },
  { scientific: "Asparagus asparagoides", common: "Climbing Asparagus" },
  { scientific: "Acanthus mollis", common: "Acanthus (Bear’s Breeches)" },
  { scientific: "Zantedeschia aethiopica", common: "Arum Lily" },
  { scientific: "Convolvulus", common: "Bindweed" },
  { scientific: "Calystegia", common: "Convolvulus" },
  { scientific: "Solanum dulcamara", common: "Deadly Nightshade" },
  { scientific: "Solanum nigrum", common: "Black Nightshade" },
  { scientific: "Rumex obtusifolius", common: "Dock" },
  { scientific: "Lonicera japonica", common: "Honeysuckle" },
  { scientific: "Cymbalaria muralis", common: "Ivy Leaved Toadflax" },
  { scientific: "Nephrolepis cordifolia", common: "Ladder Fern" },
  { scientific: "Allium triquetrum", common: "Onion Weed" },
  { scientific: "Oxalis", common: "Oxalis" },
  { scientific: "Solanum mauritianum", common: "Tobacco Tree (Wooly Nightshade)" },
  { scientific: "Foeniculum vulgare", common: "Wild Fennel" },
  { scientific: "Hedychium", common: "Wild Ginger" },
  { scientific: "Jasminum polyanthum", common: "Wild Jasmine" }
];

interface Plant {
  id: number;
  common_name: string;
  scientific_name?: string;
  sun_requirement: string | string[] | null;
  image_url?: string | null;
  plant_type?: string | null;
  task_category?: string | null;
  is_star_performer?: boolean;
  is_native?: boolean;
  flower_color?: string | null;
}

export default function LibraryPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantImage, setSelectedPlantImage] = useState<Plant | null>(null);
  const [showIdentifier, setShowIdentifier] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [aiMatch, setAiMatch] = useState<Plant | null>(null);
  const [aiResultName, setAiResultName] = useState<string | null>(null);
  const [detectedWeed, setDetectedWeed] = useState<{ scientific: string, common: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNative, setIsNative] = useState("");
  const [flowerColor, setFlowerColor] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [existingPlantIds, setExistingPlantIds] = useState<number[]>([]);
  const [openAddPlantId, setOpenAddPlantId] = useState<number | null>(null);
  const [addQuantity, setAddQuantity] = useState<number>(1);
  const [addLengthMetres, setAddLengthMetres] = useState<string>("");
  const [isAddingPlantId, setIsAddingPlantId] = useState<number | null>(null);
  const quantityInputRef = useRef<HTMLInputElement | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    async function fetchPlants() {
      const { data: rawPlants } = await supabase
        .from("plants")
        .select("*")
        .order('common_name', { ascending: true });

      if (rawPlants) {
        const uniquePlantsMap = new Map();
        rawPlants.forEach((plant) => {
          const name = plant.common_name.trim();
          if (!uniquePlantsMap.has(name)) {
            uniquePlantsMap.set(name, plant);
          }
        });
        setPlants(Array.from(uniquePlantsMap.values()));
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userPlants } = await supabase
          .from('user_plants')
          .select('plant_id')
          .eq('user_id', user.id)
          .eq('is_project', false);

        if (userPlants) {
          setExistingPlantIds(userPlants.map((p: any) => p.plant_id));
        }
      }

      setLoading(false);
    }

    fetchPlants();
  }, [supabase]);

  useEffect(() => {
  if (openAddPlantId && quantityInputRef.current) {
    quantityInputRef.current.focus();
  }
}, [openAddPlantId]);

  // STABLE CLIENT DOWNSCALE APPROACH (Prevents Mobile Crashes)
  async function downscaleOnClient(file: File): Promise<Blob> {
    const MAX = 1200;
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = url;
      });

      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const scale = Math.min(1, MAX / Math.max(w, h));
      const targetW = Math.max(1, Math.round(w * scale));
      const targetH = Math.max(1, Math.round(h * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("Canvas context error");

      ctx.drawImage(img, 0, 0, targetW, targetH);

      return await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
          "image/jpeg",
          0.7
        );
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setAiMatch(null);
    setAiResultName(null);
    setDetectedWeed(null);

    try {
      const blob = await downscaleOnClient(file);
      e.target.value = "";

      const formData = new FormData();
      formData.append("image", blob, "plant.jpg");

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Identification failed");

      const data = await response.json();
      const scientificName = data.result?.classification?.suggestions?.[0]?.name
        || data.suggestions?.[0]?.scientific_name;

      if (scientificName) {
        setAiResultName(scientificName);
        const weedMatch = COMMON_WEEDS.find(w =>
          scientificName.toLowerCase().includes(w.scientific.toLowerCase())
        );

        if (weedMatch) {
          setDetectedWeed(weedMatch);
          setIsScanning(false);
          return;
        }

        const genus = scientificName.split(' ')[0];
        const { data: dbMatch } = await supabase
          .from("plants")
          .select("*")
          .or(`scientific_name.ilike.%${scientificName}%,common_name.ilike.%${scientificName}%,scientific_name.ilike.%${genus}%,common_name.ilike.%${genus}%`)
          .order('is_native', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (dbMatch) setAiMatch(dbMatch);
      } else {
        setAiResultName("Unknown Plant");
      }
    } catch (err: any) {
      console.error(err);
      alert("Scan error. Please try selecting a photo from your gallery instead.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleOpenAddPanel = (plantId: number) => {
    setOpenAddPlantId(plantId);
    setAddQuantity(1);
    setAddLengthMetres("");
  };

  const handleConfirmAdd = async (plant: Plant) => {
    try {
      setIsAddingPlantId(plant.id);

      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session?.user) {
        alert("Please log in first!");
        return;
      }

      const isHedge =
  (plant.task_category || plant.plant_type || '').toLowerCase() === 'hedge';

const safeQuantity = isHedge
  ? null
  : Number.isFinite(addQuantity) && addQuantity > 0
  ? addQuantity
  : 1;

const safeLengthMetres =
  isHedge && addLengthMetres.trim() !== '' && !Number.isNaN(Number(addLengthMetres))
    ? Number(addLengthMetres)
    : null;

const { error } = await supabase.from('user_plants').insert([{
  user_id: session.user.id,
  plant_id: plant.id,
  is_project: false,
  status: 'Ongoing',
  quantity: safeQuantity,
  length_metres: safeLengthMetres,
}]);

      if (error) {
        console.error(error);
        alert("Could not add plant.");
        return;
      }

      setExistingPlantIds(prev => [...prev, plant.id]);
      setOpenAddPlantId(null);
      setAddQuantity(1);
      setAddLengthMetres("");
    } finally {
      setIsAddingPlantId(null);
    }
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.common_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.plant_type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNative = isNative === "" ? true : (isNative === "Yes" ? plant.is_native === true : plant.is_native === false);
    const matchesColor = flowerColor === "" ? true : plant.flower_color === flowerColor;
    const matchesType = typeFilter === "" ? true : plant.plant_type === typeFilter;
    return matchesSearch && matchesNative && matchesColor && matchesType;
  });

  const groupedPlants = filteredPlants.reduce((acc: any, plant) => {
    const firstLetter = plant.common_name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(plant);
    return acc;
  }, {});

  const alphabet = Object.keys(groupedPlants).sort();

  if (loading) return <div className="p-20 text-center text-gray-400 font-black uppercase text-[10px]">Loading Library...</div>;

  return (
    <main className="min-h-screen bg-[#f8fbf9] p-6 pb-40 text-gray-900">
      <header className="mb-8 pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-green-900 tracking-tight italic uppercase leading-none">Plant Library</h1>
          <PageHelp
            title="Plant Library"
            description="Browse database or use AI identification."
            bullets={["Search by name", "Identify via photo upload", "Add to garden"]}
          />
        </div>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">
          A-Z Plant Index
        </p>
      </header>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-full px-6 py-4 text-sm font-bold shadow-sm outline-none focus:border-green-200 transition-colors"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
          {searchQuery ? (
            <X size={16} onClick={() => setSearchQuery("")} className="cursor-pointer text-gray-400" />
          ) : (
            <Search size={18} />
          )}
        </div>
      </div>

      {/* Identifier Tool */}
      <div className="mb-10 transition-all duration-300">
        <button
          onClick={() => setShowIdentifier(!showIdentifier)}
          className={`w-full p-7 rounded-[2.5rem] text-left relative overflow-hidden shadow-lg transition-all duration-300 ${showIdentifier ? 'bg-white border border-green-100 shadow-green-900/5' : 'bg-[#2d5a3f] text-white'
            }`}
        >
          <div className="relative z-10">
            <h3 className={`font-black text-xl mb-1 uppercase italic tracking-tight ${showIdentifier ? 'text-[#2d5a3f]' : 'text-white'}`}>
              {showIdentifier ? 'Close Identifier' : 'Identify a Plant'}
            </h3>
            <div className={`text-[11px] font-medium leading-relaxed ${showIdentifier ? 'text-gray-400' : 'text-green-100/80'}`}>
              {showIdentifier ? (
                'Upload your photo below'
              ) : (
                <>
                  <div>Not sure what plant you have?</div>
                  <div className="text-green-200 mt-1">Upload a photo here</div>
                </>
              )}
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
            {showIdentifier ? <ChevronUp className="text-[#2d5a3f]" size={32} /> : <ChevronDown className="text-white" size={32} />}
          </div>
        </button>

        {showIdentifier && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-[2rem] border-2 border-dashed border-green-100 p-8 text-center shadow-sm">
              {!isScanning && !aiResultName ? (
                <div className="flex flex-col items-center gap-2">
                  <input type="file" accept="image/*" onChange={handleFileUpload} id="gallery-input" className="hidden" />
                  <label htmlFor="gallery-input" className="cursor-pointer group flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#2d5a3f] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 active:scale-95 transition-all">
                      <ImageIcon size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase mt-3 tracking-widest text-green-900">Select From Gallery</span>
                  </label>
                </div>
              ) : isScanning ? (
                <div className="py-2">
                  <RefreshCw className="animate-spin mx-auto text-green-600 mb-2" size={24} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 italic">Analyzing Plant...</p>
                </div>
              ) : (
                <div className="animate-in zoom-in-95 duration-300">
                  {aiMatch ? (
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-2xl border border-green-100">
                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase text-green-600">Database Match Found</span>
                        <h4 className="font-black text-sm uppercase text-green-900 leading-none">{aiMatch.common_name}</h4>
                      </div>
                      <Link href={`/plants/${aiMatch.id}`} className="bg-green-600 text-white p-2 rounded-xl">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  ) : detectedWeed ? (
                    <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                        <AlertTriangle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Invasive Species</span>
                      </div>
                      <h4 className="font-black text-sm uppercase text-red-900 leading-tight mb-3">{detectedWeed.common}</h4>
                      <Link
                        href="/guides/weeds"
                        className="w-full bg-red-600 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                      >
                        How to Kill It →
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="text-left">
                        <span className="text-[8px] font-black uppercase text-gray-400">AI Result (Not in library)</span>
                        <h4 className="font-black text-sm uppercase text-slate-800 leading-tight">{aiResultName}</h4>
                      </div>
                      <a
                        href={`mailto:hello@yourdomain.com?subject=Library%20Addition%20Request:%20${aiResultName}`}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform mt-3"
                      >
                        <Mail size={12} /> Request Addition
                      </a>
                    </div>
                  )}
                  <button onClick={() => { setAiResultName(null); setAiMatch(null); setDetectedWeed(null); }} className="mt-4 text-[9px] font-black text-gray-300 uppercase hover:text-gray-500 tracking-widest">Reset Scanner</button>
                </div>
              )}
            </div>

            {/* Manual Filters */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase font-black text-gray-300 bg-[#f8fbf9] px-2 w-max mx-auto tracking-widest">Or Filter Manually</div>
            </div>

            <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
              <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest block mb-1">Plant Category</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {['Hedge', 'Shrub', 'Tree', 'Flower', 'Palm', 'Flax', 'Groundcover', 'Climber', 'Fruit'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
                <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1 block">Native?</label>
                <select value={isNative} onChange={(e) => setIsNative(e.target.value)} className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer">
                  <option value="">Any Origin</option>
                  <option value="Yes">NZ Native</option>
                  <option value="No">Exotic</option>
                </select>
              </div>
              <div className="bg-white rounded-[1.5rem] border border-gray-100 px-5 py-3 shadow-sm">
                <label className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1 block">Flowers</label>
                <select value={flowerColor} onChange={(e) => setFlowerColor(e.target.value)} className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none h-8 appearance-none cursor-pointer">
                  <option value="">Any Color</option>
                  {['White', 'Pink', 'Red', 'Blue', 'Yellow', 'Purple', 'Orange'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* A-Z Index */}
      <div className="space-y-10">
        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2 mb-[-2rem]">
          {filteredPlants.length} Plants Available
        </h2>

        {alphabet.length > 0 ? (
          alphabet.map((letter) => (
            <div key={letter}>
              <h2 className="text-xs font-black text-green-800 uppercase tracking-[0.3em] mb-4 px-2">{letter}</h2>
              <div className="grid grid-cols-1 gap-4">
                {groupedPlants[letter].map((plant: Plant) => {
                  const isAlreadyAdded = existingPlantIds.includes(plant.id);
                  const isOpen = openAddPlantId === plant.id;
                  const isHedge =
                    (plant.task_category || plant.plant_type || '').toLowerCase() === 'hedge';

                  return (
                    <div key={plant.id} className="relative group">
                      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-green-100 transition-all duration-200 overflow-hidden">
                        <div className="flex items-center p-5">
                          <button onClick={() => setSelectedPlantImage(plant)} className="w-14 h-14 flex-shrink-0 transition-transform active:scale-90">
                            <PlantThumbnail plant={plant} size="sm" />
                          </button>

                          <Link href={`/plants/${plant.id}`} className="flex-grow flex items-center justify-between ml-4 active:scale-[0.98] transition-transform">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-black text-gray-800 text-sm uppercase leading-none mb-1">{plant.common_name}</h3>
                                {plant.is_native && (
                                  <span className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-black uppercase">Native</span>
                                )}
                              </div>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">{plant.plant_type || 'General'}</p>
                            </div>
                            <div className="text-gray-200 group-hover:text-green-600 group-hover:translate-x-1 transition-all text-lg mr-12">→</div>
                          </Link>

                          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
                           {isAlreadyAdded ? (
  <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-700">
    <CheckCircle size={18} />
  </div>
) : !isOpen ? (
  <button
    onClick={() => handleOpenAddPanel(plant.id)}
    className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
  >
    <Plus size={18} />
  </button>
) : null}
                          </div>
                        </div>

                        {isOpen && !isAlreadyAdded && (
                          <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-[#fbfdfb]">
                            <div className="grid grid-cols-1 gap-3">
  {isHedge ? (
    <div>
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        Hedge Length (Lineal Metres)
      </label>
      <input
        type="number"
        min={0}
        step="0.1"
        value={addLengthMetres}
        onChange={(e) => setAddLengthMetres(e.target.value)}
        placeholder="Enter hedge length"
        className="w-full p-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-200"
      />
    </div>
  ) : (
    <div>
      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
        Quantity
      </label>
      <input
        ref={quantityInputRef}
        type="number"
        min={1}
        value={addQuantity}
        onChange={(e) => setAddQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-full p-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 ring-green-200"
      />
    </div>
  )}

                              <div className="flex gap-2 pt-1">
                                <button
                                  onClick={() => handleConfirmAdd(plant)}
                                  disabled={isAddingPlantId === plant.id}
                                  className="flex-1 py-3 rounded-2xl bg-[#2d5a3f] text-white text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
                                >
                                  {isAddingPlantId === plant.id ? 'Adding...' : 'Add to My Garden'}
                                </button>

                                <button
                                  onClick={() => {
                                    setOpenAddPlantId(null);
                                    setAddQuantity(1);
                                    setAddLengthMetres("");
                                  }}
                                  className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">No plants match your search</p>
          </div>
        )}
      </div>
      <div className="mt-12 p-8 rounded-[2.5rem] bg-white border border-dashed border-gray-200 text-center shadow-sm mx-2">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight mb-2">
            Can't find your plant?
          </h3>
          <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6 px-4">
            If we're missing something from your garden, let us know and we'll add it for you.
          </p>
          <a
            href="mailto:pocketgardeneruploads@gmail.com?subject=Library Addition Request"
            className="inline-flex items-center gap-2 bg-green-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95 transition-transform"
          >
            <Mail size={14} /> Request Addition
          </a>
        </div>

      {selectedPlantImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelectedPlantImage(null)}
        >
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setSelectedPlantImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/10 rounded-full p-2"
            >
              <X size={20} />
            </button>
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={selectedPlantImage.image_url || "https://via.placeholder.com/600x600?text=No+Image"}
                alt={selectedPlantImage.common_name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-black text-green-900 uppercase">
                  {selectedPlantImage.common_name}
                </h3>
                <p className="text-sm italic text-gray-400">
                  {selectedPlantImage.scientific_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </main>
  );
}
</file>

</files>
