"""Build the small browser excerpt for the whole-head neuromodulation lab.

Inputs (all simulated; see docs/learn-contributor-guide.md for how each was produced):
  m2m_ernie/         SimNIBS 4 example head 'ernie' (example dataset v4.1, CC BY-NC 4.0)
  simnibs-out/       written by scripts/learn-neuromod/simnibs_fields.py (SimNIBS 4.6.0)
  babelbrain-runs/   one folder per BabelBrain v0.8.9 run (scripts/learn-neuromod/fus_*.py)

  python scripts/build-learn-neuromod.py <m2m_ernie> <simnibs-out> <babelbrain-runs> \
      src/content/learn/neuromodulation-data.json

Needs numpy, scipy and nibabel only. For every simulation it reports, inside the brain
(grey + white matter of the SimNIBS segmentation), resampled to ernie's 1 mm T1 grid:
  peak        99.9th percentile of |E| (V/m), or the maximum pressure for ultrasound (relative)
  atTarget    mean field within 3 mm of the target, as a fraction of the peak
  focality    brain volume where the field is at least half the peak (cm^3)
  depth       deepest point of that volume below the outer brain surface (mm), after Deng et al. 2013
  offset      distance from the target to the voxel of maximum field (mm)
and a coronal slice through each target, 1.5 mm pixels, field / peak quantised to 8 bits
(clipped at 1), keeping only pixels inside the head.
"""

import argparse
import base64
import glob
import hashlib
import json
import os
import re

import nibabel as nib
import numpy as np
from scipy import ndimage

PIXEL_MM = 1.5
HALF_WIDTH_MM = 96.0
SPHERE_MM = 3.0
# charm labels: 1 WM, 2 GM, 3 CSF, 4 bone, 5 scalp, 6 eyes, 7 compact bone, 8 spongy bone,
# 9 blood, 10 muscle. Shipped display classes: 0 outside, 1 scalp/soft tissue, 2 bone, 3 CSF, 4 brain.
DISPLAY_CLASS = {1: 4, 2: 4, 3: 3, 4: 2, 5: 1, 6: 1, 7: 2, 8: 2, 9: 1, 10: 1}

SIMNIBS_RUNS = {
    "tms": {"superficial": "tms_superficial", "deep": "tms_deep"},
    "tdcs": {"superficial": "tdcs", "deep": "tdcs"},
    "ti": {"superficial": "ti", "deep": "ti"},
}
# BabelBrain run folder and output file for each ultrasound case. A helmet run with refocusing
# (BB_REFOCUS=1) writes both fields: the first pass with geometric phases, and the "Refocus"
# pass with phases recomputed from the transcranial field (skull correction).
FUS_RUNS = {
    "fusDome": ("DomeTx_220_{target}_r1", "_FullElasticSolution_Sub_NORM.nii.gz"),
    "fusDomeCorrected": ("DomeTx_220_{target}_r1", "_FullElasticSolutionRefocus_Sub_NORM.nii.gz"),
    "fusSingle": ("Single_250_{target}_r0", "_FullElasticSolution_Sub_NORM.nii.gz"),
}
UNITS = {"tms": "V/m per A/µs", "tdcs": "V/m per mA", "ti": "V/m per mA", "fusDome": "relative",
         "fusDomeCorrected": "relative", "fusSingle": "relative"}


def sha256(path):
    with open(path, "rb") as f:
        return hashlib.file_digest(f, "sha256").hexdigest()


def load(path):
    img = nib.load(path)
    return np.asarray(img.dataobj, dtype=np.float32).squeeze(), img.affine


def sample(volume, affine, world, order=1):
    """Values of `volume` at world points (..., 3) in mm."""
    ijk = nib.affines.apply_affine(np.linalg.inv(affine), world)
    out = ndimage.map_coordinates(volume, np.moveaxis(ijk, -1, 0), order=order, mode="constant", cval=0.0)
    return out


