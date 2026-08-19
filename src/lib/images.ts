/**
 * All brand imagery in one place.
 *
 * These are generated originals (see tools/generate-images.py) — the project
 * has no licensed photo library. They're SVG because the artwork is entirely
 * gradients, arcs and dot patterns: a few KB each instead of a few hundred,
 * crisp at any size, and no image optimizer needed.
 *
 * To move to real photography, drop a JPG into public/images and point the
 * `src` below at it. Every consumer takes a plain path plus an aspect ratio,
 * so nothing else changes.
 */
export interface BrandImage {
  src: string;
  /** Intrinsic ratio, used to reserve layout space and avoid content shift. */
  width: number;
  height: number;
}

export const IMAGES: Record<'heroAthletes' | 'athletePortrait', BrandImage> = {
  heroAthletes: { src: '/images/hero-athletes.svg', width: 1600, height: 1200 },
  athletePortrait: { src: '/images/athlete-portrait.svg', width: 900, height: 1100 },
};

export interface SportSlide {
  key: string;
  title: string;
  kicker: string;
  blurb: string;
  image: BrandImage;
}

function slide(key: string): BrandImage {
  return { src: `/images/sport-${key}.svg`, width: 1600, height: 1000 };
}

export const SPORT_SLIDES: SportSlide[] = [
  {
    key: 'athletics',
    title: 'Athletics',
    kicker: 'Track & Field',
    blurb: 'Sprints, distance, jumps and throws — log every timing and mark that proves your level.',
    image: slide('athletics'),
  },
  {
    key: 'football',
    title: 'Football',
    kicker: 'The beautiful game',
    blurb: 'Position, club history and match record, laid out the way scouts expect to read it.',
    image: slide('football'),
  },
  {
    key: 'cricket',
    title: 'Cricket',
    kicker: 'Bat, ball, records',
    blurb: 'Batting, bowling or keeping — attach your scorecards and selection letters as proof.',
    image: slide('cricket'),
  },
  {
    key: 'basketball',
    title: 'Basketball',
    kicker: 'Court craft',
    blurb: 'Height, position and tournament history in one profile academies can shortlist from.',
    image: slide('basketball'),
  },
  {
    key: 'badminton',
    title: 'Badminton',
    kicker: 'Speed and touch',
    blurb: 'Singles or doubles, district to national — keep your ranking history in one place.',
    image: slide('badminton'),
  },
  {
    key: 'swimming',
    title: 'Swimming',
    kicker: 'Every length counts',
    blurb: 'Strokes, personal bests and meet results, presented as a clean competitive record.',
    image: slide('swimming'),
  },
];
