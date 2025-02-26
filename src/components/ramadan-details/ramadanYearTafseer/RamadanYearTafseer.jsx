import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import { ALBUMS, RAMADAN } from "../../../utils/routes/constants";
import { useKeywordAlbums } from "../../../hooks/albums";
import Container from "../../container/Container";
import arrow from "../../../assets/svg/arrowleft.svg";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";
import { FiHeadphones } from "react-icons/fi";
import { HiOutlinePlay } from "react-icons/hi2";

export const RamadanYearTafseer = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    data: albums,
    isLoading,
    hasMore,
  } = useKeywordAlbums({
    keyword: decodeURIComponent(year), // The year param is already the full keyword
    page,
  });

  console.log("Albums data:", albums);

  // Check if albums is undefined or empty
  if (!albums || albums.length === 0) {
    console.log("No albums data available");
  } else {
    console.log("First album title:", albums[0].title);
    console.log("First album data:", albums[0]);
  }

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Function to extract title parts similar to lectureTitleExtractor in LecturesListDetail
  const extractTitle = (fullTitle) => {
    if (!fullTitle) return "Untitled Album";

    if (fullTitle.includes("-")) {
      const parts = fullTitle.split("-");
      return parts[0].trim();
    }

    return fullTitle;
  };

  return (
    <Container>
      <div className="pt-20 md:pt-20">
        {/* Breadcrumb navigation - desktop only */}
        <div className="lecdet_breadcrumb mb-6 hidden md:flex">
          <button
            onClick={() => navigate(RAMADAN)}
            className="lecdet_breadcrumb_first"
          >
            Back /
          </button>
          <p className="lecdet_breadcrumb_second text-foreground">
            {decodeURIComponent(year)}
          </p>
        </div>

        {/* Mobile back button and title header - similar to LecturesListDetail */}
        <div className="mobile_lecdet_tab_wrap md:hidden">
          <div
            className={`py-4 fixed top-0 left-0 right-0 z-50 ${
              scrolled ? "bg-black shadow-md" : "bg-black"
            } transition-all duration-300`}
          >
            <button
              onClick={() => navigate(RAMADAN)}
              aria-label="Go back"
              className="fixed_mob_arrow ml-4"
            >
              <img className="fixed_mob_arrow_sz" src={arrow} alt="back" />
            </button>

            {/* Mobile title header - similar to leclistdet_head_mob_head */}
            <div className="text-white text-xl font-bold ml-12 truncate pr-4">
              {decodeURIComponent(year)}
            </div>
          </div>
        </div>

        {/* loading state for initial load */}
        {isLoading && page === 1 && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}

        {/* data grid */}
        <div className="lecalb_wrapper mt-20 md:mt-0">
          {albums?.map(({ img, title, nid, lec_no, views }) => {
            // Extract lecturer name if present in the title
            let mainTitle = title || "Untitled Album";
            let lecturer = "";

            if (title && title.includes("-")) {
              const parts = title.split("-");
              lecturer = parts.pop().trim();
              mainTitle = parts.join("-").trim();
            }

            return (
              <Link
                to={`${ALBUMS}${nid}`}
                className="lecalb_album_item"
                key={`album-${nid}`}
              >
                {/* Card container with flex column layout */}
                <div className="flex flex-col w-full cursor-pointer rounded-lg overflow-hidden shadow-md">
                  {/* Image container */}
                  <div className="w-full aspect-square overflow-hidden relative">
                    <img
                      src={img || IMAGE_PLACEHOLDERS.lecture}
                      alt={title || "Album cover"}
                      className="w-full h-full object-cover"
                    />

                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-12 h-12 bg-[#d6ff00] bg-opacity-90 rounded-full flex items-center justify-center">
                        <HiOutlinePlay className="text-black text-2xl ml-0.5" />
                      </div>
                    </div>

                    {/* Views count */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center z-30 drop-shadow-md">
                      <FiHeadphones className="mr-1" />
                      <span>
                        {views
                          ? views >= 1000
                            ? (views / 1000).toFixed(1) + "K"
                            : views
                          : "0"}
                      </span>
                    </div>
                  </div>

                  {/* Title container - same for both mobile and desktop */}
                  <div className="bg-black p-4">
                    <h3 className="text-white text-base md:text-sm font-bold break-words line-clamp-2">
                      {mainTitle || "Untitled Album"}
                    </h3>

                    {lecturer && (
                      <p className="text-gray-300 text-xs break-words mt-1">
                        {lecturer}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* load more button */}
        {hasMore && (
          <div className="flex justify-center mt-4 mb-20">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-primary text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};
