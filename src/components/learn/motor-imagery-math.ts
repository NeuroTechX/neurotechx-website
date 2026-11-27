// Small, dependency-free versions of the steps in a motor imagery pipeline: spatial covariance
// matrices, common spatial patterns (CSP), linear discriminant analysis (LDA), cross-validation
// and the binomial chance threshold. The matrices are tiny (9 × 9), so plain arrays are enough.

export type Matrix = number[][];
export type Trial = { cov: Matrix; label: 0 | 1 };
export type FeatureKind = 'logpower' | 'csp';

/** Rebuild a symmetric matrix from its row-major upper triangle. */
export function fromUpper(values: readonly number[], size: number): Matrix {
    const m: Matrix = Array.from({ length: size }, () => new Array<number>(size).fill(0));
    let k = 0;
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            m[i][j] = values[k];
            m[j][i] = values[k];
            k++;
        }
    }
    return m;
}

function multiply(a: Matrix, b: Matrix): Matrix {
    return a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
}

function transpose(a: Matrix): Matrix {
    return a[0].map((_, j) => a.map((row) => row[j]));
}

function meanMatrix(matrices: readonly Matrix[]): Matrix {
    const size = matrices[0].length;
    const out: Matrix = Array.from({ length: size }, () => new Array<number>(size).fill(0));
    for (const m of matrices) for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) out[i][j] += m[i][j] / matrices.length;
    return out;
}

/** Cyclic Jacobi eigendecomposition of a symmetric matrix. Returns eigenvalues and column eigenvectors. */
export function symmetricEigen(input: Matrix): { values: number[]; vectors: Matrix } {
    const n = input.length;
    const a = input.map((row) => [...row]);
    const v: Matrix = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    for (let sweep = 0; sweep < 100; sweep++) {
        let off = 0;
        for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] ** 2;
        if (off < 1e-22) break;
        for (let p = 0; p < n; p++) {
            for (let q = p + 1; q < n; q++) {
                if (Math.abs(a[p][q]) < 1e-300) continue;
                const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
                const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
                const c = 1 / Math.sqrt(t * t + 1);
                const s = t * c;
                for (let k = 0; k < n; k++) {
                    const akp = a[k][p];
                    const akq = a[k][q];
                    a[k][p] = c * akp - s * akq;
                    a[k][q] = s * akp + c * akq;
                }
                for (let k = 0; k < n; k++) {
                    const apk = a[p][k];
                    const aqk = a[q][k];
                    a[p][k] = c * apk - s * aqk;
                    a[q][k] = s * apk + c * aqk;
                }
                for (let k = 0; k < n; k++) {
                    const vkp = v[k][p];
                    const vkq = v[k][q];
                    v[k][p] = c * vkp - s * vkq;
                    v[k][q] = s * vkp + c * vkq;
                }
            }
        }
    }
    return { values: a.map((row, i) => row[i]), vectors: v };
}

/**
 * CSP filters from training trials: solve A w = λ (A + B) w, where A and B are the class-mean
 * covariances, by whitening A + B and diagonalizing the whitened A. Returns `perSide` filters
 * from each end of the spectrum (high variance for one class, low for the other), as rows.
 */
export function fitCsp(trials: readonly Trial[], perSide = 3): Matrix {
    const a = meanMatrix(trials.filter((t) => t.label === 0).map((t) => t.cov));
    const b = meanMatrix(trials.filter((t) => t.label === 1).map((t) => t.cov));
    const composite = a.map((row, i) => row.map((value, j) => value + b[i][j]));
    const { values, vectors } = symmetricEigen(composite);
    const scaled = vectors.map((row) => row.map((value, j) => value / Math.sqrt(Math.max(values[j], 1e-12))));
    const whitening = multiply(scaled, transpose(vectors));
    const { values: ratios, vectors: rotation } = symmetricEigen(multiply(multiply(whitening, a), whitening));
    const order = ratios.map((_, i) => i).sort((i, j) => ratios[i] - ratios[j]);
    const picked = [...order.slice(0, perSide), ...order.slice(-perSide)];
    const filters = multiply(whitening, rotation);
    return picked.map((column) => filters.map((row) => row[column]));
}

/** Log-variance of each spatially filtered signal: log(w C wᵀ). */
export function cspFeatures(filters: Matrix, cov: Matrix): number[] {
    return filters.map((w) => Math.log(w.reduce((sum, wi, i) => sum + wi * cov[i].reduce((s, cij, j) => s + cij * w[j], 0), 0)));
}

export function logPowerFeatures(cov: Matrix, channels: readonly number[]): number[] {
    return channels.map((c) => Math.log(cov[c][c]));
}

