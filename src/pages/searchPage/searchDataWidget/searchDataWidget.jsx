import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LECTURE } from "../../../utils/routes/constants";
const SearchDataWidget = ({
  lec_img,
  mp3_description,
  mp3_title,
  mp3_duration,
  cat_name,
  date,
  id,
}) => {
  useEffect(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#search");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazysong_abcewr.jpg";
        });
      });
    }

    lazyImages();
  }, []);

  return (
    <Link to={`${LECTURE}${id}`} className="w-full mb-3 grid grid-cols-8 gap-5">
      <div className="col-span-3 min-[615px]:col-span-2 h-[100px] min-[615px]:h-[150px] w-full rounded-md">
        <img
          src-data={lec_img}
          src={"https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazysong_abcewr.jpg"}
          id="search"
          alt=""
          className="w-full h-full rounded-md"
        />
      </div>
      <div className="col-span-5 min-[615px]:col-span-5">
        <div className="max-[615px]:whitespace-nowrap text-foreground max-[615px]:text-ellipsis max-[615px]:overflow-hidden w-full">
          {mp3_title}
        </div>
        <div className="max-[615px]:whitespace-nowrap text-color max-[615px]:text-ellipsis max-[615px]:overflow-hidden w-full">
          {cat_name}
        </div>
        <div className="max-[615px]:whitespace-nowrap text-color max-[615px]:text-ellipsis max-[615px]:overflow-hidden w-full">
          {mp3_description?.split("/")[0]}
        </div>
        <p className="text-color"> {`Date: ${date}`}</p>
      </div>
      <div className="max-[615px]:hidden text-color">{mp3_duration}</div>
    </Link>
  );
};

export default SearchDataWidget;
