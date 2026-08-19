import { cn } from '@/lib/utils';

export function ProfileStrengthBar({ value, className }: { value: number; className?: string }) {
  const tone = value >= 80 ? 'bg-success-500' : value >= 45 ? 'bg-brand-500' : 'bg-accent-500';

  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between text-xs font-medium text-ink-900/50">
        <span>Profile strength</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8">
        <div
          className={cn('h-full rounded-full transition-[width,background-color] duration-700 ease-out', tone)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
