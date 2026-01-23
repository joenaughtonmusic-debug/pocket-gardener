'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  // Define paths where the navigation bar should be hidden
  const hideOnPaths = ['/', '/login'];

  // If the current path is in our list, don't render anything
  if (hideOnPaths.includes(pathname)) {
    return null;
  }

  return (
    /* CHANGES MADE:
      - Changed 'left-6 right-6' to 'left-2 right-2' to give more horizontal room.
      - Added 'max-w-md mx-auto' so it doesn't get too wide on tablets.
      - Reduced px-4 to px-1 on the Links so they can sit closer together.
    */
    <nav className="fixed bottom-6 left-2 right-2 max-w-md mx-auto bg-white/80 backdrop-blur-md border border-gray-100 rounded-full p-2 shadow-2xl flex justify-around items-center z-50">
      
      <Link href="/dashboard" className="flex flex-col items-center py-2 px-1 group min-w-[60px]">
        <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === '/dashboard' ? 'scale-125' : ''}`}>🏡</span>
        <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${pathname === '/dashboard' ? 'text-green-800' : 'text-gray-400'} group-hover:text-green-800`}>Garden</span>
      </Link>
      
      <Link href="/plants" className="flex flex-col items-center py-2 px-1 group min-w-[60px]">
        <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === '/plants' ? 'scale-125' : ''}`}>🌿</span>
        <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${pathname === '/plants' ? 'text-green-800' : 'text-gray-400'} group-hover:text-green-800`}>Library</span>
      </Link>

      <Link href="/build" className="flex flex-col items-center py-2 px-1 group min-w-[60px]">
        <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === '/build' ? 'scale-125' : ''}`}>📋</span>
        <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${pathname === '/build' ? 'text-green-800' : 'text-gray-400'} group-hover:text-green-800`}>Build</span>
      </Link>

      <Link href="/identify" className="flex flex-col items-center py-2 px-1 group min-w-[60px]">
        <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === '/identify' ? 'scale-125' : ''}`}>🔍</span>
        <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${pathname === '/identify' ? 'text-green-800' : 'text-gray-400'} group-hover:text-green-800`}>Identify</span>
      </Link>

      <Link href="/guides" className="flex flex-col items-center py-2 px-1 group min-w-[60px]">
        <span className={`text-lg transition-transform group-hover:scale-110 ${pathname === '/guides' ? 'scale-125' : ''}`}>📖</span>
        <span className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${pathname === '/guides' ? 'text-green-800' : 'text-gray-400'} group-hover:text-green-800`}>Guides</span>
      </Link>
      
    </nav>
  );
}