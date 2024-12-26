import React, { useEffect, useRef, useState, useContext } from "react";
import "./audiodetail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { SlShare } from "react-icons/sl";
import back from "../../assets/svg/back.svg";
import foward from "../../assets/svg/foward.svg";
import { BiSolidShareAlt } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiMessageMinus } from "react-icons/bi";
import { RiDownload2Fill, RiPlayListFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { SlOptionsVertical } from "react-icons/sl";
import { GiPauseButton } from "react-icons/gi";
import { formatNumber } from "../../components/UI/formatter";
import { AudioContext } from "../../App.jsx";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbRepeat,
} from "react-icons/tb";
import Add_playlist from "../add_playlist/AddPlaylist";
import { durationFormat, playTimingRes } from "./UI_audiodetail/playtiming";
import axios from "../../utils/useAxios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ShareAudio from "../../components/shareaudio/shareAudio";
import { getLecid, showaddPlaylist } from "../../Redux/Actions/ActionCreators";
import {
  getaudioId,
  getCount,
  getPack,
  setPlaying,
  getPage,
  getRepeat,
  getValue,
} from "../../Redux/Actions/ActionCreators";
import { useSimilarAudioHook } from "../../hooks";
import { GENRES, LECTURE, MORE } from "../../utils/routes/constants";
import CurrentPlayData from "../../components/currentData/currentPlayData";
import Loader from "../../components/UI/loader/loader";

import { useAudioHook } from "../../hooks";
import { DesktopFavoriteButton } from "../../components/UI/favoritebuttons/desktopfavoriteButtons";
import { AudioDownloadModal } from "../../components/audioDownloadModal/AudioDownloadModal";
import { useRequest } from "../landing/utils";

import CardSkeleton from "../../components/skeletion";
import HeadMeta from "../../components/head-meta";
import CommentBox from "../../components/comment/comment";
import { CommentIcon } from "../../components/svgcomponent/svgComponent";
import LandingWidget from "../../components/landingWidget/LandingWidget";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders.js";

