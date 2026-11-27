'use client';

import { useState, type ReactNode } from 'react';
import type { Locale } from '@/i18n/routes';
import { hdEegText } from '@/content/learn/hd-eeg';
import { primerChapterPdf } from '@/content/learn/primer-chapters';
import data from '@/content/learn/hd-eeg-data.json';
import HeadCoverage, { HeadOutline } from './HeadCoverage';
import TracePlot from './TracePlot';

type MapEntry = {
    potential: number[];
    laplacian: number[];
    heldOutError?: number;
    potentialDifference?: number;
    laplacianDifference?: number;
};
type Kind = 'potential' | 'laplacian';

const maps = data.maps as Record<string, MapEntry[]>;
const traces = data.traces as Record<string, { trials: number[][]; average: number[] }>;
const densities = data.densities;
const full = densities[0];
const channels = Object.keys(traces);
const { size, inside } = data.grid;
const cell = 2 / (size - 1);
const cells = inside.map((index) => ({ x: -1 + cell * (index % size), y: 1 - cell * Math.floor(index / size) }));
const kept = data.sensors.filter((sensor) => sensor.rank !== null) as { label: string; x: number; y: number; rank: number }[];
const points = data.sensors.map(({ label, x, y }) => ({ label, x, y }));
const msTicks = [-200, -100, 0, 100, 200, 300, 400, 500, 600];
const gfpLimit = Math.ceil(Math.max(...data.gfp));
const traceLimit = 10 * Math.ceil(Math.max(...Object.values(traces).flatMap((set) => set.trials.flat()).map(Math.abs)) / 10);
const averageLimit = 5 * Math.ceil(Math.max(...Object.values(traces).flatMap((set) => set.average).map(Math.abs)) / 5);

// One color scale per time and kind, fixed by the full map, so densities compare directly.
const limits = (['potential', 'laplacian'] as const).map((kind) =>
    maps[String(full)].map((entry) => Math.max(...entry[kind].map(Math.abs))));

function fill(template: string, values: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key]));
}

const negative = [96, 165, 250];
const middle = [30, 41, 59];
const positive = [248, 113, 113];

function color(value: number, limit: number) {
    const t = Math.max(-1, Math.min(1, value / limit));
    const end = t < 0 ? negative : positive;
    const mix = middle.map((channel, index) => Math.round(channel + (end[index] - channel) * Math.abs(t)));
    return `rgb(${mix.join(',')})`;
}

function ScalpMap({ values, limit, count, label }: { values: number[]; limit: number; count: number; label: string }) {
    return (
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="mx-auto block w-full max-w-80" role="img" aria-label={label}>
            <defs>
                <clipPath id="hd-eeg-head"><circle cx={0} cy={0} r={1} /></clipPath>
            </defs>
            <g clipPath="url(#hd-eeg-head)">
                {cells.map(({ x, y }, index) => (
                    <rect key={index} x={x - cell / 2} y={-y - cell / 2} width={cell * 1.04} height={cell * 1.04} fill={color(values[index], limit)} />
                ))}
            </g>
            <HeadOutline />
            {kept.map((sensor) => (
                <circle key={sensor.label} cx={sensor.x} cy={-sensor.y} r={sensor.rank < count ? 0.025 : 0.015}
                    fill={sensor.rank < count ? '#f8fafc' : '#64748b'} />
            ))}
        </svg>
    );
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
    return (
        <label className="grid gap-2 text-sm font-semibold">
            {label}
            <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                {children}
            </select>
        </label>
    );
}

function Stat({ term, value, hint }: { term: string; value: string; hint: string }) {
    return (
        <div>
            <dt className="text-xs text-muted-foreground">{term}</dt>
            <dd className="text-xl font-semibold tabular-nums">{value}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">{hint}</dd>
        </div>
    );
}

