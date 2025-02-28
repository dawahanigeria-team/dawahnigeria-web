import { apiService } from "./api";

export const albumsApi = {
  getAlbumsByKeyword: async (keyword, page = 1, search = "") => {
    // First encode the keyword to handle spaces and special characters
    const encodedKeyword = encodeURIComponent(keyword.trim());
    const encodedSearch = encodeURIComponent(search.trim());
    return await apiService().get(
      `/albumlisting_keywords_api.php?key=${encodedKeyword}&page=${page}${
        search ? `&search=${encodedSearch}` : ""
      }`
    );
  },
};
