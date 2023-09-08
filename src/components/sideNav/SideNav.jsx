import React, {useEffect} from "react";
import "./sidenav.scss";
import Logo from "../../assets/png/dn logo.png";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/svg/avatar.svg";
import { lectures, library } from "./data";
import IconText from "../iconText/IconText";
import { RiAwardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchOptions from "../../pages/searchPage/searchOptions";

const SideNav = ({ res, handleSideBar }) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
 // const { id, username } = currentUser;
  //console.log(currentUser);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }



  return (
    <div className="sidenav_wrapper">
      <div className="sidenav_logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      {currentUser?.id && <div className="logout">
        <button
        onClick={handleLogout}
        className="logout_btn">Logout</button>
      </div>}
      <div className="sidenav_auth">
        <div className="sidenav_avatar">
          <img  src={avatar} alt="avatar" />
        </div>
        {!currentUser?.id && (
          <div className="sidenav_auth_text">
            <p
              onClick={() => {
                navigate("/auth/login");
              }}
              className="sidenav_auth_text1"
            >
              Log in/
            </p>
            <p
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="sidenav_auth_text2"
            >
              Sign Up
            </p>
          </div>
        )}
        {currentUser?.id && (
          <div className="user_name">{currentUser?.username?.split(" ")[0] || currentUser?.username}</div>
        )}
      </div>
    {pathname !== "/search" && <div>
        <div className="sidenav_lectures">
          <h1 className="sidenav_lectures_header">Lectures</h1>
          {lectures.map(({ icon, id, link, name }) => {
            return (
              <IconText
                key={id}
                icon={icon}
                id={id}
                link={link}
                name={name}
                group={"lectures"}
              />
            );
          })}
        </div>
        <div className="sidenav_library">
          <h1 className="sidenav_library_header">Library</h1>
          {library.map(({ icon, id, link, name }) => {
            return (
              <IconText
                key={id}
                icon={icon}
                id={id}
                link={link}
                name={name}
                group={"library"}
              />
            );
          })}
        </div>
        <div className="sidenav_Buzz">
          <h1 className="sidenav_Buzz_header">Buzz</h1>
          <IconText
            icon={<RiAwardFill className="icon0 icon" />}
            id={11}
            link={"/recommend1"}
            name={"Recommended"}
            group={"buzz"}
          />
        </div>
        <div className="sidenav_podcast">
          <h1 className="sidenav_podcast_header">Podcast</h1>
          <IconText
            icon={<RiAwardFill className="icon0 icon" />}
            id={12}
            link={"/recommend2"}
            name={"Recommended"}
            group={"podcast"}
          />
        </div>
      </div>}
      {pathname.includes('search') && <SearchOptions/>}
    </div>
  );
};

export default SideNav;
