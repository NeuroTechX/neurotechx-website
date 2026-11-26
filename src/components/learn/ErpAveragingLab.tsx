'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/routes';
import { erpText } from '@/content/learn/erp-averaging';
import TracePlot from './TracePlot';

const trialCounts = [1, 4, 16, 64];
const times = Array.from({ length: 250 }, (_, i) => -200 + i * 4);
const ticks = [-200, 0, 200, 400, 600, 800];
const tau = Math.PI * 2;

type Trial = { onset: number; phases: number[] };
const frequencies = [4, 7, 10, 17, 24];
const amplitudes = [8, 6, 9, 4, 2];

// Keep the underlying trials fixed when the alignment or trial count changes.
function generateTrials() {
    let seed = 2369;
    const random = () => {
        seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
        return seed / 2 ** 32;
    };
    return Array.from({ length: 128 }, (): Trial => ({
        onset: Math.floor(random() * 121 - 60) * 4,
        phases: frequencies.map(() => random() * tau),
    }));
}

const trials = generateTrials();

function average(trials: Trial[], aligned: boolean, responseAmplitude: number) {
    return times.map((time) => trials.reduce((sum, { onset, phases }) => {
        const recordedTime = aligned ? time + onset : time;
        const eventTime = recordedTime - onset;
        const background = phases.reduce((total, phase, i) => (
            total + amplitudes[i] * Math.sin(tau * frequencies[i] * recordedTime / 1000 + phase)
        ), 0);
        const response = responseAmplitude * Math.exp(-0.5 * ((eventTime - 360) / 52) ** 2);
        return sum + background + response;
    }, 0) / trials.length);
}

function windowMean(samples: number[]) {
    const window = samples.filter((_, index) => times[index] >= 260 && times[index] <= 440);
    return window.reduce((sum, sample) => sum + sample, 0) / window.length;
}

export default function ErpAveragingLab({ lang }: { lang: Locale }) {
    const [count, setCount] = useState(1);
    const [aligned, setAligned] = useState(true);
    const t = erpText[lang];
    const target = average(trials.slice(0, count), aligned, 8);
    const standard = average(trials.slice(64, 64 + count), aligned, 2);
    const difference = windowMean(target) - windowMean(standard);
    const number = new Intl.NumberFormat(lang, { maximumFractionDigits: 1, signDisplay: 'exceptZero' });

    return (
        <section className="card" aria-labelledby="erp-activity">
            <h2 id="erp-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
            <div className="grid items-start gap-6 md:grid-cols-[12rem_minmax(0,1fr)]">
                <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.count}
                        <select
                            value={count}
                            onChange={(event) => setCount(Number(event.target.value))}
                            className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2"
                        >
                            {trialCounts.map((value) => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </label>
                    <label className="flex cursor-pointer items-start gap-2 text-sm font-medium">
                        <input type="checkbox" checked={aligned} onChange={(event) => setAligned(event.target.checked)} className="mt-1 accent-neuro-accent" />
                        {t.align}
                    </label>
                </div>
                <figure className="min-w-0">
                    <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        <span className="text-cyan-300">{t.target}</span>
                        <span className="text-indigo-300">{t.standard} <span aria-hidden="true">– –</span></span>
                    </figcaption>
                    <TracePlot
                        traces={[
                            { samples: standard, color: '#a5b4fc', dashed: true },
                            { samples: target, color: '#67e8f9' },
                        ]}
                        limit={40}
                        ticks={ticks}
                        timeLabel={aligned ? t.soundOnset : t.nominalOnset}
                        voltageLabel={t.voltage}
                        marker={0}
                    />
                    <div className="mt-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                        <p className="text-xs text-muted-foreground">{t.meanWindow}</p>
                        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm font-semibold">
                            <span>{t.difference}</span><span className="text-xl tabular-nums text-neuro-accent">{number.format(difference)} µV</span>
                        </p>
                    </div>
                </figure>
            </div>
            <details className="mt-5 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.how}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
            </details>
        </section>
    );
}
