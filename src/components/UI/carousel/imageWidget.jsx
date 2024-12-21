import React, { useEffect } from "react";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";

const ImageWidget = ({ image }) => {
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousels");
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
      id="carousels"
      className="w-full h-full object-fill rounded-md"
      src-data={image}
      src={IMAGE_PLACEHOLDERS.carouselWidget}
      // src-data={image}
      alt="1"
    />
  );
};

export default ImageWidget;
