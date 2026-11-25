import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { TEAM_CONTACT, teamRoles } from '@/data/team-roles';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/join-the-team';

export async function generateMetadata({ params }: PageProps<'/[lang]/join-the-team'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/join-the-team', lang) };
}

const ctaClass = 'mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline';

export default async function JoinTheTeamPage({ params }: PageProps<'/[lang]/join-the-team'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.title} title={t.heading} subtitle={t.subtitle} />

            <div className="grid gap-6 md:grid-cols-2">
                {teamRoles[lang].map((role) => (
                    <section key={role.title} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{role.area}</p>
                        <h2 className="mb-2 text-xl font-bold">{role.title}</h2>
                        <p className="text-sm text-muted-foreground">{role.summary}</p>
                        <ul className="mt-4 flex-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {role.tasks.map((task) => (
                                <li key={task}>{task}</li>
                            ))}
                        </ul>
                        {role.cta.href.startsWith('/') ? (
                            <Link href={role.cta.href} className={ctaClass}>
                                {role.cta.label} <ArrowRight width={15} height={15} />
                            </Link>
                        ) : (
                            <a
                                href={role.cta.href}
                                className={ctaClass}
                                {...(role.cta.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                                {role.cta.label} <ArrowRight width={15} height={15} />
                            </a>
                        )}
                    </section>
                ))}
            </div>

            <section className="mt-12 max-w-3xl">
                <h2 className="mb-3 text-2xl font-bold">{t.otherTitle}</h2>
                <p className="text-muted-foreground">
                    {t.otherBefore}{' '}
                    <a className="text-neuro-accent underline" href={`mailto:${TEAM_CONTACT}`}>{TEAM_CONTACT}</a>{' '}
                    {t.otherAfter}
                </p>
                <p className="mt-4 text-muted-foreground">
                    {t.handbookBefore}{' '}
                    <Link className="text-neuro-accent underline" href="/handbook">{t.handbookLink}</Link>.
                </p>
                <p className="mt-4 text-muted-foreground">
                    {t.jobsBefore}{' '}
                    <Link className="text-neuro-accent underline" href="/jobs">{t.jobsLink}</Link>.
                </p>
            </section>
        </div>
    );
}
