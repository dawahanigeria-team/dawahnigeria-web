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
            Ramadan Tafseer {year}
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
              Ramadan Tafseer {year}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
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
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {extractTitle(album.title)}
                </h3>
                <div className="flex items-center mt-1 text-xs text-color">
                  <FiHeadphones className="mr-1" />
                  <span>{album.duration || "00:00"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more button */}
        {hasMore && !isLoading && (
          <div className="flex justify-center p-4">
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
          <div className="flex justify-center p-4">
            <Loader />
          </div>
        )}
      </div>
    </Container>
  );
};
