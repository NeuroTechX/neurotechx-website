import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './page.module.css';
import InstagramImage from '@/components/InstagramImage';
import Link from '@/components/LocaleLink';
import { alternatesFor, format, pageLocale } from '@/i18n';
import text from '@/i18n/pages/about';

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/about', lang) };
}

type Person = { name: string; role: string; body: string };
type FigureKey = keyof (typeof text)['en']['figures'];

// History entries that carry a photo, and where each photo is served from.
const FIGURES: Record<string, FigureKey | undefined> = { 'open-hardware': 'unrick' };
const FIGURE_SRC: Record<FigureKey, string> = { unrick: '/images/history/un0rick-bench.jpg' };

function People({ people }: { people: Person[] }) {
    return (
        <div className={styles.originsGrid}>
            {people.map((person) => (
                <div key={person.name} className={styles.card}>
                    <h3 className={styles.cardTitle}>{person.name}</h3>
                    <span className={styles.cardLabel}>{person.role}</span>
                    <p className={styles.cardText}>{person.body}</p>
                </div>
            ))}
        </div>
    );
}

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className={styles.container}>
            {/* Top Images from Instagram */}
            <div className={styles.instagramGrid}>
                <a href="https://www.instagram.com/p/DB_9Z_TSZ_S/" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                    <InstagramImage 
                        src="/images/about-instagram-1.png" 
                        alt={format(t.photoAlt, { n: 1 })} 
                        className={styles.instagramImage} 
                        fallbackSrc="https://placehold.co/600x600/1a1a1a/ffffff?text=Instagram+Photo+1"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 hover:opacity-100 transition-opacity">{t.viewOnInstagram}</span>
                    </div>
                </a>
                <a href="https://www.instagram.com/p/C_id_mOS_ST/" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                    <InstagramImage 
                        src="/images/about-instagram-2.png" 
                        alt={format(t.photoAlt, { n: 2 })} 
                        className={styles.instagramImage} 
                        fallbackSrc="https://placehold.co/600x600/1a1a1a/ffffff?text=Instagram+Photo+2"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 hover:opacity-100 transition-opacity">{t.viewOnInstagram}</span>
                    </div>
                </a>
            </div>

            <section className={styles.section}>
                <h1 className={styles.title}>{t.storyTitle}</h1>
                <p className={styles.subtitle}>{t.storyLead}</p>
                <div className={styles.cardText}>
                    <p>{t.storyBody}</p>
                </div>
            </section>

            <section id="history" className={`${styles.section} ${styles.anchor}`}>
                <h2 className={styles.sectionTitle}>{t.historyTitle}</h2>
                <p className="max-w-2xl mb-8 text-lg text-muted-foreground">{t.historyLead}</p>

                <nav aria-label={t.historyNav} className={styles.historyNav}>
                    {t.history.map((entry) => (
                        <a key={entry.id} href={`#${entry.id}`} className={styles.historyNavLink}>
                            {entry.title}
                        </a>
                    ))}
                </nav>

                <ol className={styles.timeline}>
                    {t.history.map((entry) => {
                        const figureKey = FIGURES[entry.id];
                        const figure = figureKey ? t.figures[figureKey] : undefined;
                        return (
                            <li key={entry.id} id={entry.id} className={`${styles.timelineItem} ${styles.anchor}`}>
                                <span className={styles.timelinePeriod}>{entry.period}</span>
                                <h3 className={styles.timelineTitle}>{entry.title}</h3>
                                {entry.paragraphs.map((paragraph) => (
                                    <p key={paragraph.slice(0, 40)} className={styles.timelineText}>{paragraph}</p>
                                ))}
                                {figure && figureKey && (
                                    <figure className={styles.figure}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={FIGURE_SRC[figureKey]} alt={figure.alt} loading="lazy" className={styles.figureImage} />
                                        <figcaption className={styles.figureCaption}>
                                            {figure.caption}{' '}
                                            <a href={figure.sourceHref} target="_blank" rel="noopener noreferrer">{figure.credit}</a>
                                            {', '}
                                            <a href={figure.licenseHref} target="_blank" rel="noopener noreferrer">{figure.licenseLabel}</a>
                                        </figcaption>
                                    </figure>
                                )}
                                <div className={styles.timelineLinks}>
                                    {entry.links.map((link) =>
                                        link.href.startsWith('/') ? (
                                            <Link key={link.href} href={link.href} className={styles.link}>
                                                {link.label} <ArrowRight className={styles.icon} />
                                            </Link>
                                        ) : (
                                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                                {link.label} <ArrowUpRight className={styles.icon} />
                                            </a>
                                        )
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>

                <p className="mt-8 text-sm text-muted-foreground">
                    {t.sourcesNote}{' '}
                    <a href="https://github.com/m9h/neurotechx-presentations" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        {t.sourcesLink} <ArrowUpRight className={styles.icon} />
                    </a>
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t.boardTitle}</h2>
                <People people={t.board} />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t.officersTitle}</h2>
                <People people={t.officers} />
                <p style={{ marginTop: '2rem' }}>
                    <Link href="/join-the-team" className={styles.link}>
                        {t.joinTeam} <ArrowUpRight size={16} />
                    </Link>
                </p>
            </section>
        </div>
    );
}
