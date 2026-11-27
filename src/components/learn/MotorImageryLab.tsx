'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/i18n/routes';
import excerpt from '@/content/learn/motor-imagery-data.json';
import { motorImageryText } from '@/content/learn/motor-imagery';
import TracePlot from './TracePlot';
import {
    binomialThreshold, crossValidate, cspFeatures, type FeatureKind, fitCsp, fromUpper, logPowerFeatures, makeRandom,
    shuffled, trainAndCount, type Trial,
} from './motor-imagery-math';

type Band = 'mu' | 'beta';
type Hand = 'left' | 'right';
type Mode = 'within' | 'cross';
type Curves = Record<Hand, Record<string, Record<Band, number[]>>>;

const CHANNELS = ['C3', 'Cz', 'C4'] as const;
const COLORS: Record<(typeof CHANNELS)[number], string> = { C3: '#67e8f9', Cz: '#94a3b8', C4: '#fcd34d' };
const C3 = excerpt.cspChannels.indexOf('C3');
const C4 = excerpt.cspChannels.indexOf('C4');
const POWER_CHANNELS = [C3, C4];
const ticks = [-1, 0, 1, 2, 3, 4];
// Bins starting at 0.5 s up to 2.5 s (the classifier's window).
const windowBins = Array.from({ length: 20 }, (_, i) => excerpt.erdStart + i * excerpt.erdBin)
    .map((start, i) => (start >= 0.5 && start < 2.5 ? i : -1)).filter((i) => i >= 0);

const subjects = excerpt.subjects.map((s) => ({
    id: s.id,
    erd: s.erd as Curves,
    trials: s.trials.map((t): Trial => ({ cov: fromUpper(t.c, excerpt.cspChannels.length), label: t.y === 1 ? 1 : 0 })),
}));

function averageCurves(): Curves {
    const out = {} as Curves;
    for (const hand of ['left', 'right'] as const) {
        out[hand] = {};
        for (const ch of CHANNELS) {
            out[hand][ch] = { mu: [], beta: [] };
            for (const band of ['mu', 'beta'] as const) {
                const rows = subjects.map((s) => s.erd[hand][ch][band]);
                out[hand][ch][band] = rows[0].map((_, i) => rows.reduce((sum, r) => sum + r[i], 0) / rows.length);
            }
        }
    }
    return out;
}
const average = averageCurves();

function relabel(trials: readonly Trial[], seed: number): Trial[] {
    const labels = shuffled(trials.map((t) => t.label), makeRandom(seed));
    return trials.map((t, i) => ({ cov: t.cov, label: labels[i] }));
}

/** Fraction correct for one participant; `seed` shuffles the labels the model learns from. */
function score(kind: FeatureKind, mode: Mode, index: number, seed?: number): number {
    const own = subjects[index].trials;
    if (mode === 'within') return crossValidate(kind, seed === undefined ? own : relabel(own, seed), POWER_CHANNELS);
    const others = subjects.filter((_, j) => j !== index).flatMap((s) => s.trials);
    return trainAndCount(kind, seed === undefined ? others : relabel(others, seed), own, POWER_CHANNELS) / own.length;
}

function fill(template: string, values: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key]));
}

function Scatter({ points, labels, xLabel, yLabel, left, right }: {
    points: number[][]; labels: number[]; xLabel: string; yLabel: string; left: string; right: string;
}) {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const sx = (x: number) => 16 + (x - x0) / (x1 - x0 || 1) * 268;
    const sy = (y: number) => 184 - (y - y0) / (y1 - y0 || 1) * 168;
    return (
        <figure className="min-w-0">
            <figcaption className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                <span className="text-cyan-300">● {left}</span>
                <span className="text-amber-300">■ {right}</span>
            </figcaption>
            <svg viewBox="0 0 300 200" className="w-full rounded-sm bg-[var(--background)]" aria-hidden="true">
                <line x1="16" y1="184" x2="284" y2="184" stroke="#313747" />
                <line x1="16" y1="16" x2="16" y2="184" stroke="#313747" />
                {points.map(([x, y], i) => (labels[i] === 0
                    ? <circle key={i} cx={sx(x)} cy={sy(y)} r="3.5" fill="#67e8f9" fillOpacity="0.8" />
                    : <rect key={i} x={sx(x) - 3} y={sy(y) - 3} width="6" height="6" fill="#fcd34d" fillOpacity="0.8" />))}
            </svg>
            <p className="mt-1 flex flex-wrap justify-between gap-x-4 text-xs text-muted-foreground"><span>↑ {yLabel}</span><span>{xLabel} →</span></p>
        </figure>
    );
}

