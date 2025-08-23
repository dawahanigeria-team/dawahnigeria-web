import React, { useContext, useEffect, useMemo } from "react";
import { FiEye } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { AudioContext } from "../../App";
import { useDispatch } from "react-redux";
import AudioLoader from "../UI/audioLoader/audioLoader";
import { getaudioId, setPlaying } from "../../Redux/Actions/ActionCreators";

const LandingWidget = ({ categories, img, views, nid, styling, rpname }) => {
  const formattedViews = useMemo(() => formatNumber(views), [views]);
  const { audioRef, setinitial, loading } = useContext(AudioContext);
  const dispatch = useDispatch();

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

  const handlePlayClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    dispatch(setPlaying(false));
    dispatch(getaudioId(nid));
    setinitial(false);
  }

  // Format the title to remove any unwanted characters or patterns
  const formatTitle = (title) => {
    if (!title) return "";
    return title.trim();
  };

  return (
    <div
      className={`flex flex-col justify-start items-start space-y-2 ${
        styling
          ? "w-[220px] h-fit sm:w-[220px]"
          : "w-[220px] h-fit sm:w-[220px]"
      }`}
    >
      <div className="group w-full h-[115px] sm:h-[165px] relative rounded-md">
        <img
          src-data={img}
          src={IMAGE_PLACEHOLDERS.lecture}
          id="song"
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-md" />
        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
          <FiEye className="text-white" />
          <p className="text-white text-sm">{formattedViews}</p>
        </div>
        <button
          onClick={handlePlayClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#d6ff00] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          {loading ? (
            <AudioLoader />
          ) : (
            <FaPlay className="text-black ml-1" size={15} />
          )}
        </button>
      </div>
      <div className="space-y-1 w-full">
        <p className="text-xs sm:text-sm font-medium text-color-primary pl-[3%] mb-0.5 break-words">
          {formatTitle(categories)}
        </p>
        {rpname && (
          <p className="text-[11px] sm:text-sm text-gray-500 line-clamp-2 pl-[3%] min-h-[28px]">
            {rpname}
          </p>
        )}
      </div>
    </div>
  );
};

export default LandingWidget;
