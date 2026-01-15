import { apiService } from "./api";

// api requests for landing page
export const landingPageApis = {
  getSliderImages: async () => await apiService().get(`/slider_image.php`),
  getSpecialFeaturesLectures: async () =>
    await apiService(process.env.REACT_APP_API_ADMINISTER_BASE_URL).post({
      url: `/spcl_ftr_api.php`,
      payload: { action: "retrieve_spcl_ftr_data" },
    }),
  getRecentlyPosted: async (page = 1) =>
    await apiService().get(
      `/leclisting_recent.php?&action=get_recent_audio&page=${page}`
    ),
  // Optimized: Returns data + metadata to avoid sequential calls in component
  getRecentlyViewed: async (id, page = 1) => {
    try {
      // For non-logged in users, return default content immediately
      if (!id) {
        const data = await landingPageApis.getRecentlyViewedForNotLoginUser(page);
        return { data, isRecent: false, curPlay: [] };
      }

      // For logged-in users, fetch their recent history
      const result = await landingPageApis.getRecentlyViewedForLoginUser(id);
      
      if (!result || result.length === 0) {
        // No recent history, fall back to default content
        const data = await landingPageApis.getRecentlyViewedForNotLoginUser(page);
        return { data, isRecent: false, curPlay: [] };
      }

      // User has recent history - fetch their albums
      const { data: recentData } = result[0];
      const curPlay = Object.values(recentData);
      const recArr = Object.keys(recentData);
      const data = await landingPageApis.getRecentlyViewedAlbums(recArr.toString());
      
      return { data, isRecent: true, curPlay };
    } catch (error) {
      console.error("getRecentlyViewed error:", error);
      // On error, return default content
      const data = await landingPageApis.getRecentlyViewedForNotLoginUser(page);
      return { data, isRecent: false, curPlay: [] };
    }
  },
  getRecentlyViewedForLoginUser: async (user) =>
    await apiService().get(`/recentApi.php?user_id=${user}&action=get_recent`),
  getRecentlyViewedForNotLoginUser: async (page) =>
    await apiService().get(`/leclisting_lang.php?langid=6&page=${page}`),
  getRecentlyViewedAlbums: async (payload) =>
    await apiService().get(`/albumlisting_multi_nid_api.php?id=${payload}`),
};
