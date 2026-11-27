"""BabelBrain --execute script: one transcranial ultrasound simulation (steps 1 and 2).

Configured through environment variables so one file drives every run:
  BB_T1W, BB_M2M, BB_TRAJ, BB_PROFILE, BB_OUT, BB_TX (DomeTx | Single), BB_FREQ_KHZ,
  BB_PPW, BB_REFOCUS (0/1), BB_SINGLE_DIAM_MM, BB_SINGLE_FOCAL_MM
"""
import os
import sys

env = os.environ
# Headless run: send worker-thread output straight to the console instead of emitting
# it as a Qt signal to the log widget. With PySide6 6.12 on linux-aarch64 that cross-thread
# emit of a Python bool crashed the process (bool_dealloc refcount error).
sys.modules["__main__"].OutputWrapper.write = lambda self, text: self._stream.write(text)
bb = launch(
    t1w=env["BB_T1W"], simbnibs=env["BB_M2M"], simbnibs_type="charm",
    trajectory=env["BB_TRAJ"], trajectory_type="brainsight",
    thermal_profile=env["BB_PROFILE"], transducer=env["BB_TX"],
    ct_type="none", frequency_khz=int(env["BB_FREQ_KHZ"]), ppw=int(env.get("BB_PPW", "6")),
    output_path=env["BB_OUT"], gpu=env.get("BB_GPU", "NVIDIA GB10"), backend="CUDA",
)
auto_answer_dialogs(question=QMessageBox.Yes)

print("Step 1: CalculatePlanningMask", flush=True)
bb.testing_error = False
bb.Widget.CalculatePlanningMask.click()
wait_until(bb.Widget.tabWidget.isEnabled, timeout_ms=3_600_000)
check_no_error(bb)

bb.Widget.tabWidget.setCurrentIndex(1)
w = bb.AcSim.Widget
if hasattr(w, "RefocusingcheckBox"):
    w.RefocusingcheckBox.setChecked(env.get("BB_REFOCUS", "0") == "1")
    print("Refocusing:", w.RefocusingcheckBox.isChecked(), flush=True)
for box, key in (("FocalLengthSpinBox", "BB_SINGLE_FOCAL_MM"), ("DiameterSpinBox", "BB_SINGLE_DIAM_MM")):
    if hasattr(w, box) and key in env:
        getattr(w, box).setValue(float(env[key]))
        print(box, getattr(w, box).value(), flush=True)
if hasattr(w, "SkinDistanceSpinBox"):
    # Water gap between the transducer and the skin that puts the natural focus on the
    # target (BabelBrain's "aligned at the target" value, recomputed for this geometry).
    w.SkinDistanceSpinBox.setValue(max(0.0, float(w._ZMaxSkin)))
    print("SkinDistance", w.SkinDistanceSpinBox.value(), "ZMax", w._ZMaxSkin, flush=True)
print("Step 2: CalculateAcField", flush=True)
w.CalculateAcField.click()
wait_until(bb.Widget.tabWidget.isEnabled, timeout_ms=7_200_000)
check_no_error(bb)
print("done", flush=True)
