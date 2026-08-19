import { cn } from '@/lib/utils';
import type { BrandImage } from '@/lib/images';

type ReflectionSize = 'none' | 'sm' | 'md' | 'lg';

const reflectionHeights: Record<Exclude<ReflectionSize, 'none'>, string> = {
  sm: 'h-8 sm:h-10',
  md: 'h-12 sm:h-16',
  lg: 'h-16 sm:h-24',
};

interface MirrorImageProps {
  image: BrandImage;
  alt: string;
  /** Wrapper classes — put sizing here. */
  className?: string;
  /** Classes for the image frame itself (aspect ratio, rounding, shadow). */
  frameClassName?: string;
  reflection?: ReflectionSize;
  /** Skips lazy-loading for above-the-fold imagery. */
  priority?: boolean;
  /** Lifts the frame slightly on hover, as if catching light. */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * An image with a mirrored reflection beneath it — the flipped copy fades and
 * blurs out, so it reads as a surface reflection rather than a second image.
 *
 * The reflection works by clipping a vertically-flipped copy of the same
 * image to a short container: because the copy is flipped, the top rows of
 * that container show the bottom of the original, which is what a mirror
 * would show. It's `aria-hidden` — the image should be described once, not
 * twice.
 *
 * Plain <img> rather than next/image on purpose: these are a few KB of SVG,
 * so there is nothing for the optimizer to do, and next/image refuses SVG
 * sources unless `dangerouslyAllowSVG` is enabled.
 */
export function MirrorImage({
  image,
  alt,
  className,
  frameClassName,
  reflection = 'md',
  priority,
  interactive = true,
  children,
}: MirrorImageProps) {
  const loading = priority ? 'eager' : 'lazy';

  return (
    <div className={cn('group/mirror', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl ring-1 ring-white/10',
          interactive &&
            'transition-transform duration-500 ease-out will-change-transform group-hover/mirror:-translate-y-1',
          frameClassName
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- a few KB of SVG; nothing for next/image to optimize */}
        <img
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          loading={loading}
          fetchPriority={priority ? 'high' : undefined}
          className="h-full w-full object-cover"
        />
        {children}
      </div>

      {reflection !== 'none' && (
        <div
          aria-hidden="true"
          className={cn('relative mt-1 overflow-hidden rounded-b-2xl', reflectionHeights[reflection])}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- see above */}
          <img
            src={image.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={cn(
              'w-full -scale-y-100 object-cover opacity-50 blur-[1.5px]',
              '[mask-image:linear-gradient(to_top,transparent,black)]',
              '[-webkit-mask-image:linear-gradient(to_top,transparent,black)]'
            )}
          />
        </div>
      )}
    </div>
  );
}
