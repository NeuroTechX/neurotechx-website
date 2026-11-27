---
title: "ICM invasives et intracorticales"
description: "Ce qu'enregistrent les électrodes implantées, comment on détecte et trie les potentiels d'action, comment les décodeurs intracorticaux transforment l'activité neuronale en mouvement de curseur ou en texte, et ce qu'on sait de la sécurité et de la durée de vie des implants."
module: bci
sourceUrl: ""
---
*Rédigé en novembre 2026 pour NeuroTechX. La plupart des systèmes décrits ici sont expérimentaux : ils sont utilisés dans des études de recherche et ne sont pas approuvés pour un usage clinique courant.*

## Pourquoi enregistrer à l'intérieur de la tête?

L'EEG mesure des tensions sur le cuir chevelu. Avant d'y arriver, les signaux du cerveau traversent le crâne et la peau, qui les brouillent et les affaiblissent. Des électrodes placées sur le cerveau ou dans le cerveau évitent l'essentiel de ce problème. Elles captent des signaux plus petits, plus rapides et plus locaux. Le prix à payer est une chirurgie et ses risques. [(1)](#références)

Cette leçon présente ce que ces électrodes enregistrent, comment on traite les signaux, comment fonctionnent les décodeurs et ce qu'on sait de la sécurité. Pour les nouvelles des entreprises et la liste actuelle des essais chez l'humain, voyez la leçon [Technologies émergentes](/learn/emerging-technologies).

## Ce que les électrodes enregistrent

