import type { Metadata } from 'next';
import { FileText, Shield, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/transparency';

export async function generateMetadata({ params }: PageProps<'/[lang]/transparency'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/transparency', lang) };
}

export default async function TransparencyPage({ params }: PageProps<'/[lang]/transparency'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12 max-w-4xl">
            <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

            <div className="grid gap-12">
                {/* Legal Entity Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        {t.legalTitle}
                    </h2>
                    <div className="card p-6 bg-muted/50">
                        <dl className="grid md:grid-cols-2 gap-6">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.legalName}</dt>
                                <dd className="text-lg font-bold">Société BCI Montréal</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.operatingName}</dt>
                                <dd className="text-lg font-bold">NeuroTechX</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.jurisdiction}</dt>
                                <dd className="text-lg">{t.legal.jurisdictionValue}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.status}</dt>
                                <dd className="text-lg">{t.legal.statusValue}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.neq}</dt>
                                <dd className="text-lg">1170984166</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{t.legal.address}</dt>
                                <dd className="text-lg">6666 rue Saint-Urbain, bureau 200<br />Montréal (Québec) H2S 3H1, Canada</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                {/* Financials Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        {t.financialTitle}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                        {t.financialLead}
                    </p>

                    <div className="space-y-4">
                        <div className="card p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="font-bold text-lg">{t.statementsTitle}</h3>
                                <p className="text-sm text-muted-foreground">{t.statementsBody}</p>
                            </div>
                            <button className="btn btn-outline" disabled>{t.comingSoon}</button>
                        </div>

                        <div className="card p-6 flex flex-col md:flex-row justify-between items-center gap-4 opacity-75">
                            <div>
                                <h3 className="font-bold text-lg">{t.federalTitle}</h3>
                                <p className="text-sm text-muted-foreground">{t.federalBody}</p>
                            </div>
                            <span className="text-xs uppercase bg-muted px-2 py-1 rounded">{t.pending}</span>
                        </div>

                        <div className="card p-6 flex flex-col md:flex-row justify-between items-center gap-4 opacity-75">
                            <div>
                                <h3 className="font-bold text-lg">{t.provincialTitle}</h3>
                                <p className="text-sm text-muted-foreground">{t.provincialBody}</p>
                            </div>
                            <span className="text-xs uppercase bg-muted px-2 py-1 rounded">{t.pending}</span>
                        </div>
                    </div>
                </section>

                {/* Policies Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">{t.policiesTitle}</h2>
                    <div className="card p-8 border-neuro-accent/20">
                        <h3 className="text-xl font-bold mb-4">{t.topTitle}</h3>
                        <p className="mb-4">
                            {t.topBefore} <strong>{t.topOrg}</strong>{t.topAfter}
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                            {t.topItems.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <a href="https://www.cos.io/initiatives/top-guidelines" target="_blank" rel="noopener noreferrer" className="text-neuro-accent hover:underline inline-flex items-center gap-1">
                            {t.topCta} <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
