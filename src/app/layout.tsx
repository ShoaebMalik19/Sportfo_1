import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

/**
 * Self-hosted variable fonts (the .woff2 files live in src/fonts), so there's
 * no build-time or runtime dependency on Google Fonts' CDN. Inter carries the
 * UI and body text; Archivo is the display face used for headlines and big
 * numerals, where its slightly tighter, more athletic shapes do more work.
 */
const inter = localFont({
  src: '../fonts/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  fallback: ['ui-sans-serif', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

const archivo = localFont({
  src: '../fonts/Archivo-Variable.woff2',
  variable: '--font-archivo',
  display: 'swap',
  weight: '100 900',
  fallback: ['ui-sans-serif', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  // Needed so the OG image resolves to an absolute URL. Set
  // NEXT_PUBLIC_SITE_URL to the real domain when deploying.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'SportFo — Your Professional Sports Identity',
  description:
    'SportFo helps athletes build a verified digital sports profile, showcase achievements, and get discovered by academies, coaches, and sponsors.',
  openGraph: {
    title: 'SportFo — Your Professional Sports Identity',
    description:
      'Build a verified digital sports profile, showcase your achievements, and get discovered.',
    images: ['/images/og-sportfo.svg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
