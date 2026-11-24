import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';

const REPO_URL = 'https://github.com/NeuroTechX/NTX-dockit.git';
const TEMP_DIR = path.join(process.cwd(), 'temp_dockit_sync');
const CONTENT_DIR = path.join(process.cwd(), 'src/content/dockit');

// The internal volunteer manual: every page listed in its index.rst becomes /handbook/<slug>
const HANDBOOK_REPO_URL = 'https://github.com/NeuroTechX/NTX-handbook.git';
const HANDBOOK_TEMP_DIR = path.join(process.cwd(), 'temp_handbook_sync');
const HANDBOOK_DIR = path.join(process.cwd(), 'src/content/handbook');

// Mapping configuration: RST file in repo -> MDX output filename (relative to CONTENT_DIR)
const FILE_MAPPING = {
    'about.rst': 'about.mdx',
    'community-growth.rst': 'community-growth.mdx',
    'chapter-guidelines.rst': 'chapter-guidelines.mdx',
    'resources.rst': 'resources.mdx',
    'getting-started.rst': 'getting-started.mdx',
    'chapter-onboarding.rst': 'chapter-onboarding.mdx',
    'student-club-onboarding.rst': 'student-club-onboarding.mdx',
};

// Page titles that differ from the prettified filename
const TITLES = {
    'chapter-onboarding.rst': 'Starting a Chapter',
    'student-club-onboarding.rst': 'Starting a Student Club',
};

