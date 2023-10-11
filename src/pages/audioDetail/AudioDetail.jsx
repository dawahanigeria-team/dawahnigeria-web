import React, { useEffect, useRef, useState, useContext } from "react";
import "./audiodetail.scss";
import AudioActionDesktop from "../../components/audio/audioActionDesktop";
import Container from "../../components/container/Container";
import audioHero from "../../assets/png/detialPagehero.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import back from "../../assets/svg/back.svg";
import foward from "../../assets/svg/foward.svg";
import logo from "../../assets/png/dn logo.png";
import { BsPause } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiMessageMinus } from "react-icons/bi";
import { RiDownload2Fill, RiPlayListFill } from "react-icons/ri";
import { FiChevronsRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { SlEmotsmile, SlOptionsVertical } from "react-icons/sl";
import { GiPauseButton } from "react-icons/gi";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import sharebig from "../../../src/assets/svg/boom-share.svg";
import commentbig from "../../../src/assets/svg/boom-comment.svg";
import favbig from "../../../src/assets/svg/boom-fav.svg";
import { formatNumber } from "../../components/UI/formatter";
import { AudioContext } from "../../App.jsx";

import LandingWidget from "../../components/landingWidget/LandingWidget";
import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbRepeat,
} from "react-icons/tb";
import Add_playlist from "../add_playlist/AddPlaylist";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import Disk from "../../assets/png/Disk_tranparent.png";
import { durationFormat, playTimingRes } from "./UI_audiodetail/playtiming";
import axios from "../../utils/useAxios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import ShareAudio from "../../components/shareaudio/shareAudio";
import {
  getcurrentAudioInfo,
  getLecid,
  showaddPlaylist,
} from "../../Redux/Actions/ActionCreators";
import {
  getaudioId,
  getCount,
  getPack,
  setPlaying,
  getPage,
  getRepeat,
  getValue,
} from "../../Redux/Actions/ActionCreators";
import { LECTURE, MORE } from "../../utils/routes/constants";
import plus from "../../../src/assets/svg/plus.svg";
import CurrentPlayData from "../../components/currentData/currentPlayData";
import Loader from "../../components/UI/loader/loader";
import { AudioDownloadModal } from "../../components/audioDownloadModal/AudioDownloadModal";
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
  const [play, setPlay] = useState(0);
  const [moreOption, setmoreOption] = useState(false);
  const { audioRef, setinitial, loading } = useContext(AudioContext);
  //const [music, setMusic] = useState(0);
  const [data, setData] = useState([]);
  const slide = useRef();
  const [audioComment, setaudioComment] = useState();
  const [subdata, setSubData] = useState([]);
  const [currentaudio, setcurrentaudio] = useState([]);
  const [curUser, setCurUser] = useState(currentUser || null);
  const [iscurrents, setcurrents] = useState(false);
  //const audioRef = useRef();
  const rangeRef = useRef();
  //const [page, getPage] = useState(currentPage);
  //  const [endpUrl, setendpUrl] = useState(endpoint_url);
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  //const [isrepeat, getRepeat] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isComment, setIsComment] = useState(false);
  //const [nidValue, setNidValue] = useState(nid);
  //const [count, getCount] = useState(idx || id);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isAddedToFavorite, setisAddedToFavorite] = useState(false);
  const playAnimation = useRef();
  const [similarAudio, setSimilarAudio] = useState([]);
  const [similarAudioUrl, setSimilarAudioUrl] = useState("");
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const [sumofFav, setsumofFav] = useState(0);
  const [isShare, setisShare] = useState(false);
  const [comment, setComment] = useState("");
  const [noOfComments, setNoOfComments] = useState("");

  const dispatch = useDispatch();
  //console.log("count: ", count);
  //console.log("controlData: ", id);

  //console.log("currentPage", page);
  /**
   
   */

  const getMusic = async (id) => {
    if (state?.layout) return;
    if (window.innerWidth <= 615) {
      dispatch(getaudioId(id));
    } else {
      axios
        .get(`/leclistingapi.php?lecid=${id}`)
        .then((res) => {
          //console.log(res);
          dispatch(getcurrentAudioInfo(res.data[0]));
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };
  useEffect(() => {
    getMusic(id);
  }, [id, audioId]);

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
    //   //console.log(rangeRef.current.value);
    if (audioRef.current) {
      audioRef.current.currentTime = curr;
    }
  };

  const handleNextAudio = () => {
    // //console.log("first count: ", count);
    setIsPrevious(false);
    dispatch(setPlaying(false));
    //console.log(pack);

    const next = pack?.findIndex((value) => {
      return value.nid === parseInt(id);
    });

    //console.log("first count: ", next);
    // //console.log("current diff: ", data?.length - 1 - next);
    if (!isEmpty && pack?.length - 1 - next <= 2) {
      dispatch(getPage(page + 1));
    }

    if (next === pack?.length - 1) {
      navigate(`${LECTURE}${pack[next]?.nid}`);

      //console.log("@@@@@@@@@@ end of track next");
      dispatch(getCount(next));
    } else if (count < pack?.length - 1) {
      //console.log("@@@@@@@@@@@ working");
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

    // getCount(prev);
    // //console.log("second count: ", count);
    if (prev === 0) {
      navigate(`${LECTURE}${pack[prev]?.nid}`);
      //dispatch(getaudioId(pack[prev]?.nid));
      dispatch(getCount(prev));

      //console.log("end of track prev");
    } else {
      //console.log("third count: ", count);
      navigate(`${LECTURE}${pack[prev - 1]?.nid}`);
      //dispatch(getaudioId(pack[prev - 1]?.nid));
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

  useEffect(() => {
    //all lecturers
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/all_rps_api.php`)
      .then((res) => {
        const data = res.data;
        const rpArray = data.map((rp) => rp.name);
        console.clear();
        console.log("rpArray", rpArray);
        const isPresent = rpArray.includes(currentAudioInfo?.rpname);
        if (isPresent) {
          const rpindex = rpArray.indexOf(currentAudioInfo?.rpname);
          const page = 1;
          axios
            .get(
              `/leclisting_rp.php?page=${page}&lim=10&offset=30&rpid=${data[rpindex]?.id}`
            )
            .then((res) => {
              setSimilarAudio(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [currentAudioInfo?.rpname]);

  const shareAudio = () => {
    setisShare(!isShare);
    //setNidValue(nid)
  };

  ////*********************************************************** */

  return (
    <Container>
      <div className="audiodetail_wrapper">
        <img
          className="audiodetail_hero"
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
            <p className="audiodetail_breadcrumb_second">
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
              <p className="audiodetail_head_right_head">
                {currentAudioInfo?.title ||
                  currentAudioInfo?.Title ||
                  "Unknown"}
              </p>
              <div className="audiodetail_head_right_text">
                <p className="audiodetail_head_right_text1">
                  {currentAudioInfo?.rpname || "unknown"}
                </p>
                <p className="audiodetail_head_right_text2">
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
                <div className="audiodetail_fav">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToFav(e, audioId);
                      fetchFavorites(addFav, audioId);
                      setaddFav(!addFav);
                      setdisabled(true);
                    }}
                    className="fav_btn"
                    disabled={isdisabled}
                  >
                    {getFavs?.includes(parseInt(id || audioId)) ? (
                      <MdFavorite className="audiodetail_fav_icon_active" />
                    ) : (
                      <img
                        src={favbig}
                        alt=""
                        className="audiodetail_fav_icon"
                      />
                    )}
                  </button>

                  <p className="audiodetail_fav_text">
                    {formatNumber(currentaudio?.favorites || 0)}
                  </p>
                </div>
                <div
                  onClick={() => {
                    shareAudio();
                  }}
                  className="audiodetail_share"
                >
                  <img
                    src={sharebig}
                    alt=""
                    className="audiodetail_share_icon"
                  />
                  <p className="audiodetail_share_text">
                    {formatNumber(currentaudio?.share || 0)}
                  </p>
                </div>
                <div className="audiodetail_comment">
                  <img
                    src={commentbig}
                    alt=""
                    className="audiodetail_comment_icon"
                  />
                  <p className="audiodetail_comment_text">44</p>
                </div>
                <AudioDownloadModal
                  downloads={currentAudioInfo?.downloads}
                  nid={currentAudioInfo.nid}
                />
              </div>
            </div>
          </div>
          {/* -------------------------- Audio Detial play ------------------- */}

          {/* -------------------------- End ------------------- */}
          <div className="audiodetail_info">
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name">Genre: </div>
              <div className="audiodetail_info_value">
                {currentAudioInfo?.cats || "unknown"}
              </div>
            </div>
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name">Date of Release: </div>
              <div className="audiodetail_info_value">
                {currentAudioInfo?.post_date?.split("-")[0] || "no date"}
              </div>
            </div>
          </div>
          <div className="audiodetail_summary">
            <h1 className="audiodetail_summary_header">Summary</h1>
            <p
              className={`audiodetail_summary_body ${
                more
                  ? "audiodetail_summary_body_open "
                  : "audiodetail_summary_body_close "
              }`}
            >
              {currentAudioInfo?.description || "unknown"}
            </p>
            <div onClick={() => setMore(!more)} className="audiodetail_more">
              <p className="audiodetail_more_text">{more ? "less" : "more"}</p>

              <FiChevronsRight className="audiodetail_more_icon" />
            </div>
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
            <div className="audiores_text">
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
              <p className="audiores_scroll_start">
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
              <p className="audiores_scroll_stop">
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
                    ? "audiores_play_control_repeat_active"
                    : "audiores_play_control_repeat"
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
                  <TbPlayerSkipBackFilled className="audiores_play_back" />
                </button>
                {loading ? (
                  <div className="w-[40px] h-[40px]">
                    <Loader />
                  </div>
                ) : (
                  <div onClick={handlePlay} className="audiores_play_start">
                    {!playing ? (
                      <FaPlay className="audiores_play_start_icon" />
                    ) : (
                      <GiPauseButton className="audiores_play_start_icon" />
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
                  <TbPlayerSkipForwardFilled className="audiores_play_forward" />
                </button>
              </div>
              <div
                onClick={() => {
                  setcurrents(!iscurrents);
                }}
              >
                <RiPlayListFill className="audiores_play_control_list" />
              </div>
            </div>
            <div className="audiores_actions">
              <AudioDownloadModal
                downloads={currentAudioInfo?.downloads}
                nid={currentAudioInfo.nid}
                triggerInnerChild={
                  <RiDownload2Fill className="audiores_download" />
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
                  <MdFavorite className="audiores_fav_active" />
                ) : (
                  <MdFavoriteBorder className="audiores_fav" />
                )}
              </button>

              <BiMessageMinus
                onClick={() => {
                  setIsComment(!isComment);
                }}
                className={
                  isComment ? "audiores_comment_active" : "audiores_comment"
                }
              />
              <div
                onClick={() => {
                  //e.stopPropagation();
                  setmoreOption(!moreOption);
                }}
                className="audres_option_relative"
              >
                <SlOptionsVertical className="audiores_option" />
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
                    className="bg-black z-[200] relative rounded-sm space-y-2 p-1 font-light text-[12px] text-white"
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        shareAudio();
                      }}
                      className="flex w-full items-center space-x-2"
                    >
                      <span className=" w-3 h-3 ">
                        <img className="w-full h-full" src={sharebig} alt="" />
                      </span>
                      <span className="">Share</span>
                    </span>

                    <span
                      onClick={(e) => {
                        addToPlaylist(e, id || audioId);
                        setmoreOption(!moreOption);
                      }}
                      className="flex w-full items-center space-x-2"
                    >
                      <span className="w-3 h-3">
                        <img className="w-full h-full" src={plus} alt="" />
                      </span>
                      <span className="">Add to playlist</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/**cnbfmg */}
            <div className="mobile">
              <div className="audiodetail_info_mob">
                <p className="audiodetail_info_mob_head">Information</p>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Genre: </p>
                  <p className="audiodetail_info_value_mob">
                    {currentAudioInfo?.cats || "unknown"}
                  </p>
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
                  className={`audiodetail_summary_body ${
                    more
                      ? "audiodetail_summary_body_open_mob "
                      : "audiodetail_summary_body_close_mob "
                  }`}
                >
                  {currentAudioInfo?.description || "unknown"}
                </div>
                <div
                  onClick={() => setMore(!more)}
                  className="audiodetail_more_mob"
                >
                  <p className="audiodetail_more_text_mob">
                    {more ? "less" : "more"}
                  </p>
                  <FiChevronsRight className="audiodetail_more_icon_mob" />
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
            <p className="similarWidget_top_heading">{"Similar Audio"}</p>
            <div
              onClick={() => {
                navigate(MORE, {
                  state: {
                    name: "",
                    heading: `Similar Audios by ${
                      currentaudio?.rpname?.split(" ")[0]
                    } ${currentaudio?.rpname?.split(" ")[1]}`,
                    id: "",
                    img: "",
                    type: "lectures",
                    navtitle: "Similar Audio",
                    currentdata: similarAudio,
                  },
                });
              }}
              className="similarWidget_more"
            >
              <p className="similarWidget_more_text">more</p>
              <FiChevronsRight className="similarWidget_more_icon" />
            </div>
          </div>
          <div className="overflow_hidden_wrapper">
            <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
              <img src={back} alt="back" />
            </div>
            <div className={isnext ? "next" : "next_none"} onClick={next}>
              <img src={foward} alt="foward" />
            </div>
            <div ref={slide} className="overflow_auto_wrapper">
              {similarAudio.map(
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
                        categories={categories || cats}
                        img={img || lec_img}
                        views={views}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/**
           /////////////

           */}

        <div className="audiodetail_comments">
          <p className="audiodetail_comments_header">Comments</p>
          <textarea
            className="audiodetail_comment_input"
            placeholder="Pls share your thoughts"
            name=""
            id=""
            cols="30"
            value={comment}
            rows="5"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            maxLength="500"
          ></textarea>
          <div className="audiodetail_comment_action">
            <SlEmotsmile className="audiodetail_comment_moji" />
            <button
              onClick={postComment}
              className="audiodetail_comment_button"
            >
              Comment
            </button>
          </div>

          <div></div>
          <div className="aud_comment_texts">
            {audioComment?.map(({ user, date, content }, idx) => {
              return (
                <div className="com_wrap">
                  <div className="com_date">
                    <span className="logo_img">
                      <img className="logo_img_sz" src={logo} alt="" />
                    </span>
                    <span className="commentor">{user}</span>
                    <span className="comment_date">{date}</span>
                  </div>
                  <div className="comment_content">{content}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={
            isComment
              ? "audiodetail_comments_mob"
              : "audiodetail_comments_mob_none"
          }
        >
          <p className="audiodetail_comments_header_mob">Comments</p>
          <textarea
            className="audiodetail_comment_input_mob"
            placeholder="Pls share your thought"
            name=""
            id=""
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            maxLength="500"
          ></textarea>
          <div className="audiodetail_comment_action_mob">
            <SlEmotsmile className="audiodetail_comment_moji_mob" />
            <button
              onClick={postComment}
              className="audiodetail_comment_button_mob"
            >
              Comment
            </button>
          </div>

          <div className="aud_comment_texts">
            {audioComment?.map(({ user, date, content }, idx) => {
              return (
                <div className="com_wrap">
                  <div className="com_date">
                    <span className="logo_img">
                      <img className="logo_img_sz" src={logo} alt="" />
                    </span>
                    <span className="commentor">{user}</span>
                    <span className="comment_date">{date}</span>
                  </div>
                  <div className="comment_content">{content}</div>
                </div>
              );
            })}
          </div>
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
