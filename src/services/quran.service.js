import { apiService } from "./api";

// api requests pertaining to qurans
export const quranApi = {
  getQuranAlbums: async (page, limit = 20) =>
    await apiService(process.env.REACT_APP_DEV_API_BASE_URL).get(
      `/dn_quran_api.php?action=get_quran_album&page=${page}&limit=${limit}`
    ),
};
