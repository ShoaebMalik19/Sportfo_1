import { ComingSoonBadge } from '@/components/ui/Badge';
import { IconBuilding, IconHandHeart, IconBriefcase, IconUsers } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';

const ECOSYSTEM = [
  {
    icon: IconBuilding,
    title: 'Academies & Coaches',
    body: 'Discover verified athletes, review full profiles, and reach out directly.',
  },
  {
    icon: IconHandHeart,
    title: 'CSR Sponsors',
    body: 'Find and support athletes who need funding, equipment, or training access.',
  },
  {
    icon: IconBriefcase,
    title: 'Employers',
    body: 'Post sports-focused roles and hire from a pool of verified athletic talent.',
  },
  {
    icon: IconUsers,
    title: 'Sports Professionals',
    body: 'Build a professional profile and connect with employers across the industry.',
  },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="border-t border-ink-900/8 bg-ink-900/[0.015]">
      <div className="container-page section-y">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Bigger Picture</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            SportFo is building a full ecosystem around athletes.
          </h2>
          <p className="mt-4 text-base text-ink-900/60">
            The athlete profile is just the foundation. Here&rsquo;s who we&rsquo;re building for next.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ECOSYSTEM.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 80} className="card-hover-lift rounded-2xl border border-ink-900/8 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900/[0.04] text-ink-900/60">
                  <item.icon width={20} height={20} />
                </div>
                <ComingSoonBadge />
              </div>
              <p className="mt-4 text-base font-semibold text-ink-900">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/55">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
