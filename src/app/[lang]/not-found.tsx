'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getDictionary, localizePath, parsePublicPath } from '@/i18n';

// not-found pages get no params, so the language comes from the address.
export default function NotFound() {
    const [lang] = parsePublicPath(usePathname() ?? '/');
    const t = getDictionary(lang);
    const href = (path: string) => localizePath(path, lang);
    return (
        <div className="container py-24 max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">404</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t.notFound.title}</h1>
            <p className="text-lg text-muted-foreground mb-10">
                {t.notFound.body}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    href={href('/')}
                    className="inline-flex items-center gap-2 rounded-lg bg-neuro-accent px-6 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
                >
                    {t.notFound.home} <ArrowRight width={16} height={16} />
                </Link>
                <Link
                    href={href('/community')}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    {t.nav.community.title}
                </Link>
                <Link
                    href={href('/jobs')}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    {t.nav.ecosystem.jobs}
                </Link>
                <Link
                    href={href('/education')}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    {t.nav.learn.education}
                </Link>
                <Link
                    href={href('/events')}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3 font-semibold text-foreground transition hover:border-neuro-accent"
                >
                    {t.nav.events}
                </Link>
            </div>
        </div>
    );
}
