import { Logo } from './Logo';
import { ComingSoonBadge } from '@/components/ui/Badge';

const ATHLETE_LINKS = [
  { href: '/register/athlete', label: 'Create Your Profile' },
  { href: '/#for-athletes', label: 'Why SportFo' },
  { href: '/#how-it-works', label: 'How It Works' },
];

const ECOSYSTEM_ITEMS = ['Academies & Coaches', 'CSR Sponsors', 'Employers', 'Sports Professionals'];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-ink-900/8 bg-ink-950 text-white">
      <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            SportFo helps athletes build a verified digital sports identity, showcase
            achievements, and get discovered by the people who can move their career
            forward.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">For Athletes</p>
          <ul className="mt-4 space-y-3">
            {ATHLETE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="focus-ring rounded-md text-sm text-white/70 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Ecosystem</p>
          <ul className="mt-4 space-y-3">
            {ECOSYSTEM_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/40">
                {item}
                <ComingSoonBadge className="bg-white/10 text-white/50" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} SportFo. All rights reserved.</p>
          <p>Built for athletes, by people who back them.</p>
        </div>
      </div>
    </footer>
  );
}
