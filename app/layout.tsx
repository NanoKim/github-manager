import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Github Manager",
  description: "Next.js Github Manager Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-black text-black dark:text-white">
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}