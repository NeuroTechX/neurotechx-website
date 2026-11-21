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
    '/ntx-internship-opportunities',
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

// The old job board's region filter lived on the home page (/?job_listing_region=europe,
// /page/2/?job_listing_region=europe). Without these two rules those land on the home page.
const JOB_REGION = [{ type: 'query', key: 'job_listing_region' }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: '/', has: JOB_REGION, destination: '/jobs', permanent: true },
      { source: '/page/:n', has: JOB_REGION, destination: '/jobs', permanent: true },
      ...Object.entries(OLD_SITE).flatMap(([destination, sources]) =>
        sources.map((source) => ({ source, destination, permanent: true }))
      ),
    ]
  },
};

export default nextConfig;
