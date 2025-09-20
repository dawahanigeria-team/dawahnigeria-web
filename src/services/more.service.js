import { apiService } from "./api";

export const moreViewApi = {
  getRecentlyViewed: async ({ page = 1, langid = 6 }) => {
    const response = await apiService().get(
      `/leclisting_lang.php?langid=${langid}&page=${page}`
    );
    return response;
  },
  getTrending: async ({ page = 1, langid = 6 }) => {
    const response = await apiService().get(
      `/trending_new.php?langid=${langid}&page=${page}`
    );
    return response;
  },
  getRecentlyPosted: async ({ page = 1, langid = 6 }) => {
    const response = await apiService().get(
      `/leclisting_new.php?langid=${langid}&page=${page}`
    );
    return response;
  },
  getRecommended: async ({ page = 1, langid = 6 }) => {
    const response = await apiService().get(
      `/leclisting_rec.php?langid=${langid}&page=${page}`
    );
    return response;
  },
};
