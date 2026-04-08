import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'AI-EMDR - Сервис терапии',
  description: 'Профессиональная платформа для EMDR терапии с когнитивной нагрузкой и ИИ-агентом',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`dark ${manrope.variable}`}>
      <body className="font-sans antialiased w-full h-screen flex flex-col bg-zinc-950 text-white overflow-hidden selection:bg-cyan-900/30">
        {children}
      </body>
    </html>
  );
}
