"use client";

import { Suspense } from "react";
import SearchInput from "./SearchInput";

function HeaderContent() {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-zinc-200 bg-white/50 backdrop-blur-md dark:border-zinc-800 dark:bg-black/50 px-6">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
        
        <div className="flex items-center flex-shrink-0">
          <img 
            src="/logo_horizontal.png" 
            alt="Github Manager Logo" 
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 justify-end items-center">
          <SearchInput className="w-full max-w-md" />
        </div>

      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense 
      fallback={
        <header className="h-16 border-b border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-black/50" />
      }
    >
      <HeaderContent />
    </Suspense>
  );
}