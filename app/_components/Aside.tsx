"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_LIST } from "../_constants/menu";

export default function Aside() {
  const pathname = usePathname();

  const closeMenu = () => {
    const aside = document.getElementById('main-aside');
    const overlay = document.getElementById('aside-overlay');
    aside?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
  };

  return (
    <>
      <aside 
        id="main-aside"
        className="fixed inset-y-0 left-0 z-50 w-60 h-full bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 flex flex-col transform -translate-x-full transition-all duration-500 ease-in-out md:relative md:translate-x-0 md:flex shadow-2xl md:shadow-none" 
      >
        <div className="sticky top-0 z-20 bg-white dark:bg-[#09090b] px-6 py-6 flex items-center justify-between shrink-0">
          <Link href="/" className="group relative">
            <img 
              src="/logo_horizontal.png" 
              alt="Github Manager Logo" 
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
          </Link>
          <button className="md:hidden p-2 text-zinc-500 hover:rotate-90 transition-transform duration-300" onClick={closeMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-7 overflow-x-hidden overflow-y-auto px-4 pb-8">
          {MENU_LIST.map((group) => {
            const hasActiveItem = group.items.some(item => pathname === item.href);
            
            return (
              <div key={group.category} className="flex flex-col group/category">
                <p className={`
                  text-[10px] font-black uppercase mb-3 px-3 tracking-[0.25em] transition-all duration-500
                  ${hasActiveItem 
                    ? "text-black dark:text-zinc-200 scale-105 origin-left" 
                    : "text-zinc-400 dark:text-zinc-600 group-hover/category:text-black dark:group-hover/category:text-zinc-300"
                  }
                `}>
                  {group.category}
                  {hasActiveItem && (
                    <span className="inline-block ml-2 w-1 h-1 rounded-full bg-black dark:bg-white animate-ping" />
                  )}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`
                            relative group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-500 overflow-hidden
                            ${isActive 
                              ? "text-black dark:text-white bg-zinc-100 dark:bg-zinc-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                              : "text-zinc-500 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                            }
                          `}
                        >
                          {isActive && (
                            <div className="absolute left-0 w-1.5 h-6 bg-black dark:bg-white rounded-r-full animate-pulse z-10" />
                          )}
                          
                          {!isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/50 to-transparent dark:from-zinc-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          )}

                          <span className={`relative z-10 transition-all duration-500 ease-out ${isActive ? "translate-x-3" : "group-hover:translate-x-2"}`}>
                            {item.title}
                          </span>

                          {!isActive && (
                            <div className="absolute right-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                              <svg className="w-4 h-4 text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
      
      <div 
        id="aside-overlay"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden md:hidden transition-opacity duration-300" 
        onClick={closeMenu}
      />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 3px;
        }
      `}</style>
    </>
  );
}