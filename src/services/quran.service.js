import { apiService } from "./api";

// api requests pertaining to qurans
export const quranApi = {
  allQurans: async (page) =>
    await apiService().get(`/leclisting_keywords_api.php?key=73&page=${page}`),
};
