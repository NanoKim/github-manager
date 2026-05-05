"use client";

import { Suspense } from "react";
import SearchInput from "./SearchInput";

function HeaderContent() {
  const openMenu = () => {
    const aside = document.getElementById('main-aside');
    const overlay = document.getElementById('aside-overlay');
    aside?.classList.remove('-translate-x-full');
    overlay?.classList.remove('hidden');
  };

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-30 gap-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <button 
          onClick={openMenu}
          className="p-2 -ml-2 md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <SearchInput className="max-w-md" />
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50" />
    }>
      <HeaderContent />
    </Suspense>
  );
}