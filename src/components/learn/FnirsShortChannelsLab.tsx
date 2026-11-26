'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/routes';
import { fnirsText } from '@/content/learn/fnirs-short-channels';
import { hemodynamicResponse } from './simulated-hemodynamics';
import TracePlot from './TracePlot';

const ticks = [0, 5, 10, 15, 20, 25, 30];
const times = Array.from({ length: 300 }, (_, index) => index / 10);
const starts = [3, 17];
const oscillation = (t: number, frequency: number) => Math.sin(2 * Math.PI * frequency * t);
const response = (time: number) => starts.reduce((sum, onset) => sum + hemodynamicResponse(time - onset), 0);

const task = times.map(response);
const nearbyShort = times.map((time) => 1.15 * response(time - 0.7) + 0.42 * oscillation(time + 0.2, 0.16) + 0.2 * oscillation(time, 0.31));
const distantShort = times.map((time, index) => 0.22 * nearbyShort[index] + 0.24 * response(time - 2.5) + 0.45 * oscillation(time + 0.7, 0.23));

function center(series: number[]) {
    const mean = series.reduce((sum, value) => sum + value, 0) / series.length;
    return series.map((value) => value - mean);
}

function dot(a: number[], b: number[]) {
    return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

const centeredTask = center(task);

function estimate(long: number[], short: number[]) {
    // Centering each series fits an intercept. Solve the two-regressor normal equations.
    const measured = center(long);
    const superficial = center(short);
    const taskEnergy = dot(centeredTask, centeredTask);
    const shortEnergy = dot(superficial, superficial);
    const overlap = dot(centeredTask, superficial);
    const taskMatch = dot(measured, centeredTask);
    const shortMatch = dot(measured, superficial);
    const determinant = taskEnergy * shortEnergy - overlap ** 2;
    const shortWeight = (taskEnergy * shortMatch - overlap * taskMatch) / determinant;

    return {
        taskOnly: taskMatch / taskEnergy,
        taskAndShort: (shortEnergy * taskMatch - overlap * shortMatch) / determinant,
        cleaned: long.map((sample, index) => sample - shortWeight * superficial[index]),
    };
}

export default function FnirsShortChannelsLab({ lang }: { lang: Locale }) {
    const [cortical, setCortical] = useState(false);
    const [adjust, setAdjust] = useState(false);
    const [placement, setPlacement] = useState<'nearby' | 'distant'>('nearby');
    const t = fnirsText[lang];
    const short = placement === 'nearby' ? nearbyShort : distantShort;
    const long = times.map((time, index) => (cortical ? 1.5 : 0) * task[index] + 1.2 * nearbyShort[index] + 0.06 * oscillation(time + 0.3, 0.42));
    const fit = estimate(long, short);
    const traces = [
        { samples: long, color: '#67e8f9' },
        { samples: short, color: '#a5b4fc', dash: [5, 4] },
    ];
    if (adjust) traces.push({ samples: fit.cleaned, color: '#bef264', dash: [1, 3] });
    const format = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <section className="card" aria-labelledby="fnirs-activity">
            <h2 id="fnirs-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
            <div className="grid items-start gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
                <div className="grid gap-4">
                    <label className="flex cursor-pointer items-start gap-2 text-sm font-medium">
                        <input type="checkbox" checked={cortical} onChange={(event) => setCortical(event.target.checked)} className="mt-1 accent-neuro-accent" />
                        {t.brain}
                    </label>
                    <label className="flex cursor-pointer items-start gap-2 text-sm font-medium">
                        <input type="checkbox" checked={adjust} onChange={(event) => setAdjust(event.target.checked)} className="mt-1 accent-neuro-accent" />
                        {t.adjust}
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.placement}
                        <select
                            value={placement}
                            onChange={(event) => setPlacement(event.target.value === 'nearby' ? 'nearby' : 'distant')}
                            className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2"
                        >
                            <option value="nearby">{t.nearby}</option>
                            <option value="distant">{t.distant}</option>
                        </select>
                    </label>
                </div>
                <figure className="min-w-0">
                    <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        <span className="text-cyan-300">{t.long}</span>
                        <span className="text-indigo-300">{t.short} <span aria-hidden="true">– –</span></span>
                        {adjust && <span className="text-lime-300">{t.adjusted} <span aria-hidden="true">· · ·</span></span>}
                    </figcaption>
                    <TracePlot traces={traces} limit={4} ticks={ticks} markers={starts} timeLabel={t.time} voltageLabel={t.amplitude} />
                    <div className="mt-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                        <p className="mb-2 text-sm font-semibold">{t.task}</p>
                        <dl className="grid gap-2 sm:grid-cols-2">
                            <div><dt className="text-xs text-muted-foreground">{t.taskOnly}</dt><dd className="text-xl font-semibold tabular-nums">{format.format(fit.taskOnly)}</dd></div>
                            {adjust && <div><dt className="text-xs text-muted-foreground">{t.taskAndShort}</dt><dd className="text-xl font-semibold tabular-nums">{format.format(fit.taskAndShort)}</dd></div>}
                        </dl>
                    </div>
                </figure>
            </div>
            <details className="mt-5 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
            </details>
        </section>
    );
}
