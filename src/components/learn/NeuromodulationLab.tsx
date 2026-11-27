'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Locale } from '@/i18n/routes';
import { neuromodulationText } from '@/content/learn/neuromodulation';
import raw from '@/content/learn/neuromodulation-data.json';
import HeadCoverage, { type CoveragePoint } from './HeadCoverage';

type Metrics = {
    peak: number;
    unit: string;
    atTarget: number;
    targetValue: number;
    focalityCm3: number;
    depthMm: number;
    offsetMm: number;
};
type Data = {
    targets: Record<string, number[]>;
    slice: { width: number; height: number; pixelMm: number; x0: number; z0: number; labelsRle: Record<string, number[]> };
    coverage: Record<string, { label: string; xy: number[] }[]>;
    cases: Record<string, { metrics: Metrics; map: string }>;
};

const data = raw as unknown as Data;
const modalities = ['tms', 'tdcs', 'ti', 'fusDome', 'fusSingle'] as const;
const targets = ['superficial', 'deep'] as const;
type Modality = (typeof modalities)[number];
type Target = (typeof targets)[number];

const { width, height, pixelMm, x0, z0 } = data.slice;

function decodeLabels(rle: number[]) {
    const out = new Uint8Array(width * height);
    let at = 0;
    for (let i = 0; i < rle.length; i += 2) {
        out.fill(rle[i], at, at + rle[i + 1]);
        at += rle[i + 1];
    }
    return out;
}

const labels: Record<Target, Uint8Array> = {
    superficial: decodeLabels(data.slice.labelsRle.superficial),
    deep: decodeLabels(data.slice.labelsRle.deep),
};

// Perceptually ordered stops from dark to bright for 0 to 1 of the brain peak.
const stops: [number, [number, number, number]][] = [
    [0, [12, 7, 54]], [0.25, [86, 21, 110]], [0.5, [168, 50, 104]], [0.75, [239, 107, 52]], [1, [252, 236, 140]],
];

function colour(v: number): [number, number, number] {
    for (let i = 1; i < stops.length; i++) {
        const [t1, c1] = stops[i];
        const [t0, c0] = stops[i - 1];
        if (v <= t1) {
            const f = (v - t0) / (t1 - t0);
            return [0, 1, 2].map((k) => Math.round(c0[k] + f * (c1[k] - c0[k]))) as [number, number, number];
        }
    }
    return stops[stops.length - 1][1];
}

function draw(canvas: HTMLCanvasElement, encoded: string, tissue: Uint8Array) {
    const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0));
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = context.createImageData(width, height);
    let next = 0;
    for (let p = 0; p < tissue.length; p++) {
        if (tissue[p] === 0) continue;
        let rgb = colour(bytes[next++] / 255);
        if (tissue[p] === 2) rgb = rgb.map((c) => Math.round(c + 0.55 * (205 - c))) as [number, number, number];
        image.data.set([...rgb, 255], 4 * p);
    }
    context.putImageData(image, 0, 0);
}

function fill(template: string, values: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key]));
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
    return (
        <label className="grid min-w-0 gap-2 text-sm font-semibold">
            {label}
            <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full min-w-0 max-w-full rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                {children}
            </select>
        </label>
    );
}

