import axios from "axios";
import { getStore } from "../store/storeRegistry";
import { refreshAccessToken } from "../services/tokenRefresh";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    config.headers = config.headers || {};

    if (config.method !== "get") {
      config.headers["x-project"] = "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25";
    }

    const token = getStore()?.getState?.()?.user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["X-Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error?.config || {};

      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const nextAccessToken = await refreshAccessToken();
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${nextAccessToken}`;
          originalRequest.headers["X-Authorization"] = `Bearer ${nextAccessToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default FetchClient();
