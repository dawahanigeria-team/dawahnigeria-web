import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import "./audioAction.css";
import { SlArrowDown, SlShare } from "react-icons/sl";
import lazys from "../../assets/png/lazysong.jpeg";
import ShareAudio from "../shareaudio/shareAudio";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
} from "react-icons/tb";
import { toast } from "react-hot-toast";
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
  getcurrentAudioInfo,
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
const AudioActionDesktop = () => {
  const { currentUser, audioId, isrepeat, value, page, count, pack, playing } =
    useSelector((state) => state.user);
  //const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
  const rangeRef = useRef();
  const navigate = useNavigate();
  const { audioRef, setinitial, initial, loading, setLoading } =
    useContext(AudioContext);

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
  const getMusic = (audioId) => {
    //dispatch(setPlaying(false));
    setLoading(true);
    ///get lecture audio
    axios
      .get(`/leclistingapi.php?lecid=${audioId}`)
      .then((res) => {
        setcurrentaudio(res.data[0]);
        
        dispatch(getcurrentAudioInfo(res.data[0]));
        setLoading(false);
        console.log("@@@@@@@@@@@ def");
        if (initial) {
          dispatch(setPlaying(false));
          audioRef.current?.pause();
          console.log("@@@@@@@@@@@ pause");
          cancelAnimationFrame(playAnimation.current);
        } else {
          dispatch(setPlaying(true));
         
          console.log("@@@@@@@@@@@ playing");
          audioRef.current?.play();
          playAnimation.current = requestAnimationFrame(repeat);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
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
    if (!currentUser) return;

    const payload = {
      action: "post_recent",
      audio_id: audioId,
      user_id: currentUser?.id,
    };
    async function postRecent() {
      if (audioId) {
        await axios.post(`/recentApi.php`, payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        });
      }
    }
    postRecent();
  }, [audioId]);
  //************ */

  useEffect(() => {
    if (playing && !initial) {
      audioRef.current?.play();
      playAnimation.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(playAnimation.current);
    }
  }, [playing]);

  const handlePlay = () => {
    setinitial(false);
    if (playing) {
      dispatch(setPlaying(false));
      audioRef.current?.pause(); // Pause the audio
    } else {
      dispatch(setPlaying(true));
      audioRef.current
        ?.play()
        .catch((error) => console.log("Play was not allowed:", error)); // Play the audio
    }
  };

  const shareAudio = () => {
    setisShare(!isShare);
  };
  const handleRange = (curr) => {
    dispatch(getValue(curr));
    //   //console.log(rangeRef.current.value);
    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };

  const handleNextAudio = () => {
    setinitial(false);
    setIsPrevious(false);
    dispatch(setPlaying(false));
    setnotloaded(true);
    //console.log(pack);
    const next = pack?.findIndex((value) => {
      return value.nid === parseInt(audioId);
    });

    if (!isEmpty && pack?.length - 1 - next <= 2) {
      dispatch(getPage(page + 1));
    }

    if (next === pack?.length - 1) {
      dispatch(getaudioId(pack[next]?.nid));
      //console.log("end of track next");
      dispatch(getCount(next));
    } else if (count < pack?.length - 1) {
      //console.log("working");
      dispatch(getaudioId(pack[next + 1]?.nid));
      ////console.log("last count: ", count);
      dispatch(getCount(next + 1));
      //console.log("last count: ", next);
    } else {
      dispatch(getaudioId(pack[0]?.nid));
      ////console.log("last count: ", count);
      dispatch(getCount(0));
    }
  };
  const handlePreviousAudio = () => {
    //  //console.log("first count: ", count)
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

      //console.log("end of track prev");
    } else {
      //console.log("third count: ", count);
      dispatch(getaudioId(pack[prev - 1]?.nid));
      dispatch(getCount(prev - 1));
    }

    //audioRef.current?.currentTime = 0;
  };

  useEffect(() => {
    if (isrepeat === false && isComplete) {
      //console.log(isComplete);
      // //console.log('@@@@@@@@@@@@@@ data',data.length -1)

      const counter = pack?.findIndex((value) => {
        return value.nid === audioId;
      });

      // //console.log('@@@@@@@@@@@@@@@ count',count)

      if (counter === pack.length - 1) {
        dispatch(getaudioId(pack[0]?.nid));
        dispatch(getCount(0));
      } else {
        handleNextAudio();
      }

      // getMusic(controlData[pres + 1]?.nid)

      return;
    } else {
      //console.log("yeah");

      getMusic(audioId);
      dispatch(getValue(0));
      audioRef.current.currentTime = 0;
      //audioRef?.current?.currentTime = 0

      return;
    }
  }, [isComplete]);

  const addToPlaylist = () => {
    //console.log("@@@ add playlist clicked");
    dispatch(getLecid(audioId));
    dispatch(showaddPlaylist(true));
  };

  /////get users favorites
  async function fetchFavorites(addFav, audioId) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && audioId) {
      //console.log("..........@@@@@@@@@@@@@");
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
          //console.log(res.data);
          const { audio } = res.data;

          setgetfavs(Object.values(audio));
          // const isExist = [Object.values(audio)].includes(nid)
        })
        .catch((err) => {
          //console.log(err);
        });
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
        //console.log(res);
        toast.success(res.data.message);
        //setdisabled(false);
      })

      .catch((err) => {
        //console.log(err);
      });
  };

  function handleState() {
    /// if (!currentaudio?.audio) return
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
            min={"0"}
            max={Math.floor(audioRef.current?.duration)}
            value={value}
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
              //handleNextAudio()
              // //console.log("from update", audioRef.current?.currentTime);
              // //console.log("to update", Math.floor(audioRef.current?.duration));
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
                src={currentaudio?.img || lazys}
                alt="disk"
              />
            </div>

            <div className="flex flex-col items-start justify-start ">
              <div
                onClick={() => {
                  navigate(`${LECTURE}${audioId}`);
                }}
                className="font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px]  lg:max-w-[250px]  xl:max-w-[270px]"
              >
                {currentaudio?.title ||
                  currentaudio?.Title ||
                  "----------------"}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${RESOURCE_PERSON}${currentaudio?.rp_id}`);
                }}
                className="font-semibold text-[12px] whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] lg:max-w-[250px]  xl:max-w-[270px]"
              >
                {currentaudio?.rpname || "----------------"}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={handlePreviousAudio}
              id="player"
              className="audiodet_play_btn"
            >
              <TbPlayerSkipBackFilled className="text-text text-[20px] hover:text-text-foreground dark:hover:text-[#ddff2b] " />
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
              <TbPlayerSkipForwardFilled className="text-text text-[20px] hover:text-text-foreground dark:hover:text-[#ddff2b]" />
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
              className="h-[20px] w-[20px]  text-text hover:text-text-foreground dark:hover:text-[#ddff2b]"
            >
              {isrepeat ? <RepeatedIcon /> : <RepeatIcon />}
            </button>

            <AudioDownloadModal
              nid={audioId}
              className="h-[20px] w-[20px]  text-text hover:text-text-foreground dark:hover:text-[#ddff2b]"
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
              <SlShare className=" hover:text-text-foreground dark:hover:text-[#ddff2b] text-[20px]" />
            </button>
            <button
              onClick={() => {
                addToPlaylist();
              }}
              disabled={!audioId}
              className="audiodet_play_add  hover:text-text-foreground dark:hover:text-[#ddff2b]"
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
