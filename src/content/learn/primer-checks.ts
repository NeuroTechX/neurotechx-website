import { bilingual } from '@/i18n/text';
import { additionalPrimerChecks } from './additional-primer-checks';

export type Question = {
    prompt: string;
    choices: [string, string, string];
    correct: number;
    explanation: string;
    section: string;
    /** Printed Primer page for the review link. */
    page?: number;
    /** Review link that replaces the Primer PDF page, for example a lesson heading. */
    href?: string;
};

export type ChapterCheck = { goal: string; reading: string; questions: (Question & { id: string })[] };

export const primerChecks = {
    ...additionalPrimerChecks,
    eeg: bilingual<ChapterCheck>(
        {
            goal: 'Interpréter un tracé EEG et reconnaître quand un signal peut venir des yeux.',
            reading: 'Lisez les sections 2.1, 2.3 et 2.6.2.',
            questions: [
                {
                    id: 'reference',
                    prompt: 'Un canal EEG affiché vaut +20 µV. À quoi cette valeur correspond-elle ?',
                    choices: [
                        'Au potentiel absolu sous une seule électrode.',
                        'À une différence de potentiel par rapport à une référence.',
                        'Au nombre de neurones ayant déchargé.',
                    ],
                    correct: 1,
                    explanation: 'Un canal EEG mesure une différence de potentiel. Changer la référence peut donc changer le tracé affiché.',
                    section: '2.3.1', page: 11,
                },
                {
                    id: 'blink',
                    prompt: 'Une grande déflexion apparaît surtout sur les canaux frontaux au moment où la personne cligne des yeux. Que vérifier en premier ?',
                    choices: [
                        'Si le clignement a produit un artéfact oculaire.',
                        'Si la fréquence d’échantillonnage a augmenté.',
                        'Si la déflexion prouve une activation du cortex frontal.',
                    ],
                    correct: 0,
                    explanation: 'Le mouvement des yeux peut produire un signal particulièrement visible sur les canaux frontaux. Le moment du clignement et la distribution du signal sont deux indices à examiner.',
                    section: '2.6.2', page: 18,
                },
                {
                    id: 'erp',
                    prompt: 'Vous voulez comparer la réponse à un son rare et à un son fréquent. Quelle étape aide à faire ressortir une réponse liée au son ?',
                    choices: [
                        'Comparer les plus grandes déflexions de tout l’enregistrement.',
                        'Trier les essais par amplitude et garder le plus grand.',
                        'Aligner les essais sur le début du son et les moyenner par condition.',
                    ],
                    correct: 2,
                    explanation: 'L’alignement sur le début du son préserve la structure temporelle d’une réponse reproductible. Le moyennage atténue une partie de l’activité qui varie d’un essai à l’autre.',
                    section: '2.3.2', page: 12,
                },
            ],
        },
        {
            goal: 'Interpret an EEG trace and recognize when a signal might come from the eyes.',
            reading: 'Read sections 2.1, 2.3 and 2.6.2.',
            questions: [
                {
                    id: 'reference',
                    prompt: 'An EEG channel reads +20 µV. What does that value represent?',
                    choices: [
                        'The absolute electrical potential under one electrode.',
                        'A voltage difference relative to a reference.',
                        'The number of neurons that fired.',
                    ],
                    correct: 1,
                    explanation: 'An EEG channel measures a voltage difference. Changing the reference can therefore change the displayed trace.',
                    section: '2.3.1', page: 11,
                },
                {
                    id: 'blink',
                    prompt: 'A large deflection appears mainly on frontal channels just as the participant blinks. What should you check first?',
                    choices: [
                        'Whether the blink produced an eye-movement artifact.',
                        'Whether the sampling rate increased.',
                        'Whether the deflection proves the frontal cortex activated.',
                    ],
                    correct: 0,
                    explanation: 'Eye movements can produce signals that are especially visible on frontal channels. Blink timing and the distribution across channels give you two clues to investigate.',
                    section: '2.6.2', page: 18,
                },
                {
                    id: 'erp',
                    prompt: 'You want to compare the response to a rare sound with the response to a frequent sound. What helps reveal a sound-locked response?',
                    choices: [
                        'Compare the largest deflections in the entire recording.',
                        'Sort trials by amplitude and keep the largest one.',
                        'Align the trials to sound onset and average them by condition.',
                    ],
                    correct: 2,
                    explanation: 'Alignment to sound onset preserves the timing of a consistent response. Averaging reduces some of the activity that varies from trial to trial.',
                    section: '2.3.2', page: 12,
                },
            ],
        },
    ),
    fmri: bilingual<ChapterCheck>(
        {
            goal: 'Expliquer ce que révèle le signal IRMf et choisir une méthode selon la question posée.',
            reading: 'Lisez les sections 4.1, 4.3, 4.4.3 et 4.5.1.',
            questions: [
                {
                    id: 'bold',
                    prompt: 'Une région présente un signal BOLD plus élevé pendant une tâche. Quel changement contribue à ce contraste ?',
                    choices: [
                        'Une variation de la désoxyhémoglobine associée à la réponse hémodynamique.',
                        'La tension électrique absolue de chaque neurone.',
                        'La concentration d’un radiotraceur injecté.',
                    ],
                    correct: 0,
                    explanation: 'Le contraste BOLD est sensible à la désoxyhémoglobine. Les variations locales de débit et d’oxygénation du sang fournissent une mesure indirecte liée à l’activité neuronale.',
                    section: '4.4.3–4.5.1', page: 47,
                },
                {
                    id: 'timing',
                    prompt: 'Vous voulez distinguer deux réponses à des sons séparés de quelques dizaines de millisecondes. Quelle méthode privilégier pour cette question de temps ?',
                    choices: [
                        'L’IRM structurelle.',
                        'L’IRMf BOLD.',
                        'L’EEG enregistré au niveau du cuir chevelu.',
                    ],
                    correct: 2,
                    explanation: 'L’EEG peut suivre des variations à l’échelle de quelques millisecondes. La réponse hémodynamique mesurée en IRMf se développe sur plusieurs secondes.',
                    section: '4.5.1', page: 47,
                },
            ],
        },
        {
            goal: 'Explain what an fMRI signal captures and choose a modality for a research question.',
            reading: 'Read sections 4.1, 4.3, 4.4.3 and 4.5.1.',
            questions: [
                {
                    id: 'bold',
                    prompt: 'A region shows a higher BOLD signal during a task. Which change contributes to that contrast?',
                    choices: [
                        'A change in deoxyhemoglobin associated with the hemodynamic response.',
                        'The absolute electrical voltage of each neuron.',
                        'The concentration of an injected radiotracer.',
                    ],
                    correct: 0,
                    explanation: 'BOLD contrast is sensitive to deoxyhemoglobin. Local changes in blood flow and oxygenation provide an indirect measure related to neural activity.',
                    section: '4.4.3–4.5.1', page: 47,
                },
                {
                    id: 'timing',
                    prompt: 'You want to distinguish responses to two sounds separated by tens of milliseconds. Which method fits that timing question?',
                    choices: ['Structural MRI.', 'BOLD fMRI.', 'Scalp EEG.'],
                    correct: 2,
                    explanation: 'EEG can track changes on the scale of milliseconds. The hemodynamic response measured with fMRI develops over several seconds.',
                    section: '4.5.1', page: 47,
                },
            ],
        },
    ),
    neuroethics: bilingual<ChapterCheck>(
        {
            goal: 'Évaluer le consentement et les preuves invoquées à l’appui d’une promesse commerciale.',
            reading: 'Lisez les sections 16.3 et 16.4.',
            questions: [
                {
                    id: 'consent',
                    prompt: 'Des personnes ont accepté un enregistrement EEG pour un atelier. L’équipe souhaite ensuite transmettre les tracés à un partenaire pour entraîner un produit. Quelle est la première étape ?',
                    choices: [
                        'Transmettre les tracés après avoir retiré les noms.',
                        'Vérifier la portée du consentement et convenir d’un cadre approprié avant tout partage.',
                        'Transmettre les tracés si le partenaire promet de les chiffrer.',
                    ],
                    correct: 1,
                    explanation: 'Le consentement à une collecte pour un atelier n’autorise pas automatiquement un nouvel usage commercial. L’équipe doit vérifier ce que les personnes ont compris et accepté, puis revoir le consentement et les modalités de partage si nécessaire.',
                    section: '16.3', page: 221,
                },
                {
                    id: 'claims',
                    prompt: 'Une publicité affirme qu’un casque EEG « mesure précisément la concentration ». Quelle preuve serait la plus pertinente ?',
                    choices: [
                        'Une visualisation cérébrale colorée issue du casque.',
                        'Un témoignage d’une personne qui se sent plus concentrée.',
                        'Une validation indépendante contre une mesure de référence, dans le contexte annoncé.',
                    ],
                    correct: 2,
                    explanation: 'Une affirmation sur la précision demande une définition de la concentration et des résultats de validation dans le contexte d’utilisation. Une visualisation ou un témoignage ne suffit pas à établir cette précision.',
                    section: '16.4', page: 224,
                },
            ],
        },
        {
            goal: 'Evaluate consent and the evidence behind a neurotechnology product claim.',
            reading: 'Read sections 16.3 and 16.4.',
            questions: [
                {
                    id: 'consent',
                    prompt: 'Participants agreed to an EEG recording for a workshop. The team later wants to share the traces with a partner to train a product. What should the team do first?',
                    choices: [
                        'Share the traces after removing names.',
                        'Review the scope of consent and agree on appropriate terms before sharing.',
                        'Share the traces if the partner promises to encrypt them.',
                    ],
                    correct: 1,
                    explanation: 'Consent to collect data for a workshop does not automatically cover a new commercial use. The team should check what participants understood and agreed to, then revisit consent and sharing terms as needed.',
                    section: '16.3', page: 221,
                },
                {
                    id: 'claims',
                    prompt: 'An ad says an EEG headset “accurately measures focus.” Which evidence would be most relevant?',
                    choices: [
                        'A colorful brain visualization generated by the headset.',
                        'A testimonial from someone who felt more focused.',
                        'Independent validation against a reference measure in the advertised setting.',
                    ],
                    correct: 2,
                    explanation: 'An accuracy claim needs an operational definition of focus and validation in the intended setting. A visualization or testimonial alone cannot establish accuracy.',
                    section: '16.4', page: 224,
                },
            ],
        },
    ),
};
