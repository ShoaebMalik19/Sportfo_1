import { ComingSoonBadge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: '01',
    title: 'Build your profile',
    body: 'Add your personal details, sports background, and where you train — in one guided flow.',
    live: true,
  },
  {
    step: '02',
    title: 'Add your achievements',
    body: 'Upload certificates, medals, and results as proof, with a title for each achievement.',
    live: true,
  },
  {
    step: '03',
    title: 'Submit your profile',
    body: 'Review everything, then submit to generate your athlete profile view.',
    live: true,
  },
  {
    step: '04',
    title: 'Get discovered',
    body: 'Academies, coaches, CSR sponsors, and employers search verified profiles to find athletes like you.',
    live: false,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-ink-900/8 bg-white">
      <div className="container-page section-y">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How SportFo Creates Opportunities</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            From building your profile to getting noticed.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <Reveal
              key={item.step}
              delayMs={i * 80}
              className={cn(
                'card-hover-lift relative rounded-2xl border p-6',
                item.live ? 'border-ink-900/8 bg-white' : 'border-dashed border-ink-900/15 bg-ink-900/[0.015]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brand-600">{item.step}</span>
                {!item.live && <ComingSoonBadge />}
              </div>
              <p className="mt-4 text-base font-semibold text-ink-900">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/55">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-900/40">
          Steps 1–3 are live today. Discovery by academies and sponsors is on our roadmap.
        </p>
      </div>
    </section>
  );
}
