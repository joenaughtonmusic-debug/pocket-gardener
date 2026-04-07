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