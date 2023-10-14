import { apiService } from "./api";

export const audioDetailApi = {
  getAudio: async (id) =>
    await apiService().get(`/leclistingapi.php?lecid=${id}`),
  getSimilarAudio: async ({ id, page }) =>
    await apiService().get(
      `/leclisting_rp.php?page=${page}&lim=10&offset=30&rpid=${id}`
    ),
};