export default function MotorImageryLab({ lang }: { lang: Locale }) {
    const t = motorImageryText[lang];
    const [erdSubject, setErdSubject] = useState(-1);
    const [band, setBand] = useState<Band>('mu');
    const [kind, setKind] = useState<FeatureKind>('logpower');
    const [mode, setMode] = useState<Mode>('within');
    const [subject, setSubject] = useState(6);
    const [control, setControl] = useState<{ key: string; mean: number; p95: number } | 'running' | null>(null);

    const percent = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 });
    const signed = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0, signDisplay: 'exceptZero' });
    const curves = erdSubject < 0 ? average : subjects[erdSubject].erd;
    const windowMean = (hand: Hand, ch: string) => windowBins.reduce((s, i) => s + curves[hand][ch][band][i], 0) / windowBins.length;
    const peak = Math.max(...(['left', 'right'] as const).flatMap((hand) => CHANNELS.flatMap((ch) => curves[hand][ch][band].map(Math.abs))));
    const limit = Math.max(40, Math.ceil(peak / 20) * 20);

    const scores = useMemo(() => subjects.map((_, i) => score(kind, mode, i)), [kind, mode]);
    const n = subjects[subject].trials.length;
    const threshold = binomialThreshold(n);
    const accuracy = scores[subject];
    const meanScore = scores.reduce((s, v) => s + v, 0) / scores.length;
    const controlKey = `${kind}-${mode}-${subject}`;

    const scatter = useMemo(() => {
        const trials = subjects[subject].trials;
        if (kind === 'logpower') return trials.map((tr) => logPowerFeatures(tr.cov, POWER_CHANNELS));
        const filters = fitCsp(trials);
        return trials.map((tr) => { const f = cspFeatures(filters, tr.cov); return [f[0], f[f.length - 1]]; });
    }, [kind, subject]);

    function runControl() {
        setControl('running');
        // Let the "computing" message paint before the synchronous work.
        window.setTimeout(() => {
            const shuffledScores = Array.from({ length: 100 }, (_, p) => score(kind, mode, subject, 1000 + p)).sort((a, b) => a - b);
            setControl({ key: controlKey, mean: shuffledScores.reduce((s, v) => s + v, 0) / 100, p95: shuffledScores[94] });
        }, 20);
    }

    const select = 'w-full min-w-0 max-w-full rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2';
    const hands = [['left', t.leftImagery], ['right', t.rightImagery]] as const;

    return (
        <div className="grid gap-8">
            <section className="card" aria-labelledby="mi-erd">
                <h2 id="mi-erd" className="mb-5 text-2xl font-bold">{t.erdTitle}</h2>
                <div className="mb-5 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="grid min-w-0 gap-2 text-sm font-semibold">
                        {t.subject}
                        <select value={erdSubject} onChange={(e) => setErdSubject(Number(e.target.value))} className={select}>
                            <option value={-1}>{t.average}</option>
                            {subjects.map((s, i) => <option key={s.id} value={i}>{s.id}</option>)}
                        </select>
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-semibold">
                        {t.band}
                        <select value={band} onChange={(e) => setBand(e.target.value as Band)} className={select}>
                            <option value="mu">{t.mu}</option>
                            <option value="beta">{t.beta}</option>
                        </select>
                    </label>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {hands.map(([hand, name]) => {
                        const c3 = windowMean(hand, 'C3');
                        const c4 = windowMean(hand, 'C4');
                        return (
                            <figure key={hand} className="min-w-0">
                                <figcaption className="mb-3">
                                    <span className="block font-semibold">{name}</span>
                                    <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                                        <span className="text-cyan-300">C3</span>
                                        <span className="text-amber-300">C4</span>
                                        <span className="text-slate-400">Cz <span aria-hidden="true">– –</span></span>
                                    </span>
                                </figcaption>
                                <TracePlot
                                    traces={CHANNELS.map((ch) => ({ samples: curves[hand][ch][band], color: COLORS[ch], dashed: ch === 'Cz' }))}
                                    limit={limit}
                                    ticks={ticks}
                                    timeLabel={t.time}
                                    voltageLabel={t.change}
                                    marker={0}
                                />
                                <div className="mt-3 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-3 text-sm" aria-live="polite">
                                    <p className="text-xs text-muted-foreground">{t.windowTitle}</p>
                                    <p className="flex flex-wrap gap-x-4 tabular-nums">
                                        {CHANNELS.map((ch) => <span key={ch}>{ch} <strong>{signed.format(windowMean(hand, ch) / 100)}</strong></span>)}
                                    </p>
                                    <p className="mt-1 text-xs">{t.stronger} <strong>{c3 < c4 ? 'C3' : 'C4'}</strong></p>
                                </div>
                            </figure>
                        );
                    })}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{t.erdNote}</p>
            </section>

            <section className="card" aria-labelledby="mi-clf">
                <h2 id="mi-clf" className="mb-3 text-2xl font-bold">{t.clfTitle}</h2>
                <p className="mb-5 max-w-prose text-sm text-muted-foreground">{t.clfIntro}</p>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <label className="grid min-w-0 gap-2 text-sm font-semibold">
                        {t.features}
                        <select value={kind} onChange={(e) => setKind(e.target.value as FeatureKind)} className={select}>
                            <option value="logpower">{t.logPower}</option>
                            <option value="csp">{t.csp}</option>
                        </select>
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-semibold">
                        {t.evaluation}
                        <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className={select}>
                            <option value="within">{t.within}</option>
                            <option value="cross">{t.cross}</option>
                        </select>
                    </label>
                    <label className="grid min-w-0 gap-2 text-sm font-semibold">
                        {t.subject}
                        <select value={subject} onChange={(e) => setSubject(Number(e.target.value))} className={select}>
                            {subjects.map((s, i) => <option key={s.id} value={i}>{s.id}</option>)}
                        </select>
                    </label>
                </div>
                <div className="grid items-start gap-6 md:grid-cols-2 [&>*]:min-w-0">
                    <div>
                        <div className="rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                            <p className="text-xs text-muted-foreground">{subjects[subject].id} · {t.accuracy}</p>
                            <p className="text-3xl font-bold tabular-nums text-neuro-accent">{percent.format(accuracy)}</p>
                            <p className="text-sm">{fill(t.correct, { correct: Math.round(accuracy * n), n })}</p>
                            <p className={`mt-2 text-sm font-semibold ${accuracy > threshold ? 'text-emerald-300' : 'text-muted-foreground'}`}>
                                {accuracy > threshold ? t.above : t.below}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">{fill(t.threshold, { n, threshold: percent.format(threshold) })}</p>
                        </div>
                        <button
                            type="button"
                            onClick={runControl}
                            disabled={control === 'running'}
                            className="mt-4 rounded-full border border-neuro-accent px-4 py-2 text-sm font-semibold text-neuro-accent hover:bg-neuro-accent/10 disabled:opacity-60"
                        >
                            {t.shuffle}
                        </button>
                        <p className="mt-2 min-h-10 text-sm text-muted-foreground" aria-live="polite">
                            {control === 'running' && t.shuffling}
                            {control && control !== 'running' && control.key === controlKey && fill(t.shuffleResult, {
                                mean: percent.format(control.mean), p95: percent.format(control.p95), real: percent.format(accuracy),
                            })}
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2 text-sm font-semibold">{t.scatterTitle} ({subjects[subject].id})</h3>
                        <Scatter
                            points={scatter}
                            labels={subjects[subject].trials.map((tr) => tr.label)}
                            xLabel={kind === 'logpower' ? 'log C3' : 'CSP 1'}
                            yLabel={kind === 'logpower' ? 'log C4' : 'CSP 6'}
                            left={t.leftImagery}
                            right={t.rightImagery}
                        />
                        <p className="mt-2 text-xs text-muted-foreground">{kind === 'logpower' ? t.scatterLogPower : t.scatterCsp}</p>
                    </div>
                </div>
                <h3 className="mb-3 mt-6 font-semibold">{t.allTitle}</h3>
                <ul className="grid gap-1.5 text-sm tabular-nums">
                    {scores.map((value, i) => (
                        <li key={subjects[i].id} className="grid grid-cols-[3.5rem_minmax(0,1fr)_3rem] items-center gap-3">
                            <span className={i === subject ? 'font-bold text-neuro-accent' : undefined}>{subjects[i].id}</span>
                            <span className="relative h-3 rounded-sm bg-[var(--background)]">
                                <span
                                    className={`absolute inset-y-0 left-0 rounded-sm ${value > threshold ? 'bg-emerald-400/80' : 'bg-slate-500/70'}`}
                                    style={{ width: `${value * 100}%` }}
                                />
                                <span className="absolute inset-y-[-3px] w-px bg-slate-300" style={{ left: '50%' }} aria-hidden="true" />
                                <span className="absolute inset-y-[-3px] w-0.5 bg-neuro-accent" style={{ left: `${threshold * 100}%` }} aria-hidden="true" />
                            </span>
                            <span className="text-right">{percent.format(value)}</span>
                        </li>
                    ))}
                    <li className="grid grid-cols-[3.5rem_minmax(0,1fr)_3rem] gap-3 border-t border-[var(--border)] pt-1.5 font-semibold">
                        <span>{t.mean}</span><span /><span className="text-right">{percent.format(meanScore)}</span>
                    </li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">{t.allLegend}</p>
                <details className="mt-5 text-sm text-muted-foreground">
                    <summary className="cursor-pointer font-medium">{t.how}</summary>
                    <p className="mt-2 max-w-prose">{t.method}</p>
                </details>
            </section>
        </div>
    );
}
