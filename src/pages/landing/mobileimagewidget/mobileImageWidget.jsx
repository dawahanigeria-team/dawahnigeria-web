import React, { useState } from "react";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";

const MobileImageWidget = ({ image, priority = false }) => {
  const [imgSrc, setImgSrc] = useState(image || IMAGE_PLACEHOLDERS.carouselWidget);

  const handleError = () => {
    setImgSrc(IMAGE_PLACEHOLDERS.carouselWidget);
  };

  return (
    <img
      className="landing_carousel_img w-full rounded-[3px] h-[162px] object-cover"
      src={imgSrc}
      alt="Featured content carousel slide"
      width={400}
      height={162}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={handleError}
    />
  );
};

export default MobileImageWidget;
