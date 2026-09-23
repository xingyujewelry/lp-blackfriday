"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, waitForFbq } from "../lib/meta-pixel";

function PixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Base script already fires PageView on first load — skip the first SPA effect.
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    return waitForFbq(() => trackPageView());
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <PixelPageView />
    </Suspense>
  );
}
