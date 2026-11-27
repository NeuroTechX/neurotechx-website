---
title: "Casques EEG grand public"
description: "Le choix d'un casque dépend de l'usage que vous voulez en faire. La réponse dépend de votre budget, de vos intérêts, de votre idée de projet et du nombre d'électrodes nécessaires. Avant d'acheter un casque, pensez à votre expérience en programmation et à votre idée de projet."
module: bci
sourceUrl: "https://learn.neurotechedu.com/headsets/"
---
*Mis à jour en novembre 2026 : les caractéristiques et les prix des appareils ont été vérifiés sur les pages des fabricants, les modèles abandonnés ont été remplacés par des modèles actuels, et de nouveaux appareils et outils logiciels ont été ajoutés.*

## Ce qu'il faut regarder dans un casque

Pour choisir quel casque EEG acheter, quelques caractéristiques méritent votre attention.

### Nombre et position des électrodes :

Selon le type de réponse cérébrale que vous voulez mesurer, votre système peut avoir besoin d'un nombre minimal d'électrodes. Mesurer le niveau de détente est facile avec 1 ou 2 électrodes, mais mesurer d'autres activités cérébrales peut être difficile. La plupart des articles sur l'EEG indiquent de quelle région du cerveau venait la réponse forte.

De plus, beaucoup d'EEG grand public ont des électrodes rigides qu'on ne peut pas déplacer. Si vous voulez mesurer l'[imagerie motrice](https://en.wikipedia.org/wiki/Motor_imagery) avec le Muse, vous n'aurez pas beaucoup de succès. Un OpenBCI serait un meilleur choix, puisqu'il vous permet de placer les électrodes où vous voulez.

**Référence et plus d'information**

