import React, { useEffect } from "react";

const MobileImageWidget = ({ image }) => {
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousel");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;

      im.addEventListener("error", () => {
        im.src = "https://imagetolink.com/ib/bPd0uRB2BT.jpeg";
      });
    });
  }, []);
  return (
    <img
      className="landing_carousel_img w-full rounded-[3px] h-[162px]"
      id="carousel"
      src-data={image}
      src="https://imagetolink.com/ib/bPd0uRB2BT.jpeg"
      alt="1"
    />
  );
};

export default MobileImageWidget;
