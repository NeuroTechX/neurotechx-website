import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container py-24 max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">404</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Page not found</h1>
            <p className="text-lg text-muted-foreground mb-10">
                The page you&apos;re looking for may have moved when we transitioned from neurotechx.com to neurotechx.org, or no longer exists.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg bg-neuro-accent px-6 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
                >
                    Back to Home <ArrowRight width={16} height={16} />
                </Link>
                <Link
                    href="/community"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    Community
                </Link>
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    Jobs
                </Link>
                <Link
                    href="/education"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    Education
                </Link>
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    Events
                </Link>
            </div>
        </div>
    );
}
