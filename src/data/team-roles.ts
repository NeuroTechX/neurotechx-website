// Roles NeuroTechX itself is looking to fill. Shown on /join-the-team.
// To advertise a role, add an entry here; to close one, remove it.

export interface TeamRole {
    title: string;
    area: string;
    summary: string;
    tasks: string[];
    // Where an interested person goes next. `mailto:` links get the role title as subject.
    cta: { label: string; href: string };
}

// Applications for roles without their own page come here.
export const TEAM_CONTACT = 'info@neurotechx.com';

const apply = (title: string) => ({
    label: `Email ${TEAM_CONTACT}`,
    href: `mailto:${TEAM_CONTACT}?subject=${encodeURIComponent(`Join the team: ${title}`)}`,
});

export const teamRoles: TeamRole[] = [
    {
        title: 'Student clubs liaison',
        area: 'Community',
        summary:
            'The first point of contact for university neurotech clubs: the person who answers when a club writes in and who keeps the clubs in touch with each other.',
        tasks: [
            'Read and answer studentclubs@neurotechx.com',
            'Welcome new clubs and keep the list on the Student Clubs page current',
            'Introduce club officers to each other in Slack',
        ],
        cta: apply('Student clubs liaison'),
    },
    {
        title: 'Content Lab writers, editors and designers',
        area: 'Content Lab',
        summary:
            'The Content Lab publishes original articles on neurotechnology. Writers pitch and draft, editors work with writers, designers create the visuals.',
        tasks: ['Pitch an article idea', 'Edit other contributors’ drafts', 'Source or create visuals'],
        cta: { label: 'See the Content Lab', href: '/content-lab#get-involved' },
    },
    {
        title: 'Chapter organizers',
        area: 'Community',
        summary:
            'A chapter makes a city a place where people interested in neurotechnology can find each other. Chapters are run by their own organizers.',
        tasks: ['Start or restart a chapter in your city', 'Hold a public event every quarter'],
        cta: { label: 'See chapters', href: '/community' },
    },
    {
        title: 'Website and open-source contributors',
        area: 'Technology',
        summary:
            'This website and the NeuroTechX open-source projects are public and maintained by volunteers.',
        tasks: [
            'Keep the website’s pages, listings and dependencies up to date',
            'Help maintain projects such as EEG-ExPy and MOABB',
        ],
        cta: { label: 'NeuroTechX on GitHub', href: 'https://github.com/NeuroTechX' },
    },
];
