import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
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
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-6 rounded-lg mb-12 text-center">
                <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                    <strong>{t.noteLabel}</strong> {t.noteNpo}
                    <span className="underline decoration-wavy underline-offset-2 ml-1">{t.noteCharity}</span>.
                    <br />
                    {t.noteDeductibleBefore}<strong>{t.noteDeductible}</strong>{t.noteDeductibleAfter}
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
                        <a href="https://www.paypal.com/donate/?hosted_button_id=D5FANXSC6A3UU" target="_blank" rel="noopener noreferrer" className="btn bg-[#0070BA] hover:bg-[#003087] text-white flex-1 py-4 text-lg">
                            {t.paypal}
                        </a>
                        {/* Placeholder for Stripe or other processors */}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">{t.secure}</p>
                </section>
            </div>
        </div>
    );
}
