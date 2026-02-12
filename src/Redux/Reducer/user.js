import * as type from "../Actions/Types";

const initailState = {
  currentUser: null,
  refreshToken: null,
  type: null,
  playing: false,
  addplaylist: false,
  lecid: "",
  audioData: null,
  audioId: 164864,
  count: 0,
  pack: [],
  page: 0,
  value: 0,
  isrepeat: false,
  sharedAlbum: 0,
  theme: "dark",
};
const User = (state = initailState, action) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case type.SET_TOKENS:
      return {
        ...state,
        token: action.payload?.accessToken || "",
        refreshToken: action.payload?.refreshToken || null,
      };
    case type.FETCH_USER_SUCCESS:
      const userData = action.payload;
      // Normalize user data to always have consistent fields.
      // Use `??` (not `||`) so valid falsy values like 0 aren't treated as missing.
      const normalizedUser = userData ? {
        ...userData,
        id: userData.id ?? userData.user_id,
        username: userData.username ?? userData.user_name,
      } : null;

      return {
        ...state,
        currentUser: normalizedUser,
      };
    case type.GET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case type.UPDATE_AUDIO_SHARE_COUNT:
      return {
        ...state,
        sharedAlbum: state.sharedAlbum + 1,
      };
    case type.SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      };
    case type.SHOW_ADD_PLAYLIST:
      return {
        ...state,
        addplaylist: action.payload,
      };
    case type.GET_LECID:
      return {
        ...state,
        lecid: action.payload,
      };

    case type.GET_AUDIO_DATA:
      return {
        ...state,
        audioData: action.payload,
      };

    case type.GET_AUDIO_ID:
      return {
        ...state,
        audioId: action.payload,
      };
    case type.GET_AUDIO_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case type.GET_AUDIO_PACK:
      return {
        ...state,
        pack: action.payload,
      };
    case type.GET_AUDIO_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case type.GET_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    case type.GET_REPEAT:
      return {
        ...state,
        isrepeat: action.payload,
      };

    case type.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case type.LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: "",
        refreshToken: null,
        type: null,
      };

    default:
      return state;
  }
};

export default User;