def rle(values):
    flat = values.ravel()
    starts = np.concatenate([[0], np.flatnonzero(np.diff(flat)) + 1])
    runs = np.diff(np.concatenate([starts, [flat.size]]))
    return [int(v) for pair in zip(flat[starts], runs) for v in pair]


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("m2m")
    ap.add_argument("simnibs_out")
    ap.add_argument("babelbrain_runs")
    ap.add_argument("output")
    ap.add_argument("--allow-missing", action="store_true", help="skip absent ultrasound runs (testing only)")
    args = ap.parse_args()

    t1_path = os.path.join(args.m2m, "T1.nii.gz")
    seg_path = os.path.join(args.m2m, "final_tissues.nii.gz")
    seg, aff = load(seg_path)
    seg = seg.astype(np.int16)
    brain = (seg == 1) | (seg == 2)
    head = seg > 0
    voxel_mm = float(np.sqrt((aff[:3, :3] ** 2).sum(0)).mean())
    # depth below the outer brain surface: close sulci (4 mm ball) and fill, then distance to outside
    ball = np.linalg.norm(np.indices((9, 9, 9)) - 4, axis=0) <= 4
    hull = ndimage.binary_fill_holes(ndimage.binary_closing(brain, structure=ball))
    depth = ndimage.distance_transform_edt(hull) * voxel_mm
    grid = np.indices(seg.shape).reshape(3, -1).T
    world_of_voxel = nib.affines.apply_affine(aff, grid).reshape(*seg.shape, 3)
    targets = json.load(open(os.path.join(args.simnibs_out, "targets_subject.json")))
    fingerprints = {"m2m_ernie/T1.nii.gz": sha256(t1_path), "m2m_ernie/final_tissues.nii.gz": sha256(seg_path)}

    head_pts = world_of_voxel[head]
    centre = head_pts.mean(0)
    head_radius = float(np.max(np.hypot(head_pts[:, 0] - centre[0], head_pts[:, 1] - centre[1])))

    # coronal slice geometry per target: x across, z down the image
    # from 50 mm below the deeper target to the top of the head (the jaw and neck are left out)
    zmin = max(float(head_pts[:, 2].min()) - 2, min(t[2] for t in targets.values()) - 50.0)
    zmax = float(head_pts[:, 2].max()) + 2
    xs = np.arange(-HALF_WIDTH_MM, HALF_WIDTH_MM + 1e-6, PIXEL_MM) + centre[0]
    zs = np.arange(zmax, zmin, -PIXEL_MM)
    slices = {}
    for name, t in targets.items():
        X, Z = np.meshgrid(xs, zs)
        world = np.stack([X, np.full_like(X, t[1]), Z], -1)
        labels = sample(seg.astype(np.float32), aff, world, order=0).astype(int)
        display = np.vectorize(lambda v: DISPLAY_CLASS.get(v, 0))(labels).astype(np.uint8)
        slices[name] = {"world": world, "mask": display > 0, "display": display}

    def field_entry(volume, vol_aff, target, kind):
        if vol_aff is not None and not np.allclose(vol_aff, aff):
            volume = sample(volume, vol_aff, world_of_voxel)                 # onto the T1 grid
        volume = np.nan_to_num(volume)
        values = volume[brain]
        # electric fields: 99.9th percentile (the SimNIBS convention, robust to mesh artefacts);
        # ultrasound: the maximum, because the focus can be smaller than 0.1% of the brain
        peak = float(values.max() if kind.startswith("fus") else np.percentile(values, 99.9))
        t = np.asarray(target)
        near = brain & (np.linalg.norm(world_of_voxel - t, axis=-1) <= SPHERE_MM)
        half = brain & (volume >= 0.5 * peak)
        argmax = np.unravel_index(np.argmax(np.where(brain, volume, -np.inf)), volume.shape)
        metrics = {
            "peak": float(f"{peak:.3g}"),
            "unit": UNITS[kind],
            "atTarget": round(float(volume[near].mean() / peak), 3),
            "targetValue": float(f"{volume[near].mean():.3g}"),
            "focalityCm3": round(float(half.sum() * voxel_mm ** 3 / 1000), 1),
            "depthMm": round(float(depth[half].max()) if half.any() else 0.0, 1),
            "offsetMm": round(float(np.linalg.norm(world_of_voxel[argmax] - t)), 1),
        }
        return volume, peak, metrics

    def encode(volume, peak, target_name):
        s = slices[target_name]
        img = sample(volume, aff, s["world"]) / peak
        q = np.clip(np.round(255 * np.clip(img, 0, 1)), 0, 255).astype(np.uint8)
        return base64.b64encode(q[s["mask"]].tobytes()).decode()

    cases = {}
    for kind, runs in SIMNIBS_RUNS.items():
        for target, run in runs.items():
            path = os.path.join(args.simnibs_out, run, f"{run}_magnE.nii.gz")
            fingerprints[f"simnibs-out/{run}/{run}_magnE.nii.gz"] = sha256(path)
            vol, vaff = load(path)
            vol, peak, metrics = field_entry(vol, vaff, targets[target], kind)
            cases[f"{kind}:{target}"] = {"metrics": metrics, "map": encode(vol, peak, target)}

    for kind, (pattern, suffix) in FUS_RUNS.items():
        for target in targets:
            run_dir = os.path.join(args.babelbrain_runs, pattern.format(target=target))
            found = sorted(p for p in glob.glob(os.path.join(run_dir, "*" + suffix)) if "Water" not in p)
            if not found:
                if args.allow_missing:
                    print("missing", run_dir)
                    continue
                raise FileNotFoundError(run_dir)
            path = found[0]
            fingerprints[os.path.relpath(path, args.babelbrain_runs)] = sha256(path)
            vol, vaff = load(path)
            vol, peak, metrics = field_entry(vol, vaff, targets[target], kind)
            cases[f"{kind}:{target}"] = {"metrics": metrics, "map": encode(vol, peak, target)}

    # Coverage (top-down, nose up, unit circle = widest head outline)
    def unit(p):
        return [round(float((p[0] - centre[0]) / head_radius), 3), round(float((p[1] - centre[1]) / head_radius), 3)]

    caps = {}
    with open(os.path.join(args.m2m, "eeg_positions", "EEG10-10_UI_Jurak_2007.csv")) as f:
        for line in f:
            parts = line.strip().split(",")
            if len(parts) >= 5 and parts[0] == "Electrode":
                caps[parts[4]] = np.array(parts[1:4], float)
    coverage = {
        "tdcs": [{"label": n, "xy": unit(caps[n])} for n in ("C3", "AF4")],
        "ti": [{"label": n, "xy": unit(caps[n])} for n in ("F5", "P5", "F6", "P6")],
    }
    for target in targets:
        geo = glob.glob(os.path.join(args.simnibs_out, f"tms_{target}", "*_coil_pos.geo"))[0]
        pts = np.array([list(map(float, m.split(","))) for m in re.findall(r"VP\(([^)]*)\)", open(geo).read())])
        coverage[f"tms:{target}"] = [{"label": "coil", "xy": unit(pts.mean(0))}]
        for kind, (pattern, _) in FUS_RUNS.items():
            stl = glob.glob(os.path.join(args.babelbrain_runs, pattern.format(target=target), "*_Tx.stl"))
            if stl:
                points = stl_points(stl[0], unit)
                if kind == "fusSingle":   # one element: one point at its centre
                    xy = np.mean([p["xy"] for p in points], axis=0)
                    points = [{"label": "transducer", "xy": [round(float(v), 3) for v in xy]}]
                coverage[f"{kind}:{target}"] = points

    out = {
        "simulated": True,
        "head": {"name": "ernie", "dataset": "SimNIBS 4 example dataset v4.1", "license": "CC BY-NC 4.0",
                 "licenseUrl": "https://creativecommons.org/licenses/by-nc/4.0/",
                 "citation": "https://doi.org/10.1109/EMBC.2015.7318340"},
        "targets": {k: [round(v, 1) for v in t] for k, t in targets.items()},
        "slice": {"width": len(xs), "height": len(zs), "pixelMm": PIXEL_MM, "x0": round(float(xs[0]), 1),
                  "z0": round(float(zs[0]), 1),
                  "labelsRle": {k: rle(s["display"]) for k, s in slices.items()}},
        "coverage": coverage,
        "cases": cases,
        "inputSha256": fingerprints,
    }
    with open(args.output, "w") as f:
        f.write(json.dumps(out, separators=(",", ":")) + "\n")
    for key, case in cases.items():
        print(key, case["metrics"])
    print(f"wrote {args.output} ({os.path.getsize(args.output) / 1024:.0f} KiB)")


def stl_points(path, unit, keep=256):
    """Element centres of the transducer surface mesh, thinned to at most `keep` points."""
    data = open(path, "rb").read()
    if data[:5] == b"solid" and b"facet" in data[:400]:
        verts = np.array(re.findall(rb"vertex\s+(\S+)\s+(\S+)\s+(\S+)", data), float)
    else:
        n = int(np.frombuffer(data[80:84], np.uint32)[0])
        rec = np.frombuffer(data[84:84 + 50 * n], dtype=np.dtype([("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")]))
        verts = rec["v"].reshape(-1, 3).astype(float)
    verts = verts * (1000.0 if np.abs(verts).max() < 1 else 1.0)                 # metres -> mm
    xy = np.array([unit(v) for v in verts[:: max(1, len(verts) // 4000)]])
    cells = np.unique(np.round(xy / 0.06).astype(int), axis=0) * 0.06
    step = max(1, len(cells) // keep)
    return [{"label": f"e{i}", "xy": [round(float(a), 3), round(float(b), 3)]} for i, (a, b) in enumerate(cells[::step])]


if __name__ == "__main__":
    main()
