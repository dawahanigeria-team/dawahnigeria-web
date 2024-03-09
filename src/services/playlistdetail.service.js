import { apiService } from "./api";

export const playlistdetailApi = {
  getPlaylistData: async ({ id }) =>
    await apiService().get(
      `/playlistApi.php?playlist_id=${id}&action=single_playlist_data`
    ),
  getPlaylistLectures: async ({ multiId }) =>
    await apiService().get(`/leclisting_multi_nid_api.php?id=${multiId}`),
  getAllPlaylists: async () =>
    await apiService().get(`/playlistApi.php?action=all_public_playlist_data`),
};
