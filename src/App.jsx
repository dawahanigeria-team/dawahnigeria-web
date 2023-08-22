import React, { useState, createContext, useEffect, useRef } from "react";
import "./App.css";

import { Toaster } from "react-hot-toast";
import * as Sentry from '@sentry/react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ForgotPassword from "./pages/forgotpassword/forgotPassword";

export const AudioContext = createContext();
export const SearchContext = createContext();

Sentry.init({
    dsn: "https://11ec8579dd28244e4ab11514ae11d06a@o4505351228424192.ingest.sentry.io/4505748101988352",
    integrations: [
        new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", "https://www.dawahbox.com/mongo/api/"],
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: .5, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 0.1, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
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
  const [loading,  setLoading] = useState(false)

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
            value={{ audioRef, rangeRef, initial, setinitial,loading, setLoading }}
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
              <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/more" element={<More />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<Library />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/genres/:id" element={<GenreDetail />} />
                <Route path="/recommend2" element={<Podcast />} />
                <Route path="/recommend1" element={<Buzz />} />
                <Route path="/lecturers" element={<Lecturers />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/new" element={<New />} />
                <Route path="/l/:id" element={<AudioDetail />} />
                <Route path="/download" element={<DownloadAudio />} />
                <Route path="/pl/:id" element={<PlaylistDetail />} />
                <Route path="/rp/:id" element={<LecturerDetail />} />
                <Route path="/a/:id" element={<LecturesListDetail />} />
                <Route path="/videos/:id" element={<VideoPlayer />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/myplaylist" element={<Myplaylist />} />
              </Route>
            </Routes>
          </AudioContext.Provider>
        </SearchContext.Provider>
      </Router>
    </div>
  );
};

export default App;
