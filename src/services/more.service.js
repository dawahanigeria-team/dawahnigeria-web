import { apiService } from "./api";

export const moreViewApi = {
  moreDatas: async ({ endpoint_url, page }) =>
  {
    if (!endpoint_url) return // don't allow empty endpoint url
    return await apiService().get(`${endpoint_url}${page}`)
  }
   
};
