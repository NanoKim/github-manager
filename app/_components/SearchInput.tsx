"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchInput({ className = "" }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const query = searchParams.get("username");
    if (query) {
      setUserId(query);
    } else {
      setUserId("");
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = userId.trim();
    
    if (!trimmedId) return;

    let targetPath = pathname;
    if (!pathname.startsWith("/user/")) {
      targetPath = "/user/search";
    }

    router.push(`${targetPath}?username=${encodeURIComponent(trimmedId)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg 
          className="w-4 h-4 text-zinc-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input 
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="GitHub ID 검색..."
        className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#5D5FEF] outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
      />
    </form>
  );
}