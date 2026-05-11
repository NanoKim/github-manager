"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../../_components/LoadingSpinner";
import ErrorMessage from "../../_components/ErrorMessage";

function SearchContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [userData, setUserData] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) fetchData(username);
  }, [username]);

  const fetchData = async (name: string) => {
    setLoading(true);
    setError(null);
    setAiAnalysis("");
    setUserData(null);

    try {
      const userRes = await fetch(`https://api.github.com/users/${name}?t=${new Date().getTime()}`);
      if (userRes.status === 404) {
        setError("존재하지 않는 유저입니다.");
        setLoading(false);
        return;
      }
      if (!userRes.ok) throw new Error();
      const userJson = await userRes.json();

      const aiRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: userJson }),
      });
      const aiJson = await aiRes.json();
      
      if (!aiRes.ok) throw new Error(aiJson.error || "AI 분석 중 오류 발생");

      setUserData(userJson);
      setAiAnalysis(aiJson.analysis);
    } catch (err: any) {
      setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const parseFormattedText = (text: string) => {
    if (!text) return null;
    return text.split("\n").filter(line => line.trim() !== "").map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={idx} className="flex gap-4 mb-4 last:mb-0">
          <span className="text-[#5D5FEF] mt-2 shrink-0 text-[10px]">✦</span>
          <p className="text-base sm:text-lg font-medium leading-relaxed break-keep">
            {parts.map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <span key={i} className="text-[#A5A6FF] font-black underline underline-offset-4">
                    {part.slice(2, -2)}
                  </span>
                );
              }
              return part;
            })}
          </p>
        </div>
      );
    });
  };

  const getParsedAnalysis = () => {
    if (!aiAnalysis) return { summary: null, potential: null };
    const parts = aiAnalysis.split("[SPLIT]");
    return {
      summary: parseFormattedText(parts[0]?.replace(/\[SUMMARY\]/gi, "").trim()),
      potential: parseFormattedText(parts[1]?.replace(/\[POTENTIAL\]/gi, "").trim())
    };
  };

  const { summary, potential } = getParsedAnalysis();

  if (!username) {
    return (
      <div className="fixed inset-0 md:inset-auto md:relative md:w-full h-screen md:h-auto md:min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-lg space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-200 dark:text-zinc-800/50 uppercase italic select-none">Analysis</h2>
            <p className="text-zinc-400 dark:text-zinc-500 font-medium tracking-widest text-xs md:text-sm uppercase">상단 검색창에 GitHub ID를 입력하여 리포트를 생성하세요</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <LoadingSpinner message="GitHub 데이터를 심층 분석하여 맞춤형 리포트를 구성하고 있습니다..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 pt-10 md:pt-0">
      {userData && (
        <div className="bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-8 sm:p-12 lg:p-20">
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">
              <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="relative group shrink-0">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#5D5FEF] via-[#A5A6FF] to-transparent rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700"></div>
                <img src={userData.avatar_url} className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 border-4 border-white dark:border-zinc-900 shadow-xl" alt="avatar" />
              </a>
              <div className="flex-1 space-y-8 w-full text-center lg:text-left">
                <div className="space-y-3">
                  <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none italic">{userData.name || userData.login}</h3>
                  <p className="text-[#5D5FEF] font-black text-xl tracking-tighter uppercase opacity-90">Developer Profile 0{new Date().getMonth() + 1}</p>
                </div>
                <div className="flex divide-x divide-zinc-200 dark:divide-zinc-800 justify-center lg:justify-start border-t border-zinc-100 dark:border-zinc-800/50 pt-8">
                  {[
                    { label: "Public Repos", value: userData.public_repos },
                    { label: "Followers", value: userData.followers },
                    { label: "Following", value: userData.following }
                  ].map((stat) => (
                    <div key={stat.label} className="px-6 sm:px-10 first:pl-0 last:pr-0">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1 leading-none">{stat.label}</p>
                      <span className="text-3xl sm:text-4xl font-black tabular-nums tracking-tighter text-zinc-900 dark:text-zinc-100">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-px bg-[#5D5FEF]"></div>
                    <span className="text-[10px] font-black text-[#5D5FEF] uppercase tracking-[0.3em]">Biography</span>
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <p className="text-zinc-700 dark:text-zinc-200 text-2xl sm:text-4xl font-bold leading-[1.1] tracking-tighter break-keep">
                    {userData.bio ? <>“{userData.bio}”</> : <span className="text-zinc-300 dark:text-zinc-800">THIS DEVELOPER PREFERS ACTION OVER WORDS.</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 lg:p-20 space-y-24 bg-zinc-50/50 dark:bg-white/[0.02] border-t border-zinc-100 dark:border-zinc-900">
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-[10px] font-black italic">01</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-black text-sm tracking-[0.2em] uppercase">Core Insight</span>
              </div>
              <div className="p-12 sm:p-16 rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">{summary}</div>
            </section>
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center text-[10px] font-black italic">02</span>
                <span className="text-zinc-900 dark:text-zinc-100 font-black text-sm tracking-[0.2em] uppercase">Growth Potential</span>
              </div>
              <div className="p-12 sm:p-16 rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">{potential}</div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-40 flex justify-center"><LoadingSpinner message="페이지 준비 중..." /></div>}>
      <SearchContent />
    </Suspense>
  );
}