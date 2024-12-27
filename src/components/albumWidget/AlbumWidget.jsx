import React from "react";
import "./albumWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import {
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineCalendar,
} from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";

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
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${(seconds % 60)
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const formatViews = (count) => {
    if (!count) return "0 views";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="album_widget_wrapper">
      <div className="album_widget_img_wrap">
        <img
          src={img || IMAGE_PLACEHOLDERS.lecture}
          alt=""
          className="album_widget_img"
        />
        {duration && (
          <div className="duration-overlay">
            <HiOutlineClock className="inline-block mr-1" />
            {formatDuration(duration)}
          </div>
        )}
      </div>
      <div className="album_widget_text_wrap">
        <p className="album_widget_text1 text-foreground font-medium line-clamp-2">
          {categories}
        </p>
        {rpname && (
          <p className="album_widget_text2 text-muted-foreground text-sm mt-1">
            {rpname}
          </p>
        )}
        {lec_no && (
          <p className="album_widget_text2 text-muted-foreground text-sm mt-1">
            {lec_no} lectures
          </p>
        )}
        <div className="meta-info mt-2 flex items-center gap-3 text-muted-foreground text-xs">
          {views !== undefined && (
            <span className="views flex items-center gap-1">
              <HiOutlineEye className="text-base" />
              {formatViews(views)}
            </span>
          )}
          {date && (
            <span className="date flex items-center gap-1">
              <HiOutlineCalendar className="text-base" />
              {formatDate(date)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumWidget;
