import React from "react";
import { useNavigate } from "react-router-dom";
import { getResultImage, getResultPlaceholder } from "../../../utils/getResultImage";
import { FaPlay, FaEye } from "react-icons/fa";
import { formatLectureDate, formatRelativeLectureDate } from "../../../utils/formatLectureDate";

const SearchDataWidget = ({
  item,
  cat_name,
  mp3_title,
  mp3_description,
  lecturer_name,
  id,
  duration,
  views,
  language,
  updatedDate,
}) => {
  const navigate = useNavigate();
  // Relative for scanning ("3d ago"); the exact date stays available on hover.
  const lectureDate = formatRelativeLectureDate(updatedDate);
  const lectureDateExact = formatLectureDate(updatedDate);
  const imgSrc = getResultImage(item);
  const fallbackSrc = getResultPlaceholder(cat_name);

  const getNavigationUrl = () => {
    const type = cat_name?.toLowerCase();

    switch (type) {
      case 'album':
        return `/dawahcast/a/${id}`;
      case 'video':
        return `/dawahcast/videos/${id}`;
      case 'playlist':
        return `/dawahcast/playlists/${id}`;
      case 'lecturer':
      case 'resource_person':
        return `/dawahcast/rp/${id}`;
      case 'recitation':
      case 'quran':
        return `/dawahcast/quran/${id}`;
      case 'lecture':
      default:
        return `/dawahcast/l/${id}`;
    }
  };


  return (
    <div
      onClick={() => navigate(getNavigationUrl())}
      className="w-full cursor-pointer bg-black/90 hover:bg-black/70 active:bg-black/60 transition-all duration-200 p-3 sm:p-4 border-b border-gray-800 hover:border-gray-700 group"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0 relative">
          <img
            src={imgSrc}
            alt={lecturer_name || mp3_title || ""}
            loading="lazy"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover bg-gray-800"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackSrc) {
                e.currentTarget.src = fallbackSrc;
              }
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
            <FaPlay className="text-white text-xl sm:text-2xl" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium text-white mb-1 line-clamp-2 group-hover:text-gray-100">
            {mp3_title}
          </h3>

          <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
            {lecturer_name && (
              <p className="text-gray-400 flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold shrink-0">By:</span>
                <span className="truncate">{lecturer_name}</span>
              </p>
            )}

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              {cat_name && (
                <span className="text-gray-400 flex items-center gap-1">
                  <span className="font-semibold">Type:</span>
                  <span className="capitalize">{cat_name}</span>
                </span>
              )}
              {duration && (
                <span className="text-gray-400 flex items-center gap-1">
                  <span className="font-semibold">Duration:</span>
                  <span>{duration}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-0.5">
              {views && (
                <span className="text-gray-400 flex items-center gap-1">
                  <FaEye className="text-xs" />
                  <span className="text-xs">{views.toLocaleString()}</span>
                </span>
              )}
              {language && (
                <span className="px-1.5 sm:px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full text-[10px] sm:text-xs">
                  {language}
                </span>
              )}
              {lectureDate && (
                <span className="text-gray-400 text-xs" title={lectureDateExact}>
                  {lectureDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDataWidget;
