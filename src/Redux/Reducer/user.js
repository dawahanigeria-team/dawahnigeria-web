import * as type from "../Actions/Types";

const initailState = {
  currentUser: null,
  type: null,
  currentAudioInfo: null,
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
};
const User = (state = initailState, action) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case type.FETCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case type.GET_TYPE:
      //console.log("GET_TYPE", action.payload);
      return {
        ...state,
        type: action.payload,
      };
    case type.GET_CURRENT_PLAY:
      return {
        ...state,
        currentAudioInfo: action.payload,
      };
    case type.UPDATE_AUDIO_SHARE_COUNT:
      console.log({
        ...state.currentAudioInfo,
        share: (state.currentAudioInfo?.share ?? 0) + 1,
      });
      return {
        ...state,
        currentAudioInfo: {
          ...state.currentAudioInfo,
          share: (state.currentAudioInfo?.share ?? 0) + 1,
        },
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

    case type.LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: "",
        currentAudioInfo: null,
        type: null,
      };

    default:
      return state;
  }
};

export default User;
