import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://torrentechnical.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Torren Technical — Technical consultancy for Australian industry',
    template: '%s | Torren Technical',
  },
  description:
    'A technical consultancy for Australian industry — engineering, construction, industrial trades and more. Workforce solutions and technically vetted talent, by people who understand the work.',
  keywords: [
    'technical consultancy Australia',
    'engineering recruitment Australia',
    'construction recruitment Australia',
    'industrial trades recruitment',
    'defence recruitment',
    'automation controls',
    'electrical power engineering',
    'technical workforce solutions',
    'industrial recruitment Australia',
  ],
  authors: [{ name: 'Torren Technical' }],
  creator: 'Torren Technical',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Torren Technical',
    title:
      'Torren Technical — Technical consultancy for Australian industry',
    description:
      'A technical consultancy for Australian industry — engineering, construction, industrial trades and more. Technically vetted talent, by people who understand the work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torren Technical — Technical consultancy for Australian industry',
    description:
      'A technical consultancy for engineering, construction, industrial trades and more.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a1320',
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Torren Technical',
  description:
    'A technical consultancy for Australian industry — engineering, construction, industrial trades and more.',
  url: SITE_URL,
  areaServed: 'AU',
  knowsAbout: [
    'Electronics & Embedded',
    'Automation & Controls',
    'Defence & Aerospace',
    'Electrical & Power',
    'Software for Industry',
    'Industrial Trades',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="bg-navy-deep text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
