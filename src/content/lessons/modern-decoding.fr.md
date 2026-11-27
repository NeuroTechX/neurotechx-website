---
title: "Le décodage EEG moderne"
description: "Méthodes riemanniennes, apprentissage profond, transfert entre personnes et entre séances, modèles de fondation pour l'EEG, et comment évaluer un décodeur honnêtement. Avec un court exemple Python sur de vraies données d'imagerie motrice."
module: bci
sourceUrl: ""
---
*Rédigé en novembre 2026 pour NeuroTechX. L'exemple a été exécuté avec MNE-Python 1.13, pyRiemann 0.12 et scikit-learn 1.9.*

## La place de cette leçon

La leçon [Apprentissage automatique pour les ICM](/learn/machine-learning-for-bci) montre comment entraîner un petit réseau de neurones sur de l'EEG. Celle-ci donne un aperçu des méthodes utilisées aujourd'hui en recherche sur le décodage EEG, et des vérifications à faire avant de se fier à une exactitude annoncée.

## Méthodes riemanniennes

Beaucoup de paradigmes d'ICM modifient la *puissance* et la *corrélation* des canaux EEG plutôt que de produire une forme d'onde fixe. L'imagerie motrice en est l'exemple classique : imaginer un mouvement de la main réduit la puissance mu et bêta au-dessus du cortex moteur du côté opposé. Toute cette information se résume dans la **matrice de covariance spatiale** d'un essai : une matrice canaux x canaux dont la diagonale contient la puissance de chaque canal et dont les autres cases indiquent comment les paires de canaux varient ensemble.

Les matrices de covariance sont symétriques et définies positives. Elles ne vivent pas dans un espace plat ordinaire : en faire la moyenne ou mesurer les distances entre elles avec l'arithmétique habituelle donne des résultats déformés. La géométrie riemannienne fournit des distances et des moyennes adaptées à ces matrices. [(1)](#références) Deux approches courantes :

