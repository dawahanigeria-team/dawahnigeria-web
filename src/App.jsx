import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useMemo,
} from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./App.css";

import ErrorBoundary from "./components/UI/ErrorBoundary";

// Import PostHog test utility in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/posthog-test').catch((error) => {
    // Silently handle import errors for optional development utility
    console.debug('PostHog test utility could not be loaded:', error);
  });
}
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Scrolltotop from "./components/UI/scrollToTop";
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
  RAMADAN,
  DOWNLOAD,
  PRIVACY,
} from "./utils/routes/constants";
import { usePageTracking } from "./utils/tracking";
import { useThemeHook } from "./hooks/common/useTheme.hook";

// Lazy load all pages for code splitting
const Landing = lazy(() => import("./pages/landing/Landing"));
const Ramadan = lazy(() => import("./pages/ramadan/Ramadan"));
const RamadanDetail = lazy(() => import("./pages/ramadan_detail/Ramadan_detail"));
const RamadanYearTafseer = lazy(() =>
  import("./components/ramadan-details/ramadanYearTafseer/RamadanYearTafseer").then(
    (module) => ({ default: module.RamadanYearTafseer })
  )
);
const Genres = lazy(() => import("./pages/genres/Genres"));
const GenreDetail = lazy(() => import("./pages/genredetail/genreDetail"));
const Lecturers = lazy(() => import("./pages/lecturers/Lecturers"));
const Videos = lazy(() => import("./pages/videos/Videos"));
const Playlists = lazy(() => import("./pages/playlists/Playlists"));
const Charts = lazy(() => import("./pages/charts/Charts"));
const Trending = lazy(() => import("./pages/trending/Trending"));
const Quran = lazy(() => import("./pages/quran/Quran"));
const New = lazy(() => import("./pages/new/New"));
const Auth = lazy(() => import("./pages/Authentication/auth/Auth"));
const LoginForm = lazy(() => import("./pages/Authentication/LoginForm"));
const SignupForm = lazy(() => import("./pages/Authentication/SignupForm"));
const ForgotPassword = lazy(() => import("./pages/Authentication/ForgotPassword"));
const SelectLanguage = lazy(() => import("./pages/Authentication/selectLanguage"));
const AudioDetail = lazy(() => import("./pages/audioDetail/AudioDetail"));
const LecturerDetail = lazy(() => import("./components/lecturer_detail/Lecturer_detail"));
const VideoPlayer = lazy(() => import("./pages/videoplayer/videoPlayer"));
const Favourite = lazy(() => import("./pages/favourite/Favourite"));
const Myplaylist = lazy(() => import("./pages/my_playlist/My_playlist"));
const LecturesListDetail = lazy(() => import("./pages/lecturesListDetail/LecturesListDetail"));
const Download = lazy(() => import("./pages/download/Download"));
const PlaylistDetail = lazy(() => import("./pages/lecturesListDetail/playlistdetail"));
const More = lazy(() => import("./components/moreView/more"));
const Library = lazy(() => import("./pages/library/library"));
const Buzz = lazy(() => import("./pages/buzz/buzz"));
const Podcast = lazy(() => import("./pages/podcast/podcast"));
const SearchPage = lazy(() => import("./pages/searchPage/searchPage"));
const Privacy = lazy(() => import("./pages/privacy/Privacy"));

// Lazy load heavy third-party components
const TawkMessengerReact = lazy(() => import("@tawk.to/tawk-messenger-react"));

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
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Conditional Toaster component that only loads on client side
const ConditionalToaster = () => {
  const [ToasterComponent, setToasterComponent] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-hot-toast").then(({ Toaster }) => {
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
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};

const App = () => {
  usePageTracking();
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

  // Memoize context values to prevent unnecessary re-renders
  const searchContextValue = useMemo(
    () => ({
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
    }),
    [text, lecturerId, albumId, languageId, categoryId, searchType]
  );

  const audioContextValue = useMemo(
    () => ({
      audioRef,
      rangeRef,
      initial,
      setinitial,
      loading,
      setLoading,
      playing,
      setPlaying,
    }),
    [initial, loading, playing]
  );

  const themeContextValue = useMemo(() => ({ darkQuery }), [darkQuery]);

  // Detect if user has interacted with the page
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
      if (
        event.reason &&
        event.reason.message &&
        event.reason.message.includes("The play() request was interrupted")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
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
        // Wake lock request failed
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
      <meta
        name="description"
        content="Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria."
      />
      <meta
        property="og:title"
        content="Dawahnigeria - Your Source for Islamic Knowledge"
      />
      <meta
        property="og:description"
        content="Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria."
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Dawahnigeria" />

      <div className="App">
        <Scrolltotop />

        <QueryClientProvider client={queryClient}>
          <SearchContext.Provider value={searchContextValue}>
            <AudioContext.Provider value={audioContextValue}>
              <ThemeProvider.Provider value={themeContextValue}>
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
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
                        <Route path={DOWNLOAD} element={<Download />} />
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
                        <Route path={PRIVACY} element={<Privacy />} />
                      </Route>
                      <Route path="/" element={<Navigate to="/dawahcast" />} />
                      <Route path="/dawahcast" element={<Layout />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
                <ConditionalToaster />
                <Suspense fallback={null}>
                  <TawkMessengerReact
                    propertyId="5cd3dd3ed07d7e0c6392ad09"
                    widgetId="default"
                    onLoad={() => {}}
                    onStatusChange={() => {}}
                    onBeforeLoad={() => {}}
                    onChatMaximized={() => {}}
                    onChatMinimized={() => {}}
                    onChatHidden={() => {}}
                    onChatStarted={() => {}}
                    onChatEnded={() => {}}
                    onPrechatSubmit={() => {}}
                    onOfflineSubmit={() => {}}
                    onChatMessageVisitor={() => {}}
                    onChatMessageAgent={() => {}}
                    onChatMessageSystem={() => {}}
                    onAgentJoinChat={() => {}}
                    onAgentLeaveChat={() => {}}
                    onChatSatisfaction={() => {}}
                    onVisitorNameChanged={() => {}}
                    onFileUpload={() => {}}
                    onTagsUpdated={() => {}}
                    onUnreadCountChanged={() => {}}
                  />
                </Suspense>
              </ThemeProvider.Provider>
            </AudioContext.Provider>
          </SearchContext.Provider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
