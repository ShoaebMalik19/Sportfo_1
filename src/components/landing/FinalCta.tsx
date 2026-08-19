import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCta() {
  return (
    <section className="border-t border-ink-900/8 bg-brand-600">
      <div className="container-page section-y text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your career deserves a professional record. Start building it today.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            It takes a few minutes to get started, and you can always save your progress
            and finish later.
          </p>
          <div className="mt-8">
            <Button
              href="/register/athlete"
              size="lg"
              variant="secondary"
              className="bg-white text-brand-700 hover:bg-white/90"
            >
              Create Your Profile
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
