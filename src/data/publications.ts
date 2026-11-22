// Neurotech industry publications shown on /reports.
// `feed` is set only where the publication has a working public RSS feed (checked 2026-11-22);
// their latest posts appear under "Latest from these publications".

export interface Publication {
    name: string;
    by: string;
    about: string;
    cadence: string;
    access: 'Free' | 'Free and paid' | 'Paid';
    href: string;
    cta: string;
    feed?: string;
}

export const publications: Publication[] = [
    {
        name: 'Neurotech Reports',
        by: 'James Cavuoto',
        about: 'The longest-running neurotechnology industry newsletter, with in-depth market reports on the business of neurotech.',
        cadence: 'Monthly newsletter and periodic market reports',
        access: 'Paid',
        href: 'https://www.neurotechreports.com/',
        cta: 'Visit Neurotech Reports',
    },
    {
        name: 'Neurotech Futures',
        by: 'Naveen Rao',
        about: 'Industry news, analysis and company deep dives, plus the Neurotech Futures job board and ecosystem.',
        cadence: 'Several posts a month',
        access: 'Free and paid',
        href: 'https://neurotechnology.substack.com/',
        cta: 'Subscribe on Substack',
        feed: 'https://neurotechnology.substack.com/feed',
    },
    {
        name: 'Neurofounders',
        by: 'Dominic Borkelmans',
        about: 'Breaking neurotech news, market notes and deep dives, with a start-up map and investor map of the field.',
        cadence: 'Several articles a week',
        access: 'Free',
        href: 'https://www.neurofounders.co/',
        cta: 'Read Neurofounders',
    },
    {
        name: 'Signals',
        by: 'Neurotech Futures and Neurofounders',
        about: 'A monthly market memo on the deals and trends that matter, written for commercial leaders.',
        cadence: 'Monthly',
        access: 'Paid',
        href: 'https://neurotechnology.substack.com/p/membership',
        cta: 'About Signals',
    },
    {
        name: 'The Neurotech Newsletter',
        by: 'Carter Sciences',
        about: 'Funding, regulation, clinical progress, launches, partnerships and hiring across neurotechnology, with interviews and regional deep dives.',
        cadence: 'Every two weeks',
        access: 'Free',
        href: 'https://theneurotechnewsletter.substack.com/',
        cta: 'Subscribe on Substack',
        feed: 'https://theneurotechnewsletter.substack.com/feed',
    },
    {
        name: 'Inside Neurotech',
        by: 'Liz Moyles, Cruxx',
        about: 'A weekly roundup of neurotech headlines from a UK-based neurotech executive-search lead, alongside the Crux of Neuro podcast.',
        cadence: 'Weekly, on LinkedIn',
        access: 'Free',
        href: 'https://www.linkedin.com/in/lizmoyles/',
        cta: 'Follow on LinkedIn',
    },
];
