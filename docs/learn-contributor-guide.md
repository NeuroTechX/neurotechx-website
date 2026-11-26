# Contribute a Learn lesson

Start from one thing a beginner should be able to explain, choose, or reproduce. Link the relevant Primer section or published protocol, then give the learner a task that produces evidence of that outcome.

Copy this outline into a proposed lesson or lab PR.

- **Audience and prerequisites**. Name the prior lesson or skill, the time needed, and any hardware or software.
- **Learning objective**. Use an outcome the learner can demonstrate.
- **Reading and sources**. Give the chapter and section, or the course and module. Record the asset or dataset version, license, attribution, and changes.
- **Activity**. Ask the learner to predict an outcome, change one variable, and explain the result. Include a short interpretation the learner can check.
- **Self-check**. Ask a question that applies the concept. Give plausible alternatives, an explanation, and the source section to revisit.
- **Reference output**. Give representative values or a reproducible test and explain how real data can differ.
- **Translations and access**. Check that the English and French paths work, the controls have labels, and any chart has a useful text result.

Use AI to draft question variants, translate draft copy, or prototype controls. Have a contributor with relevant domain experience check the science, run the computation or notebook, and edit the final explanations. Ask a beginner in a NeuroTechX chapter or student club to try the lesson and tell you where they get stuck.

## Where content lives

- `src/content/learn/primer-chapters.ts` holds chapter links and public lab paths. Chapter self-checks live in `primer-checks.ts` and `additional-primer-checks.ts`. The PDF references use printed page numbers.
- Browser labs live in `src/app/[lang]/learn/labs`, with localized copy in `src/content/learn` and interactive components in `src/components/learn`.
- Downloadable notebooks live in `public/learn/notebooks`. Cite the data, state how to reproduce the browser result, and keep downloaded participant files out of Git.
- Use the Primer for reading and interpretation. Link Neurotech@Berkeley for deeper exercises, and confirm the license of the particular notebook, slides, or figures before adapting them.

## MRI slice atlas

The atlas is derived from the [TemplateFlow brain-only 2 mm MNI152NLin2009cAsym T1w template](https://templateflow.s3.amazonaws.com/tpl-MNI152NLin2009cAsym/tpl-MNI152NLin2009cAsym_res-02_desc-brain_T1w.nii.gz). The script reorients the volume to RAS, maps intensities to grayscale, and extracts 17 evenly spaced slices per plane. The source notice is shipped with the atlas at `public/learn/mri/LICENSE.txt`.

Install `nibabel`, `numpy`, and `pillow`, then run `python scripts/build-learn-mri-slices.py <input.nii.gz> public/learn/mri/mni152-slices.png`.
