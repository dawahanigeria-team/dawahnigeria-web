import React, { useCallback, useEffect, useRef, useState } from "react";
import "./lecturersWidget.scss";
import { FiHeadphones } from "react-icons/fi";

import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const LecturersWidget = ({ img, rp, views, styling }) => {
  //const lazy = useRef()

  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#lect");
    function lazyImages() {
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }

    lazyImages();
  }, []);

  return (
    <>
      <div className="lecturerWidget_wrapper ">
        <div className="lecturerWidget_circle">
          <img
            className="lecturerWidget_img"
            id="lect"
            src-data={img}
            src={IMAGE_PLACEHOLDERS.lecturer}
            alt="circleImg"
          />
        </div>

        <p className="lecturerWidget_text text-foreground">
          {rp ? rp : "undefined"}
        </p>
       
        <div className={!styling ? "lecturerWidget_views_wrapper text-foreground" : "hidden"}>

          <FiHeadphones className="lecturerWidget_views_icon" />
          <p className="lecturerWidget_views_text">
            {formatNumber(parseInt(views) || 0)}
          </p>
        </div>
      
      </div>

      {/* ------
      <div className="lecwidres_wrapper">
        <div className="lecwidres_img_wrap">
          <img className="lecwidres_img" src={img} alt="lect" />
        </div>
        <div className="lecwidres_text_wrap">
        <div className="lecwidres_text">
          {rp
            ? `${rp.split(" ")[0]} ${rp.split(" ")[1]} ${rp.split(" ")[2]}`
            : "undefined"}
        </div>
        </div>
        
      </div>
      
      -----------responsive lecturer widget----------------- */}

      {/* -----------------responsive lecturer widget Ends----------------- */}
    </>
  );
};

export default LecturersWidget;
