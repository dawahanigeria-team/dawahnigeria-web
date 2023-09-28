import { apiService } from "./api";

export const quranApi = {
  allQurans: async (page) =>
    await apiService().get(`/leclisting_lang.php?langid=6&page=${page}`),
};
