import { apiService } from "./api";

export const newApi = {
  getNewLectures: async ({page}) =>
    await apiService(process.env.REACT_APP_DEV_API_BASE_URL).get(
      `/leclisting_recent.php?&action=get_recent_audio&page=${page}`
    ),
};
