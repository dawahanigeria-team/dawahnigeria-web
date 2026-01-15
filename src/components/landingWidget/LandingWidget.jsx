import React, { useContext, useMemo, useCallback, memo } from "react";
import { FiEye } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../UI/formatter";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import { AudioContext } from "../../App";
import { useDispatch } from "react-redux";
import AudioLoader from "../UI/audioLoader/audioLoader";
import { getaudioId, setPlaying } from "../../Redux/Actions/ActionCreators";

const LandingWidget = memo(({ categories, img, views, nid, styling, rpname }) => {
  const formattedViews = useMemo(() => formatNumber(views), [views]);
  const { setinitial, loading } = useContext(AudioContext);
  const dispatch = useDispatch();

  const handlePlayClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(setPlaying(false));
    dispatch(getaudioId(nid));
    setinitial(false);
  }, [dispatch, nid, setinitial]);

  const formatTitle = (title) => {
    if (!title) return "";
    return title.trim();
  };

  return (
    <div
      className={`flex flex-col justify-start items-start space-y-2 flex-shrink-0 min-w-[150px] w-[150px] sm:min-w-[220px] sm:w-[220px] h-fit`}
    >
      <div className="group w-full h-[115px] sm:h-[165px] relative rounded-md">
        <img
          src={img || IMAGE_PLACEHOLDERS.lecture}
          alt={categories || "Audio thumbnail"}
          className="w-full h-full object-cover rounded-md"
          width={220}
          height={165}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = IMAGE_PLACEHOLDERS.lecture;
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 motion-reduce:transition-none rounded-md" />
        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
          <FiEye className="text-white" aria-hidden="true" />
          <p className="text-white text-sm">{formattedViews}</p>
        </div>
        <button
          onClick={handlePlayClick}
          aria-label={`Play ${categories}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-dncolor-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          {loading ? (
            <AudioLoader />
          ) : (
            <FaPlay className="text-black ml-1" size={15} aria-hidden="true" />
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
});

LandingWidget.displayName = "LandingWidget";

export default LandingWidget;
