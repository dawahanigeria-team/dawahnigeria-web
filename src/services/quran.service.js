import { apiService } from "./api";

export const QURAN_API_ENDPOINT = `/popular_lec_api.php?langid=6&page=`;

export const quranApi = {
  allQurans: async (page) =>
    await apiService().get(`/popular_lec_api.php?langid=6&page=${page}`),
};
