import React, { useEffect } from "react";
import { FiHeadphones } from "react-icons/fi";
import "./simrpWidget.scss";
const SimrpWidget = ({ img, rp }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#similar");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
      });
    }

    lazyImage();
  }, []);
  return (
    <div className="simrpwid_wrapper">
      <div className="simrpwid_circle">
        <img
          className="simrpwid_img"
          id="similar"
          src={"https://imagetolink.com/ib/ILgTFgNfuy.jpeg"}
          src-data={img}
          alt="circleImg"
        />
      </div>
      <p className="simrpwid_text">
        {rp ? `${rp.split(" ")[0]} ${rp.split(" ")[1]}` : "undefined"}
      </p>
    </div>
  );
};

export default SimrpWidget;
