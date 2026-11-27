---
title: "Votre premier enregistrement EEG : électrodes, positionnement et qualité du signal"
description: "Un guide pratique pour la paillasse : où placer les électrodes et comment elles se nomment, électrodes humides, sèches et semi-sèches, référence et polarisation, impédance, les artéfacts que vous verrez, la sécurité électrique et une liste de vérification pour votre première séance."
module: bci
sourceUrl: ""
---
*Rédigé en novembre 2026. Chaque note sur un appareil a été vérifiée dans la documentation du fabricant à cette date. Les appareils et les logiciels changent : consultez les pages en lien avant d'acheter ou d'enregistrer.*

La leçon précédente vous a aidé à choisir un casque. Celle-ci porte sur l'heure que vous passerez avec ce casque sur la tête de quelqu'un. La plupart des problèmes d'un premier enregistrement n'ont rien à voir avec le cerveau. Ils viennent de l'endroit où sont posées les électrodes, de la qualité de leur contact avec la peau et de tout ce qui capte de l'électricité dans la pièce. Apprenez à les repérer et vos données seront utilisables.

Cette leçon ne dépend d'aucun appareil en particulier. De courtes notes sur OpenBCI, Muse, PiEEG et Emotiv se trouvent vers la fin.

## Où placer les électrodes : le système 10-20

