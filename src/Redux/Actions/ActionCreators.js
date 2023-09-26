import axios from "axios";
import { toast } from "react-hot-toast";

// Action Creators
import * as type from "./Types";

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
        .post("https://www.dawahbox.com/mongo/api/user_auth.php", loginParams, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        })
        .then((res) => {
          //console.log(res.data);
          dispatch(GetUsersSuccess(res.data));
          navigate("/");
          setLoading(false);
          toast.success("Login successful");
        });
    } else {
      setLoading(true);
      axios
        .post("https://www.dawahbox.com/mongo/api/user_auth.php", loginParams, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        })
        .then((res) => {
          //console.log(res);
          const { data } = res;
          //console.log(data);
          dispatch(GetUsersSuccess(data));
          navigate("/");
          toast.success("Login Successful");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          //console.log(error.response.data.message);
          toast.error(error.response.data.message);
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
        "https://www.dawahbox.com/mongo/api/user_auth.php",
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
          //console.log(res.data);
          dispatch(GetUsersSuccess(res.data));
          navigate("/");
          setLoading(false);
          toast.success("Registration Successful");
        } else {
          axios
            .post("https://www.dawahbox.com/mongo/api/user_auth.php", getId, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
              },
            })
            .then((res) => {
              //console.log(res);
              const { data } = res;
              //console.log(data);
              dispatch(GetUsersSuccess(data));
              navigate("/");
              setLoading(false);
              toast.success("Registration Successful");
            })
            .catch(() => {
              //console.log(err);
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        //console.log(error.response.data.message);
        toast.error(error.response.data.message);
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
};