const AudioDetail = () => {
  const { id } = useParams();
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
    isrepeat,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [more, setMore] = useState(0);
  const [moreOption, setmoreOption] = useState(false);
  const { audioRef, setinitial, loading } = useContext(AudioContext);
  const slide = useRef();
  const [audioComment, setaudioComment] = useState();
  const [subdata, setSubData] = useState([]);
  const [currentaudio, setcurrentaudio] = useState([]);
  const [curUser, setCurUser] = useState(currentUser || null);
  const [iscurrents, setcurrents] = useState(false);
  const rangeRef = useRef();
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isAddedToFavorite, setisAddedToFavorite] = useState(false);
  const [similarAudio, setSimilarAudio] = useState([]);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const [sumofFav, setsumofFav] = useState(0);
  const [isShare, setisShare] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.user);

  const { refetch } = useAudioHook(id);
  const keyParam = { id: currentAudioInfo?.rp_id, page: 1 };
  const { querieddata: similarAudios } = useSimilarAudioHook(keyParam);

  const handlePlay = () => {
    dispatch(getaudioId(id));
    setinitial(false);
    if (playing) {
      dispatch(setPlaying(!playing));
    } else {
      dispatch(setPlaying(!playing));
    }
  };

  const handleRange = (curr) => {
    dispatch(getValue(curr));

    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };

  const handleNextAudio = () => {
    setIsPrevious(false);
    dispatch(setPlaying(false));

    const next = pack?.findIndex((value) => {
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
    const prev = pack?.findIndex((value) => {
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
    if (addFav || (!addFav && lecid)) {
      await axios
        .get(`/leclisting_favorites.php?user_id=${curUser?.id}&type=audio`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        })
        .then((res) => {
          const { audio } = res.data;
          setgetfavs(Object.values(audio));
        })
        .catch((err) => {});
    }
  }
  useEffect(() => {
    fetchFavorites(addFav, currentAudioInfo?.nid);
  }, [addFav, currentAudioInfo?.nid]);

  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();

    if (!curUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: curUser?.id,
      item_id: lecid,
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
        setdisabled(false);

        if (!getFavs?.includes(parseInt(lecid))) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {});
  };

  //////*************handling comment**************** */

  useEffect(() => {
    if (!curUser?.id) {
      return;
    }

    axios
      .get(
        `/commentApi.php?user_id=${curUser?.id}&item_id=${currentAudioInfo?.nid}&type=audio`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        setaudioComment(res.data.reverse());
      })
      .catch((err) => {});
  }, [currentAudioInfo?.nid]);

  const postComment = () => {
    if (!curUser?.id) {
      navigate("/auth/login");
      toast.error("Login or register to comment");
      return;
    }

    if (comment === "") return;

    const payload = {
      user_id: curUser?.id,
      item_id: currentAudioInfo?.nid,
      type: "audio",
      comment: comment,
    };
    axios
      .post(`/commentApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        setComment("");
      })
      .catch((err) => {});
  };

  ///scrolll to view
  useEffect(() => {
    if (isComment) {
      window.scrollTo({
        top: 900,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [isComment]);

  ///////******************/ Similar audios ***********///////////

  //get lectures from the same lecturers
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollEl() {
      if (slide.current?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        slide.current?.scrollLeft + slide.current?.offsetWidth >=
        slide.current?.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    slide.current?.addEventListener("scroll", scrollEl);

    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);

  const { data: similarLecture, isLoading } = useRequest(
    "get",
    `/genre_api.php?cat_id=${currentAudioInfo?.cat_id}`
  );

  const shareAudio = () => {
    setisShare(!isShare);
    //setNidValue(nid)
  };

  ////*********************************************************** */
  return (
    <Container>
      <HeadMeta
        title={`${
          currentAudioInfo?.title?.split("-")[0] ||
          currentAudioInfo?.Title ||
          "Audio"
        } on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="audiodetail_wrapper">
        <img
          className={`${
            theme === "dark" ? "audiodetail_hero" : "audiodetail_hero_light"
          }`}
          src={currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
          alt="audiohero"
        />
        <div className="audiodetail_container">
          <div className="audiodetail_breadcrumb">
            <p
              onClick={() => {
                navigate(-1);
              }}
              className="audiodetail_breadcrumb_first"
            >
              {`${"Back"}`}
            </p>
            {/* <p className="audiodetail_breadcrumb_second text-foreground">
              {currentAudioInfo?.title?.split("-")[0] ||
                currentAudioInfo?.Title ||
                "Unknown"}
            </p> */}
          </div>
          <div className="audiodetail_head_wrap">
            <div className="audiodetail_head_left">
              <img
                className="audiodetail_head_left_img"
                src={currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
                alt="head"
              />
            </div>
            <div className="audiodetail_head_right">
              <p className="audiodetail_head_right_head text-foreground">
                {currentAudioInfo?.title ||
                  currentAudioInfo?.Title ||
                  "Unknown"}
              </p>
              <div className="audiodetail_head_right_text">
                <p className="audiodetail_head_right_text1 text-color-foreground">
                  {currentAudioInfo?.rpname || "unknown"}
                </p>
                <p className="audiodetail_head_right_text2 text-color-foreground">
                  {currentAudioInfo?.album_name?.split("-")[0] ||
                    currentAudioInfo?.cats ||
                    "unknown"}
                </p>
              </div>

              <div className="audiodetail_head_right_actions_wrap">
                <div>
                  <div
                    id="player"
                    onClick={() => {
                      dispatch(setPlaying(false));
                      dispatch(getaudioId(id));
                      setinitial(false);
                      ///this is not coming with audio pack
                    }}
                    className="audiodetail_play"
                  >
                    <CiPlay1 className="audiodetail_play_icon" />
                    <p className="audiodetail_play_text">{"play"}</p>
                  </div>
                  <div className="dark:text-white text-center text-sm">
                    Play
                  </div>
                </div>

                <div>
                  <DesktopFavoriteButton
                    favorites={currentAudioInfo?.favorites}
                    id={id}
                    type={"audio"}
                    refetch={refetch}
                  />
                  <div className="dark:text-white text-center text-sm">
                    Like
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => {
                      shareAudio();
                    }}
                    className="audiodetail_share bg-gray-200  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]"
                  >
                    <SlShare className="text-[22px] text-color-primary" />
                    <p className="audiodetail_share_text text-color-primary">
                      {formatNumber(currentAudioInfo?.share || 0)}
                    </p>
                  </div>
                  <div className="dark:text-white text-center text-sm">
                    Share
                  </div>
                </div>
                <div>
                  <div className="audiodetail_comment bg-gray-200  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                    <CommentIcon />
                    <p className="audiodetail_comment_text text-color-primary">
                      {formatNumber(currentAudioInfo?.comment || 0)}
                    </p>
                  </div>
                  <div className="dark:text-white text-center text-sm">
                    Comment
                  </div>
                </div>
                <div>
                  <AudioDownloadModal
                    downloads={currentAudioInfo?.downloads}
                    nid={currentAudioInfo?.nid}
                    triggerInnerChild={
                      <div className="flex flex-col items-center">
                        <RiDownload2Fill className="audiores_download text-color" />
                        <div className="dark:text-white text-center text-sm">
                          Download
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------- Audio Detial play ------------------- */}

          {/* -------------------------- End ------------------- */}
          <div className="audiodetail_info">
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name text-color dark:text-muted">
                Genre:{" "}
              </div>

              <Link
                to={`${GENRES}/${parseInt(
                  currentAudioInfo?.cat_id?.toString()
                )}`}
                className="audiodetail_info_value text-color dark:text-muted  hover:text-foreground dark:hover:text-[#ddff2b] hover:underline"
              >
                {currentAudioInfo?.cats || "unknown"}
              </Link>
            </div>
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name dark:text-muted text-color">
                Date of Release:{" "}
              </div>
              <div className="audiodetail_info_value text-color dark:text-muted">
                {currentAudioInfo?.post_date?.split("-")[0] || "no date"}
              </div>
            </div>
          </div>
          <div className="audiodetail_summary">
            <h1 className="audiodetail_summary_header text-foreground">
              Summary
            </h1>
            <p
              className={`audiodetail_summary_body audiodetail_summary_body_open text-foreground`}
            >
              {currentAudioInfo?.description || "unknown"}
            </p>
            {/* 
           ${
                more
                  ? "audiodetail_summary_body_open "
                  : "audiodetail_summary_body_close "
              }
           <div onClick={() => setMore(!more)} className="audiodetail_more">
              <p className="audiodetail_more_text">{more ? "less" : "more"}</p>

              <FiChevronsRight className="audiodetail_more_icon" />
            </div>*/}
          </div>

          {/* // ----------------------- audiores --------------------- // */}
          <div className="audiores_wrapper">
            <div className="audiores_image_wrap">
              <img
                className="audiores_image"
                src={currentAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
                alt="head"
              />
            </div>
            <div className="audiores_text text-color">
              <p className="audiores_text1">
                {currentAudioInfo?.title ||
                  currentAudioInfo?.Title ||
                  "Unknown"}
              </p>
              <p className="audiores_text2">
                {currentAudioInfo?.cats ||
                  currentAudioInfo?.categories ||
                  "unknow"}
              </p>
            </div>
            {/**to be adjusted */}
            <div className="audiores_scroll_wrap">
              <p className="audiores_scroll_start text-color">
                {playTimingRes(audioRef?.current?.currentTime)}
              </p>
              {/* <div className="audiores_scroll_bar"></div> */}
              <div className="range_progress">
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
                  max={Math.floor(audioRef?.current?.duration)}
                  value={value}
                  onChange={(e) => {
                    handleRange(e.target.value);
                  }}
                  className=""
                />
              </div>
              <p className="audiores_scroll_stop text-color">
                {durationFormat(audioRef?.current?.duration)}
              </p>
            </div>
            <div className="audiores_play_control_wrap">
              <div className="flex flex-col items-center justify-center">
                <AudioDownloadModal
                  downloads={currentAudioInfo?.downloads}
                  nid={currentAudioInfo?.nid}
                  triggerInnerChild={
                    <div className="flex flex-col items-center">
                      <RiDownload2Fill className="audiores_download text-color" />
                      <div className="dark:text-white text-center text-sm">
                        Download
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="audiores_play_control">
                <button
                  disabled={count === 0}
                  className="audiores_button"
                  onClick={() => {
                    handlePreviousAudio();
                  }}
                >
                  <TbPlayerSkipBackFilled className="audiores_play_back text-color" />
                </button>
                {loading ? (
                  <div className="w-[40px] h-[40px]">
                    <Loader />
                  </div>
                ) : (
                  <div
                    onClick={handlePlay}
                    className="audiores_play_start dark:bg-[#ddff2b] bg-gray-400"
                  >
                    {!playing ? (
                      <FaPlay className="audiores_play_start_icon text-background" />
                    ) : (
                      <GiPauseButton className="audiores_play_start_icon text-background" />
                    )}
                  </div>
                )}
                <button
                  disabled={count === pack?.length - 1}
                  className="audiores_button"
                  onClick={() => {
                    handleNextAudio();
                  }}
                >
                  <TbPlayerSkipForwardFilled className="audiores_play_forward text-color" />
                </button>
              </div>
              <div
                onClick={() => {
                  //e.stopPropagation();
                  setmoreOption(!moreOption);
                }}
                className="audres_option_relative relative"
              >
                <div className="flex flex-col items-center justify-center">
                  <SlOptionsVertical className="audiores_option text-color" />
                  <div className="dark:text-white text-center text-sm mt-1">
                    More
                  </div>
                </div>
                <div
                  className={
                    moreOption
                      ? "right-0 top-10  absolute min-w-max h-fit"
                      : "hidden"
                  }
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setmoreOption(!moreOption);
                    }}
                    className="fixed inset-0 bg-none z-[90] w-full h-full"
                  ></span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-background shadow-lg border z-[200]  rounded-sm space-y-2 p-1 font-light text-[12px] text-foreground"
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        shareAudio();
                      }}
                      className="flex w-full items-center space-x-2"
                    >
                      <BiSolidShareAlt className="text-foreground text-lg" />
                      <span className="">Share</span>
                    </span>

                    <span
                      onClick={(e) => {
                        addToPlaylist(e, id || audioId);
                        setmoreOption(!moreOption);
                      }}
                      className="flex w-full items-center space-x-2"
                    >
                      <GrFormAdd className="text-foreground text-xl" />
                      <span className="">Add to playlist</span>
                    </span>
                    <div className="flex w-full items-center space-x-2">
                      <TbRepeat
                        onClick={() => {
                          dispatch(getRepeat(!isrepeat));
                          setmoreOption(!moreOption);
                        }}
                        className="text-foreground text-lg"
                      />
                      <span className="">Repeat</span>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                      <BiMessageMinus
                        onClick={() => {
                          setIsComment(!isComment);
                          setmoreOption(!moreOption);
                        }}
                        className="text-foreground text-lg"
                      />
                      <span className="">Comment</span>
                    </div>

                    <div className="flex w-full items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToFav(e, id);
                          fetchFavorites(addFav, id);
                          setaddFav(!addFav);
                          setdisabled(true);
                          setmoreOption(!moreOption);
                        }}
                        className="fav_btn"
                        disabled={isdisabled}
                      >
                        {getFavs?.includes(parseInt(id)) ||
                        isAddedToFavorite ? (
                          <MdFavorite className="text-foreground text-lg" />
                        ) : (
                          <MdFavoriteBorder className="text-foreground text-lg" />
                        )}
                      </button>
                      <span className="">Add to Favorite</span>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                      <div
                        onClick={() => {
                          setcurrents(!iscurrents);
                          setmoreOption(!moreOption);
                        }}
                      >
                        <RiPlayListFill className="text-foreground text-lg" />
                      </div>
                      <span className="">Playlist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/**cnbfmg */}
            <div className="mobile text-color">
              <div className="audiodetail_info_mob">
                <p className="audiodetail_info_mob_head text-color-foreground">
                  Information
                </p>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Genre: </p>
                  <Link
                    to={`${GENRES}/${parseInt(
                      currentAudioInfo?.cat_id?.toString()
                    )}`}
                    className="audiodetail_info_value_mob dark:hover:text-[#ddff2b] hover:underline"
                  >
                    {currentAudioInfo?.cats || "unknown"}
                  </Link>
                </div>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Date of Release: </p>
                  <p className="audiodetail_info_value_mob">
                    {currentAudioInfo?.post_date?.split("-")[0] || "no date"}
                  </p>
                </div>
              </div>
              <div className="audiodetail_summary_mob">
                <p className="audiodetail_summary_header_mob text-color-foreground">
                  Summary
                </p>
                <div
                  className={`audiodetail_summary_body audiodetail_summary_body_open_mob`}
                >
                  {currentAudioInfo?.description || "unknown"}
                </div>
              </div>

              {/**data={data}  data={data}*/}

              <div className="audiodetail_songs_mob">
                {/**data={data}  data={data}*/}
              </div>
            </div>
          </div>
        </div>

        <div className="similarWidget_wrapper px-4">
          <div className="similarWidget_top">
            <p className="similarWidget_top_heading text-foreground">
              {"Similar Audio"}
            </p>

            <Link
              to={`${GENRES}/${parseInt(currentAudioInfo?.cat_id?.toString())}`}
              className="similarWidget_more "
            >
              <p className="similarWidget_more_text text-foreground dark:text-[#ddff2b]">
                more
              </p>
              <FiChevronsRight className="similarWidget_more_icon text-foreground dark:text-[#ddff2b]" />
            </Link>
          </div>
          <div className="overflow_hidden_wrapper">
            <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
              <img src={back} alt="back" />
            </div>
            <div className={isnext ? "next" : "next_none"} onClick={next}>
              <img src={foward} alt="foward" />
            </div>
            <div ref={slide} className="overflow_auto_wrapper">
              {(similarLecture?.audio ?? []).map(
                (
                  {
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
                    views,
                  },
                  idx
                ) => {
                  return (
                    <div
                      className="similarWidget_album_item"
                      onClick={() => {
                        navigate(`${LECTURE}${id}`);

                        // setendpUrl(similarAudioUrl);
                        dispatch(getPack(null));
                        dispatch(getPage(1));
                        dispatch(getaudioId(nid));
                        dispatch(getCount(idx));
                        dispatch(getPack(similarAudio));

                        setCurUser(currentUser);
                        window.location.reload();
                      }}
                      key={idx + 1}
                    >
                      <LandingWidget
                        key={idx}
                        categories={mp3_title || categories || cats}
                        img={img || lec_img}
                        views={views}
                      />
                    </div>
                  );
                }
              )}

              {
                isLoading &&
                  // <div className="landing_recent landing_space my-1 min-[615px]:my-3">
                  Array(10)
                    .fill(undefined)
                    .map((_, i) => {
                      return <CardSkeleton key={i} />;
                    })
                // </div>
              }
            </div>
          </div>
        </div>
        {window.innerWidth > 615 && (
          <div className="audioCommentBoxWrap">
            <CommentBox
              audioComment={audioComment}
              id={currentAudioInfo?.nid}
              type={"audio"}
            />
          </div>
        )}

        <div
          className={
            isComment
              ? "audiodetail_comments_mob"
              : "audiodetail_comments_mob_none"
          }
        >
          <CommentBox
            type={"audio"}
            id={currentAudioInfo?.nid}
            audioComment={audioComment}
          />
        </div>

        <Add_playlist />

        <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
          <ShareAudio
            isShare={isShare}
            setisShare={setisShare}
            nid={id || audioId}
            type={"audio"}
          />
        </div>
        <CurrentPlayData
          datas={pack}
          iscurrents={iscurrents}
          setcurrents={setcurrents}
        />
      </div>
    </Container>
  );
};

export default AudioDetail;
