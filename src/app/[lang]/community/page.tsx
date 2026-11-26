import type { Metadata } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Chapters from '@/components/Chapters';
import Link from '@/components/LocaleLink';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/community';

export async function generateMetadata({ params }: PageProps<'/[lang]/community'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/community', lang) };
}

const STORY_VIDEOS = ['QEmz_ovwUd4', 'p4XmnU1Y1MM', 'sUAyel1Yfqg', 'iiIOG3Db-xE'];
const SOCIAL = [
    { name: 'Bluesky', href: 'https://bsky.app/profile/neurotechx.bsky.social' },
    { name: 'Twitter / X', href: 'https://twitter.com/neurotechx' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/neurotechx' },
    { name: 'Instagram', href: 'https://www.instagram.com/neurotechx' },
    { name: 'Facebook', href: 'https://www.facebook.com/neurotechx' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@neurotechx' },
    { name: 'Hugging Face', href: 'https://huggingface.co/NeuroTechX' },
];

export default async function CommunityPage({ params }: PageProps<'/[lang]/community'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

            {/* Ways to get involved */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">{t.waysTitle}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {t.ways.map((way) => {
                        const external = way.href.startsWith('http');
                        const anchor = way.href.startsWith('#');
                        const className = 'group card p-6 flex flex-col hover:border-neuro-accent transition-colors';
                        const inner = (
                            <>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-neuro-accent">{way.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 flex-1">{way.body}</p>
                                <span className="inline-flex items-center gap-1 text-sm font-bold text-neuro-accent">
                                    {way.cta} {external ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                                </span>
                            </>
                        );
                        return external ? (
                            <a key={way.href} href={way.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
                        ) : anchor ? (
                            <a key={way.href} href={way.href} className={className}>{inner}</a>
                        ) : (
                            <Link key={way.href} href={way.href} className={className}>{inner}</Link>
                        );
                    })}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                    <Link href="/code-of-conduct" className="font-semibold text-neuro-accent hover:underline">{t.readConduct}</Link>
                    {' · '}
                    <Link href="/guide" className="font-semibold text-neuro-accent hover:underline">{t.guide}</Link>
                </p>
            </div>

            {/* Chapters: featured + full list + student clubs */}
            <div id="chapters" className="mb-16 scroll-mt-24">
                <Chapters lang={lang} t={t.chapters} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 bg-muted rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">{t.storiesTitle}</h2>
                    <p className="mb-4 text-muted-foreground">{t.storiesLead}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {STORY_VIDEOS.map((id) => (
                            <div key={id} className="aspect-video bg-black rounded overflow-hidden relative group">
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                                    className="w-full h-full"
                                    title={t.storyVideo}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    loading="lazy"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <a href="https://www.youtube.com/@neurotechx" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neuro-accent hover:underline">
                            {t.moreStories}
                        </a>
                    </div>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">{t.connectTitle}</h2>
                    <p className="mb-4 text-muted-foreground">{t.connectLead}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="https://linktr.ee/neurotechx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neuro-accent font-medium text-neuro-accent">{t.linktree}</a>
                        {SOCIAL.map((link) => (
                            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neuro-accent font-medium">{link.name}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Beyond NeuroTechX: other open communities */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{t.beyondTitle}</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl">{t.beyondLead}</p>
            </div>

            <div className="mb-12">
                <div className="card p-6 border-l-4 border-neuro-accent bg-muted/30">
                    <h3 className="font-bold text-lg mb-2">{t.calendarTitle}</h3>
                    <p className="text-sm text-foreground/80 mb-4">{t.calendarBody}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold text-muted-foreground">{t.curatedBy}</span>
                        <a href="https://sites.google.com/site/fabienlotte" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-neuro-accent hover:underline">
                            Fabien Lotte (Inria)
                        </a>
                    </div>
                    <a href="https://sites.google.com/site/fabienlotte/bci-community/conferences" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neuro-accent hover:underline flex items-center gap-1">
                        {t.calendarCta} <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Open Science Networks */}
            <div className="mb-12">
                <h3 className="text-xl font-bold mb-2">{t.networksTitle}</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl">{t.networksLead}</p>
                <div className="grid md:grid-cols-2 gap-8">
                    {t.networks.map((network) => (
                        <a key={network.href} href={network.href} target="_blank" rel="noopener noreferrer" className="card p-6 block hover:border-neuro-accent transition-colors group">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-neuro-accent">{network.title}</h3>
                            <p className="text-sm text-muted-foreground">{network.body}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Forums & Support */}
            <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">{t.forumsTitle}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="card p-6 border-l-4 border-neuro-accent">
                        <h3 className="font-bold text-xl mb-2">NeuroStars</h3>
                        <p className="text-sm text-muted-foreground mb-4">{t.neurostarsBody}</p>
                        <a href="https://neurostars.org/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold">
                            {t.neurostarsCta}
                        </a>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-bold text-xl mb-4">{t.softwareTitle}</h3>
                        <ul className="space-y-4">
                            {t.software.map((item) => (
                                <li key={item.name}>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-neuro-accent block">{item.name}</a>
                                    <span className="text-xs text-muted-foreground">{item.body}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mb-12 card p-6">
                <h3 className="font-bold text-xl mb-2">{t.turingTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.turingBody}</p>
                <a href="https://book.the-turing-way.org/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold">{t.turingCta}</a>
            </div>
        </div>
    );
}
