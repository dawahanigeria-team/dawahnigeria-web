import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import Container from "../../components/container/Container";
import axios from "axios";
import arrow from "../../assets/svg/arrowleft.svg";
import headpmobile from "../../assets/svg/headpmobile.svg";
import sharebold from "../../assets/svg/sharebold.svg";
import adfav from "../../../src/assets/svg/adfav.svg";
import combold from "../../assets/svg/combold.svg";
import lovebold from "../../assets/svg/lovebold.svg";
import { CiPlay1 } from "react-icons/ci";
import download from "../../../src/assets/svg/boom-download.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./lecturesListDetail.scss";
import audioHero from "../../assets/png/detialPagehero.png";
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
import lazysong from "../../assets/png/lazysong.jpeg";
import { toast } from "react-hot-toast";
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
const LecturesListDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [similarAlb, setsimilarAlb] = useState([]);
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const observeEl = useRef();
  const leclistdet = useRef();
  const { setinitial } = useContext(AudioContext);
  const [sumofFav, setsumofFav] = useState();
  const [isShare, setisShare] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [singleData, setsingleData] = useState();
  const [rpimage, setrpImg] = useState();
  const navigate = useNavigate();
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const [similarUrl, setsimilarUrl] = useState();
  const [rpnames, setrpname] = useState([]);
  const [audioComment, setaudioComment] = useState();

  useEffect(() => {
    useaxios
      .get(`/albumlisting_multi_nid_api.php?id=${id}`)
      .then((res) => {
        setsingleData(res.data[0]);
        setsumofFav(res.data[0]?.favorites || 0);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [id]);

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/albumapi3.php?aid=${id}`)
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
        setrpname(res.data[0]?.rp);
        setrpImg(res.data[0]?.rp_image);
        //console.log(typeof res.data);

        setData(_.uniqBy(res.data, "nid"));
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [id]);

  /////get users favorites
  async function fetchFavorites(addFav, aid) {
    if (!currentUser?.id) return;
    if (addFav || (!addFav && aid)) {
      //console.log("...ALBUM.......@@@@@@@@@@@@@");
      await useaxios
        .get(
          `/leclisting_favorites.php?user_id=${currentUser?.id}&type=album`,
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
          const { album } = res.data;
          setgetfavs(album);
          // const isExist = [Object.values(audio)].includes(id)
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }
  useEffect(() => {
    fetchFavorites(addFav, id);
  }, [addFav, id]);

  const addToFav = async (e, aid) => {
    /// add to favorites
    e.stopPropagation();
    //console.log("event clicked");
    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: aid,
      type: "album",
    };
    await useaxios
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
        if (!getFavs?.includes(parseInt(aid))) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {
        //console.log(err);
      });
  };

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
      navigate(`${LECTURE}${data[0]?.nid}`);
    } else {
      dispatch(getaudioId(data[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(data));
    setinitial(false);
  };

  ///**** share album ******** */

  const shareAlbum = (e) => {
    //console.log("album id", id);
    e.stopPropagation();
    setisShare(!isShare);
  };

  // get all lecturers and  id
  useEffect(() => {
    //all lecturers
    if (rpnames) {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/all_rps_api.php`)
        .then(async (res) => {
          //console.log(res.data);
          const datas = res.data;
          //setrpData(datas)
          const rpnameArray = datas.map((rp) => rp.name);
          //console.log("my rp", rpnames);
          const isPresent = rpnameArray.includes(rpnames);
          //console.log("is rp present is", isPresent);
          const page = 1;
          if (isPresent) {
            const rpindex = rpnameArray.indexOf(rpnames);

            //console.log(datas[rpindex]?.id);
            // navigate(`/rp/${rpData[rpindex]?.id}`)

            useaxios
              .get(
                `/albumlisting_rp.php?offset=30&lim=10&page=${page}&rpid=${datas[rpindex]?.id}`
              )
              .then((res) => {
                //console.log(res);
                setsimilarAlb(res.data);
                setsimilarUrl(
                  `/albumlisting_rp.php?offset=30&lim=10&rpid=${datas[rpindex]?.id}&page=`
                );
              });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, [rpnames]);

  useEffect(() => {
    leclistdet?.current.addEventListener("error", () => {
      const imgs = document.querySelectorAll("#hero");
      imgs.forEach((img) => {
        img.src = "https://imagetolink.com/ib/vwea8kukZP.jpeg";
      });
    });
  }, []);

  const lectureTitleExtractor = (title, position) => {
    console.log({ title });
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
      <div className="leclistdet_wrapper">
        <img
          ref={leclistdet}
          id="hero"
          className="leclistdet_hero"
          src={singleData?.img || "https://imagetolink.com/ib/vwea8kukZP.jpeg"}
          alt="audiohero"
        />
        <div className="leclistdet_container">
          {/* ------------------------------Desktop------ Bread Crumbs -------------------------------------- */}

          <div className="leclistdet_breadcrumb">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="leclistdet_breadcrumb_first"
            >Back/</button>
            <p className="leclistdet_breadcrumb_second">
              {/* {(singleData?.title && singleData.title.split("-")[2]) ||
                singleData?.title} */}
              {lectureTitleExtractor(singleData?.title, 2)}
            </p>
          </div>

          {/* -------------------Desktop----------------- Section 1 -------------------------------------- */}
          <div className="leclistdet_head_wrap">
            <div className="leclistdet_head_left">
              <img
                className="leclistdet_head_left_img"
                src={
                  singleData?.img ||
                  "https://imagetolink.com/ib/AEFQQC1ybX.jpeg"
                }
                ref={leclistdet}
                id="hero"
                alt="head"
              />
            </div>
            <div className="leclistdet_head_right">
              <p className="leclistdet_head_right_head">
        
                {lectureTitleExtractor(singleData?.title, 2)}
              </p>
              <div className="leclistdet_head_right_text">
                <div className="rpimage_wrap">
                  <div className="rpimage_circle">
                    <img className="rpimage_sz" src={rpimage || lazy} alt="" />
                  </div>
                  <p className="leclistdet_head_right_text1">
                    {lectureTitleExtractor(singleData?.title, 1)}
                 
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
                <div className="leclistdet_fav">
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
                      <MdFavorite className="leclistdet_fav_icon_active" />
                    ) : (
                      <img
                        src={favbig}
                        alt=""
                        className="leclistdet_fav_icon"
                      />
                    )}
                  </button>

                  <p className="leclistdet_fav_text">
                    {formatNumber(sumofFav || 0)}
                  </p>
                </div>
                <div
                  onClick={(e) => {
                    shareAlbum(e, id);
                  }}
                  className="leclistdet_share"
                >
                  <img
                    src={sharebig}
                    alt=""
                    className="leclistdet_share_icon"
                  />
                  <p className="leclistdet_share_text">
                    {formatNumber(singleData?.share || 0)}
                  </p>
                </div>
                <div className="leclistdet_comment">
                  <img
                    src={commentbig}
                    alt=""
                    className="leclistdet_comment_icon"
                  />
                  <p className="leclistdet_comment_text">
                    {formatNumber(singleData?.comments || 0)}
                  </p>
                </div>
                <div className="leclistdet_download">
                  <img
                    src={download}
                    alt=""
                    className="leclistdet_download_icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="leclistdet_head_right_text2">
            {`${singleData?.categories || state?.name}`}
            <span className="braces">
              (<span className="braces_text">{data?.length}</span>)
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
                  singleData?.img ||
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
                    singleData?.img ||
                    "https://imagetolink.com/ib/vwea8kukZP.jpeg"
                  }
                  alt=""
                />
              </span>

              <div className="mob_like">
                <div className="leclistdet_head_mob_head">
                  {/* {singleData?.title.split("-")[2] || singleData?.title} */}
                  {lectureTitleExtractor(singleData?.title, 2)}
                </div>
                <div className="rp_img_name">
                  <span className="likeys_img">
                    <img
                      className="likeys_img_sz"
                      ref={leclistdet}
                      id="hero"
                      src={
                        singleData?.img ||
                        "https://imagetolink.com/ib/eCnXEHHRos.jpeg"
                      }
                      alt=""
                    />
                  </span>
                  <span className="likeys_text">{singleData?.categories}</span>
                </div>
              </div>
            </div>
            <div className="listrank_and_listblack_wrap">
              <div className={isVisible ? "listranking_none" : "listranking"}>
                <div className="icons_mob_listblack">
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
                    shareAlbum(e);
                  }}
                  className="icons_mob_listblack"
                >
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={sharebold} alt="" />
                  </button>
                  <span className="likeys_text">
                    {formatNumber(singleData?.share || 0)}
                  </span>
                </div>
                <div className="icons_mob_listblack">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={combold} alt="" />
                  </button>
                  <span className="likeys_text">
                    {" "}
                    {formatNumber(singleData?.comments || 0)}
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
                <div className="fixed_text"> {singleData?.categories}</div>

                <div className="fixed_bg_none"></div>
                <div className="header_bg">
                  <img
                    className="img"
                    ref={leclistdet}
                    id="hero"
                    src={
                      singleData?.img ||
                      "https://imagetolink.com/ib/eCnXEHHRos.jpeg"
                    }
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
                  <div id="player" onClick={playAll} className="play_header">
                    <div className="play_img_size">
                      <img className="play_img_size_sm" src={pmobile} alt="" />
                    </div>
                    <div className="play_header_text">Play All</div>
                  </div>
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
            {loading && (
              <div className="loads">
                <div className="load">
                  <Loader />
                </div>
              </div>
            )}
            <div className="lecsong_content">
              {!loading &&
                data.map(
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
                    if (data.length === idx + 1) {
                      return (
                        <div key={idx} className="lecsong_content_item">
                          <div className="desktops_item">
                            <MusicList
                              key={idx}
                              id={idx}
                              title={lectitle || title}
                              lecturer={rpname || rp}
                              image={mp3_thumbnail || lec_img || img}
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
                              endpoint_url={`${process.env.REACT_APP_API_BASE_URL}/albumapi3.php?aid=${id}`}
                              controlData={data}
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
                              endpoint_url={`${process.env.REACT_APP_API_BASE_URL}/albumapi3.php?aid=${id}&lim=10&offset=30&page=`}
                              controlData={data}
                              duration={duration}
                              views={views}
                            />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={idx} className="lecsong_content_item">
                          <div className="desktops_item">
                            <MusicList
                              key={idx}
                              id={idx}
                              title={lectitle || title}
                              lecturer={rpname || rp}
                              image={mp3_thumbnail || lec_img || img}
                              url={`${LECTURE}${nid}`}
                              Title={Title || lectitle || title}
                              rpname={rpname || rp}
                              cats={cats}
                              share={share}
                              rpid={rp_id}
                              favorites={favorites}
                              comments={comments}
                              nid={nid}
                              navName={"Back"}
                              navLink={-1}
                              endpoint_url={`${process.env.REACT_APP_API_BASE_URL}/albumapi3.php?aid=${id}`}
                              controlData={data}
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
                              image={mp3_thumbnail || lec_img}
                              url={`${LECTURE}${nid}`}
                              Title={Title || lectitle || title}
                              rpname={rpname || rp}
                              cats={cats}
                              rpid={rp_id}
                              share={share}
                              comments={comments}
                              nid={nid}
                              favorites={favorites}
                              navName={"Back"}
                              navLink={-1}
                              endpoint_url={`${process.env.REACT_APP_API_BASE_URL}/albumapi3.php?aid=${id}&lim=10&offset=30&page=`}
                              controlData={data}
                              duration={duration}
                              views={views}
                            />
                          </div>
                        </div>
                      );
                    }
                  }
                )}
            </div>
          </div>

          <div className="px-3">
            <SimilarAudio
              similar={similarAlb}
              current={id}
              url={`/a`}
              type={"album"}
              endpoint_url={similarUrl}
              currentPage={1}
              navtitle={"Album"}
              heading={`Similar albums by 
       
              `}
              //        ${
              //   singleData?.title.split("-")[1]?.split(" ")[1] || "lecturer"
              // } ${singleData?.title.split("-")[1]?.split(" ")[2] || ""}
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
    </Container>
  );
};

export default LecturesListDetail;
