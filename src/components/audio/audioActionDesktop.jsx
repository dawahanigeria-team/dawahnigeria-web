import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import "./audioAction.css";
import { SlArrowDown, SlShare } from "react-icons/sl";
// import lazys from "../../assets/png/lazysong.jpeg"; // Moved to conditional import to prevent SSR errors
import ShareAudio from "../shareaudio/shareAudio";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import {
  getaudioId,
  getCount,
  getValue,
  setPlaying,
  getPage,
  getLecid,
  showaddPlaylist,
  getRepeat,
} from "../../Redux/Actions/ActionCreators";
import { playTimingDesktop } from "../../pages/audioDetail/UI_audiodetail/playtiming";
import AudioLoader from "../UI/audioLoader/audioLoader";
import { AudioContext } from "../../App";
import {
  AddFavourites,
  AddedFavourites,
  AddplayIcon,
  DownloadIcon,
  RepeatIcon,
  RepeatedIcon,
} from "../svgcomponent/svgComponent";
import Addplaylist from "../../pages/add_playlist/AddPlaylist";
import { LECTURE, RESOURCE_PERSON } from "../../utils/routes/constants";
import { AudioDownloadModal } from "../audioDownloadModal/AudioDownloadModal";
import { getNextTrackIndex, getTrackIndex } from "../../utils/audioQueue";

