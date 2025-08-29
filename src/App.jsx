import React, { useState, createContext, useEffect, useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import ClientOnly from "./components/ClientOnly";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./App.css";

// import { Toaster } from "react-hot-toast"; // Moved to conditional import to prevent SSR errors
import ErrorBoundary from "./components/UI/ErrorBoundary";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Ramadan from "./pages/ramadan/Ramadan";
import Layout from "./components/layout/Layout";
import Genres from "./pages/genres/Genres";
import Lecturers from "./pages/lecturers/Lecturers";
import Videos from "./pages/videos/Videos";
import Playlists from "./pages/playlists/Playlists";
import Charts from "./pages/charts/Charts";
import Trending from "./pages/trending/Trending";
import Quran from "./pages/quran/Quran";
import New from "./pages/new/New";
import Auth from "./pages/Authentication/auth/Auth";
import LoginForm from "./pages/Authentication/LoginForm";
import SignupForm from "./pages/Authentication/SignupForm";
import AudioDetail from "./pages/audioDetail/AudioDetail";
import LecturerDetail from "./components/lecturer_detail/Lecturer_detail";
import VideoPlayer from "./pages/videoplayer/videoPlayer";
import Favourite from "./pages/favourite/Favourite";
import Myplaylist from "./pages/my_playlist/My_playlist";
import LecturesListDetail from "./pages/lecturesListDetail/LecturesListDetail";
import More from "./components/moreView/more";
import Library from "./pages/library/library";
import SelectLanguage from "./pages/Authentication/selectLanguage";
import Scrolltotop from "./components/UI/scrollToTop";
import PlaylistDetail from "./pages/lecturesListDetail/playlistdetail";
import GenreDetail from "./pages/genredetail/genreDetail";
import Buzz from "./pages/buzz/buzz";
import Podcast from "./pages/podcast/podcast";
import SearchPage from "./pages/searchPage/searchPage";
import {
  ALBUMS,
  LECTURE,
  RESOURCE_PERSON,
  VIDEOS,
  PLAYLISTS,
  HOME,
  MYPLAYLIIST,
  FAVOURITE,
  MORE,
  RECENTLY_POSTED_MORE,
  RECENTLY_VIEWED_MORE,
  TRENDING_MORE,
  RECOMMENDED_MORE,
  SEARCH,
  LIBRARY,
  GENRES,
  CHARTS,
  TRENDING,
  QURAN,
  NEW,
  PLAY,
  VIDEO,
  LECTURERS,
  RECO1,
  RECO2,
  DOWNLOAD,
  FORGOTPASSWORD,
  RAMADAN,
} from "./utils/routes/constants";
import ForgotPassword from "./pages/forgotpassword/forgotPassword";
import { usePageTracking } from "./utils/tracking";
import { useThemeHook } from "./hooks/common/useTheme.hook";
import RamadanDetail from "./pages/ramadan_detail/Ramadan_detail";
import { RamadanYearTafseer } from "./components/ramadan-details/ramadanYearTafseer/RamadanYearTafseer";
const noop = () => {};
export const AudioContext = createContext({
  audioRef: { current: null },
  rangeRef: { current: null },
  initial: true,
  setinitial: noop,
  loading: false,
  setLoading: noop,
  playing: false,
  setPlaying: noop,
});
export const SearchContext = createContext({
  text: "",
  setText: noop,
  lecturerId: [],
  setLecturerId: noop,
  albumId: [],
  setAlbumId: noop,
  languageId: [],
  setLanguageId: noop,
  categoryId: [],
  setCategoryId: noop,
  searchType: "general",
  setSearchType: noop,
});
export const ThemeProvider = createContext({ darkQuery: false });
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

// Conditional Toaster component that only loads on client side
const ConditionalToaster = () => {
  const [ToasterComponent, setToasterComponent] = useState(null);

  useEffect(() => {
    // Only import and use Toaster on the client side
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ Toaster }) => {
        setToasterComponent(() => Toaster);
      });
    }
  }, []);

  if (!ToasterComponent) return null;

  return (
    <ToasterComponent
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};

// Sentry is initialized in `src/index.js` using the v8 SDK.

