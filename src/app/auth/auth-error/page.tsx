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