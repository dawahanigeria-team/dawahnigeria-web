import React from "react";
import "./albumWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const AlbumWidget = ({ img, categories, lec_no, rpname }) => {
  return (
    <div className="album_widget_wrapper">
      <div className="album_widget_img_wrap">
        <img
          src={img || IMAGE_PLACEHOLDERS.lecture}
          alt=""
          className="album_widget_img"
        />
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
      </div>
    </div>
  );
};

export default AlbumWidget;
