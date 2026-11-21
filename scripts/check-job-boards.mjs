#!/usr/bin/env node
// Goes through the company list in src/data/job-sources.json and reports on every job board.
//
//   node scripts/check-job-boards.mjs                 check every company on the list
//   node scripts/check-job-boards.mjs --probe <url>   look up one new company's careers page
//   node scripts/check-job-boards.mjs --list <file>   look up many (one address per line)
//   ... --report <file>                               also write the report to a file
//
// Needs Node 22.18 or newer (it loads the site's TypeScript reader directly). No dependencies.
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ATS_NAMES, detectBoards, fetchBoard } from '../src/lib/job-boards.ts';

const SOURCES = fileURLToPath(new URL('../src/data/job-sources.json', import.meta.url));
const BROWSER = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
};

const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

async function pool(items, size, work) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await work(items[i]);
      }
    })
  );
  return results;
}

async function page(url) {
  const res = await fetch(url, { headers: BROWSER, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  return { status: res.status, finalUrl: res.url, html: res.ok ? await res.text() : '' };
}

async function readBoard(source) {
  for (let attempt = 1; ; attempt++) {
    try {
      return { jobs: await fetchBoard(source) };
    } catch (error) {
      if (attempt === 2) return { error: String(error.message ?? error) };
    }
  }
}

// What a careers page (or a board address) tells us about the hiring system behind it.
async function probe(url, known = {}) {
  let found;
  let problem;
  try {
    const { status, finalUrl, html } = await page(url);
    if (status === 404 || status === 410) problem = `link is broken (${status})`;
    else if (!html) problem = `could not be read (${status})`;
    found = detectBoards(`${url} ${finalUrl} ${html}`);
  } catch (error) {
    problem = `could not be read (${error.cause?.code ?? error.name})`;
    found = detectBoards(url);
  }
  const boards = [];
  for (const d of found) {
    const entry = { company: known.company ?? 'COMPANY NAME', site: known.site ?? new URL(url).origin, careers: url, about: known.about ?? '', fields: [], region: 'north-america', ats: d.ats, token: d.token, ...(d.ccId ? { ccId: d.ccId } : {}) };
    const result = d.readable ? await readBoard(entry) : {};
    boards.push({ ...d, entry, ...result });
  }
  return { url, problem, boards };
}

function probeLines(result, lines) {
  if (result.problem) lines.push(`- ${result.url}: ${result.problem}`);
  if (!result.boards.length && !result.problem) lines.push(`- ${result.url}: no known hiring system found in the page`);
  for (const b of result.boards) {
    if (!b.readable) {
      lines.push(`- ${result.url}: uses **${b.ats}** (\`${b.token}\`), which is not read automatically. Keep it as a careers link.`);
    } else if (b.error) {
      lines.push(`- ${result.url}: points to ${b.ats} \`${b.token}\`, but that board did not answer (${b.error}).`);
    } else {
      const sample = b.jobs.slice(0, 3).map((j) => `“${j.title}” (${j.location || 'no location'})`).join('; ');
      lines.push(
        `- ${result.url}: **${b.ats}** board \`${b.token}\` with **${b.jobs.length}** open roles. ${sample}`,
        '  Check that these are this company’s jobs (board names are sometimes shared by unrelated companies), then add:',
        '  ```json',
        `  ${JSON.stringify(b.entry)}`,
        '  ```'
      );
    }
  }
}

const lines = [];
let needsAction = false;

if (option('--probe') || option('--list')) {
  const urls = option('--probe')
    ? [option('--probe')]
    : (await readFile(option('--list'), 'utf8')).split('\n').map((l) => l.trim()).filter((l) => /^https?:\/\//.test(l));
  lines.push(`## Careers page lookup (${urls.length})`, '');
  for (const result of await pool(urls, 6, (url) => probe(url))) probeLines(result, lines);
} else {
  const sources = JSON.parse(await readFile(SOURCES, 'utf8'));
  const listed = sources.filter((s) => s.ats);
  const watch = sources.filter((s) => !s.ats);
  const invalid = sources.filter((s) => !s.company || !s.careers || (s.ats && (!ATS_NAMES.includes(s.ats) || !s.token)));

  const boards = await pool(listed, 6, async (s) => ({ s, ...(await readBoard(s)) }));
  const failed = boards.filter((b) => b.error);
  const empty = boards.filter((b) => b.jobs && !b.jobs.length);
  const total = boards.reduce((n, b) => n + (b.jobs?.length ?? 0), 0);

  const watched = await pool(watch, 6, async (s) => ({ s, ...(await probe(s.careers, s)) }));
  const discovered = watched.filter((w) => w.boards.some((b) => b.readable && b.jobs?.length));
  const broken = watched.filter((w) => w.problem?.startsWith('link is broken'));

  needsAction = Boolean(failed.length || discovered.length || broken.length || invalid.length);

  lines.push(
    `## Job boards: ${total} open roles at ${listed.length - failed.length - empty.length} companies`,
    '',
    needsAction ? '**Something needs a look. See the first sections below.**' : 'Nothing needs attention.',
    ''
  );
  if (invalid.length) lines.push('### Entries with a mistake in the list', '', ...invalid.map((s) => `- ${s.company ?? JSON.stringify(s)}`), '');
  if (failed.length)
    lines.push('### Boards that did not answer', '', 'Their jobs are missing from the site until this is fixed (the company may have changed hiring system).', '', ...failed.map((b) => `- **${b.s.company}** (${b.s.ats} \`${b.s.token}\`): ${b.error}. Careers page: ${b.s.careers}`), '');
  if (discovered.length) {
    lines.push('### Companies we only link to, whose job board can now be read', '');
    for (const w of discovered) probeLines({ ...w, problem: undefined, boards: w.boards.filter((b) => b.readable && b.jobs?.length) }, lines);
    lines.push('');
  }
  if (broken.length) lines.push('### Careers links that are broken', '', ...broken.map((w) => `- **${w.s.company}**: ${w.s.careers}`), '');
  if (empty.length) lines.push('### Listed companies with no open roles right now', '', ...empty.map((b) => `- ${b.s.company}`), '');

  lines.push('### Listed companies', '', '| Company | Board | Open roles |', '|---|---|---|');
  for (const b of boards) lines.push(`| ${b.s.company} | ${b.s.ats} \`${b.s.token}\` | ${b.error ? 'no answer' : b.jobs.length} |`);
  lines.push('', '### Companies we only link to', '', '| Company | Careers page | What the page shows |', '|---|---|---|');
  for (const w of watched) {
    const seen = w.boards.map((b) => `${b.ats} \`${b.token}\`${b.readable ? (b.error ? ' (no answer)' : ` (${b.jobs.length} roles)`) : ' (not read automatically)'}`).join(', ');
    lines.push(`| ${w.s.company} | ${w.s.careers} | ${w.problem ?? (seen || 'no known hiring system')}${w.problem && seen ? `; ${seen}` : ''} |`);
  }
}

const report = lines.join('\n') + '\n';
console.log(report);
if (option('--report')) await writeFile(option('--report'), report);
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `needs_action=${needsAction}\n`);
