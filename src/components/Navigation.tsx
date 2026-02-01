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
        
        {/* GARDEN */}
        <Link href="/dashboard" className="flex flex-col items-center group">
          <span className={`text-lg transition-transform ${pathname === '/dashboard' ? 'scale-125 mb-1' : 'opacity-70'}`}>🏡</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/dashboard' ? 'text-green-800' : 'text-gray-400'}`}>Garden</span>
        </Link>
        
        {/* LIBRARY */}
        <Link href="/plants" className="flex flex-col items-center group">
          <span className={`text-lg transition-transform ${pathname === '/plants' ? 'scale-125 mb-1' : 'opacity-70'}`}>🌿</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/plants' ? 'text-green-800' : 'text-gray-400'}`}>Library</span>
        </Link>

        {/* MATCH - Using Emoji to match the House style */}
        <Link href="/match" className="flex flex-col items-center group">
          <span className={`text-lg transition-transform ${pathname === '/match' ? 'scale-125 mb-1' : 'opacity-70'}`}>✅</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/match' ? 'text-green-800' : 'text-gray-400'}`}>Match</span>
        </Link>

        {/* IDENTIFY */}
        <Link href="/identify" className="flex flex-col items-center group">
          <span className={`text-lg transition-transform ${pathname === '/identify' ? 'scale-125 mb-1' : 'opacity-70'}`}>🔍</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/identify' ? 'text-green-800' : 'text-gray-400'}`}>Identify</span>
        </Link>

        {/* GUIDES */}
        <Link href="/guides" className="flex flex-col items-center group">
          <span className={`text-lg transition-transform ${pathname === '/guides' ? 'scale-125 mb-1' : 'opacity-70'}`}>📖</span>
          <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors ${pathname === '/guides' ? 'text-green-800' : 'text-gray-400'}`}>Guides</span>
        </Link>
        
      </div>
    </nav>
  );
}