import type { Metadata } from 'next';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from '@/components/LocaleLink';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/compute';

export async function generateMetadata({ params }: PageProps<'/[lang]/compute'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/compute', lang) };
}

const NSG = 'https://www.nsgportal.org';
const PORTAL = 'https://nsgprod.sdsc.edu:8443/portal2/';
const KIT = 'https://github.com/NeuroTechX/nsg-agent-kit';
const kitDoc = (file: string) => `${KIT}/blob/master/docs/${file}`;
const STARTER = 'https://github.com/NeuroTechX/nemar-nsg-starter/tree/master/lessons';
const LESSONS = {
    pursue: `${STARTER}/pursue-p300`,
    erpCore: `${STARTER}/erp-core`,
} as const;

const SOURCES = {
    overview: `${NSG}/overview.html`,
    policy: `${NSG}/policy.html`,
    faq: `${NSG}/faq.html`,
    infra: `${NSG}/infra.html`,
    team: `${NSG}/personnel.html`,
    citation: `${NSG}/citation.html`,
    dataTransfer: `${NSG}/data.html`,
    restGuide: `${NSG}/guide.html`,
    tools: 'https://nsgprod.sdsc.edu:8443/portal2/tools.action',
    expanse: 'https://www.sdsc.edu/systems/expanse/index.html',
    nemar: 'https://nemar.org/',
    paper2013: 'https://ceur-ws.org/Vol-993/paper10.pdf',
    paper2022: 'https://doi.org/10.1093/database/baac096',
    kit: KIT,
} as const;

const DOCS = {
    readme: `${KIT}#readme`,
    access: kitDoc('NSG_ACCESS.md'),
    start: kitDoc('GETTING_STARTED.md'),
    limits: kitDoc('LIMITATIONS.md'),
    deps: kitDoc('dependencies.md'),
    nemar: kitDoc('nemar-data.md'),
    portal: kitDoc('submit-portal.md'),
    rest: kitDoc('submit-rest.md'),
    oeb: kitDoc('OPENEEGBENCH.md'),
} as const;

// Commands copied from the nsg-agent-kit README and docs/NSG_ACCESS.md (comments dropped).
// Values in config.env are the placeholders from nsgr/config.example.env.
const COMMANDS = {
    clone: `git clone https://github.com/NeuroTechX/nsg-agent-kit && cd nsg-agent-kit
cp nsgr/config.example.env nsgr/config.env`,
    config: `export NSG_URL="https://nsgr.sdsc.edu:8443/cipresrest/v1"
export NSG_USER="your_nsg_username"
export NSG_APPKEY="your_application_id"
export NSG_TOOL="PYTORCH_PY_EXPANSE"`,
    secret: `umask 077; read -rsp "NSG password: " P; printf 'export NSG_PASSWORD=%q\\n' "$P" > ~/.nsg_secret.env; unset P`,
    verify: `source nsgr/config.env; source ~/.nsg_secret.env
curl -sS -u "$NSG_USER:$NSG_PASSWORD" -H "cipres-appkey:$NSG_APPKEY" "$NSG_URL/job/$NSG_USER"`,
    run: `cd probes/reve_frozen_probe && ./make_zip.sh && cd ../..
./nsgr/nsgr.sh submit PYTORCH_PY_EXPANSE probes/reve_frozen_probe/reve_frozen_probe.zip
./nsgr/nsgr.sh list
./nsgr/nsgr.sh fetch <jobhandle> probes/reve_frozen_probe/results/
pytest probes/tests -q`,
    search: `python scripts/nemar_search.py --kw "motor imagery" --modality eeg --min-subjects 10
python scripts/nemar_inspect.py ds002718`,
} as const;

const code = 'overflow-x-auto rounded-lg border border-[var(--border-strong)] bg-[var(--background)] p-3 text-xs sm:text-sm';
const external = 'inline-flex items-center gap-1 font-semibold text-neuro-accent hover:underline';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} aria-labelledby={`${id}-h`} className="mb-14 scroll-mt-24">
            <h2 id={`${id}-h`} className="mb-4 text-3xl font-serif font-bold">{title}</h2>
            {children}
        </section>
    );
}

function Out({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={external}>
            {children} <ExternalLink aria-hidden size={14} />
        </a>
    );
}

