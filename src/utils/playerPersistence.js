const TRANSIENT_PLAYBACK_DEFAULTS = {
  playing: false,
  audioId: null,
  audioData: null,
  lecid: "",
  count: 0,
  pack: [],
  page: 0,
  value: 0,
  isrepeat: false,
};

/**
 * Authentication and theme belong in redux-persist; the browser audio queue
 * does not. A fresh/shared URL should reflect the URL, not an unrelated track
 * left in localStorage by an earlier visit.
 */
export const sanitizePersistedUserPlayback = (userState = {}) => ({
  ...userState,
  ...TRANSIENT_PLAYBACK_DEFAULTS,
});
