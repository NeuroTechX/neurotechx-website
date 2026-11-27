'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/routes';
import { fnirsText } from '@/content/learn/fnirs-kernel';
import data from '@/content/learn/fnirs-kernel-data.json';
import TracePlot from './TracePlot';

const hands = ['left', 'right'] as const;
const signals = ['hbo', 'hbr'] as const;
const { start, stop, sampleRate } = data;
const ticks = Array.from({ length: (stop - start) / 5 + 1 }, (_, index) => start + 5 * index);

type Hand = (typeof hands)[number];
type Signal = (typeof signals)[number];
type Block = (typeof data.blocks.left)[number];

function average(series: number[]) {
    return series.reduce((sum, value) => sum + value, 0) / series.length;
}

function averageTrace(blocks: Block[], region: Hand, signal: Signal) {
    return blocks[0][region][signal].map((_, index) => average(blocks.map((block) => block[region][signal][index])));
}

function limitFor(selected: Block[][]) {
    const traces = selected.flatMap((blocks) => hands.flatMap((region) => signals.map((signal) => averageTrace(blocks, region, signal))));
    return Math.ceil(Math.max(...traces.flat().map(Math.abs)));
}

const meanLimit = limitFor(Object.values(data.blocks));
const blockLimit = limitFor(Object.values(data.blocks).flat().map((block) => [block]));

function responseWindow(trace: number[]) {
    return average(trace.slice((5 - start) * sampleRate, (15 - start) * sampleRate));
}

export default function FnirsKernelLab({ lang }: { lang: Locale }) {
    const [hand, setHand] = useState<Hand>('left');
    const [signal, setSignal] = useState<Signal>('hbo');
    const [block, setBlock] = useState(0);
    const t = fnirsText[lang];
    const condition = data.blocks[hand];
    const selected = block === 0 ? condition : [condition[block - 1]];
    const left = averageTrace(selected, 'left', signal);
    const right = averageTrace(selected, 'right', signal);
    const duration = average(selected.map(({ duration }) => duration));
    const format = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <section className="card" aria-labelledby="fnirs-activity">
            <h2 id="fnirs-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
            <div className="grid items-start gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
                <div className="grid gap-4">
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.hand}
                        <select value={hand} onChange={(event) => setHand(event.target.value as Hand)} className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                            {hands.map((value) => <option key={value} value={value}>{t[value]}</option>)}
                        </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.signal}
                        <select value={signal} onChange={(event) => setSignal(event.target.value as Signal)} className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                            <option value="hbo">HbO</option>
                            <option value="hbr">HbR</option>
                        </select>
                    </label>
                    <label className="grid gap-2 text-sm font-semibold">
                        {t.block}
                        <select value={block} onChange={(event) => setBlock(Number(event.target.value))} className="rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                            <option value={0}>{t.average.replace('{count}', String(condition.length))}</option>
                            {condition.map((entry, index) => (
                                <option key={entry.onset} value={index + 1}>{t.single.replace('{index}', String(index + 1))}</option>
                            ))}
                        </select>
                    </label>
                    {block !== 0 && <p className="text-xs text-muted-foreground">{t.onset} · {format.format(selected[0].onset)} s</p>}
                </div>
                <figure className="min-w-0">
                    <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        <span className="text-cyan-300">{t.leftRegion}</span>
                        <span className="text-indigo-300">{t.rightRegion} <span aria-hidden="true">– –</span></span>
                    </figcaption>
                    <TracePlot
                        traces={[
                            { samples: left, color: '#67e8f9' },
                            { samples: right, color: '#a5b4fc', dash: [5, 4] },
                        ]}
                        limit={block === 0 ? meanLimit : blockLimit}
                        ticks={ticks}
                        markers={[0, duration]}
                        timeLabel={t.time}
                        voltageLabel={t.amplitude}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">{t.markerNote}</p>
                    <div className="mt-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                        <p className="mb-2 text-sm font-semibold">{t.window}</p>
                        <dl className="grid gap-2 sm:grid-cols-2">
                            <div><dt className="text-xs text-muted-foreground">{t.leftRegion}</dt><dd className="text-xl font-semibold tabular-nums">{format.format(responseWindow(left))}</dd></div>
                            <div><dt className="text-xs text-muted-foreground">{t.rightRegion}</dt><dd className="text-xl font-semibold tabular-nums">{format.format(responseWindow(right))}</dd></div>
                        </dl>
                    </div>
                </figure>
            </div>
            <details className="mt-5 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium">{t.methodHeading}</summary>
                <p className="mt-2 max-w-prose">{t.method}</p>
                <p className="mt-2 max-w-prose">{t.preprocessing}</p>
                <p className="mt-2">
                    {data.regions.left.source} ({data.regions.left.detectors.length}) · {data.regions.right.source} ({data.regions.right.detectors.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-neuro-accent">
                    <a href={data.dataset} className="underline underline-offset-4">{t.dataset}</a>
                    <a href={data.paper} className="underline underline-offset-4">{t.paper}</a>
                    <a href={data.license} className="underline underline-offset-4">{t.license}</a>
                    <a href="https://docs.kernel.com/docs/data-export-pipelines" className="underline underline-offset-4">{t.pipeline}</a>
                </div>
            </details>
        </section>
    );
}
