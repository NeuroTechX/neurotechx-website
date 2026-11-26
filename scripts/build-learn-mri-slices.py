"""Render the 2 mm brain-only MNI152NLin2009cAsym T1w template for the Learn MRI lab."""

import argparse

import nibabel as nib
import numpy as np
from PIL import Image

TILE = 128
SLICE_COUNT = 17
START_INDICES = (16, 24, 16)
SLICE_STRIDE = 4


def build_atlas(source, target):
    image = nib.as_closest_canonical(nib.load(source))
    if image.shape != (97, 115, 97) or not np.allclose(image.header.get_zooms(), (2, 2, 2)):
        raise ValueError("Use TemplateFlow’s 2 mm brain-only MNI152NLin2009cAsym T1w image.")

    voxels = image.get_fdata(dtype=np.float32)
    bright = np.percentile(voxels[voxels > 0], 99)
    grayscale = np.clip(voxels / bright * 255, 0, 255).astype(np.uint8)
    atlas = Image.new("L", (TILE * SLICE_COUNT, TILE * len(START_INDICES)))

    for axis, start in enumerate(START_INDICES):
        for column in range(SLICE_COUNT):
            index = start + column * SLICE_STRIDE
            pixels = np.take(grayscale, index, axis=axis).T[::-1]
            plane = Image.fromarray(pixels)
            offset = ((TILE - plane.width) // 2, (TILE - plane.height) // 2)
            atlas.paste(plane, (column * TILE + offset[0], axis * TILE + offset[1]))

    atlas.save(target, optimize=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", help="TemplateFlow T1w NIfTI file")
    parser.add_argument("target", help="Output PNG atlas")
    args = parser.parse_args()
    build_atlas(args.source, args.target)
