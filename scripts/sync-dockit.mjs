import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';

// Two documentation repositories are published as pages on this site, never linked to on GitHub.
// Each page listed in a repository's index.rst toctree is converted with pandoc to
// src/content/<collection>/<slug>.mdx, and the table of contents is written to _index.json.
const SOURCES = [
    {
        name: 'NTX-dockit',
        repo: 'https://github.com/NeuroTechX/NTX-dockit.git',
        outDir: 'src/content/dockit',
        basePath: '/guide',
        // Pages with their own long-standing address on the site
        routes: {
            'chapter-guidelines': '/community/chapter-guidelines',
            'community-growth': '/community/growth',
            'getting-started': '/education/getting-started',
            resources: '/education/resources',
            'chapter-onboarding': '/community/start-a-chapter',
            'student-club-onboarding': '/students/start-a-club',
            // The site has its own Code of Conduct page; the dockit copy is not published
            conduct: '/code-of-conduct',
        },
        skip: ['conduct'],
        titles: {
            'chapter-onboarding': 'Starting a Chapter',
            'student-club-onboarding': 'Starting a Student Club',
        },
    },
    {
        name: 'NTX-handbook',
        repo: 'https://github.com/NeuroTechX/NTX-handbook.git',
        outDir: 'src/content/handbook',
        basePath: '/handbook',
        routes: {},
        skip: [],
        titles: {},
    },
];

// Old Read the Docs addresses of the dockit, rewritten to the site
const READTHEDOCS = /https?:\/\/ntx-dockit\.readthedocs\.(?:io|org)\/en\/latest\/?([A-Za-z0-9-]*)(?:\.html)?/g;

function syncAll() {
    const allRoutes = {};
    const allTitles = {};
    const converted = SOURCES.map((source) => {
        const result = convertSource(source);
        Object.assign(allRoutes, result.routes);
        for (const [slug, page] of Object.entries(result.pages)) allTitles[slug] = page.title;
        return result;
    });
    for (const result of converted) {
        writeSource(result, allRoutes, allTitles);
    }
    console.log('Sync complete.');
}

function convertSource(source) {
    const tempDir = path.join(process.cwd(), `temp_sync_${source.name}`);
    console.log(`Cloning ${source.repo}...`);
    fs.rmSync(tempDir, { recursive: true, force: true });
    execFileSync('git', ['clone', '--depth', '1', source.repo, tempDir], { stdio: 'inherit' });
    const branch = execFileSync('git', ['-C', tempDir, 'rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();

    const sections = parseToctree(fs.readFileSync(path.join(tempDir, 'index.rst'), 'utf8'));
    const routes = {};
    const pages = {};
    for (const section of sections) {
        for (const file of section.pages) {
            const slug = file.toLowerCase();
            routes[slug] = source.routes[slug] || `${source.basePath}/${slug}`;
            if (source.skip.includes(slug)) continue;
            const rstPath = path.join(tempDir, `${file}.rst`);
            if (!fs.existsSync(rstPath)) {
                console.warn(`Warning: ${source.name} page ${file}.rst not found.`);
                continue;
            }
            const markdown = execFileSync('pandoc', [rstPath, '-f', 'rst', '-t', 'gfm', '--wrap=none']).toString();
            const title = source.titles[slug] || (markdown.match(/^# (.+)$/m) || [])[1] || prettify(slug);
            pages[slug] = { markdown, title, file };
        }
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
    return { source, sections, routes, pages, branch };
}

function writeSource({ source, sections, routes, pages, branch }, allRoutes, allTitles) {
    const outDir = path.join(process.cwd(), source.outDir);
    fs.mkdirSync(outDir, { recursive: true });

    for (const [slug, { markdown, title, file }] of Object.entries(pages)) {
        const body = sanitizeMdx(linkReferences(markdown, allRoutes, allTitles));
        writeIfChanged(path.join(outDir, `${slug}.mdx`), body, {
            title,
            // Kept for maintainers; not shown on the site
            sourceUrl: `${source.repo.replace('.git', '')}/blob/${branch}/${file}.rst`,
            updatedAt: new Date().toISOString().split('T')[0],
        });
    }

    // Pages removed upstream disappear from the site too
    for (const file of fs.readdirSync(outDir)) {
        if (file.endsWith('.mdx') && !pages[file.replace('.mdx', '')]) {
            fs.rmSync(path.join(outDir, file));
            console.log(`Removed ${file}`);
        }
    }

    const index = sections.map((section) => ({
        heading: section.heading,
        pages: section.pages
            .map((file) => file.toLowerCase())
            .filter((slug) => pages[slug] || routes[slug] !== `${source.basePath}/${slug}`)
            .map((slug) => ({ slug, title: pages[slug]?.title || prettify(slug), href: routes[slug] })),
    }));
    const indexPath = path.join(outDir, '_index.json');
    const indexJson = `${JSON.stringify(index, null, 2)}\n`;
    if (!fs.existsSync(indexPath) || fs.readFileSync(indexPath, 'utf8') !== indexJson) {
        fs.writeFileSync(indexPath, indexJson);
        console.log(`Saved ${indexPath}`);
    }
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
            for (i++; i < lines.length && (/^\s/.test(lines[i]) || !lines[i].trim()); i++) {
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
function linkReferences(markdown, routes, titles) {
    return markdown
        // :doc:`Label <slug>` and :ref:`Label <slug>` arrive as `Label <slug>`
        .replace(/`([^`<>]+?)\s*<([A-Za-z0-9-]+)>`/g, (match, label, slug) =>
            routes[slug.toLowerCase()] ? `[${label.trim()}](${routes[slug.toLowerCase()]})` : match)
        // :doc:`slug` and :ref:`slug` arrive as `slug`
        .replace(/`([A-Za-z0-9-]+)`/g, (match, slug) =>
            routes[slug.toLowerCase()] ? `[${titles[slug.toLowerCase()] || prettify(slug)}](${routes[slug.toLowerCase()]})` : match)
        .replace(READTHEDOCS, (_m, page) => `https://neurotechx.org${page ? routes[page.toLowerCase()] || '/guide' : '/guide'}`)
        // Admonitions ("Draft") become blockquotes with a bold label
        .replace(/<div class="admonition">\s*\n\n([^\n]+)\n\n([\s\S]*?)\n\n<\/div>/g,
            (_m, label, body) => quote(`**${label}.** ${body}`))
        .replace(/^> \[!NOTE\]\n/gm, '> **Note.** ');
}

function quote(text) {
    return text.split('\n').map((line) => (line ? `> ${line}` : '>')).join('\n');
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

function writeIfChanged(mdxPath, body, frontmatterData) {
    if (fs.existsSync(mdxPath)) {
        const existing = matter(fs.readFileSync(mdxPath, 'utf8'));
        if (existing.content.trim() === body.trim() && existing.data.title === frontmatterData.title) {
            return;
        }
    }
    fs.writeFileSync(mdxPath, matter.stringify(body, frontmatterData));
    console.log(`Saved ${mdxPath}`);
}

function prettify(slug) {
    if (slug.toLowerCase() === 'faq') return 'FAQ';
    return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

syncAll();
