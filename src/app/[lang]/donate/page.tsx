import type { Metadata } from 'next';
import Link from '@/components/LocaleLink';
import { ArrowRight, Building2, Heart, Mail } from 'lucide-react';
import { alternatesFor, pageLocale } from '@/i18n';
import text from '@/i18n/pages/donate';

export async function generateMetadata({ params }: PageProps<'/[lang]/donate'>): Promise<Metadata> {
    const lang = await pageLocale(params);
    const t = text[lang];
    return { title: t.title, description: t.description, alternates: alternatesFor('/donate', lang) };
}

export default async function DonatePage({ params }: PageProps<'/[lang]/donate'>) {
    const lang = await pageLocale(params);
    const t = text[lang];
    return (
        <div className="container py-12 max-w-4xl">
            <div className="text-center mb-16">
                <span className="text-sm font-bold uppercase tracking-wider text-neuro-accent mb-2 block">{t.eyebrow}</span>
                <h1 className="text-5xl font-serif font-bold mb-6">{t.heading}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.lead}</p>
            </div>

            {/* Disclaimer Box */}
            <div className="bg-amber-950/30 border border-amber-900 p-6 rounded-lg mb-12 text-center">
                <p className="text-amber-200 text-sm font-medium">
                    <strong>{t.noteLabel}</strong> {t.noteNpo}
                    <span className="underline decoration-wavy underline-offset-2 ml-1">{t.noteCharity}</span>.
                    <br />
                    {t.noteDeductibleBefore}
                    <strong>{t.noteDeductible}</strong>
                    {t.noteDeductibleAfter}
                </p>
            </div>

            <div className="grid gap-8">
                {/* Primary Method: PayPal / CC */}
                <section className="card p-8 border-2 border-neuro-accent/20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-neuro-accent/10 flex items-center justify-center text-neuro-accent">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{t.cardTitle}</h2>
                            <p className="text-muted-foreground">{t.cardLead}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://www.paypal.com/donate/?hosted_button_id=D5FANXSC6A3UU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#0070BA] hover:bg-[#003087] px-6 py-4 text-center text-lg font-bold text-white transition-colors"
                        >
                            {t.paypal}
                        </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">{t.secure}</p>
                </section>

                {/* What your support funds */}
                <section className="mt-4">
                    <h2 className="mb-5 text-2xl font-bold">{t.fundsTitle}</h2>
                    <div className="grid gap-5 md:grid-cols-3">
                        {t.fundsItems.map((item) => (
                            <div key={item.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
                                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Corporate / Institutional Sponsorship */}
                <section className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8">
                    <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                        <Building2 className="h-5 w-5 text-neuro-accent" /> {t.sponsorTitle}
                    </h2>
                    <p className="mb-6 max-w-2xl text-muted-foreground">{t.sponsorBody}</p>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
                        <a
                            href="mailto:info@neurotechx.org?subject=Sponsoring%20or%20partnering%20with%20NeuroTechX"
                            className="inline-flex items-center gap-2 rounded-lg bg-neuro-accent px-5 py-2.5 font-bold text-[var(--background)] transition hover:brightness-110"
                        >
                            <Mail className="h-4 w-4" /> {t.sponsorEmailCta}
                        </a>
                        <Link href="/guide/sponsorship" className="inline-flex items-center gap-1.5 text-neuro-accent hover:underline">
                            {t.sponsorGuideCta} <ArrowRight width={15} height={15} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
