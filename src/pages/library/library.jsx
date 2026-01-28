import React from "react";
import "./library.scss";
import Container from "../../components/container/Container";
import avatar from "../../assets/svg/avatar.svg";
import playlist from "../../assets/svg/playlist.svg";
import addplay from "../../assets/svg/addplaylist.svg";
import fav from "../../assets/svg/fav.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FAVOURITE, MYPLAYLIIST } from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import {
  getLecid,
  showaddPlaylist,
} from "../../Redux/Actions/ActionCreators";

const Library = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddPlaylist = () => {
    if (!currentUser?.id) {
      navigate("/auth/login");
      return;
    }

    dispatch(getLecid(""));
    dispatch(showaddPlaylist(true));
  };

  return (
    <Container>
      <HeadMeta title={`Library - Islamic resources on Dawah Nigeria `} />
      <div className="lib_wrapper">
        <div className="lib_header_link">
          <div className="lib_img_wrap">
            <img className="lib_img_wrap_sz" src={avatar} alt="avt" />
          </div>
          {currentUser ? (
            <div className="user_name">
              <span className="name">{currentUser?.username}</span>
              <span className="social_name">{currentUser?.email}</span>
            </div>
          ) : (
            <div className="no_user">
              <span
                onClick={() => {
                  navigate("/auth/signup");
                }}
                className="reg_sign"
              >
                Sign up
              </span>
              /
              <span
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="reg_sign"
              >
                Log in
              </span>
            </div>
          )}
        </div>

        <div className="flex_wrapp">
          <div
            onClick={() => {
              navigate(MYPLAYLIIST);
            }}
            className="mini_wrapper"
          >
            <div className="img_wrap">
              <img className="img_wrap_sz" src={playlist} alt="" />
            </div>
            <p>Playlist</p>
          </div>
          <div
            onClick={() => {
              navigate(FAVOURITE);
            }}
            className="mini_wrapper"
          >
            <div className="img_wrap">
              <img className="img_wrap_sz" src={fav} alt="" />
            </div>
            <p>Favourites</p>
          </div>
          <div onClick={handleAddPlaylist} className="mini_wrapper">
            <div className="img_wrap">
              <img className="img_wrap_sz" src={addplay} alt="" />
            </div>
            <p>Add Playlist</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Library;
