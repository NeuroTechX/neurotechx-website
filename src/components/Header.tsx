"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import LanguageSwitch from './LanguageSwitch';
import type { Dictionary } from '@/i18n/fr';
import { localizePath, parsePublicPath, type Locale } from '@/i18n/routes';
import styles from './Header.module.css';

// Five sections with short menus, plus Events. Pages outside these menus are in the footer.
// href values are English route paths; localizePath gives the French address.
type MenuItem = { label: string; href: string };
type Menu = { id: string; title: string; items: MenuItem[] };

function buildMenus(t: Dictionary['nav']): Menu[] {
    return [
        {
            id: 'about',
            title: t.about.title,
            items: [
                { label: t.about.mission, href: '/about' },
                { label: t.about.joinTeam, href: '/join-the-team' },
                { label: t.about.transparency, href: '/transparency' },
                { label: t.about.conduct, href: '/code-of-conduct' },
            ],
        },
        {
            id: 'community',
            title: t.community.title,
            items: [
                { label: t.community.overview, href: '/community' },
                { label: t.community.chapters, href: '/community/start-a-chapter' },
                { label: t.community.students, href: '/students' },
                { label: t.community.contentLab, href: '/content-lab' },
                { label: t.community.newsletter, href: '/newsletter' },
                { label: t.community.handbook, href: '/handbook' },
            ],
        },
        {
            id: 'learn',
            title: t.learn.title,
            items: [
                { label: t.learn.education, href: '/education' },
                { label: t.learn.gettingStarted, href: '/education/getting-started' },
                { label: t.learn.primer, href: '/primer' },
                { label: t.learn.webinars, href: '/education/webinars' },
            ],
        },
        {
            id: 'projects',
            title: t.projects.title,
            items: [
                { label: t.projects.openSource, href: '/projects' },
                { label: t.projects.challenges, href: '/projects#challenges' },
            ],
        },
        {
            id: 'ecosystem',
            title: t.ecosystem.title,
            items: [
                { label: t.ecosystem.map, href: '/ecosystem' },
                { label: t.ecosystem.funding, href: '/funding' },
                { label: t.ecosystem.reports, href: '/reports' },
                { label: t.ecosystem.jobs, href: '/jobs' },
            ],
        },
    ];
}

// Change the id when the banner changes, so visitors who closed the old one see the new one.
const BANNER_ID = 'bci-meeting-2027';
const BANNER_EVENT = 'ntx-banner-dismissed';

function bannerDismissed() {
    try {
        return localStorage.getItem('dismissedBanner') === BANNER_ID;
    } catch {
        return false;
    }
}

function onBannerChange(callback: () => void) {
    window.addEventListener(BANNER_EVENT, callback);
    return () => window.removeEventListener(BANNER_EVENT, callback);
}

const pathOf = (href: string) => href.split('#')[0];

