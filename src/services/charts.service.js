import { apiService } from "./api";

export const chartsApi = {
  getAlbums: async ({ action }) =>
    await apiService().get(`/albumlisting_charts_api.php?action=${action}`),
  getLectures: async ({ action }) =>
    await apiService().get(`/leclisting_charts_api.php?action=${action}`),
  getRps: async ({ action }) =>
    await apiService().get(`/rplisting_charts_api.php?action=${action}`),
  getPlaylists: async ({ action }) =>
    await apiService().get(`/playlist_charts_api.php?action=${action}`),
};
