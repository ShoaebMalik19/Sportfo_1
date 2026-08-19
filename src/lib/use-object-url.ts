'use client';

import * as React from 'react';

/**
 * Returns a `blob:` preview URL for a locally-picked File, or null.
 *
 * The URL is derived during render rather than assigned in an effect: doing it
 * in an effect would paint one frame with no preview before the state update
 * lands, and it trips React's set-state-in-effect rule. The effect here exists
 * purely to revoke the URL when the file changes or the component unmounts —
 * without that, every re-pick leaks the previous blob for the life of the page.
 */
export function useObjectUrl(file: File | null | undefined): string | null {
  const url = React.useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  React.useEffect(() => {
    if (!url) return;
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return url;
}
