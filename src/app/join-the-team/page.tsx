import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { TEAM_CONTACT, teamRoles } from '@/data/team-roles';

export const metadata: Metadata = {
    title: 'Join the Team',
    description:
        'Volunteer roles NeuroTechX is looking to fill: community, Content Lab, chapters, website and open-source projects.',
    alternates: { canonical: '/join-the-team' },
};

const ctaClass = 'mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline';

export default function JoinTheTeamPage() {
    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Join the Team"
                title="Help run NeuroTechX"
                subtitle="NeuroTechX is run by volunteers. These are the roles we would most like to fill."
            />

            <div className="grid gap-6 md:grid-cols-2">
                {teamRoles.map((role) => (
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
                <h2 className="mb-3 text-2xl font-bold">Something else in mind?</h2>
                <p className="text-muted-foreground">
                    If you would like to help in a way that is not listed here, write to{' '}
                    <a className="text-neuro-accent underline" href={`mailto:${TEAM_CONTACT}`}>{TEAM_CONTACT}</a>{' '}
                    and tell us what you would like to do.
                </p>
                <p className="mt-4 text-muted-foreground">
                    Looking for paid work in neurotechnology? See the{' '}
                    <Link className="text-neuro-accent underline" href="/jobs">jobs page</Link>.
                </p>
            </section>
        </div>
    );
}
