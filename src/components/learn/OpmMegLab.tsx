'use client';

import { useState, type ReactNode } from 'react';
import type { Locale } from '@/i18n/routes';
import { opmText } from '@/content/learn/opm-meg';
import data from '@/content/learn/opm-meg-data.json';
import HeadCoverage, { HeadOutline } from './HeadCoverage';
import TracePlot from './TracePlot';

type TraceSet = { all: number[]; first10: number[]; first50: number[]; trials: number[][] };
type Side = 'left' | 'right';
type Axis = 'RAD' | 'TAN';
type Hfc = 'on' | 'off';

const evoked = data.evoked as Record<Hfc, Record<string, TraceSet>>;
const drift = data.drift as unknown as Record<Hfc, Record<string, number[]>>;
const { hmm, sfreq, tmin } = data;
const stateColors = ['#67e8f9', '#fbbf24', '#a78bfa', '#f472b6'];
const msTicks = [-100, 0, 100, 200, 300, 400];
const driftTicks = Array.from({ length: 7 }, (_, index) => data.drift.start + 10 * index);
const views = ['all', 'first50', 'first10', ...Array.from({ length: evoked.on[data.channels[0]].trials.length }, (_, index) => `trial${index}`)];
const points = data.layout.names.map((label, index) => ({ label, x: data.layout.xy[index][0], y: data.layout.xy[index][1] }));

function traceFor(set: TraceSet, view: string) {
    if (view === 'all' || view === 'first10' || view === 'first50') return set[view];
    return set.trials[Number(view.slice(5))];
}

function sd(values: readonly number[]) {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    return Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length);
}

function niceLimit(values: readonly number[]) {
    const peak = Math.max(...values.map(Math.abs));
    const step = 10 ** Math.floor(Math.log10(peak));
    return Math.ceil(peak / step) * step;
}

const allSets = Object.values(evoked).flatMap((channels) => Object.values(channels));
// One vertical scale per kind of view, shared by both sensors, both axes and HFC on or off.
const limits: Record<string, number> = {
    all: niceLimit(allSets.flatMap((set) => set.all)),
    first50: niceLimit(allSets.flatMap((set) => set.first50)),
    first10: niceLimit(allSets.flatMap((set) => set.first10)),
    trial: niceLimit(allSets.flatMap((set) => set.trials.flat())),
};
const driftLimit = niceLimit(Object.values(drift).flatMap((channels) => Object.values(channels).flatMap((trace) => {
    const mean = trace.reduce((sum, value) => sum + value, 0) / trace.length;
    return trace.map((value) => value - mean);
})));

