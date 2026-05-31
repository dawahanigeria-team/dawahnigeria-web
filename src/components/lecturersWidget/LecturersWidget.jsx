import React, { memo } from "react";
import "./lecturersWidget.scss";
import { FiEye } from "react-icons/fi";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import SafeImage from "../UI/safeImage/SafeImage";

const LecturersWidget = memo(({ img, rp, rpname, views, styling }) => {
  return (
    <div className="lecturerWidget_wrapper">
      <div className="lecturerWidget_circle">
        <SafeImage
          src={img}
          fallback={IMAGE_PLACEHOLDERS.lecturer}
          alt={rp || "Lecturer"}
          imgClassName="lecturerWidget_img"
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
