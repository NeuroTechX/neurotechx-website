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
export const ERP_LAB_PATH = '/learn/labs/erp-averaging';
export const BERKELEY_COURSE = 'https://github.com/neurotech-berkeley/neurotech-course';
export const BERKELEY_TEXTBOOK = 'https://parthrudesai.com/ntab_edu_textbook1/';
export const BERKELEY_FMRI_LAB = 'https://github.com/postybaloney/ntab_edu_textbook1/blob/main/Ch4/44_fMRILab.md';
export const PRIMER_CHECKS = [
    { chapter: 2, slug: 'eeg' },
    { chapter: 4, slug: 'fmri' },
    { chapter: 16, slug: 'neuroethics' },
] as const;

export function primerCheckPath(slug: (typeof PRIMER_CHECKS)[number]['slug']) {
    return `/learn/primer/${slug}`;
}
