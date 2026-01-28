import { apiService } from "./api";

export const lecturersApi = {
  getLecturers: async ({
    page,
    state,
    langid,
    alpha,
    lectId,
    typeName,
    active,
  }) => {
    try {
      if (typeName === "name" && active !== "All") {
        const response = await lecturersApi.getLecturersById(lectId);
        return response;
      } else {
        const response = await lecturersApi.getLecturersByFilterOrAlphabet(
          page,
          state,
          langid,
          alpha
        );
        return response;
      }
    } catch (error) {
      ;
    }
  },
  getLecturersByFilterOrAlphabet: async (page, state, langid, alpha) =>
    await apiService().get(
      `/all_rps_api.php?offset=30&lim=10&page=${page}${`${
        state ? `&state=${state}` : ""
      }`}${`${
        langid ? `&langid=${langid}` : ""
      }`}${`${alpha && alpha !== "Hot" ? `&alpha=${alpha}` : ""}`}`
    ),
  getLecturersById: async (lectId) =>
    await apiService().get(`/rplisting_multi_nid_api.php?id=${lectId}`),

  getLanguages: async () => await apiService().get(`/all_lang_api.php`),
  getStates: async () => await apiService().get(`/all_states_api.php`),
  getCategories: async () => await apiService().get(`/allcateg_api.php`),

};
