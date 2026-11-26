// Open data challenges and leaderboards shown on /projects (/fr/projets).
// Organisers' leaderboards can't be embedded (their pages forbid framing), so each entry
// carries a short, dated summary of the standings and links to the live board.
// Write each entry in French first, then English, in the same position in both lists.
import { bilingual } from '@/i18n/text';

export interface Challenge {
    name: string;
    organiser: string;
    about: string;
    prize?: string;
    timing: string;
    // Dated summary of the leaderboard, in the organiser's words where possible.
    standings?: { asOf: string; lines: string[] };
    leaderboard: string;
    enter?: string;
    // Link labels for a challenge that has ended (default: live leaderboard / how to enter).
    leaderboardLabel?: string;
    enterLabel?: string;
}

const fr: Challenge[] = [
    {
        name: 'Hackathon de reproduction NeurIPS 2026 × ML Intern',
        organiser: 'Gradio et Hugging Face, commandité par Modal',
        about:
            "Un agent d'IA peut-il reproduire le résultat principal d'un article de NeurIPS 2026? Choisissez jusqu'à cinq articles dans une liste de milliers de résultats, reproduisez-les avec ML Intern de Hugging Face ou un autre agent, puis publiez votre code, vos journaux et votre verdict : vérifié, réfuté ou non concluant. La liste compte des articles en neurotech, dont six sur l'EEG (imagerie motrice, modèles de fondation EEG, décodage EEG vers image) et six en IRMf.",
        prize: "Plus de 10 000 $ US en crédits, dont 5 000 $ en crédits Modal pour la meilleure reproduction; 170 $ en crédits de calcul et de LLM pour chacun des 1 000 premiers participants admissibles.",
        timing: 'Du 30 novembre au 13 décembre 2026; inscription avant le 29 novembre',
        leaderboard: 'https://huggingface.co/Neurips-2026-MLIntern-Repro',
        leaderboardLabel: "Détails et inscription",
    },
    {
        name: 'EEG/EMG Foundation Challenge 2026',
        organiser: "Yneuro, Inria et UC San Diego, avec l'atelier Brain and Body de NeurIPS",
        about:
            "Quatre volets de décodage où les modèles doivent généraliser à de nouveaux sujets et à de nouvelles conditions : EEG vers image, décodage ICM, endormissement et EMG vers posture de la main.",
        prize: "Enveloppe de prix de 20\u00a0000\u00a0$\u00a0US, surtout 2\u00a0000\u00a0$ par équipe du podium de chaque volet, et des stages offerts par Alljoined et Muse.",
        timing: 'Soumissions closes le 21 novembre 2026; prix remis à NeurIPS, à Sydney, les 11 et 12 décembre',
        standings: {
            asOf: 'novembre 2026',
            lines: [
                '844 soumissions classées dans les quatre volets.',
                "Classement provisoire jusqu'à l'audit de reproductibilité (du 22 au 30 novembre); équipes avisées vers le 1er décembre.",
            ],
        },
        leaderboard: 'https://neural-interfaces26.github.io/leaderboard.html',
    },
    {
        name: 'Cortical Peaks Challenge 2026',
        organiser: "Conférence BCI de Graz (TU Graz); jeux conçus par neuroTUM",
        about:
            "Jouer à des jeux d'arcade en temps réel avec les seuls signaux cérébraux, sans mouvements des yeux, clignements ni activité musculaire : cinq épreuves de commande discrète et continue (BrainSki, Pong). L'environnement de jeu est libre (Apache-2.0); chaque équipe branche son propre client ICM, et Mentalab l'a déjà adapté à la commande par EOG.",
        timing: "Tenu à la 10e conférence BCI de Graz, en septembre 2026; l'environnement reste ouvert à tous",
        standings: {
            asOf: 'septembre 2026',
            lines: [
                "1re place : IAS-Lab de l'Université de Padoue.",
                'Aussi en lice : neuroTUM, NeuroCONCISE et MIRAGE91.',
            ],
        },
        leaderboard: 'https://www.tugraz.at/institute/ine/graz-bci-conferences/10th-graz-bci-conference-2026/cortical-peaks-challenge-2026',
        enter: 'https://github.com/neuroTUM/Cortical-Peaks-Challenge-2026',
        leaderboardLabel: 'Page du défi',
        enterLabel: 'Code des jeux',
    },
    {
        name: 'TDBRAIN Challenge',
        organiser: 'Brainclinics Foundation, prix cofinancé par Alto Neuroscience',
        about:
            "Prédire le diagnostic de dépression ou la réponse au traitement par SMTr à partir du seul EEG au repos. Environ 30 % du jeu de données TDBRAIN est mis de côté comme données de réplication scellées : chaque soumission est donc un véritable test hors échantillon.",
        prize: "10 000 € pour la première prédiction qui franchit le seuil et reste en tête pendant deux mois : exactitude équilibrée supérieure à 70 % (diagnostic), ou nPPV supérieure à 130 % pour la réponse ou à 140 % pour la rémission, avec une sensibilité supérieure à 40 % (traitement).",
        timing: 'Se déroule sur 18 mois à partir du 1er septembre 2026',
        standings: {
            asOf: 'novembre 2026',
            lines: [
                "Le prix n'a pas encore été remporté.",
                "Rémission après SMT : quatre prédictions au-dessus de 130 % de nPPV, aucune encore au seuil de 140 %.",
                "Diagnostic de dépression majeure : dix prédictions au-dessus de 60 % d'exactitude équilibrée, aucune encore à 70 %.",
                "Analyse témoin : le sexe est prédit à partir de l'EEG avec 87 % d'exactitude équilibrée.",
            ],
        },
        leaderboard: 'https://brainclinics.com/research/articles/tdbrain-challenge',
        enter: 'https://brainclinics.com/research/brainclinics-prize',
    },
];

