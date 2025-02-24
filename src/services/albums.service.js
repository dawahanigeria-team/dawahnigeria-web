import { apiService } from "./api";

export const albumsApi = {
  getAlbumsByKeyword: async (keyword, page = 1) => {
    // First encode the keyword to handle spaces and special characters
    const encodedKeyword = encodeURIComponent(keyword.trim());
    return await apiService().get(
      `/albumlisting_keywords_api.php?key=${encodedKeyword}&page=${page}`
    );
  },
};
