import React, { useContext } from "react";
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
import { RECO1, RECO2, SEARCH } from "../../utils/routes/constants";
import ThemeDropDown from "../UI/themedropdown/themeDropDown";
const SideNav = ({ res, handleSideBar, setisOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <div className="sidenav_wrapper bg-background border-r dark:border-r-0 shadow-md">
      <div className="sidenav_logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <ThemeDropDown />
      </div>
      {currentUser?.id && (
        <div className="logout">
          <button
            onClick={handleLogout}
            className="logout_btn border border-border text-color hover:text-color-foreground "
          >
            Logout
          </button>
        </div>
      )}
      <div className="sidenav_auth">
        <div className="sidenav_avatar">
          <img src={avatar} alt="avatar" />
        </div>
        {!currentUser?.id && (
          <div className="sidenav_auth_text ">
            <p
              onClick={() => {
                navigate("/auth/login");
              }}
              className="sidenav_auth_text1 text-color dark:hover:text-[#ddff00] hover:text-color-foreground"
            >
              Log in/
            </p>
            <p
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="sidenav_auth_text2 text-color dark:hover:text-[#ddff00] hover:text-color-foreground"
            >
              Sign Up
            </p>
          </div>
        )}
        {currentUser?.id && (
          <div className="user_name text-color dark:hover:text-[#ddff00] hover:text-color-foreground">
            {currentUser?.username?.split(" ")[0] || currentUser?.username}
          </div>
        )}
      </div>
      {pathname !== SEARCH && (
        <div>
          <div className="sidenav_lectures">
            <h1 className="sidenav_lectures_header text-muted">Lectures</h1>
            {lectures.map(({ icon, link, name }, index) => {
              return (
                <IconText
                  key={index}
                  icon={icon}
                  id={index}
                  link={link}
                  name={name}
                  group={"lectures"}
                  setisOpen={setisOpen}
                />
              );
            })}
          </div>
          <div className="sidenav_library">
            <h1 className="sidenav_library_header text-muted">Library</h1>
            {library.map(({ icon, link, name }, index) => {
              return (
                <IconText
                  key={index}
                  icon={icon}
                  id={index}
                  link={link}
                  name={name}
                  group={"library"}
                  setisOpen={setisOpen}
                />
              );
            })}
          </div>
          <div className="sidenav_Buzz">
            <h1 className="sidenav_Buzz_header text-muted">Buzz</h1>
            <IconText
              icon={<RiAwardFill className="icon0 icon" />}
              id={111}
              link={RECO1}
              name={"Recommended"}
              group={"buzz"}
              setisOpen={setisOpen}
            />
          </div>
          <div className="sidenav_podcast">
            <h1 className="sidenav_podcast_header text-muted">Podcast</h1>
            <IconText
              icon={<RiAwardFill className="icon0 icon" />}
              id={112}
              link={RECO2}
              name={"Recommended"}
              group={"podcast"}
              setisOpen={setisOpen}
            />
          </div>
        </div>
      )}
      {pathname.includes("search") && <SearchOptions />}
    </div>
  );
};

export default SideNav;
