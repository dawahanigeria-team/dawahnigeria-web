import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const posthog = typeof window !== "undefined" ? window.posthog : null;

    if (!posthog) {
      return;
    }

    const fullPath = location.pathname + location.search + location.hash;

    if (lastTrackedPath.current === fullPath) {
      return;
    }

    try {
      posthog.capture('$pageview', {
        page_path: fullPath,
        page_search: location.search,
        page_hash: location.hash,
        page_pathname: location.pathname,
      });

      lastTrackedPath.current = fullPath;
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);
};
