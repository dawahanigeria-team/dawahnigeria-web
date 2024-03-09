import React, { useEffect, useMemo } from "react";
import { FiHeadphones } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
const LandingWidget = ({ categories, img, views, styling }) => {
  const formattedViews = useMemo(() => formatNumber(views), [views]);

  ////
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#song");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }
    lazyImage();
  }, []);

  return (
    <div
      className={`flex flex-col justify-start items-start space-y-2 ${
        styling
          ? "w-[150px] h-fit sm:w-[12rem]"
          : "w-[150px]  h-fit sm:w-[13.5rem]"
      }`}
    >
      <div className="group w-full h-[115px] sm:h-[165px] relative rounded-md">
        <img
          src-data={img}
          id="song"
          src={IMAGE_PLACEHOLDERS.lecture}
          alt="background"
          className="w-full h-full rounded-md"
        />
        <div className="gradientbg"></div>
        <p className="font-bold text-base text-black name_abs absolute top-4 sm:top-2 right-2  sm:text-2xl">
          DN
        </p>
        <div
          className={
            !styling ? "absolute bottom-2 left-2 flex items-center" : "hidden"
          }
        >
          <FiHeadphones className="text-[22px] text-[#d4d4d4]" />
          <p className="ml-2 text-xs text-[#d4d4d4] boom sm:text-base whitespace-nowrap w-full text-ellipsis overflow-hidden">
            {formattedViews}
          </p>
        </div>

        <div className="absolute rounded-md bg-black/50 left-0 top-0 h-full w-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#222222]/70">
            <FaPlay className="text-[#cfcfcf] text-3xl" />
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-sm w-full  line-clamp-2  pl-[3%]  text-color-primary ">
        {categories}
      </p>
    </div>
  );
};

export default LandingWidget;
