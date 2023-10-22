import React, { useState, useEffect, useContext } from "react";
import "./playlistwidget.scss";
import imge from "../../../src/assets/png/genre/1.png";
import love from "../../../src/assets/svg/love.svg";
import comment from "../../../src/assets/svg/comment.svg";
import headpmobile from "../../../src/assets/svg/headpmobile.svg";
import download from "../../../src/assets/svg/download.svg";
import share from "../../../src/assets/svg/share.svg";
import sharebig from "../../../src/assets/svg/sharebig.svg";
import headp from "../../../src/assets/svg/headphone.svg";

import dot from "../../../src/assets/svg/threedot.svg";
import dmobile from "../../../src/assets/svg/downloadmobile.svg";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../UI/formatter";
import adfav from "../../../src/assets/svg/adfav.svg";
import { toast } from "react-hot-toast";
import { AudioContext } from "../../App";
import { useSelector } from "react-redux";
import axios from "../../utils/useAxios";
import { AudioDownloadModal } from "../audioDownloadModal/AudioDownloadModal";
function MyPlayListWidget({
  lecturer,
  id,
  title,
  image,
  currentUserId,
  duration,
  url,
  Title,
  rpname,
  cats,
  nid,
  navName,
  navLink,
  controlData,
  views,
  favorites,
}) {
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);
  const [sumofFav, setsumofFav] = useState(favorites || 0);
  const { currentUser } = useSelector((state) => state.user);
  const { setinitial } = useContext(AudioContext);

  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#play");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
    });
  }, []);

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    if (!currentUser?.id) return;
    if (addFav || (!addFav && lecid)) {
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

  return (
    <div className="playlistwidget_wrapper">
      <div className="play_table">
        <div
          onClick={() => {
            navigate(url);
            setinitial(false);
          }}
          className="play_td"
        >
          <div className="play_tr">
            <p className="num">{id + 1}</p>
            <div className="img_size">
              <img
                className="img_size_sm"
                id="play"
                src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
                src-data={image}
                alt="ff"
              />
            </div>
            <div className="trend_lect_data">
              <div className="rel_text">
                <div className="main_txt_wrap">{title || "unknown"}</div>
              </div>
              <div className="like_others">
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={headp} alt="" />
                  </button>
                  <span className="likeys_text">{formatNumber(views)}</span>
                </div>
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
                      fetchFavorites(addFav, nid);
                      setdisabled(true);
                    }}
                    className="likeys_img"
                    disabled={isdisabled}
                  >
                    {getFavs?.includes(nid) ? (
                      <img className="likeys_img_sz" src={adfav} alt="" />
                    ) : (
                      <img className="likeys_img_sz" src={love} alt="" />
                    )}
                  </button>
                  <span className="likeys_text">
                    {formatNumber(sumofFav) || 0}
                  </span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={share} alt="" />
                  </button>
                  <span className="likeys_text">22k</span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={comment} alt="" />
                  </button>
                  <span className="likeys_text">0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="play_tr2">
            <div className="tr2_real_wrap">
              <div className="tr2_text">
                <div className="text_child">{`${lecturer.split(" ")[0]} ${
                  lecturer.split(" ")[1]
                }`}</div>
              </div>

              <div className="tr2_likeys">
                <AudioDownloadModal
                  nid={nid}
                  className="likeys_img"
                  triggerInnerChild={
                    <img className="likeys_img_sz" src={download} alt="" />
                  }
                />

                <span className="likeys_img">
                  <img className="likeys_img_sz" src={sharebig} alt="" />
                </span>
              </div>
            </div>
            <div className="tr2_none_wrap"></div>
          </div>

          <div className="play_tr3">
            <p> {duration}</p>
          </div>
        </div>
      </div>

      {/********************mobile************** */}
      <div className="play_mobile_list">
        <div
          onClick={() => {
            navigate(url);
            setinitial(false);
          }}
          className="play_music_list"
        >
          <div className="play_wrapped_right">
            <div className="wrap_image">
              <div className="img_wr">
                <img
                  className="img_wrp"
                  id="play"
                  src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
                  src-data={image}
                  alt=""
                />
              </div>
              <div className="likeys">
                <span className="likeys_img">
                  <img className="likeys_img_sz" src={headpmobile} alt="" />
                </span>
                <span className="likeys_text">{formatNumber(views)}</span>
              </div>
            </div>
            <div className="wrap_text">
              <div className="title_wrap">
                <div className="texta">{title}</div>
              </div>
              <div className="lect_name_wrap">
                <div className="textb">{lecturer}</div>
              </div>
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
                      fetchFavorites(addFav, nid);
                      setaddFav(!addFav);
                      setdisabled(true);
                    }}
                    className="likeys_img"
                    disabled={isdisabled}
                  >
                    {getFavs?.includes(nid) ? (
                      <img className="likeys_img_sz" src={adfav} alt="" />
                    ) : (
                      <img className="likeys_img_sz" src={love} alt="" />
                    )}
                  </button>
                  <span className="likeys_text">
                    {formatNumber(sumofFav) || 0}
                  </span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={share} alt="" />
                  </button>
                  <span className="likeys_text">22k</span>
                </div>
                <div className="likeys">
                  <button className="likeys_img">
                    <img className="likeys_img_sz" src={comment} alt="" />
                  </button>
                  <span className="likeys_text">0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="play_wrap_left">
            <AudioDownloadModal
              nid={nid}
              className="likeys_img_left"
              triggerInnerChild={
                <img className="likeys_img_sz_left" src={dmobile} alt="" />
              }
            />

            <span
              onClick={(e) => {
                e.stopPropagation();
                setMore(!more);
              }}
              className="likeys_img_left"
            >
              <img className="likeys_img_sz_left" src={dot} alt="" />
              <div className={more ? "hidden_drops" : "hidden_drops_none"}>
                <span className="hidden_wrapper">
                  <span className="hidden_img">
                    <img className="h_img" src={sharebig} alt="" />
                  </span>
                  <span className="hidden_text">Share</span>
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPlayListWidget;
