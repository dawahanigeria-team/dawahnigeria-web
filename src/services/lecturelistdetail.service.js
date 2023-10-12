import { apiService } from "./api";

export const lectureListDetailApi = {
    getAlbumLectures: async ({id}) => await apiService().get(`/albumapi3.php?aid=${id}`),
    getAlbumDetail: async ({id}) => await apiService().get(`/albumlisting_multi_nid_api.php?id=${id}`),
    
}