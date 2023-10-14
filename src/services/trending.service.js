import { apiService } from "./api";

export const trendingApi = {
  getTrendings: async ({page}) =>
    await apiService().get(`/popular_lec_api.php?langid=6&page=${page}`),
};
