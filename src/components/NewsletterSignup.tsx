// Email-only signup that posts straight to the Mailchimp audience (no API key).
// When the newsletter moves to another service, change ACTION and the field names here.
const MC_USER = '5124b2527cf13d913a8beeea3';
const MC_LIST = '3519c19837';
const ACTION = `https://neurotechx.us12.list-manage.com/subscribe/post?u=${MC_USER}&id=${MC_LIST}`;

export default function NewsletterSignup({ className = '' }: { className?: string }) {
    return (
        <form action={ACTION} method="post" target="_blank" className={className}>
            <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                    id="newsletter-email"
                    type="email"
                    name="EMAIL"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-neuro-accent focus:outline-none"
                />
                {/* Honeypot: real people leave this empty */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name={`b_${MC_USER}_${MC_LIST}`} tabIndex={-1} defaultValue="" />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-neuro-accent px-6 py-3 font-bold text-[var(--background)] transition hover:brightness-110"
                >
                    Subscribe
                </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
                Unsubscribe at any time. See our <a href="/privacy" className="underline">privacy policy</a>.
            </p>
        </form>
    );
}
