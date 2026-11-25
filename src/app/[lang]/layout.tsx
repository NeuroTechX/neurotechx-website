import type { Metadata } from 'next'
import { Inter, Aldrich } from 'next/font/google'
import '../globals.css'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TranslationGate from '@/components/TranslationGate'
import { getDictionary, isLocale, LOCALES } from '@/i18n'
import { Analytics } from '@vercel/analytics/react'

// Inter = body + headings (readable). Aldrich = display/wordmark only (--font-display).
const interSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const aldrich = Aldrich({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' })

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  const t = getDictionary(isLocale(lang) ? lang : 'en').meta
  return {
    metadataBase: new URL('https://neurotechx.org'),
    title: { default: t.title, template: '%s · NeuroTechX' },
    description: t.description,
    openGraph: {
      title: 'NeuroTechX',
      description: t.ogDescription,
      url: 'https://neurotechx.org',
      siteName: 'NeuroTechX',
      type: 'website',
      locale: lang === 'fr' ? 'fr_CA' : 'en_CA',
    },
    twitter: { card: 'summary_large_image', title: 'NeuroTechX', description: t.ogDescription },
  }
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}


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

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <html lang={lang === 'fr' ? 'fr-CA' : 'en'}>
      <body className={`${interSans.variable} ${aldrich.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-neuro-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          {t.skipToContent}
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Header lang={lang} t={t} />
          <main id="main" className="flex-1">
            <TranslationGate notice={t.notTranslated}>{children}</TranslationGate>
          </main>
          <Footer lang={lang} t={t} />
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
