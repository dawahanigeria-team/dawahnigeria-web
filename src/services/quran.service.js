import { apiService } from "./api";

// api requests pertaining to qurans
export const quranApi = {
  getQuranAlbums: async ({ pageParam = 1 }) =>
    await apiService().get(
      `/dn_quran_api.php?action=get_quran_album&page=${pageParam}&limit=20`
    ),
};