const en: Challenge[] = [
    {
        name: 'NeurIPS 2026 × ML Intern Repro Hackathon',
        organiser: 'Gradio and Hugging Face, sponsored by Modal',
        about:
            "Can an AI agent reproduce the main result of a NeurIPS 2026 paper? Pick up to five papers from a list of thousands of claims, reproduce them with Hugging Face's ML Intern or another agent, and publish your code, logs and verdict: verified, falsified or inconclusive. The list includes neurotech papers, among them six on EEG (motor imagery, EEG foundation models, EEG-to-image decoding) and six on fMRI.",
        prize: 'Over US$10,000 in credits, including $5,000 in Modal credits for the best reproduction; $170 in compute and LLM credits for each of the first 1,000 eligible participants.',
        timing: 'November 30 to December 13, 2026; register by November 29',
        leaderboard: 'https://huggingface.co/Neurips-2026-MLIntern-Repro',
        leaderboardLabel: 'Details and registration',
    },
    {
        name: 'EEG/EMG Foundation Challenge 2026',
        organiser: 'Yneuro, Inria and UC San Diego, with the NeurIPS Brain and Body workshop',
        about:
            'Four decoding tracks where models must generalise to new subjects and conditions: EEG-to-image, BCI decoding, sleep onset and EMG-to-hand-pose.',
        prize: 'A US$20,000 pool, mostly $2,000 per top-three team in each track, plus internships from Alljoined and Muse.',
        timing: 'Submissions closed 21 November 2026; winners celebrated at NeurIPS in Sydney, 11–12 December',
        standings: {
            asOf: 'November 2026',
            lines: [
                '844 ranked entries across the four tracks.',
                'Rankings are provisional until the reproducibility audit (22–30 November); teams are notified around 1 December.',
            ],
        },
        leaderboard: 'https://neural-interfaces26.github.io/leaderboard.html',
    },
    {
        name: 'Cortical Peaks Challenge 2026',
        organiser: 'Graz BCI Conference (TU Graz); games built by neuroTUM',
        about:
            'Play arcade games in real time with brain signals alone, no eye movements, blinks or muscle activity: five tasks of discrete and continuous control (BrainSki, Pong). The game environment is open source (Apache-2.0); each team plugs in its own BCI client, and Mentalab has already adapted it to EOG control.',
        timing: 'Held at the 10th Graz BCI Conference, September 2026; the environment stays open to everyone',
        standings: {
            asOf: 'September 2026',
            lines: [
                'First place: IAS-Lab, University of Padua.',
                'Also competing: neuroTUM, NeuroCONCISE and MIRAGE91.',
            ],
        },
        leaderboard: 'https://www.tugraz.at/institute/ine/graz-bci-conferences/10th-graz-bci-conference-2026/cortical-peaks-challenge-2026',
        enter: 'https://github.com/neuroTUM/Cortical-Peaks-Challenge-2026',
        leaderboardLabel: 'Challenge page',
        enterLabel: 'Game code',
    },
    {
        name: 'TDBRAIN Challenge',
        organiser: 'Brainclinics Foundation, prize co-funded by Alto Neuroscience',
        about:
            'Predict depression diagnosis or rTMS treatment outcome from resting-state EEG alone. About 30% of the TDBRAIN dataset is held back as sealed replication data, so every entry is a true out-of-sample test.',
        prize: '€10,000 for the first prediction to beat the bar and hold the top spot for two months: balanced accuracy above 70% (diagnosis), or nPPV above 130% for response / 140% for remission with sensitivity above 40% (treatment).',
        timing: 'Runs for 18 months from 1 September 2026',
        standings: {
            asOf: 'November 2026',
            lines: [
                'Prize still unclaimed.',
                'TMS remission: four predictions above 130% nPPV, none yet at the 140% bar.',
                'MDD diagnosis: ten predictions above 60% balanced accuracy, none yet at 70%.',
                'Control analysis: sex predicted from EEG at 87% balanced accuracy.',
            ],
        },
        leaderboard: 'https://brainclinics.com/research/articles/tdbrain-challenge',
        enter: 'https://brainclinics.com/research/brainclinics-prize',
    },
];

export const CHALLENGES = bilingual(fr, en);
