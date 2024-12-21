import axios from 'axios';
import { toast } from 'react-hot-toast';
import { isNetworkError } from '../utils/network';

// see usage in apiService function definition below
const apiResource = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const service = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 second timeout
  });

  service.interceptors.request.use((config) => {
    // Add x-project to the header if the request METHOD is not GET
    if (config.method !== "get") {
      config.headers["x-project"] = "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25";
    }
    return config;
  });

  service.interceptors.response.use(
    (response) => {
      const responseData = response?.data;
      return responseData;
    },
    (error) => {
      // Handle network errors
      if (isNetworkError(error)) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection and try again.",
          { duration: 4000 }
        );
        return Promise.reject(error);
      }

      // Handle API errors
      const errors = error?.response?.data;
      const errorMessage = errors?.error || errors?.message;

      if (errorMessage) {
        toast.error(errorMessage);
      } else if (errors?.errors) {
        // Handle validation errors
        Object.values(errors.errors).forEach((error) => {
          if (Array.isArray(error)) {
            error.forEach((err) => toast.error(err));
          } else {
            toast.error(error);
          }
        });
      } else {
        // Generic error message
        toast.error("Something went wrong. Please try again later.");
      }

      return Promise.reject(errors);
    }
  );

  const handleRequest = async (requestType, url, payload = null) => {
    try {
      const response = await service[requestType](url, payload);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: (url) => handleRequest('get', url),
    post: ({ url, payload }) => handleRequest('post', url, payload),
    patch: ({ url, payload }) => handleRequest('patch', url, payload),
    delete: ({ url, payload }) => handleRequest('delete', url, { data: payload || {} }),
    put: ({ url, payload }) => handleRequest('put', url, payload)
  };
};

export const apiService = apiResource();
