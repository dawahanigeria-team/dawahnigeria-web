import { apiService } from "./api";

// api requests pertaining to lectures
export const lectureApi = {
  downloadFile: async (payload) =>
    await apiService().post({ url: "/download_api.php", payload }),
};
