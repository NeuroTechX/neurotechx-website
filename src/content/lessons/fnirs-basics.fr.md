---
title: "Les bases de la fNIRS"
description: "Comment la spectroscopie proche infrarouge fonctionnelle mesure l'oxygène du sang dans le cortex avec de la lumière, comment elle se compare à l'EEG, quels artéfacts surveiller, et comment analyser un premier enregistrement avec MNE-NIRS."
module: bci
sourceUrl: ""
---
La spectroscopie proche infrarouge fonctionnelle (fNIRS) mesure l'activité cérébrale avec de la lumière. Comme l'IRMf, elle n'enregistre pas directement les neurones : elle mesure les variations d'oxygène dans le sang qui suivent l'activité neuronale. Contrairement à l'IRMf, elle tient dans un bonnet, elle est silencieuse et on peut l'utiliser pendant qu'une personne est assise, marche ou parle. Elle a servi à construire des ICO, surtout en contexte de recherche ([Naseer et Hong, 2015](https://doi.org/10.3389/fnhum.2015.00003)).

Pour commencer, deux bonnes revues (en anglais) : [Scholkmann et coll. (2014)](https://doi.org/10.1016/j.neuroimage.2013.05.004) sur les instruments et les méthodes, et [Pinti et coll. (2020)](https://doi.org/10.1111/nyas.13948) sur les usages en neurosciences cognitives.

## Comment ça fonctionne

**La lumière proche infrarouge traverse la tête.** La peau, l'os et le cerveau absorbent relativement peu la lumière entre environ 650 et 950 nm. Une partie de cette lumière traverse donc le cuir chevelu et le crâne, se diffuse dans les tissus et ressort. Jöbsis a montré en 1977 qu'on pouvait s'en servir pour suivre l'oxygénation du cerveau à travers le crâne intact ([Jöbsis, 1977](https://doi.org/10.1126/science.929199)).

**Sources et détecteurs.** Un bonnet fNIRS porte des sources de lumière et des détecteurs (qu'on appelle ensemble des optodes) espacés de quelques centimètres. La lumière qui va d'une source à un détecteur suit un chemin courbe, en forme de banane, à travers les tissus. À une distance typique de 3 cm, une partie de ce chemin passe par la couche externe du cortex. Chaque paire source-détecteur forme un **canal**.

**Deux formes d'hémoglobine.** L'hémoglobine oxygénée (HbO) et l'hémoglobine désoxygénée (HbR) n'absorbent pas la lumière proche infrarouge de la même façon. En mesurant à deux longueurs d'onde (760 et 850 nm dans l'exemple plus bas), on peut calculer comment la concentration de chacune a changé.

**La loi de Beer-Lambert modifiée.** La variation de lumière absorbée à chaque longueur d'onde (la variation de densité optique) est modélisée comme la somme des variations de concentration de HbO et de HbR, chacune multipliée par la force d'absorption de cette molécule à cette longueur d'onde et par la distance parcourue par la lumière. Comme la lumière se diffuse, elle parcourt une distance plus longue que la ligne droite entre les optodes. Une correction appelée facteur de longueur de trajet différentiel en tient compte ([Delpy et coll., 1988](https://doi.org/10.1088/0031-9155/33/12/008)). En résolvant les deux équations (une par longueur d'onde), on obtient les variations de HbO et de HbR. La méthode mesure des *variations* par rapport à un point de départ, pas des concentrations absolues.

**La réponse hémodynamique est lente.** Quand une région du cerveau devient active, le débit sanguin local augmente plus que sa consommation d'oxygène. Dans cette région, HbO monte et HbR descend. Cette réponse prend plusieurs secondes à se construire et bien des secondes à revenir à la normale. Dans l'exemple plus bas, la réponse moyenne de HbO atteint son maximum environ 6 secondes après le début d'un bloc de 5 secondes de tapotement des doigts.

## Forces et limites par rapport à l'EEG

| | EEG | fNIRS |
| --- | --- | --- |
| Ce qui est mesuré | Activité électrique des neurones | Variations d'oxygène sanguin qui suivent l'activité |
| Résolution temporelle | Millisecondes | Secondes |
| Précision spatiale | Grossière; chaque électrode capte l'activité d'une grande zone | Un peu meilleure; chaque canal couvre une zone de quelques centimètres |
| Profondeur | Surtout le cortex | Seulement le cortex externe |
| Sensible à | Activité musculaire, mouvements des yeux, bruit électrique | Mouvements de la tête, cheveux, circulation dans le cuir chevelu, battements du cœur et respiration |

La fNIRS est moins touchée que l'EEG par le bruit électrique et l'activité musculaire, et on peut la combiner à l'EEG dans un même bonnet. Sa principale limite pour les ICO est la vitesse : une réponse qui prend des secondes limite le nombre de commandes qu'un utilisateur peut envoyer par minute ([Naseer et Hong, 2015](https://doi.org/10.3389/fnhum.2015.00003)). Des cheveux foncés ou épais bloquent la lumière et compliquent le contact.

## Artéfacts

**Mouvement.** Si une optode bouge sur le cuir chevelu, le trajet de la lumière change et le signal saute ou dérive. Un bonnet bien ajusté aide. Des méthodes de correction, comme la réparation par distribution de la dérivée temporelle (TDDR), peuvent en réparer une partie après coup ([Fishburn et coll., 2019](https://doi.org/10.1016/j.neuroimage.2018.09.025)).

**Mauvais contact.** Si une optode touche mal la peau, le battement cardiaque, qui devrait apparaître comme une petite pulsation dans les bons canaux, disparaît. L'indice de couplage au cuir chevelu (*scalp coupling index*) s'en sert pour noter chaque canal ([Pollonini et coll., 2014](https://doi.org/10.1016/j.heares.2013.11.007)).

**Physiologie systémique.** Le battement cardiaque (environ 1 Hz), la respiration (environ 0,2 à 0,3 Hz) et les lentes ondes de pression artérielle (environ 0,1 Hz, appelées ondes de Mayer) font toutes varier le volume de sang dans le cuir chevelu et le cerveau. Une tâche peut aussi, à elle seule, modifier le rythme cardiaque et la pression, par exemple si elle est stressante. Ces variations peuvent imiter l'activité cérébrale ou la masquer ([Tachtsidis et Scholkmann, 2016](https://doi.org/10.1117/1.NPh.3.3.031405)). Le filtrage enlève le battement cardiaque, mais pas les ondes plus lentes, qui chevauchent la réponse cérébrale.

**Canaux à courte séparation.** Un détecteur placé très près d'une source (environ 8 mm chez l'adulte) capte de la lumière qui n'a traversé que le cuir chevelu et le crâne ([Brigadoi et Cooper, 2015](https://doi.org/10.1117/1.NPh.2.2.025005)). Son signal mesure seulement la circulation dans le cuir chevelu, et on peut le retirer par régression des canaux longs habituels. Les lignes directrices actuelles recommandent d'utiliser des canaux courts lorsque c'est possible ([Yücel et coll., 2021](https://doi.org/10.1117/1.NPh.8.1.012101)).

## Une première analyse avec MNE-NIRS

[MNE-Python](https://mne.tools/stable/auto_tutorials/preprocessing/70_fnirs_processing.html) lit les fichiers fNIRS de la plupart des appareils et les convertit en hémoglobine. [MNE-NIRS](https://mne.tools/mne-nirs/stable/index.html) ajoute la régression des canaux courts, l'analyse par GLM et les statistiques de groupe ([Luke et coll., 2021](https://doi.org/10.1117/1.NPh.8.2.025008)). Les données fNIRS peuvent aussi être rangées en [BIDS](https://bids-specification.readthedocs.io/en/stable/modality-specific-files/near-infrared-spectroscopy.html); la [leçon sur les données ouvertes](/learn/neuro-data-skills) s'applique donc aussi.

L'exemple utilise le [jeu de données fNIRS moteur](https://mne.tools/stable/documentation/datasets.html) de MNE : une personne, enregistrée à l'Université Macquarie avec des optodes au-dessus du cortex moteur, qui touche ses doigts avec son pouce pendant 5 secondes à la fois (30 blocs par main) ou se repose. Le téléchargement fait environ 18 Mo.

```bash
pip install mne mne-nirs
```

```python
import mne
from mne.preprocessing.nirs import beer_lambert_law, optical_density, scalp_coupling_index
from mne_nirs.channels import get_long_channels
from mne_nirs.signal_enhancement import short_channel_regression

# Jeu fNIRS moteur de MNE : une personne qui tapote ses doigts (main gauche ou droite) ou se repose
folder = mne.datasets.fnirs_motor.data_path() / "Participant-1"
raw = mne.io.read_raw_nirx(folder, verbose=False).load_data()

# Intensité lumineuse -> densité optique; vérifier le contact de chaque optode avec le cuir chevelu
od = optical_density(raw)
print(f"Lowest scalp coupling index: {scalp_coupling_index(od).min():.2f}")

# Les canaux de 8 mm voient surtout le cuir chevelu; on retire leur signal des canaux longs
od = get_long_channels(short_channel_regression(od))

# Densité optique -> hémoglobine oxygénée et désoxygénée (loi de Beer-Lambert modifiée)
haemo = beer_lambert_law(od, ppf=6.0)
haemo.filter(0.05, 0.7, verbose=False)  # garder la réponse lente, enlever le battement cardiaque

haemo.annotations.rename({"1.0": "Control", "2.0": "Tapping/Left", "3.0": "Tapping/Right"})
haemo.annotations.delete(haemo.annotations.description == "15.0")
events, event_id = mne.events_from_annotations(haemo, verbose=False)
epochs = mne.Epochs(haemo, events, event_id, tmin=-5, tmax=15, baseline=(None, 0),
                    reject=dict(hbo=80e-6), preload=True, verbose=False)

# Moyenne sur les canaux : HbO monte et HbR descend, quelques secondes après le début du tapotement
for kind in ("hbo", "hbr"):
    trace = epochs["Tapping"].average(picks=kind).data.mean(axis=0) * 1e6  # micromolaire
    at = abs(trace).argmax()
    print(f"{kind}: largest change {trace[at]:+.2f} uM at {epochs.times[at]:.1f} s")
print(f"{len(epochs['Tapping'])} tapping blocks kept")
```

Avec MNE 1.13.2 et MNE-NIRS 0.7.3, le script affiche :

```text
Lowest scalp coupling index: 0.58
hbo: largest change +0.23 uM at 5.8 s
hbr: largest change -0.04 uM at 7.9 s
60 tapping blocks kept
```

HbO monte d'une fraction de micromolaire et atteint son maximum environ 6 secondes après le début du tapotement, tandis que HbR descend un peu moins. HbO et HbR qui varient en sens inverse, c'est le profil attendu d'une réponse hémodynamique; s'ils varient ensemble, cela peut signaler un artéfact systémique ou de mouvement. La moyenne de tous les canaux reste un résumé grossier. Le [tutoriel de MNE](https://mne.tools/stable/auto_tutorials/preprocessing/70_fnirs_processing.html) trace chaque canal et compare le tapotement de la main gauche et de la main droite, et les exemples de MNE-NIRS ajustent un GLM, qui gère mieux les réponses qui se chevauchent que la moyenne par blocs.
