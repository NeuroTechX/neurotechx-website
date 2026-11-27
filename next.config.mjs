import fs from 'fs';

// Addresses from the old WordPress site (neurotechx.com) and the page that replaces each one.
// neurotechx.com forwards here with the path kept, so these act on the old paths.
// Old addresses not listed (news posts, account and shop pages, theme leftovers) 404 on purpose.
// ':path*' also matches the bare address, e.g. '/job/:path*' covers '/job' and '/job/anything'.
const OLD_SITE = {
  '/about': ['/about-us', '/team', '/partners', '/faq', '/contact-us', '/team_members/:path*'],
  '/community': [
    '/chapter/:path*',
    '/city-chapter',
    '/get-involved',
    '/slack',
    '/lead-the-neurotechx-movement-canada',
    '/chapters', // not an old address: a short one for sharing
  ],
  '/education': ['/resources', '/learning'],
  '/primer': ['/download-the-neurotech-primer'],
  '/education/webinars': ['/webinars', '/events/bci-101', '/events/neurotech-gaming'],
  '/events': [
    '/event',
    '/event-listing',
    '/hackathon2022',
    '/hackathon2023',
    '/ntxbir2021',
    '/neurotechx-5th-anniversary',
  ],
  '/jobs': [
    '/find-a-job/:path*',
    '/post-a-job',
    '/job-tag/:path*',
    '/job/:path*',
  ],
  '/ecosystem': ['/neurotech-ecosystem', '/nt-db-academia-1', '/nt-db-industry-1'],
  '/students': [
    '/ntx-student-clubs-competition',
    '/milo-brain-controlled-wheelchair-1st-place-winners',
    '/student_club_logos/:path*',
  ],
  '/newsletter': ['/subscribe-to-newsletter'],
  '/privacy': ['/privacy-policy', '/cookie-policy'],
  '/donate': ['/donation-confirmation', '/donation-failed', '/donation-history'],
  '/projects': ['/project-details'],
};

// Old job-board addresses that have a matching page under /jobs. These come first:
// the general '/job-tag/:path*' rule above would otherwise send them all to /jobs.
const OLD_JOB_PAGES = {
  '/job-tag/bci': '/jobs/bci',
  '/job-tag/eeg': '/jobs/eeg',
  '/job-tag/computational-neuroscience': '/jobs/computational-neuroscience',
  '/job-tag/fmri': '/jobs/neuroimaging',
  '/ntx-internship-opportunities': '/jobs/internships',
};

// The old job board's region filter lived on the home page (/?job_listing_region=europe,
// /page/2/?job_listing_region=europe). Without these rules those land on the home page.
const JOB_REGION = [{ type: 'query', key: 'job_listing_region' }];
const jobRegion = (value) => [{ type: 'query', key: 'job_listing_region', value }];
const OLD_JOB_REGIONS = ['europe', 'north-america'];

// learn.neurotechedu.com (NeuroTechEDU, retired) → its lessons under /learn. These only act on
// requests for that host, so the domain has to point at this project for them to apply.
const NEUROTECHEDU = [{ type: 'host', value: '(?:learn\\.|www\\.)?neurotechedu\\.com' }];
const NEUROTECHEDU_LESSONS = {
  introtobci: 'intro-to-bci',
  applications: 'bci-applications',
  headsets: 'eeg-headsets',
  introbci_software: 'bci-software',
  eegexperimentalprotocol: 'eeg-experimental-protocol',
  preprocessing: 'preprocessing',
  oscillations: 'neural-oscillations',
  erp: 'event-related-potentials',
  machinelearning: 'machine-learning-for-bci',
  projects: 'bci-projects',
  emerging_tech: 'emerging-technologies',
  the_nervous_system: 'nervous-system',
  cellular_components: 'cellular-components',
  neuroanatomy_and_brain_organization: 'neuroanatomy',
  brain_diseases_and_disorders: 'brain-disorders',
  // older pages whose text now lives in the lessons above
  introtoneuroscience: 'nervous-system',
  'introtoneuroscience-2017-11-11': 'nervous-system',
  what_is_neuroscience: 'nervous-system',
  functional_systems: 'neuroanatomy',
};
const ORG = 'https://neurotechx.org';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src https://www.youtube-nocookie.com https://airtable.com",
  "form-action 'self' https://neurotechx.us12.list-manage.com https://bciwiki.org",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

// Lessons with a French translation (src/content/lessons/<slug>.fr.md), read from the files at
// build time. src/i18n/routes.ts uses the list to skip the "English only" notice on their pages;
// it runs in the browser and the proxy too, where the files cannot be read.
const TRANSLATED_LESSONS = fs
  .readdirSync('src/content/lessons')
  .filter((file) => file.endsWith('.fr.md'))
  .map((file) => file.slice(0, -'.fr.md'.length))
  .sort()
  .join(',');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: { TRANSLATED_LESSONS },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<host>.*\\.vercel\\.app)' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return [
      // Host rules first: the old learn site shares paths like /projects and /events with this one
      ...Object.entries(NEUROTECHEDU_LESSONS).flatMap(([old, slug]) =>
        [`/${old}`, `/${old}.html`].map((source) => ({
          source,
          has: NEUROTECHEDU,
          destination: `${ORG}/learn/${slug}`,
          permanent: true,
        }))
      ),
      { source: '/images/:path*', has: NEUROTECHEDU, destination: `${ORG}/learn/images/:path*`, permanent: true },
      { source: '/:path*', has: NEUROTECHEDU, destination: `${ORG}/learn#lessons`, permanent: true },
      ...Object.entries(OLD_JOB_PAGES).map(([source, destination]) => ({ source, destination, permanent: true })),
      ...OLD_JOB_REGIONS.flatMap((region) =>
        ['/', '/page/:n'].map((source) => ({
          source,
          has: jobRegion(region),
          destination: `/jobs/${region}`,
          permanent: true,
        }))
      ),
      { source: '/', has: JOB_REGION, destination: '/jobs', permanent: true },
      { source: '/page/:n', has: JOB_REGION, destination: '/jobs', permanent: true },
      ...Object.entries(OLD_SITE).flatMap(([destination, sources]) =>
        sources.map((source) => ({ source, destination, permanent: true }))
      ),
    ]
  },
};

export default nextConfig;