const AudioActionDesktop = () => {
  const { currentUser, audioId, isrepeat, value, page, pack, playing } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const rangeRef = useRef();
  const navigate = useNavigate();
  const { audioRef, setinitial, initial, loading, setLoading } =
    useContext(AudioContext);
  
  // State for conditionally loaded image asset to prevent SSR errors
  const [lazysImg, setLazysImg] = useState(null);
  
  // Load image asset only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../../assets/png/lazysong.jpeg').then(module => {
        setLazysImg(module.default);
      }).catch(() => {});
    }
  }, []);

  const [isComplete, setIsComplete] = useState(false);
  const playAnimation = useRef();

  const [getFavs, setgetfavs] = useState([]);
  const [addFav] = useState(false);
  const [isEmpty] = useState(false);
  const [, setIsPrevious] = useState(false);
  const [isShare, setisShare] = useState(false);

  const [currentaudio, setcurrentaudio] = useState([]);
  const [isminimize, setminimize] = useState(false);
  const [transition, settransition] = useState(true);
  const [isloaded, setnotloaded] = useState(true);

  const handleNextAudio = useCallback(() => {
    setinitial(false);
    setIsPrevious(false);
    dispatch(setPlaying(false));
    setnotloaded(true);

    const currentTrackIndex = getTrackIndex(pack, audioId);
    if (currentTrackIndex === -1) return;

    if (!isEmpty && pack?.length - 1 - currentTrackIndex <= 2) {
      dispatch(getPage(page + 1));
    }

    const nextTrackIndex = getNextTrackIndex(pack, audioId);
    if (nextTrackIndex === -1) return;

    const nextTrackId = pack?.[nextTrackIndex]?.nid ?? pack?.[nextTrackIndex]?.id;
    if (!nextTrackId) return;

    dispatch(getaudioId(nextTrackId));
    dispatch(getCount(nextTrackIndex));
  }, [audioId, dispatch, isEmpty, pack, page, setinitial]);

  const handlePreviousAudio = useCallback(() => {
    setinitial(false);
    setnotloaded(true);
    dispatch(setPlaying(false));
    const prev = pack?.findIndex((value) => {
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

  const getMusic = (audioId) => {
    //dispatch(setPlaying(false));
    setLoading(true);
    ///get lecture audio
    axios
      .get(`/leclistingapi.php?lecid=${audioId}`)
      .then((res) => {
        setcurrentaudio(res.data[0]);

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
              playPromise.catch((error) => {
                if (error.name === 'AbortError') {
                  console.log('Play was aborted - this is normal when switching tracks');
                } else if (error.name === 'NotAllowedError') {
                  console.log('Play not allowed - user interaction required');
                  dispatch(setPlaying(false));
                } else {
                  console.error('Playback failed:', error);
                  dispatch(setPlaying(false));
                  toast.error('Playback failed. Please try again.');
                }
              });
            }
            playAnimation.current = requestAnimationFrame(repeat);
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (!audioId) {
      return;
    }
    getMusic(audioId);
  }, [audioId]);

  const repeat = useCallback(() => {
    let currentTime = audioRef?.current?.currentTime;
    dispatch(getValue(currentTime));
    currentTime = rangeRef?.current?.value;

    playAnimation.current = requestAnimationFrame(repeat);
  }, [audioRef, getValue, rangeRef]);

  useEffect(() => {
    playAnimation.current = requestAnimationFrame(repeat);
    handleRange(audioRef?.current?.currentTime);
  }, [audioRef, repeat]);

  useEffect(() => {
    if (!currentUser?.id || !audioId) return;

    const payload = {
      action: "post_recent",
      audio_id: audioId,
      user_id: currentUser.id,
    };

    const postRecent = async () => {
      try {
        await axios.post(`/recentApi.php`, payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          const status = error?.response?.status;
          const data = error?.response?.data;
          console.error("postRecent failed", status, data || error.message);
        }
      }
    };

    postRecent();
  }, [audioId, currentUser?.id]);
  //************ */

  useEffect(() => {
    if (playing && !initial) {
      const startPlayback = async () => {
        try {
          // Handle mobile audio context
          let audioContext;
          if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
            audioContext = new (window.AudioContext ||
              window.webkitAudioContext)();
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
            if (typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
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
            await new Promise((resolve) => {
              audioRef.current.addEventListener("loadedmetadata", resolve, {
                once: true,
              });
            });
          }

          // Handle mobile wake lock with retry
          let wakeLock = null;
          const acquireWakeLock = async (retries = 3) => {
            for (let i = 0; i < retries; i++) {
              try {
                if (typeof window !== 'undefined' && "wakeLock" in navigator) {
                  wakeLock = await navigator.wakeLock.request("screen");
                  break;
                }
              } catch (err) {
                console.log(`Wake Lock error attempt ${i + 1}:`, err);
                await new Promise((resolve) => setTimeout(resolve, 1000));
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
          if (typeof window !== 'undefined' && "mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: currentaudio?.title || "Audio Track",
              artist: currentaudio?.rpname || "Unknown Artist",
              album: "Islamic Lecture",
              artwork: [
                {
                  src: currentaudio?.image || lazysImg,
                  sizes: "512x512",
                  type: "image/jpeg",
                },
              ],
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
              const newTime = Math.max(
                audioRef.current.currentTime - skipTime,
                0
              );
              audioRef.current.currentTime = newTime;
              handleRange(newTime);
            });

            navigator.mediaSession.setActionHandler("seekforward", () => {
              const skipTime = 10;
              const newTime = Math.min(
                audioRef.current.currentTime + skipTime,
                audioRef.current.duration
              );
              audioRef.current.currentTime = newTime;
              handleRange(newTime);
            });

            navigator.mediaSession.setActionHandler(
              "previoustrack",
              handlePreviousAudio
            );
            navigator.mediaSession.setActionHandler(
              "nexttrack",
              handleNextAudio
            );

            // Add position state for better lock screen display
            if (navigator.mediaSession.setPositionState) {
              navigator.mediaSession.setPositionState({
                duration: audioRef.current.duration,
                playbackRate: audioRef.current.playbackRate,
                position: audioRef.current.currentTime,
              });
            }
          }
        } catch (error) {
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
            toast.error("Playback failed. Please try again.");
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
        if (typeof window !== 'undefined' && !document.hidden && playing && !initial && audioRef.current) {
          audioRef.current.play().catch((error) => {
            if (error.name === 'AbortError') {
              console.log('Visibility resume was aborted - this is normal');
            } else if (error.name !== "NotAllowedError") {
              console.error("Resume failed:", error);

              // Don't show error for interrupted play requests during visibility changes
              if (
                !error.message ||
                !error.message.includes("The play() request was interrupted")
              ) {
                toast.error("Resume failed. Please try again.");
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
      if (typeof window !== 'undefined') {
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
              audioRef.current.play().catch((error) => {
                if (error.name === 'AbortError') {
                  console.log('Page show resume was aborted - this is normal');
                } else if (error.name !== "NotAllowedError") {
                  console.error("Page show resume failed:", error);
                }
              });
            }
          }
        });
      }

      return () => {
        if (typeof window !== 'undefined') {
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
          window.removeEventListener("focus", handleAudioFocus);
          window.removeEventListener("pagehide", () => {});
          window.removeEventListener("pageshow", () => {});
        }
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
  }, [
    playing,
    initial,
    currentaudio,
    dispatch,
    repeat,
    handlePreviousAudio,
    handleNextAudio,
  ]);

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
  const handleRange = (curr) => {
    dispatch(getValue(curr));

    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };

  useEffect(() => {
    if (isrepeat === false && isComplete) {
      const counter = pack?.findIndex((value) => {
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
      await axios
        .get(
          `/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {
          const { audio } = res.data;

          setgetfavs(Object.values(audio));
        })
        .catch((err) => {});
    }
  }
  useEffect(() => {
    fetchFavorites(addFav, audioId);
  }, [addFav, audioId]);
  ///add to favourites

  const addToFav = async () => {
    /// add to favorites
    if (!audioId) {
      toast.error("No audio to add to favorites");
      return;
    }

    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: audioId,
      type: "audio",
    };
    await axios
      .post(`/leclisting_favorites.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })

      .catch((err) => {});
  };

  function handleState() {
    setnotloaded(false);
  }

  return (
    <>
      <div
        className={`fixed bg-background z-[60]  bottom-0 flex items-center gap-4  transform  cursor-pointer ${
          isminimize
            ? `w-[220px] h-[60px] bg-black right-0 transition-all duartion-300`
            : `w-full h-[80px] left-0 right-0`
        }`}
      >
        <div className={isminimize ? "hidden" : "range_progress"}>
          <span
            style={{
              width: `${(value * 100) / audioRef?.current?.duration}%`,
            }}
            className="audiodet_bar"
          ></span>

          <input
            ref={rangeRef}
            type="range"
            min={0}
            max={audioRef.current?.duration || 100}
            value={value || 0}
            onChange={(e) => {
              handleRange(e.target.value);
            }}
            className="audiodet_scroll_bar"
          />
        </div>

        <audio
          ref={audioRef}
          src={currentaudio?.audio}
          onLoadedData={handleState}
          onTimeUpdate={() => {
            if (audioRef.current && !audioRef.current?.seeking) {
              dispatch(getValue(audioRef?.current?.currentTime));

              setIsComplete(
                Math.floor(audioRef?.current?.currentTime) >=
                  Math.floor(audioRef?.current?.duration)
              );
            }

            if (
              Math.floor(audioRef.current?.currentTime) >=
              Math.floor(audioRef.current?.duration)
            ) {
              dispatch(setPlaying(false));
              audioRef?.current?.pause();
            }
          }}
        />
        <div
          className={`flex items-center relative bg-background text-foreground w-full ${
            isminimize ? "justify-center" : "justify-between"
          }`}
        >
          <div
            className={` items-center gap-[8px] ${
              isminimize ? "notvisibles" : "visibles flex"
            }`}
          >
            <div className="w-[60px] h-[60px] rounded-[8px]">
              <img
                className="w-full h-full rounded-[8px]"
                src={currentaudio?.img || lazysImg}
                alt="disk"
              />
            </div>

            <div className="flex flex-col items-start justify-start ">
              <div
                onClick={() => {
                  navigate(`${LECTURE}${audioId}`);
                }}
                className="font-semibold text-sm text-ellipsis overflow-hidden max-w-[420px] xl:max-w-[600px] focus:outline-none"
                tabIndex={0}
                aria-label={currentaudio?.title || currentaudio?.Title || currentaudio?.album_name || "Audio title"}
                title={currentaudio?.title || currentaudio?.Title || currentaudio?.album_name || "Audio title"}
              >
                {(() => {
                  const t = (currentaudio?.title || currentaudio?.Title || currentaudio?.album_name || "").trim();
                  return t.length > 0 ? t : "Unknown";
                })()}
              </div>
              <div
                onClick={e => {
                  e.stopPropagation();
                  navigate(`${RESOURCE_PERSON}${currentaudio?.rp_id}`);
                }}
                className="font-semibold text-[12px] text-ellipsis overflow-hidden max-w-[320px] xl:max-w-[400px] focus:outline-none"
                tabIndex={0}
                aria-label={(() => {
                  const n = (currentaudio?.rpname || currentaudio?.album_name || "").trim();
                  return n.length > 0 ? n : "Reciter unknown";
                })()}
                title={(() => {
                  const n = (currentaudio?.rpname || currentaudio?.album_name || "").trim();
                  return n.length > 0 ? n : "Reciter unknown";
                })()}
              >
                {(() => {
                  const n = (currentaudio?.rpname || currentaudio?.album_name || "").trim();
                  return n.length > 0 ? n : "Unknown";
                })()}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={handlePreviousAudio}
              id="player"
              className="audiodet_play_btn"
            >
              <TbPlayerSkipBackFilled className="text-color text-[20px] hover:text-color-foreground dark:hover:text-[#ddff2b] " />
            </button>

            {loading ? (
              <AudioLoader />
            ) : (
              <button
                onClick={handlePlay}
                disabled={isloaded}
                className="relative flex h-[42px] w-[42px] dark:text-black text-gray-100 rounded-full dark:bg-[#ddff2b] bg-gray-500 justify-center items-center"
              >
                {!playing ? (
                  <FaPlay id="player" className="text-[22px]" />
                ) : (
                  <GiPauseButton className="text-[22px]" />
                )}
                {isloaded && (
                  <span className="absolute rounded-full inset-0 h-[45px] w-[45px] border-r border-b border-gray-200 animate-spin"></span>
                )}
              </button>
            )}
            <button onClick={handleNextAudio} id="player" className="">
              <TbPlayerSkipForwardFilled className="text-color text-[20px] hover:text-color-foreground dark:hover:text-[#ddff2b]" />
            </button>
          </div>

          <div
            className={`cursor-pointer  items-center gap-[1.5rem] ${
              isminimize ? "notvisibles" : "visibles hidden md:flex"
            }`}
          >
            <button
              disabled={!audioId}
              onClick={() => {
                dispatch(getRepeat(!isrepeat));
              }}
              className="h-[20px] w-[20px]  text-color hover:text-color-foreground dark:hover:text-[#ddff2b]"
            >
              {isrepeat ? <RepeatedIcon /> : <RepeatIcon />}
            </button>

            <AudioDownloadModal
              nid={audioId}
              className="h-[20px] w-[20px]  text-color hover:text-color-foreground dark:hover:text-[#ddff2b]"
              triggerInnerChild={<DownloadIcon />}
            />
            <button
              onClick={() => {
                addToFav();
              }}
              className="h-[20px] w-[20px] "
              disabled={!audioId}
            >
              {getFavs?.includes(parseInt(audioId)) ? (
                <AddedFavourites />
              ) : (
                <AddFavourites />
              )}
            </button>
            <button
              onClick={() => {
                shareAudio();
              }}
              disabled={!audioId}
              className="h-[20px] w-[20px]"
            >
              <SlShare className=" hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]" />
            </button>
            <button
              onClick={() => {
                addToPlaylist();
              }}
              disabled={!audioId}
              className="audiodet_play_add  hover:text-color-foreground dark:hover:text-[#ddff2b]"
            >
              <AddplayIcon />
            </button>
          </div>
          <div
            className={`absolute top-1 right-10 ${
              isminimize ? "notvisibles" : "visibles"
            }`}
          >
            <p className="text-[13px] text-zinc-500">
              {playTimingDesktop(
                audioRef?.current?.currentTime,
                audioRef?.current?.duration
              )}
            </p>
          </div>
          <div
            onClick={() => {
              setminimize(!isminimize);
              settransition(!transition);
            }}
            className={`w-[30px]  flex items-center bg-zinc-500 justify-center ${
              isminimize ? "absolute right-0 top-0 h-[60px]" : "h-[70px]"
            }`}
          >
            <SlArrowDown className="text-white text-[15px] " />
          </div>
        </div>
      </div>
      <div className={isShare ? "block" : "hidden"}>
        <ShareAudio
          isShare={isShare}
          setisShare={setisShare}
          nid={audioId}
          type={"audio"}
        />
      </div>

      <Addplaylist />
    </>
  );
};

export default AudioActionDesktop;
