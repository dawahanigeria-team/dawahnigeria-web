import React from "react";
import "./favourite_lecturers.scss";
import empty from "../../../assets/png/musicEmptyState.png";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import LecturersWidget from "../../lecturersWidget/LecturersWidget";
import { LECTURERS, RESOURCE_PERSON } from "../../../utils/routes/constants";
import { useFavoriteRpstHook } from "../../../hooks";
const Favourite_lecturers = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { isLoading, data } = useFavoriteRpstHook(currentUser?.id);

  return (
    <div className="favlec_wrapper">
      { (!currentUser?.id || data?.rpIDArrayIsEmpty) && (
        <div className="favlec_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favlec_text text-foreground">
            You haven’t any lecturer. Add lecturers here.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate(LECTURERS);
              } else {
                navigate("/auth/login");
              }
            }}
            className="favlec_button"
          >
            Discover more Lecturers
          </button>
        </div>
      )}
      {currentUser?.id && isLoading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      <div className="favlecturers_widget">
        {!isLoading &&
          Array.isArray(data?.favoriteRps) &&
          data?.favoriteRps?.map(
            (
              { img, rp, name, rpname, views, favorites, catsname, id },
              idx
            ) => {
              return (
                <Link
                  key={idx}
                  to={`${RESOURCE_PERSON}${id}`}
                  className="lecturers_item"
                >
                  <LecturersWidget
                    key={idx}
                    img={img}
                    views={views}
                    favorites={favorites}
                    rp={rp || name || rpname}
                  />
                </Link>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Favourite_lecturers;
