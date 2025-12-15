import React, { useState, useEffect, useRef, useCallback } from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favouriteplaylist.scss";
import AlbumWidget from "../../albumWidget/AlbumWidget";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import uniqBy from "lodash/uniqBy";
import axios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import infinitePlayFavScroll from "../../UI/infinitePlayFavScroll";
import { PLAYLISTS, PLAY } from "../../../utils/routes/constants";

const Favourite_playlist = ({ setCount3 }) => {
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
    setCount3(data.length);
  }, [data]);

  useEffect(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    axios
      .get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=album`)
      .then((res) => {
        if (res.data.length === 0) {
          setmyAlb([]);
          setLoading(false);
          return;
        }

        const { album } = res.data;
        setmyAlb(album);

        axios
          .get(`/albumlisting_multi_nid_api.php?id=${album.toString()}`)

          .then((res) => {
            setLoading(false);
            setMyFavAlbum(res.data);
            setdata(uniqBy(res.data?.slice(0, 10), "nid"));
          })
          .catch((err) => {});
      });
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
    setdata((prev) => uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);

  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;
      infinitePlayFavScroll(node, observer, page, setPage);
    },

    [page]
  );

  return (
    <div className="favplaylist_wrapper">
      {(!currentUser?.id || myAlb?.length === 0) && (
        <div className="favplaylist_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favplaylist_text text-foreground">
            You haven&apos;t added any playlist Add a playlist here.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate(PLAY);
              } else {
                navigate("/auth/login");
              }
            }}
            className="favplaylist_button"
          >
            Discover more audios
          </button>
        </div>
      )}

      {loading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      {
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
                        navigate(`${PLAYLISTS}${id}`, {
                          state: {
                            title: Title || title || name.split(" - ")[0],
                            rpname,
                            img,
                            cats: categories,
                            nid: id,
                            views,
                            audio,
                            lec_no,
                            favorites,
                            nav1: {
                              title: "favorite playlist",
                              link: "/favorite",
                            },
                          },
                        });
                      }}
                      key={idx + 1}
                    >
                      <AlbumWidget
                        key={idx}
                        lec_no={lec_no || 0}
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
                        navigate(`${PLAYLISTS}${id}`, {
                          state: {
                            title: Title || title || name.split(" - ")[0],
                            rpname,
                            img,
                            cats: categories,
                            nid: id,
                            audio,
                            favorites,
                            views,
                            lec_no,
                            nav1: {
                              title: "favourite playlist",
                              link: "/favorite",
                            },
                          },
                        });
                      }}
                      key={idx + 1}
                    >
                      <AlbumWidget
                        key={idx}
                        lec_no={lec_no || 0}
                        categories={categories}
                        img={img}
                      />
                    </div>
                  );
                }
              }
            )}
        </div>
      }
      {nextPageLoad && (
        <div className="loadd w-full flex justify-center items-center h-[200px]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Favourite_playlist;
