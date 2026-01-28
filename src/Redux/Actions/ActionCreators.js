import axios from "axios";
// import { toast } from "react-hot-toast"; // Moved to conditional import to prevent SSR errors

// Action Creators
import * as type from "./Types";
import { identifyUser, resetUser, trackEvent, EVENTS } from "../../utils/posthog";
import { getAuthErrorMessage } from "../../utils/authError";

// Conditional toast helper that only works on client side to prevent SSR errors
const conditionalToast = {
  success: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.success(message);
      }).catch(() => { });
    }
  },
  error: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.error(message);
      }).catch(() => { });
    }
  }
};

const resolveAuthPayload = (payload) => {
  if (!payload) return { user: null, token: null };

  const token =
    payload.token ||
    payload.access_token ||
    payload.auth_token ||
    payload?.data?.token ||
    payload?.data?.access_token ||
    payload?.data?.auth_token ||
    null;

  const candidates = [
    payload.user,
    payload?.data?.user,
    payload?.data?.data,
    payload?.data,
    payload,
  ];

  const user =
    candidates
      .map((candidate) => (Array.isArray(candidate) ? candidate[0] : candidate))
      .find(
        (candidate) =>
          candidate &&
          (candidate.id ||
            candidate.user_id ||
            candidate.username ||
            candidate.user_name ||
            candidate.email)
      ) || null;

  return { user, token };
};

const resolvePostAuthRedirect = (preferred) => {
  if (preferred) return preferred;
  if (typeof window === "undefined") return "/dawahcast";
  const stored = window.sessionStorage?.getItem("dn:last_path");
  if (!stored || stored.startsWith("/auth")) return "/dawahcast";
  return stored;
};

const clearPostAuthRedirect = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage?.removeItem("dn:last_path");
  }
};

const GetUsersSuccess = (data) => {
  return {
    type: type.FETCH_USER_SUCCESS,
    payload: data,
  };
};

const getLecid = (data) => {
  return {
    type: type.GET_LECID,
    payload: data,
  };
};

const showaddPlaylist = (data) => {
  return {
    type: type.SHOW_ADD_PLAYLIST,
    payload: data,
  };
};

const getType = (data) => {
  return {
    type: type.GET_TYPE,
    payload: data,
  };
};

const getaudioData = (data) => {
  return {
    type: type.GET_AUDIO_DATA,
    payload: data,
  };
};
const getaudioId = (data) => {
  return {
    type: type.GET_AUDIO_ID,
    payload: data,
  };
};

const setTheme = (data) => {
  return {
    type: type.SET_THEME,
    payload: data,
  };
};

const updateAudioShareCount = () => {
  return {
    type: type.UPDATE_AUDIO_SHARE_COUNT,
  };
};
const getCount = (data) => {
  return {
    type: type.GET_AUDIO_COUNT,
    payload: data,
  };
};

const getPack = (data) => {
  return {
    type: type.GET_AUDIO_PACK,
    payload: data,
  };
};
const getPage = (data) => {
  return {
    type: type.GET_AUDIO_PAGE,
    payload: data,
  };
};

const getValue = (data) => {
  return {
    type: type.GET_VALUE,
    payload: data,
  };
};

const setPlaying = (bool) => {
  return {
    type: type.SET_PLAYING,
    payload: bool,
  };
};

const getRepeat = (bool) => {
  return {
    type: type.GET_REPEAT,
    payload: bool,
  };
};

const loginSuccess = (data) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
};
const logout = () => {
  // Reset PostHog user identity on logout
  resetUser();
  trackEvent(EVENTS.USER_LOGGED_OUT);

  return {
    type: type.LOGOUT,
  };
};
/************search *********/
const getSearchRecord = (data) => {
  return {
    type: type.GET_SEARCH_RECORD,
    payload: data,
  };
};

