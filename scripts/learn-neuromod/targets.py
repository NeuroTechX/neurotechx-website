"""Shared target definitions for the whole-head neuromodulation lab.

MNI152 coordinates (mm) mapped to the SimNIBS 'ernie' head with simnibs.mni2subject_coords.
  M1 hand area: left precentral hand knob, MNI (-37, -21, 58)
  thalamus:     left thalamus, MNI (-12, -18, 8)
"""
TARGETS_MNI = {
    "superficial": (-37.0, -21.0, 58.0),
    "deep": (-12.0, -18.0, 8.0),
}
