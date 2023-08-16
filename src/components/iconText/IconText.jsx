import React, { useEffect, useState } from "react";
import "./iconText.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showaddPlaylist } from "../../Redux/Actions/ActionCreators";
const IconText = ({ icon, link, name, id}) => {

  const location = useLocation();
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {addplaylist} = useSelector((state) => state.user)

  console.log(addplaylist)
  useEffect(() => {


    if (location.pathname.includes("/home")) {
      setActive(0);
    } else if (location.pathname === "/") {
      setActive(0);
    } else if (location.pathname.includes("/genres")) {
      setActive(7);
    } else if (location.pathname.includes("/recommend2")) {
      setActive(12);
    } else if (location.pathname.includes("/recommend1")) {
      setActive(11);
    } else if (location.pathname.includes("/lecturers")) {
      setActive(3);
    } else if (location.pathname.includes("/videos")) {
      setActive(4);
    } else if (location.pathname.includes("/playlists")) {
      setActive(5);
    } else if (location.pathname.includes("/charts")) {
      setActive(6);
    } else if (location.pathname.includes("/trending")) {
      setActive(1);
    } else if (location.pathname.includes("/new")) {
      setActive(2);
    } else if (location.pathname.includes("/favourite")) {
      setActive(9);
    } else if (location.pathname.includes("/myplaylist")) {
      setActive(10);
    }

     if (addplaylist) {
      setActive(8);
      //dispatch(showaddPlaylist(true))
    } 
    
  });
  return (
    <Link to={link}
    onClick={() => {

      navigate(link)
      if (id === 8) {
        dispatch(showaddPlaylist(true))
        console.log('8')
      }
    }}
      
      className={`icontext_link ${active === id ? "icontext_active" : ""}`}
    >
      <div
      
        className={`icontext_icon ${
          active === id ? "icontext_active_icon" : ""
        }`}
      >
        {icon}
      </div>
      <div
        className={`icontext_name ${
          active === id ? "icontext_active_text" : ""
        }`}
      >
        {name}
      </div>
    </Link>
  );
};
export default IconText;
