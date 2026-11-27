// Small signal-processing helpers for the Signals 101 lab. Plain TypeScript, no dependencies.
// The Welch estimate follows scipy.signal.welch defaults: periodic Hann window, 50% overlap,
// mean removed from each segment, one-sided power spectral density.

const tau = 2 * Math.PI;

/** Deterministic pseudo-random numbers (mulberry32), so server and browser render the same noise. */
export function random(seed: number) {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let x = state;
        x = Math.imul(x ^ (x >>> 15), x | 1);
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}

/** Standard normal samples (Box-Muller). */
export function gaussian(count: number, seed: number) {
    const next = random(seed);
    return Array.from({ length: count }, () => Math.sqrt(-2 * Math.log(1 - next())) * Math.cos(tau * next()));
}

/** Discrete Fourier transform. Radix-2 FFT when the length is a power of two, direct sum otherwise. */
export function dft(input: readonly number[]) {
    const n = input.length;
    const re = Float64Array.from(input);
    const im = new Float64Array(n);
    if (n > 1 && (n & (n - 1)) === 0) {
        for (let i = 1, j = 0; i < n; i++) {
            let bit = n >> 1;
            for (; j & bit; bit >>= 1) j ^= bit;
            j ^= bit;
            if (i < j) {
                [re[i], re[j]] = [re[j], re[i]];
            }
        }
        for (let size = 2; size <= n; size <<= 1) {
            const step = -tau / size;
            for (let start = 0; start < n; start += size) {
                for (let k = 0; k < size / 2; k++) {
                    const cos = Math.cos(step * k);
                    const sin = Math.sin(step * k);
                    const a = start + k;
                    const b = a + size / 2;
                    const tr = re[b] * cos - im[b] * sin;
                    const ti = re[b] * sin + im[b] * cos;
                    re[b] = re[a] - tr;
                    im[b] = im[a] - ti;
                    re[a] += tr;
                    im[a] += ti;
                }
            }
        }
        return { re, im };
    }
    // Only the non-negative frequencies are needed for a real signal.
    const cos = Array.from({ length: n }, (_, i) => Math.cos(tau * i / n));
    const sin = Array.from({ length: n }, (_, i) => -Math.sin(tau * i / n));
    const outRe = new Float64Array(n);
    const outIm = new Float64Array(n);
    for (let k = 0; k <= n / 2; k++) {
        let sr = 0;
        let si = 0;
        for (let i = 0; i < n; i++) {
            const index = (k * i) % n;
            sr += input[i] * cos[index];
            si += input[i] * sin[index];
        }
        outRe[k] = sr;
        outIm[k] = si;
    }
    return { re: outRe, im: outIm };
}

function hann(length: number) {
    return Array.from({ length }, (_, i) => 0.5 * (1 - Math.cos(tau * i / length)));
}

/** One-sided power spectral density of one segment (µV²/Hz when the input is in µV). */
function segmentPsd(segment: readonly number[], window: readonly number[], sampleRate: number) {
    const mean = segment.reduce((sum, value) => sum + value, 0) / segment.length;
    const { re, im } = dft(segment.map((value, i) => (value - mean) * window[i]));
    const scale = 1 / (sampleRate * window.reduce((sum, value) => sum + value * value, 0));
    const bins = Math.floor(segment.length / 2) + 1;
    return Array.from({ length: bins }, (_, k) => {
        const power = (re[k] ** 2 + im[k] ** 2) * scale;
        const nyquist = segment.length % 2 === 0 && k === bins - 1;
        return k === 0 || nyquist ? power : 2 * power;
    });
}

/** Welch power spectral density: average of Hann-windowed segments with 50% overlap. */
export function welch(signal: readonly number[], sampleRate: number, segmentLength: number) {
    const window = hann(segmentLength);
    const hop = segmentLength - Math.floor(segmentLength / 2);
    const segments: number[][] = [];
    for (let start = 0; start + segmentLength <= signal.length; start += hop) {
        segments.push(segmentPsd(signal.slice(start, start + segmentLength), window, sampleRate));
    }
    const power = segments[0].map((_, k) => segments.reduce((sum, segment) => sum + segment[k], 0) / segments.length);
    return { frequencies: power.map((_, k) => k * sampleRate / segmentLength), power, segments: segments.length };
}

/** Short-time spectrum: one Hann-windowed periodogram per frame, frames centred every `hop` samples. */
export function spectrogram(signal: readonly number[], sampleRate: number, windowLength: number, hop: number) {
    const window = hann(windowLength);
    const frames: { time: number; power: number[] }[] = [];
    for (let start = 0; start + windowLength <= signal.length; start += hop) {
        frames.push({
            time: (start + windowLength / 2) / sampleRate,
            power: segmentPsd(signal.slice(start, start + windowLength), window, sampleRate),
        });
    }
    return { frames, frequencyStep: sampleRate / windowLength };
}

/** Frequency at which a sampled sinusoid appears: distance to the nearest multiple of the sampling rate. */
export function aliasFrequency(frequency: number, sampleRate: number) {
    return Math.abs(frequency - sampleRate * Math.round(frequency / sampleRate));
}
