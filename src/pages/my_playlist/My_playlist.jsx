import React, { useState, useEffect, useRef, useCallback } from "react";
import "./myplaylist.scss";
import empty from "../../assets/png/musicEmptyState.png";
import Container from "../../components/container/Container";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import { useDispatch, useSelector } from "react-redux";
import back from "../../assets/svg/back.svg";
import foward from "../../assets/svg/foward.svg";
import { LECTURE } from "../../utils/routes/constants";
import LandingWidget from "../../components/landingWidget/LandingWidget";
import Loader from "../../components/UI/loader/loader";
import infinitePlayFavScroll from "../../components/UI/infinitePlayFavScroll";
import uniqBy from "lodash/uniqBy";
import playfolder from "../../assets/svg/folder.svg";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import MusicList from "../../components/miscList/musicList";
import HeadMeta from "../../components/head-meta";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { getLecid, showaddPlaylist } from "../../Redux/Actions/ActionCreators";
const My_playlist = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [data, setdata] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(0);
  const slide = useRef();
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  const [myFolders, setmyFolders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [myplaylist, setmyplaylist] = useState([]);

  const handleAddPlaylist = () => {
    if (!currentUser?.id) {
      toast.error("Sign in is required to add playlist");
      return;
    }

    dispatch(getLecid(""));
    dispatch(showaddPlaylist(true));
  };

  // get my playlist
  useEffect(() => {
    if (!currentUser?.id) return;
    axios
      .get(
        `/playlistApi.php?user_id=${parseInt(
          currentUser?.id
        )}&action=user_playlists`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        setmyFolders(uniqBy(res.data, "name"));
      })
      .catch((err) => {});
  }, []);

  const getPlaylist = (id) => {
    if (!currentUser?.id) return;
    setLoading(true);
    setdata([]);
    axios
      .get(
        `/playlistApi.php?user_id=${parseInt(
          currentUser?.id
        )}&playlist_id=${parseInt(id)}&action=playlist_data`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        const { audio } = res.data[0];
        if (audio?.length === 0) {
          setLoading(false);
          toast.error("selected folder is empty");

          setmyplaylist([]);

          return;
        }
        const audioArr = Object.values(audio);

        axios
          .get(`/leclisting_multi_nid_api.php?id=${audioArr.toString()}`)

          .then((res) => {
            if (res.data === null || !res.data) {
              toast.error("selected folder is empty");
              setmyplaylist([]);
              return;
            }
            setmyplaylist(res.data);
            setLoading(false);
            setdata(uniqBy(res.data?.slice(0, 10), "nid"));
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myplaylist.slice(page, page + 10);

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

  //get lectures from the same lecturers
  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollEl() {
      if (slide.current.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        slide.current.scrollLeft + slide.current.offsetWidth >=
        slide.current.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    slide.current?.addEventListener("scroll", scrollEl);

    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);

  return (
    <Container>
      <HeadMeta
        title={`My playlist on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="myplay_wrapper">
        <div className="myplay_header_link bg-background">
          <HeaderRouter title={"My Playlist"} />
        </div>

        {(!currentUser?.id || myFolders.length === 0) && (
          <div className="myplay_img_wrap">
            <img src-data={empty} src={empty} alt="empty" />
            <p className="myplay_text">
              You haven&apos;t created any playlists. Create your own playlists
              here.
            </p>
            <button className="myplay_button" onClick={handleAddPlaylist}>
              Add Playlist
            </button>
          </div>
        )}

        <div className="overflow_hidden_wrapper_p">
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src-data={back} src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} src-data={foward} alt="foward" />
          </div>
          <div ref={slide} className="overflow_auto_wrapper">
            {myFolders?.map(({ id, name, views, img }, idx) => {
              return (
                <div
                  className="similarWidget_album_item"
                  onClick={() => {
                    getPlaylist(id);
                  }}
                  key={idx + 1}
                >
                  <LandingWidget
                    key={idx}
                    views={views || 0}
                    categories={name}
                    img={img || IMAGE_PLACEHOLDERS.lecture}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {!myFolders && myplaylist.length === 0 && (
          <div className="no_select_yet">
            <span className="no_sel_text">--- Select a folder ---</span>
          </div>
        )}

        {myplaylist.length !== 0 && (
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
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        {!loading && myplaylist.length !== 0 && (
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
                        currentUserId={currentUser?.id}
                        favorites={favorites}
                        navName={"My playlist"}
                        navLink={"/myplaylist"}
                        controlData={myplaylist}
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
                        currentUser={currentUser?.id}
                        navName={"My Playlist"}
                        navLink={"/myplaylist"}
                        controlData={myplaylist}
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
          <div className="load_m">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default My_playlist;