[Guide EEG 101 d'iMotions](https://imotions.com/blog/learning/best-practice/eeg/)

### Fréquence d'échantillonnage :

La fréquence d'échantillonnage d'un EEG est le nombre d'échantillons par seconde que votre appareil peut fournir. Les appareils grand public vont d'environ 128 à 512 échantillons par seconde, et certains systèmes de recherche vont beaucoup plus haut. Pour capter une fréquence, votre fréquence d'échantillonnage doit être plus du double de cette fréquence (la règle de Nyquist). En pratique, visez au moins 2,5 fois la plus haute fréquence que vous voulez étudier.

**Référence et plus d'information**

[Ce tutoriel sur l'EEG donne plus de détails sur la fréquence d'échantillonnage](http://www.ebme.co.uk/articles/clinical-engineering/56-introduction-to-eeg)

### Bits du CAN :

Pour faire simple, le nombre de bits du convertisseur analogique-numérique (CAN) correspond à la résolution du signal. Le nombre de bits est important pour estimer la tension avec précision, mais plus de bits ne veut pas forcément dire des données de meilleure qualité. Pour donner une idée de ce que cela donne avec des données EEG, disons que votre système a un CAN de 2 bits et que vous voulez mesurer un signal entre 0 et 10 volts. Votre ordinateur représenterait alors les données de la façon suivante :

| Tension | Représentation numérique sur 2 bits |
| --- | --- |
| 0-2,5 | 00 |
| 2,5-5,0 | 01 |
| 5,0-7,5 | 10 |
| 7,5-10,0 | 11 |

**Référence et plus d'information**

[Que veut dire une résolution de 12 ou 16 bits?](https://labjack.com/blogs/faq/what-does-12-or-16-bit-resolution-mean) [Quels sont les avantages d'un système à 24 bits?](https://www.biosemi.com/faq/24bitsystem.htm)

### Accès aux données et logiciels :

Avant d'acheter un appareil, vérifiez comment vous pourrez en extraire les données brutes. Certains fabricants donnent un accès gratuit à l'EEG brut. D'autres le vendent sous forme de licence logicielle distincte. Deux outils gratuits à code source ouvert fonctionnent avec plusieurs des appareils ci-dessous :

-   [Lab Streaming Layer (LSL)](https://labstreaminglayer.org/) diffuse et synchronise dans le temps les données de nombreux appareils.
-   [BrainFlow](https://brainflow.org/) est une seule bibliothèque pour lire de nombreuses cartes. Consultez sa [liste des cartes prises en charge](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html).

## Appareils

Les prix ci-dessous sont les prix courants américains des fabricants en novembre 2026. Les prix changent souvent : vérifiez la page du fabricant avant d'acheter.

### Muse

* * *

Muse est un appareil EEG fabriqué par Interaxon, une entreprise de Toronto, et conçu pour la méditation. Il a 4 canaux EEG, placés en TP9, AF7, AF8 et TP10 selon le système international 10-20, avec une référence en FPz. C'est l'un des bandeaux les plus faciles pour commencer si vous voulez apprendre l'EEG, puisqu'il ne demande aucune préparation de la tête.

Deux modèles sont vendus actuellement :

-   **Muse 2** : EEG plus capteurs de fréquence cardiaque (PPG) et de mouvement.
-   **Muse S Athena** : un bandeau avec EEG plus fNIRS, un capteur optique qui mesure l'oxygène du sang au niveau du front.

Les deux sont offerts sur la [boutique Muse](https://choosemuse.com/).

Les anciens modèles (le Muse original, le Muse 2016 et les premières versions du Muse S) ne figurent plus sur la page d'accueil de la boutique Muse.

![Casque Muse](/learn/images/muse-white.png)

##### Caractéristiques :

-   4 canaux EEG
-   Position fixe des électrodes (TP9, AF7, AF8, TP10)
-   Électrodes sèches
-   Fréquence d'échantillonnage de 256 Hz
-   12 bits (Muse 2), 14 bits (Muse S Athena)
-   SDK pour iOS, Android, Windows et macOS, sous licence pour le prototypage et les projets personnels. L'usage commercial demande une licence distincte, et Muse demande aux chercheurs de la contacter pour obtenir des outils de recherche. Consultez la [page des développeurs de Muse](https://choosemuse.com/pages/developers).

##### Paradigmes EEG connus enregistrables :

-   Niveau de « détente »
-   Niveaux de « concentration »
-   Asymétrie frontale
-   P300

**Prix américain (novembre 2026) :** Muse 2 : $249.99. Muse S Athena : $474.99.

### OpenBCI

* * *

L'OpenBCI est un EEG à code source ouvert qui peut aller jusqu'à 16 canaux. C'était à l'origine un projet Kickstarter de 2013, mais le concept s'est élargi pour inclure un casque à code source ouvert imprimé en 3D, l'Ultracortex. Une carte à 4 canaux est aussi offerte si vous cherchez quelque chose de moins cher.

Cartes actuelles :

-   **Ganglion** : 4 canaux, Bluetooth Low Energy. Fréquence d'échantillonnage par défaut de 200 Hz. [Caractéristiques](https://docs.openbci.com/Ganglion/GanglionSpecs/)
-   **Cyton** : 8 canaux, puce ADS1299 à 24 bits, 250 Hz, fente pour carte micro SD. [Caractéristiques](https://docs.openbci.com/Cyton/CytonSpecs/)
-   **Cyton + Daisy** : 16 canaux. Par la clé sans fil, les données des 16 canaux arrivent à 125 Hz.
-   **Galea** : un casque de recherche multicapteur. Il coûte beaucoup plus cher que les cartes.

![Casque OpenBCI](/learn/images/openBCI.png)

##### Caractéristiques :

-   4, 8 ou 16 canaux
-   Position flexible des électrodes
-   Compatible avec les électrodes sèches et humides
-   Fréquences d'échantillonnage par défaut de 200 Hz (Ganglion), 250 Hz (Cyton) et 125 Hz (Cyton + Daisy). Consultez la [FAQ matérielle d'OpenBCI](https://docs.openbci.com/FAQ/HardFAQ/).
-   24 bits
-   Accéléromètre 3 axes
-   Logiciel et matériel à code source ouvert

##### Paradigmes EEG connus enregistrables :

Tout paradigme qui demande 16 canaux ou moins

**Prix américain (novembre 2026, selon la [boutique OpenBCI](https://shop.openbci.com/)) :**
Ganglion : $624.99. Cyton : $1,249. Cyton + Daisy : $2,499. Casque Ultracortex Mark IV : à partir de $499.99. Galea : $42,980.

### Emotiv EPOC X

* * *

L'Emotiv EPOC est l'un des premiers appareils EEG grand public mis sur le marché. La popularité de l'entreprise a bondi en 2012 et 2013, comme le montrent ses ventes et le nombre de projets maison. L'EPOC original et l'EPOC+ ne sont plus vendus. Le modèle actuel à 14 canaux est l'EPOC X.

L'EPOC a plus de style et se porte plus facilement. Il a un EEG à 14 canaux dans un format fixe. Cette carte est une bonne option pour développer facilement et ne demande que de l'expérience en logiciel. C'est un appareil populaire pour la recherche en EEG, puisque son coût est bien plus bas que celui des autres fournisseurs d'EEG mobiles de qualité recherche. Il est toutefois moins économique que d'autres casques commerciaux. Le logiciel d'Emotiv n'est pas inclus avec l'EPOC X, l'Insight ou le Flex. Enregistrer et exporter l'EEG brut, ou le lire à partir de votre propre code, demande une licence Emotiv payante. Une offre gratuite permet de voir l'EEG brut, mais pas de l'exporter. Consultez [quels logiciels sont inclus](https://www.emotiv.com/knowledge-base/is-software-included-when-you-purchase-emotiv-eeg-headset) et [ce que permet l'offre gratuite](https://www.emotiv.com/knowledge-base/pro-lite-capabilities).

![Casque Emotiv](/learn/images/emotiv_epoc_600.png)

##### Caractéristiques

-   14 canaux
-   Position rigide des électrodes (AF3, F7, F3, FC5, T7, P7, O1, O2, P8, T8, FC6, F4, F8, AF4)
-   Électrodes humides (demandent de l'eau saline)
-   Fréquence d'échantillonnage de 128 ou 256 Hz (2048 Hz à l'interne, puis sous-échantillonnée)
-   14 bits par défaut, 16 bits en option
-   Capteur de mouvement 9 axes
-   Jusqu'à 9 heures d'autonomie

Source : [caractéristiques techniques de l'EPOC X](https://emotiv.gitbook.io/epoc-x-user-manual/introduction/technical-specifications).

##### Paradigmes EEG connus enregistrables :

Plusieurs paradigmes qui demandent 14 canaux ou moins

**Prix américain (novembre 2026) :** $1,199. [Page du produit](https://www.emotiv.com/epoc-x)

### Emotiv Insight

* * *

L'Emotiv Insight est le deuxième produit qu'Emotiv a mis sur le marché. Il était présenté comme une option plus économique que son premier produit. La version actuelle est la deuxième génération de l'Insight.

![Emotiv Insight](/learn/images/emotiv-insight.png)

##### Caractéristiques

-   5 canaux
-   Position rigide des électrodes (AF3, AF4, T7, T8, Pz)
-   Électrodes semi-sèches en polymère
-   Fréquence d'échantillonnage de 128 Hz
-   16 bits
-   Jusqu'à 20 heures d'autonomie

Source : [caractéristiques techniques de l'Insight](https://emotiv.gitbook.io/insight-2-user-manual/introduction/technical-specifications).

##### Paradigmes EEG connus enregistrables :

Plusieurs paradigmes qui demandent 5 canaux ou moins

**Prix américain (novembre 2026) :** $499, indiqué en rupture de stock (commande en attente). [Page du produit](https://www.emotiv.com/insight)

### Autres appareils Emotiv

* * *

-   **Flex 2.0** : un bonnet à 32 canaux. Vous choisissez la position des électrodes. Il utilise des électrodes avec gel ou solution saline et échantillonne à 128 ou 256 Hz. [Page du produit](https://www.emotiv.com/flex), [caractéristiques](https://emotiv.gitbook.io/flex-2.0-user-manual/introduction/technical-specifications).
-   **MN8** : des écouteurs-boutons avec 2 canaux EEG à 128 Hz. [Page du produit](https://www.emotiv.com/mn8)

### Neurosky Mindwave Mobile 2

* * *

Le NeuroSky est l'un des premiers EEG grand public sur le marché. Sa conception est simple et il n'a qu'un seul canal utilisable. Certaines personnes disent avoir créé des produits plus complexes avec lui. Le modèle actuel est le MindWave Mobile 2. Le site de NeuroSky renvoie à une fiche Amazon pour l'acheter et n'affiche pas de prix.

![Neurosky Mindwave](/learn/images/NeuroskyMindwave.png)

##### Caractéristiques

-   1 canal
-   Position rigide de l'électrode (FP1, sur le front)
-   Électrodes sèches
-   Fréquence d'échantillonnage de 512 Hz
-   12 bits
-   Environ 8 heures avec une pile AAA
-   SDK offert

Source : [page du MindWave Mobile 2](https://neurosky.com/neurosky-products/mindwave-headset/).

##### Paradigmes EEG connus enregistrables :

-   Niveau de « détente »
-   Niveaux de « concentration »

### Neurosity Crown

* * *

Le Crown est un casque à 8 canaux avec des électrodes fixes en CP3, C3, F5, PO3, PO4, F6, C4 et CP4. Il échantillonne à 256 Hz et fait une partie du traitement dans l'appareil. Neurosity fournit des SDK en JavaScript et en Python.

**Prix américain (novembre 2026) :** $1,499. [Page du produit](https://neurosity.co/crown)

### g.tec Unicorn Hybrid Black

* * *

L'Unicorn est un casque à 8 canaux de g.tec, un fabricant autrichien de systèmes EEG de recherche. Ses électrodes peuvent être utilisées sèches ou avec du gel. Il enregistre à 250 Hz sur 24 bits, et la pile dure plus de 3 heures. Selon g.tec, la disposition de ses électrodes convient aux expériences d'imagerie motrice, de P300, de SSVEP et de VEP. [Page du produit](https://www.gtec.at/product/unicorn-hybrid-black-bci-platform/)

### Comparaison des caractéristiques

* * *

Les caractéristiques viennent des pages des fabricants citées plus haut. Les prix sont les prix courants américains en novembre 2026.

| Appareil | Canaux | Électrodes | Bits du CAN | Fréquence d'échantillonnage | Capteurs de mouvement | Autonomie | Coût (US) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Muse 2 | 4 | Sèches, fixes | 12 | 256 Hz | Oui | Environ 5 heures | $249.99 |
| Muse S Athena | 4 (plus fNIRS) | Sèches, fixes | 14 | 256 Hz | Non vérifié | Non vérifié | $474.99 |
| OpenBCI Ganglion | 4 | Au choix | 24 | 200 Hz | 3 axes | Selon la pile | $624.99 |
| OpenBCI Cyton | 8 | Au choix | 24 | 250 Hz | 3 axes | Selon la pile | $1,249 |
| OpenBCI Cyton + Daisy | 16 | Au choix | 24 | 125 Hz | 3 axes | Selon la pile | $2,499 |
| Emotiv EPOC X | 14 | Saline, fixes | 14 ou 16 | 128 ou 256 Hz | 9 axes | Jusqu'à 9 heures | $1,199 |
| Emotiv Insight | 5 | Semi-sèches, fixes | 16 | 128 Hz | 9 axes | Jusqu'à 20 heures | $499 |
| Emotiv Flex 2.0 | 32 | Gel ou saline, au choix | 16 | 128 ou 256 Hz | Non vérifié | Jusqu'à 6 heures | Non indiqué |
| Neurosky MindWave Mobile 2 | 1 | Sèche, fixe | 12 | 512 Hz | S. O. | Environ 8 heures | Non indiqué |
| Neurosity Crown | 8 | Fixes | Non vérifié | 256 Hz | Non vérifié | Non vérifié | $1,499 |
| g.tec Unicorn Hybrid Black | 8 | Sèches ou gel | 24 | 250 Hz | Accéléromètre, gyroscope | Plus de 3 heures | Non vérifié |
