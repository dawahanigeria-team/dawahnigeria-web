import React, { useEffect } from "react";
import "./lecturerMobileWidget.scss";

const LecturerMobileWidget = ({ img, rp, views }) => {
  useEffect(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#lect");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;
        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/kk8U1nb2nR.jpeg";
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
            src={"https://imagetolink.com/ib/Gl0xGV26lY.jpeg"}
            src-data={img}
            alt="lect"
          />
        </div>
        <div className="lecwidres_text_wrap">
          <div className="lecwidres_text">
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
