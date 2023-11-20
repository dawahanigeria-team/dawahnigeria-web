import { FaLaptopHouse } from "react-icons/fa";
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

  getFavoriteSongs: async (id) => {
    try {
      const response = await apiService().get(
        `/leclisting_favorites.php?user_id=${id}&type=audio`
      );

      //endpoint return array of audio IDs, check if the array is empty
      if (response.length === 0) {
        return {
          audioIDArrayIsEmpty: true,
          favoriteLectures: [],
        };
      }
      const { audio } = response;
      const audioArr = Object.values(audio);

      const lectures = await apiService().get(
        `/leclisting_multi_nid_api.php?id=${audioArr.toString()}`
      );

      return {
        audioIDArrayIsEmpty: false,
        favoriteLectures: lectures,
      };
    } catch (error) {
      //console.log(error);
    }
  },
  getFavoriteAlbums: async (id) => {
    let favoriteAlbums = [];

    try {
      const response = await apiService().get(
        `/leclisting_favorites.php?user_id=${id}&type=album`
      );

      //endpoint return array of album IDs, check if the array is empty
      if (response?.album?.length === 0) {
        return {
          albumIDArrayIsEmpty: true,
          favoriteAlbums,
        };
      }
      const { album } = response;
      const albumArr = Object.values(album);

      const albums = await apiService().get(
        `/albumlisting_multi_nid_api.php?id=${albumArr.toString()}`
      );

      favoriteAlbums = albums.filter((value) => value.title !== null);

      return {
        albumIDArrayIsEmpty: false,
        favoriteAlbums,
      };
    } catch (error) {
      //console.log(error);
    }
  },

  getFavoritePlaylists: async (id) => {
    let favoritePlaylist = [];

    try {
      const response = await apiService().get(
        `/leclisting_favorites.php?user_id=${id}&type=playlist`
      );

      //endpoint return array of playlist IDs, check if the array is empty
      if (response?.playlist.length === 0) {
        return {
          playlistIDArrayIsEmpty: true,
          favoritePlaylist,
        };
      }
      const { playlist } = response;
      const playlistArr = Object.values(playlist);

      const playlists = await apiService().get(
        `/albumlisting_multi_nid_api.php?id=${playlistArr.toString()}`
      );

      favoritePlaylist = playlists.filter((value) => value.title !== null);

      return {
        playlistIDArrayIsEmpty: false,
        favoritePlaylist,
      };
    } catch (error) {
      //console.log(error);
    }
  },
  getFavoriteLecturer: async (id) => {
    let favoriteRps = [];

    try {
      const response = await apiService().get(
        `/leclisting_favorites.php?user_id=${id}&type=rp`
      );

      //endpoint return array of rp IDs, check if the array is empty
      if (response?.length === 0) {
        return {
          rpIDArrayIsEmpty: true,
          favoriteRps,
        };
      }
      const { rp } = response;
      const rps = Object.values(rp);

      const lecturers = await apiService().get(
        `/rplisting_multi_nid_api.php?id=${rps.toString()}`
      );

      return {
        rpIDArrayIsEmpty: false,
        favoriteRps: lecturers,
      };
    } catch (error) {
      //console.log(error);
    }
  },

  getPlaylistFolders: async (id) =>
    await apiService().get(
      `/playlistApi.php?user_id=${parseInt(id)}&action=user_playlists`
    ),
  getPlaylistAudios: async ({ id, playlistId }) => {
    try {
      const response = await apiService().get(
        `/playlistApi.php?user_id=${parseInt(id)}&playlist_id=${parseInt(
          playlistId
        )}&action=playlist_data`
      );

      const { audio } = response[0];

      if (audio.length === 0) {
        return {
          isemptyPlaylist: true,
          playlistLectures: [],
        };
      }
      const audioArr = Object.values(audio);

      const lectures = await apiService().get(
        `/leclisting_multi_nid_api.php?id=${audioArr.toString()}`
      );

      if (lectures === null) {
        return {
          isemptyPlaylist: false,
          playlistLectures: [],
        };
      }

      return {
        isemptyPlaylist: false,
        playlistLectures: lectures,
      };
    } catch (error) {
      //console.log(error);
    }
  },
  addLectureToPlaylist: async (payload) =>
    await apiService().post({ url: `/playlistApi.php`, payload }),
};
