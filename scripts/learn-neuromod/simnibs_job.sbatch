#!/bin/bash
#SBATCH --job-name=simnibs-fields
#SBATCH --mem=14G
#SBATCH --cpus-per-task=4
#SBATCH --time=02:00:00
#SBATCH --output=%x-%j.log
# usage (from this directory): sbatch simnibs_job.sbatch <simnibs-python> <m2m_ernie> <simnibs-out>
export OMP_NUM_THREADS=4 MKL_NUM_THREADS=4
"$1" -u "$SLURM_SUBMIT_DIR/simnibs_fields.py" "$2" "$3"
