#!/bin/bash
#SBATCH --job-name=bb-fus
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --mem=48G
#SBATCH --cpus-per-task=8
#SBATCH --time=03:00:00
#SBATCH --output=%x-%j.log
# usage: sbatch --export=ALL,BB_TX=DomeTx,BB_FREQ_KHZ=220,BB_TARGET=deep,BB_REFOCUS=0 fus_job.sbatch
# BB_ROOT holds bb/ (BabelBrain checkout), bbenv/ (its Python), data/m2m_ernie, traj/, scripts/, runs/
R=${BB_ROOT:-/mnt/t9/mhough-neuromod}
export QT_QPA_PLATFORM=offscreen
export BB_T1W=$R/data/m2m_ernie/T1.nii.gz BB_M2M=$R/data/m2m_ernie BB_TRAJ=$R/traj/$BB_TARGET.txt
export BB_PROFILE=$R/bb/Profiles/Thermal_Profile_1.yaml
export BB_OUT=$R/runs/${BB_TX}_${BB_FREQ_KHZ}_${BB_TARGET}_r${BB_REFOCUS}
mkdir -p $BB_OUT
cd $R/bb/BabelBrain
$R/bbenv/bin/python BabelBrain.py --execute $R/scripts/fus_babelbrain_run.py --headless --do-not-use-last-selection
