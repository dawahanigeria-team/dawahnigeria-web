import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import "./lecturer_detail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams } from "react-router-dom";
import LecturerSongs from "../lecturer_subs/lecturer_songs/Lecturer_songs";
import LecturerAlbum from "../lecturer_subs/lecturer_albums/Lecturer_album";
import LecturerPlaylist from "../lecturer_subs/lecturer_playlist/Lecturer_playlist";
import arrow from "../../assets/svg/arrowleft.svg";
import headpmobile from "../../assets/svg/headpmobile.svg";
import Simillarrp from "../lecturer_subs/simillarrp/Simillarrp";
import combold from "../../assets/svg/combold.svg";
import { SlShare } from "react-icons/sl";
import { BiSolidShareAlt } from "react-icons/bi";
import commentbig from "../../../src/assets/svg/boom-comment.svg";
import { formatNumber } from "../UI/formatter";
import lazy from "../../assets/png/lazyrps.jpeg";
import ShareAudio from "../shareaudio/shareAudio";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lecturerDetailApi } from "../../services";
import { DesktopFavoriteButton } from "../UI/favoritebuttons/desktopfavoriteButtons";
import { MobileFavoriteButton } from "../UI/favoritebuttons/mobilefavoriteButton";

import HeadMeta from "../head-meta";
import { useSelector } from "react-redux";
import { CommentIcon } from "../svgcomponent/svgComponent";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { getBackNavigationConfig } from "../../utils/navigation";

const LecturerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const observeEl = useRef();
  const lecdet = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isShare, setisShare] = useState(false);
  const { theme } = useSelector((state) => state.user);
  const handleBack = () => {
    const { to, options } = getBackNavigationConfig("/dawahcast/lecturers");
    navigate(to, options);
  };

  const queryParam = { id };


  const { querieddata, refetch } = useQueryGetRequest(
    "lecturer-detail",
    queryParam,
    lecturerDetailApi.getLecturerById
  );

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

  ///**** share rp ******** */

  const shareRp = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  ///////
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#lecdet");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.albumWidget;
        });
      });
    }

    lazyImage();
  }, []);

  useEffect(() => {
    if (lecdet.current) {
      lecdet?.current.addEventListener("error", () => {
        const imgs = document.querySelectorAll("#hero");
        imgs.forEach((img) => {
          img.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
  }, [lecdet.current]);

  return (
    <Container>
      <HeadMeta
        title={`${
          querieddata[0]?.name || "Lecturer"
        } on Dawah Nigeria - Home of islamic resources`}
      />
      {Array.isArray(querieddata) && (
        <div className="lecdet_wrapper">
          <img
            ref={lecdet}
            id="hero"
            className={`${
              theme === "dark" ? "lecdet_hero" : "lecdet_hero_light"
            }`}
            src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
            alt="audiohero"
          />
          <div className="lecdet_container">
            {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

            <div className="lecdet_breadcrumb">
              <p
                onClick={handleBack}
                className="lecdet_breadcrumb_first"
              >
                {`${"Back"}/`}
              </p>
              <p className="lecdet_breadcrumb_second text-foreground">
                {querieddata[0]?.name || querieddata[0]?.name}
              </p>
            </div>

            {/* -------------------Desktop----------------- Section 1 -------------------------------------- */}
            <div className="lecdet_head_wrap">
              <div className="lecdet_head_left">
                <img
                  ref={lecdet}
                  id="hero"
                  className="lecdet_head_left_img"
                  src={querieddata[0]?.img || lazy}
                  alt="head"
                />
              </div>
              <div className="lecdet_head_right">
                <p className="lecdet_head_right_head text-foreground">
                  {querieddata[0]?.name || querieddata[0]?.name}
                </p>

                <div className="lecdet_head_right_actions_wrap">
                  <DesktopFavoriteButton
                    favorites={querieddata[0]?.favorites}
                    id={id}
                    type={"rp"}
                    refetch={refetch}
                  />
                  <div
                    onClick={(e) => {
                      shareRp(e, id);
                    }}
                    className="lecdet_share bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d]"
                  >
                    <button className="fav_btn ">
                      <SlShare className="text-color-primary hover:text-color-foreground dark:hover:text-[#ddff2b] text-[20px]" />
                    </button>

                    <p className="lecdet_share_text text-color-primary">
                      {formatNumber(querieddata[0]?.share || 0)}
                    </p>
                  </div>
                  <div className="lecdet_comment bg-gray-100  dark:bg-[#ffffff17] dark:hover:bg-[#ffffff2d] ">
                    <CommentIcon />
                    <p className="lecdet_comment_text text-color-primary">
                      {formatNumber(querieddata[0]?.comments || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/******************************* */}

            <div className="lecdet_tab_wrap">
              <div className="lecdet_tab">
                <div
                  onClick={() => {
                    setTab(1);
                  }}
                  className="lecdet_tab_song"
                >
                  <p
                    className={`${
                      tab === 1
                        ? "lecdet_tab_song1_active text-foreground"
                        : "lecdet_tab_song1"
                    }`}
                  >
                    Audio
                  </p>
                  <p
                    className={`${
                      tab === 1
                        ? "lecdet_tab_song2_active text-color"
                        : "lecdet_tab_song2"
                    }`}
                  >
                    {/* {`(${count1})`} */}({querieddata[0]?.total_audio || 0})
                  </p>
                </div>
                <div
                  onClick={() => {
                    setTab(2);
                  }}
                  className="lecdet_tab_album"
                >
                  <p
                    className={`${
                      tab === 2
                        ? "lecdet_tab_album1_active text-foreground"
                        : "lecdet_tab_album1"
                    }`}
                  >
                    Album
                  </p>
                  <p
                    className={`${
                      tab === 2
                        ? "lecdet_tab_album2_active text-color"
                        : "lecdet_tab_album2"
                    }`}
                  >
                    ({querieddata[0]?.total_albums || 0})
                  </p>
                </div>
                <div
                  onClick={() => {
                    setTab(3);
                  }}
                  className="lecdet_tab_playlist"
                >
                  <p
                    className={`${
                      tab === 3
                        ? "lecdet_tab_playlist1_active text-foreground"
                        : "lecdet_tab_playlist1 "
                    }`}
                  >
                    Playlist
                  </p>
                  
                </div>
              </div>
            </div>

            {/* ------------------------------------ mobile view -------------------------------------- */}

            <div className="lecdet_head_mobile">
              <div
                className={
                  isVisible ? "lecdet_head_img_none" : "lecdet_head_img"
                }
              >
                <img
                  ref={lecdet}
                  id="hero"
                  className="lecdet_head_img_sz"
                  src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                  alt="head"
                />
              </div>
              <div className="lectdet_min_wrap">
                <div
                  onClick={handleBack}
                  className="mob_arrow"
                >
                  <img className="mob_arrow_sz" src={arrow} alt="hun" />
                </div>
              </div>
            </div>
            {/* ----------------------------------- Section 1 ends -------------------------------------- */}
            {/* ---------------------desktop--------------- Section 2 -------------------------------------- */}

            {/********-----------------------mobile *-----------------****************** */}

            <div className="mobile_lecdet_tab_wrap">
              <div ref={firstElement} className="mob_txt">
                <div className="lecdet_head_mob_head">
                  {querieddata[0]?.name}
                </div>
                <div className="mob_like">
                  <span className="likeys_img">
                    <img className="likeys_img_sz" src={headpmobile} alt="" />
                  </span>
                  <span className="likeys_text">
                    {formatNumber(querieddata[0]?.views || 0)}
                  </span>
                </div>
              </div>
              <div className="rank_and_black_wrap">
                <div className={isVisible ? "ranking_none" : "ranking"}>
                  <div className="ranks">
                    <span className="num_rank"></span>
                    <span className="text_rank"></span>
                  </div>
                  <div className="ranks">
                    <span className="num_rank"></span>
                    <span className="text_rank"></span>
                  </div>
                </div>
                <div className={isVisible ? "headings pb-7" : "headings_none"}>
                  <div
                    onClick={handleBack}
                    className="fixed_mob_arrow"
                  >
                    <img className="fixed_mob_arrow_sz" src={arrow} alt="hun" />
                  </div>
                  <div className="fixed_text text-center ">{`${
                    querieddata[0]?.name?.split(" ")[0] || ""
                  } ${querieddata[0]?.name?.split(" ")[1]} ${
                    querieddata[0]?.name?.split(" ")[2] || ""
                  } ${querieddata[0]?.name?.split(" ")[3] || ""}`}</div>

                  <div className="fixed_bg_none"></div>
                  <div className="header_bg">
                    <img
                      className="img"
                      ref={lecdet}
                      id="hero"
                      src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
                      alt="head"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="blacks bg-secondary">
              <div
                className={
                  isVisible
                    ? "fixed_icons_black bg-secondary"
                    : "icons_black bg-secondary"
                }
              >
                <MobileFavoriteButton
                  favorites={querieddata[0]?.favorites}
                  id={id}
                  type={"rp"}
                  refetch={refetch}
                />
                <div
                  onClick={(e) => {
                    shareRp(e, id);
                  }}
                  className="icons_mob_listblack"
                >
                  <button className="likeys_img">
                    <BiSolidShareAlt className="text-xl " />
                  </button>
                  <span className="likeys_text ">
                    {formatNumber(querieddata[0]?.share || 0)}
                  </span>
                </div>
                <div className="icons_mob_listblack">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={combold} alt="" />
                  </button>
                  <span className="likeys_text">
                    {formatNumber(querieddata[0]?.comments || 0)}
                  </span>
                </div>
              </div>

              <div className="mobile_lecdet_tab">
                <div
                  onClick={() => setTab(1)}
                  className="mobile_lecdet_tab_song"
                >
                  <p
                    className={`${
                      tab === 1
                        ? "mobile_lecdet_tab_song1_active text-foreground"
                        : "mobile_lecdet_tab_song1"
                    }`}
                  >
                    Audio
                  </p>
                  <p
                    className={`${
                      tab === 1
                        ? "mobile_lecdet_tab_song2_active text-color"
                        : "mobile_lecdet_tab_song2"
                    }`}
                  >
                    ({querieddata[0]?.total_audio || 0})
                  </p>
                </div>
                <div
                  onClick={() => setTab(2)}
                  className="mobile_lecdet_tab_album"
                >
                  <p
                    className={`${
                      tab === 2
                        ? "mobile_lecdet_tab_album1_active text-foreground"
                        : "mobile_lecdet_tab_album1"
                    }`}
                  >
                    Album
                  </p>
                  <p
                    className={`${
                      tab === 2
                        ? "mobile_lecdet_tab_album1_active text-color"
                        : "mobile_lecdet_tab_album1"
                    }`}
                  >
                    ({querieddata[0]?.total_albums || 0})
                  </p>
                </div>
                <div
                  onClick={() => setTab(3)}
                  className="mobile_lecdet_tab_playlist"
                >
                  <p
                    className={`${
                      tab === 3
                        ? "mobile_lecdet_tab_playlist1_active text-foreground"
                        : "mobile_lecdet_tab_playlist1"
                    }`}
                  >
                    Playlist
                  </p>
                  <p
                    className={`${
                      tab === 3
                        ? "mobile_lecdet_tab_playlist1_active text-color"
                        : "mobile_lecdet_tab_playlist1"
                    }`}
                  >
                    ({querieddata[0]?.total_playlist || 0})
                  </p>
                </div>

                
              </div>

              <div className="mobile_color_vid bg-secondary">
                {tab === 1 && (
                  <LecturerSongs
                    rpname={querieddata[0]?.name}
                    id={id}
                    totalData={querieddata[0]?.total_audio}
                  />
                )}
                {tab === 2 && (
                  <LecturerAlbum
                    rpname={querieddata[0]?.name}
                    id={id}
                    totalData={querieddata[0]?.total_albums}
                  />
                )}
                {tab === 3 && (
                  <LecturerPlaylist
                    rpname={querieddata[0]?.name}
                    id={id}
                    totalData={querieddata[0]?.total_playlist}
                  />
                )}

                {tab === 5 && <Simillarrp langid={querieddata[0]?.lang_id} />}
              </div>
            </div>

            {/* ------------------------------------ Section 2 ends -------------------------------------- */}
            {/* ------------------------------------ Section 3 -------------------------------------- */}
            <div className="desktop_color_vid">
              {tab === 1 && (
                <LecturerSongs
                  rpname={querieddata[0]?.name}
                  id={id}
                  totalData={querieddata[0]?.total_audio}
                />
              )}
              {tab === 2 && (
                <LecturerAlbum
                  rpname={querieddata[0]?.name}
                  rpImg={querieddata[0]?.img}
                  id={id}
                  totalData={querieddata[0]?.total_albums}
                />
              )}
              {tab === 3 && (
                <LecturerPlaylist
                  rpname={querieddata[0]?.name}
                  id={id}
                  totalData={querieddata[0]?.total_playlist}
                />
              )}

              {tab === 5 && <Simillarrp langid={querieddata[0]?.lang_id} />}
            </div>
            {/* ------------------------------------ Section 3 ends -------------------------------------- */}
          </div>
          <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
            <ShareAudio
              isShare={isShare}
              setisShare={setisShare}
              nid={id}
              type={"rp"}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default LecturerDetail;
