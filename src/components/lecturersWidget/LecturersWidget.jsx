import React, { useEffect, memo } from "react";
import "./lecturersWidget.scss";
import { FiEye } from "react-icons/fi";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const LecturersWidget = memo(({ img, rp, rpname, views, styling }) => {
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
    <div className="lecturerWidget_wrapper">
      <div className="lecturerWidget_circle">
        <img
          className="lecturerWidget_img"
          id="lect"
          src-data={img}
          src={IMAGE_PLACEHOLDERS.lecturer}
          alt={rp || "Lecturer"}
          loading="lazy"
        />
      </div>

      <p className="lecturerWidget_text text-foreground">
        {rp ? rp : "undefined"}
      </p>

      {rpname && (
        <p className="lecturerWidget_rpname text-foreground">{rpname}</p>
      )}

      <div
        className={
          !styling ? "lecturerWidget_views_wrapper text-foreground" : "hidden"
        }
      >
        <FiEye className="lecturerWidget_views_icon" />
        <p className="lecturerWidget_views_text">
          {formatNumber(parseInt(views) || 0)}
        </p>
      </div>
    </div>
  );
});

LecturersWidget.displayName = "LecturersWidget";

export default LecturersWidget;
