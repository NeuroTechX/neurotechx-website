"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';


const NAV_ITEMS = [
    { name: 'About', href: '/about' },
    { name: 'Community', href: '/community' },
    { name: 'Education', href: '/education' },
    { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
    { name: 'Ecosystem', href: '/ecosystem' },
    { name: 'Reports', href: '/reports' },
    { name: 'Jobs', href: '/jobs' },
];

const JOIN_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfZyzhVdOLU8_oQ4NylHL8EFoKLIVmryGXA4u7HDsZpkTryvg/viewform';

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeMenu = () => setMobileMenuOpen(false);
    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    const navLinks = (onNavigate?: () => void) =>
        NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
                <Link
                    key={item.name}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                >
                    {item.name}
                </Link>
            );
        });

    return (
        <div className={styles.headerWrapper}>
            {/* Main Navigation */}
            <header className={styles.mainHeader}>
                <div className={styles.container}>
                    <div className={styles.leftSection}>
                        <div className={styles.logo}>
                            <Link href="/" className={styles.logoText} onClick={closeMenu}>
                                <span style={{ fontWeight: 900, letterSpacing: '-0.05em' }}>NeuroTech</span><span style={{ color: 'var(--neuro-accent)' }}>X</span>
                            </Link>
                        </div>
                        {/* Tabs as a proper row */}
                        <nav className={styles.nav}>{navLinks()}</nav>
                    </div>

                    <div className={styles.rightSection}>
                        <Link href="/donate" className={styles.donateLink}>
                            Donate
                        </Link>
                        <a href={JOIN_FORM} target="_blank" rel="noopener noreferrer" className={styles.joinButton}>
                            Join Community
                        </a>
                        <button
                            id={styles.toggleNavButton}
                            className={styles.mobileNav}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation menu"
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

            <nav aria-label="Mobile" data-nav="mobile" id={mobileMenuOpen ? styles.mobileNavLinks : styles.hidden}>
                <a href={JOIN_FORM} target="_blank" rel="noopener noreferrer" className={styles.joinButton} onClick={closeMenu}>
                    Join Community
                </a>
                <Link href="/donate" className={styles.donateLink} onClick={closeMenu}>
                    Donate
                </Link>
                {navLinks(closeMenu)}
            </nav>

            {/* Ticket Bar (Sub-header) - Restored "Wonderful" Style */}
            <div className={styles.ticketBanner}>
                <div className={styles.bannerContainer}>
                    <div className={styles.bannerContent}>
                        <span className={styles.badge}>Abstracts due Jan 15</span>
                        <span className={styles.bannerTitle}>12th International BCI Meeting</span>
                        <span className={styles.bannerDetails}>Šibenik, Croatia • Jun 7–10, 2027</span>
                    </div>
                    <a href="https://bcisociety.org/bci-meeting/abstract-submission/" target="_blank" rel="noopener noreferrer" className={styles.ticketLink}>
                        Learn more <ArrowRight width={14} height={14} />
                    </a>
                </div>
            </div>
        </div>
    );
}
