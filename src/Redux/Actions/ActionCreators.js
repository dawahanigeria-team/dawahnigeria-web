import axios from "axios";
// import { toast } from "react-hot-toast"; // Moved to conditional import to prevent SSR errors

// Action Creators
import * as type from "./Types";

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
const getcurrentAudioInfo = (data) => {
  return {
    type: type.GET_CURRENT_PLAY,
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
const LoginAction = (loginParams, isSocial, navigate, setLoading) => {
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
          dispatch(GetUsersSuccess(res.data));
          navigate("/");
          setLoading(false);
          conditionalToast.success("Login successful");
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
          const { data } = res;

          dispatch(GetUsersSuccess(data));
          navigate("/");
          conditionalToast.success("Login Successful");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          conditionalToast.error(error.response.data.message);
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
          dispatch(GetUsersSuccess(res.data));
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

        conditionalToast.error(error.response.data.message);
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
  getcurrentAudioInfo,
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
