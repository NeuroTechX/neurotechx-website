// Signal generator and alpha estimate for the real-time lab. Kept free of React so the same
// code can be checked outside the browser.

export const SAMPLE_RATE = 128;
const tau = 2 * Math.PI;

/** A simulated occipital EEG channel, generated sample by sample like an amplifier would. */
export function createSimulatedChannel(seed = 1) {
    let state = seed >>> 0 || 1;
    const uniform = () => {
        // xorshift32: small, deterministic, good enough for noise.
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        return (state >>> 0) / 4294967296;
    };
    const gaussian = () => Math.sqrt(-2 * Math.log(uniform() + 1e-12)) * Math.cos(tau * uniform());

    let n = 0;
    let amplitude = 5;
    let drift = 0;
    let wobble = 0;
    let phase = 0;

    return {
        /** Next sample in µV. `eyesClosed` raises the target alpha amplitude. */
        next(eyesClosed: boolean) {
            const target = eyesClosed ? 20 : 5;
            amplitude += (target - amplitude) / (0.3 * SAMPLE_RATE); // about 0.3 s to adjust
            wobble = 0.995 * wobble + 0.1 * gaussian(); // slow waxing and waning of alpha
            drift = 0.97 * drift + 1.4 * gaussian(); // slow background activity
            phase += tau * (10 + 0.3 * Math.sin(tau * 0.07 * n / SAMPLE_RATE)) / SAMPLE_RATE;
            n += 1;
            const alpha = amplitude * (1 + 0.35 * Math.tanh(wobble)) * Math.sin(phase);
            const theta = 4 * Math.sin(tau * 6 * n / SAMPLE_RATE + 1.3);
            return alpha + theta + drift + 7 * gaussian();
        },
    };
}

/** Share of 4–30 Hz power that falls within 8–12 Hz (Hann-windowed periodogram). */
export function alphaShare(samples: readonly number[], sampleRate = SAMPLE_RATE) {
    const length = samples.length;
    const duration = length / sampleRate;
    const mean = samples.reduce((sum, value) => sum + value, 0) / length;
    const windowed = samples.map((value, i) => (value - mean) * 0.5 * (1 - Math.cos(tau * i / (length - 1))));
    let total = 0;
    let alpha = 0;
    for (let bin = Math.ceil(4 * duration); bin <= Math.floor(30 * duration); bin++) {
        let real = 0;
        let imaginary = 0;
        for (let i = 0; i < length; i++) {
            const angle = tau * bin * i / length;
            real += windowed[i] * Math.cos(angle);
            imaginary += windowed[i] * Math.sin(angle);
        }
        const power = real ** 2 + imaginary ** 2;
        total += power;
        const frequency = bin / duration;
        if (frequency >= 8 && frequency <= 12) alpha += power;
    }
    return total > 0 ? alpha / total : 0;
}
