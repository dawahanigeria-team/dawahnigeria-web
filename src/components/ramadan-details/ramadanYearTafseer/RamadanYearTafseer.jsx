import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import { ALBUMS, RAMADAN } from "../../../utils/routes/constants";
import { useKeywordAlbums } from "../../../hooks/albums";
import arrow from "../../../assets/svg/arrowleft.svg";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";
import { HiOutlinePlay } from "react-icons/hi2";
import HeaderRouter from "../../headerRouter/HeaderRouter";

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
    keyword: `Ramadan Tafseer ${year}`, // Construct the full keyword
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
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with back button */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <HeaderRouter title={`Ramadan Tafseer ${year}`} link={RAMADAN} />
        </div>

        {/* Main content */}
        <div className="py-8">
          {/* loading state for initial load */}
          {isLoading && page === 1 && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          {/* data grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums?.map((album) => (
              <Link
                key={album.nid}
                to={`${ALBUMS}${album.nid}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="relative aspect-square">
                  <img
                    src={album.img || IMAGE_PLACEHOLDERS.album}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <HiOutlinePlay className="text-white text-4xl" />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-foreground whitespace-normal break-words">
                    {album.title}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-color gap-1">
                    <span>Language:</span>
                    <span>{album.lang}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more button */}
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                Load More
              </button>
            </div>
          )}

          {/* Loading state for load more */}
          {isLoading && page > 1 && (
            <div className="flex justify-center mt-8">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