export default function NeuromodulationLab({ lang }: { lang: Locale }) {
    const t = neuromodulationText[lang];
    const [modality, setModality] = useState<Modality>('tms');
    const [target, setTarget] = useState<Target>('superficial');
    const [corrected, setCorrected] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const caseKind = modality === 'fusDome' && corrected ? 'fusDomeCorrected' : modality;
    const current = data.cases[`${caseKind}:${target}`];
    const { metrics } = current;

    useEffect(() => {
        if (canvasRef.current) draw(canvasRef.current, current.map, labels[target]);
    }, [current, target]);

    const coverageKey = modality === 'tms' || modality === 'fusDome' || modality === 'fusSingle' ? `${modality}:${target}` : modality;
    const points: CoveragePoint[] = useMemo(
        () => (data.coverage[coverageKey] ?? []).map(({ label, xy }) => ({ x: xy[0], y: xy[1], label })),
        [coverageKey],
    );
    // Shrink the helmet (larger than the head) so that it fits inside the drawing.
    const shown = useMemo(() => {
        const r = Math.max(...points.map(({ x, y }) => Math.hypot(x, y)), 0);
        const scale = modality === 'fusDome' && r > 1.12 ? 1.12 / r : 1;
        return points.map((p) => ({ ...p, x: p.x * scale, y: p.y * scale }));
    }, [points, modality]);

    const number = (value: number, digits = 1) => new Intl.NumberFormat(lang, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
    const unit = metrics.unit.includes('A/µs') ? t.perAmpere : t.perMilliampere;
    const [tx, , tz] = data.targets[target];
    const cx = ((tx - x0) / pixelMm / width) * 100;
    const cy = ((z0 - tz) / pixelMm / height) * 100;
    const facts = t.facts[modality];

    return (
        <div className="grid gap-6">
            <section className="card" aria-labelledby="neuromod-activity">
                <h2 id="neuromod-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <div className="grid min-w-0 gap-4">
                        <Select label={t.modality} value={modality} onChange={(value) => setModality(value as Modality)}>
                            {modalities.map((value) => <option key={value} value={value}>{t.modalities[value]}</option>)}
                        </Select>
                        <Select label={t.target} value={target} onChange={(value) => setTarget(value as Target)}>
                            {targets.map((value) => <option key={value} value={value}>{t.targets[value]}</option>)}
                        </Select>
                        {modality === 'fusDome' && (
                            <label className="flex items-start gap-2 text-sm font-semibold">
                                <input type="checkbox" className="mt-1" checked={corrected} onChange={(event) => setCorrected(event.target.checked)} />
                                {t.correction}
                            </label>
                        )}
                        {modality === 'tdcs' && <p className="text-xs text-muted-foreground">{t.tacsNote}</p>}
                    </div>
                    <figure className="min-w-0">
                        <figcaption className="mb-3 text-sm font-semibold">{t.mapTitle} · {t.modalities[modality]}</figcaption>
                        <div className="relative mx-auto w-full max-w-md" style={{ aspectRatio: `${width} / ${height}` }}>
                            <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 h-full w-full rounded-lg bg-[var(--background)]" role="img" aria-label={`${t.mapTitle}. ${t.modalities[modality]}. ${t.targets[target]}`} />
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                                <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} stroke="#ffffff" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
                                <line x1={cx} y1={cy - 2.5} x2={cx} y2={cy + 2.5} stroke="#ffffff" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
                            </svg>
                            <span className="absolute left-2 top-2 text-xs font-bold text-muted-foreground">{t.left}</span>
                            <span className="absolute right-2 top-2 text-xs font-bold text-muted-foreground">{t.right}</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{t.mapNote}</p>
                        <div className="mt-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                            <p className="mb-2 text-sm font-semibold">{t.metricsTitle}</p>
                            <dl className="grid gap-3 sm:grid-cols-2">
                                <div><dt className="text-xs text-muted-foreground">{t.metrics.peak}</dt><dd className="text-lg font-semibold tabular-nums">{metrics.unit === 'relative' ? t.relative : `${number(metrics.peak, 2)} ${unit}`}</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.metrics.atTarget}</dt><dd className="text-lg font-semibold tabular-nums">{number(metrics.atTarget, 2)}</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.metrics.focality}</dt><dd className="text-lg font-semibold tabular-nums">{number(metrics.focalityCm3)} cm³</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.metrics.depth}</dt><dd className="text-lg font-semibold tabular-nums">{number(metrics.depthMm)} mm</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.metrics.offset}</dt><dd className="text-lg font-semibold tabular-nums">{number(metrics.offsetMm)} mm</dd></div>
                            </dl>
                        </div>
                    </figure>
                </div>
            </section>

            <section className="card" aria-labelledby="neuromod-coverage">
                <h2 id="neuromod-coverage" className="mb-5 text-2xl font-bold">{t.coverageHeading}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <figure className="min-w-0">
                        <HeadCoverage points={shown} highlight={shown.length <= 8 ? shown.map(({ label }) => label ?? '') : []} kind="transducer" label={`${t.modalities[modality]}. ${t.coverageNote}`} />
                        <figcaption className="mt-2 text-center text-sm font-semibold">{fill(t.coverageCount, { count: shown.length })}</figcaption>
                        <p className="mt-1 text-center text-xs text-muted-foreground">{t.coverageNote}</p>
                    </figure>
                    <div className="min-w-0">
                        <h3 className="mb-3 text-lg font-semibold">{t.factsHeading} · {t.modalities[modality]}</h3>
                        <dl className="grid gap-3 text-sm">
                            {(['does', 'count', 'frequency', 'limits', 'coverage'] as const).map((key) => (
                                <div key={key} className="grid gap-1 border-b border-[var(--border-strong)] pb-3 last:border-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-4">
                                    <dt className="font-semibold">{t.factLabels[key]}</dt>
                                    <dd className="text-muted-foreground">{facts[key]}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
}
