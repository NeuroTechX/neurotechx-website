// Outside maps, trackers and directories of the neurotech field, shown on /ecosystem.
// Linked, not embedded or copied: none of them publishes an open licence for its data (checked 2026-11-22).
// To add one, it needs a named maker and a working public page.

export interface FieldMap {
    name: string;
    by: string;
    about: string;
    href: string;
    cta: string;
}

export const fieldMaps: FieldMap[] = [
    {
        name: 'Neuro Atlas',
        by: 'PL Neuro (Protocol Labs)',
        about: 'The field’s milestones, how fast capabilities are moving, and a BCI funding index of rounds and investors. Every chart links to its sources.',
        href: 'https://www.plneuro.xyz/neuro-atlas',
        cta: 'Open the Neuro Atlas',
    },
    {
        name: 'Start-up map',
        by: 'Neurofounders',
        about: 'Neurotech start-ups, kept up to date.',
        href: 'https://www.neurofounders.co/resources/start-up-map',
        cta: 'Open the start-up map',
    },
    {
        name: 'Investor map',
        by: 'Neurofounders',
        about: 'Investors who fund neurotech companies.',
        href: 'https://www.neurofounders.co/resources/investor-map',
        cta: 'Open the investor map',
    },
    {
        name: 'reccy neuro',
        by: 'reccy',
        about: 'A neurotech job board with company and investor directories.',
        href: 'https://neuro.reccy.dev/',
        cta: 'Visit reccy neuro',
    },
];
