import React, { useEffect } from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favourite_song.scss";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import _ from "lodash";

import { useNavigate } from "react-router-dom";
import MusicList from "../../miscList/musicList";
import { LECTURE, NEW } from "../../../utils/routes/constants";
import { useFavoriteSongHook } from "../../../hooks";

const Favourite_songs = ({ setCount1 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

 
  const { isLoading, data } = useFavoriteSongHook(currentUser?.id);

  useEffect(() => {
    setCount1(data?.favoriteLectures?.length);
  }, [data]);

  return (
    <div className="favsongs_wrapper">
      {!isLoading && (!currentUser?.id || data?.audioIDArrayIsEmpty) && (
        <div className="favsongs_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favsongs_text text-foreground">
            You haven’t added any audio.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate(NEW);
              } else {
                navigate("/auth/login");
              }
            }}
            className="favsongs_button"
          >
            Discover more audios
          </button>
        </div>
      )}

      {Array.isArray(data?.favoriteLectures) &&
        data?.favoriteLectures?.length !== 0 && (
          <div className="trend_title_wrap text-color">
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
      {isLoading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      {!isLoading && Array.isArray(data?.favoriteLectures) && (
        <div className="table">
          {data?.favoriteLectures?.map(
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
                    currentUser={currentUser}
                    favorites={favorites}
                    navName={"favorite audio"}
                    navLink={"/favorite"}
                    controlData={data?.favoriteLectures}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Favourite_songs;
