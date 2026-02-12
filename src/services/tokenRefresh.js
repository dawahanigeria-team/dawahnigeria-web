import axios from "axios";
import * as type from "../Redux/Actions/Types";
import { getStore } from "../store/storeRegistry";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
      return;
    }
    request.resolve(token);
  });
  failedQueue = [];
};

const resolveRefreshPayload = (payload) => {
  if (!payload) {
    return { accessToken: null, refreshToken: null };
  }

  const accessToken =
    payload.access_token ||
    payload.token ||
    payload.auth_token ||
    payload?.data?.access_token ||
    payload?.data?.token ||
    payload?.data?.auth_token ||
    null;

  const refreshToken =
    payload.refresh_token ||
    payload.refreshToken ||
    payload?.data?.refresh_token ||
    payload?.data?.refreshToken ||
    null;

  return { accessToken, refreshToken };
};

const getRefreshToken = (store) => store?.getState?.()?.user?.refreshToken;

export const refreshAccessToken = async () => {
  const store = getStore();
  if (!store) {
    return Promise.reject(new Error("Store not initialized for token refresh"));
  }

  const currentRefreshToken = getRefreshToken(store);
  if (!currentRefreshToken) {
    store.dispatch({ type: type.LOGOUT });
    return Promise.reject(new Error("No refresh token available"));
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user_auth.php`,
      {
        action: "refresh_token",
        refresh_token: currentRefreshToken,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      }
    );

    const { accessToken, refreshToken } = resolveRefreshPayload(response?.data);
    if (!accessToken) {
      throw new Error("Refresh endpoint did not return an access token");
    }

    store.dispatch({
      type: type.SET_TOKENS,
      payload: {
        accessToken,
        refreshToken: refreshToken || currentRefreshToken,
      },
    });

    processQueue(null, accessToken);
    return accessToken;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      store.dispatch({ type: type.LOGOUT });
    }

    processQueue(error, null);
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};
