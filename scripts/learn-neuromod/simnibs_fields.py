"""SimNIBS electric-field simulations for the whole-head neuromodulation lab.

Run with the SimNIBS 4.6.0 Python (simnibs_python or the environment's python):
  python simnibs_fields.py <m2m_ernie> <out_dir>

Head model: 'ernie' from the SimNIBS 4 example dataset v4.1 (CC BY-NC 4.0,
Thielscher, Antunes and Saturnino 2015). Writes, in <out_dir>:
  targets_subject.json         targets mapped from MNI to ernie (mm, scanner RAS)
  <run>/..._magnE.nii.gz       |E| (V/m) resampled to ernie's T1 grid, one per run
Runs:
  tms_superficial, tms_deep    Magstim 70 mm figure-8 coil, dI/dt = 1 A/us, coil over the
                               scalp point nearest the target, handle 45 deg posterior-lateral
                               (superficial) or posterior (deep), 4 mm from the scalp
  tdcs                         SimNIBS tDCS example montage: 50 x 50 mm anode over C3,
                               50 x 70 mm cathode over AF4, 1 mA
  ti                           SimNIBS TI example montage: F5-P5 and F6-P6, 1 mA per pair,
                               40 mm round electrodes; maximal envelope amplitude (get_maxTI)
"""
import json
import os
import sys
from copy import deepcopy

import numpy as np
from simnibs import ElementTags, mesh_io, mni2subject_coords, run_simnibs, sim_struct
from simnibs.utils import TI_utils
from simnibs.utils.transformations import interpolate_to_volume

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from targets import TARGETS_MNI  # noqa: E402

m2m, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
os.makedirs(out, exist_ok=True)
t1 = os.path.join(m2m, "T1.nii.gz")
targets = {k: [round(float(v), 3) for v in mni2subject_coords(list(c), m2m)] for k, c in TARGETS_MNI.items()}
json.dump(targets, open(os.path.join(out, "targets_subject.json"), "w"), indent=1)
print("targets", targets, flush=True)


def session(name):
    s = sim_struct.SESSION()
    s.subpath = m2m
    s.pathfem = os.path.join(out, name)
    s.fields = "eE"
    s.open_in_gmsh = False
    return s


def to_volume(mesh_file, name):
    interpolate_to_volume(mesh_file, t1, os.path.join(out, name, name))


handle = {"superficial": [-14.0, -14.0, 0.0], "deep": [0.0, -20.0, 0.0]}
for target, centre in targets.items():
    name = f"tms_{target}"
    s = session(name)
    tms = s.add_tmslist()
    tms.fnamecoil = os.path.join("legacy_and_other", "Magstim_70mm_Fig8.ccd")
    pos = tms.add_position()
    pos.centre = centre
    pos.pos_ydir = list(np.add(centre, handle[target]))
    pos.distance = 4
    pos.didt = 1e6
    run_simnibs(s)
    to_volume(os.path.join(s.pathfem, "ernie_TMS_1-0001_Magstim_70mm_Fig8_scalar.msh"), name)

s = session("tdcs")
tdcs = s.add_tdcslist()
tdcs.currents = [0.001, -0.001]
for channel, (where, size) in enumerate((("C3", [50, 50]), ("AF4", [50, 70])), start=1):
    e = tdcs.add_electrode()
    e.channelnr, e.centre, e.shape, e.dimensions, e.thickness = channel, where, "rect", size, 4
run_simnibs(s)
to_volume(os.path.join(s.pathfem, "ernie_TDCS_1_scalar.msh"), "tdcs")

s = session("ti")
pair = s.add_tdcslist()
pair.currents = [0.001, -0.001]
for channel, where in enumerate(("F5", "P5"), start=1):
    e = pair.add_electrode()
    e.channelnr, e.centre, e.shape, e.dimensions, e.thickness = channel, where, "ellipse", [40, 40], 2
pair2 = s.add_tdcslist(deepcopy(pair))
pair2.electrode[0].centre, pair2.electrode[1].centre = "F6", "P6"
run_simnibs(s)
m1 = mesh_io.read_msh(os.path.join(s.pathfem, "ernie_TDCS_1_scalar.msh"))
m2 = mesh_io.read_msh(os.path.join(s.pathfem, "ernie_TDCS_2_scalar.msh"))
keep = np.hstack((np.arange(ElementTags.TH_START, ElementTags.SALINE_START - 1),
                  np.arange(ElementTags.TH_SURFACE_START, ElementTags.SALINE_TH_SURFACE_START - 1)))
m1, m2 = m1.crop_mesh(tags=keep), m2.crop_mesh(tags=keep)
ti = deepcopy(m1)
ti.elmdata = []
ti.add_element_field(TI_utils.get_maxTI(m1.field["E"].value, m2.field["E"].value), "magnE")
fn = os.path.join(s.pathfem, "ernie_TImax.msh")
mesh_io.write_msh(ti, fn)
to_volume(fn, "ti")
print("done", flush=True)
