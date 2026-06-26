import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
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
      'Torren Technical — Permanent & contract technical recruitment',
    template: '%s | Torren Technical',
  },
  description:
    'Permanent and client-direct contract technical recruitment across selected Australian markets — engineering, construction, electrical & power, automation and technical trades. Technically vetted talent, by people who understand the work. No labour hire, payroll or on-hire.',
  keywords: [
    'permanent recruitment',
    'contract recruitment',
    'engineering recruitment NSW',
    'engineering recruitment Victoria',
    'engineering recruitment Queensland',
    'construction recruitment',
    'technical trades recruitment',
    'automation controls recruitment',
    'electrical power engineering recruitment',
  ],
  authors: [{ name: 'Torren Technical' }],
  creator: 'Torren Technical',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Torren Technical',
    title:
      'Torren Technical — Permanent & contract technical recruitment',
    description:
      'Permanent and client-direct contract technical recruitment across selected Australian markets — engineering, construction and technical trades. No labour hire, payroll or on-hire.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torren Technical — Permanent & contract technical recruitment',
    description:
      'Permanent and client-direct contract technical recruitment across selected Australian markets. No labour hire, payroll or on-hire.',
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
  '@type': 'EmploymentAgency',
  name: 'Torren Technical',
  description:
    'Permanent and client-direct contract technical recruitment across selected Australian markets — engineering, construction and technical trades. No labour hire, payroll or on-hire.',
  disambiguatingDescription:
    'Torren Technical currently operates only in selected Australian jurisdictions (NSW, VIC, QLD, TAS, NT and ACT) and only for permanent and client-direct contract recruitment. We do not provide labour hire, payroll, on-hire, or regulated/security-cleared recruitment services.',
  url: SITE_URL,
  areaServed: [
    'New South Wales',
    'Victoria',
    'Queensland',
    'Tasmania',
    'Northern Territory',
    'Australian Capital Territory',
  ],
  knowsAbout: [
    'Electronics & Embedded',
    'Automation & Controls',
    'Electrical & Power',
    'Construction & Infrastructure',
    'Software for Industry',
    'Technical Trades',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
