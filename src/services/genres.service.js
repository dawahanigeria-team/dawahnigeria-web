import { apiService } from "./api";

export const genresApi = {
    getCategories: async () => await apiService().get(`/allcateg_api.php`),
    getCategoryDetails: async ({ id, page = 1, sort }) =>
        await apiService().get(
            `/genre_api.php?cat_id=${id}&page=${page}${sort ? `&sort=${sort}` : ""}`
        )
}