import { useQueries } from "@tanstack/react-query";
import { landingPageApis } from "../../services";

export const useLandingPageHook = (id, page, setisrecent, setcurPlay) => {
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
        queryFn: () =>
          landingPageApis.getRecentlyViewed(id, page, setisrecent, setcurPlay),
      },
    ],
  });
};
