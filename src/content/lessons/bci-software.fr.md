---
title: "Outils logiciels pour les ICM"
description: "Ce tutoriel présente des outils logiciels que vous pouvez utiliser pour analyser des données EEG et MEG."
module: bci
sourceUrl: "https://learn.neurotechedu.com/introbci_software/"
---
*Mis à jour en novembre 2026 : chaque outil a été vérifié pour ses versions récentes, OpenEXP est indiqué comme archivé, et les principaux outils libres d'ICM et d'EEG qu'un débutant devrait connaître aujourd'hui ont été ajoutés.*


Cette leçon compte deux parties. La première porte sur les logiciels qui servent à mener des expériences et à présenter des stimuli. La seconde présente les outils libres que la plupart des gens utilisent aujourd'hui pour diffuser, analyser et décoder l'EEG.

### Logiciels d'expérimentation et de présentation de stimuli

#### **PsychoPy**

[Psychopy](http://www.psychopy.org/about/index.html) est une application Python libre (licence GPLv2) qui sert à construire des expériences. On l'utilise souvent dans les laboratoires de psychologie ou de neurosciences cognitives comme solution de rechange au logiciel propriétaire E-Prime. Comme il est écrit en Python, il est multiplateforme, et les scripts fonctionnent généralement sous macOS, Windows et Linux sans ajustement. Il permet de mesurer le temps en nombre d'images affichées, ce qui, [selon ses auteurs](http://www.psychopy.org/coder/codeStimuli.html#timing), est plus précis qu'une mesure avec une horloge. Il comprend une interface pour [écrire le code](https://www.psychopy.org/coder/index.html) des expériences :

![Interface de code de PsychoPy](/learn/images/introbcisoftware/Psychopy-sample.png)

Et une [interface visuelle](https://www.psychopy.org/builder/index.html) pour créer des expériences en déplaçant des blocs :

![Interface visuelle de PsychoPy](/learn/images/introbcisoftware/psychopy_vis.png)

PsychoPy est activement maintenu et publie plusieurs versions par année. Consultez le [site de PsychoPy](https://www.psychopy.org/) pour les téléchargements et la documentation.

#### **Pygame**

[Pygame](https://web.archive.org/web/20200101032137/https://www.pygame.org/wiki/about) est une bibliothèque Python libre (licence LGPL) qui sert à créer des jeux. Comme elle est simple, certains laboratoires l'utilisent aussi pour construire des expériences. Puisqu'elle vise un large public, elle offre une bonne série de tutoriels et une bonne [documentation](https://www.pygame.org/docs/). Elle a moins de dépendances que PsychoPy et s'installe généralement plus facilement. Elle donne parfois aussi un meilleur contrôle sur ce qui s'affiche. Par contre, elle n'est pas conçue pour les expériences, et vous devrez peut-être écrire quelques fonctions utilitaires pour bien vous en servir.

Le projet pygame original publie moins souvent depuis quelques années. Sa dernière version est la 2.6.1, parue en septembre 2024. Beaucoup de développeurs utilisent maintenant [pygame-ce](https://github.com/pygame-community/pygame-ce) (Community Edition), une bifurcation qui publie des versions régulières et garde la même interface `import pygame`.

![Capture d'écran de Pygame](/learn/images/introbcisoftware/pygame.png)

#### **OpenViBE**

[OpenViBE](http://openvibe.inria.fr/) est une plateforme libre (AGPLv3) conçue spécialement pour les expériences d'ICM. Elle offre une interface visuelle faite de « blocs » qui servent à construire des expériences. On peut étendre ces blocs avec Python, Lua, C++ ou Matlab.

![Interface d'OpenViBE](/learn/images/introbcisoftware/OpenViBE.png)

Comme elle vise le développement d'ICM, elle offre un [soutien complet](http://openvibe.inria.fr/supported-hardware/) pour la diffusion de données EEG provenant de nombreux appareils, et [beaucoup d'algorithmes](http://openvibe.inria.fr/documentation/1.3.0/Doc_BoxAlgorithms.html) propres aux ICM. Elle propose aussi de belles interfaces 3D pour essayer des paradigmes d'ICM, comme soulever un vaisseau spatial par imagerie motrice :

![Interface d'OpenViBE](/learn/images/introbcisoftware/OpenViBE.png)

Ses principaux défauts : son interface peut parfois intimider, et elle n'offre pas de bibliothèque. On ne peut donc pas utiliser OpenViBE sans lancer l'interface complète. Dans l'ensemble, OpenViBE est un excellent outil pour débuter et expérimenter divers paradigmes d'ICM.

OpenViBE est toujours maintenu. La version 3.7.0 est parue en septembre 2025. Téléchargez la version actuelle sur la [page de téléchargement d'OpenViBE](https://openvibe.inria.fr/downloads/).

#### **OpenEXP**

[OpenEXP](https://github.com/openexp/OpenEXP) est une application de bureau libre (licence MIT) qui sert à mener des expériences et à recueillir des données comportementales et physiologiques. Elle a été développée par [des membres clés de NeuroTechX](https://github.com/openexp/OpenEXP/graphs/contributors), mais n'a jamais dépassé le stade alpha.

**État (2026) :** le dépôt d'OpenEXP a été archivé en 2021 et n'est plus développé. Utilisez-le seulement comme référence. Pour des expériences dans le navigateur, utilisez directement [jsPsych](https://github.com/jspsych/jsPsych), qui est activement maintenu.

![Interface d'OpenEXP](/learn/images/introbcisoftware/OPENEXP.png)

Elle repose sur jsPsych et est écrite en JavaScript. Elle pouvait donc fonctionner dans un navigateur Web pour recueillir des données à grande échelle.

#### **Psychtoolbox**

[Psychtoolbox](http://psychtoolbox.org/) est un ensemble libre (licence MIT) de fonctions pour mener des expériences de psychophysique dans Matlab ou Octave. Il offre beaucoup de [tutoriels](http://peterscarfe.com/ptbtutorials.html) axés sur la psychophysique et une [FAQ](https://github.com/Psychtoolbox-3/Psychtoolbox-3/wiki/FAQ) complète.

Il peut produire à peu près n'importe quel stimulus visuel, textuel ou sonore dont vous pourriez avoir besoin en psychophysique, comme un ensemble de [cubes 3D en rotation :](https://web.archive.org/web/20191217223456/http://peterscarfe.com:80/rotatingcubesdemo.html)

![Cubes 3D en rotation dans Psychtoolbox](/learn/images/introbcisoftware/psychtoolbox.png)

Les fonctions offertes sont parfois proches du pipeline graphique. Il faut donc parfois définir des textures ou demander explicitement l'anticrénelage. En revanche, cela donne plus de contrôle.

Psychtoolbox est toujours maintenu. Notez que son modèle de licence a changé : les versions récentes exigent une clé de licence payante pour la plupart des configurations, alors que la version pour GNU Octave sous Linux reste gratuite. Consultez la [FAQ sur les clés de licence](https://github.com/Psychtoolbox-3/Psychtoolbox-3/wiki/FAQ#faqs-for-software-license-keys) pour plus de détails.

### Principaux outils libres pour l'EEG et les ICM (2026)

Ces outils sont gratuits et libres, et ont eu des versions ou un développement actif en 2025 ou en 2026. La plupart sont écrits en Python et fonctionnent ensemble.

#### Diffusion et acquisition

- [Lab Streaming Layer (LSL)](https://labstreaminglayer.org/) diffuse des séries temporelles, comme l'EEG et des marqueurs d'événements, sur un réseau local et garde les flux synchronisés dans le temps. Beaucoup d'appareils et de programmes EEG, dont OpenViBE et [muse-lsl](https://github.com/alexandrebarachant/muse-lsl), peuvent envoyer ou recevoir des flux LSL. Le code se trouve sur [GitHub](https://github.com/sccn/labstreaminglayer).
- [BrainFlow](https://brainflow.org/) est une bibliothèque qui offre une seule API pour lire les données de nombreuses cartes de biocapteurs, dont OpenBCI et Muse. Elle propose des liaisons pour Python, C++, Java, C# et d'autres langages. Consultez la [documentation de BrainFlow](https://brainflow.readthedocs.io/).
- [Timeflux](https://timeflux.io/) est un cadriciel Python pour acquérir et traiter des biosignaux en temps réel, par exemple pour créer de la neurorétroaction en boucle fermée. Sa dernière version est la 0.17.2, parue en décembre 2024. Vérifiez donc l'activité du [dépôt](https://github.com/timeflux/timeflux) avant d'en dépendre.

#### Analyse

- [MNE-Python](https://mne.tools/) est la bibliothèque Python de référence pour explorer, visualiser et analyser des données EEG et MEG. Elle couvre le filtrage, le découpage en époques, les PE, l'analyse temps-fréquence et la localisation de sources. Les [tutoriels de MNE](https://mne.tools/stable/auto_tutorials/index.html) sont un bon point de départ.

#### Décodage et évaluation comparative

- [pyRiemann](https://pyriemann.readthedocs.io/) offre des méthodes d'apprentissage automatique fondées sur la géométrie riemannienne des matrices de covariance. Ces méthodes sont très utilisées pour décoder l'imagerie motrice et les PE. Elle suit l'API de scikit-learn.
- [Braindecode](https://braindecode.org/) est une boîte à outils d'apprentissage profond pour décoder l'EEG brut, construite sur PyTorch. Elle comprend des architectures de réseaux courantes pour l'EEG et des chargeurs de données.
- [MOABB](https://github.com/NeuroTechX/moabb) (Mother of All BCI Benchmarks) est un projet de NeuroTechX. Il offre une interface commune à des dizaines de jeux de données publics d'ICM et une façon standard d'évaluer et de comparer des pipelines de décodage. Consultez la [documentation de MOABB](https://moabb.neurotechx.com/docs/index.html).

#### Expériences avec un EEG à faible coût

- [EEG-ExPy](https://github.com/NeuroTechX/EEG-ExPy) est un projet de NeuroTechX, autrefois appelé eeg-notebooks. C'est une collection d'expériences EEG classiques en Python, comme N170, P300 et SSVEP, conçues pour du matériel grand public comme le Muse et l'OpenBCI Cyton. Il gère la diffusion, la présentation des stimuli et l'analyse. Consultez la [documentation d'EEG-ExPy](https://neurotechx.github.io/EEG-ExPy/).

#### Plateformes d'ICM complètes

- [OpenViBE](https://openvibe.inria.fr/) (décrite plus haut) est une plateforme graphique pour concevoir et exécuter des scénarios d'ICM.
- [BCI2000](https://www.bci2000.org/) est un système de recherche en ICM polyvalent écrit en C++. Beaucoup de laboratoires de recherche l'utilisent depuis 2000. Il prend en charge un large éventail de matériel d'acquisition et de paradigmes d'ICM. Consultez le [wiki de BCI2000](https://www.bci2000.org/mediawiki/index.php/Main_Page) pour la documentation.