Le signal enregistré dépend de l'endroit où se trouve l'électrode et de sa taille. [(1)](#références)

-   **Unités isolées.** Une pointe d'électrode fine, près d'un neurone, enregistre ses potentiels d'action (les « spikes ») sous forme de brèves variations de tension d'environ 1 ms. Si on arrive à distinguer les potentiels d'action d'un neurone de ceux de ses voisins, ce neurone est une « unité isolée ».
-   **Activité multi-unitaire (MUA).** Les potentiels d'action de plusieurs neurones voisins qu'on ne peut pas séparer. On compte souvent la MUA comme des franchissements de seuil (voir plus bas).
-   **Potentiels de champ locaux (LFP).** La partie lente du même enregistrement (sous quelques centaines de hertz). Le LFP reflète surtout les courants synaptiques additionnés de nombreux neurones autour de la pointe.
-   **Électrocorticographie (ECoG).** Des électrodes en forme de disque, posées à la surface du cerveau, enregistrent des potentiels de champ additionnés sur une plus grande surface. L'ECoG ne distingue pas les neurones individuels, mais sa résolution spatiale et la qualité de son signal sont bien meilleures que celles de l'EEG.

### Types d'électrodes courants

-   **Matrice de Utah.** Un petit carré de silicium portant une grille de 10 x 10 aiguilles qui pénètrent d'environ 1 à 1,5 mm dans le cortex. Elle enregistre des unités isolées, de la MUA et des LFP. [(2)](#références) C'est la principale électrode des études universitaires chez l'humain comme BrainGate depuis le premier participant en 2004. [(3)](#références) Une matrice de Utah a besoin d'un fil qui traverse le crâne. Dans la plupart des études chez l'humain jusqu'ici, c'est un connecteur (piédestal) qui traverse la peau.
-   **Stéréo-EEG (SEEG).** De minces électrodes de profondeur, avec plusieurs contacts sur leur longueur, insérées par de petits trous dans le crâne. En clinique, elles servent à localiser l'origine des crises chez les personnes épileptiques. Comme ces patients portent déjà des électrodes pendant une à deux semaines, beaucoup d'études de recherche en ICM se font avec eux. La SEEG atteint des structures profondes que l'ECoG ne peut pas atteindre. [(4)](#références)
-   **Matrices de surface en couche mince.** Des feuilles souples couvertes de nombreux petits contacts, posées à la surface du cerveau. Les grilles d'ECoG à haute densité en sont un exemple. L'étude sur la parole de Metzger et ses collègues utilisait une matrice de surface à haute densité. [(5)](#références)
-   **Électrodes endovasculaires.** Le Stentrode est un stent muni d'électrodes. On le guide par la veine jugulaire jusqu'au sinus sagittal supérieur, une grosse veine située à côté du cortex moteur, ce qui évite une chirurgie à crâne ouvert. Il a d'abord été testé chez le mouton. [(6)](#références) Une étude australienne chez 4 patients n'a rapporté aucun événement indésirable grave lié au dispositif après 12 mois. [(7)](#références) Ses signaux ressemblent davantage à de l'ECoG qu'à des unités isolées.

## Détection et tri des potentiels d'action

Le signal brut d'une électrode pénétrante est habituellement échantillonné à environ 30 kHz. Une chaîne de traitement typique :

1.  **Filtre passe-haut** (par exemple au-dessus de 250 Hz) pour retirer le LFP et garder la bande des potentiels d'action.
2.  **Détection** là où la tension franchit un seuil. Un choix courant est un seuil négatif de quelques fois la valeur efficace (RMS) du bruit du canal, souvent entre -3 et -4,5 x RMS. [(8)](#références)
3.  **Tri des potentiels d'action** (« spike sorting », optionnel). On découpe une courte forme d'onde autour de chaque événement détecté, on décrit sa forme avec quelques caractéristiques (par exemple des composantes principales ou des coefficients d'ondelettes), puis on regroupe les formes d'onde pour que chaque groupe corresponde à un neurone présumé. [(9)](#références) Des outils récents comme Kilosort, et des cadres comme SpikeInterface qui font tourner plusieurs trieurs avec la même interface, automatisent une bonne partie du travail pour les sondes denses. [(10, 11)](#références)

Beaucoup d'ICM sautent l'étape 3. Elles comptent les franchissements de seuil par électrode dans de courtes fenêtres de temps (souvent 10 à 20 ms) et décodent à partir de ces comptes. Chez des singes porteurs de matrices de Utah, décoder à partir des franchissements de seuil ne faisait perdre qu'un peu de performance par rapport aux unités triées. [(8)](#références) Les franchissements de seuil restent aussi utilisables quand les neurones dérivent et qu'on ne peut plus les isoler, ce qui compte pour les implants à long terme. Les analyses à l'échelle de la population peuvent aussi être exactes sans tri. [(12)](#références)

## Comment fonctionnent les décodeurs intracorticaux

Un décodeur associe des caractéristiques neuronales regroupées dans le temps (par exemple des comptes de potentiels d'action sur 96 canaux ou plus) à une sortie : la vitesse d'un curseur, une commande de bras robotisé, une lettre ou un mot.

### Décodeurs linéaires et filtre de Kalman

Les décodeurs les plus simples sont linéaires : la sortie est une somme pondérée des taux de décharge, et les poids sont ajustés par régression sur des données d'étalonnage. C'est ainsi que le premier participant de BrainGate a déplacé un curseur à l'écran. [(3)](#références)

Un **filtre de Kalman** ajoute un modèle de l'évolution du mouvement lui-même. Il garde une estimation à jour de l'état du curseur (position, vitesse), prédit l'état suivant, puis corrige cette prédiction avec les nouvelles données neuronales. Il suppose des relations linéaires et un bruit gaussien. Dans les premiers travaux chez le singe, il donnait des estimations plus lisses et plus exactes que de simples filtres linéaires. [(13)](#références)

La façon d'entraîner le décodeur compte autant que le choix du décodeur. Avec ReFIT, le filtre de Kalman est réentraîné sur des données en boucle fermée, en supposant que l'utilisateur voulait toujours se diriger vers la cible. Chez le singe, cela a réduit de moitié le temps pour atteindre les cibles par rapport aux décodeurs précédents. [(14)](#références) Ce type de contrôle de curseur par filtre de Kalman a permis à trois personnes paralysées de taper du texte en pointant et en cliquant. [(15)](#références) D'autres études ont utilisé des décodeurs de la même famille pour contrôler un bras robotisé à plusieurs degrés de liberté. [(16, 17)](#références)

### Décodeurs à réseaux de neurones récurrents

Les réseaux de neurones récurrents (RNN) peuvent apprendre des relations non linéaires et dépendantes du temps entre l'activité neuronale et la sortie. Chez le singe, un des premiers décodeurs RNN en boucle fermée atteignait les cibles plus vite qu'un filtre de Kalman de vitesse. [(18)](#références) Les RNN sont maintenant la norme pour décoder des séquences : une étude a transformé en texte l'écriture manuscrite tentée, lettre par lettre. [(19)](#références) Les RNN sont aussi au cœur des décodeurs de la parole présentés plus bas.

## Neuroprothèses de la parole

Les systèmes de décodage de la parole ont habituellement deux étapes. Un réseau de neurones transforme l'activité neuronale en probabilités de sons (phonèmes) ou de mots. Un modèle de langage choisit ensuite la phrase la plus probable. Les résultats viennent jusqu'ici d'un seul participant ou de très petits groupes, et ces systèmes ont besoin de personnel formé pour fonctionner.

-   **Moses et coll. 2021.** Une personne atteinte d'anarthrie à la suite d'un AVC du tronc cérébral a utilisé une matrice d'ECoG à haute densité pour produire des phrases à partir d'un vocabulaire de 50 mots. [(20)](#références)
-   **Willett et coll. 2023.** Une personne atteinte de SLA portait des matrices de microélectrodes intracorticales dans le cortex moteur de la parole. Le taux d'erreur sur les mots était de 9,1 % avec un vocabulaire de 50 mots et de 23,8 % avec un vocabulaire de 125 000 mots, à 62 mots par minute. [(21)](#références)
-   **Metzger et coll. 2023.** Une personne atteinte d'une paralysie grave des membres et de la voix utilisait une matrice de surface à haute densité. Le décodage en texte de la parole silencieuse tentée a atteint une médiane de 78 mots par minute, avec un taux d'erreur médian de 25 %. Le système produisait aussi une voix de synthèse et animait un avatar facial. [(5)](#références)
-   **Card et coll. 2024.** Un homme atteint de SLA portait quatre matrices (256 électrodes). Le premier jour d'utilisation, après 30 minutes d'enregistrements d'étalonnage, l'exactitude était de 99,6 % avec un vocabulaire de 50 mots. Avec un vocabulaire de 125 000 mots, elle était de 97,5 % et s'est maintenue sur 8,4 mois. Il s'en est servi pendant plus de 248 heures de conversation, à environ 32 mots par minute. [(22)](#références)

Une conversation naturelle avance à environ 160 mots par minute. [(21)](#références) Les taux d'erreur sont mesurés sur des phrases proposées et dans des conditions précises : on ne peut donc pas comparer directement les chiffres d'une étude à l'autre.

## Sécurité et durée de vie

**Sécurité.** Le plus grand rapport de sécurité à ce jour porte sur 14 participants de BrainGate implantés entre 2004 et 2021, avec une durée moyenne d'implantation de 872 jours (12 203 jours-implant au total). On a relevé 68 événements indésirables liés au dispositif, dont 6 graves. Le plus fréquent était une irritation de la peau autour du piédestal. Il n'y a eu aucune infection intracrânienne, aucun événement qui a obligé à retirer le dispositif, et aucun décès ni aucune hausse permanente de l'incapacité liés au dispositif. [(23)](#références) Ces données viennent d'un petit groupe sélectionné. Elles ne renseignent ni sur les risques rares ni sur les autres dispositifs.

**Durée de vie.** Les enregistrements changent avec le temps. Chez des utilisateurs humains d'ICM, certains neurones ont pu être enregistrés pendant des semaines ou des mois, alors que d'autres changeaient en une journée. [(24)](#références) Dans une revue de 78 matrices de Utah chez 27 singes, la durée médiane d'enregistrement était de 182 jours, et la plus longue d'environ 5,75 ans. La plupart des pannes complètes survenues la première année étaient mécaniques, surtout des problèmes de connecteur. Parmi les pannes biologiques, il y avait une réaction des tissus qui décollait la matrice du cerveau. [(25)](#références) Il faut donc réétalonner les décodeurs ou les rendre robustes à ces changements, ce qui explique en partie la popularité des franchissements de seuil.

## Éthique

Les ICM implantées soulèvent des questions que les ICM non invasives ne posent pas : le risque chirurgical, qui entretient ou retire un dispositif quand une étude ou une entreprise prend fin, et l'accès pour les personnes qui ne participent pas à un essai. Voyez la page [Sécurité et éthique](/safety-and-ethics).

## Références

1.  Buzsáki G, Anastassiou CA, Koch C. The origin of extracellular fields and currents: EEG, ECoG, LFP and spikes. *Nature Reviews Neuroscience* 13, 407–420 (2012). [doi:10.1038/nrn3241](https://doi.org/10.1038/nrn3241)
2.  Maynard EM, Nordhausen CT, Normann RA. The Utah intracortical electrode array: a recording structure for potential brain-computer interfaces. *Electroencephalography and Clinical Neurophysiology* 102, 228–239 (1997). [doi:10.1016/S0013-4694(96)95176-0](https://doi.org/10.1016/S0013-4694(96)95176-0)
3.  Hochberg LR et coll. Neuronal ensemble control of prosthetic devices by a human with tetraplegia. *Nature* 442, 164–171 (2006). [doi:10.1038/nature04970](https://doi.org/10.1038/nature04970)
4.  Herff C, Krusienski DJ, Kubben P. The potential of stereotactic-EEG for brain-computer interfaces: current progress and future directions. *Frontiers in Neuroscience* 14, 123 (2020). [doi:10.3389/fnins.2020.00123](https://doi.org/10.3389/fnins.2020.00123)
5.  Metzger SL et coll. A high-performance neuroprosthesis for speech decoding and avatar control. *Nature* 620, 1037–1046 (2023). [doi:10.1038/s41586-023-06443-4](https://doi.org/10.1038/s41586-023-06443-4)
6.  Oxley TJ et coll. Minimally invasive endovascular stent-electrode array for high-fidelity, chronic recordings of cortical neural activity. *Nature Biotechnology* 34, 320–327 (2016). [doi:10.1038/nbt.3428](https://doi.org/10.1038/nbt.3428)
7.  Mitchell P et coll. Assessment of safety of a fully implanted endovascular brain-computer interface for severe paralysis in 4 patients: the Stentrode with Thought-Controlled Digital Switch (SWITCH) study. *JAMA Neurology* 80, 270–278 (2023). [doi:10.1001/jamaneurol.2022.4847](https://doi.org/10.1001/jamaneurol.2022.4847)
8.  Christie BP et coll. Comparison of spike sorting and thresholding of voltage waveforms for intracortical brain-machine interface performance. *Journal of Neural Engineering* 12, 016009 (2015). [doi:10.1088/1741-2560/12/1/016009](https://doi.org/10.1088/1741-2560/12/1/016009)
9.  Quiroga RQ, Nadasdy Z, Ben-Shaul Y. Unsupervised spike detection and sorting with wavelets and superparamagnetic clustering. *Neural Computation* 16, 1661–1687 (2004). [doi:10.1162/089976604774201631](https://doi.org/10.1162/089976604774201631)
10. Pachitariu M, Sridhar S, Pennington J, Stringer C. Spike sorting with Kilosort4. *Nature Methods* 21, 914–921 (2024). [doi:10.1038/s41592-024-02232-7](https://doi.org/10.1038/s41592-024-02232-7). Code : [github.com/MouseLand/Kilosort](https://github.com/MouseLand/Kilosort)
11. Buccino AP et coll. SpikeInterface, a unified framework for spike sorting. *eLife* 9, e61834 (2020). [doi:10.7554/eLife.61834](https://doi.org/10.7554/eLife.61834). Documentation : [spikeinterface.readthedocs.io](https://spikeinterface.readthedocs.io/)
12. Trautmann EM et coll. Accurate estimation of neural population dynamics without spike sorting. *Neuron* 103, 292–308 (2019). [doi:10.1016/j.neuron.2019.05.003](https://doi.org/10.1016/j.neuron.2019.05.003)
13. Wu W et coll. Bayesian population decoding of motor cortical activity using a Kalman filter. *Neural Computation* 18, 80–118 (2006). [doi:10.1162/089976606774841585](https://doi.org/10.1162/089976606774841585)
14. Gilja V et coll. A high-performance neural prosthesis enabled by control algorithm design. *Nature Neuroscience* 15, 1752–1757 (2012). [doi:10.1038/nn.3265](https://doi.org/10.1038/nn.3265)
15. Pandarinath C et coll. High performance communication by people with paralysis using an intracortical brain-computer interface. *eLife* 6, e18554 (2017). [doi:10.7554/eLife.18554](https://doi.org/10.7554/eLife.18554)
16. Hochberg LR et coll. Reach and grasp by people with tetraplegia using a neurally controlled robotic arm. *Nature* 485, 372–375 (2012). [doi:10.1038/nature11076](https://doi.org/10.1038/nature11076)
17. Collinger JL et coll. High-performance neuroprosthetic control by an individual with tetraplegia. *The Lancet* 381, 557–564 (2013). [doi:10.1016/S0140-6736(12)61816-9](https://doi.org/10.1016/S0140-6736(12)61816-9)
18. Sussillo D et coll. A recurrent neural network for closed-loop intracortical brain-machine interface decoders. *Journal of Neural Engineering* 9, 026027 (2012). [doi:10.1088/1741-2560/9/2/026027](https://doi.org/10.1088/1741-2560/9/2/026027)
19. Willett FR et coll. High-performance brain-to-text communication via handwriting. *Nature* 593, 249–254 (2021). [doi:10.1038/s41586-021-03506-2](https://doi.org/10.1038/s41586-021-03506-2)
20. Moses DA et coll. Neuroprosthesis for decoding speech in a paralyzed person with anarthria. *New England Journal of Medicine* 385, 217–227 (2021). [doi:10.1056/NEJMoa2027540](https://doi.org/10.1056/NEJMoa2027540)
21. Willett FR et coll. A high-performance speech neuroprosthesis. *Nature* 620, 1031–1036 (2023). [doi:10.1038/s41586-023-06377-x](https://doi.org/10.1038/s41586-023-06377-x)
22. Card NS et coll. An accurate and rapidly calibrating speech neuroprosthesis. *New England Journal of Medicine* 391, 609–618 (2024). [doi:10.1056/NEJMoa2314132](https://doi.org/10.1056/NEJMoa2314132)
23. Rubin DB et coll. Interim safety profile from the feasibility study of the BrainGate Neural Interface System. *Neurology* 100, e1177–e1192 (2023). [doi:10.1212/WNL.0000000000201707](https://doi.org/10.1212/WNL.0000000000201707)
24. Downey JE et coll. Intracortical recording stability in human brain-computer interface users. *Journal of Neural Engineering* 15, 046016 (2018). [doi:10.1088/1741-2552/aab7a0](https://doi.org/10.1088/1741-2552/aab7a0)
25. Barrese JC et coll. Failure mode analysis of silicon-based intracortical microelectrode arrays in non-human primates. *Journal of Neural Engineering* 10, 066014 (2013). [doi:10.1088/1741-2560/10/6/066014](https://doi.org/10.1088/1741-2560/10/6/066014)
