import type { ChapterCheck, Question } from './primer-checks';

type CheckCopy = Pick<Question, 'prompt' | 'choices' | 'explanation'> & { goal: string };

function check(section: string, page: number, correct: number, fr: CheckCopy, en: CheckCopy) {
    const { goal: frGoal, ...frQuestion } = fr;
    const { goal: enGoal, ...enQuestion } = en;
    return {
        fr: { goal: frGoal, reading: `Lisez la section ${section}.`, questions: [{ ...frQuestion, id: 'application', section, page, correct }] },
        en: { goal: enGoal, reading: `Read section ${section}.`, questions: [{ ...enQuestion, id: 'application', section, page, correct }] },
    } satisfies Record<'fr' | 'en', ChapterCheck>;
}

export const additionalPrimerChecks = {
    history: check('1.3', 5, 1, {
        goal: 'Reconnaître le passage de l’observation à l’interaction.',
        prompt: 'Quel exemple illustre l’idée, présentée dans ce chapitre, d’utiliser des signaux cérébraux pour interagir avec un ordinateur ?',
        choices: ['Une image de l’anatomie cérébrale.', 'Un clavier qui sélectionne des lettres à partir de réponses EEG.', 'Un tracé EEG imprimé pour archivage.'],
        explanation: 'Le clavier P300 transforme une réponse EEG en commande pour choisir une lettre. C’est la fonction d’interface qui distingue cet exemple.',
    }, {
        goal: 'Recognize the shift from observing brain activity to using it for interaction.',
        prompt: 'Which example illustrates the chapter’s idea of using brain signals to interact with a computer?',
        choices: ['An image of brain anatomy.', 'A keyboard that selects letters from EEG responses.', 'An EEG trace printed for archiving.'],
        explanation: 'The P300 speller translates an EEG response into a letter-selection command. That gives brain activity a role in operating the interface.',
    }),
    meg: check('3.4.1', 37, 2, {
        goal: 'Distinguer la précision temporelle et la localisation des sources.',
        prompt: 'Un laboratoire double la fréquence d’échantillonnage de son système MEG. Quel problème doit-il encore résoudre pour localiser une source cérébrale ?',
        choices: ['Identifier le radiotraceur.', 'Déterminer l’oxygénation de chaque voxel.', 'Estimer quelles sources pourraient produire les champs mesurés.'],
        explanation: 'Les capteurs mesurent les champs à l’extérieur de la tête. La localisation nécessite un modèle et des hypothèses pour résoudre le problème inverse, même avec davantage d’échantillons.',
    }, {
        goal: 'Distinguish timing precision from source localization.',
        prompt: 'A lab doubles its MEG sampling rate. What problem does it still need to solve to locate a brain source?',
        choices: ['Identify the radiotracer.', 'Determine blood oxygenation in each voxel.', 'Estimate which sources could produce the measured fields.'],
        explanation: 'The sensors measure fields outside the head. Localization requires a model and assumptions to solve the inverse problem even when more samples are available.',
    }),
    fnirs: check('5.4', 58, 0, {
        goal: 'Identifier la mesure qui relie la lumière à l’activité cérébrale.',
        prompt: 'Pendant une tâche, la quantité de lumière proche infrarouge qui arrive au détecteur change. Quelle mesure peut-on en estimer avec la fNIRS ?',
        choices: ['Des variations d’hémoglobine oxygénée et désoxygénée.', 'La tension électrique des neurones.', 'La concentration d’un radiotraceur.'],
        explanation: 'Les deux formes d’hémoglobine absorbent différemment la lumière. Leurs variations servent d’indice hémodynamique indirect de l’activité cérébrale.',
    }, {
        goal: 'Identify the measurement that links light to brain activity.',
        prompt: 'During a task, the amount of near-infrared light reaching a detector changes. What can fNIRS estimate from those measurements?',
        choices: ['Changes in oxygenated and deoxygenated hemoglobin.', 'The electrical voltage of neurons.', 'The concentration of a radiotracer.'],
        explanation: 'The two forms of hemoglobin absorb light differently. Changes in their concentrations provide an indirect hemodynamic measure related to brain activity.',
    }),
    pet: check('6.2', 70, 1, {
        goal: 'Relier le choix du radiotraceur à la question étudiée.',
        prompt: 'Une équipe passe d’une étude du métabolisme à une étude de la distribution d’un récepteur. Quel choix détermine si la TEP peut sonder cette nouvelle cible ?',
        choices: ['Le choix d’un canal EEG.', 'Le choix d’un radiotraceur adapté au récepteur.', 'La couleur de la carte finale.'],
        explanation: 'Le radiotraceur détermine le processus biologique suivi. Dans une étude de récepteurs, le ligand doit cibler le récepteur étudié.',
    }, {
        goal: 'Connect radiotracer choice to the research question.',
        prompt: 'A team switches from studying metabolism to mapping a receptor. Which choice determines whether PET can probe the new target?',
        choices: ['The choice of an EEG channel.', 'The choice of a radiotracer suited to the receptor.', 'The color scale of the final map.'],
        explanation: 'The radiotracer determines which biological process the scan follows. A receptor study needs a tracer with a ligand suited to the receptor of interest.',
    }),
    ieeg: check('7.3.1', 87, 2, {
        goal: 'Reconnaître le compromis entre l’accès local et la couverture.',
        prompt: 'Une électrode intracrânienne fournit un signal détaillé dans une région. Quel renseignement faut-il avant de conclure que deux autres régions sont inactives ?',
        choices: ['La couleur attribuée à chaque tracé.', 'La durée de charge de l’amplificateur.', 'L’emplacement des contacts et la couverture des deux régions.'],
        explanation: 'Les enregistrements intracrâniens renseignent sur les sites échantillonnés. L’emplacement des contacts limite les conclusions possibles sur les autres régions.',
    }, {
        goal: 'Recognize the tradeoff between local access and brain coverage.',
        prompt: 'An intracranial electrode gives a detailed signal in one region. What do you need to know before inferring that two other regions are inactive?',
        choices: ['The colors assigned to the traces.', 'The amplifier’s charging time.', 'Where the contacts are and whether they cover those regions.'],
        explanation: 'Intracranial recordings give information about the sites they sample. Electrode coverage limits what the recordings can say about other regions.',
    }),
    tes: check('8.6', 118, 0, {
        goal: 'Interpréter la portée d’une carte de champ électrique.',
        prompt: 'Un modèle de tES indique un champ plus fort dans une région. Que montre directement cette carte ?',
        choices: ['Une estimation de la distribution du champ électrique.', 'Une mesure de l’activité des neurones individuels.', 'Une preuve que l’intervention améliore les symptômes.'],
        explanation: 'Le modèle prédit le champ pour une anatomie et des paramètres donnés. Mesurer l’effet physiologique ou clinique demande d’autres données.',
    }, {
        goal: 'Interpret what a modeled electric field can tell you.',
        prompt: 'A tES model shows a stronger field in one region. What does the map directly represent?',
        choices: ['An estimate of the electric field distribution.', 'A measurement of individual neurons firing.', 'Evidence that the intervention improves symptoms.'],
        explanation: 'The model predicts the field for a given anatomy and setup. Physiological and clinical outcomes require separate measurements.',
    }),
    tms: check('9.2', 128, 1, {
        goal: 'Expliquer le principe d’induction de la TMS.',
        prompt: 'Quel lien physique permet à une bobine externe de produire un champ électrique dans le tissu cérébral ?',
        choices: ['L’absorption de la lumière proche infrarouge.', 'L’induction électromagnétique due à un champ magnétique variable.', 'L’émission de positons par un traceur.'],
        explanation: 'Une variation du champ magnétique de la bobine induit un champ électrique dans les tissus conducteurs.',
    }, {
        goal: 'Explain the induction principle behind TMS.',
        prompt: 'What physical mechanism allows an external coil to produce an electric field in brain tissue?',
        choices: ['Absorption of near-infrared light.', 'Electromagnetic induction from a changing magnetic field.', 'Positron emission from a tracer.'],
        explanation: 'A change in the coil’s magnetic field induces an electric field in conductive tissue.',
    }),
    dbs: check('10.2', 141, 2, {
        goal: 'Reconnaître l’interface utilisée pour la stimulation cérébrale profonde.',
        prompt: 'Dans un système de stimulation cérébrale profonde, quel élément délivre la stimulation à la structure ciblée ?',
        choices: ['Un détecteur optique sur le cuir chevelu.', 'Une bobine externe près de la tête.', 'Des contacts électriques implantés dans le cerveau.'],
        explanation: 'Un générateur envoie des impulsions aux contacts implantés, qui délivrent la stimulation au site visé.',
    }, {
        goal: 'Identify how deep brain stimulation interfaces with its target.',
        prompt: 'In a deep brain stimulation system, what delivers stimulation to the target structure?',
        choices: ['An optical detector on the scalp.', 'An external coil held near the head.', 'Electrical contacts implanted in the brain.'],
        explanation: 'A pulse generator sends electrical pulses through implanted contacts to the target site.',
    }),
    fus: check('11.5.1', 159, 0, {
        goal: 'Identifier une difficulté propre à la focalisation acoustique.',
        prompt: 'Pourquoi tenir compte du crâne lorsqu’on évalue où les ultrasons focalisés vont déposer leur énergie ?',
        choices: ['L’os peut atténuer les ondes et en modifier la phase.', 'L’os produit le radiotraceur nécessaire à la mesure.', 'Le crâne amplifie uniformément toutes les ondes.'],
        explanation: 'La propagation dépend du tissu traversé. Les variations d’épaisseur et de composition du crâne peuvent modifier la transmission et le foyer acoustique.',
    }, {
        goal: 'Identify a practical constraint on acoustic focusing.',
        prompt: 'Why does the skull matter when estimating where focused ultrasound will deposit energy?',
        choices: ['Bone can attenuate waves and change their phase.', 'Bone produces the radiotracer needed for the measurement.', 'The skull amplifies all waves uniformly.'],
        explanation: 'Propagation depends on the tissue the waves cross. Differences in skull thickness and composition can change transmission and the acoustic focus.',
    }),
    hybrid: check('12.2', 166, 1, {
        goal: 'Justifier le choix de deux signaux complémentaires.',
        prompt: 'Un système doit détecter rapidement une réponse et étudier en parallèle une réponse hémodynamique superficielle. Quelle paire est cohérente ?',
        choices: ['Deux copies du même canal EEG.', 'EEG pour la dynamique rapide et fNIRS pour l’hémodynamique.', 'TEP pour les millisecondes et IRM structurelle pour le débit sanguin.'],
        explanation: 'L’EEG suit les changements électriques rapides. La fNIRS apporte une mesure différente liée à l’hémoglobine et à l’hémodynamique.',
    }, {
        goal: 'Justify combining two complementary signals.',
        prompt: 'A system needs to detect a fast response and also study a superficial hemodynamic response. Which pair fits those goals?',
        choices: ['Two copies of the same EEG channel.', 'EEG for fast dynamics and fNIRS for hemodynamics.', 'PET for millisecond timing and structural MRI for blood flow.'],
        explanation: 'EEG tracks fast electrical changes. fNIRS adds a different measurement related to hemoglobin and hemodynamics.',
    }),
    market: check('13.1', 183, 2, {
        goal: 'Distinguer un facteur d’adoption des preuves d’efficacité.',
        prompt: 'Une équipe envisage un dispositif portable pour des évaluations à domicile. Quel avantage décrit un facteur d’adoption ?',
        choices: ['Le format portable prouve une efficacité clinique.', 'Une annonce de financement remplace une validation.', 'Un usage possible à domicile réduit les déplacements nécessaires.'],
        explanation: 'L’accès et la logistique peuvent favoriser l’adoption de méthodes non invasives. L’efficacité pour un usage donné se mesure séparément.',
    }, {
        goal: 'Distinguish an adoption driver from evidence of effectiveness.',
        prompt: 'A team is considering a portable device for home assessments. Which benefit describes an adoption driver?',
        choices: ['A portable format proves clinical effectiveness.', 'A funding announcement substitutes for validation.', 'Home use can reduce the need to travel for an assessment.'],
        explanation: 'Access and logistics can help noninvasive methods reach more people. Effectiveness for a specific use requires its own evidence.',
    }),
    ecosystem: check('14.2', 202, 0, {
        goal: 'Choisir un partenaire selon le rôle qu’il joue.',
        prompt: 'Une équipe cherche à concevoir une expérience contrôlée sur une nouvelle méthode d’enregistrement. Quel partenaire offre le point de départ le plus direct ?',
        choices: ['Un laboratoire universitaire qui étudie cette méthode.', 'Un distributeur choisi uniquement pour sa couverture commerciale.', 'Un fonds d’investissement sans expertise de la méthode.'],
        explanation: 'Le chapitre distingue notamment entreprises et laboratoires universitaires. Un laboratoire spécialiste de la méthode est bien placé pour revoir le protocole et l’analyse.',
    }, {
        goal: 'Choose an ecosystem partner for a specific role.',
        prompt: 'A team wants to design a controlled experiment on a new recording method. Which partner is the most direct starting point?',
        choices: ['A university lab studying the method.', 'A distributor selected solely for market reach.', 'An investment fund with no expertise in the method.'],
        explanation: 'The chapter describes several parts of the ecosystem, including companies and academic labs. A lab working on the method can review the protocol and analysis.',
    }),
    challenges: check('15.1', 211, 1, {
        goal: 'Repérer une étape entre le prototype et l’usage clinique.',
        prompt: 'Un prototype produit de bons résultats sur le jeu de données de son équipe. Quel travail est encore nécessaire pour étayer une affirmation sur son usage en clinique ?',
        choices: ['Choisir un nouveau nom pour le prototype.', 'Évaluer la performance et la pertinence dans le contexte clinique visé.', 'Réexécuter indéfiniment l’expérience sur les mêmes données.'],
        explanation: 'Le passage en clinique exige des preuves dans le contexte d’utilisation visé, avec des méthodes et critères d’évaluation adaptés.',
    }, {
        goal: 'Identify a step between a prototype and clinical use.',
        prompt: 'A prototype performs well on its team’s dataset. What work would help support a claim about its use in a clinic?',
        choices: ['Choose a new name for the prototype.', 'Evaluate performance and usefulness in the intended clinical setting.', 'Repeatedly run the same experiment on the same data.'],
        explanation: 'Clinical translation calls for evidence in the intended setting, with evaluation methods and outcomes suited to that use.',
    }),
    future: check('17.2', 234, 2, {
        goal: 'Évaluer une affirmation prospective à partir de preuves.',
        prompt: 'Un communiqué annonce une interface prometteuse. Quel renseignement aide le plus à situer l’annonce dans l’évolution du domaine ?',
        choices: ['Le nombre de reprises du communiqué.', 'La taille de l’entreprise qui fait l’annonce.', 'Le résultat publié, le protocole et ce qui reste à démontrer.'],
        explanation: 'Le chapitre met les annonces en perspective avec les recherches qui les précèdent. Le protocole et les résultats aident à situer la maturité de la méthode.',
    }, {
        goal: 'Assess a forward-looking claim using its evidence.',
        prompt: 'A press release announces a promising interface. What best helps place the announcement in the field’s development?',
        choices: ['How many outlets repeated the announcement.', 'The size of the company making it.', 'The published result, the protocol, and what remains to be demonstrated.'],
        explanation: 'The chapter puts announcements in the context of earlier research. Protocols and results help readers judge how mature a method is.',
    }),
    'where-to-start': check('18.2', 252, 0, {
        goal: 'Choisir une première activité selon les ressources disponibles.',
        prompt: 'Vous avez un ordinateur et souhaitez apprendre à analyser l’EEG. Quelle activité vous permet de commencer aujourd’hui ?',
        choices: ['Reproduire une analyse simple sur un enregistrement public.', 'Attendre d’avoir conçu un casque complet.', 'Lire les caractéristiques de plusieurs casques sans analyser de données.'],
        explanation: 'Les jeux de données publics permettent de pratiquer la lecture des signaux et l’analyse dès le départ. Cette expérience peut éclairer un futur choix de matériel.',
    }, {
        goal: 'Choose a first project with the resources you have.',
        prompt: 'You have a laptop and want to learn EEG analysis. Which activity lets you start today?',
        choices: ['Reproduce a simple analysis on a public recording.', 'Wait until you have designed a complete headset.', 'Read the specs of several headsets without analyzing any data.'],
        explanation: 'Public recordings let you practice reading and analyzing signals immediately. That experience can inform a future hardware choice.',
    }),
};
