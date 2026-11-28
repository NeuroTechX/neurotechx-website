import type { Metadata } from 'next';
import { getFeaturedProjects, getCommunityProjects, GitHubRepo } from '@/lib/github';
import Link from '@/components/LocaleLink';
import { ArrowRight, Star, GitFork, ExternalLink, Code2, BookOpen, Trophy } from 'lucide-react';
import { CHALLENGES } from '@/data/challenges';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, format, pageLocale } from '@/i18n';
import text from '@/i18n/pages/projects';
import styles from './page.module.css';

const NSG_AGENT_KIT = 'https://github.com/NeuroTechX/nsg-agent-kit';
const PIEEG_XR = 'https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing';

export async function generateMetadata({ params }: PageProps<'/[lang]/projects'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/projects', lang) };
}

export const revalidate = 3600; // Revalidate every hour

function ProjectCard({ repo, featured = false, viewCode }: { repo: GitHubRepo, featured?: boolean, viewCode: string }) {
    return (
        <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <div className={styles.cardHeader}>
                <div className={styles.repoOwner}>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} className={styles.avatar} />
                    <span>{repo.owner.login}</span>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Star size={14} />
                        <span>{repo.stargazers_count}</span>
                    </div>
                </div>
            </div>

            <h3 className={styles.repoName}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                </a>
            </h3>

            <p className={styles.description}>{repo.description}</p>

            <div className={styles.topics}>
                {repo.topics.slice(0, 4).map(topic => (
                    <span key={topic} className={styles.topic}>{topic}</span>
                ))}
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.language}>
                    <span className={styles.langColor} style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                    {repo.language}
                </span>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {viewCode} <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}

function getLanguageColor(lang: string) {
    const colors: Record<string, string> = {
        Python: '#3572A5',
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        'C++': '#f34b7d',
        MATLAB: '#e16737',
        Julia: '#a270ba',
        Jupyter: '#DA5B0B'
    };
    return colors[lang] || '#8b9bb4';
}

