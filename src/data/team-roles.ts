// Roles NeuroTechX itself is looking to fill. Shown on /join-the-team (/fr/joindre-lequipe).
// To advertise a role, add it in French first, then in English, in the same position;
// to close one, remove it from both lists.
import { bilingual } from '@/i18n/text';

export interface TeamRole {
    title: string;
    area: string;
    summary: string;
    tasks: string[];
    // Where an interested person goes next: an English route path, a URL, or a mailto: link.
    cta: { label: string; href: string };
}

// Applications for roles without their own page come here.
export const TEAM_CONTACT = 'info@neurotechx.org';

const apply = (label: string, subject: string) => ({
    label,
    href: `mailto:${TEAM_CONTACT}?subject=${encodeURIComponent(subject)}`,
});

const fr: TeamRole[] = [
    {
        title: 'Liaison avec les clubs étudiants',
        area: 'Communauté',
        summary:
            "Le premier contact des clubs universitaires de neurotech : la personne qui répond quand un club nous écrit et qui garde les clubs en lien entre eux.",
        tasks: [
            'Lire et répondre aux courriels de studentclubs@neurotechx.org',
            'Accueillir les nouveaux clubs et tenir à jour la liste de la page Clubs étudiants',
            'Présenter les responsables de clubs les uns aux autres sur Slack',
        ],
        cta: apply(`Écrire à ${TEAM_CONTACT}`, "Joindre l'équipe : liaison avec les clubs étudiants"),
    },
    {
        title: 'Rédaction, révision et design au Content Lab',
        area: 'Content Lab',
        summary:
            'Le Content Lab publie des articles originaux sur la neurotechnologie. Les rédacteurs proposent et écrivent, les réviseurs accompagnent les rédacteurs, les designers créent les visuels.',
        tasks: ["Proposer une idée d'article", "Réviser les textes d'autres collaborateurs", 'Trouver ou créer des visuels'],
        cta: { label: 'Découvrir le Content Lab', href: '/content-lab#get-involved' },
    },
    {
        title: 'Organisation de sections locales',
        area: 'Communauté',
        summary:
            "Une section locale fait de sa ville un lieu où les personnes intéressées par la neurotechnologie peuvent se trouver. Chaque section est animée par ses propres organisateurs.",
        tasks: ['Fonder ou relancer une section dans votre ville', 'Tenir un événement public chaque trimestre'],
        cta: { label: 'Voir les sections', href: '/community' },
    },
    {
        title: 'Contributions au site Web et aux logiciels libres',
        area: 'Technologie',
        summary:
            'Ce site Web et les projets libres de NeuroTechX sont publics et entretenus par des bénévoles.',
        tasks: [
            'Tenir à jour les pages, les listes et les dépendances du site',
            "Aider à maintenir des projets comme EEG-ExPy et MOABB",
        ],
        cta: { label: 'NeuroTechX sur GitHub', href: 'https://github.com/NeuroTechX' },
    },
];

const en: TeamRole[] = [
    {
        title: 'Student clubs liaison',
        area: 'Community',
        summary:
            'The first point of contact for university neurotech clubs: the person who answers when a club writes in and who keeps the clubs in touch with each other.',
        tasks: [
            'Read and answer studentclubs@neurotechx.org',
            'Welcome new clubs and keep the list on the Student Clubs page current',
            'Introduce club officers to each other in Slack',
        ],
        cta: apply(`Email ${TEAM_CONTACT}`, 'Join the team: Student clubs liaison'),
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

export const teamRoles = bilingual(fr, en);
