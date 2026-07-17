import React, { useContext, useCallback, memo } from "react";
import "./mobileList.scss";
import { AudioContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPack, getPage, getCount, setPlaying, getaudioData } from "../../Redux/Actions/ActionCreators";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { formatTrackDuration } from "../../utils/albumPlayback";

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
          ? `mobilelist_wrapper is-playing`
          : "mobilelist_wrapper"
      }
    >
      <div onClick={handleClick} className="mobiletd">
        {/* Lecture Image */}
        <div className="lecture-image">
          <img 
            src={image || IMAGE_PLACEHOLDERS.lecture} 
            alt=""
            className="lecture-image-img"
            onError={(e) => {
              e.target.src = IMAGE_PLACEHOLDERS.lecture;
            }}
          />
          {audioId === nid && (
            <div className="playing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        
        {/* Lecture Info */}
        <div className="lecture-info">
          <div className="lecture-title">{title || Title}</div>
          <div className="lecture-meta">
            <span className="lecturer-name">{rpname}</span>
            {duration !== undefined && duration !== null && (
              <span className="lecture-duration">{formatTrackDuration(duration)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

MobileList.displayName = "MobileList";

export default MobileList;
