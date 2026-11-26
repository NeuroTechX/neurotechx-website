'use client';

import { useEffect, useRef } from 'react';

type Trace = { samples: readonly number[]; color: string; dashed?: boolean };

export default function TracePlot({ traces, limit, ticks, timeLabel, voltageLabel, marker }: {
    traces: readonly Trace[];
    limit: number;
    ticks: readonly number[];
    timeLabel: string;
    voltageLabel: string;
    marker?: number;
}) {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const element = canvas.current;
        if (!element) return;
        const draw = () => {
            const ctx = element.getContext('2d');
            if (!ctx) return;
            const { width, height } = element.getBoundingClientRect();
            if (width === 0 || height === 0) return;
            const scale = window.devicePixelRatio || 1;
            element.width = Math.round(width * scale);
            element.height = Math.round(height * scale);
            ctx.scale(element.width / width, element.height / height);

            ctx.lineWidth = 1;
            ticks.forEach((tick, index) => {
                const x = 0.5 + (width - 1) * index / (ticks.length - 1);
                ctx.strokeStyle = tick === marker ? '#94a3b8' : '#313747';
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            });

            ctx.strokeStyle = '#313747';
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();

            ctx.lineWidth = 1.5;
            traces.forEach(({ samples, color, dashed }) => {
                ctx.beginPath();
                ctx.strokeStyle = color;
                if (dashed) ctx.setLineDash([5, 4]);
                samples.forEach((sample, i) => {
                    const x = width * i / samples.length;
                    const y = height / 2 * (1 - sample / limit);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.stroke();
                if (dashed) ctx.setLineDash([]);
            });
        };
        draw();
        const observer = new ResizeObserver(draw);
        observer.observe(element);
        return () => observer.disconnect();
    }, [traces, limit, ticks, marker]);

    return (
        <div aria-hidden="true">
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-stretch gap-x-2">
                <div className="flex flex-col justify-between text-right text-xs tabular-nums text-muted-foreground">
                    <span>+{limit}</span><span>0</span><span>−{limit}</span>
                </div>
                <canvas ref={canvas} className="block h-32 w-full rounded-sm bg-[var(--background)] sm:h-40" />
                <span />
                <div className="mt-1 flex justify-between text-xs tabular-nums text-muted-foreground">
                    {ticks.map((tick) => (
                        <span key={tick} className={tick === marker ? 'font-bold text-foreground' : undefined}>{tick}</span>
                    ))}
                </div>
            </div>
            <p className="ml-12 mt-1 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>{voltageLabel}</span><span>{timeLabel}</span>
            </p>
        </div>
    );
}
