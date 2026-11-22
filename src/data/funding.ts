// Funding opportunities shown on /funding.
// Each entry was checked on the funder's own page on the date in FUNDING_CHECKED.
// An entry with a `closes` date drops off the page by itself once that date has passed;
// entries without one (rolling or annual calls) stay until removed here.

export const FUNDING_CHECKED = '2026-11-21';

export type FundingAudience = 'Start-up programmes and mentorship' | 'Students and early career' | 'Researchers and labs' | 'Seed funding and open source' | 'Outreach and community';

export interface FundingOpportunity {
    name: string;
    funder: string;
    audience: FundingAudience;
    who: string;
    amount?: string;
    // ISO date of the next deadline, if one is published.
    closes?: string;
    // Shown instead of, or as well as, the date: "Rolling", "Annual", provisional dates.
    timing?: string;
    href: string;
    // Shown first and highlighted.
    featured?: boolean;
}

export const FUNDING_FINDERS = [
    {
        name: 'The Transmitter: Neuroscience grants and funding finder',
        href: 'https://www.thetransmitter.org/neuroscience-grants-funding-finder/',
        about: 'A searchable list of neuroscience grants, fellowships and awards.',
    },
];

export const fundingOpportunities: FundingOpportunity[] = [
    // Start-up programmes and mentorship
    {
        name: 'NeuroDesign Entrepreneurs Workshop',
        funder: 'Case Western Reserve University and the Cleveland FES Center',
        audience: 'Start-up programmes and mentorship',
        who: 'Graduate students and early-career professionals. A weekend course: teams take a real clinical need, invent a neurotech solution, build the business model with mentors, and pitch to a panel of investors and neurotech leaders. Over 200 participants so far; free for accepted students, with some travel support.',
        timing: 'Annual, now franchised beyond Cleveland: Cleveland (Sept 2026) and Munich (June 2026). Cleveland applications have opened in June',
        href: 'https://www.clevelandneurodesign.com/',
        featured: true,
    },
    {
        name: 'NERVE: Neurotech Entrepreneurship to Validate Emerging Innovations',
        funder: 'Ontario Brain Institute',
        audience: 'Start-up programmes and mentorship',
        who: 'Early-stage Canadian neurotech entrepreneurs. Up to five a year get a non-dilutive grant, 12 months of workshops and one-to-one mentorship from an expert in their sector. OBI takes no equity or IP.',
        amount: 'Up to CAD 100,000',
        timing: 'Annual. The 2026 call closed in April; watch for the 2027 call',
        href: 'https://braininstitute.ca/programs-opportunities/nerve-program',
    },
    {
        name: 'NIA Start-Up Challenge and Accelerator',
        funder: 'NIH National Institute on Aging',
        audience: 'Start-up programmes and mentorship',
        who: 'People new to entrepreneurship with a technology for ageing and age-related conditions, including dementia and other brain health. Cash prizes plus a five-month accelerator with founder and investor mentors.',
        amount: 'Up to USD 994,000 in prizes in total',
        closes: '2027-01-15',
        timing: 'Submissions open 1 Dec 2026',
        href: 'https://www.nih.gov/challenges/2027-nia-start-challenge-accelerator',
    },
    {
        name: 'Spec Brains fellowship',
        funder: 'Speculative Technologies',
        audience: 'Start-up programmes and mentorship',
        who: 'PhD-level researchers with an ambitious neuroscience or neurotech research programme that does not fit existing institutions. Four months, part-time: training, coaching and mentors with DARPA experience, and introductions to funders. Free, no equity taken.',
        timing: 'Annual. The 2027 cohort is closed (applications ran in October); watch for the next call',
        href: 'https://spec.tech/brains',
    },
    // Students and early career
    {
        name: 'FENS/IBRO-PERC Exchange Fellowships',
        funder: 'FENS and IBRO-PERC',
        audience: 'Students and early career',
        who: 'MSc and PhD students and postdocs (up to 5 years) in Europe, for a 4-week to 4-month lab exchange.',
        amount: 'Up to EUR 4,000',
        closes: '2027-04-15',
        timing: 'Opens 1 Dec 2026; deadlines every 15 April and 15 October',
        href: 'https://www.fens.org/careers/grants-and-stipends/grant/fens-ibro-perc-exchange-fellowships',
    },
    {
        name: 'IBRO World Congress Travel Grants',
        funder: 'IBRO',
        audience: 'Students and early career',
        who: 'PhD students, postdocs and early-career investigators, worldwide.',
        closes: '2027-03-15',
        timing: 'Opens 11 Jan 2027',
        href: 'https://ibro.org/grants/grants-calendar/',
    },
    {
        name: 'EMBO Postdoctoral Fellowships',
        funder: 'EMBO',
        audience: 'Students and early career',
        who: 'Life-science postdocs, including neuroscience, moving to a lab in another country.',
        amount: 'Stipend and allowances for up to 2 years',
        closes: '2027-01-22',
        timing: 'Cut-offs through the year',
        href: 'https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/',
    },
    {
        name: 'HFSP Postdoctoral Fellowships',
        funder: 'Human Frontier Science Program',
        audience: 'Students and early career',
        who: 'Early postdocs changing both country and field.',
        amount: 'Three years of allowances',
        closes: '2027-05-11',
        timing: 'Letter of intent deadline',
        href: 'https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships',
    },
    {
        name: 'MSCA Postdoctoral Fellowships',
        funder: 'European Commission',
        audience: 'Students and early career',
        who: 'PhD holders of any nationality, hosted in the EU or an associated country.',
        timing: 'Next call expected to open April 2027 and close September 2027',
        href: 'https://marie-sklodowska-curie-actions.ec.europa.eu/funding/msca-postdoctoral-fellowships-2027',
    },
    {
        name: 'Fellows-to-Faculty Award',
        funder: 'Simons Foundation',
        audience: 'Students and early career',
        who: 'Postdocs entering the tenure-track job market, any citizenship.',
        amount: 'USD 600,000 over 3 years',
        closes: '2027-01-13',
        href: 'https://www.simonsfoundation.org/funding/fellows-to-faculty-2027/',
    },
    {
        name: 'Wellcome Early-Career Awards',
        funder: 'Wellcome',
        audience: 'Students and early career',
        who: 'Early-career researchers hosted in the UK or in eligible low- and middle-income countries.',
        amount: 'Salary plus up to GBP 400,000 research costs',
        timing: 'Rolling',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-early-career-awards',
    },
    {
        name: 'BBRF Young Investigator Grants',
        funder: 'Brain & Behavior Research Foundation',
        audience: 'Students and early career',
        who: 'Early-career investigators in psychiatric and brain-disorders research.',
        amount: 'Up to USD 70,000 over 2 years',
        timing: 'Annual; next cycle expected around February 2027',
        href: 'https://bbrfoundation.org/grants-prizes/bbrf-young-investigator-grants',
    },

    // Researchers and labs
    {
        name: 'EMOTIV NeuroDiscovery Grant Program',
        funder: 'EMOTIV',
        audience: 'Researchers and labs',
        who: 'Academic and non-profit researchers, clinicians and graduate students, worldwide.',
        amount: 'EMOTIV hardware and software',
        closes: '2027-01-15',
        href: 'https://www.emotiv.com/neurodiscovery-grants',
    },
    {
        name: 'BCI Award',
        funder: 'BCI Award Foundation',
        audience: 'Researchers and labs',
        who: 'BCI researchers, students, clinicians, companies and startups, worldwide.',
        amount: 'USD 2,000 to each of three category winners',
        closes: '2027-01-15',
        href: 'https://www.bci-award.com/Home',
    },
    {
        name: 'Neuromodulation and neurostimulation device development for mental health (PAR-25-286 / PAR-25-287)',
        funder: 'NIH (NIMH)',
        audience: 'Researchers and labs',
        who: 'Universities, non-profits and companies; organisations outside the US are eligible.',
        amount: 'Standard R21 and R01 budgets',
        closes: '2027-02-16',
        timing: 'Further receipt dates June and October 2027',
        href: 'https://grants.nih.gov/grants/guide/pa-files/PAR-25-286.html',
    },
    {
        name: 'BRAIN Initiative: invasive neural recording and stimulating technologies in the human brain (RFA-NS-28-010)',
        funder: 'NIH BRAIN Initiative',
        audience: 'Researchers and labs',
        who: 'US universities, non-profits and companies, including small businesses. Not open to organisations outside the US.',
        timing: 'Several receipt dates through February 2029',
        href: 'https://www.grants.gov/search-results-detail/360402',
    },
    {
        name: 'Wellcome Discovery Awards',
        funder: 'Wellcome',
        audience: 'Researchers and labs',
        who: 'Established research leaders in the UK or in eligible low- and middle-income countries.',
        amount: 'Up to 8 years of funding',
        timing: 'Rolling',
        href: 'https://wellcome.org/research-funding/schemes/wellcome-discovery-awards',
    },

    // Startups and open source
    {
        name: 'MedTech Innovator Accelerator (including the Heart & Brain Health track)',
        funder: 'MedTech Innovator',
        audience: 'Start-up programmes and mentorship',
        who: 'Early- to mid-stage medtech and digital-health startups from any country, aiming at the US market.',
        amount: 'Prize pool over USD 700,000; programme fee or equity, scholarships available',
        closes: '2026-12-01',
        href: 'https://medtechinnovator.org/apply/',
    },
    {
        name: 'NIH Blueprint MedTech Incubator Hubs: NeuroTech Harbor and CINTA',
        funder: 'NeuroTech Harbor (Johns Hopkins and Howard University) with CIMIT, for NIH',
        audience: 'Start-up programmes and mentorship',
        who: 'Academic, industry and non-profit teams with a proven-concept medical device for the nervous system, heading to a first-in-human prototype.',
        amount: 'USD 100,000 Sprinter award, then up to USD 1.28M a year as an Optimizer',
        timing: 'Calls in cycles. Cycle 7 pre-proposals closed 21 Oct 2026; watch for the next cycle',
        href: 'https://neurotechharbor.org/',
    },
    {
        name: 'NLnet open calls',
        funder: 'NLnet Foundation',
        audience: 'Seed funding and open source',
        who: 'Individuals, collectives, non-profits, universities and small companies building open-source software or hardware, with a European dimension.',
        amount: 'EUR 5,000 to 50,000 for a first grant',
        closes: '2027-01-03',
        timing: 'Calls every two months',
        href: 'https://nlnet.nl/propose/',
    },
    {
        name: 'ARIA Rolling Opportunity Seeds',
        funder: 'ARIA (UK)',
        audience: 'Seed funding and open source',
        who: 'Individuals, students, universities, companies and charities, with most of the work done in the UK. Includes neural-interface themes.',
        amount: 'GBP 10,000 to 500,000',
        timing: 'Rolling, reviewed monthly',
        href: 'https://aria.org.uk/media/gsjkrshi/rolling-opportunity-seeds.pdf',
    },

    // Outreach and community
    {
        name: 'Brain Awareness Week Grants',
        funder: 'IBRO and the Dana Foundation',
        audience: 'Outreach and community',
        who: 'Outreach organisers and community groups in Africa, Asia-Pacific, Latin America, the US and Canada. A good fit for chapters and student clubs.',
        amount: 'Up to USD 1,250',
        timing: 'Annual; next window expected September–October 2027',
        href: 'https://ibro.org/grant/brain-awareness-week-grants/',
    },
];
