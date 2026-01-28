import React, { useEffect, useState } from "react";
import "./iconText.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLecid, showaddPlaylist } from "../../Redux/Actions/ActionCreators";

const IconText = ({ icon, link, name, id, setisOpen }) => {
  const location = useLocation();
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { addplaylist } = useSelector((state) => state.user);

  function close() {
    setisOpen(false);
  }

  useEffect(() => {
    // Check if the link is an exact match with the current pathname
    const isActive = location.pathname === link;
    setActive(isActive ? id : null);

    // if (addplaylist && id === 9) {
    //   setActive(9);
    // }
  }, [location.pathname, link, id]);

  return (
    <Link
      to={link}
      onClick={() => {
        navigate(link);
        close();
        if (name === "Add Playlist") {
          dispatch(getLecid(""));
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
