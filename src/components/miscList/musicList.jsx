import React, { useState, useEffect, useContext } from "react";
import "./musicList.scss";
import headpmobile from "../../../src/assets/svg/headpmobile.svg";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import pmobile from "../../../src/assets/svg/playmobile.svg";

import { SlShare } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

import Add_playlist from "../../pages/add_playlist/AddPlaylist";
import ShareAudio from "../shareaudio/shareAudio";
import { toast } from "react-hot-toast";

import {
  getaudioData,
  getaudioId,
  showaddPlaylist,
  getLecid,
  setPlaying,
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
import { AudioDownloadModal } from "../audioDownloadModal/AudioDownloadModal";
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
  const [sumofFav, setsumofFav] = useState(favorites || 0);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const dispatch = useDispatch();
  const { setinitial } = useContext(AudioContext);
  const [rpData, setrpData] = useState([]);
  const [rpnameArray, setrpnameArray] = useState([]);
  const [isShare, setisShare] = useState(false);

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

  ///**** share audio ******** */

  const shareAudio = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!currentUser?.id) return;
    if ((addFav || !addFav) && lecid) {
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
          const { audio } = res.data;
          setgetfavs(Object.values(audio));
        })
        .catch((err) => {});
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
        toast.success(res.data.message);
        setdisabled(false);

        if (!getFavs?.includes(lecid)) {
          setsumofFav(sumofFav + 1);
        } else {
          setsumofFav(sumofFav - 1);
        }
      })

      .catch((err) => {});
  };

  const addToPlaylist = (e, lecid) => {
    e.stopPropagation();
    dispatch(getLecid(lecid));
    dispatch(showaddPlaylist(true));
  };


  return (
    <div className="musicslist_wrapper dark:font-light font-medium">
      <div className="table text-color-primary">
        <div
          onClick={() => {
            setinitial(false);
            dispatch(getCount(id));
            dispatch(getaudioId(nid));
            dispatch(setPlaying(false));
            dispatch(getPack(null));
            dispatch(getPage(currentPage));
            dispatch(getPack(controlData));
            dispatch(
              getaudioData({ endpoint_url, currentPage, controlData, navName })
            );
          }}
          className={
            audioId === nid ? "td bg-hover nowplaying" : "td hover:bg-hover"
          }
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
              <Link
               to={rpid ? `${RESOURCE_PERSON}${rpid}` : "#"}
              
                id="player"
                className="tr2_text"
              >
               <div className="text_child line-clamp-2 hover:text-gray-400 xl:w-[230px] w-[160px] max-[700px]:w-[100px] max-[1000px]:w-[130px]">{lecturer || ""}</div>
               
              </Link>

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
                  <SlShare className="text-color" />
                </span>

                <AudioDownloadModal
                  nid={nid}
                  className="likeys_img"
                  triggerInnerChild={<DownloadIcon />}
                />
              </div>
            </div>
          </div>

          <div className="tr3">
            <div> {duration}</div>
          </div>
        </div>
      </div>

      {/********************mobile************** */}
      <div className={"mobile_musicslist text-color-primary"}>
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

                <span className="likeys_text text-[#e0e0e0]">

                  {formatNumber(views)}
                </span>
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
                <div className="texta line-clamp-2">{title}</div>
              </div>
              <div className="lect_name_wrap">
                <div className="textb text-color-primary line-clamp-1">
                  {lecturer}
                </div>
              </div>
            </div>
          </div>

          <div className="wrap_left">
            <AudioDownloadModal
              nid={nid}
              className="likeys_img_left"
              triggerInnerChild={<DownloadIcon />}
            />

            <span
              onClick={(e) => {
                e.stopPropagation();
                setMore(!more);
              }}
              className="likeys_img_left"
            >
              <BsThreeDotsVertical className="text-[22px] text-color-primary" />
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
                  className="bg-background border shadow-lg z-[200] relative rounded-sm space-y-2 p-1"
                >
                  <span
                    onClick={(e) => {
                      shareAudio(e, nid);
                    }}
                    className=" flex w-full items-center space-x-2"
                  >
                    <AiOutlineShareAlt className="text-lg text-color" />
                    <span className="text-color">Share</span>
                  </span>

                  <span
                    onClick={(e) => {
                      addToPlaylist(e, nid);
                    }}
                    className="flex w-full items-center space-x-2"
                  >
                    <CiSquarePlus className="text-lg text-color" />
                    <span className="text-color">Add to playlist</span>
                  </span>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>

      <Add_playlist
      lecid={nid}
      />

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
