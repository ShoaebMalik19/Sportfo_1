import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RegistrationPageBody } from '@/components/registration/RegistrationPageBody';

export const metadata: Metadata = {
  title: 'Create Your Profile — SportFo',
  description: 'Register as an athlete on SportFo: personal details, sports background, and achievements.',
};

export default function AthleteRegistrationPage() {
  return (
    <>
      <Header />
      <main className="bg-ink-900/[0.015]">
        <div className="container-page py-10 sm:py-14">
          <RegistrationPageBody />
        </div>
      </main>
      <Footer />
    </>
  );
}
