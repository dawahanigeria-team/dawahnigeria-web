import { apiService } from "./api";

export const favoriteApi = {
  getFavorites: async ({ id, type }) =>
    await apiService().get(
      `/leclisting_favorites.php?user_id=${id}&type=${type}`
    ),
  addToFavorites: async (payload) =>
    await apiService().post({ url: `/leclisting_favorites.php`, payload }),
};
