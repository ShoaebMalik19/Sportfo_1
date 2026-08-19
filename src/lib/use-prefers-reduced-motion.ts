'use client';

import * as React from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Server render assumes motion is fine; the client corrects it on hydration. */
function getServerSnapshot() {
  return false;
}

/**
 * Whether the user has asked their OS to reduce motion, kept live if they
 * change the setting while the page is open.
 *
 * Uses useSyncExternalStore rather than an effect + useState: matchMedia is
 * exactly the "external store" this hook exists for, and reading it this way
 * avoids the extra render pass (and the set-state-in-effect smell) that the
 * subscribe-in-an-effect version produces.
 */
export function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