async function syncDockit() {
    console.log('Starting NTX-dockit sync...');

    // 1. Prepare temp directory
    if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_DIR);

    // 2. Clone repository
    console.log(`Cloning ${REPO_URL}...`);
    execFileSync('git', ['clone', '--depth', '1', REPO_URL, TEMP_DIR], { stdio: 'inherit' });

    // 3. Prepare content directory
    if (!fs.existsSync(CONTENT_DIR)) {
        fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    // 4. Process files
    for (const [rstFile, mdxFile] of Object.entries(FILE_MAPPING)) {
        const rstPath = path.join(TEMP_DIR, rstFile);
        const mdxPath = path.join(CONTENT_DIR, mdxFile);

        if (fs.existsSync(rstPath)) {
            console.log(`Processing ${rstFile} -> ${mdxFile}...`);

            try {
                // Convert using pandoc
                // -f rst (from ReStructuredText)
                // -t gfm (to GitHub Flavored Markdown)
                // --wrap=none (preserve line breaks)
                const markdownContent = sanitizeMdx(
                    execFileSync('pandoc', [rstPath, '-f', 'rst', '-t', 'gfm', '--wrap=none']).toString()
                );

                // Skip if the converted body is unchanged — avoids a daily no-op
                // commit (and Vercel deploy) caused only by bumping updatedAt.
                if (fs.existsSync(mdxPath)) {
                    const existing = matter(fs.readFileSync(mdxPath, 'utf8'));
                    if (existing.content.trim() === markdownContent.trim()) {
                        console.log(`No content change for ${mdxFile}, skipping.`);
                        continue;
                    }
                }

                // Add Frontmatter
                const title = TITLES[rstFile] || extractTitle(rstFile) || path.basename(mdxFile, '.mdx');
                const frontmatterData = {
                    title: title,
                    sourceUrl: `${REPO_URL.replace('.git', '')}/blob/master/${rstFile}`,
                    updatedAt: new Date().toISOString().split('T')[0],
                };

                const fileContent = matter.stringify(markdownContent, frontmatterData);

                fs.writeFileSync(mdxPath, fileContent);
                console.log(`Saved ${mdxPath}`);
            } catch (error) {
                console.error(`Error processing ${rstFile}:`, error.message);
                if (error.message.includes('pandoc: not found')) {
                    console.error('CRITICAL: Pandoc is required but not found in PATH.');
                    process.exit(1);
                }
            }
        } else {
            console.warn(`Warning: Source file ${rstFile} not found in repo.`);
        }
    }

    // 5. Cleanup
    console.log('Cleaning up...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });

    syncHandbook();
    console.log('Sync complete.');
}

function syncHandbook() {
    console.log(`Cloning ${HANDBOOK_REPO_URL}...`);
    fs.rmSync(HANDBOOK_TEMP_DIR, { recursive: true, force: true });
    execFileSync('git', ['clone', '--depth', '1', HANDBOOK_REPO_URL, HANDBOOK_TEMP_DIR], { stdio: 'inherit' });
    fs.mkdirSync(HANDBOOK_DIR, { recursive: true });

    const sections = parseToctree(fs.readFileSync(path.join(HANDBOOK_TEMP_DIR, 'index.rst'), 'utf8'));
    const slugs = sections.flatMap((section) => section.pages);

    // Convert first, so every page title is known before cross-references are linked
    const pages = {};
    for (const slug of slugs) {
        const rstPath = path.join(HANDBOOK_TEMP_DIR, `${slug}.rst`);
        if (!fs.existsSync(rstPath)) {
            console.warn(`Warning: handbook page ${slug}.rst not found.`);
            continue;
        }
        const markdown = execFileSync('pandoc', [rstPath, '-f', 'rst', '-t', 'gfm', '--wrap=none']).toString();
        const title = (markdown.match(/^# (.+)$/m) || [])[1] || extractTitle(`${slug}.rst`);
        pages[slug] = { markdown, title };
    }

    for (const [slug, { markdown, title }] of Object.entries(pages)) {
        const body = sanitizeMdx(handbookMarkdown(markdown, pages));
        writeIfChanged(path.join(HANDBOOK_DIR, `${slug}.mdx`), body, {
            title,
            sourceUrl: `${HANDBOOK_REPO_URL.replace('.git', '')}/blob/main/${slug}.rst`,
            updatedAt: new Date().toISOString().split('T')[0],
        });
    }

    // Pages removed from the handbook disappear from the site too
    for (const file of fs.readdirSync(HANDBOOK_DIR)) {
        if (file.endsWith('.mdx') && !pages[file.replace('.mdx', '')]) {
            fs.rmSync(path.join(HANDBOOK_DIR, file));
        }
    }

    const index = sections.map((section) => ({
        heading: section.heading,
        pages: section.pages.filter((slug) => pages[slug]).map((slug) => ({ slug, title: pages[slug].title })),
    }));
    const indexPath = path.join(HANDBOOK_DIR, '_index.json');
    const indexJson = `${JSON.stringify(index, null, 2)}\n`;
    if (!fs.existsSync(indexPath) || fs.readFileSync(indexPath, 'utf8') !== indexJson) {
        fs.writeFileSync(indexPath, indexJson);
    }

    fs.rmSync(HANDBOOK_TEMP_DIR, { recursive: true, force: true });
}

// Section headings and the pages listed in each toctree, in order
function parseToctree(rst) {
    const lines = rst.split('\n');
    const sections = [];
    let heading = '';
    for (let i = 0; i < lines.length; i++) {
        if (/^-{3,}\s*$/.test(lines[i + 1] || '') && lines[i].trim()) {
            heading = lines[i].trim();
        }
        if (lines[i].startsWith('.. toctree::')) {
            const pages = [];
            for (i++; i < lines.length && (lines[i].startsWith(' ') || !lines[i].trim()); i++) {
                const entry = lines[i].trim();
                if (entry && !entry.startsWith(':')) pages.push(entry);
            }
            i--;
            sections.push({ heading, pages });
        }
    }
    return sections;
}

// Sphinx features pandoc leaves as code or raw HTML
function handbookMarkdown(markdown, pages) {
    return markdown
        // :doc:`slug` arrives as `slug`; link it to the page on the site
        .replace(/`([a-z0-9-]+)`/g, (match, slug) => (pages[slug] ? `[${pages[slug].title}](/handbook/${slug})` : match))
        // Admonitions ("Draft") and notes become blockquotes with a bold label
        .replace(/<div class="admonition">\s*\n\n([^\n]+)\n\n([\s\S]*?)\n\n<\/div>/g,
            (_m, label, body) => quote(`**${label}.** ${body}`))
        .replace(/^> \[!NOTE\]\n/gm, '> **Note.** ');
}

function quote(text) {
    return text.split('\n').map((line) => (line ? `> ${line}` : '>')).join('\n');
}

function writeIfChanged(mdxPath, body, frontmatterData) {
    if (fs.existsSync(mdxPath)) {
        const existing = matter(fs.readFileSync(mdxPath, 'utf8'));
        if (existing.content.trim() === body.trim()) {
            return;
        }
    }
    fs.writeFileSync(mdxPath, matter.stringify(body, frontmatterData));
    console.log(`Saved ${mdxPath}`);
}

// Pandoc passes raw HTML from the .rst through unchanged. MDX/React rejects void
// elements that wrap children (e.g. `<input ...>text</input>`), which breaks the
// build. Rewrite them to self-closing + sibling text so MDX renders cleanly.
function sanitizeMdx(md) {
    return md
        .replace(/<input\b([^>]*?)\/?\s*>([\s\S]*?)<\/input>/gi,
            (_m, attrs, inner) => `<input${attrs.replace(/\s+$/, '')} /> ${inner.trim()}`)
        // strip empty <form> / <ol> wrappers pandoc emits around the above
        .replace(/<\/?form[^>]*>/gi, '')
        // MDX reads <name@host> and <https://...> autolinks as JSX; write them as plain links
        .replace(/<([\w.+-]+@[\w-]+(?:\.[\w-]+)+)>/g, '[$1](mailto:$1)')
        .replace(/<(https?:\/\/[^\s>]+)>/g, '[$1]($1)');
}

function extractTitle(filename) {
    // Simple heuristic: usage map or just prettify filename
    const name = path.basename(filename, path.extname(filename));
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

syncDockit().catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
});