export default async function ProjectsPage({ params }: PageProps<'/[lang]/projects'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const featuredRepos = await getFeaturedProjects();
    const communityRepos = await getCommunityProjects();

    // Filter out duplicates (if a featured repo also appears in community list)
    const featuredIds = new Set(featuredRepos.map(r => r.id));
    const uniqueCommunityRepos = communityRepos.filter(r => !featuredIds.has(r.id));

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={<>{t.titleStart}<span className="text-gradient">{t.titleHighlight}</span></>}
                subtitle={<>{t.subtitleBefore}<code className="rounded bg-[var(--surface-2)] px-2 py-1 text-sm font-mono">neurotechx</code>{t.subtitleAfter}</>}
            />

            <section className="mb-16" id="challenges">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Trophy className="text-neuro-accent" /> {t.challengesTitle}
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                    {t.challengesLead}
                </p>
                <div className="grid gap-6">
                    {CHALLENGES[lang].map((c) => (
                        <article key={c.name} className="rounded-xl border-2 border-neuro-accent/20 bg-neuro-accent/5 p-6">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neuro-accent">{c.organiser}</p>
                            <h3 className="mb-2 text-xl font-bold">{c.name}</h3>
                            <p className="mb-3 text-sm text-foreground/80">{c.about}</p>
                            {c.prize && <p className="mb-3 text-sm"><strong>{t.prize}</strong>{c.prize}</p>}
                            <p className="mb-4 text-sm text-muted-foreground">{c.timing}</p>
                            {c.standings && (
                                <div className="mb-4 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4">
                                    <p className="mb-2 text-sm font-semibold">{format(t.leaderboardAsOf, { asOf: c.standings.asOf })}</p>
                                    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
                                        {c.standings.lines.map((l) => <li key={l}>{l}</li>)}
                                    </ul>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm font-semibold">
                                <a href={c.leaderboard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neuro-accent hover:underline">
                                    {c.leaderboardLabel ?? t.liveLeaderboard} <ExternalLink size={14} />
                                </a>
                                {c.enter && (
                                    <a href={c.enter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neuro-accent hover:underline">
                                        {c.enterLabel ?? t.howToEnter} <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" /> {t.featuredTitle}
                </h2>
                <div className={styles.grid}>
                    {featuredRepos.map(repo => (
                        <ProjectCard key={repo.id} repo={repo} featured={true} viewCode={t.viewCode} />
                    ))}
                    {/* nsg-agent-kit: NeuroTechX project, explained on /compute */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-cyan-100 text-cyan-800 flex items-center justify-center`}>NX</div>
                                <span>NeuroTechX</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href={NSG_AGENT_KIT} target="_blank" rel="noopener noreferrer">nsg-agent-kit</a>
                        </h3>
                        <p className={styles.description}>
                            {t.nsgkit.description}
                        </p>
                        <div className={styles.topics}>
                            {t.nsgkit.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <Link href="/compute" className={styles.link}>
                                {t.nsgkit.guide} <ArrowRight size={14} />
                            </Link>
                            <a href={NSG_AGENT_KIT} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.viewCode} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* PiEEG XR: community hardware on Kickstarter until Dec 31, 2026; drop or update the card after the campaign */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-green-100 text-green-700 flex items-center justify-center`}>Pi</div>
                                <span>PiEEG</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href={PIEEG_XR} target="_blank" rel="noopener noreferrer">PiEEG XR</a>
                        </h3>
                        <p className={styles.description}>
                            {t.pieegxr.description}
                        </p>
                        <div className={styles.topics}>
                            {t.pieegxr.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.pieegxr.kind}</span>
                            <a href={PIEEG_XR} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.pieegxr.back} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* bci-workshop */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-cyan-100 text-cyan-800 flex items-center justify-center`}>NX</div>
                                <span>NeuroTechX</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://github.com/NeuroTechX/bci-workshop" target="_blank" rel="noopener noreferrer">{t.bciWorkshop.name}</a>
                        </h3>
                        <p className={styles.description}>
                            {t.bciWorkshop.description}
                        </p>
                        <div className={styles.topics}>
                            {t.bciWorkshop.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.bciWorkshop.kind}</span>
                            <a href="https://github.com/NeuroTechX/bci-workshop" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.viewCode} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Timeflux */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-emerald-100 text-emerald-800 flex items-center justify-center`}>TF</div>
                                <span>timeflux</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://github.com/timeflux/timeflux" target="_blank" rel="noopener noreferrer">{t.timeflux.name}</a>
                        </h3>
                        <p className={styles.description}>
                            {t.timeflux.description}
                        </p>
                        <div className={styles.topics}>
                            {t.timeflux.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.timeflux.kind}</span>
                            <a href="https://github.com/timeflux/demos" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.viewCode} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* SPD Learn */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-indigo-100 text-indigo-800 flex items-center justify-center`}>SP</div>
                                <span>spdlearn</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://github.com/spdlearn/spd_learn" target="_blank" rel="noopener noreferrer">{t.spdlearn.name}</a>
                        </h3>
                        <p className={styles.description}>
                            {t.spdlearn.description}
                        </p>
                        <div className={styles.topics}>
                            {t.spdlearn.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.spdlearn.kind}</span>
                            <a href="https://spdlearn.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.visitWebsite} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Fallback for SCI Head Model if API fails or placeholder needed */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-gray-200 flex items-center justify-center`}>SCI</div>
                                <span>SCI Institute</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://www.sci.utah.edu/software/" target="_blank" rel="noopener noreferrer">SCI Head Models</a>
                        </h3>
                        <p className={styles.description}>
                            {t.sci.description}
                        </p>
                        <div className={styles.topics}>
                            {t.sci.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.sci.kind}</span>
                            <a href="https://www.sci.utah.edu/software/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.visitWebsite} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* OpenViBE */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-cyan-100 text-cyan-700 flex items-center justify-center`}>OV</div>
                                <span>Inria</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://openvibe.inria.fr/" target="_blank" rel="noopener noreferrer">OpenViBE</a>
                        </h3>
                        <p className={styles.description}>
                            {t.openvibe.description}
                        </p>
                        <div className={styles.topics}>
                            {t.openvibe.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.openvibe.kind}</span>
                            <a href="https://openvibe.inria.fr/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.visitWebsite} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* SPD Project */}
                    <div className={`${styles.card} ${styles.featured}`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-purple-100 text-purple-700 flex items-center justify-center`}>TD</div>
                                <span>thibaultdesurrel</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://github.com/thibaultdesurrel/riemannien_dimension_reduction" target="_blank" rel="noopener noreferrer" className={styles.smallRepoName} >riemannien_dimension_reduction</a>
                        </h3>
                        <p className={styles.description}>
                            {t.spd.description}
                        </p>
                        <div className={styles.topics}>
                            {t.spd.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>
                                <span className={styles.langColor} style={{ backgroundColor: '#3572A5' }}></span>
                                Python
                            </span>
                            <a href="https://github.com/thibaultdesurrel/riemannien_dimension_reduction" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.viewCode} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Where the flagship projects came from */}
            <div className="mb-16 max-w-3xl rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
                <h2 className="mb-2 text-xl font-bold">{t.originsTitle}</h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t.originsBody}</p>
                <Link href="/about#open-tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neuro-accent hover:underline">
                    {t.originsLink} <ArrowRight size={15} />
                </Link>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Code2 /> {t.communityTitle}
                </h2>
                <div className={styles.grid}>
                    {uniqueCommunityRepos.map(repo => (
                        <ProjectCard key={repo.id} repo={repo} viewCode={t.viewCode} />
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BookOpen /> {t.researchTitle}
                </h2>
                <div className={styles.grid}>
                    {/* ComputationalReviewDLEEG */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-cyan-100 text-cyan-800 flex items-center justify-center`}>NX</div>
                                <span>NeuroTechX</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://github.com/NeuroTechX/ComputationalReviewDLEEG" target="_blank" rel="noopener noreferrer">{t.dleeg.name}</a>
                        </h3>
                        <p className={styles.description}>
                            {t.dleeg.description}
                        </p>
                        <div className={styles.topics}>
                            {t.dleeg.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.dleeg.kind}</span>
                            <a href="https://github.com/NeuroTechX/ComputationalReviewDLEEG" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.viewCode} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-blue-100 text-blue-600 flex items-center justify-center`}>N</div>
                                <span>Nature</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://www.nature.com/articles/s41586-025-09255-w#Ack1" target="_blank" rel="noopener noreferrer">
                                A generic non-invasive neuromotor interface for HCI
                            </a>
                        </h3>
                        <p className={styles.description}>
                            {t.nature.description}
                        </p>
                        <div className={styles.topics}>
                            {t.nature.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.nature.kind}</span>
                            <a href="https://www.nature.com/articles/s41586-025-09255-w#Ack1" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.readArticle} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Brain-CODE (OBI) */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-cyan-100 text-cyan-700 flex items-center justify-center`}>BC</div>
                                <span>OBI</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://www.braincode.ca/" target="_blank" rel="noopener noreferrer">Brain-CODE</a>
                        </h3>
                        <p className={styles.description}>
                            {t.braincode.description}
                        </p>
                        <div className={styles.topics}>
                            {t.braincode.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.braincode.kind}</span>
                            <a href="https://www.braincode.ca/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.visitWebsite} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* NERVE (OBI) */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.repoOwner}>
                                <div className={`${styles.avatar} bg-green-100 text-green-700 flex items-center justify-center`}>NV</div>
                                <span>OBI</span>
                            </div>
                        </div>
                        <h3 className={styles.repoName}>
                            <a href="https://braininstitute.ca/programs-opportunities/nerve-program" target="_blank" rel="noopener noreferrer">{t.nerve.name}</a>
                        </h3>
                        <p className={styles.description}>
                            {t.nerve.description}
                        </p>
                        <div className={styles.topics}>
                            {t.nerve.topics.map((topic) => <span key={topic} className={styles.topic}>{topic}</span>)}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.language}>{t.nerve.kind}</span>
                            <a href="https://braininstitute.ca/programs-opportunities/nerve-program" target="_blank" rel="noopener noreferrer" className={styles.link}>
                                {t.learnMore} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
