import { IconCheck } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const CAPABILITIES = [
  'Personal and sports information, organized into a clean profile',
  'Upload achievements with supporting files as proof',
  'Save your progress as a draft and finish later',
  'Submit a complete profile and get a shareable profile view',
  'Track your profile strength as you fill in more detail',
];

export function AthleteFocus() {
  return (
    <section id="for-athletes" className="bg-ink-950 text-white">
      <div className="container-page section-y grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">Built for athletes</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to represent yourself professionally.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            No résumé templates, no scattered PDFs. Fill out one guided profile once —
            personal details, sports background, and achievements — and keep it
            up to date as your career grows.
          </p>
          <div className="mt-8">
            <Button href="/register/athlete" size="lg">
              Create Your Profile
            </Button>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/40">Available now</p>
          <ul className="mt-5 space-y-4">
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500/15 text-success-500">
                  <IconCheck width={13} height={13} />
                </span>
                <span className="text-sm leading-relaxed text-white/75">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