const App = () => {
  usePageTracking();
  const scroll = useRef();
  const audioRef = useRef(null);
  const rangeRef = useRef();
  const [initial, setinitial] = useState(true);
  const [text, setText] = useState();
  const [languageId, setLanguageId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [lecturerId, setLecturerId] = useState([]);
  const [albumId, setAlbumId] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkQuery } = useThemeHook();
  const [searchType, setSearchType] = useState("general");
  const [playing, setPlaying] = useState(false);

  //Detect if user has interacted with the page
  useEffect(() => {
    const handleClick = () => {
      setinitial(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Add global handler for unhandled promise rejections related to audio
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      // Check if this is an audio interruption error
      if (
        event.reason &&
        event.reason.message &&
        event.reason.message.includes("The play() request was interrupted")
      ) {
        // Prevent the default handling
        event.preventDefault();
        console.log(
          "Caught unhandled audio interruption:",
          event.reason.message
        );
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  // Add wake lock to prevent device from sleeping during playback
  useEffect(() => {
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

  return (
    <>
      <title>Dawahnigeria - Your Source for Islamic Knowledge</title>
      <meta name="description" content="Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria." />
      {/* Default Open Graph Meta Tags */}
      <meta property="og:title" content="Dawahnigeria - Your Source for Islamic Knowledge" />
      <meta property="og:description" content="Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria." />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dawahnigeria" />
      {/* Add a default image URL if available, e.g., <meta property="og:image" content="URL_TO_DEFAULT_IMAGE" /> */}
      <div className="App">
        <Scrolltotop />

        <QueryClientProvider client={queryClient}>
          <SearchContext.Provider
            value={{
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
              setSearchType,
            }}
          >
            <AudioContext.Provider
              value={{
                audioRef,
                rangeRef,
                initial,
                setinitial,
                loading,
                setLoading,
                playing,
                setPlaying,
              }}
            >
              <ThemeProvider.Provider value={{ darkQuery }}>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/auth" element={<Auth />}>
                      <Route path="/auth/login" element={<LoginForm />} />
                      <Route path="/auth/signup" element={<SignupForm />} />
                      <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/auth/selectlanguage"
                        element={<SelectLanguage />}
                      />
                    </Route>
                    <Route path="/dawahcast" element={<Layout />}>
                      <Route path={RAMADAN} element={<Ramadan />} />
                      <Route
                        path={`${RAMADAN}/year/:year`}
                        element={<RamadanYearTafseer />}
                      />
                      <Route
                        path={`${RAMADAN}/:id`}
                        element={<RamadanDetail />}
                      />

                      <Route index element={<Landing />} />
                      <Route path={HOME} element={<Landing />} />
                      <Route path={MORE} element={<More />} />
                      <Route path={RECENTLY_POSTED_MORE} element={<More />} />
                      <Route path={RECENTLY_VIEWED_MORE} element={<More />} />
                      <Route path={TRENDING_MORE} element={<More />} />
                      <Route path={RECOMMENDED_MORE} element={<More />} />
                      <Route path={SEARCH} element={<SearchPage />} />
                      <Route path={LIBRARY} element={<Library />} />
                      <Route path={GENRES} element={<Genres />} />
                      <Route path={`${GENRES}/:id`} element={<GenreDetail />} />
                      <Route path={RECO2} element={<Podcast />} />
                      <Route path={RECO1} element={<Buzz />} />
                      <Route path={LECTURERS} element={<Lecturers />} />
                      <Route path={VIDEO} element={<Videos />} />
                      <Route path={PLAY} element={<Playlists />} />
                      <Route path={CHARTS} element={<Charts />} />
                      <Route path={TRENDING} element={<Trending />} />
                      <Route path={QURAN} element={<Quran />} />
                      <Route path={NEW} element={<New />} />
                      <Route path={`${LECTURE}:id`} element={<AudioDetail />} />
                      <Route
                        path={`${PLAYLISTS}:id`}
                        element={<PlaylistDetail />}
                      />
                      <Route
                        path={`${RESOURCE_PERSON}:id`}
                        element={<LecturerDetail />}
                      />
                      <Route
                        path={`${ALBUMS}:id`}
                        element={<LecturesListDetail />}
                      />
                      <Route path={`${VIDEOS}:id`} element={<VideoPlayer />} />
                      <Route path={FAVOURITE} element={<Favourite />} />
                      <Route path={MYPLAYLIIST} element={<Myplaylist />} />
                    </Route>
                    <Route path="/" element={<Navigate to="/dawahcast" />} />
                    <Route path="/dawahcast" element={<Layout />} />
                  </Routes>
                </ErrorBoundary>
                <ClientOnly>
                  <ConditionalToaster />
                  <TawkMessengerReact
                    propertyId="5cd3dd3ed07d7e0c6392ad09"
                    widgetId="default"
                    onLoad={() => {}}
                    onStatusChange={() => {}}
                    onBeforeLoad={() => {}}
                    onChatMessageSystem={() => {}}
                    onChatMessageVisitor={() => {}}
                    onChatMessageAgent={() => {}}
                    onUnreadCountChanged={() => {}}
                  />
                </ClientOnly>
              </ThemeProvider.Provider>
            </AudioContext.Provider>
          </SearchContext.Provider>
        </QueryClientProvider>
        {/* </Router> */}
      </div>
    </>
  );
};

export default App;
