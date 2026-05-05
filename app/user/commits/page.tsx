"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchInput from "../../_components/SearchInput";
import LoadingSpinner from "../../_components/LoadingSpinner";
import ErrorMessage from "../../_components/ErrorMessage";

function CommitsContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [commits, setCommits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) fetchCommits(username);
  }, [username]);

  const fetchCommits = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/search/commits?q=author:${name}&sort=author-date&order=desc`, {
        headers: { Accept: "application/vnd.github.cloak-preview" }
      });
      if (!res.ok) throw new Error("데이터를 가져오는데 실패했습니다.");
      const json = await res.json();
      setCommits(json.items || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black text-zinc-200 dark:text-zinc-800/50 uppercase italic select-none">Commits</h2>
            <p className="text-zinc-400 font-medium tracking-widest text-xs uppercase">Enter GitHub ID to track activity</p>
          </div>
          <SearchInput className="scale-110" />
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-[80vh] flex justify-center items-center"><LoadingSpinner message="커밋 기록을 불러오는 중입니다..." /></div>;
  if (error) return <div className="max-w-4xl mx-auto pt-20 px-4"><ErrorMessage message={error} /><div className="mt-8 flex justify-center"><SearchInput /></div></div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 pt-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[#5D5FEF] font-black text-sm tracking-widest uppercase mb-2">Activity Log</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">{username}&apos;s Commits</h1>
        </div>
        <div className="w-full md:w-64">
          <SearchInput />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem]">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Recent Total</p>
          <span className="text-4xl font-black text-[#5D5FEF]">{commits.length}</span>
        </div>
        <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem]">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Latest Repo</p>
          <span className="text-xl font-black truncate block">{commits[0]?.repository?.name || "N/A"}</span>
        </div>
        <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem]">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Last Active</p>
          <span className="text-xl font-black">
            {commits[0] ? new Date(commits[0].commit.author.date).toLocaleDateString() : "N/A"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {commits.map((item, idx) => (
          <div key={idx} className="group p-6 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl hover:border-[#5D5FEF] transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#5D5FEF] uppercase">{item.repository.full_name}</p>
                <h3 className="text-lg font-bold leading-snug line-clamp-1">{item.commit.message}</h3>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                  {new Date(item.commit.author.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <a href={item.html_url} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommitsPage() {
  return (
    <Suspense fallback={<div className="py-40 flex justify-center"><LoadingSpinner message="커밋 기록 준비 중..." /></div>}>
      <CommitsContent />
    </Suspense>
  );
}