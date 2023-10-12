import React, { useState, useCallback, useRef, useEffect } from "react";
import "./lecturer_detail.scss";
import Container from "../../components/container/Container";
import { useNavigate, useParams } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import LecturerSongs from "../lecturer_subs/lecturer_songs/Lecturer_songs";
import LecturerAlbum from "../lecturer_subs/lecturer_albums/Lecturer_album";
import LecturerPlaylist from "../lecturer_subs/lecturer_playlist/Lecturer_playlist";
import arrow from "../../assets/svg/arrowleft.svg";
import headpmobile from "../../assets/svg/headpmobile.svg";
import Simillarrp from "../lecturer_subs/simillarrp/Simillarrp";
import sharebold from "../../assets/svg/sharebold.svg";
import adfav from "../../../src/assets/svg/adfav.svg";
import combold from "../../assets/svg/combold.svg";
import sharebig from "../../../src/assets/svg/boom-share.svg";
import commentbig from "../../../src/assets/svg/boom-comment.svg";
import favbig from "../../../src/assets/svg/boom-fav.svg";
import lovebold from "../../assets/svg/lovebold.svg";
import { formatNumber } from "../UI/formatter";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../utils/useAxios";
import lazy from "../../assets/png/lazyrps.jpeg";
import ShareAudio from "../shareaudio/shareAudio";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { lecturerDetailApi } from "../../services";

