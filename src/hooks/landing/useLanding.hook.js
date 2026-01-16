import { useQueries } from "@tanstack/react-query";
import { landingPageApis } from "../../services";

export const useLandingPageHook = (id, page) => {
  return useQueries({
    queries: [
      {
        queryKey: ["sliders-image"],
        queryFn: () => landingPageApis.getSliderImages(),
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
          console.error("Slider images API error:", error);
        },
      },
      {
        queryKey: ["recently-posted"],
        queryFn: () => landingPageApis.getRecentlyPosted(),
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
          console.error("Recently posted API error:", error);
        },
      },
      {
        queryKey: ["special-features"],
        queryFn: () => landingPageApis.getSpecialFeaturesLectures(),
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
          console.error("Special features API error:", error);
        },
      },
      {
        queryKey: ["recentlyviewed", id],
        queryFn: () => landingPageApis.getRecentlyViewed(id, page),
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
          console.error("Recently viewed API error:", error);
        },
      },
    ],
  });
};
