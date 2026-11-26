import { bilingual } from '@/i18n/text';

export const CAPSTONE_NOTEBOOK = '/learn/notebooks/eeg-alpha-capstone.ipynb';

export const capstoneText = bilingual(
    {
        title: 'Mini-projet EEG : vérifier un résultat',
        intro: 'Reproduisez la comparaison du premier labo EEG avec MNE-Python. Changez de fenêtre d’analyse et expliquez la portée du résultat.',
        requirements: '20–30 minutes · Notions de Python',
        back: 'Apprendre la neurotechnologie',
        task: 'Comparer les yeux ouverts et fermés',
        steps: [
            'Tracez les deux canaux Fp1 et O1 pour les extraits de repos du même participant.',
            'Calculez la part de puissance alpha entre 8 et 12 Hz au site O1. Comparez les conditions sur plusieurs extraits.',
            'Rédigez trois phrases : votre résultat à 18 s, ce qui varie entre les extraits et l’expérience suivante à mener avant de généraliser.',
        ],
        download: 'Télécharger le notebook Jupyter (en anglais)',
        setup: 'Ouvrez le notebook dans Jupyter ou Colab. Le premier lancement télécharge environ 2,5 Mo de données publiques.',
        rubric: 'Vérifier mon interprétation',
        expected: 'L’extrait à 18 s donne environ 31 % les yeux ouverts et 71 % les yeux fermés à O1. La taille de l’écart varie entre les extraits. Une analyse sur plusieurs participants avec des critères fixés à l’avance permettrait d’évaluer la généralisation.',
        browserLab: 'Revenir à la version dans le navigateur',
        dataset: 'Jeu de données PhysioNet (en anglais)',
    },
    {
        title: 'EEG capstone: Check whether a result holds up',
        intro: 'Reproduce the first EEG lab with MNE-Python. Change the analysis window and explain how far your conclusion reaches.',
        requirements: '20–30 minutes · Basic Python',
        back: 'Learn neurotechnology',
        task: 'Compare eyes-open and eyes-closed recordings',
        steps: [
            'Plot Fp1 and O1 for two resting-state clips from the same participant.',
            'Calculate O1’s relative alpha power in the 8–12 Hz band. Compare conditions across several clips.',
            'Write three sentences covering your result at 18 seconds, what changes across clips, and what to test before generalizing.',
        ],
        download: 'Download the Jupyter notebook',
        setup: 'Open the notebook in Jupyter or Colab. The first run downloads about 2.5 MB of public data.',
        rubric: 'Check my interpretation',
        expected: 'At 18 seconds, O1 has about 31% relative alpha power with eyes open and 71% with eyes closed. The size of the gap varies across clips. An analysis across participants with criteria defined in advance could test whether the finding generalizes.',
        browserLab: 'Return to the browser version',
        dataset: 'PhysioNet dataset',
    },
);
