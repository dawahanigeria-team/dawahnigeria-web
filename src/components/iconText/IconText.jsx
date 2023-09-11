import React, { useEffect, useState } from "react";
import "./iconText.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showaddPlaylist } from "../../Redux/Actions/ActionCreators";
import { CHARTS, FAVOURITE, GENRES, HOME, LECTURERS, MYPLAYLIIST, NEW, PLAY, RECO1, RECO2, TRENDING, VIDEO } from "../../utils/routes/constants";
const IconText = ({ icon, link, name, id}) => {

  const location = useLocation();
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {addplaylist} = useSelector((state) => state.user)

  //console.log(addplaylist)
  useEffect(() => {


    if (location.pathname.includes(HOME)) {
      setActive(0);
    } else if (location.pathname === "/dawahcast") {
      setActive(0);
    } else if (location.pathname.includes(GENRES)) {
      setActive(7);
    } else if (location.pathname.includes(RECO2)) {
      setActive(12);
    } else if (location.pathname.includes(RECO1)) {
      setActive(11);
    } else if (location.pathname.includes(LECTURERS)) {
      setActive(3);
    } else if (location.pathname.includes(VIDEO)) {
      setActive(4);
    } else if (location.pathname.includes(PLAY)) {
      setActive(5);
    } else if (location.pathname.includes(CHARTS)) {
      setActive(6);
    } else if (location.pathname.includes(TRENDING)) {
      setActive(1);
    } else if (location.pathname.includes(NEW)) {
      setActive(2);
    } else if (location.pathname.includes(FAVOURITE)) {
      setActive(9);
    } else if (location.pathname.includes(MYPLAYLIIST)) {
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
        //console.log('8')
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
