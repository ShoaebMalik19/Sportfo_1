import { Badge } from '@/components/ui/Badge';
import { IconTrophy, IconCheck } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Parallax } from '@/components/ui/Parallax';
import { IMAGES } from '@/lib/images';

const SAMPLE_ACHIEVEMENTS = [
  { title: 'State Athletics Championship — 100m Gold', year: '2024' },
  { title: 'District Selection Trials — Runner Up', year: '2023' },
];

const FEATURES = [
  'Profile strength indicator shows how complete your profile is',
  'Achievements displayed with their supporting files',
  'Verification status shown clearly once it’s available',
];

export function ProfilePreview() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page section-y grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">Your Profile</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            A profile that reads like a scouting report.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-900/60">
            Once you submit, SportFo generates a clean profile view with your
            personal details, sports background, and achievements laid out clearly —
            easy for anyone to review in minutes.
          </p>
          <ul className="mt-6 space-y-3.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-500/12 text-success-600">
                  <IconCheck width={13} height={13} />
                </span>
                <span className="text-sm leading-relaxed text-ink-900/65">{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={120} className="order-1 lg:order-2">
          <Parallax strength={-20}>
            <div className="group/card mx-auto max-w-sm">
              <div className="card-hover-lift overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-card">
                {/* Cover image with the avatar overlapping its lower edge. */}
                <div className="relative h-32 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a few KB of SVG; nothing for next/image to optimize */}
                  <img
                    src={IMAGES.athletePortrait.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"
                  />
                  <p className="absolute left-4 top-3 rounded-full bg-ink-950/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
                    Example profile
                  </p>
                </div>

                {/* `relative` matters: the cover above is positioned, and
                    positioned elements paint over static siblings regardless
                    of DOM order — without this the name sits under the cover. */}
                <div className="relative -mt-10 px-6 pb-6">
                  <div className="flex items-end gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
                      {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
                      <img
                        src={IMAGES.athletePortrait.src}
                        alt="Example athlete profile photo"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="pb-1">
                      <p className="font-display text-lg font-bold leading-tight text-ink-900">
                        Aditi Rao
                      </p>
                      <p className="text-sm text-ink-900/50">Athletics — Sprints</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-ink-900/50">Pune, Maharashtra</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge tone="brand">Skill level: State</Badge>
                    <Badge tone="neutral">Verification: Pending</Badge>
                  </div>

                  <div className="mt-5 border-t border-ink-900/8 pt-5">
                    <div className="flex items-center justify-between text-xs font-medium text-ink-900/45">
                      <span>Profile strength</span>
                      <span className="tabular-nums">80%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
                      <div className="h-full w-4/5 rounded-full bg-brand-500 transition-all duration-700 ease-out" />
                    </div>
                  </div>

                  <div className="mt-5 border-t border-ink-900/8 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-900/40">
                      Achievements
                    </p>
                    <ul className="mt-3 space-y-3">
                      {SAMPLE_ACHIEVEMENTS.map((a) => (
                        <li key={a.title} className="flex items-start gap-2.5">
                          <span className="mt-0.5 text-accent-500">
                            <IconTrophy width={16} height={16} />
                          </span>
                          <div>
                            <p className="text-sm font-medium leading-snug text-ink-900">{a.title}</p>
                            <p className="text-xs text-ink-900/40">{a.year}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reflection of the whole card, so it sits on a surface. */}
              <div
                aria-hidden="true"
                className="mx-4 h-10 rounded-b-2xl bg-gradient-to-b from-ink-900/[0.07] to-transparent blur-[3px]"
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
