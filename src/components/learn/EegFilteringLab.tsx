'use client';

import { useState } from 'react';
import { filteringText } from '@/content/learn/eeg-filtering';
import type { Locale } from '@/i18n/routes';
import TracePlot from './TracePlot';

const sampleRate = 200;
const ticks = [0, 1, 2, 3, 4];
const tau = 2 * Math.PI;
const cutoffOptions = [0, 30, 5];

const samples = Array.from({ length: 4 * sampleRate }, (_, index) => {
    const t = index / sampleRate;
    const blink = 68 * Math.exp(-0.5 * ((t - 1) / 0.1) ** 2);
    const jaw = t >= 2.6 && t <= 3.2
        ? (25 * Math.sin(tau * 43 * t) + 17 * Math.sin(tau * 65 * t)) * Math.sin(Math.PI * (t - 2.6) / 0.6) ** 2
        : 0;
    return 12 * Math.sin(tau * 10 * t) + blink + jaw;
});

function lowPassKernel(cutoff: number) {
    if (cutoff === 0) return [1];
    const radius = 40;
    const coefficients = Array.from({ length: 2 * radius + 1 }, (_, i) => {
        const lag = i - radius;
        const sinc = lag === 0 ? 2 * cutoff / sampleRate : Math.sin(tau * cutoff * lag / sampleRate) / (Math.PI * lag);
        return sinc * (0.54 + 0.46 * Math.cos(Math.PI * lag / radius));
    });
    const dc = coefficients.reduce((sum, value) => sum + value, 0);
    return coefficients.map((value) => value / dc);
}

function sampleWindow(trace: number[], start: number, end: number) {
    return trace.slice(Math.round(start * sampleRate), Math.round(end * sampleRate));
}

export default function EegFilteringLab({ lang }: { lang: Locale }) {
    const [cutoff, setCutoff] = useState(0);
    const t = filteringText[lang];
    const kernel = lowPassKernel(cutoff);
    const radius = (kernel.length - 1) / 2;
    const filtered = samples.map((_, index) => kernel.reduce((sum, value, i) => {
        const at = index + i - radius;
        const mirrored = at < 0 ? -at : Math.min(at, 2 * (samples.length - 1) - at);
        return sum + value * samples[mirrored];
    }, 0));
    const alphaGain = Math.abs(kernel.reduce((sum, value, i) => sum + value * Math.cos(tau * 10 * (i - radius) / sampleRate), 0));
    const blink = Math.max(...sampleWindow(filtered, 0.8, 1.2).map(Math.abs));
    const jaw = sampleWindow(filtered, 2.6, 3.2);
    const jawRms = Math.sqrt(jaw.reduce((sum, value) => sum + value ** 2, 0) / jaw.length);
    const percent = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 });

    return (
        <section className="card">
            <h2 className="mb-4 text-2xl font-bold">{t.activity}</h2>
            <label className="mb-5 grid max-w-xs gap-2 text-sm font-semibold">
                {t.filter}
                <select value={cutoff} onChange={(event) => setCutoff(Number(event.target.value))} className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                    {cutoffOptions.map((value) => <option value={value} key={value}>{value ? `${value} Hz` : t.off}</option>)}
                </select>
            </label>
            <div className="grid gap-4">
                <figure>
                    <figcaption className="mb-2 text-sm font-semibold">{t.raw}</figcaption>
                    <TracePlot traces={[{ samples, color: '#67e8f9' }]} limit={90} ticks={ticks} timeLabel={t.time} voltageLabel={t.voltage} />
                </figure>
                <figure>
                    <figcaption className="mb-2 text-sm font-semibold">{t.filtered}</figcaption>
                    <TracePlot traces={[{ samples: filtered, color: '#a5b4fc' }]} limit={90} ticks={ticks} timeLabel={t.time} voltageLabel={t.voltage} />
                </figure>
            </div>
            <dl className="mt-5 grid gap-3 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 sm:grid-cols-3" aria-live="polite">
                <div><dt className="text-xs text-muted-foreground">{t.alpha}</dt><dd className="text-xl font-semibold tabular-nums">{percent.format(alphaGain)}</dd></div>
                <div><dt className="text-xs text-muted-foreground">{t.blink}</dt><dd className="text-xl font-semibold tabular-nums">{Math.round(blink)} µV</dd></div>
                <div><dt className="text-xs text-muted-foreground">{t.jaw}</dt><dd className="text-xl font-semibold tabular-nums">{Math.round(jawRms)} µV</dd></div>
            </dl>
            <details className="mt-5 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
            </details>
        </section>
    );
}
