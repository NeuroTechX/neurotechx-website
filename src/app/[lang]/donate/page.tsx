import type { Metadata } from 'next';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Donate',
    description:
        'Support NeuroTechX (Société BCI Montréal), an all-volunteer non-profit advancing open neurotechnology education, tools, and chapters worldwide.',
    alternates: { canonical: '/donate' },
};

export default function DonatePage() {
    return (
        <div className="container py-12 max-w-4xl">
            <div className="text-center mb-16">
                <span className="text-sm font-bold uppercase tracking-wider text-neuro-accent mb-2 block">Support Our Mission</span>
                <h1 className="text-5xl font-serif font-bold mb-6">Fuel the Neurotech Revolution</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    NeuroTechX is an all-volunteer community. Your support directly funds our educational resources, open data initiatives, and local chapters.
                </p>
            </div>

            {/* Disclaimer Box */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-6 rounded-lg mb-12 text-center">
                <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                    <strong>Please Note:</strong> NeuroTechX is a Canadian Non-Profit Organization (NPO),
                    <span className="underline decoration-wavy underline-offset-2 ml-1">not a registered charity</span>.
                    <br />
                    Donations are <strong>not tax-deductible</strong>. We appreciate your direct support of our operational costs.
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
                            <h2 className="text-2xl font-bold">Credit Card or PayPal</h2>
                            <p className="text-muted-foreground">The simplest way to contribute.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="https://www.paypal.com/donate/?hosted_button_id=D5FANXSC6A3UU" target="_blank" rel="noopener noreferrer" className="btn bg-[#0070BA] hover:bg-[#003087] text-white flex-1 py-4 text-lg">
                            Donate via PayPal
                        </a>
                        {/* Placeholder for Stripe or other processors */}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Secure payment processing. You can set up a monthly recurring donation.
                    </p>
                </section>

            </div>
        </div>
    );
}
