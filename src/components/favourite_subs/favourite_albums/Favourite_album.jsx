import React, { useEffect } from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favourite_album.scss";
import AlbumWidget from "../../albumWidget/AlbumWidget";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import _ from "lodash";

import { Link, useNavigate } from "react-router-dom";
import { ALBUMS, CHARTS } from "../../../utils/routes/constants";
import { useFavoriteAlbumsHook } from "../../../hooks";

const Favourite_album = ({ setCount2 }) => {
  const { currentUser } = useSelector((state) => state.user);


 
  const navigate = useNavigate();


  const { data, isLoading } = useFavoriteAlbumsHook(currentUser?.id);

  console.log({ data });
  useEffect(() => {
    setCount2(data?.favoriteAlbums?.length);
  }, [data]);

 

  return (
    <div className="favalbum_wrapper">
      {!isLoading && (!currentUser?.id || data?.albumIDArrayIsEmpty) && (
        <div className="favalbum_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favalbum_text text-foreground">
            You haven’t added any Album. Add an album here.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate(CHARTS);
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

      {isLoading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      {!isLoading &&
        Array.isArray(data?.favoriteAlbums) &&
        data?.favoriteAlbums && (
          <div className="favalb_wrapper">
            {data?.favoriteAlbums.map(
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
                  lec_no,
                  favorites,
                },
                idx
              ) => {
                return (
                  <Link
                    className="favalb_album_item"
                    to={`${ALBUMS}${id}`}
                    key={idx + 1}
                  >
                    <AlbumWidget
                      key={idx}
                      lec_no={lec_no || 0}
                      categories={categories}
                      img={img}
                    />
                  </Link>
                );
              }
            )}
          </div>
        )}
    </div>
  );
};

export default Favourite_album;
