import { apiService } from "./api";

export const lectureListDetailApi = {
  getAlbumLectures: async ({ id }) =>
    await apiService().get(`/albumapi3.php?aid=${id}&page=${1}`),
  getAlbumDetail: async ({ id }) =>
    await apiService().get(`/albumlisting_multi_nid_api.php?id=${id}`),
getSimilarAlbums: async ({page, id}) => await apiService().get(`/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${id}`),

};
