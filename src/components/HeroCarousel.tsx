'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type CTA = { label: string; href: string; external?: boolean; primary?: boolean };
// `until`: last day (YYYY-MM-DD) the slide is shown; past slides drop out on their own.
type Slide = { eyebrow: string; title: React.ReactNode; desc: string; ctas: CTA[]; until?: string };

// ── Edit these to control the front-page headlines ──
// Only the welcome slide, the latest blog post and the soonest upcoming item are shown (MAX_SLIDES).
const SLIDES: Slide[] = [
  {
    eyebrow: 'The global neurotechnology community',
    title: (
      <>
        The International <span className="text-gradient">Neurotechnology</span> Community
      </>
    ),
    desc: 'A volunteer-led non-profit representing the largest global community of neurotechnology innovators — education, open-source tools, and 30+ local chapters.',
    ctas: [
      { label: 'Join the Community', href: '/community', primary: true },
      { label: 'Explore Education', href: '/education' },
    ],
  },
  {
    eyebrow: 'May 25–28, 2027 · St. Louis · Abstracts due Jan 15',
    title: (
      <>
        <span className="text-gradient">FUN27</span>: Focused Ultrasound Neuromodulation Conference
      </>
    ),
    desc: 'The field\'s flagship meeting on transcranial ultrasound stimulation, organised by ITRUSST and hosted by Washington University in St. Louis. Regular abstracts are due January 15, 2027; late-breaking abstracts March 15.',
    ctas: [
      { label: 'Conference details', href: 'https://itrusst.org/fun27', external: true, primary: true },
      { label: 'Abstract submission', href: 'https://itrusst.org/fun27/submission', external: true },
    ],
    until: '2027-05-28',
  },
  {
    eyebrow: 'NeuroTechX Toronto · Nov 25',
    title: (
      <>
        <span className="text-gradient">Stimulating Conversations</span>: Advances in Neuromodulation
      </>
    ),
    desc: 'Short talks, two panels and demos on brain stimulation and the Toronto companies bringing it to patients — with speakers from Ampa, sync2brain, Roga and Vielight. 7 PM ET at the Peter Gilgan Centre.',
    ctas: [
      { label: 'Get tickets on Luma', href: 'https://luma.com/lvklsd9o', external: true, primary: true },
      { label: 'All events', href: '/events' },
    ],
    until: '2026-11-25',
  },
  {
    eyebrow: 'Dec 7 · Frontier Tower, San Francisco',
    title: (
      <>
        <span className="text-gradient">Neurotech@Berkeley</span> Symposium & Happy Hour
      </>
    ),
    desc: 'UC Berkeley undergraduate teams present their neurotech projects, live demos and published articles — then stay for the mixer. 5–9 PM, free with RSVP.',
    ctas: [
      { label: 'RSVP on Luma', href: 'https://luma.com/neurotechberkeley-showcase', external: true, primary: true },
      { label: 'All events', href: '/events' },
    ],
    until: '2026-12-07',
  },
  {
    eyebrow: 'Dec 9 · Frontier Tower, San Francisco',
    title: (
      <>
        <span className="text-gradient">BrainsConnected</span> SF Launch Event
      </>
    ),
    desc: 'The launch of BrainsConnected, a new web hub for consumer neurotech — hear from its leadership team, including Neurotech Reports founder James Cavuoto. 6–9 PM.',
    ctas: [
      { label: 'Register on Luma', href: 'https://luma.com/brains-connected-launch-event', external: true, primary: true },
      { label: 'All events', href: '/events' },
    ],
    until: '2026-12-09',
  },
  {
    eyebrow: 'NeurIPS 2026 workshop · Dec 12, Sydney',
    title: (
      <>
        Foundation Models for the <span className="text-gradient">Brain and Body</span>
      </>
    ),
    desc: 'The second edition of the NeurIPS workshop on foundation models for neural and biosignal data — and home of the EEG/EMG Foundation Challenge, whose winners are announced in Sydney.',
    ctas: [
      { label: 'Workshop', href: 'https://brainbodyfm-workshop.github.io/', external: true, primary: true },
      { label: 'The challenge', href: 'https://neural-interfaces26.github.io/', external: true },
    ],
    until: '2026-12-12',
  },
  {
    eyebrow: 'Abstracts due Jan 15, 2027',
    title: (
      <>
        12th International <span className="text-gradient">BCI</span> Meeting
      </>
    ),
    desc: 'Jun 7–10, 2027 · Šibenik, Croatia — the BCI Society\'s meeting. The call for abstracts is open for oral and poster presentations.',
    ctas: [
      { label: 'Submit an abstract', href: 'https://bcisociety.org/bci-meeting/abstract-submission/', external: true, primary: true },
    ],
    until: '2027-01-15',
  },
];

const INTERVAL = 6500;
const MAX_SLIDES = 3;

function Cta({ cta }: { cta: CTA }) {
  const cls = cta.primary
    ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-neuro-accent px-6 py-3.5 font-bold text-[var(--background)] shadow-glow transition hover:brightness-110'
    : 'inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-3.5 font-bold text-foreground transition hover:border-neuro-accent';
  const inner = (
    <>
      {cta.label} {cta.primary && <ArrowRight width={18} height={18} />}
    </>
  );
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={cta.href} className={cls}>{inner}</Link>
  );
}

export default function HeroCarousel({
  mediumSlides = [],
  today,
}: {
  mediumSlides?: Slide[];
  today: string; // YYYY-MM-DD, from the server so server and client agree
}) {
  // Welcome first, then the latest blog post, then the soonest upcoming item.
  const upcoming = SLIDES.slice(1)
    .filter((sl) => !sl.until || sl.until >= today)
    .sort((a, b) => (a.until ?? '9999').localeCompare(b.until ?? '9999'));
  const all: Slide[] = [SLIDES[0], ...mediumSlides.slice(0, 1), ...upcoming].slice(0, MAX_SLIDES);
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const n = all.length;
  const go = useCallback((idx: number) => setI(((idx % n) + n) % n), [n]);

  useEffect(() => {
    if (stopped || hovered || n < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [stopped, hovered, n]);

  const s = all[i];
  const control =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] text-muted-foreground transition hover:border-neuro-accent hover:text-foreground';

  return (
    <div
      className="mx-auto max-w-4xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured headlines"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div key={i} className="hero-slide" aria-live={stopped ? 'polite' : 'off'}>
        <p className="eyebrow mb-5">{s.eyebrow}</p>
        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-bold leading-[1.06] mb-6 min-h-[2.2em]">
          {s.title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-9 min-h-[3.3em]">{s.desc}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {s.ctas.map((c) => (
            <Cta key={c.label} cta={c} />
          ))}
        </div>
      </div>

      {n > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button type="button" className={control} onClick={() => go(i - 1)} aria-label="Previous headline">
            <ChevronLeft width={18} height={18} />
          </button>
          <div className="flex items-center gap-2.5" role="group" aria-label="Choose a headline">
            {all.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-current={idx === i ? 'true' : undefined}
                aria-label={`Headline ${idx + 1} of ${n}`}
                onClick={() => go(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? 'w-7 bg-neuro-accent' : 'w-2 bg-[var(--border-strong)] hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
          <button type="button" className={control} onClick={() => go(i + 1)} aria-label="Next headline">
            <ChevronRight width={18} height={18} />
          </button>
          <button
            type="button"
            className={control}
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? 'Play headlines' : 'Pause headlines'}
          >
            {stopped ? <Play width={16} height={16} /> : <Pause width={16} height={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
