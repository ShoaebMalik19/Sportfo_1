import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { MirrorImage } from '@/components/ui/MirrorImage';
import { Parallax } from '@/components/ui/Parallax';
import { IconArrowRight, IconShieldCheck, IconTrophy } from '@/components/ui/icons';
import { IMAGES } from '@/lib/images';

const HIGHLIGHTS = [
  {
    title: 'One verified profile',
    body: 'A single, credible record of who you are as an athlete.',
  },
  {
    title: 'Every sport, every level',
    body: 'From school teams to national squads — SportFo works for you.',
  },
  {
    title: 'Built to be found',
    body: 'Designed from day one so academies and sponsors can discover you.',
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-900/8 bg-white">
      {/* Soft brand wash behind the copy, kept well below the text contrast-wise. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand-500/[0.07] blur-3xl"
      />

      <div className="container-page section-y relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">For Athletes</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Your professional sports identity, built to get you discovered.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-900/60">
              SportFo helps athletes create a verified digital profile, showcase real
              achievements, and put their talent in front of coaches, academies, and
              sponsors — all in one place.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button href="/register/athlete" size="lg" icon={<IconArrowRight width={18} height={18} />}>
                Create Your Profile
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </div>
            <p className="mt-4 text-sm text-ink-900/40">
              Free to get started. No experience level required.
            </p>
          </Reveal>

          <Reveal delayMs={140} className="lg:pl-4">
            <Parallax strength={26}>
              <MirrorImage
                image={IMAGES.heroAthletes}
                alt="SportFo brand artwork: overlapping sport marks over a stadium-blue field"
                priority
                reflection="lg"
                frameClassName="aspect-[4/3] shadow-[0_30px_60px_-25px_rgba(10,15,30,0.45)]"
              >
                {/* Floating stat cards, layered over the image for depth. */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div className="flex justify-end">
                    <div className="animate-fade-in-up rounded-xl border border-white/15 bg-ink-950/55 px-3.5 py-2.5 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-white">
                        <IconShieldCheck width={16} height={16} className="text-brand-300" />
                        <span className="text-xs font-semibold">Verification ready</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="animate-fade-in-up max-w-[15rem] rounded-xl border border-white/15 bg-ink-950/55 p-4 backdrop-blur-md"
                    style={{ animationDelay: '160ms' }}
                  >
                    <div className="flex items-center gap-2">
                      <IconTrophy width={16} height={16} className="text-accent-400" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                        Profile strength
                      </p>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                      <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-brand-400 to-accent-400" />
                    </div>
                    <p className="mt-2 text-xs text-white/55">
                      Complete profiles get seen first.
                    </p>
                  </div>
                </div>
              </MirrorImage>
            </Parallax>
          </Reveal>
        </div>

        <Reveal
          delayMs={120}
          className="mt-14 grid gap-6 border-t border-ink-900/8 pt-10 sm:grid-cols-3"
        >
          {HIGHLIGHTS.map((item) => (
            <div key={item.title}>
              <p className="text-sm font-semibold text-ink-900">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-900/55">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
