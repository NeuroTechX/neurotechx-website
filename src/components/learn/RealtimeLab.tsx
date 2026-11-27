'use client';

import { useEffect, useRef, useState } from 'react';
import { realtimeText } from '@/content/learn/realtime';
import type { Locale } from '@/i18n/routes';
import TracePlot from './TracePlot';
import { alphaShare, createSimulatedChannel, SAMPLE_RATE } from './realtime-signal';

const WINDOWS = [0.5, 1, 2, 4];
const UPDATES = [1000, 500, 250, 100];
const TRACE_SECONDS = 4;
const HISTORY_SECONDS = 20;
const SPREAD_SECONDS = 5;
const TICK_MS = 40;
const traceTicks = [-4, -3, -2, -1, 0];

type Point = { time: number; share: number };
type Snapshot = {
    trace: number[];
    share: number | null;
    history: Point[];
    response: number | null;
    measuring: boolean;
    spread: number | null;
    now: number;
};

const emptySnapshot: Snapshot = { trace: [], share: null, history: [], response: null, measuring: false, spread: null, now: 0 };

function HistoryPlot({ history, threshold, now, half }: { history: Point[]; threshold: number; now: number; half: string }) {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const element = canvas.current;
        const ctx = element?.getContext('2d');
        if (!element || !ctx) return;
        const { width, height } = element.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        const scale = window.devicePixelRatio || 1;
        element.width = Math.round(width * scale);
        element.height = Math.round(height * scale);
        ctx.scale(scale, scale);
        const x = (time: number) => width * (1 - (now - time) / HISTORY_SECONDS);
        const y = (share: number) => height * (1 - share);

        ctx.strokeStyle = '#313747';
        ctx.lineWidth = 1;
        [0.25, 0.5, 0.75].forEach((level) => {
            ctx.beginPath();
            ctx.moveTo(0, y(level));
            ctx.lineTo(width, y(level));
            ctx.stroke();
        });
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(0, y(threshold));
        ctx.lineTo(width, y(threshold));
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = '#a5b4fc';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        history.forEach(({ time, share }, i) => {
            if (i === 0) ctx.moveTo(x(time), y(share));
            else ctx.lineTo(x(time), y(share));
        });
        ctx.stroke();
        history.forEach(({ time, share }) => {
            ctx.fillStyle = share >= threshold ? '#67e8f9' : '#64748b';
            ctx.beginPath();
            ctx.arc(x(time), y(share), 2.2, 0, 2 * Math.PI);
            ctx.fill();
        });
    }, [history, threshold, now]);

    return (
        <div aria-hidden="true" className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-2">
            <div className="flex flex-col justify-between text-right text-xs tabular-nums text-muted-foreground">
                <span>1</span><span>{half}</span><span>0</span>
            </div>
            <canvas ref={canvas} className="block h-28 w-full rounded-sm bg-[var(--background)]" />
            <span />
            <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
                <span>−{HISTORY_SECONDS} s</span><span>0</span>
            </div>
        </div>
    );
}

const option = 'cursor-pointer rounded-lg border border-[var(--border-strong)] px-3 py-2 text-sm font-medium has-[:checked]:border-neuro-accent has-[:checked]:bg-neuro-accent/10';
const select = 'rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2 text-sm font-normal';

