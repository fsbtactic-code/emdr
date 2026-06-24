import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap"
});

// Served from the site's own origin so link-preview crawlers (Telegram, etc.)
// always fetch it, with no cross-origin dependency.
const ogImage = "https://emdr.digital/og.jpg";
const description =
  "Free EMDR tool for specialists and their clients. Bilateral stimulation for grounding and relaxation, with a therapist-led session mode. Evidence-based, multilingual, open-source.";

export const metadata: Metadata = {
  metadataBase: new URL("https://emdr.digital"),
  title: "EMDR Trainer",
  description,
  openGraph: {
    title: "EMDR Trainer",
    description,
    type: "website",
    url: "https://emdr.digital/",
    images: [{ url: ogImage, width: 1200, height: 676, alt: "EMDR Trainer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "EMDR Trainer",
    description,
    images: [ogImage]
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
