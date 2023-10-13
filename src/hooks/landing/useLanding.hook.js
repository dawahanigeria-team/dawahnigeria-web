import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { landingPageApis } from "../../services";

export const useLandingPageHook = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["sliders-image"],
        queryFn: () => landingPageApis.getSliderImages(),
        staleTime: 300000, //refetch data after 5min
        cacheTime: 1800000, // clear from cache after 30min
      },
      {
        queryKey: ["recently-posted"],
        queryFn: () => landingPageApis.getRecentlyPosted(),
        staleTime: 300000, //refetch data after 5min
        cacheTime: 1800000, // clear from cache after 30min
      },
      {
        queryKey: ["special-features"],
        queryFn: () => landingPageApis.getSpecialFeaturesLectures(),
        staleTime: 300000, //refetch data after 5min
        cacheTime: 1800000, // clear from cache after 30min
      },
      {
        queryKey: ["recentlyviewed"],
        queryFn: () => landingPageApis.getRecentlyViewed(),
        staleTime: 300000, //refetch data after 5min
        cacheTime: 1800000, // clear from cache after 30min
      },
    ],
  });
};