const getSearchData = (data) => {
  return {
    type: type.GET_SEARCH_DATA,
    payload: data,
  };
};
const getSearchOptions = (data) => {
  return {
    type: type.GET_SEARCH_OPTIONS,
    payload: data,
  };
};
const LoginAction = (
  loginParams,
  isSocial,
  navigate,
  setLoading,
  redirectTo
) => {
  return async (dispatch) => {
    if (isSocial) {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/user_auth.php`,
          loginParams,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {
          const { user, token } = resolveAuthPayload(res.data);
          if (user) {
            dispatch(GetUsersSuccess(user));
          }
          if (token) {
            dispatch(loginSuccess(token));
          }

          // Track user login and identify in PostHog
          if ((user?.id ?? user?.user_id) != null) {
            identifyUser(user.id ?? user.user_id, {
              email: user.email,
              username: user.username ?? user.user_name,
              name: user.name ?? user.display_name,
              login_method: 'social',
            });
            trackEvent(EVENTS.USER_LOGGED_IN, {
              method: 'social',
              provider: loginParams.provider || 'unknown',
            });
          }

          const nextRoute = resolvePostAuthRedirect(redirectTo);
          clearPostAuthRedirect();
          navigate(nextRoute);
          setLoading(false);
          conditionalToast.success("Login successful");
        })
        .catch((error) => {
          setLoading(false);
          conditionalToast.error(
            getAuthErrorMessage(error, "Login failed. Please try again.")
          );
        });
    } else {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/user_auth.php`,
          loginParams,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {
          const { user, token } = resolveAuthPayload(res.data);
          if (user) {
            dispatch(GetUsersSuccess(user));
          }
          if (token) {
            dispatch(loginSuccess(token));
          }

          // Track user login and identify in PostHog
          if ((user?.id ?? user?.user_id) != null) {
            identifyUser(user.id ?? user.user_id, {
              email: user.email,
              username: user.username ?? user.user_name,
              name: user.name ?? user.display_name,
              login_method: 'email',
            });
            trackEvent(EVENTS.USER_LOGGED_IN, {
              method: 'email',
            });
          }

          const nextRoute = resolvePostAuthRedirect(redirectTo);
          clearPostAuthRedirect();
          navigate(nextRoute);
          conditionalToast.success("Login Successful");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          conditionalToast.error(
            getAuthErrorMessage(error, "Login failed. Please try again.")
          );
        });
    }
  };
};

const registration = (
  registrationParams,
  isSocial,
  getId,
  navigate,
  setLoading
) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/user_auth.php`,
        registrationParams,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        if (isSocial) {
          const userData = res.data;
          dispatch(GetUsersSuccess(userData));

          // Track user signup and identify in PostHog
          if ((userData?.id ?? userData?.user_id) != null) {
            identifyUser(userData.id ?? userData.user_id, {
              email: userData.email,
              username: userData.username ?? userData.user_name,
              name: userData.name ?? userData.display_name,
              signup_method: 'social',
            });
            trackEvent(EVENTS.USER_SIGNED_UP, {
              method: 'social',
              provider: registrationParams.provider || 'unknown',
            });
          }

          navigate("/");
          setLoading(false);
          conditionalToast.success("Registration Successful");
        } else {
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}/user_auth.php`,
              getId,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
                },
              }
            )
            .then((res) => {
              const { data } = res;

              dispatch(GetUsersSuccess(data));

              // Track user signup and identify in PostHog
              if ((data?.id ?? data?.user_id) != null) {
                identifyUser(data.id ?? data.user_id, {
                  email: data.email,
                  username: data.username ?? data.user_name,
                  name: data.name ?? data.display_name,
                  signup_method: 'email',
                });
                trackEvent(EVENTS.USER_SIGNED_UP, {
                  method: 'email',
                });
              }

              navigate("/");
              setLoading(false);
              conditionalToast.success("Registration Successful");
            })
            .catch(() => {
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        setLoading(false);

        conditionalToast.error(
          getAuthErrorMessage(error, "Registration failed. Please try again.")
        );
      });
  };
};

export {
  registration,
  getLecid,
  showaddPlaylist,
  getaudioData,
  LoginAction,
  loginSuccess,
  setPlaying,
  logout,
  getType,
  getaudioId,
  updateAudioShareCount,
  getCount,
  getPack,
  getPage,
  getValue,
  getRepeat,
  getSearchRecord,
  getSearchData,
  getSearchOptions,
  setTheme,
};
