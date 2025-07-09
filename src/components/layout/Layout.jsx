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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AudioContext } from "../../App.jsx";
import AudioActionDesktop from "../audio/audioActionDesktop";
import { setPlaying } from "../../Redux/Actions/ActionCreators";
import {
  FAVOURITE,
  LECTURE,
  LIBRARY,
  DOWNLOAD,
} from "../../utils/routes/constants";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { MdDownload } from "react-icons/md";

export const NavContext = createContext();

const Layout = () => {
  const { currentAudioInfo, playing, audioId, value } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const rangeRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setisOpen] = useState(false);
  const { audioRef, setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const islayout = true;
  const [res, setRes] = useState(() => {
    return (
      Number(localStorage.getItem("navControl")) ||
      (window.innerWidth > 890 ? 2 : 1)
    );
  });

  useEffect(() => {
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

  useEffect(() => {
    const handleRouteChange = () => {
      const newPath = location.pathname;
      const isLecturePath = newPath.includes("/dawahcast/l/");
      const newLectureId = isLecturePath ? newPath.split("/").pop() : null;

      if (
        isLecturePath &&
        newLectureId &&
        newLectureId !== audioId.toString()
      ) {
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

  useEffect(() => {
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

            if (currentAudioInfo) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title:
                  currentAudioInfo.title || currentAudioInfo.Title || "Unknown",
                artist: currentAudioInfo.rpname || "Unknown Artist",
                artwork: [
                  {
                    src: currentAudioInfo.img || IMAGE_PLACEHOLDERS.lecture,
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
  }, [audioRef, currentAudioInfo, dispatch]);

  const handleRangeChange = (e) => {
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
            artwork: [
              {
                src: currentAudioInfo?.img || "",
                sizes: "512x512",
                type: "image/jpeg",
              },
            ],
          });
        }

        // Request audio focus if possible
        if ("audioFocus" in navigator) {
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
              }
            });
        }
      } catch (error) {
        console.error("Play error:", error);
        dispatch(setPlaying(false));
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
          <div className="range_progress">
            <div
              style={{
                width: `${(value * 100) / audioRef?.current?.duration}%`,
              }}
              className="audio_mob_bar dark:bg-[#ddff2b] bg-muted"
            ></div>
            <input
              ref={rangeRef}
              type="range"
              min="0"
              max={
                audioRef?.current?.duration
                  ? Math.floor(audioRef.current.duration)
                  : "100"
              }
              value={value || 0}
              onChange={handleRangeChange}
              className=""
            />
          </div>

          <div
            onClick={() => {
              navigate(`${LECTURE}${audioId}`, {
                state: {
                  layout: islayout,
                },
              });
            }}
            className="curr_lect_img"
          >
            <img
              className="curr_lect_img_sz"
              src={currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
              alt="disk"
            />
          </div>

          <marquee
            direction="left"
            loop="5"
            className="layout_buttom_text_wrap"
          >
            <p className="layout_buttom_text1 text-color">
              {currentAudioInfo?.title || currentAudioInfo?.Title}
            </p>
            <p className="layout_buttom_text2 text-color">
              {currentAudioInfo?.rpname}
            </p>
          </marquee>
          <div
            onClick={() => {
              setisShare(!isShare);
            }}
          >
            <BiShareAlt className="layout_buttom_share text-color" />
          </div>
          <div
            onClick={handlePlay}
            className="layout_buttom_play_wrap dark:bg-[#ddff2b] bg-gray-500"
          >
            {!playing ? (
              <FaPlay className="layout_buttom_play_icon dark:text-black text-gray-100" />
            ) : (
              <GiPauseButton className="layout_play_icon dark:text-black text-gray-100" />
            )}
          </div>
        </div>

        <div className="layout_buttom_menue2 px-6 py-2">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="layout_buttom_menue2_home"
          >
            <FaHome
              className={
                location.pathname === "/"
                  ? "layout_buttom_menue2_homeIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_homeIcon text-color"
              }
            />
            <p
              className={
                location.pathname === "/"
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
