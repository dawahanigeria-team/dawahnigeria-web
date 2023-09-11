import React, { useEffect } from "react";
import "./genres.scss";
const GenreWidget = ({ img, name }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#genre");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/C04GvGmXGh.jpeg";
        });
      });
    }

    lazyImage();
  }, []);

  return (
    <div className="genre_img_wrap">
      <img
        className="genre_img"
        id="genre"
        src-data={img}
        src={"https://imagetolink.com/ib/C04GvGmXGh.jpeg"}
        alt={`genre`}
      />
      <span className="name_abs">{name}</span>
    </div>
  );
};

export default GenreWidget;
