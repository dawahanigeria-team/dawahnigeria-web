import React, { memo, useMemo } from "react";
import "./albumWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import {
  HiOutlineClock,
  HiOutlineEye as FiEye,
} from "react-icons/hi2";

const AlbumWidget = memo(({
  img,
  categories,
  lec_no,
  rpname,
  views,
  duration,
  date,
  viewMode,
}) => {
  const formattedViews = useMemo(() => {
    if (!views) return "0";
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views;
  }, [views]);

  const formattedDuration = useMemo(() => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, [duration]);

  return (
    <div className="album_widget_wrapper">
      <div className="album_widget_img_wrap">
        <img
          src={img || IMAGE_PLACEHOLDERS.lecture}
          alt={categories || "Album cover"}
          className="album_widget_img"
          loading="lazy"
        />
        <div className="album_overlay"></div>
        {duration && (
          <div className="duration-overlay">
            <HiOutlineClock className="inline-block" />
            {formattedDuration}
          </div>
        )}
        {categories && <h3 className="album_widget_name">{categories}</h3>}
      </div>
      {views && (
        <div className="album_categories">
          <FiEye className="inline-block mr-1" />
          {formattedViews} views
        </div>
      )}
    </div>
  );
});

AlbumWidget.displayName = "AlbumWidget";

export default AlbumWidget;
