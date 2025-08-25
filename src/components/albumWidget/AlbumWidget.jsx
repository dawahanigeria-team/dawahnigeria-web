import React from "react";
import "./albumWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import {
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineCalendar,
  HiOutlineEye as FiEye,
} from "react-icons/hi2";

const AlbumWidget = ({
  img,
  categories,
  lec_no,
  rpname,
  views,
  duration,
  date,
  viewMode,
}) => {
  const formatViews = (count) => {
    if (!count) return "0";
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="album_widget_wrapper">
      <div className="album_widget_img_wrap">
        <img
          src={img || IMAGE_PLACEHOLDERS.lecture}
          alt={categories}
          className="album_widget_img"
        />
        <div className="album_overlay"></div>
        {duration && (
          <div className="duration-overlay">
            <HiOutlineClock className="inline-block" />
            {formatDuration(duration)}
          </div>
        )}
        {categories && <h3 className="album_widget_name">{categories}</h3>}
      </div>
      {views && (
        <div className="album_categories">
          <FiEye className="inline-block mr-1" />
          {formatViews(views)} views
        </div>
      )}
    </div>
  );
};

export default AlbumWidget;
