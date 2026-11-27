'use client';

export type CoveragePoint = { x: number; y: number; label?: string };

/** SVG y grows downward; the data use y toward the nose (up). */
const toSvg = ({ x, y }: { x: number; y: number }) => ({ cx: x, cy: -y });

/** Top-down head outline on the unit circle, nose up, for use inside a viewBox of -1.2 -1.2 2.4 2.4. */
export function HeadOutline() {
    return (
        <g fill="none" stroke="var(--border-strong)" strokeWidth={0.02}>
            <circle cx={0} cy={0} r={1} />
            <path d="M -0.12 -0.99 L 0 -1.13 L 0.12 -0.99" />
            <path d="M -1 -0.14 Q -1.1 0 -1 0.14" />
            <path d="M 1 -0.14 Q 1.1 0 1 0.14" />
        </g>
    );
}

/**
 * Sensor or transducer positions projected top-down onto the unit circle (x to the right,
 * y toward the nose). Points whose label is in `highlight` are drawn larger in the accent colour.
 */
export default function HeadCoverage({ points, highlight = [], kind, label }: {
    points: readonly CoveragePoint[];
    highlight?: readonly string[];
    kind: 'sensor' | 'transducer';
    label?: string;
}) {
    const marked = new Set(highlight);
    const size = kind === 'sensor' ? 0.035 : 0.05;
    return (
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="mx-auto block w-full max-w-64" role="img" aria-label={label}>
            <HeadOutline />
            {points.map((point, index) => {
                const { cx, cy } = toSvg(point);
                const on = point.label !== undefined && marked.has(point.label);
                const r = on ? size * 2 : size;
                const fill = on ? 'var(--neuro-accent)' : '#94a3b8';
                return kind === 'sensor' ? (
                    <circle key={point.label ?? index} cx={cx} cy={cy} r={r} fill={fill} />
                ) : (
                    <rect key={point.label ?? index} x={cx - r} y={cy - r} width={2 * r} height={2 * r} rx={r / 3} fill={fill} />
                );
            })}
        </svg>
    );
}
