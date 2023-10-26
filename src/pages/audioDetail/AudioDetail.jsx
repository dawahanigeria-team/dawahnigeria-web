import React, { useEffect, useRef, useState, useContext } from "react";
import "./audiodetail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { SlShare } from "react-icons/sl";
import { BiSolidShareAlt } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiMessageMinus } from "react-icons/bi";
import { RiDownload2Fill, RiPlayListFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
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
import HeadMeta from "../../components/head-meta";
import CommentBox from "../../components/comment/comment";
import SimilarAudio from "../../components/similaraudio/similarAudio";
import { CommentIcon } from "../../components/svgcomponent/svgComponent";

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

  //console.log("currentPage", page);

  const { refetch } = useAudioHook(id);
  const keyParam = { id: currentAudioInfo?.rp_id, page: 1 };
  const { querieddata: similarAudios } = useSimilarAudioHook(keyParam);

  console.log(similarAudios);
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
      //console.log("@@@@@@ last count: ", next);
    } else {
      navigate(`${LECTURE}${pack[0]?.id}`);

      dispatch(getCount(0));
    }
    setinitial(false);
  };
  const handlePreviousAudio = () => {
    //  //console.log("first count: ", count);
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
    //console.log(`adding to playlist`);
    dispatch(showaddPlaylist(true));
    dispatch(getLecid(lecid));
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    //setsumofFav(favorites)
    if (!curUser?.id) return;
    if (addFav || (!addFav && lecid)) {
      ////console.log("..........@@@@@@@@@@@@@");
      await axios
        .get(`/leclisting_favorites.php?user_id=${curUser?.id}&type=audio`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        })
        .then((res) => {
          //  //console.log(res.data);
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
    fetchFavorites(addFav, currentAudioInfo?.nid);
  }, [addFav, currentAudioInfo?.nid]);

  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();
    //console.log("event clicked");
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
        //  //console.log(res);
        toast.success(res.data.message);
        setdisabled(false);
        // //console.log(addFav);
        if (!getFavs?.includes(parseInt(lecid))) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {
        //console.log(err);
      });
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
        //console.log("comment result", res);
        setaudioComment(res.data.reverse());
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [currentAudioInfo?.nid]);

  const postComment = () => {
    if (!curUser?.id) {
      navigate("/auth/login");
      toast.error("Login or register to comment");
      return;
    }

    if (comment === "") return;
    //console.log(comment);
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
        //console.log(res);
        setComment("");
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  ///scrolll to view
  useEffect(() => {
    //console.log(isComment)
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
      ////console.log("Slide")
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
          src={
            currentAudioInfo?.img ||
            "https://imagetolink.com/ib/TfEFBgq518.jpeg"
          }
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
              {`${"Back"}/`}
            </p>
            <p className="audiodetail_breadcrumb_second text-foreground">
              {currentAudioInfo?.title?.split("-")[0] ||
                currentAudioInfo?.Title ||
                "Unknown"}
            </p>
          </div>
          <div className="audiodetail_head_wrap">
            <div className="audiodetail_head_left">
              <img
                className="audiodetail_head_left_img"
                src={
                  currentAudioInfo?.img ||
                  "https://imagetolink.com/ib/TfEFBgq518.jpeg"
                }
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

                <DesktopFavoriteButton
                  favorites={currentAudioInfo?.favorites}
                  id={id}
                  type={"audio"}
                  refetch={refetch}
                />

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
                <div className="audiodetail_comment bg-gray-200  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                  <CommentIcon />
                  <p className="audiodetail_comment_text text-color-primary">
                    {formatNumber(currentAudioInfo?.comment || 0)}
                  </p>
                </div>
                <AudioDownloadModal
                  downloads={currentAudioInfo?.downloads}
                  nid={currentAudioInfo?.nid}
                />
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
                src={
                  currentAudioInfo?.img ||
                  "https://imagetolink.com/ib/TfEFBgq518.jpeg"
                }
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
              <TbRepeat
                onClick={() => {
                  dispatch(getRepeat(!isrepeat));
                }}
                className={
                  isrepeat
                    ? "audiores_play_control_repeat_active dark:text-[#ddff2b] text-black"
                    : "audiores_play_control_repeat text-foreground"
                }
              />
              <div className="audiores_play_control">
                <button
                  disabled={count === 0}
                  className="audiores_button"
                  onClick={() => {
                    handlePreviousAudio();
                  }}
                >
                  <TbPlayerSkipBackFilled className="audiores_play_back text-foreground" />
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
                  <TbPlayerSkipForwardFilled className="audiores_play_forward text-foreground" />
                </button>
              </div>
              <div
                onClick={() => {
                  setcurrents(!iscurrents);
                }}
              >
                <RiPlayListFill className="audiores_play_control_list text-foreground" />
              </div>
            </div>
            <div className="audiores_actions">
              <AudioDownloadModal
                downloads={currentAudioInfo?.downloads}
                nid={currentAudioInfo?.nid}
                triggerInnerChild={
                  <RiDownload2Fill className="audiores_download text-foreground" />
                }
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToFav(e, id);
                  fetchFavorites(addFav, id);
                  setaddFav(!addFav);
                  setdisabled(true);
                }}
                className="fav_btn"
                disabled={isdisabled}
              >
                {getFavs?.includes(parseInt(id)) || isAddedToFavorite ? (
                  <MdFavorite className="audiores_fav_active text-foreground dark:text-[#ddff2b]" />
                ) : (
                  <MdFavoriteBorder className="audiores_fav text-foreground" />
                )}
              </button>

              <BiMessageMinus
                onClick={() => {
                  setIsComment(!isComment);
                }}
                className={
                  isComment
                    ? "audiores_comment_active text-gray-700 dark:text-[#ddff2b]"
                    : "audiores_comment text-foreground"
                }
              />
              <div
                onClick={() => {
                  //e.stopPropagation();
                  setmoreOption(!moreOption);
                }}
                className="audres_option_relative"
              >
                <SlOptionsVertical className="audiores_option text-foreground" />
                <div
                  className={
                    moreOption
                      ? "left-[-70px]  absolute min-w-max h-fit"
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
                      ////console.log('cliked')
                    }}
                    className="bg-background shadow-lg border z-[200] relative rounded-sm space-y-2 p-1 font-light text-[12px] text-foreground"
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        shareAudio();
                      }}
                      className="flex w-full items-center space-x-2"
                    >
                      <BiSolidShareAlt className="text-foreground text-xl" />
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
                  </div>
                </div>
              </div>
            </div>

            {/**cnbfmg */}
            <div className="mobile text-muted-foreground">
              <div className="audiodetail_info_mob">
                <p className="audiodetail_info_mob_head text-muted-foreground">
                  Information
                </p>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Genre: </p>
                  <Link
                    to={`${GENRES}/${parseInt(
                      currentAudioInfo?.cat_id?.toString()
                    )}`}
                    className="audiodetail_info_value_mob hover:text-[#ddff2b] hover:underline"
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
                <p className="audiodetail_summary_header_mob">Summary</p>
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

        <div className="px-4 sm:px-8 w-full">
          <SimilarAudio
            heading={`Similar Audios by ${currentAudioInfo?.rpname || ""}`}
            type={"lectures"}
            navtitle={"Similar Audio"}
            current={id}
            similar={similarAudios}
          />
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
