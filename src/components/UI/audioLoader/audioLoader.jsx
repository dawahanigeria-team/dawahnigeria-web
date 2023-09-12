import React from "react";
import "./audioLoader.scss";
import loader from "../../../assets/svg/loader.svg";
const AudioLoader = () => {
  return (
    <div className="loader_wrapper">
      <div id="animation_rotate" className="loading_img">
        <img className="img_sz" src-data={loader} src={loader} alt="loader" />
      </div>
    </div>
  );
};

export default AudioLoader;
