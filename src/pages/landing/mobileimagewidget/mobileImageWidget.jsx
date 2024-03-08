import React, { useEffect } from "react";

const MobileImageWidget = ({ image }) => {
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousel");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;

      im.addEventListener("error", () => {
        im.src = "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazyanime_i8hntv.jpg";
      });
    });
  }, []);
  return (
    <img
      className="landing_carousel_img w-full rounded-[3px] h-[162px]"
      id="carousel"
      src-data={image}
      src="https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazyanime_i8hntv.jpg"
      alt="1"
    />
  );
};

export default MobileImageWidget;