Les chercheurs avaient besoin de placer les électrodes au même endroit sur des têtes de tailles différentes, pour qu'un enregistrement fait à Montréal puisse se comparer à un autre fait à Paris. La réponse est le **système international 10-20**, proposé par Herbert Jasper en 1958 et encore à la base du positionnement des électrodes aujourd'hui ([Wikipédia : système 10-20](https://en.wikipedia.org/wiki/10%E2%80%9320_system_%28EEG%29), en anglais).

Il part de quatre repères que l'on trouve avec les doigts :

- le **nasion**, le creux entre le front et le nez;
- l'**inion**, la bosse à l'arrière du crâne;
- les deux **points préauriculaires**, juste devant chaque oreille.

On mesure la distance du nasion à l'inion en passant par le dessus de la tête, puis d'un point préauriculaire à l'autre. Les électrodes sont ensuite placées à des intervalles de 10 % ou de 20 % de ces distances, d'où le nom. **Cz**, le vertex, se trouve à mi-chemin sur les deux mesures.

![Les 21 positions d'électrodes du système international 10-20, vues du dessus, le nez en haut](/learn/images/first-eeg-recording/10-20.svg)

*Les 21 positions du système 10-20 (les étiquettes NASION et INION sont en anglais). Schéma de トマトン124, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:21_electrodes_of_International_10-20_system_for_EEG.svg), domaine public. Un fond blanc a été ajouté pour cette page.*

### Lire le nom d'une électrode

Chaque nom a deux parties.

**Les lettres indiquent la région de la tête.**

| Lettres | Région |
| --- | --- |
| Fp | pôle frontal (le front) |
| F | frontale |
| C | centrale (sur la bande entre les lobes frontal et pariétal; il n'existe pas de « lobe central ») |
| T | temporale |
| P | pariétale |
| O | occipitale |
| A ou M | lobe de l'oreille (auriculaire) ou mastoïde, l'os derrière l'oreille, souvent utilisés pour la référence |

**Le chiffre ou le z indique le côté.**

- **Les chiffres impairs sont à gauche**, **les chiffres pairs à droite**. F3 est à gauche, F4 à droite.
- Les chiffres **augmentent à mesure qu'on s'éloigne de la ligne médiane**. F3 est plus près du milieu de la tête que F7.
- Un **z** minuscule (pour « zéro ») désigne la **ligne médiane** : Fpz, Fz, Cz, Pz, Oz.

Ainsi, **C3** se trouve sur la région centrale gauche et **C4** sur la région centrale droite. Ces sites sont au-dessus des aires motrices, ce qui explique pourquoi les études d'imagerie motrice les utilisent souvent. Gardez en tête que chaque électrode de surface capte l'activité d'une large zone du cortex, pas seulement du tissu situé juste en dessous.

### Le système 10-10 et les électrodes renommées

Vingt et une électrodes laissent de grands espaces. Le **système 10-10** ajoute des positions à mi-chemin entre celles du 10-20 et nomme les sites intermédiaires en combinant deux lettres : **AF** (entre Fp et F), **FC**, **FT**, **CP**, **TP** et **PO**. L'American Clinical Neurophysiology Society (ACNS) recommande cette nomenclature dans sa ligne directrice sur le nom des positions d'électrodes ([Acharya et coll., 2016](https://doi.org/10.1097/WNP.0000000000000316)).

Le système 10-10 a aussi renommé quatre positions pour que les noms d'une même rangée partagent le même chiffre. Vous verrez les deux versions dans les articles et les manuels d'appareils :

| Ancien nom 10-20 | Nom 10-10 |
| --- | --- |
| T3 | T7 |
| T4 | T8 |
| T5 | P7 |
| T6 | P8 |

Ce changement de nom est indiqué dans la ligne directrice 1 de l'ACNS ([Sinha et coll., 2016](https://doi.org/10.1097/WNP.0000000000000308)). Si un manuel dit T3 et que votre bonnet dit T7, c'est le même endroit.

![Positions d'électrodes du système 10-10, colorées selon le lobe cérébral, avec une vue de côté qui montre le nasion, l'inion et les points préauriculaires](/learn/images/first-eeg-recording/10-10.svg)

*Le système 10-10. Nz est le nasion, Iz l'inion, LPA et RPA les points préauriculaires gauche et droit. Schéma de Laurens R. Krol, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:EEG_10-10_system_with_additional_information.svg), CC0. Un fond blanc a été ajouté pour cette page.*

**En pratique :** les bonnets existent en plusieurs tailles selon le tour de tête. Mesurez la tête avec un ruban souple, choisissez le bonnet, puis vérifiez que Cz est bien à mi-chemin entre le nasion et l'inion, et à mi-chemin entre les deux oreilles. Un bonnet qui a glissé d'un ou deux centimètres vers l'arrière explique souvent des résultats étranges.

## Électrodes humides, sèches et semi-sèches

La couche externe de la peau, la couche cornée, conduit mal l'électricité. C'est la plus grande part de la résistance électrique entre l'électrode et le corps ([Lopez-Gordo et coll., 2014](https://doi.org/10.3390/s140712847)). Les types d'électrodes se distinguent surtout par leur façon de composer avec cette couche et avec les cheveux.

| Type | Fonctionnement | Avantages | Inconvénients |
| --- | --- | --- | --- |
| **Humide** | Disque de métal, en général argent/chlorure d'argent (Ag/AgCl) ou or, avec un gel ou une pâte conductrice entre l'électrode et la peau | Contact le plus faible et le plus stable; c'est la norme à laquelle on compare les autres types | La pose prend du temps; il faut laver les cheveux ensuite; le gel sèche peu à peu; trop de gel peut relier deux électrodes voisines |
| **Sèche** | Picots, peignes ou polymère conducteur appuyés sur la peau, sans gel | Rapide à poser; pratique pour un usage répété ou quotidien | Impédance de contact plus élevée; plus sensible au mouvement; demande en général un amplificateur intégré à l'électrode (électrode « active ») |
| **Semi-sèche** | Une éponge, un feutre ou un petit réservoir libère un peu d'électrolyte, souvent une solution saline, au point de contact | Un compromis : peu de dégâts, impédance plus basse qu'une électrode sèche | Les feutres sèchent et doivent être réhumidifiés; la solution saline peut couler et relier des électrodes |

La revue de [Lopez-Gordo et coll. (2014)](https://doi.org/10.3390/s140712847) conclut que les électrodes humides restent la référence, et que les électrodes sèches s'en approchent, mais qu'elles ont été évaluées avec des méthodes très différentes. De nouveaux modèles semi-secs paraissent régulièrement; [Hua et coll. (2019)](https://doi.org/10.3390/mi10080518) en décrivent un qui garde l'électrolyte dans une couche réservoir et le libère lentement pour enregistrer sur des zones couvertes de cheveux.

Le **pont salin** mérite d'être connu tôt. Si le gel ou la solution saline s'étend entre deux électrodes, elles deviennent électriquement une seule électrode. Les deux voies montrent alors presque le même signal. La ligne directrice 1 de l'ACNS indique qu'une impédance inférieure à 100 Ω signale en général un court-circuit de ce genre ([Sinha et coll., 2016](https://doi.org/10.1097/WNP.0000000000000308)).

## Référence, masse et polarisation (DRL)

### La référence

Un amplificateur EEG ne peut pas mesurer la tension en un seul point. Il ne mesure qu'une **différence entre deux points**. Chaque voie est la tension à son électrode moins la tension à une électrode de **référence** commune. On place souvent la référence sur un lobe d'oreille (A1 ou A2), sur la mastoïde derrière l'oreille (M1 ou M2), sur la ligne médiane (Cz ou FCz) ou sur le front (Fpz).

Trois conséquences :

1. **Une mauvaise référence gâche toutes les voies à la fois.** Si toutes les voies deviennent bruitées de la même façon, vérifiez d'abord la référence. Le manuel d'Emotiv donne le même conseil : quand toutes les voies montrent la même mauvaise qualité, la cause probable est le contact des capteurs de référence ([manuel de l'EPOC d'Emotiv](https://emotiv.gitbook.io/epoc-user-manual/troubleshooting/contact_quality), en anglais).
2. **L'activité au site de référence apparaît dans toutes les voies.** Une référence posée sur les muscles de la mâchoire, par exemple, ajoute du bruit musculaire partout.
3. **Vous pouvez changer de référence plus tard par logiciel** (par exemple pour la moyenne de toutes les voies), mais vous ne pouvez pas enlever un problème qui touchait la référence pendant l'enregistrement.

### Masse et polarisation

L'amplificateur a aussi besoin que le corps soit à une tension connue par rapport à son propre circuit. Les systèmes cliniques utilisent pour cela une électrode de **masse**. Beaucoup de cartes de recherche et de cartes à monter soi-même construites autour de la puce ADS1299 de Texas Instruments, dont OpenBCI et PiEEG, utilisent plutôt une électrode de **polarisation** (*bias*). L'ADS1299 comprend un amplificateur de polarisation intégré à cette fin ([page de l'ADS1299 chez TI](https://www.ti.com/product/ADS1299), en anglais).

L'électrode de polarisation fonctionne comme le circuit dit **de la jambe droite pilotée** (*driven right leg*, DRL), mis au point d'abord pour l'enregistrement du cœur ([Winter et Webster, 1983](https://doi.org/10.1109/tbme.1983.325168)). L'amplificateur mesure la partie du signal qui est la même sur toutes les électrodes, le signal **de mode commun**. Le ronflement du réseau électrique capté par tout le corps en constitue une grande partie. L'amplificateur renvoie ensuite dans le corps une copie inversée de ce signal par l'électrode de polarisation, ce qui le réduit. Les casques Emotiv utilisent la même idée avec une paire d'électrodes nommées CMS et DRL.

![Schéma : une électrode active en Cz et une référence sur le lobe de l'oreille gauche vont aux entrées plus et moins d'un amplificateur différentiel, dont la sortie est la voie Cz moins A1. Une électrode de polarisation sur le lobe de l'oreille droite est pilotée par un amplificateur de polarisation.](/learn/images/first-eeg-recording/reference-bias-fr.svg)

*Comment se branchent les trois sortes d'électrodes. Schéma réalisé par NeuroTechX pour cette leçon.*

On appelle souvent l'électrode de polarisation « masse ». Sur des cartes comme OpenBCI, les étiquettes que vous verrez sont **SRB** (la référence) et **BIAS** (la polarisation).

## Impédance : le contact est-il bon?

L'**impédance** mesure à quel point la jonction électrode-peau s'oppose à un petit courant alternatif. Elle s'exprime en ohms, en général en kilo-ohms (kΩ). Le logiciel la mesure en envoyant un très faible courant de test dans l'électrode. La documentation d'OpenBCI décrit ainsi son module de mesure d'impédance ([documentation de l'interface OpenBCI](https://docs.openbci.com/Software/OpenBCISoftware/GUIDocs/), en anglais).

Pourquoi c'est important :

- **Bruit du réseau et dérive lente.** Dans une étude qui enregistrait en même temps des sites à faible et à forte impédance, [Kappenman et Luck (2010)](https://doi.org/10.1111/j.1469-8986.2010.01009.x) ont trouvé plus de bruit de basse fréquence aux sites à forte impédance, surtout quand la pièce était chaude et humide.
- **L'équilibre compte autant que la valeur.** L'amplificateur élimine le bruit qui est identique sur ses deux entrées (réjection du mode commun). Cela fonctionne mieux quand les impédances sont semblables. La ligne directrice 1 de l'ACNS indique qu'avec l'équipement numérique moderne, des impédances jusqu'à 10 kΩ sont acceptables, mais qu'un enregistrement optimal demande quand même des impédances équilibrées ([Sinha et coll., 2016](https://doi.org/10.1097/WNP.0000000000000308)).
- **Les amplificateurs modernes sont plus tolérants.** [Ferree et coll. (2001)](https://doi.org/10.1016/s1388-2457%2800%2900533-2) n'ont trouvé aucun changement significatif de l'amplitude de l'EEG quand l'impédance passait de moins de 10 kΩ à 40 kΩ avec des amplificateurs à haute impédance d'entrée.

Le seuil de 10 kΩ est une ligne directrice clinique pour les électrodes humides. Les systèmes secs et semi-secs ont des valeurs plus élevées par conception : utilisez le seuil proposé par le logiciel de votre appareil. Ce que vous pouvez toujours viser, ce sont des valeurs **basses, semblables entre elles et stables**.

Pour faire baisser l'impédance : écartez les cheveux sous l'électrode, ajoutez un peu de gel (humide) ou de solution saline (semi-sèche), appuyez l'électrode doucement mais fermement et laissez-lui une minute pour se stabiliser. Ne grattez pas et n'abrasez pas la peau. Briser la peau crée un risque d'infection ([Ferree et coll., 2001](https://doi.org/10.1016/s1388-2457%2800%2900533-2)).

## Les artéfacts que vous verrez

Un **artéfact** est tout signal de l'enregistrement qui ne vient pas du cerveau. Certains viennent du corps, d'autres de l'équipement et de la pièce ([Jiang et coll., 2019](https://doi.org/10.3390/s19050987)). Le tableau décrit leur allure sur un affichage en direct.

| Artéfact | Allure | Où il est le plus fort | Que faire |
| --- | --- | --- | --- |
| **Clignements des yeux** | Grosses bosses arrondies d'une fraction de seconde, bien plus grandes que l'EEG | Avant de la tête : Fp1, Fp2, AF7, AF8 | C'est normal. Demandez de cligner naturellement; repérez les clignements ou retirez-les plus tard (par exemple avec l'ACI) |
| **Mouvements des yeux** | Décalages en escalier quand les yeux regardent à gauche ou à droite | Avant et côtés de la tête, de signe opposé à gauche et à droite | Donnez un point fixe à regarder |
| **Mâchoire serrée, parole, déglutition** | Bouffées d'activité rapide et pointue; l'activité musculaire couvre une large gamme de fréquences, de près de 0 Hz à plus de 200 Hz | Sites temporaux (T7, T8, TP9, TP10), au-dessus des muscles de la mâchoire | Demandez de détendre la mâchoire et de garder la bouche légèrement ouverte |
| **Bruit du réseau (50 ou 60 Hz)** | Une oscillation rapide et régulière qui épaissit le tracé; un pic net à 50 ou 60 Hz dans le spectre | Une seule voie : mauvais contact de cette électrode. Toutes les voies : la référence ou la polarisation, ou la pièce | Corrigez d'abord le contact. Éloignez-vous des fils d'alimentation. N'utilisez un filtre coupe-bande qu'ensuite |
| **Mouvements de la tête et du corps** | Grandes oscillations lentes, souvent sur plusieurs voies à la fois | Partout | Demandez à la personne de s'asseoir confortablement et de rester immobile |
| **Balancement des câbles** | Ondes lentes irrégulières qui suivent le mouvement des fils | Les voies dont les fils bougent | Regroupez et fixez les câbles |
| **Sueur** | Dérive lente de la ligne de base sur quelques secondes; des voies voisines peuvent se mettre à se ressembler | Partout, pire dans une pièce chaude | Gardez la pièce fraîche; asséchez la peau; vérifiez s'il y a des ponts salins |
| **Battements du cœur** | Petite onde régulière environ une fois par seconde | Électrodes près de vaisseaux sanguins ou du cou | En général sans gravité; notez-le |

Quelques précisions.

**Les clignements** sont produits par l'œil et la paupière, pas par le cerveau. Le signal électrique des yeux est plusieurs fois plus grand que l'EEG ([Jiang et coll., 2019](https://doi.org/10.3390/s19050987)). Sur un appareil frontal comme le Muse, ce sont les premiers artéfacts que vous verrez.

**Le bruit du réseau** vient du réseau électrique. Il est à 60 Hz au Canada, aux États-Unis et dans une partie de l'Amérique du Sud, et à 50 Hz en Europe, dans la majeure partie de l'Afrique et dans la majeure partie de l'Asie ([Wikipédia : électricité du réseau par pays](https://en.wikipedia.org/wiki/Mains_electricity_by_country), en anglais). Le guide d'OpenBCI conseille de garder la carte loin des fils d'alimentation et des appareils branchés au mur, et nomme d'autres sources : rallonges au sol, câblage dans les murs, bureaux en métal et certains éclairages ([OpenBCI : réduire le bruit](https://docs.openbci.com/Troubleshooting/minimizingNoise/), en anglais).

**Le balancement des câbles** pose surtout problème avec les électrodes passives, les simples fils fournis dans la plupart des trousses de départ. OpenBCI note qu'agiter les fils d'électrodes qui pendent perturbe fortement les signaux, et suggère de les attacher ensemble avec du ruban électrique. Les électrodes actives réduisent ce problème ([OpenBCI : réduire le bruit](https://docs.openbci.com/Troubleshooting/minimizingNoise/)).

**La sueur** modifie le contact pendant l'enregistrement. L'étude de [Kappenman et Luck (2010)](https://doi.org/10.1111/j.1469-8986.2010.01009.x) a montré que le bruit supplémentaire aux sites à forte impédance était le pire dans une pièce chaude et humide, et qu'une pièce fraîche et sèche le réduisait.

**Un bon premier exercice :** au début de votre première séance, enregistrez chaque artéfact volontairement pendant quelques secondes et annotez-le. Clignez cinq fois. Regardez à gauche, puis à droite. Serrez la mâchoire. Hochez la tête. Balancez un câble. Vous apprendrez à quoi ressemble chacun dans votre propre système et, par la suite, vous les reconnaîtrez tout de suite.

## Sécurité électrique

L'EEG pose des électrodes conductrices sur la tête d'une personne. La sécurité électrique n'est donc pas facultative. Les règles ci-dessous viennent de la documentation des fabricants.

**1. Alimentez les cartes à monter soi-même par batterie et tenez la personne loin du réseau électrique.**

- Les cartes OpenBCI sont conçues pour être alimentées seulement par des sources de courant continu à basse tension, c'est-à-dire des batteries, et non par le réseau, une prise murale ou un port USB ([politique de responsabilité d'OpenBCI](https://docs.openbci.com/Policies/Liability/), en anglais). La fiche technique de la Cyton précise « Power with 3-6V DC Battery ONLY » ([caractéristiques de la Cyton](https://docs.openbci.com/Cyton/CytonSpecs/)). La carte communique avec l'ordinateur par radio, au moyen d'une clé USB.
- La carte PiEEG n'a **aucune isolation**. Tant que des électrodes sont posées sur une personne, le Raspberry Pi, la PiEEG et tout ce qui y est branché doivent fonctionner sur une batterie externe de 5 V. Cela exclut un chargeur mural, un écran branché au mur (le câble HDMI relie alors le réseau au Pi) et un câble USB ou Ethernet vers un ordinateur branché au mur. Un ordinateur portable convient s'il fonctionne sur sa batterie et se connecte par Wi-Fi ([page sécurité de PiEEG](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/), en anglais).

**2. Ne rechargez rien de ce qui est relié à la personne pendant une séance.** PiEEG demande de recharger la batterie externe avant la séance, jamais pendant ([page sécurité de PiEEG](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)). Appliquez la même règle à tout montage maison : si un portable est relié par fil à une carte non isolée, débranchez son chargeur avant de poser les électrodes.

**Pourquoi c'est important.** Les électrodes et le gel créent une connexion à faible résistance entre le circuit et le corps de la personne. Si ce circuit est relié par fil à un appareil alimenté par le réseau, une défaillance ou un courant de fuite dans l'alimentation de cet appareil trouve un chemin à travers la personne. Une carte sur batterie, sans lien filaire avec un appareil branché au réseau, n'offre pas ce chemin. Comme le dit PiEEG, l'isolation complète par rapport au réseau « dépend entièrement du fonctionnement sur batterie ».

**Pourquoi l'EEG médical est différent.** Les systèmes EEG cliniques sont conçus et testés selon la norme **CEI 60601-1** (IEC 60601-1), la norme internationale sur la sécurité de base des appareils électromédicaux ([CEI 60601-1](https://webstore.iec.ch/en/publication/2612)). Selon cette norme, les parties qui touchent le patient sont classées selon leur degré d'isolation. Les classes BF et CF sont électriquement « flottantes », et la norme limite le courant qui peut fuir à travers le patient, en usage normal comme lors d'une première défaillance ([Advanced Energy : conception pour les classes BF et CF](https://www.advancedenergy.com/en-us/about/news/blog/safety-requirements-in-medical-equipment-designing-for-bf-and-cf-classifications/), en anglais). C'est cette isolation qui permet de brancher sans danger un amplificateur d'hôpital au réseau. Les cartes de développement et les cartes à monter soi-même ne l'ont pas : c'est pourquoi elles dépendent d'une batterie.

**3. Autres règles des fabricants.**

- Ces cartes ne sont pas des dispositifs médicaux et ne doivent servir ni à diagnostiquer ni à traiter quoi que ce soit ([politique de responsabilité d'OpenBCI](https://docs.openbci.com/Policies/Liability/), [page sécurité de PiEEG](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).
- N'enregistrez pas une personne qui porte un stimulateur cardiaque ou un autre dispositif électronique implanté sans l'accord d'un médecin ([page sécurité de PiEEG](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).
- Utilisez une peau propre et intacte, arrêtez si la peau s'irrite et retirez le gel après la séance ([page sécurité de PiEEG](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/)).

## Liste de vérification pour votre première séance

**Avant l'arrivée de la personne**

- [ ] Batteries chargées; rien n'aura besoin d'être rechargé pendant la séance.
- [ ] Portable sur batterie avec le chargeur débranché, ou relié seulement par radio (Bluetooth, Wi-Fi, clé radio).
- [ ] Logiciel installé et testé avec la carte seule, ou avec la carte synthétique de BrainFlow (voir plus bas).
- [ ] Filtre coupe-bande réglé sur la fréquence de votre réseau (60 Hz au Canada et aux États-Unis, 50 Hz en Europe).
- [ ] Pièce fraîche, chaise confortable, téléphones et chargeurs éloignés des câbles.
- [ ] Électrodes propres et sèches; gel, solution saline, mouchoirs et ruban à mesurer à portée de main.

**Pose des électrodes**

- [ ] Expliquez ce que vous allez faire et obtenez l'accord de la personne. Demandez-lui si elle porte un dispositif implanté ou si elle a des problèmes de peau.
- [ ] Mesurez la tête; placez Cz au point milieu; vérifiez que le bonnet est centré et droit.
- [ ] Posez **d'abord la référence et la polarisation** et vérifiez leur contact. Toutes les voies en dépendent.
- [ ] Écartez les cheveux sous chaque électrode; appliquez du gel ou de la solution saline selon votre système.
- [ ] Vérifiez l'impédance ou la qualité du contact. Visez des valeurs basses, semblables et stables. Corrigez d'abord la pire voie.
- [ ] Regroupez et fixez les câbles.

**Avant d'appuyer sur Enregistrer**

- [ ] Regardez le signal brut pendant une minute, filtres désactivés. Toutes les voies sont-elles vivantes? Une voie est-elle plate ou beaucoup plus bruitée que les autres?
- [ ] Enregistrez le tour des artéfacts : clignements, mouvements des yeux, mâchoire serrée, hochement de tête, câble balancé. Annotez chacun.
- [ ] Enregistrez deux minutes les yeux ouverts, puis deux minutes les yeux fermés. Les yeux fermés, la plupart des gens montrent une nette hausse du rythme alpha (8 à 13 Hz), plus forte à l'arrière de la tête. La voir est bon signe : vous enregistrez bien l'activité du cerveau.
- [ ] Prenez des notes : date, appareil, positions des électrodes, référence, impédances, conditions de la pièce, tout ce qui a mal tourné.

**Après la séance**

- [ ] Sauvegardez ensemble les données brutes, non filtrées, et vos notes.
- [ ] Nettoyez les électrodes comme le recommande le fabricant et aidez la personne à retirer le gel.

## Notes sur les appareils

### OpenBCI (Cyton et Ganglion)

- Alimentation par batterie seulement (voir la section sur la sécurité). La Cyton est construite autour de la puce ADS1299 ([caractéristiques de la Cyton](https://docs.openbci.com/Cyton/CytonSpecs/), en anglais).
- Dans le guide d'installation EEG d'OpenBCI, la référence se branche sur la broche **SRB2** (REF sur la Ganglion) et la polarisation sur la broche **BIAS** (D_G sur la Ganglion). Le guide en place une sur chaque lobe d'oreille ([installation EEG OpenBCI](https://docs.openbci.com/GettingStarted/Biosensing-Setups/EEGSetup/), en anglais).
- L'interface OpenBCI a un module de mesure d'impédance. Une valeur en rouge veut dire qu'il faut ajuster l'électrode, écarter les cheveux ou ajouter du gel ou de la pâte ([documentation de l'interface OpenBCI](https://docs.openbci.com/Software/OpenBCISoftware/GUIDocs/)).
- L'interface offre un filtre coupe-bande à 50 ou 60 Hz, et le guide sur le bruit donne des conseils pratiques : brancher la clé sur une rallonge USB, s'asseoir un peu à l'écart de l'ordinateur, utiliser une batterie bien chargée ([OpenBCI : réduire le bruit](https://docs.openbci.com/Troubleshooting/minimizingNoise/)).
- Sortie des données : le module Networking de l'interface diffuse par LSL ([modules de l'interface OpenBCI](https://docs.openbci.com/Software/OpenBCISoftware/GUIWidgets/), en anglais); BrainFlow prend en charge la Cyton, la Cyton Daisy et la Ganglion.

### Muse

- Le Muse 2 enregistre à quatre positions fixes, **TP9, AF7, AF8 et TP10**, avec la référence en **FPz**, à 256 Hz ([page produit du Muse 2](https://choosemuse.com/products/muse-2), en anglais). On ne peut pas déplacer les capteurs : il convient aux signaux du front et de derrière les oreilles, comme les clignements, l'alpha frontal et l'activité des muscles de la mâchoire, mais pas à l'imagerie motrice en C3 et C4.
- Le guide de démarrage de Muse donne ces conseils pour un bon signal : s'assurer qu'aucun cheveu ne se trouve entre les capteurs et la peau; essuyer les capteurs avec un linge ou un mouchoir légèrement humecté d'eau; déployer les deux branches de façon égale; attendre de 30 à 60 secondes après chaque ajustement pour que le signal se stabilise. La vérification des capteurs dans l'application indique si le bandeau est bien placé ([guide de démarrage du Muse 2](https://choosemuse.com/blogs/news/muse-2-starter-guide), en anglais).
- Sortie des données : BrainFlow prend en charge les Muse 2, Muse S, Muse S Athena et Muse 2016 ([cartes prises en charge par BrainFlow](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html), en anglais).

### PiEEG

- La PiEEG est une carte d'extension pour Raspberry Pi construite autour de l'ADS1299. Les voies 1 à 8 vont aux électrodes d'un bonnet 10-20; la **référence** est une pince sur un lobe d'oreille et la **polarisation** une pince sur l'autre ([PiEEG sur GitHub](https://github.com/pieeg-club/PiEEG-8), en anglais).
- Lisez la [page sécurité](https://docs.pieeg.com/hardware/devices/pieeg-8/safety/) avant la première séance. Les règles sur les batteries, les écrans et les portables de la section sur la sécurité en viennent.
- Sortie des données : le serveur PiEEG diffuse en CSV, LSL et OSC, et BrainFlow comprend une carte PiEEG ([PiEEG sur GitHub](https://github.com/pieeg-club/PiEEG-8)).

### Emotiv (EPOC X)

- L'EPOC X a 14 voies en **AF3, F7, F3, FC5, T7, P7, O1, O2, P8, T8, FC6, F4, F8 et AF4**, plus des références **CMS/DRL**. Les capteurs sont en Ag/AgCl avec des feutres imbibés de solution saline (semi-secs), et la fréquence d'échantillonnage est de 128 ou 256 échantillons par seconde ([caractéristiques techniques de l'EPOC X](https://emotiv.gitbook.io/epoc-x-user-manual/introduction/technical-specifications), en anglais).
- La carte de qualité du contact d'Emotiv affiche chaque capteur en vert, orange, rouge ou noir. Mettez d'abord les capteurs de référence au vert avant d'ajuster les autres ([manuel de l'EPOC](https://emotiv.gitbook.io/epoc-user-manual/troubleshooting/contact_quality)).
- Emotiv distingue la **qualité du contact** (CQ), qui est une mesure d'impédance, de la **qualité de l'EEG** (EQ), un score produit par un algorithme entraîné. Emotiv note qu'un signal à faible impédance n'est pas forcément un signal du cerveau ([EmotivPRO : CQ et EQ](https://emotiv.gitbook.io/emotivpro-v3/emotivpro-menu/contact-quality-map/contact-quality-cq-vs.-eeg-quality-eq), en anglais).
- Sortie des données : EmotivPRO peut diffuser par LSL ([sortie LSL d'EmotivPRO](https://emotiv.gitbook.io/emotivpro-v3/lab-streaming-layer-lsl/lsl-outlet), en anglais). Emotiv ne figure pas dans la liste des cartes prises en charge par BrainFlow.

## Sortir les données : LSL et BrainFlow

Deux outils libres permettent de faire passer les données de presque tous ces appareils dans votre propre code.

- **[Lab Streaming Layer (LSL)](https://labstreaminglayer.readthedocs.io/)** envoie des flux de données sur le réseau local avec des horodatages communs. C'est la façon habituelle d'enregistrer l'EEG avec d'autres flux, comme les marqueurs d'événements d'une expérience, et de tout sauvegarder dans un seul fichier. Les logiciels d'OpenBCI, d'Emotiv et de PiEEG peuvent envoyer des flux LSL.
- **[BrainFlow](https://brainflow.readthedocs.io/)** est une bibliothèque qui offre une seule interface pour de nombreuses cartes, en Python et dans d'autres langages. On change une ligne pour passer d'une carte à l'autre.

L'exemple Python ci-dessous utilise la **carte synthétique** de BrainFlow : vous pouvez l'exécuter sans matériel (`pip install brainflow numpy`). Il enregistre 10 secondes, sauvegarde les données brutes, puis affiche pour chaque voie l'écart-type et la part de la puissance située près de 50 Hz et de 60 Hz. Faites la même vérification sur de vraies données : une voie avec une grande part à 50 ou 60 Hz a en général un mauvais contact.

```python
import time

import numpy as np
from brainflow.board_shim import BoardIds, BoardShim, BrainFlowInputParams
from brainflow.data_filter import DataFilter

board_id = BoardIds.SYNTHETIC_BOARD  # ensuite : CYTON_BOARD, MUSE_2_BOARD, PIEEG_BOARD...
params = BrainFlowInputParams()  # p. ex. params.serial_port = "/dev/ttyUSB0" pour une Cyton

BoardShim.disable_board_logger()
board = BoardShim(board_id, params)
board.prepare_session()
board.start_stream()
time.sleep(10)  # enregistrer 10 secondes
data = board.get_board_data()
board.stop_stream()
board.release_session()

DataFilter.write_file(data, "premiere_seance.csv", "w")  # garder les données brutes

fs = BoardShim.get_sampling_rate(board_id)
for ch in BoardShim.get_eeg_channels(board_id):
    x = data[ch] - data[ch].mean()
    power = np.abs(np.fft.rfft(x)) ** 2
    freqs = np.fft.rfftfreq(len(x), 1 / fs)
    total = power[(freqs > 1) & (freqs < 100)].sum()
    share = {f: power[np.abs(freqs - f) < 1].sum() / total for f in (50, 60)}
    print(f"voie {ch} : écart-type {x.std():.1f} uV, "
          f"part à 50 Hz {share[50]:.1%}, part à 60 Hz {share[60]:.1%}")
```

Sur la carte synthétique, la plupart des voies ne montrent presque aucun bruit du réseau, et une ou deux voies montrent une grande part à 50 ou à 60 Hz. C'est à cela que ressemble, en chiffres, une voie avec un mauvais contact. Chaque vraie carte a ses propres réglages de connexion (port série, adresse MAC, etc.), décrits dans la [page des cartes prises en charge par BrainFlow](https://brainflow.readthedocs.io/en/stable/SupportedBoards.html).

La leçon suivante, [Outils logiciels pour les BCI](/learn/bci-software), explique quoi faire des données une fois que vous les avez.

## Références

- Acharya JN, Hani A, Cheek J, Thirumala P, Tsuchida TN (2016). American Clinical Neurophysiology Society Guideline 2: Guidelines for standard electrode position nomenclature. *Journal of Clinical Neurophysiology* 33(4):308-311. [doi:10.1097/WNP.0000000000000316](https://doi.org/10.1097/WNP.0000000000000316)
- Ferree TC, Luu P, Russell GS, Tucker DM (2001). Scalp electrode impedance, infection risk, and EEG data quality. *Clinical Neurophysiology* 112(3):536-544. [doi:10.1016/s1388-2457(00)00533-2](https://doi.org/10.1016/s1388-2457%2800%2900533-2)
- Hua H, Tang W, Xu X, Feng DD, Shu L (2019). Flexible multi-layer semi-dry electrode for scalp EEG measurements at hairy sites. *Micromachines* 10(8):518. [doi:10.3390/mi10080518](https://doi.org/10.3390/mi10080518)
- Jiang X, Bian GB, Tian Z (2019). Removal of artifacts from EEG signals: a review. *Sensors* 19(5):987. [doi:10.3390/s19050987](https://doi.org/10.3390/s19050987)
- Kappenman ES, Luck SJ (2010). The effects of electrode impedance on data quality and statistical significance in ERP recordings. *Psychophysiology* 47(5):888-904. [doi:10.1111/j.1469-8986.2010.01009.x](https://doi.org/10.1111/j.1469-8986.2010.01009.x)
- Lopez-Gordo MA, Sanchez-Morillo D, Pelayo Valle F (2014). Dry EEG electrodes. *Sensors* 14(7):12847-12870. [doi:10.3390/s140712847](https://doi.org/10.3390/s140712847)
- Sinha SR, Sullivan L, Sabau D, et coll. (2016). American Clinical Neurophysiology Society Guideline 1: Minimum technical requirements for performing clinical electroencephalography. *Journal of Clinical Neurophysiology* 33(4):303-307. [doi:10.1097/WNP.0000000000000308](https://doi.org/10.1097/WNP.0000000000000308)
- Winter BB, Webster JG (1983). Driven-right-leg circuit design. *IEEE Transactions on Biomedical Engineering* 30(1):62-66. [doi:10.1109/tbme.1983.325168](https://doi.org/10.1109/tbme.1983.325168)
