import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMDR Therapy Platform',
  description: 'AI-guided EMDR Therapy Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="antialiased w-full h-screen flex flex-col bg-zinc-950 text-white overflow-hidden selection:bg-cyan-900/30">
        {children}
      </body>
    </html>
  );
}
