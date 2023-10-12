import { apiService } from "./api";

export const lecturerDetailApi = {
  getLecturerById: async ({ id }) =>
    apiService().get(`/rplisting_multi_nid_api.php?id=${id}`),
  getLecturerSongs: async ({ page, id }) =>
    apiService().get(`/leclisting_rp.php?page=${page}&rpid=${id}`),
  getLecturerPlaylist: async ({ id }) =>
    apiService().get(
      `/playlistApi.php?action=all_public_playlist_data&rp_id=${id}`
    ),
  getLecturerAlbums: async ({ page, id }) =>
    apiService().get(
      `/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${id}`
    ),
  getSimilarRps: async ({ page, langid }) =>
    apiService().get(
      `/all_rps_api.php?offset=30&lim=10&page=${page}&langid=${langid}`
    ),
};
