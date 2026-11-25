'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@/i18n/fr';
import { format, localizePath, type Locale } from '@/i18n';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type CTA = { label: string; href: string; external?: boolean; primary?: boolean };
// `until`: last day (YYYY-MM-DD) the slide is shown; past slides drop out on their own.
export type Slide = { eyebrow: string; title: React.ReactNode; desc: string; ctas: CTA[]; until?: string };

// Each slide is written in French first, then English. `highlight` is the part of the title in colour.
type SlideText = { eyebrow: string; before?: string; highlight: string; after?: string; desc: string; ctas: string[] };
type BilingualSlide = {
  fr: SlideText;
  en: SlideText;
  links: { href: string; external?: boolean; primary?: boolean }[]; // one per entry in `ctas`
  until?: string;
};

// ── Edit these to control the front-page headlines ──
// Only the welcome slide, the latest blog post and the soonest upcoming item are shown (MAX_SLIDES).
const SLIDES: BilingualSlide[] = [
  {
    fr: {
      eyebrow: 'Bienvenue chez NeuroTechX',
      before: 'La communauté internationale de la ',
      highlight: 'neurotechnologie',
      desc: "Un organisme sans but lucratif mené par des bénévoles qui rassemble la plus grande communauté internationale d'innovateurs en neurotechnologie — formation, outils libres et plus de 30 sections locales.",
      ctas: ['Rejoindre la communauté', 'Découvrir la formation'],
    },
    en: {
      eyebrow: 'The global neurotechnology community',
      before: 'The International ',
      highlight: 'Neurotechnology',
      after: ' Community',
      desc: 'A volunteer-led non-profit representing the largest global community of neurotechnology innovators — education, open-source tools, and 30+ local chapters.',
      ctas: ['Join the Community', 'Explore Education'],
    },
    links: [{ href: '/community', primary: true }, { href: '/education' }],
  },
  {
    fr: {
      eyebrow: '25 au 28 mai 2027 · St. Louis · Résumés avant le 15 janv.',
      highlight: 'FUN27',
      after: ' : conférence sur la neuromodulation par ultrasons focalisés',
      desc: "La rencontre phare du domaine sur la stimulation transcrânienne par ultrasons, organisée par ITRUSST et accueillie par Washington University in St. Louis. Résumés réguliers attendus le 15 janvier 2027; résumés de dernière heure, le 15 mars.",
      ctas: ['Détails de la conférence', 'Soumettre un résumé'],
    },
    en: {
      eyebrow: 'May 25–28, 2027 · St. Louis · Abstracts due Jan 15',
      highlight: 'FUN27',
      after: ': Focused Ultrasound Neuromodulation Conference',
      desc: "The field's flagship meeting on transcranial ultrasound stimulation, organised by ITRUSST and hosted by Washington University in St. Louis. Regular abstracts are due January 15, 2027; late-breaking abstracts March 15.",
      ctas: ['Conference details', 'Abstract submission'],
    },
    links: [
      { href: 'https://itrusst.org/fun27', external: true, primary: true },
      { href: 'https://itrusst.org/fun27/submission', external: true },
    ],
    until: '2027-05-28',
  },
  {
    fr: {
      eyebrow: 'NeuroTechX Toronto · 25 nov.',
      highlight: 'Stimulating Conversations',
      after: ' : avancées en neuromodulation',
      desc: "Courtes conférences, deux panels et démonstrations sur la stimulation cérébrale et les entreprises torontoises qui l'amènent aux patients — avec Ampa, sync2brain, Roga et Vielight. 19 h (HE) au Peter Gilgan Centre.",
      ctas: ['Billets sur Luma', 'Tous les événements'],
    },
    en: {
      eyebrow: 'NeuroTechX Toronto · Nov 25',
      highlight: 'Stimulating Conversations',
      after: ': Advances in Neuromodulation',
      desc: 'Short talks, two panels and demos on brain stimulation and the Toronto companies bringing it to patients — with speakers from Ampa, sync2brain, Roga and Vielight. 7 PM ET at the Peter Gilgan Centre.',
      ctas: ['Get tickets on Luma', 'All events'],
    },
    links: [{ href: 'https://luma.com/lvklsd9o', external: true, primary: true }, { href: '/events' }],
    until: '2026-11-25',
  },
  {
    fr: {
      eyebrow: '7 déc. · Frontier Tower, San Francisco',
      highlight: 'Neurotech@Berkeley',
      after: ' : symposium et cocktail',
      desc: "Des équipes étudiantes de UC Berkeley présentent leurs projets en neurotech, des démonstrations et des articles publiés — puis place au réseautage. 17 h à 21 h, gratuit sur inscription.",
      ctas: ["S'inscrire sur Luma", 'Tous les événements'],
    },
    en: {
      eyebrow: 'Dec 7 · Frontier Tower, San Francisco',
      highlight: 'Neurotech@Berkeley',
      after: ' Symposium & Happy Hour',
      desc: 'UC Berkeley undergraduate teams present their neurotech projects, live demos and published articles — then stay for the mixer. 5–9 PM, free with RSVP.',
      ctas: ['RSVP on Luma', 'All events'],
    },
    links: [{ href: 'https://luma.com/neurotechberkeley-showcase', external: true, primary: true }, { href: '/events' }],
    until: '2026-12-07',
  },
  {
    fr: {
      eyebrow: '9 déc. · Frontier Tower, San Francisco',
      highlight: 'BrainsConnected',
      after: ' : lancement à San Francisco',
      desc: "Lancement de BrainsConnected, une nouvelle plateforme web sur la neurotech grand public — avec son équipe de direction, dont James Cavuoto, fondateur de Neurotech Reports. 18 h à 21 h.",
      ctas: ["S'inscrire sur Luma", 'Tous les événements'],
    },
    en: {
      eyebrow: 'Dec 9 · Frontier Tower, San Francisco',
      highlight: 'BrainsConnected',
      after: ' SF Launch Event',
      desc: 'The launch of BrainsConnected, a new web hub for consumer neurotech — hear from its leadership team, including Neurotech Reports founder James Cavuoto. 6–9 PM.',
      ctas: ['Register on Luma', 'All events'],
    },
    links: [{ href: 'https://luma.com/brains-connected-launch-event', external: true, primary: true }, { href: '/events' }],
    until: '2026-12-09',
  },
  {
    fr: {
      eyebrow: 'Atelier NeurIPS 2026 · 11 et 12 déc., Sydney',
      before: 'Modèles de fondation pour le ',
      highlight: 'cerveau et le corps',
      desc: "Deuxième édition de l'atelier NeurIPS sur les modèles de fondation pour les données neuronales et les biosignaux — on y remet les prix du EEG/EMG Foundation Challenge.",
      ctas: ["L'atelier", 'Le défi'],
    },
    en: {
      eyebrow: 'NeurIPS 2026 workshop · Dec 11–12, Sydney',
      before: 'Foundation Models for the ',
      highlight: 'Brain and Body',
      desc: 'The second edition of the NeurIPS workshop on foundation models for neural and biosignal data — and home of the EEG/EMG Foundation Challenge, whose winners are announced in Sydney.',
      ctas: ['Workshop', 'The challenge'],
    },
    links: [
      { href: 'https://brainbodyfm-workshop.github.io/', external: true, primary: true },
      { href: 'https://neural-interfaces26.github.io/', external: true },
    ],
    until: '2026-12-12',
  },
  {
    fr: {
      eyebrow: 'Résumés avant le 15 janv. 2027',
      before: '12e Rencontre internationale sur les ',
      highlight: 'ICM',
      desc: "Du 7 au 10 juin 2027 · Šibenik, Croatie — la rencontre de la BCI Society. L'appel de résumés pour les présentations orales et par affiches est ouvert.",
      ctas: ['Soumettre un résumé'],
    },
    en: {
      eyebrow: 'Abstracts due Jan 15, 2027',
      before: '12th International ',
      highlight: 'BCI',
      after: ' Meeting',
      desc: "Jun 7–10, 2027 · Šibenik, Croatia — the BCI Society's meeting. The call for abstracts is open for oral and poster presentations.",
      ctas: ['Submit an abstract'],
    },
    links: [{ href: 'https://bcisociety.org/bci-meeting/abstract-submission/', external: true, primary: true }],
    until: '2027-01-15',
  },
];

