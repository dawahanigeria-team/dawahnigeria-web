import React, { useState, createContext, useEffect, useRef } from "react";
import * as Sentry from "@sentry/react";

import "./App.css";

import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Layout from "./components/layout/Layout";
import Genres from "./pages/genres/Genres";
import Lecturers from "./pages/lecturers/Lecturers";
import Videos from "./pages/videos/Videos";
import Playlists from "./pages/playlists/Playlists";
import Charts from "./pages/charts/Charts";
import Trending from "./pages/trending/Trending";
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
import DownloadAudio from "./components/download/download";
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
  SEARCH,
  LIBRARY,
  GENRES,
  CHARTS,
  TRENDING,
  NEW,
  PLAY,
  VIDEO,
  LECTURERS,
  RECO1,
  RECO2,
  DOWNLOAD,
  FORGOTPASSWORD,
} from "./utils/routes/constants";
import ForgotPassword from "./pages/forgotpassword/forgotPassword";
export const AudioContext = createContext();
export const SearchContext = createContext();

Sentry.init({
  dsn: "https://39f51c39cd7f76985eac0998370570fb@o4505749236875264.ingest.sentry.io/4505764791451648",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.3, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
const App = () => {
  const scroll = useRef();
  const audioRef = useRef();
  const rangeRef = useRef();
  const [initial, setinitial] = useState(true);
  const [text, setText] = useState();
  const [languageId, setLanguageId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [lecturerId, setLecturerId] = useState([]);
  const [albumId, setAlbumId] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div ref={scroll} className="app_wrapper">
      <div>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: "top-center",
            success: {
              style: {
                background: "#222",
                color: "#fff",
                fontFamily: "Poppins",
                fontSize: "14px",
              },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: {
                background: "red",
                color: "#fff",
                fontFamily: "Poppins",
                fontSize: "14px",
              },
            },
          }}
        />
      </div>

      <Router>
        <Scrolltotop />
        <SearchContext.Provider
          value={{
            albumId,
            setAlbumId,
            lecturerId,
            setLecturerId,
            text,
            setText,
            languageId,
            setLanguageId,
            categoryId,
            setCategoryId,
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
            }}
          >
            <Routes>
              <Route path="/auth" element={<Auth />}>
                <Route path="/auth/login" element={<LoginForm />} />
                <Route path="/auth/signup" element={<SignupForm />} />
                <Route
                  path="/auth/selectlanguage"
                  element={<SelectLanguage />}
                />
              </Route>
              <Route path="/dawahcast" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path={HOME} element={<Landing />} />
                <Route path={MORE} element={<More />} />
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
                <Route path={NEW} element={<New />} />
                <Route path={`${LECTURE}:id`} element={<AudioDetail />} />
                <Route path={DOWNLOAD} element={<DownloadAudio />} />
                <Route path={`${PLAYLISTS}:id`} element={<PlaylistDetail />} />
                <Route
                  path={`${RESOURCE_PERSON}:id`}
                  element={<LecturerDetail />}
                />
                <Route path={`${ALBUMS}:id`} element={<LecturesListDetail />} />
                <Route path={`${VIDEOS}:id`} element={<VideoPlayer />} />
                <Route path={FAVOURITE} element={<Favourite />} />
                <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
                <Route path={MYPLAYLIIST} element={<Myplaylist />} />
              </Route>

              <Route path="/" element={<Navigate to="/dawahcast" />} />
              <Route path="/dawahcast" element={<Layout />} />
            </Routes>
          </AudioContext.Provider>
        </SearchContext.Provider>
      </Router>
    </div>
  );
};

export default App;
