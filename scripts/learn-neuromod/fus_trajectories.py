"""Write Brainsight-format trajectories for BabelBrain (run with BabelBrain's Python).

usage: python fus_trajectories.py <BabelBrain/BabelBrain dir> <m2m_ernie> <targets.json> <out_dir>

targets.json holds subject-space (scanner RAS, mm) targets written by simnibs_fields.py.
In BabelBrain's (Brainsight) convention the translation of the 4x4 matrix is the target and
its third column points from the target back toward the transducer (out of the head). This
matches BabelBrain's own conversion of a 3D Slicer needle, whose shaft lies along -z.
Each target gets one trajectory, from the nearest scalp point above it to the target; the
helmet and the single-element transducer both use it.
"""
import json
import sys

import nibabel as nib
import numpy as np

bb_dir, m2m, targets_json, out_dir = sys.argv[1:5]
sys.path.insert(0, bb_dir)
from ConvMatTransform import WriteTrajectoryBrainsight  # noqa: E402

img = nib.load(f"{m2m}/final_tissues.nii.gz")
labels = np.asarray(img.dataobj).squeeze()
scalp = np.argwhere(labels == 5)
scalp_mm = nib.affines.apply_affine(img.affine, scalp)


def frame(z):
    z = z / np.linalg.norm(z)
    helper = np.array([1.0, 0, 0]) if abs(z[0]) < 0.9 else np.array([0, 1.0, 0])
    x = np.cross(helper, z)
    x /= np.linalg.norm(x)
    y = np.cross(z, x)
    return np.column_stack([x, y, z])


for name, target in json.load(open(targets_json)).items():
    t = np.asarray(target, float)
    # nearest scalp point above the target (avoids entering through the face or neck)
    above = scalp_mm[scalp_mm[:, 2] > t[2]]
    skin = above[np.argmin(np.linalg.norm(above - t, axis=1))]
    m = np.eye(4)
    m[:3, :3] = frame(skin - t)
    m[:3, 3] = t
    fn = f"{out_dir}/{name}.txt"
    WriteTrajectoryBrainsight(fn, [m], [name], "NIfTI:S:Scanner")
    print(name, "target", t.round(1), "skin entry", skin.round(1), "depth", round(float(np.linalg.norm(t - skin)), 1), "mm")
