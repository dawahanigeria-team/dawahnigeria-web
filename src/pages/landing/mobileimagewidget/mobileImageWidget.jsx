import React, { useEffect } from "react";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";

const MobileImageWidget = ({ image }) => {
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousel");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;

      im.addEventListener("error", () => {
        im.src = IMAGE_PLACEHOLDERS.carouselWidget;
      });
    });
  }, []);
  return (
    <img
      className="landing_carousel_img w-full rounded-[3px] h-[162px]"
      id="carousel"
      src-data={image}
      src={IMAGE_PLACEHOLDERS.carouselWidget}
      alt="1"
    />
  );
};

export default MobileImageWidget;
