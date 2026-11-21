import Link from 'next/link';
import { CATEGORIES, inCategory, type Job } from '@/lib/job-boards';

// Links to the /jobs/<slug> pages that have at least one open role.
export default function JobCategoryLinks({ jobs, current }: { jobs: Job[]; current?: string }) {
  const links = CATEGORIES.map((category) => ({
    category,
    count: jobs.filter((job) => inCategory(job, category)).length,
  })).filter(({ category, count }) => count > 0 && category.slug !== current);

  return (
    <ul className="flex flex-wrap gap-2">
      {current && (
        <li>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-full border border-neuro-accent/40 px-4 py-1.5 text-sm font-semibold text-neuro-accent transition-colors hover:bg-neuro-accent/10"
          >
            All roles <span className="text-xs opacity-70">{jobs.length}</span>
          </Link>
        </li>
      )}
      {links.map(({ category, count }) => (
        <li key={category.slug}>
          <Link
            href={`/jobs/${category.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-sm font-semibold transition-colors hover:border-neuro-accent hover:text-neuro-accent"
          >
            {category.label} <span className="text-xs text-muted-foreground">{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
