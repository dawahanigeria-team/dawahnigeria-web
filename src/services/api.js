import axios from "axios";
import { toast } from "react-hot-toast";

// see usage in apiService function definition below
const apiResource = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const service = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
      if (error?.response === undefined) {
        console.log("error", error);

        toast.error("Unable to establish connection to server.");
        return Promise.reject("Unable to establish connection to server.");
      } else {
        const errors = error?.response?.data;

        const errorMessage = errors?.error || errors?.message;

        if (errorMessage) {
          console.error(errorMessage);
        }

        let serverErrors = errors?.errors;
        if (serverErrors) {
          // loop through serverErrors object and display value of each key
          Object.keys(serverErrors).forEach((key) => {
            const error = serverErrors[key];
            if (Array.isArray(error)) {
              error.forEach((err) => {
                toast.error(err);
              });
            } else {
              toast.error(error);
            }
          });
        } else {
          toast.error(
            errorMessage || "Something went wrong! Please try again."
          );
        }
        return Promise.reject(errors);
      }
    }
  );

  //Can we make use of servicePromise instead of repeating code in the return object requestType = get || post || delete || patch || put
  const servicePromise = async (requestType, url, payload = null) => {
    try {
      const data = service[requestType](url, payload);
      const resolvedData = await Promise.resolve(data);
      return resolvedData;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    get: async (url) => {
      try {
        const data = service.get(url);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        console.error(error);
      }
    },

    post: async ({ url, payload }) => {
      try {
        const data = service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        console.error(error);
      }
    },

    patch: async ({ url, payload }) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        console.error(error);
      }
    },

    delete: async ({ url, payload }) => {
      try {
        const data = service.delete(url, { data: payload || {} });
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        console.error(error);
      }
    },

    put: async ({ url, payload }) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        console.error(error);
      }
    },
  };
};

// call apiService with a different parameter if you want to use another baseURL other than REACT_APP_API_BASE_URL
export const apiService = (baseURL) => apiResource(baseURL);
