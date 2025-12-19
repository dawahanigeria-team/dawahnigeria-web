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
import { BsFillPlayFill } from "react-icons/bs";
import combold from "../../assets/svg/combold.svg";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import "./lecturesListDetail.scss";
import { MdFavorite } from "react-icons/md";
import MusicList from "../../components/miscList/musicList";
import MobileList from "../../components/list/mobileList";
import Loader from "../../components/UI/loader/loader";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import sharebig from "../../../src/assets/svg/boom-share.svg";
import commentbig from "../../../src/assets/svg/boom-comment.svg";
import favbig from "../../../src/assets/svg/boom-fav.svg";
import { formatNumber } from "../../components/UI/formatter";
import { useSelector, useDispatch } from "react-redux";
import useaxios from "../../utils/useAxios";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import CommentBox from "../../components/comment/comment";
import SimilarAudio from "../../components/similaraudio/similarAudio";
import ShareAudio from "../../components/shareaudio/shareAudio";
import { useQueryGetRequest } from "../../hooks/getqueries";
import {
  getaudioId,
  getCount,
  getPack,
} from "../../Redux/Actions/ActionCreators";
import { LECTURE } from "../../utils/routes/constants";
import { AudioContext } from "../../App";
import { playlistdetailApi } from "../../services/playlistdetail.service";
import { useAllPlaylistHook, usePlaylistLectures } from "../../hooks/playlists";
import { DesktopFavoriteButton } from "../../components/UI/favoritebuttons/desktopfavoriteButtons";
import { MobileFavoriteButton } from "../../components/UI/favoritebuttons/mobilefavoriteButton";

import HeadMeta from "../../components/head-meta";
import { CommentIcon } from "../../components/svgcomponent/svgComponent";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { SlShare } from "react-icons/sl";

const PlaylistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentUser, theme } = useSelector((state) => state.user);
  const observeEl = useRef();
  const { setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [audioComment, setaudioComment] = useState();
  const queryParam = { id };

  const { querieddata, isLoading, refetch } = useQueryGetRequest(
    "playlist-details",
    queryParam,
    playlistdetailApi.getPlaylistData
  );

  const keyParam = { multiId: querieddata[0]?.audio?.toString() || null };

  const { querieddata: playlistlectures } = usePlaylistLectures(
    "playlist-lectures",
    keyParam,
    playlistdetailApi.getPlaylistLectures
  );

  const { data: similarPlaylists } = useAllPlaylistHook();

  //////*************handling comment**************** */

  useEffect(() => {
    if (!currentUser?.id) return;

    useaxios
      .get(
        `/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=playlist`,
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
  }, [id]);

  /// Get the exiting element
  const firstElement = useCallback((node) => {
    observeEl.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
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
      navigate(`${LECTURE}${querieddata[0]?.nid}`);
    } else {
      dispatch(getaudioId(querieddata[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(querieddata));
    setinitial(false);
  };

  ///**** share album ******** */

  const sharePlaylist = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  ///////
  useEffect(() => {
    const lazy = document.querySelectorAll("#detail");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
    });
  }, []);

  return (
    <Container>
      <HeadMeta
        title={`${
          querieddata[0]?.name || "Playlist"
        } on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="leclistdet_wrapper">
        <img
          // ref={lecdet}
          id="hero"
          className={`${
            theme === "dark" ? "leclistdet_hero" : "leclistdet_hero_light"
          }`}
          src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
          alt="audiohero"
        />

        <div className="leclistdet_container">
          {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

          <div className="leclistdet_breadcrumb">
            <p
              onClick={() => {
                navigate(-1);
              }}
              className="leclistdet_breadcrumb_first"
            >
              Back/
            </p>
            <p className="leclistdet_breadcrumb_second text-foreground">
              {querieddata[0]?.name || "Unknown"}
            </p>
          </div>

          {/* -------------------Desktop----------------- Section 1 -------------------------------------- */}
          <div className="leclistdet_head_wrap">
            <div className="leclistdet_head_left">
              <img
                className="leclistdet_head_left_img"
                src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                alt="head"
              />
            </div>
            <div className="leclistdet_head_right">
              <p className="leclistdet_head_right_head text-foreground">
                {querieddata[0]?.name || "Unknown"}
              </p>

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
                  type={"playlist"}
                  refetch={refetch}
                />
                <div
                  onClick={(e) => {
                    sharePlaylist(e, id);
                  }}
                  className="leclistdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]"
                >
                  <SlShare className="text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]" />
                  <p className="leclistdet_share_text text-color-primary">
                    {formatNumber(0)}
                  </p>
                </div>
                <div className="leclistdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]">
                  <CommentIcon />
                  <p className="leclistdet_comment_text text-color-primary">
                    {formatNumber(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="leclistdet_head_right_text2 text-color">
            {`${querieddata[0]?.name || "Unknown"}`}
            <span className="braces text-color">
              (
              <span className="text-color braces_text">
                {playlistlectures?.length}
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
                src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
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
                  className="album_img_sz"
                  src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                  alt=""
                />
              </span>

              <div className="mob_like">
                <div className="leclistdet_head_mob_head">
                  {querieddata[0]?.name || "Unknown"}
                </div>
                {/**
                 
                 */}
                <div className="rp_img_name">
                  <span className="likeys_img">
                    <img
                      className="likeys_img_sz"
                      src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                      alt=""
                    />
                  </span>
                  <span className="likeys_text">{"--"}</span>
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
                  type={"playlist"}
                  refetch={refetch}
                />
                <div
                  onClick={(e) => {
                    sharePlaylist(e);
                  }}
                  className="icons_mob_listblack"
                >
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={sharebold} alt="" />
                  </button>
                  <span className="likeys_text">{formatNumber(0)}</span>
                </div>
                <div className="icons_mob_listblack">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={combold} alt="" />
                  </button>
                  <span className="likeys_text"> {formatNumber(0)}</span>
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
                <div className="fixed_text"> {querieddata[0]?.name}</div>

                <div className="fixed_bg_none"></div>
                <div className="header_bg">
                  <img
                    className="img"
                    src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                    alt="head"
                  />
                </div>
              </div>

              <div className="listblacks">
                <div
                  className={
                    isVisible
                      ? "fixed_icons_listblack p-3"
                      : "icons_listblack p-3"
                  }
                >
                  <button
                    id="player"
                    onClick={playAll}
                    className="play_header pb-2 w-full"
                  >
                    <div className="w-fit h-fit border border-color-primary dark:border-color-primary border-gray-500 p-[2px] rounded-full">
                      <BsFillPlayFill className="text-[22px] dark:text-color-primary text-gray-500" />
                    </div>

                    <p className="dark:text-color-primary text-gray-500 font-medium">
                      Play All
                    </p>
                  </button>
                </div>

                <div className="mobile_color_vid"></div>
              </div>
            </div>
          </div>
          {/* ------------------------------------ Section 2 ends -------------------------------------- */}
          {/* ------------------------------------ Section 3 -------------------------------------- */}
          <div className="desktop_color_vid"> </div>
          {/* ------------------------------------ Section 3 ends -------------------------------------- */}

          <div className="lecsong_wrapper">
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
            {!isLoading && querieddata[0]?.audio?.length === 0 && (
              <div className="text-gray-200 no_playlist flex items-center justify-center w-full h-[200px]">
                <span>-- no lecture in playlist --</span>
              </div>
            )}
            <div className="lecsong_content">
              {!isLoading &&
                querieddata[0]?.audio?.length !== 0 &&
                Array.isArray(playlistlectures) &&
                playlistlectures?.map(
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
                            lecturer={rpname || rp}
                            image={lec_img || img}
                            url={`${LECTURE}${nid}`}
                            rpid={rp_id}
                            Title={Title || lectitle || title}
                            share={share}
                            rpname={rpname || rp}
                            cats={cats}
                            comments={comments}
                            favorites={favorites}
                            nid={nid}
                            navName={"Back"}
                            navLink={-1}
                            controlData={playlistlectures}
                            duration={duration}
                            views={views}
                          />
                        </div>
                        <div className="mobile_item">
                          <MobileList
                            key={idx}
                            id={idx}
                            title={lectitle || title}
                            lecturer={rpname || rp}
                            image={lec_img || img}
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
                            controlData={playlistlectures}
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
              similar={similarPlaylists}
              current={id}
              url={`/pl`}
              type={"playlist"}
              navtitle={"Playlist"}
              heading={`Similar Playlist`}
            />

            <CommentBox audioComment={audioComment} id={id} type={"playlist"} />
          </div>

          <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
            <ShareAudio
              isShare={isShare}
              setisShare={setisShare}
              nid={id}
              type={"playlist"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaylistDetail;
