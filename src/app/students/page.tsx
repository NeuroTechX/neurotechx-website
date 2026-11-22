import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Github, Globe, Mail, PlusCircle } from 'lucide-react';
import { studentClubs } from '@/data/clubs';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Student Clubs',
    description:
        'University neurotechnology student clubs connected with NeuroTechX — projects, competitions, and how to list your club.',
    alternates: { canonical: '/students' },
};

export default function StudentClubsPage() {
    return (
        <div className={styles.pageWrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Student Clubs</h1>
                    <p className={styles.subtitle}>
                        The next generation of neurotechnology innovators. <br />
                        Explore student-led groups from universities around the world.
                    </p>

                    <Link href="/students/start-a-club" className={styles.addButton}>
                        <PlusCircle size={16} />
                        <span>Starting a club, or want yours listed? Read the guide</span>
                    </Link>
                    <p className={styles.subtitle}>
                        Looking for travel grants, fellowships or outreach funding? See{' '}
                        <Link href="/funding" style={{ color: 'var(--neuro-accent)' }}>funding opportunities</Link>.
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
                                                <a href={club.website} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="Website">
                                                    <Globe size={18} />
                                                </a>
                                            )}
                                            {club.github && (
                                                <a href={club.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="GitHub">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {club.email && (
                                                <a href={`mailto:${club.email}`} className={styles.iconLink} title="Contact">
                                                    <Mail size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className={styles.clubName}>{club.name}</h3>
                                    <div className={styles.clubMeta}>
                                        {club.university} • {club.location}
                                    </div>

                                    <p className={styles.clubDesc}>
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
                    <h2 className={styles.ctaTitle}>Don&apos;t see your club?</h2>
                    <p className={styles.subtitle}>
                        Read the <Link href="/students/start-a-club" style={{ color: 'var(--neuro-accent)' }}>guide to starting a student club</Link>, then
                        write to <a href="mailto:studentclubs@neurotechx.com" style={{ color: 'var(--neuro-accent)' }}>studentclubs@neurotechx.com</a> with
                        your club&apos;s name, university, web page and contact address. If you use GitHub, you can also open a pull request:
                    </p>

                    <div className={styles.codeBlock}>
                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}># 1. Fork the repo & edit this file:</p>
                        <p style={{ color: 'var(--neuro-accent)', marginBottom: '1rem' }}>src/data/clubs.ts</p>

                        <p style={{ color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}># 2. Add your club object:</p>
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
                            href="https://github.com/webntx/neurotechx-website/edit/main/src/data/clubs.ts"
                            target="_blank" rel="noopener noreferrer"
                            className={styles.githubButton}
                        >
                            <Github style={{ marginRight: '0.5rem' }} size={20} />
                            Edit on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
