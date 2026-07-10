import { useEffect, useRef } from 'react';

/**
 * Scrolls the returned element into view when `visible` becomes true,
 * accounting for the sticky sampling header via CSS scroll-margin.
 * Does not scroll on initial mount when already visible (e.g. resumed brief).
 */
export function useScrollIntoViewOnAppear<T extends HTMLElement>(visible: boolean) {
  const ref = useRef<T | null>(null);
  const wasVisible = useRef(visible);

  useEffect(() => {
    if (!visible) {
      wasVisible.current = false;
      return;
    }
    if (wasVisible.current) return;
    wasVisible.current = true;

    const frame = window.requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [visible]);

  return ref;
}
