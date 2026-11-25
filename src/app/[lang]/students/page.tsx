import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowRight, Github, Globe, Mail, PlusCircle } from 'lucide-react';
import { studentClubs } from '@/data/clubs';
import styles from './page.module.css';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/students';

export async function generateMetadata({ params }: PageProps<'/[lang]/students'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/students', lang) };
}

export default async function StudentClubsPage({ params }: PageProps<'/[lang]/students'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    // Club descriptions come from src/data/clubs.ts and are written in English.
    const dataLang = lang === 'en' ? undefined : 'en';
    return (
        <div className={styles.pageWrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{t.title}</h1>
                    <p className={styles.subtitle}>
                        {t.subtitleLine1} <br />
                        {t.subtitleLine2}
                    </p>

                    <Link href="/students/start-a-club" className={styles.addButton}>
                        <PlusCircle size={16} />
                        <span>{t.addButton}</span>
                    </Link>
                    <p className={styles.subtitle}>
                        {t.fundingBefore}
                        <Link href="/funding" style={{ color: 'var(--neuro-accent)' }}>{t.fundingLink}</Link>{t.fundingAfter}
                    </p>
                </div>
            </section>

            {/* Clubs Grid */}
            <section className={styles.gridSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {studentClubs.map((club) => (
                            <div key={club.name} className={styles.card}>
                                <div className={styles.cardPadding}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.logoPlaceholder}>
                                            {/* In a real app, use next/image. Using placeholder for now if logo fails or is missing */}
                                            <span>{club.name.substring(0, 2)}</span>
                                        </div>
                                        <div className={styles.socialLinks}>
                                            {club.website && (
                                                <a href={club.website} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title={t.website}>
                                                    <Globe size={18} />
                                                </a>
                                            )}
                                            {club.github && (
                                                <a href={club.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="GitHub">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {club.email && (
                                                <a href={`mailto:${club.email}`} className={styles.iconLink} title={t.contact}>
                                                    <Mail size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className={styles.clubName}>{club.name}</h3>
                                    <div className={styles.clubMeta}>
                                        {club.university} • {club.location}
                                    </div>

                                    <p className={styles.clubDesc} lang={dataLang}>
                                        {club.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* "Add Your Club" Call to Action (PR Flow) */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
                    <p className={styles.subtitle}>
                        {t.ctaReadThe}<Link href="/students/start-a-club" style={{ color: 'var(--neuro-accent)' }}>{t.ctaGuideLink}</Link>{t.ctaThenWrite}
                        <a href="mailto:studentclubs@neurotechx.org" style={{ color: 'var(--neuro-accent)' }}>studentclubs@neurotechx.org</a>{t.ctaWith}
                    </p>

                    <div className={styles.codeBlock}>
                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>{t.codeStep1}</p>
                        <p style={{ color: 'var(--neuro-accent)', marginBottom: '1rem' }}>src/data/clubs.ts</p>

                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>{t.codeStep2}</p>
                        <pre style={{ color: 'var(--foreground)' }}>
                            {`{
  name: "Your Club Name",
  university: "Your University",
  logo: "/images/clubs/your-logo.png",
  website: "https://...",
  description: "Short description..."
},`}
                        </pre>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <a
                            href="https://github.com/NeuroTechX/neurotechx-website/edit/main/src/data/clubs.ts"
                            target="_blank" rel="noopener noreferrer"
                            className={styles.githubButton}
                        >
                            <Github style={{ marginRight: '0.5rem' }} size={20} />
                            {t.editOnGithub}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
