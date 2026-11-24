import type { Metadata } from 'next'
import { Inter, Aldrich } from 'next/font/google'
import './globals.css'

// Inter = body + headings (readable). Aldrich = display/wordmark only (--font-display).
const interSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const aldrich = Aldrich({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://neurotechx.org'),
  title: {
    default: 'NeuroTechX — The global neurotechnology community',
    template: '%s · NeuroTechX',
  },
  description:
    'NeuroTechX is a volunteer-led non-profit representing the largest global community of neurotechnology innovators — education, open-source tools, hackathons, and 30+ local chapters.',
  openGraph: {
    title: 'NeuroTechX',
    description: 'The global community for neurotechnology.',
    url: 'https://neurotechx.org',
    siteName: 'NeuroTechX',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'NeuroTechX', description: 'The global community for neurotechnology.' },
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

// schema.org data so search engines and AI assistants can identify the organization.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NGO',
      '@id': 'https://neurotechx.org/#organization',
      name: 'NeuroTechX',
      legalName: 'Société BCI Montréal',
      url: 'https://neurotechx.org',
      logo: 'https://neurotechx.org/icon.png',
      email: 'info@neurotechx.org',
      description:
        'Volunteer-led non-profit and international community for neurotechnology: local chapters, student clubs, events, education and open-source projects.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6666 rue Saint-Urbain, bureau 200',
        addressLocality: 'Montréal',
        addressRegion: 'QC',
        postalCode: 'H2S 3H1',
        addressCountry: 'CA',
      },
      sameAs: [
        'https://bsky.app/profile/neurotechx.bsky.social',
        'https://x.com/neurotechx',
        'https://github.com/NeuroTechX',
        'https://www.youtube.com/@neurotechx',
        'https://www.linkedin.com/company/neurotechx',
        'https://www.instagram.com/neurotechx',
        'https://www.facebook.com/neurotechx',
        'https://linktr.ee/neurotechx',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://neurotechx.org/#website',
      url: 'https://neurotechx.org',
      name: 'NeuroTechX',
      publisher: { '@id': 'https://neurotechx.org/#organization' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} ${aldrich.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-neuro-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
