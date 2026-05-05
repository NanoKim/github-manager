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
    if (query) setUserId(query);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    // 1. 현재 경로(pathname)가 무엇인지 확인합니다.
    let targetPath = pathname;

    // 2. 만약 메인('/')이거나, 경로에 'user'가 포함되지 않은 엉뚱한 곳이라면 
    // 기본 검색 페이지인 '/user/search'로 보냅니다.
    if (pathname === "/" || !pathname.includes("/user/")) {
      targetPath = "/user/search";
    }

    // 3. 기존 쿼리 파라미터는 싹 무시하고 'username'만 새로 설정해서 이동합니다.
    // 이렇게 해야 URL이 꼬이지 않습니다.
    router.push(`${targetPath}?username=${encodeURIComponent(userId.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Search GitHub ID..."
        className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#5D5FEF] outline-none transition-all"
      />
    </form>
  );
}