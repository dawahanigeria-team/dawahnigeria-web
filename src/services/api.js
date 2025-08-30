import axios from "axios";
// import { toast } from "../utils/conditionalToast"; // SSR-safe toast utility // Moved to conditional import to prevent SSR errors

// Conditional toast helper that only works on client side to prevent SSR errors
const conditionalToast = {
  success: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.success(message);
      }).catch(() => {});
    }
  },
  error: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.error(message);
      }).catch(() => {});
    }
  },
  loading: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        return toast.loading(message);
      }).catch(() => {});
    }
    return null;
  },
  dismiss: (toastId) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.dismiss(toastId);
      }).catch(() => {});
    }
  }
};

// Network error messages for different scenarios
const NETWORK_ERROR_MESSAGES = {
  OFFLINE: "You appear to be offline. Please check your internet connection.",
  TIMEOUT: "Request timed out. Server might be experiencing high load.",
  SERVER_DOWN: "Unable to establish connection to server.",
  BUFFER_ERROR: "Error loading media content. Please try again.",
  THIRD_PARTY_ERROR:
    "Error with third-party service. This won't affect your main experience.",
  AUDIO_INTERRUPTED: "Audio playback was interrupted. Please try again.",
  DEFAULT: "Network error. Please check your connection and try again.",
};

// Track when the last error message was shown to prevent duplicates
let lastErrorTime = 0;
let lastErrorMessage = '';
const ERROR_COOLDOWN = 3000; // 3 seconds cooldown between same error messages

// see usage in apiService function definition below
const apiResource = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  // Determine if we're in development or production
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  
  // Base headers allowed in browsers
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
  };

  // Add server-only headers (browsers forbid setting these)
  if (typeof window === 'undefined') {
    defaultHeaders["Origin"] = "https://dawahnigeria.com";
    defaultHeaders["Referer"] = "https://dawahnigeria.com/";
    defaultHeaders["User-Agent"] = "DawahNigeria-SSR/1.0";
  }

  const service = axios.create({
    baseURL,
    headers: defaultHeaders,
    timeout: 30000, // 30 second timeout
  });

  // Helper function to show error toast with deduplication
  const showErrorToast = (message) => {
    const now = Date.now();
    // Only show the error if it's different from the last one or if enough time has passed
    if (message !== lastErrorMessage || now - lastErrorTime > ERROR_COOLDOWN) {
      conditionalToast.error(message);
      lastErrorMessage = message;
      lastErrorTime = now;
    }
  };

  // Global error handler for uncaught XHR errors (client-only)
  if (typeof window !== 'undefined') {
    window.addEventListener(
      "error",
      function (event) {
      // Check if it's a BufferLoader XHR error (common with audio/media content)
      if (event.message && event.message.includes("BufferLoader: XHR error")) {
        // Prevent default error handling
        event.preventDefault();

        // Show a more user-friendly message
        showErrorToast(NETWORK_ERROR_MESSAGES.BUFFER_ERROR);

        // Log for debugging
        console.warn("BufferLoader XHR error caught:", event.message);

        return true;
      }

      // Check if it's a third-party script error (like tawk.to)
      if (
        event.filename &&
        (event.filename.includes("tawk.to") ||
          event.filename.includes("embed.tawk.to"))
      ) {
        // Prevent default error handling
        event.preventDefault();

        // Show a less alarming message for third-party errors
        console.warn("Third-party script error:", event.message);

        // Only show toast for critical third-party errors
        if (event.message.includes("XHR error")) {
          showErrorToast(NETWORK_ERROR_MESSAGES.THIRD_PARTY_ERROR);
        }

        return true;
      }

      // Let other errors propagate normally
        return false;
      },
      true
    );
  }

  // Handle audio playback interruption errors (client-only)
  if (typeof window !== 'undefined') {
    window.addEventListener("unhandledrejection", function (event) {
      if (event.reason && typeof event.reason.message === "string") {
        // Check for audio play interruption error
        if (event.reason.message.includes("The play() request was interrupted")) {
          // Prevent default error handling
          event.preventDefault();

          // Log for debugging
          console.warn("Audio playback interrupted:", event.reason);

          // Don't show a toast for this - it's usually not a critical error
          // and happens during normal navigation between audio content

          return true;
        }
      }
      return false;
    });
  }

  service.interceptors.request.use((config) => {
    // Add x-project to the header if the request METHOD is not GET
    if (config.method !== "get") {
      config.headers["x-project"] = "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25";
    }

    return config;
  });

  // Helper to determine the type of network error
  const getNetworkErrorMessage = (error) => {
    // Check if browser is offline
    if (!navigator.onLine) {
      return NETWORK_ERROR_MESSAGES.OFFLINE;
    }

    // Check for timeout
    if (error.code === "ECONNABORTED") {
      return NETWORK_ERROR_MESSAGES.TIMEOUT;
    }

    // Check for buffer loader errors
    if (error.message && error.message.includes("BufferLoader: XHR error")) {
      return NETWORK_ERROR_MESSAGES.BUFFER_ERROR;
    }

    // Check for audio interruption errors
    if (
      error.message &&
      error.message.includes("The play() request was interrupted")
    ) {
      return NETWORK_ERROR_MESSAGES.AUDIO_INTERRUPTED;
    }

    // Other network errors
    return NETWORK_ERROR_MESSAGES.SERVER_DOWN;
  };

  // Response interceptor
  service.interceptors.response.use(
    // Success handler
    (response) => {
      const responseData = response?.data;
      return responseData;
    },
    // Error handler
    (error) => {
      // Handle network errors (no response from server)
      if (error?.response === undefined) {
        const errorMessage = getNetworkErrorMessage(error);
        showErrorToast(errorMessage);
        return Promise.reject({
          message: errorMessage,
          isNetworkError: true,
          originalError: error,
        });
      }

      // Handle server errors (got a response, but it's an error)
      const errors = error?.response?.data;
      const errorMessage = errors?.error || errors?.message;

      let serverErrors = errors?.errors;
      if (serverErrors) {
        // loop through serverErrors object and display value of each key
        Object.keys(serverErrors).forEach((key) => {
          const error = serverErrors[key];
          if (Array.isArray(error)) {
            error.forEach((err) => {
              showErrorToast(err);
            });
          } else {
            showErrorToast(error);
          }
        });
      } else {
        showErrorToast(
          errorMessage || "Something went wrong! Please try again."
        );
      }
      return Promise.reject(errors);
    }
  );

  //Can we make use of servicePromise instead of repeating code in the return object requestType = get || post || delete || patch || put
  const servicePromise = async (requestType, url, payload = null) => {
    try {
      const data = service[requestType](url, payload);
      const resolvedData = await Promise.resolve(data);
      return resolvedData;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    get: async (url) => {
      try {
        const data = service.get(url);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    post: async ({ url, payload }) => {
      try {
        const data = service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    patch: async ({ url, payload }) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    delete: async ({ url, payload }) => {
      try {
        const data = service.delete(url, { data: payload || {} });
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    put: async ({ url, payload }) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

// call apiService with a different parameter if you want to use another baseURL other than REACT_APP_API_BASE_URL
export const apiService = (baseURL) => apiResource(baseURL);
