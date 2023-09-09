import React, { useState, useEffect, useRef, useCallback } from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favourite_song.scss";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import _ from "lodash";
import axios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import infinitePlayFavScroll from "../../UI/infinitePlayFavScroll";
import MusicList from "../../miscList/musicList";
import { LECTURE } from "../../../utils/routes/constants";

const Favourite_songs = ({ setCount1 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [data, setdata] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(0);
  const [myaud, setmyAud] = useState([])
  const navigate = useNavigate();
  const [myFavSong, setMyFavSong] = useState([]);

  useEffect(() => {
    setCount1(data.length);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true)
    }
    axios
      .get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=audio`)
      .then((res) => {
        //console.log(res);
        if(res.data.length === 0) {
          setmyAud([])
          setLoading(false)

          return
        }
        const { audio } = res.data;
        const audioArr = Object.values(audio);
        setmyAud(audioArr)
        ////console.log(audioArr.toString());

        axios
          .get(`/leclisting_multi_nid_api.php?id=${audioArr.toString()}`)

          .then((res) => {
            //console.log(res);
            setLoading(false);
            setMyFavSong(res.data);
            setdata(_.uniqBy(res.data?.slice(0, 10), "nid"));
          })
          .catch((err) => {
            //console.log(err);
          });
      })
      .catch((err) => {
        //console.log(err);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavSong.slice(page, page + 10);

    if (additionalData.length === 0) {
      setIsEmpty(true);
      return
    }
    setNextPageLoad(false);
    setdata((prev) => _.uniqBy([...prev, ...additionalData], "nid"));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;
      infinitePlayFavScroll(node, observer, page, setPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  return (
    <div className="favsongs_wrapper">
      {(!currentUser?.id || myaud?.length === 0) && (
        <div className="favsongs_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favsongs_text">
            You haven’t added any audio.
          </p>
          <button
          onClick={() => {
            if(currentUser?.id) {
              navigate("/new")
            }
            else {
              navigate("/auth/login")
            }
          }}
          className="favsongs_button">Discover more audios</button>
        </div>
      )}

      {data?.length !== 0 && (
        <div className="trend_title_wrap">
          <div className="tend_title1">
            <p className="tend_hash">#</p>
            <p>Title</p>
          </div>
          <p className="tend_title2">
            <span>Lecturer</span>
          </p>

          <p className="tend_title4">
            <span>Time</span>
          </p>
        </div>
      )}
      {loading && (
     
          <div className="loadd w-full flex justify-center items-center h-[300px]">
            <Loader />
          </div>
       
      )}
      {!loading && (
        <div className="table">
          {data?.map(
            (
              {
                Title,
                title,
                rpname,
                rp,
                img,
                cats,
                nid,
                views,
                duration,
                favorites,
              },
              idx
            ) => {
              if (data.length === idx + 1) {
                return (
                  <div ref={lastElement} key={idx} className="">
                    <MusicList
                      key={idx}
                      id={idx}
                      image={img}
                      duration={duration}
                      title={title || Title}
                      lecturer={rpname || rp}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname || rp}
                      cats={cats}
                      nid={nid}
                      views={views}
                      currentUser={currentUser}
                      favorites={favorites}
                      navName={"favorite audio"}
                      navLink={"/favorite"}
                      controlData={myFavSong}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="">
                    <MusicList
                      key={idx}
                      id={idx}
                      image={img}
                      duration={duration}
                      title={Title || title}
                      lecturer={rpname || rp}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname || rp}
                      cats={cats}
                      nid={nid}
                      favorites={favorites}
                      currentUser={currentUser}
                      navName={"favorite audio"}
                      navLink={"/favorite"}
                      controlData={myFavSong}
                      views={views}
                    />
                  </div>
                );
              }
            }
          )}
        </div>
      )}
      {nextPageLoad && (
      
          <div className=" loade w-full flex justify-center items-center h-[200px]">
            <Loader />
          </div>
       
      )}
    </div>
  );
};

export default Favourite_songs;
