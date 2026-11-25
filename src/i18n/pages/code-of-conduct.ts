import type { Locale } from '../routes';

// A section body is a list of paragraphs (strings) and bulleted lists (arrays of strings).
type Section = { heading: string; body: (string | string[])[] };
type CodeOfConduct = {
  title: string;
  heading: string;
  description: string;
  lead: string;
  sections: Section[];
  enforcementHeading: string;
  enforcementBefore: string;
  enforcementAfter: string;
  enforcementMaintainers: string;
  attributionHeading: string;
  attributionBefore: string;
  attributionMiddle: string;
};

// French first; English follows the same structure.
const fr: CodeOfConduct = {
  title: 'Code de conduite',
  heading: 'Code de conduite de NeuroTechX',
  description:
    "Les normes de la communauté, les attentes et la façon dont elles sont appliquées dans tous les espaces en ligne, sections locales et événements de NeuroTechX.",
  lead:
    "NeuroTechX s'engage à offrir à toutes et à tous une expérience exempte de harcèlement, sans égard au genre, à l'identité et à l'expression de genre, à l'orientation sexuelle, au handicap, à l'apparence physique, à la taille, à la race, à l'âge ou à la religion. Nous ne tolérons aucune forme de harcèlement envers les participants.",
  sections: [
    {
      heading: 'Notre engagement',
      body: [
        "Dans le but de favoriser un milieu ouvert et accueillant, nous, contributeurs et responsables, nous engageons à faire de la participation à notre projet et à notre communauté une expérience exempte de harcèlement pour toutes et tous, sans égard à l'âge, à la taille, au handicap, à l'origine ethnique, aux caractéristiques sexuelles, à l'identité et à l'expression de genre, au niveau d'expérience, à la scolarité, au statut socioéconomique, à la nationalité, à l'apparence, à la race, à la religion ou à l'identité et à l'orientation sexuelles.",
      ],
    },
    {
      heading: 'Nos normes',
      body: [
        "Les blagues et les propos sexistes, racistes, homophobes, transphobes, capacitistes ou autrement discriminatoires n'ont pas leur place dans la communauté NeuroTechX.",
        "NeuroTechX s'engage à offrir à toutes et à tous une expérience communautaire exempte de harcèlement, sans égard au genre, à l'orientation sexuelle, au handicap, à l'apparence physique, à la taille, à la race ou à la religion. Nous ne tolérons aucune forme de harcèlement envers les membres de la communauté.",
        "Toutes les communications doivent convenir à un public professionnel composé de personnes de milieux très divers. Les propos et les images à caractère sexuel n'ont leur place dans aucun lieu de la communauté, y compris les présentations.",
        "Soyez bienveillant. N'insultez ni ne dénigrez les autres participants. Comportez-vous de façon professionnelle. Rappelez-vous que le harcèlement et les blagues sexistes, racistes ou excluantes n'ont pas leur place chez NeuroTechX.",
        "Les participants qui enfreignent ces règles peuvent être invités à quitter la communauté, à la seule discrétion des organisateurs.",
        'Merci de contribuer à faire de cette communauté un lieu accueillant et convivial pour toutes et tous.',
        'Voici des exemples de comportements qui contribuent à créer un climat positif :',
        [
          'Utiliser un langage accueillant et inclusif',
          'Respecter les points de vue et les expériences différents',
          'Accepter les critiques constructives avec ouverture',
          'Se concentrer sur ce qui est le mieux pour la communauté',
          "Faire preuve d'empathie envers les autres membres de la communauté",
        ],
        'Voici des exemples de comportements inacceptables :',
        [
          "L'utilisation de propos ou d'images à caractère sexuel, et les attentions ou avances sexuelles non désirées",
          'Le trollage, les commentaires insultants ou désobligeants, et les attaques personnelles ou politiques',
          'Le harcèlement, en public ou en privé',
          "La publication des renseignements personnels d'autrui, comme une adresse postale ou électronique, sans permission explicite",
          'Tout autre comportement qui pourrait raisonnablement être jugé inapproprié dans un cadre professionnel',
        ],
      ],
    },
    {
      heading: 'Nos responsabilités',
      body: [
        "Les responsables du projet doivent préciser les normes de comportement acceptable et prendre des mesures correctives appropriées et équitables en réponse à tout comportement inacceptable.",
        "L'engagement communautaire est une promesse faite aux autres membres de la communauté. Ce n'est pas une entente avec NeuroTechX en tant qu'entité juridique, mais un engagement envers l'ensemble de la communauté NeuroTechX.",
        "Chez NeuroTechX, nous tenons à la participation de chaque membre de notre communauté et voulons que toutes et tous vivent une expérience agréable et enrichissante. Nous attendons donc de chaque participant qu'il fasse preuve de respect et de courtoisie envers les autres, partout dans la communauté et à tous ses événements, qu'ils soient organisés officiellement par NeuroTechX ou non.",
        "Pour que les attentes soient claires, toutes les personnes déléguées ou participantes, conférencières, exposantes, organisatrices et bénévoles à un événement NeuroTechX, ou qui interagissent en ligne avec la communauté NeuroTechX, doivent respecter le présent code de conduite. Les organisateurs le font appliquer pendant toute la durée de l'événement. Les responsables du projet ont le droit et la responsabilité de retirer, de modifier ou de refuser les commentaires, commits, code, modifications de wiki, tickets et autres contributions qui ne respectent pas ce code de conduite, ou d'exclure temporairement ou définitivement tout contributeur dont ils jugent le comportement inapproprié, menaçant, offensant ou nuisible.",
      ],
    },
    {
      heading: "Champ d'application",
      body: [
        "Ce code de conduite s'applique dans les espaces du projet ainsi que dans les espaces publics lorsqu'une personne représente le projet ou sa communauté. Représenter le projet ou la communauté, c'est par exemple utiliser une adresse courriel officielle du projet, publier à partir d'un compte officiel sur les médias sociaux ou agir à titre de représentant désigné lors d'un événement en ligne ou en personne. Les responsables du projet peuvent préciser davantage ce qui constitue une représentation du projet.",
      ],
    },
  ],
  enforcementHeading: 'Application',
  enforcementBefore:
    "Tout comportement abusif, harcelant ou autrement inacceptable peut être signalé à l'équipe du projet à l'adresse",
  enforcementAfter:
    "Toutes les plaintes seront examinées et feront l'objet d'une enquête, et mèneront à la réponse jugée nécessaire et appropriée selon les circonstances. L'équipe du projet est tenue de préserver la confidentialité de la personne qui signale un incident. Des précisions sur les politiques d'application pourront être publiées séparément.",
  enforcementMaintainers:
    "Les responsables du projet qui ne respectent pas ou ne font pas appliquer de bonne foi le code de conduite peuvent faire l'objet de conséquences temporaires ou permanentes, déterminées par d'autres membres de la direction du projet.",
  attributionHeading: 'Attribution',
  attributionBefore: 'Ce code de conduite est adapté du',
  attributionMiddle: ', version 1.4, accessible à',
};

