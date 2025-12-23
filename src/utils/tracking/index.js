import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "posthog-js/react";

export const usePageTracking = () => {
  const location = useLocation();
  const posthog = usePostHog();
  // Track the last tracked path to avoid duplicate tracking
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    // Early return if PostHog is not available yet
    // The effect will re-run when posthog becomes available (due to dependency)
    if (!posthog) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('PostHog not available yet, skipping page tracking');
      }
      return;
    }

    // Construct the full path
    const fullPath = location.pathname + location.search + location.hash;
    
    // Avoid tracking the same page twice
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

      // Update the last tracked path
      lastTrackedPath.current = fullPath;

      if (process.env.NODE_ENV === 'development') {
        console.debug('📊 Page tracked:', fullPath);
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [
    location.pathname,
    location.search,
    location.hash,
    posthog, // Include posthog to re-run when it becomes available
  ]);
};