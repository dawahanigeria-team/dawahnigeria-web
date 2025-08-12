/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Hm: () => (/* binding */ AudioContext),
  ci: () => (/* binding */ SearchContext),
  ZP: () => (/* binding */ src_App)
});

// UNUSED EXPORTS: ThemeProvider

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "@sentry/react"
const react_namespaceObject = require("@sentry/react");
;// CONCATENATED MODULE: external "@tawk.to/tawk-messenger-react"
const tawk_messenger_react_namespaceObject = require("@tawk.to/tawk-messenger-react");
var tawk_messenger_react_default = /*#__PURE__*/__webpack_require__.n(tawk_messenger_react_namespaceObject);
;// CONCATENATED MODULE: ./src/components/ClientOnly.jsx

function ClientOnly({
  children,
  fallback = null
}) {
  const [hasMounted, setHasMounted] = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return fallback;
  }
  return children;
}
/* harmony default export */ const components_ClientOnly = (ClientOnly);
;// CONCATENATED MODULE: external "@tanstack/react-query"
const react_query_namespaceObject = require("@tanstack/react-query");
;// CONCATENATED MODULE: external "react-hot-toast"
const external_react_hot_toast_namespaceObject = require("react-hot-toast");
var external_react_hot_toast_default = /*#__PURE__*/__webpack_require__.n(external_react_hot_toast_namespaceObject);
;// CONCATENATED MODULE: external "react-icons/hi2"
const hi2_namespaceObject = require("react-icons/hi2");
;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
;// CONCATENATED MODULE: ./src/components/UI/ErrorBoundary.jsx



class ErrorBoundary extends external_react_.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      errorInfo
    });

    // You could also log to an error reporting service here
  }
  handleRetry = () => {
    // Reset the error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Reload the page if it's a critical error
    if (this.state.error && (this.state.error.message?.includes("XHR error") || this.state.error.message?.includes("network"))) {
      window.location.reload();
    }
  };
  render() {
    if (this.state.hasError) {
      // Check if it's a media/buffer error
      const isMediaError = this.state.error?.message?.includes("BufferLoader") || this.state.error?.message?.includes("media");

      // Check if it's a third-party error
      const isThirdPartyError = this.state.error?.message?.includes("tawk.to") || (this.state.errorInfo?.componentStack || "").includes("tawk.to");

      // Customize message based on error type
      let errorTitle = "Something went wrong";
      let errorMessage = "We're sorry, but there was an error. Please try again.";
      if (isMediaError) {
        errorTitle = "Media Loading Error";
        errorMessage = "We couldn't load the media content. This might be due to a slow connection or temporary server issue.";
      } else if (isThirdPartyError) {
        errorTitle = "Third-party Service Error";
        errorMessage = "A third-party service encountered an error. This won't affect your main experience.";
      }
      return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex flex-col items-center justify-center p-4 text-center",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiExclamationTriangle, {
            className: "text-red-500 text-4xl mx-auto mb-4"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
            className: "text-lg font-medium text-red-600 dark:text-red-400 mb-2",
            children: errorTitle
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "text-gray-600 dark:text-gray-300 mb-4",
            children: errorMessage
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
            onClick: this.handleRetry,
            className: "flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiArrowPath, {
              className: "text-lg"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: "Retry"
            })]
          }),  false && /*#__PURE__*/0]
        })
      });
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}
/* harmony default export */ const UI_ErrorBoundary = (ErrorBoundary);
;// CONCATENATED MODULE: external "react-router-dom"
const external_react_router_dom_namespaceObject = require("react-router-dom");
;// CONCATENATED MODULE: external "react-icons/fi"
const fi_namespaceObject = require("react-icons/fi");
;// CONCATENATED MODULE: ./src/utils/routes/constants.js
const FORGOTPASSWORD = "/auth/forgot-password";
const ALBUMS = "/dawahcast/a/";
const LECTURE = "/dawahcast/l/";
const RESOURCE_PERSON = "/dawahcast/rp/";
const VIDEOS = "/dawahcast/videos/";
const PLAYLISTS = "/dawahcast/pl/";
const MYPLAYLIIST = "/dawahcast/myplaylist";
const FAVOURITE = "/dawahcast/favourite";
const HOME = "/dawahcast/home";
const MORE = "/dawahcast/more";
const RECENTLY_POSTED_MORE = "/dawahcast/more/recent";
const RECENTLY_VIEWED_MORE = "/dawahcast/more/recently-viewed";
const TRENDING_MORE = "/dawahcast/more/trending";
const RECOMMENDED_MORE = "/dawahcast/more/recommended";
const SEARCH = "/dawahcast/search";
const LIBRARY = "/dawahcast/library";
const GENRES = "/dawahcast/genres";
const CHARTS = "/dawahcast/charts";
const TRENDING = "/dawahcast/trending";
const QURAN = "/dawahcast/recitations";
const NEW = "/dawahcast/new";
const PLAY = "/dawahcast/playlists";
const VIDEO = "/dawahcast/videos";
const LECTURERS = "/dawahcast/lecturers";
const RECO1 = "/dawahcast/recommend1";
const RECO2 = "/dawahcast/recommend2";
const DOWNLOAD = "/dawahcast/download";
const RAMADAN = "/dawahcast/ramadan";
;// CONCATENATED MODULE: ./src/components/search/SearchDropdown.jsx



const SearchDropdown = ({
  results,
  loading,
  onSelect
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  if (!results?.length && !loading) return null;
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "search_dropdown absolute w-full bg-white dark:bg-zinc-800 mt-2 rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50",
    children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "p-4 text-center text-gray-500",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "animate-spin w-6 h-6 rounded-full border-r-2 border-b-2 border-zinc-400 mx-auto"
      })
    }) : results.map(item => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer border-b border-gray-200 dark:border-zinc-700 flex items-center gap-3",
      onClick: e => {
        e.preventDefault();
        console.log("Clicked item:", item);
        onSelect(item);
      },
      children: [item.img && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: item.img,
        alt: item.name,
        className: "w-10 h-10 rounded-full object-cover"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex-1",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "font-medium text-color",
          children: item.name || item.mp3_title
        }), item.cat_name && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "text-sm text-gray-500 dark:text-gray-400",
          children: item.cat_name
        })]
      })]
    }, item.id))
  });
};
/* harmony default export */ const search_SearchDropdown = (SearchDropdown);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "lodash/debounce"
const debounce_namespaceObject = require("lodash/debounce");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_namespaceObject);
;// CONCATENATED MODULE: ./src/components/search/Search.jsx










const Search = () => {
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    setText,
    setSearchType,
    searchType
  } = (0,external_react_.useContext)(SearchContext);
  const [inputValue, setInputValue] = (0,external_react_.useState)("");
  const [dropdownResults, setDropdownResults] = (0,external_react_.useState)([]);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [showDropdown, setShowDropdown] = (0,external_react_.useState)(false);
  const searchRef = (0,external_react_.useRef)(null);

  // Check if we're on the main paths
  const isMainPath = pathname === "/" || pathname === "/dawahcast";

  // Close dropdown when clicking outside
  (0,external_react_.useEffect)(() => {
    if (!isMainPath) {
      const handleClickOutside = event => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMainPath]);
  const debouncedSearch = (0,external_react_.useCallback)(debounce_default()(async (searchText, currentSearchType) => {
    if (!searchText.trim() || isMainPath) {
      setDropdownResults([]);
      setLoading(false);
      return;
    }
    try {
      const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/searchApi.php`;
      const encodedValue = encodeURIComponent(searchText);
      const response = await external_axios_default().get(`${baseUrl}?type=${currentSearchType}&value=${encodedValue}`);
      if (response.data.success || response.data.status === "success") {
        const results = response.data.data || response.data.results || [];
        setDropdownResults(results.slice(0, 5)); // Limit to 5 results
      } else {
        setDropdownResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setDropdownResults([]);
    }
    setLoading(false);
  }, 500), [isMainPath]);
  (0,external_react_.useEffect)(() => {
    // Set search type based on current route
    const determineSearchType = () => {
      switch (pathname) {
        case LECTURERS:
          return "lecturers";
        case VIDEOS:
          return "videos";
        case PLAYLISTS:
          return "playlists";
        case QURAN:
          return "recitations";
        case "/dawahcast":
        case "/":
          return "lectures";
        default:
          return "lectures";
      }
    };
    setSearchType(determineSearchType());
  }, [pathname, setSearchType]);
  (0,external_react_.useEffect)(() => {
    if (pathname !== SEARCH) {
      setInputValue("");
      setDropdownResults([]);
    }
  }, [pathname]);
  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    if (!isMainPath) {
      setLoading(true);
      setShowDropdown(true);
      debouncedSearch(value, searchType);
    }
  };
  const handleItemSelect = item => {
    console.log("Selected item:", item);
    console.log("Current pathname:", pathname);
    console.log("Current searchType:", searchType);

    // Get the ID from either id field or _id.$oid
    const lectureId = item.id || item._id && item._id.$oid;

    // For lectures or when on root page, just navigate directly

    // For other cases, update input and navigate
    setInputValue(item.name || item.mp3_title || item.title);
    setShowDropdown(false);
    setText(item.name || item.mp3_title || item.title);

    // Handle specific types
    if (searchType === "lecturers" && item.name) {
      navigate(`/dawahcast/rp/${lectureId}`);
    } else if (searchType === "videos" && lectureId) {
      navigate(`/dawahcast/videos/${lectureId}`);
    } else if (searchType === "playlists" && lectureId) {
      navigate(`/dawahcast/playlists/${lectureId}`);
    } else if (searchType === "recitations" && lectureId) {
      navigate(`/dawahcast/quran/${lectureId}`);
    }
  };
  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // For root and dawahcast paths
    if (isMainPath) {
      setText(inputValue);
      navigate(`/dawahcast/search?query=${encodeURIComponent(inputValue)}`);
      return;
    }

    // Existing behavior for other paths
    setShowDropdown(false);
    if (dropdownResults.length > 0) {
      const firstResult = dropdownResults[0];
      const lectureId = firstResult.id || firstResult._id && firstResult._id.$oid;
      if (lectureId) {
        setText(inputValue);
        navigate(`/dawahcast/l/${lectureId}`);
      }
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    ref: searchRef,
    className: "search_wrapper bg-input relative",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiSearch, {
      className: "search_icon"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
      onChange: handleInputChange,
      onKeyDown: e => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      },
      onFocus: () => !isMainPath && setShowDropdown(true),
      value: inputValue,
      type: "search",
      className: "search_input text-color",
      placeholder: "Search"
    }), showDropdown && !isMainPath && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(search_SearchDropdown, {
      results: dropdownResults,
      loading: loading,
      onSelect: handleItemSelect
    })]
  });
};
/* harmony default export */ const search_Search = (Search);
;// CONCATENATED MODULE: ./src/assets/svg/apple.svg
const apple_namespaceObject = __webpack_require__.p + "ecdc2a6da42fe5586c06.svg";
;// CONCATENATED MODULE: ./src/assets/svg/googleplay.svg
const googleplay_namespaceObject = __webpack_require__.p + "8e69c6805c9eb8201d62.svg";
;// CONCATENATED MODULE: ./src/assets/png/dn logo.png
const dn_logo_namespaceObject = __webpack_require__.p + "8ae953e74b71ab04b697.png";
;// CONCATENATED MODULE: ./src/assets/svg/avatar.svg
const avatar_namespaceObject = __webpack_require__.p + "ee5afff679d9a17b9ca1.svg";
;// CONCATENATED MODULE: external "react-icons/fa"
const fa_namespaceObject = require("react-icons/fa");
;// CONCATENATED MODULE: external "react-icons/ai"
const ai_namespaceObject = require("react-icons/ai");
;// CONCATENATED MODULE: external "react-icons/im"
const im_namespaceObject = require("react-icons/im");
;// CONCATENATED MODULE: external "react-icons/cg"
const cg_namespaceObject = require("react-icons/cg");
;// CONCATENATED MODULE: external "react-icons/md"
const md_namespaceObject = require("react-icons/md");
;// CONCATENATED MODULE: external "react-icons/ti"
const ti_namespaceObject = require("react-icons/ti");
;// CONCATENATED MODULE: external "react-icons/bs"
const bs_namespaceObject = require("react-icons/bs");
;// CONCATENATED MODULE: ./src/components/sideNav/data.js











const lectures = [{
  name: "Home",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaHome, {
    className: "icon0 icon"
  }),
  link: "/dawahcast"
}, {
  name: "Trending",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineLineChart, {
    className: "icon1 icon"
  }),
  link: TRENDING
}, {
  name: "New",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(im_namespaceObject.ImMusic, {
    className: "icon2 icon"
  }),
  link: NEW
}, {
  name: "Ramadan",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsMoonStarsFill, {
    className: "icon3 icon"
  }),
  link: RAMADAN
}, {
  name: "Lecturers",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdPerson, {
    className: "icon3 icon"
  }),
  link: LECTURERS
}, {
  name: "Quran",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaQuran, {
    className: "icon",
    "aria-hidden": "true"
  }),
  link: QURAN
}, {
  name: "Videos",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsYoutube, {
    className: "icon4 icon"
  }),
  link: VIDEO
}, {
  name: "Playlists",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsMusicNoteList, {
    className: "icon5 icon"
  }),
  link: PLAY
}, {
  name: "Charts",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ti_namespaceObject.TiChartBar, {
    className: "icon6 icon"
  }),
  link: CHARTS
}, {
  name: "Genres",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFileEarmarkMusicFill, {
    className: "icon7 icon"
  }),
  link: GENRES
}];
const library = [{
  name: "Add Playlist",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillDiscFill, {
    className: "icon0 icon"
  })
  //link:,
}, {
  name: "Favourites",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdFavorite, {
    className: "icon1 icon"
  }),
  link: FAVOURITE
}, {
  name: "My Playlist",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(cg_namespaceObject.CgUserList, {
    className: "icon2 icon"
  }),
  link: MYPLAYLIIST
}];
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
// EXTERNAL MODULE: ./src/Redux/Actions/Types.js
var Types = __webpack_require__(350);
;// CONCATENATED MODULE: ./src/Redux/Actions/ActionCreators.js



// Action Creators

const GetUsersSuccess = data => {
  return {
    type: Types/* FETCH_USER_SUCCESS */.gw,
    payload: data
  };
};
const getLecid = data => {
  return {
    type: Types/* GET_LECID */.sZ,
    payload: data
  };
};
const showaddPlaylist = data => {
  return {
    type: Types/* SHOW_ADD_PLAYLIST */.pB,
    payload: data
  };
};
const getType = data => {
  return {
    type: type.GET_TYPE,
    payload: data
  };
};
const getcurrentAudioInfo = data => {
  return {
    type: Types/* GET_CURRENT_PLAY */.uo,
    payload: data
  };
};
const getaudioData = data => {
  return {
    type: Types/* GET_AUDIO_DATA */.Nd,
    payload: data
  };
};
const getaudioId = data => {
  return {
    type: Types/* GET_AUDIO_ID */.Nl,
    payload: data
  };
};
const setTheme = data => {
  return {
    type: Types/* SET_THEME */.Wt,
    payload: data
  };
};
const updateAudioShareCount = () => {
  return {
    type: Types/* UPDATE_AUDIO_SHARE_COUNT */.wQ
  };
};
const getCount = data => {
  return {
    type: Types/* GET_AUDIO_COUNT */.x8,
    payload: data
  };
};
const getPack = data => {
  return {
    type: Types/* GET_AUDIO_PACK */.jU,
    payload: data
  };
};
const getPage = data => {
  return {
    type: Types/* GET_AUDIO_PAGE */.uO,
    payload: data
  };
};
const getValue = data => {
  return {
    type: Types/* GET_VALUE */.pP,
    payload: data
  };
};
const setPlaying = bool => {
  return {
    type: Types/* SET_PLAYING */.N4,
    payload: bool
  };
};
const getRepeat = bool => {
  return {
    type: Types/* GET_REPEAT */.uF,
    payload: bool
  };
};
const loginSuccess = data => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data
  };
};
const logout = () => {
  return {
    type: type.LOGOUT
  };
};
/************search *********/
const getSearchRecord = data => {
  return {
    type: Types/* GET_SEARCH_RECORD */.R,
    payload: data
  };
};
const getSearchData = data => {
  return {
    type: Types/* GET_SEARCH_DATA */.eq,
    payload: data
  };
};
const getSearchOptions = data => {
  return {
    type: type.GET_SEARCH_OPTIONS,
    payload: data
  };
};
const LoginAction = (loginParams, isSocial, navigate, setLoading) => {
  return async dispatch => {
    if (isSocial) {
      setLoading(true);
      external_axios_default().post(`${process.env.REACT_APP_API_BASE_URL}/user_auth.php`, loginParams, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        dispatch(GetUsersSuccess(res.data));
        navigate("/");
        setLoading(false);
        external_react_hot_toast_namespaceObject.toast.success("Login successful");
      });
    } else {
      setLoading(true);
      external_axios_default().post(`${process.env.REACT_APP_API_BASE_URL}/user_auth.php`, loginParams, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        const {
          data
        } = res;
        dispatch(GetUsersSuccess(data));
        navigate("/");
        external_react_hot_toast_namespaceObject.toast.success("Login Successful");
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        external_react_hot_toast_namespaceObject.toast.error(error.response.data.message);
      });
    }
  };
};
const registration = (registrationParams, isSocial, getId, navigate, setLoading) => {
  return async dispatch => {
    setLoading(true);
    await external_axios_default().post(`${process.env.REACT_APP_API_BASE_URL}/user_auth.php`, registrationParams, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      if (isSocial) {
        dispatch(GetUsersSuccess(res.data));
        navigate("/");
        setLoading(false);
        external_react_hot_toast_namespaceObject.toast.success("Registration Successful");
      } else {
        external_axios_default().post(`${process.env.REACT_APP_API_BASE_URL}/user_auth.php`, getId, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
          }
        }).then(res => {
          const {
            data
          } = res;
          dispatch(GetUsersSuccess(data));
          navigate("/");
          setLoading(false);
          external_react_hot_toast_namespaceObject.toast.success("Registration Successful");
        }).catch(() => {
          setLoading(false);
        });
      }
    }).catch(error => {
      setLoading(false);
      external_react_hot_toast_namespaceObject.toast.error(error.response.data.message);
    });
  };
};

;// CONCATENATED MODULE: ./src/components/iconText/IconText.jsx






const IconText = ({
  icon,
  link,
  name,
  id,
  setisOpen
}) => {
  const location = (0,external_react_router_dom_namespaceObject.useLocation)();
  const [active, setActive] = (0,external_react_.useState)(null);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();

  // const { addplaylist } = useSelector((state) => state.user);

  function close() {
    setisOpen(false);
  }
  (0,external_react_.useEffect)(() => {
    // Check if the link is an exact match with the current pathname
    const isActive = location.pathname === link;
    setActive(isActive ? id : null);

    // if (addplaylist && id === 9) {
    //   setActive(9);
    // }
  }, [location.pathname, link, id]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
    to: link,
    onClick: () => {
      navigate(link);
      close();
      if (name === "Add Playlist") {
        dispatch(showaddPlaylist(true));
      }
    },
    className: `icontext_link ${active === id ? "icontext_active" : ""}`,
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: `icontext_icon text-color dark:hover:text-[#ddff00]  hover:text-color-foreground ${active === id ? "icontext_active_icon font-semibold dark:text-[#ddff00] text-color-foreground" : ""}`,
      children: icon
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: `icontext_name text-color dark:hover:text-[#ddff00] hover:font-semibold hover:text-color-foreground ${active === id ? "icontext_active_text font-semibold dark:text-[#ddff00] text-color-foreground" : ""}`,
      children: name
    })]
  });
};
/* harmony default export */ const iconText_IconText = (IconText);
;// CONCATENATED MODULE: external "react-icons/ri"
const ri_namespaceObject = require("react-icons/ri");
;// CONCATENATED MODULE: ./src/pages/searchPage/searchOptionWidget/langOptions.jsx






const LangOptions = () => {
  const {
    setLanguageId
  } = (0,external_react_.useContext)(SearchContext);
  const {
    searchOptions
  } = (0,external_react_redux_.useSelector)(state => state.search);
  const [showmore, setshowmore] = (0,external_react_.useState)(false);

  //const dispatch = useDispatch();
  const handleSelected = e => {
    if (e.target.checked) {
      setLanguageId(prev => [...prev, e.target.value]);
    } else {
      setLanguageId(prev => prev.filter(item => item !== e.target.value));
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "flex flex-col text-color text-sm font-normal mb-6 w-full space-y-3 h-fit justify-start",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex space-x-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Languages"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setshowmore(!showmore);
        },
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: `text-color dark:text-[#ddff2b] text-[22px] min-[615px]:text-[25px] ${showmore ? "rotate-[-90deg]" : "rotate-[90deg]"}`
        })
      })]
    }), showmore && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "space-y-5",
      children: searchOptions?.lang?.map(({
        name,
        count,
        id
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
          className: "filter-container flex",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "text-color ",
              children: name
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "bg-[#ddff2b] text-black rounded-full px-2 py-[1px] text-[10px] min-[615px]:text-[13px]",
              children: count
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => handleSelected(e),
            type: "checkbox",
            value: id
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "filter-checkmark"
          })]
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const langOptions = (LangOptions);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchOptionWidget/lecturerOptions.jsx






const LecturerOptions = () => {
  const {
    setLecturerId
  } = (0,external_react_.useContext)(SearchContext);
  const {
    searchOptions
  } = (0,external_react_redux_.useSelector)(state => state.search);
  const [showmore, setshowmore] = (0,external_react_.useState)(false);
  const handleSelected = e => {
    if (e.target.checked) {
      setLecturerId(prev => [...prev, e.target.value]);
    } else {
      setLecturerId(prev => prev.filter(item => item !== e.target.value));
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "flex flex-col text-color text-sm font-normal mb-6 w-full space-y-3 h-fit justify-start",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex space-x-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Lecturers"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setshowmore(!showmore);
        },
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: `text-color dark:text-[#ddff2b] text-[22px] min-[615px]:text-[25px] ${showmore ? "rotate-[-90deg]" : "rotate-[90deg]"}`
        })
      })]
    }), showmore && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "space-y-5",
      children: searchOptions?.rp?.map(({
        name,
        count,
        id
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
          className: "filter-container flex",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "text-color ",
              children: name
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "bg-[#ddff2b] text-black rounded-full px-2 py-[1px] text-[10px] min-[615px]:text-[13px]",
              children: count
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => handleSelected(e),
            type: "checkbox",
            value: id
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "filter-checkmark"
          })]
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const lecturerOptions = (LecturerOptions);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchOptionWidget/albumOptions.jsx






const AlbumOptions = () => {
  const {
    setAlbumId
  } = (0,external_react_.useContext)(SearchContext);
  const {
    searchOptions
  } = (0,external_react_redux_.useSelector)(state => state.search);
  const [showmore, setshowmore] = (0,external_react_.useState)(false);
  const handleSelected = e => {
    if (e.target.checked) {
      setAlbumId(prev => [...prev, e.target.value]);
    } else {
      setAlbumId(prev => prev.filter(item => item !== e.target.value));
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "flex flex-col text-color text-sm  font-normal mb-6 w-full space-y-3 h-fit justify-start",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex space-x-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Albums"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setshowmore(!showmore);
        },
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: `text-color dark:text-[#ddff2b] text-[22px] min-[615px]:text-[25px] ${showmore ? "rotate-[-90deg]" : "rotate-[90deg]"}`
        })
      })]
    }), showmore && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "space-y-5",
      children: searchOptions?.alb?.map(({
        name,
        count,
        id
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
          className: "filter-container flex",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "text-color dark:text-[#ddff2b] ",
              children: name
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "bg-[#ddff2b] text-black rounded-full px-2 py-[1px] text-[10px] min-[615px]:text-[13px]",
              children: count
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => handleSelected(e),
            type: "checkbox",
            value: id
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "filter-checkmark"
          })]
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const albumOptions = (AlbumOptions);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchOptionWidget/catOptions.jsx






const CatOptions = () => {
  const {
    searchOptions
  } = (0,external_react_redux_.useSelector)(state => state.search);
  const [showmore, setshowmore] = (0,external_react_.useState)(false);
  const {
    setCategoryId
  } = (0,external_react_.useContext)(SearchContext);
  const handleSelected = e => {
    if (e.target.checked) {
      setCategoryId(prev => [...prev, e.target.value]);
    } else {
      setCategoryId(prev => prev.filter(item => item !== e.target.value));
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "flex flex-col text-color text-sm font-normal mb-6 w-full space-y-3 h-fit justify-start",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex space-x-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Categories"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setshowmore(!showmore);
        },
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: `text-color dark:text-[#ddff2b] text-[22px] min-[615px]:text-[25px] ${showmore ? "rotate-[-90deg]" : "rotate-[90deg]"}`
        })
      })]
    }), showmore && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "space-y-5",
      children: searchOptions?.cat?.map(({
        name,
        count,
        id
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
          className: "filter-container flex",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "text-color ",
              children: name
            }, idx), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "bg-[#ddff2b] text-black rounded-full px-2 py-[1px] text-[10px] min-[615px]:text-[13px]",
              children: count
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => handleSelected(e),
            type: "checkbox",
            value: id
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "filter-checkmark"
          })]
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const catOptions = (CatOptions);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchOptions.jsx






const SearchOptions = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "w-full pb-20",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(langOptions, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturerOptions, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(catOptions, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumOptions, {})]
  });
};
/* harmony default export */ const searchOptions = (SearchOptions);
;// CONCATENATED MODULE: ./src/components/UI/themedropdown/themeDropDown.jsx






function ThemeDropDown() {
  const [isOpen, setOpen] = (0,external_react_.useState)(false);
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  function closeDropDown() {
    setOpen(!isOpen);
  }
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: " relative text-[13px] sm:text-[15px]",
    children: [theme && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
      onClick: closeDropDown,
      className: "rounded-md p-1 group border-color hover:border-muted border ",
      children: [theme === "light" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsSun, {
        className: "text-xl text-color  transform transition-all duration-300 "
      }), theme === "dark" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaMoon, {
        className: "text-xl dark:text-[#ddff2b]  transform transition-all duration-300 "
      })]
    }), isOpen && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      onClick: e => {
        e.stopPropagation();
      },
      className: "absolute right-0 top-9",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: closeDropDown,
        className: "w-full h-full fixed inset-0 z-[70] "
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "relative z-[90] w-[110px] shadow-lg border border-border h-fit rounded-md bg-background py-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "flex flex-col w-[110px] space-y-1",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ToggleButtons, {
            text: "System",
            close: closeDropDown
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ToggleButtons, {
            text: "Dark",
            close: closeDropDown
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ToggleButtons, {
            text: "Light",
            close: closeDropDown
          })]
        })
      })]
    })]
  });
}
function ToggleButtons({
  text,
  close
}) {
  const dispatch = (0,external_react_redux_.useDispatch)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    onClick: () => {
      close();
      dispatch(setTheme(text.toLowerCase()));
    },
    className: "cursor-pointer hover:bg-hover text-color py-2 pl-2 pr-4",
    children: text
  });
}
;// CONCATENATED MODULE: ./src/components/sideNav/SideNav.jsx














const SideNav = ({
  res,
  handleSideBar,
  setisOpen
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  function handleLogout() {
    dispatch({
      type: "LOGOUT"
    });
    navigate("/");
  }
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "sidenav_wrapper bg-background border-r dark:border-r-0 shadow-md",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "sidenav_logo",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
        to: "/",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: dn_logo_namespaceObject,
          alt: "logo"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ThemeDropDown, {})]
    }), currentUser?.id && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "logout",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: handleLogout,
        className: "logout_btn border border-border text-color hover:text-color-foreground ",
        children: "Logout"
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "sidenav_auth",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "sidenav_avatar",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: avatar_namespaceObject,
          alt: "avatar"
        })
      }), !currentUser?.id && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sidenav_auth_text ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          onClick: () => {
            navigate("/auth/login");
          },
          className: "sidenav_auth_text1 text-color dark:hover:text-[#ddff00] hover:text-color-foreground",
          children: "Log in/"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          onClick: () => {
            navigate("/auth/signup");
          },
          className: "sidenav_auth_text2 text-color dark:hover:text-[#ddff00] hover:text-color-foreground",
          children: "Sign Up"
        })]
      }), currentUser?.id && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "user_name text-color dark:hover:text-[#ddff00] hover:text-color-foreground",
        children: currentUser?.username?.split(" ")[0] || currentUser?.username
      })]
    }), pathname !== SEARCH && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sidenav_lectures",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
          className: "sidenav_lectures_header text-muted",
          children: "Lectures"
        }), lectures.map(({
          icon,
          link,
          name
        }, index) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(iconText_IconText, {
            icon: icon,
            id: index,
            link: link,
            name: name,
            group: "lectures",
            setisOpen: setisOpen
          }, index);
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sidenav_library",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
          className: "sidenav_library_header text-muted",
          children: "Library"
        }), library.map(({
          icon,
          link,
          name
        }, index) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(iconText_IconText, {
            icon: icon,
            id: index,
            link: link,
            name: name,
            group: "library",
            setisOpen: setisOpen
          }, index);
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sidenav_Buzz",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
          className: "sidenav_Buzz_header text-muted",
          children: "Buzz"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(iconText_IconText, {
          icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiAwardFill, {
            className: "icon0 icon"
          }),
          id: 111,
          link: RECO1,
          name: "Recommended",
          group: "buzz",
          setisOpen: setisOpen
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sidenav_podcast",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
          className: "sidenav_podcast_header text-muted",
          children: "Podcast"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(iconText_IconText, {
          icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiAwardFill, {
            className: "icon0 icon"
          }),
          id: 112,
          link: RECO2,
          name: "Recommended",
          group: "podcast",
          setisOpen: setisOpen
        })]
      })]
    }), pathname.includes("search") && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(searchOptions, {})]
  });
};
/* harmony default export */ const sideNav_SideNav = (SideNav);
;// CONCATENATED MODULE: external "react-icons/bi"
const bi_namespaceObject = require("react-icons/bi");
;// CONCATENATED MODULE: external "react-icons/io"
const io_namespaceObject = require("react-icons/io");
;// CONCATENATED MODULE: external "react-icons/si"
const si_namespaceObject = require("react-icons/si");
;// CONCATENATED MODULE: external "copy-to-clipboard"
const external_copy_to_clipboard_namespaceObject = require("copy-to-clipboard");
var external_copy_to_clipboard_default = /*#__PURE__*/__webpack_require__.n(external_copy_to_clipboard_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/useAxios.js

const FetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL
  };

  // Create instance
  let instance = external_axios_default().create(defaultOptions);
  return instance;
};
/* harmony default export */ const useAxios = (FetchClient());
;// CONCATENATED MODULE: ./src/components/shareaudio/utils.js











const shareAudio = (key, socalLink, linkToShare) => {
  if (key !== "Copy to clipboard") {
    window.open(`${socalLink}${linkToShare}`, "_blank");
    return;
  }
  external_copy_to_clipboard_default()(linkToShare);
  external_react_hot_toast_namespaceObject.toast.success(`successfully copied`);
};
const sharingChanels = [{
  key: "WhatsApp",
  link: "https://api.whatsapp.com/send?text=",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiWhatsappFill, {
    className: "min-[615px]:text-[35px] text-[28px] hover:text-[40px]"
  })
}, {
  key: "Facebook",
  link: "https://www.facebook.com/sharer/sharer.php?u=",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(si_namespaceObject.SiFacebook, {
    className: "min-[615px]:text-[35px] text-[28px] hover:text-[40px]"
  })
}, {
  key: "Twitter",
  link: "https://twitter.com/intent/tweet?url=",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiTwitterFill, {
    className: "min-[615px]:text-[35px] text-[28px] hover:text-[40px] "
  })
}, {
  key: "Telegram",
  link: "https://t.me/share/url?url=",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaTelegram, {
    className: "min-[615px]:text-[35px] text-[28px] hover:text-[40px] ease-in-out duration-300"
  })
}, {
  key: "Copy to clipboard",
  link: "https://t.me/share/url?url=",
  icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsLink45Deg, {
    className: "min-[615px]:text-[35px] text-[28px] hover:text-[40px] ease-in-out duration-300"
  })
}];
const shareLink = (id, currentUserId, type) => {
  return dispatch => {
    dispatch(updateAudioShareCount());
    if (!id) {
      external_react_hot_toast_namespaceObject.toast.error("No audio to be shared");
      return;
    }
    const payload = {
      user_id: currentUserId,
      item_id: type !== "video" ? parseInt(id) : id,
      type: type
    };
    useAxios.post(`/shareApi.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      // setLink(res.data.success);
    }).catch(err => {});
  };
};
;// CONCATENATED MODULE: ./src/components/shareaudio/shareAudio.jsx




const ShareAudio = ({
  isShare,
  setisShare,
  nid,
  type
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [link, setLink] = (0,external_react_.useState)(true);

  ///**** share audio ******** */
  (0,external_react_.useEffect)(() => {
    if (nid) {
      setLink(window.location.href);
    }
  }, [nid]);
  const handleShareAdiolInk = item => {
    shareAudio(item.key, item.link, encodeURIComponent(link));
    dispatch(shareLink(nid, currentUser?.id, type));
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    onClick: e => {
      e.stopPropagation();
      setisShare(!isShare);
    },
    className: isShare ? `share_wrap w-full h-full inset-0 fixed z-[80] bg-white dark:bg-black dark:bg-opacity-60 bg-opacity-60` : "hidden",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "let swipeDown share_box w-[80%] min-[615px]:w-[40%] shadow-lg inset-0 absolute m-auto flex flex-col item-center justify-center py-6 px-4 h-[80px] space-y-4 rounded-md bg-white dark:bg-[#1E1E1E]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "share_btn flex justify-center items-center space-x-2 text-foreground",
        children: sharingChanels.map((item, index) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            title: item.key,
            className: "hover:bg-[#ddff2b] rounded-full p-1 flex items-center justify-center cursor-pointer",
            onClick: () => handleShareAdiolInk(item),
            children: item.icon
          }, item.key);
        })
      })
    })
  });
};
/* harmony default export */ const shareaudio_shareAudio = (ShareAudio);
;// CONCATENATED MODULE: external "react-icons/gi"
const gi_namespaceObject = require("react-icons/gi");
;// CONCATENATED MODULE: external "react-icons/sl"
const sl_namespaceObject = require("react-icons/sl");
;// CONCATENATED MODULE: ./src/assets/png/lazysong.jpeg
const lazysong_namespaceObject = __webpack_require__.p + "394e5a287292ff84f1b4.jpeg";
;// CONCATENATED MODULE: external "react-icons/tb"
const tb_namespaceObject = require("react-icons/tb");
;// CONCATENATED MODULE: ./src/pages/audioDetail/UI_audiodetail/playtiming.js
const playTimingDesktop = (currentTime, duration) => {
  if (currentTime === 0 || isNaN(currentTime) || isNaN(duration)) {
    return `00:00:00/00:00:00`;
  } else {
    let currentHours = Math.floor(currentTime / 3600);
    let currentMinutes = Math.floor(currentTime % 3600 / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationHours = Math.floor(duration / 3600);
    let durationMinutes = Math.floor(duration % 3600 / 60);
    let durationSeconds = Math.floor(duration % 60);
    const formattedCurrentTime = `${currentHours.toString().padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;
    const formattedDuration = `${durationHours.toString().padStart(2, "0")}:${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
    return `${formattedCurrentTime}/${formattedDuration}`;
  }
};

//audio res
const playTimingRes = currentTime => {
  if (currentTime === 0) {
    return "00:00:00";
  } else {
    let currentHours = Math.floor(currentTime / 3600);
    let currentMinutes = Math.floor(currentTime % 3600 / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    const formattedCurrentTime = `${currentHours.toString().padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;
    return `${formattedCurrentTime}`;
  }
};
const durationFormat = duration => {
  if (isNaN(duration)) {
    return `00:00:00`;
  } else {
    let durationHours = Math.floor(duration / 3600);
    let durationMinutes = Math.floor(duration % 3600 / 60);
    let durationSeconds = Math.floor(duration % 60);
    const formattedDuration = `${durationHours.toString().padStart(2, "0")}:${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
    return `${formattedDuration}`;
  }
};
;// CONCATENATED MODULE: ./src/assets/svg/loader.svg
const loader_namespaceObject = __webpack_require__.p + "c8745849028c3b3a9637.svg";
;// CONCATENATED MODULE: ./src/components/UI/audioLoader/audioLoader.jsx




const AudioLoader = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "loader_wrapper",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      id: "animation_rotate",
      className: "loading_img",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        className: "img_sz",
        "src-data": loader_namespaceObject,
        src: loader_namespaceObject,
        alt: "loader"
      })
    })
  });
};
/* harmony default export */ const audioLoader = (AudioLoader);
;// CONCATENATED MODULE: ./src/components/svgcomponent/svgComponent.jsx



const DownloadIcon = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("g", {
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M14.7451689,0.5 L17.6000166,0.5 L17.6000166,0.5 C18.6493485,0.5 19.5,1.35065898 19.5,2.4 L19.5,17.6 C19.5,18.649341 18.6493485,19.5 17.6000166,19.5 L2.40014813,19.5 C1.35081619,19.5 0.5,18.649341 0.5,17.6 L0.5,2.59834976 C0.500006448,2.42833283 0.52168548,2.25900978 0.56451907,2.09447698 C0.841250823,1.03149233 1.57615001,0.5 2.76921664,0.5 C3.60474999,0.5 4.44028334,0.5 5.2758167,0.5 L5.2758167,0.5",
          id: "\u77E9\u5F62",
          strokeLinecap: "round"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M10.0464738,5 C10.3226162,5 10.5464738,5.22385763 10.5464738,5.5 L10.5462003,12.329 L13.2083594,9.66881624 C13.4036216,9.4735541 13.7202041,9.4735541 13.9154662,9.66881624 C14.1107283,9.86407839 14.1107283,10.1806609 13.9154662,10.375923 L10.3799323,13.9114569 C10.2422474,14.0491418 10.0442414,14.0897412 9.87098255,14.0332551 C9.78533618,14.0109546 9.70412783,13.9669608 9.6371808,13.9000138 L6.1016469,10.3644799 C5.90638475,10.1692177 5.90638475,9.85263525 6.1016469,9.65737311 C6.29690904,9.46211096 6.61349153,9.46211096 6.80875368,9.65737311 L9.54620029,12.395 L9.54647382,5.5 C9.54647382,5.22385763 9.77033144,5 10.0464738,5 Z",
          id: "\u5F62\u72B6\u7ED3\u5408",
          className: "svg"
        })]
      })
    })
  });
};
const AddplayIcon = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "20px",
    height: "20px",
    className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
    viewBox: "0 0 20 20",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "\u63A7\u4EF6",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
        id: "play-bar_nar",
        transform: "translate(-1269.000000, -36.000000)",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
          id: "player-bar",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
            id: "play-bar",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("g", {
              id: "btn_add-playlist",
              transform: "translate(1269.000000, 36.000000)",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
                d: "M10,4 C10.2761424,4 10.5,4.22385763 10.5,4.5 L10.5,9.5 L15.5,9.5 C15.7761424,9.5 16,9.72385763 16,10 C16,10.2761424 15.7761424,10.5 15.5,10.5 L10.5,10.5 L10.5,15.5 C10.5,15.7761424 10.2761424,16 10,16 C9.72385763,16 9.5,15.7761424 9.5,15.5 L9.5,10.5 L4.5,10.5 C4.22385763,10.5 4,10.2761424 4,10 C4,9.72385763 4.22385763,9.5 4.5,9.5 L9.5,9.5 L9.5,4.5 C9.5,4.22385763 9.72385763,4 10,4 Z",
                id: "Icon",
                className: "svg"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("rect", {
                id: "\u77E9\u5F62",
                x: "0.5",
                y: "0.5",
                width: "19",
                height: "19",
                rx: "2"
              })]
            })
          })
        })
      })
    })
  });
};
const RepeatIcon = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "21px",
    height: "21px",
    viewBox: "0 0 21 21",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      stroke: "none",
      className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
        id: "btn/music-player/Play-style/loop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("g", {
          id: "\u7F16\u7EC4",
          transform: "translate(0.500000, 1.500000)",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
            d: "M1.55981168,-8.8817842e-16 L0,1.91536613 L6,1.91536613 C10.1421356,1.91536613 13.5,5.06831882 13.5,8.95768307 C13.5,11.4541695 12.1165472,13.6472516 10.0302412,14.897863",
            id: "\u77E9\u5F62",
            transform: "translate(6.750000, 7.448932) scale(-1, 1) translate(-6.750000, -7.448932) "
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
            d: "M8.05981168,3 L6.5,4.91536613 L12.5,4.91536613 C16.6421356,4.91536613 20,8.06831882 20,11.9576831 C20,14.4541695 18.6165472,16.6472516 16.5302412,17.897863",
            id: "\u77E9\u5F62",
            transform: "translate(13.250000, 10.448932) scale(1, -1) translate(-13.250000, -10.448932) "
          })]
        })
      })
    })
  });
};
const RepeatedIcon = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "21px",
    height: "21px",
    viewBox: "0 0 21 21",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
        id: "btn/music-player/Play-style/loop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("g", {
          id: "\u7F16\u7EC4",
          transform: "translate(0.500000, 1.500000)",
          className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
            d: "M1.55981168,-8.8817842e-16 L0,1.91536613 L6,1.91536613 C10.1421356,1.91536613 13.5,5.06831882 13.5,8.95768307 C13.5,11.4541695 12.1165472,13.6472516 10.0302412,14.897863",
            id: "\u77E9\u5F62",
            transform: "translate(6.750000, 7.448932) scale(-1, 1) translate(-6.750000, -7.448932) "
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
            d: "M8.05981168,3 L6.5,4.91536613 L12.5,4.91536613 C16.6421356,4.91536613 20,8.06831882 20,11.9576831 C20,14.4541695 18.6165472,16.6472516 16.5302412,17.897863",
            id: "\u77E9\u5F62",
            transform: "translate(13.250000, 10.448932) scale(1, -1) translate(-13.250000, -10.448932) "
          })]
        })
      })
    })
  });
};
const AddFavourites = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    version: "1.1",
    fill: "#ddff2b",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      stroke: "none",
      strokeWidth: "1",
      className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
      fill: "none",
      fillRule: "evenodd",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
        id: "btn/\u5168\u5C4F\u64AD\u653E/\u6536\u85CF/default",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M18.2967189,9.187261 L10.8984636,18.8575017 C10.0698919,19.7141661 9.91348598,19.7141661 9.08491431,18.8575017 L1.70312279,9.187261 C0.959728516,8.05747565 0.543336643,6.74410976 0.5,5.39242125 C0.5,2.84078962 2.46298981,0.50031658 5.2491689,0.50031658 C7.22767266,0.50031658 8.78571667,1.56149142 9.9983378,2.81957878 C11.2733313,1.63430473 12.7709026,0.5 14.7506728,0.5 C17.5368519,0.5 19.5,2.84047304 19.5,5.39210467 C19.5093731,6.75240787 19.088236,8.08085166 18.2967189,9.187261 Z",
          id: "\u6536\u85CF"
        })
      })
    })
  });
};
const AddedFavourites = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      stroke: "none",
      strokeWidth: "1",
      fill: "none",
      fillRule: "evenodd",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
        id: "btn/\u5168\u5C4F\u64AD\u653E/\u6536\u85CF/default",
        className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
        stroke: "",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M18.2967189,9.187261 L10.8984636,18.8575017 C10.0698919,19.7141661 9.91348598,19.7141661 9.08491431,18.8575017 L1.70312279,9.187261 C0.959728516,8.05747565 0.543336643,6.74410976 0.5,5.39242125 C0.5,2.84078962 2.46298981,0.50031658 5.2491689,0.50031658 C7.22767266,0.50031658 8.78571667,1.56149142 9.9983378,2.81957878 C11.2733313,1.63430473 12.7709026,0.5 14.7506728,0.5 C17.5368519,0.5 19.5,2.84047304 19.5,5.39210467 C19.5093731,6.75240787 19.088236,8.08085166 18.2967189,9.187261 Z",
          id: "\u6536\u85CF"
        })
      })
    })
  });
};
const CommentIcon = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("svg", {
    width: "20px",
    height: "20px",
    viewBox: "0 0 20 20",
    className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
    version: "1.1",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("g", {
      id: "Symbols",
      stroke: "none",
      strokeWidth: "1",
      className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
      fill: "none",
      fillRule: "evenodd",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("g", {
        id: "btn/comment",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M10,4.50042982 L17.0643091,4.50042982 C17.9112519,4.50042982 18.2183738,4.59325543 18.5280034,4.76756252 C18.837633,4.94186961 19.0806322,5.19765819 19.2462239,5.52358411 C19.4118157,5.84951004 19.4999986,6.17279628 19.4999986,7.06431502 L19.4999986,16.9365446 C19.4999986,17.8280634 19.4118157,18.1513496 19.2462239,18.4772755 C19.0806322,18.8032014 18.837633,19.05899 18.5280034,19.2332971 C18.2183738,19.4076042 17.9112519,19.5004298 17.0643091,19.5004298 L2.93569094,19.5004298 C2.08874814,19.5004298 1.78162621,19.4076042 1.47199658,19.2332971 C1.16236695,19.05899 0.919367807,18.8032014 0.753776069,18.4772755 C0.588184331,18.1513496 0.499948023,17.8280634 0.499948023,16.9365446 L0.499948023,7.06431502 C0.499948023,6.17279628 0.683102636,5.64933613 1.07754961,5.20844933 C1.47199658,4.76756252 2.07626411,4.50042982 2.62893425,4.50042982 C3.3037618,4.50042982 4.31600311,4.50042982 5.6656582,4.50042982 L4.36910376,1 L9.48219105,4.50042982 L10,4.50042982 Z",
          id: "\u77E9\u5F62",
          stroke: "",
          className: "stroke-color-primary dark:hover:stroke-[#ddff2b] hover:stroke-color-foreground",
          strokeLinejoin: "round",
          transform: "translate(9.999973, 10.250215) scale(1, -1) translate(-9.999973, -10.250215) "
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("path", {
          d: "M5.5,8 L14.5,8 C14.7761424,8 15,8.22385763 15,8.5 C15,8.77614237 14.7761424,9 14.5,9 L5.5,9 C5.22385763,9 5,8.77614237 5,8.5 C5,8.22385763 5.22385763,8 5.5,8 Z",
          id: "\u77E9\u5F62",
          fill: "",
          className: "fill-color-primary dark:hover:fill-[#ddff2b] hover:fill-color-foreground"
        })]
      })
    })
  });
};
;// CONCATENATED MODULE: ./src/assets/svg/cloase.svg
const cloase_namespaceObject = __webpack_require__.p + "4fb138438c2d9061b25e.svg";
;// CONCATENATED MODULE: ./src/assets/svg/createplay.svg
const createplay_namespaceObject = __webpack_require__.p + "9fcf2dc78b587a3d3c8f.svg";
;// CONCATENATED MODULE: ./src/assets/svg/folder.svg
const folder_namespaceObject = __webpack_require__.p + "a89a1bf71a34532be9df.svg";
;// CONCATENATED MODULE: ./src/components/UI/loader/loader.jsx




function Loader() {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "loader_wrapper",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      id: "animation_rotate",
      className: "loading_img",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        "src-data": loader_namespaceObject,
        className: "img_sz",
        src: loader_namespaceObject,
        alt: "loader"
      })
    })
  });
}
/* harmony default export */ const loader = (Loader);
;// CONCATENATED MODULE: ./src/pages/add_playlist/AddPlaylist.jsx












const Add_playlist = () => {
  const {
    addplaylist,
    currentUser,
    lecid
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [seltype, setseltype] = (0,external_react_.useState)("");
  const [isShow, setisShow] = (0,external_react_.useState)(true);
  const [created, setCreated] = (0,external_react_.useState)([]);
  const [title, setTitle] = (0,external_react_.useState)("");
  const [myFolders, setmyFolders] = (0,external_react_.useState)([]);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [error, setError] = (0,external_react_.useState)(null);
  const hidePlaylist = e => {
    e.stopPropagation();
    dispatch(showaddPlaylist(false));
  };
  const setType = [{
    id: 0,
    type: "Set as public"
  }, {
    id: 1,
    type: "Set as private"
  }];
  const handleChange = e => {
    setTitle(e.target.value);
  };
  const submit = () => {
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Sign in is required to add playlist");
      return;
    }
    const validateData = {
      title,
      seltype,
      user_id: currentUser?.id
    };
    for (let i in validateData) {
      if (validateData[i] === "") {
        external_react_hot_toast_namespaceObject.toast.error(`${i} is required`);
        return;
      }
    }
    if (created.includes(title.toLowerCase())) {
      external_react_hot_toast_namespaceObject.toast.error("Title already exists");
      return;
    }
    const payload = {
      name: title,
      is_private: seltype,
      user_id: parseInt(currentUser?.id),
      action: "create_playlist"
    };
    setLoading(true);
    setError(null);
    useAxios.post("/playlistApi.php", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success("Lecture added to playlist");
      setLoading(false);
      setisShow(true);
      // Refresh playlists after adding
      fetchPlaylists();
    }).catch(err => {
      setLoading(false);
      setError(err.message);
      external_react_hot_toast_namespaceObject.toast.error("Failed to create playlist");
    });
  };
  const fetchPlaylists = () => {
    if (!currentUser?.id) return;
    useAxios.get(`/playlistApi.php?user_id=${parseInt(currentUser?.id)}&action=user_playlists`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      if (Array.isArray(res.data)) {
        setmyFolders(res.data);
        const filter = res.data.map(item => item.name.toLowerCase());
        setCreated(filter);
      } else {
        setmyFolders([]);
        setCreated([]);
      }
    }).catch(err => {
      setError(err.message);
      setmyFolders([]);
      setCreated([]);
    });
  };
  (0,external_react_.useEffect)(() => {
    if (isShow && currentUser?.id) {
      fetchPlaylists();
    }
  }, [isShow, currentUser?.id]);
  const addSong = id => {
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Sign in is required to add playlist");
      return;
    }
    const payload = {
      user_id: parseInt(currentUser?.id),
      audio_id: parseInt(lecid),
      playlist_id: id,
      action: "add_playlist_audio"
    };
    setLoading(true);
    setError(null);
    useAxios.post("/playlistApi.php", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
      dispatch(showaddPlaylist(false));
    }).catch(err => {
      setError(err.message);
      external_react_hot_toast_namespaceObject.toast.error("Failed to add to playlist");
    }).finally(() => {
      setLoading(false);
    });
  };
  if (error) {
    return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "flex items-center justify-center p-4 text-red-500",
      children: error
    });
  }
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(jsx_runtime_namespaceObject.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      onClick: hidePlaylist,
      className: addplaylist ? "addplay_wrapper dark:bg-black dark:bg-opacity-60 bg-opacity-60 bg-white" : "addplay_wrapper_none",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: e => {
          e.stopPropagation();
        },
        className: isShow ? "curr_playlist bg-background shadow-lg text-foreground let swipeDown" : "curr_playlist_none",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: hidePlaylist,
          className: "close_image",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdClose, {
            className: "text-xl"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "cur_small_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "create_play",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                setisShow(false);
              },
              className: "create_icon_wrap",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "create_folder_icon",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "img_sz",
                  src: createplay_namespaceObject,
                  alt: "Create playlist"
                })
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "create_text",
              children: "Create a new playlist"
            })]
          }), Array.isArray(myFolders) && myFolders.map(({
            name,
            is_private,
            id
          }, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            onClick: () => addSong(id),
            className: "created_play",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "created_folder_icon",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "img_sz",
                src: folder_namespaceObject,
                alt: "Playlist folder"
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "created_text",
              children: name
            })]
          }, index))]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: e => {
          e.stopPropagation();
        },
        className: isShow ? "smaller_wrapper_none" : "smaller_wrapper bg-background text-foreground shadow-lg let swipeDown",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "add_play_header text-foreground",
          children: "Add a new playlist"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: hidePlaylist,
          className: "close_image",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdClose, {
            className: "text-xl"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          type: "text",
          name: "playlist",
          placeholder: "Playlist title",
          required: true,
          value: title,
          onChange: handleChange,
          className: "playlist_name"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "private_public",
          children: setType.map(({
            type,
            id
          }, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
            onClick: () => setseltype(id),
            className: "container",
            children: [type, /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
              type: "checkbox",
              defaultChecked: id === seltype
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "checkmark"
            })]
          }, index))
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: submit,
          className: "done_btn",
          disabled: loading,
          children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loader_size",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
          }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Done"
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const AddPlaylist = (Add_playlist);
;// CONCATENATED MODULE: ./src/assets/svg/boom-download.svg
const boom_download_namespaceObject = __webpack_require__.p + "5de23583f915e7f29cd7.svg";
;// CONCATENATED MODULE: ./src/components/UI/formatter.js
const formatNumber = number => {
  if (number === 0) {
    return "0";
  }
  const suffixes = ["", "k", "M", "B", "T"];
  const suffixNum = Math.floor(Math.log10(number) / 3);
  if (suffixNum === 0) {
    return number.toString();
  }
  const shortValue = (number / Math.pow(1000, suffixNum)).toFixed(1);
  return shortValue + suffixes[suffixNum];
};
;// CONCATENATED MODULE: external "react-modal"
const external_react_modal_namespaceObject = require("react-modal");
var external_react_modal_default = /*#__PURE__*/__webpack_require__.n(external_react_modal_namespaceObject);
;// CONCATENATED MODULE: ./src/components/modal/Modal.component.jsx




const Modal = ({
  className,
  modalTitle = "",
  modalDescription,
  children,
  show = null,
  contentLabel = "Modal",
  onShowCallback,
  onCloseCallback
}) => {
  const [showModal, setShowModal] = (0,external_react_.useState)(false);
  const customStyles = (0,external_react_.useMemo)(() => {
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)"
      }
    };
  }, []);
  const closeModal = () => setShowModal(false);

  // open or close modal based on show prop
  (0,external_react_.useMemo)(() => {
    if (show) {
      setShowModal(true);
    } else if (show !== null) {
      if (!show) {
        closeModal();
      }
    }
  }, [show]);
  (0,external_react_.useMemo)(() => external_react_modal_default().setAppElement("body"), []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_modal_default()), {
    isOpen: showModal,
    onAfterOpen: () => onShowCallback?.(),
    onAfterClose: () => onCloseCallback?.(),
    onRequestClose: closeModal,
    style: customStyles,
    contentLabel: contentLabel,
    className: "justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150  modal",
    overlayClassName: "fixed inset-0 w-full h-full bg-white/50 dark:bg-black/50 z-50 cursor-pointer modal-overlay ",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "relative w-auto mx-auto cursor-default",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: `border-0 rounded-lg shadow-lg relative flex flex-col  bg-white dark:bg-[#1E1E1E] outline-none focus:outline-none w-[95vw] md:w-[60vw] xl:w-[30vw]  p-4 md:p-10 ${className} `,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "relative",
          children: [(modalTitle || modalDescription) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "flex items-start justify-start pb-3  rounded-t whitespace-normal",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              children: [modalTitle && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
                className: "text-xl font-semibold text-foreground flex justify-center items-start flex-col gap-2",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  children: modalTitle
                })
              }), modalDescription && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "text-xs text-foreground font-light",
                children: modalDescription
              })]
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            "aria-label": "close modal",
            className: "absolute top-1 right-1",
            onClick: closeModal,
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineCloseCircle, {
              className: "text-primary-500 text-2xl",
              "aria-hidden": "true"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "relative pt-2 flex flex-wrap flex-col whitespace-normal",
          children: children
        })]
      })
    })
  });
};
Modal.displayName = "Modal";
;// CONCATENATED MODULE: ./src/services/api.js



// Network error messages for different scenarios
const NETWORK_ERROR_MESSAGES = {
  OFFLINE: "You appear to be offline. Please check your internet connection.",
  TIMEOUT: "Request timed out. Server might be experiencing high load.",
  SERVER_DOWN: "Unable to establish connection to server.",
  BUFFER_ERROR: "Error loading media content. Please try again.",
  THIRD_PARTY_ERROR: "Error with third-party service. This won't affect your main experience.",
  AUDIO_INTERRUPTED: "Audio playback was interrupted. Please try again.",
  DEFAULT: "Network error. Please check your connection and try again."
};

// Track when the last error message was shown to prevent duplicates
let lastErrorTime = 0;
let lastErrorMessage = '';
const ERROR_COOLDOWN = 3000; // 3 seconds cooldown between same error messages

// see usage in apiService function definition below
const apiResource = (baseURL = process.env.REACT_APP_API_BASE_URL) => {
  const service = external_axios_default().create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    timeout: 30000 // 30 second timeout
  });

  // Helper function to show error toast with deduplication
  const showErrorToast = message => {
    const now = Date.now();
    // Only show the error if it's different from the last one or if enough time has passed
    if (message !== lastErrorMessage || now - lastErrorTime > ERROR_COOLDOWN) {
      external_react_hot_toast_namespaceObject.toast.error(message);
      lastErrorMessage = message;
      lastErrorTime = now;
    }
  };

  // Global error handler for uncaught XHR errors
  window.addEventListener("error", function (event) {
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
    if (event.filename && (event.filename.includes("tawk.to") || event.filename.includes("embed.tawk.to"))) {
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
  }, true);

  // Handle audio playback interruption errors
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
  service.interceptors.request.use(config => {
    // Add x-project to the header if the request METHOD is not GET
    if (config.method !== "get") {
      config.headers["x-project"] = "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25";
    }
    return config;
  });

  // Helper to determine the type of network error
  const getNetworkErrorMessage = error => {
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
    if (error.message && error.message.includes("The play() request was interrupted")) {
      return NETWORK_ERROR_MESSAGES.AUDIO_INTERRUPTED;
    }

    // Other network errors
    return NETWORK_ERROR_MESSAGES.SERVER_DOWN;
  };

  // Response interceptor
  service.interceptors.response.use(
  // Success handler
  response => {
    const responseData = response?.data;
    return responseData;
  },
  // Error handler
  error => {
    // Handle network errors (no response from server)
    if (error?.response === undefined) {
      const errorMessage = getNetworkErrorMessage(error);
      showErrorToast(errorMessage);
      return Promise.reject({
        message: errorMessage,
        isNetworkError: true,
        originalError: error
      });
    }

    // Handle server errors (got a response, but it's an error)
    const errors = error?.response?.data;
    const errorMessage = errors?.error || errors?.message;
    let serverErrors = errors?.errors;
    if (serverErrors) {
      // loop through serverErrors object and display value of each key
      Object.keys(serverErrors).forEach(key => {
        const error = serverErrors[key];
        if (Array.isArray(error)) {
          error.forEach(err => {
            showErrorToast(err);
          });
        } else {
          showErrorToast(error);
        }
      });
    } else {
      showErrorToast(errorMessage || "Something went wrong! Please try again.");
    }
    return Promise.reject(errors);
  });

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
    get: async url => {
      try {
        const data = service.get(url);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    post: async ({
      url,
      payload
    }) => {
      try {
        const data = service.post(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    patch: async ({
      url,
      payload
    }) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    delete: async ({
      url,
      payload
    }) => {
      try {
        const data = service.delete(url, {
          data: payload || {}
        });
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    put: async ({
      url,
      payload
    }) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};

// call apiService with a different parameter if you want to use another baseURL other than REACT_APP_API_BASE_URL
const apiService = baseURL => apiResource(baseURL);
;// CONCATENATED MODULE: ./src/services/quran.service.js


// api requests pertaining to qurans
const quranApi = {
  getQuranAlbums: async (page, limit = 20) => await apiService().get(`/dn_quran_api.php?action=get_quran_album&page=${page}&limit=${limit}`)
};
;// CONCATENATED MODULE: ./src/services/landing.service.js


// api requests for landing page
const landingPageApis = {
  getSliderImages: async () => await apiService().get(`/slider_image.php`),
  getSpecialFeaturesLectures: async () => await apiService(process.env.REACT_APP_API_ADMINISTER_BASE_URL).post({
    url: `/spcl_ftr_api.php`,
    payload: {
      action: "retrieve_spcl_ftr_data"
    }
  }),
  getRecentlyPosted: async (page = 1) => await apiService().get(`/leclisting_recent.php?&action=get_recent_audio&page=${page}`),
  getRecentlyViewed: async (id, page = 1, setisrecent, setcurPlay) => {
    try {
      if (id) {
        const response = landingPageApis?.getRecentlyViewedForLoginUser(id); // get recently viewed if there is auth token
        const result = await response;
        let datas;
        if (result.length === 0) {
          // get the default recently viewed
          setisrecent(false); /// no recently viewed lecture
          const response = landingPageApis?.getRecentlyViewedForNotLoginUser(page);
          datas = await response;
        } else {
          const {
            data
          } = result[0];
          setcurPlay(Object.values(data)); //ids of recently played audio in the album
          const recArr = Object.keys(data); //ids of the albums
          setisrecent(true); // there is recently viewed lecture

          // get recently viewed albums
          const response = landingPageApis?.getRecentlyViewedAlbums(recArr.toString());
          datas = await response;
        }
        return datas;
      } else {
        const response = landingPageApis?.getRecentlyViewedForNotLoginUser(page); //get recently viewed if there is auth token (default)
        return await response;
      }
    } catch (error) {
      ;
    }
  },
  getRecentlyViewedForLoginUser: async user => await apiService().get(`/recentApi.php?user_id=${user}&action=get_recent`),
  getRecentlyViewedForNotLoginUser: async page => await apiService().get(`/leclisting_lang.php?langid=6&page=${page}`),
  getRecentlyViewedAlbums: async payload => await apiService().get(`/albumlisting_multi_nid_api.php?id=${payload}`)
};
;// CONCATENATED MODULE: ./src/services/trending.service.js

const trendingApi = {
  getTrendings: async ({
    page
  }) => await apiService().get(`/popular_lec_api.php?langid=6&page=${page}`)
};
;// CONCATENATED MODULE: ./src/services/new.service.js

const newApi = {
  getNewLectures: async ({
    page
  }) => await apiService().get(`/leclisting_recent.php?&action=get_recent_audio&page=${page}`)
};
;// CONCATENATED MODULE: ./src/services/lecturers.service.js

const lecturersApi = {
  getLecturers: async ({
    page,
    langid,
    alpha,
    lectId,
    typeName,
    active
  }) => {
    try {
      if (typeName === "name" && active !== "All") {
        const response = await lecturersApi.getLecturersById(lectId);
        return response;
      } else {
        const response = await lecturersApi.getLecturersByLangOrAlphabet(page, langid, alpha);
        return response;
      }
    } catch (error) {
      ;
    }
  },
  getLecturersByLangOrAlphabet: async (page, langid, alpha) => await apiService().get(`/all_rps_api.php?offset=30&lim=10&page=${page}${`${langid ? `&langid=${langid}` : ""}`}${`${alpha && alpha !== "Hot" ? `&alpha=${alpha}` : ""}`}`),
  getLecturersById: async lectId => await apiService().get(`/rplisting_multi_nid_api.php?id=${lectId}`),
  getLanguages: async () => await apiService().get(`/all_lang_api.php`),
  getCategories: async () => await apiService().get(`/allcateg_api.php`)
};
;// CONCATENATED MODULE: ./src/services/lecturerdetail.service.js

const lecturerDetailApi = {
  getLecturerById: async ({
    id
  }) => apiService().get(`/rplisting_multi_nid_api.php?id=${id}`),
  getLecturerSongs: async ({
    page,
    id
  }) => apiService().get(`/leclisting_rp.php?page=${page}&rpid=${id}`),
  getLecturerPlaylist: async ({
    id
  }) => apiService().get(`/playlistApi.php?action=all_public_playlist_data&rp_id=${id}`),
  getLecturerAlbums: async ({
    page,
    id
  }) => apiService().get(`/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${id}`),
  getSimilarRps: async ({
    page,
    langid
  }) => apiService().get(`/all_rps_api.php?offset=30&lim=10&page=${page}&langid=${langid}`)
};
;// CONCATENATED MODULE: ./src/services/genres.service.js

const genresApi = {
  getCategories: async () => await apiService().get(`/allcateg_api.php`),
  getCategoryDetails: async ({
    id
  }) => await apiService().get(`/genre_api.php?cat_id=${id}`)
};
;// CONCATENATED MODULE: ./src/services/lecturelistdetail.service.js

const lectureListDetailApi = {
  getAlbumLectures: async ({
    id
  }) => await apiService().get(`/albumapi3.php?aid=${id}&page=${1}`),
  getAlbumDetail: async ({
    id
  }) => await apiService().get(`/albumlisting_multi_nid_api.php?id=${id}`),
  getSimilarAlbums: async ({
    page,
    id
  }) => await apiService().get(`/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${id}`)
};
;// CONCATENATED MODULE: ./src/services/charts.service.js

const chartsApi = {
  getAlbums: async ({
    action
  }) => await apiService().get(`/albumlisting_charts_api.php?action=${action}`),
  getLectures: async ({
    action
  }) => await apiService().get(`/leclisting_charts_api.php?action=${action}`),
  getRps: async ({
    action
  }) => await apiService().get(`/rplisting_charts_api.php?action=${action}`),
  getPlaylists: async ({
    action
  }) => await apiService().get(`/playlist_charts_api.php?action=${action}`)
};
;// CONCATENATED MODULE: ./src/services/playlistdetail.service.js

const playlistdetailApi = {
  getPlaylistData: async ({
    id
  }) => await apiService().get(`/playlistApi.php?playlist_id=${id}&action=single_playlist_data`),
  getPlaylistLectures: async ({
    multiId
  }) => await apiService().get(`/leclisting_multi_nid_api.php?id=${multiId}`),
  getAllPlaylists: async () => await apiService().get(`/playlistApi.php?action=all_public_playlist_data`)
};
;// CONCATENATED MODULE: ./src/services/video.service.js

const videoApis = {
  getVideos: async ({
    page
  }) => await apiService().get(`/video_listingApi.php?page=${page}&action=allVideo`)
};
;// CONCATENATED MODULE: ./src/services/audiodetail.service.js

const audioDetailApi = {
  getAudio: async id => await apiService().get(`/leclistingapi.php?lecid=${id}`),
  getSimilarAudio: async ({
    id,
    page
  }) => await apiService().get(`/leclisting_rp.php?page=${page}&lim=10&offset=30&rpid=${id}`)
};
;// CONCATENATED MODULE: ./src/services/more.service.js

const moreViewApi = {
  moreDatas: async ({
    endpoint_url,
    page
  }) => {
    if (!endpoint_url) return; // don't allow empty endpoint url
    return await apiService().get(`${endpoint_url}${page}`);
  }
};
;// CONCATENATED MODULE: ./src/services/favorite.service.js

const favoriteApi = {
  getFavorites: async ({
    id,
    type
  }) => await apiService().get(`/leclisting_favorites.php?user_id=${id}&type=${type}`),
  addToFavorites: async payload => await apiService().post({
    url: `/leclisting_favorites.php`,
    payload
  })
};
;// CONCATENATED MODULE: ./src/services/lecture.service.js


// api requests pertaining to lectures
const lectureApi = {
  downloadFile: async payload => await apiService().post({
    url: "/download_api.php",
    payload
  })
};
;// CONCATENATED MODULE: ./src/services/ramadan.service.js


// api requests pertaining to ramadan
const ramadanApi = {
  getAllRamadanYears: async () => await apiService().get(`/ramadanlisting_api.php?action=getRamadanAlbums`),
  getRamadanYearAlbums: async id => await apiService().get(`/ramadanlisting_api.php?id=${id}&action=getRamadanDetails`)
};
;// CONCATENATED MODULE: ./src/services/index.js
// export all services here
















;// CONCATENATED MODULE: ./src/hooks/quran/useQuranAlbums.hook.js




const useQuranAlbums = (page = 1) => {
  const [cummulatedData, setCummulatedData] = (0,external_react_.useState)([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = (0,external_react_.useState)(false);
  const [hasReachedLastPage, setHasReachedLastPage] = (0,external_react_.useState)(false);
  const {
    isLoading,
    data,
    error
  } = (0,react_query_namespaceObject.useQuery)(["qurans", page], () => quranApi.getQuranAlbums(page), {
    enabled: !hasReachedLastPage,
    // don't make request if last page has been loaded
    onSuccess: data => {
      setIsLoadingNextPage(false);
      setCummulatedData(prev => [...prev, ...data]);
      // ensure subsequent requests are not sent when the last one doesn't have data
      if (data?.length % 20 !== 0) {
        setHasReachedLastPage(true);
        return;
      }
    },
    onError: error => {
      setIsLoadingNextPage(false);
      external_react_hot_toast_default().error("Unable to load qurans");
    }
  });

  // handles when page changes
  (0,external_react_.useEffect)(() => {
    if (page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [page]);
  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    cummulatedData
  };
};

// export const useQuranAlbumInfiniteQuery = () => {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["recitations"],
//     queryFn: quranApi.getQuranAlbums,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
//   });

//   return {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   };
// };
;// CONCATENATED MODULE: ./src/hooks/quran/index.js

;// CONCATENATED MODULE: ./src/components/UI/infiniteScroll.js
function infiniteScroll(node, observer, page, setPage) {
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        setPage(page + 1);
      }, 2000);
    }
  }, {
    threshold: 1
  });
  if (node) observer.current.observe(node);

  // Cleanup when the component unmounts
  return () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };
}
/* harmony default export */ const UI_infiniteScroll = (infiniteScroll);
;// CONCATENATED MODULE: ./src/hooks/common/useInfinitePagination.hook.js


const useInfiniteScrollPagination = (dataLength = 0, page, setPage) => {
  const observer = (0,external_react_.useRef)();
  const ref = (0,external_react_.useCallback)(node => {
    if (dataLength === 0) return;
    UI_infiniteScroll(node, observer, page, setPage);
  }, [page, dataLength]);
  return {
    ref
  };
};
;// CONCATENATED MODULE: ./src/utils/imagePlaceholders.js
const IMAGE_PLACEHOLDERS = {
  carouselWidget: "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazyanime_i8hntv.jpg",
  albumWidget: "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/album_d1wslv.jpg",
  lecture: "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazysong_abcewr.jpg",
  lecturer: "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550294/lazyrps_foahnl.jpg"
};
;// CONCATENATED MODULE: ./src/hooks/common/useLazyLoadImage.hook.js


const useLazyLoadImage = imgSrc => {
  const imageRef = (0,external_react_.useRef)(null);
  const observerRef = (0,external_react_.useRef)(null);
  (0,external_react_.useEffect)(() => {
    const handleImageError = () => {
      imageRef.current.src = IMAGE_PLACEHOLDERS.albumWidget;
    };
    const lazyImage = () => {
      if (imageRef.current) {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const newUrl = imageRef.current.getAttribute("data-src");
              imageRef.current.src = newUrl;
              imageRef.current.removeEventListener("error", handleImageError);
              observerRef.current = null;
            }
          });
        });
        observerRef.current = observer;
        observer.observe(imageRef.current);
        imageRef.current.addEventListener("error", handleImageError);
      }
    };
    lazyImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("error", handleImageError);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [imgSrc]);
  return {
    imageRef
  };
};
;// CONCATENATED MODULE: ./src/hooks/common/useTheme.hook.js



function useThemeHook() {
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function onWindowMatch() {
    if (theme === "dark" || darkQuery.matches) {
      dispatch(setTheme("dark"));
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      dispatch(setTheme("light"));
    }
  }
  (0,external_react_.useEffect)(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      default:
        onWindowMatch();
        break;
    }
  }, [theme]);
  return {
    darkQuery: darkQuery.matches
  };
}
;// CONCATENATED MODULE: ./src/hooks/common/index.js



;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_namespaceObject);
;// CONCATENATED MODULE: ./src/hooks/getqueries/useQueryGetRequest.hook.js




const useQueryGetRequest = (keyName, queryParam = {}, queryFunction) => {
  const [querieddata, setQueriedData] = (0,external_react_.useState)([] || 0);
  const [isLoadingNextPage, setIsLoadingNextPage] = (0,external_react_.useState)(false);
  const [hasReachedLastPage, setHasReachedLastPage] = (0,external_react_.useState)(false);
  const {
    isLoading,
    data,
    error,
    refetch
  } = (0,react_query_namespaceObject.useQuery)([keyName, queryParam], () => queryFunction(queryParam), {
    enabled: !hasReachedLastPage,
    onSuccess: data => {
      setIsLoadingNextPage(false);

      // ensure subsequent requests are not sent when the last one doesn't have data
      if (data?.length === 0) {
        setHasReachedLastPage(true);
        return;
      }
      queryParam.page ? setQueriedData(prev => [...prev, ...data]) : setQueriedData(data);
    },
    onError: error => {
      setIsLoadingNextPage(false);
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });

  // handles when page changes
  (0,external_react_.useEffect)(() => {
    if (!queryParam.page) return; // return if the query param is not page
    if (queryParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [queryParam.page]);
  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    querieddata,
    refetch
  };
};
;// CONCATENATED MODULE: ./src/hooks/getqueries/index.js

;// CONCATENATED MODULE: ./src/hooks/landing/useLanding.hook.js


const useLandingPageHook = (id, page, setisrecent, setcurPlay) => {
  return (0,react_query_namespaceObject.useQueries)({
    queries: [{
      queryKey: ["sliders-image"],
      queryFn: () => landingPageApis.getSliderImages()
    }, {
      queryKey: ["recently-posted"],
      queryFn: () => landingPageApis.getRecentlyPosted()
    }, {
      queryKey: ["special-features"],
      queryFn: () => landingPageApis.getSpecialFeaturesLectures()
    }, {
      queryKey: ["recentlyviewed"],
      queryFn: () => landingPageApis.getRecentlyViewed(id, page, setisrecent, setcurPlay)
    }]
  });
};
;// CONCATENATED MODULE: ./src/hooks/landing/index.js

;// CONCATENATED MODULE: ./src/pages/lecturers/data.jsx
const lecturers = [{
  id: null,
  name: "All",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (10).jpg",
  status: 1,
  lang_id: 6
}, {
  id: 10,
  name: "Prof. Abdur-Razzaaq Abdul Majeed Alaro (Ilorin)",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (10).jpg",
  status: 1,
  lang_id: 6
}, {
  id: 11,
  name: "Dr Muhammad Ahmad Ibrahim BUK (Kano)",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (78).jpg",
  status: 1,
  lang_id: 8
}, {
  id: 54,
  name: "Ustadh Isa Christian Okonkwo (Enugu)",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (21).jpg",
  status: 1,
  lang_id: 9
}, {
  id: 5,
  name: "Shaykh Rasheed Buwayb (Iwo)",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (40).jpg",
  status: 1,
  lang_id: 7
}, {
  id: 12,
  name: "Dr Aliyu Bashir Umar (Kano)",
  img: "https://backend.dawahnigeria.com/sites/default/files/Cover (82).jpg",
  status: 1,
  lang_id: 8
}];
const language = [{
  name: "All",
  id: ""
}];
;// CONCATENATED MODULE: ./src/hooks/lecturers/useLanguage.hook.js





const useLanguagesHook = () => {
  const [languagedata, setLanguageData] = (0,external_react_.useState)([]);
  const {
    data
  } = (0,react_query_namespaceObject.useQuery)(["languages"], () => lecturersApi.getLanguages(), {
    onSuccess: data => {
      setLanguageData([...language, ...data]);
    },
    onError: error => {
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });
  return {
    data: languagedata
  };
};
;// CONCATENATED MODULE: ./src/hooks/lecturers/useLecturers.hook.js




const useLecturersHook = (keyName, queryParam = {}, queryFunction, setPage) => {
  const [querieddata, setQueriedData] = (0,external_react_.useState)([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = (0,external_react_.useState)(false);
  const [hasReachedLastPage, setHasReachedLastPage] = (0,external_react_.useState)(false);
  const [intialLangId, setinitialLangId] = (0,external_react_.useState)("");
  const {
    isLoading,
    data,
    error
  } = (0,react_query_namespaceObject.useQuery)([keyName, queryParam], () => queryFunction(queryParam), {
    enabled: !hasReachedLastPage,
    onSuccess: data => {
      setIsLoadingNextPage(false);

      //check if the query is with lecturer id, return if it's true
      if (queryParam.typeName === "name" && queryParam.active !== "All") {
        setQueriedData(data);
        setIsLoadingNextPage(false);
        setHasReachedLastPage(true); // stop making request
        return;
      }

      // ensure subsequent requests are not sent when the last one doesn't have data
      if (data?.length === 0) {
        setHasReachedLastPage(true);
        return;
      }
      setinitialLangId(queryParam.langid);
      setQueriedData(prev => external_lodash_default().uniqBy([...prev, ...data], "id"));
    },
    onError: error => {
      setIsLoadingNextPage(false);
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });

  // handles when page, languageId, and alpahabet  change
  (0,external_react_.useEffect)(() => {
    //don't paginate if the queryParam is the lecturer Id
    if (queryParam.typeName === "name" && queryParam.active !== "All") {
      queryParam.lectId ? setHasReachedLastPage(false) : null;
      return;
    }
    if (queryParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [queryParam.page, queryParam.lectId]);
  (0,external_react_.useEffect)(() => {
    if (!queryParam.lectId) {
      setHasReachedLastPage(false);
    }
  }, [queryParam.lectId]);
  (0,external_react_.useEffect)(() => {
    if (queryParam.langid) {
      setHasReachedLastPage(false);
    }
    // start again from the first page whenever there is a change in the language or alphabet selection
    if (intialLangId !== queryParam.langid) {
      setQueriedData([]);
      setPage(1);
    }
  }, [queryParam.langid]);
  return {
    isLoading,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage,
    error,
    data,
    querieddata
  };
};
;// CONCATENATED MODULE: ./src/pages/playlists/data.jsx
const category = [{
  id: "40217",
  name: "All"
}];
const data_language = [{
  name: "All",
  id: "6"
}];
const alphabet = [{
  alphabet: "Hot"
}, {
  alphabet: "A"
}, {
  alphabet: "B"
}, {
  alphabet: "C"
}, {
  alphabet: "D"
}, {
  alphabet: "E"
}, {
  alphabet: "F"
}, {
  alphabet: "G"
}, {
  alphabet: "H"
}, {
  alphabet: "I"
}, {
  alphabet: "J"
}, {
  alphabet: "K"
}, {
  alphabet: "L"
}, {
  alphabet: "M"
}, {
  alphabet: "N"
}, {
  alphabet: "O"
}, {
  alphabet: "P"
}, {
  alphabet: "Q"
}, {
  alphabet: "R"
}, {
  alphabet: "S"
}, {
  alphabet: "T"
}, {
  alphabet: "U"
}, {
  alphabet: "V"
}, {
  alphabet: "W"
}, {
  alphabet: "X"
}, {
  alphabet: "Y"
}, {
  alphabet: "Z"
}];
;// CONCATENATED MODULE: ./src/hooks/lecturers/useCategories.hook.js





const useCategoriesHook = () => {
  const [categoriesdata, setCategoriesData] = (0,external_react_.useState)([]);
  const {
    data
  } = (0,react_query_namespaceObject.useQuery)(["categories"], () => lecturersApi.getCategories(), {
    onSuccess: data => {
      setCategoriesData([...category, ...data.slice(0, 15)]);
    },
    onError: error => {
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });
  return {
    data: categoriesdata
  };
};
;// CONCATENATED MODULE: ./src/hooks/lecturers/index.js



;// CONCATENATED MODULE: ./src/hooks/playlists/useAllPlaylist.hook.js




const useAllPlaylistHook = () => {
  const [playlistdata, setPlaylistData] = (0,external_react_.useState)({});
  const {
    data,
    isLoading
  } = (0,react_query_namespaceObject.useQuery)(["all-playlists"], () => playlistdetailApi.getAllPlaylists(), {
    onSuccess: data => {
      setPlaylistData(data);
    },
    onError: error => {
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });
  return {
    data: playlistdata,
    isLoading
  };
};
;// CONCATENATED MODULE: ./src/hooks/playlists/usePlaylistLectures.hook.js




const usePlaylistLectures = (keyName, keyParam = {}, queryFunction) => {
  const [querieddata, setQueriedData] = (0,external_react_.useState)([]);
  const {
    isLoading,
    data,
    error
  } = (0,react_query_namespaceObject.useQuery)([keyName, keyParam], () => queryFunction(keyParam), {
    enabled: !!keyParam.multiId,
    onSuccess: data => {
      setQueriedData(data);
    },
    onError: error => {
      external_react_hot_toast_namespaceObject.toast.error("Unable to load data");
    }
  });
  return {
    isLoading,
    isLectureId: keyParam.multiId,
    error,
    data,
    querieddata
  };
};
;// CONCATENATED MODULE: ./src/hooks/playlists/index.js


;// CONCATENATED MODULE: ./src/hooks/audio/useAudio.hook.js





const useAudioHook = id => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    data,
    refetch
  } = (0,react_query_namespaceObject.useQuery)(["audio", id], () => audioDetailApi.getAudio(id), {
    enabled: window.innerWidth > 615,
    onSuccess: data => {
      dispatch(getcurrentAudioInfo(data[0]));
    }
  });
  (0,external_react_.useEffect)(() => {
    if (window.innerWidth <= 615) {
      dispatch(getaudioId(id));
    }
  }, [id]);
  return {
    refetch
  };
};
;// CONCATENATED MODULE: ./src/hooks/audio/useSimilarAudio.hook.js



const useSimilarAudioHook = keyParam => {
  const [querieddata, setQueriedData] = (0,external_react_.useState)([]);
  const {
    data
  } = (0,react_query_namespaceObject.useQuery)(["similarAudios", keyParam], () => audioDetailApi.getSimilarAudio(keyParam), {
    enabled: !!keyParam?.id,
    onSuccess: data => {
      setQueriedData(data);
    },
    onError: error => {
      toast.error("Unable to load data");
    }
  });
  return {
    querieddata
  };
};
;// CONCATENATED MODULE: ./src/hooks/audio/index.js


;// CONCATENATED MODULE: ./src/hooks/moreview/moreView.hook.js




const useMoreViewHook = (keyParam, currentdata) => {
  const [querydata, setquerydata] = (0,external_react_.useState)([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = (0,external_react_.useState)(false);
  const [hasReachedLastPage, setHasReachedLastPage] = (0,external_react_.useState)(false);
  const {
    data,
    isLoading,
    error
  } = (0,react_query_namespaceObject.useQuery)(["more-view", keyParam], () => moreViewApi.moreDatas(keyParam), {
    enabled: !!keyParam.endpoint_url && !hasReachedLastPage,
    onSuccess: data => {
      setIsLoadingNextPage(false);

      // Ensure data is an array and has content
      const responseData = Array.isArray(data) ? data : [];

      // ensure subsequent requests are not sent when the last one doesn't have data
      if (!responseData || responseData.length === 0) {
        setHasReachedLastPage(true);
        return;
      }

      // Only append new data if it's a subsequent page
      if (keyParam.page === 1) {
        setquerydata(responseData);
      } else {
        setquerydata(prev => {
          // Ensure prev is an array
          const prevData = Array.isArray(prev) ? prev : [];

          // Filter out duplicates based on nid
          const newData = responseData.filter(item => !prevData.some(prevItem => prevItem.nid === item.nid));
          return [...prevData, ...newData];
        });
      }
    },
    onError: error => {
      setIsLoadingNextPage(false);
      external_react_hot_toast_default().error("Unable to load data");
    }
  });

  // handles when page changes
  (0,external_react_.useEffect)(() => {
    if (!keyParam.page) return;
    if (keyParam.page !== 1 && !hasReachedLastPage) {
      setIsLoadingNextPage(true);
    }
  }, [keyParam.page]);
  (0,external_react_.useEffect)(() => {
    if (!keyParam.endpoint_url) {
      // Ensure currentdata is an array
      setquerydata(Array.isArray(currentdata) ? currentdata : []);
      setHasReachedLastPage(true);
    } else {
      // Reset state when endpoint changes
      setquerydata([]);
      setHasReachedLastPage(false);
    }
  }, [keyParam.endpoint_url]);
  return {
    data: querydata,
    isLoading,
    error,
    isLoadingNextPage,
    isLastPage: hasReachedLastPage
  };
};
;// CONCATENATED MODULE: ./src/hooks/moreview/index.js

;// CONCATENATED MODULE: ./src/hooks/favorites/fetchFavorites.hook.js



const useFetchFavoritesHook = keyParam => {
  const [getFavsCount, setgetfavsCount] = (0,external_react_.useState)([]);
  const {
    data,
    refetch
  } = (0,react_query_namespaceObject.useQuery)(["fetch-favorites", keyParam], () => favoriteApi.getFavorites(keyParam), {
    enabled: !!keyParam.id,
    onSuccess: data => {
      setgetfavsCount(data);
    },
    onError: error => {}
  });
  return {
    favoriteCount: getFavsCount,
    refetch
  };
};
;// CONCATENATED MODULE: ./src/hooks/favorites/addToFavorites.hook.js


const useAddFavoritesHook = () => {
  return (0,react_query_namespaceObject.useMutation)(favoriteApi.addToFavorites);
};
;// CONCATENATED MODULE: ./src/hooks/favorites/index.js


;// CONCATENATED MODULE: ./src/hooks/lecture/useDownloadLecture.hook.js




const useDownloadLecture = lecid => {
  const {
    isLoading,
    data,
    error
  } = (0,react_query_namespaceObject.useQuery)(["lecture", "download", lecid], () => {
    const payload = {
      lecid: Number(lecid)
    };
    return lectureApi.downloadFile(payload);
  }, {
    enabled: !!lecid,
    onError: error => {
      external_react_hot_toast_default().error("Unable to load lecture file");
    }
  });
  const download = (0,external_react_.useCallback)(fileUrl => {
    window.open(fileUrl, "_blank");
  }, []);
  return {
    isLoading,
    error,
    data,
    download
  };
};
;// CONCATENATED MODULE: ./src/hooks/lecture/index.js

;// CONCATENATED MODULE: ./src/hooks/index.js










;// CONCATENATED MODULE: ./src/components/audioDownloadModal/AudioDownloadModal.jsx









const AudioDownloadModal = ({
  downloads,
  nid,
  triggerInnerChild,
  className = ""
}) => {
  const [showModal, setShowModal] = (0,external_react_.useState)();
  const [selectedFormat, setSelectedFormat] = (0,external_react_.useState)("mp3");
  const {
    data,
    isLoading,
    download
  } = useDownloadLecture(nid);
  const handleSubmit = e => {
    e.preventDefault();
    download(selectedFormat === "amr" ? data?.amr_url : data?.mp3_url);
  };
  const downloadOptions = (0,external_react_.useMemo)(() => [{
    format: "amr",
    urlKey: "amr_url"
  }, {
    format: "mp3",
    urlKey: "mp3_url"
  }], []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    onClick: e => {
      // preventing parent element from receiving click event from any of the children
      e.stopPropagation();
    },
    className: "text-foreground",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
      onClick: () => setShowModal(true),
      "aria-label": "Download audio",
      className: className,
      children: triggerInnerChild ? triggerInnerChild : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "audiodetail_download",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "audiodetail_download_text",
          children: formatNumber(downloads || 0)
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Modal, {
      show: showModal,
      onCloseCallback: () => setShowModal(false),
      modalTitle: "Download audio",
      modalDescription: "Select your preferred type of file",
      children: isLoading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "h-20 flex items-center justify-center",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "divide-y  w-full text-foreground",
          children: downloadOptions?.map(({
            format,
            urlKey
          }, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("label", {
            htmlFor: `${format}-download`,
            className: `px-5 py-4 lg:py-6 cursor-pointer ease-in-out duration-300  hover:bg-dncolor-500/10 flex justify-between items-center uppercase`,
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
              type: "radio",
              name: "download-option",
              id: `${format}-download`,
              value: format,
              onChange: e => setSelectedFormat(e.target.value),
              className: "hidden"
            }), data?.[urlKey] ? `${data?.[format + "_size"]} [${format}]` : "--", selectedFormat === format && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaCheckCircle, {
              className: "text-dncolor-500 text-2xl",
              "aria-hidden": "true"
            })]
          }, index))
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            type: "submit",
            className: "text-center bg-dncolor-500 hover:bg-dncolor-500/90 text-[#030303] py-4 lg:py-6 w-full mt-3",
            children: "Download"
          })
        })]
      })
    })]
  });
};
;// CONCATENATED MODULE: ./src/components/audio/audioActionDesktop.jsx





















const AudioActionDesktop = () => {
  const {
    currentUser,
    audioId,
    isrepeat,
    value,
    page,
    count,
    pack,
    playing
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const rangeRef = (0,external_react_.useRef)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    audioRef,
    setinitial,
    initial,
    loading,
    setLoading
  } = (0,external_react_.useContext)(AudioContext);
  const [isComplete, setIsComplete] = (0,external_react_.useState)(false);
  const playAnimation = (0,external_react_.useRef)();
  const [getFavs, setgetfavs] = (0,external_react_.useState)([]);
  const [addFav] = (0,external_react_.useState)(false);
  const [isEmpty] = (0,external_react_.useState)(false);
  const [, setIsPrevious] = (0,external_react_.useState)(false);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [currentaudio, setcurrentaudio] = (0,external_react_.useState)([]);
  const [isminimize, setminimize] = (0,external_react_.useState)(false);
  const [transition, settransition] = (0,external_react_.useState)(true);
  const [isloaded, setnotloaded] = (0,external_react_.useState)(true);
  const handleNextAudio = (0,external_react_.useCallback)(() => {
    setinitial(false);
    setIsPrevious(false);
    dispatch(setPlaying(false));
    setnotloaded(true);
    const next = pack?.findIndex(value => {
      return value.nid === parseInt(audioId);
    });
    if (!isEmpty && pack?.length - 1 - next <= 2) {
      dispatch(getPage(page + 1));
    }
    if (next === pack?.length - 1) {
      dispatch(getaudioId(pack[next]?.nid));
      dispatch(getCount(next));
    } else if (count < pack?.length - 1) {
      dispatch(getaudioId(pack[next + 1]?.nid));
      dispatch(getCount(next + 1));
    } else {
      dispatch(getaudioId(pack[0]?.nid));
      dispatch(getCount(0));
    }
  }, [audioId, count, dispatch, isEmpty, pack, page, setinitial]);
  const handlePreviousAudio = (0,external_react_.useCallback)(() => {
    setinitial(false);
    setnotloaded(true);
    dispatch(setPlaying(false));
    const prev = pack?.findIndex(value => {
      return value.nid === parseInt(audioId);
    });
    if (page > 1 && pack.length - 1 - prev <= pack.length - 1 - 2) {
      setIsPrevious(true);
      dispatch(getPage(page - 1));
    }
    if (prev === 0) {
      dispatch(getaudioId(pack[prev]?.nid));
      dispatch(getCount(prev));
    } else {
      dispatch(getaudioId(pack[prev - 1]?.nid));
      dispatch(getCount(prev - 1));
    }
  }, [audioId, dispatch, pack, page, setinitial]);
  const getMusic = audioId => {
    //dispatch(setPlaying(false));
    setLoading(true);
    ///get lecture audio
    useAxios.get(`/leclistingapi.php?lecid=${audioId}`).then(res => {
      setcurrentaudio(res.data[0]);
      dispatch(getcurrentAudioInfo(res.data[0]));
      setLoading(false);
      if (initial) {
        dispatch(setPlaying(false));
        audioRef.current?.pause();
        cancelAnimationFrame(playAnimation.current);
      } else {
        dispatch(setPlaying(true));
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              if (error.name === 'AbortError') {
                console.log('Play was aborted - this is normal when switching tracks');
              } else if (error.name === 'NotAllowedError') {
                console.log('Play not allowed - user interaction required');
                dispatch(setPlaying(false));
              } else {
                console.error('Playback failed:', error);
                dispatch(setPlaying(false));
                external_react_hot_toast_namespaceObject.toast.error('Playback failed. Please try again.');
              }
            });
          }
          playAnimation.current = requestAnimationFrame(repeat);
        }
      }
    }).catch(err => {});
  };
  (0,external_react_.useEffect)(() => {
    if (!audioId) {
      return;
    }
    getMusic(audioId);
  }, [audioId]);
  const repeat = (0,external_react_.useCallback)(() => {
    let currentTime = audioRef?.current?.currentTime;
    dispatch(getValue(currentTime));
    currentTime = rangeRef?.current?.value;
    playAnimation.current = requestAnimationFrame(repeat);
  }, [audioRef, getValue, rangeRef]);
  (0,external_react_.useEffect)(() => {
    playAnimation.current = requestAnimationFrame(repeat);
    handleRange(audioRef?.current?.currentTime);
  }, [audioRef, repeat]);
  (0,external_react_.useEffect)(() => {
    if (!currentUser) return;
    const payload = {
      action: "post_recent",
      audio_id: audioId,
      user_id: currentUser?.id
    };
    async function postRecent() {
      if (audioId) {
        await useAxios.post(`/recentApi.php`, payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
          }
        });
      }
    }
    postRecent();
  }, [audioId]);
  //************ */

  (0,external_react_.useEffect)(() => {
    if (playing && !initial) {
      const startPlayback = async () => {
        try {
          // Handle mobile audio context
          let audioContext;
          if (window.AudioContext || window.webkitAudioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === "suspended") {
              await audioContext.resume();
            }
          }

          // Configure audio element for mobile
          if (audioRef.current) {
            // Essential mobile attributes
            audioRef.current.setAttribute("playsinline", "true");
            audioRef.current.setAttribute("webkit-playsinline", "true");
            audioRef.current.setAttribute("x-webkit-airplay", "allow");
            audioRef.current.setAttribute("preload", "auto");
            // Prevent auto-pause on mobile
            audioRef.current.setAttribute("data-keepalive", "true");

            // Mobile-specific settings
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
              audioRef.current.volume = 1.0; // Ensure full volume on mobile
              // Enable background playback for iOS
              try {
                await audioRef.current.play();
                audioRef.current.pause();
              } catch (e) {
                console.log("Initial play-pause setup failed:", e);
              }
            }
          }

          // Ensure audio element is ready
          if (!audioRef.current.readyState) {
            await new Promise(resolve => {
              audioRef.current.addEventListener("loadedmetadata", resolve, {
                once: true
              });
            });
          }

          // Handle mobile wake lock with retry
          let wakeLock = null;
          const acquireWakeLock = async (retries = 3) => {
            for (let i = 0; i < retries; i++) {
              try {
                if ("wakeLock" in navigator) {
                  wakeLock = await navigator.wakeLock.request("screen");
                  break;
                }
              } catch (err) {
                console.log(`Wake Lock error attempt ${i + 1}:`, err);
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
          };
          await acquireWakeLock();

          // Start playback with mobile considerations
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            playAnimation.current = requestAnimationFrame(repeat);
          }

          // Set up MediaSession API for mobile controls with enhanced metadata
          if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: currentaudio?.title || "Audio Track",
              artist: currentaudio?.rpname || "Unknown Artist",
              album: "Islamic Lecture",
              artwork: [{
                src: currentaudio?.image || lazysong_namespaceObject,
                sizes: "512x512",
                type: "image/jpeg"
              }]
            });

            // Enhanced mobile controls
            navigator.mediaSession.setActionHandler("play", async () => {
              try {
                if (audioRef.current) {
                  await audioRef.current.play();
                  dispatch(setPlaying(true));
                }
              } catch (error) {
                if (error.name === 'AbortError') {
                  console.log('Media session play was aborted - this is normal');
                } else if (error.name !== 'NotAllowedError') {
                  console.error("Mobile play failed:", error);
                }
              }
            });
            navigator.mediaSession.setActionHandler("pause", () => {
              audioRef.current?.pause();
              dispatch(setPlaying(false));
            });

            // Mobile-optimized seek controls
            navigator.mediaSession.setActionHandler("seekbackward", () => {
              const skipTime = 10;
              const newTime = Math.max(audioRef.current.currentTime - skipTime, 0);
              audioRef.current.currentTime = newTime;
              handleRange(newTime);
            });
            navigator.mediaSession.setActionHandler("seekforward", () => {
              const skipTime = 10;
              const newTime = Math.min(audioRef.current.currentTime + skipTime, audioRef.current.duration);
              audioRef.current.currentTime = newTime;
              handleRange(newTime);
            });
            navigator.mediaSession.setActionHandler("previoustrack", handlePreviousAudio);
            navigator.mediaSession.setActionHandler("nexttrack", handleNextAudio);

            // Add position state for better lock screen display
            if (navigator.mediaSession.setPositionState) {
              navigator.mediaSession.setPositionState({
                duration: audioRef.current.duration,
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime
              });
            }
          }
        } catch (error) {
          console.error("Playback failed:", error);
          dispatch(setPlaying(false));

          // Handle specific error for interrupted play requests
          if (error.message && error.message.includes("The play() request was interrupted")) {
            console.log("Audio playback was interrupted by navigation or loading a new track");
            // Don't show error toast for this specific error as it's usually due to normal navigation
          } else {
            external_react_hot_toast_namespaceObject.toast.error("Playback failed. Please try again.");
          }
        }
        return () => {
          if (wakeLock) {
            wakeLock.release().catch(console.error);
          }
          if (audioContext) {
            audioContext.close().catch(console.error);
          }
        };
      };
      startPlayback();

      // Mobile-optimized visibility handling
      const handleVisibilityChange = () => {
        // On mobile, only attempt to resume if we were playing
        if (!document.hidden && playing && !initial && audioRef.current) {
          audioRef.current.play().catch(error => {
            if (error.name === 'AbortError') {
              console.log('Visibility resume was aborted - this is normal');
            } else if (error.name !== "NotAllowedError") {
              console.error("Resume failed:", error);

              // Don't show error for interrupted play requests during visibility changes
              if (!error.message || !error.message.includes("The play() request was interrupted")) {
                external_react_hot_toast_namespaceObject.toast.error("Resume failed. Please try again.");
              }
            }
          });
        }
      };

      // Handle audio focus for Android
      const handleAudioFocus = async () => {
        if (playing && !initial && audioRef.current) {
          try {
            await audioRef.current.play();
          } catch (error) {
            if (error.name === 'AbortError') {
              console.log('Focus resume was aborted - this is normal');
            } else if (error.name !== "NotAllowedError") {
              console.error("Focus resume failed:", error);
            }
          }
        }
      };

      // Mobile interruption handlers
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleAudioFocus);

      // Handle mobile-specific interruptions
      window.addEventListener("pagehide", () => {
        // Save current playback state before page hide
        if (audioRef.current) {
          localStorage.setItem("audioPosition", audioRef.current.currentTime);
          localStorage.setItem("wasPlaying", playing);
        }
      });
      window.addEventListener("pageshow", () => {
        // Restore playback state after page show
        const savedPosition = localStorage.getItem("audioPosition");
        const wasPlaying = localStorage.getItem("wasPlaying") === "true";
        if (savedPosition && audioRef.current) {
          audioRef.current.currentTime = parseFloat(savedPosition);
          if (wasPlaying) {
            audioRef.current.play().catch(error => {
              if (error.name === 'AbortError') {
                console.log('Page show resume was aborted - this is normal');
              } else if (error.name !== "NotAllowedError") {
                console.error("Page show resume failed:", error);
              }
            });
          }
        }
      });
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("focus", handleAudioFocus);
        window.removeEventListener("pagehide", () => {});
        window.removeEventListener("pageshow", () => {});
        if (playAnimation.current) {
          cancelAnimationFrame(playAnimation.current);
        }
      };
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        if (playAnimation.current) {
          cancelAnimationFrame(playAnimation.current);
        }
      }
    }
  }, [playing, initial, currentaudio, dispatch, repeat, handlePreviousAudio, handleNextAudio]);
  const handlePlay = async () => {
    // Prevent rapid clicking during loading
    if (loading) {
      return;
    }
    setinitial(false);
    if (playing) {
      dispatch(setPlaying(false));
      audioRef.current?.pause(); // Pause the audio
    } else {
      dispatch(setPlaying(true));

      // Handle play promise properly to prevent interruption errors
      if (audioRef.current) {
        try {
          // Stop any existing play promise first
          audioRef.current.pause();
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (error) {
          // Handle specific play() errors
          if (error.name === 'AbortError') {
            console.log('Play was aborted - this is normal when switching tracks');
          } else if (error.name === 'NotAllowedError') {
            console.log('Play not allowed - user interaction required');
            dispatch(setPlaying(false));
          } else {
            console.error('Play failed:', error);
            dispatch(setPlaying(false));
          }
        }
      }
    }
  };
  const shareAudio = () => {
    setisShare(!isShare);
  };
  const handleRange = curr => {
    dispatch(getValue(curr));
    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };
  (0,external_react_.useEffect)(() => {
    if (isrepeat === false && isComplete) {
      const counter = pack?.findIndex(value => {
        return value.nid === audioId;
      });
      if (counter === pack.length - 1) {
        dispatch(getaudioId(pack[0]?.nid));
        dispatch(getCount(0));
      } else {
        handleNextAudio();
      }
      return;
    } else {
      getMusic(audioId);
      dispatch(getValue(0));
      audioRef.current.currentTime = 0;
      return;
    }
  }, [isComplete]);
  const addToPlaylist = () => {
    dispatch(getLecid(audioId));
    dispatch(showaddPlaylist(true));
  };

  /////get users favorites
  async function fetchFavorites(addFav, audioId) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && audioId) {
      await useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        const {
          audio
        } = res.data;
        setgetfavs(Object.values(audio));
      }).catch(err => {});
    }
  }
  (0,external_react_.useEffect)(() => {
    fetchFavorites(addFav, audioId);
  }, [addFav, audioId]);
  ///add to favourites

  const addToFav = async () => {
    /// add to favorites
    if (!audioId) {
      external_react_hot_toast_namespaceObject.toast.error("No audio to add to favorites");
      return;
    }
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: audioId,
      type: "audio"
    };
    await useAxios.post(`/leclisting_favorites.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
    }).catch(err => {});
  };
  function handleState() {
    setnotloaded(false);
  }
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: `fixed bg-background z-[60]  bottom-0 flex items-center gap-4  transform  cursor-pointer ${isminimize ? `w-[220px] h-[60px] bg-black right-0 transition-all duartion-300` : `w-full h-[80px] left-0 right-0`}`,
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: isminimize ? "hidden" : "range_progress",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          style: {
            width: `${value * 100 / audioRef?.current?.duration}%`
          },
          className: "audiodet_bar"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          ref: rangeRef,
          type: "range",
          min: 0,
          max: audioRef.current?.duration || 100,
          value: value || 0,
          onChange: e => {
            handleRange(e.target.value);
          },
          className: "audiodet_scroll_bar"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("audio", {
        ref: audioRef,
        src: currentaudio?.audio,
        onLoadedData: handleState,
        onTimeUpdate: () => {
          if (audioRef.current && !audioRef.current?.seeking) {
            dispatch(getValue(audioRef?.current?.currentTime));
            setIsComplete(Math.floor(audioRef?.current?.currentTime) >= Math.floor(audioRef?.current?.duration));
          }
          if (Math.floor(audioRef.current?.currentTime) >= Math.floor(audioRef.current?.duration)) {
            dispatch(setPlaying(false));
            audioRef?.current?.pause();
          }
        }
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: `flex items-center relative bg-background text-foreground w-full ${isminimize ? "justify-center" : "justify-between"}`,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: ` items-center gap-[8px] ${isminimize ? "notvisibles" : "visibles flex"}`,
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "w-[60px] h-[60px] rounded-[8px]",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "w-full h-full rounded-[8px]",
              src: currentaudio?.img || lazysong_namespaceObject,
              alt: "disk"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex flex-col items-start justify-start ",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                navigate(`${LECTURE}${audioId}`);
              },
              className: "font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px]  lg:max-w-[250px]  xl:max-w-[270px]",
              children: currentaudio?.title || currentaudio?.Title || "----------------"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: e => {
                e.stopPropagation();
                navigate(`${RESOURCE_PERSON}${currentaudio?.rp_id}`);
              },
              className: "font-semibold text-[12px] whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] lg:max-w-[250px]  xl:max-w-[270px]",
              children: currentaudio?.rpname || "----------------"
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "flex gap-4 items-center",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: handlePreviousAudio,
            id: "player",
            className: "audiodet_play_btn",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(tb_namespaceObject.TbPlayerSkipBackFilled, {
              className: "text-color text-[20px] hover:text-color-foreground dark:hover:text-[#ddff2b] "
            })
          }), loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(audioLoader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
            onClick: handlePlay,
            disabled: isloaded,
            className: "relative flex h-[42px] w-[42px] dark:text-black text-gray-100 rounded-full dark:bg-[#ddff2b] bg-gray-500 justify-center items-center",
            children: [!playing ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
              id: "player",
              className: "text-[22px]"
            }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(gi_namespaceObject.GiPauseButton, {
              className: "text-[22px]"
            }), isloaded && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "absolute rounded-full inset-0 h-[45px] w-[45px] border-r border-b border-gray-200 animate-spin"
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: handleNextAudio,
            id: "player",
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(tb_namespaceObject.TbPlayerSkipForwardFilled, {
              className: "text-color text-[20px] hover:text-color-foreground dark:hover:text-[#ddff2b]"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: `cursor-pointer  items-center gap-[1.5rem] ${isminimize ? "notvisibles" : "visibles hidden md:flex"}`,
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            disabled: !audioId,
            onClick: () => {
              dispatch(getRepeat(!isrepeat));
            },
            className: "h-[20px] w-[20px]  text-color hover:text-color-foreground dark:hover:text-[#ddff2b]",
            children: isrepeat ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RepeatedIcon, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RepeatIcon, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
            nid: audioId,
            className: "h-[20px] w-[20px]  text-color hover:text-color-foreground dark:hover:text-[#ddff2b]",
            triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: () => {
              addToFav();
            },
            className: "h-[20px] w-[20px] ",
            disabled: !audioId,
            children: getFavs?.includes(parseInt(audioId)) ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddedFavourites, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddFavourites, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: () => {
              shareAudio();
            },
            disabled: !audioId,
            className: "h-[20px] w-[20px]",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
              className: " hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: () => {
              addToPlaylist();
            },
            disabled: !audioId,
            className: "audiodet_play_add  hover:text-color-foreground dark:hover:text-[#ddff2b]",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddplayIcon, {})
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: `absolute top-1 right-10 ${isminimize ? "notvisibles" : "visibles"}`,
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "text-[13px] text-zinc-500",
            children: playTimingDesktop(audioRef?.current?.currentTime, audioRef?.current?.duration)
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: () => {
            setminimize(!isminimize);
            settransition(!transition);
          },
          className: `w-[30px]  flex items-center bg-zinc-500 justify-center ${isminimize ? "absolute right-0 top-0 h-[60px]" : "h-[70px]"}`,
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlArrowDown, {
            className: "text-white text-[15px] "
          })
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: isShare ? "block" : "hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
        isShare: isShare,
        setisShare: setisShare,
        nid: audioId,
        type: "audio"
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddPlaylist, {})]
  });
};
/* harmony default export */ const audioActionDesktop = (AudioActionDesktop);
;// CONCATENATED MODULE: ./src/components/layout/Layout.jsx




















const NavContext = /*#__PURE__*/(0,external_react_.createContext)();
const Layout = () => {
  const {
    currentAudioInfo,
    playing,
    audioId,
    value
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const rangeRef = (0,external_react_.useRef)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const location = (0,external_react_router_dom_namespaceObject.useLocation)();
  const [isOpen, setisOpen] = (0,external_react_.useState)(false);
  const {
    audioRef,
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const islayout = true;
  const [res, setRes] = (0,external_react_.useState)(() => {
    return Number(localStorage.getItem("navControl")) || (window.innerWidth > 890 ? 2 : 1);
  });
  (0,external_react_.useEffect)(() => {
    localStorage.setItem("navControl", JSON.stringify(res));
    const handleResize = () => {
      if (window.innerWidth <= 890) {
        setRes(1);
      } else {
        setRes(2);
      }
    };
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [res]);
  (0,external_react_.useEffect)(() => {
    const handleRouteChange = () => {
      const newPath = location.pathname;
      const isLecturePath = newPath.includes("/dawahcast/l/");
      const newLectureId = isLecturePath ? newPath.split("/").pop() : null;

      // Defensive: Only call .toString() if audioId is not null/undefined
      const audioIdStr = audioId !== undefined && audioId !== null ? audioId.toString() : null;
      if (isLecturePath && newLectureId && audioIdStr && newLectureId !== audioIdStr) {
        try {
          audioRef.current?.pause();
          audioRef.current.currentTime = 0;
          dispatch(setPlaying(false));
          setinitial(true);
        } catch (error) {
          console.error("Error cleaning up audio:", error);
        }
      }
    };
    handleRouteChange();
  }, [location.pathname, audioId]);
  (0,external_react_.useEffect)(() => {
    const setupAudioContext = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.setAttribute("playsinline", "true");
          audioRef.current.setAttribute("webkit-playsinline", "true");
          audioRef.current.setAttribute("autoplay", "false");
          audioRef.current.setAttribute("x-webkit-airplay", "allow");
          audioRef.current.setAttribute("preload", "auto");
          if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("play", () => {
              if (audioRef.current) {
                audioRef.current.play().catch(error => {
                  if (error.name === 'AbortError') {
                    console.log('Media session play was aborted - this is normal');
                  } else if (error.name !== 'NotAllowedError') {
                    console.error('Media session play failed:', error);
                  }
                });
                dispatch(setPlaying(true));
              }
            });
            navigator.mediaSession.setActionHandler("pause", () => {
              audioRef.current?.pause();
              dispatch(setPlaying(false));
            });
            if (currentAudioInfo) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: currentAudioInfo.title || currentAudioInfo.Title || "Unknown",
                artist: currentAudioInfo.rpname || "Unknown Artist",
                artwork: [{
                  src: currentAudioInfo.img || IMAGE_PLACEHOLDERS.lecture,
                  sizes: "512x512",
                  type: "image/jpeg"
                }]
              });
            }
          }
        } catch (error) {
          console.error("Error setting up audio:", error);
        }
      }
    };
    setupAudioContext();
  }, [audioRef, currentAudioInfo, dispatch]);
  const handleRangeChange = e => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
    }
  };
  const handlePlay = async () => {
    if (playing) {
      audioRef.current?.pause();
      dispatch(setPlaying(false));
    } else {
      try {
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentAudioInfo?.title || "Unknown Title",
            artist: currentAudioInfo?.rpname || "Unknown Artist",
            artwork: [{
              src: currentAudioInfo?.img || "",
              sizes: "512x512",
              type: "image/jpeg"
            }]
          });
        }

        // Request audio focus if possible
        if ("audioFocus" in navigator) {
          try {
            await navigator.audioFocus.request({
              audioType: "media",
              allowDucking: true
            });
          } catch (error) {
            console.log("Audio focus request failed:", error);
          }
        }
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            dispatch(setPlaying(true));
            setinitial(false);

            // Set audio element attributes to allow background playback
            if (audioRef.current) {
              audioRef.current.setAttribute("x-webkit-airplay", "allow");
              audioRef.current.setAttribute("preload", "auto");
              audioRef.current.setAttribute("webkit-playsinline", "true");
              audioRef.current.setAttribute("playsinline", "true");
            }
          }).catch(error => {
            if (error.name === 'AbortError') {
              console.log('Play was aborted - this is normal when switching tracks');
            } else if (error.name === 'NotAllowedError') {
              console.log('Play not allowed - user interaction required');
              dispatch(setPlaying(false));
            } else {
              console.error("Playback failed:", error);
              dispatch(setPlaying(false));

              // Handle specific error for interrupted play requests
              if (error.message && error.message.includes("The play() request was interrupted")) {
                console.log("Audio playback was interrupted by navigation or loading a new track");
                // Don't show error toast for this specific error as it's usually due to normal navigation
              } else {
                // Only show error toast for other types of errors
                external_react_hot_toast_namespaceObject.toast.error("Playback failed. Please try again.");
              }
            }
          });
        }
      } catch (error) {
        console.error("Play error:", error);
        dispatch(setPlaying(false));

        // Handle specific error for interrupted play requests
        if (error.message && error.message.includes("The play() request was interrupted")) {
          console.log("Audio playback was interrupted by navigation or loading a new track");
        } else {
          external_react_hot_toast_namespaceObject.toast.error("Playback failed. Please try again.");
        }
      }
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "layout_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      onClick: e => {
        e.stopPropagation();
        setisOpen(false);
      },
      className: `layout_sidenav ${res === 2 ? "layout_sidenav_open" : `layout_sidenav_close let swipeInLeft ${isOpen ? "show" : "hide"}`}`,
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "layout_mini",
        onClick: e => e.stopPropagation(),
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sideNav_SideNav, {
          res: res,
          setisOpen: setisOpen
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: `layout_outlet bg-primary`,
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(NavContext.Provider, {
        value: {
          res,
          setRes,
          setisOpen,
          isOpen
        },
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Outlet, {})
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "layout_buttom_menue bg-background",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "layout_buttom_menue1",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "range_progress",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            style: {
              width: `${value * 100 / audioRef?.current?.duration}%`
            },
            className: "audio_mob_bar dark:bg-[#ddff2b] bg-muted"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            ref: rangeRef,
            type: "range",
            min: "0",
            max: audioRef?.current?.duration ? Math.floor(audioRef.current.duration) : "100",
            value: value || 0,
            onChange: handleRangeChange,
            className: ""
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: () => {
            navigate(`${LECTURE}${audioId}`, {
              state: {
                layout: islayout
              }
            });
          },
          className: "curr_lect_img",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            className: "curr_lect_img_sz",
            src: currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture,
            alt: "disk"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("marquee", {
          direction: "left",
          loop: "5",
          className: "layout_buttom_text_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "layout_buttom_text1 text-color",
            children: currentAudioInfo?.title || currentAudioInfo?.Title
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "layout_buttom_text2 text-color",
            children: currentAudioInfo?.rpname
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: () => {
            setisShare(!isShare);
          },
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiShareAlt, {
            className: "layout_buttom_share text-color"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: handlePlay,
          className: "layout_buttom_play_wrap dark:bg-[#ddff2b] bg-gray-500",
          children: !playing ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
            className: "layout_buttom_play_icon dark:text-black text-gray-100"
          }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(gi_namespaceObject.GiPauseButton, {
            className: "layout_play_icon dark:text-black text-gray-100"
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "layout_buttom_menue2 px-6 py-2",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate("/");
          },
          className: "layout_buttom_menue2_home",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaHome, {
            className: location.pathname === "/" ? "layout_buttom_menue2_homeIcon_active dark:text-[#ddff2b] text-color-foreground" : "layout_buttom_menue2_homeIcon text-color"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: location.pathname === "/" ? "layout_buttom_menue2_homeText_active font-semibold dark:text-[#ddff2b] text-color-foreground" : "layout_buttom_menue2_homeText text-color",
            children: "Home"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(LIBRARY);
          },
          className: "layout_buttom_menue2_library",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(si_namespaceObject.SiApplemusic, {
            className: location.pathname === LIBRARY ? "layout_buttom_menue2_libraryIcon_active dark:text-[#ddff2b] text-color-foreground" : "layout_buttom_menue2_libraryIcon text-color"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: location.pathname === LIBRARY ? "layout_buttom_menue2_libraryText_active dark:text-[#ddff2b] text-color-foreground font-semibold" : "layout_buttom_menue2_libraryText text-color",
            children: "Library"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(FAVOURITE);
          },
          className: "layout_buttom_menue2_favourite",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdFavorite, {
            className: location.pathname === FAVOURITE ? "layout_buttom_menue2_favouriteIcon_active dark:text-[#ddff2b] text-color-foreground" : "layout_buttom_menue2_favouriteIcon text-color"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: location.pathname === FAVOURITE ? "layout_buttom_menue2_favouriteText_active dark:text-[#ddff2b] text-color-foreground font-semibold" : "layout_buttom_menue2_favouriteText text-color",
            children: "Favorites"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(DOWNLOAD);
          },
          className: "layout_buttom_menue2_download",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdDownload, {
            className: location.pathname === DOWNLOAD ? "layout_buttom_menue2_downloadIcon_active dark:text-[#ddff2b] text-color-foreground" : "layout_buttom_menue2_downloadIcon text-color"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: location.pathname === DOWNLOAD ? "layout_buttom_menue2_downloadText_active dark:text-[#ddff2b] text-color-foreground font-semibold" : "layout_buttom_menue2_downloadText text-color",
            children: "Download"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(audioActionDesktop, {}), isShare && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
      isShare: isShare,
      setisShare: setisShare,
      nid: audioId,
      type: "audio"
    })]
  });
};
/* harmony default export */ const layout_Layout = (Layout);
;// CONCATENATED MODULE: external "react-icons/gr"
const gr_namespaceObject = require("react-icons/gr");
;// CONCATENATED MODULE: ./src/components/comingsoon/comingSoon.jsx




const ComingSoon = ({
  comingSoon,
  setcomingSoon
}) => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    "aria-hidden": "true",
    onClick: e => {
      e.stopPropagation();
      setcomingSoon(!comingSoon);
    },
    className: "w-full h-full z-[300] bg-none inset-0 fixed",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      "aria-hidden": "true",
      onClick: e => {
        e.stopPropagation();
      },
      className: "absolute inset-0 m-auto bg-background shadow-lg py-6 space-y-6  flex-col text-foreground rounded-md w-[80%] min-[615px]:w-[350px] h-[250px] flex items-center justify-center",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        "aria-hidden": "true",
        onClick: e => {
          e.stopPropagation();
          setcomingSoon(!comingSoon);
        },
        className: "absolute right-[-3px] top-[-3px] rounded-full p-1 bg-[#333]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(gr_namespaceObject.GrFormClose, {
          className: "text-[25px] text-gray-300"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "min-[615px]:text-3xl text-2xl",
        children: "Coming soon"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaLightbulb, {
        className: "text-[#ddff2b] text-4xl min-[615px]:text-5xl"
      })]
    })
  });
};
/* harmony default export */ const comingsoon_comingSoon = (ComingSoon);
;// CONCATENATED MODULE: ./src/components/nav/Nav.jsx











const Nav = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const location = (0,external_react_router_dom_namespaceObject.useLocation)();
  const {
    setRes,
    setisOpen
  } = (0,external_react_.useContext)(NavContext);
  const handleSideBar = () => {
    setRes(1);
    /**
    if (res === 1) {
      setRes(2);
    } else {
      setRes(1);
    }
    */
    setisOpen(true);
  };
  const [showComingSoon, setShowComingSoon] = (0,external_react_.useState)(false);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "nav_container bg-search dark:border-b-0 border-b",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "nav_wrapper",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "nav_logo",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiMenu, {
            onClick: () => {
              handleSideBar();
            },
            className: "nav_res_hamburger text-color"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              navigate("/");
            },
            className: "nav_logo",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "logo_img",
              src: dn_logo_namespaceObject,
              alt: "logo"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "hide"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "nav_search",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(search_Search, {})
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "hide"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "nav_download",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "nav_download1",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: process.env.REACT_APP_GOOGLE_PLAY_URL,
              "aria-label": "Download app on Google play",
              onClick: e => {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setShowComingSoon(prev => !prev);
              },
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                src: googleplay_namespaceObject,
                alt: ""
              })
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "nav_download2",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: process.env.REACT_APP_APPLE_STORE_URL,
              "aria-label": "Download app on Applestore",
              onClick: e => {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                setShowComingSoon(prev => !prev);
              },
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                src: apple_namespaceObject,
                alt: ""
              })
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "nav_res_download_wrapper bg-background text-color border border-border",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            className: "nav_res_download",
            onClick: () => {
              setShowComingSoon(prev => !prev);
            },
            children: "Get app"
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "max-[615px]:block hidden mt-2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(search_Search, {})
      })]
    }), showComingSoon && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comingsoon_comingSoon, {
      comingSoon: showComingSoon,
      setcomingSoon: setShowComingSoon
    })]
  });
};
/* harmony default export */ const nav_Nav = (Nav);
;// CONCATENATED MODULE: ./src/components/footer/footermodals/explore.jsx





const Explore = () => {
  const [isShow, setshow] = (0,external_react_.useState)(false);
  const links = [{
    to: LECTURERS,
    text: "Rp"
  }, {
    to: TRENDING,
    text: "Trending Lectures"
  }, {
    to: NEW,
    text: "New Lectures"
  }, {
    to: CHARTS,
    text: "Charts"
  }, {
    to: VIDEO,
    text: "Videos"
  }];
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "flex flex-col space-y-6",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex justify-between items-center w-full",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h2", {
        className: "text-xl font-medium text-zinc-100",
        children: "Explore"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: () => setshow(!isShow),
        className: "min-[450px]:hidden",
        "aria-label": isShow ? "Collapse menu" : "Expand menu",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: `text-zinc-100 text-2xl transition-transform duration-200 ${isShow ? "-rotate-90" : "rotate-90"}`
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: `space-y-4 min-[450px]:block ${isShow ? "block" : "hidden"}`,
      children: links.map(({
        to,
        text
      }) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
        to: to,
        className: "block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200",
        children: text
      }, to))
    })]
  });
};
/* harmony default export */ const explore = (Explore);
;// CONCATENATED MODULE: ./src/components/footer/footermodals/forUser.jsx





const ForUser = () => {
  const [isShow, setshow] = (0,external_react_.useState)(false);
  const [comingSoon, setcomingSoon] = (0,external_react_.useState)(false);
  const links = [{
    text: "Download",
    onClick: () => setcomingSoon(true)
  }, {
    text: "Help Centre",
    onClick: () => setcomingSoon(true)
  }, {
    text: "Login/Signup",
    to: "/auth/login"
  }, {
    text: "Playlist",
    to: "/playlist"
  }];
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex flex-col space-y-6",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex justify-between items-center w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h2", {
          className: "text-xl font-medium text-zinc-100",
          children: "For Users"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => setshow(!isShow),
          className: "min-[450px]:hidden",
          "aria-label": isShow ? "Collapse menu" : "Expand menu",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
            className: `text-zinc-100 text-2xl transition-transform duration-200 ${isShow ? "-rotate-90" : "rotate-90"}`
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: `space-y-4 min-[450px]:block ${isShow ? "block" : "hidden"}`,
        children: links.map((link, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          children: link.to ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
            to: link.to,
            className: "block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200",
            children: link.text
          }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: link.onClick,
            className: "block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200",
            children: link.text
          })
        }, index))
      })]
    }), comingSoon && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comingsoon_comingSoon, {
      comingSoon: comingSoon,
      setcomingSoon: setcomingSoon
    })]
  });
};
/* harmony default export */ const forUser = (ForUser);
;// CONCATENATED MODULE: ./src/components/footer/footermodals/forRps.jsx




const ForRp = () => {
  const [isShow, setshow] = (0,external_react_.useState)(false);
  const [comingSoon, setcomingSoon] = (0,external_react_.useState)(false);
  const links = [{
    text: "RP Portal"
  }, {
    text: "RP CR"
  }, {
    text: "RP FAQ"
  }];
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex flex-col space-y-6",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex justify-between items-center w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h2", {
          className: "text-xl font-medium text-zinc-100",
          children: "For Rp"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => setshow(!isShow),
          className: "min-[450px]:hidden",
          "aria-label": isShow ? "Collapse menu" : "Expand menu",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
            className: `text-zinc-100 text-2xl transition-transform duration-200 ${isShow ? "-rotate-90" : "rotate-90"}`
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: `space-y-4 min-[450px]:block ${isShow ? "block" : "hidden"}`,
        children: links.map((link, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => setcomingSoon(true),
          className: "block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200",
          children: link.text
        }, index))
      })]
    }), comingSoon && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comingsoon_comingSoon, {
      comingSoon: comingSoon,
      setcomingSoon: setcomingSoon
    })]
  });
};
/* harmony default export */ const forRps = (ForRp);
;// CONCATENATED MODULE: ./src/components/footer/footermodals/company.jsx




const Company = () => {
  const [isShow, setshow] = (0,external_react_.useState)(false);
  const [comingSoon, setcomingSoon] = (0,external_react_.useState)(false);
  const links = [{
    text: "About"
  }, {
    text: "Contact"
  }, {
    text: "Advertising"
  }, {
    text: "News"
  }, {
    text: "Visual Identity"
  }];
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex flex-col space-y-6",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex justify-between items-center w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h2", {
          className: "text-xl font-medium text-zinc-100",
          children: "Company"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => setshow(!isShow),
          className: "min-[450px]:hidden",
          "aria-label": isShow ? "Collapse menu" : "Expand menu",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
            className: `text-zinc-100 text-2xl transition-transform duration-200 ${isShow ? "-rotate-90" : "rotate-90"}`
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: `space-y-4 min-[450px]:block ${isShow ? "block" : "hidden"}`,
        children: links.map((link, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => setcomingSoon(true),
          className: "block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200",
          children: link.text
        }, index))
      })]
    }), comingSoon && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comingsoon_comingSoon, {
      comingSoon: comingSoon,
      setcomingSoon: setcomingSoon
    })]
  });
};
/* harmony default export */ const company = (Company);
;// CONCATENATED MODULE: ./src/components/footer/Footer.jsx













const Footer = () => {
  const [showComingSoon, setShowComingSoon] = (0,external_react_.useState)(false);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("footer", {
      className: "footer_wrapper text-color bg-footer px-6 sm:px-8 pt-12 max-[500px]:pb-[9rem] pb-24",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "max-w-7xl mx-auto",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "grid w-full max-[450px]:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(explore, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(forUser, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(forRps, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(company, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex space-y-6 sm:col-span-2 flex-col justify-start items-start",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "w-full flex items-center space-x-4",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
                to: process.env.REACT_APP_APPLE_STORE_URL,
                "aria-label": "Download app on Applestore",
                onClick: e => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon(true);
                },
                className: "transition-transform hover:scale-105",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "h-[40px]",
                  src: apple_namespaceObject,
                  alt: "Download on App Store"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
                to: process.env.REACT_APP_GOOGLE_PLAY_URL,
                "aria-label": "Download app on Google play",
                onClick: e => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon(true);
                },
                className: "transition-transform hover:scale-105",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "h-[40px]",
                  src: googleplay_namespaceObject,
                  alt: "Get it on Google Play"
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-4 py-3 w-full",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(SocialLink, {
                href: "https://web.facebook.com/dawahnigeria",
                icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaFacebook, {})
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(SocialLink, {
                href: "https://twitter.com/dawahnigeria",
                icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineTwitter, {})
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(SocialLink, {
                href: "https://www.instagram.com/dawahnigeria/",
                icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillInstagram, {})
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(SocialLink, {
                href: "https://www.youtube.com/@DawahNigeria",
                icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaYoutube, {})
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "py-6 mt-8 border-t border-zinc-700/50",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-2 text-sm text-zinc-400",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineCopyrightCircle, {
              className: "text-lg"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: new Date().getFullYear()
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: "Dawah Nigeria. All rights reserved."
            })]
          })
        })]
      })
    }), showComingSoon && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comingsoon_comingSoon, {
      comingSoon: showComingSoon,
      setcomingSoon: setShowComingSoon
    })]
  });
};

// Social Link Component
const SocialLink = ({
  href,
  icon
}) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
  to: href,
  className: "group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300",
  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "text-2xl text-zinc-400 group-hover:text-[#ddff2b] transition-colors duration-300",
    children: icon
  })
});
/* harmony default export */ const footer_Footer = (Footer);
;// CONCATENATED MODULE: ./src/components/container/Container.jsx





const Container = ({
  children
}) => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "container_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(nav_Nav, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "container_child bg-primary-foreground",
      children: children
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(footer_Footer, {})]
  });
};
/* harmony default export */ const container_Container = (Container);
;// CONCATENATED MODULE: ./src/components/landingWidget/LandingWidget.jsx










const LandingWidget = ({
  categories,
  img,
  views,
  nid,
  styling,
  rpname
}) => {
  const formattedViews = (0,external_react_.useMemo)(() => formatNumber(views), [views]);
  const {
    audioRef,
    setinitial,
    loading
  } = (0,external_react_.useContext)(AudioContext);
  const dispatch = (0,external_react_redux_.useDispatch)();
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#song");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
    lazyImage();
  }, []);
  const handlePlayClick = e => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setPlaying(false));
    dispatch(getaudioId(nid));
    setinitial(false);
  };

  // Format the title to remove any unwanted characters or patterns
  const formatTitle = title => {
    if (!title) return "";
    return title.trim();
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: `flex flex-col justify-start items-start space-y-2 ${styling ? "w-[220px] h-fit sm:w-[220px]" : "w-[220px] h-fit sm:w-[220px]"}`,
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "group w-full h-[115px] sm:h-[165px] relative rounded-md",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        "src-data": img,
        src: IMAGE_PLACEHOLDERS.lecture,
        id: "song",
        alt: "",
        className: "w-full h-full object-cover rounded-md"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-md"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "absolute bottom-2 left-2 flex items-center space-x-1",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiHeadphones, {
          className: "text-white"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "text-white text-sm",
          children: formattedViews
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: handlePlayClick,
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#d6ff00] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300",
        children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(audioLoader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
          className: "text-black ml-1",
          size: 15
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "space-y-1 w-full",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "text-xs sm:text-sm font-medium text-color-primary pl-[3%] mb-0.5 break-words",
        children: formatTitle(categories)
      }), rpname && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "text-[11px] sm:text-sm text-gray-500 line-clamp-2 pl-[3%] min-h-[28px]",
        children: rpname
      })]
    })]
  });
};
/* harmony default export */ const landingWidget_LandingWidget = (LandingWidget);
;// CONCATENATED MODULE: ./src/components/lecturersWidget/LecturersWidget.jsx






const LecturersWidget = ({
  img,
  rp,
  rpname,
  views,
  styling
}) => {
  //const lazy = useRef()

  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#lect");
    function lazyImages() {
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }
    lazyImages();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(jsx_runtime_namespaceObject.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lecturerWidget_wrapper ",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecturerWidget_circle",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "lecturerWidget_img",
          id: "lect",
          "src-data": img,
          src: IMAGE_PLACEHOLDERS.lecturer,
          alt: "circleImg"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "lecturerWidget_text text-foreground",
        children: rp ? rp : "undefined"
      }), rpname && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "lecturerWidget_rpname text-foreground",
        children: rpname
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: !styling ? "lecturerWidget_views_wrapper text-foreground" : "hidden",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiHeadphones, {
          className: "lecturerWidget_views_icon"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "lecturerWidget_views_text",
          children: formatNumber(parseInt(views) || 0)
        })]
      })]
    })
  });
};
/* harmony default export */ const lecturersWidget_LecturersWidget = (LecturersWidget);
;// CONCATENATED MODULE: ./src/assets/svg/back.svg
const back_namespaceObject = __webpack_require__.p + "dee967831b0800bf5c24.svg";
;// CONCATENATED MODULE: ./src/assets/svg/foward.svg
const foward_namespaceObject = __webpack_require__.p + "5051f98a06f42741123c.svg";
;// CONCATENATED MODULE: ./src/components/groupWidget/settings.js
const settings2 = {
  dots: false,
  infinite: true,
  autoplay: false,
  fade: false,
  speed: 500,
  slidesToShow: 6.3,
  swipeToSlide: true,
  slidesToScroll: 1,
  initialSlide: 0,
  // lazyLoad: true,
  responsive: [{
    breakpoint: 1800,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1746,
    settings: {
      slidesToShow: 5.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1586,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1474,
    settings: {
      slidesToShow: 4.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1330,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1180,
    settings: {
      slidesToShow: 3.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1030,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 888,
    settings: {
      slidesToShow: 3.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 770,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 690,
    settings: {
      slidesToShow: 2.6,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 584,
    settings: {
      slidesToShow: 2.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 560,
    settings: {
      slidesToShow: 2.1,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 500,
    settings: {
      slidesToShow: 3.1,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 362,
    settings: {
      slidesToShow: 2.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }]
};
const settings3 = {
  dots: false,
  infinite: true,
  autoplay: false,
  fade: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  // lazyLoad: true,
  responsive: [{
    breakpoint: 1800,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1746,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1586,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1474,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1330,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1180,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 1030,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 888,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 770,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 690,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 584,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 560,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 500,
    settings: {
      slidesToShow: 3.1,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 362,
    settings: {
      slidesToShow: 2.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }]
};
const settings4 = {
  dots: false,
  infinite: true,
  autoplay: false,
  fade: false,
  speed: 500,
  vertical: true,
  verticalSwiping: false,
  swipeToSlide: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  // lazyLoad: true,
  responsive: [{
    breakpoint: 500,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }, {
    breakpoint: 362,
    settings: {
      slidesToShow: 2.5,
      slidesToScroll: 1,
      initialSlide: 0
    }
  }]
};
;// CONCATENATED MODULE: ./src/components/groupWidget/chartUIs/chartWidgets/lecturersChartWidget.jsx



const LecturersChartWidget = ({
  img,
  idx,
  name
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#chart-mbile-lecturers");
    function lazyImages() {
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }
    lazyImages();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "relative bg-[#202020] px-3 py-2 rounded-[32px] w-full text-white flex space-x-2 items-center",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-[50px] h-[50px] rounded-full",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        id: "chart-mbile-lecturers",
        className: "w-full h-full rounded-full",
        "src-data": img,
        src: IMAGE_PLACEHOLDERS.lecturer,
        alt: ""
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "text-[13px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px]",
      children: name
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "absolute left-[-30px]",
      children: idx + 4
    })]
  });
};
/* harmony default export */ const lecturersChartWidget = (LecturersChartWidget);
;// CONCATENATED MODULE: ./src/components/groupWidget/chartUIs/lecturersMobileChart.jsx






const LecturerMobileChart = ({
  data
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    children: [Array.isArray(data) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-[95%] mx-auto",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "top3 grid grid-cols-3 items-center gap-10  ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(`${RESOURCE_PERSON}${data[1]?.id}`);
          },
          className: "w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[90px] rounded-full",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-full w-full h-full",
              src: data[1]?.img || IMAGE_PLACEHOLDERS.lecturer,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px]  rounded-full bg-[#96734a] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "2"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden text-[13px] w-[95px] text-ellipsis whitespace-nowrap",
            children: data[1]?.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(`${RESOURCE_PERSON}${data[0]?.id}`);
          },
          className: "w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[100px] rounded-full",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-full w-full h-full",
              src: data[0]?.img || IMAGE_PLACEHOLDERS.lecturer,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#76a8d7] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "1"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[85px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[0]?.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(`${RESOURCE_PERSON}${data[2]?.id}`);
          },
          className: "w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[80px] rounded-full",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-full w-full h-full",
              src: data[2]?.img || IMAGE_PLACEHOLDERS.lecturer,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#ffa736] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "3"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[95px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[2]?.mp3_title
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "flex flex-col w-full mt-4 space-y-2 justify-end items-end",
      children: Array.isArray(data) && data?.slice(3).map(({
        id,
        img,
        nid,
        name
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: () => {
            navigate(`${RESOURCE_PERSON}${id || nid}`);
          },
          className: "w-[90%]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersChartWidget, {
            img: img,
            name: name,
            idx: idx
          })
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const lecturersMobileChart = (LecturerMobileChart);
;// CONCATENATED MODULE: ./src/components/groupWidget/chartUIs/chartWidgets/lectChartWidget.jsx



const LectChartWidget = ({
  img,
  name,
  idx
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#chart-mbile");
    lazy.forEach(im => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
      im.addEventListener("error", () => {
        im.src = IMAGE_PLACEHOLDERS.lecture;
      });
    });
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "relative bg-[#202020] p-2 rounded-md w-full text-white flex space-x-2 items-center",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-[50px] h-[50px] rounded-md",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        id: "chart-mbile",
        className: "w-full h-full rounded-md",
        "src-data": img,
        src: IMAGE_PLACEHOLDERS.lecture,
        alt: ""
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "text-[13px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px]",
      children: name
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "absolute left-[-30px]",
      children: idx + 4
    })]
  });
};
/* harmony default export */ const lectChartWidget = (LectChartWidget);
;// CONCATENATED MODULE: ./src/components/groupWidget/chartUIs/lectureMobileChart.jsx









const LectureMobileChart = ({
  data
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const gotoLecture = () => {
    dispatch(getPack(null));
    dispatch(getPack(data));
    setinitial(false);
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-[95%] mx-auto",
      children: Array.isArray(data) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "top3 grid grid-cols-3 items-center gap-10  ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${LECTURE}${data[1]?.nid}`,
          onClick: () => {
            gotoLecture();
            dispatch(getCount(1));
          },
          className: "w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[90px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[1]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px]  rounded-full bg-[#96734a] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "2"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden text-[13px] w-[95px] text-ellipsis whitespace-nowrap",
            children: data[1]?.mp3_title
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${LECTURE}${data[0]?.nid}`,
          onClick: () => {
            gotoLecture();
            dispatch(getCount(0));
          },
          className: "w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[100px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#76a8d7] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "1"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[85px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[0]?.mp3_title
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${LECTURE}${data[2]?.nid}`,
          onClick: () => {
            gotoLecture();
            dispatch(getCount(2));
          },
          className: "w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[80px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[2]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#ffa736] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "3"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[95px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[2]?.mp3_title
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "flex flex-col w-full mt-4 space-y-2 justify-end items-end",
      children: Array.isArray(data) && data?.slice(3).map(({
        mp3_title,
        nid,
        img
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
          to: `${LECTURE}${nid}`,
          onClick: () => {
            dispatch(getPack(null));
            dispatch(getCount(idx + 4));
            dispatch(getPack(data));
            setinitial(false);
          },
          className: "w-[90%]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lectChartWidget, {
            name: mp3_title,
            img: img,
            idx: idx
          })
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const lectureMobileChart = (LectureMobileChart);
;// CONCATENATED MODULE: ./src/components/groupWidget/chartUIs/albumMobileChart.jsx






const AlbumMobileChart = ({
  data
}) => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    children: [Array.isArray(data) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-[95%] mx-auto",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "top3 grid grid-cols-3 items-center gap-10  ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${data[1]?.id}`,
          className: "w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[90px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[1]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px]  rounded-full bg-[#96734a] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "2"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden text-[13px] w-[95px] text-ellipsis whitespace-nowrap",
            children: data[1]?.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${data[0]?.id}`,
          className: "w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[100px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#76a8d7] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "1"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[85px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[0]?.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${data[2]?.id}`,
          className: "w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full relative h-[80px] rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "rounded-md w-full h-full",
              src: data[2]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                className: "w-[20px] h-[20px] rounded-full bg-[#ffa736] flex items-center justify-center",
                children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "",
                  children: "3"
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "overflow-hidden w-[95px] text-[13px] text-ellipsis whitespace-nowrap",
            children: data[2]?.mp3_title
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "flex flex-col w-full mt-4 space-y-2 justify-end items-end",
      children: Array.isArray(data) && data?.slice(3).map(({
        id,
        img,
        nid,
        name
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${id || nid}`,
          className: "w-[90%]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lectChartWidget, {
            name: name,
            img: img,
            idx: idx
          })
        }, idx);
      })
    })]
  });
};
/* harmony default export */ const albumMobileChart = (AlbumMobileChart);
;// CONCATENATED MODULE: ./src/pages/genredetail/genreMobileLecturer.jsx



const GenreMobileLecturer = ({
  img,
  rp,
  styling
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#lecturer");
    function lazyImages() {
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }
    lazyImages();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: `flex flex-col space-y-2 justify-center items-center min-[615px]:hidden overflow-hidden   ${styling ? "w-full h-[130px]" : "w-[100px] h-[140px]"}`,
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: styling ? "w-full h-full rounded-full" : "w-[90px] h-[90px] rounded-full",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        id: "lecturer",
        "src-data": img,
        src: IMAGE_PLACEHOLDERS.lecturer,
        alt: "",
        className: "w-full h-full rounded-full"
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "text-white text-[13px] w-[96px] text-ellipsis whitespace-nowrap overflow-hidden",
      children: rp
    })]
  });
};
/* harmony default export */ const genreMobileLecturer = (GenreMobileLecturer);
;// CONCATENATED MODULE: ./src/components/groupWidget/GroupWidget.jsx




















const GroupWidget = ({
  data,
  heading,
  type,
  nav1,
  isrecent,
  styling,
  endpoint_url,
  currentPage,
  previousPlay,
  moreRoute,
  hideMore = false
}) => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const slide = (0,external_react_.useRef)();
  const [isprev, setisprev] = (0,external_react_.useState)(false);
  const [isnext, setisnext] = (0,external_react_.useState)(true);
  const [size, setSize] = (0,external_react_.useState)(window.innerWidth);
  const [, setSettingsresponsive] = (0,external_react_.useState)(() => {
    return size < 513 ? {
      ...settings4
    } : {
      ...settings3
    };
  });
  //const data=[]
  (0,external_react_.useEffect)(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
      setSettingsresponsive(() => {
        return window.innerWidth < 513 ? {
          ...settings4
        } : {
          ...settings3
        };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  (0,external_react_.useEffect)(() => {
    function scrollEl() {
      if (slide.current.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }
      if (slide.current.scrollLeft + slide.current.offsetWidth >= slide.current.scrollWidth) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }
    slide.current?.addEventListener("scroll", scrollEl);
    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);
  const getMoreRoute = heading => {
    if (moreRoute) {
      return moreRoute;
    }
    switch (heading?.toLowerCase()) {
      case "recently posted":
        return RECENTLY_POSTED_MORE;
      case "recently viewed":
        return RECENTLY_VIEWED_MORE;
      case "trending":
        return TRENDING_MORE;
      case "recommended":
        return RECOMMENDED_MORE;
      default:
        return MORE;
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "groupWidget_wrapper",
    children: [Array.isArray(data) && data.length > 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "groupWidget_top",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "groupWidget_top_heading text-color-primary",
        children: heading
      }), !hideMore && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          navigate(getMoreRoute(heading) || MORE, {
            state: {
              name: "",
              heading: heading,
              id: "",
              img: "",
              type,
              currentdata: data,
              endpoint_url: endpoint_url || "",
              currentPage: currentPage || "",
              navtitle: nav1?.title || ""
            }
          });
        },
        className: styling && endpoint_url ? "flex dark:text-[#d6ff00] text-color-primary text-[15px] items-center" : `flex dark:text-[#d6ff00] text-color-primary text-[15px] items-center ${nav1?.title === "Charts" ? "max-[615px]:hidden" : ""}  `,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "cursor-pointer",
          children: "more"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiChevronsRight, {
          className: " cursor-pointer text-[20px] pt-1"
        })]
      })]
    }), type === "recent" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: "overflow_auto_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: `overflow_auto_after ${styling ? "min-[615px]:space-x-3" : "space-x-4"}`,
          children: Array.isArray(data) && data.map(({
            img,
            lec_img,
            categories,
            cats,
            title,
            Title,
            rpname,
            nid,
            audio,
            views
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: isrecent ? `${ALBUMS}${nid}` : `${LECTURE}${nid}`,
              id: idx,
              name: nid,
              className: "groupWidget_album_item",
              onClick: () => {
                if (isrecent) {
                  //navigate(`/a/${nid}`);
                  dispatch(getaudioId(previousPlay[idx]));
                  dispatch(getPack(null));
                  dispatch(getCount(idx));
                  dispatch(getPack(data));
                  dispatch(getPage(currentPage));
                  dispatch(getaudioData({
                    nid,
                    id: idx,
                    endpoint_url,
                    currentPage,
                    controlData: data,
                    navName: nav1?.navName || nav1?.title || "Home"
                  }));
                } else {
                  // navigate(`/l/${nid}`);
                  if (window.innerWidth <= 615) {
                    dispatch(getPack(null));
                    dispatch(getPage(currentPage));
                    dispatch(getPack(data));
                    dispatch(getCount(idx));
                    setinitial(false);
                  }
                }
              },
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                categories: title || Title || categories || cats,
                img: img || lec_img,
                views: views,
                nid: nid,
                styling: styling,
                rpname: rpname,
                audio: audio
              })
            }, idx + 1);
          })
        })
      })]
    }), type === "lectures" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: `overflow_auto_wrapper `,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: `overflow_auto_after  ${styling ? "min-[615px]:space-x-3 space-x-3" : ""}`,
          children: Array.isArray(data) && data.map(({
            img,
            lec_img,
            categories,
            cats,
            id,
            mp3_title,
            title,
            Title,
            rpname,
            nid,
            audio,
            views
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
                to: `${LECTURE}${nid || id}`,
                id: idx,
                className: `groupWidget_album_item  ${styling ? "relative max-[615px]:hidden" : ""}`,
                onClick: () => {
                  // navigate(`/l/${nid || id}`);
                  if (window.innerWidth <= 615) {
                    dispatch(getPack(null));
                    dispatch(getPage(currentPage));
                    dispatch(getCount(idx));
                    dispatch(getPack(data));
                    dispatch(getaudioData({
                      endpoint_url,
                      currentPage,
                      controlData: data,
                      navName: nav1?.navName || nav1?.title || "Home"
                    }));
                    setinitial(false);
                  }
                },
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                  categories: title || Title || mp3_title,
                  img: img || lec_img,
                  views: views || 0,
                  nid: nid || id,
                  styling: styling,
                  rpname: rpname
                }, idx), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: `absolute right-[-14px] bottom-[10px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${idx === 2 ? "bg-[#96734a]" : ""} ${idx === 1 ? "bg-[#76a8d7]" : ""}${idx === 0 ? "bg-[#ffa736]" : ""}
                        ${styling && idx < 3 ? "block" : "hidden"}`,
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    children: idx + 1
                  })
                })]
              }, idx + 1)
            }, idx);
          })
        })
      })]
    }), type === "lectures" && nav1?.title === "Charts" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: styling ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center" : "hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lectureMobileChart, {
        data: data
      })
    }), type === "album" && nav1?.title === "Charts" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: styling ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center" : "hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumMobileChart, {
        data: data
      })
    }), type === "lecturer" && nav1?.title === "Charts" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: styling ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center" : "hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersMobileChart, {
        data: Array.isArray(data) && data
      })
    }), type === "album" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: "overflow_auto_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: `overflow_auto_after  ${styling ? "min-[615px]:space-x-3 space-x-3" : ""}`,
          children: Array.isArray(data) && data.map(({
            img,
            lec_img,
            categories,
            cats,
            title,
            nid,
            Title,
            rpname,
            name,
            id,
            audio,
            views
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
              to: `${ALBUMS}${id || nid}`,
              id: idx,
              className: `groupWidget_album_item  ${styling ? "relative max-[615px]:hidden" : ""}`,
              onClick: () => {},
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                categories: name || title || Title,
                img: img || lec_img,
                views: views || 0,
                nid: id || nid,
                styling: styling
              }, idx), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: `absolute right-[-14px] bottom-[10px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${idx === 2 ? "bg-[#96734a]" : ""} ${idx === 1 ? "bg-[#76a8d7]" : ""}${idx === 0 ? "bg-[#ffa736]" : ""}
                        ${styling && idx < 3 ? "block" : "hidden"}`,
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  children: idx + 1
                })
              })]
            }, idx + 1);
          })
        })
      })]
    }), type === "playlist" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: "overflow_auto_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "overflow_auto_after",
          children: Array.isArray(data) && data.map(({
            img,
            lec_img,
            categories,
            cats,
            title,
            nid,
            Title,
            rpname,
            name,
            playlist_img,
            id,
            audio,
            views
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: `${PLAYLISTS}${id || nid}`,
              id: idx,
              className: "groupWidget_album_item",
              onClick: () => {},
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                categories: name || Title ||
                //  title?.split("-")[0] ||
                // Title?.split("-")[0] ||
                title,
                img: lec_img,
                views: views || 0,
                nid: id || nid
              }, nid)
            }, idx + 1);
          })
        })
      })]
    }), nav1?.title === "Genres" && type === "lecturer" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "w-full h-full overflow-hidden min-[615px]:hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-full overflow-x-auto flex items-center space-x-4 h-full",
        children: Array.isArray(data) && data.map(({
          img,
          name,
          id,
          nid
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
            to: `${RESOURCE_PERSON}${id || nid}`,
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(genreMobileLecturer, {
              img: img,
              rp: name
            })
          }, name);
        })
      })
    }), type === "lecturer" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper_lect",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: `overflow_auto_wrapper_lect ${nav1?.title === "Genres" ? "hidden" : ""} min-[615px]:space-x-20 `,
        children: Array.isArray(data) && data.map(({
          img,
          lec_img,
          categories,
          cats,
          title,
          Title,
          views,
          name,
          nid,
          id,
          audio,
          favorites
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(jsx_runtime_namespaceObject.Fragment, {
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
              to: `${RESOURCE_PERSON}${id || nid}`,
              className: "max-[615px]:hidden relative",
              onClick: () => {
                // navigate(`${RESOURCE_PERSON}${id || nid}`);
              },
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturersWidget, {
                views: views,
                rp: name,
                img: img,
                styling: styling
              }, idx), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: `absolute right-[-18px] bottom-[100px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${idx === 2 ? "bg-[#96734a]" : ""} ${idx === 1 ? "bg-[#76a8d7]" : ""}${idx === 0 ? "bg-[#ffa736]" : ""}
                        ${styling && idx < 3 ? "block" : "hidden"}`,
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  children: idx + 1
                })
              })]
            }, idx + 1)
          });
        })
      })]
    })]
  });
};
/* harmony default export */ const groupWidget_GroupWidget = (GroupWidget);
;// CONCATENATED MODULE: external "react-slick"
const external_react_slick_namespaceObject = require("react-slick");
var external_react_slick_default = /*#__PURE__*/__webpack_require__.n(external_react_slick_namespaceObject);
;// CONCATENATED MODULE: ./src/assets/svg/boom-chart.svg
const boom_chart_namespaceObject = __webpack_require__.p + "2465e9114d717fb7aea8.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-lecturer.svg
const boom_lecturer_namespaceObject = __webpack_require__.p + "d5332c927989c9a53b0b.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-playlist.svg
const boom_playlist_namespaceObject = __webpack_require__.p + "9bd6403626e707b4b04f.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-trending.svg
const boom_trending_namespaceObject = __webpack_require__.p + "ddf4f22e9772e4ecc07a.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-new.svg
const boom_new_namespaceObject = __webpack_require__.p + "79da17c7802f5814b6be.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-genre.svg
const boom_genre_namespaceObject = __webpack_require__.p + "fdc1af61277dfc1de8c7.svg";
;// CONCATENATED MODULE: ./src/assets/svg/quran.svg
const svg_quran_namespaceObject = __webpack_require__.p + "6e4a1632e6460cb81c9f.svg";
;// CONCATENATED MODULE: ./src/components/landingOptions/LandingOptions.jsx




const LandingOptions = ({
  icon,
  img,
  text,
  link
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    onClick: () => {
      navigate(link);
    },
    className: "landop_wrapper ",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "landop_widget",
      children: icon ? icon : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "landop_pics ",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "w-full h-full",
          src: img,
          alt: ""
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "landop_text text-color",
      children: text
    })]
  });
};
/* harmony default export */ const landingOptions_LandingOptions = (LandingOptions);
;// CONCATENATED MODULE: ./src/components/UI/carousel/imageWidget.jsx



const ImageWidget = ({
  image
}) => {
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#carousels");
    lazy.forEach(im => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
      im.addEventListener("error", () => {
        im.src = IMAGE_PLACEHOLDERS.carouselWidget;
      });
    });
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
    id: "carousels",
    className: "w-full h-full object-fill rounded-md",
    "src-data": image,
    src: IMAGE_PLACEHOLDERS.carouselWidget
    // src-data={image}
    ,
    alt: "1"
  });
};
/* harmony default export */ const imageWidget = (ImageWidget);
;// CONCATENATED MODULE: ./src/components/UI/carousel/myCarousel.jsx






const MyCarousel = ({
  images
}) => {
  const [currentIndex, setCurrentIndex] = (0,external_react_.useState)(0);
  (0,external_react_.useEffect)(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images?.length]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "w-full group h-full relative items-end justify-end px-[5] flex cursor-pointer",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-full hidden inset-0 group-hover:flex justify-between items-center h-fit m-auto z-[30] absolute",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setCurrentIndex((currentIndex - 1) % images.length);
        },
        className: "bg-black bg-opacity-70 flex justify-center items-center h-[60px] w-[30px]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateBefore, {
          className: "text-white text-[40px]"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setCurrentIndex((currentIndex + 1) % images.length);
        },
        className: "bg-black bg-opacity-70 flex justify-center items-center h-[60px] w-[30px]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateNext, {
          className: "text-white text-[40px]"
        })
      })]
    }), Array.isArray(images) && images.map((image, index) => {
      return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: " absolute left-0 top-0 w-[73%] h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px] ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: ` transform ease h-full w-full duration-500 opacity-0 absolute left-0  shadow-xl ${currentIndex % images.length === index ? "active " : ""} ${(currentIndex + 1) % images.length === index ? " preactive" : ""} ${(currentIndex + 2) % images.length === index ? "third " : ""} 
              `,
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(imageWidget, {
            image: image
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "w-full flex items-center z-[12]   justify-center space-x-1 absolute bottom-7 inset-x-0",
          children: Array.isArray(images) && images.map((img, index) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: `rounded-[50%] h-[4px] w-[4px] ${currentIndex === index ? "bg-white" : "bg-gray-400"}`
            }, index);
          })
        })]
      }, index);
    })]
  });
};
/* harmony default export */ const myCarousel = (MyCarousel);
;// CONCATENATED MODULE: ./src/pages/landing/mobileimagewidget/mobileImageWidget.jsx



const MobileImageWidget = ({
  image
}) => {
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#carousel");
    lazy.forEach(im => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
      im.addEventListener("error", () => {
        im.src = IMAGE_PLACEHOLDERS.carouselWidget;
      });
    });
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
    className: "landing_carousel_img w-full rounded-[3px] h-[162px]",
    id: "carousel",
    "src-data": image,
    src: IMAGE_PLACEHOLDERS.carouselWidget,
    alt: "1"
  });
};
/* harmony default export */ const mobileImageWidget = (MobileImageWidget);
;// CONCATENATED MODULE: ./src/pages/landing/utils/index.js



const useRequest = (requestType, routeName, payload = null) => {
  const [isLoading, setIsLoading] = (0,external_react_.useState)(false);
  const [data, setData] = (0,external_react_.useState)(null);
  const handleRequest = (type, route, payloadData) => {
    setIsLoading(true);
    (external_axios_default())[type](`${process.env.REACT_APP_API_BASE_URL}${route}`, payloadData).then(res => {
      setData(res.data);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
    });
  };
  (0,external_react_.useEffect)(() => {
    handleRequest(requestType, routeName, payload);
  }, [requestType, routeName, payload]);
  return {
    isLoading,
    data
  };
};
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false
};
const settings1 = {
  dots: false,
  infinite: false,
  autoplay: false,
  fade: false,
  speed: 500,
  slidesToShow: 6,
  swipeToSlide: true,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
  responsive: [{
    breakpoint: 600,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1
    }
  }]
};
;// CONCATENATED MODULE: external "react-loading-skeleton"
const external_react_loading_skeleton_namespaceObject = require("react-loading-skeleton");
var external_react_loading_skeleton_default = /*#__PURE__*/__webpack_require__.n(external_react_loading_skeleton_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-loading-skeleton/dist/skeleton.css
var skeleton = __webpack_require__(937);
;// CONCATENATED MODULE: ./src/components/skeletion/carousel.skeleton.js




const CarouselSeleton = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_loading_skeleton_namespaceObject.SkeletonTheme, {
    baseColor: "#7B91A7",
    highlightColor: "#d8e695",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_loading_skeleton_default()), {
      className: "carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]"
    })
  });
};
/* harmony default export */ const carousel_skeleton = (CarouselSeleton);
;// CONCATENATED MODULE: ./src/components/head-meta/index.js


const HeadMeta = ({
  title,
  description,
  ogImage = "https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg"
}) => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      charSet: "utf-8"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      name: "description",
      content: description || "Explore Islamic educational resources like articles, lectures, videos, and e-books on Dawah Nigeria. Promoting knowledge and guidance for all."
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      name: "keywords",
      content: "Islamic education, Dawah Nigeria, articles, lectures, videos, e-books, Islam, guidance, knowledge, online platform, religious resources, Quran, Islamic teachings"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      property: "og:image",
      content: ogImage
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      name: "author",
      content: "Edawah"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("title", {
      children: title || "Dawah Nigeria"
    })]
  });
};
/* harmony default export */ const head_meta = (HeadMeta);
;// CONCATENATED MODULE: ./src/components/skeletion/index.jsx




const CardSkeleton = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_loading_skeleton_namespaceObject.SkeletonTheme, {
    baseColor: "#7B91A7",
    highlightColor: "#d8e695",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-[165]",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_loading_skeleton_default()), {
        width: 165,
        height: 174,
        className: "mb-1"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_loading_skeleton_default()), {
        width: 165,
        height: 23
      })]
    })
  });
};
/* harmony default export */ const skeletion = (CardSkeleton);
;// CONCATENATED MODULE: ./src/components/skeletion/skeleton.container.jsx



const RowSkeletonContainer = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "groupWidget_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "groupWidget_top",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "groupWidget_top_heading",
        children: "Loading..."
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "overflow_hidden_wrapper",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "overflow_auto_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: `overflow_auto_after
            `,
          children: Array(10).fill(undefined).map((_, i) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(skeletion, {}, i);
          })
        })
      })
    })]
  });
};
/* harmony default export */ const skeleton_container = (RowSkeletonContainer);

// export default React.memo(RowSkeletonContainer);
;// CONCATENATED MODULE: ./src/pages/landing/Landing.jsx


























const Landing = () => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [curPlay, setcurPlay] = (0,external_react_.useState)([]);
  const [isrecent, setisrecent] = (0,external_react_.useState)(false);
  const id = currentUser?.id;
  const page = 1;
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false
  };
  const settings1 = {
    dots: false,
    infinite: false,
    autoplay: false,
    fade: false,
    speed: 500,
    slidesToShow: 6,
    swipeToSlide: true,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    }]
  };
  const [sliders, recentlyPosted, specialFeatures, recentlyviewed] = useLandingPageHook(id, page, setisrecent, setcurPlay);
  const specialFeat = specialFeatures?.data && Array.isArray(specialFeatures.data) ? specialFeatures.data.map(val => ({
    name: val.name,
    more: val.more
  })) : [];
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: "Welcome to Dawah Nigeria - Home of Islamic resources"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "landing_wrapper px-[2%]  max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]",
      children: [sliders?.data?.length > 1 ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(myCarousel, {
            images: sliders?.data
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_slick_default()), {
          className: "landing_carousel landing_space",
          ...settings,
          children: sliders?.data?.map((image, index) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "landing_carousel_img",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(mobileImageWidget, {
                image: image,
                className: ""
              })
            }, image);
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)((external_react_slick_default()), {
          className: "landing_options",
          ...settings1,
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Ramadan",
            img: boom_playlist_namespaceObject,
            link: RAMADAN
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Charts",
            img: boom_chart_namespaceObject,
            link: CHARTS
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Lecturers",
            img: boom_lecturer_namespaceObject,
            link: LECTURERS
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Quran",
            img: svg_quran_namespaceObject,
            link: QURAN
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Playlists",
            img: boom_playlist_namespaceObject,
            link: PLAY
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Video",
            icon: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillPlayBtnFill, {}),
            link: VIDEO
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Genre",
            img: boom_genre_namespaceObject,
            link: GENRES
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "Trending",
            img: boom_trending_namespaceObject,
            link: TRENDING
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingOptions_LandingOptions, {
            text: "New",
            img: boom_new_namespaceObject,
            link: NEW
          })]
        })]
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(carousel_skeleton, {}), recentlyPosted?.isSuccess && Array.isArray(recentlyPosted?.data) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "landing_recent landing_space my-1 min-[615px]:my-3",
        children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: recentlyPosted?.data.slice(0, 10),
          heading: "Recently Posted",
          type: "lectures",
          endpoint_url: "/leclisting_recent.php?&action=get_recent_audio&page=",
          currentPage: page,
          isrecentpost: true,
          nav1: {
            title: "Home",
            link: HOME
          }
        })]
      }), recentlyviewed?.isSuccess && Array.isArray(recentlyviewed?.data) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "landing_recent landing_space my-1 min-[615px]:my-3",
        children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: recentlyviewed?.data,
          heading: "Recently Viewed",
          type: "recent",
          endpoint_url: "/leclisting_lang.php?langid=6&page=",
          currentPage: page,
          previousPlay: curPlay,
          isrecent: isrecent,
          nav1: {
            title: "Home",
            link: HOME
          }
        })]
      }), Array.isArray(specialFeat) && specialFeat?.filter(({
        more
      }) => Array.isArray(more) && more.length > 0).map(({
        name,
        more
      }, idx) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "landing_tafsir landing_space my-1 min-[615px]:my-3",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: more,
          heading: name,
          type: "lectures",
          currentPage: "",
          nav1: {
            title: "Home",
            link: HOME
          }
        })
      }, name)), Array.isArray(specialFeat) && specialFeat.length === 0 && Array(10).fill(undefined).map((_, i) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "landing_recent landing_space my-1 min-[615px]:my-3",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(skeleton_container, {})
      }, i))]
    })]
  });
};
/* harmony default export */ const landing_Landing = (Landing);
;// CONCATENATED MODULE: ./src/hooks/ramadan/useRamadanYears.hook.js


const useRamadanYears = () => {
  const {
    isLoading,
    data,
    isError,
    error
  } = (0,react_query_namespaceObject.useQuery)(["ramadan"], () => ramadanApi.getAllRamadanYears());
  return {
    isLoading,
    error,
    isError,
    data: data?.data || []
  };
};
;// CONCATENATED MODULE: ./src/hooks/ramadan/useRamadanYearAlbums.js


const useRamadanYearAlbums = id => {
  const {
    isLoading,
    data,
    isError,
    error
  } = (0,react_query_namespaceObject.useQuery)(["ramadan", id], () => ramadanApi.getRamadanYearAlbums(id));
  return {
    isLoading,
    error,
    isError,
    data: data?.data || [],
    yearName: data?.name || "Ramadan lectures"
  };
};
;// CONCATENATED MODULE: ./src/hooks/ramadan/useFilteredRamadanYearAlbums.js



const useFilteredRamadanYearAlbums = languageId => {
  const {
    id: yearId
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const {
    data: ramadanYearAlbums,
    isLoading
  } = useRamadanYearAlbums(yearId);

  // Filter data based on selected language tab and return the documents that match
  const albums = (0,external_react_.useMemo)(() => {
    const matchingAlbums = ramadanYearAlbums?.filter(album => album?.lang_id === languageId).map(album => album?.documents)?.[0];
    if (matchingAlbums?.length > 0) {
      return matchingAlbums;
    } else {
      // pick the first language if nothing is selected else e.g on page load
      return ramadanYearAlbums?.[0]?.documents;
    }
  }, [ramadanYearAlbums, languageId]);
  return {
    data: albums,
    isLoading
  };
};
;// CONCATENATED MODULE: ./src/hooks/ramadan/index.js



;// CONCATENATED MODULE: ./src/pages/ramadan/Ramadan.jsx








const Ramadan = () => {
  const {
    data: ramadanYears,
    isLoading
  } = useRamadanYears();
  const extractYear = name => {
    const match = name?.match(/\d{4}/);
    return match ? match[0] : "";
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: "Ramadan lectures on Dawah Nigeria - Home of Islamic resources"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "landing_wrapper px-[2%]  max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "pt-20 space-y-10",
        children: ramadanYears?.map(({
          key_id,
          documents,
          name
        }) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "landing_tafsir landing_space my-1 min-[615px]:my-3",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
            data: documents || [],
            heading: name || "Ramadan lectures",
            type: "album",
            nav1: {
              title: "Ramadan",
              link: RAMADAN
            },
            moreRoute: `${RAMADAN}/year/${extractYear(name)}`
          })
        }, key_id))
      }), isLoading && [...new Array(4)]?.map((_, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "landing_recent landing_space my-1 min-[615px]:my-3",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(skeleton_container, {})
      }, index))]
    })]
  });
};
/* harmony default export */ const ramadan_Ramadan = (Ramadan);
;// CONCATENATED MODULE: ./src/components/headerRouter/HeaderRouter.jsx





const HeaderRouter = ({
  link,
  title
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "hroute_title_res_wrap bg-backround",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdOutlineKeyboardArrowLeft, {
      onClick: () => {
        navigate(link || -1);
      },
      className: "hroute_title_res_icon text-color"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
      className: "hroute_title_res_text text-color",
      children: title || "Unknown"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "hides"
    })]
  });
};
/* harmony default export */ const headerRouter_HeaderRouter = (HeaderRouter);
;// CONCATENATED MODULE: ./src/pages/genres/genreWidget.jsx




const GenreWidget = ({
  img,
  name
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#genre");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.albumWidget;
        });
      });
    }
    lazyImage();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "genre_img_wrap",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
      className: "genre_img",
      id: "genre",
      "src-data": img,
      src: IMAGE_PLACEHOLDERS.albumWidget,
      alt: `genre`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
      className: "name_abs",
      children: name
    })]
  });
};
/* harmony default export */ const genreWidget = (GenreWidget);
;// CONCATENATED MODULE: ./src/pages/genres/Genres.jsx












const Genres = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const queryParam = {};
  const {
    querieddata,
    isLoading
  } = useQueryGetRequest("genres", queryParam, genresApi.getCategories);
  const showMore = id => {
    navigate(`${GENRES}/${id}`);
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Genres of islamic resources on Dawah Nigeria `
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "genre_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "genre_header_link bg-background max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Genres"
        })
      }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_x",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load_y",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "genre_lists",
        children: !isLoading && Array.isArray(querieddata) && querieddata.map(({
          img,
          name,
          id
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              showMore(id);
            },
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(genreWidget, {
              img: img,
              name: name
            })
          }, idx + 1);
        })
      })]
    })]
  });
};
/* harmony default export */ const genres_Genres = (Genres);
;// CONCATENATED MODULE: ./src/components/filterButton/FilterButton.jsx



const FilterButton = ({
  setFilter,
  data1,
  setData1,
  data2,
  setData2,
  setActiveId,
  data3,
  setData3,
  title,
  action,
  active,
  setActive,
  data,
  id,
  lid,
  setlectId,
  lecid,
  setLangid,
  setCatid,
  setTypeName
}) => {
  (0,external_react_.useEffect)(() => {
    setFilter([...data1, ...data2, ...data3]);
  }, [data1, data2, data3]);
  const handleFilter = () => {
    if (typeof setActive === 'function') setActive(title);
    if (typeof setTypeName === 'function') setTypeName(action);
    if (action === "name") {
      if (typeof setlectId === 'function') setlectId(lecid);
      if (title === "All") {
        if (typeof setData1 === 'function') setData1(Array.isArray(data) && data.filter(value => value.rp || value.name));
      } else {
        let reset = [];
        if (typeof setData2 === 'function') setData2([...reset]);
        if (typeof setData3 === 'function') setData3([...reset]);
        if (typeof setData1 === 'function') setData1(Array.isArray(data) && data.filter(value => (value.rp || value.name).includes(title)));
      }
    } else if (action === "language") {
      if (typeof setLangid === 'function') setLangid(lid);
      if (typeof setlectId === 'function') setlectId(null);
      if (typeof setActiveId === 'function') setActiveId("All");
      if (title === "All") {
        if (typeof setData2 === 'function') setData2(Array.isArray(data) && data.filter(value => value.lang || value.lang_id));
      } else {
        if (typeof setData2 === 'function') setData2(Array.isArray(data) && data.filter(value => value.lang === title));
      }
    } else if (action === "categories") {
      if (typeof setCatid === 'function') setCatid(id);
      //setIsEmpty(false);
      if (title === "All") {
        if (typeof setData3 === 'function') setData3(Array.isArray(data) && data.filter(value => value?.cats || value?.categories));
      } else {
        if (typeof setData3 === 'function') setData3(Array.isArray(data) && data.filter(value => value?.cats?.includes(title) || value?.categories?.includes(title)));
      }
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    onClick: () => {
      handleFilter();
    },
    className: `filter_wrapper ${active === title ? "filter_active" : ""}`,
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "filter_text",
      children: title
    })
  });
};
/* harmony default export */ const filterButton_FilterButton = (FilterButton);
;// CONCATENATED MODULE: ./src/components/lecturersWidget/LecturerMobileWidget.jsx




const LecturerMobileWidget = ({
  img,
  rp
}) => {
  (0,external_react_.useEffect)(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#lect");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }
    lazyImages();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(jsx_runtime_namespaceObject.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lecwidres_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecwidres_img_wrap",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "lecwidres_img",
          id: "lect",
          src: IMAGE_PLACEHOLDERS.lecturer,
          "src-data": img,
          alt: "lect"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecwidres_text_wrap",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "lecwidres_text text-foreground",
          children: rp ? `${rp.split(" ")[0]} ${rp.split(" ")[1]} ${rp.split(" ")[2]}` : "undefined"
        })
      })]
    })
  });
};
/* harmony default export */ const lecturersWidget_LecturerMobileWidget = (LecturerMobileWidget);
;// CONCATENATED MODULE: ./src/pages/lecturers/Lecturers.jsx

















const Lecturers = () => {
  //const [data, setData] = useState([]);
  const [filter, setFilter] = (0,external_react_.useState)([]);
  const [data1, setData1] = (0,external_react_.useState)([]);
  const [data2, setData2] = (0,external_react_.useState)([]);
  const [data3, setData3] = (0,external_react_.useState)([]);
  const [active, setActive] = (0,external_react_.useState)("All");
  const [active1, setActive1] = (0,external_react_.useState)("All");
  const [langid, setLangid] = (0,external_react_.useState)("");
  const [page, setPage] = (0,external_react_.useState)(1);
  const [typeName, setTypeName] = (0,external_react_.useState)("");
  const [lectId, setlectId] = (0,external_react_.useState)("");
  const queryParam = {
    lectId,
    langid,
    page,
    typeName,
    active
  };
  const {
    isLoading,
    isLoadingNextPage,
    isLastPage,
    querieddata
  } = useLecturersHook("lecturers", queryParam, lecturersApi.getLecturers, setPage);
  const {
    data
  } = useLanguagesHook();
  (0,external_react_.useEffect)(() => {
    setData3(querieddata);
  }, [querieddata]);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(filter?.length, page, setPage);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Lecturers - Get islamic resources on Dawah Nigeria`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lecturers_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecturers_head_link max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Lecturer"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "lecturers_filter",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "lecturers_filter_name",
          children: lecturers.map(({
            name,
            id
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(filterButton_FilterButton, {
                filter: filter,
                setFilter: setFilter,
                data1: data1,
                setData1: setData1,
                data2: data2,
                setData2: setData2,
                data3: data3,
                setData3: setData3,
                active: active,
                setActive: setActive,
                title: name,
                setlectId: setlectId,
                lecid: id,
                setTypeName: setTypeName,
                action: "name",
                data: querieddata
              })
            }, name);
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "lecturers_filter_language",
          children: Array.isArray(data) && data?.map(({
            name,
            id
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(filterButton_FilterButton, {
                filter: filter,
                setFilter: setFilter,
                data1: data1,
                setData1: setData1,
                data2: data2,
                setData2: setData2,
                data3: data3,
                setActiveId: setActive,
                setData3: setData3,
                active: active1,
                setlectId: setlectId,
                setActive: setActive1,
                title: name,
                action: "language",
                data: querieddata
                // setIsEmpty={setIsEmpty}
                ,
                setTypeName: setTypeName,
                lid: id,
                setLangid: setLangid
              })
            }, name);
          })
        })]
      }), isLoading && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecturers_widget",
        children: Array.isArray(filter) && filter.map(({
          img,
          rp,
          name,
          rpname,
          comments,
          views,
          favorites,
          share,
          catsname,
          id
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
            to: `${RESOURCE_PERSON}${id}`,
            className: "lecturers_item",
            ref: idx === filter.length - 1 && !isLastPage ? infiniteScrollRef : null,
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturersWidget, {
              img: img,
              views: views,
              favorites: favorites,
              rp: rp || name || rpname
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturerMobileWidget, {
              views: views,
              rp: name,
              img: img
            })]
          }, name);
        })
      }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_m",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loads",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      })]
    })]
  });
};
/* harmony default export */ const lecturers_Lecturers = (Lecturers);
;// CONCATENATED MODULE: ./src/pages/videos/data.jsx
const categories = [{
  id: 0,
  categories: "All"
}, {
  id: 1,
  categories: "Charity"
}, {
  id: 2,
  categories: "Men"
}, {
  id: 3,
  categories: "Character & Manners"
}, {
  id: 4,
  categories: "Knowledge"
}, {
  id: 5,
  categories: "Q&A"
}, {
  id: 6,
  categories: "Jumuah"
}, {
  id: 7,
  categories: "Ramadan"
}, {
  id: 8,
  categories: "Sacred Months"
}];
const videos_data_language = [{
  id: 0,
  language: "All"
}, {
  id: 1,
  language: "Yoruba"
}, {
  id: 2,
  language: "Hausa"
}, {
  id: 3,
  language: "English"
}, {
  id: 4,
  language: "Igala"
}, {
  id: 5,
  language: "Arabia"
}];
const data_alphabet = [{
  alphabet: "Hot"
}, {
  alphabet: "A"
}, {
  alphabet: "B"
}, {
  alphabet: "C"
}, {
  alphabet: "D"
}, {
  alphabet: "E"
}, {
  alphabet: "F"
}, {
  alphabet: "G"
}, {
  alphabet: "H"
}, {
  alphabet: "I"
}, {
  alphabet: "J"
}, {
  alphabet: "K"
}, {
  alphabet: "L"
}, {
  alphabet: "M"
}, {
  alphabet: "N"
}, {
  alphabet: "O"
}, {
  alphabet: "P"
}, {
  alphabet: "Q"
}, {
  alphabet: "R"
}, {
  alphabet: "S"
}, {
  alphabet: "T"
}, {
  alphabet: "U"
}, {
  alphabet: "V"
}, {
  alphabet: "W"
}, {
  alphabet: "X"
}, {
  alphabet: "Y"
}, {
  alphabet: "Z"
}];
;// CONCATENATED MODULE: ./src/assets/png/videoButtom.png
const videoButtom_namespaceObject = __webpack_require__.p + "d00ae01ada3971b00bcb.png";
;// CONCATENATED MODULE: ./src/components/videoWidget/VideoWidget.jsx








const VideoWidget = ({
  img,
  favourites,
  views,
  lecturer,
  title,
  duration
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#video");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.carouselWidget;
        });
      });
    }
    lazyImage();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "videoWidget_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "videoWidget_top",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        id: "video",
        "src-data": img,
        src: IMAGE_PLACEHOLDERS.carouselWidget,
        alt: "background",
        className: "videoWidget_background_image"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "videoWidget_play_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "videoWidget_play",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
            className: "videoWidget_play_icon"
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "videoWidget_duration px-1",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "videoWidget_duration_text",
          children: duration
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "videoWidget_buttom",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "videoWidget_buttom_left",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("marquee", {
          direction: "left",
          className: "videoWidget_buttom_head",
          children: title
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "videoWidget_bottom_overall",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "videoWidget_buttom_lecturer_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "vid_widget_image rounded-full",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "w-full h-full rounded-full",
              "src-data": videoButtom_namespaceObject,
              src: IMAGE_PLACEHOLDERS.lecturer,
              alt: "videoButtom"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "rel_text",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "videoWidget_buttom_lecturer",
              children: lecturer
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "videoWidget_buttom_right",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiHeart, {
            className: "videoWidget_buttom_right_icon"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "videoWidget_buttom_right_text",
            children: formatNumber(favourites || 0)
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const videoWidget_VideoWidget = (VideoWidget);
;// CONCATENATED MODULE: ./src/pages/videos/Videos.jsx















const Videos = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [filter, setFilter] = (0,external_react_.useState)([]);
  const [data1, setData1] = (0,external_react_.useState)([]);
  const [data2, setData2] = (0,external_react_.useState)([]);
  const [data3, setData3] = (0,external_react_.useState)([]);
  const [active, setActive] = (0,external_react_.useState)("All");
  const [, setTypeName] = (0,external_react_.useState)();
  const [page, setPage] = (0,external_react_.useState)(1);
  const [, setIsEmpty] = (0,external_react_.useState)(false);
  const queryParam = {
    page
  };
  const {
    isLoading,
    querieddata,
    isLastPage,
    isLoadingNextPage
  } = useQueryGetRequest("videos", queryParam, videoApis.getVideos);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(querieddata?.length, page, setPage);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Videos - Get islamic resources on Dawah Nigeria`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "video_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "vid_header_link bg-background max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Videos"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "video_filter",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "video_filter_categories",
          children: categories.map(({
            categories,
            id
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(filterButton_FilterButton, {
              filter: filter,
              setFilter: setFilter,
              data1: data1,
              setData1: setData1,
              data2: data2,
              setData2: setData2,
              data3: data3,
              setData3: setData3,
              active: active,
              setActive: setActive,
              title: categories,
              setTypeName: setTypeName,
              setIsEmpty: setIsEmpty,
              action: "categories",
              data: querieddata
            }, idx);
          })
        })
      }), isLoading && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-full flex items-center justify-center h-[300px]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "video_widget",
        children: Array.isArray(querieddata) && querieddata?.map(({
          images,
          id,
          favourites,
          author,
          views,
          title,
          duration
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            ref: idx === querieddata.length - 1 && !isLastPage ? infiniteScrollRef : null,
            onClick: () => {
              navigate(`${VIDEOS}${id}`);
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(videoWidget_VideoWidget, {
              title: title,
              lecturer: author,
              views: views,
              img: images,
              favourites: favourites,
              duration: duration
            }, idx)
          });
        })
      }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-full flex items-center h-[100px] justify-center ",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })]
    })]
  });
};
/* harmony default export */ const videos_Videos = (Videos);
;// CONCATENATED MODULE: ./src/components/albumWidget/AlbumWidget.jsx





const AlbumWidget = ({
  img,
  categories,
  lec_no,
  rpname,
  views,
  duration,
  date,
  viewMode
}) => {
  const formatViews = count => {
    if (!count) return "0";
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };
  const formatDuration = seconds => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "album_widget_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "album_widget_img_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: img || IMAGE_PLACEHOLDERS.lecture,
        alt: categories,
        className: "album_widget_img"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "album_overlay"
      }), duration && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "duration-overlay",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineClock, {
          className: "inline-block"
        }), formatDuration(duration)]
      }), categories && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
        className: "album_widget_name",
        children: categories
      })]
    }), lec_no && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "album_categories",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineMusicalNote, {
        className: "inline-block mr-1"
      }), lec_no, " lectures"]
    })]
  });
};
/* harmony default export */ const albumWidget_AlbumWidget = (AlbumWidget);
;// CONCATENATED MODULE: ./src/pages/playlists/Playlists.jsx














const Playlists = () => {
  const [filter, setFilter] = (0,external_react_.useState)([]);
  const [data1, setData1] = (0,external_react_.useState)([]);
  const [data2, setData2] = (0,external_react_.useState)([]);
  const [data3, setData3] = (0,external_react_.useState)([]);
  const [active, setActive] = (0,external_react_.useState)("All");
  const [active1, setActive1] = (0,external_react_.useState)("All");
  const [catid, setCatid] = (0,external_react_.useState)("40217");
  const [langid, setLangid] = (0,external_react_.useState)("6");
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [, setTypeName] = (0,external_react_.useState)();
  const [, setIsEmpty] = (0,external_react_.useState)(false);
  const {
    data: categories
  } = useCategoriesHook();
  const {
    data: languages
  } = useLanguagesHook();
  const {
    data: allPlaylists,
    isLoading
  } = useAllPlaylistHook();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Playlists - Get islamic resources on Dawah Nigeria`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "playlist_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "play_header_link bg-background",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Playlist"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "playlist_filter",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "playlist_filter_categories",
          children: Array.isArray(categories) && categories?.map(({
            name,
            id
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(filterButton_FilterButton, {
              filter: filter,
              setFilter: setFilter,
              data1: data1,
              setData1: setData1,
              data2: data2,
              setData2: setData2,
              data3: data3,
              setData3: setData3,
              active: active,
              setActive: setActive,
              title: name,
              action: "categories",
              data: allPlaylists,
              id: id,
              setTypeName: setTypeName,
              setIsEmpty: setIsEmpty,
              setCatid: setCatid
            }, idx);
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "playlist_filter_language",
          children: Array.isArray(languages) && languages?.map(({
            name,
            id
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(filterButton_FilterButton, {
              filter: filter,
              setFilter: setFilter,
              data1: data1,
              setData1: setData1,
              data2: data2,
              setData2: setData2,
              data3: data3,
              setData3: setData3,
              active: active1,
              setActive: setActive1,
              title: name,
              action: "language",
              data: allPlaylists,
              setIsEmpty: setIsEmpty,
              setTypeName: setTypeName,
              lid: id,
              setLangid: setLangid
            }, idx);
          })
        })]
      }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop mgt",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loads",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "playlist_widget",
        children: !isLoading && Array.isArray(allPlaylists) && allPlaylists.map(({
          img,
          id,
          name,
          lec_no
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              navigate(`${PLAYLISTS}${id}`);
            },
            className: "playlist_lists_items",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
              lec_no: lec_no || 0,
              categories: name,
              img: img
            }, idx)
          }, idx + 1);
        })
      })]
    })]
  });
};
/* harmony default export */ const playlists_Playlists = (Playlists);
;// CONCATENATED MODULE: ./src/components/charts/dailyLectures.jsx






function DailyLectures() {
  const keyParam = {
    action: "daily"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("dailyLectures", keyParam, chartsApi.getLectures);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space max-[615px]:pt-[4rem]",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Daily Lectures",
      type: "lectures",
      styling: isChart,
      navLinking: "/l",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/weeklyLecures.jsx






function WeeklyLectures() {
  const keyParam = {
    action: "weekly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("weeklyLectures", keyParam, chartsApi.getLectures);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space max-[615px]:pt-[4rem]",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Weekly Lectures",
      type: "lectures",
      styling: isChart,
      navLinking: "/l",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/monthlyLectures.jsx






function MonthlyLectures() {
  const keyParam = {
    action: "monthly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("monthlyLectures", keyParam, chartsApi.getLectures);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space max-[615px]:pt-[4rem]",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Monthly Lectures",
      type: "lectures",
      styling: isChart,
      navLinking: "/l",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/dailyAlbums.jsx






function DailyAlbums() {
  const keyParam = {
    action: "daily"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("dailyAlbums", keyParam, chartsApi.getAlbums);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Daily Albums",
      type: "album",
      styling: isChart,
      navLinking: "/a",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/weeklyAlbums.jsx






function WeeklyAlbums() {
  const keyParam = {
    action: "weekly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("weeklyAlbums", keyParam, chartsApi.getAlbums);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Weekly Albums",
      type: "album",
      styling: isChart,
      navLinking: "/a",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/monthlyAlbums.jsx






function MonthlyAlbums() {
  const keyParam = {
    action: "monthly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("monthlyAlbums", keyParam, chartsApi.getAlbums);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Monthly Albums",
      type: "album",
      styling: isChart,
      navLinking: "/a",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/dailyRp.jsx






function DailyRps() {
  const keyParam = {
    action: "monthly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("dailyRps", keyParam, chartsApi.getRps);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Daily Lecturers",
      type: "lecturer",
      styling: isChart,
      navLinking: "/rp",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/weeklyRps.jsx






function WeeklyRps() {
  const keyParam = {
    action: "weekly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("weeklyRps", keyParam, chartsApi.getRps);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Weekly Lecturers",
      type: "lecturer",
      styling: isChart,
      navLinking: "/rp",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/monthlyRps.jsx






function MonthlyRps() {
  const keyParam = {
    action: "monthly"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("monthlyRps", keyParam, chartsApi.getRps);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Monthly Lecturers",
      type: "lecturer",
      styling: isChart,
      navLinking: "/rp",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/dailyPlaylists.jsx






function DailyPlaylists() {
  const keyParam = {
    action: "daily"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("dailyPlaylists", keyParam, chartsApi.getPlaylists);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Daily Playlists",
      type: "playlist",
      styling: isChart,
      navLinking: "/pl",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/weeklyPlaylists.jsx






function WeeklyPlaylists() {
  const keyParam = {
    action: "daily"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("weeklyPlaylists", keyParam, chartsApi.getPlaylists);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Weekly Playlists",
      type: "playlist",
      styling: isChart,
      navLinking: "/pl",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/charts/monthlyPlaylists.jsx






function MonthlyPlaylists() {
  const keyParam = {
    action: "daily"
  };
  const isChart = true;
  const {
    querieddata
  } = useQueryGetRequest("monthlyPlaylists", keyParam, chartsApi.getPlaylists);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "charts_recent charts_space",
    children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
      data: querieddata?.data,
      heading: "Top Monthly Playlists",
      type: "playlist",
      styling: isChart,
      navLinking: "/pl",
      nav1: {
        title: "Charts",
        link: CHARTS
      }
    })]
  });
}
;// CONCATENATED MODULE: ./src/pages/charts/Charts.jsx





















const Charts = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Charts - Get islamic resources on Dawah Nigeria`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "charts_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "charts_header_route max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Charts"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DailyLectures, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(WeeklyLectures, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MonthlyLectures, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DailyAlbums, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(WeeklyAlbums, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MonthlyAlbums, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DailyRps, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(WeeklyRps, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MonthlyRps, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DailyPlaylists, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(WeeklyPlaylists, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MonthlyPlaylists, {})]
    })]
  });
};
/* harmony default export */ const charts_Charts = (Charts);
;// CONCATENATED MODULE: ./src/assets/svg/love-d.svg
const love_d_namespaceObject = __webpack_require__.p + "968e224c8d53cca452e1.svg";
;// CONCATENATED MODULE: ./src/assets/svg/com-d.svg
const com_d_namespaceObject = __webpack_require__.p + "9ea2db7ff98a1d3f056d.svg";
;// CONCATENATED MODULE: ./src/assets/svg/headpmobile.svg
const headpmobile_namespaceObject = __webpack_require__.p + "a2082f337b983c22e814.svg";
;// CONCATENATED MODULE: ./src/assets/svg/share-d.svg
const share_d_namespaceObject = __webpack_require__.p + "e6ca571577eea06c2710.svg";
;// CONCATENATED MODULE: ./src/assets/svg/adfav.svg
const adfav_namespaceObject = __webpack_require__.p + "9d9ae71d32d71713a244.svg";
;// CONCATENATED MODULE: ./src/assets/svg/hp-d.svg
const hp_d_namespaceObject = __webpack_require__.p + "e70541c66855c32bae4a.svg";
;// CONCATENATED MODULE: external "react-icons/ci"
const ci_namespaceObject = require("react-icons/ci");
;// CONCATENATED MODULE: ./src/assets/svg/playmobile.svg
const playmobile_namespaceObject = __webpack_require__.p + "feb15a51689502d771e2.svg";
;// CONCATENATED MODULE: ./src/components/UI/soundwave/soundWave.jsx



const AudioWave = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "sound_wrapper loader",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "stroke bg-gray-400 dark:bg-[#ddff2b]"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "stroke bg-gray-400 dark:bg-[#ddff2b]"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "stroke bg-gray-400 dark:bg-[#ddff2b]"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "stroke bg-gray-400 dark:bg-[#ddff2b]"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "stroke bg-gray-400 dark:bg-[#ddff2b]"
    })]
  });
};
;// CONCATENATED MODULE: ./src/components/list/list.jsx




























function List({
  lecturer,
  id,
  title,
  image,
  drop,
  setDrop,
  duration,
  url,
  Title,
  rpid,
  rpname,
  endpoint_url,
  currentPage,
  cats,
  share,
  nid,
  navName,
  navLink,
  controlData,
  views,
  favorites
}) {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    currentUser,
    addplaylist,
    audioId
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [more, setMore] = (0,external_react_.useState)(false);
  const [sumofFav, setsumofFav] = (0,external_react_.useState)(favorites || 0);
  const [addFav, setaddFav] = (0,external_react_.useState)(false);
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const [getFavs, setgetfavs] = (0,external_react_.useState)([]);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [rpData, setrpData] = (0,external_react_.useState)([]);
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const [rpnameArray, setrpnameArray] = (0,external_react_.useState)([]);
  const [isShare, setisShare] = (0,external_react_.useState)(false);

  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#list");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
    lazyImages();
  }, []);
  const shareAudio = e => {
    e.stopPropagation();
    setisShare(!isShare);
    //setNidValue(nid)
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && lecid) {
      await useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        const {
          audio
        } = res.data;
        setgetfavs(Object.values(audio));
      }).catch(err => {});
    }
  }
  (0,external_react_.useEffect)(() => {
    fetchFavorites(addFav, nid);
  }, [addFav, nid]);
  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: lecid,
      type: "audio"
    };
    await useAxios.post(`/leclisting_favorites.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
      setdisabled(false);
      if (!getFavs?.includes(lecid)) {
        setsumofFav(sumofFav + 1);
      } else {
        setsumofFav(sumofFav - 1);
      }
    }).catch(err => {});
  };
  const addToPlaylist = (e, lecid) => {
    e.stopPropagation();
    dispatch(getLecid(lecid));
    dispatch(showaddPlaylist(true));
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "list_wrapper dark:font-light font-medium",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "table text-color-primary",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          dispatch(getCount(id));
          dispatch(getPack(null));
          dispatch(getaudioId(nid));
          dispatch(setPlaying(false));
          dispatch(getPack(controlData));
          dispatch(getPage(currentPage));
          setinitial(false);
          dispatch(getaudioData({
            endpoint_url,
            currentPage,
            controlData,
            navName
          }));
        },
        id: "player",
        className: audioId === nid ? "td bg-hover nowplaying" : "td hover:bg-hover",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "tr",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: audioId === nid ? "num hide" : "num",
            children: id + 1
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: audioId === nid ? " hide" : "plays",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "play_sz",
              src: playmobile_namespaceObject,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: audioId === nid ? "show margin" : "hide",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioWave, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "img_size",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "img_size_sm",
              id: "list",
              src: IMAGE_PLACEHOLDERS.lecture,
              "src-data": image,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "trend_lect_data",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: e => {
                e.stopPropagation();
                navigate(`${LECTURE}${nid}`);
                if (window.innerWidth <= 615) {
                  //dispatch(getaudioId(nid));
                  dispatch(getPack(controlData));
                  dispatch(getPage(currentPage));
                  setinitial(false);
                }
              },
              className: "rel_text",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "main_txt_wrap hover:text-gray-400",
                id: "text",
                children: title
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "like_others text-color",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: hp_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(views) || 0
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  e.stopPropagation();
                },
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  onClick: e => {
                    e.stopPropagation();
                    addToFav(e, nid);
                    fetchFavorites(addFav, nid);
                    setaddFav(!addFav);
                    setdisabled(true);
                  },
                  className: "likeys_img",
                  disabled: isdisabled,
                  children: getFavs?.includes(nid) ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: adfav_namespaceObject,
                    alt: ""
                  }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: love_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(sumofFav)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: share_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(parseInt(share) || 0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: com_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: "0"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "tr2",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "tr2_real_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: rpid ? `${RESOURCE_PERSON}${rpid}` : "#",
              className: "tr2_text",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "text_child line-clamp-2 hover:text-gray-400 xl:w-[230px] w-[160px] max-[700px]:w-[100px] max-[1000px]:w-[130px]",
                children: lecturer || ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "tr2_likeys",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: e => {
                  addToPlaylist(e, nid);
                },
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddplayIcon, {})
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: e => {
                  shareAudio(e);
                },
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                  className: "text-color"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
                nid: nid,
                className: "likeys_img",
                triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {})
              })]
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "tr3",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            children: [" ", duration]
          })
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "mobile_list text-color-primary",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          navigate(url);
          dispatch(getPack(null));
          setinitial(false);
          dispatch(getPack(controlData));
          dispatch(getPage(currentPage));
        },
        className: "music_list",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "wrapped_right",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "wrap_image",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "img_wr",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "img_wrp",
                id: "list",
                src: IMAGE_PLACEHOLDERS.lecture,
                "src-data": image,
                alt: ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "likeys",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                className: "text-color-primary likeys_img dark:text-[#ddff2b] hover:text-color-foreground",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "likeys_img_sz",
                  src: headpmobile_namespaceObject,
                  alt: ""
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_text text-[#e0e0e0]",
                children: formatNumber(views)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: audioId === nid ? "absolute w-full h-fit inset-0 m-auto" : "hidden",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioWave, {})
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "wrap_text",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "title_wrap",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "texta line-clamp-2",
                children: title
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "lect_name_wrap",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "textb text-color-primary line-clamp-1",
                children: lecturer
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "likey_wrap text-color-primary",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  e.stopPropagation();
                },
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  onClick: e => {
                    e.stopPropagation();
                    addToFav(e, nid);
                    setaddFav(!addFav);
                    fetchFavorites(addFav, nid);
                    setdisabled(true);
                  },
                  className: "likeys_img",
                  disabled: isdisabled,
                  children: getFavs?.includes(nid) ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: adfav_namespaceObject,
                    alt: ""
                  }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: love_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text text-foreground",
                  children: formatNumber(sumofFav)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: share_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(share || 0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "likeys",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: com_d_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: "0"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "wrap_left",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
            nid: nid,
            className: "likeys_img_left",
            triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
            onClick: e => {
              e.stopPropagation();
              setMore(!more);
            },
            className: "likeys_img_left",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsThreeDotsVertical, {
              className: "text-[22px] text-foreground"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: more ? " left-[-100px] absolute min-w-max h-fit" : "hidden",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                onClick: e => {
                  e.stopPropagation();
                  setMore(!more);
                },
                className: "fixed inset-0 bg-none z-[90] w-full h-full"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  e.stopPropagation();
                },
                className: "bg-background border shadow-lg z-[200] relative rounded-sm space-y-2 p-1",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  onClick: e => {
                    shareAudio(e, nid);
                  },
                  className: " flex w-full items-center space-x-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineShareAlt, {
                    className: "text-lg text-color"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    className: "text-color",
                    children: "Share"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  onClick: e => {
                    addToPlaylist(e, nid);
                  },
                  className: "flex w-full items-center space-x-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ci_namespaceObject.CiSquarePlus, {
                    className: "text-lg text-color"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    className: "text-color",
                    children: "Add to playlist"
                  })]
                })]
              })]
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddPlaylist, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: isShare ? "share_wrapper" : "hide_share_wrapper",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
        isShare: isShare,
        setisShare: setisShare,
        nid: nid,
        type: "audio"
      })
    })]
  });
}
/* harmony default export */ const list = (List);
;// CONCATENATED MODULE: ./src/pages/trending/Trending.jsx















const Trending = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [page, setPage] = (0,external_react_.useState)(1);
  const queryParam = {
    page
  };
  const {
    isLoading,
    isLoadingNextPage,
    isLastPage,
    querieddata
  } = useQueryGetRequest("trending", queryParam, trendingApi.getTrendings);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(querieddata?.length, page, setPage);
  const {
    ref: infiniteScrollRefMobile
  } = useInfiniteScrollPagination(querieddata?.length, page, setPage);

  //play all audio files
  const playAll = () => {
    navigate(`${LECTURE}${querieddata[0]?.nid}`, {
      state: {
        endpoint_url: `/popular_lec_api.php?langid=6&page=`,
        currentPage: 1,
        idx: 0,
        nid: querieddata[0].nid,
        nav1: {
          title: "playAll",
          link: TRENDING
        }
      }
    });
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Trending resources on Dawah Nigeria - Home of islamic contents`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "trend_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "trend_header_link bg-background max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Trending"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "trend_title_wrap text-color",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "tend_title1",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "tend_hash",
            children: "#"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Title"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "tend_title2",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Lecturer"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "tend_title4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Time"
          })
        })]
      }), isLoading && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "table",
        children: external_lodash_default().uniqBy(querieddata, "nid")?.map(({
          mp3_thumbnail,
          Title,
          rpname,
          img,
          cats,
          nid,
          views,
          favorites,
          rp_id,
          duration
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            ref: idx === querieddata.length - 1 && !isLastPage ? infiniteScrollRef : null,
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(list, {
              id: idx,
              image: mp3_thumbnail || img,
              favorites: favorites,
              duration: duration,
              title: Title,
              lecturer: rpname,
              rpid: rp_id,
              url: `${LECTURE}${nid}`,
              Title: Title,
              rpname: rpname,
              endpoint_url: "/popular_lec_api.php?langid=6&page=",
              currentPage: page,
              cats: cats,
              nid: nid,
              views: views,
              navName: "Trending",
              navLink: TRENDING,
              controlData: querieddata
            }, idx)
          }, idx);
        })
      }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_m",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loads",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "mobile_lists",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: playAll,
          className: "header pb-2 border-b border-color-primary  w-full",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "w-fit h-fit border border-color-primary p-[2px] rounded-full",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillPlayFill, {
              className: "text-[22px] text-color-primary"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "text-color-primary font-medium",
            children: "Play All"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "bg-none h-1 w-1"
        }), isLoading && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load_mobile",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loads",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
          })
        }), querieddata?.map(({
          mp3_thumbnail,
          Title,
          rpname,
          img,
          cats,
          rp_id,
          favorites,
          nid,
          views,
          comments,
          duration,
          share
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            ref: idx === querieddata.length - 1 && !isLastPage ? infiniteScrollRefMobile : null,
            className: "each_mobile_list",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(list, {
              id: idx,
              duration: duration,
              image: mp3_thumbnail || img,
              title: Title,
              lecturer: rpname,
              favorites: favorites,
              comments: comments,
              rpid: rp_id,
              url: `${LECTURE}${nid}`,
              Title: Title,
              rpname: rpname,
              endpoint_url: "/popular_lec_api.php?langid=6&page=",
              currentPage: page,
              cats: cats,
              nid: nid,
              navName: "Trending",
              navLink: TRENDING,
              controlData: querieddata,
              views: views,
              share: share
            }, idx)
          }, idx);
        }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load_m",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loads",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const trending_Trending = (Trending);
;// CONCATENATED MODULE: ./src/components/quranAlbum/QuranAlbum.jsx







const QuranAlbum = ({
  categories,
  img,
  views
}) => {
  const {
    imageRef
  } = useLazyLoadImage(img);
  const formattedViews = (0,external_react_.useMemo)(() => formatNumber(views), [views]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex flex-col text-color-primary text-xs md:text-sm",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "relative group",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "absolute right-1 text-xl md:text-2xl font-bold md:font-black top-1 text-black",
          children: "DN"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            "data-src": img,
            src: IMAGE_PLACEHOLDERS.albumWidget,
            alt: categories,
            className: "w-full h-32 md:h-36 xl:h-40 rounded-md album",
            ref: imageRef
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "absolute z-[2] text-[#d4d4d4] bottom-3 left-3 flex gap-x-1 items-center",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiHeadphones, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: formattedViews
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "gradientbg"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "absolute bg-black/50 left-0 top-0 h-full w-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "flex items-center justify-center h-16 w-16 rounded-full bg-[#222222]/70",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
              className: "text-[#cfcfcf] text-3xl"
            })
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "line-clamp-2 ",
        children: categories
      })]
    })
  });
};
/* harmony default export */ const quranAlbum_QuranAlbum = (QuranAlbum);
;// CONCATENATED MODULE: ./src/pages/quran/Quran.jsx












const Quran_Playlists = () => {
  const [page, setPage] = (0,external_react_.useState)(1);
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useQuranAlbumInfiniteQuery();
  const {
    cummulatedData: albums,
    isLoading: isLoadingAlbums,
    isLoadingNextPage,
    isLastPage
  } = useQuranAlbums(page);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(albums?.length, page, setPage);

  // console.log({ data });
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Quran recitations on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "playlist_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "play_header_link bg-background",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Quran"
        })
      }), isLoadingAlbums && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop mgt",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loads",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 md:mt-0",
        children: albums?.map(({
          img,
          alb_thumbnail,
          id,
          name,
          views
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
            to: `${ALBUMS}${id}`,
            ref: idx === albums.length - 1 && !isLastPage ? infiniteScrollRef : null,
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(quranAlbum_QuranAlbum, {
              views: views,
              categories: name,
              img: img || alb_thumbnail
            }, idx)
          }, idx + 1);
        })
      })]
    }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_m",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "loads",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    })]
  });
};
/* harmony default export */ const Quran = (Quran_Playlists);
;// CONCATENATED MODULE: ./src/components/miscList/musicList.jsx























function MusicList({
  lecturer,
  id,
  title,
  image,
  drop,
  setDrop,
  duration,
  url,
  Title,
  rpname,
  endpoint_url,
  currentPage,
  cats,
  share,
  nid,
  rpid,
  navName,
  navLink,
  controlData,
  views,
  favorites
}) {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    currentUser,
    audioId
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [more, setMore] = (0,external_react_.useState)(false);
  const [sumofFav, setsumofFav] = (0,external_react_.useState)(favorites || 0);
  const [addFav, setaddFav] = (0,external_react_.useState)(false);
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const [getFavs, setgetfavs] = (0,external_react_.useState)([]);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const [rpData, setrpData] = (0,external_react_.useState)([]);
  const [rpnameArray, setrpnameArray] = (0,external_react_.useState)([]);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#mlist");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
    lazyImage();
  }, []);

  ///**** share audio ******** */

  const shareAudio = e => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && lecid) {
      await useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        const {
          audio
        } = res.data;
        setgetfavs(Object.values(audio));
      }).catch(err => {});
    }
  }
  (0,external_react_.useEffect)(() => {
    fetchFavorites(addFav, nid);
  }, [addFav, nid]);
  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: lecid,
      type: "audio"
    };
    await useAxios.post(`/leclisting_favorites.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
      setdisabled(false);
      if (!getFavs?.includes(lecid)) {
        setsumofFav(sumofFav + 1);
      } else {
        setsumofFav(sumofFav - 1);
      }
    }).catch(err => {});
  };
  const addToPlaylist = (e, lecid) => {
    e.stopPropagation();
    dispatch(getLecid(lecid));
    dispatch(showaddPlaylist(true));
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "musicslist_wrapper dark:font-light font-medium",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "table text-color-primary",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          setinitial(false);
          dispatch(getCount(id));
          dispatch(getaudioId(nid));
          dispatch(setPlaying(false));
          dispatch(getPack(null));
          dispatch(getPage(currentPage));
          dispatch(getPack(controlData));
          dispatch(getaudioData({
            endpoint_url,
            currentPage,
            controlData,
            navName
          }));
        },
        className: audioId === nid ? "td bg-hover nowplaying" : "td hover:bg-hover",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "tr",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: audioId === nid ? "num hide" : "num",
            children: id + 1
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: audioId === nid ? " hide" : "plays",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "play_sz",
              src: playmobile_namespaceObject,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: audioId === nid ? "show margin" : "hide",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioWave, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "img_size",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "img_size_sm",
              id: "mlist",
              src: IMAGE_PLACEHOLDERS.lecture,
              "src-data": image,
              alt: "ff"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "trend_lect_data",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: e => {
                e.stopPropagation();
                navigate(url);
              },
              className: "rel_text",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "main_txt_wrap hover:text-gray-400",
                id: "text",
                children: title
              })
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "tr2",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "tr2_real_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: rpid ? `${RESOURCE_PERSON}${rpid}` : "#",
              id: "player",
              className: "tr2_text",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "text_child line-clamp-2 hover:text-gray-400 xl:w-[230px] w-[160px] max-[700px]:w-[100px] max-[1000px]:w-[130px]",
                children: lecturer || ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "tr2_likeys",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                onClick: e => {
                  addToPlaylist(e, nid);
                },
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddplayIcon, {})
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                onClick: e => {
                  shareAudio(e, nid);
                },
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                  className: "text-color"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
                nid: nid,
                className: "likeys_img",
                triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {})
              })]
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "tr3",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            children: [" ", duration]
          })
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "mobile_musicslist text-color-primary",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          navigate(url);
          setinitial(false);
          dispatch(getPack(null));
          dispatch(getPage(currentPage));
          dispatch(getPack(controlData));
          dispatch(getCount(id));
        },
        className: `music_list`,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "wrapped_right",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "wrap_image",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "img_wr",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "img_wrp",
                id: "mlist",
                src: IMAGE_PLACEHOLDERS.lecture,
                "src-data": image,
                alt: ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "likeys",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "likeys_img_sz",
                  src: headpmobile_namespaceObject,
                  alt: ""
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_text text-[#e0e0e0]",
                children: formatNumber(views)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: audioId === nid ? "absolute w-full h-fit inset-0 m-auto" : "hidden",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioWave, {})
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "wrap_text",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "title_wrap",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "texta line-clamp-2",
                children: title
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "lect_name_wrap",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "textb text-color-primary line-clamp-1",
                children: lecturer
              })
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "wrap_left",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
            nid: nid,
            className: "likeys_img_left",
            triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DownloadIcon, {})
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
            onClick: e => {
              e.stopPropagation();
              setMore(!more);
            },
            className: "likeys_img_left",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsThreeDotsVertical, {
              className: "text-[22px] text-color-primary"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: more ? " left-[-100px] absolute min-w-max h-fit" : "hidden",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                onClick: e => {
                  e.stopPropagation();
                  setMore(!more);
                },
                className: "fixed inset-0 bg-none z-[90] w-full h-full"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  e.stopPropagation();
                },
                className: "bg-background border shadow-lg z-[200] relative rounded-sm space-y-2 p-1",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  onClick: e => {
                    shareAudio(e, nid);
                  },
                  className: " flex w-full items-center space-x-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiOutlineShareAlt, {
                    className: "text-lg text-color"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    className: "text-color",
                    children: "Share"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  onClick: e => {
                    addToPlaylist(e, nid);
                  },
                  className: "flex w-full items-center space-x-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ci_namespaceObject.CiSquarePlus, {
                    className: "text-lg text-color"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    className: "text-color",
                    children: "Add to playlist"
                  })]
                })]
              })]
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddPlaylist, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: isShare ? "share_wrapper" : "hide_share_wrapper",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
        isShare: isShare,
        setisShare: setisShare,
        nid: nid,
        type: "audio"
      })
    })]
  });
}
/* harmony default export */ const musicList = (MusicList);
;// CONCATENATED MODULE: ./src/pages/new/New.jsx




//import { useNavigate } from "react-router-dom";










const New = () => {
  const [page] = (0,external_react_.useState)(1);
  const [drop, setDrop] = (0,external_react_.useState)(false);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const queryParam = {
    page
  };
  const {
    isLoading,
    querieddata
  } = useQueryGetRequest("new", queryParam, newApi.getNewLectures);

  //play all audio filesF
  const playAll = () => {
    navigate(`${LECTURE}${querieddata[0?.nid]}`, {
      state: {
        idx: 0,
        nid: querieddata[0].nid,
        nav1: {
          title: "playAll",
          link: NEW
        }
      }
    });
  };

  //const newData = data.filter((a) => a.duration !== "0");
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `New resources on Dawah Nigeria - Home of islamic contents`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "new_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "new_header_link bg-background max-[615px]:border-b border-zinc-700",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "New"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "new_title_wrap",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "new_title1",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "new_hash",
            children: "#"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Title"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "new_title2",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Lecturer"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "new_title4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Time"
          })
        })]
      }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), !isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "table",
        children: querieddata.map(({
          Title,
          rpname,
          cats,
          nid,
          lec_thumbnail,
          comments,
          favorites,
          rp_id,
          duration,
          mp3_duration,
          mp3_title,
          share,
          views
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
              id: idx,
              image: lec_thumbnail,
              comments: comments,
              favorites: favorites,
              duration: mp3_duration || duration,
              title: mp3_title || Title,
              lecturer: rpname,
              drop: drop,
              setDrop: setDrop,
              url: `${LECTURE}${nid}`,
              Title: mp3_title || Title,
              rpid: rp_id,
              rpname: rpname,
              currentPage: page,
              cats: cats,
              nid: nid,
              navName: "Trending",
              navLink: TRENDING,
              controlData: querieddata,
              views: views,
              share: share
            }, idx)
          }, idx);
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "mobile_lists",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: playAll,
          className: "header pb-2 border-b border-color-primary  w-full",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "w-fit h-fit border border-color-primary p-[2px] rounded-full",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillPlayFill, {
              className: "text-[22px] text-color-primary"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "text-color-primary font-medium",
            children: "Play All"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "bg-none h-1 w-1"
        }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load_mobile",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loads",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
          })
        }), !isLoading && querieddata.map(({
          Title,
          rpname,
          img,
          mp3_thumbnail,
          comments,
          rp_id,
          mp3_title,
          cats,
          favorites,
          nid,
          views,
          duration
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "each_mobile_list",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
              id: idx,
              duration: duration,
              image: mp3_thumbnail || img,
              title: mp3_title || Title,
              lecturer: rpname,
              favorites: favorites,
              comments: comments,
              url: `${LECTURE}${nid}`,
              Title: mp3_title || Title,
              rpname: rpname,
              currentPage: page,
              cats: cats,
              rpid: rp_id,
              nid: nid,
              navName: "Trending",
              navLink: TRENDING,
              controlData: querieddata,
              views: views
            }, idx)
          }, idx);
        })]
      })]
    })]
  });
};
/* harmony default export */ const new_New = (New);
;// CONCATENATED MODULE: ./src/assets/png/loginheroimg.png
const loginheroimg_namespaceObject = __webpack_require__.p + "eb626e45af39b8a4f540.png";
;// CONCATENATED MODULE: external "react-icons/io5"
const io5_namespaceObject = require("react-icons/io5");
;// CONCATENATED MODULE: ./src/pages/Authentication/auth/Auth.jsx








const Login = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const location = (0,external_react_router_dom_namespaceObject.useLocation)();
  const pathname = location.pathname;
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "auth_wrapper bg-background",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "auth_container min-[690px]:bg-auth shadow-lg",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        className: "auth_hero_image",
        src: loginheroimg_namespaceObject,
        "src-data": loginheroimg_namespaceObject,
        alt: "loginhero"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: `min-[690px]:hidden ${theme === "dark" ? "gradientauth" : "gradientauth_light"}`
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: pathname === "/auth/selectlanguage" ? "auth_header_logo_none" : "auth_header_logo",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => {
            navigate("/");
          },
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(io5_namespaceObject.IoCloseOutline, {
            className: "text-foreground text-2xl min-[690px]:text-5xl"
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sl_wrapper",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: pathname === "/auth/selectlanguage" ? "auth_links_none" : "auth_links",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
            to: "/auth/login",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: ` text-foreground ${pathname === "/auth/login" ? "auth_login_link_active" : "auth_login_link"}`,
              children: "Log in"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
            to: "/auth/signup",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: ` text-foreground  ${pathname === "/auth/signup" ? "auth_signup_link_active" : "auth_signup_link"}`,
              children: "Sign up"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "auth_outlet text-foreground",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Outlet, {})
        })]
      })]
    })
  });
};
/* harmony default export */ const Auth = (Login);
;// CONCATENATED MODULE: ./src/assets/png/social/twitter.png
const twitter_namespaceObject = __webpack_require__.p + "d7d502e17c3a6dfaf986.png";
;// CONCATENATED MODULE: external "@react-oauth/google"
const google_namespaceObject = require("@react-oauth/google");
;// CONCATENATED MODULE: external "react-icons/fc"
const fc_namespaceObject = require("react-icons/fc");
;// CONCATENATED MODULE: ./src/utils/googleCustomButton.jsx








const GoogleCustomButton = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [, setLoading] = (0,external_react_.useState)(false);
  const login = (0,google_namespaceObject.useGoogleLogin)({
    onSuccess: async tokenResponse => {
      external_axios_default().get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: "Bearer " + tokenResponse.access_token
        }
      }).then(res => {
        const {
          email,
          name
        } = res.data;
        const payload = {
          action: "register_user",
          is_social: true,
          type: "google",
          google_access_token: tokenResponse.access_token,
          name,
          email
        };
        if (pathname === "/auth/login") {
          const isSocial = true;
          dispatch(LoginAction({
            languageId: 6,
            ...payload
          }, isSocial, navigate, setLoading));
        } else {
          navigate("/auth/selectlanguage", {
            state: {
              payload
            }
          });
        }
      }).catch(err => {});
    }
  });
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
    onClick: () => {
      login();
    },
    className: " text-gray-200  hover:text-[#070707] space-x-3 hover:bg-gray-200 w-full flex justify-center items-center rounded-[5px] h-[47px] dark:border-[#ddff2b] min-[615px]:text-[#070707] border dark:border bg-none min-[615px]:bg-gray-100 min-[615px]:dark:border-0  min-[615px]:border",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fc_namespaceObject.FcGoogle, {
      className: "text-[25px] text-color"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "font-medium text-foreground",
      children: "Sign in with google"
    })]
  });
};
/* harmony default export */ const googleCustomButton = (GoogleCustomButton);
;// CONCATENATED MODULE: ./src/pages/Authentication/socials/googleauth.jsx





function GetGoogleOAuth() {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "w-full relative",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(components_ClientOnly, {
      fallback: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        children: "Loading Google Auth..."
      }),
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(google_namespaceObject.GoogleOAuthProvider, {
        clientId: "498332584921-nghgkmqicq5ijukvrhjljfilsl8mg4n8.apps.googleusercontent.com",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(googleCustomButton, {})
      })
    })
  });
}
/* harmony default export */ const googleauth = (GetGoogleOAuth);
;// CONCATENATED MODULE: ./src/assets/png/social/facebook.png
const facebook_namespaceObject = __webpack_require__.p + "1ad771a21cc2e7ec8eb3.png";
;// CONCATENATED MODULE: ./src/pages/Authentication/socials/facebookauth.jsx








function GetFacebookAuth() {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [LoginSocialFacebook, setLoginSocialFacebook] = (0,external_react_.useState)(null);
  (0,external_react_.useEffect)(() => {
    // Dynamic import to prevent SSR issues
    Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 157, 23)).then(module => {
      setLoginSocialFacebook(() => module.LoginSocialFacebook);
    }).catch(err => {
      console.error("Failed to load social login:", err);
    });
  }, []);
  const handleFacebookLogin = response => {
    const {
      name,
      email,
      accessToken
    } = response.data;
    if (pathname === "/auth/login") {
      const payload = {
        action: "login_user",
        email_or_username: email,
        token: accessToken
      };
    } else {
      navigate("/auth/selectlanguage", {
        state: {
          name,
          email,
          accessToken
        }
      });
    }
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(components_ClientOnly, {
      fallback: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "cursor-pointer size_img",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "ssz",
          src: facebook_namespaceObject,
          "src-data": facebook_namespaceObject,
          alt: "facebook"
        })
      }),
      children: LoginSocialFacebook ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(LoginSocialFacebook, {
        appId: "392392739611134",
        onResolve: handleFacebookLogin,
        onReject: err => {},
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "cursor-pointer size_img",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            className: "ssz",
            src: facebook_namespaceObject,
            "src-data": facebook_namespaceObject,
            alt: "facebook"
          })
        })
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "cursor-pointer size_img",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "ssz",
          src: facebook_namespaceObject,
          "src-data": facebook_namespaceObject,
          alt: "facebook"
        })
      })
    })
  });
}
/* harmony default export */ const facebookauth = (GetFacebookAuth);
;// CONCATENATED MODULE: ./src/pages/Authentication/LoginForm.jsx



//import facebook from "../../assets/png/social/facebook.png";

//import google from "../../assets/png/social/google.png";










const LoginForm = () => {
  const [show, setShow] = (0,external_react_.useState)("password");
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [data, setData] = (0,external_react_.useState)({
    email: "",
    password: ""
  });
  const handleInput = e => {
    const newData = {
      ...data
    };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password
    } = data;
    const validateData = {
      email,
      password
    };
    for (let i in validateData) {
      if (validateData[i] === "") {
        external_react_hot_toast_namespaceObject.toast.error(`${i} cannot be empty`);
        return;
      }
    }
    if (password.length < 6) {
      external_react_hot_toast_namespaceObject.toast.error("Password must be at least 6 characters");
      return;
    }
    const payload = {
      action: "login_user",
      email_or_username: email,
      password: password
    };
    const isSocial = false;
    dispatch(LoginAction(payload, isSocial, navigate, setLoading));
  };
  const {
    email,
    password
  } = data;
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "loginform_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: "Sign in to Dawah Nigeria | Home of Islamic resources"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("form", {
      onSubmit: e => {
        handleSubmit(e);
      },
      style: {
        height: `${Math.floor(0.7 * window.innerHeight)}px`
      },
      className: "loginform_form",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          onChange: e => {
            handleInput(e);
          },
          type: "email",
          name: "email",
          placeholder: "Email Address",
          required: true,
          value: email,
          id: "email",
          className: "loginform_name text-foreground "
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "loginform_password_wrap ",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => {
              handleInput(e);
            },
            type: show,
            placeholder: "Password",
            name: "password",
            required: true,
            value: password,
            id: "password",
            className: "loginform_password text-foreground "
          }), show === "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loginform_password_icon_show_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEye, {
              onClick: () => setShow("text"),
              className: "loginform_password_icon_show text-color"
            })
          }), show !== "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loginform_password_icon_hide_wrap ",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEyeInvisible, {
              onClick: () => setShow("password"),
              className: "loginform_password_icon_hide text-color"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loginform_forgot_wrap",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            onClick: () => {
              navigate(FORGOTPASSWORD);
            },
            className: "loginform_forgot",
            children: "Forgot password?"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
          className: "loginform_button",
          children: [" ", loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Log in"
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
        className: "loginform_or text-color",
        children: "- or -"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: " login_socials inset-x-0 w-full items-center mx-auto h-fit",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "hidden",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(facebookauth, {
            data: data,
            setData: setData
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          onClick: () => {
            external_react_hot_toast_namespaceObject.toast.error("Feature not yet available");
          },
          className: "hidden w-[45px] h-[45px]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            className: "w-full h-full",
            src: twitter_namespaceObject,
            alt: "twitter"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "z-[1] w-full",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(googleauth, {
            data: data,
            setData: setData
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const Authentication_LoginForm = (LoginForm);
;// CONCATENATED MODULE: ./src/pages/Authentication/SignupForm.jsx



//import facebook from "../../assets/png/social/facebook.png";

//import google from "../../assets/png/social/google.png";











const SignupForm = () => {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [show, setShow] = (0,external_react_.useState)("password");
  const [show2, setShow2] = (0,external_react_.useState)("password");
  const [isdrop, setisdrop] = (0,external_react_.useState)(false);
  const [langData, setLangData] = (0,external_react_.useState)();
  const [terms, setTerms] = (0,external_react_.useState)(0);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [langid, setlangid] = (0,external_react_.useState)("");
  const [lang, setLang] = (0,external_react_.useState)("");
  const [data, setData] = (0,external_react_.useState)({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const isSocial = false;
  (0,external_react_.useEffect)(() => {
    useAxios.get(`/all_lang_api.php`).then(res => {
      setLangData(res.data);
    }).catch(err => {});
  }, []);
  const handleInput = e => {
    e.preventDefault();
    const newData = {
      ...data
    };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      name,
      confirm_password
    } = data;
    const validateData = {
      name,
      email,
      password,
      language: langid
    };
    for (let i in validateData) {
      if (validateData[i] === "") {
        external_react_hot_toast_namespaceObject.toast.error(`${i} cannot be empty`);
        return;
      }
    }
    if (password.length < 6 || confirm_password.length < 6) {
      external_react_hot_toast_namespaceObject.toast.error("Password must be at least 6 characters");
      return;
    }
    if (confirm_password !== password) {
      external_react_hot_toast_namespaceObject.toast.error("Same password is required");
      return;
    }
    const payload = {
      action: "register_user",
      username: name,
      email: email,
      password: password,
      languageId: langid
    };
    const getId = {
      action: "login_user",
      email_or_username: email,
      password: password
    };
    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
  };
  const {
    email,
    password,
    name,
    confirm_password
  } = data;
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "signupform_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: "Sign up on Dawah Nigeria | Home of Islamic resources"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("form", {
      onSubmit: e => {
        handleSubmit(e);
      },
      style: {
        height: `${Math.floor(0.7 * window.innerHeight)}px`
      },
      className: "signupform_form",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          onChange: e => {
            handleInput(e);
          },
          type: "text",
          name: "text",
          placeholder: "Username",
          required: true,
          value: name,
          id: "name",
          className: "signupform_fullname text-foreground"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          onChange: e => {
            handleInput(e);
          },
          type: "email",
          name: "email",
          placeholder: "Email Address",
          required: true,
          value: email,
          id: "email",
          className: "signupform_name text-foreground"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "signupform_password_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => {
              handleInput(e);
            },
            type: show,
            placeholder: "Password",
            name: "password",
            required: true,
            value: password,
            id: "password",
            className: "signupform_password text-foreground"
          }), show === "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "signupform_password_icon_show_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEye, {
              onClick: () => setShow("text"),
              className: "signupform_password_icon_show text-color"
            })
          }), show !== "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "signupform_password_icon_hide_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEyeInvisible, {
              onClick: () => setShow("password"),
              className: "signupform_password_icon_hide text-color"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "signupform_confpassword_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            onChange: e => {
              handleInput(e);
            },
            type: show2,
            placeholder: "Confirm Password",
            name: "confirm_password",
            required: true,
            value: confirm_password,
            id: "confirm_password",
            className: "signupform_confpassword text-foreground"
          }), show2 === "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "signupform_confpassword_icon_show_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEye, {
              onClick: () => setShow2("text"),
              className: "signupform_confpassword_icon_show text-color"
            })
          }), show2 !== "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "signupform_confpassword_icon_hide_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEyeInvisible, {
              onClick: () => setShow2("password"),
              className: "signupform_confpassword_icon_hide text-color"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            setisdrop(!isdrop);
          },
          className: isdrop ? "signupform_lang rbb z-[20]" : "signupform_lang bb",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: lang ? "selected_lang" : "selected_lang_none",
            children: lang || "-select a language-"
          }), isdrop && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "selected_lang_drop",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => {
                setisdrop(!isdrop);
              },
              className: "fixed z-[50] inset-0 bg-none w-full h-full"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "relative z-[60] w-full h-[200px] overflow-y-auto shadow-lg",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "flex flex-col w-full h-full",
                children: langData.map(({
                  name,
                  id
                }, index) => {
                  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                    onClick: () => {
                      setlangid(id);
                      setLang(name);
                      setisdrop(!isdrop);
                    },
                    className: "drops hover:bg-gray-100 cursor-pointer",
                    children: name
                  }, index);
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          className: "signupform_button",
          children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Sign up"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "signupform_terms",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              setTerms(!terms);
            },
            className: `signupform_terms_button ${terms ? "signupform_terms_button_active" : "signupform_terms_button_inactive"}`
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "signupform_terms_text",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
              className: "signupform_terms_text1 text-color",
              children: ["I have read and accept the", " "]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "signupform_terms_text2 text-foreground dark:text-[#ddff2b]",
              children: "Terms and Condition"
            })]
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
        className: "signupform_or text-color",
        children: "- or -"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "login_socials inset-x-0 flex items-center w-full mx-auto h-fit",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "hidden",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(facebookauth, {
            data: data,
            setData: setData
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "hidden w-[45px] h-[45px]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            className: "w-full h-full",
            src: twitter_namespaceObject,
            alt: "twitter"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "z-[1] w-full",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(googleauth, {
            data: data,
            setData: setData
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const Authentication_SignupForm = (SignupForm);
;// CONCATENATED MODULE: ./src/components/currentData/currentPlayData.jsx



const CurrentPlayData = ({
  datas,
  iscurrents,
  setcurrents
}) => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    onClick: () => {
      setcurrents(!iscurrents);
    },
    className: iscurrents ? "w-full inset-0 z-[55] fixed bg-none h-full" : "hidden",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      onClick: e => {
        e.stopPropagation();
      },
      className: "w-full h-[48vh] let swipeUp absolute bottom-[-9px] pt-2 pb-6 inset-x-0 bg-background bg-opacity-[0.97] rounded-t-2xl",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-[20%] h-[6px] rounded-3xl bg-primary-foreground mx-auto"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-full h-full ",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "overflow-y-auto w-full h-fit max-h-[50vh] bg-background bg-opacity-[0.97]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            children: [datas?.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "text-color w-full h-full flex justify-center items-center",
              children: "-no lecture-"
            }), datas?.length !== 0 && datas?.map(({
              title,
              Title,
              nid
            }, idx) => {
              return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
                  to: `/dawahcast/l/${nid}`,
                  className: "w-full px-2 py-4 border-b text-color text-[13px] text-sm border-gray-300 flex flex-col",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                    children: Title || title
                  })
                })
              }, idx);
            })]
          })
        })
      })]
    })
  });
};
/* harmony default export */ const currentPlayData = (CurrentPlayData);
;// CONCATENATED MODULE: ./src/assets/svg/boom-fav.svg
const boom_fav_namespaceObject = __webpack_require__.p + "3f49e28f61f264538a8a.svg";
;// CONCATENATED MODULE: ./src/components/UI/favoritebuttons/desktopfavoriteButtons.jsx









function DesktopFavoriteButton({
  favorites,
  id,
  type,
  refetch
}) {
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [isLoading, setLoading] = (0,external_react_.useState)(false);
  const formatFavorite = (0,external_react_.useMemo)(() => formatNumber(favorites || 0), [favorites]);
  const keyParam = {
    id: currentUser?.id,
    type
  };
  const {
    favoriteCount,
    refetch: refetchFavorite
  } = useFetchFavoritesHook(keyParam);

  /////get users favorites

  const {
    mutate: addToFavorite
  } = useAddFavoritesHook();
  const addToFav = async e => {
    e.stopPropagation();
    if (!currentUser?.id) {
      external_react_hot_toast_default().error("Login or register to add to favorites");
      return;
    }
    setLoading(true);
    const payload = {
      user_id: currentUser?.id,
      item_id: parseInt(id),
      type
    };
    addToFavorite(payload, {
      onSuccess: data => {
        external_react_hot_toast_default().success(data.message);
        refetch(); //refetch favorite count
        refetchFavorite(); // refetch all favorite
        setdisabled(false);
        setLoading(false);
      },
      onError: error => {}
    });
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
    onClick: e => {
      e.stopPropagation();
      addToFav(e);
      setdisabled(true);
    },
    disabled: isdisabled,
    className: "leclistdet_fav bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "fav_btn",
      children: favoriteCount[type]?.includes(parseInt(id)) ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdFavorite, {
        className: "leclistdet_fav_icon_active dark:text-[#ddff2b] text-foreground"
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddFavourites, {})
    }), isLoading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_hot_toast_namespaceObject.LoaderIcon, {
      className: "text-sm animate-spin"
    }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
      className: "leclistdet_fav_text text-color-primary",
      children: formatFavorite
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/comment/comment.jsx









const CommentBox = ({
  id,
  audioComment,
  type
}) => {
  const [comment, setComment] = (0,external_react_.useState)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const postComment = () => {
    if (!currentUser?.id) {
      navigate("/auth/login");
      external_react_hot_toast_namespaceObject.toast.error("Login or register to comment");
      return;
    }
    if (comment === "") return;
    const payload = {
      user_id: currentUser?.id,
      item_id: id,
      type: type,
      comment: comment
    };
    //post comment
    useAxios.post(`/commentApi.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setComment("");
    }).catch(err => {});
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "comment-box",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecalb_comments_header text-foreground",
      children: "Comments"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("textarea", {
      className: "lecalb_comment_input bg-comment",
      placeholder: "Pls share your thoughts",
      name: "",
      id: "",
      cols: "30",
      value: comment,
      rows: "5",
      maxLength: "500",
      onChange: e => {
        setComment(e.target.value);
      }
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lecalb_comment_action",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlEmotsmile, {
        className: "lecalb_comment_moji"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: postComment,
        className: "lecalb_comment_button",
        children: "Comment"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "aud_comment_texts",
      children: Array.isArray(audioComment) && audioComment?.map(({
        user,
        date,
        content
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "com_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "com_date",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "logo_img",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "logo_img_sz",
                src: dn_logo_namespaceObject,
                alt: ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "commentor",
              children: user
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "comment_date",
              children: date
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "comment_content",
            children: content
          })]
        });
      })
    })]
  });
};
/* harmony default export */ const comment_comment = (CommentBox);
;// CONCATENATED MODULE: ./src/pages/audioDetail/AudioDetail.jsx












































const AudioDetail = () => {
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const {
    currentUser,
    audioId,
    curDuration,
    value,
    audioData,
    currentAudioInfo,
    page,
    playing,
    count,
    pack,
    isrepeat
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    state
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const [more, setMore] = (0,external_react_.useState)(0);
  const [moreOption, setmoreOption] = (0,external_react_.useState)(false);
  const {
    audioRef,
    setinitial,
    loading
  } = (0,external_react_.useContext)(AudioContext);
  const slide = (0,external_react_.useRef)();
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const [subdata, setSubData] = (0,external_react_.useState)([]);
  const [currentaudio, setcurrentaudio] = (0,external_react_.useState)([]);
  const [curUser, setCurUser] = (0,external_react_.useState)(currentUser || null);
  const [iscurrents, setcurrents] = (0,external_react_.useState)(false);
  const rangeRef = (0,external_react_.useRef)();
  const [isprev, setisprev] = (0,external_react_.useState)(false);
  const [isnext, setisnext] = (0,external_react_.useState)(true);
  const [isComment, setIsComment] = (0,external_react_.useState)(false);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [isPrevious, setIsPrevious] = (0,external_react_.useState)(false);
  const [isAddedToFavorite, setisAddedToFavorite] = (0,external_react_.useState)(false);
  const [similarAudio, setSimilarAudio] = (0,external_react_.useState)([]);
  const [addFav, setaddFav] = (0,external_react_.useState)(false);
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const [getFavs, setgetfavs] = (0,external_react_.useState)([]);
  const [sumofFav, setsumofFav] = (0,external_react_.useState)(0);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [comment, setComment] = (0,external_react_.useState)("");
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const {
    refetch
  } = useAudioHook(id);
  const keyParam = {
    id: currentAudioInfo?.rp_id,
    page: 1
  };
  const {
    querieddata: similarAudios
  } = useSimilarAudioHook(keyParam);
  const handlePlay = () => {
    dispatch(getaudioId(id));
    setinitial(false);
    if (playing) {
      dispatch(setPlaying(!playing));
    } else {
      dispatch(setPlaying(!playing));
    }
  };
  const handleRange = curr => {
    dispatch(getValue(curr));
    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };
  const handleNextAudio = () => {
    setIsPrevious(false);
    dispatch(setPlaying(false));
    const next = pack?.findIndex(value => {
      return value.nid === parseInt(id);
    });
    if (!isEmpty && pack?.length - 1 - next <= 2) {
      dispatch(getPage(page + 1));
    }
    if (next === pack?.length - 1) {
      navigate(`${LECTURE}${pack[next]?.nid}`);
      dispatch(getCount(next));
    } else if (count < pack?.length - 1) {
      navigate(`${LECTURE}${pack[next + 1]?.nid}`);
      dispatch(getCount(next + 1));
    } else {
      navigate(`${LECTURE}${pack[0]?.id}`);
      dispatch(getCount(0));
    }
    setinitial(false);
  };
  const handlePreviousAudio = () => {
    dispatch(setPlaying(false));
    const prev = pack?.findIndex(value => {
      return value.nid === parseInt(id);
    });
    if (page > 1 && pack.length - 1 - prev <= pack.length - 1 - 2) {
      setIsPrevious(true);
      dispatch(getPage(page - 1));
    }
    if (prev === 0) {
      navigate(`${LECTURE}${pack[prev]?.nid}`);
      dispatch(getCount(prev));
    } else {
      navigate(`${LECTURE}${pack[prev - 1]?.nid}`);
      dispatch(getCount(prev - 1));
    }
    setinitial(false);
    //audioRef.current?.currentTime = 0;
  };

  /// add to playlist ...../////////
  const addToPlaylist = (e, lecid) => {
    e.stopPropagation();
    dispatch(showaddPlaylist(true));
    dispatch(getLecid(lecid));
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!curUser?.id) return;
    if (addFav || !addFav && lecid) {
      await useAxios.get(`/leclisting_favorites.php?user_id=${curUser?.id}&type=audio`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {
        const {
          audio
        } = res.data;
        setgetfavs(Object.values(audio));
      }).catch(err => {});
    }
  }
  (0,external_react_.useEffect)(() => {
    fetchFavorites(addFav, currentAudioInfo?.nid);
  }, [addFav, currentAudioInfo?.nid]);
  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();
    if (!curUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: curUser?.id,
      item_id: lecid,
      type: "audio"
    };
    await useAxios.post(`/leclisting_favorites.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
      setdisabled(false);
      if (!getFavs?.includes(parseInt(lecid))) {
        setsumofFav(sumofFav + 1);
      } else {
        setsumofFav(sumofFav - 1);
      }
    }).catch(err => {});
  };

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!curUser?.id) {
      return;
    }
    useAxios.get(`/commentApi.php?user_id=${curUser?.id}&item_id=${currentAudioInfo?.nid}&type=audio`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, [currentAudioInfo?.nid]);
  const postComment = () => {
    if (!curUser?.id) {
      navigate("/auth/login");
      external_react_hot_toast_namespaceObject.toast.error("Login or register to comment");
      return;
    }
    if (comment === "") return;
    const payload = {
      user_id: curUser?.id,
      item_id: currentAudioInfo?.nid,
      type: "audio",
      comment: comment
    };
    useAxios.post(`/commentApi.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setComment("");
    }).catch(err => {});
  };

  ///scrolll to view
  (0,external_react_.useEffect)(() => {
    if (isComment) {
      window.scrollTo({
        top: 900,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [isComment]);

  ///////******************/ Similar audios ***********///////////

  //get lectures from the same lecturers
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  (0,external_react_.useEffect)(() => {
    function scrollEl() {
      if (slide.current?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }
      if (slide.current?.scrollLeft + slide.current?.offsetWidth >= slide.current?.scrollWidth) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }
    slide.current?.addEventListener("scroll", scrollEl);
    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);
  const {
    data: similarLecture,
    isLoading
  } = useRequest("get", `/genre_api.php?cat_id=${currentAudioInfo?.cat_id}`);
  const shareAudio = () => {
    setisShare(!isShare);
    //setNidValue(nid)
  };

  ////*********************************************************** */
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${currentAudioInfo?.title?.split("-")[0] || currentAudioInfo?.Title || "Audio"} on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "audiodetail_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        className: `${theme === "dark" ? "audiodetail_hero" : "audiodetail_hero_light"}`,
        src: currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture,
        alt: "audiohero"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "audiodetail_container",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "audiodetail_breadcrumb",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            onClick: () => {
              navigate(-1);
            },
            className: "audiodetail_breadcrumb_first",
            children: audioData?.navName && audioData.navName !== "Home" ? `← Back to ${audioData.navName}` : audioData?.navName === "Home" ? "← Back to Home" : "← Back"
          }), audioData?.navName && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "audiodetail_breadcrumb_second text-foreground",
            children: currentAudioInfo?.title?.split("-")[0] || currentAudioInfo?.Title || "Unknown"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "audiodetail_head_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "audiodetail_head_left",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "audiodetail_head_left_img",
              src: currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiodetail_head_right",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "audiodetail_head_right_head text-foreground",
              children: currentAudioInfo?.title || currentAudioInfo?.Title || "Unknown"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_head_right_text",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "audiodetail_head_right_text1 text-color-foreground",
                children: currentAudioInfo?.rpname || "unknown"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "audiodetail_head_right_text2 text-color-foreground",
                children: currentAudioInfo?.album_name?.split("-")[0] || currentAudioInfo?.cats || "unknown"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_head_right_actions_wrap",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  id: "player",
                  onClick: () => {
                    dispatch(setPlaying(false));
                    dispatch(getaudioId(id));
                    setinitial(false);
                    ///this is not coming with audio pack
                  },
                  className: "audiodetail_play",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ci_namespaceObject.CiPlay1, {
                    className: "audiodetail_play_icon"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "audiodetail_play_text",
                    children: "play"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Play"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DesktopFavoriteButton, {
                  favorites: currentAudioInfo?.favorites,
                  id: id,
                  type: "audio",
                  refetch: refetch
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Like"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  onClick: () => {
                    shareAudio();
                  },
                  className: "audiodetail_share bg-gray-200  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                    className: "text-[22px] text-color-primary"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "audiodetail_share_text text-color-primary",
                    children: formatNumber(currentAudioInfo?.share || 0)
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Share"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  className: "audiodetail_comment bg-gray-200  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(CommentIcon, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "audiodetail_comment_text text-color-primary",
                    children: formatNumber(currentAudioInfo?.comment || 0)
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Comment"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
                  downloads: currentAudioInfo?.downloads,
                  nid: currentAudioInfo?.nid,
                  triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                    className: "flex flex-col items-center",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiDownload2Fill, {
                      className: "audiores_download text-color"
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                      className: "dark:text-white text-center text-sm",
                      children: "Download"
                    })]
                  })
                })
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "audiodetail_info",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiodetail_info_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_info_name text-color dark:text-muted",
              children: ["Genre:", " "]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
              to: `${GENRES}/${parseInt(currentAudioInfo?.cat_id?.toString())}`,
              className: "audiodetail_info_value text-color dark:text-muted  hover:text-foreground dark:hover:text-[#ddff2b] hover:underline",
              children: currentAudioInfo?.cats || "unknown"
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiodetail_info_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_info_name dark:text-muted text-color",
              children: ["Date of Release:", " "]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "audiodetail_info_value text-color dark:text-muted",
              children: currentAudioInfo?.post_date?.split("-")[0] || "no date"
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "audiodetail_summary",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
            className: "audiodetail_summary_header text-foreground",
            children: "Summary"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: `audiodetail_summary_body audiodetail_summary_body_open text-foreground`,
            children: currentAudioInfo?.description || "unknown"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "audiores_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "audiores_image_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "audiores_image",
              src: currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiores_text text-color",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "audiores_text1",
              children: currentAudioInfo?.title || currentAudioInfo?.Title || "Unknown"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "audiores_text2",
              children: currentAudioInfo?.cats || currentAudioInfo?.categories || "unknow"
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiores_scroll_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "audiores_scroll_start text-color",
              children: playTimingRes(audioRef?.current?.currentTime)
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "range_progress",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                style: {
                  width: `${value * 100 / audioRef?.current?.duration}%`
                },
                className: "audiodet_bar"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
                ref: rangeRef,
                type: "range",
                min: "0",
                max: Math.floor(audioRef?.current?.duration),
                value: value,
                onChange: e => {
                  handleRange(e.target.value);
                },
                className: ""
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "audiores_scroll_stop text-color",
              children: durationFormat(audioRef?.current?.duration)
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "audiores_play_control_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "flex flex-col items-center justify-center",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
                downloads: currentAudioInfo?.downloads,
                nid: currentAudioInfo?.nid,
                triggerInnerChild: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  className: "flex flex-col items-center",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiDownload2Fill, {
                    className: "audiores_download text-color"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                    className: "dark:text-white text-center text-sm",
                    children: "Download"
                  })]
                })
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiores_play_control",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                disabled: count === 0,
                className: "audiores_button",
                onClick: () => {
                  handlePreviousAudio();
                },
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(tb_namespaceObject.TbPlayerSkipBackFilled, {
                  className: "audiores_play_back text-color"
                })
              }), loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "w-[40px] h-[40px]",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
              }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                onClick: handlePlay,
                className: "audiores_play_start dark:bg-[#ddff2b] bg-gray-400",
                children: !playing ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaPlay, {
                  className: "audiores_play_start_icon text-background"
                }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(gi_namespaceObject.GiPauseButton, {
                  className: "audiores_play_start_icon text-background"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                disabled: count === pack?.length - 1,
                className: "audiores_button",
                onClick: () => {
                  handleNextAudio();
                },
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(tb_namespaceObject.TbPlayerSkipForwardFilled, {
                  className: "audiores_play_forward text-color"
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                //e.stopPropagation();
                setmoreOption(!moreOption);
              },
              className: "audres_option_relative relative",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "flex flex-col items-center justify-center",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlOptionsVertical, {
                  className: "audiores_option text-color"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm mt-1",
                  children: "More"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: moreOption ? "right-0 top-10  absolute min-w-max h-fit" : "hidden",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  onClick: e => {
                    e.stopPropagation();
                    setmoreOption(!moreOption);
                  },
                  className: "fixed inset-0 bg-none z-[90] w-full h-full"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  onClick: e => {
                    e.stopPropagation();
                  },
                  className: "bg-background shadow-lg border z-[200]  rounded-sm space-y-2 p-1 font-light text-[12px] text-foreground",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                    onClick: e => {
                      e.stopPropagation();
                      shareAudio();
                    },
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiSolidShareAlt, {
                      className: "text-foreground text-lg"
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Share"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                    onClick: e => {
                      addToPlaylist(e, id || audioId);
                      setmoreOption(!moreOption);
                    },
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(gr_namespaceObject.GrFormAdd, {
                      className: "text-foreground text-xl"
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Add to playlist"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(tb_namespaceObject.TbRepeat, {
                      onClick: () => {
                        dispatch(getRepeat(!isrepeat));
                        setmoreOption(!moreOption);
                      },
                      className: "text-foreground text-lg"
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Repeat"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiMessageMinus, {
                      onClick: () => {
                        setIsComment(!isComment);
                        setmoreOption(!moreOption);
                      },
                      className: "text-foreground text-lg"
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Comment"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                      onClick: e => {
                        e.stopPropagation();
                        addToFav(e, id);
                        fetchFavorites(addFav, id);
                        setaddFav(!addFav);
                        setdisabled(true);
                        setmoreOption(!moreOption);
                      },
                      className: "fav_btn",
                      disabled: isdisabled,
                      children: getFavs?.includes(parseInt(id)) || isAddedToFavorite ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdFavorite, {
                        className: "text-foreground text-lg"
                      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdFavoriteBorder, {
                        className: "text-foreground text-lg"
                      })
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Add to Favorite"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                    className: "flex w-full items-center space-x-2",
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                      onClick: () => {
                        setcurrents(!iscurrents);
                        setmoreOption(!moreOption);
                      },
                      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ri_namespaceObject.RiPlayListFill, {
                        className: "text-foreground text-lg"
                      })
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                      className: "",
                      children: "Playlist"
                    })]
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "mobile text-color",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_info_mob",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "audiodetail_info_mob_head text-color-foreground",
                children: "Information"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "audiodetail_info_wrap_mob",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "audiodetail_info_name_mob",
                  children: "Genre: "
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
                  to: `${GENRES}/${parseInt(currentAudioInfo?.cat_id?.toString())}`,
                  className: "audiodetail_info_value_mob dark:hover:text-[#ddff2b] hover:underline",
                  children: currentAudioInfo?.cats || "unknown"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "audiodetail_info_wrap_mob",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "audiodetail_info_name_mob",
                  children: "Date of Release: "
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "audiodetail_info_value_mob",
                  children: currentAudioInfo?.post_date?.split("-")[0] || "no date"
                })]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "audiodetail_summary_mob",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "audiodetail_summary_header_mob text-color-foreground",
                children: "Summary"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: `audiodetail_summary_body audiodetail_summary_body_open_mob`,
                children: currentAudioInfo?.description || "unknown"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "audiodetail_songs_mob"
            })]
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "similarWidget_wrapper px-4",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "similarWidget_top",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "similarWidget_top_heading text-foreground",
            children: "Similar Audio"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
            to: `${GENRES}/${parseInt(currentAudioInfo?.cat_id?.toString())}`,
            className: "similarWidget_more ",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "similarWidget_more_text text-foreground dark:text-[#ddff2b]",
              children: "more"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiChevronsRight, {
              className: "similarWidget_more_icon text-foreground dark:text-[#ddff2b]"
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "overflow_hidden_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isprev ? "prev" : "prev_none",
            onClick: prev,
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              src: back_namespaceObject,
              alt: "back"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isnext ? "next" : "next_none",
            onClick: next,
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              src: foward_namespaceObject,
              alt: "foward"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            ref: slide,
            className: "overflow_auto_wrapper",
            children: [(similarLecture?.audio ?? []).map(({
              img,
              lec_img,
              categories,
              cats,
              title,
              Title,
              rpname,
              nid,
              audio,
              mp3_title,
              views
            }, idx) => {
              return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "similarWidget_album_item",
                onClick: () => {
                  navigate(`${LECTURE}${id}`);

                  // setendpUrl(similarAudioUrl);
                  dispatch(getPack(null));
                  dispatch(getPage(1));
                  dispatch(getaudioId(nid));
                  dispatch(getCount(idx));
                  dispatch(getPack(similarAudio));
                  setCurUser(currentUser);
                  window.location.reload();
                },
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                  categories: mp3_title || categories || cats,
                  img: img || lec_img,
                  views: views
                }, idx)
              }, idx + 1);
            }), isLoading &&
            // <div className="landing_recent landing_space my-1 min-[615px]:my-3">
            Array(10).fill(undefined).map((_, i) => {
              return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(skeletion, {}, i);
            })
            // </div>
            ]
          })]
        })]
      }), window.innerWidth > 615 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "audioCommentBoxWrap",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
          audioComment: audioComment,
          id: currentAudioInfo?.nid,
          type: "audio"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isComment ? "audiodetail_comments_mob" : "audiodetail_comments_mob_none",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
          type: "audio",
          id: currentAudioInfo?.nid,
          audioComment: audioComment
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AddPlaylist, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isShare ? "share_wrapper" : "hide_share_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
          isShare: isShare,
          setisShare: setisShare,
          nid: id || audioId,
          type: "audio"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(currentPlayData, {
        datas: pack,
        iscurrents: iscurrents,
        setcurrents: setcurrents
      })]
    })]
  });
};
/* harmony default export */ const audioDetail_AudioDetail = (AudioDetail);
;// CONCATENATED MODULE: ./src/components/list/mobileList.jsx







function MobileList({
  lecturer,
  id,
  title,
  image,
  drop,
  setDrop,
  duration,
  url,
  Title,
  rpname,
  endpoint_url,
  currentPage,
  cats,
  nid,
  navName,
  navLink,
  controlData,
  views
}) {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const {
    audioId
  } = (0,external_react_redux_.useSelector)(state => state.user);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: audioId === nid ? `mobilelist_wrapper text-primary border-l-2 border-gray-400 dark:border-[#ddff2b]` : "mobilelist_wrapper",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      onClick: () => {
        navigate(url);
        setinitial(false);
        dispatch(getPack(null));
        dispatch(setPlaying(false));
        dispatch(getPage(currentPage));
        dispatch(getPack(controlData));
        dispatch(getCount(id));
        dispatch(getaudioData({
          endpoint_url,
          currentPage,
          controlData,
          navName
        }));
      },
      className: "mobiletd",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecture text-foreground",
        children: title || Title
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "lecturer",
        children: rpname
      })]
    })
  });
}
/* harmony default export */ const mobileList = (MobileList);
;// CONCATENATED MODULE: ./src/components/lecturer_subs/lecturer_songs/Lecturer_songs.jsx














const Lecturer_songs = ({
  id,
  totalData
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [page, setPage] = (0,external_react_.useState)(1);
  const [comment, setComment] = (0,external_react_.useState)();
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const queryParam = {
    page,
    id: parseInt(id)
  };
  const {
    isLoading,
    isLoadingNextPage,
    isLastPage,
    querieddata
  } = useQueryGetRequest("lecturer-songs", queryParam, lecturerDetailApi.getLecturerSongs);

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=rp`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "lecsong_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lect_title_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "lect_title1",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "lect_hash",
          children: "#"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          children: "Title"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "lect_title2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Lecturer"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "lect_title4",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Time"
        })
      })]
    }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_desktop",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecsong_content",
      children: Array.isArray(querieddata) && querieddata.map(({
        title,
        Title,
        rp,
        duration,
        rpname,
        views,
        rp_id,
        img,
        favorites,
        cats,
        nid
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecsong_content_item",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "desktops_item",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
              id: idx,
              title: title,
              lecturer: rpname || rp,
              rpid: rp_id,
              image: img,
              url: `${LECTURE}${nid}`,
              Title: Title || title,
              rpname: rpname,
              cats: cats,
              favorites: favorites,
              nid: nid,
              endpoint_url: `/leclisting_rp.php?lim=10&&rpid=${id}page=`,
              currentPage: page,
              navName: "Back",
              navLink: -1,
              controlData: querieddata,
              views: views,
              duration: duration
            }, idx)
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "mobile_item",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(mobileList, {
              id: idx,
              title: title,
              lecturer: rpname || rp,
              rpid: rp_id,
              image: img,
              url: `${LECTURE}${nid}`,
              Title: Title || title,
              rpname: rpname,
              cats: cats,
              nid: nid,
              favorites: favorites,
              navName: "Back",
              navLink: -1,
              endpoint_url: `/leclisting_rp.php?lim=10&&rpid=${id}page=`,
              currentPage: page,
              controlData: querieddata,
              views: views,
              duration: duration
            }, idx)
          })]
        }, idx);
      })
    }), isLoading && page === 1 || totalData !== querieddata?.length && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex h-fit w-full min-[615px]:text-[16px] text-sm  min-[615px]:mt-6 mt-3 items-center justify-center",
      children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        disabled: isLoadingNextPage,
        onClick: () => {
          setPage(page + 1);
        },
        className: !isLastPage ? "w-[40%] min-[615px]:w-[200px] min-[615px]:py-3  flex justify-center items-center py-2 border text-color border-color rounded-2xl" : "hidden",
        children: isLoadingNextPage ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "rounded-full w-4 h-4 border-l border-r border-color animate-spin"
        }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Show more"
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
      audioComment: audioComment,
      type: "rp",
      id: id
    })]
  });
};
/* harmony default export */ const lecturer_songs_Lecturer_songs = (Lecturer_songs);
;// CONCATENATED MODULE: ./src/assets/png/album.jpeg
const album_namespaceObject = __webpack_require__.p + "d89ad40ad39eea59543c.jpeg";
;// CONCATENATED MODULE: ./src/components/lecturer_subs/lecturer_albums/Lecturer_album.jsx














const Lecturer_album = ({
  id,
  totalData
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [page, setPage] = (0,external_react_.useState)(1);
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const queryParam = {
    id,
    page
  };
  const {
    isLoading,
    isLoadingNextPage,
    isLastPage,
    querieddata
  } = useQueryGetRequest("lecturer-albums", queryParam, lecturerDetailApi.getLecturerAlbums);

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=rp`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [isLoading && !isLastPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_desktop",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecalb_wrapper",
      children: Array.isArray(querieddata) && querieddata?.map(({
        categories,
        img,
        name,
        rpname,
        cats,
        share,
        nid,
        id,
        audio,
        Title,
        title,
        lec_no,
        favorites,
        comments
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${nid}`,
          className: "lecalb_album_item",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
            lec_no: lec_no,
            categories: name.split("-")[0],
            img: img || album_namespaceObject
          }, idx)
        }, idx + 1);
      })
    }), isLoading && page === 1 || totalData !== querieddata?.length && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex w-full min-[615px]:mt-6 mt-3 items-center h-fit justify-center  min-[615px]:text-[16px] text-sm",
      children: [" ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        disabled: isLoadingNextPage,
        onClick: () => {
          setPage(page + 1);
        },
        className: !isLastPage ? "w-[40%] min-[615px]:w-[200px] min-[615px]:py-3  text-color border-color flex justify-center items-center py-2 border rounded-2xl" : "hidden",
        children: isLoadingNextPage ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "rounded-full w-4 h-4 border-l border-r border-color animate-spin"
        }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Show more"
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecalb_comments",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
        audioComment: audioComment,
        id: id,
        type: "rp"
      })
    })]
  });
};
/* harmony default export */ const lecturer_albums_Lecturer_album = (Lecturer_album);
;// CONCATENATED MODULE: ./src/components/lecturer_subs/lecturer_playlist/Lecturer_playlist.jsx












const Lecturer_playlist = ({
  id
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const queryParam = {
    id
  };
  const {
    isLoading,
    querieddata
  } = useQueryGetRequest("lecturer-playlist", queryParam, lecturerDetailApi.getLecturerPlaylist);

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=rp`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_desktop",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    }), !isLoading && querieddata?.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "text-gray-200 no_playlist flex items-center justify-center w-full h-[200px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
        children: "-- no playlist --"
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecplaylist_wrapper",
      children: !isLoading && Array.isArray(querieddata) && querieddata?.map(({
        name,
        id,
        nid,
        lec_no,
        lec_img
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
          to: `${PLAYLISTS}${nid}`,
          className: "lecplaylist_item ",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
            categories: name,
            lec_no: lec_no || 0,
            img: lec_img
          }, idx)
        }, idx + 1);
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecplaylist_comments",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
        audioComment: audioComment,
        id: id,
        type: "rp"
      })
    })]
  });
};
/* harmony default export */ const lecturer_playlist_Lecturer_playlist = (Lecturer_playlist);
;// CONCATENATED MODULE: ./src/assets/svg/arrowleft.svg
const arrowleft_namespaceObject = __webpack_require__.p + "81944fbc4da7954d0438.svg";
;// CONCATENATED MODULE: ./src/components/lecturer_subs/simillarrp/Simillarrp.jsx













const Simillarrp = ({
  langid
}) => {
  const [page, setPage] = (0,external_react_.useState)(1);
  const issimilarrp = true;
  const queryParam = {
    page,
    langid
  };
  const {
    isLoading,
    isLoadingNextPage,
    isLastPage,
    querieddata
  } = useLecturersHook("lecturers", queryParam, lecturersApi.getLecturers, setPage);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(querieddata?.length, page, setPage);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    children: [isLoading && !isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_desktop",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "simrp_wrapper",
      children: Array.isArray(querieddata) && querieddata?.map(({
        img,
        name,
        views,
        id
      }, idx) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          ref: idx === querieddata.length - 1 && !isLastPage ? infiniteScrollRef : null,
          to: `${RESOURCE_PERSON}${id}`,
          className: "lecturers_item",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturersWidget, {
            views: views,
            img: img || IMAGE_PLACEHOLDERS.lecturer,
            rp: name,
            rpname: name
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(genreMobileLecturer, {
            views: views,
            styling: issimilarrp,
            rp: name,
            img: img || IMAGE_PLACEHOLDERS.lecturer
          })]
        });
      })
    }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_m",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "loads",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    })]
  });
};
/* harmony default export */ const simillarrp_Simillarrp = (Simillarrp);
;// CONCATENATED MODULE: ./src/assets/svg/combold.svg
const combold_namespaceObject = __webpack_require__.p + "3b1261c6fe3c3f302204.svg";
;// CONCATENATED MODULE: ./src/assets/svg/boom-comment.svg
const boom_comment_namespaceObject = __webpack_require__.p + "afb6361c3b1c9c7616d2.svg";
;// CONCATENATED MODULE: ./src/assets/png/lazyrps.jpeg
const lazyrps_namespaceObject = __webpack_require__.p + "281bf5db1749aa971da2.jpeg";
;// CONCATENATED MODULE: ./src/components/UI/favoritebuttons/mobilefavoriteButton.jsx







function MobileFavoriteButton({
  favorites,
  id,
  type,
  refetch
}) {
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [isLoading, setLoading] = (0,external_react_.useState)(false);
  const formatFavorite = (0,external_react_.useMemo)(() => formatNumber(favorites || 0), [favorites]);
  const keyParam = {
    id: currentUser?.id,
    type
  };
  const {
    favoriteCount,
    refetch: refetchFavorite
  } = useFetchFavoritesHook(keyParam);

  /////get users favorites

  const {
    mutate: addToFavorite
  } = useAddFavoritesHook();
  const addToFav = async e => {
    e.stopPropagation();
    if (!currentUser?.id) {
      external_react_hot_toast_default().error("Login or register to add to favorites");
      return;
    }
    setLoading(true);
    const payload = {
      user_id: currentUser?.id,
      item_id: parseInt(id),
      type
    };
    addToFavorite(payload, {
      onSuccess: data => {
        external_react_hot_toast_default().success(data.message);
        refetch(); // refetch favorite count
        refetchFavorite(); //refetch all favorites
        setdisabled(false);
        setLoading(false);
      },
      onError: error => {}
    });
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
    onClick: e => {
      e.stopPropagation();
      addToFav(e);
      setdisabled(true);
    },
    disabled: isdisabled,
    className: "icons_mob_listblack",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "likeys_img",
      children: favoriteCount[type]?.includes(parseInt(id)) ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillHeart, {
        className: "text-foreground text-xl dark:text-[#ddff2b]"
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillHeart, {
        className: " text-xl text-[#aeaeae]"
      })
    }), isLoading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_hot_toast_namespaceObject.LoaderIcon, {
      className: "text-sm animate-spin"
    }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
      className: "likeys_text",
      children: formatFavorite
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/lecturer_detail/Lecturer_detail.jsx


























const LecturerDetail = () => {
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [tab, setTab] = (0,external_react_.useState)(1);
  const observeEl = (0,external_react_.useRef)();
  const lecdet = (0,external_react_.useRef)();
  const [isVisible, setIsVisible] = (0,external_react_.useState)(false);
  const [choice, setChoice] = (0,external_react_.useState)("Audio");
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [count1, setCount1] = (0,external_react_.useState)(0);
  const [count2, setCount2] = (0,external_react_.useState)(0);
  const [count3, setCount3] = (0,external_react_.useState)(0);
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const queryParam = {
    id
  };
  const [, setImg] = (0,external_react_.useState)("https://backend.dawahnigeria.com/sites/default/files/600-800/700.jpg");
  const {
    querieddata,
    refetch
  } = useQueryGetRequest("lecturer-detail", queryParam, lecturerDetailApi.getLecturerById);

  /// Get the exiting element
  const firstElement = (0,external_react_.useCallback)(node => {
    observeEl.current = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    if (node) observeEl.current.observe(node);
  }, []);

  ///**** share rp ******** */

  const shareRp = e => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  ///////
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#lecdet");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.albumWidget;
        });
      });
    }
    lazyImage();
  }, []);
  (0,external_react_.useEffect)(() => {
    if (lecdet.current) {
      lecdet?.current.addEventListener("error", () => {
        const imgs = document.querySelectorAll("#hero");
        imgs.forEach(img => {
          img.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
  }, [lecdet.current]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${querieddata[0]?.name || "Lecturer"} on Dawah Nigeria - Home of islamic resources`
    }), Array.isArray(querieddata) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lecdet_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        ref: lecdet,
        id: "hero",
        className: `${theme === "dark" ? "lecdet_hero" : "lecdet_hero_light"}`,
        src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
        alt: "audiohero"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "lecdet_container",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecdet_breadcrumb",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            onClick: () => {
              navigate(-1);
            },
            className: "lecdet_breadcrumb_first",
            children: `${"Back"}/`
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "lecdet_breadcrumb_second text-foreground",
            children: querieddata[0]?.name || querieddata[0]?.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecdet_head_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "lecdet_head_left",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              ref: lecdet,
              id: "hero",
              className: "lecdet_head_left_img",
              src: querieddata[0]?.img || lazyrps_namespaceObject,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "lecdet_head_right",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "lecdet_head_right_head text-foreground",
              children: querieddata[0]?.name || querieddata[0]?.name
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "lecdet_head_right_actions_wrap",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DesktopFavoriteButton, {
                favorites: querieddata[0]?.favorites,
                id: id,
                type: "rp",
                refetch: refetch
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  shareRp(e, id);
                },
                className: "lecdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "fav_btn ",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                    className: "text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]"
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "lecdet_share_text text-color-primary",
                  children: formatNumber(querieddata[0]?.share || 0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "lecdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d] ",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(CommentIcon, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "lecdet_comment_text text-color-primary",
                  children: formatNumber(querieddata[0]?.comments || 0)
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "lecdet_tab_wrap",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "lecdet_tab",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                setTab(1);
              },
              className: "lecdet_tab_song",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 1 ? "lecdet_tab_song1_active text-foreground" : "lecdet_tab_song1"}`,
                children: "Audio"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
                className: `${tab === 1 ? "lecdet_tab_song2_active text-color" : "lecdet_tab_song2"}`,
                children: ["(", querieddata[0]?.total_audio || 0, ")"]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                setTab(2);
              },
              className: "lecdet_tab_album",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 2 ? "lecdet_tab_album1_active text-foreground" : "lecdet_tab_album1"}`,
                children: "Album"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
                className: `${tab === 2 ? "lecdet_tab_album2_active text-color" : "lecdet_tab_album2"}`,
                children: ["(", querieddata[0]?.total_albums || 0, ")"]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                setTab(3);
              },
              className: "lecdet_tab_playlist",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 3 ? "lecdet_tab_playlist1_active text-foreground" : "lecdet_tab_playlist1 "}`,
                children: "Playlist"
              })
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecdet_head_mobile",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isVisible ? "lecdet_head_img_none" : "lecdet_head_img",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              ref: lecdet,
              id: "hero",
              className: "lecdet_head_img_sz",
              src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "lectdet_min_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                navigate(-1);
              },
              className: "mob_arrow",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "mob_arrow_sz",
                src: arrowleft_namespaceObject,
                alt: "hun"
              })
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "mobile_lecdet_tab_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            ref: firstElement,
            className: "mob_txt",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "lecdet_head_mob_head",
              children: querieddata[0]?.name
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "mob_like",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "likeys_img_sz",
                  src: headpmobile_namespaceObject,
                  alt: ""
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_text",
                children: formatNumber(querieddata[0]?.views || 0)
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "rank_and_black_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "ranking_none" : "ranking",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "ranks",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "num_rank"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "text_rank"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "ranks",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "num_rank"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "text_rank"
                })]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "headings pb-7" : "headings_none",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                onClick: () => {
                  navigate(-1);
                },
                className: "fixed_mob_arrow",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "fixed_mob_arrow_sz",
                  src: arrowleft_namespaceObject,
                  alt: "hun"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "fixed_text text-center ",
                children: `${querieddata[0]?.name?.split(" ")[0] || ""} ${querieddata[0]?.name?.split(" ")[1]} ${querieddata[0]?.name?.split(" ")[2] || ""} ${querieddata[0]?.name?.split(" ")[3] || ""}`
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "fixed_bg_none"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "header_bg",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "img",
                  ref: lecdet,
                  id: "hero",
                  src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                  alt: "head"
                })
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "blacks bg-secondary",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: isVisible ? "fixed_icons_black bg-secondary" : "icons_black bg-secondary",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MobileFavoriteButton, {
              favorites: querieddata[0]?.favorites,
              id: id,
              type: "rp",
              refetch: refetch
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: e => {
                shareRp(e, id);
              },
              className: "icons_mob_listblack",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiSolidShareAlt, {
                  className: "text-xl "
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_text ",
                children: formatNumber(querieddata[0]?.share || 0)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "icons_mob_listblack",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                className: "likeys_img",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "likeys_img_sz",
                  src: combold_namespaceObject,
                  alt: ""
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "likeys_text",
                children: formatNumber(querieddata[0]?.comments || 0)
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "mobile_lecdet_tab",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                setTab(1);
                setChoice("Audio");
              },
              className: "mobile_lecdet_tab_song",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 1 ? "mobile_lecdet_tab_song1_active text-foreground" : "mobile_lecdet_tab_song1"}`,
                children: "Audio"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
                className: `${tab === 1 ? "mobile_lecdet_tab_song2_active text-color" : "mobile_lecdet_tab_song2"}`,
                children: ["(", querieddata[0]?.total_audio || 0, ")"]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                setTab(2);
                setChoice("Albums");
              },
              className: "mobile_lecdet_tab_album",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 2 ? "mobile_lecdet_tab_album1_active text-foreground" : "mobile_lecdet_tab_album1"}`,
                children: "Album"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
                className: `${tab === 2 ? "mobile_lecdet_tab_album1_active text-color" : "mobile_lecdet_tab_album1"}`,
                children: ["(", querieddata[0]?.total_albums || 0, ")"]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              onClick: () => {
                setTab(3);
                setChoice("Playlist");
              },
              className: "mobile_lecdet_tab_playlist",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: `${tab === 3 ? "mobile_lecdet_tab_playlist1_active text-foreground" : "mobile_lecdet_tab_playlist1"}`,
                children: "Playlist"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
                className: `${tab === 3 ? "mobile_lecdet_tab_playlist1_active text-color" : "mobile_lecdet_tab_playlist1"}`,
                children: ["(", querieddata[0]?.total_playlist || 0, ")"]
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "set_choice text-foreground",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: choice
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "nums text-color",
              children: tab === 1 ? `(${count1})` : false
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "nums text-color ",
              children: tab === 2 ? `(${count2})` : false
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: " text-color nums",
              children: tab === 3 ? `(${count3})` : false
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "mobile_color_vid bg-secondary",
            children: [tab === 1 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_songs_Lecturer_songs, {
              rpname: querieddata[0]?.name,
              id: id,
              setCount1: setCount1,
              count1: count1,
              setImg: setImg
            }), tab === 2 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_albums_Lecturer_album, {
              rpname: querieddata[0]?.name,
              id: id,
              setCount2: setCount2,
              count2: count2,
              setImg: setImg
            }), tab === 3 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_playlist_Lecturer_playlist, {
              rpname: querieddata[0]?.name,
              id: id,
              setCount3: setCount3,
              count3: count3,
              setImg: setImg
            }), tab === 5 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(simillarrp_Simillarrp, {
              langid: querieddata[0]?.lang_id
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "desktop_color_vid",
          children: [tab === 1 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_songs_Lecturer_songs, {
            rpname: querieddata[0]?.name,
            id: id,
            totalData: querieddata[0]?.total_audio
          }), tab === 2 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_albums_Lecturer_album, {
            rpname: querieddata[0]?.name,
            rpImg: querieddata[0]?.img,
            id: id,
            totalData: querieddata[0]?.total_albums
          }), tab === 3 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturer_playlist_Lecturer_playlist, {
            rpname: querieddata[0]?.name,
            id: id,
            totalData: querieddata[0]?.total_playlist
          }), tab === 5 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(simillarrp_Simillarrp, {
            langid: querieddata[0]?.lang_id
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isShare ? "share_wrapper" : "hide_share_wrapper",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
          isShare: isShare,
          setisShare: setisShare,
          nid: id,
          type: "rp"
        })
      })]
    })]
  });
};
/* harmony default export */ const Lecturer_detail = (LecturerDetail);
;// CONCATENATED MODULE: ./src/assets/svg/comment-video.svg
const comment_video_namespaceObject = __webpack_require__.p + "bc9fda801c40866de059.svg";
;// CONCATENATED MODULE: ./src/assets/svg/share-video.svg
const share_video_namespaceObject = __webpack_require__.p + "cec5ca089917520d5aed.svg";
;// CONCATENATED MODULE: ./src/pages/videoplayer/othersWidget.jsx



const OthersWidget = ({
  images,
  author,
  views,
  title
}) => {
  ////not contented but under presssure by DN project manager
  (0,external_react_.useEffect)(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#others");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.carouselWidget;
        });
      });
    }
    lazyImage();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: " min-[615px]:mb-3 flex cursor-pointer max-[615px]:py-2 min-[615px]:grid grid-cols-8 min-[615px]:gap-[6rem] xl:gap-0 xl:grid-cols-6 items-center space-x-2 ",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "min-[615px]:w-[90px] h-[66px] w-[120px] col-span-1 xl:col-span-2 min-[615px]:h-[50px] rounded-[6px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        className: "w-full h-full rounded-[6px]",
        id: "others",
        "src-data": images,
        src: IMAGE_PLACEHOLDERS.carouselWidget,
        alt: ""
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "justify-start w-full col-span-7 xl:col-span-4",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "font-medium text-foreground text-ellipsis whitespace-nowrap overflow-hidden w-[200px] min-[615px]:w-[450px]  xl:w-[150px]",
        children: title
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "text-[12px] flex items-center text-color min-[615px]:text-sm ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "mr-1",
          children: `${views} views.`
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "text-ellipsis whitespace-nowrap overflow-hidden w-[200px] min-[615px]:w-[450px] xl:w-[130px]",
          children: author
        })]
      })]
    })]
  });
};
/* harmony default export */ const othersWidget = (OthersWidget);
;// CONCATENATED MODULE: external "react-youtube"
const external_react_youtube_namespaceObject = require("react-youtube");
var external_react_youtube_default = /*#__PURE__*/__webpack_require__.n(external_react_youtube_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/videoplayer/videoPlayer.jsx
























const VideoPlayer = () => {
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const [data, setdata] = (0,external_react_.useState)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const observeEl = (0,external_react_.useRef)();
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [subdata, setsubdata] = (0,external_react_.useState)([]);
  const [page, setPage] = (0,external_react_.useState)(1);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [height, setHeight] = (0,external_react_.useState)();
  const [isload, setload] = (0,external_react_.useState)(false);
  const [addFav, setaddFav] = (0,external_react_.useState)(false);
  const [isdisabled, setdisabled] = (0,external_react_.useState)(false);
  const [getFavs, setgetfavs] = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    useAxios.get(`/video_listingApi.php?id=${id}&action=singleVideo`).then(res => {
      setload(true);
      setdata(res.data);
    }).catch(err => {});
  }, [id]);

  //similar videos
  (0,external_react_.useEffect)(() => {
    const handleRequest = () => {
      if (isEmpty) return;
      if (page > 1) {
        setNextPageLoad(true);
      }
      useAxios.get(`/video_listingApi.php?page=${page}&action=allVideo`).then(res => {
        if (page === 1) {
          setLoading(false);
        }
        setNextPageLoad(false);
        if (res.data.length === 0) {
          setIsEmpty(true);
          return;
        }
        setsubdata(prev => external_lodash_default().uniqBy([...prev, ...res.data.filter(value => value.id !== id)], "id"));
      }).catch(err => {});
    };
    handleRequest();
  }, [page]);
  const handleNextAudio = () => {
    const next = subdata.findIndex(value => value.id === id);
    navigate(`${VIDEOS}${subdata[next + 1].id}`);
  };
  const shareAudio = e => {
    e.stopPropagation();
    setisShare(!isShare);
    //setNidValue(nid)
  };

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) {
      return;
    }
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${parseInt(id)}&type=video`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, [id]);
  (0,external_react_.useEffect)(() => {
    if (window.innerWidth <= 615) {
      setHeight(220);
    } else {
      setHeight(400);
    }
  }, []);
  const opts = {
    height: height,
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    //setsumofFav(favorites)
    if (!currentUser?.id) return;
    if (addFav || !addFav && lecid) {
      await useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=video`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
        }
      }).then(res => {}).catch(err => {});
    }
  }
  (0,external_react_.useEffect)(() => {
    fetchFavorites(addFav, id);
  }, [addFav, id]);
  const addToFav = async () => {
    if (!currentUser?.id) {
      external_react_hot_toast_namespaceObject.toast.error("Login or register to add to favorites");
      navigate("/auth/login");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: parseInt(id),
      type: "video"
    };
    await useAxios.post(`/leclisting_favorites.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
      setdisabled(false);
    }).catch(err => {});
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${data?.title || "Video"} on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-full boom min-[615px]:px-4 pt-3 pb-20 h-full text-sm min-[615px]:text-[15px]",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "my-3 max-[615px]:hidden text-sm text-foreground space-x-2 flex items-center",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineArrowLongLeft, {
          onClick: () => {
            navigate(-1);
          },
          className: pathname === `${VIDEOS}${id}` ? "text-foreground text-[22px]" : "text-[22px] text-gray-500 dark:text-gray-300"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineArrowLongRight, {
          className: pathname === VIDEO ? "text-foeground text-[22px]" : "text-[22px] text-gray-500 dark:text-gray-300"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "text-gray-500 dark:text-gray-300",
          children: "Videos"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "/"
        }), " ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {}), data?.title]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "w-full grid grid-cols-1 xl:grid-cols-9 xl:gap-3 ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "h-full max-[615px]:h-[220px] bg-secondary   col-span-6",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full h-[220px] min-[615px]:pb-3 min-[615px]:mb-[0rem] z-[10] max-[615px]:fixed inset-x-0 top-[55px] min-[615px]:h-[400px] min-[615px]:rounded-md",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: e => {
                e.stopPropagation();
                navigate(-1);
              },
              className: "cursor-pointer absolute min-[615px]:hidden top-8 left-2 w-fit h-fit",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillArrowLeftCircleFill, {
                className: "text-[30px] text-[#bbff4e]"
              })
            }), isload ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((external_react_youtube_default()), {
              videoId: `${data?.youtubekey}`,
              onEnd: () => handleNextAudio(),
              onError: e => handleNextAudio(),
              opts: opts
            }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "w-full h-full",
              src: IMAGE_PLACEHOLDERS.lecture,
              alt: ""
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "p-2 hidden xl:block  w-full bg-secondary text-foreground space-y-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "min-[615px]:text-lg text-[15px] font-semibold capitalize ",
              children: data?.title || ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "max-[615px]:text-[13px] text-sm",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "mr-1",
                children: `${data?.views || 0} views.`
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: data?.author || "Lecturer"
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full xl:flex hidden mt-2 text-zinc-600 dark:text-gray-400 pr-6  min-[615px]:text-sm  space-x-20 justify-end items-center",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
              onClick: () => {
                addToFav();
              },
              disabled: isdisabled,
              className: "flex items-center cursor-pointer space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdOutlineFavoriteBorder, {
                className: "text-[22px]"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.favourites || 0)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: e => {
                  shareAudio(e);
                },
                className: "text-zinc-600 dark:text-gray-400",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiSolidShareAlt, {
                  className: "text-[22px]"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.share || 0)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "text-zinc-600 dark:text-gray-400",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiMessageMinus, {
                  className: "text-[22px]"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.comments || 0)
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "xl:block hidden",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
              id: parseInt(id),
              audioComment: audioComment,
              type: "video"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "px-3 pt-3 xl:pt-0 text-foreground max-[1238px]:space-y-4   min-[615px]:col-span-3",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "p-2 block xl:hidden  w-full bg-secondary text-foreground space-y-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "min-[615px]:text-lg text-[15px] font-semibold capitalize ",
              children: data?.title || ""
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "max-[615px]:text-[13px] text-sm",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "mr-1",
                children: `${formatNumber(data?.views || 0)} views.`
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: data?.author || "Lecturer"
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "w-full xl:hidden flex text-zinc-600 dark:text-gray-400 text-[12px] min-[615px]:text-sm space-x-20 min-[615px]:pl-6 min-[615px]:justify-start justify-center items-center",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
              onClick: () => {
                addToFav();
              },
              disabled: isdisabled,
              className: "flex items-center cursor-pointer space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdOutlineFavoriteBorder, {
                className: " text-[22px]"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.favourites || 0)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                onClick: e => {
                  shareAudio(e);
                },
                className: "text-zinc-600 dark:text-gray-400",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiSolidShareAlt, {
                  className: "text-[22px]"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.share || 0)
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "text-zinc-600 dark:text-gray-400",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bi_namespaceObject.BiMessageMinus, {
                  className: "text-[22px]"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: formatNumber(data?.comments || 0)
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "text-lg font-medium xl:mb-4",
            children: "You may also like"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex flex-col space-y-3 min-[615px]:space-y-3 w-full",
            children: [loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "w-full flex items-center justify-center h-[100px]",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
            }), !loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "video_widget",
              children: subdata?.map(({
                images,
                id,
                author,
                views,
                title
              }, idx) => {
                return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
                  to: `${VIDEOS}${id}`,
                  className: "min-[615px]:mb-3",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(othersWidget, {
                    title: title,
                    author: author,
                    views: views,
                    images: images
                  })
                }, idx);
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => {
                if (isEmpty) return;
                setPage(page + 1);
              },
              className: "w-full min-[615px]:w-[50%] flex justify-center items-center py-2 border border-color text-color rounded-lg",
              children: nextPageLoad ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "rounded-full w-4 h-4 border-l border-r border-color animate-spin"
              }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Show more"
              })
            })]
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "xl:hidden px-3 block",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
          id: parseInt(id),
          audioComment: audioComment,
          type: "video"
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: isShare ? "block" : "hidden",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
        isShare: isShare,
        setisShare: setisShare,
        nid: parseInt(id),
        type: "video"
      })
    })]
  });
};
/* harmony default export */ const videoPlayer = (VideoPlayer);
;// CONCATENATED MODULE: ./src/assets/png/musicEmptyState.png
const musicEmptyState_namespaceObject = __webpack_require__.p + "4924ba44517fe3299dde.png";
;// CONCATENATED MODULE: ./src/components/UI/infinitePlayFavScroll.js
//import { useLocation } from "react-router-dom";
//add page + 10
function infinitePlayFavScroll(node, observer, page, setPage, isEmpty) {
  if (isEmpty) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        setPage(page + 10);
      }, 2000);
    }
  }, {
    threshold: 1
  });
  if (node) observer.current.observe(node);
}
/* harmony default export */ const UI_infinitePlayFavScroll = (infinitePlayFavScroll);
;// CONCATENATED MODULE: ./src/components/favourite_subs/favourite_albums/Favourite_album.jsx












const Favourite_album = ({
  setCount2
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const observer = (0,external_react_.useRef)();
  const [data, setdata] = (0,external_react_.useState)([]);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const [page, setPage] = (0,external_react_.useState)(0);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [myFavAlbum, setMyFavAlbum] = (0,external_react_.useState)([]);
  const [myAlb, setmyAlb] = (0,external_react_.useState)();
  (0,external_react_.useEffect)(() => {
    setCount2(data.length);
  }, [data]);
  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=album`).then(res => {
      if (res.data.length === 0) {
        setmyAlb([]);
        setLoading(false);
        return;
      }
      const {
        album
      } = res.data;
      setmyAlb(album);
      useAxios.get(`/albumlisting_multi_nid_api.php?id=${album.toString()}`).then(res => {
        setMyFavAlbum(res.data);
        setLoading(false);
        setdata(external_lodash_default().uniqBy(res.data?.slice(0, 10), "nid"));
      }).catch(err => {});
    });
  }, []);
  (0,external_react_.useEffect)(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavAlbum?.slice(page, page + 10);
    if (additionalData.length === 0) {
      setIsEmpty(true);
    }
    setNextPageLoad(false);
    setdata(prev => external_lodash_default().uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);
  const lastElement = (0,external_react_.useCallback)(node => {
    if (isEmpty) return;
    UI_infinitePlayFavScroll(node, observer, page, setPage);
  }, [page]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "favalbum_wrapper",
    children: [(!currentUser?.id || myAlb?.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "favalbum_img_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: musicEmptyState_namespaceObject,
        alt: "empty"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "favalbum_text text-foreground",
        children: "You haven\u2019t added any Album. Add an album here."
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: () => {
          if (currentUser?.id) {
            navigate(CHARTS);
          } else {
            navigate("/auth/login");
          }
        },
        className: "favalbum_button",
        children: "Discover more Albums"
      })]
    }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[300px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    }), myAlb?.length !== 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "favalb_wrapper",
      children: !loading && data.map(({
        categories,
        img,
        name,
        rpname,
        cats,
        nid,
        id,
        audio,
        Title,
        title,
        views,
        lec_no,
        favorites
      }, idx) => {
        if (data.length === idx + 1) {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "favalb_album_item",
            ref: lastElement,
            onClick: () => {
              navigate(`${ALBUMS}${id}`);
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
              lec_no: lec_no || 0,
              categories: categories,
              img: img
            }, idx)
          }, idx + 1);
        } else {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "favalb_album_item",
            onClick: () => {
              navigate(`${ALBUMS}${id}`);
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
              lec_no: lec_no || 0,
              categories: categories,
              img: img
            }, idx)
          }, idx + 1);
        }
      })
    }), nextPageLoad && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[200px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    })]
  });
};
/* harmony default export */ const favourite_albums_Favourite_album = (Favourite_album);
;// CONCATENATED MODULE: ./src/components/favourite_subs/favourite_songs/Favourite_songs.jsx












const Favourite_songs = ({
  setCount1
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const observer = (0,external_react_.useRef)();
  const [data, setdata] = (0,external_react_.useState)([]);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const [page, setPage] = (0,external_react_.useState)(0);
  const [myaud, setmyAud] = (0,external_react_.useState)([]);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [myFavSong, setMyFavSong] = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    setCount1(data.length);
  }, [data]);
  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`).then(res => {
      if (res.data.length === 0) {
        setmyAud([]);
        setLoading(false);
        return;
      }
      const {
        audio
      } = res.data;
      const audioArr = Object.values(audio);
      setmyAud(audioArr);
      useAxios.get(`/leclisting_multi_nid_api.php?id=${audioArr.toString()}`).then(res => {
        setLoading(false);
        setMyFavSong(res.data);
        setdata(external_lodash_default().uniqBy(res.data?.slice(0, 10), "nid"));
      }).catch(err => {});
    }).catch(err => {});
  }, []);
  (0,external_react_.useEffect)(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavSong.slice(page, page + 10);
    if (additionalData.length === 0) {
      setIsEmpty(true);
      return;
    }
    setNextPageLoad(false);
    setdata(prev => external_lodash_default().uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);
  const lastElement = (0,external_react_.useCallback)(node => {
    if (isEmpty) return;
    UI_infinitePlayFavScroll(node, observer, page, setPage);
  }, [page]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "favsongs_wrapper",
    children: [(!currentUser?.id || myaud?.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "favsongs_img_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: musicEmptyState_namespaceObject,
        alt: "empty"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "favsongs_text text-foreground",
        children: "You haven\u2019t added any audio."
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: () => {
          if (currentUser?.id) {
            navigate(NEW);
          } else {
            navigate("/auth/login");
          }
        },
        className: "favsongs_button",
        children: "Discover more audios"
      })]
    }), data?.length !== 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "trend_title_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "tend_title1",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "tend_hash",
          children: "#"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          children: "Title"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "tend_title2",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Lecturer"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "tend_title4",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: "Time"
        })
      })]
    }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[300px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    }), !loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "table",
      children: data?.map(({
        Title,
        title,
        rpname,
        rp,
        img,
        cats,
        nid,
        views,
        duration,
        favorites
      }, idx) => {
        if (data.length === idx + 1) {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            ref: lastElement,
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
              id: idx,
              image: img,
              duration: duration,
              title: title || Title,
              lecturer: rpname || rp,
              url: `${LECTURE}${nid}`,
              Title: Title,
              rpname: rpname || rp,
              cats: cats,
              nid: nid,
              views: views,
              currentUser: currentUser,
              favorites: favorites,
              navName: "favorite audio",
              navLink: "/favorite",
              controlData: myFavSong
            }, idx)
          }, idx);
        } else {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
              id: idx,
              image: img,
              duration: duration,
              title: Title || title,
              lecturer: rpname || rp,
              url: `${LECTURE}${nid}`,
              Title: Title,
              rpname: rpname || rp,
              cats: cats,
              nid: nid,
              favorites: favorites,
              currentUser: currentUser,
              navName: "favorite audio",
              navLink: "/favorite",
              controlData: myFavSong,
              views: views
            }, idx)
          }, idx);
        }
      })
    }), nextPageLoad && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: " loade w-full flex justify-center items-center h-[200px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    })]
  });
};
/* harmony default export */ const favourite_songs_Favourite_songs = (Favourite_songs);
;// CONCATENATED MODULE: ./src/components/favourite_subs/favourite_playlist/Favourite_playlist.jsx












const Favourite_playlist = ({
  setCount3
}) => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const observer = (0,external_react_.useRef)();
  const [data, setdata] = (0,external_react_.useState)([]);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const [page, setPage] = (0,external_react_.useState)(0);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [myFavAlbum, setMyFavAlbum] = (0,external_react_.useState)([]);
  const [myAlb, setmyAlb] = (0,external_react_.useState)();
  (0,external_react_.useEffect)(() => {
    setCount3(data.length);
  }, [data]);
  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=album`).then(res => {
      if (res.data.length === 0) {
        setmyAlb([]);
        setLoading(false);
        return;
      }
      const {
        album
      } = res.data;
      setmyAlb(album);
      useAxios.get(`/albumlisting_multi_nid_api.php?id=${album.toString()}`).then(res => {
        setLoading(false);
        setMyFavAlbum(res.data);
        setdata(external_lodash_default().uniqBy(res.data?.slice(0, 10), "nid"));
      }).catch(err => {});
    });
  }, []);
  (0,external_react_.useEffect)(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavAlbum?.slice(page, page + 10);
    if (additionalData.length === 0) {
      setIsEmpty(true);
    }
    setNextPageLoad(false);
    setdata(prev => external_lodash_default().uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);
  const lastElement = (0,external_react_.useCallback)(node => {
    if (isEmpty) return;
    UI_infinitePlayFavScroll(node, observer, page, setPage);
  }, [page]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "favplaylist_wrapper",
    children: [(!currentUser?.id || myAlb?.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "favplaylist_img_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: musicEmptyState_namespaceObject,
        alt: "empty"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "favplaylist_text text-foreground",
        children: "You haven't added any playlist Add a playlist here."
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: () => {
          if (currentUser?.id) {
            navigate(PLAY);
          } else {
            navigate("/auth/login");
          }
        },
        className: "favplaylist_button",
        children: "Discover more audios"
      })]
    }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[300px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "favalb_wrapper",
      children: !loading && data.map(({
        categories,
        img,
        name,
        rpname,
        cats,
        nid,
        id,
        audio,
        Title,
        title,
        views,
        favorites
      }, idx) => {
        if (data.length === idx + 1) {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "favalb_album_item",
            ref: lastElement,
            onClick: () => {
              navigate(`${PLAYLISTS}${id}`, {
                state: {
                  title: Title || title || name.split(" - ")[0],
                  rpname,
                  img,
                  cats: categories,
                  nid: id,
                  views,
                  audio,
                  lec_no,
                  favorites,
                  nav1: {
                    title: "favorite playlist",
                    link: "/favorite"
                  }
                }
              });
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
              lec_no: lec_no || 0,
              categories: categories,
              img: img
            }, idx)
          }, idx + 1);
        } else {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "favalb_album_item",
            onClick: () => {
              navigate(`${PLAYLISTS}${id}`, {
                state: {
                  title: Title || title || name.split(" - ")[0],
                  rpname,
                  img,
                  cats: categories,
                  nid: id,
                  audio,
                  favorites,
                  views,
                  lec_no,
                  nav1: {
                    title: "favourite playlist",
                    link: "/favorite"
                  }
                }
              });
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
              lec_no: lec_no || 0,
              categories: categories,
              img: img
            }, idx)
          }, idx + 1);
        }
      })
    }), nextPageLoad && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[200px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    })]
  });
};
/* harmony default export */ const favourite_playlist_Favourite_playlist = (Favourite_playlist);
;// CONCATENATED MODULE: ./src/components/favourite_subs/favourite_lecturers/Favourite_lecturers.jsx












const Favourite_lecturers = () => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const observer = (0,external_react_.useRef)();
  const [data, setdata] = (0,external_react_.useState)([]);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const [page, setPage] = (0,external_react_.useState)(0);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [myRp, setmyRp] = (0,external_react_.useState)();
  const [myFavlecturer, setMyFavLecturer] = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    useAxios.get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=rp`).then(res => {
      if (res.data.length === 0) {
        setmyRp([]);
        setLoading(false);
        return;
      }
      const {
        rp
      } = res.data;
      setmyRp(rp);
      useAxios.get(`/rplisting_multi_nid_api.php?id=${rp.toString()}`).then(res => {
        setMyFavLecturer(res.data);
        setLoading(false);
        setdata(external_lodash_default().uniqBy(res.data?.slice(0, 10), "nid"));
      }).catch(err => {});
    });
  }, []);
  (0,external_react_.useEffect)(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavlecturer?.slice(page, page + 10);
    if (additionalData.length === 0) {
      setIsEmpty(true);
    }
    setNextPageLoad(false);
    setdata(prev => external_lodash_default().uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);
  const lastElement = (0,external_react_.useCallback)(node => {
    if (isEmpty) return;
    UI_infinitePlayFavScroll(node, observer, page, setPage);
  }, [page]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "favlec_wrapper",
    children: [(!currentUser?.id || myRp?.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "favlec_img_wrap",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        src: musicEmptyState_namespaceObject,
        alt: "empty"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "favlec_text text-foreground",
        children: "You haven\u2019t any lecturer. Add lecturers here."
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: () => {
          if (currentUser?.id) {
            navigate(LECTURERS);
          } else {
            navigate("/auth/login");
          }
        },
        className: "favlec_button",
        children: "Discover more Lecturers"
      })]
    }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[300px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "favlecturers_widget",
      children: myRp?.length !== 0 && !loading && data.map(({
        img,
        rp,
        name,
        rpname,
        views,
        favorites,
        catsname,
        id
      }, idx) => {
        if (data.length === idx + 1) {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              navigate(`${RESOURCE_PERSON}${id}`);
            },
            className: "lecturers_item",
            ref: lastElement,
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturersWidget, {
              img: img,
              views: views,
              favorites: favorites,
              rp: rp || name || rpname
            }, idx)
          }, idx);
        } else {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              navigate(`${RESOURCE_PERSON}${id}`);
            },
            className: "lecturers_item",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturersWidget_LecturersWidget, {
              img: img,
              rp: rp || name || rpname
            }, idx)
          }, idx);
        }
      })
    }), nextPageLoad && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "loadd w-full flex justify-center items-center h-[200px]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
    })]
  });
};
/* harmony default export */ const favourite_lecturers_Favourite_lecturers = (Favourite_lecturers);
;// CONCATENATED MODULE: ./src/pages/favourite/Favourite.jsx










const Favourite = () => {
  const [tab, setTab] = (0,external_react_.useState)(1);
  const [count2, setCount2] = (0,external_react_.useState)(0);
  const [count1, setCount1] = (0,external_react_.useState)(0);
  const [count3, setCount3] = (0,external_react_.useState)(0);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Favorite resources on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "fav_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "fav_header_link bg-background",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Favourites"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "fav_tab_wrap",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "fav_tab",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            onClick: () => {
              setTab(1);
            },
            className: "fav_tab_song",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 1 ? "fav_tab_song1_active text-foreground " : "fav_tab_song1"}`,
              children: "Lectures"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 1 ? "fav_tab_song2_active text-color" : "fav_tab_song2"}`,
              children: `(${count1})`
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            onClick: () => {
              setTab(2);
            },
            className: "fav_tab_album",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 2 ? "fav_tab_album1_active text-foreground" : "fav_tab_album1"}`,
              children: "Album"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 2 ? "fav_tab_album2_active text-color" : "fav_tab_album2"}`,
              children: `(${count2})`
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            onClick: () => {
              setTab(3);
            },
            className: "fav_tab_playlist",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 3 ? "fav_tab_playlist1_active text-foreground" : "fav_tab_playlist1"}`,
              children: "Playlist"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 3 ? "fav_tab_playlist2_active text-color" : "fav_tab_playlist2"}`,
              children: `(${count3})`
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              setTab(4);
            },
            className: "fav_tab_video",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: `${tab === 4 ? "fav_tab_video1_active text-foreground" : "fav_tab_video1"}`,
              children: "Lecturers"
            })
          })]
        })
      }), tab === 1 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(favourite_songs_Favourite_songs, {
        setCount1: setCount1
      }), tab === 2 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(favourite_albums_Favourite_album, {
        setCount2: setCount2
      }), tab === 3 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(favourite_playlist_Favourite_playlist, {
        setCount3: setCount3
      }), tab === 4 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(favourite_lecturers_Favourite_lecturers, {})]
    })]
  });
};
/* harmony default export */ const favourite_Favourite = (Favourite);
;// CONCATENATED MODULE: ./src/pages/my_playlist/My_playlist.jsx




















const My_playlist = () => {
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const observer = (0,external_react_.useRef)();
  const [data, setdata] = (0,external_react_.useState)([]);
  const [isEmpty, setIsEmpty] = (0,external_react_.useState)(false);
  const [nextPageLoad, setNextPageLoad] = (0,external_react_.useState)(false);
  const [page, setPage] = (0,external_react_.useState)(0);
  const slide = (0,external_react_.useRef)();
  const [isprev, setisprev] = (0,external_react_.useState)(false);
  const [isnext, setisnext] = (0,external_react_.useState)(true);
  const [myFolders, setmyFolders] = (0,external_react_.useState)([]);
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [myplaylist, setmyplaylist] = (0,external_react_.useState)([]);

  // get my playlist
  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/playlistApi.php?user_id=${parseInt(currentUser?.id)}&action=user_playlists`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setmyFolders(external_lodash_default().uniqBy(res.data, "name"));
    }).catch(err => {});
  }, []);
  const getPlaylist = id => {
    if (!currentUser?.id) return;
    setLoading(true);
    setdata([]);
    useAxios.get(`/playlistApi.php?user_id=${parseInt(currentUser?.id)}&playlist_id=${parseInt(id)}&action=playlist_data`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      const {
        audio
      } = res.data[0];
      if (audio?.length === 0) {
        setLoading(false);
        external_react_hot_toast_namespaceObject.toast.error("selected folder is empty");
        setmyplaylist([]);
        return;
      }
      const audioArr = Object.values(audio);
      useAxios.get(`/leclisting_multi_nid_api.php?id=${audioArr.toString()}`).then(res => {
        if (res.data === null || !res.data) {
          external_react_hot_toast_namespaceObject.toast.error("selected folder is empty");
          setmyplaylist([]);
          return;
        }
        setmyplaylist(res.data);
        setLoading(false);
        setdata(external_lodash_default().uniqBy(res.data?.slice(0, 10), "nid"));
      }).catch(err => {});
    }).catch(err => {});
  };
  (0,external_react_.useEffect)(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myplaylist.slice(page, page + 10);
    if (additionalData.length === 0) {
      setIsEmpty(true);
    }
    setNextPageLoad(false);
    setdata(prev => external_lodash_default().uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);
  const lastElement = (0,external_react_.useCallback)(node => {
    if (isEmpty) return;
    UI_infinitePlayFavScroll(node, observer, page, setPage);
  }, [page]);

  //get lectures from the same lecturers
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  (0,external_react_.useEffect)(() => {
    function scrollEl() {
      if (slide.current.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }
      if (slide.current.scrollLeft + slide.current.offsetWidth >= slide.current.scrollWidth) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }
    slide.current?.addEventListener("scroll", scrollEl);
    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `My playlist on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "myplay_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "myplay_header_link bg-background",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "My Playlist"
        })
      }), (!currentUser?.id || myFolders.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "myplay_img_wrap",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          "src-data": musicEmptyState_namespaceObject,
          src: musicEmptyState_namespaceObject,
          alt: "empty"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "myplay_text",
          children: "You haven't created any playlists. Create your own playlists here."
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          className: "myplay_button",
          children: "Add Playlist"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "overflow_hidden_wrapper_p",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: isprev ? "prev" : "prev_none",
          onClick: prev,
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            "src-data": back_namespaceObject,
            src: back_namespaceObject,
            alt: "back"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: isnext ? "next" : "next_none",
          onClick: next,
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            src: foward_namespaceObject,
            "src-data": foward_namespaceObject,
            alt: "foward"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          ref: slide,
          className: "overflow_auto_wrapper",
          children: myFolders?.map(({
            id,
            name,
            views,
            img
          }, idx) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "similarWidget_album_item",
              onClick: () => {
                getPlaylist(id);
              },
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
                views: views || 0,
                categories: name,
                img: img || IMAGE_PLACEHOLDERS.lecture
              }, idx)
            }, idx + 1);
          })
        })]
      }), !myFolders && myplaylist.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "no_select_yet",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "no_sel_text",
          children: "--- Select a folder ---"
        })
      }), myplaylist.length !== 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "trend_title_wrap",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "tend_title1",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "tend_hash",
            children: "#"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Title"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "tend_title2",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Lecturer"
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "tend_title4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            children: "Time"
          })
        })]
      }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_desktop",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "load",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      }), !loading && myplaylist.length !== 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "table",
        children: data?.map(({
          Title,
          title,
          rpname,
          rp,
          img,
          cats,
          nid,
          views,
          duration,
          favorites
        }, idx) => {
          if (data.length === idx + 1) {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              ref: lastElement,
              className: "",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
                id: idx,
                image: img,
                duration: duration,
                title: title || Title,
                lecturer: rpname || rp,
                url: `${LECTURE}${nid}`,
                Title: Title,
                rpname: rpname || rp,
                cats: cats,
                nid: nid,
                views: views,
                currentUserId: currentUser?.id,
                favorites: favorites,
                navName: "My playlist",
                navLink: "/myplaylist",
                controlData: myplaylist
              }, idx)
            }, idx);
          } else {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
                id: idx,
                image: img,
                duration: duration,
                title: Title || title,
                lecturer: rpname || rp,
                url: `${LECTURE}${nid}`,
                Title: Title,
                rpname: rpname || rp,
                cats: cats,
                nid: nid,
                favorites: favorites,
                currentUser: currentUser?.id,
                navName: "My Playlist",
                navLink: "/myplaylist",
                controlData: myplaylist,
                views: views
              }, idx)
            }, idx);
          }
        })
      }), nextPageLoad && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load_m",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "loads",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        })
      })]
    })]
  });
};
/* harmony default export */ const my_playlist_My_playlist = (My_playlist);
;// CONCATENATED MODULE: ./src/assets/svg/sharebold.svg
const sharebold_namespaceObject = __webpack_require__.p + "bc73b089d92eab1e6303.svg";
;// CONCATENATED MODULE: ./src/components/similaraudio/similarAudio.jsx









const SimilarAudio = ({
  similar,
  heading,
  endpoint_url,
  currentPage,
  current,
  navtitle,
  type,
  url
}) => {
  const slide = (0,external_react_.useRef)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [isprev, setisprev] = (0,external_react_.useState)(false);
  const [isnext, setisnext] = (0,external_react_.useState)(true);

  ///////******************/ Similar audios ***********///////////

  //get lectures from the same lecturers
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth"
    });
  }
  (0,external_react_.useEffect)(() => {
    function scrollEl() {
      if (slide.current?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }
      if (slide.current?.scrollLeft + slide.current?.offsetWidth >= slide.current?.scrollWidth) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }
    slide.current?.addEventListener("scroll", scrollEl);
    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "similarWidget_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "similarWidget_top",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
        className: "similarWidget_top_heading text-foreground",
        children: heading
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        onClick: () => {
          navigate(MORE, {
            state: {
              name: "",
              heading: heading,
              id: "",
              img: "",
              type,
              endpoint_url,
              currentPage,
              navtitle
            }
          });
        },
        className: "similarWidget_more",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "similarWidget_more_text text-foreground dark:text-[#ddff2b]",
          children: "more"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fi_namespaceObject.FiChevronsRight, {
          className: "similarWidget_more_icon text-foreground dark:text-[#ddff2b]"
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "overflow_hidden_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isprev ? "prev" : "prev_none",
        onClick: prev,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: back_namespaceObject,
          alt: "back"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: isnext ? "next" : "next_none",
        onClick: next,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: foward_namespaceObject,
          alt: "foward"
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        ref: slide,
        className: "overflow_auto_wrapper",
        children: Array.isArray(similar) && similar?.filter(val => val.id !== current).map(({
          img,
          lec_img,
          name,
          id,
          views
        }, idx) => {
          return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "similarWidget_album_item",
            onClick: () => {
              navigate(`${url}/${id}`);
              // setendpUrl(similarAudioUrl);
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landingWidget_LandingWidget, {
              views: views || 0,
              categories: name,
              img: img || lec_img
            }, idx)
          }, idx + 1);
        })
      })]
    })]
  });
};
/* harmony default export */ const similarAudio = (SimilarAudio);
;// CONCATENATED MODULE: ./src/pages/lecturesListDetail/LecturesListDetail.jsx
































const LecturesListDetail = () => {
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const {
    state
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    currentUser,
    sharedAlbum
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const observeEl = (0,external_react_.useRef)();
  const leclistdet = (0,external_react_.useRef)();
  const [, setsingleData] = (0,external_react_.useState)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [isVisible, setIsVisible] = (0,external_react_.useState)(false);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const queryParam = {
    id
  };
  const keyParam = {
    id,
    page: 1
  };
  const {
    querieddata,
    refetch
  } = useQueryGetRequest("albumdetails", queryParam, lectureListDetailApi.getAlbumDetail);
  const {
    querieddata: albumlectures,
    isLoading
  } = useQueryGetRequest("albumlectures", queryParam, lectureListDetailApi.getAlbumLectures);
  const {
    querieddata: similarAlbums
  } = useQueryGetRequest("similarRpAlbums", keyParam, lectureListDetailApi.getSimilarAlbums);
  (0,external_react_.useEffect)(() => {
    setsingleData(prev => {
      return {
        ...prev,
        share: prev?.share + 1
      };
    });
  }, [sharedAlbum]);

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=album`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, [id]);

  /// Get the exiting element
  const firstElement = (0,external_react_.useCallback)(node => {
    observeEl.current = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    if (node) observeEl.current.observe(node);
  }, []);

  //play all audio files
  const playAll = () => {
    if (window.innerWidth <= 615) {
      navigate(`${LECTURE}${albumlectures[0]?.nid}`);
    } else {
      dispatch(getaudioId(albumlectures[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(albumlectures));
    setinitial(false);
  };

  ///**** share album ******** */

  const shareAlbum = e => {
    e.stopPropagation();
    setisShare(!isShare);
  };
  (0,external_react_.useEffect)(() => {
    leclistdet?.current.addEventListener("error", () => {
      const imgs = document.querySelectorAll("#hero");
      imgs.forEach(img => {
        img.src = IMAGE_PLACEHOLDERS.lecture;
      });
    });
  }, []);
  const lectureTitleExtractor = (title, position) => {
    if (!title) return;
    if (title && title.includes("-")) {
      const titleArray = title.split("-");
      if (titleArray.length >= 2 && position === 1) return titleArray[1];
      if (titleArray.length >= 2 && position === 2) return titleArray[2];
    }
    if (title) return title;
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [querieddata && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("title", {
        children: `${lectureTitleExtractor(querieddata[0]?.title, 2) || "Album"} - ${querieddata[0]?.rp_name || "Dawahnigeria"}`
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
        name: "description",
        content: `Listen to the album '${querieddata[0]?.title || 'Unknown Album'}' by ${querieddata[0]?.rp_name || "various scholars"} on Dawahnigeria. Explore Islamic lectures and resources.`
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
        property: "og:title",
        content: `${lectureTitleExtractor(querieddata[0]?.title, 2) || "Album"} - ${querieddata[0]?.rp_name || "Dawahnigeria"}`
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
        property: "og:description",
        content: `Listen to the album '${querieddata[0]?.title || "Unknown Album"}' by ${querieddata[0]?.rp_name || "various scholars"} on Dawahnigeria.`
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
        property: "og:image",
        content: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
        property: "og:type",
        content: "music.album"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(container_Container, {
      children: Array.isArray(querieddata) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "leclistdet_wrapper",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          ref: leclistdet,
          id: "hero",
          className: `${theme === "dark" ? "leclistdet_hero" : "leclistdet_hero_light"}`,
          src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
          alt: "audiohero"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "leclistdet_container",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "leclistdet_breadcrumb",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => {
                navigate(-1);
              },
              className: "leclistdet_breadcrumb_first",
              children: "Back"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "leclistdet_head_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "leclistdet_head_right_actions_wrap",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
                  onClick: () => {
                    playAll();
                  },
                  className: "leclistdet_play",
                  id: "player",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ci_namespaceObject.CiPlay1, {
                    className: "leclistdet_play_icon"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "leclistdet_play_text",
                    children: "Play All"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Play"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DesktopFavoriteButton, {
                  favorites: querieddata[0]?.favorites,
                  id: id,
                  type: "album",
                  refetch: refetch
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Like"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  onClick: e => {
                    shareAlbum(e, id);
                  },
                  className: "leclistdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                    className: "text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "leclistdet_share_text  text-color-primary",
                    children: formatNumber(querieddata[0]?.share || 0)
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Share"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  className: "leclistdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(CommentIcon, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "leclistdet_comment_text  text-color-primary",
                    children: formatNumber(querieddata[0]?.comments || 0)
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Comment"
                })]
              }), albumlectures?.length === 1 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioDownloadModal, {
                  downloads: querieddata[0]?.downloads,
                  nid: albumlectures[0]?.nid
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "dark:text-white text-center text-sm",
                  children: "Download"
                })]
              })]
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
            className: "leclistdet_head_right_text2 text-color",
            children: [" ", "Audio", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
              className: "braces text-color",
              children: ["(", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "braces_text text-color",
                children: formatNumber(querieddata[0]?.lec_no || 0)
              }), ")"]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "leclistdet_head_mobile",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isVisible ? "leclistdet_head_img_none" : "leclistdet_head_img",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "leclistdet_head_img_sz",
              ref: leclistdet,
              id: "hero",
              src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "leclistdet_min_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                navigate(-1);
              },
              className: "mob_arrow",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "mob_arrow_sz",
                src: arrowleft_namespaceObject,
                alt: "arrow"
              })
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "mobile_leclistdet_tab_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            ref: firstElement,
            className: "mob_txt",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "album_img",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                ref: leclistdet,
                id: "hero",
                className: "album_img_sz",
                src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                alt: ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "leclistdet_head_right_head text-foreground",
              children: querieddata[0]?.title || "Unknown"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "mob_like",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "leclistdet_head_mob_head",
                children: lectureTitleExtractor(querieddata[0]?.title, 2)
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "rp_img_name",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    ref: leclistdet,
                    id: "hero",
                    src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: querieddata[0]?.categories
                })]
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "listrank_and_listblack_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "listranking_none" : "listranking bg-black bg-opacity-50",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MobileFavoriteButton, {
                favorites: querieddata[0]?.favorites,
                id: id,
                type: "album",
                refetch: refetch
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  shareAlbum(e);
                },
                className: "icons_mob_listblack",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: sharebold_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(querieddata[0]?.share || 0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "icons_mob_listblack",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: combold_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  className: "likeys_text",
                  children: [" ", formatNumber(querieddata[0]?.comments || 0)]
                })]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "headings pb-7" : "headings_none",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                onClick: () => {
                  navigate(-1);
                },
                className: "fixed_mob_arrow",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "fixed_mob_arrow_sz",
                  src: arrowleft_namespaceObject,
                  alt: "hun"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "fixed_text",
                children: [" ", querieddata[0]?.categories]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "fixed_bg_none"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "header_bg",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "img",
                  ref: leclistdet,
                  id: "hero",
                  src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                  alt: "head"
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "listblacks bg-secondary",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: isVisible ? "fixed_icons_listblack bg-secondary px-2 py-3" : "icons_listblack bg-secondary py-3 px-2",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
                  id: "player",
                  onClick: playAll,
                  className: "play_header pb-2 w-full",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                    className: "w-fit h-fit border border-color-primary dark:border-color-primary border-gray-500 p-[2px] rounded-full",
                    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillPlayFill, {
                      className: "text-[22px] dark:text-color-primary text-gray-500"
                    })
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "dark:text-color-primary text-gray-500 font-medium",
                    children: "Play All"
                  })]
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "desktop_color_vid",
          children: " "
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecsong_wrapper bg-secondary",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "lect_title_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "lect_title1",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "lect_hash",
                children: "#"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                children: "Title"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "lect_title2",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Lecturer"
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "lect_title4",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Time"
              })
            })]
          }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loads",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "load",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "lecsong_content",
            children: !isLoading && Array.isArray(albumlectures) && albumlectures.filter((item, index, arr) => {
              // Remove duplicates based on title and nid
              const title = item.lectitle || item.title || item.Title;
              const nid = item.nid;
              return arr.findIndex(otherItem => (otherItem.lectitle || otherItem.title || otherItem.Title) === title && otherItem.nid === nid) === index;
            }).sort((a, b) => {
              // Extract numbers from titles for proper sorting
              const getNumberFromTitle = title => {
                const match = title?.match(/(\d+)/);
                return match ? parseInt(match[1]) : 0;
              };
              const aNum = getNumberFromTitle(a.lectitle || a.title || a.Title);
              const bNum = getNumberFromTitle(b.lectitle || b.title || b.Title);
              return aNum - bNum;
            }).map(({
              lectitle,
              Title,
              title,
              img,
              rp,
              duration,
              rpname,
              lec_img,
              mp3_thumbnail,
              rp_id,
              cats,
              nid,
              share,
              views,
              favorites,
              comments
            }, idx) => {
              return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "lecsong_content_item",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "desktops_item",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
                    id: idx,
                    title: lectitle || title,
                    lecturer: querieddata?.rp_name || rp,
                    image: mp3_thumbnail || lec_img || img,
                    url: `${LECTURE}${nid}`,
                    rpid: rp_id,
                    Title: Title || lectitle || title,
                    share: share,
                    rpname: querieddata?.rp_name || rp,
                    cats: cats,
                    comments: comments,
                    favorites: favorites,
                    nid: nid,
                    navName: lectureTitleExtractor(querieddata?.title, 2) || "Album",
                    navLink: -1,
                    controlData: albumlectures,
                    duration: duration,
                    views: views
                  }, idx)
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "mobile_item ",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(mobileList, {
                    id: idx,
                    title: lectitle || title,
                    lecturer: rpname || rp,
                    image: mp3_thumbnail || lec_img || img,
                    url: `${LECTURE}${nid}`,
                    Title: Title || lectitle || title,
                    rpname: rpname || rp,
                    cats: cats,
                    nid: nid,
                    rpid: rp_id,
                    comments: comments,
                    favorites: favorites,
                    navName: lectureTitleExtractor(querieddata?.title, 2) || "Album",
                    navLink: -1,
                    controlData: albumlectures,
                    duration: duration,
                    views: views
                  }, idx)
                })]
              }, idx);
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "px-3",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(similarAudio, {
            similar: similarAlbums,
            current: querieddata?.rp_id,
            url: `/a`,
            type: "album",
            endpoint_url: `/albumlisting_rp.php?offset=30&lim=10&rpid=${querieddata?.rp_id}&page=`,
            currentPage: 1,
            navtitle: "Album",
            heading: `Similar albums`
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
            audioComment: audioComment,
            id: id,
            type: "album"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isShare ? "share_wrapper" : "hide_share_wrapper",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
              isShare: isShare,
              setisShare: setisShare,
              nid: id,
              type: "album"
            })
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const lecturesListDetail_LecturesListDetail = (LecturesListDetail);
;// CONCATENATED MODULE: ./src/components/moreView/more.jsx

















function More() {
  const dispatch = (0,external_react_redux_.useDispatch)();
  const observer = (0,external_react_.useRef)();
  const [loading, setLoading] = (0,external_react_.useState)(true);
  const [viewMode, setViewMode] = (0,external_react_.useState)("grid"); // 'grid' or 'list'
  const {
    state,
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();

  // Default values when state is null
  const defaultState = {
    name: "",
    type: "lectures",
    id: "",
    currentdata: [],
    navtitle: "Home",
    heading: "Recently Posted",
    endpoint_url: "/leclisting_recent.php?&action=get_recent_audio&page=",
    currentPage: 1
  };

  // Use state values if available, otherwise use defaults
  const {
    name = defaultState.name,
    type = defaultState.type,
    id = defaultState.id,
    currentdata = defaultState.currentdata,
    navtitle = defaultState.navtitle,
    heading = defaultState.heading,
    endpoint_url = defaultState.endpoint_url,
    currentPage = defaultState.currentPage
  } = state || defaultState;
  const [page, setPage] = (0,external_react_.useState)(currentPage);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const keyParam = {
    endpoint_url,
    page
  };

  // Get the appropriate endpoint based on the pathname
  (0,external_react_.useEffect)(() => {
    if (!state) {
      const path = pathname;
      let newEndpoint = defaultState.endpoint_url;
      let newHeading = defaultState.heading;
      if (path.includes("/more/recently-viewed")) {
        newEndpoint = "/leclisting_recent_viewed.php?&action=get_recent_viewed&page=";
        newHeading = "Recently Viewed";
      } else if (path.includes("/more/trending")) {
        newEndpoint = "/leclisting_trending.php?&action=get_trending&page=";
        newHeading = "Trending";
      } else if (path.includes("/more/recommended")) {
        newEndpoint = "/leclisting_recommended.php?&action=get_recommended&page=";
        newHeading = "Recommended";
      } else if (path.includes("/more/recent")) {
        newEndpoint = "/leclisting_recent.php?&action=get_recent_audio&page=";
        newHeading = "Recently Posted";
      }
      keyParam.endpoint_url = newEndpoint;
      defaultState.heading = newHeading;
    }
  }, [pathname, state]);
  const {
    data,
    isLoading,
    isLoadingNextPage,
    isLastPage
  } = useMoreViewHook(keyParam, currentdata);
  const {
    ref: infiniteScrollRef
  } = useInfiniteScrollPagination(data?.length, page, setPage);
  const getSectionTitle = () => {
    const path = pathname;
    if (path.includes("/more/recent")) {
      return "Recently Posted";
    } else if (path.includes("/more/recently-viewed")) {
      return "Recently Viewed";
    } else if (path.includes("/more/trending")) {
      return "Trending";
    } else if (path.includes("/more/recommended")) {
      return "Recommended";
    }
    return heading;
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${getSectionTitle() ?? "Islamic"} resources on Dawah Nigeria `
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "more_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "more_wrap_link",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
            title: getSectionTitle()
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "px-4 py-3 border-b border-border",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "flex items-center justify-end gap-4 max-w-7xl mx-auto",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: () => setViewMode("grid"),
                className: `p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`,
                "aria-label": "Grid view",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiMiniSquares2X2, {
                  className: "text-xl"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: () => setViewMode("list"),
                className: `p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`,
                "aria-label": "List view",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineBars3, {
                  className: "text-xl"
                })
              })]
            })
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("nav", {
          className: "desktop_heading px-6 py-4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center space-x-4",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => navigate(-1),
              className: "p-2 hover:bg-accent rounded-full transition-colors",
              "aria-label": "Go back",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineArrowLongLeft, {
                className: "text-2xl text-foreground"
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "flex items-center space-x-2 text-sm",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "text-muted-foreground",
                children: navtitle
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "text-muted-foreground",
                children: "/"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                className: "text-foreground font-medium",
                children: heading
              })]
            })]
          })
        })]
      }), isLoading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex items-center justify-center h-[50vh]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "more_widget",
        children: type === "lectures" && Array.isArray(data) && data?.map((item, idx) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
          to: `${LECTURE}${item.nid || item.id}`,
          onClick: () => {
            if (window.innerWidth <= 615) {
              dispatch(getPack(null));
              dispatch(getPage(currentPage));
              dispatch(getPack(data));
              setinitial(false);
            }
          },
          ref: idx === data?.length - 1 && !isLastPage ? infiniteScrollRef : null,
          className: "widget_list_items",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "widget_img_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              src: item.img || item.lec_img,
              alt: item.title || "Lecture",
              className: "widget_img"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "widget_views",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineEye, {
                className: "widget_views_icon"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: item.views || 0
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "widget_text",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
              className: "widget_title",
              children: item.title || item.Title || item.mp3_title
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "widget_lecturer",
              children: item.rpname || "Unknown Lecturer"
            })]
          })]
        }, idx + 1))
      }), isLoadingNextPage && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "flex justify-center py-8",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      }), !isLoading && data?.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex flex-col items-center justify-center h-[50vh] text-center",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "text-xl font-medium text-foreground mb-2",
          children: "No content found"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
          className: "text-muted-foreground",
          children: "Try adjusting your filters"
        })]
      })]
    })]
  });
}
/* harmony default export */ const more = (More);
;// CONCATENATED MODULE: ./src/assets/svg/playlist.svg
const playlist_namespaceObject = __webpack_require__.p + "c6ffeaa442e01d37a3c2.svg";
;// CONCATENATED MODULE: ./src/assets/svg/addplaylist.svg
const addplaylist_namespaceObject = __webpack_require__.p + "53b2edc816b64f3b083d.svg";
;// CONCATENATED MODULE: ./src/assets/svg/fav.svg
const fav_namespaceObject = __webpack_require__.p + "d4b2cbc04155f5446a70.svg";
;// CONCATENATED MODULE: ./src/pages/library/library.jsx












const Library = () => {
  const {
    currentUser
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Library - Islamic resources on Dawah Nigeria `
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "lib_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "lib_header_link",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "lib_img_wrap",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            className: "lib_img_wrap_sz",
            src: avatar_namespaceObject,
            alt: "avt"
          })
        }), currentUser ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "user_name",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "name",
            children: currentUser?.username
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            className: "social_name",
            children: currentUser?.email
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "no_user",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            onClick: () => {
              navigate("/auth/signup");
            },
            className: "reg_sign",
            children: "Sign up"
          }), "/", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
            onClick: () => {
              navigate("/auth/login");
            },
            className: "reg_sign",
            children: "Log in"
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex_wrapp",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(MYPLAYLIIST);
          },
          className: "mini_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "img_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "img_wrap_sz",
              src: playlist_namespaceObject,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Playlist"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: () => {
            navigate(FAVOURITE);
          },
          className: "mini_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "img_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "img_wrap_sz",
              src: fav_namespaceObject,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Favourites"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "mini_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "img_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "img_wrap_sz",
              src: addplaylist_namespaceObject,
              alt: ""
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            children: "Add Playlist"
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const library_library = (Library);
;// CONCATENATED MODULE: ./src/pages/Authentication/selectLanguage.jsx









const SelectLanguage = () => {
  const {
    state
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [langData, setLangData] = (0,external_react_.useState)([]);
  const [langid, setlangid] = (0,external_react_.useState)();
  const [selected, setselected] = (0,external_react_.useState)(false);
  (0,external_react_.useEffect)(() => {
    useAxios.get(`/all_lang_api.php`).then(res => {
      setLangData(res.data);
    }).catch(err => {});
  }, []);

  //social authentication method
  const handleSocialRegister = () => {
    const isSocial = true;
    const getId = null;
    const payload = {
      ...state?.payload,
      languageId: langid
    };
    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "signuplang_wrapper",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: "Select language |  Dawah Nigeria, home of Islamic resources"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
      className: "header",
      children: "Select a language"
    }), langData?.map(({
      name,
      id
    }, index) => {
      return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          setlangid(id);
          setselected(true);
        },
        className: selected && id === langid ? "signuplang_name active dark:bg-white bg-[#ddff2b]" : "signuplang_name  text-foreground",
        children: name
      }, index);
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
      disabled: !selected,
      onClick: handleSocialRegister,
      className: "continue_btn",
      children: [!loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
        children: "Continue"
      }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {
        className: "loader_size"
      }), " "]
    })]
  });
};
/* harmony default export */ const selectLanguage = (SelectLanguage);
;// CONCATENATED MODULE: ./src/components/UI/scrollToTop.js


const Scrolltotop = () => {
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  (0,external_react_.useEffect)(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);
  return null;
};
/* harmony default export */ const scrollToTop = (Scrolltotop);
;// CONCATENATED MODULE: ./src/assets/svg/boom-share.svg
const boom_share_namespaceObject = __webpack_require__.p + "e99cde23f450da732186.svg";
;// CONCATENATED MODULE: ./src/pages/lecturesListDetail/playlistdetail.jsx






































const PlaylistDetail = () => {
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    currentUser,
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const observeEl = (0,external_react_.useRef)();
  const {
    setinitial
  } = (0,external_react_.useContext)(AudioContext);
  const [isShare, setisShare] = (0,external_react_.useState)(false);
  const [isVisible, setIsVisible] = (0,external_react_.useState)(false);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [audioComment, setaudioComment] = (0,external_react_.useState)();
  const queryParam = {
    id
  };
  const {
    querieddata,
    isLoading,
    refetch
  } = useQueryGetRequest("playlist-details", queryParam, playlistdetailApi.getPlaylistData);
  const keyParam = {
    multiId: querieddata[0]?.audio?.toString() || null
  };
  const {
    querieddata: playlistlectures
  } = usePlaylistLectures("playlist-lectures", keyParam, playlistdetailApi.getPlaylistLectures);
  const {
    data: similarPlaylists
  } = useAllPlaylistHook();

  //////*************handling comment**************** */

  (0,external_react_.useEffect)(() => {
    if (!currentUser?.id) return;
    useAxios.get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=playlist`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setaudioComment(res.data.reverse());
    }).catch(err => {});
  }, [id]);

  /// Get the exiting element
  const firstElement = (0,external_react_.useCallback)(node => {
    observeEl.current = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    if (node) observeEl.current.observe(node);
  }, []);

  //play all audio files
  const playAll = () => {
    if (window.innerWidth <= 615) {
      navigate(`${LECTURE}${querieddata[0]?.nid}`);
    } else {
      dispatch(getaudioId(querieddata[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(querieddata));
    setinitial(false);
  };

  ///**** share album ******** */

  const sharePlaylist = e => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  ///////
  (0,external_react_.useEffect)(() => {
    const lazy = document.querySelectorAll("#detail");
    lazy.forEach(im => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
    });
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${querieddata[0]?.name || "Playlist"} on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "leclistdet_wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
        // ref={lecdet}
        id: "hero",
        className: `${theme === "dark" ? "leclistdet_hero" : "leclistdet_hero_light"}`,
        src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
        alt: "audiohero"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "leclistdet_container",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "leclistdet_breadcrumb",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            onClick: () => {
              navigate(-1);
            },
            className: "leclistdet_breadcrumb_first",
            children: "Back/"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "leclistdet_breadcrumb_second text-foreground",
            children: querieddata[0]?.name || "Unknown"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "leclistdet_head_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "leclistdet_head_left",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "leclistdet_head_left_img",
              src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "leclistdet_head_right",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "leclistdet_head_right_head text-foreground",
              children: querieddata[0]?.name || "Unknown"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "leclistdet_head_right_actions_wrap",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
                onClick: () => {
                  playAll();
                },
                className: "leclistdet_play",
                id: "player",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ci_namespaceObject.CiPlay1, {
                  className: "leclistdet_play_icon"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "leclistdet_play_text",
                  children: "Play All"
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(DesktopFavoriteButton, {
                favorites: querieddata[0]?.favorites,
                id: id,
                type: "playlist",
                refetch: refetch
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  sharePlaylist(e, id);
                },
                className: "leclistdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(sl_namespaceObject.SlShare, {
                  className: "text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]"
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "leclistdet_share_text text-color-primary",
                  children: formatNumber(0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "leclistdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(CommentIcon, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                  className: "leclistdet_comment_text text-color-primary",
                  children: formatNumber(0)
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
          className: "leclistdet_head_right_text2 text-color",
          children: [`${querieddata[0]?.name || "Unknown"}`, /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
            className: "braces text-color",
            children: ["(", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "text-color braces_text",
              children: playlistlectures?.length
            }), ")"]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "leclistdet_head_mobile",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: isVisible ? "leclistdet_head_img_none" : "leclistdet_head_img",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              className: "leclistdet_head_img_sz",
              src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
              alt: "head"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "leclistdet_min_wrap",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              onClick: () => {
                navigate(-1);
              },
              className: "mob_arrow",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "mob_arrow_sz",
                src: arrowleft_namespaceObject,
                alt: "arrow"
              })
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "mobile_leclistdet_tab_wrap",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            ref: firstElement,
            className: "mob_txt",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "album_img",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                className: "album_img_sz",
                src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                alt: ""
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "mob_like",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "leclistdet_head_mob_head",
                children: querieddata[0]?.name || "Unknown"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "rp_img_name",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: "--"
                })]
              })]
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "listrank_and_listblack_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "listranking_none" : "listranking bg-black bg-opacity-50",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(MobileFavoriteButton, {
                favorites: querieddata[0]?.favorites,
                id: id,
                type: "playlist",
                refetch: refetch
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                onClick: e => {
                  sharePlaylist(e);
                },
                className: "icons_mob_listblack",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: sharebold_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                  className: "likeys_text",
                  children: formatNumber(0)
                })]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "icons_mob_listblack",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                  className: "likeys_img",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                    className: "likeys_img_sz",
                    src: combold_namespaceObject,
                    alt: ""
                  })
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
                  className: "likeys_text",
                  children: [" ", formatNumber(0)]
                })]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: isVisible ? "headings pb-7" : "headings_none",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                onClick: () => {
                  navigate(-1);
                },
                className: "fixed_mob_arrow",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "fixed_mob_arrow_sz",
                  src: arrowleft_namespaceObject,
                  alt: "hun"
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "fixed_text",
                children: [" ", querieddata[0]?.name]
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "fixed_bg_none"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "header_bg",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "img",
                  src: querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture,
                  alt: "head"
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "listblacks",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: isVisible ? "fixed_icons_listblack p-3" : "icons_listblack p-3",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
                  id: "player",
                  onClick: playAll,
                  className: "play_header pb-2 w-full",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                    className: "w-fit h-fit border border-color-primary dark:border-color-primary border-gray-500 p-[2px] rounded-full",
                    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(bs_namespaceObject.BsFillPlayFill, {
                      className: "text-[22px] dark:text-color-primary text-gray-500"
                    })
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                    className: "dark:text-color-primary text-gray-500 font-medium",
                    children: "Play All"
                  })]
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "mobile_color_vid"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "desktop_color_vid",
          children: " "
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecsong_wrapper",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "lect_title_wrap",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "lect_title1",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                className: "lect_hash",
                children: "#"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
                children: "Title"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "lect_title2",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Lecturer"
              })
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "lect_title4",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Time"
              })
            })]
          }), isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "loads",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "load",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
            })
          }), !isLoading && querieddata[0]?.audio?.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "text-gray-200 no_playlist flex items-center justify-center w-full h-[200px]",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: "-- no lecture in playlist --"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "lecsong_content",
            children: !isLoading && querieddata[0]?.audio?.length !== 0 && Array.isArray(playlistlectures) && playlistlectures?.map(({
              lectitle,
              Title,
              title,
              img,
              rp,
              duration,
              rpname,
              lec_img,
              rp_id,
              cats,
              nid,
              share,
              views,
              favorites,
              comments
            }, idx) => {
              return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                className: "lecsong_content_item",
                children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "desktops_item",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(musicList, {
                    id: idx,
                    title: lectitle || title,
                    lecturer: rpname || rp,
                    image: lec_img || img,
                    url: `${LECTURE}${nid}`,
                    rpid: rp_id,
                    Title: Title || lectitle || title,
                    share: share,
                    rpname: rpname || rp,
                    cats: cats,
                    comments: comments,
                    favorites: favorites,
                    nid: nid,
                    navName: "Back",
                    navLink: -1,
                    controlData: playlistlectures,
                    duration: duration,
                    views: views
                  }, idx)
                }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                  className: "mobile_item",
                  children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(mobileList, {
                    id: idx,
                    title: lectitle || title,
                    lecturer: rpname || rp,
                    image: lec_img || img,
                    url: `${LECTURE}${nid}`,
                    Title: Title || lectitle || title,
                    rpname: rpname || rp,
                    cats: cats,
                    nid: nid,
                    rpid: rp_id,
                    comments: comments,
                    favorites: favorites,
                    navName: "Back",
                    navLink: -1,
                    controlData: playlistlectures,
                    duration: duration,
                    views: views
                  }, idx)
                })]
              }, idx);
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "px-3",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(similarAudio, {
            similar: similarPlaylists,
            current: id,
            url: `/pl`,
            type: "playlist",
            navtitle: "Playlist",
            heading: `Similar Playlist`
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(comment_comment, {
            audioComment: audioComment,
            id: id,
            type: "playlist"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: isShare ? "share_wrapper" : "hide_share_wrapper",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(shareaudio_shareAudio, {
            isShare: isShare,
            setisShare: setisShare,
            nid: id,
            type: "playlist"
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const playlistdetail = (PlaylistDetail);
;// CONCATENATED MODULE: external "react-icons/vsc"
const vsc_namespaceObject = require("react-icons/vsc");
;// CONCATENATED MODULE: ./src/pages/genredetail/genreDetail.jsx













const GenreDetail = () => {
  const {
    id
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const queryParam = {
    id
  };
  const {
    theme
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const {
    querieddata
  } = useQueryGetRequest("genre-details", queryParam, genresApi.getCategoryDetails);

  //i/genre_api.php?cat_id=40622
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${querieddata?.category_details && querieddata?.category_details[0]?.name || ""} - Islamic resources on Dawah Nigeria`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "genredet_wrapper max-[615px]:pt-[10%]",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "w-full min-[615px]:h-[700px] h-[260px] max-[615px]:brightness-[20%] absolute ",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          className: "w-full h-full bg-cover ",
          src: querieddata?.category_details && querieddata?.category_details[0]?.img || IMAGE_PLACEHOLDERS.lecture,
          alt: ""
        }), theme === "dark" ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "gradientgenre"
        }) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "gradientgenre_light"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "w-full relative top-0 inset-x-0 h-[260px] min-[615px]:h-[350px]",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "w-full absolute top-0 inset-x-0 h-full",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            onClick: () => {
              navigate(-1);
            },
            className: "min-[615px]:hidden absolute z-[1] top-4 left-4",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(md_namespaceObject.MdNavigateBefore, {
              className: "text-[28px] text-white"
            })
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "desktop_heading absolute z-[1] cursor-pointer top-4 left-4",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(vsc_namespaceObject.VscArrowLeft, {
              onClick: () => {
                navigate(-1);
              },
              className: pathname === `/genres/${id}` ? "arrows white" : "arrows grey"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(vsc_namespaceObject.VscArrowRight, {
              className: pathname === "/" ? "arrows white" : "arrows grey"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "grey",
              children: "Genre"
            }), "/ ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {}), querieddata?.category_details && querieddata?.category_details[0]?.name]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "w-full h-fit m-auto absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "text-lg min-[615px]:text-3xl font-semibold text-white",
              children: querieddata?.category_details && querieddata?.category_details[0]?.name
            })
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "genre_items w-full min-[615px]:relative pb-10 min-[615px]:space-y-4 space-y-3 px-4",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: querieddata?.audio,
          heading: "Lectures",
          type: "lectures",
          nav1: {
            title: "Genres"
          }
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: querieddata?.rp,
          heading: "Lecturers",
          type: "lecturer",
          nav1: {
            title: "Genres"
          }
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(groupWidget_GroupWidget, {
          data: querieddata?.album,
          heading: "Albums",
          type: "album",
          nav1: {
            title: "Genres"
          }
        })]
      })]
    })]
  });
};
/* harmony default export */ const genreDetail = (GenreDetail);
;// CONCATENATED MODULE: ./src/pages/buzz/buzz.jsx






const Buzz = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Buzz is coming soon on Dawah Nigeria `
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "relative w-full h-[100vw] min-[615px]:h-[70vw]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "absolute inset-0 m-auto shadow-lg bg-backround py-6 space-y-6 flex-col text-foreground rounded-md w-[80%] min-[615px]:w-[350px] h-fit flex items-center justify-center",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "min-[615px]:text-3xl text-2xl",
          children: "Coming soon"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaLightbulb, {
          className: "text-[#ddff2b] text-4xl min-[615px]:text-5xl"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => {
            navigate(-1);
          },
          className: "text-sm text-foreground transform ease hover:text-zinc-700 hover:bg-gray-200 p-2 rounded-md border border-foreground",
          children: "Go Back"
        })]
      })
    })]
  });
};
/* harmony default export */ const buzz = (Buzz);
;// CONCATENATED MODULE: ./src/pages/podcast/podcast.jsx






const Podcast = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Podcast is coming soon on Dawah Nigeria `
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "relative w-full h-[80vh] min-[615px]:h-[70vh]",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "absolute inset-0 m-auto shadow-lg bg-backround py-6 space-y-6 flex-col text-foreground rounded-md w-[80%] min-[615px]:w-[350px] h-fit flex items-center justify-center",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "min-[615px]:text-3xl text-2xl",
          children: "Coming soon"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaLightbulb, {
          className: "text-[#ddff2b] text-4xl min-[615px]:text-5xl"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
          onClick: () => {
            navigate(-1);
          },
          className: "text-sm text-foreground transform ease hover:text-zinc-700 hover:bg-gray-200 p-2 rounded-md border border-foreground",
          children: "Go Back"
        })]
      })
    })]
  });
};
/* harmony default export */ const podcast = (Podcast);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchDataWidget/searchDataWidget.jsx




const SearchDataWidget = ({
  lec_img,
  cat_name,
  mp3_title,
  mp3_description,
  lecturer_name,
  id,
  duration
}) => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();

  // Parse description to get language and size
  const parseDescription = description => {
    if (!description) return {};
    const languageMatch = description.match(/Language:\s*([^.]+)\./);
    const sizeMatch = description.match(/Size:\s*([^[]+)/);
    return {
      language: languageMatch ? languageMatch[1].trim() : null,
      size: sizeMatch ? sizeMatch[1].trim() : null
    };
  };
  const {
    language,
    size
  } = parseDescription(mp3_description);
  (0,external_react_.useEffect)(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#search");
      lazy.forEach(im => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
    lazyImages();
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    onClick: () => navigate(`/dawahcast/l/${id}`),
    className: "w-full cursor-pointer bg-black/90 hover:bg-black/80 transition-all duration-200 p-4",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "flex gap-4",
      children: [lec_img && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "shrink-0",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: lec_img,
          alt: lecturer_name,
          className: "w-16 h-16 rounded object-cover",
          id: "search",
          "src-data": lec_img
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex-1 min-w-0",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("h3", {
          className: "text-base font-normal text-white mb-1",
          children: [mp3_title, language && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
            className: "text-gray-400 text-sm",
            children: [" (", language, ")"]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "space-y-0.5 text-sm",
          children: [lecturer_name && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
            className: "text-gray-400 flex items-center gap-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: "By:"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: lecturer_name
            })]
          }), cat_name && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
            className: "text-gray-400 flex items-center gap-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: "Type:"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              className: "capitalize",
              children: cat_name
            })]
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex items-center gap-4",
            children: [size && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
              className: "text-gray-400 flex items-center gap-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Size:"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: size
              })]
            }), duration && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("p", {
              className: "text-gray-400 flex items-center gap-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Duration:"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: duration
              })]
            })]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const searchDataWidget = (SearchDataWidget);
;// CONCATENATED MODULE: ./src/pages/searchPage/searchPage.jsx















const SearchPage = () => {
  const {
    setText
  } = (0,external_react_.useContext)(SearchContext);
  const {
    searchData
  } = (0,external_react_redux_.useSelector)(state => state.search);
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const {
    setRes,
    setisOpen
  } = (0,external_react_.useContext)(NavContext);
  const {
    pathname
  } = (0,external_react_router_dom_namespaceObject.useLocation)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [searchParams] = (0,external_react_router_dom_namespaceObject.useSearchParams)();
  const [currentPage, setCurrentPage] = (0,external_react_.useState)(1);
  const [totalResults, setTotalResults] = (0,external_react_.useState)(0);
  const handleSideBar = () => {
    setRes(1);
    setisOpen(true);
  };
  function fetchData(page = 1) {
    const searchValue = searchParams.get("query");
    if (!searchValue) {
      navigate("/");
      return;
    }
    setLoading(true);
    setText(searchValue); // Now setText is properly defined from SearchContext

    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/searchApi.php`;
    const params = new URLSearchParams({
      type: "global",
      value: searchValue,
      page: page.toString(),
      limit: "20"
    });
    external_axios_default().get(`${baseUrl}?${params.toString()}`).then(res => {
      setLoading(false);
      if (res.data.status === "success") {
        // Handle both possible response structures
        const results = res.data.results || res.data.data || [];
        const total = res.data.total || 0;
        const page = res.data.page || 1;
        dispatch(getSearchData(results));
        dispatch(getSearchRecord(total));
        setTotalResults(total);
        setCurrentPage(parseInt(page));
      } else {
        dispatch(getSearchData([]));
        dispatch(getSearchRecord(0));
        setTotalResults(0);
      }
    }).catch(err => {
      console.error("Search error:", err);
      setLoading(false);
      dispatch(getSearchData([]));
      dispatch(getSearchRecord(0));
      setTotalResults(0);
    });
  }
  (0,external_react_.useEffect)(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    fetchData(page);
  }, [searchParams]);
  const handlePageChange = newPage => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    navigate(`${pathname}?${newSearchParams.toString()}`);
  };
  const totalPages = Math.ceil(totalResults / 20);
  const searchValue = searchParams.get("query");
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(container_Container, {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-full h-full max-[615px]:pt-[6px] text-sm min-[615px]:text-[16px] font-thin text-black dark:text-gray-200",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "w-full fixed inset-x-0 z-[10] bg-primary-foreground p-0 max-[615px]:border-b border-zinc-700",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
          title: `Search for ${searchValue || "islamic"} resources on Dawah Nigeria`
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: "Search"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "pt-2 pl-2 flex items-center space-x-1 max-[615px]:hidden",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineArrowLongLeft, {
          onClick: () => navigate(-1),
          className: pathname === SEARCH ? "text-[30px] text-color" : "text-[30px] text-gray-400"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlineArrowLongRight, {
          className: pathname === "/" ? "text-[30px] text-color" : "text-[30px] text-zinc-400"
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: "mr-1",
          children: "Search"
        }), "/ ", /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {}), `Search for ${searchValue || ""}`]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex text-color text-sm font-normal flex-col px-2 py-12 min-[615px]:px-6 min-[615px]:py-6 w-full",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          onClick: handleSideBar,
          className: "my-3 w-fit space-x-2 border px-2 py-1 rounded-md min-[890px]:hidden flex items-center border-border",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(fa_namespaceObject.FaFilter, {
            className: "text-[22px]"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            children: "Filter"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "text-lg text-foreground mb-3 min-[615px]:text-xl",
          children: `${totalResults?.toLocaleString() || 0} results for '${searchValue || ""}'`
        }), loading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "w-full h-[300px] flex items-center justify-center",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "animate-spin w-6 h-6 min-[615px]:w-8 min-[615px]:h-8 rounded-full border-r-2 border-b-2 border-zinc-400"
          })
        }), !loading && (!searchData || searchData.length === 0) && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "w-full flex items-center justify-center h-[300px]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h1", {
            className: "text-3xl min-[615px]:text-4xl text-color tracking-wider",
            children: "No search results found"
          })
        }), !loading && searchData && searchData.length > 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "space-y-2",
            children: searchData.map((item, idx) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(searchDataWidget, {
              lec_img: item.lecturer_image,
              cat_name: item.type,
              mp3_title: item.title,
              mp3_description: item.description,
              lecturer_name: item.lecturer_name,
              id: item.id,
              duration: item.duration
            }, item._id.$oid || idx))
          }), totalPages > 1 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex justify-center items-center gap-4 mt-8",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => handlePageChange(currentPage - 1),
              disabled: currentPage === 1,
              className: `px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`,
              children: "Previous"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
              className: "text-sm",
              children: ["Page ", currentPage, " of ", totalPages]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
              onClick: () => handlePageChange(currentPage + 1),
              disabled: currentPage === totalPages,
              className: `px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`,
              children: "Next"
            })]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const searchPage = (SearchPage);
;// CONCATENATED MODULE: ./src/assets/svg/close.svg
const close_namespaceObject = __webpack_require__.p + "559c7acc6314db7527fd.svg";
;// CONCATENATED MODULE: ./src/pages/forgotpassword/resetpassword/resetPassword.jsx







const ResetPassword = () => {
  const [email, setEmail] = (0,external_react_.useState)();
  const [code, setCode] = (0,external_react_.useState)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [password, setPassword] = (0,external_react_.useState)();
  const [confirmPassword, setConfirmPassword] = (0,external_react_.useState)();
  const [show, setShow] = (0,external_react_.useState)("password");
  const [show2, setShow2] = (0,external_react_.useState)("password");
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const handleSubmit = () => {
    // //281190
    const validateData = {
      email,
      password,
      code
    };
    for (let i in validateData) {
      if (validateData[i] === "") {
        external_react_hot_toast_namespaceObject.toast.error(`${i} is required`);
        return;
      }
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      external_react_hot_toast_namespaceObject.toast.error("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword !== password) {
      external_react_hot_toast_namespaceObject.toast.error("Same password is required");
      return;
    }
    setLoading(true);
    const payload = {
      update_forgot_password: "true",
      verification_code: code,
      email,
      password
    };
    //post reset password request
    useAxios.post(`/forgot_passwordApi.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setLoading(false);
      navigate("/auth/login");
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
    }).catch(err => {
      setLoading(false);
      external_react_hot_toast_namespaceObject.toast.error(err.response.data.message);
    });
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "w-full px-4 let swipeIn mt-[6rem] flex flex-col justify-center items-center text-sm min-[615px]:text-[16px]",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-full text-[#d4d4d4] mb-[4rem] items-start flex justify-start flex-col text-lg min-[615px]:text-2xl",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        children: " Reset Password"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "text-[12px]",
        children: "Enter you verification code and set your new password"
      })]
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "w-full space-y-3",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
        type: "number",
        value: code,
        name: "number",
        onChange: e => {
          setCode(e.target.value);
        },
        placeholder: "Verification Code",
        className: "no-range w-full border border-[#d4d4d4] bg-[#353535]  bg- px-6 rounded-[5px] outline-none placeholder:text-[#5e5e5e] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
        type: "email",
        value: email,
        name: "email",
        onChange: e => {
          setEmail(e.target.value);
        },
        placeholder: "Enter your email address",
        className: "w-full border border-[#d4d4d4] bg-[#353535] text-[#d4d4d4] bg- px-6 rounded-[5px] outline-none h-[47px] text-sm min-[615px]:text-[16px] placeholder:text-[#5e5e5e]"
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex items-center w-full border border-[#d4d4d4] bg-[#353535] px-6 rounded-[5px] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          type: show,
          value: password,
          name: "password",
          onChange: e => {
            setPassword(e.target.value);
          },
          placeholder: "Enter new password",
          className: "h-full w-[90%] placeholder:text-[#5e5e5e] bg-[#353535]  outline-none text-[#d4d4d4]"
        }), show === "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEye, {
            onClick: () => setShow("text"),
            className: ""
          })
        }), show !== "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEyeInvisible, {
            onClick: () => setShow("password"),
            className: ""
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "flex items-center w-full border border-[#d4d4d4] bg-[#353535] px-6 rounded-[5px] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
          type: show,
          value: confirmPassword,
          name: "password",
          onChange: e => {
            setConfirmPassword(e.target.value);
          },
          placeholder: "Confirm Password",
          className: "h-full w-[90%] placeholder:text-[#5e5e5e] bg-[#353535]  outline-none text-[#d4d4d4]"
        }), show2 === "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEye, {
            onClick: () => setShow2("text"),
            className: ""
          })
        }), show2 !== "password" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ai_namespaceObject.AiFillEyeInvisible, {
            onClick: () => setShow2("password"),
            className: ""
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
        onClick: handleSubmit,
        className: "flex justify-center items-center h-[3.2rem] w-full rounded-[5px] text-[#070707] font-medium bg-[#d6ff00]",
        children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          children: " Reset Password"
        })
      })]
    })]
  });
};
/* harmony default export */ const resetPassword = (ResetPassword);
;// CONCATENATED MODULE: ./src/pages/forgotpassword/forgotPassword.jsx









const ForgotPassword = () => {
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [email, setEmail] = (0,external_react_.useState)();
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const [isreset, setreset] = (0,external_react_.useState)(false);
  const handleSubmit = () => {
    if (email === "" || email === undefined) {
      external_react_hot_toast_namespaceObject.toast.error("Email is required");
      return;
    }
    setLoading(true);
    const payload = {
      verify_email: "true",
      email
    };
    //post email for verfication
    useAxios.post(`/forgot_passwordApi.php`, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25"
      }
    }).then(res => {
      setLoading(false);
      setreset(true);
      external_react_hot_toast_namespaceObject.toast.success(res.data.message);
    }).catch(err => {
      setLoading(false);
      external_react_hot_toast_namespaceObject.toast.error("User with the provided email does not exist");
    });
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
    className: "w-full z-[100] h-full fixed bg-black inset-0",
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `Forgot password -  Dawah Nigeria, home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "bg-[#353535] m-auto h-full inset-0 absolute w-full min-[615px]:w-[600px]",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        onClick: () => {
          navigate(-1);
        },
        className: "cursor-pointer w-full items-center justify-end flex",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
          src: close_namespaceObject,
          alt: ""
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: isreset ? "hidden" : `w-full px-4 mt-[6rem] flex flex-col justify-center items-center text-sm min-[615px]:text-[16px]`,
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "w-full text-[#d4d4d4] mb-[4rem] items-start flex justify-start flex-col text-lg min-[615px]:text-2xl",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            children: " Forgot Password"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "text-[12px]",
            children: "Enter you email address to get a verification code"
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "w-full space-y-3",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
            type: "email",
            value: email,
            name: "email",
            onChange: e => {
              setEmail(e.target.value);
            },
            placeholder: "Enter your email address",
            className: "w-full border border-[#d4d4d4] bg-[#353535] placeholder:text-[#5e5e5e] bg- px-6 rounded-[5px] outline-none h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: handleSubmit,
            className: "flex justify-center items-center h-[3.2rem] w-full rounded-[5px] text-[#070707] font-medium bg-[#d6ff00]",
            children: loading ? /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {}) : /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
              children: " Submit"
            })
          })]
        })]
      }), isreset && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(resetPassword, {})]
    })]
  });
};
/* harmony default export */ const forgotPassword = (ForgotPassword);
;// CONCATENATED MODULE: ./src/utils/tracking/index.js


const usePageTracking = () => {
  const location = (0,external_react_router_dom_namespaceObject.useLocation)();
  (0,external_react_.useEffect)(() => {
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search + location.hash,
      page_search: location.search,
      page_hash: location.hash
    });
  }, [location]);
};
;// CONCATENATED MODULE: ./src/components/ramadan-details/desktopTabs/DesktopTabs.jsx



const RamadanDetailsDesktopTabs = ({
  languageTab,
  setLanguageTab
}) => {
  const {
    id: ramadanYearId
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const {
    data: ramadanYearLectures
  } = useRamadanYearAlbums(ramadanYearId);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "lecdet_tab_wrap mb-5",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecdet_tab",
      children: ramadanYearLectures?.map(({
        lang_id,
        name,
        documents
      }, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
        onClick: () => {
          setLanguageTab(lang_id);
        },
        className: "lecdet_tab_song",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
          className: `${(languageTab !== undefined ? languageTab === lang_id : index === 0) ? "lecdet_tab_song1_active text-foreground" : "lecdet_tab_song1"}`,
          children: name
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
          className: `${(languageTab !== undefined ? languageTab === lang_id : index === 0) ? "lecdet_tab_song2_active text-color" : "lecdet_tab_song2"}`,
          children: ["(", documents?.length, ")"]
        })]
      }, lang_id))
    })
  });
};
;// CONCATENATED MODULE: ./src/components/ramadan-details/mobileTabs/MobileTabs.jsx



const RamadamDetailsMobileTabs = ({
  languageTab,
  setLanguageTab
}) => {
  const {
    id: ramadanYearId
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const {
    data: ramadanYearLectures
  } = useRamadanYearAlbums(ramadanYearId);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "mobile_lecdet_tab flex md:hidden overflow-x-auto p-3 gap-x-3 text-color",
    children: ramadanYearLectures?.map(({
      lang_id,
      name,
      documents
    }, index) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      onClick: () => {
        setLanguageTab(lang_id);
      },
      className: "mobile_lecdet_tab_song",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
        className: `${(languageTab !== undefined ? languageTab === lang_id : index === 0) ? "mobile_lecdet_tab_song1_active text-foreground" : "mobile_lecdet_tab_song1"}`,
        children: name
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("span", {
        className: `${(languageTab !== undefined ? languageTab === lang_id : index === 0) ? "mobile_lecdet_tab_song2_active text-color text-sm" : "mobile_lecdet_tab_song2 text-color text-sm"}`,
        children: ["(", documents?.length, ")"]
      })]
    }, lang_id))
  });
};
;// CONCATENATED MODULE: ./src/components/ramadan-details/ramadanYearAlbums/RamadanYearAlbums.jsx








const RamadanYearAlbums = ({
  languageId
}) => {
  const {
    data: albums,
    isLoading
  } = useFilteredRamadanYearAlbums(languageId);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "load_desktop",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "load",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
      })
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecalb_wrapper",
      children: albums?.map(({
        img,
        name,
        id,
        lec_no
      }) => {
        return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Link, {
          to: `${ALBUMS}${id}`,
          className: "lecalb_album_item",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(albumWidget_AlbumWidget, {
            nid: id,
            lec_no: lec_no
            /*categories={name?.split("-")?.[1] || name}*/,
            img: img
          })
        }, id);
      })
    })]
  });
};
;// CONCATENATED MODULE: ./src/components/ramadan-details/index.js



;// CONCATENATED MODULE: ./src/pages/ramadan_detail/Ramadan_detail.jsx











const RamadanDetail = () => {
  const {
    id: ramadanYearId
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [languageTab, setLanguageTab] = (0,external_react_.useState)();
  const {
    yearName
  } = useRamadanYearAlbums(ramadanYearId);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(container_Container, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(head_meta, {
      title: `${yearName || "Ramadan"} on Dawah Nigeria - Home of islamic resources`
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
      className: "lecdet_wrapper",
      children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "lecdet_container",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecdet_breadcrumb",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: () => {
              navigate(-1);
            },
            className: "lecdet_breadcrumb_first",
            children: "Back /"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "lecdet_breadcrumb_second text-foreground",
            children: yearName
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "mobile_lecdet_tab_wrap",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
            className: "rank_and_black_wrap ",
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "pb-7",
              children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
                onClick: () => {
                  navigate(-1);
                },
                "aria-label": "Go back",
                className: "fixed_mob_arrow",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                  className: "fixed_mob_arrow_sz",
                  src: arrowleft_namespaceObject,
                  alt: "hun"
                })
              })
            })
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "lecdet_head_wrap hidden md:flex md:flex-col md:items-center",
          children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
            id: "hero",
            className: "lecdet_head_img_sz mx-auto",
            src: lazyrps_namespaceObject,
            alt: "head"
          }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
            className: "lecdet_head_title text-foreground text-center mt-3 text-xl",
            children: yearName
          })]
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "md:hidden",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
              id: "hero",
              className: "lecdet_head_img_sz mx-auto",
              src: IMAGE_PLACEHOLDERS.lecturer,
              alt: "head"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
              className: "px-3 text-foreground z-50 text-xl",
              children: yearName
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RamadamDetailsMobileTabs, {
          languageTab: languageTab,
          setLanguageTab: setLanguageTab
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RamadanDetailsDesktopTabs, {
          languageTab: languageTab,
          setLanguageTab: setLanguageTab
        }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "p-3 lg:p-0",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RamadanYearAlbums, {
            languageId: languageTab
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const Ramadan_detail = (RamadanDetail);
;// CONCATENATED MODULE: ./src/services/albums.service.js

const albumsApi = {
  getAlbumsByKeyword: async (keyword, page = 1, search = "") => {
    // First encode the keyword to handle spaces and special characters
    const encodedKeyword = encodeURIComponent(keyword.trim());
    const encodedSearch = encodeURIComponent(search.trim());
    return await apiService().get(`/albumlisting_keywords_api.php?key=${encodedKeyword}&page=${page}${search ? `&search=${encodedSearch}` : ""}`);
  }
};
;// CONCATENATED MODULE: ./src/hooks/albums/useKeywordAlbums.js



const useKeywordAlbums = ({
  keyword,
  page = 1,
  search = ""
}) => {
  const [cumulativeData, setCumulativeData] = (0,external_react_.useState)([]);
  const [hasMore, setHasMore] = (0,external_react_.useState)(true);
  const [total, setTotal] = (0,external_react_.useState)(0);
  const {
    isLoading,
    data,
    error
  } = (0,react_query_namespaceObject.useQuery)(["albums-by-keyword", keyword, page, search], () => albumsApi.getAlbumsByKeyword(keyword, page, search), {
    enabled: !!keyword,
    keepPreviousData: true,
    onSuccess: newData => {
      if (newData?.data) {
        if (page === 1) {
          setCumulativeData(newData.data);
        } else {
          setCumulativeData(prev => [...prev, ...newData.data]);
        }
        // Update total from API response
        setTotal(newData.total || 0);
        // If we've loaded all items based on total, or got less than 20 items, we've reached the end
        setHasMore(cumulativeData.length < (newData.total || 0));
      } else {
        setHasMore(false);
      }
    }
  });

  // Reset cumulative data when keyword or search changes
  (0,external_react_.useEffect)(() => {
    setCumulativeData([]);
    setHasMore(true);
    setTotal(0);
  }, [keyword, search]);
  return {
    isLoading,
    error,
    data: cumulativeData,
    hasMore,
    total
  };
};
;// CONCATENATED MODULE: ./src/hooks/albums/index.js

;// CONCATENATED MODULE: ./src/components/ramadan-details/ramadanYearTafseer/RamadanYearTafseer.jsx














const RamadanYearTafseer = () => {
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(UI_ErrorBoundary, {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RamadanYearTafseerContent, {})
  });
};

// Separate the main component content for error boundary wrapping
const RamadanYearTafseerContent = () => {
  const {
    year
  } = (0,external_react_router_dom_namespaceObject.useParams)();
  const navigate = (0,external_react_router_dom_namespaceObject.useNavigate)();
  const [page, setPage] = (0,external_react_.useState)(1);
  const [scrolled, setScrolled] = (0,external_react_.useState)(false);
  const [selectedLanguage, setSelectedLanguage] = (0,external_react_.useState)("all");
  const [searchQuery, setSearchQuery] = (0,external_react_.useState)("");
  const [debouncedSearch, setDebouncedSearch] = (0,external_react_.useState)("");

  // Debounce search query to avoid too many API calls
  (0,external_react_.useEffect)(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page when search changes
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Add scroll listener to detect when user scrolls
  (0,external_react_.useEffect)(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add error handling for media errors
  (0,external_react_.useEffect)(() => {
    const handleMediaError = event => {
      if (event.target.tagName === "IMG" || event.target.tagName === "AUDIO") {
        console.warn("Media error caught:", event);
        // Replace with placeholder if it's an image
        if (event.target.tagName === "IMG") {
          event.target.src = IMAGE_PLACEHOLDERS.album;
        }
      }
    };
    document.addEventListener("error", handleMediaError, true);
    return () => document.removeEventListener("error", handleMediaError, true);
  }, []);
  const {
    data: albums,
    isLoading,
    hasMore,
    error,
    total
  } = useKeywordAlbums({
    keyword: `Ramadan Tafseer ${year}`,
    page,
    search: debouncedSearch
  });

  // Extract unique languages and count lectures per language
  const languageStats = (0,external_react_.useMemo)(() => {
    if (!albums?.length) return [];
    const stats = albums.reduce((acc, album) => {
      const lang = album.lang || "Unknown";
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(stats).map(([lang, count]) => ({
      lang,
      count
    })).sort((a, b) => b.count - a.count);
  }, [albums]);

  // Filter albums only by language since search is now handled by the server
  const filteredAlbums = (0,external_react_.useMemo)(() => {
    if (!albums) return [];

    // Filter by language
    if (selectedLanguage !== "all") {
      return albums.filter(album => album.lang === selectedLanguage);
    }
    return albums;
  }, [albums, selectedLanguage]);
  const loadMore = () => {
    if (!isLoading && hasMore && !debouncedSearch) {
      setPage(prev => prev + 1);
    }
  };

  // Function to extract title parts similar to lectureTitleExtractor in LecturesListDetail
  const extractTitle = fullTitle => {
    if (!fullTitle) return "Untitled Album";
    if (fullTitle.includes("-")) {
      const parts = fullTitle.split("-");
      return parts[0].trim();
    }
    return fullTitle;
  };
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
    className: "bg-background min-h-screen",
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "max-w-7xl mx-auto px-4",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
        className: "sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border",
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(headerRouter_HeaderRouter, {
          title: `Ramadan Tafseer ${year}`,
          link: RAMADAN
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border",
        children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "p-4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "relative",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("input", {
              type: "text",
              placeholder: "Search by title or lecturer...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "w-full px-4 py-2 pl-10 bg-accent rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiMagnifyingGlass, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg"
            }), debouncedSearch && !isLoading && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground",
              children: [total, " results"]
            })]
          })
        }), languageStats.length > 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "overflow-x-auto scrollbar-hide py-2 px-4",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "flex gap-2 min-w-max",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
              onClick: () => setSelectedLanguage("all"),
              className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${selectedLanguage === "all" ? "bg-primary text-white" : "bg-accent hover:bg-accent/80 text-foreground"}`,
              children: ["All (", albums?.length || 0, "/", total, ")"]
            }), languageStats.map(({
              lang,
              count
            }) => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
              onClick: () => setSelectedLanguage(lang),
              className: `px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${selectedLanguage === lang ? "bg-primary text-white" : "bg-accent hover:bg-accent/80 text-foreground"}`,
              children: [lang, " (", count, ")"]
            }, lang))]
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
        className: "py-8 pb-32 md:pb-8",
        children: [error && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "flex flex-col items-center justify-center py-8 px-4 text-center",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
            className: "bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiWifi, {
              className: "text-red-500 text-4xl mx-auto mb-4"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
              className: "text-lg font-medium text-red-600 dark:text-red-400 mb-2",
              children: "Connection Error"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("p", {
              className: "text-gray-600 dark:text-gray-300 mb-4",
              children: error?.message || "Unable to establish connection to server. Please check your internet connection and try again."
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("button", {
              onClick: () => window.location.reload(),
              className: "flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiArrowPath, {
                className: "text-lg"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                children: "Retry"
              })]
            })]
          })
        }), !isLoading && !error && filteredAlbums?.length === 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "text-center text-gray-500 py-4",
          children: debouncedSearch ? `No Ramadan Tafseer ${year} found matching "${debouncedSearch}"${selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}` : `No lectures found${selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}`
        }), debouncedSearch && !error && filteredAlbums?.length > 0 && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
          className: "text-sm text-muted-foreground mb-4",
          children: ["Showing ", filteredAlbums.length, " of ", total, " results", selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""]
        }), !error && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4",
          children: filteredAlbums?.map(album => /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Link, {
            to: `${ALBUMS}${album.nid}`,
            className: "block hover:opacity-90 transition-opacity",
            children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "relative aspect-square",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("img", {
                src: album.img || IMAGE_PLACEHOLDERS.album,
                alt: album.title,
                className: "w-full h-full object-cover rounded-lg"
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(hi2_namespaceObject.HiOutlinePlay, {
                  className: "text-white text-4xl"
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
              className: "mt-2",
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("h3", {
                className: "text-sm font-medium text-foreground whitespace-normal break-words",
                children: album.title
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
                className: "flex flex-col text-xs text-color gap-0.5",
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    children: "Lectures:"
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("span", {
                    children: album.lec_no
                  })]
                })
              })]
            })]
          }, album.nid))
        }), isLoading && !error && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "flex justify-center py-8",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(loader, {})
        }), !isLoading && !error && hasMore && !debouncedSearch && selectedLanguage === "all" && /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("div", {
          className: "flex justify-center mt-4 mb-8",
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("button", {
            onClick: loadMore,
            className: "px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors",
            children: "Load More"
          })
        })]
      })]
    })
  });
};
;// CONCATENATED MODULE: ./src/App.jsx













































const AudioContext = /*#__PURE__*/(0,external_react_.createContext)();
const SearchContext = /*#__PURE__*/(0,external_react_.createContext)();
const ThemeProvider = /*#__PURE__*/(0,external_react_.createContext)();
// Create a client
const queryClient = new react_query_namespaceObject.QueryClient();
react_namespaceObject.init({
  dsn: "https://39f51c39cd7f76985eac0998370570fb@o4505749236875264.ingest.sentry.io/4505764791451648",
  integrations: [new react_namespaceObject.BrowserTracing({
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/]
  }), new react_namespaceObject.Replay()],
  // Performance Monitoring
  tracesSampleRate: 0.3,
  // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1,
  // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
const App = () => {
  usePageTracking();
  const scroll = (0,external_react_.useRef)();
  const audioRef = (0,external_react_.useRef)(null);
  const rangeRef = (0,external_react_.useRef)();
  const [initial, setinitial] = (0,external_react_.useState)(true);
  const [text, setText] = (0,external_react_.useState)();
  const [languageId, setLanguageId] = (0,external_react_.useState)([]);
  const [categoryId, setCategoryId] = (0,external_react_.useState)([]);
  const [lecturerId, setLecturerId] = (0,external_react_.useState)([]);
  const [albumId, setAlbumId] = (0,external_react_.useState)([]);
  const [loading, setLoading] = (0,external_react_.useState)(false);
  const {
    darkQuery
  } = useThemeHook();
  const [searchType, setSearchType] = (0,external_react_.useState)("general");
  const [playing, setPlaying] = (0,external_react_.useState)(false);

  //Detect if user has interacted with the page
  (0,external_react_.useEffect)(() => {
    const handleClick = () => {
      setinitial(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Add global handler for unhandled promise rejections related to audio
  (0,external_react_.useEffect)(() => {
    const handleUnhandledRejection = event => {
      // Check if this is an audio interruption error
      if (event.reason && event.reason.message && event.reason.message.includes("The play() request was interrupted")) {
        // Prevent the default handling
        event.preventDefault();
        console.log("Caught unhandled audio interruption:", event.reason.message);
      }
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  // Add wake lock to prevent device from sleeping during playback
  (0,external_react_.useEffect)(() => {
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.log("Wake Lock error:", err);
      }
    };
    if (playing && !initial) {
      requestWakeLock();
    }
    return () => {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
      }
    };
  }, [playing, initial]);
  return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("title", {
      children: "Dawahnigeria - Your Source for Islamic Knowledge"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      name: "description",
      content: "Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria."
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      property: "og:title",
      content: "Dawahnigeria - Your Source for Islamic Knowledge"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      property: "og:description",
      content: "Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria."
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      property: "og:type",
      content: "website"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)("meta", {
      property: "og:site_name",
      content: "Dawahnigeria"
    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)("div", {
      className: "App",
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(scrollToTop, {}), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_hot_toast_namespaceObject.Toaster, {
        position: "top-center",
        reverseOrder: false,
        gutter: 8,
        containerClassName: "",
        containerStyle: {},
        toastOptions: {
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff"
          }
        }
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(react_query_namespaceObject.QueryClientProvider, {
        client: queryClient,
        children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(SearchContext.Provider, {
          value: {
            text,
            setText,
            lecturerId,
            setLecturerId,
            albumId,
            setAlbumId,
            languageId,
            setLanguageId,
            categoryId,
            setCategoryId,
            searchType,
            setSearchType
          },
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(AudioContext.Provider, {
            value: {
              audioRef,
              rangeRef,
              initial,
              setinitial,
              loading,
              setLoading,
              playing,
              setPlaying
            },
            children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(ThemeProvider.Provider, {
              value: {
                darkQuery
              },
              children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(UI_ErrorBoundary, {
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Routes, {
                  children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Route, {
                    path: "/auth",
                    element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Auth, {}),
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: "/auth/login",
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Authentication_LoginForm, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: "/auth/signup",
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Authentication_SignupForm, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: "/auth/forgot-password",
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(forgotPassword, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: "/auth/selectlanguage",
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(selectLanguage, {})
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_react_router_dom_namespaceObject.Route, {
                    path: "/dawahcast",
                    element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(layout_Layout, {}),
                    children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RAMADAN,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(ramadan_Ramadan, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${RAMADAN}/year/:year`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(RamadanYearTafseer, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${RAMADAN}/:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Ramadan_detail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      index: true,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landing_Landing, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: HOME,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(landing_Landing, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: MORE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(more, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RECENTLY_POSTED_MORE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(more, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RECENTLY_VIEWED_MORE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(more, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: TRENDING_MORE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(more, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RECOMMENDED_MORE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(more, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: SEARCH,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(searchPage, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: LIBRARY,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(library_library, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: GENRES,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(genres_Genres, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${GENRES}/:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(genreDetail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RECO2,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(podcast, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: RECO1,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(buzz, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: LECTURERS,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturers_Lecturers, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: VIDEO,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(videos_Videos, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: PLAY,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(playlists_Playlists, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: CHARTS,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(charts_Charts, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: TRENDING,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(trending_Trending, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: QURAN,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Quran, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: NEW,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(new_New, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${LECTURE}:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(audioDetail_AudioDetail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${PLAYLISTS}:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(playlistdetail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${RESOURCE_PERSON}:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(Lecturer_detail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${ALBUMS}:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(lecturesListDetail_LecturesListDetail, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: `${VIDEOS}:id`,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(videoPlayer, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: FAVOURITE,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(favourite_Favourite, {})
                    }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                      path: MYPLAYLIIST,
                      element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(my_playlist_My_playlist, {})
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                    path: "/",
                    element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Navigate, {
                      to: "/dawahcast"
                    })
                  }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(external_react_router_dom_namespaceObject.Route, {
                    path: "/dawahcast",
                    element: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(layout_Layout, {})
                  })]
                })
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)(components_ClientOnly, {
                children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsx)((tawk_messenger_react_default()), {
                  propertyId: "5cd3dd3ed07d7e0c6392ad09",
                  widgetId: "default",
                  onLoad: () => {},
                  onStatusChange: () => {},
                  onBeforeLoad: () => {},
                  onChatMessageSystem: () => {},
                  onChatMessageVisitor: () => {},
                  onChatMessageAgent: () => {},
                  onUnreadCountChanged: () => {}
                })
              })]
            })
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const src_App = (App);

/***/ }),

/***/ 350:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D9: () => (/* binding */ GET_TYPE),
/* harmony export */   N4: () => (/* binding */ SET_PLAYING),
/* harmony export */   Nd: () => (/* binding */ GET_AUDIO_DATA),
/* harmony export */   Nl: () => (/* binding */ GET_AUDIO_ID),
/* harmony export */   Nv: () => (/* binding */ LOGOUT),
/* harmony export */   R: () => (/* binding */ GET_SEARCH_RECORD),
/* harmony export */   T7: () => (/* binding */ GET_SEARCH_OPTIONS),
/* harmony export */   Wt: () => (/* binding */ SET_THEME),
/* harmony export */   XP: () => (/* binding */ LOGIN_SUCCESS),
/* harmony export */   eq: () => (/* binding */ GET_SEARCH_DATA),
/* harmony export */   gw: () => (/* binding */ FETCH_USER_SUCCESS),
/* harmony export */   jU: () => (/* binding */ GET_AUDIO_PACK),
/* harmony export */   pB: () => (/* binding */ SHOW_ADD_PLAYLIST),
/* harmony export */   pP: () => (/* binding */ GET_VALUE),
/* harmony export */   sZ: () => (/* binding */ GET_LECID),
/* harmony export */   uF: () => (/* binding */ GET_REPEAT),
/* harmony export */   uO: () => (/* binding */ GET_AUDIO_PAGE),
/* harmony export */   uo: () => (/* binding */ GET_CURRENT_PLAY),
/* harmony export */   wQ: () => (/* binding */ UPDATE_AUDIO_SHARE_COUNT),
/* harmony export */   x8: () => (/* binding */ GET_AUDIO_COUNT)
/* harmony export */ });
/* unused harmony exports FETCH_USER_FAILED, FETCH_USER_START, LOGIN_FAILED, LOGIN_START, GET_GALLERY_SUCCESS, GET_JOB_SUCCESS */
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";
const FETCH_USER_START = "FETCH_USER_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGIN_START = "LOGIN_START";
const LOGOUT = "LOGOUT";
const GET_GALLERY_SUCCESS = "GET_GALLERY_SUCCESS";
const GET_JOB_SUCCESS = "GET_JOB_SUCCESS";
const GET_TYPE = "GET_TYPE";
const GET_CURRENT_PLAY = "GET_CURRENT_PLAY";
const SET_PLAYING = "SET_PLAYING";
const SHOW_ADD_PLAYLIST = "SHOW_ADD_PLAYLIST";
const GET_LECID = "GET_LECID";
const GET_AUDIO_ID = "GET_AUDIO_ID";
const UPDATE_AUDIO_SHARE_COUNT = "UPDATE_AUDIO_SHARE_COUNT";
const GET_AUDIO_DATA = "GET_AUDIO_DATA";
const GET_AUDIO_COUNT = "GET_AUDIO_COUNT";
const GET_AUDIO_PACK = "GET_AUDIO_PACK";
const GET_AUDIO_PAGE = "GET_AUDIO_PAGE";
const GET_VALUE = "GET_VALUE";
const GET_REPEAT = "GET_REPEAT";
const GET_SEARCH_RECORD = "GET_SEARCH_RECORD";
const GET_SEARCH_DATA = "GET_SEARCH_DATA";
const GET_SEARCH_OPTIONS = "GET_SEARCH_OPTIONS";
const SET_THEME = "SET_THEME";

/***/ }),

/***/ 541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Reducer)
});

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(695);
// EXTERNAL MODULE: ./src/Redux/Actions/Types.js
var Types = __webpack_require__(350);
;// CONCATENATED MODULE: ./src/Redux/Reducer/user.js

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
  sharedAlbum: 0,
  theme: "dark"
};
const User = (state = initailState, action) => {
  switch (action.type) {
    case Types/* LOGIN_SUCCESS */.XP:
      return {
        ...state,
        token: action.payload
      };
    case Types/* FETCH_USER_SUCCESS */.gw:
      return {
        ...state,
        currentUser: action.payload
      };
    case Types/* GET_TYPE */.D9:
      return {
        ...state,
        type: action.payload
      };
    case Types/* GET_CURRENT_PLAY */.uo:
      return {
        ...state,
        currentAudioInfo: action.payload
      };
    case Types/* UPDATE_AUDIO_SHARE_COUNT */.wQ:
      return {
        ...state,
        currentAudioInfo: {
          ...state.currentAudioInfo,
          share: (state.currentAudioInfo?.share ?? 0) + 1
        },
        sharedAlbum: state.sharedAlbum + 1
      };
    case Types/* SET_PLAYING */.N4:
      return {
        ...state,
        playing: action.payload
      };
    case Types/* SHOW_ADD_PLAYLIST */.pB:
      return {
        ...state,
        addplaylist: action.payload
      };
    case Types/* GET_LECID */.sZ:
      return {
        ...state,
        lecid: action.payload
      };
    case Types/* GET_AUDIO_DATA */.Nd:
      return {
        ...state,
        audioData: action.payload
      };
    case Types/* GET_AUDIO_ID */.Nl:
      return {
        ...state,
        audioId: action.payload
      };
    case Types/* GET_AUDIO_COUNT */.x8:
      return {
        ...state,
        count: action.payload
      };
    case Types/* GET_AUDIO_PACK */.jU:
      return {
        ...state,
        pack: action.payload
      };
    case Types/* GET_AUDIO_PAGE */.uO:
      return {
        ...state,
        page: action.payload
      };
    case Types/* GET_VALUE */.pP:
      return {
        ...state,
        value: action.payload
      };
    case Types/* GET_REPEAT */.uF:
      return {
        ...state,
        isrepeat: action.payload
      };
    case Types/* SET_THEME */.Wt:
      return {
        ...state,
        theme: action.payload
      };
    case Types/* LOGOUT */.Nv:
      return {
        ...state,
        currentUser: null,
        token: "",
        currentAudioInfo: null,
        type: null
      };
    default:
      return state;
  }
};
/* harmony default export */ const user = (User);
;// CONCATENATED MODULE: ./src/Redux/Reducer/search.js

const search_initailState = {
  searchRecord: "",
  searchData: [],
  searchOptions: {}
};
const Search = (state = search_initailState, action) => {
  switch (action.type) {
    case Types/* GET_SEARCH_RECORD */.R:
      return {
        ...state,
        searchRecord: action.payload
      };
    case Types/* GET_SEARCH_DATA */.eq:
      return {
        ...state,
        searchData: action.payload
      };
    case Types/* GET_SEARCH_OPTIONS */.T7:
      return {
        ...state,
        searchOptions: action.payload
      };
    default:
      return state;
  }
};
/* harmony default export */ const search = (Search);
;// CONCATENATED MODULE: ./src/Redux/Reducer/index.js



const appReducer = (0,external_redux_.combineReducers)({
  user: user,
  search: search
});
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // storage.removeItem('persist:otherKey')
    localStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
/* harmony default export */ const Reducer = (rootReducer);

/***/ }),

/***/ 937:
/***/ (() => {



/***/ }),

/***/ 455:
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ 582:
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ 860:
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ 806:
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 684:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/server");

/***/ }),

/***/ 22:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 149:
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom/server");

/***/ }),

/***/ 157:
/***/ ((module) => {

"use strict";
module.exports = require("reactjs-social-login");

/***/ }),

/***/ 695:
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";
module.exports = require("redux-thunk");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// Setup browser globals for SSR compatibility
const setupGlobals = () => {
  if (typeof window === 'undefined') {
    const mockWindow = {
      location: { href: '', origin: '', search: '' },
      localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      addEventListener: () => {},
      removeEventListener: () => {},
      navigator: { userAgent: 'SSR' },
      document: { getElementById: () => null, addEventListener: () => {} }
    };

    const mockDocument = {
      getElementById: () => null,
      getElementsByTagName: () => [],
      createElement: () => ({ appendChild: () => {}, setAttribute: () => {} }),
      addEventListener: () => {},
      body: { appendChild: () => {} }
    };

    {} = mockWindow;
    {} = mockDocument;
    {} = { userAgent: 'SSR' };
    {} = mockWindow.localStorage;
    {} = mockWindow.sessionStorage;
  }
};

setupGlobals();

const express = __webpack_require__(860);
const React = __webpack_require__(689);
const { renderToPipeableStream } = __webpack_require__(684);
const { StaticRouter } = __webpack_require__(149);
const { Provider } = __webpack_require__(22);
const { createStore, applyMiddleware } = __webpack_require__(695);
const thunk = (__webpack_require__(417)["default"]);
const compression = __webpack_require__(455);
const helmet = __webpack_require__(806);
const cors = __webpack_require__(582);
const path = __webpack_require__(17);
const fs = __webpack_require__(147);

const App = (__webpack_require__(591)/* ["default"] */ .ZP);
const rootReducer = (__webpack_require__(541)/* ["default"] */ .Z);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SSR Server is running with React 19' });
});

// Create Redux store for SSR
const createServerStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

// SSR handler with React 19 streaming and graceful fallback
app.get('*', (req, res) => {
  // Read the built HTML template
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Build not found. Please run the build process first.');
  }

  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const store = createServerStore();
      const initialState = store.getState();
      
      // Split HTML template at the root div
      const [htmlStart, htmlEnd] = htmlData.split('<div id="root"></div>');
      
      // Add initial state script before closing head
      const htmlWithState = htmlStart.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script></head>`
      );

      // Start streaming response
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(htmlWithState + '<div id="root">');

      let didError = false;

      // Use React 19's streaming API
      const stream = renderToPipeableStream(
        React.createElement(Provider, { store },
          React.createElement(StaticRouter, { location: req.url },
            React.createElement(App)
          )
        ),
        {
          onShellReady() {
            // Stream the app content
            stream.pipe(res, { end: false });
          },
          onShellError(error) {
            console.error('Shell Error:', error);
            didError = true;
            res.statusCode = 500;
            res.write('</div>' + htmlEnd);
            res.end();
          },
          onAllReady() {
            // Close the root div and add the rest of the HTML
            res.write('</div>' + htmlEnd);
            res.end();
          },
          onError(error) {
            console.error('Stream Error:', error);
            didError = true;
          }
        }
      );

      // Handle timeout
      setTimeout(() => {
        if (!didError) {
          stream.abort();
        }
      }, 20000);

    } catch (error) {
      console.error('SSR Error:', error);
      // Fallback to client-side rendering with enhanced HTML template
      const enhancedHtml = htmlData.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = {};</script></head>`
      );
      res.send(enhancedHtml);
    }
  });
});

app.listen(PORT, () => {
  console.log(`SSR Server running on port ${PORT}`);
});
})();

/******/ })()
;