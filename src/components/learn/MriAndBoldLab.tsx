'use client';

import { useState } from 'react';
import { mriText } from '@/content/learn/mri-and-bold';
import type { Locale } from '@/i18n/routes';
import TracePlot from './TracePlot';

const planes = ['sagittal', 'coronal', 'axial'] as const;
const sliceCount = 17;
const ticks = [0, 4, 8, 12, 16, 20];
const times = Array.from({ length: 400 }, (_, index) => index / 20);
const eventGaps = [0.5, 2, 6];

function boldResponse(elapsed: number) {
    // A normalized gamma-shaped response with a five-second peak and no undershoot.
    return elapsed > 0 ? Math.pow(elapsed / 5, 5) * Math.exp(5 - elapsed) : 0;
}

export default function MriAndBoldLab({ lang }: { lang: Locale }) {
    const [plane, setPlane] = useState<(typeof planes)[number]>('axial');
    const [slice, setSlice] = useState(8);
    const [gap, setGap] = useState(0.5);
    const t = mriText[lang];
    const eventTimes = [2, 2 + gap];
    const events = times.map((time) => eventTimes.some((event) => time >= event && time < event + 0.15) ? 1 : 0);
    const responses = times.map((time) => eventTimes.reduce((sum, event) => sum + boldResponse(time - event), 0));
    const peaks = responses.flatMap((value, i) => value > responses[i - 1] && value >= responses[i + 1] ? [times[i]] : []);
    const format = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });

    return (
        <div className="grid gap-6">
            <section className="card grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                    <h2 className="mb-3 text-2xl font-bold">{t.anatomy}</h2>
                    <p className="mb-5 text-sm text-muted-foreground">{t.anatomyTask}</p>
                    <label className="mb-5 grid gap-2 text-sm font-semibold">
                        {t.plane}
                        <select
                            value={plane}
                            onChange={(event) => setPlane(event.target.value as typeof plane)}
                            className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2"
                        >
                            {planes.map((value) => <option key={value} value={value}>{t[value]}</option>)}
                        </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.slice} <span className="sr-only">{t[plane]}</span>
                        <input type="range" min="1" max={sliceCount} value={slice + 1} onChange={(event) => setSlice(Number(event.target.value) - 1)} className="w-full accent-neuro-accent" />
                    </label>
                </div>
                <figure className="mx-auto w-full max-w-xs">
                    <div
                        role="img"
                        aria-label={`${t.template} ${t[plane]}. ${t.slice} ${slice + 1} / ${sliceCount}.`}
                        className="aspect-square w-full rounded-lg bg-black"
                        style={{
                            backgroundImage: 'url(/learn/mri/mni152-slices.png)',
                            backgroundSize: `${sliceCount * 100}% ${planes.length * 100}%`,
                            backgroundPosition: `${slice / (sliceCount - 1) * 100}% ${planes.indexOf(plane) / (planes.length - 1) * 100}%`,
                        }}
                    />
                    <figcaption className="mt-2 text-sm font-medium" aria-live="polite">{t.slice} {slice + 1} / {sliceCount}</figcaption>
                </figure>
                <p className="text-xs text-muted-foreground sm:col-span-2">
                    {t.template} © 1993–2004 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University.{' '}
                    <a href="https://github.com/templateflow/tpl-MNI152NLin2009cAsym" className="text-neuro-accent underline">{t.atlas}</a>
                    {' · '}
                    <a href="/learn/mri/LICENSE.txt" className="text-neuro-accent underline">{t.license}</a>
                </p>
            </section>
            <section className="card">
                <h2 className="mb-3 text-2xl font-bold">{t.timing}</h2>
                <p className="mb-5 text-sm text-muted-foreground">{t.timingTask}</p>
                <label className="mb-5 grid max-w-xs gap-2 text-sm font-semibold">
                    {t.gap}
                    <select
                        value={gap}
                        onChange={(event) => setGap(Number(event.target.value))}
                        className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2"
                    >
                        {eventGaps.map((value) => <option key={value} value={value}>{format.format(value)} s</option>)}
                    </select>
                </label>
                <figure>
                    <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        <span className="text-cyan-300">{t.event}</span>
                        <span className="text-indigo-300">{t.response} <span aria-hidden="true">– –</span></span>
                    </figcaption>
                    <TracePlot
                        traces={[
                            { samples: events, color: '#67e8f9' },
                            { samples: responses, color: '#a5b4fc', dashed: true },
                        ]}
                        limit={2}
                        ticks={ticks}
                        timeLabel={t.time}
                        voltageLabel={t.amplitude}
                    />
                    <p className="mt-3 text-sm" aria-live="polite">
                        {t.peaks} · <strong>{peaks.map((peak) => `${format.format(peak)} s`).join(' · ')}</strong>
                    </p>
                </figure>
            </section>
        </div>
    );
}
