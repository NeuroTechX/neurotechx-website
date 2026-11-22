// Open data challenges and leaderboards shown on /projects.
// Organisers' leaderboards can't be embedded (their pages forbid framing), so each entry
// carries a short, dated summary of the standings and links to the live board.

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
}

export const CHALLENGES: Challenge[] = [
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