export default function HdEegLab({ lang }: { lang: Locale }) {
    const t = hdEegText[lang];
    const [density, setDensity] = useState(full);
    const [kind, setKind] = useState<Kind>('potential');
    const [timeIndex, setTimeIndex] = useState(0);
    const [channel, setChannel] = useState(channels[0]);
    const [view, setView] = useState('overlay');
    const entry = maps[String(density)][timeIndex];
    const limit = limits[kind === 'potential' ? 0 : 1][timeIndex];
    const percent = new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 });
    const number = new Intl.NumberFormat(lang, { maximumFractionDigits: kind === 'potential' ? 1 : 2 });
    const time = data.times[timeIndex];
    const set = traces[channel];
    const shownTrials = set.trials.length;
    const plotted = view === 'average'
        ? [{ samples: set.average, color: '#67e8f9' }]
        : view === 'overlay'
            ? [...set.trials.map((samples) => ({ samples, color: '#475569' })), { samples: set.average, color: '#67e8f9' }]
            : [{ samples: set.trials[Number(view)], color: '#94a3b8' }, { samples: set.average, color: '#67e8f9' }];
    const difference = kind === 'potential' ? entry.potentialDifference : entry.laplacianDifference;

    return (
        <div className="grid gap-8">
            <section className="card" aria-labelledby="hd-eeg-maps">
                <h2 id="hd-eeg-maps" className="mb-5 text-2xl font-bold">{t.mapsHeading}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <div className="grid gap-4">
                        <Select label={t.density} value={String(density)} onChange={(value) => setDensity(Number(value))}>
                            {densities.map((count) => (
                                <option key={count} value={count}>{fill(count === full ? t.all : t.some, { count })}</option>
                            ))}
                        </Select>
                        <fieldset className="grid gap-2">
                            <legend className="mb-2 text-sm font-semibold">{t.time}</legend>
                            <div className="flex flex-wrap gap-2">
                                {data.times.map((value, index) => (
                                    <button key={value} type="button" onClick={() => setTimeIndex(index)} aria-pressed={index === timeIndex}
                                        className={`rounded-lg border px-3 py-1.5 text-sm tabular-nums ${index === timeIndex ? 'border-neuro-accent bg-neuro-accent/15 font-semibold' : 'border-[var(--border-strong)]'}`}>
                                        {fill(t.ms, { value })}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" className="mt-1" checked={kind === 'laplacian'} onChange={(event) => setKind(event.target.checked ? 'laplacian' : 'potential')} />
                            <span><span className="font-semibold">{t.laplacian}</span><span className="mt-1 block text-xs text-muted-foreground">{t.laplacianHint}</span></span>
                        </label>
                    </div>
                    <figure className="min-w-0">
                        <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_7rem]">
                            <ScalpMap values={entry[kind]} limit={limit} count={density} label={fill(t.mapLabel, { time, count: density })} />
                            <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground sm:flex-col sm:items-start">
                                <span>{kind === 'potential' ? t.potentialUnit : t.laplacianUnit}</span>
                                <span className="h-3 w-24 rounded-sm sm:hidden" aria-hidden="true"
                                    style={{ background: `linear-gradient(to right, ${color(-1, 1)}, ${color(0, 1)}, ${color(1, 1)})` }} />
                                <span className="hidden h-24 w-3 rounded-sm sm:block" aria-hidden="true"
                                    style={{ background: `linear-gradient(to top, ${color(-1, 1)}, ${color(0, 1)}, ${color(1, 1)})` }} />
                                <span>±{number.format(limit)}</span>
                            </div>
                        </div>
                        <figcaption className="mt-3 text-xs text-muted-foreground">{t.mapNote}</figcaption>
                        <dl className="mt-4 grid gap-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4 sm:grid-cols-2" aria-live="polite">
                            {density === full ? (
                                <div className="sm:col-span-2"><dt className="text-sm font-semibold">{t.reference}</dt></div>
                            ) : (
                                <>
                                    {kind === 'potential' && entry.heldOutError !== undefined && (
                                        <Stat term={t.heldOut} value={percent.format(entry.heldOutError)} hint={t.heldOutHint} />
                                    )}
                                    {difference !== undefined && <Stat term={t.difference} value={percent.format(difference)} hint={t.differenceHint} />}
                                </>
                            )}
                        </dl>
                    </figure>
                </div>
                <div className="mt-6">
                    <h3 className="mb-2 text-lg font-semibold">{t.gfpHeading}</h3>
                    <TracePlot traces={[{ samples: data.gfp, color: '#67e8f9' }]} limit={gfpLimit} ticks={msTicks} markers={data.times}
                        timeLabel={t.timeAxis} voltageLabel={t.gfpUnit} />
                    <p className="mt-2 text-xs text-muted-foreground">{t.gfpNote}</p>
                </div>
            </section>

            <section className="card" aria-labelledby="hd-eeg-traces">
                <h2 id="hd-eeg-traces" className="mb-5 text-2xl font-bold">{t.tracesHeading}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <div className="grid gap-4">
                        <Select label={t.channel} value={channel} onChange={setChannel}>
                            {channels.map((name) => <option key={name} value={name}>{name}</option>)}
                        </Select>
                        <Select label={t.view} value={view} onChange={setView}>
                            <option value="overlay">{fill(t.overlay, { count: shownTrials })}</option>
                            <option value="average">{fill(t.average, { count: data.trials })}</option>
                            {set.trials.map((_, index) => <option key={index} value={index}>{fill(t.trial, { index: index + 1 })}</option>)}
                        </Select>
                    </div>
                    <figure className="min-w-0">
                        <TracePlot traces={plotted} limit={view === 'average' ? averageLimit : traceLimit} ticks={msTicks} markers={[0]}
                            timeLabel={t.timeAxis} voltageLabel={t.amplitude} />
                        <figcaption className="mt-2 text-xs text-muted-foreground">{t.tracesNote}</figcaption>
                    </figure>
                </div>
            </section>

            <section className="card" aria-labelledby="hd-eeg-coverage">
                <h2 id="hd-eeg-coverage" className="mb-5 text-2xl font-bold">{t.coverageHeading}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <figure>
                        <HeadCoverage points={points} highlight={[channel]} kind="sensor" label={`${fill(t.coverageCount, { count: points.length })}. ${t.coverageNote}`} />
                        <figcaption className="mt-2 text-center text-sm font-semibold">
                            {fill(t.coverageCount, { count: points.length })} · {fill(t.coverageKept, { kept: kept.length })} · {channel}
                        </figcaption>
                        <p className="mt-1 text-center text-xs text-muted-foreground">{t.coverageNote}</p>
                    </figure>
                    <div>
                        <h3 className="mb-3 text-lg font-semibold">{t.factsHeading}</h3>
                        <dl className="grid gap-3 text-sm">
                            {([
                                [t.facts.measures, t.facts.measuresValue],
                                [t.facts.count, fill(t.facts.countValue, { excluded: data.excluded.length, kept: kept.length })],
                                [t.facts.rate, t.facts.rateValue],
                                [t.facts.limits, t.facts.limitsValue],
                                [t.facts.coverage, t.facts.coverageValue],
                            ] as const).map(([term, value]) => (
                                <div key={term} className="grid gap-1 border-b border-[var(--border-strong)] pb-3 last:border-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-4">
                                    <dt className="font-semibold">{term}</dt>
                                    <dd className="text-muted-foreground">{value}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-3 text-xs text-muted-foreground">
                            {t.sources}{' '}
                            <a href={primerChapterPdf(2)} className="text-neuro-accent underline underline-offset-4">{t.primerSource}</a>
                            {' · '}
                            <a href="https://doi.org/10.1038/s41598-017-16377-3" className="text-neuro-accent underline underline-offset-4">{t.robinsonSource}</a>
                            {' · '}
                            <a href="https://mne.tools/stable/auto_examples/preprocessing/eeg_csd.html" className="text-neuro-accent underline underline-offset-4">{t.csdSource}</a>
                        </p>
                    </div>
                </div>
            </section>

            <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{fill(t.method, { subject: data.subject, onsets: data.runs.reduce((sum, run) => sum + run.onsets, 0), trials: data.trials })}</p>
                <p className="mt-2 max-w-prose">{t.mapMethod}</p>
                <p className="mt-2 max-w-prose">{t.caveat}</p>
                <p className="mt-2 max-w-prose">{t.licenseNote}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-neuro-accent">
                    <a href={data.dataset} className="underline underline-offset-4">{t.dataset}</a>
                    <a href="https://doi.org/10.1101/2024.10.03.615261" className="underline underline-offset-4">{t.datasetPaper}</a>
                    <a href="https://doi.org/10.1038/sdata.2017.181" className="underline underline-offset-4">{t.hbnPaper}</a>
                    <a href={data.license} className="underline underline-offset-4">{t.license}</a>
                    <a href="https://mne.tools/" className="underline underline-offset-4">{t.mne}</a>
                </div>
            </details>
        </div>
    );
}
