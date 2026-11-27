---
title: "Introduction aux interfaces cerveau-machine"
description: "Dans ce module, vous apprendrez les bases des interfaces cerveau-machine. Vous lirez une introduction aux différentes technologies offertes, aux principales composantes et étapes d'une ICM, aux enjeux de sécurité et d'éthique, ainsi qu'un survol de l'avenir du domaine."
module: bci
sourceUrl: "https://learn.neurotechedu.com/introtobci/"
---
## Quelle est la définition

Les interfaces cerveau-machine (ICM) sont des systèmes qui permettent la communication entre le cerveau et diverses machines.

Elles fonctionnent en trois grandes étapes : recueillir les signaux du cerveau, les interpréter, puis envoyer des commandes à une machine branchée selon le signal reçu. Les ICM peuvent servir à plusieurs tâches, entre autres la [neurorétroaction](https://en.wikipedia.org/wiki/Neurofeedback), le rétablissement de la fonction motrice chez des patients paralysés, la communication avec des patients atteints du syndrome d'enfermement et l'amélioration du traitement sensoriel. On peut classer les ICM en trois catégories selon la méthode utilisée pour recueillir les signaux du cerveau.

## Quels sont les types d'ICM

Il existe de nombreuses techniques pour mesurer les signaux du cerveau.

On peut les diviser en techniques non invasives, semi-invasives et invasives.

|  |  |  |
| --- | --- | --- |
| **Non invasive** | Les capteurs sont placés sur le cuir chevelu pour mesurer les potentiels électriques produits par le cerveau (EEG) ou le champ magnétique (MEG). | ![Casque Emotiv](/learn/images/introtobci/emotiv_epoc_large.jpg) |
| **Semi-invasive** | Les électrodes sont placées sur la surface exposée du cerveau (ECoG). | ![ECoG](/learn/images/introtobci/ecog.png) |
| **Invasive** | Les microélectrodes sont placées directement dans le cortex et mesurent l'activité d'un seul neurone. | ![Matrice de l'Utah](/learn/images/introtobci/Utah_array.jpg) |

L'image suivante montre les différentes couches du cerveau et l'endroit où le signal est capté.

![Couches du cerveau et source du signal](/learn/images/introtobci/layers.png)

**Non invasive** : le signal EEG est capté par des électrodes placées sur le cuir chevelu, donc sur la partie la plus externe.

**Semi-invasive** : le signal ECoG est capté par des électrodes placées dans la dure-mère ou dans l'arachnoïde.

**Invasive** : le signal intraparenchymateux est capté par des électrodes implantées directement dans le cortex.

### Invasive

Les ICM invasives sont implantées directement dans le cerveau lors d'une neurochirurgie. Il existe des ICM **unitaires**, qui détectent le signal d'une seule zone de cellules cérébrales, et des ICM **multiunitaires**, qui détectent le signal de plusieurs zones. Les électrodes d'une matrice de microélectrodes (MEA) ont différentes longueurs, par exemple jusqu'à 1,5 mm (Utah, Blackrock Microsystems) ou 10 mm (FMA, MicroProbes) [(1)](#références). La qualité du signal est la meilleure, mais l'intervention pose plusieurs problèmes, par exemple le risque de formation de tissu cicatriciel. Le corps réagit à l'objet étranger et forme une cicatrice autour des électrodes, ce qui dégrade le signal. Comme la neurochirurgie peut être risquée et coûteuse, les ICM invasives visent surtout des patients aveugles ou paralysés.

### Semi-invasive

#### ECoG

L'électrocorticographie utilise des électrodes placées sur la surface exposée du cerveau pour mesurer l'activité électrique du cortex cérébral. Elle a été utilisée pour la première fois dans les années 1950 à l'Institut neurologique de Montréal. On la dit semi-invasive, mais elle exige tout de même une craniotomie pour implanter les électrodes. Pour cette raison, on l'utilise seulement quand une chirurgie est nécessaire pour des raisons médicales (l'épilepsie, par exemple).

Les électrodes peuvent être placées à l'extérieur de la dure-mère (épidurales) ou sous la dure-mère (sous-durales). Les électrodes en bande ou en grille couvrent une grande surface du cortex (de 4 à 256 électrodes)[(2)](#références), ce qui permet une grande variété d'études cognitives.

![ECoG](/learn/images/introtobci/ecog1.jpg)

*Sur l'image : reconstruction IRM du cerveau du patient avec les électrodes superposées (rouge : grille; bleu : bandes) pour faire correspondre avec précision l'activité neurophysiologique aux structures neuroanatomiques (image tirée de : Yang et al., Neuroimage, 2012)*

![ECoG](/learn/images/introtobci/ecog.png) [(3)](#références)

Les points forts de l'ECoG sont :

-   ```
        une haute résolution spatiale et une bonne fidélité du signal
    ```
    
-   ```
        une résistance au bruit
    ```
    
-   ```
        un risque clinique plus faible et une robustesse sur de longues périodes d'enregistrement[1]
    ```
    
-   ```
        une amplitude plus élevée
    ```
    

**Résolution spatiale**

Un avantage de l'ECoG sur l'EEG est sa résolution spatiale beaucoup plus élevée, car le signal n'a pas à traverser les tissus pour atteindre le cuir chevelu. La résolution spatiale de l'ECoG est de l'ordre du dixième de millimètre, alors que celle de l'EEG est de l'ordre du centimètre [(4)](#références).

* * *

## Qu'entend-on par résolution spatiale? Prenons comme analogie la netteté d'une image. Une photo à haute résolution spatiale est plus « nette »; autrement dit, elle paraît plus précise parce qu'elle contient plus de pixels par pouce et montre plus de détails. Une photo à basse résolution spatiale paraît moins nette, ou plus floue, parce qu'elle contient moins de pixels par pouce. Une meilleure résolution spatiale nous permet de savoir avec plus de précision d'où vient le signal. Dans le cas de l'EEG, quand le signal électrique traverse le crâne, il est atténué en raison de la faible conductivité des os.

**Résistance au bruit**

Le signal ECoG n'est pas affecté par le bruit et les artéfacts comme l'EMG (électromyographique, causé par les mouvements des muscles) et l'EOG (électrooculographique, causé par les mouvements des yeux).

**Risque clinique plus faible**

Les matrices d'électrodes n'ont pas à pénétrer dans le cortex, ce qui rend l'ECoG plus sûre que l'enregistrement invasif [(4)](#références).

**Amplitude plus élevée**

Les enregistrements ECoG atteignent au maximum 50 à 100 µV, contre 10 à 20 µV.

**Dans les ICM**

Plusieurs études ont porté sur l'utilisation de l'ECoG dans les ICM, mais elles se limitent toutes à des cas où une chirurgie était nécessaire pour retirer un foyer épileptique.

Dans une étude [(5)](#références), par exemple, les chercheurs ont utilisé l'ECoG pour contrôler un curseur d'ordinateur en deux dimensions. Cinq patients qui se préparaient à une chirurgie pour l'épilepsie ont eu une matrice d'électrodes sous-durale implantée pendant 7 à 14 jours. Après un court entraînement de moins de 30 minutes, les patients ont pu contrôler un curseur en deux dimensions, avec un taux de réussite moyen de 53 à 73 %.

### Non invasive

Dans la section suivante, nous passerons brièvement en revue les principales techniques non invasives. Plusieurs techniques non invasives servent à étudier le cerveau. L'EEG est la plus utilisée en raison de son coût et de la portabilité de son matériel.

-   ```
    MEG magnétoencéphalographie
    ```
    
-   ```
    TEP tomographie par émission de positrons
    ```
    
-   ```
    IRMf imagerie par résonance magnétique fonctionnelle
    ```
    
-   ```
    fNIRS spectroscopie proche infrarouge fonctionnelle
    ```
    
-   ```
    EEG électroencéphalographie
    ```
    

L'image suivante présente les différentes techniques d'imagerie cérébrale, comparées selon leur résolution spatiale et temporelle :

![Techniques d'imagerie cérébrale](/learn/images/introtobci/brainimaging.png)

### MEG

**magnétoencéphalographie**

**Qu'est-ce que c'est?**

Selon Wikipédia, c'est *« une technique de neuroimagerie fonctionnelle qui cartographie l'activité cérébrale en enregistrant, à l'aide de magnétomètres très sensibles, les champs magnétiques produits par les courants électriques qui circulent naturellement dans le cerveau. »*

![MEG](/learn/images/introtobci/MEG.png)

Sur l'image : appareil de MEG avec un patient, au National Institute of Mental Health [(6)](#références)

**Comment ça fonctionne?**

La MEG mesure le champ magnétique causé par les courants dans le cerveau. Elle offre une meilleure résolution spatiale que l'EEG [(7)](#références). Pourquoi? Parce que les champs magnétiques souffrent beaucoup moins que les champs électriques de l'effet de flou spatial causé par le crâne et le liquide intracérébral [(8)](#références). *« La MEG est le plus sensible aux sources tangentielles et peu sensible aux sources radiales. » « La MEG détecte mieux que l'EEG l'activité à haute fréquence (par exemple, au-dessus de 60 Hz). En effet, les champs magnétiques traversent le crâne et le cuir chevelu, alors que les champs électriques sont conduits en volume à travers ces tissus, ce qui réduit le rapport signal/bruit aux fréquences plus élevées. »*

### TEP

**tomographie par émission de positrons**

**Qu'est-ce que c'est?** La TEP est une technique d'imagerie nucléaire utilisée en médecine pour observer différents processus dans le corps, comme le débit sanguin, le métabolisme et les neurotransmetteurs.

![TEP](/learn/images/introtobci/PET.png) *« Cette image montre une installation de TEP typique équipée d'un appareil de TEP ECAT Exact HR+. Les appareils de TEP comme celui-ci sont peu à peu remplacés par des systèmes qui combinent la TEP et la tomodensitométrie dans un seul appareil d'imagerie TEP/TDM. » [(9)](#références)*

**Comment ça fonctionne?**

Une petite quantité de matière radioactive, appelée radiotraceur, est injectée dans la circulation sanguine pour atteindre le cerveau. Dans le cas du cerveau, le radiotraceur se lie au glucose et forme un radionucléide appelé fluorodésoxyglucose (FDG) [(10)](#références). Le cerveau consomme du glucose, et les niveaux observés varient selon l'activité des différentes régions. Les images de TEP sont multicolores : les zones plus actives apparaissent en couleurs chaudes comme le jaune et le rouge. On utilise souvent la TEP du cerveau pour détecter des maladies comme le cancer, entre autres.

![TEP](/learn/images/introtobci/PET2.png)

*TEP d'un cerveau humain normal*

### IRMf

**imagerie par résonance magnétique fonctionnelle**

**Qu'est-ce que c'est?**

*L'imagerie par résonance magnétique fonctionnelle, ou IRM fonctionnelle (IRMf), est une technique de neuroimagerie fonctionnelle qui utilise la technologie de l'IRM pour mesurer l'activité cérébrale en détectant les changements liés au débit sanguin.\[1\]\[2\] Cette technique repose sur le fait que le débit sanguin cérébral et l'activation des neurones sont couplés. Quand une zone du cerveau est sollicitée, le débit sanguin vers cette région augmente aussi.* [(11)](#références)

L'IRMf a été mise au point dans les années 1990. C'est une technique non invasive et sûre. Elle n'utilise pas de radiation, elle est facile à utiliser et elle offre une excellente résolution spatiale et une bonne résolution temporelle. [(12)](#références)

![IRMf](/learn/images/introtobci/fmri.png)

**Comment ça fonctionne?**

Dans le cerveau, l'hémoglobine des globules rouges des capillaires apporte l'oxygène aux neurones. L'activité augmente la demande en oxygène, ce qui entraîne une hausse du débit sanguin. Les propriétés magnétiques de l'hémoglobine changent selon qu'elle est oxygénée ou non. Cette différence permet à l'appareil d'IRM, un tube cylindrique muni d'un puissant électroaimant, de détecter quelles zones du cerveau sont actives à un moment précis.

![IRMf](/learn/images/introtobci/fmri2.png) *Images d'IRMf tirées d'une étude : certaines parties du cerveau s'activent à la vue de maisons et d'autres à la vue de visages. Les valeurs « r » sont des corrélations; plus elles sont élevées, en positif ou en négatif, meilleure est la correspondance.*

### fNIRS

**spectroscopie proche infrarouge fonctionnelle**

**Qu'est-ce que c'est?**

La spectroscopie proche infrarouge fonctionnelle (fNIR ou fNIRS) est l'utilisation de la NIRS (spectroscopie proche infrarouge) à des fins de neuroimagerie fonctionnelle. Avec la fNIR, l'activité cérébrale est mesurée par les réponses hémodynamiques associées à l'activité des neurones. [(13)](#références)

C'est une technique optique qui mesure l'activité cérébrale corticale localisée [(14)](#références).

**Comment ça fonctionne?**

La fNIRS mesure les changements de débit sanguin, comme l'IRMf, mais avec une technique différente : la lumière infrarouge plutôt que le champ magnétique. ![fNIRS](/learn/images/introtobci/fnirs.png)

*Sur l'image : fNIRS pendant une expérience de tennis de table* [(15)](#références)

Quand une tâche commence, de l'oxygène est consommé. Plus la tâche se complexifie, plus la demande en oxygène augmente. L'IRMf mesure la quantité d'oxygène consommée. La fNIRS mesure aussi la quantité d'oxygène disponible dans la zone (le dépassement).

Cela dit, la qualité temporelle de la fNIRS n'est pas aussi bonne que celle de l'EEG. La fNIRS prend 10 échantillons par seconde, bien moins que les 500 à 1000 échantillons par seconde de l'EEG. Et sa résolution spatiale n'est pas aussi bonne que celle de l'IRMf. Par exemple, l'IRMf peut produire des images des régions sous-corticales du cerveau, alors que la fNIRS ne peut pas analyser au-delà du cortex et ne capte donc aucune activation sous-corticale. D'ailleurs, beaucoup de chercheurs qui ont présenté leurs travaux en fNIRS au congrès de la SfN utilisent l'instrument en complément de leurs données d'EEG ou d'IRMf. [(16)](#références)

Avantages :

-   Non invasive
-   Portable
-   Accessible
-   Moins sensible aux artéfacts que l'IRMf et l'EEG

Sa résolution temporelle se rapproche davantage de celle de l'EEG. L'IRMf peut enregistrer un échantillon toutes les 2 secondes, alors que la fNIRS peut en enregistrer 10 par seconde. [(17)](#références)

La fNIRS offre une meilleure résolution spatiale que l'EEG et une meilleure résolution temporelle que l'IRMf.

### EEG

**Définition**

L'EEG enregistre l'activité électrique du cerveau à partir de la surface du cuir chevelu.

**Comment ça fonctionne?**

Des électrodes sont placées sur le cuir chevelu pour capter le courant électrique produit par le cerveau.

![Neurone](/learn/images/introtobci/neuron.png)

Quand il décharge, un neurone forme un dipôle, avec une tension plus basse aux synapses et plus haute à l'axone. Dans le cas d'un neurone inhibiteur, le dipôle est inversé : la tension est plus basse à l'axone et plus haute aux synapses. Qu'est-ce qui cause ce changement de tension dans un neurone? Des canaux Na+ s'ouvrent le long de la dendrite et provoquent un afflux de charges positives. Cette charge positive descend le long de l'axone, ouvre d'autres canaux sodiques et propage une charge électrique jusqu'au bout de l'axone. Elle se décharge à la synapse et libère du même coup des neurotransmetteurs. Quand des groupes de neurones déchargent ensemble, ils produisent assez de signal pour qu'on puisse le mesurer à partir du cuir chevelu. Avec l'EEG, on peut *seulement* mesurer des groupes de neurones (d'environ le diamètre d'une pièce de 25 cents).

Avantages : l'EEG est portable et tient dans une petite valise (alors que la MEG exige des salles construites spécialement). Les systèmes d'EEG de qualité laboratoire peuvent coûter cher, mais ils coûtent moins que les autres méthodes d'ICM. Ces dernières années, de plus en plus de systèmes d'EEG commerciaux ont été mis en marché.

Les données d'EEG contiennent une activité rythmique qui reflète les oscillations neuronales. On décrit les oscillations par leur fréquence, leur puissance et leur phase. Les oscillations se produisent à des fréquences précises (c'est-à-dire à un certain rythme). On compte entre autres les bandes delta, thêta, alpha, bêta et gamma. La recherche a trouvé des liens entre ces rythmes et différents états du cerveau. Par exemple, les casques EEG commerciaux, souvent utilisés pour la méditation, mesurent en général la quantité d'activité cérébrale dans la bande alpha.

**Résolution spatiale**

La résolution spatiale de l'EEG dépend du nombre d'électrodes utilisées. En recherche, quand on veut une meilleure résolution spatiale, on utilise en général au moins 32 électrodes, et jusqu'à 256. En général, la résolution spatiale de l'EEG est faible (par exemple, comparée à celle de l'ECoG et de l'IRMf), car le signal doit traverser plusieurs couches jusqu'au crâne. On peut toutefois améliorer la résolution avec certains types de filtres ou en combinant l'EEG à d'autres outils (par exemple, l'IRMf). (image du placement des électrodes..)

Plus d'électrodes, c'est plus de temps (par exemple, pour l'installation), plus de bande passante (pour la collecte et l'analyse des données) et plus d'argent (pour le matériel). Les casques commerciaux utilisent souvent moins d'électrodes, car une haute résolution spatiale (c'est-à-dire la localisation précise des régions du cerveau qui produisent un signal) n'est pas forcément nécessaire.

*« La précision spatiale de l'EEG est assez faible, mais on peut l'améliorer avec des filtres spatiaux comme le laplacien de surface ou des techniques adaptatives d'imagerie dans l'espace des sources. »*

La justesse spatiale est aussi faible, car l'activité enregistrée par une électrode est un mélange de différents signaux produits par différentes régions du cerveau, proches ou éloignées de celle située sous l'électrode. Échelle microscopique (moins de quelques millimètres cubes) : invisible à l'EEG, car les potentiels ne sont pas assez forts pour atteindre le cuir chevelu. Échelle mésoscopique (zones de cortex de plusieurs millimètres cubes à quelques centimètres cubes) : détectable par EEG, mais avec plus de 64 électrodes et des techniques de filtrage spatial. Échelle macroscopique (grande région du cortex de plusieurs centimètres cubes) : facile à mesurer par EEG.

**Résolution temporelle**

L'avantage de l'EEG est son excellente résolution temporelle. On peut prendre des milliers d'instantanés de l'activité électrique sur différents capteurs en une seule seconde. En EEG, on peut utiliser plusieurs électrodes, jusqu'à 500, selon l'expérience. Elles sont montées sur des bonnets pour recueillir les données toujours à partir de la même région du cuir chevelu.

**Comparaison**

Les ICM peuvent utiliser tout type d'imagerie cérébrale. On compte l'IRMf, la TEP et la NIRS, qui reposent sur les changements de débit sanguin (c'est-à-dire la réponse hémodynamique), ainsi que la MEG et l'EEG, qui mesurent respectivement l'activité magnétique et électrique du cerveau. L'IRMf et la NIRS ont une haute résolution spatiale, mais une faible résolution temporelle; la MEG et la TEP ont une haute résolution spatiale et temporelle; l'EEG a une faible résolution spatiale, mais une haute résolution temporelle. À l'heure actuelle, l'IRMf et la MEG reposent sur du matériel coûteux et encombrant, et la TEP exige l'injection d'une substance radioactive dans la circulation sanguine. C'est pourquoi les méthodes basées sur la NIRS et surtout sur l'EEG sont les plus utilisées.

## Composantes

### Activité cérébrale

Le système nerveux se compose de deux grandes parties : le système nerveux central et le système nerveux périphérique. Le cerveau est l'organe principal du système nerveux central. Il contient environ 100 milliards de neurones et des milliers de milliards de cellules appelées cellules gliales. L'encéphale se compose de trois grandes parties : le cerveau (ou cortex), le cervelet (ou « petit cerveau ») et le tronc cérébral. ![Parties du cerveau](/learn/images/introtobci/partsofthebrain.png) [(18)](#références)

Le cortex cérébral (ou cerveau) se divise en quatre grandes sections appelées lobes : le lobe frontal, le lobe pariétal, le lobe temporal et le lobe occipital.

![Lobes](/learn/images/introtobci/lobes.png) [(19)](#références)

Le cerveau produit sans arrêt des signaux électriques. Le crâne et la peau de la tête sont toutefois de très bons isolants électriques, ce qui rend difficile l'enregistrement de neurones individuels. Mais quand un grand nombre de neurones font la même chose en même temps, on peut voir leur activité avec des électrodes placées à la surface du cuir chevelu.

-   Cellules nerveuses -> réagissent aux stimuli et transmettent l'information sur de longues distances
    
    Elles se composent de :
    
    -   Axones -> long cylindre qui transmet une impulsion électrique et qui peut mesurer plusieurs mètres chez les vertébrés. Chez l'humain, d'une fraction de millimètre à plus d'un mètre. Système de transport axonal pour livrer les protéines
    -   Dendrites -> sont reliées aux axones ou aux dendrites d'autres cellules; reçoivent les impulsions d'autres nerfs ou relaient les signaux vers d'autres nerfs.
    -   Corps cellulaires -> un seul noyau; contiennent la plus grande partie du métabolisme de la cellule nerveuse
-   Cellules gliales : situées entre les neurones
    

![Structure d'un neurone](/learn/images/introtobci/neuronestructure.png) [(20)](#références)

Dans le cerveau humain, chaque nerf est relié à environ 10 000 autres nerfs, surtout par des connexions dendritiques. [(21)](#références)

Quand les neurones communiquent, des courants se produisent : un signal électrique est transmis le long d'un axone ou d'une dendrite. Au bout de l'axone, le signal électrique est converti en signal chimique, et l'axone libère des messagers chimiques appelés neurotransmetteurs. Les neurotransmetteurs traversent la synapse jusqu'à la dendrite, où ils sont reconvertis en signaux électriques.

Là où un courant sort, la polarité est positive; là où un courant entre, elle est négative. Ces courants, appelés courants primaires, baignent dans le tissu cérébral et le liquide cérébral, et atteignent le crâne et le cuir chevelu. Les électrodes d'EEG peuvent capter les différences de tension au cuir chevelu. Les principaux signaux à l'origine de l'EEG sont les gradients de tension le long des dendrites dans les couches supérieures du cortex. Pour obtenir un signal mesurable, des milliers de dendrites voisines orientées en parallèle doivent être actives en même temps. [(22)](#références) Les signaux qu'on peut mesurer par EEG sont :

1.  Les potentiels d'action le long des axones qui relient les neurones
    
2.  les courants dans les fentes synaptiques qui relient les axones aux neurones ou aux dendrites
    
3.  les courants le long des dendrites, des synapses jusqu'au soma des neurones [(23)](#références)
    

### Acquisition du signal

Dans le cas d'une ICM basée sur l'EEG, le potentiel électrique de l'activité cérébrale est mesuré par des électrodes placées sur le cuir chevelu. Les électrodes sont des disques de métal placés sur le cuir chevelu à des positions déterminées selon le système international 10-20.

Il existe deux grands types d'électrodes :

**Humides** : elles utilisent une solution saline ou un gel. La conductivité est meilleure parce que la distance électrique est réduite au minimum. La plupart sont faites d'acier inoxydable, d'étain, d'or ou d'argent, et recouvertes d'une couche de chlorure d'argent.

![Électrodes](/learn/images/introtobci/wetelectrodes.png) *Sur l'image : électrodes d'EEG plaquées or*

**Sèches** : plus pratiques et plus faciles à utiliser, mais elles peuvent perdre les fréquences plus élevées. Photo - plus d'info

Pour aider au positionnement, comme il faut beaucoup d'électrodes -> bonnet

L'EEG est fiable pour les applications en temps réel, car il peut prendre des mesures chaque millième de seconde. Le problème de l'EEG, c'est le bruit. Comme les électrodes sont placées sur le cuir chevelu, il y a des couches entre elles et le cerveau, en plus du bruit ambiant et des muscles.

**COMMENT FONCTIONNE L'ACQUISITION EEG?**

L'EEG mesure l'activité électrique qui se produit dans le cerveau. Ce qu'on enregistre, c'est la différence de tension entre au moins 2 électrodes. Pour interpréter les potentiels évoqués (PÉ), l'EEG doit être enregistré en même temps à partir de plusieurs électrodes. Pendant l'excitation synaptique des dendrites des neurones, des courants électriques sont produits et captés par l'EEG. Comme le signal détecté est faible, parce que les électrodes sont loin des neurones et que le signal doit traverser les os et le crâne, il faut un amplificateur pour enregistrer le courant électrique.

**De quoi a-t-on besoin?**

-   Des électrodes, habituellement en chlorure d'argent
-   Des amplificateurs
-   Des convertisseurs A/N
-   Un appareil d'enregistrement

*« Les électrodes captent le signal du cuir chevelu, et les amplificateurs traitent le signal analogique pour augmenter l'amplitude des signaux d'EEG afin que le convertisseur A/N puisse numériser le signal plus précisément. Enfin, l'appareil d'enregistrement, qui peut être un ordinateur personnel ou un appareil semblable, stocke et affiche les données. »* [(24)](#références)

**Électrodes**

Comme on l'a vu plus haut, différents types d'électrodes peuvent servir en EEG : jetables (sèches ou humides), électrodes à disque réutilisables (or, argent, acier inoxydable ou étain), bandeaux et bonnets d'électrodes (comme ceux du grand public), électrodes à base de solution saline et électrodes à aiguille [(25)](#références). En 1958, on a mis au point un système standard de placement des électrodes, où la tête est divisée selon des distances proportionnelles (Jasper, 1958).

![Système 10-20 pour l'EEG](/learn/images/introtobci/1020system.png) *Sur l'image : emplacement des électrodes du système international 10-20 pour l'enregistrement EEG (électroencéphalographie)* [(26)](#références)

La configuration minimale compte trois électrodes : l'électrode active, l'électrode de référence et l'électrode de mise à la terre. L'EEG mesure la différence de potentiel dans le temps entre l'électrode de signal (ou active) et l'électrode de référence. Il est très difficile de trouver un point de référence où il n'y a aucune activité électrique du cerveau. On la place habituellement sur la mastoïde, les lobes d'oreilles ou le bout du nez. L'électrode de mise à la terre sert à mesurer la tension différentielle entre les points actif et de référence.

**Amplificateur**

Le signal capté par les électrodes vient de loin et il est atténué par les différentes couches qu'il traverse. Pour cette raison, il faut un amplificateur pour amener les microvolts dans une plage qu'on peut numériser. Le signal est envoyé à l'amplificateur par un câble de 1 à 2 mètres. Malheureusement, les câbles peuvent agir comme des antennes et capter des signaux qui nuisent au signal EEG et font amplifier le bruit. Certaines électrodes « actives » contiennent un petit préamplificateur pour éviter cette interférence. Malheureusement, elles sont assez grosses et coûteuses, et peuvent ne pas convenir à certaines situations. [(27)](#références)

**Convertisseurs A/N**

Le convertisseur A/N convertit le signal amplifié de la forme analogique à la forme numérique. La bande passante des signaux d'EEG est limitée à environ 100 Hz, donc une fréquence de 200 Hz suffit pour échantillonner les signaux d'EEG.

**Appareil d'enregistrement**

Il peut s'agir d'un ordinateur ou d'un appareil semblable, qui enregistre, stocke et affiche le signal converti.

### Prétraitement

Les données d'EEG brutes sont souvent imparfaites, car elles sont affectées par le bruit et les artéfacts. Il y a quatre grandes sources de bruit et d'artéfacts :

1.  Le matériel d'EEG
2.  Les interférences électriques extérieures au sujet et au système d'enregistrement
3.  Les fils et les électrodes
4.  Le sujet : activité électrique du cœur, clignements des yeux, mouvements des globes oculaires, mouvements des muscles en général. [(29)](#références)

Les clignements des yeux sont très visibles dans les enregistrements frontaux et occipitaux, alors que l'ECG (l'activité électrique du cœur) apparaît sur les électrodes occipitales. *« Un mouvement du globe oculaire et des paupières modifie le champ de potentiel en raison de la différence de potentiel d'environ 100 mV qui existe entre la cornée et la rétine. » [(30)](#références)*

L'étape de prétraitement aide à nettoyer les données du bruit et des artéfacts. Le prétraitement comprend différentes méthodes et différentes étapes. Souvent, par exemple, on applique des filtres aux données. Pour retirer la composante continue du signal et les dérives, on utilise des filtres passe-haut, et une fréquence de coupure de 1 Hz suffit habituellement. On peut aussi souvent appliquer des filtres passe-bas pour retirer les hautes fréquences du signal, car en EEG, on n'étudie habituellement pas les fréquences au-dessus de 90 Hz. D'autres méthodes servent à retirer des artéfacts comme les mouvements des globes oculaires ou les clignements des yeux.

Après les différentes étapes de prétraitement, quand le signal est débarrassé de la plupart des artéfacts et du bruit, on découpe l'enregistrement en époques de quelques secondes. Cela nous permet d'obtenir un grand nombre de caractéristiques à partir d'un seul enregistrement EEG et de les utiliser pour des statistiques ou pour appliquer des classificateurs, comme nous le verrons dans les sections suivantes. [(31)](#références)

### Extraction de caractéristiques

L'étape suivante est l'extraction de caractéristiques : l'analyse du signal et l'extraction d'information. Comme le signal EEG est très complexe, il est impossible d'y trouver de l'information utile simplement en le regardant. Il faut donc appliquer des algorithmes de traitement qui permettent de trouver un contenu (comme l'intention d'une personne, par exemple) qui serait invisible à l'œil nu. Il existe de nombreuses méthodes d'extraction de caractéristiques, entre autres : puissances de bande (BP), corrélation croisée entre les puissances de bande EEG, représentation fréquentielle (FR), représentation temps-fréquence (TFR), paramètres de Hjorth, modélisation paramétrique, modèle inverse, et des techniques propres au P300 et aux PEV comme la détection de pics (PP) et le calcul des potentiels corticaux lents (SCP) [(32)](#références)

### Classification

Une autre étape qu'on peut appliquer au signal, maintenant presque débarrassé des artéfacts, consiste à appliquer des algorithmes de classification. Grâce aux techniques d'apprentissage automatique, on peut entraîner un classificateur à reconnaître, par exemple, quelles caractéristiques appartiennent à une classe ou à une autre. Encore une fois, la classification aide à découvrir quel type de tâche mentale le sujet accomplit (Ochoa, 2002).

### Traduction

Une fois le signal classé, le résultat est transmis à l'algorithme de traduction des caractéristiques. À cette étape, les caractéristiques doivent être traduites en l'action correspondante. « Par exemple, un potentiel P3 pourrait être traduit par la sélection de la lettre qui l'a évoqué. » Dans ce cas, l'algorithme envoie donc une commande à l'appareil de rétroaction pour sélectionner la lettre.

### Appareil de rétroaction

L'appareil de rétroaction reçoit la commande de l'étape de traduction. Par exemple, il peut s'agir de l'ordinateur, où le signal servira à déplacer un curseur, ou d'un bras robotisé, où les données servent à produire un mouvement.

## Applications

## Exemples

## Limites

Les ICM ont encore de nombreuses limites à surmonter :

**Matériel et logiciel** Le premier problème est le matériel d'acquisition du signal. En EEG, les capteurs ont encore des limites d'acquisition. Comme on l'a vu, le signal parcourt une certaine distance avant d'être capté par l'appareil d'EEG, et le bruit et les artéfacts causent des problèmes importants. L'EEG doit bien fonctionner dans tous les environnements. Il faut des électrodes fiables. La technologie doit rester fiable malgré le bruit produit par les appareils, car beaucoup d'ICM visent des patients malades, souvent entourés de nombreux appareils électroniques. [(33)](#références)

Le meilleur signal que nous avons vu est celui capté par une technologie invasive. Mais les ICM invasives ont elles aussi beaucoup de limites. D'abord, on ne les implante que chez un petit nombre de patients qui ont besoin d'une chirurgie pour d'autres raisons. La technologie invasive soulève des questions éthiques (? voir la section sur l'éthique ?). Les problèmes à surmonter sont complexes : le système doit être sûr et rester intact, fonctionnel et fiable pendant des décennies. Sa sécurité à long terme doit être démontrée, car l'implant pourrait ouvrir la porte à des infections ou être rejeté par le corps. L'implant doit avoir des éléments externes robustes, confortables, pratiques et discrets, et se brancher facilement à des applications à haute performance. Et être sûr. [(34)](#références) Pour étudier le cerveau, la technologie invasive n'offre pas forcément les meilleurs modèles, puisqu'elle est implantée chez des patients qui ont des problèmes ou des lésions, ce qui n'en fait pas des candidats idéaux. Validation et diffusion des ICM Fiabilité [(35)](#références)

**Compréhension actuelle des signaux biologiques et variabilité**

Le problème, c'est qu'il est difficile de décoder le signal, ou que cela exige des mois d'entraînement, et que le signal diffère d'une personne à l'autre : il n'est pas standard. La variabilité des caractéristiques du signal exige des algorithmes d'ICM adaptatifs pour bien fonctionner. Malgré les règles de base connues pour choisir et ajuster une ICM, on ne comprend toujours pas pourquoi certains paradigmes ou certaines caractéristiques d'ICM fonctionnent avec certains patients et pas avec d'autres. Des travaux sur ce qu'on appelle « l'évaluation démographique des ICM », c'est-à-dire combien de personnes et lesquelles peuvent utiliser un type précis d'ICM, ont été menés en partie (dans le domaine des ICM basées sur les potentiels évoqués visuels stationnaires, ou SSVEP) par Allison et al. (Allison et al., 2010) et Volosyak et al. [(36)](#références)

## Éthique

Les technologies émergentes et les interfaces cerveau-machine soulèvent de nombreuses préoccupations éthiques auxquelles s'attaque la communauté des neurosciences. Ces problèmes touchent différents sujets, comme la gestion des attentes des patients, la notion d'identité personnelle, la validité du consentement éclairé, etc.

**Consentement éclairé** Un enjeu éthique important lié aux applications médicales des ICM concerne l'obtention du consentement éclairé des patients. La recherche sur les ICM se fait souvent avec des patients atteints de troubles invalidants, comme le syndrome d'enfermement ou des AVC plus ou moins graves. Il est important de déterminer si le consentement obtenu est pleinement éclairé ou s'il est affecté par l'incapacité.

**Gérer les attentes des patients** W. Glannon a souligné que les patients et leurs proches peuvent avoir des attentes envers les technologies d'ICM qui ne seront peut-être pas comblées. Plusieurs facteurs peuvent faire en sorte qu'une ICM fonctionne ou non, comme la capacité cognitive ou le degré d'incapacité du sujet. Le risque que la technologie ne fonctionne pas pourrait causer une détresse importante chez les patients, qui l'emporterait sur les bienfaits possibles.

**Risques et bienfaits** Certaines technologies, comme les dispositifs implantables, peuvent présenter des risques pour la santé du patient. C'est un problème éthique important à régler.

**Vie privée** L'idée de pouvoir lire dans les pensées a un effet profond sur les notions d'identité personnelle et de vie privée. Même si la technologie est encore loin de pouvoir lire les pensées d'une personne, il est important de commencer à réfléchir à ses implications éthiques. Si on met au point une telle machine, comment les données seront-elles transmises et stockées? Comment la personne pourrait-elle rester entièrement propriétaire de ses données et empêcher des pirates ou d'autres personnes d'accéder à « ses pensées »?

**Implications juridiques** Les interfaces cerveau-machine servent souvent à aider des personnes paralysées à retrouver des mouvements grâce à des membres prothétiques. Des chercheurs se sont demandé qui serait responsable si un accident survenait avec ces méthodes. Comment distinguer une action volontaire d'une défaillance du système? De plus, la possibilité de faire communiquer des patients gravement malades soulève la question suivante : peut-on considérer leurs réponses comme un consentement éclairé, étant donné leur état?

**Effets sur la société** Les ICM pourraient augmenter les capacités mentales, en s'alliant à l'intelligence artificielle (comme dans le plan d'Elon Musk, par exemple). On se demande déjà si les athlètes munis de membres prothétiques devraient concourir avec les autres. Si les ICM améliorent la cognition, on ferait face à une question semblable.

## Sécurité

## Avenir du domaine

L'activité neuroélectrique a été détectée pour la première fois par Hans Berger en 1924 et enregistrée par EEG. Dans les années 1970, la Defense Advanced Research Projects Agency a commencé à explorer la communication avec le cerveau par EEG. En 1976, le Brain Computer Interface Laboratory de l'UCLA a démontré que les potentiels évoqués pouvaient servir à contrôler un curseur. La même année, Jacques J. Vidal a créé le terme BCI (interface cerveau-ordinateur). Au cours des 50 dernières années, le domaine a évolué rapidement. Quelques jalons importants :

-   1998 : premier implant (invasif, non EEG) dans le cerveau humain qui produit des signaux de haute qualité
-   1999 : une ICM aide une personne quadriplégique à faire des mouvements limités de la main
-   2002 : des singes sont entraînés à contrôler un curseur d'ordinateur
-   2003 : premier jeu par ICM présenté au public (BrainGate)
-   2005 : le cerveau d'un singe contrôle un bras robotisé
-   2008 : démonstration d'appels téléphoniques sans voix (The Audeo, conférence des développeurs de TI)
-   2014 : communication directe de cerveau à cerveau réalisée en transmettant des signaux EEG par Internet [(37)](#références)

Ces avancées montrent que les ICM forment un domaine dynamique et en croissance. Comme le domaine est multidisciplinaire, son évolution dépend de différents facteurs : nouveau matériel, nouvelles théories en apprentissage automatique et en mathématiques, progrès en IA et en robotique, nouvelles découvertes en médecine et en neurosciences, etc. En général, le domaine des ICM s'est toujours limité au monde universitaire ou au milieu médical. Récemment, de nouvelles entreprises se sont lancées dans le domaine pour accroître les capacités humaines : Facebook, Neuralink, Kernel.

**Facebook**

En avril 2017, Facebook a commencé à embaucher des ingénieurs en interfaces cerveau-machine et en neuroimagerie pour travailler sur un projet de deux ans de son équipe Building 8 (B8), qui allie apprentissage automatique et neuroimagerie. Le plan est d'utiliser l'imagerie optique pour balayer le cerveau, détecter la parole intérieure et la traduire en texte. L'objectif de Facebook est de permettre aux gens de taper 100 mots par minute, plus vite qu'au téléphone (et peut-être de permettre aussi aux personnes qui ne peuvent pas taper de le faire?). La publication suivante est parue sur le fil de Zuckerberg :

![Facebook](/learn/images/introtobci/facebook.png)

Pour ce projet, Facebook collabore avec UC San Francisco, UC Berkeley, Johns Hopkins Medicine, l'Applied Physics Laboratory de l'Université Johns Hopkins et la Washington University School of Medicine de St. Louis. L'entreprise conçoit du matériel et des logiciels qui imitent la cochlée, la partie de l'oreille qui traduit les sons en fréquences précises pour le cerveau. Lors des essais, ils ont réussi à faire percevoir par la peau un vocabulaire de 9 mots.

**Neuralink**

Neuralink, l'entreprise d'Elon Musk, a été lancée publiquement en mars 2017. L'annonce a été faite le lendemain de celle du projet d'ICM de Facebook. Elon Musk a parlé à quelques reprises d'un « lacet neuronal » (« neural lace »), une couche d'IA qui augmenterait les capacités du cerveau humain. Dans un rapport détaillé sur le site Wait But Why, on la décrit comme un « chapeau de sorcier » (« Wizard Hat »). Ce serait une « troisième couche » qui compléterait les deux autres : le système limbique et le cortex. L'idée principale de son créateur est de concevoir des dispositifs implantables pour aider les humains à suivre la montée de l'intelligence artificielle. Au début, les implants pourraient servir à étudier le cerveau et à aider à traiter des maladies comme la dépression ou l'épilepsie. Les électrodes implantables offriraient une bien meilleure qualité que l'EEG, mais la technologie invasive soulève beaucoup de préoccupations. Les dispositifs implantables doivent être sûrs, y compris à long terme, et biocompatibles. Ils doivent communiquer sans fil d'une façon qui ne se dégrade pas avec le temps. Le problème de l'alimentation doit être réglé, et Musk devra trouver des volontaires pour les expériences. De plus, Musk parle d'« un million de neurones enregistrés en même temps », un nombre énorme comparé au maximum d'environ 200 électrodes placées dans les expériences actuelles. Dans une déclaration, le PDG de Neuralink a dit : « Pour une interface cérébrale partielle utile, je pense qu'on est à environ quatre ou cinq ans. »

**Kernel**

Pour Kernel aussi, l'objectif final est de permettre aux humains de coexister et de coévoluer avec les machines. Son fondateur, Bryan Johnson, a investi 100 millions de dollars pour mettre au point des implants cérébraux. L'entreprise misera d'abord sur les applications médicales pour mieux comprendre le cerveau, puis, à l'avenir, cherchera à l'augmenter pour rendre les humains plus intelligents et en meilleure santé. Kernel a promis d'améliorer le traitement des maladies neurodégénératives, une promesse ambitieuse puisque, jusqu'ici, les implants cérébraux n'ont servi que chez des personnes paraplégiques et dans des essais médicaux. [(38)](#références) L'entreprise conçoit actuellement du matériel et des logiciels pour traiter les personnes atteintes de la maladie de Parkinson, et compte environ 20 employés.

## Références

1.  Waldert, S. 2016. *Invasive vs. Non-Invasive Neuronal Signals for Brain-Machine Interfaces: Will One Prevail?* Disponible à : [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4921501/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4921501/)
    
2.  Mesgarani, N; Chang, EF. 2012. *Selective cortical representation of attended speaker in multi-talker speech perception*. Nature. 485 (7397): 233–6. doi:10.1038/nature11020.
    
3.  Personnel de Blausen.com (2014). *Medical gallery of Blausen Medical 2014*. WikiJournal of Medicine 1 (2). DOI:10.15347/wjm/2014.010. ISSN 2002-4436. Œuvre personnelle
    
4.  Leuthardt, E. C. et al. 2004. *A brain–computer interface using electrocorticographic signals in humans*. Journal of Neural Engineering, Volume 1, Number 2. Disponible à : [http://iopscience.iop.org/article/10.1088/1741-2560/1/2/001/meta;jsessionid=E687A7B4A1215A8655C2DF6429F87A05.c2.iopscience.cld.iop.org](http://iopscience.iop.org/article/10.1088/1741-2560/1/2/001/meta;jsessionid=E687A7B4A1215A8655C2DF6429F87A05.c2.iopscience.cld.iop.org)
    
5.  Schalk, G. et al. 2008. *Two-dimensional movement control using electrocorticographic signals in humans.* Journal of Neural Engineering, Volume 5, Number 1. Disponible à : [http://iopscience.iop.org/article/10.1088/1741-2560/5/1/008/meta](http://iopscience.iop.org/article/10.1088/1741-2560/5/1/008/meta)
    
6.  Appareil de MEG avec un patient, National Institute of Mental Health. Par un auteur inconnu du NIMH \[domaine public\], via Wikimedia Commons. Disponible à : [https://en.wikipedia.org/wiki/Magnetoencephalography#/media/File:NIMH\_MEG.jpg](https://en.wikipedia.org/wiki/Magnetoencephalography#/media/File:NIMH_MEG.jpg)
    
7.  Peter T. Lin, Kartikeya Sharma, Tom Holroyd, Harsha Battapady, Ding-Yu Fei and Ou Bai (2013). A High Performance MEG Based BCI Using Single Trial Detection of Human Movement Intention, Functional Brain Mapping and the Endeavor to Understand the Working Brain, Dr. Francesco Signorelli (Ed.), InTech, DOI: 10.5772/54550. Disponible à : [https://www.intechopen.com/books/functional-brain-mapping-and-the-endeavor-to-understand-the-working-brain/a-high-performance-meg-based-bci-using-single-trial-detection-of-human-movement-intention](https://www.intechopen.com/books/functional-brain-mapping-and-the-endeavor-to-understand-the-working-brain/a-high-performance-meg-based-bci-using-single-trial-detection-of-human-movement-intention)
    
8.  Navin Lal, Thomas & al. A Brain Computer Interface with Online Feedback based on Magnetoencephalography. Disponible à : [http://www.machinelearning.org/proceedings/icml2005/papers/059\_BrainComputer\_LalEtAl.pdf](http://www.machinelearning.org/proceedings/icml2005/papers/059_BrainComputer_LalEtAl.pdf)
    
9.  Par Jens Maus ([http://jens-maus.de/](http://jens-maus.de/)). Œuvre personnelle, domaine public, [https://commons.wikimedia.org/w/index.php?curid=404712](https://commons.wikimedia.org/w/index.php?curid=404712)
    
10.  Positron Emission Tomography (PET Scan). Disponible à : [http://www.hopkinsmedicine.org/healthlibrary/test\_procedures/neurological/positron\_emission\_tomography\_pet\_scan\_92,p07654/](http://www.hopkinsmedicine.org/healthlibrary/test_procedures/neurological/positron_emission_tomography_pet_scan_92,p07654/)
    
11.  Wikipedia. Functional magnetic resonance imaging. Disponible à : [https://en.wikipedia.org/wiki/Functional\_magnetic\_resonance\_imaging](https://en.wikipedia.org/wiki/Functional_magnetic_resonance_imaging).
    
12.  Introduction to FMRI. Disponible à : [https://www.ndcn.ox.ac.uk/divisions/fmrib/what-is-fmri/introduction-to-fmri](https://www.ndcn.ox.ac.uk/divisions/fmrib/what-is-fmri/introduction-to-fmri)
    
13.  Wikipedia. Functional near-infrared spectroscopy. Disponible à : [https://en.wikipedia.org/wiki/Functional\_near-infrared\_spectroscopy](https://en.wikipedia.org/wiki/Functional_near-infrared_spectroscopy)
    
14.  Coyle, S., Ward, T. E., Markham, C. 2007. Brain–computer interface using a simplified functional near-infrared spectroscopy system. Disponible à : [http://iopscience.iop.org/article/10.1088/1741-2560/4/3/007/pdf;jsessionid=7AEE10C6243EA9643C6DECB3555DAA24.ip-10-40-1-105](http://iopscience.iop.org/article/10.1088/1741-2560/4/3/007/pdf;jsessionid=7AEE10C6243EA9643C6DECB3555DAA24.ip-10-40-1-105)
    
15.  [https://www.youtube.com/watch?v=me8kxvOuq40](https://www.youtube.com/watch?v=me8kxvOuq40)
    
16.  fNIRS: The In-Between for Brain Activity in Real-World Settings. Disponible à : [https://www.cogneurosociety.org/fnirs\_wan/](https://www.cogneurosociety.org/fnirs_wan/)
    
17.  fNIRS: The In-Between for Brain Activity in Real-World Settings. Disponible à : [https://www.cogneurosociety.org/fnirs\_wan/](https://www.cogneurosociety.org/fnirs_wan/)
    
18.  Image disponible à : [http://3.bp.blogspot.com/\_TnLZz2ZDDxM/SsG-AuitJyI/AAAAAAAAAKA/BRZpWh3UrCc/s320/Brain\_parts.gif](http://3.bp.blogspot.com/_TnLZz2ZDDxM/SsG-AuitJyI/AAAAAAAAAKA/BRZpWh3UrCc/s320/Brain_parts.gif)
    
19.  Wikipedia. Lobes of the brain. Disponible à : [https://en.wikipedia.org/wiki/Lobes\_of\_the\_brain](https://en.wikipedia.org/wiki/Lobes_of_the_brain)
    
20.  Neurons & glial cells. Disponible à : [https://training.seer.cancer.gov/brain/tumors/anatomy/neurons.html](https://web.archive.org/web/20190919195612/https://training.seer.cancer.gov/brain/tumors/anatomy/neurons.html)
    
21.  Sanei, S. (2013). Adaptive Processing of Brain Signals. Somerset: John Wiley & Sons, Incorporated. Consulté à la page 30 : [http://ebookcentral.proquest.com/lib/dcu/detail.action?docID=1207774](http://ebookcentral.proquest.com/lib/dcu/detail.action?docID=1207774)
    
22.  Introduction to EEG and MEG. [http://imaging.mrc-cbu.cam.ac.uk/meg/IntroEEGMEG#signalgeneration](http://imaging.mrc-cbu.cam.ac.uk/meg/IntroEEGMEG#signalgeneration)
    
23.  Introduction to EEG and MEG. [http://imaging.mrc-cbu.cam.ac.uk/meg/IntroEEGMEG#signalgeneration](http://imaging.mrc-cbu.cam.ac.uk/meg/IntroEEGMEG#signalgeneration)
    
24.  Nicolas-Alonso, L. F., & Gomez-Gil, J. (2012). Brain Computer Interfaces, a Review. Sensors (Basel, Switzerland), 12(2), 1211–1279. [http://doi.org/10.3390/s120201211](http://doi.org/10.3390/s120201211)
    
25.  Sanei, S. 2013. Adaptive Processing of Brain Signals. John Wiley & Sons, Incorporated.
    
26.  Wikimedia. [https://commons.wikimedia.org/wiki/File:21\_electrodes\_of\_International\_10-20\_system\_for\_EEG.svg](https://commons.wikimedia.org/wiki/File:21_electrodes_of_International_10-20_system_for_EEG.svg)
    
27.  Tavakoli, P., Campbell, K. The recording and quantification of event-related potentials: I. stimulus presentation and data acquisition.
    

29.  Ochoa, J., 2002. EEG Signal Classification for Brain Computer Interface Applications.
    
30.  Ochoa, J., 2002. EEG Signal Classification for Brain Computer Interface Applications.
    
31.  Riera, A. EEG Signal Processing for Dummies. Disponible à : http://neuroelectrics.hs-sites.com/blog/bid/245833/EEG-Signal-Processing-for-Dummies?utm\_content=10498748&utm\_medium=social&utm\_source=googleplus
    
32.  Tarik Al-ani and Dalila Trad (2010). Signal Processing and Classification Approaches for Brain-Computer Interface, Intelligent and Biosensors, Vernon S. Somerset (Ed.), InTech, DOI: 10.5772/7032. Disponible à : [https://www.intechopen.com/books/intelligent-and-biosensors/signal-processing-and-classification-approaches-for-brain-computer-interface](https://www.intechopen.com/books/intelligent-and-biosensors/signal-processing-and-classification-approaches-for-brain-computer-interface)
    
33.  Shih, J. J., Krusienski, D. J., & Wolpaw, J. R. (2012). Brain-Computer Interfaces in Medicine. Mayo Clinic Proceedings, 87(3), 268–279. [http://doi.org/10.1016/j.mayocp.2011.12.008](http://doi.org/10.1016/j.mayocp.2011.12.008)
    
34.  Shih, J. J., Krusienski, D. J., & Wolpaw, J. R. (2012). Brain-Computer Interfaces in Medicine. Mayo Clinic Proceedings, 87(3), 268–279. [http://doi.org/10.1016/j.mayocp.2011.12.008](http://doi.org/10.1016/j.mayocp.2011.12.008)
    
35.  Shih, J. J., Krusienski, D. J., & Wolpaw, J. R. (2012). Brain-Computer Interfaces in Medicine. Mayo Clinic Proceedings, 87(3), 268–279. [http://doi.org/10.1016/j.mayocp.2011.12.008](http://doi.org/10.1016/j.mayocp.2011.12.008)
    
36.  Emerging Theory and Practice in Neuroprosthetics by Yina Guo, Ganesh Naik. Chapter 10 Brain-Computer Interfaces for Assessment and Communication in Disorders of Consciousness
    
37.  Neurosky. 2015. What Is BCI and How Did It Evolve?. Disponible à : [http://neurosky.com/2015/06/what-is-bci-and-how-did-it-evolve/](https://web.archive.org/web/20191213123024/http://neurosky.com/2015/06/what-is-bci-and-how-did-it-evolve/)
    
38.  Statt, N. 2017. KERNEL IS TRYING TO HACK THE HUMAN BRAIN — BUT NEUROSCIENCE HAS A LONG WAY TO GO. Disponible à : [https://www.theverge.com/2017/2/22/14631122/kernel-neuroscience-bryan-johnson-human-intelligence-ai-startup](https://www.theverge.com/2017/2/22/14631122/kernel-neuroscience-bryan-johnson-human-intelligence-ai-startup)