/** Solve a small linear system with Gaussian elimination and partial pivoting. */
function solve(matrix: Matrix, rhs: number[]): number[] {
    const n = rhs.length;
    const m = matrix.map((row, i) => [...row, rhs[i]]);
    for (let col = 0; col < n; col++) {
        let pivot = col;
        for (let r = col + 1; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
        [m[col], m[pivot]] = [m[pivot], m[col]];
        for (let r = col + 1; r < n; r++) {
            const f = m[r][col] / m[col][col];
            for (let c = col; c <= n; c++) m[r][c] -= f * m[col][c];
        }
    }
    const x = new Array<number>(n).fill(0);
    for (let r = n - 1; r >= 0; r--) x[r] = (m[r][n] - m[r].slice(r + 1, n).reduce((s, v, k) => s + v * x[r + 1 + k], 0)) / m[r][r];
    return x;
}

export type Lda = { weights: number[]; bias: number };

/** Two-class LDA with a pooled covariance and class priors from the training set. */
export function fitLda(features: readonly number[][], labels: readonly number[]): Lda {
    const d = features[0].length;
    const means = [0, 1].map((cls) => {
        const rows = features.filter((_, i) => labels[i] === cls);
        return Array.from({ length: d }, (_, j) => rows.reduce((s, r) => s + r[j], 0) / rows.length);
    });
    const pooled: Matrix = Array.from({ length: d }, () => new Array<number>(d).fill(0));
    features.forEach((row, n) => {
        const mean = means[labels[n]];
        for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) pooled[i][j] += (row[i] - mean[i]) * (row[j] - mean[j]);
    });
    const dof = Math.max(features.length - 2, 1);
    // A tiny ridge keeps the solve stable when features are nearly collinear.
    const trace = pooled.reduce((s, row, i) => s + row[i], 0) / dof / d;
    const cov = pooled.map((row, i) => row.map((v, j) => v / dof + (i === j ? 1e-9 * trace : 0)));
    const weights = solve(cov, means[1].map((m, i) => m - means[0][i]));
    const n1 = labels.filter((l) => l === 1).length;
    const prior = Math.log(n1 / (labels.length - n1));
    const midpoint = weights.reduce((s, w, i) => s + w * (means[0][i] + means[1][i]) / 2, 0);
    return { weights, bias: prior - midpoint };
}

export function predict(model: Lda, row: readonly number[]): 0 | 1 {
    return model.weights.reduce((s, w, i) => s + w * row[i], model.bias) > 0 ? 1 : 0;
}

export function makeRandom(seed: number) {
    let state = seed >>> 0;
    return () => {
        state = (Math.imul(1664525, state) + 1013904223) >>> 0;
        return state / 2 ** 32;
    };
}

export function shuffled<T>(items: readonly T[], random: () => number): T[] {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

/** Stratified fold index for each trial: shuffle each class, then deal its trials round-robin. */
export function stratifiedFolds(labels: readonly number[], k: number, seed: number): number[] {
    const random = makeRandom(seed);
    const folds = new Array<number>(labels.length).fill(0);
    let next = 0;
    for (const cls of [0, 1]) {
        const members = shuffled(labels.map((l, i) => (l === cls ? i : -1)).filter((i) => i >= 0), random);
        for (const i of members) folds[i] = next++ % k;
    }
    return folds;
}

/** Train on one set of trials, return the number of correct predictions on another. */
export function trainAndCount(kind: FeatureKind, train: readonly Trial[], test: readonly Trial[], channels: readonly number[]): number {
    const featurize = kind === 'csp'
        ? ((filters) => (cov: Matrix) => cspFeatures(filters, cov))(fitCsp(train))
        : (cov: Matrix) => logPowerFeatures(cov, channels);
    const model = fitLda(train.map((t) => featurize(t.cov)), train.map((t) => t.label));
    return test.filter((t) => predict(model, featurize(t.cov)) === t.label).length;
}

/** Pooled k-fold cross-validated accuracy: every step that learns from data is refit inside each fold. */
export function crossValidate(kind: FeatureKind, trials: readonly Trial[], channels: readonly number[], k = 5, seed = 1): number {
    const folds = stratifiedFolds(trials.map((t) => t.label), k, seed);
    let correct = 0;
    for (let f = 0; f < k; f++) {
        correct += trainAndCount(kind, trials.filter((_, i) => folds[i] !== f), trials.filter((_, i) => folds[i] === f), channels);
    }
    return correct / trials.length;
}

/** Smallest accuracy that guessing (p = 0.5) exceeds with at most 5% probability for n trials. */
export function binomialThreshold(n: number, alpha = 0.05): number {
    let cdf = 0;
    let term = 0.5 ** n; // P(X = 0)
    for (let k = 0; k <= n; k++) {
        cdf += term;
        if (cdf >= 1 - alpha) return k / n;
        term *= (n - k) / (k + 1);
    }
    return 1;
}
