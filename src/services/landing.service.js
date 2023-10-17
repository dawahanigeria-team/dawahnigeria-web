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
  getRecentlyViewed: async (id, page = 1, setisrecent, setcurPlay) => {
    try {
      console.log({id, page , setisrecent, setcurPlay})
      if (id) {
        const response = landingPageApis?.getRecentlyViewedForLoginUser(id); // get recently viewed if there is auth token
        const result = await response;
        let datas;
        if (result.length === 0) {
          // get the default recently viewed
          setisrecent(false); /// no recently viewed lecture
          const response =
            landingPageApis?.getRecentlyViewedForNotLoginUser(page);
          datas = await response;
        } else {
          const { data } = result[0];
          setcurPlay(Object.values(data)); //ids of recently played audio in the album
          const recArr = Object.keys(data); //ids of the albums
          setisrecent(true); // there is recently viewed lecture

          // get recently viewed albums
          const response = landingPageApis?.getRecentlyViewedAlbums(
            recArr.toString()
          );
          datas = await response;
        }
        return datas;
      } else {
        const response =
          landingPageApis?.getRecentlyViewedForNotLoginUser(page); //get recently viewed if there is auth token (default)
        return await response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getRecentlyViewedForLoginUser: async (user) =>
    await apiService().get(`/recentApi.php?user_id=${user}&action=get_recent`),
  getRecentlyViewedForNotLoginUser: async (page) =>
    await apiService().get(`/leclisting_lang.php?langid=6&page=${page}`),
  getRecentlyViewedAlbums: async (payload) =>
    await apiService().get(`/albumlisting_multi_nid_api.php?id=${payload}`),
};
