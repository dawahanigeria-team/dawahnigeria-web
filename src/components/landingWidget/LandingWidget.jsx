import React, { useEffect } from "react";
import "./landingWidget.scss";
import { FiHeadphones } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../UI/formatter";
import { useSelector } from "react-redux";
const LandingWidget = ({ categories, img, views, nid, styling }) => {
  const { audioId } = useSelector((state) => state.user);

  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#song");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/TnDGh8F6J0.jpeg";
        });
      });
    }
    lazyImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`landing_album_wrapper space-y-2 ${
        styling ? "h-[10.5rem] w-[9.5rem]" : "h-[11.5rem] w-[10.313rem]"
      }`}
    >
      <div className="landing_album_container">
        <img
          src-data={img}
          id="song"
          src={"https://imagetolink.com/ib/TnDGh8F6J0.jpeg"}
          alt="background"
          className="landing_album_background_image"
        />
        <div className="landing_album_overlay"></div>
        <p className="landing_album_widget_name">DN</p>
        <div className={!styling ? "landing_album_listen_wrapper" : "hidden"}>
          <FiHeadphones className="landing_album_listen_icon" />
          <p className="landing_album_listen_text">{formatNumber(views)}</p>
        </div>

        <div
          className={
            audioId === nid
              ? `landing_play_super_wrap hide`
              : `landing_play_super_wrap show`
          }
        >
          <div className="landing_play_wrapper">
            <div className="landing_play">
              <FaPlay className="landing_play_icon" />
            </div>
          </div>
        </div>
      </div>
      <p className="landing_album_categories">{categories}</p>
    </div>
  );
};

export default LandingWidget;
