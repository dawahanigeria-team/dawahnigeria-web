import { apiService } from "./api";

// api requests pertaining to ramadan
export const ramadanApi = {
  getAllRamadanYears: async () =>
    await apiService().get(`/ramadanlisting_api.php?action=getRamadanAlbums`),

  getRamadanYearAlbums: async (id) =>
    await apiService().get(
      `/ramadanlisting_api.php?id=${id}&action=getRamadanDetails`
    ),
};
