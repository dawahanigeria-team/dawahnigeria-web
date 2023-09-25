import React, { useState, useEffect, useContext } from "react";
import "./musicList.scss";
import imge from "../../../src/assets/png/genre/1.png";
import love from "../../../src/assets/svg/love-d.svg";
import comment from "../../../src/assets/svg/com-d.svg";
import headpmobile from "../../../src/assets/svg/headpmobile.svg";
import download from "../../../src/assets/svg/boom-download.svg";
import sharesvg from "../../../src/assets/svg/share-d.svg";
import adfav from "../../../src/assets/svg/adfav.svg";
import sharebig from "../../../src/assets/svg/boom-share.svg";
import headp from "../../../src/assets/svg/hp-d.svg";
import plus from "../../../src/assets/svg/boom-addplay.svg";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import dot from "../../../src/assets/svg/threedot.svg";
import { SlShare } from "react-icons/sl";
import dmobile from "../../../src/assets/svg/boom-download.svg";
import { useNavigate } from "react-router-dom";
import DownloadAudio from "../download/download";
import lazysong from "../../assets/png/lazysong.jpeg";
import Add_playlist from "../../pages/add_playlist/AddPlaylist";
import ShareAudio from "../shareaudio/shareAudio";
import { toast } from "react-hot-toast";
import Marquee from "react-fast-marquee";
import {
  getaudioData,
  getaudioId,
  showaddPlaylist,
  getLecid,
  getCount,
  getPack,
  getPage,
} from "../../Redux/Actions/ActionCreators";
import { AudioContext } from "../../App";
import { formatNumber } from "../UI/formatter";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../utils/useAxios";
import { AudioWave } from "../UI/soundwave/soundWave";
import { RESOURCE_PERSON } from "../../utils/routes/constants";
import { AddplayIcon, DownloadIcon } from "../svgcomponent/svgComponent";
function MusicList({
  lecturer,
  id,
  title,
  image,
  drop,
  setDrop,
  duration,
  url,
  Title,
  rpname,
  endpoint_url,
  currentPage,
  cats,
  share,
  nid,
  rpid,
  navName,
  navLink,
  controlData,
  views,
  favorites,
}) {
  const navigate = useNavigate();
  const { currentUser, audioId } = useSelector((state) => state.user);

  const [more, setMore] = useState(false);
  const [isDownload, setisDownload] = useState(false);
  const [nidValue, setNidValue] = useState();
  const [sumofFav, setsumofFav] = useState(favorites || 0);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const dispatch = useDispatch();
  const { setinitial } = useContext(AudioContext);
  const [rpData, setrpData] = useState([]);
  const [rpnameArray, setrpnameArray] = useState([]);
  const [isShare, setisShare] = useState(false);
  //const [lectureId, setlectureId] = useState()
  ////console.log(currentUser?.id)
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#mlist");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/ITczTtYvdR.jpeg";
        });
      });
    }
    lazyImage();
  }, []);

  const handleDownload = (e) => {
    e.stopPropagation();
    setisDownload(!isDownload);
    setNidValue(nid);
  };

  ///**** share audio ******** */

  const shareAudio = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
    //setNidValue(nid)
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && lecid) {
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
    fetchFavorites(addFav, nid);
  }, [addFav, nid]);

  const addToFav = async (e, lecid) => {
    /// add to favorites
    e.stopPropagation();
    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
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
        //console.log(res);
        toast.success(res.data.message);
        setdisabled(false);
        //console.log(addFav);
        if (!getFavs?.includes(lecid)) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {
        //console.log(err);
      });
  };

  const addToPlaylist = (e, lecid) => {
    e.stopPropagation();
    dispatch(getLecid(lecid));
    dispatch(showaddPlaylist(true));
  };

  useEffect(() => {
    //all lecturers
    axios
      .get(`${process.env.REACT_APP_DBOX_API_URL}/rpjson`)
      .then((res) => {
        //console.log(res.data.rp);
        const data = res.data.rp;
        setrpData(data);
        setrpnameArray(data.map((rp) => rp.name));
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const lecturerDetail = (lecturer) => {
    const isPresent = rpnameArray.includes(lecturer);
    //console.log("is rp present is", isPresent);
    if (isPresent) {
      const rpindex = rpnameArray.indexOf(lecturer);

      //console.log(rpData[rpindex]?.id);
      navigate(`${RESOURCE_PERSON}${rpData[rpindex]?.id}`);
    }
  };

  /**
   * 
    navigate(url, {
              state: {
                title: Title,
                rpname,
                image,
                endpoint_url,
                currentPage,
                currentUser,
                id,
                cats,
                nid,
                controlData,
                nav1: { title: navName, link: navLink },
              },
            });
   */

  //console.log("nid @@@@@@@@@@@", nid);
  //console.log("audioid @@@@@@@@@@@", audioId);

  return (
    <div className="musicslist_wrapper">
      <div className="table">
        <div
          onClick={() => {
            setinitial(false);
            dispatch(getCount(id));
            dispatch(getaudioId(nid));
            dispatch(getPack(null));
            dispatch(getPage(currentPage));
            dispatch(getPack(controlData));
            dispatch(
              getaudioData({ endpoint_url, currentPage, controlData, navName })
            );
          }}
          className={audioId === nid ? "td nowplaying" : "td"}
        >
          <div className="tr">
            <p className={audioId === nid ? "num hide" : "num"}>{id + 1}</p>
            <div className={audioId === nid ? " hide" : "plays"}>
              <img className="play_sz" src={pmobile} alt="" />
            </div>
            <div className={audioId === nid ? "show margin" : "hide"}>
              <AudioWave />
            </div>

            <div className="img_size">
              <img
                className="img_size_sm"
                id="mlist"
                src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
                src-data={image}
                alt="ff"
              />
            </div>
            <div className="trend_lect_data">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(url);
                }}
                className="rel_text"
              >
                <div className="main_txt_wrap hover:text-gray-400" id="text">
                  {title}
                </div>
              </div>
            </div>
          </div>
          <div className="tr2">
            <div className="tr2_real_wrap">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (rpid) {
                    navigate(`${RESOURCE_PERSON}${rpid}`);
                  }
                }}
                id="player"
                className="tr2_text"
              >
                <div className="text_child hover:text-gray-400">{`${
                  lecturer?.split(" ")[0]
                } ${lecturer?.split(" ")[1]}`}</div>
              </div>

              <div className="tr2_likeys">
                <span
                  onClick={(e) => {
                    addToPlaylist(e, nid);
                  }}
                  className="likeys_img"
                >
                  <AddplayIcon />
                </span>
                <span
                  onClick={(e) => {
                    shareAudio(e, nid);
                  }}
                  className="likeys_img"
                >
                  <SlShare className="" />
                </span>
                <span
                  onClick={(e) => {
                    handleDownload(e);
                  }}
                  className="likeys_img"
                >
                  <DownloadIcon />
                </span>
              </div>
            </div>
          </div>

          <div className="tr3">
            <div> {duration}</div>
          </div>
        </div>
      </div>

      {/********************mobile************** */}
      <div className={"mobile_musicslist"}>
        <div
          onClick={() => {
            navigate(url);
            setinitial(false);
            dispatch(getPack(null));
            dispatch(getPage(currentPage));
            dispatch(getPack(controlData));
            dispatch(getCount(id));
          }}
          className={`music_list`}
        >
          <div className="wrapped_right">
            <div className="wrap_image">
              <div className="img_wr">
                <img
                  className="img_wrp"
                  id="mlist"
                  src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
                  src-data={image}
                  alt=""
                />
              </div>
              <div className="likeys">
                <button className="likeys_img">
                  <img className="likeys_img_sz" src={headpmobile} alt="" />
                </button>
                <span className="likeys_text">{formatNumber(views)}</span>
              </div>

              <div
                className={
                  audioId === nid
                    ? "absolute w-full h-fit inset-0 m-auto"
                    : "hidden"
                }
              >
                <AudioWave />
              </div>
            </div>
            <div className="wrap_text">
              <div className="title_wrap">
                <Marquee pauseOnHover={true}>
                  <div className="texta">{title}</div>
                </Marquee>
              </div>
              <div className="lect_name_wrap">
                <Marquee pauseOnHover={true}>
                  <div className="textb">{lecturer}</div>
                </Marquee>
              </div>
            </div>
          </div>

          <div className="wrap_left">
            <span
              onClick={(e) => {
                handleDownload(e);
              }}
              className="likeys_img_left"
            >
              <img className="likeys_img_sz_left" src={dmobile} alt="" />
            </span>

            <span
              onClick={(e) => {
                e.stopPropagation();
                setMore(!more);
              }}
              className="likeys_img_left"
            >
              <img className="likeys_img_sz_left" src={dot} alt="" />
              <div
                className={
                  more ? " left-[-100px] absolute min-w-max h-fit" : "hidden"
                }
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setMore(!more);
                  }}
                  className="fixed inset-0 bg-none z-[90] w-full h-full"
                ></span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-black z-[200] relative rounded-sm space-y-2 p-1"
                >
                  <span
                    onClick={(e) => {
                      shareAudio(e, nid);
                    }}
                    className=" flex w-full items-center space-x-2"
                  >
                    <span className=" w-3 h-3 ">
                      <img className="w-full h-full" src={sharebig} alt="" />
                    </span>
                    <span className="">Share</span>
                  </span>

                  <span
                    onClick={(e) => {
                      addToPlaylist(e, nid);
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
            </span>
          </div>
        </div>
      </div>

      <Add_playlist />

      {nidValue && (
        <div
          className={isDownload ? "download_wrapper" : "hide_download_wrapper"}
        >
          <DownloadAudio
            setisDownload={setisDownload}
            isDownload={isDownload}
            nid={nidValue}
          />
        </div>
      )}
      <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
        <ShareAudio
          isShare={isShare}
          setisShare={setisShare}
          nid={nid}
          type={"audio"}
        />
      </div>
    </div>
  );
}

export default MusicList;

{
  /**

 <div className="likey_wrap">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="likeys"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToFav(e, nid);
                      setaddFav(!addFav);
                      fetchFavorites(addFav, nid)
                      setdisabled(true);
                    }}
                    className="likeys_img"
                    disabled={isdisabled}
                  >
                    {getFavs?.includes(nid) ? (
                      <img className="likeys_img_sz" src={adfav}  alt="" />
                    ) : (
                      <img className="likeys_img_sz" src={love}  alt="" />
                    )}
                  </button>
                  <span className="likeys_text">
                    {formatNumber(sumofFav)}
                  </span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={sharesvg} alt="" />
                  </button>
                  <span className="likeys_text">{formatNumber(share || 0)}</span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz"  src={comment} alt="" />
                  </button>
                  <span className="likeys_text">2.2k</span>
                </div>
              </div>*/
}
