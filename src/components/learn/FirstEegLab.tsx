'use client';

import { useState } from 'react';
import TracePlot from './TracePlot';
import recording from '@/content/learn/eeg-baseline.json';
import { firstEegText } from '@/content/learn/first-eeg';
import type { Locale } from '@/i18n/routes';

const { sampleRate } = recording;
const duration = 4;
const tau = 2 * Math.PI;

function simulate(eyesClosed: boolean, blink: boolean) {
    const frontal = [];
    const occipital = [];
    for (let i = 0; i < sampleRate * duration; i++) {
        const t = i / sampleRate;
        const pulse = blink ? Math.exp(-0.5 * ((t - 2) / 0.085) ** 2) : 0;
        frontal.push(4 * Math.sin(tau * 10 * t) + 12 * Math.sin(tau * 5.5 * t) + 6 * Math.sin(tau * 19 * t) + 135 * pulse);
        occipital.push((eyesClosed ? 32 : 7) * Math.sin(tau * 10 * t) + 12 * Math.sin(tau * 6.25 * t) + 7 * Math.sin(tau * 16.5 * t) + 20 * pulse);
    }
    return { frontal, occipital };
}

function center(samples: number[]) {
    const mean = samples.reduce((total, sample) => total + sample, 0) / samples.length;
    return samples.map((sample) => sample - mean);
}

function alphaShare(samples: number[]) {
    // A Hann-windowed periodogram. The common power normalization cancels in the ratio.
    const windowed = samples.map((sample, i) => sample * 0.5 * (1 - Math.cos(tau * i / (samples.length - 1))));
    let total = 0;
    let alpha = 0;
    for (let bin = 4 * duration; bin <= 30 * duration; bin++) {
        let real = 0;
        let imaginary = 0;
        for (let i = 0; i < windowed.length; i++) {
            const phase = tau * bin * i / windowed.length;
            real += windowed[i] * Math.cos(phase);
            imaginary += windowed[i] * Math.sin(phase);
        }
        const power = real ** 2 + imaginary ** 2;
        total += power;
        if (bin >= 8 * duration && bin <= 12 * duration) alpha += power;
    }
    return alpha / total;
}

function Trace({ samples, limit, channel, color, lang }: {
    samples: number[]; limit: number; channel: string; color: string; lang: Locale;
}) {
    const t = firstEegText[lang];
    const peak = Math.max(...samples.map(Math.abs));

    return (
        <figure>
            <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold">{channel}</span>
                <span className="text-xs text-muted-foreground" aria-live="polite">{t.peak} {Math.round(peak)} µV</span>
            </figcaption>
            <TracePlot
                traces={[{ samples, color }]}
                limit={limit}
                ticks={[0, 1, 2, 3, 4]}
                timeLabel={t.time}
                voltageLabel={t.voltage}
            />
        </figure>
    );
}

const option = 'cursor-pointer rounded-lg border border-[var(--border-strong)] px-3 py-2 text-sm font-medium has-[:checked]:border-neuro-accent has-[:checked]:bg-neuro-accent/10';

export default function FirstEegLab({ lang }: { lang: Locale }) {
    const [source, setSource] = useState<'simulation' | 'recording'>('simulation');
    const [eyes, setEyes] = useState<'open' | 'closed'>('open');
    const [blink, setBlink] = useState(false);
    const isRecording = source === 'recording';
    const traces = isRecording ? recording[eyes] : simulate(eyes === 'closed', blink);
    const frontal = center(traces.frontal);
    const occipital = center(traces.occipital);
    const alpha = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 }).format(alphaShare(occipital));
    const t = firstEegText[lang];

    return (
        <section className="card" aria-labelledby="eeg-activity">
            <h2 id="eeg-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
            <div className="grid items-start gap-8 md:grid-cols-[13rem_minmax(0,1fr)]">
                <div className="grid gap-5">
                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold">{t.source}</legend>
                        <div className="grid gap-2">
                            {(['simulation', 'recording'] as const).map((value) => (
                                <label key={value} className={option}>
                                    <input type="radio" name="eeg-source" checked={source === value} onChange={() => setSource(value)} className="mr-2 accent-neuro-accent" />
                                    {t[value]}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold">{t.condition}</legend>
                        <div className="grid gap-2">
                            {(['open', 'closed'] as const).map((value) => (
                                <label key={value} className={option}>
                                    <input type="radio" name="eeg-condition" checked={eyes === value} onChange={() => setEyes(value)} className="mr-2 accent-neuro-accent" />
                                    {t[value]}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    {!isRecording && (
                        <label className="flex cursor-pointer items-start gap-2 text-sm font-medium">
                            <input type="checkbox" checked={blink} onChange={(event) => setBlink(event.target.checked)} className="mt-1 accent-neuro-accent" />
                            {t.blink}
                        </label>
                    )}
                </div>
                <div className="grid gap-5">
                    <Trace samples={frontal} limit={isRecording ? 250 : 150} channel={t.frontal} color="#67e8f9" lang={lang} />
                    <Trace samples={occipital} limit={isRecording ? 250 : 150} channel={t.occipital} color="#a5b4fc" lang={lang} />
                    <div className="rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4">
                        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm font-semibold" aria-live="polite">
                            <span>{t.alpha}</span><span className="text-xl tabular-nums text-neuro-accent">{alpha}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{t.alphaHelp}</p>
                    </div>
                    <details className="text-sm text-muted-foreground">
                        <summary className="cursor-pointer">{isRecording ? t.recording : t.simulation}</summary>
                        <p className="mt-2">{isRecording ? t.recordingNote : t.simulationNote}</p>
                        {isRecording && (
                            <>
                                <p className="mt-2">{t.credits}</p>
                                <p className="mt-1">
                                    <a href={recording.dataset} className="text-neuro-accent underline">{t.dataset}</a>
                                    {' · '}
                                    <a href={recording.license} className="text-neuro-accent underline">{t.license}</a>
                                </p>
                            </>
                        )}
                    </details>
                </div>
            </div>
        </section>
    );
}
