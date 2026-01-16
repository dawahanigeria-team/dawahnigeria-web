import React, { useEffect, useRef, useState, useContext } from "react";
import "./audiodetail.scss";
import "../../components/similaraudio/similarAudio.scss";
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
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
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
import { trackLectureView, trackLecturePlay, trackLecturePause, trackFavorite } from "../../utils/posthog";

const AudioDetail = () => {
  const { id } = useParams();
  const {
    currentUser,
    audioId,
    curDuration,
    value,
    audioData,
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
  const lastTrackedLectureId = useRef(null);
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isAddedToFavorite, setisAddedToFavorite] = useState(false);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const [sumofFav, setsumofFav] = useState(0);
  const [isShare, setisShare] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.user);

  // Better server-side data access with state management
  const [lectureData, setLectureData] = useState(null);

  useEffect(() => {
    // Check for server-side data and ensure it matches the current lecture ID
    if (typeof window === 'undefined') return;

    const serverData = window.__LECTURE_DATA__;
    const serverId = serverData?.nid ?? serverData?.id ?? serverData?.lecid;

    if (serverData && String(serverId) === String(id)) {
      setLectureData(serverData);
    } else {
      setLectureData(null);
    }
  }, [id]);

  const { refetch, isLoading: isHookLoading, data: audioQueryData } = useAudioHook(id);

  const fetchedAudioInfo = Array.isArray(audioQueryData) ? audioQueryData[0] : null;
  const resolvedAudioInfo =
    fetchedAudioInfo && String(fetchedAudioInfo?.nid) === String(id)
      ? fetchedAudioInfo
      : null;

  // CRITICAL: Check if displayed data matches the URL
  // This prevents showing stale data from redux-persist when navigating to a new lecture
  const isLoadingLecture = isHookLoading || !resolvedAudioInfo;

  const handlePlay = () => {
    dispatch(getaudioId(id));
    setinitial(false);
    if (playing) {
      // Track pause event
      if (resolvedAudioInfo) {
        trackLecturePause(resolvedAudioInfo, audioRef.current?.currentTime || 0);
      }
      dispatch(setPlaying(!playing));
    } else {
      // Track play event
      if (resolvedAudioInfo) {
        trackLecturePlay(resolvedAudioInfo);
      }
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
    fetchFavorites(addFav, resolvedAudioInfo?.nid);
  }, [addFav, resolvedAudioInfo?.nid]);

  // Track lecture view - only once per unique lecture ID
  useEffect(() => {
    if (resolvedAudioInfo?.nid && resolvedAudioInfo.nid !== lastTrackedLectureId.current) {
      trackLectureView(resolvedAudioInfo);
      lastTrackedLectureId.current = resolvedAudioInfo.nid;
    }
  }, [resolvedAudioInfo?.nid, resolvedAudioInfo]);

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
          // Track favorite added
          if (resolvedAudioInfo) {
            trackFavorite(resolvedAudioInfo, 'add');
          }
        } else {
          setsumofFav(sumofFav - 1);
          // Track favorite removed
          if (resolvedAudioInfo) {
            trackFavorite(resolvedAudioInfo, 'remove');
          }
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
        `/commentApi.php?user_id=${curUser?.id}&item_id=${resolvedAudioInfo?.nid}&type=audio`,
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
  }, [resolvedAudioInfo?.nid]);

  const postComment = () => {
    if (!curUser?.id) {
      navigate("/auth/login");
      toast.error("Login or register to comment");
      return;
    }

    if (comment === "") return;

    const payload = {
      user_id: curUser?.id,
      item_id: resolvedAudioInfo?.nid,
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
    resolvedAudioInfo?.cat_id
      ? `/genre_api.php?cat_id=${resolvedAudioInfo?.cat_id}`
      : null
  );

  const similarAudioList = resolvedAudioInfo ? similarLecture?.audio ?? [] : [];

  const shareAudio = () => {
    setisShare(!isShare);
    //setNidValue(nid)
  };

  ////*********************************************************** */
  // Enhanced SEO data generation for lecture pages
  const generateSEOData = () => {
    // Priority: lectureData (SSR) > resolvedAudioInfo (client) > defaults
    const data = lectureData || resolvedAudioInfo;
    
    if (!data) {
      return {
        title: 'Islamic Lecture | Dawahnigeria - Home of Islamic Resources',
        description: 'Explore Islamic lectures, teachings, and spiritual guidance on Dawahnigeria.',
        ogImage: IMAGE_PLACEHOLDERS.lecture,
        keywords: 'Islamic lecture, Islamic education, dawah, Nigeria'
      };
    }
    
    const title = (data.title || data.Title || 'Islamic Lecture').trim();
    const lecturer = (data.rpname || 'Islamic Scholar').trim();
    const category = (data.cats || 'Islamic Education').trim();
    const duration = data.duration ? ` (${data.duration})` : '';
    
    // Enhanced description with more context
    const baseDescription = data.description || 
      `Listen to "${title}" by ${lecturer} on Dawahnigeria. This ${category.toLowerCase()} lecture provides Islamic teachings and spiritual guidance.`;
    
    const enhancedDescription = `${baseDescription}${duration} Free Islamic audio content from Nigeria's premier dawah platform.`;
    
    // More comprehensive keywords
    const keywords = [
      title.toLowerCase(),
      lecturer.toLowerCase(),
      'islamic lecture',
      'islamic education', 
      'dawah',
      'nigeria',
      'islamic audio',
      'muslim teachings',
      category.toLowerCase(),
      'free islamic content',
      'dawahnigeria'
    ].filter(Boolean).join(', ');
    
    return {
      title: `${title} - ${lecturer} | Dawahnigeria`,
      description: enhancedDescription.substring(0, 160),
      ogImage: data.img || IMAGE_PLACEHOLDERS.lecture,
      keywords,
      lecturer,
      category,
      duration: data.duration,
      publishDate: data.date_created || data.post_date
    };
  };

  const seoData = generateSEOData();

  return (
    <Container>
      <HeadMeta
        title={seoData.title || `${resolvedAudioInfo?.title?.split("-")[0] || resolvedAudioInfo?.Title || "Audio"} on Dawah Nigeria - Home of islamic resources`}
        description={seoData.description}
        ogImage={seoData.ogImage}
      />
      
      {/* Enhanced meta tags for better SEO */}
      {(lectureData || resolvedAudioInfo) && (
        <>
          <meta name="keywords" content={seoData.keywords} />
          <meta name="author" content={seoData.lecturer} />
          <meta name="category" content={seoData.category} />
          <meta name="language" content="en" />
          <meta name="content-type" content="audio/mpeg" />
          
          {/* Open Graph tags */}
          <meta property="og:type" content="music.song" />
          <meta property="og:title" content={seoData.title} />
          <meta property="og:description" content={seoData.description} />
          <meta property="og:image" content={seoData.ogImage} />
          <meta property="og:url" content={`${window.location.origin}/dawahcast/l/${id}`} />
          <meta property="og:site_name" content="Dawahnigeria" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoData.title} />
          <meta name="twitter:description" content={seoData.description} />
          <meta name="twitter:image" content={seoData.ogImage} />
          <meta name="twitter:site" content="@dawahnigeria" />
          
          {/* Article specific tags */}
          <meta property="article:author" content={seoData.lecturer} />
          <meta property="article:section" content={seoData.category} />
          {seoData.publishDate && <meta property="article:published_time" content={seoData.publishDate} />}
          
          {/* Audio specific tags */}
          <meta name="audio" content={(lectureData || resolvedAudioInfo).audio || ''} />
          {seoData.duration && <meta name="duration" content={seoData.duration} />}
          
          <link rel="canonical" href={`${window.location.origin}/dawahcast/l/${id}`} />
        </>
      )}
      
      {/* Enhanced JSON-LD structured data for rich snippets */}
      {(lectureData || resolvedAudioInfo) && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AudioObject",
            "name": (lectureData || resolvedAudioInfo).title || (lectureData || resolvedAudioInfo).Title,
            "description": seoData.description,
            "creator": {
              "@type": "Person",
              "name": seoData.lecturer,
              "jobTitle": "Islamic Scholar"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dawahnigeria",
              "url": "https://dawahnigeria.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dawahnigeria.com/logo.png"
              }
            },
            "contentUrl": (lectureData || resolvedAudioInfo).audio,
            "thumbnailUrl": seoData.ogImage,
            "uploadDate": seoData.publishDate,
            "datePublished": seoData.publishDate,
            "genre": seoData.category,
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "educationalLevel": "Adult",
            "learningResourceType": "Audio Lecture",
            "about": {
              "@type": "Thing",
              "name": "Islamic Education",
              "description": "Islamic teachings and spiritual guidance"
            },
            "keywords": seoData.keywords,
            "url": `${window.location.origin}/dawahcast/l/${id}`,
            ...(seoData.duration && { "duration": seoData.duration }),
            "potentialAction": {
              "@type": "ListenAction",
              "target": `${window.location.origin}/dawahcast/l/${id}`
            }
          })}
        </script>
      )}
      <div className="audiodetail_wrapper">
        <img
          className={`${
            theme === "dark" ? "audiodetail_hero" : "audiodetail_hero_light"
          }`}
          src={resolvedAudioInfo ? (resolvedAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture) : IMAGE_PLACEHOLDERS.lecture}
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
              {audioData?.navName && audioData.navName !== "Home"
                ? `← Back to ${audioData.navName}`
                : audioData?.navName === "Home"
                  ? "← Back to Home"
                  : "← Back"}
            </p>
            {audioData?.navName && !isLoadingLecture && (
              <p className="audiodetail_breadcrumb_second text-foreground">
                {resolvedAudioInfo?.title?.split("-")[0] ||
                  resolvedAudioInfo?.Title ||
                  "Unknown"}
              </p>
            )}
          </div>

          {/* Loading skeleton while fetching new lecture data */}
          {isLoadingLecture || !resolvedAudioInfo ? (
            <div className="audiodetail_head_wrap">
              <div className="audiodetail_head_left">
                <div className="audiodetail_head_left_img bg-gray-300 dark:bg-gray-700 animate-pulse" />
              </div>
              <div className="audiodetail_head_right">
                <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-4" />
                <div className="audiodetail_head_right_text">
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />
                  <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                </div>
                <div className="audiodetail_head_right_actions_wrap mt-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
                      <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
          <div className="audiodetail_head_wrap">
            <div className="audiodetail_head_left">
              <img
                className="audiodetail_head_left_img"
                    src={resolvedAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
                alt="head"
              />
            </div>
            <div className="audiodetail_head_right">
              <p className="audiodetail_head_right_head text-foreground">
                {(() => {
                      const t = (resolvedAudioInfo?.title || resolvedAudioInfo?.Title || resolvedAudioInfo?.album_name || "").trim();
                  return t.length > 0 ? t : "Unknown";
                })()}
              </p>
              <div className="audiodetail_head_right_text">
                <p className="audiodetail_head_right_text1 text-color-foreground">
                  {(() => {
                        const n = (resolvedAudioInfo?.rpname || resolvedAudioInfo?.album_name || "").trim();
                    return n.length > 0 ? n : "Unknown";
                  })()}
                </p>
                <p className="audiodetail_head_right_text2 text-color-foreground">
                      {resolvedAudioInfo?.album_name?.split("-")[0] ||
                        resolvedAudioInfo?.cats ||
                    "unknown"}
                </p>
              </div>

              <div className="audiodetail_head_right_actions_wrap">
                <div>
                  <div
                    id="player"
                    onClick={() => {
                      if (playing && String(audioId) === String(id)) {
                        dispatch(setPlaying(false));
                      } else {
                        dispatch(getaudioId(id));
                        setinitial(false);
                        dispatch(setPlaying(true));
                      }
                    }}
                    className="audiodetail_play"
                  >
                    {playing && String(audioId) === String(id) ? (
                      <GiPauseButton className="audiodetail_play_icon" />
                    ) : (
                      <CiPlay1 className="audiodetail_play_icon" />
                    )}
                    <p className="audiodetail_play_text">
                      {playing && String(audioId) === String(id) ? "pause" : "play"}
                    </p>
                  </div>
                  <div className="dark:text-white text-center text-sm">
                    {playing && String(audioId) === String(id) ? "Pause" : "Play"}
                  </div>
                </div>

                <div>
                  <DesktopFavoriteButton
                        favorites={resolvedAudioInfo?.favorites}
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
                          {formatNumber(resolvedAudioInfo?.share || 0)}
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
                          {formatNumber(resolvedAudioInfo?.comment || 0)}
                    </p>
                  </div>
                  <div className="dark:text-white text-center text-sm">
                    Comment
                  </div>
                </div>
                <div>
                  <AudioDownloadModal
                        downloads={resolvedAudioInfo?.downloads}
                        nid={resolvedAudioInfo?.nid}
                    triggerInnerChild={
                      <div className="audiodetail_share bg-gray-200 dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                        <RiDownload2Fill className="text-[25px] text-color-primary" />
                      </div>
                    }
                  />
                   <div className="dark:text-white text-center text-sm">
                          Download
                        </div>
                </div>
              </div>
            </div>
          </div>
          )}
          {/* -------------------------- Audio Detial play ------------------- */}

          {/* -------------------------- End ------------------- */}
          {!isLoadingLecture && resolvedAudioInfo && (
          <>
          <div className="audiodetail_info">
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name text-color dark:text-muted">
                Genre:{" "}
              </div>

              <Link
                to={`${GENRES}/${parseInt(
                  resolvedAudioInfo?.cat_id?.toString()
                )}`}
                className="audiodetail_info_value text-color dark:text-muted  hover:text-foreground dark:hover:text-[#ddff2b] hover:underline"
              >
                    {resolvedAudioInfo?.cats || "unknown"}
              </Link>
            </div>
            <div className="audiodetail_info_wrap">
              <div className="audiodetail_info_name dark:text-muted text-color">
                Date of Release:{" "}
              </div>
              <div className="audiodetail_info_value text-color dark:text-muted">
                    {resolvedAudioInfo?.post_date?.split("-")[0] || "no date"}
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
                  {resolvedAudioInfo?.description || "unknown"}
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
          </>
          )}

          {/* // ----------------------- audiores --------------------- // */}
          <div className="audiores_wrapper">
            {isLoadingLecture ? (
              <>
                <div className="audiores_image_wrap">
                  <div className="audiores_image bg-gray-300 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="audiores_text text-color">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                </div>
              </>
            ) : (
              <>
                <div className="audiores_image_wrap">
                  <img
                    className="audiores_image"
                      src={resolvedAudioInfo?.img || IMAGE_PLACEHOLDERS.lecture}
                    alt="head"
                  />
                </div>
                <div className="audiores_text text-color">
                  <p className="audiores_text1">
                      {resolvedAudioInfo?.title ||
                        resolvedAudioInfo?.Title ||
                      "Unknown"}
                  </p>
                  <p className="audiores_text2">
                      {resolvedAudioInfo?.cats ||
                        resolvedAudioInfo?.categories ||
                      "unknow"}
                  </p>
                </div>
              </>
            )}
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
                  downloads={resolvedAudioInfo?.downloads}
                  nid={resolvedAudioInfo?.nid}
                  triggerInnerChild={
                    <div className="audiodetail_share bg-gray-200 dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                      <RiDownload2Fill className="text-[25px] text-color-primary" />
                    </div>
                  }
                />
                <div className="dark:text-white text-center text-sm">
                  Download
                </div>
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
                    {!(playing && String(audioId) === String(id)) ? (
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
            {!isLoadingLecture && resolvedAudioInfo && (
            <div className="mobile text-color">
              <div className="audiodetail_info_mob">
                <p className="audiodetail_info_mob_head text-color-foreground">
                  Information
                </p>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Genre: </p>
                  <Link
                    to={`${GENRES}/${parseInt(
                      resolvedAudioInfo?.cat_id?.toString()
                    )}`}
                    className="audiodetail_info_value_mob dark:hover:text-[#ddff2b] hover:underline"
                  >
                      {resolvedAudioInfo?.cats || "unknown"}
                  </Link>
                </div>
                <div className="audiodetail_info_wrap_mob">
                  <p className="audiodetail_info_name_mob">Date of Release: </p>
                  <p className="audiodetail_info_value_mob">
                      {resolvedAudioInfo?.post_date?.split("-")[0] || "no date"}
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
                    {resolvedAudioInfo?.description || "unknown"}
                </div>
              </div>

              {/**data={data}  data={data}*/}

              <div className="audiodetail_songs_mob">
                {/**data={data}  data={data}*/}
              </div>
            </div>
            )}
          </div>
        </div>

        <div className="similarWidget_wrapper px-4">
          <div className="similarWidget_top">
            <p className="similarWidget_top_heading text-foreground">
              {"Similar Audio"}
            </p>

            <Link
              to={
                resolvedAudioInfo?.cat_id
                  ? `${GENRES}/${parseInt(resolvedAudioInfo?.cat_id?.toString())}`
                  : GENRES
              }
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
              {similarAudioList.map(
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
                        navigate(`${LECTURE}${nid}`);

                        // setendpUrl(similarAudioUrl);
                        dispatch(getPack(null));
                        dispatch(getPage(1));
                        dispatch(getaudioId(nid));
                        dispatch(getCount(idx));
                        dispatch(getPack(similarAudioList));

                        setCurUser(currentUser);
                      }}
                      key={idx + 1}
                    >
                      <LandingWidget
                        key={idx}
                        nid={nid}
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
              id={resolvedAudioInfo?.nid}
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
            id={resolvedAudioInfo?.nid}
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