export default async function ComputePage({ params }: PageProps<'/[lang]/compute'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    const englishTag = lang === 'fr' ? <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs">{t.english}</span> : null;
    const steps = t.kit.quickSteps;

    return (
        <div className="container py-12">
            <PageHeader
                eyebrow={t.eyebrow}
                title={<>{t.titleStart}<span className="text-gradient">{t.titleHighlight}</span></>}
                subtitle={t.lead}
            />
            <p className="-mt-6 mb-8 text-sm text-muted-foreground">{t.checked}</p>

            <nav aria-label={t.tocTitle} className="card mb-12 p-5">
                <p className="mb-2 text-sm font-bold">{t.tocTitle}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {(Object.keys(t.toc) as (keyof typeof t.toc)[]).map((key) => (
                        <li key={key}><a href={`#${key}`} className="text-neuro-accent hover:underline">{t.toc[key]}</a></li>
                    ))}
                </ul>
            </nav>

            <Section id="what" title={t.what.title}>
                <div className="mb-6 grid max-w-3xl gap-4 text-muted-foreground">
                    {t.what.body.map((p) => <p key={p}>{p}</p>)}
                </div>
                <h3 className="mb-3 text-xl font-bold">{t.what.factsTitle}</h3>
                <dl className="mb-6 grid gap-4 md:grid-cols-2">
                    {t.what.facts.map((fact) => (
                        <div key={fact.name} className="card p-5">
                            <dt className="mb-1 font-bold">{fact.name}</dt>
                            <dd className="text-sm text-muted-foreground">{fact.body}</dd>
                        </div>
                    ))}
                </dl>
                <p className="max-w-3xl rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 text-sm">{t.what.cite}</p>
            </Section>

            <Section id="tools" title={t.tools.title}>
                <p className="mb-6 max-w-3xl text-muted-foreground">{t.tools.lead}</p>
                <div className="mb-4 grid items-start gap-4 md:grid-cols-3">
                    {t.tools.groups.map((group) => (
                        <div key={group.name} className="card p-5">
                            <h3 className="mb-3 text-lg font-bold">{group.name}</h3>
                            <ul className="grid list-disc gap-1.5 pl-5 text-sm text-muted-foreground">
                                {group.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="mb-8 text-sm text-muted-foreground">
                    {t.tools.toolsNote} <Out href={SOURCES.tools}>{t.sources.tools}</Out>
                </p>
                <h3 className="mb-2 text-xl font-bold">{t.tools.hardwareTitle}</h3>
                <p className="max-w-3xl text-muted-foreground">{t.tools.hardware}</p>
            </Section>

            <Section id="data" title={t.data.title}>
                <div className="mb-4 grid max-w-3xl gap-4 text-muted-foreground">
                    {t.data.body.map((p) => <p key={p}>{p}</p>)}
                </div>
                <p className="mb-4 max-w-3xl text-sm text-muted-foreground">{t.data.tip}</p>
                <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Out href="https://nemar.org/">nemar.org</Out>
                    <Out href="https://openneuro.org/">openneuro.org</Out>
                </p>
            </Section>

            <Section id="access" title={t.access.title}>
                <ol className="mb-6 grid gap-4 md:grid-cols-3">
                    {t.access.steps.map((step) => (
                        <li key={step.name} className="card p-5">
                            <p className="mb-1 font-bold">{step.name}</p>
                            <p className="text-sm text-muted-foreground">{step.body}</p>
                        </li>
                    ))}
                </ol>
                <p className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <a href={PORTAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-5 py-2.5 font-bold text-background hover:text-background hover:brightness-110">
                        {t.access.portalCta} <ExternalLink aria-hidden size={15} />
                    </a>
                    <span className="text-muted-foreground">{t.access.registerNote}</span>
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="card p-5">
                        <h3 className="mb-2 text-lg font-bold">{t.access.policyTitle}</h3>
                        <ul className="grid list-disc gap-2 pl-5 text-sm text-muted-foreground">
                            {t.access.policy.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                    <div className="card p-5">
                        <h3 className="mb-2 text-lg font-bold">{t.access.secretsTitle}</h3>
                        <p className="text-sm text-muted-foreground">{t.access.secrets}</p>
                    </div>
                </div>
            </Section>

            <Section id="kit" title={t.kit.title}>
                <p className="mb-3 text-sm font-semibold text-neuro-accent">{t.kit.byline}</p>
                <div className="mb-4 grid max-w-3xl gap-4 text-muted-foreground">
                    {t.kit.body.map((p) => <p key={p}>{p}</p>)}
                </div>
                <p className="mb-8">
                    <a href={KIT} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neuro-accent px-5 py-2.5 text-sm font-bold text-neuro-accent hover:bg-neuro-accent/10">
                        {t.kit.repoCta} <ExternalLink aria-hidden size={15} />
                    </a>
                </p>

                <h3 className="mb-3 text-xl font-bold">{t.kit.featuresTitle}</h3>
                <dl className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {t.kit.features.map((f) => (
                        <div key={f.name} className="card p-5">
                            <dt className="mb-1 font-bold">{f.name}</dt>
                            <dd className="text-sm text-muted-foreground">{f.body}</dd>
                        </div>
                    ))}
                </dl>

                <h3 className="mb-2 text-xl font-bold">{t.kit.quickTitle}</h3>
                <p className="mb-5 max-w-3xl text-sm text-muted-foreground">{t.kit.quickLead}</p>
                <ol className="mb-6 grid max-w-4xl gap-5">
                    {(Object.keys(COMMANDS) as (keyof typeof COMMANDS)[]).map((key, i) => (
                        <li key={key} className="min-w-0">
                            <p className="mb-2 text-sm"><span className="font-bold text-neuro-accent">{i + 1}.</span> {steps[key]}</p>
                            <pre className={code}><code>{COMMANDS[key]}</code></pre>
                        </li>
                    ))}
                </ol>
                <p className="mb-10 max-w-3xl text-sm text-muted-foreground">{t.kit.portalNote}</p>

                <h3 className="mb-2 text-xl font-bold">{t.kit.lessonsTitle}</h3>
                <p className="mb-4 max-w-3xl text-sm text-muted-foreground">{t.kit.lessonsBody}</p>
                <ul className="mb-10 grid gap-2 text-sm">
                    {(Object.keys(LESSONS) as (keyof typeof LESSONS)[]).map((key) => (
                        <li key={key}>
                            <Out href={LESSONS[key]}>{t.kit.lessons[key]}</Out>
                            {englishTag}
                        </li>
                    ))}
                </ul>

                <h3 className="mb-3 text-xl font-bold">{t.kit.docsTitle}</h3>
                <ul className="grid gap-2 text-sm md:grid-cols-2">
                    {(Object.keys(DOCS) as (keyof typeof DOCS)[]).map((key) => (
                        <li key={key}>
                            <Out href={DOCS[key]}>{t.kit.docs[key]}</Out>
                            {englishTag}
                        </li>
                    ))}
                </ul>
            </Section>

            <Section id="ideas" title={t.ideas.title}>
                <p className="mb-6 max-w-3xl text-muted-foreground">{t.ideas.lead}</p>
                <div className="grid gap-4 md:grid-cols-2">
                    {t.ideas.items.map((idea) => (
                        <div key={idea.name} className="card p-5">
                            <h3 className="mb-1 text-lg font-bold">{idea.name}</h3>
                            <p className="text-sm text-muted-foreground">{idea.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="limits" title={t.limits.title}>
                <p className="mb-4 max-w-3xl text-muted-foreground">{t.limits.lead}</p>
                <ul className="mb-4 grid max-w-3xl list-disc gap-2 pl-5 text-muted-foreground">
                    {t.limits.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="text-sm"><Out href={DOCS.limits}>{t.kit.docs.limits}</Out>{englishTag}</p>
            </Section>

            <Section id="boundaries" title={t.boundaries.title}>
                <ul className="grid max-w-3xl list-disc gap-2 pl-5 text-muted-foreground">
                    {t.boundaries.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </Section>

            <Section id="sources" title={t.sourcesTitle}>
                <ul className="grid gap-2 text-sm">
                    {(Object.keys(SOURCES) as (keyof typeof SOURCES)[]).map((key) => (
                        <li key={key}>
                            <Out href={SOURCES[key]}>{t.sources[key]}</Out>
                            {englishTag}
                        </li>
                    ))}
                </ul>
            </Section>

            <nav aria-label={t.related} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border)] pt-6 text-sm">
                <span className="font-bold">{t.related}</span>
                <Link href="/learn" className="inline-flex items-center gap-1 text-neuro-accent hover:underline">{t.relatedLearn} <ArrowRight aria-hidden size={14} /></Link>
                <Link href="/projects" className="inline-flex items-center gap-1 text-neuro-accent hover:underline">{t.relatedProjects} <ArrowRight aria-hidden size={14} /></Link>
            </nav>
        </div>
    );
}