const en: CodeOfConduct = {
  title: 'Code of Conduct',
  heading: 'NeuroTechX Code of Conduct',
  description:
    'Community standards, expectations, and enforcement policy for all NeuroTechX online spaces, local chapters, and events.',
  lead:
    'NeuroTechX is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, or religion. We do not tolerate harassment of participants in any form.',
  sections: [
    {
      heading: 'Our Pledge',
      body: [
        'In the interest of fostering an open and welcoming environment, we as contributors and leaders pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.',
      ],
    },
    {
      heading: 'Our Standards',
      body: [
        'Sexist, racist, homophobic, transphobic, ableist or otherwise discriminatory jokes and language are not appropriate for the NeuroTechX community.',
        'NeuroTechX is dedicated to providing a harassment-free community experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion. We do not tolerate harassment of community members in any form.',
        'All communication should be appropriate for a professional audience including people of many different backgrounds. Sexual language and imagery is not appropriate for any community venue, including talks.',
        'Be kind to others. Do not insult or put down other attendees. Behave professionally. Remember that harassment and sexist, racist, or exclusionary jokes are not appropriate for NeuroTechX.',
        'Attendees violating these rules may be asked to leave the community at the sole discretion of the community organizers.',
        'Thank you for helping make this a welcoming, friendly community for all.',
        'Examples of behavior that contributes to creating a positive environment include:',
        [
          'Using welcoming and inclusive language',
          'Being respectful of differing viewpoints and experiences',
          'Gracefully accepting constructive criticism',
          'Focusing on what is best for the community',
          'Showing empathy towards other community members',
        ],
        'Examples of unacceptable behavior by participants include:',
        [
          'The use of sexualized language or imagery and unwelcome sexual attention or advances',
          'Trolling, insulting/derogatory comments, and personal or political attacks',
          'Public or private harassment',
          "Publishing others' private information, such as a physical or electronic address, without explicit permission",
          'Other conduct which could reasonably be considered inappropriate in a professional setting',
        ],
      ],
    },
    {
      heading: 'Our Responsibilities',
      body: [
        'Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.',
        'The Community Pledge is a promise to your fellow community members. It is not an agreement with NeuroTechX as a legal entity, but rather a commitment to the NeuroTechX community as a whole.',
        'At NeuroTechX, we value the participation of every member of our community and want all attendees to have an enjoyable and fulfilling experience. Accordingly, all attendees are expected to show respect and courtesy to other attendees throughout the community and at all community events, whether officially hosted by NeuroTechX or not.',
        'To make clear what is expected, all delegates/attendees, speakers, exhibitors, organizers, and volunteers at any NeuroTechX event or engaging with the NeuroTechX community online are required to conform to the following Code of Conduct. Organizers will enforce this code throughout the event. Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.',
      ],
    },
    {
      heading: 'Scope',
      body: [
        'This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.',
      ],
    },
  ],
  enforcementHeading: 'Enforcement',
  enforcementBefore:
    'Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at',
  enforcementAfter:
    'All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.',
  enforcementMaintainers:
    "Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.",
  attributionHeading: 'Attribution',
  attributionBefore: 'This Code of Conduct is adapted from the',
  attributionMiddle: ', version 1.4, available at',
};

const text: Record<Locale, CodeOfConduct> = { fr, en };
export default text;
