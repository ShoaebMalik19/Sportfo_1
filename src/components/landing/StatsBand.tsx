import { CountUp } from '@/components/ui/CountUp';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { PRIMARY_SPORTS, SKILL_LEVELS } from '@/lib/constants/sports';

/**
 * Deliberately product facts, not traction metrics — SportFo is pre-launch, so
 * "12,000 athletes" style numbers would be fiction on a page asking people to
 * trust it with their career history. Every figure here is derived from what
 * the app actually does.
 */
const STATS = [
  {
    value: PRIMARY_SPORTS.length - 1,
    suffix: '+',
    label: 'Sports supported',
    note: 'Plus an “Other” option for anything not listed',
  },
  {
    value: SKILL_LEVELS.length,
    suffix: '',
    label: 'Skill levels',
    note: 'Beginner right through to international',
  },
  {
    value: 5,
    suffix: ' min',
    label: 'To a live profile',
    note: 'Save a draft and finish whenever you like',
  },
  {
    value: 0,
    suffix: '₹',
    label: 'Cost to start',
    note: 'Building your athlete profile is free',
  },
];

const MARQUEE_ITEMS = PRIMARY_SPORTS.filter((s) => s !== 'Other');

export function StatsBand() {
  return (
    <section className="border-t border-ink-900/8 bg-ink-950 text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delayMs={i * 90}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {stat.suffix === '₹' ? (
                  <>
                    ₹<CountUp to={stat.value} />
                  </>
                ) : (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-3 text-sm font-semibold text-white/85">{stat.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/45">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}
