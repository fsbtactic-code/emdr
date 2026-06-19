import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap"
});

const preview = "https://s3.twcstorage.ru/strelo/emdr/preview.jpg";

export const metadata: Metadata = {
  title: "EMDR Trainer",
  description:
    "Open-source bilateral stimulation trainer for grounding, resourcing and relaxation. Evidence-based, multilingual, with a therapist-led remote session mode.",
  openGraph: {
    title: "EMDR Trainer",
    description:
      "Bilateral stimulation trainer for grounding and relaxation, with a therapist-led session mode.",
    type: "website",
    images: [{ url: preview, width: 1280, height: 720 }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${manrope.variable}`}>
      <body>
        <div className="emdr-shell">{children}</div>
      </body>
    </html>
  );
}
