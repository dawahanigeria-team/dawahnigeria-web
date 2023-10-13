import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { landingPageApis } from "../../services";

export const useLandingPageHook =  () => {
  return useQueries({
    queries: [
      {
        queryKey: ["sliders-image"],
        queryFn: () => landingPageApis.getSliderImages(),
      },
      {
        queryKey: ["recently-posted"],
        queryFn: () => landingPageApis.getRecentlyPosted(),
      },
      {
        queryKey: ["special-features"],
        queryFn: () => landingPageApis.getSpecialFeaturesLectures(),
      },
      {
        queryKey: ["recentlyviewed"],
        queryFn: () => landingPageApis.getRecentlyViewed(),
      },
    ],
  });

};
