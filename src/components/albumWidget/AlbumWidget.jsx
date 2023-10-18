import React, { useEffect } from "react";
import "./albumWidget.scss";
import { RiPlayListLine } from "react-icons/ri";
import { formatNumber } from "../UI/formatter";
import { FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";

const AlbumWidget = ({ categories, img, lec_no, nid }) => {
  const { audioId } = useSelector((state) => state.user);

  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#album");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/CQZFhVqz5o.jpeg";
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
            src={"https://imagetolink.com/ib/CQZFhVqz5o.jpeg"}
            alt="background"
            className="album_background_image"
          />
        </div>
        <div className="album_overlay"></div>
        <p className="album_widget_name">DN</p>
        <div className="album_listen_wrapper">
          <RiPlayListLine className="album_listen_icon" />
          <p className="album_listen_text">{formatNumber(lec_no)}</p>
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
      <p className="album_categories">{categories}</p>
    </div>
  );
};

export default AlbumWidget;
