import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { fetchFeeds } from '@/lib/rss';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Content Lab',
    description:
        'Original articles, deep dives, and editorial coverage of neurotechnology by the NeuroTechX Content Laboratory.',
    alternates: { canonical: '/content-lab' },
};

export const revalidate = 3600; // refresh hourly

const CONTENT_LAB_FEED = [
    { name: 'NeuroTechX Content Lab', type: 'blog' as const, url: 'https://medium.com/feed/neurotechx' },
];

// The Content Lab's own sign-up forms (the targets of bit.ly/NTXWrite and bit.ly/NTXEditDesign).
const PITCH_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSesaFTN9kFRmGoG-7wLDbxin4nm2H5jGJPQ07KarDF2act6uw/viewform';
const EDIT_DESIGN_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSc1zD8QeyXiL7XQwSV5fQ2L5SPvq0j5aaMnR_yLoCCxrxvreA/viewform';

const ROLES = [
    {
        title: 'Write',
        text: 'Do you have something to say about neurotech? Writers come up with original article ideas and lead content drafting.',
        cta: 'Submit your article idea',
        href: PITCH_FORM,
    },
    {
        title: 'Edit',
        text: 'Got an eye for detail? Content Lab editors work with writers to ensure content is well-researched, engaging and easy to read.',
        cta: 'Become an editor',
        href: EDIT_DESIGN_FORM,
    },
    {
        title: 'Design',
        text: 'Do you have a flair for creative design? Designers source and create original, eye-catching visuals to bring content to life.',
        cta: 'Become a designer',
        href: EDIT_DESIGN_FORM,
    },
];

const GOOD_TO_KNOW = [
    {
        title: 'Beginners welcome',
        text: 'We welcome contributors at any stage of their journey as content creators. Don\u2019t hesitate to apply.',
    },
    {
        title: 'Completely flexible',
        text: 'There is no minimum commitment. Take part for as much or as little time as suits your schedule.',
    },
    {
        title: 'Help is here',
        text: 'The Content Lab\u2019s management team is on hand to help out whenever needed.',
    },
];

export default async function ContentLabPage() {
    const articles = (await fetchFeeds(CONTENT_LAB_FEED).catch(() => []))
        .filter((a) => a?.title && a.pubDate)
        .slice(0, 12);

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Content Lab"
                title="NTX Content Laboratory"
                subtitle="Original writing on neurotechnology — by the NeuroTechX Content Lab's writers, editors, and designers."
            />

            {articles.length === 0 ? (
                <p className="text-muted-foreground">
                    Read our articles on{' '}
                    <a className="text-neuro-accent underline" href="https://medium.com/neurotechx" target="_blank" rel="noopener noreferrer">Medium</a>.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((a) => (
                        <a
                            key={a.id}
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)] transition hover:border-neuro-accent hover:-translate-y-0.5"
                        >
                            <div className="aspect-[16/9] overflow-hidden border-b border-[var(--border)] bg-[var(--surface-2)]">
                                {a.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.18),transparent_60%)]">
                                        <span className="font-display text-2xl text-[var(--border-strong)]">NTX</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                                    {a.author && <span className="font-medium text-foreground/80">{a.author}</span>}
                                    {a.author && <span>·</span>}
                                    <time dateTime={a.pubDate}>{formatDistanceToNow(new Date(a.pubDate), { addSuffix: true })}</time>
                                </div>
                                <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug group-hover:text-neuro-accent transition-colors">
                                    {a.title}
                                </h3>
                                {a.contentSnippet && (
                                    <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                                        {a.contentSnippet.replace(/<[^>]*>?/gm, '').trim()}
                                    </p>
                                )}
                                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent">
                                    Read on Medium <ArrowRight width={15} height={15} />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
                <a href="https://medium.com/neurotechx" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-neuro-accent px-6 py-3 font-bold text-[var(--background)] shadow-glow transition hover:brightness-110">
                    Read all on Medium <ArrowRight width={17} height={17} />
                </a>
                <a href="#get-involved"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-3 font-bold text-foreground transition hover:border-neuro-accent">
                    Write for us
                </a>
            </div>

            <section className="mt-16 max-w-3xl">
                <h2 className="mb-4 text-2xl md:text-3xl font-bold">What is the Content Lab?</h2>
                <p className="text-lg text-muted-foreground">
                    The Content Lab is NeuroTechX&apos;s global content initiative. We bring together writers, editors and
                    designers, united by a common passion for neurotech, to create original content exploring the world of
                    neurotechnology.
                </p>
            </section>

            <section id="get-involved" className="mt-16 scroll-mt-24">
                <h2 className="mb-6 text-2xl md:text-3xl font-bold">Get involved</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {ROLES.map((r) => (
                        <div key={r.title} className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
                            <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
                            <p className="flex-1 text-sm text-muted-foreground">{r.text}</p>
                            <a href={r.href} target="_blank" rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline">
                                {r.cta} <ArrowRight width={15} height={15} />
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {GOOD_TO_KNOW.map((g) => (
                        <div key={g.title}>
                            <h3 className="mb-1 font-bold">{g.title}</h3>
                            <p className="text-sm text-muted-foreground">{g.text}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-muted-foreground">
                    Got a question? Reach out to{' '}
                    <a className="text-neuro-accent underline" href="mailto:blog@neurotechx.org">blog@neurotechx.org</a>.
                </p>
            </section>
        </div>
    );
}
