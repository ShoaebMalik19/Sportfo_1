import { Carousel } from '@/components/ui/Carousel';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SPORT_SLIDES } from '@/lib/images';
import { PRIMARY_SPORTS } from '@/lib/constants/sports';

export function SportsShowcase() {
  const slides = SPORT_SLIDES.map((sport, i) => (
    <div key={sport.key} className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
      {/* eslint-disable-next-line @next/next/no-img-element -- a few KB of SVG; nothing for next/image to optimize */}
      <img
        src={sport.image.src}
        alt={`${sport.title} — ${sport.kicker}`}
        loading={i === 0 ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim so the copy stays readable regardless of the artwork behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/45 to-transparent"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-9 lg:p-11">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
          {sport.kicker}
        </p>
        <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {sport.title}
        </h3>
        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          {sport.blurb}
        </p>
      </div>
    </div>
  ));

  return (
    <section id="sports" className="border-t border-ink-900/8 bg-white">
      <div className="container-page section-y">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Every Sport</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Built for your sport, whatever it is.
          </h2>
          <p className="mt-4 text-base text-ink-900/60">
            SportFo profiles adapt to the sport you play — the fields, the levels, and the
            proof that matters in it.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mx-auto mt-12 max-w-4xl">
          <Carousel slides={slides} labels={SPORT_SLIDES.map((s) => s.title)} ariaLabel="Sports on SportFo" />
        </Reveal>

        <Reveal delayMs={160} className="mt-12 text-center">
          <p className="text-sm text-ink-900/45">
            Plus {PRIMARY_SPORTS.length - SPORT_SLIDES.length - 1}+ more sports, including Kabaddi,
            Wrestling, Shooting and Chess — with an “Other” option so nobody is left out.
          </p>
          <div className="mt-6">
            <Button href="/register/athlete" size="lg" variant="outline">
              Pick your sport and start
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
