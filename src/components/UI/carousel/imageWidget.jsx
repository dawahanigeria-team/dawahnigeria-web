import React from "react";
import SafeImage from "../safeImage/SafeImage";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";

const ImageWidget = ({ image, alt = "carousel" }) => (
  <SafeImage
    src={image}
    fallback={IMAGE_PLACEHOLDERS.carouselWidget}
    alt={alt}
    imgClassName="w-full h-full object-fill rounded-md"
  />
);

export default ImageWidget;
