'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import recording from '@/content/learn/eeg-baseline.json';
import { MNE_REFERENCE_TUTORIAL, signalsQuestions, signalsText } from '@/content/learn/signals';
import type { Locale } from '@/i18n/routes';
import ChapterQuestion from './ChapterQuestion';
import TracePlot from './TracePlot';
import { aliasFrequency, gaussian, spectrogram, welch } from './signals-dsp';

const tau = 2 * Math.PI;
const grid = '#313747';
const option = 'cursor-pointer rounded-lg border border-[var(--border-strong)] px-3 py-2 text-sm font-medium has-[:checked]:border-neuro-accent has-[:checked]:bg-neuro-accent/10';
const select = 'rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2';

type Draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

function Canvas({ draw, className }: { draw: Draw; className: string }) {
    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const element = canvas.current;
        if (!element) return;
        const render = () => {
            const ctx = element.getContext('2d');
            const { width, height } = element.getBoundingClientRect();
            if (!ctx || width === 0 || height === 0) return;
            const scale = window.devicePixelRatio || 1;
            element.width = Math.round(width * scale);
            element.height = Math.round(height * scale);
            ctx.scale(element.width / width, element.height / height);
            draw(ctx, width, height);
        };
        render();
        const observer = new ResizeObserver(render);
        observer.observe(element);
        return () => observer.disconnect();
    }, [draw]);
    return <canvas ref={canvas} className={`block w-full rounded-sm bg-[var(--background)] ${className}`} />;
}

function verticalGrid(ctx: CanvasRenderingContext2D, width: number, height: number, count: number) {
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= count; i++) {
        const x = 0.5 + (width - 1) * i / count;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
}

function Axis({ ticks, label }: { ticks: readonly (number | string)[]; label: string }) {
    return (
        <div>
            <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
                {ticks.map((tick) => <span key={tick}>{tick}</span>)}
            </div>
            <p className="mt-1 text-right text-xs text-muted-foreground">{label}</p>
        </div>
    );
}

function Badge({ children }: { children: ReactNode }) {
    return <span className="rounded-full border border-neuro-accent/40 px-2.5 py-0.5 text-xs font-semibold text-neuro-accent">{children}</span>;
}

function Slider({ label, value, min, max, step, unit, onChange }: {
    label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void;
}) {
    return (
        <label className="grid gap-1 text-sm font-semibold">
            <span className="flex justify-between gap-3"><span>{label}</span><span className="tabular-nums text-neuro-accent">{value} {unit}</span></span>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="accent-neuro-accent" />
        </label>
    );
}

function Readout({ items }: { items: readonly { label: string; value: string }[] }) {
    return (
        <dl className="grid gap-3 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 sm:grid-cols-3" aria-live="polite">
            {items.map(({ label, value }) => (
                <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="text-xl font-semibold tabular-nums">{value}</dd></div>
            ))}
        </dl>
    );
}

function Section({ heading, badge, lead, tasks, method, methodHeading, question, lang, children }: {
    heading: string; badge: ReactNode; lead: string; tasks: readonly string[]; method: ReactNode; methodHeading: string;
    question: number; lang: Locale; children: ReactNode;
}) {
    return (
        <section className="grid gap-5">
            <div className="card">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">{heading}</h2>
                    {badge}
                </div>
                <p className="mb-4 max-w-prose text-muted-foreground">{lead}</p>
                <ol className="mb-6 grid list-decimal gap-2 pl-6 text-sm marker:font-bold marker:text-neuro-accent">
                    {tasks.map((task) => <li key={task} className="pl-1">{task}</li>)}
                </ol>
                {children}
                <details className="mt-5 text-sm text-muted-foreground">
                    <summary className="cursor-pointer font-medium">{methodHeading}</summary>
                    <div className="mt-2 grid max-w-prose gap-2">{method}</div>
                </details>
            </div>
            <ChapterQuestion question={signalsQuestions[lang][question]} lang={lang} />
        </section>
    );
}

// 1. Sampling and aliasing

const samplingWindow = 0.5;

