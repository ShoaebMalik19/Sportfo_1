import * as React from 'react';

type IconProps = React.SVGAttributes<SVGSVGElement>;

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconShieldCheck(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M12 15V4m0 0L8 8m4-4l4 4" />
      <path d="M4 15v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
    </svg>
  );
}

export function IconUserCard(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6.5 16c.5-1.6 1.9-2.4 2.5-2.4s2 .8 2.5 2.4M14 10h4M14 13.5h4" />
    </svg>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M8 4h8v5a4 4 0 01-8 0V4z" />
      <path d="M8 5H5a3 3 0 003 3M16 5h3a3 3 0 01-3 3" />
      <path d="M12 13v3m-3 4h6m-3-4v4" />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8v3a4 4 0 004 4h6a4 4 0 014 4v-1" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <rect x="14" y="9" width="6" height="12" rx="1" />
      <path d="M7 7h1M10 7h1M7 11h1M10 11h1M7 15h1M10 15h1" />
    </svg>
  );
}

export function IconHandHeart(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M12 8.6c-.7-1-1.9-1.6-3-1.2-1.4.5-2 2.1-1.3 3.4.7 1.4 4.3 3.7 4.3 3.7s3.6-2.3 4.3-3.7c.7-1.3.1-2.9-1.3-3.4-1.1-.4-2.3.2-3 1.2z" />
      <path d="M3 16l3-1 3.2 1.1c.6.2 1.3.2 1.9 0L15 15l4 1.4" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 20c.3-2.4 1.9-4.2 4.5-4.6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M4 12h16m0 0l-6-6m6 6l-6 6" />
    </svg>
  );
}
