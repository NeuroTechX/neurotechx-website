import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { FUNDING_CHECKED, FUNDING_FINDERS, fundingOpportunities, type FundingAudience } from '@/data/funding';

export const metadata: Metadata = {
    title: 'Funding Opportunities',
    description:
        'Grants, fellowships, awards and accelerators for neurotechnology students, researchers, startups and community organisers.',
    alternates: { canonical: '/funding' },
};

// Rebuilt daily so that calls whose deadline has passed drop off.
export const revalidate = 86400;

const AUDIENCES: FundingAudience[] = [
    'Students and early career',
    'Researchers and labs',
    'Startups and open source',
    'Outreach and community',
];

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(`${iso}T00:00:00Z`),
    );

export default function FundingPage() {
    const today = new Date().toISOString().slice(0, 10);
    const open = fundingOpportunities.filter((item) => !item.closes || item.closes >= today);

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Funding"
                title="Funding opportunities"
                subtitle="Grants, fellowships, awards and accelerators for people working in neurotechnology."
            />

            <section className="mb-12 rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                    <Search className="h-5 w-5 text-neuro-accent" /> Search more funding
                </h2>
                <ul className="space-y-2">
                    {FUNDING_FINDERS.map((finder) => (
                        <li key={finder.href}>
                            <a
                                href={finder.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline"
                            >
                                {finder.name} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <p className="text-sm text-muted-foreground">{finder.about}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {AUDIENCES.map((audience) => {
                const items = open.filter((item) => item.audience === audience);
                if (items.length === 0) return null;
                return (
                    <section key={audience} className="mb-12">
                        <h2 className="mb-4 text-2xl font-bold">{audience}</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {items.map((item) => (
                                <article
                                    key={item.href}
                                    className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6"
                                >
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{item.funder}</p>
                                    <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
                                    <p className="flex-1 text-sm text-muted-foreground">{item.who}</p>
                                    <dl className="mt-4 space-y-1 text-sm">
                                        {item.amount && (
                                            <div>
                                                <dt className="inline font-semibold">Amount: </dt>
                                                <dd className="inline text-muted-foreground">{item.amount}</dd>
                                            </div>
                                        )}
                                        <div>
                                            <dt className="inline font-semibold">Deadline: </dt>
                                            <dd className="inline text-muted-foreground">
                                                {[item.closes && formatDate(item.closes), item.timing].filter(Boolean).join('. ')}
                                            </dd>
                                        </div>
                                    </dl>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline"
                                    >
                                        Details from the funder <ArrowUpRight width={15} height={15} />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                );
            })}

            <section className="max-w-3xl">
                <p className="text-sm text-muted-foreground">
                    Checked on the funders&apos; own pages on {formatDate(FUNDING_CHECKED)}. Amounts, eligibility and dates
                    change: always confirm on the funder&apos;s site before applying. Know of an opportunity we should list?
                    Write to{' '}
                    <a className="text-neuro-accent underline" href="mailto:info@neurotechx.com">info@neurotechx.com</a>.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                    Looking for a job instead? See the <Link className="text-neuro-accent underline" href="/jobs">jobs page</Link>.
                </p>
            </section>
        </div>
    );
}
