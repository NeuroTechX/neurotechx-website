---
title: "Travailler avec des données ouvertes en neurosciences"
description: "Où trouver des jeux de données ouverts en EEG et en imagerie cérébrale, comment le format BIDS les organise, comment les charger avec MNE-BIDS, et comment gérer licences, vie privée et reproductibilité."
module: bci
sourceUrl: ""
---
Pas besoin d'avoir votre propre casque pour apprendre l'analyse en ICO. Des laboratoires de recherche partagent ouvertement des milliers d'enregistrements cérébraux. Cette leçon explique où les trouver, comment ils sont organisés, comment en charger un en Python, et quelles règles s'appliquent quand on utilise les données des autres.

## Où trouver des données

- **[OpenNeuro](https://openneuro.org)** héberge plus d'un millier de jeux de données : IRM, EEG, MEG, EEG intracrânien et fNIRS. Chaque jeu est stocké au format BIDS et possède des versions figées (*snapshots*) avec un DOI ([Markiewicz et coll., 2021](https://doi.org/10.7554/eLife.71774)).
- **[NEMAR](https://nemar.org)** donne accès aux jeux de données EEG, MEG et iEEG d'OpenNeuro, avec des outils pour les explorer et les analyser sur des superordinateurs ([Delorme et coll., 2022](https://doi.org/10.1093/database/baac096)).
- **[PhysioNet](https://physionet.org)** héberge des enregistrements physiologiques, dont le très utilisé [EEG Motor Movement/Imagery Dataset](https://physionet.org/content/eegmmidb/1.0.0/) (109 personnes, 64 canaux).
- **[MOABB](https://moabb.neurotechx.com/docs/)** (*Mother of All BCI Benchmarks*), hébergé par NeuroTechX, télécharge des dizaines de jeux de données publics d'ICO (imagerie motrice, P300, SSVEP) au moyen d'une seule interface Python et y applique des bancs d'essai standard ([Jayaram et Barachant, 2018](https://doi.org/10.1088/1741-2552/aadea0)). Son [tableau des jeux de données](https://moabb.neurotechx.com/docs/dataset_summary.html) indique pour chacun le nombre de sujets, de canaux et d'essais.

Avant de télécharger, lisez le README et l'article qui accompagnent le jeu de données. Vérifiez combien de personnes ont été enregistrées, avec quel appareil et quelle référence, quelle était la tâche et quelle est la taille des fichiers.

## BIDS et EEG-BIDS

La **Brain Imaging Data Structure ([BIDS](https://bids.neuroimaging.io))** est une norme communautaire pour nommer et décrire les fichiers de neuroimagerie ([Gorgolewski et coll., 2016](https://doi.org/10.1038/sdata.2016.44)). L'[extension EEG](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/electroencephalography.html) a été ajoutée en 2019 ([Pernet et coll., 2019](https://doi.org/10.1038/s41597-019-0104-8)); il existe aussi des extensions pour l'iEEG, la MEG et la [fNIRS](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/near-infrared-spectroscopy.html).

Voici une partie du jeu de données utilisé dans l'exemple plus bas. Une même personne a été enregistrée deux fois, sans puis avec médicaments :

```text
ds002778/
├── dataset_description.json      nom, auteurs, licence, DOI
├── participants.tsv              une ligne par personne (âge, latéralité, ...)
├── README
└── sub-pd6/
    ├── ses-off/
    │   └── eeg/
    │       ├── sub-pd6_ses-off_task-rest_eeg.bdf        l'enregistrement
    │       ├── sub-pd6_ses-off_task-rest_eeg.json       fréquence d'échantillonnage, référence, appareil
    │       ├── sub-pd6_ses-off_task-rest_channels.tsv   une ligne par canal
    │       └── sub-pd6_ses-off_task-rest_events.tsv     début et étiquette des événements
    └── ses-on/
        └── ...
```

Les noms de fichiers sont formés de paires clé-valeur (`sub-`, `ses-`, `task-`, `run-`) et se terminent par le type de données. Comme tous les jeux BIDS suivent ces règles, un logiciel peut trouver les bons fichiers sans code sur mesure. Le [validateur BIDS](https://bids-validator.readthedocs.io) vérifie qu'un dossier respecte la norme.

## Charger des données avec MNE-BIDS

[MNE-BIDS](https://mne.tools/mne-bids/stable/index.html) lit et écrit des jeux de données BIDS à l'aide de [MNE-Python](https://mne.tools/stable/index.html) ([Appelhoff et coll., 2019](https://doi.org/10.21105/joss.01896)). L'exemple ci-dessous télécharge une personne (environ 30 Mo) du jeu de données EEG au repos de l'UC San Diego sur OpenNeuro, [ds002778](https://openneuro.org/datasets/ds002778), avec [openneuro-py](https://github.com/hoechenberger/openneuro-py), puis charge un enregistrement.

```bash
pip install mne mne-bids openneuro-py
```

```python
from pathlib import Path

import openneuro
from mne_bids import BIDSPath, get_entity_vals, read_raw_bids

# Télécharger un sujet d'un jeu de données EEG au repos ouvert
root = Path("ds002778")
openneuro.download(dataset="ds002778", tag="1.0.5", target_dir=root, include=["sub-pd6"])

# Demander au dossier BIDS ce qu'il contient, puis charger un enregistrement
print(get_entity_vals(root, "subject"))
bids_path = BIDSPath(root=root, subject="pd6", session="off", task="rest", datatype="eeg")
raw = read_raw_bids(bids_path)
print(raw.info["sfreq"], len(raw.ch_names), raw.times[-1])
```

Le script affiche `['pd6']`, puis `512.0 41 190.998046875` : une fréquence d'échantillonnage de 512 Hz, 41 canaux et environ 191 secondes de données. MNE-BIDS lit aussi les types de canaux, les événements et l'information sur les participants dans les fichiers annexes. Il avertit que certaines colonnes de `participants.tsv` (comme les scores cliniques) ne correspondent à aucun champ de MNE; c'est normal. À partir de là, `raw` est un objet MNE ordinaire : les leçons [Prétraitement](/learn/preprocessing) et [Oscillations neuronales](/learn/neural-oscillations) s'appliquent.

Cet exemple a été exécuté avec MNE 1.13.2, MNE-BIDS 0.20.0 et openneuro-py 2026.9.1.

## Licences et citation des données

Ouvert ne veut pas dire « sans règles ». Chaque jeu de données devrait indiquer une licence, en général dans `dataset_description.json` ou sur sa page d'accueil.

- **[CC0](https://creativecommons.org/publicdomain/zero/1.0/)** verse les données dans le domaine public. C'est la licence par défaut d'OpenNeuro. ds002778 est sous CC0.
- **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** et la licence Open Data Commons Attribution (celle du jeu d'imagerie motrice de PhysioNet) permettent la réutilisation à condition de citer la source.
- Certains jeux de données exigent la signature d'une entente d'utilisation ou interdisent l'usage commercial. Lisez les conditions avant de bâtir un produit sur ces données.

Même quand la licence ne l'exige pas, citez le jeu de données (avec son DOI et sa version) et l'article qui le décrit. La [Joint Declaration of Data Citation Principles](https://force11.org/info/joint-declaration-of-data-citation-principles-final/) explique pourquoi les données devraient être citées comme des articles. Certains auteurs font aussi des demandes dans leur README : ceux de ds002778 demandent qu'on les contacte avant de publier des résultats tirés de leurs données.

## Vie privée et enregistrements humains

Les enregistrements cérébraux proviennent de personnes qui ont accepté de participer à une étude, en général dans le cadre d'une approbation éthique qui limite l'usage des données.

- N'essayez pas de réidentifier les participants ni de croiser un jeu de données avec d'autres sources.
- Si vous enregistrez vos propres données, obtenez un consentement éclairé qui précise si et comment les données seront partagées. Le projet [Open Brain Consent](https://open-brain-consent.readthedocs.io) propose des modèles de formulaires de consentement pensés pour le partage de données, dont une version adaptée au Règlement général sur la protection des données (RGPD) de l'Union européenne.
- Retirez les noms, dates de naissance et dates d'enregistrement avant de partager. Utilisez des codes comme `sub-01`, pas des initiales. La fonction `raw.anonymize()` de MNE efface les champs personnels de l'en-tête du fichier.
- Manipulez `participants.tsv` avec soin : l'âge, le sexe, le diagnostic et les scores cliniques sont des renseignements personnels, et une combinaison rare peut suffire à identifier quelqu'un.

La page [Sécurité et éthique](/safety-and-ethics) traite plus en détail du consentement et de la confidentialité des données neuronales.

## Reproductibilité

Un résultat que personne d'autre ne peut reproduire est difficile à croire. Quelques habitudes aident :

- **Notez les versions.** Notez la version du jeu de données (les *snapshots* d'OpenNeuro sont étiquetés, comme `tag="1.0.5"` plus haut) et celles de vos logiciels. `mne.sys_info()` affiche la version de MNE et de ses principales dépendances; `pip freeze > requirements.txt` enregistre tout votre environnement.
- **Fixez les germes aléatoires.** Les classificateurs, les découpages de validation croisée et l'ICA utilisent des nombres aléatoires. Créez un seul générateur, par exemple `rng = np.random.default_rng(42)`, et passez les germes explicitement (`random_state=42` dans scikit-learn et MNE).
- **Utilisez un environnement isolé.** Un environnement virtuel (`python -m venv`) ou un environnement conda par projet empêche les versions de paquets de dériver.
- **Scriptez tout.** Gardez toutes les étapes, du téléchargement brut à la figure finale, dans du code plutôt que dans des clics, et gardez ce code sous gestion de versions.
- **Suivez FAIR.** Les [principes FAIR](https://doi.org/10.1038/sdata.2016.18) (faciles à trouver, accessibles, interopérables, réutilisables) servent de liste de vérification pour partager vos propres données. [The Turing Way](https://book.the-turing-way.org/) est un guide gratuit (en anglais) sur la recherche reproductible en général.