function SamplingSection({ lang }: { lang: Locale }) {
    const t = signalsText[lang];
    const s = t.sampling;
    const [frequency, setFrequency] = useState(10);
    const [rate, setRate] = useState(100);
    const nyquist = rate / 2;
    const apparent = aliasFrequency(frequency, rate);
    // Signed alias: the sine at this frequency passes through exactly the same samples.
    const signedAlias = frequency - rate * Math.round(frequency / rate);
    const state = frequency < nyquist ? s.below : frequency === nyquist ? s.at : s.above;
    const number = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });

    const draw = useMemo<Draw>(() => (ctx, width, height) => {
        verticalGrid(ctx, width, height, 5);
        const x = (time: number) => width * time / samplingWindow;
        const y = (value: number) => height / 2 * (1 - 0.85 * value);
        ctx.strokeStyle = grid;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        const curve = (f: number, color: string, dashed: boolean) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash(dashed ? [6, 4] : []);
            ctx.beginPath();
            const steps = Math.max(600, Math.round(width * 2));
            for (let i = 0; i <= steps; i++) {
                const time = samplingWindow * i / steps;
                const value = Math.sin(tau * f * time);
                if (i === 0) ctx.moveTo(x(time), y(value));
                else ctx.lineTo(x(time), y(value));
            }
            ctx.stroke();
            ctx.setLineDash([]);
        };
        curve(frequency, '#475569', false);
        if (signedAlias !== frequency) curve(signedAlias, '#a5b4fc', true);
        ctx.fillStyle = '#67e8f9';
        for (let n = 0; n / rate <= samplingWindow; n++) {
            ctx.beginPath();
            ctx.arc(x(n / rate), y(Math.sin(tau * frequency * n / rate)), 3, 0, tau);
            ctx.fill();
        }
    }, [frequency, rate, signedAlias]);

    return (
        <Section heading={s.heading} badge={<Badge>{t.simulated}</Badge>} lead={s.lead} tasks={s.tasks} method={<p>{s.method}</p>} methodHeading={t.methodHeading} question={0} lang={lang}>
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <Slider label={s.signal} value={frequency} min={1} max={120} step={1} unit="Hz" onChange={setFrequency} />
                <Slider label={s.rate} value={rate} min={20} max={300} step={10} unit="Hz" onChange={setRate} />
            </div>
            <figure aria-hidden="true">
                <Canvas draw={draw} className="h-40 sm:h-48" />
                <Axis ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((tick) => number.format(tick))} label={t.time} />
                <figcaption className="mt-1 text-xs text-muted-foreground">{s.legend}</figcaption>
            </figure>
            <div className="mt-4 grid gap-3">
                <Readout items={[
                    { label: s.signal, value: `${frequency} Hz` },
                    { label: s.nyquist, value: `${number.format(nyquist)} Hz` },
                    { label: s.apparent, value: `${number.format(apparent)} Hz` },
                ]} />
                <p className="text-sm font-medium" aria-live="polite">{state}</p>
            </div>
        </Section>
    );
}

// 2. Frequency content

const spectrumRate = 256;
const spectrumSeconds = 8;
const spectrumNoise = gaussian(spectrumRate * spectrumSeconds, 11);
const spectrumWindows = [0.5, 1, 2, 4];
const spectrumMax = 80;

function SpectrumPlot({ frequencies, power, maxFrequency, ticks, label, powerLabel }: {
    frequencies: readonly number[]; power: readonly number[]; maxFrequency: number; ticks: readonly number[]; label: string; powerLabel: string;
}) {
    const decibels = power.map((value) => 10 * Math.log10(Math.max(value, 1e-12)));
    const visible = decibels.filter((_, k) => frequencies[k] <= maxFrequency && frequencies[k] >= 1);
    const top = Math.ceil((Math.max(...visible) + 3) / 10) * 10;
    const bottom = top - 60;
    const draw = useMemo<Draw>(() => (ctx, width, height) => {
        verticalGrid(ctx, width, height, ticks.length - 1);
        ctx.strokeStyle = grid;
        for (let level = 1; level < 6; level++) {
            ctx.beginPath();
            ctx.moveTo(0, height * level / 6);
            ctx.lineTo(width, height * level / 6);
            ctx.stroke();
        }
        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let started = false;
        frequencies.forEach((f, k) => {
            if (f > maxFrequency) return;
            const x = width * f / maxFrequency;
            const y = height * (top - Math.max(decibels[k], bottom)) / (top - bottom);
            if (!started) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            started = true;
        });
        ctx.stroke();
    }, [frequencies, decibels, maxFrequency, ticks, top, bottom]);

    return (
        <figure aria-hidden="true">
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2">
                <div className="flex flex-col justify-between text-right text-xs tabular-nums text-muted-foreground">
                    <span>{top}</span><span>{top - 30}</span><span>{bottom}</span>
                </div>
                <Canvas draw={draw} className="h-48 sm:h-56" />
                <span />
                <Axis ticks={ticks} label={label} />
            </div>
            <figcaption className="ml-12 text-xs text-muted-foreground">{powerLabel}</figcaption>
        </figure>
    );
}

