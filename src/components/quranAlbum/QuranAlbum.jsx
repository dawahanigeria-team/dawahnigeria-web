import { FiHeadphones } from "react-icons/fi";
import { formatNumber } from "../UI/formatter";
import { FaPlay } from "react-icons/fa";
import { useLazyLoadImage } from "../../hooks";
import { useMemo } from "react";

const QuranAlbum = ({ categories, img, views }) => {
  const { imageRef } = useLazyLoadImage(img);
  const formattedViews = useMemo(() => formatNumber(views), [views]);

  return (
    <div>
      <div className="flex flex-col text-color-primary text-xs md:text-sm">
        <div className="relative group">
          <div className="absolute right-1 text-xl md:text-2xl font-bold md:font-black top-1 text-black">
            DN
          </div>
          <div>
            <img
              data-src={img}
              src="https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/album_d1wslv.jpg"
              alt={categories}
              className="w-full h-32 md:h-36 xl:h-40 rounded-md album"
              ref={imageRef}
            />
          </div>
          <div className="absolute z-[2] text-[#d4d4d4] bottom-3 left-3 flex gap-x-1 items-center">
            <FiHeadphones />
            <span>{formattedViews}</span>
          </div>

          {/* overlay */}
          <div className="gradientbg"></div>
          <div className="absolute bg-black/50 left-0 top-0 h-full w-full flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#222222]/70">
              <FaPlay className="text-[#cfcfcf] text-3xl" />
            </div>
          </div>
        </div>

        <p className="line-clamp-2 ">{categories}</p>
      </div>
    </div>
  );
};

export default QuranAlbum;
