import React, { useEffect } from "react";

const ImageWidget = ({ image }) => {
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousels");
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
      id="carousels"
      className="w-full h-full object-fill rounded-md"
      src-data={image}
      src={"https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazyanime_i8hntv.jpg"}
      // src-data={image}
      alt="1"
    />
  );
};

export default ImageWidget;
