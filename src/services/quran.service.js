import { apiService } from "./api";

// api requests pertaining to qurans
export const quranApi = {
  allQurans: async (page) =>
    await apiService().get(`/popular_lec_api.php?langid=6&page=${page}`),
};
