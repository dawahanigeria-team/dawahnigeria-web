import React, { useEffect, useState, useContext } from "react";
import "./iconText.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { showaddPlaylist } from "../../Redux/Actions/ActionCreators";

const IconText = ({ icon, link, name, id, setisOpen }) => {
  const location = useLocation();
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addplaylist } = useSelector((state) => state.user);

  function close() {
    setisOpen(false);
  }
  useEffect(() => {
    if (location.pathname.includes("home")) {
      setActive(0);
    } else if (location.pathname === "/dawahcast") {
      setActive(0);
    } else if (location.pathname.includes("charts")) {
      setActive(7);
    } else if (location.pathname.includes("recommend2")) {
      setActive(12);
    } else if (location.pathname.includes("recommend1")) {
      setActive(11);
    } else if (location.pathname.includes("lecturers")) {
      setActive(3);
    } else if (location.pathname.includes("recitations")) {
      setActive(4);
    } else if (location.pathname.includes("videos")) {
      setActive(5);
    } else if (location.pathname.includes("playlists")) {
      setActive(6);
    } else if (location.pathname.includes("trending")) {
      setActive(1);
    } else if (location.pathname.includes("new")) {
      setActive(2);
    } else if (location.pathname.includes("favourite")) {
      setActive(10);
    } else if (location.pathname.includes("myplaylist")) {
      setActive(11);
    } else if (location.pathname.includes("genres")) {
      setActive(8);
    }

    if (addplaylist) {
      setActive(9);
    }
  }, [location.pathname]);
  return (
    <Link
      to={link}
      onClick={() => {
        navigate(link);
        close();
        if (id === 9) {
          dispatch(showaddPlaylist(true));
        }
      }}
      className={`icontext_link ${active === id ? "icontext_active" : ""}`}
    >
      <div
        className={`icontext_icon text-color dark:hover:text-[#ddff00]  hover:text-color-foreground ${
          active === id
            ? "icontext_active_icon font-semibold dark:text-[#ddff00] text-color-foreground"
            : ""
        }`}
      >
        {icon}
      </div>
      <div
        className={`icontext_name text-color dark:hover:text-[#ddff00] hover:font-semibold hover:text-color-foreground ${
          active === id
            ? "icontext_active_text font-semibold dark:text-[#ddff00] text-color-foreground"
            : ""
        }`}
      >
        {name}
      </div>
    </Link>
  );
};
export default IconText;