function centred(trace: readonly number[]) {
    const mean = trace.reduce((sum, value) => sum + value, 0) / trace.length;
    return trace.map((value) => value - mean);
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

function SpectrumPlot({ selected, label, axis }: { selected: number; label: string; axis: string }) {
    const freqs = hmm.spectrumFreqs;
    const curves = hmm.spectra.map((spectrum) => spectrum.map((value, index) => 10 * Math.log10(value / hmm.staticSpectrum[index])));
    const limit = Math.ceil(Math.max(...curves.flat().map(Math.abs)));
    const [fmin, fmax] = [freqs[0], freqs[freqs.length - 1]];
    const x = (f: number) => 40 + 250 * (f - fmin) / (fmax - fmin);
    const y = (db: number) => 80 - 70 * db / limit;
    return (
        <svg viewBox="0 0 300 175" className="block w-full" role="img" aria-label={label}>
            <g stroke="var(--border-strong)" strokeWidth={0.6}>
                <line x1={40} x2={290} y1={y(0)} y2={y(0)} />
                {[10, 20, 30, 40].map((f) => <line key={f} x1={x(f)} x2={x(f)} y1={10} y2={150} />)}
            </g>
            <g fill="#94a3b8" fontSize={9}>
                <text x={34} y={y(limit) + 3} textAnchor="end">+{limit}</text>
                <text x={34} y={y(0) + 3} textAnchor="end">0</text>
                <text x={34} y={y(-limit) + 3} textAnchor="end">−{limit}</text>
                {[fmin, 10, 20, 30, 40].map((f) => <text key={f} x={x(f)} y={162} textAnchor="middle">{f}</text>)}
                <text x={290} y={173} textAnchor="end">{axis}</text>
            </g>
            {curves.map((curve, state) => (
                <polyline
                    key={state}
                    fill="none"
                    stroke={stateColors[state]}
                    strokeWidth={state === selected ? 2.2 : 0.8}
                    strokeOpacity={state === selected ? 1 : 0.45}
                    points={curve.map((db, index) => `${x(freqs[index]).toFixed(1)},${y(db).toFixed(1)}`).join(' ')}
                />
            ))}
        </svg>
    );
}

function PowerMap({ selected, label }: { selected: number; label: string }) {
    const values = hmm.powerChange[selected];
    const limit = Math.max(...hmm.powerChange.flat().map(Math.abs));
    return (
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="mx-auto block w-full max-w-64" role="img" aria-label={label}>
            <HeadOutline />
            {points.map((point, index) => {
                const share = Math.min(1, Math.abs(values[index]) / limit);
                const fill = values[index] >= 0 ? `rgba(251, 146, 60, ${0.15 + 0.85 * share})` : `rgba(56, 189, 248, ${0.15 + 0.85 * share})`;
                return <circle key={point.label} cx={point.x} cy={-point.y} r={0.07} fill={fill} />;
            })}
        </svg>
    );
}

export default function OpmMegLab({ lang }: { lang: Locale }) {
    const [side, setSide] = useState<Side>('left');
    const [axis, setAxis] = useState<Axis>('RAD');
    const [hfc, setHfc] = useState<Hfc>('on');
    const [view, setView] = useState('all');
    const [state, setState] = useState(0);
    const t = opmText[lang];
    const format = (digits: number) => new Intl.NumberFormat(lang, { maximumFractionDigits: digits, minimumFractionDigits: digits });
    const sensor = data.sensors[side];
    const channel = `${sensor}-${axis}`;
    const set = evoked[hfc][channel];
    const trace = traceFor(set, view);
    const times = trace.map((_, index) => tmin + index / sfreq);
    const baseline = trace.filter((_, index) => times[index] < 0);
    const windowValues = trace.filter((_, index) => times[index] >= 0.07 && times[index] <= 0.13);
    const peak = windowValues.reduce((best, value) => (Math.abs(value) > Math.abs(best) ? value : best), 0);
    const noise = sd(baseline);
    const singleSd = sd(set.trials.flat());
    const driftOff = centred(drift.off[channel]);
    const driftOn = centred(drift.on[channel]);
    const range = (values: number[]) => Math.max(...values) - Math.min(...values);
    const windowSpan = hmm.window.stop - hmm.window.start;
    const segments = hmm.window.segments.map(([start, value], index, all) => ({
        start, value, stop: index + 1 < all.length ? all[index + 1][0] : hmm.window.stop,
    }));
    const lockedTrace = hmm.locked[state].map((value) => 100 * (value - hmm.locked[state].reduce((sum, v) => sum + v, 0) / hmm.locked[state].length));
    const lockedLimit = Math.max(1, Math.ceil(Math.max(...hmm.locked.flatMap((row) => {
        const mean = row.reduce((sum, v) => sum + v, 0) / row.length;
        return row.map((value) => Math.abs(100 * (value - mean)));
    }))));
    const label = (template: string, values: Record<string, string | number>) =>
        Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);

    return (
        <div className="grid gap-8 [&>*]:min-w-0">
            <section className="card" aria-labelledby="opm-activity">
                <h2 id="opm-activity" className="mb-5 text-2xl font-bold">{t.activity}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
                    <div className="grid gap-4">
                        <Select label={t.sensor} value={side} onChange={(value) => setSide(value as Side)}>
                            <option value="left">{label(t.left, { name: data.sensors.left })}</option>
                            <option value="right">{label(t.right, { name: data.sensors.right })}</option>
                        </Select>
                        <Select label={t.axis} value={axis} onChange={(value) => setAxis(value as Axis)}>
                            <option value="RAD">{t.radial}</option>
                            <option value="TAN">{t.tangential}</option>
                        </Select>
                        <Select label={t.hfc} value={hfc} onChange={(value) => setHfc(value as Hfc)}>
                            <option value="on">{t.on}</option>
                            <option value="off">{t.off}</option>
                        </Select>
                        <Select label={t.trials} value={view} onChange={setView}>
                            {views.map((value) => (
                                <option key={value} value={value}>
                                    {value === 'all' ? label(t.all, { count: data.nTrials })
                                        : value.startsWith('first') ? label(t.first, { count: value.slice(5) })
                                            : label(t.single, { index: Number(value.slice(5)) + 1 })}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <figure className="min-w-0">
                        <figcaption className="mb-3 text-sm font-semibold text-cyan-300">{channel} · HFC {hfc === 'on' ? t.on : t.off}</figcaption>
                        <TracePlot
                            traces={[{ samples: trace, color: '#67e8f9' }]}
                            limit={limits[view.startsWith('trial') ? 'trial' : view]}
                            ticks={msTicks}
                            markers={[0]}
                            timeLabel={t.time}
                            voltageLabel={t.amplitude}
                        />
                        <p className="mt-2 text-xs text-muted-foreground">{t.markerNote}</p>
                        <div className="mt-4 rounded-lg border border-neuro-accent/25 bg-neuro-accent/5 p-4" aria-live="polite">
                            <dl className="grid gap-3 sm:grid-cols-3">
                                <div><dt className="text-xs text-muted-foreground">{t.peak}</dt><dd className="text-xl font-semibold tabular-nums">{format(0).format(peak)} fT</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.noise}</dt><dd className="text-xl font-semibold tabular-nums">{format(0).format(noise)} fT</dd></div>
                                <div><dt className="text-xs text-muted-foreground">{t.ratio}</dt><dd className="text-xl font-semibold tabular-nums">{format(1).format(Math.abs(peak) / noise)}</dd></div>
                            </dl>
                            <p className="mt-3 text-xs text-muted-foreground">{label(t.singleSd, { count: set.trials.length })} · {format(0).format(singleSd)} fT</p>
                        </div>
                    </figure>
                </div>

                <figure className="mt-8 min-w-0">
                    <h3 className="mb-2 text-lg font-semibold">{t.driftHeading}</h3>
                    <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                        <span className="text-amber-300">{t.driftOff} · {t.driftRange} {format(0).format(range(driftOff))} pT</span>
                        <span className="text-cyan-300">{t.driftOn} <span aria-hidden="true">– –</span> · {t.driftRange} {format(0).format(range(driftOn))} pT</span>
                    </figcaption>
                    <TracePlot
                        traces={[
                            { samples: driftOff, color: '#fcd34d' },
                            { samples: driftOn, color: '#67e8f9', dash: [5, 4] },
                        ]}
                        limit={driftLimit}
                        ticks={driftTicks}
                        timeLabel={t.driftTime}
                        voltageLabel={t.driftAmplitude}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">{label(t.driftNote, { start: data.drift.start, stop: data.drift.stop })}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {label(t.shieldingNote, { low: format(1).format(data.shielding.median[0]), mid: format(1).format(data.shielding.median[9]) })}
                    </p>
                </figure>
            </section>

            <section className="card" aria-labelledby="opm-coverage">
                <h2 id="opm-coverage" className="mb-5 text-2xl font-bold">{t.coverageHeading}</h2>
                <div className="grid items-start gap-6 md:grid-cols-[16rem_minmax(0,1fr)]">
                    <figure>
                        <HeadCoverage points={points} highlight={[sensor]} kind="sensor" label={`${label(t.coverageCount, { count: points.length })}. ${t.coverageNote}`} />
                        <figcaption className="mt-2 text-center text-sm font-semibold">{label(t.coverageCount, { count: points.length })} · {sensor}</figcaption>
                        <p className="mt-1 text-center text-xs text-muted-foreground">{t.coverageNote}</p>
                    </figure>
                    <div>
                        <h3 className="mb-3 text-lg font-semibold">{t.factsHeading}</h3>
                        <dl className="grid gap-3 text-sm">
                            {([
                                [t.facts.measures, t.facts.measuresValue],
                                [t.facts.count, t.facts.countValue],
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
                    </div>
                </div>
            </section>

            <section className="card" aria-labelledby="opm-hmm">
                <h2 id="opm-hmm" className="mb-3 text-2xl font-bold">{t.hmmHeading}</h2>
                <p className="mb-5 max-w-prose text-sm text-muted-foreground">{t.hmmIntro}</p>

                <h3 className="mb-2 text-lg font-semibold">{label(t.windowHeading, { start: hmm.window.start, stop: hmm.window.stop })}</h3>
                <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="block h-12 w-full rounded-sm" aria-hidden="true">
                    {segments.map(({ start, stop, value }) => (
                        <rect key={start} x={1000 * (start - hmm.window.start) / windowSpan} width={1000 * (stop - start) / windowSpan} y={10} height={50} fill={stateColors[value]} />
                    ))}
                    {hmm.window.tones.map((tone) => (
                        <rect key={tone} x={1000 * (tone - hmm.window.start) / windowSpan - 1.5} width={3} y={0} height={18} fill="#ffffff" />
                    ))}
                </svg>
                <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
                    {[0, 2, 4, 6, 8, 10, 12].map((offset) => <span key={offset}>{hmm.window.start + offset}</span>)}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{label(t.windowNote, { first: format(1).format(hmm.firstToneSeconds) })}</p>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[32rem] text-left text-sm tabular-nums">
                        <thead className="text-xs text-muted-foreground">
                            <tr>
                                <th className="py-2 pr-3 font-semibold">{t.tableState}</th>
                                <th className="py-2 pr-3 font-semibold">{t.occupancy}</th>
                                <th className="py-2 pr-3 font-semibold">{t.before}</th>
                                <th className="py-2 pr-3 font-semibold">{t.during}</th>
                                <th className="py-2 font-semibold">{t.lifetime}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hmm.fractionalOccupancy.map((occupancy, index) => (
                                <tr key={index} className={`border-t border-[var(--border-strong)] ${index === state ? 'font-semibold' : ''}`}>
                                    <td className="py-2 pr-3">
                                        <button type="button" onClick={() => setState(index)} aria-pressed={index === state} className="inline-flex items-center gap-2 hover:underline">
                                            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: stateColors[index] }} aria-hidden="true" />
                                            {label(t.state, { index: index + 1 })}
                                        </button>
                                    </td>
                                    <td className="py-2 pr-3">{format(0).format(100 * occupancy)} %</td>
                                    <td className="py-2 pr-3">{format(0).format(100 * hmm.occupancyBeforeTones[index])} %</td>
                                    <td className="py-2 pr-3">{format(0).format(100 * hmm.occupancyDuringTones[index])} %</td>
                                    <td className="py-2">{format(0).format(hmm.meanLifetimeMs[index])} ms</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 max-w-xs">
                    <Select label={t.stateChoice} value={String(state)} onChange={(value) => setState(Number(value))}>
                        {hmm.fractionalOccupancy.map((_, index) => <option key={index} value={index}>{label(t.state, { index: index + 1 })}</option>)}
                    </Select>
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                    <figure className="min-w-0">
                        <h3 className="mb-2 text-lg font-semibold">{t.spectrumHeading}</h3>
                        <SpectrumPlot selected={state} label={t.spectrumHeading} axis={t.frequency} />
                        <p className="mt-1 text-xs text-muted-foreground">{t.spectrumAxis}</p>
                    </figure>
                    <figure className="min-w-0">
                        <h3 className="mb-2 text-lg font-semibold">{t.mapHeading}</h3>
                        <PowerMap selected={state} label={t.mapHeading} />
                        <p className="mt-2 text-xs text-muted-foreground">{t.mapNote}</p>
                    </figure>
                </div>

                <figure className="mt-8 min-w-0">
                    <h3 className="mb-2 text-lg font-semibold">{t.lockedHeading}</h3>
                    <TracePlot
                        traces={[{ samples: lockedTrace, color: stateColors[state] }]}
                        limit={lockedLimit}
                        ticks={msTicks}
                        markers={[0]}
                        timeLabel={t.time}
                        voltageLabel={t.lockedAxis}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">{label(t.lockedNote, { count: hmm.nTones })}</p>
                </figure>
                <p className="mt-5 max-w-prose rounded-lg border border-amber-300/30 bg-amber-300/5 p-4 text-sm text-muted-foreground">{t.caveat}</p>
            </section>
        </div>
    );
}
