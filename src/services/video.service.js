import { apiService } from "./api";

export const videoApis = {
  getVideos: async ({ page }) =>
    await apiService().get(
      `/video_listingApi.php?page=${page}&action=allVideo`
    ),
  getCuratedVideos: async ({ action = "curatedVideo" } = {}) =>
    await apiService().get(`/video_listingApi.php?action=${action}`),
};