-   **Distance minimale à la moyenne (MDM).** On calcule la moyenne riemannienne des covariances de chaque classe, puis on attribue un nouvel essai à la classe dont la moyenne est la plus proche. [(2)](#références)
-   **Espace tangent.** On projette chaque matrice de covariance sur un espace plat tangent à la moyenne de toutes les matrices d'entraînement, on la transforme en vecteur, puis on utilise n'importe quel classificateur standard, comme la régression logistique. [(3)](#références)

Ces méthodes ont peu de paramètres, s'entraînent en quelques secondes et fonctionnent avec de petits jeux de données. Dans un grand banc d'essai ouvert de 30 chaînes de traitement sur 36 jeux de données, les chaînes riemanniennes ont obtenu les meilleurs résultats dans l'ensemble, et l'apprentissage profond avait besoin de beaucoup de données pour être compétitif. [(4)](#références) [pyRiemann](https://pyriemann.readthedocs.io/) les met en œuvre avec une interface scikit-learn.

## Apprentissage profond pour l'EEG

Les réseaux convolutifs peuvent apprendre des filtres spatiaux et temporels directement à partir d'EEG brut ou légèrement filtré.

-   **ShallowConvNet** a été conçu pour imiter l'approche des patrons spatiaux communs par bancs de filtres (FBCSP) : une convolution temporelle, une convolution spatiale entre les canaux, une mise au carré, un regroupement par moyenne et un logarithme. **DeepConvNet** empile plus de couches. [(5)](#références)
-   **EEGNet** est un réseau compact qui utilise des convolutions en profondeur et séparables, ce qui lui donne peu de paramètres. Il a été testé sur plusieurs paradigmes (P300, négativité d'erreur, potentiels corticaux liés au mouvement et rythmes sensorimoteurs). [(6)](#références)

[Braindecode](https://braindecode.org/) offre des implémentations PyTorch de ces modèles et de beaucoup d'autres modèles pour l'EEG, ainsi que des outils pour charger des jeux de données. Les modèles profonds ne battent pas automatiquement les méthodes plus simples. Les résultats dépendent de la quantité de données d'entraînement, du prétraitement et du protocole d'évaluation. [(4, 7)](#références)

## Transfert entre personnes et entre séances

L'EEG diffère d'une personne à l'autre, et d'une séance à l'autre chez la même personne (position du casque, impédance des électrodes, fatigue). Un décodeur entraîné le lundi fonctionne souvent moins bien le mardi. La plupart des ICM commencent donc chaque séance par un étalonnage, ce qui fatigue les utilisateurs. L'apprentissage par transfert cherche à réduire ce besoin.

Une idée simple et efficace est l'**alignement** : on recentre les données de chaque personne ou de chaque séance pour que leur covariance moyenne devienne la matrice identité, puis on entraîne un seul classificateur sur les données alignées. Cela a été fait dans le cadre riemannien [(8, 9)](#références) et dans l'espace euclidien ordinaire, pour l'utiliser avec n'importe quel classificateur, y compris des réseaux de neurones. [(10)](#références) L'alignement aide, mais l'exactitude d'une personne à l'autre reste habituellement inférieure à l'exactitude chez une même personne.

## Apprentissage autosupervisé et modèles de fondation pour l'EEG

L'EEG annoté est rare, mais l'EEG clinique non annoté est abondant. Les méthodes autosupervisées préentraînent un modèle sur des enregistrements non annotés, puis l'ajustent sur une petite tâche annotée.

-   **BENDR** (2021) a adapté à l'EEG une tâche autosupervisée contrastive venue de la reconnaissance de la parole (wav2vec 2.0), avec un transformeur. [(11)](#références)
-   **LaBraM** (ICLR 2024) découpe l'EEG en segments par canal, apprend un « tokeniseur neuronal » qui associe chaque segment à un code discret, et préentraîne un transformeur à prédire les codes des segments masqués. Il a été préentraîné sur environ 2 500 heures d'EEG provenant d'une vingtaine de jeux de données. [(12)](#références)
-   **CBraMod** (ICLR 2025) utilise un transformeur « en croix » qui modélise séparément les dépendances spatiales (entre canaux) et temporelles avec deux mécanismes d'attention, et il est préentraîné en reconstruisant des segments masqués. [(13)](#références)

Chacun de ces articles rapporte des gains par rapport aux méthodes antérieures sur les tâches choisies. Les comparaisons indépendantes sont plus prudentes. Un banc d'essai de 2026 portant sur 12 modèles de fondation EEG en code source ouvert et 13 jeux de données a conclu que le sondage linéaire de représentations figées était souvent insuffisant, que des modèles spécialisés entraînés à partir de zéro restaient compétitifs sur beaucoup de tâches, et que les plus gros modèles ne généralisaient pas forcément mieux. [(14)](#références) Le domaine évolue vite : vérifiez comment un modèle a été évalué avant de vous fier à un chiffre mis en avant.

## Évaluer honnêtement

Avec de petits jeux de données EEG, il est facile d'obtenir des chiffres impressionnants qui ne tiennent pas.

-   **Gardez les données d'entraînement et de test indépendantes.** Des essais enregistrés à peu d'intervalle partagent les dérives lentes, l'état des électrodes et le niveau d'attention. Si des essais d'un même bloc se retrouvent à la fois dans l'entraînement et dans le test, un classificateur peut apprendre le bloc plutôt que l'état du cerveau. Cela a déjà produit des exactitudes trompeuses dans des travaux publiés. [(15)](#références) Séparez par série, par séance ou par personne selon ce que vous voulez affirmer.
-   **Ajustez tout le prétraitement à l'intérieur du pli d'entraînement.** La sélection des canaux, les filtres spatiaux (comme CSP), les statistiques de normalisation et la recherche d'hyperparamètres doivent être appris sur les données d'entraînement seulement. Mettre toutes les étapes dans un `Pipeline` scikit-learn passé à `cross_val_score` s'en occupe pour vous.
-   **Connaissez le niveau de hasard pour votre taille d'échantillon.** 50 % n'est le niveau de hasard théorique pour deux classes équilibrées qu'avec une infinité de données. Avec peu d'essais de test, des classificateurs aléatoires dépassent souvent largement 50 %. Utilisez plutôt un test binomial ou un test de permutation. [(16)](#références) Par exemple, avec 15 essais de test et deux classes équilibrées, il faut 12 bonnes réponses (80 %) pour dépasser le hasard à p < 0,05. Avec 45 essais, il en faut 29 (64 %).
-   **Rapportez la dispersion.** La validation croisée sur de petits échantillons a de grandes barres d'erreur. Rapportez les résultats par pli et par personne, pas seulement la moyenne. [(17)](#références)
-   **Comparez sur des bancs d'essai communs.** [MOABB](https://moabb.neurotechx.com/) (Mother of All BCI Benchmarks), un projet de la communauté NeuroTechX, fait tourner des chaînes de traitement sur de nombreux jeux de données publics avec des évaluations standard à l'intérieur d'une séance, entre séances et entre personnes. [(4, 18)](#références)

## Exemple : espace tangent sur de l'imagerie motrice

Cet exemple utilise le jeu de données EEG Motor Movement/Imagery de PhysioNet (109 volontaires, 64 canaux, 160 Hz, enregistré avec BCI2000; licence : Open Data Commons Attribution v1.0). [(19, 20)](#références) Les séries 6, 10 et 14 contiennent des mouvements imaginés des deux poings (T1) ou des deux pieds (T2), 15 essais par série. On filtre dans les bandes mu et bêta, on prend la fenêtre de 1 à 2 s après chaque signal, on estime les matrices de covariance, on les projette dans l'espace tangent, puis on classe avec une régression logistique.

Pour imiter un test d'une séance à l'autre, on met chaque série de côté à tour de rôle : le modèle est entraîné sur deux séries et testé sur la troisième.

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

La première exécution télécharge environ 25 Mo. Notre résultat :

```text
Subject 1: 45 trials, accuracy per held-out run [0.87 0.87 0.93], mean 0.89
Subject 2: 45 trials, accuracy per held-out run [0.73 1.   0.93], mean 0.89
Subject 3: 45 trials, accuracy per held-out run [0.4  0.53 0.47], mean 0.47
```

Comment le lire :

-   Pour les sujets 1 et 2, 40 des 45 essais mis de côté ont été bien classés (89 %), nettement au-dessus des 64 % nécessaires pour dépasser le hasard avec 45 essais.
-   Le sujet 3 est au niveau du hasard. C'est fréquent. Dans une grande étude, environ 20 % des utilisateurs potentiels n'atteignaient pas l'exactitude nécessaire pour contrôler une application par imagerie motrice. [(21)](#références) Rapportez toujours ces sujets au lieu de les retirer.
-   Chaque série mise de côté ne compte que 15 essais : le score d'un pli varie donc par paliers d'environ 7 %. Un pli à 73 % n'indique pas à lui seul un problème.

À essayer : remplacer `TangentSpace` et `LogisticRegression` par `pyriemann.classification.MDM()`, changer la fenêtre de temps, ou ajouter des sujets et comparer les résultats chez une même personne avec une séparation qui laisse de côté une personne à la fois.

## Ce qui ne fonctionne pas encore bien

-   **Étalonnage et dérive.** La plupart des ICM par EEG ont encore besoin d'un étalonnage par utilisateur, et souvent par séance. L'alignement et le préentraînement réduisent ce besoin sans l'éliminer. [(8, 10, 14)](#références)
-   **Utilisateurs qui n'arrivent pas à contrôler l'ICM.** En imagerie motrice, environ un utilisateur sur cinq n'atteignait pas une exactitude utilisable dans une grande étude. [(21)](#références)
-   **Faible débit d'information.** Les ICM par EEG transmettent beaucoup moins d'information que les systèmes intracorticaux décrits dans la leçon [ICM invasives et intracorticales](/learn/invasive-bci). L'EEG de surface est brouillé par le crâne et contaminé par les artefacts des muscles et des yeux.
-   **Laboratoire contre vie réelle.** La plupart des résultats publiés viennent de séances contrôlées en laboratoire, avec des essais déclenchés par un signal. L'utilisation asynchrone (décider soi-même quand agir), le mouvement et le matériel grand public font tous baisser la performance.
-   **Comparabilité.** Des prétraitements, des séparations de données et des mesures différents rendent beaucoup de chiffres publiés difficiles à comparer. Les bancs d'essai communs aident. [(4, 14)](#références)

## Références

1.  Congedo M, Barachant A, Bhatia R. Riemannian geometry for EEG-based brain-computer interfaces; a primer and a review. *Brain-Computer Interfaces* 4, 155–174 (2017). [doi:10.1080/2326263X.2017.1297192](https://doi.org/10.1080/2326263X.2017.1297192)
2.  Barachant A, Bonnet S, Congedo M, Jutten C. Multiclass brain-computer interface classification by Riemannian geometry. *IEEE Transactions on Biomedical Engineering* 59, 920–928 (2012). [doi:10.1109/TBME.2011.2172210](https://doi.org/10.1109/TBME.2011.2172210)
3.  Barachant A, Bonnet S, Congedo M, Jutten C. Classification of covariance matrices using a Riemannian-based kernel for BCI applications. *Neurocomputing* 112, 172–178 (2013). [doi:10.1016/j.neucom.2012.12.039](https://doi.org/10.1016/j.neucom.2012.12.039)
4.  Chevallier S et coll. The largest EEG-based BCI reproducibility study for open science: the MOABB benchmark. arXiv:2404.15319 (2024). [arxiv.org/abs/2404.15319](https://arxiv.org/abs/2404.15319)
5.  Schirrmeister RT et coll. Deep learning with convolutional neural networks for EEG decoding and visualization. *Human Brain Mapping* 38, 5391–5420 (2017). [doi:10.1002/hbm.23730](https://doi.org/10.1002/hbm.23730)
6.  Lawhern VJ et coll. EEGNet: a compact convolutional neural network for EEG-based brain-computer interfaces. *Journal of Neural Engineering* 15, 056013 (2018). [doi:10.1088/1741-2552/aace8c](https://doi.org/10.1088/1741-2552/aace8c)
7.  Craik A, He Y, Contreras-Vidal JL. Deep learning for electroencephalogram (EEG) classification tasks: a review. *Journal of Neural Engineering* 16, 031001 (2019). [doi:10.1088/1741-2552/ab0ab5](https://doi.org/10.1088/1741-2552/ab0ab5)
8.  Zanini P, Congedo M, Jutten C, Said S, Berthoumieu Y. Transfer learning: a Riemannian geometry framework with applications to brain-computer interfaces. *IEEE Transactions on Biomedical Engineering* 65, 1107–1116 (2018). [doi:10.1109/TBME.2017.2742541](https://doi.org/10.1109/TBME.2017.2742541)
9.  Rodrigues PLC, Jutten C, Congedo M. Riemannian Procrustes analysis: transfer learning for brain-computer interfaces. *IEEE Transactions on Biomedical Engineering* 66, 2390–2401 (2019). [doi:10.1109/TBME.2018.2889705](https://doi.org/10.1109/TBME.2018.2889705)
10. He H, Wu D. Transfer learning for brain-computer interfaces: a Euclidean space data alignment approach. *IEEE Transactions on Biomedical Engineering* 67, 399–410 (2020). [doi:10.1109/TBME.2019.2913914](https://doi.org/10.1109/TBME.2019.2913914)
11. Kostas D, Aroca-Ouellette S, Rudzicz F. BENDR: using transformers and a contrastive self-supervised learning task to learn from massive amounts of EEG data. *Frontiers in Human Neuroscience* 15, 653659 (2021). [doi:10.3389/fnhum.2021.653659](https://doi.org/10.3389/fnhum.2021.653659)
12. Jiang W-B, Zhao L-M, Lu B-L. Large brain model for learning generic representations with tremendous EEG data in BCI. ICLR 2024. [arxiv.org/abs/2405.18765](https://arxiv.org/abs/2405.18765)
13. Wang J et coll. CBraMod: a criss-cross brain foundation model for EEG decoding. ICLR 2025. [arxiv.org/abs/2412.07236](https://arxiv.org/abs/2412.07236)
14. Liu D et coll. EEG-FM-Compass: progress, benchmarking, and future directions for EEG foundation models. *National Science Review* (2026). [arxiv.org/abs/2601.17883](https://arxiv.org/abs/2601.17883)
15. Li R et coll. The perils and pitfalls of block design for EEG classification experiments. *IEEE Transactions on Pattern Analysis and Machine Intelligence* (2020). [doi:10.1109/TPAMI.2020.2973153](https://doi.org/10.1109/TPAMI.2020.2973153)
16. Combrisson E, Jerbi K. Exceeding chance level by chance: the caveat of theoretical chance levels in brain signal classification and statistical assessment of decoding accuracy. *Journal of Neuroscience Methods* 250, 126–136 (2015). [doi:10.1016/j.jneumeth.2015.01.010](https://doi.org/10.1016/j.jneumeth.2015.01.010)
17. Varoquaux G. Cross-validation failure: small sample sizes lead to large error bars. *NeuroImage* 180, 68–77 (2018). [doi:10.1016/j.neuroimage.2017.06.061](https://doi.org/10.1016/j.neuroimage.2017.06.061)
18. Jayaram V, Barachant A. MOABB: trustworthy algorithm benchmarking for BCIs. *Journal of Neural Engineering* 15, 066011 (2018). [doi:10.1088/1741-2552/aadea0](https://doi.org/10.1088/1741-2552/aadea0)
19. Schalk G, McFarland DJ, Hinterberger T, Birbaumer N, Wolpaw JR. BCI2000: a general-purpose brain-computer interface (BCI) system. *IEEE Transactions on Biomedical Engineering* 51, 1034–1043 (2004). [doi:10.1109/TBME.2004.827072](https://doi.org/10.1109/TBME.2004.827072)
20. Goldberger AL et coll. PhysioBank, PhysioToolkit, and PhysioNet. *Circulation* 101, e215–e220 (2000). [doi:10.1161/01.CIR.101.23.e215](https://doi.org/10.1161/01.CIR.101.23.e215). Page du jeu de données : [physionet.org/content/eegmmidb/1.0.0](https://physionet.org/content/eegmmidb/1.0.0/)
21. Blankertz B et coll. Neurophysiological predictor of SMR-based BCI performance. *NeuroImage* 51, 1303–1309 (2010). [doi:10.1016/j.neuroimage.2010.03.022](https://doi.org/10.1016/j.neuroimage.2010.03.022)
