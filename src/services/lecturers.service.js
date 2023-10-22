import { apiService } from "./api";

export const lecturersApi = {
  getLecturers: async ({ page, langid, alpha, lectId, typeName, active }) => {
    try {
      if (typeName === "name" && active !== "All") {
        const response = await lecturersApi.getLecturersById(lectId);
        return response;
      } else {
        const response = await lecturersApi.getLecturersByLangOrAlphabet(
          page,
          langid,
          alpha
        );
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getLecturersByLangOrAlphabet: async (page, langid, alpha) =>
    await apiService().get(
      `/all_rps_api.php?offset=30&lim=10&page=${page}${`${
        langid ? `&langid=${langid}` : ""
      }`}${`${alpha && alpha !== "Hot" ? `&alpha=${alpha}` : ""}`}`
    ),
  getLecturersById: async (lectId) =>
    await apiService().get(`/rplisting_multi_nid_api.php?id=${lectId}`),

  getLanguages: async () => await apiService().get(`/all_lang_api.php`),
      getCategories: async () => await apiService().get(`/allcateg_api.php`)

};