export default function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
    const [, routePath] = parsePublicPath(usePathname() ?? '/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const desktopNav = useRef<HTMLElement>(null);
    const bannerOpen = !useSyncExternalStore(onBannerChange, bannerDismissed, () => false);
    const menus = buildMenus(t.nav);
    const href = (path: string) => localizePath(path, lang);
    const isActive = (path: string) => routePath === path || routePath.startsWith(`${path}/`);
    const closeAll = () => {
        setMobileMenuOpen(false);
        setOpenMenu(null);
    };

    // Close an open menu on Escape or a click outside it.
    useEffect(() => {
        if (!openMenu) return;
        const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpenMenu(null);
        const onClick = (event: MouseEvent) => {
            if (!desktopNav.current?.contains(event.target as Node)) setOpenMenu(null);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [openMenu]);

    const dismissBanner = () => {
        try {
            localStorage.setItem('dismissedBanner', BANNER_ID);
        } catch {}
        window.dispatchEvent(new Event(BANNER_EVENT));
    };

    const itemLink = (item: MenuItem, className: string) => {
        const active = !item.href.includes('#') && isActive(item.href);
        return (
            <Link
                key={item.href}
                href={href(pathOf(item.href)) + (item.href.includes('#') ? `#${item.href.split('#')[1]}` : '')}
                onClick={closeAll}
                aria-current={active ? 'page' : undefined}
                className={active ? `${className} ${styles.menuItemActive}` : className}
            >
                {item.label}
            </Link>
        );
    };

    return (
        <div className={styles.headerWrapper}>
            <header className={styles.mainHeader}>
                <div className={styles.container}>
                    <div className={styles.leftSection}>
                        <div className={styles.logo}>
                            <Link href={href('/')} className={styles.logoText} onClick={closeAll}>
                                <span style={{ fontWeight: 900, letterSpacing: '-0.05em' }}>NeuroTech</span><span style={{ color: 'var(--neuro-accent)' }}>X</span>
                            </Link>
                        </div>
                        <nav ref={desktopNav} aria-label={t.nav.label} className={styles.nav}>
                            {menus.map((menu) => {
                                const sectionActive = menu.items.some((item) => isActive(pathOf(item.href)));
                                const expanded = openMenu === menu.id;
                                return (
                                    <div key={menu.id} className={styles.menu}>
                                        <button
                                            type="button"
                                            aria-expanded={expanded}
                                            aria-controls={`menu-${menu.id}`}
                                            onClick={() => setOpenMenu(expanded ? null : menu.id)}
                                            className={sectionActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                                        >
                                            {menu.title}
                                            <ChevronDown width={14} height={14} aria-hidden="true" className={expanded ? styles.chevronOpen : styles.chevron} />
                                        </button>
                                        <div id={`menu-${menu.id}`} hidden={!expanded} className={styles.menuPanel}>
                                            {menu.items.map((item) => itemLink(item, styles.menuItem))}
                                        </div>
                                    </div>
                                );
                            })}
                            <Link
                                href={href('/events')}
                                onClick={closeAll}
                                aria-current={isActive('/events') ? 'page' : undefined}
                                className={isActive('/events') ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                            >
                                {t.nav.events}
                            </Link>
                        </nav>
                    </div>

                    <div className={styles.rightSection}>
                        <LanguageSwitch label={t.languageSwitch.label} />
                        <Link href={href('/donate')} className={styles.donateLink}>
                            {t.nav.donate}
                        </Link>
                        <Link href={href('/community')} className={styles.joinButton}>
                            {t.nav.join}
                        </Link>
                        <button
                            id={styles.toggleNavButton}
                            className={styles.mobileNav}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            {
                            mobileMenuOpen ?
                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg> :
                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                             }
                        </button>
                    </div>
                </div>
            </header>

            <nav aria-label={t.nav.label} data-nav="mobile" id={mobileMenuOpen ? styles.mobileNavLinks : styles.hidden}>
                <Link href={href('/community')} className={styles.joinButton} onClick={closeAll}>
                    {t.nav.join}
                </Link>
                <Link href={href('/donate')} className={styles.donateLink} onClick={closeAll}>
                    {t.nav.donate}
                </Link>
                {menus.map((menu) => (
                    <div key={menu.id} className={styles.mobileSection}>
                        <p className={styles.mobileHeading}>{menu.title}</p>
                        {menu.items.map((item) => itemLink(item, styles.mobileItem))}
                    </div>
                ))}
                <div className={styles.mobileSection}>
                    {itemLink({ label: t.nav.events, href: '/events' }, styles.mobileHeadingLink)}
                </div>
            </nav>

            {/* Event banner: visitors can close it */}
            {bannerOpen && (
                <div className={styles.ticketBanner}>
                    <div className={styles.bannerContainer}>
                        <div className={styles.bannerContent}>
                            <span className={styles.badge}>{t.banner.badge}</span>
                            <span className={styles.bannerTitle}>{t.banner.title}</span>
                            <span className={styles.bannerDetails}>{t.banner.details}</span>
                        </div>
                        <div className={styles.bannerActions}>
                            <a href="https://bcisociety.org/bci-meeting/abstract-submission/" target="_blank" rel="noopener noreferrer" className={styles.ticketLink}>
                                {t.banner.cta} <ArrowRight width={14} height={14} />
                            </a>
                            <button type="button" className={styles.bannerClose} onClick={dismissBanner} aria-label={t.banner.close}>
                                <X width={16} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
