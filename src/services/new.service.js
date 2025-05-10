import { apiService } from "./api";

export const newApi = {
  getNewLectures: async ({ page }) =>
    await apiService().get(
      `/leclisting_recent.php?&action=get_recent_audio&page=${page}`
    ),
};
