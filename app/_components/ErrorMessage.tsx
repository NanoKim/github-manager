import SearchInput from "./SearchInput";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-12 rounded-[2.5rem] text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">{message}</h3>
        <p className="text-zinc-500 text-sm">입력하신 ID가 정확한지 다시 한번 확인해 주세요.</p>
      </div>
      <SearchInput className="max-w-sm mx-auto" />
    </div>
  );
}