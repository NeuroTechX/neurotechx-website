import type { Metadata } from 'next';
import { BookOpen, Download, ExternalLink, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
    title: 'The NeuroTech Primer',
    description:
        'The NeuroTech Primer: a beginner’s guide to everything neurotechnology, written by the NeuroTechX community. Download the free PDF or get the print edition.',
};

const PDF = '/downloads/the-neurotech-primer.pdf';
const AMAZON = 'https://www.amazon.com/Neurotech-Primer-Beginners-Everything-Neurotechnology/dp/B09CKP1D66/';

const CHAPTERS = [
    'A Brief History of Neurotechnology',
    'Electroencephalography (EEG)',
    'Magnetoencephalography (MEG)',
    'Functional / Magnetic Resonance Imaging (f/MRI)',
    'Near-Infrared Spectroscopy (NIRS and fNIRS)',
    'Positron Emission Tomography (PET)',
    'Intracranial Electroencephalography (iEEG)',
    'Transcranial Electrical Stimulation (tES)',
    'Transcranial Magnetic Stimulation (TMS)',
    'Deep Brain Stimulation',
    'Focused Ultrasound',
    'Hybrid Neurotechnology Systems',
    'Market Drivers',
    'The Neurotech Ecosystem',
    'Challenges in the Field',
    'An Introduction to Neuroethics',
    'The Future of Neurotechnology',
    'Where to Start',
];

export default function PrimerPage() {
    return (
        <div className="container py-12">
            <PageHeader
                eyebrow="Education"
                title="The NeuroTech Primer"
                subtitle="A beginner’s guide to everything neurotechnology. NeuroTechX’s first book, for our community, by our community."
            />

            <div className="mb-16 flex flex-col items-center gap-10 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] p-8 md:flex-row md:items-start md:p-10">
                <div className="w-52 shrink-0">
                    <img
                        src="/images/neurotech-primer.png"
                        alt="Cover of The NeuroTech Primer"
                        className="w-full rounded border border-foreground/5 object-contain shadow-2xl"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="mb-4 text-3xl font-serif font-bold">Free to download</h2>
                    <p className="mb-4 text-lg text-muted-foreground">
                        NeuroTechX is on a mission to make the field of neurotechnology accessible to all.
                        The full book is free as a PDF: no form, no sign-up.
                    </p>
                    <p className="mb-8 text-lg text-muted-foreground">
                        Prefer paper? Buying the print edition supports NeuroTechX.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={PDF}
                            download
                            className="inline-flex items-center gap-2 rounded-full bg-neuro-accent px-7 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
                        >
                            <Download className="h-5 w-5" /> Download the PDF
                        </a>
                        <a
                            href={AMAZON}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3 font-bold transition-colors hover:bg-muted-foreground/10"
                        >
                            Get the print edition <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        PDF, 267 pages, 20 MB. The print edition is sold on Amazon.
                    </p>
                </div>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
                <section className="md:col-span-2">
                    <h2 className="mb-6 flex items-center gap-2 text-2xl font-serif font-bold">
                        <BookOpen className="h-6 w-6 text-neuro-accent" /> What&apos;s inside
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                        Eighteen chapters by more than 20 authors and editors from the community, published in 2021.
                    </p>
                    <ol className="grid list-inside list-decimal gap-x-8 gap-y-2 text-foreground/90 sm:grid-cols-2">
                        {CHAPTERS.map((chapter) => (
                            <li key={chapter}>{chapter}</li>
                        ))}
                    </ol>
                </section>

                <aside className="h-fit rounded-2xl border border-neuro-accent/20 bg-neuro-accent/5 p-8">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                        <Mail className="h-5 w-5 text-neuro-accent" /> Stay in the loop
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Optional: get the NeuroTechX newsletter. You don&apos;t need to subscribe to download the book.
                    </p>
                    <NewsletterSignup />
                </aside>
            </div>
        </div>
    );
}
