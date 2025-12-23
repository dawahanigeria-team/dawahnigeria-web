import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "posthog-js/react";

export const usePageTracking = () => {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    posthog.capture('$pageview', {
      page_path: location.pathname + location.search + location.hash,
      page_search: location.search,
      page_hash: location.hash,
    });
  }, [location, posthog]);
};