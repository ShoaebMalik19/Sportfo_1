import { IconShieldCheck, IconTarget, IconUpload, IconUserCard } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = [
  {
    icon: IconUserCard,
    title: 'One professional profile',
    body: 'Personal details, sports background, and achievements — organized the way scouts and coaches actually evaluate talent.',
  },
  {
    icon: IconUpload,
    title: 'Proof, not just claims',
    body: 'Attach certificates, medals, and match records to every achievement, so your profile speaks for itself.',
  },
  {
    icon: IconShieldCheck,
    title: 'Built for credibility',
    body: 'A structured profile format designed around verification from day one, not bolted on later.',
  },
  {
    icon: IconTarget,
    title: 'Made to be discovered',
    body: 'Every profile is structured so academies, sponsors, and employers can find the right athlete quickly.',
  },
];

export function ValueProposition() {
  return (
    <section className="bg-white">
      <div className="container-page section-y">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why SportFo</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Talent deserves a real record — not scattered screenshots and forwarded videos.
          </h2>
          <p className="mt-4 text-base text-ink-900/60">
            Most athletes have no single place to show their full journey. SportFo gives
            you a structured, professional identity that grows with your career.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delayMs={i * 80}
              className="card-hover-lift rounded-2xl border border-ink-900/8 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <pillar.icon width={20} height={20} />
              </div>
              <p className="mt-4 text-base font-semibold text-ink-900">{pillar.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/55">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
