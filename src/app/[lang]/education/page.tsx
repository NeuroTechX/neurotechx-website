import type { Metadata } from 'next';
import { Fragment } from 'react';
import { GraduationCap, ExternalLink } from 'lucide-react';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/education';

export async function generateMetadata({ params }: PageProps<'/[lang]/education'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/education', lang) };
}

const HARDWARE_COMMUNITIES = [
    { name: 'GOSH', href: 'https://openhardware.science/' },
    { name: 'LibreHub', href: 'https://librehub.github.io/' },
    { name: 'Open Neuroscience', href: 'https://open-neuroscience.com/' },
];

export default async function EducationPage({ params }: PageProps<'/[lang]/education'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const pro = t.pro;
    return (
        <div className="container py-12">
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

            <section className="mb-10 p-8 rounded-xl border border-neuro-accent bg-neuro-accent/5">
                <span className="text-sm font-bold uppercase tracking-wider text-neuro-accent mb-2 block">{t.micro.label}</span>
                <h2 className="text-3xl font-serif font-bold mb-4">{t.micro.title}</h2>
                <p className="text-lg text-muted-foreground mb-4">{t.micro.body}</p>
                <p className="text-sm text-muted-foreground mb-6">{t.micro.audience}</p>
                <div className="flex flex-wrap gap-4">
                    <a href="https://www.queensu.ca/microcredentials/collection/13" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                        {t.micro.coursesCta} <ExternalLink size={16} />
                    </a>
                    <a href="https://www.queensu.ca/neurotech-discovery-lab/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-foreground/20 rounded-full font-bold hover:bg-muted-foreground/10 transition-colors inline-flex items-center gap-2">
                        {t.micro.labCta} <ExternalLink size={16} />
                    </a>
                </div>
            </section>

            <div className="mb-16 p-8 bg-muted rounded-xl border border-foreground/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-neuro-accent mb-2 block">{t.primer.label}</span>
                    <h2 className="text-3xl font-serif font-bold mb-4">{t.primer.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{t.primer.body}</p>
                    <div className="flex gap-4">
                        <Link href="/primer" className="px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity">
                            {t.primer.bookCta}
                        </Link>
                        <a href="/downloads/the-neurotech-primer.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-foreground/20 rounded-full font-bold hover:bg-muted-foreground/10 transition-colors">
                            {t.primer.pdfCta}
                        </a>
                    </div>
                </div>
                <div className="w-48 h-auto shrink-0 rotate-3 transition-transform hover:rotate-0 duration-500">
                    <img
                        src="/images/neurotech-primer.png"
                        alt={t.primer.coverAlt}
                        className="w-full h-full object-contain rounded shadow-2xl border border-foreground/5"
                    />
                </div>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl font-serif font-bold mb-2 flex items-center gap-2">
                    <GraduationCap size={24} /> {t.degrees.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{t.degrees.lead}</p>
                <div className="grid md:grid-cols-2 gap-6">
                    {t.degrees.items.map((p) => (
                        <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="card p-6 block hover:border-neuro-accent transition-colors">
                            <span className="text-xs font-semibold uppercase tracking-wide text-neuro-accent block mb-2">{p.by}</span>
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{p.name} <ExternalLink size={14} /></h3>
                            <p className="text-sm text-muted-foreground">{p.about}</p>
                        </a>
                    ))}
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {[t.archives, t.tools, t.standards, t.devMeetings].map((group) => (
                        <section key={group.title}>
                            <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">{group.title}</h2>
                            <div className="card p-6 space-y-4">
                                <p className="text-sm text-muted-foreground">{group.lead}</p>
                                <ul className="space-y-3">
                                    {group.items.map((item) => (
                                        <li key={item.href}>
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="block font-bold hover:text-neuro-accent">{item.name}</a>
                                            <span className="text-xs text-muted-foreground">{item.body}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.gold.title}</h2>
                        {t.gold.items.map((item, i) => (
                            <div key={item.href} className={`card p-6 border-2 border-neuro-accent/20 bg-neuro-accent/5${i > 0 ? ' mt-6' : ''}`}>
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-neuro-accent mb-2 block flex items-center gap-2">
                                    {item.name} <ExternalLink className="w-4 h-4" />
                                </a>
                                <p className="text-sm text-foreground/80 mb-4">{item.body}</p>
                                <div className="flex gap-2">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-xs bg-background px-2 py-1 rounded border">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.skills.title}</h2>
                        {t.skills.items.map((item, i) => (
                            <div key={item.href} className={`card p-6 border-l-4 border-neuro-accent bg-muted/30${i > 0 ? ' mt-6' : ''}`}>
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-neuro-accent mb-2 block flex items-center gap-2">
                                    {item.name} <ExternalLink className="w-4 h-4" />
                                </a>
                                <p className="text-sm text-foreground/80 mb-4">{item.body}</p>
                                <div className="flex gap-2">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-xs bg-background px-2 py-1 rounded border">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.interactive.title}</h2>
                        {t.interactive.items.map((item) => (
                            <div key={item.href} className="card p-6 border-l-4 border-neuro-accent">
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-neuro-accent mb-2 block flex items-center gap-2">
                                    {item.name} <ExternalLink className="w-4 h-4" />
                                </a>
                                <p className="text-sm text-foreground/80 mb-4">{item.body}</p>
                                <div className="flex gap-2">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.hardware.title}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {t.hardware.items.map((item) => (
                                <div key={item.href} className="card p-6 bg-background">
                                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                    <p className="text-sm text-foreground/80 mb-4 h-10">{item.body}</p>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                        {item.cta} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.openHardware.title}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {t.openHardware.items.map((item) => (
                                <div key={item.href} className="card p-6 bg-background">
                                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                    <p className="text-sm text-foreground/80 mb-4 h-10">{item.body}</p>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                        {item.cta} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            ))}
                            <div className="card p-6 bg-background md:col-span-2">
                                <h3 className="font-bold text-lg mb-2">{t.openHardware.communitiesTitle}</h3>
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {HARDWARE_COMMUNITIES.map((community, i) => (
                                        <Fragment key={community.href}>
                                            {i > 0 && <span className="text-muted-foreground">|</span>}
                                            <a href={community.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-neuro-accent">
                                                <ExternalLink className="w-3 h-3" /> {community.name}
                                            </a>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.frontier.title}</h2>
                        <div className="grid md:grid-cols-1 gap-6">
                            {t.frontier.items.map((item) => (
                                <div key={item.href} className="card p-6 bg-background">
                                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                                    <p className="text-sm text-foreground/80 mb-4">{item.body}</p>
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                        {item.cta} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{pro.title}</h2>
                        <div className="grid md:grid-cols-1 gap-6">
                            {/* Summer 2026 Events */}
                            <div className="card p-6 bg-background border-2 border-neuro-accent/20">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-neuro-accent animate-pulse"></span>
                                    {pro.eventsTitle}
                                </h3>
                                <div className="space-y-4">
                                    {pro.events.map((event, i) => (
                                        <div key={event.name} className={i < pro.events.length - 1 ? 'pb-3 border-b border-border/50' : undefined}>
                                            <a href={event.href} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-neuro-accent flex items-center gap-1">
                                                {event.name} <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <div className="flex justify-between text-xs mt-1">
                                                <span className="text-foreground/80">{event.org}</span>
                                                <span className="font-mono text-muted-foreground">{event.when}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card p-6 bg-background border-neuro-accent/30">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-neuro-accent animate-pulse"></span>
                                    {pro.springTitle}
                                </h3>
                                <p className="text-sm text-foreground/80 mb-4">{pro.springBody}</p>
                                <a href="https://www.gtec.at/the-bci-neurotechnology-spring-school/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                    {pro.springCta} <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="card p-6 bg-background">
                                <h3 className="font-bold text-lg mb-2">{pro.queensTitle}</h3>
                                <p className="text-sm text-foreground/80 mb-4">{pro.queensBody}</p>
                                <a href="https://neurotechmicrocreds.com/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                    {pro.queensCta} <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="card p-6 bg-background">
                                <h3 className="font-bold text-lg mb-4">{pro.stackTitle}</h3>

                                <div className="mb-6 pb-4 border-b border-border/50">
                                    <span className="text-xs font-bold uppercase text-muted-foreground mb-3 block tracking-wider">{pro.ecosystem}</span>
                                    <div className="space-y-3">
                                        <div>
                                            <a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                                scikit-learn <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                            <p className="text-xs text-muted-foreground">{pro.sklearnBody}</p>
                                        </div>
                                        <div className="pl-3 border-l-2 border-border ml-1">
                                            <a href="https://nilearn.github.io/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                                Nilearn <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                            <p className="text-xs text-muted-foreground">{pro.nilearnBody}</p>
                                        </div>
                                        <div className="pl-3 border-l-2 border-border ml-1">
                                            <a href="https://github.com/NeuroTechX/moabb" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                                MOABB <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                            <p className="text-xs text-muted-foreground">
                                                {pro.moabbBody}
                                                <br />
                                                <span className="opacity-75">{pro.moabbPi} <a href="https://sylvchev.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-neuro-accent underline">Sylvain Chevallier</a></span>
                                            </p>
                                            <a href="https://iopscience.iop.org/article/10.1088/1741-2552/addf80" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:text-neuro-accent hover:underline block mt-1 flex items-center gap-1">
                                                📄 {pro.moabbPaper} <ExternalLink className="w-2 h-2 inline" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <a href="https://probabl.ai" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                            probabl.ai <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <p className="text-xs text-muted-foreground">{pro.probablBody}</p>
                                    </div>

                                    <div>
                                        <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                            Hugging Face <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <p className="text-xs text-muted-foreground mb-2">{pro.hfBody}</p>
                                        <div className="pl-3 border-l-2 border-border ml-1">
                                            <span className="text-xs font-bold text-muted-foreground block mb-1">{pro.hfModels}</span>
                                            <a href="https://huggingface.co/datasets/pscotti/mindeyev2" target="_blank" rel="noopener noreferrer" className="text-xs font-bold hover:text-neuro-accent flex items-center gap-1">
                                                MedARC MindEye 2 <ExternalLink className="w-2 h-2" />
                                            </a>
                                            <p className="text-[10px] text-muted-foreground">{pro.mindeyeBody}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <a href="https://www.pymc.io/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                            PyMC <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <p className="text-xs text-muted-foreground">{pro.pymcBody}</p>
                                    </div>

                                    <div>
                                        <a href="https://www.codabench.org/" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1 group">
                                            Codabench <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                        <p className="text-xs text-muted-foreground">{pro.codabenchBody}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4">{t.gsoc.title}</h2>
                        <div className="grid md:grid-cols-1 gap-6">
                            <div className="card p-6 bg-background border-neuro-accent/20">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {t.gsoc.currentTitle}
                                </h3>
                                <p className="text-sm text-foreground/80 mb-4">{t.gsoc.currentBody}</p>
                                <a href="https://www.incf.org/blog/call-project-ideas-and-mentors-gsoc-2026" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline font-bold inline-flex items-center gap-1">
                                    {t.gsoc.currentCta} <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="card p-6 bg-background">
                                <h3 className="font-bold text-lg mb-2">{t.gsoc.pastTitle}</h3>
                                <p className="text-sm text-foreground/80 mb-4">
                                    {t.gsoc.pastBefore} <strong>John Griffith & Morgan Hough</strong>{t.gsoc.pastAfter}
                                </p>
                                <span className="text-muted-foreground text-sm italic">{t.gsoc.archives}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Community & Media Partners */}
            <div className="mt-16 mb-16">
                <h2 className="text-2xl font-serif font-bold mb-6">{t.partners.title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {t.partners.items.map((partner) => (
                        <div key={partner.href} className="card p-6 border-l-4 border-neuro-accent flex flex-col justify-between">
                            <div>
                                <a href={partner.href} target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-neuro-accent mb-2 block flex items-center gap-2">
                                    {partner.name} <ExternalLink className="w-4 h-4" />
                                </a>
                                <p className="text-sm text-foreground/80 mb-4">
                                    {partner.before}
                                    {partner.strong && (
                                        <>
                                            {' '}<strong>{partner.strong}</strong> {partner.after}
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {partner.tags.map((tag) => (
                                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Resources Section */}
            <div>
                <h2 className="text-2xl font-serif font-bold mb-6">{t.videos.title}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <a href="https://www.youtube.com/@neurotechx" target="_blank" rel="noopener noreferrer" className="card p-6 block hover:border-neuro-accent transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-neuro-accent">{t.videos.neurotech101Title}</h3>
                        <p className="text-sm text-muted-foreground">{t.videos.neurotech101Body}</p>
                    </a>
                    <Link href="/education/webinars" className="card p-6 block hover:border-neuro-accent transition-colors group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-neuro-accent">{t.videos.webinarsTitle}</h3>
                        <p className="text-sm text-muted-foreground">{t.videos.webinarsBody}</p>
                    </Link>
                    <a href="https://www.youtube.com/neurotechx" target="_blank" rel="noopener noreferrer" className="card p-6 block hover:border-neuro-accent transition-colors group bg-muted/50">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-neuro-accent">{t.videos.allTitle}</h3>
                        <p className="text-sm text-muted-foreground">{t.videos.allBody}</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
