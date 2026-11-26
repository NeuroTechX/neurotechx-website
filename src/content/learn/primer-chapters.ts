export const PRIMER_PDF = '/downloads/the-neurotech-primer.pdf';

const printedPages = [1, 9, 27, 43, 53, 69, 85, 109, 127, 141, 155, 165, 183, 197, 211, 219, 229, 251];

export function primerPdfPage(printedPage: number) {
    // The 2021 PDF includes twelve pages before printed page 1.
    return `${PRIMER_PDF}#page=${printedPage + 12}`;
}

export function primerChapterPdf(chapter: number) {
    return primerPdfPage(printedPages[chapter - 1]);
}

export const FIRST_EEG_PATH = '/learn/labs/first-eeg';
export const FILTERING_LAB_PATH = '/learn/labs/eeg-filtering';
export const ERP_LAB_PATH = '/learn/labs/erp-averaging';
export const EEG_CAPSTONE_PATH = '/learn/labs/eeg-capstone';
export const MRI_LAB_PATH = '/learn/labs/mri-and-bold';
export const LEARN_LAB_PATHS = [FIRST_EEG_PATH, FILTERING_LAB_PATH, ERP_LAB_PATH, EEG_CAPSTONE_PATH, MRI_LAB_PATH] as const;
export const BERKELEY_COURSE = 'https://github.com/neurotech-berkeley/neurotech-course';
export const BERKELEY_TEXTBOOK = 'https://parthrudesai.com/ntab_edu_textbook1/';
export const BERKELEY_FMRI_LAB = 'https://github.com/postybaloney/ntab_edu_textbook1/blob/main/Ch4/44_fMRILab.md';
export const PRIMER_CHECKS = [
    { chapter: 1, slug: 'history' },
    { chapter: 2, slug: 'eeg' },
    { chapter: 3, slug: 'meg' },
    { chapter: 4, slug: 'fmri' },
    { chapter: 5, slug: 'fnirs' },
    { chapter: 6, slug: 'pet' },
    { chapter: 7, slug: 'ieeg' },
    { chapter: 8, slug: 'tes' },
    { chapter: 9, slug: 'tms' },
    { chapter: 10, slug: 'dbs' },
    { chapter: 11, slug: 'fus' },
    { chapter: 12, slug: 'hybrid' },
    { chapter: 13, slug: 'market' },
    { chapter: 14, slug: 'ecosystem' },
    { chapter: 15, slug: 'challenges' },
    { chapter: 16, slug: 'neuroethics' },
    { chapter: 17, slug: 'future' },
    { chapter: 18, slug: 'where-to-start' },
] as const;

export function primerCheckPath(slug: (typeof PRIMER_CHECKS)[number]['slug']) {
    return `/learn/primer/${slug}`;
}
