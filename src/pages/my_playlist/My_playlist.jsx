import React, { useState, useEffect, useRef } from "react";
import "./myplaylist.scss";
import empty from "../../assets/png/musicEmptyState.png";
import Container from "../../components/container/Container";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useSelector } from "react-redux";
import back from "../../assets/svg/back.svg";
import foward from "../../assets/svg/foward.svg";
import { LECTURE } from "../../utils/routes/constants";
import LandingWidget from "../../components/landingWidget/LandingWidget";
import Loader from "../../components/UI/loader/loader";
import _ from "lodash";
import MusicList from "../../components/miscList/musicList";
import HeadMeta from "../../components/head-meta";
import { usePlaylistAudioHook, usePlaylistFoldersHook } from "../../hooks";
const My_playlist = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const slide = useRef(null);
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  // get my playlist
  const { isLoading, data: myFolders } = usePlaylistFoldersHook(
    currentUser?.id
  );

  const { mutate: playlistAudios } = usePlaylistAudioHook();

  const getPlaylist = (playlistId) => {
    if (!currentUser?.id) return;
    setLoading(true);
    setData([]);

    const payload = { id: currentUser?.id, playlistId };

    playlistAudios(payload, {
      onSuccess: (data) => {
        setData(data);
        console.log({ data });
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };

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
    const currentSlide = slide.current;
    function scrollEl() {
      if (currentSlide?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        currentSlide.scrollLeft + currentSlide.offsetWidth >=
        currentSlide.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    if (currentSlide) {
      currentSlide?.addEventListener("scroll", scrollEl);
    }

    return () => {
      if (currentSlide) currentSlide?.removeEventListener("scroll", scrollEl);
    };
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

        {(!currentUser?.id || myFolders?.length === 0) && (
          <div className="myplay_img_wrap">
            <img src-data={empty} src={empty} alt="empty" />
            <p className="myplay_text text-foreground">
              You haven&apos;t created any playlists. Create your own playlists
              here.
            </p>
            <button className="myplay_button">Add Playlist</button>
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
            {Array.isArray(myFolders) && myFolders?.map(({ id, name, views, img }, idx) => {
              return (
                <button
                  className="similarWidget_album_item text-start"
                  onClick={() => {
                    getPlaylist(id);
                  }}
                  key={idx + 1}
                >
                  <LandingWidget
                    key={idx}
                    views={views || 0}
                    categories={name}
                    img={img}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {!myFolders && data?.isemptyPlaylist && (
          <div className="no_select_yet">
            <span className="no_sel_text">--- Select a folder ---</span>
          </div>
        )}

        {!loading && data && !data?.isemptyPlaylist && (
          <div className="trend_title_wrap mt-6 text-color">
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
        {currentUser?.id && loading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        {!loading && Array.isArray(data?.playlistLectures) && (
          <div className="table">
            {data?.playlistLectures?.map(
              (
                {
                  Title,
                  title,
                  rp_name,
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
                return (
                  <div key={idx} className="">
                    <MusicList
                      key={idx}
                      id={idx}
                      image={img}
                      duration={duration}
                      title={title || Title}
                      lecturer={rp_name || rp}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rp_name || rp}
                      cats={cats}
                      nid={nid}
                      views={views}
                      currentUserId={currentUser?.id}
                      favorites={favorites}
                      navName={"My playlist"}
                      navLink={"/myplaylist"}
                      controlData={data?.playlistLectures}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default My_playlist;
