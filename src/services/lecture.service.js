import { apiService } from "./api";

// api requests pertaining to lectures
export const lectureApi = {
  downloadFile: async (payload) =>
    await apiService().post({ url: "/download_api.php", payload }),
  getAudio: async (id) =>
    await apiService().get(`/leclistingapi.php?lecid=${id}`),
  getSimilarAudio: async ({ id, page }) =>
    await apiService().get(
      `/leclisting_rp.php?page=${page}&lim=10&offset=30&rpid=${id}`
    ),
  getAlbumsChart: async ({ action }) =>
    await apiService().get(`/albumlisting_charts_api.php?action=${action}`),
  getLecturesChart: async ({ action }) =>
    await apiService().get(`/leclisting_charts_api.php?action=${action}`),
  getRpsChart: async ({ action }) =>
    await apiService().get(`/rplisting_charts_api.php?action=${action}`),
  getPlaylistsChart: async ({ action }) =>
    await apiService().get(`/playlist_charts_api.php?action=${action}`),
  getFavorites: async ({ id, type }) =>
    await apiService().get(
      `/leclisting_favorites.php?user_id=${id}&type=${type}`
    ),
  addToFavorites: async (payload) =>
    await apiService().post({ url: `/leclisting_favorites.php`, payload }),
  getCategories: async () => await apiService().get(`/allcateg_api.php`),
  getCategoryDetails: async ({ id }) =>
    await apiService().get(`/genre_api.php?cat_id=${id}`),
  getAlbumLectures: async ({ id }) =>
    await apiService().get(`/albumapi3.php?aid=${id}&page=${1}`),
  getAlbumDetail: async ({ id }) =>
    await apiService().get(`/albumlisting_multi_nid_api.php?id=${id}`),
  getSimilarAlbums: async ({ page, id }) =>
    await apiService().get(
      `/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${id}`
    ),
  moreDatas: async ({ endpoint_url, page }) => {
    if (!endpoint_url) return; // don't allow empty endpoint url
    return await apiService().get(`${endpoint_url}${page}`);
  },
  getNewLectures: async ({ page }) =>
    await apiService().get(
      `/leclisting_recent.php?&action=get_recent_audio&page=${page}`
    ),
  getPlaylistData: async ({ id }) =>
    await apiService().get(
      `/playlistApi.php?playlist_id=${id}&action=single_playlist_data`
    ),
  getPlaylistLectures: async ({ multiId }) =>
    await apiService().get(`/leclisting_multi_nid_api.php?id=${multiId}`),
  getAllPlaylists: async () =>
    await apiService().get(`/playlistApi.php?action=all_public_playlist_data`),
  getTrendings: async ({ page }) =>
    await apiService().get(`/popular_lec_api.php?langid=6&page=${page}`),
};
