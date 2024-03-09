import React, { useEffect } from "react";
import "./albumWidget.scss";
import { RiPlayListLine } from "react-icons/ri";
import { formatNumber } from "../UI/formatter";
import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const AlbumWidget = ({ categories, img, lec_no, nid }) => {
  const { audioId } = useSelector((state) => state.user);

  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll(".album");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.albumWidget;
        });
      });
    }

    lazyImage();
  }, []);

  return (
    <div className="album_wrapper">
      <div className="album_container">
        <div className="album_img">
          <img
            src-data={img}
            id="album"
            src={img || IMAGE_PLACEHOLDERS.albumWidget}
            alt="background"
            className="album_background_image album"
          />
        </div>
        <div className="album_overlay"></div>
        <p className="album_widget_name">DN</p>
        <div className="album_listen_wrapper">
          <RiPlayListLine className="album_listen_icon" />

          <p className="album_listen_text">{formatNumber(lec_no || 0)}</p>
        </div>

        <div
          className={
            audioId === nid
              ? `album_play_super_wrap hide`
              : `album_play_super_wrap show`
          }
        >
          <div className="album_play_wrapper">
            <div className="album_play">
              <FaPlay className="album_play_icon" />
            </div>
          </div>
        </div>
      </div>
      <p className="album_categories text-color-primary">{categories}</p>
    </div>
  );
};

export default AlbumWidget;
