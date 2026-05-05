interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export default function LoadingSpinner({ message, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-zinc-200 dark:border-zinc-800 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#5D5FEF] border-t-transparent rounded-full animate-spin" />
      </div>
      {message && (
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black tracking-tight">{message}</h3>
          <p className="text-zinc-500 animate-pulse text-sm">잠시만 기다려 주세요...</p>
        </div>
      )}
    </div>
  );
}