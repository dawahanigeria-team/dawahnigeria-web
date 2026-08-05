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

  // Titles are stored with the lecturer appended, e.g.
  //   "Fajr Talk-Salat 14(03-06-26) (Yoruba) - Ustadh AbdulWaasi Eleyinke (Yoruba)"
  // while the same lecturer is already rendered on the line below. Dropping the
  // duplicate buys back most of a card's title space, which is what pushes
  // these titles to four wrapped lines.
  //
  // Only cut when the trailing segment actually matches the lecturer we are
  // about to display — a blind "cut at the last dash" would eat real titles.
  const formatTitle = useCallback(
    (title) => {
      if (!title) return "";
      const cleaned = title.trim();
      if (!rpname) return cleaned;

      // "Ustadh AbdulWaasi Eleyinke (Iseyin)" -> "ustadh abdulwaasi eleyinke"
      const lecturer = String(rpname).replace(/\s*\([^)]*\)\s*$/, "").trim().toLowerCase();
      if (lecturer.length < 4) return cleaned;

      const marker = cleaned.toLowerCase().lastIndexOf(` - ${lecturer}`);
      if (marker <= 0) return cleaned;

      const trimmed = cleaned.slice(0, marker).trim();
      // Never return an empty or near-empty title just to remove a duplicate.
      return trimmed.length >= 3 ? trimmed : cleaned;
    },
    [rpname]
  );

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
        {/* Clamped to two lines so every card in a row is the same height and
            a long title cannot push the rest of the feed down the page. The
            full title stays available on hover and to screen readers. */}
        <p
          className="text-xs sm:text-sm font-medium text-foreground pl-[3%] mb-0.5 break-words line-clamp-2"
          title={formatTitle(categories)}
        >
          {formatTitle(categories)}
        </p>
        {rpname && (
          <p className="text-[11px] sm:text-sm text-muted-foreground line-clamp-2 pl-[3%] min-h-[28px]">
            {rpname}
          </p>
        )}
      </div>
    </div>
  );
});

LandingWidget.displayName = "LandingWidget";

export default LandingWidget;
