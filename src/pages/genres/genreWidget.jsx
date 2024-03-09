import React, { useEffect } from "react";
import "./genres.scss";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
const GenreWidget = ({ img, name }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#genre");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.albumWidget;
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
        src={IMAGE_PLACEHOLDERS.albumWidget}
        alt={`genre`}
      />
      <span className="name_abs">{name}</span>
    </div>
  );
};

export default GenreWidget;
