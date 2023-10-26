import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import Container from "../../components/container/Container";
import arrow from "../../assets/svg/arrowleft.svg";
import sharebold from "../../assets/svg/sharebold.svg";
import combold from "../../assets/svg/combold.svg";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./lecturesListDetail.scss";
import MusicList from "../../components/miscList/musicList";
import MobileList from "../../components/list/mobileList";
import Loader from "../../components/UI/loader/loader";
import { BsFillPlayFill } from "react-icons/bs";
import {SlShare} from "react-icons/sl"
import sharebig from "../../../src/assets/svg/boom-share.svg";
import commentbig from "../../../src/assets/svg/boom-comment.svg";
import { formatNumber } from "../../components/UI/formatter";
import { useSelector, useDispatch } from "react-redux";
import useaxios from "../../utils/useAxios";

import _ from "lodash";
import CommentBox from "../../components/comment/comment";
import SimilarAudio from "../../components/similaraudio/similarAudio";
import ShareAudio from "../../components/shareaudio/shareAudio";
import lazy from "../../assets/png/lazyrps.jpeg";
import {
  getaudioId,
  getCount,
  getPack,
} from "../../Redux/Actions/ActionCreators";
import { AudioContext } from "../../App";
import { LECTURE } from "../../utils/routes/constants";

import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureListDetailApi } from "../../services";
import { DesktopFavoriteButton } from "../../components/UI/favoritebuttons/desktopfavoriteButtons";
import { MobileFavoriteButton } from "../../components/UI/favoritebuttons/mobilefavoriteButton";

import HeadMeta from "../../components/head-meta";
import { AudioDownloadModal } from "../../components/audioDownloadModal/AudioDownloadModal";
import { CommentIcon } from "../../components/svgcomponent/svgComponent";

const LecturesListDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { currentUser, sharedAlbum } = useSelector((state) => state.user);
  const observeEl = useRef();
  const leclistdet = useRef();
  const [, setsingleData] = useState();
  const { setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [audioComment, setaudioComment] = useState();
  const { theme } = useSelector((state) => state.user);

  const queryParam = { id };
  const keyParam = { id, page: 1 };

  const { querieddata, refetch } = useQueryGetRequest(
    "albumdetails",
    queryParam,
    lectureListDetailApi.getAlbumDetail
  );
  const { querieddata: albumlectures, isLoading } = useQueryGetRequest(
    "albumlectures",
    queryParam,
    lectureListDetailApi.getAlbumLectures
  );
  const { querieddata: similarAlbums } = useQueryGetRequest(
    "similarRpAlbums",
    keyParam,
    lectureListDetailApi.getSimilarAlbums
  );

  useEffect(() => {
    // if (sharedAlbum !== 0) {
    setsingleData((prev) => {
      console.log({ prevShareCount: prev });
      return { ...prev, share: prev?.share + 1 };
    });
    // }
  }, [sharedAlbum]);

  //////*************handling comment**************** */

  useEffect(() => {
    if (!currentUser?.id) return;

    useaxios
      .get(
        `/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=album`,
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
  }, [id]);

  /// Get the exiting element
  const firstElement = useCallback((node) => {
    observeEl.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        //console.log("not visible");
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    if (node) observeEl.current.observe(node);
  }, []);

  //play all audio files
  const playAll = () => {
    if (window.innerWidth <= 615) {
      navigate(`${LECTURE}${albumlectures[0]?.nid}`);
    } else {
      dispatch(getaudioId(albumlectures[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(albumlectures));
    setinitial(false);
  };

  ///**** share album ******** */

  const shareAlbum = (e) => {
    //console.log("album id", id);
    e.stopPropagation();
    setisShare(!isShare);
  };

  useEffect(() => {
    leclistdet?.current.addEventListener("error", () => {
      const imgs = document.querySelectorAll("#hero");
      imgs.forEach((img) => {
        img.src = "https://imagetolink.com/ib/vwea8kukZP.jpeg";
      });
    });
  }, []);

  const lectureTitleExtractor = (title, position) => {
    // console.log({ title });
    if (!title) return;
    if (title && title.includes("-")) {
      const titleArray = title.split("-");
      if (titleArray.length >= 2 && position === 1) return titleArray[1];
      if (titleArray.length >= 2 && position === 2) return titleArray[2];
    }

    if (title) return title;
  };
  return (
    <Container>
      <HeadMeta
        title={`${
          lectureTitleExtractor(querieddata?.title, 2) || "Album"
        } on Dawah Nigeria - Home of islamic resources`}
      />

      {Array.isArray(querieddata) && (
        <div className="leclistdet_wrapper">
          {
            <img
              ref={leclistdet}
              id="hero"
              className={`${
                theme === "dark" ? "leclistdet_hero" : "leclistdet_hero_light"
              }`}
              src={
                querieddata[0]?.img ||
                "https://imagetolink.com/ib/vwea8kukZP.jpeg"
              }
              alt="audiohero"
            />
          }

          <div className="leclistdet_container">
            {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

            <div className="leclistdet_breadcrumb">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="leclistdet_breadcrumb_first"
              >
                Back/
              </button>
              <p className="leclistdet_breadcrumb_second text-foreground">
                {querieddata[0]?.title || "Unknown"}
              </p>
            </div>

            {/* -------------------Desktop----------------- Section 1 -------------------------------------- */}
            <div className="leclistdet_head_wrap">
              <div className="leclistdet_head_left">
                <img
                  className="leclistdet_head_left_img"
                  src={
                    querieddata[0]?.img ||
                    "https://imagetolink.com/ib/AEFQQC1ybX.jpeg"
                  }
                  ref={leclistdet}
                  id="hero"
                  alt="head"
                />
              </div>
              <div className="leclistdet_head_right">
                <p className="leclistdet_head_right_head text-foreground">
                  {lectureTitleExtractor(querieddata[0]?.title, 2)}
                </p>
                <div className="leclistdet_head_right_text">
                  <div className="rpimage_wrap">
                    <div className="rpimage_circle">
                      <img
                        className="rpimage_sz"
                        src={albumlectures[0]?.rp_image || lazy}
                        alt=""
                      />
                    </div>
                    <p className="leclistdet_head_right_text1 text-color">
                      {querieddata[0]?.rp_name}
                    </p>
                  </div>
                </div>

                <div className="leclistdet_head_right_actions_wrap">
                  <button
                    onClick={() => {
                      playAll();
                    }}
                    className="leclistdet_play"
                    id="player"
                  >
                    <CiPlay1 className="leclistdet_play_icon" />
                    <p className="leclistdet_play_text">Play All</p>
                  </button>

                  <DesktopFavoriteButton
                    favorites={querieddata[0]?.favorites}
                    id={id}
                    type={"album"}
                    refetch={refetch}
                  />
                  <div
                    onClick={(e) => {
                      shareAlbum(e, id);
                    }}
                    className="leclistdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]"
                  >
                  <SlShare className="text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]" />
                    <p className="leclistdet_share_text  text-color-primary">
                      {formatNumber(querieddata[0]?.share || 0)}
                    </p>
                  </div>
                  <div className="leclistdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                   <CommentIcon/>
                    <p className="leclistdet_comment_text  text-color-primary">
                      {formatNumber(querieddata[0]?.comments || 0)}
                    </p>
                  </div>
                  <AudioDownloadModal
                    downloads={querieddata[0]?.downloads}
                    nid={id}
                  />
                </div>
              </div>
            </div>
            <p className="leclistdet_head_right_text2 text-color">
              {" "}
              Audio
              <span className="braces text-color">
                (
                <span className="braces_text text-color">
                  {formatNumber(querieddata[0]?.lec_no || 0)}
                </span>
                )
              </span>
            </p>
            {/* ------------------------------------ mobile view -------------------------------------- */}

            <div className="leclistdet_head_mobile">
              <div
                className={
                  isVisible ? "leclistdet_head_img_none" : "leclistdet_head_img"
                }
              >
                <img
                  className="leclistdet_head_img_sz"
                  ref={leclistdet}
                  id="hero"
                  src={
                    querieddata[0]?.img ||
                    "https://imagetolink.com/ib/vwea8kukZP.jpeg"
                  }
                  alt="head"
                />
              </div>
              <div className="leclistdet_min_wrap">
                <div
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="mob_arrow"
                >
                  <img className="mob_arrow_sz" src={arrow} alt="arrow" />
                </div>
              </div>
            </div>
            {/* ----------------------------------- Section 1 ends -------------------------------------- */}
            {/* ---------------------desktop--------------- Section 2 -------------------------------------- */}

            {/********-----------------------mobile *-----------------****************** */}

            <div className="mobile_leclistdet_tab_wrap">
              <div ref={firstElement} className="mob_txt">
                <span className="album_img">
                  <img
                    ref={leclistdet}
                    id="hero"
                    className="album_img_sz"
                    src={
                      querieddata[0]?.img ||
                      "https://imagetolink.com/ib/vwea8kukZP.jpeg"
                    }
                    alt=""
                  />
                </span>

                <div className="mob_like">
                  <div className="leclistdet_head_mob_head">
                    {lectureTitleExtractor(querieddata[0]?.title, 2)}
                  </div>
                  <div className="rp_img_name">
                    <span className="likeys_img">
                      <img
                        className="likeys_img_sz"
                        ref={leclistdet}
                        id="hero"
                        src={
                          querieddata[0]?.img ||
                          "https://imagetolink.com/ib/eCnXEHHRos.jpeg"
                        }
                        alt=""
                      />
                    </span>
                    <span className="likeys_text">
                      {querieddata[0]?.categories}
                    </span>
                  </div>
                </div>
              </div>
              <div className="listrank_and_listblack_wrap">
                <div
                  className={
                    isVisible
                      ? "listranking_none"
                      : "listranking bg-black bg-opacity-50"
                  }
                >
                  <MobileFavoriteButton
                    favorites={querieddata[0]?.favorites}
                    id={id}
                    type={"album"}
                    refetch={refetch}
                  />
                  <div
                    onClick={(e) => {
                      shareAlbum(e);
                    }}
                    className="icons_mob_listblack"
                  >
                    <button className="likeys_img">
                      <img className="likeys_img_sz" src={sharebold} alt="" />
                    </button>
                    <span className="likeys_text">
                      {formatNumber(querieddata[0]?.share || 0)}
                    </span>
                  </div>
                  <div className="icons_mob_listblack">
                    <button className="likeys_img">
                      <img className="likeys_img_sz" src={combold} alt="" />
                    </button>
                    <span className="likeys_text">
                      {" "}
                      {formatNumber(querieddata[0]?.comments || 0)}
                    </span>
                  </div>
                </div>
                <div className={isVisible ? "headings pb-7" : "headings_none"}>
                  <div
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="fixed_mob_arrow"
                  >
                    <img className="fixed_mob_arrow_sz" src={arrow} alt="hun" />
                  </div>
                  <div className="fixed_text">
                    {" "}
                    {querieddata[0]?.categories}
                  </div>

                  <div className="fixed_bg_none"></div>
                  <div className="header_bg">
                    <img
                      className="img"
                      ref={leclistdet}
                      id="hero"
                      src={
                        querieddata[0]?.img ||
                        "https://imagetolink.com/ib/eCnXEHHRos.jpeg"
                      }
                      alt="head"
                    />
                  </div>
                </div>

                <div className="listblacks bg-secondary">
                  <div
                    className={
                      isVisible
                        ? "fixed_icons_listblack bg-secondary px-2 py-3"
                        : "icons_listblack bg-secondary py-3 px-2"
                    }
                  >
                    <div
                      id="player"
                      onClick={playAll}
                      className="play_header border-b border-[#cfcfcf] pb-2 w-full"
                    >
                      <div className="w-fit h-fit border border-color-primary dark:border-color-primary border-gray-500 p-[2px] rounded-full">
                        <BsFillPlayFill className="text-[22px] dark:text-color-primary text-gray-500" />
                      </div>

                      <p className="dark:text-color-primary text-gray-500 font-medium">
                        Play All
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------ Section 2 ends -------------------------------------- */}
            {/* ------------------------------------ Section 3 -------------------------------------- */}
            <div className="desktop_color_vid"> </div>
            {/* ------------------------------------ Section 3 ends -------------------------------------- */}

            <div className="lecsong_wrapper bg-secondary">
              <div className="lect_title_wrap">
                <div className="lect_title1">
                  <p className="lect_hash">#</p>
                  <p>Title</p>
                </div>
                <p className="lect_title2">
                  <span>Lecturer</span>
                </p>

                <p className="lect_title4">
                  <span>Time</span>
                </p>
              </div>
              {isLoading && (
                <div className="loads">
                  <div className="load">
                    <Loader />
                  </div>
                </div>
              )}
              <div className="lecsong_content">
                {!isLoading &&
                  Array.isArray(albumlectures) &&
                  albumlectures.map(
                    (
                      {
                        lectitle,
                        Title,
                        title,
                        img,
                        rp,
                        duration,
                        rpname,
                        lec_img,
                        mp3_thumbnail,
                        rp_id,
                        cats,
                        nid,
                        share,
                        views,
                        favorites,
                        comments,
                      },
                      idx
                    ) => {
                      return (
                        <div key={idx} className="lecsong_content_item">
                          <div className="desktops_item">
                            <MusicList
                              key={idx}
                              id={idx}
                              title={lectitle || title}
                              lecturer={querieddata?.rp_name || rp}
                              image={mp3_thumbnail || lec_img || img}
                              url={`${LECTURE}${nid}`}
                              rpid={rp_id}
                              Title={Title || lectitle || title}
                              share={share}
                              rpname={querieddata?.rp_name || rp}
                              cats={cats}
                              comments={comments}
                              favorites={favorites}
                              nid={nid}
                              navName={"Back"}
                              navLink={-1}
                              controlData={albumlectures}
                              duration={duration}
                              views={views}
                            />
                          </div>
                          <div className="mobile_item ">
                            <MobileList
                              key={idx}
                              id={idx}
                              title={lectitle || title}
                              lecturer={rpname || rp}
                              image={mp3_thumbnail || lec_img || img}
                              url={`${LECTURE}${nid}`}
                              Title={Title || lectitle || title}
                              rpname={rpname || rp}
                              cats={cats}
                              nid={nid}
                              rpid={rp_id}
                              comments={comments}
                              favorites={favorites}
                              navName={"Back"}
                              navLink={-1}
                              controlData={albumlectures}
                              duration={duration}
                              views={views}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>

            <div className="px-3">
              <SimilarAudio
                similar={similarAlbums}
                current={querieddata?.rp_id}
                url={`/a`}
                type={"album"}
                endpoint_url={`/albumlisting_rp.php?offset=30&lim=10&rpid=${querieddata?.rp_id}&page=`}
                currentPage={1}
                navtitle={"Album"}
                heading={`Similar albums
                    
              `}
              />

              <CommentBox audioComment={audioComment} id={id} type={"album"} />
            </div>

            <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
              <ShareAudio
                isShare={isShare}
                setisShare={setisShare}
                nid={id}
                type={"album"}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default LecturesListDetail;