function SpectrumSection({ lang }: { lang: Locale }) {
    const t = signalsText[lang];
    const s = t.spectrum;
    const [alpha, setAlpha] = useState(10);
    const [beta, setBeta] = useState(4);
    const [mains, setMains] = useState<50 | 60>(60);
    const [mainsAmplitude, setMainsAmplitude] = useState(8);
    const [noise, setNoise] = useState(3);
    const [extra, setExtra] = useState(false);
    const [windowSeconds, setWindowSeconds] = useState(1);
    const number = new Intl.NumberFormat(lang, { maximumFractionDigits: 2 });

    const signal = useMemo(() => spectrumNoise.map((value, i) => {
        const time = i / spectrumRate;
        return alpha * Math.sin(tau * 10 * time)
            + (extra ? 8 * Math.sin(tau * 11 * time + 1) : 0)
            + beta * Math.sin(tau * 20 * time + 0.5)
            + mainsAmplitude * Math.sin(tau * mains * time + 2)
            + noise * value;
    }), [alpha, beta, mains, mainsAmplitude, noise, extra]);
    const estimate = useMemo(() => welch(signal, spectrumRate, windowSeconds * spectrumRate), [signal, windowSeconds]);
    const preview = useMemo(() => signal.slice(0, 2 * spectrumRate), [signal]);

    return (
        <Section heading={s.heading} badge={<Badge>{t.simulated}</Badge>} lead={s.lead} tasks={s.tasks} method={<p>{s.method}</p>} methodHeading={t.methodHeading} question={1} lang={lang}>
            <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Slider label={s.alpha} value={alpha} min={0} max={20} step={1} unit="µV" onChange={setAlpha} />
                <Slider label={s.beta} value={beta} min={0} max={10} step={1} unit="µV" onChange={setBeta} />
                <Slider label={`${s.line} (${mains} Hz)`} value={mainsAmplitude} min={0} max={20} step={1} unit="µV" onChange={setMainsAmplitude} />
                <Slider label={s.noise} value={noise} min={0} max={10} step={1} unit="µV" onChange={setNoise} />
                <label className="grid gap-1 text-sm font-semibold">
                    {s.lineFrequency}
                    <select value={mains} onChange={(event) => setMains(Number(event.target.value) === 50 ? 50 : 60)} className={select}>
                        <option value={60}>60 Hz</option>
                        <option value={50}>50 Hz</option>
                    </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                    {s.window}
                    <select value={windowSeconds} onChange={(event) => setWindowSeconds(Number(event.target.value))} className={select}>
                        {spectrumWindows.map((value) => <option key={value} value={value}>{number.format(value)} s</option>)}
                    </select>
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-sm font-medium sm:col-span-2 lg:col-span-3">
                    <input type="checkbox" checked={extra} onChange={(event) => setExtra(event.target.checked)} className="mt-1 accent-neuro-accent" />
                    {s.extra}
                </label>
            </div>
            <div className="grid gap-5">
                <figure>
                    <figcaption className="mb-2 text-sm font-semibold">{s.trace}</figcaption>
                    <TracePlot traces={[{ samples: preview, color: '#a5b4fc' }]} limit={50} ticks={[0, 0.5, 1, 1.5, 2]} timeLabel={t.time} voltageLabel={t.voltage} />
                </figure>
                <SpectrumPlot frequencies={estimate.frequencies} power={estimate.power} maxFrequency={spectrumMax} ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]} label={t.frequency} powerLabel={t.power} />
                <Readout items={[
                    { label: s.window, value: `${number.format(windowSeconds)} s` },
                    { label: s.resolution, value: `${number.format(1 / windowSeconds)} Hz` },
                    { label: s.segments, value: String(estimate.segments) },
                ]} />
            </div>
        </Section>
    );
}

