import React, {useContext} from "react";
import "./mobileList.scss";
import { AudioContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPack, getPage,getCount } from "../../Redux/Actions/ActionCreators";
function MobileList({
  lecturer,
  id,
  title,
  image,
  drop,
  setDrop,
  duration,
  url,
  Title,
  rpname,
  endpoint_url,
  currentPage,
  cats,
  nid,
  navName,
  navLink,
  controlData,
  views,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {setinitial} = useContext(AudioContext)
  const {currentUser, audioId} = useSelector((state) => state.user)
 
  return (
    <div className={audioId === nid ? `mobilelist_wrapper border-l-2 border-[#ddff2b]`: "mobilelist_wrapper"}>
      
        <div
            onClick={() => {
              navigate(url);
              setinitial(false);
              dispatch(getPack(null));
              dispatch(getPage(currentPage));
              dispatch(getPack(controlData));
              dispatch(getCount(id))
              
            }}
        className="mobiletd">
             <div className="lecture">{title || Title}</div>
            <div className="lecturer">{ rpname}</div>
    
        </div>

        
    </div>
  );
}

export default MobileList;
