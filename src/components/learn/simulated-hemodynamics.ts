// Normalized positive lobe with a five-second peak, used in the teaching simulations.
export function hemodynamicResponse(elapsed: number) {
    return elapsed > 0 ? Math.pow(elapsed / 5, 5) * Math.exp(5 - elapsed) : 0;
}
