import React, { useState, useEffect, useRef, useCallback } from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favourite_album.scss";
import AlbumWidget from "../../albumWidget/AlbumWidget";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import _ from "lodash";
import axios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import infinitePlayFavScroll from "../../UI/infinitePlayFavScroll";
import { ALBUMS } from "../../../utils/routes/constants";

const Favourite_album = ({ setCount2 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [data, setdata] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [myFavAlbum, setMyFavAlbum] = useState([]);
  const [myAlb, setmyAlb] = useState();

  useEffect(() => {
    setCount2(data.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }

    axios
      .get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=album`)
      .then((res) => {
        //console.log(res)

        if (res.data.length === 0) {
          setmyAlb([]);
          setLoading(false);
          return;
        }

        const { album } = res.data;
        setmyAlb(album);

        //console.log(album.toString());

        axios
          .get(`/albumlisting_multi_nid_api.php?id=${album.toString()}`)

          .then((res) => {
            //console.log('fav album',res)
            setMyFavAlbum(res.data);
            setLoading(false);
            setdata(_.uniqBy(res.data?.slice(0, 10), "nid"));
          })
          .catch((err) => {
            //console.log(err)
          });
      })
      .catch((err) => {
        //console.log(err)
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavAlbum?.slice(page, page + 10);

    if (additionalData.length === 0) {
      setIsEmpty(true);
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
    <div className="favalbum_wrapper">
      {(!currentUser?.id || myAlb?.length === 0) && (
        <div className="favalbum_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favalbum_text">
            You haven’t added any Album. Add an album here.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate("/charts");
              } else {
                navigate("/auth/login");
              }
            }}
            className="favalbum_button"
          >
            Discover more Albums
          </button>
        </div>
      )}

      {loading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      {myAlb?.length !== 0 && (
        <div className="favalb_wrapper">
          {!loading &&
            data.map(
              (
                {
                  categories,
                  img,
                  name,
                  rpname,
                  cats,
                  nid,
                  id,
                  audio,
                  Title,
                  title,
                  views,
                  favorites,
                },
                idx
              ) => {
                if (data.length === idx + 1) {
                  return (
                    <div
                      className="favalb_album_item"
                      ref={lastElement}
                      onClick={() => {
                        navigate(`${ALBUMS}${id}`);
                      }}
                      key={idx + 1}
                    >
                      <AlbumWidget
                        key={idx}
                        views={views || 0}
                        categories={categories}
                        img={img}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="favalb_album_item"
                      onClick={() => {
                        navigate(`${ALBUMS}${id}`);
                      }}
                      key={idx + 1}
                    >
                      <AlbumWidget
                        key={idx}
                        views={views || 0}
                        categories={categories}
                        img={img}
                      />
                    </div>
                  );
                }
              }
            )}
        </div>
      )}
      {nextPageLoad && (
        <div className="loadd w-full flex justify-center items-center h-[200px]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Favourite_album;
