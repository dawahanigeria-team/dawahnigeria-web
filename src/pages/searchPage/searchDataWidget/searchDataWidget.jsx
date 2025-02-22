import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";

const SearchDataWidget = ({
  lec_img,
  cat_name,
  mp3_title,
  mp3_description,
  mp3_duration,
  lecturer_name,
  id,
  language,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    function lazyImages() {
      const lazy = document.querySelectorAll("#search");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecture;
        });
      });
    }

    lazyImages();
  }, []);

  return (
    <div
      onClick={() => navigate(`/dawahcast/l/${id}`)}
      className="w-full cursor-pointer bg-black/90 hover:bg-black/80 transition-all duration-200 p-4"
    >
      <div className="flex gap-4">
        {lec_img && (
          <div className="shrink-0">
            <img
              src={lec_img}
              alt={lecturer_name}
              className="w-16 h-16 rounded object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-normal text-white mb-1">{mp3_title}</h3>

          <div className="space-y-0.5 text-sm">
            {lecturer_name && (
              <p className="text-gray-400 flex items-center gap-2">
                <span>By:</span>
                <span>{lecturer_name}</span>
              </p>
            )}
            {cat_name && (
              <p className="text-gray-400 flex items-center gap-2">
                <span>Type:</span>
                <span className="capitalize">{cat_name}</span>
              </p>
            )}
            {language && (
              <p className="text-gray-400 flex items-center gap-2">
                <span>Language:</span>
                <span>{language}</span>
              </p>
            )}
            {mp3_duration && (
              <p className="text-gray-400">Duration: {mp3_duration}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDataWidget;
