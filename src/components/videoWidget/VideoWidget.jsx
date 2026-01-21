import React from "react";
import "./videoWidget.scss";
import { FaPlay } from "react-icons/fa";

import { BiHeart } from "react-icons/bi";
import videoButtom from "../../assets/png/videoButtom.png";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const VideoWidget = ({
  img,
  favourites,
  views,
  lecturer,
  title,
  variant = "default",
}) => {
  const safeTitle = title || "Untitled video";
  const safeLecturer = lecturer || "Dawah Nigeria";
  const parseCount = (value) => {
    if (value === null || value === undefined) return null;
    const raw = String(value).trim().toLowerCase();
    const base = parseFloat(raw.replace(/,/g, ""));
    if (!Number.isFinite(base)) return null;
    if (raw.endsWith("k")) return base * 1000;
    if (raw.endsWith("m")) return base * 1000000;
    return base;
  };
  const viewCount = parseCount(views);
  return (
    <div className={`videoWidget_wrapper videoWidget_wrapper--${variant}`}>
      <div className="videoWidget_top">
        <img
          src={img || IMAGE_PLACEHOLDERS.carouselWidget}
          alt={safeTitle}
          className="videoWidget_background_image"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = IMAGE_PLACEHOLDERS.carouselWidget;
          }}
        />
        <div className="videoWidget_play_wrapper">
          <div className="videoWidget_play">
            <FaPlay className="videoWidget_play_icon" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="videoWidget_buttom">
        <div className="videoWidget_buttom_left">
          <div className="videoWidget_buttom_head" title={safeTitle}>
            {safeTitle}
          </div>
        </div>
        <div className="videoWidget_bottom_overall">
          <div className="videoWidget_buttom_lecturer_wrapper">
            <div className="vid_widget_image rounded-full">
              <img
                className="w-full h-full rounded-full"
                src={videoButtom}
                alt={safeLecturer}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = IMAGE_PLACEHOLDERS.lecturer;
                }}
              />
            </div>
            <div className="rel_text">
              <div className="videoWidget_buttom_lecturer">{safeLecturer}</div>
            </div>
          </div>
          <div className="videoWidget_buttom_right">
            <BiHeart className="videoWidget_buttom_right_icon" />
            <p className="videoWidget_buttom_right_text">
              {formatNumber(favourites || 0)}
            </p>
            {viewCount ? (
              <p className="videoWidget_buttom_views">
                · {formatNumber(viewCount)} views
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWidget;
