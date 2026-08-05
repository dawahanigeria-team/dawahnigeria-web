import { apiService } from "./api";
import { DEFAULT_LANGUAGE_ID } from "../utils/languages";

export const trendingApi = {
  // langid filters server-side, across the whole catalogue rather than the
  // page already loaded. Omit it (langid = null) to get every language.
  // Defaults to English so existing callers keep their current behaviour.
  getTrendings: async ({ page, langid = DEFAULT_LANGUAGE_ID }) => {
    const params = new URLSearchParams({ page: String(page) });
    if (langid !== null && langid !== undefined && langid !== "") {
      params.set("langid", String(langid));
    }
    return await apiService().get(`/popular_lec_api.php?${params.toString()}`);
  },
};
