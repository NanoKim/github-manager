"use client";

import { Suspense } from "react";
import SearchInput from "./SearchInput";

function HeaderContent() {
  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-30 gap-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <img 
          src="/logo_horizontal.png" 
          alt="Github Manager Logo" 
          className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />

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