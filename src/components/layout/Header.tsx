'use client';

import * as React from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/#for-athletes', label: 'For Athletes', id: 'for-athletes' },
  { href: '/#how-it-works', label: 'How It Works', id: 'how-it-works' },
  { href: '/#ecosystem', label: 'Ecosystem', id: 'ecosystem' },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Elevate the header with a shadow once the page has scrolled past the hero.
  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section is currently in view (scroll-spy), skipped
  // entirely on pages without the landing sections' ids. More than one
  // section can be inside the intersection band at once (e.g. near the
  // bottom of a short page), so track the full intersecting set and pick
  // the last one in document order — the section the user most recently
  // scrolled into.
  React.useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        });
        // NAV_LINKS is already in document order, so the last matching
        // entry is the bottom-most (most recently scrolled-into) section.
        const activeCandidates = NAV_LINKS.filter((link) => intersecting.has(link.id));
        const last = activeCandidates[activeCandidates.length - 1];
        if (last) setActiveId(last.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape or a click outside it.
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <>
      <header
        ref={menuRef}
        className={cn(
          'sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-200',
          scrolled ? 'border-ink-900/8 shadow-[0_1px_12px_-2px_rgba(10,15,30,0.08)]' : 'border-transparent'
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'focus-ring relative rounded-md py-1 text-sm font-medium transition-colors',
                  activeId === link.id ? 'text-ink-900' : 'text-ink-900/65 hover:text-ink-900'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-[3px] left-0 h-0.5 rounded-full bg-brand-600 transition-all duration-200',
                    activeId === link.id ? 'w-full' : 'w-0'
                  )}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button href="/register/athlete" size="md">
              Create Your Profile
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'absolute transition-all duration-200',
                open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              )}
            >
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                'absolute transition-all duration-200',
                open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              )}
            >
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            'overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-out md:hidden',
            open ? 'max-h-80 border-ink-900/8 opacity-100' : 'max-h-0 border-transparent opacity-0'
          )}
        >
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-md px-2 py-2.5 text-sm font-medium text-ink-900/70 transition-colors hover:bg-ink-900/[0.04]"
              >
                {link.label}
              </a>
            ))}
            <Button href="/register/athlete" size="md" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Create Your Profile
            </Button>
          </nav>
        </div>
      </header>

      {/* Dims the page behind the mobile menu; tapping it closes the menu. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-ink-950/25 backdrop-blur-[1px] transition-opacity duration-200 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
    </>
  );
}