// 3. Time and frequency

const tfSimRate = 256;
const tfSimSeconds = 12;
const tfSimulation = gaussian(tfSimRate * tfSimSeconds, 23).map((value, i) => {
    const time = i / tfSimRate;
    const closed = 1 / (1 + Math.exp(-(time - 4) / 0.15)) - 1 / (1 + Math.exp(-(time - 8) / 0.15));
    const burst = Math.exp(-0.5 * ((time - 2) / 0.06) ** 2);
    return (3 + 17 * closed) * Math.sin(tau * 10 * time) + 12 * burst * Math.sin(tau * 25 * time) + 3 * value;
});

function centered(samples: readonly number[]) {
    const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length;
    return samples.map((value) => value - mean);
}

const tfRecording = [...centered(recording.open.occipital), ...centered(recording.closed.occipital)];
const tfWindows = [0.25, 0.5, 1, 2];
const tfMax = 40;
const tfMin = 3;

function colormap(level: number) {
    // Dark blue to cyan to near white.
    const stops = [[11, 15, 25], [30, 58, 138], [8, 145, 178], [103, 232, 249], [240, 253, 255]];
    const position = Math.min(Math.max(level, 0), 1) * (stops.length - 1);
    const index = Math.min(Math.floor(position), stops.length - 2);
    const fraction = position - index;
    return stops[index].map((value, channel) => Math.round(value + (stops[index + 1][channel] - value) * fraction));
}

function SpectrogramPlot({ signal, rate, windowSeconds, timeTicks, label, timeLabel }: {
    signal: readonly number[]; rate: number; windowSeconds: number; timeTicks: readonly number[]; label: string; timeLabel: string;
}) {
    const duration = signal.length / rate;
    const result = useMemo(() => spectrogram(signal, rate, Math.round(windowSeconds * rate), Math.round(rate / 16)), [signal, rate, windowSeconds]);
    const draw = useMemo<Draw>(() => (ctx, width, height) => {
        const { frames, frequencyStep } = result;
        const decibels = frames.map(({ power }) => power.map((value) => 10 * Math.log10(Math.max(value, 1e-12))));
        let top = -Infinity;
        decibels.forEach((column) => column.forEach((value, k) => {
            const f = k * frequencyStep;
            if (f >= tfMin && f <= tfMax) top = Math.max(top, value);
        }));
        const hop = 1 / 16;
        frames.forEach(({ time }, column) => {
            const x0 = width * (time - hop / 2) / duration;
            const x1 = width * (time + hop / 2) / duration;
            decibels[column].forEach((value, k) => {
                const f = k * frequencyStep;
                if (f > tfMax + frequencyStep / 2) return;
                const y0 = height * (1 - Math.min(f + frequencyStep / 2, tfMax) / tfMax);
                const y1 = height * (1 - Math.max(f - frequencyStep / 2, 0) / tfMax);
                const [r, g, b] = colormap((value - top + 30) / 30);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(Math.floor(x0), Math.floor(y0), Math.ceil(x1 - x0) + 1, Math.ceil(y1 - y0) + 1);
            });
        });
    }, [result, duration]);

    return (
        <figure aria-hidden="true">
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2">
                <div className="flex flex-col justify-between text-right text-xs tabular-nums text-muted-foreground">
                    <span>{tfMax}</span><span>{tfMax * 3 / 4}</span><span>{tfMax / 2}</span><span>{tfMax / 4}</span><span>0</span>
                </div>
                <Canvas draw={draw} className="h-48 sm:h-56" />
                <span />
                <Axis ticks={timeTicks} label={timeLabel} />
            </div>
            <figcaption className="ml-12 text-xs text-muted-foreground">{label}</figcaption>
        </figure>
    );
}

