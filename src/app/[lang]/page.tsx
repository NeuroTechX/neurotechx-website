import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Briefcase, Users } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import HeroCarousel from '@/components/HeroCarousel';
import EventsList from '@/components/EventsList';
import NewsletterSignup from '@/components/NewsletterSignup';
import { fetchFeeds } from '@/lib/rss';
import { alternatesFor, getDictionary, isLocale, localizePath } from '@/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: alternatesFor('/', isLocale(lang) ? lang : 'en') };
}

export const revalidate = 1800;

// The front page stays short: one headline, three ways in, what's next, the newsletter.
// Everything else is one click away in the menu.
export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.home;
  const href = (path: string) => localizePath(path, lang);

  // Latest NeuroTechX blog post → a hero slide (the post itself stays in its own language)
  const feeds = await fetchFeeds().catch(() => []);
  const mediumSlides = feeds
    .filter((f) => f?.source?.name === 'NeuroTechX Medium' && f.title)
    .slice(0, 1)
    .map((p) => ({
      eyebrow: dict.hero.blogEyebrow,
      title: <span lang="en">{p.title}</span>,
      desc: (p.contentSnippet || '').replace(/<[^>]*>?/gm, '').trim().slice(0, 160),
      ctas: [{ label: dict.hero.blogCta, href: p.link, external: true, primary: true }],
    }));

  const doors = [
    { icon: BookOpen, ...t.doors.learn, href: '/education' },
    { icon: Users, ...t.doors.participate, href: '/community' },
    { icon: Briefcase, ...t.doors.work, href: '/jobs' },
  ];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <NeuralBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/30 via-transparent to-[var(--background)]" />
        <div className="container relative z-10 py-24 md:py-36 text-center">
          <HeroCarousel
            mediumSlides={mediumSlides}
            today={new Date().toISOString().slice(0, 10)}
            lang={lang}
            t={dict.hero}
          />
        </div>
      </section>

      {/* ── Three ways in ── */}
      <section className="container py-16 md:py-20">
        <h2 className="sr-only">{t.doorsHeading}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {doors.map((d) => (
            <Link key={d.href} href={href(d.href)}
              className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-7 transition hover:border-[var(--border-strong)] hover:-translate-y-0.5">
              <d.icon className="mb-4 h-7 w-7 text-neuro-accent" />
              <h3 className="mb-2 text-xl font-bold group-hover:text-neuro-accent transition-colors">{d.title}</h3>
              <p className="mb-5 flex-1 text-muted-foreground">{d.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent">
                {d.cta} <ArrowRight width={15} height={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Events (next 2 upcoming) ── */}
      <section className="container pb-16 md:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">{t.eventsEyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-bold">{t.eventsHeading}</h2>
          </div>
          <Link href={href('/events')} className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-neuro-accent sm:inline-flex">
            {t.allEvents} <ArrowRight width={15} height={15} />
          </Link>
        </div>
        <EventsList upcomingOnly limit={2} lang={lang} />
        <Link href={href('/events')} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent sm:hidden">
          {t.allEvents} <ArrowRight width={15} height={15} />
        </Link>
      </section>

      {/* ── Newsletter ── */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-1)]/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-2">{t.newsletterEyebrow}</p>
            <h2 className="mb-6 text-2xl md:text-3xl font-bold">{t.newsletterHeading}</h2>
            <NewsletterSignup lang={lang} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container py-20 text-center">
        <h2 className="mx-auto mb-4 max-w-2xl text-3xl md:text-4xl font-bold">{t.ctaHeading}</h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">{t.ctaBody}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={href('/community')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neuro-accent px-6 py-3.5 font-bold text-[var(--background)] shadow-glow transition hover:brightness-110">
            {t.ctaJoin} <ArrowRight width={18} height={18} />
          </Link>
          <Link href={href('/donate')}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-3.5 font-bold text-foreground transition hover:border-neuro-accent">
            {t.ctaSupport}
          </Link>
        </div>
      </section>
    </div>
  );
}
