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
    'Permanent, client-direct technical recruitment for Australian engineering, construction, electrical, automation and industrial. No labour hire or payroll.',
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
    images: [
      {
        url: '/hero-poster.v2.webp',
        width: 1280,
        height: 720,
        alt: 'Torren Technical — technical recruitment across Australian engineering, construction and industrial sectors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torren Technical — Permanent & contract technical recruitment',
    description:
      'Permanent and client-direct contract technical recruitment across selected Australian markets. No labour hire, payroll or on-hire.',
    images: ['/hero-poster.v2.webp'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a1320',
  width: 'device-width',
  initialScale: 1,
};

// JSON-LD graph: Organization + ProfessionalService (EmploymentAgency) + WebSite.
// Static markup only — no runtime/library cost, no visual output.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Torren Technical',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/hero-poster.v2.webp`,
      description:
        'Permanent and client-direct technical recruitment across Australian engineering, construction, electrical, automation and industrial sectors. No labour hire or payroll.',
      email: 'contact@torrentechnical.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'contact@torrentechnical.com',
        areaServed: 'AU',
        availableLanguage: 'English',
      },
      areaServed: { '@type': 'Country', name: 'Australia' },
    },
    {
      '@type': ['ProfessionalService', 'EmploymentAgency'],
      '@id': `${SITE_URL}/#service`,
      name: 'Torren Technical',
      url: SITE_URL,
      image: `${SITE_URL}/hero-poster.v2.webp`,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      description:
        'Permanent and client-direct technical recruitment across Australian engineering, construction, electrical, automation and industrial sectors. No labour hire, payroll or on-hire.',
      areaServed: { '@type': 'Country', name: 'Australia' },
      knowsAbout: [
        'Engineering Recruitment',
        'Construction Recruitment',
        'Electrical Recruitment',
        'Automation Recruitment',
        'Technical Trades Recruitment',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Technical recruitment specialisations',
        itemListElement: [
          'Engineering Recruitment',
          'Construction Recruitment',
          'Electrical Recruitment',
          'Automation Recruitment',
          'Technical Trades Recruitment',
        ].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Torren Technical',
      url: SITE_URL,
      inLanguage: 'en-AU',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18289525535"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18289525535');
            `,
          }}
        />
      </head>
      <body className="bg-navy-deep text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