function TimeFrequencySection({ lang }: { lang: Locale }) {
    const t = signalsText[lang];
    const s = t.timeFrequency;
    const [source, setSource] = useState<'simulation' | 'recording'>('simulation');
    const [windowSeconds, setWindowSeconds] = useState(0.5);
    const isRecording = source === 'recording';
    const signal = isRecording ? tfRecording : tfSimulation;
    const rate = isRecording ? recording.sampleRate : tfSimRate;
    const ticks = isRecording ? [0, 2, 4, 6, 8] : [0, 3, 6, 9, 12];
    const number = new Intl.NumberFormat(lang, { maximumFractionDigits: 2 });

    return (
        <Section
            heading={s.heading}
            badge={<Badge>{isRecording ? t.recorded : t.simulated}</Badge>}
            lead={s.lead}
            tasks={s.tasks}
            methodHeading={t.methodHeading}
            question={2}
            lang={lang}
            method={isRecording ? (
                <>
                    <p>{s.recordingNote}</p>
                    <p>{s.credits}</p>
                    <p>
                        <a href={recording.dataset} className="text-neuro-accent underline">{s.dataset}</a>
                        {' · '}
                        <a href={recording.license} className="text-neuro-accent underline">{s.license}</a>
                    </p>
                </>
            ) : <p>{s.simulationNote}</p>}
        >
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <fieldset>
                    <legend className="mb-2 text-sm font-semibold">{s.source}</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {(['simulation', 'recording'] as const).map((value) => (
                            <label key={value} className={option}>
                                <input type="radio" name="signals-tf-source" checked={source === value} onChange={() => setSource(value)} className="mr-2 accent-neuro-accent" />
                                {value === 'recording' ? t.recorded : t.simulated}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <label className="grid content-start gap-2 text-sm font-semibold">
                    {s.window}
                    <select value={windowSeconds} onChange={(event) => setWindowSeconds(Number(event.target.value))} className={select}>
                        {tfWindows.map((value) => <option key={value} value={value}>{number.format(value)} s</option>)}
                    </select>
                </label>
            </div>
            <div className="grid gap-5">
                <TracePlot traces={[{ samples: signal, color: '#a5b4fc' }]} limit={isRecording ? 200 : 50} ticks={ticks} timeLabel={t.time} voltageLabel={t.voltage} />
                <div>
                    <SpectrogramPlot signal={signal} rate={rate} windowSeconds={windowSeconds} timeTicks={ticks} label={t.frequency} timeLabel={t.time} />
                    <p className="mt-2 text-xs text-muted-foreground">{s.colorScale}</p>
                </div>
                <Readout items={[
                    { label: s.timeSpan, value: `${number.format(windowSeconds)} s` },
                    { label: s.frequencyStep, value: `${number.format(1 / windowSeconds)} Hz` },
                    { label: s.columnStep, value: `${new Intl.NumberFormat(lang, { maximumFractionDigits: 4 }).format(1 / 16)} s` },
                ]} />
            </div>
        </Section>
    );
}

// 4. Referencing

const refRate = 250;
const refSeconds = 2;
const electrodes = ['Fz', 'Cz', 'Pz', 'Oz', 'T7', 'T8', 'M1', 'M2'] as const;
// Weight of each source at each electrode: alpha, blink, left temporal muscle.
const weights: Record<(typeof electrodes)[number], [number, number, number]> = {
    Fz: [0.15, 1, 0.05],
    Cz: [0.35, 0.4, 0.1],
    Pz: [0.75, 0.15, 0.05],
    Oz: [1, 0.05, 0.05],
    T7: [0.3, 0.15, 1],
    T8: [0.3, 0.15, 0.05],
    M1: [0.3, 0.1, 0.7],
    M2: [0.3, 0.1, 0.05],
};
const muscle = gaussian(refRate * refSeconds, 37);
const ideal = electrodes.map((name) => {
    const [a, b, m] = weights[name];
    return Array.from({ length: refRate * refSeconds }, (_, i) => {
        const time = i / refRate;
        const blink = 80 * Math.exp(-0.5 * ((time - 1.2) / 0.09) ** 2);
        return a * 20 * Math.sin(tau * 10 * time) + b * blink + m * 12 * muscle[i] + 10 * Math.sin(tau * 60 * time);
    });
});
const references = ['ideal', 'cz', 'm1', 'linked', 'average'] as const;
type Reference = (typeof references)[number];

function rereference(reference: Reference) {
    if (reference === 'ideal') return ideal;
    const at = (name: (typeof electrodes)[number]) => ideal[electrodes.indexOf(name)];
    const signal = ideal[0].map((_, i) => {
        if (reference === 'cz') return at('Cz')[i];
        if (reference === 'm1') return at('M1')[i];
        if (reference === 'linked') return (at('M1')[i] + at('M2')[i]) / 2;
        return ideal.reduce((sum, channel) => sum + channel[i], 0) / ideal.length;
    });
    return ideal.map((channel) => channel.map((value, i) => value - signal[i]));
}

function StackedTraces({ channels, limit }: { channels: readonly number[][]; limit: number }) {
    const draw = useMemo<Draw>(() => (ctx, width, height) => {
        verticalGrid(ctx, width, height, 4);
        const row = height / channels.length;
        channels.forEach((samples, index) => {
            const middle = row * (index + 0.5);
            ctx.strokeStyle = grid;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, middle);
            ctx.lineTo(width, middle);
            ctx.stroke();
            ctx.strokeStyle = index % 2 ? '#a5b4fc' : '#67e8f9';
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            samples.forEach((value, i) => {
                const x = width * i / samples.length;
                const y = middle - row / 2 * value / limit;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        });
    }, [channels, limit]);
    return <Canvas draw={draw} className="h-[28rem]" />;
}

function ReferenceSection({ lang }: { lang: Locale }) {
    const t = signalsText[lang];
    const s = t.reference;
    const [reference, setReference] = useState<Reference>('ideal');
    const channels = useMemo(() => rereference(reference), [reference]);
    const rms = channels.map((channel) => Math.sqrt(channel.reduce((sum, value) => sum + value ** 2, 0) / channel.length));

    return (
        <Section
            heading={s.heading}
            badge={<Badge>{t.simulated}</Badge>}
            lead={s.lead}
            tasks={s.tasks}
            methodHeading={t.methodHeading}
            question={3}
            lang={lang}
            method={<><p>{s.method}</p><p><a href={MNE_REFERENCE_TUTORIAL} className="text-neuro-accent underline">{s.tutorial}</a></p></>}
        >
            <div className="grid items-start gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
                <fieldset>
                    <legend className="mb-2 text-sm font-semibold">{s.choose}</legend>
                    <div className="grid gap-2">
                        {references.map((value) => (
                            <label key={value} className={option}>
                                <input type="radio" name="signals-reference" checked={reference === value} onChange={() => setReference(value)} className="mr-2 accent-neuro-accent" />
                                {s[value]}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <figure>
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_3.5rem] gap-x-2">
                        <div className="grid text-right text-xs font-semibold" style={{ gridTemplateRows: `repeat(${electrodes.length}, minmax(0, 1fr))` }}>
                            {electrodes.map((name) => <span key={name} className="self-center">{name}</span>)}
                        </div>
                        <div aria-hidden="true"><StackedTraces channels={channels} limit={80} /></div>
                        <div className="grid text-xs tabular-nums text-muted-foreground" style={{ gridTemplateRows: `repeat(${electrodes.length}, minmax(0, 1fr))` }} aria-live="polite">
                            {electrodes.map((name, index) => <span key={name} className="self-center">{Math.round(rms[index])} µV</span>)}
                        </div>
                        <span />
                        <div aria-hidden="true"><Axis ticks={[0, 0.5, 1, 1.5, 2]} label={t.time} /></div>
                    </div>
                    <figcaption className="mt-1 text-xs text-muted-foreground">{s.scale}</figcaption>
                </figure>
            </div>
        </Section>
    );
}

export default function SignalsLab({ lang }: { lang: Locale }) {
    return (
        <div className="grid gap-10">
            <SamplingSection lang={lang} />
            <SpectrumSection lang={lang} />
            <TimeFrequencySection lang={lang} />
            <ReferenceSection lang={lang} />
        </div>
    );
}
