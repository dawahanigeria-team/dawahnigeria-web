import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./layout.scss";
import SideNav from "../../components/sideNav/SideNav";
import { BiShareAlt } from "react-icons/bi";
import ShareAudio from "../shareaudio/shareAudio";
import { FaHome, FaPlay } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { SiApplemusic } from "react-icons/si";
import { GiPauseButton } from "react-icons/gi";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";
import { durationFormat } from "../../pages/audioDetail/UI_audiodetail/playtiming";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLectureById } from "../../hooks";
import { AudioContext } from "../../App.jsx";
import AudioActionDesktop from "../audio/audioActionDesktop";
import {
  getValue,
  getaudioId,
  setPlaying,
} from "../../Redux/Actions/ActionCreators";
import {
  FAVOURITE,
  LECTURE,
  LIBRARY,
  DOWNLOAD,
} from "../../utils/routes/constants";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { MdDownload } from "react-icons/md";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import { trackLecturePlay, trackLecturePause, trackLectureCompletion, trackEvent, EVENTS } from "../../utils/posthog";

export const NavContext = createContext();

const Layout = () => {
  const { playing, audioId, value, token } = useSelector(
    (state) => state.user
  );
  const { lecture: currentLecture } = useLectureById(audioId);
  const navigate = useNavigate();
  const rangeRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setisOpen] = useState(false);
  const { audioRef, setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const speedOptions = [0.75, 1, 1.25, 1.5, 1.75, 2];
  const islayout = true;
  const [res, setRes] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        Number(localStorage.getItem("navControl")) ||
        (window.innerWidth >= 768 ? 2 : 1)
      );
    }
    return 2; // Default value for SSR
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("navControl", JSON.stringify(res));
      const handleResize = () => {
        if (window.innerWidth < 768) {
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
    }
  }, [res]);

  useEffect(() => {
    const handleRouteChange = () => {
      const newPath = location.pathname;
      const lecturePathMatch = newPath.match(/\/dawahcast\/l\/([^/]+)/);
      const newLectureId = lecturePathMatch?.[1] ?? null;
      const audioIdStr =
        audioId !== undefined && audioId !== null ? audioId.toString() : null;

      if (newLectureId && newLectureId !== audioIdStr) {
        try {
          audioRef.current?.pause();
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
          dispatch(setPlaying(false));
          dispatch(getValue(0));
          dispatch(getaudioId(newLectureId));
          setinitial(true);
        } catch (error) {
          console.error("Error cleaning up audio:", error);
        }
      }
    };

    handleRouteChange();
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextPath = `${location.pathname}${location.search}${location.hash}`;
    if (nextPath && !nextPath.startsWith("/auth")) {
      window.sessionStorage?.setItem("dn:last_path", nextPath);
    }
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const setupAudioContext = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.setAttribute("playsinline", "true");
          audioRef.current.setAttribute("webkit-playsinline", "true");
          audioRef.current.setAttribute("autoplay", "false");
          audioRef.current.setAttribute("x-webkit-airplay", "allow");
          // Persisted now-playing metadata must not download megabytes of
          // audio on every home visit. Full buffering begins on user play.
          audioRef.current.setAttribute("preload", "metadata");

          if (typeof window !== 'undefined' && "mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("play", () => {
              if (audioRef.current) {
                audioRef.current.play().catch((error) => {
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

            if (currentLecture) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title:
                  currentLecture.title || currentLecture.Title || "Unknown",
                artist: currentLecture.rpname || "Unknown Artist",
                artwork: [
                  {
                    src: currentLecture.img || IMAGE_PLACEHOLDERS.lecture,
                    sizes: "512x512",
                    type: "image/jpeg",
                  },
                ],
              });
            }
          }
        } catch (error) {
          console.error("Error setting up audio:", error);
        }
      }
    };

    setupAudioContext();
  }, [audioRef, currentLecture, dispatch]);

  const skipBy = (seconds) => {
    if (!audioRef.current) return;
    const duration = audioRef.current.duration || 0;
    const next = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = next;
    if (currentLecture) {
      trackEvent(EVENTS.LECTURE_SEEKED, {
        lecture_id: currentLecture.nid || currentLecture.id,
        lecture_title: currentLecture.mp3_title || currentLecture.Title,
        seek_to: next,
        lecturer: currentLecture.rpname,
      });
    }
  };

  const applyPlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  };

  const handleRangeChange = (e) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;

      // Track seek event
      if (currentLecture) {
        trackEvent(EVENTS.LECTURE_SEEKED, {
          lecture_id: currentLecture.nid || currentLecture.id,
          lecture_title: currentLecture.mp3_title || currentLecture.Title,
          seek_to: newTime,
          lecturer: currentLecture.rpname,
        });
      }
    }
  };

  // Re-apply playback rate when track changes or audio element is replaced
  useEffect(() => {
    if (audioRef.current && audioRef.current.playbackRate !== playbackRate) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [audioRef, playbackRate, audioId]);

  // Track audio completion and other events
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      if (currentLecture) {
        const duration = audioElement.duration || currentLecture.mp3_duration || 0;
        trackLectureCompletion(currentLecture, duration);
      }
    };

    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, currentLecture]);

  const handlePlay = async () => {
    if (playing) {
      // Track pause event
      if (currentLecture) {
        trackLecturePause(currentLecture, audioRef.current?.currentTime || 0);
      }
      audioRef.current?.pause();
      dispatch(setPlaying(false));
    } else {
      // Track play event
      if (currentLecture) {
        trackLecturePlay(currentLecture);
      }
      try {
        if (typeof window !== 'undefined' && "mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentLecture?.title || "Unknown Title",
            artist: currentLecture?.rpname || "Unknown Artist",
            artwork: [
              {
                src: currentLecture?.img || "",
                sizes: "512x512",
                type: "image/jpeg",
              },
            ],
          });
        }

        // Request audio focus if possible
        if (typeof window !== 'undefined' && "audioFocus" in navigator) {
          try {
            await navigator.audioFocus.request({
              audioType: "media",
              allowDucking: true,
            });
          } catch (error) {
            console.log("Audio focus request failed:", error);
          }
        }

        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              dispatch(setPlaying(true));
              setinitial(false);

              // Set audio element attributes to allow background playback
              if (audioRef.current) {
                audioRef.current.setAttribute("x-webkit-airplay", "allow");
                audioRef.current.setAttribute("preload", "auto");
                audioRef.current.setAttribute("webkit-playsinline", "true");
                audioRef.current.setAttribute("playsinline", "true");
              }
            })
            .catch((error) => {
              if (error.name === 'AbortError') {
                console.log('Play was aborted - this is normal when switching tracks');
              } else if (error.name === 'NotAllowedError') {
                console.log('Play not allowed - user interaction required');
                dispatch(setPlaying(false));
              } else {
                console.error("Playback failed:", error);
                dispatch(setPlaying(false));

                // Handle specific error for interrupted play requests
                if (
                  error.message &&
                  error.message.includes("The play() request was interrupted")
                ) {
                  console.log(
                    "Audio playback was interrupted by navigation or loading a new track"
                  );
                  // Don't show error toast for this specific error as it's usually due to normal navigation
                } else {
                  // Only show error toast for other types of errors
                  toast.error("Playback failed. Please try again.");
                }
              }
            });
        }
      } catch (error) {
        console.error("Play error:", error);
        dispatch(setPlaying(false));

        // Handle specific error for interrupted play requests
        if (
          error.message &&
          error.message.includes("The play() request was interrupted")
        ) {
          console.log(
            "Audio playback was interrupted by navigation or loading a new track"
          );
        } else {
          toast.error("Playback failed. Please try again.");
        }
      }
    }
  };

  return (
    <div className="layout_wrapper">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisOpen(false);
        }}
        className={`layout_sidenav ${
          res === 2
            ? "layout_sidenav_open"
            : `layout_sidenav_close let swipeInLeft ${isOpen ? "show" : "hide"}`
        }`}
      >
        <div className="layout_mini" onClick={(e) => e.stopPropagation()}>
          <SideNav res={res} setisOpen={setisOpen} />
        </div>
      </div>

      <div className={`layout_outlet bg-primary`}>
        <NavContext.Provider value={{ res, setRes, setisOpen, isOpen }}>
          <Outlet />
        </NavContext.Provider>
      </div>
      {/**aud desktop   <AudioActionDesktop/>*/}

      {/* ----------------Mobile Buttom menue------------------- */}
      <div className="layout_buttom_menue bg-background">
        <div className="layout_buttom_menue1">
          <div className="mini_player_top">
            <div
              className="mini_player_meta"
              onClick={() => {
                navigate(`${LECTURE}${audioId}`, { state: { layout: islayout } });
              }}
              role="button"
              aria-label="Open now playing"
            >
              <div className="curr_lect_img">
                <img
                  className="curr_lect_img_sz"
                  src={currentLecture?.img || IMAGE_PLACEHOLDERS.lecture}
                  alt={currentLecture?.title || "Now playing"}
                  onError={(e) => {
                    e.currentTarget.src = IMAGE_PLACEHOLDERS.lecture;
                  }}
                />
              </div>
              <div className="mini_player_text">
                <p className="layout_buttom_text1 text-color">
                  {currentLecture?.title || currentLecture?.Title || "Select a lecture"}
                </p>
                <p className="layout_buttom_text2 text-color">
                  {currentLecture?.rpname || ""}
                </p>
              </div>
            </div>

            <div className="mini_player_controls">
              <button
                type="button"
                aria-label="Skip back 15 seconds"
                className="mini_player_skip text-color"
                onClick={() => skipBy(-15)}
                disabled={!audioId}
              >
                <TbPlayerSkipBackFilled />
                <span className="mini_player_skip_label">15</span>
              </button>
              <button
                type="button"
                onClick={handlePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="layout_buttom_play_wrap dark:bg-[#ddff2b] bg-gray-500"
              >
                {!playing ? (
                  <FaPlay className="layout_buttom_play_icon dark:text-black text-gray-100" />
                ) : (
                  <GiPauseButton className="layout_play_icon dark:text-black text-gray-100" />
                )}
              </button>
              <button
                type="button"
                aria-label="Skip forward 15 seconds"
                className="mini_player_skip text-color"
                onClick={() => skipBy(15)}
                disabled={!audioId}
              >
                <TbPlayerSkipForwardFilled />
                <span className="mini_player_skip_label">15</span>
              </button>
            </div>
          </div>

          <div className="mini_player_progress_row">
            <span className="mini_player_time text-color">
              {durationFormat(audioRef?.current?.currentTime || 0)}
            </span>
            <div className="mini_player_progress">
              <div
                style={{
                  width: `${
                    audioRef?.current?.duration
                      ? (value * 100) / audioRef.current.duration
                      : 0
                  }%`,
                }}
                className="mini_player_progress_fill dark:bg-[#ddff2b] bg-gray-700"
              />
              <input
                ref={rangeRef}
                type="range"
                min="0"
                max={
                  audioRef?.current?.duration
                    ? Math.floor(audioRef.current.duration)
                    : 100
                }
                value={value || 0}
                onChange={handleRangeChange}
                aria-label="Seek"
                className="mini_player_seek"
              />
            </div>
            <span className="mini_player_time text-color">
              {durationFormat(audioRef?.current?.duration || 0)}
            </span>
            <div className="mini_player_speed_wrap">
              <button
                type="button"
                onClick={() => setShowSpeedMenu((s) => !s)}
                className="mini_player_speed_btn text-color"
                aria-haspopup="menu"
                aria-expanded={showSpeedMenu}
                aria-label={`Playback speed ${playbackRate}x`}
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <ul role="menu" className="mini_player_speed_menu bg-background text-color">
                  {speedOptions.map((rate) => (
                    <li key={rate} role="none">
                      <button
                        role="menuitemradio"
                        aria-checked={rate === playbackRate}
                        onClick={() => applyPlaybackRate(rate)}
                        className={rate === playbackRate ? "is-active" : ""}
                      >
                        {rate}x
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="button"
              onClick={() => setisShare(!isShare)}
              aria-label="Share"
              className="mini_player_share_btn"
              disabled={!audioId}
            >
              <BiShareAlt className="layout_buttom_share text-color" />
            </button>
          </div>
        </div>

        <div className="layout_buttom_menue2 px-6 py-2">
          <div
            onClick={() => {
              navigate("/dawahcast");
            }}
            className="layout_buttom_menue2_home"
          >
            <FaHome
              className={
                location.pathname === "/dawahcast"
                  ? "layout_buttom_menue2_homeIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_homeIcon text-color"
              }
            />
            <p
              className={
                location.pathname === "/dawahcast"
                  ? "layout_buttom_menue2_homeText_active font-semibold dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_homeText text-color"
              }
            >
              Home
            </p>
          </div>
          <div
            onClick={() => {
              navigate(LIBRARY);
            }}
            className="layout_buttom_menue2_library"
          >
            <SiApplemusic
              className={
                location.pathname === LIBRARY
                  ? "layout_buttom_menue2_libraryIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_libraryIcon text-color"
              }
            />
            <p
              className={
                location.pathname === LIBRARY
                  ? "layout_buttom_menue2_libraryText_active dark:text-[#ddff2b] text-color-foreground font-semibold"
                  : "layout_buttom_menue2_libraryText text-color"
              }
            >
              Library
            </p>
          </div>
          <div
            onClick={() => {
              navigate(FAVOURITE);
            }}
            className="layout_buttom_menue2_favourite"
          >
            <MdFavorite
              className={
                location.pathname === FAVOURITE
                  ? "layout_buttom_menue2_favouriteIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_favouriteIcon text-color"
              }
            />
            <p
              className={
                location.pathname === FAVOURITE
                  ? "layout_buttom_menue2_favouriteText_active dark:text-[#ddff2b] text-color-foreground font-semibold"
                  : "layout_buttom_menue2_favouriteText text-color"
              }
            >
              Favorites
            </p>
          </div>
          <div
            onClick={() => {
              if (!token) {
                navigate("/auth/login");
                return;
              }

              navigate(DOWNLOAD);
            }}
            className="layout_buttom_menue2_download"
          >
            <MdDownload
              className={
                location.pathname === DOWNLOAD
                  ? "layout_buttom_menue2_downloadIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_downloadIcon text-color"
              }
            />
            <p
              className={
                location.pathname === DOWNLOAD
                  ? "layout_buttom_menue2_downloadText_active dark:text-[#ddff2b] text-color-foreground font-semibold"
                  : "layout_buttom_menue2_downloadText text-color"
              }
            >
              Download
            </p>
          </div>
        </div>
      </div>
      <AudioActionDesktop />
      {isShare && (
        <ShareAudio
          isShare={isShare}
          setisShare={setisShare}
          nid={audioId}
          type={"audio"}
        />
      )}
      {/* ----------------Mobile Buttom menue ends------------------- */}
    </div>
  );
};

export default Layout;
