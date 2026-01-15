import React, { useContext, useCallback, memo } from "react";
import "./mobileList.scss";
import { AudioContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPack, getPage, getCount, setPlaying, getaudioData } from "../../Redux/Actions/ActionCreators";
const MobileList = memo(function MobileList({
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setinitial } = useContext(AudioContext);
  const { audioId } = useSelector((state) => state.user);

  const handleClick = useCallback(() => {
    navigate(url);
    setinitial(false);
    dispatch(getPack(null));
    dispatch(setPlaying(false));
    dispatch(getPage(currentPage));
    dispatch(getPack(controlData));
    dispatch(getCount(id));
    dispatch(getaudioData({ endpoint_url, currentPage, controlData, navName }));
  }, [navigate, url, setinitial, dispatch, currentPage, controlData, id, endpoint_url, navName]);

  return (
    <div
      className={
        audioId === nid
          ? `mobilelist_wrapper text-primary border-l-2 border-gray-400 dark:border-[#ddff2b]`
          : "mobilelist_wrapper"
      }
    >
      <div onClick={handleClick} className="mobiletd">
        <div className="lecture text-foreground">{title || Title}</div>
        <div className="lecturer">{rpname}</div>
      </div>
    </div>
  );
});

MobileList.displayName = "MobileList";

export default MobileList;
