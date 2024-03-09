import React, { useEffect } from "react";
import "./lecturerMobileWidget.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const LecturerMobileWidget = ({ img, rp }) => {
  useEffect(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#lect");
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
      {/* -----------------responsive lecturer widget----------------- */}
      <div className="lecwidres_wrapper">
        <div className="lecwidres_img_wrap">
          <img
            className="lecwidres_img"
            id="lect"
            src={IMAGE_PLACEHOLDERS.lecturer}
            src-data={img}
            alt="lect"
          />
        </div>
        <div className="lecwidres_text_wrap">
          <div className="lecwidres_text text-foreground">
            {rp
              ? `${rp.split(" ")[0]} ${rp.split(" ")[1]} ${rp.split(" ")[2]}`
              : "undefined"}
          </div>
        </div>
      </div>
      {/* -----------------responsive lecturer widget Ends----------------- */}
    </>
  );
};

export default LecturerMobileWidget;
