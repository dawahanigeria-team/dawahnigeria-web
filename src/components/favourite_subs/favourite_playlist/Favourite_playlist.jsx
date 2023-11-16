import React from "react";
import empty from "../../../assets/png/musicEmptyState.png";
import "./favouriteplaylist.scss";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { PLAY } from "../../../utils/routes/constants";

const Favourite_playlist = ({ setCount3 }) => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();


  return (
    <div className="favplaylist_wrapper">
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
    </div>
  );
};

export default Favourite_playlist;