function inLanguage(slide: BilingualSlide, lang: Locale): Slide {
  const text = slide[lang];
  return {
    eyebrow: text.eyebrow,
    title: (
      <>
        {text.before}
        <span className="text-gradient">{text.highlight}</span>
        {text.after}
      </>
    ),
    desc: text.desc,
    ctas: slide.links.map((link, index) => ({
      ...link,
      label: text.ctas[index],
      href: link.external ? link.href : localizePath(link.href, lang),
    })),
    until: slide.until,
  };
}

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
  lang,
  t,
}: {
  mediumSlides?: Slide[];
  today: string; // YYYY-MM-DD, from the server so server and client agree
  lang: Locale;
  t: Dictionary['hero'];
}) {
  // Welcome first, then the latest blog post, then the soonest upcoming item.
  const upcoming = SLIDES.slice(1)
    .filter((sl) => !sl.until || sl.until >= today)
    .sort((a, b) => (a.until ?? '9999').localeCompare(b.until ?? '9999'));
  const all: Slide[] = [
    inLanguage(SLIDES[0], lang),
    ...mediumSlides.slice(0, 1),
    ...upcoming.map((slide) => inLanguage(slide, lang)),
  ].slice(0, MAX_SLIDES);
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
      aria-label={t.region}
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
          <button type="button" className={control} onClick={() => go(i - 1)} aria-label={t.previous}>
            <ChevronLeft width={18} height={18} />
          </button>
          <div className="flex items-center gap-2.5" role="group" aria-label={t.choose}>
            {all.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-current={idx === i ? 'true' : undefined}
                aria-label={format(t.position, { n: idx + 1, total: n })}
                onClick={() => go(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? 'w-7 bg-neuro-accent' : 'w-2 bg-[var(--border-strong)] hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
          <button type="button" className={control} onClick={() => go(i + 1)} aria-label={t.next}>
            <ChevronRight width={18} height={18} />
          </button>
          <button
            type="button"
            className={control}
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? t.play : t.pause}
          >
            {stopped ? <Play width={16} height={16} /> : <Pause width={16} height={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