const LecturerDetail = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const observeEl = useRef();
  const lecdet = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [choice, setChoice] = useState("Audio");
  const [isShare, setisShare] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [sumofFav, setsumofFav] = useState();
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const queryParam = {id}

  const [, setImg] = useState(
    "https://backend.dawahnigeria.com/sites/default/files/600-800/700.jpg"
  );



  const {querieddata} = useQueryGetRequest("lecturer-detail",queryParam, lecturerDetailApi.getLecturerById )

  /////get users favorites
  async function fetchFavorites(addFav, rpid) {
    if (!currentUser?.id) return;
    if (addFav || (!addFav && rpid)) {
      //console.log("..........@@@@@@@@@@@@@");
      await axios
        .get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=rp`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        })
        .then((res) => {
          //console.log(res.data);
          const { rp } = res.data;
          setgetfavs(rp);
          /**
         const isExist = rp.includes(parseInt(id));
          //console.log(isExist);
          if (isExist) {
            //console.log(id);
          }
          */
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }
  useEffect(() => {
    fetchFavorites(addFav, id);
  }, [addFav, id]);

  const addToFav = async (e, rpid) => {
    /// add to favorites
    e.stopPropagation();
    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: rpid,
      type: "rp",
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
        setdisabled(false);
        //console.log(addFav);
        if (!getFavs?.includes(parseInt(rpid))) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {
        //console.log(err);
      });
  };
  // //console.log("fav", getFavs);
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
          im.src = "https://imagetolink.com/ib/CQZFhVqz5o.jpeg";
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
          img.src = "https://imagetolink.com/ib/9TU6bi2SDs.jpeg";
        });
      });
    }
  
  }, [lecdet.current]);

  return (
    <Container>
      {Array.isArray(querieddata) && <div className="lecdet_wrapper">
        <img
          ref={lecdet}
          id="hero"
          className="lecdet_hero"
          src={querieddata[0]?.img || "https://imagetolink.com/ib/9TU6bi2SDs.jpeg"}
          alt="audiohero"
        />
        <div className="lecdet_container">
          {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

          <div className="lecdet_breadcrumb">
            <p
              onClick={() => {
                navigate(-1);
              }}
              className="lecdet_breadcrumb_first"
            >
              {`${"Back"}/`}
            </p>
            <p className="lecdet_breadcrumb_second">
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
              <p className="lecdet_head_right_head">
                {querieddata[0]?.name || querieddata[0]?.name}
              </p>

              <div className="lecdet_head_right_actions_wrap">
                <div className="lecdet_fav">
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
                    {getFavs?.includes(parseInt(id)) ? (
                      <MdFavorite className="lecdet_fav_icon_active" />
                    ) : (
                      <img src={favbig} alt="" className="lecdet_fav_icon" />
                    )}
                  </button>

                  <p className="lecdet_fav_text">
                    {formatNumber(querieddata[0]?.favorites || 0)}
                  </p>
                </div>
                <div
                  onClick={(e) => {
                    shareRp(e, id);
                  }}
                  className="lecdet_share"
                >
                  <button className="fav_btn">
                    <img src={sharebig} alt="" className="lecdet_share_icon" />
                  </button>

                  <p className="lecdet_share_text">
                    {formatNumber(querieddata[0]?.share || 0)}
                  </p>
                </div>
                <div className="lecdet_comment">
                  <img
                    src={commentbig}
                    alt=""
                    className="lecdet_comment_icon"
                  />
                  <p className="lecdet_comment_text">
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
                    tab === 1 ? "lecdet_tab_song1_active" : "lecdet_tab_song1"
                  }`}
                >
                  Audio
                </p>
                <p
                  className={`${
                    tab === 1 ? "lecdet_tab_song2_active" : "lecdet_tab_song2"
                  }`}
                >{`(${count1})`}</p>
              </div>
              <div
                onClick={() => {
                  setTab(2);
                }}
                className="lecdet_tab_album"
              >
                <p
                  className={`${
                    tab === 2 ? "lecdet_tab_album1_active" : "lecdet_tab_album1"
                  }`}
                >
                  Album
                </p>
                <p
                  className={`${
                    tab === 2 ? "lecdet_tab_album2_active" : "lecdet_tab_album2"
                  }`}
                >{`(${count2})`}</p>
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
                      ? "lecdet_tab_playlist1_active"
                      : "lecdet_tab_playlist1"
                  }`}
                >
                  Playlist
                </p>
                <p
                  className={`${
                    tab === 3
                      ? "lecdet_tab_playlist2_active"
                      : "lecdet_tab_playlist2"
                  }`}
                >{`(${count3})`}</p>
              </div>

              <div
                onClick={() => {
                  setTab(5);
                }}
                className="lecdet_tab_simrp"
              >
                <p
                  className={`${
                    tab === 5 ? "lecdet_tab_simrp1_active" : "lecdet_tab_simrp1"
                  }`}
                >
                  Similar RP
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------------ mobile view -------------------------------------- */}

          <div className="lecdet_head_mobile">
            <div
              className={isVisible ? "lecdet_head_img_none" : "lecdet_head_img"}
            >
              <img
                ref={lecdet}
                id="hero"
                className="lecdet_head_img_sz"
                src={
                  querieddata[0]?.img ||
                  "https://imagetolink.com/ib/9TU6bi2SDs.jpeg"
                }
                alt="head"
              />
            </div>
            <div className="lectdet_min_wrap">
              <div
                onClick={() => {
                  navigate(-1);
                }}
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
              <div className="lecdet_head_mob_head">{querieddata[0]?.name}</div>
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
                  onClick={() => {
                    navigate(-1);
                  }}
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
                    src={
                      querieddata[0]?.img ||
                      "https://imagetolink.com/ib/9TU6bi2SDs.jpeg"
                    }
                    alt="head"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="blacks">
            <div className={isVisible ? "fixed_icons_black" : "icons_black"}>
              <div className="icons_mob_black">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFav(e, id);
                    fetchFavorites(addFav, id);
                    setaddFav(!addFav);
                    setdisabled(true);
                  }}
                  className="likeys_img"
                  disabled={isdisabled}
                >
                  {getFavs?.includes(parseInt(id)) ? (
                    <img className="likeys_img_sz" src={adfav} alt="" />
                  ) : (
                    <img className="likeys_img_sz" src={lovebold} alt="" />
                  )}
                </button>
                <span className="likeys_text">
                  {formatNumber(sumofFav || 0)}
                </span>
              </div>
              <div
                onClick={(e) => {
                  shareRp(e, id);
                }}
                className="icons_mob_black"
              >
                <button className="likeys_img">
                  <img className="likeys_img_sz" src={sharebold} alt="" />
                </button>
                <span className="likeys_text">
                  {formatNumber(querieddata[0]?.share || 0)}
                </span>
              </div>
              <div className="icons_mob_black">
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
                onClick={() => {
                  setTab(1);
                  setChoice("Audio");
                }}
                className="mobile_lecdet_tab_song"
              >
                <p
                  className={`${
                    tab === 1
                      ? "mobile_lecdet_tab_song1_active"
                      : "mobile_lecdet_tab_song1"
                  }`}
                >
                  Audio
                </p>
                <p
                  className={`${
                    tab === 1
                      ? "mobile_lecdet_tab_song2_active"
                      : "mobile_lecdet_tab_song2"
                  }`}
                >{`(${count1})`}</p>
              </div>
              <div
                onClick={() => {
                  setTab(2);
                  setChoice("Albums");
                }}
                className="mobile_lecdet_tab_album"
              >
                <p
                  className={`${
                    tab === 2
                      ? "mobile_lecdet_tab_album1_active"
                      : "mobile_lecdet_tab_album1"
                  }`}
                >
                  Album
                </p>
                <p
                  className={`${
                    tab === 2
                      ? "mobile_lecdet_tab_album2_active"
                      : "mobile_lecdet_tab_album2"
                  }`}
                >{`(${count2})`}</p>
              </div>
              <div
                onClick={() => {
                  setTab(3);
                  setChoice("Playlist");
                }}
                className="mobile_lecdet_tab_playlist"
              >
                <p
                  className={`${
                    tab === 3
                      ? "mobile_lecdet_tab_playlist1_active"
                      : "mobile_lecdet_tab_playlist1"
                  }`}
                >
                  Playlist
                </p>
                <p
                  className={`${
                    tab === 3
                      ? "mobile_lecdet_tab_playlist2_active"
                      : "mobile_lecdet_tab_playlist2"
                  }`}
                >{`(${count3})`}</p>
              </div>

              <div
                onClick={() => {
                  setTab(5);
                  setChoice("Similar RP");
                }}
                className="mobile_lecdet_tab_simrp"
              >
                <p
                  className={`${
                    tab === 5
                      ? "mobile_lecdet_tab_simrp1_active"
                      : "mobile_lecdet_tab_simrp1"
                  }`}
                >
                  Similar
                </p>
                <p
                  className={`${
                    tab === 5
                      ? "mobile_lecdet_tab_simrp2_active"
                      : "mobile_lecdet_tab_simrp2"
                  }`}
                >
                  RP
                </p>
              </div>
            </div>

            <div className="set_choice">
              <span>{choice}</span>
              <span className="nums">{tab === 1 ? `(${count1})` : false}</span>
              <span className="nums">{tab === 2 ? `(${count2})` : false}</span>
              <span className="nums">{tab === 3 ? `(${count3})` : false}</span>
            </div>

            <div className="mobile_color_vid">
              {tab === 1 && (
                <LecturerSongs
                  rpname={querieddata[0]?.name}
                  id={id}
                  setCount1={setCount1}
                  count1={count1}
                  setImg={setImg}
                />
              )}
              {tab === 2 && (
                <LecturerAlbum
                  rpname={querieddata[0]?.name}
                  id={id}
                  setCount2={setCount2}
                  count2={count2}
                  setImg={setImg}
                />
              )}
              {tab === 3 && (
                <LecturerPlaylist
                  rpname={querieddata[0]?.name}
                  id={id}
                  setCount3={setCount3}
                  count3={count3}
                  setImg={setImg}
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
                setCount1={setCount1}
                count1={count1}
              />
            )}
            {tab === 2 && (
              <LecturerAlbum
                rpname={querieddata[0]?.name}
                rpImg={querieddata[0]?.img}
                id={id}
                setCount2={setCount2}
                count2={count2}
              />
            )}
            {tab === 3 && (
              <LecturerPlaylist
                rpname={querieddata[0]?.name}
                id={id}
                setCount3={setCount3}
                count3={count3}
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
      </div>}
    </Container>
  );
};

export default LecturerDetail;
