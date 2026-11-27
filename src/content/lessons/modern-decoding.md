---
title: "Modern EEG Decoding"
description: "Riemannian methods, deep learning, transfer across people and sessions, EEG foundation models, and how to evaluate a decoder honestly. Includes a short Python example on real motor imagery data."
module: bci
sourceUrl: ""
---
*Written November 2026 for NeuroTechX. The example was run with MNE-Python 1.13, pyRiemann 0.12 and scikit-learn 1.9.*

## Where this lesson fits

The [Machine Learning for BCI](/learn/machine-learning-for-bci) lesson shows how to train a small neural network on EEG. This lesson gives an overview of the methods used in EEG decoding research today, and of the checks you need before you can trust a reported accuracy.

## Riemannian methods

Many BCI paradigms change the *power* and *correlation* of EEG channels rather than producing a fixed waveform. Motor imagery is the classic case: imagining a hand movement reduces mu and beta power over the opposite motor cortex. All of this information is summarized in the **spatial covariance matrix** of a trial: a channels x channels matrix whose diagonal holds the power of each channel and whose other entries hold how pairs of channels vary together.

Covariance matrices are symmetric and positive definite. They do not live in an ordinary flat space, so averaging them or measuring distances between them with ordinary arithmetic gives distorted results. Riemannian geometry provides distances and means suited to these matrices. [(1)](#references) Two common approaches:

-   **Minimum distance to mean (MDM).** Compute the Riemannian mean covariance of each class, then assign a new trial to the class whose mean is closest. [(2)](#references)
-   **Tangent space.** Project each covariance matrix onto a flat space tangent to the mean of all training matrices, turn it into a vector, and use any standard classifier, such as logistic regression. [(3)](#references)

These methods have few parameters, train in seconds, and work with small datasets. In a large open benchmark of 30 pipelines on 36 datasets, Riemannian pipelines performed best overall, and deep learning needed large amounts of data to be competitive. [(4)](#references) [pyRiemann](https://pyriemann.readthedocs.io/) implements them with a scikit-learn interface.

## Deep learning for EEG

Convolutional networks can learn spatial and temporal filters directly from raw or lightly filtered EEG.

-   **ShallowConvNet** was designed to mimic the filter bank common spatial patterns approach: a temporal convolution, a spatial convolution across channels, squaring, average pooling and a log. **DeepConvNet** stacks more layers. [(5)](#references)
-   **EEGNet** is a compact network that uses depthwise and separable convolutions, so it has few parameters. It was tested on several paradigms (P300, error-related negativity, movement-related cortical potentials and sensorimotor rhythms). [(6)](#references)

[Braindecode](https://braindecode.org/) provides PyTorch implementations of these and many other EEG models, along with dataset loaders. Deep models do not automatically beat simpler pipelines. Results depend on the amount of training data, preprocessing and evaluation protocol. [(4, 7)](#references)

## Transfer across subjects and sessions

EEG differs between people, and between sessions for the same person (cap placement, electrode impedance, fatigue). A decoder trained on Monday often works worse on Tuesday. Most BCIs therefore start each session with calibration, which is tiring for users. Transfer learning tries to reduce this.

A simple and effective idea is **alignment**: re-center each subject's or session's data so that its average covariance becomes the identity matrix, then train one classifier on the aligned data. This has been done in the Riemannian framework [(8, 9)](#references) and in ordinary Euclidean space for use with any classifier, including neural networks. [(10)](#references) Alignment helps, but cross-subject accuracy usually stays below within-subject accuracy.

## Self-supervised learning and EEG foundation models

Labeled EEG is scarce, but unlabeled clinical EEG is plentiful. Self-supervised methods pretrain a model on unlabeled recordings, then fine-tune it on a small labeled task.

-   **BENDR** (2021) adapted a contrastive self-supervised task from speech recognition (wav2vec 2.0) to EEG, using a transformer. [(11)](#references)
-   **LaBraM** (ICLR 2024) splits EEG into per-channel patches, learns a "neural tokenizer" that maps patches to discrete codes, and pretrains a transformer to predict the codes of masked patches. It was pretrained on about 2,500 hours of EEG from around 20 datasets. [(12)](#references)
-   **CBraMod** (ICLR 2025) uses a "criss-cross" transformer that models spatial (across channels) and temporal dependencies with separate attention, and is pretrained by reconstructing masked patches. [(13)](#references)

Each of these papers reports gains over earlier methods on its chosen tasks. Independent comparisons are more cautious. A 2026 benchmark of 12 open-source EEG foundation models on 13 datasets found that linear probing of frozen representations was often not enough, that specialist models trained from scratch remained competitive on many tasks, and that larger models did not necessarily generalize better. [(14)](#references) The field is moving quickly, so check how a model was evaluated before relying on a headline number.

## How to evaluate honestly

Small EEG datasets make it easy to get impressive numbers that do not hold up.

-   **Keep training and test data independent.** Trials recorded close together share slow drifts, electrode state and attention level. If trials from the same block appear in both training and test sets, a classifier can learn the block instead of the brain state. This has produced spuriously high accuracies in published work. [(15)](#references) Split by run, session or subject, depending on the claim you want to make.
-   **Fit all preprocessing inside the training fold.** Channel selection, spatial filters (such as CSP), normalization statistics and hyperparameter search must be learned on training data only. Wrapping every step in a scikit-learn `Pipeline` passed to `cross_val_score` does this for you.
-   **Know the chance level for your sample size.** 50% is the theoretical chance level for two balanced classes only with infinite data. With few test trials, random classifiers often score well above 50%. Use a binomial test or permutation test instead. [(16)](#references) For example, with 15 test trials and two balanced classes, a classifier needs 12 correct (80%) to beat chance at p < 0.05. With 45 trials it needs 29 (64%).
-   **Report the spread.** Cross-validation on small samples has large error bars. Report per-fold and per-subject results, not only the mean. [(17)](#references)
-   **Compare on shared benchmarks.** [MOABB](https://moabb.neurotechx.com/) (Mother of All BCI Benchmarks), a NeuroTechX community project, runs pipelines on many public datasets with standard within-session, cross-session and cross-subject evaluations. [(4, 18)](#references)

## Example: tangent space on motor imagery

This example uses the PhysioNet EEG Motor Movement/Imagery dataset (109 volunteers, 64 channels, 160 Hz, recorded with BCI2000; licence: Open Data Commons Attribution v1.0). [(19, 20)](#references) Runs 6, 10 and 14 contain imagined movement of both fists (T1) or both feet (T2), 15 trials per run. We filter to the mu and beta bands, take the window 1 to 2 s after each cue, estimate covariance matrices, project them to the tangent space and classify with logistic regression.

To mimic a session-to-session test, each run is held out in turn: the model is trained on two runs and tested on the third.

```bash
pip install mne pyriemann scikit-learn
```

```python
import numpy as np
import mne
from mne.datasets import eegbci
from pyriemann.estimation import Covariances
from pyriemann.tangentspace import TangentSpace
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import LeaveOneGroupOut, cross_val_score
from sklearn.pipeline import make_pipeline

mne.set_log_level("WARNING")
runs = [6, 10, 14]  # imagined movement: both fists (T1) vs both feet (T2)

for subject in [1, 2, 3]:
    X, y, groups = [], [], []
    for run, path in zip(runs, eegbci.load_data(subject, runs, update_path=True)):
        raw = mne.io.read_raw_edf(path, preload=True)
        eegbci.standardize(raw)
        raw.filter(7.0, 30.0)  # mu and beta bands
        events, _ = mne.events_from_annotations(raw, event_id=dict(T1=0, T2=1))
        epochs = mne.Epochs(raw, events, tmin=1.0, tmax=2.0, baseline=None,
                            picks="eeg", preload=True)
        X.append(epochs.get_data(copy=True))
        y.append(epochs.events[:, -1])
        groups.append(np.full(len(epochs), run))
    X, y, groups = np.concatenate(X), np.concatenate(y), np.concatenate(groups)

    clf = make_pipeline(Covariances(estimator="oas"),
                        TangentSpace(metric="riemann"),
                        LogisticRegression(max_iter=1000))
    # Train on two runs, test on the third: no trial from the test run is seen in training
    scores = cross_val_score(clf, X, y, groups=groups, cv=LeaveOneGroupOut())
    print(f"Subject {subject}: {len(y)} trials, accuracy per held-out run "
          f"{np.round(scores, 2)}, mean {scores.mean():.2f}")
```

The first run downloads about 25 MB. Our output:

```text
Subject 1: 45 trials, accuracy per held-out run [0.87 0.87 0.93], mean 0.89
Subject 2: 45 trials, accuracy per held-out run [0.73 1.   0.93], mean 0.89
Subject 3: 45 trials, accuracy per held-out run [0.4  0.53 0.47], mean 0.47
```

How to read this:

-   For subjects 1 and 2, 40 of 45 held-out trials were correct (89%), well above the 64% needed to beat chance with 45 trials.
-   Subject 3 is at chance. This is common. In one large study, about 20% of potential users did not reach the accuracy needed to control an application with motor imagery. [(21)](#references) Always report such subjects rather than dropping them.
-   Each held-out run has only 15 trials, so a single fold score moves in steps of about 7%. One fold at 73% is not evidence of a problem by itself.

Things to try: replace `TangentSpace` and `LogisticRegression` with `pyriemann.classification.MDM()`, change the time window, or add more subjects and compare within-subject results with a leave-one-subject-out split.

## What still does not work well

-   **Calibration and drift.** Most EEG BCIs still need per-user and often per-session calibration. Alignment and pretraining reduce this but do not remove it. [(8, 10, 14)](#references)
-   **Users who cannot control the BCI.** For motor imagery, about one user in five did not reach a usable accuracy in one large study. [(21)](#references)
-   **Low information rate.** EEG BCIs transmit far less information than the intracortical systems described in [Invasive and Intracortical BCI](/learn/invasive-bci). Scalp EEG is blurred by the skull and contaminated by muscle and eye artifacts.
-   **Lab versus real life.** Most published results come from controlled lab sessions with cued trials. Asynchronous use (deciding when to act), movement, and consumer-grade hardware all lower performance.
-   **Comparability.** Different preprocessing, data splits and metrics make many published numbers hard to compare. Shared benchmarks help. [(4, 14)](#references)

## References

1.  Congedo M, Barachant A, Bhatia R. Riemannian geometry for EEG-based brain-computer interfaces; a primer and a review. *Brain-Computer Interfaces* 4, 155–174 (2017). [doi:10.1080/2326263X.2017.1297192](https://doi.org/10.1080/2326263X.2017.1297192)
2.  Barachant A, Bonnet S, Congedo M, Jutten C. Multiclass brain-computer interface classification by Riemannian geometry. *IEEE Transactions on Biomedical Engineering* 59, 920–928 (2012). [doi:10.1109/TBME.2011.2172210](https://doi.org/10.1109/TBME.2011.2172210)
3.  Barachant A, Bonnet S, Congedo M, Jutten C. Classification of covariance matrices using a Riemannian-based kernel for BCI applications. *Neurocomputing* 112, 172–178 (2013). [doi:10.1016/j.neucom.2012.12.039](https://doi.org/10.1016/j.neucom.2012.12.039)
4.  Chevallier S et al. The largest EEG-based BCI reproducibility study for open science: the MOABB benchmark. arXiv:2404.15319 (2024). [arxiv.org/abs/2404.15319](https://arxiv.org/abs/2404.15319)
5.  Schirrmeister RT et al. Deep learning with convolutional neural networks for EEG decoding and visualization. *Human Brain Mapping* 38, 5391–5420 (2017). [doi:10.1002/hbm.23730](https://doi.org/10.1002/hbm.23730)
6.  Lawhern VJ et al. EEGNet: a compact convolutional neural network for EEG-based brain-computer interfaces. *Journal of Neural Engineering* 15, 056013 (2018). [doi:10.1088/1741-2552/aace8c](https://doi.org/10.1088/1741-2552/aace8c)
7.  Craik A, He Y, Contreras-Vidal JL. Deep learning for electroencephalogram (EEG) classification tasks: a review. *Journal of Neural Engineering* 16, 031001 (2019). [doi:10.1088/1741-2552/ab0ab5](https://doi.org/10.1088/1741-2552/ab0ab5)
8.  Zanini P, Congedo M, Jutten C, Said S, Berthoumieu Y. Transfer learning: a Riemannian geometry framework with applications to brain-computer interfaces. *IEEE Transactions on Biomedical Engineering* 65, 1107–1116 (2018). [doi:10.1109/TBME.2017.2742541](https://doi.org/10.1109/TBME.2017.2742541)
9.  Rodrigues PLC, Jutten C, Congedo M. Riemannian Procrustes analysis: transfer learning for brain-computer interfaces. *IEEE Transactions on Biomedical Engineering* 66, 2390–2401 (2019). [doi:10.1109/TBME.2018.2889705](https://doi.org/10.1109/TBME.2018.2889705)
10. He H, Wu D. Transfer learning for brain-computer interfaces: a Euclidean space data alignment approach. *IEEE Transactions on Biomedical Engineering* 67, 399–410 (2020). [doi:10.1109/TBME.2019.2913914](https://doi.org/10.1109/TBME.2019.2913914)
11. Kostas D, Aroca-Ouellette S, Rudzicz F. BENDR: using transformers and a contrastive self-supervised learning task to learn from massive amounts of EEG data. *Frontiers in Human Neuroscience* 15, 653659 (2021). [doi:10.3389/fnhum.2021.653659](https://doi.org/10.3389/fnhum.2021.653659)
12. Jiang W-B, Zhao L-M, Lu B-L. Large brain model for learning generic representations with tremendous EEG data in BCI. ICLR 2024. [arxiv.org/abs/2405.18765](https://arxiv.org/abs/2405.18765)
13. Wang J et al. CBraMod: a criss-cross brain foundation model for EEG decoding. ICLR 2025. [arxiv.org/abs/2412.07236](https://arxiv.org/abs/2412.07236)
14. Liu D et al. EEG-FM-Compass: progress, benchmarking, and future directions for EEG foundation models. *National Science Review* (2026). [arxiv.org/abs/2601.17883](https://arxiv.org/abs/2601.17883)
15. Li R et al. The perils and pitfalls of block design for EEG classification experiments. *IEEE Transactions on Pattern Analysis and Machine Intelligence* (2020). [doi:10.1109/TPAMI.2020.2973153](https://doi.org/10.1109/TPAMI.2020.2973153)
16. Combrisson E, Jerbi K. Exceeding chance level by chance: the caveat of theoretical chance levels in brain signal classification and statistical assessment of decoding accuracy. *Journal of Neuroscience Methods* 250, 126–136 (2015). [doi:10.1016/j.jneumeth.2015.01.010](https://doi.org/10.1016/j.jneumeth.2015.01.010)
17. Varoquaux G. Cross-validation failure: small sample sizes lead to large error bars. *NeuroImage* 180, 68–77 (2018). [doi:10.1016/j.neuroimage.2017.06.061](https://doi.org/10.1016/j.neuroimage.2017.06.061)
18. Jayaram V, Barachant A. MOABB: trustworthy algorithm benchmarking for BCIs. *Journal of Neural Engineering* 15, 066011 (2018). [doi:10.1088/1741-2552/aadea0](https://doi.org/10.1088/1741-2552/aadea0)
19. Schalk G, McFarland DJ, Hinterberger T, Birbaumer N, Wolpaw JR. BCI2000: a general-purpose brain-computer interface (BCI) system. *IEEE Transactions on Biomedical Engineering* 51, 1034–1043 (2004). [doi:10.1109/TBME.2004.827072](https://doi.org/10.1109/TBME.2004.827072)
20. Goldberger AL et al. PhysioBank, PhysioToolkit, and PhysioNet. *Circulation* 101, e215–e220 (2000). [doi:10.1161/01.CIR.101.23.e215](https://doi.org/10.1161/01.CIR.101.23.e215). Dataset page: [physionet.org/content/eegmmidb/1.0.0](https://physionet.org/content/eegmmidb/1.0.0/)
21. Blankertz B et al. Neurophysiological predictor of SMR-based BCI performance. *NeuroImage* 51, 1303–1309 (2010). [doi:10.1016/j.neuroimage.2010.03.022](https://doi.org/10.1016/j.neuroimage.2010.03.022)