export default function RealtimeLab({ lang }: { lang: Locale }) {
    const t = realtimeText[lang].lab;
    const [running, setRunning] = useState(false);
    const [eyesClosed, setEyesClosed] = useState(false);
    const [windowSeconds, setWindowSeconds] = useState(2);
    const [updateMs, setUpdateMs] = useState(250);
    const [threshold, setThreshold] = useState(0.6);
    const [tone, setTone] = useState(false);
    const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot);

    // Live settings read by the stream loop without restarting it.
    const settings = useRef({ eyesClosed, windowSeconds, updateMs, threshold, tone });
    useEffect(() => {
        settings.current = { eyesClosed, windowSeconds, updateMs, threshold, tone };
    }, [eyesClosed, windowSeconds, updateMs, threshold, tone]);

    const stream = useRef({
        channel: createSimulatedChannel(20261126),
        buffer: [] as number[],
        streamTime: 0, // seconds of signal generated so far
        lastWall: 0,
        nextUpdate: 0,
        history: [] as Point[],
        changedAt: null as number | null, // stream time of the last state change
        lastClosed: false,
        response: null as number | null,
    });

    const audio = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
    useEffect(() => () => { void audio.current?.context.close(); }, []);

    function ensureAudio() {
        if (audio.current) return;
        const AudioCtor = window.AudioContext;
        if (!AudioCtor) return;
        const context = new AudioCtor();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 440;
        gain.gain.value = 0;
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        audio.current = { context, gain };
    }

    useEffect(() => {
        if (!running) {
            if (audio.current) audio.current.gain.gain.value = 0;
            return;
        }
        const s = stream.current;
        s.lastWall = performance.now();
        const tick = () => {
            const wall = performance.now();
            const elapsed = Math.min(0.5, (wall - s.lastWall) / 1000); // a background tab should not flood the buffer
            s.lastWall = wall;
            const { eyesClosed: closed, windowSeconds: w, updateMs: u, threshold: th, tone: playTone } = settings.current;

            if (closed !== s.lastClosed) {
                s.lastClosed = closed;
                s.changedAt = s.streamTime;
                s.response = null;
            }
            const due = Math.round((s.streamTime + elapsed) * SAMPLE_RATE) - Math.round(s.streamTime * SAMPLE_RATE);
            for (let i = 0; i < due; i++) s.buffer.push(s.channel.next(closed));
            s.streamTime += elapsed;
            const keep = Math.max(TRACE_SECONDS, ...WINDOWS) * SAMPLE_RATE;
            if (s.buffer.length > keep) s.buffer.splice(0, s.buffer.length - keep);

            const windowSamples = Math.round(w * SAMPLE_RATE);
            if (s.streamTime >= s.nextUpdate && s.buffer.length >= windowSamples) {
                s.nextUpdate = Math.max(s.nextUpdate + u / 1000, s.streamTime);
                const share = alphaShare(s.buffer.slice(-windowSamples));
                s.history.push({ time: s.streamTime, share });
                while (s.history.length && s.history[0].time < s.streamTime - HISTORY_SECONDS) s.history.shift();
                if (s.changedAt !== null && s.response === null && (share >= th) === closed) {
                    s.response = s.streamTime - s.changedAt;
                }
                if (audio.current) audio.current.gain.gain.value = playTone && share >= th ? 0.04 : 0;
            }

            // Skip the transition after a state change: until a full window has passed, the
            // window still mixes samples from both states.
            const since = Math.max(s.streamTime - SPREAD_SECONDS, (s.changedAt ?? -Infinity) + w);
            const recent = s.history.filter((point) => point.time >= since).map((point) => point.share);
            let spread: number | null = null;
            if (recent.length >= 4) {
                const mean = recent.reduce((sum, value) => sum + value, 0) / recent.length;
                spread = Math.sqrt(recent.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (recent.length - 1));
            }
            const latest = s.history.at(-1);
            setSnapshot({
                trace: s.buffer.slice(-TRACE_SECONDS * SAMPLE_RATE),
                share: latest && s.buffer.length >= windowSamples ? latest.share : null,
                history: [...s.history],
                response: s.response,
                measuring: s.changedAt !== null && s.response === null,
                spread,
                now: s.streamTime,
            });
        };
        const id = window.setInterval(tick, TICK_MS);
        return () => window.clearInterval(id);
    }, [running]);

    const number = (digits: number) => new Intl.NumberFormat(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const percent = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 });
    const seconds = (value: number) => `${number(2).format(value)} s`;
    const padded = Array.from({ length: TRACE_SECONDS * SAMPLE_RATE - snapshot.trace.length }, () => 0).concat(snapshot.trace);
    const { share } = snapshot;
    const above = share !== null && share >= threshold;
    const expectedDelay = windowSeconds / 2 + updateMs / 2000;

    return (
        <section className="card" aria-labelledby="realtime-activity">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 id="realtime-activity" className="text-2xl font-bold">{t.activity}</h2>
                <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">{t.simulatedBadge}</span>
            </div>
            <p className="mb-6 max-w-prose text-sm text-muted-foreground">{t.simulatedNote}</p>
            <div className="grid items-start gap-8 md:grid-cols-[14rem_minmax(0,1fr)]">
                <div className="grid gap-5">
                    <button
                        type="button"
                        onClick={() => setRunning((value) => !value)}
                        className="rounded-full bg-neuro-accent px-5 py-2 text-sm font-bold text-background hover:brightness-110"
                        aria-pressed={running}
                    >
                        {running ? t.pause : t.start}
                    </button>
                    <fieldset>
                        <legend className="mb-2 text-sm font-semibold">{t.eyes}</legend>
                        <div className="grid gap-2">
                            {([false, true] as const).map((value) => (
                                <label key={String(value)} className={option}>
                                    <input type="radio" name="realtime-eyes" checked={eyesClosed === value} onChange={() => setEyesClosed(value)} className="mr-2 accent-neuro-accent" />
                                    {value ? t.closed : t.open}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.window}
                        <select value={windowSeconds} onChange={(event) => setWindowSeconds(Number(event.target.value))} className={select}>
                            {WINDOWS.map((value) => <option key={value} value={value}>{`${number(value % 1 ? 1 : 0).format(value)} s`}</option>)}
                        </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.update}
                        <select value={updateMs} onChange={(event) => setUpdateMs(Number(event.target.value))} className={select}>
                            {UPDATES.map((value) => <option key={value} value={value}>{t.everyMs.replace('{ms}', String(value))}</option>)}
                        </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        <span className="flex justify-between">{t.threshold}<span className="tabular-nums text-neuro-accent">{percent.format(threshold)}</span></span>
                        <input type="range" min={0.3} max={0.9} step={0.05} value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} className="accent-neuro-accent" />
                    </label>
                    <label className="flex cursor-pointer items-start gap-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            checked={tone}
                            onChange={(event) => {
                                if (event.target.checked) ensureAudio();
                                void audio.current?.context.resume();
                                setTone(event.target.checked);
                            }}
                            className="mt-1 accent-neuro-accent"
                        />
                        {t.tone}
                    </label>
                </div>

                <div className="grid gap-5">
                    <figure>
                        <figcaption className="mb-2 text-sm font-semibold">{t.trace}</figcaption>
                        <TracePlot traces={[{ samples: padded, color: '#67e8f9' }]} limit={60} ticks={traceTicks} timeLabel={t.time} voltageLabel={t.voltage} />
                        <div className="ml-12 mt-2 flex h-2 justify-end rounded-sm bg-[var(--surface-1)]" aria-hidden="true">
                            <div className="h-full rounded-sm bg-neuro-accent/60" style={{ width: `${100 * windowSeconds / TRACE_SECONDS}%` }} />
                        </div>
                        <p className="ml-12 mt-1 text-right text-xs text-muted-foreground">{t.windowLabel} {number(windowSeconds % 1 ? 1 : 0).format(windowSeconds)} s</p>
                    </figure>

                    <div className="rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4">
                        <p className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm font-semibold">
                            <span>{t.feedback}</span>
                            <span className={above ? 'text-neuro-accent' : 'text-muted-foreground'}>
                                {share === null ? t.waiting : above ? t.above : t.below}
                            </span>
                        </p>
                        <div className="relative h-6 overflow-hidden rounded bg-[var(--background)]" role="meter" aria-label={t.share} aria-valuemin={0} aria-valuemax={1} aria-valuenow={share ?? 0}>
                            <div className={`h-full transition-[width] duration-100 ${above ? 'bg-neuro-accent' : 'bg-slate-500'}`} style={{ width: `${100 * (share ?? 0)}%` }} />
                            <div className="absolute inset-y-0 w-0.5 bg-slate-200" style={{ left: `${100 * threshold}%` }} />
                        </div>
                        <p className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <span>{t.share}</span><span className="tabular-nums">{share === null ? '–' : percent.format(share)}</span>
                        </p>
                    </div>

                    <figure>
                        <figcaption className="mb-2 text-sm font-semibold">{t.history}</figcaption>
                        <HistoryPlot history={snapshot.history} threshold={threshold} now={snapshot.now} half={number(1).format(0.5)} />
                    </figure>

                    <dl className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <dt className="text-xs font-semibold">{t.delay}</dt>
                            <dd className="text-xl font-semibold tabular-nums">≈ {seconds(expectedDelay)}</dd>
                            <dd className="text-xs text-muted-foreground">{t.delayHelp}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold">{t.response}</dt>
                            <dd className="text-xl font-semibold tabular-nums" aria-live="polite">
                                {snapshot.response !== null ? seconds(snapshot.response) : snapshot.measuring ? t.responseWaiting : '–'}
                            </dd>
                            <dd className="text-xs text-muted-foreground">{snapshot.response === null && !snapshot.measuring ? t.responseNone : t.responseHelp}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold">{t.spread}</dt>
                            <dd className="text-xl font-semibold tabular-nums">{snapshot.spread === null ? '–' : number(2).format(snapshot.spread)}</dd>
                            <dd className="text-xs text-muted-foreground">{t.spreadHelp}</dd>
                        </div>
                    </dl>

                    <details className="text-sm text-muted-foreground">
                        <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                        <p className="mt-2 max-w-prose">{t.method}</p>
                    </details>
                </div>
            </div>
        </section>
    );
}
