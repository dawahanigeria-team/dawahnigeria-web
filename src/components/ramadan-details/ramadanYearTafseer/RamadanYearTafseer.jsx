import { useState, useEffect, useMemo } from "react";
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
  const [selectedLanguage, setSelectedLanguage] = useState("all");

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
    error,
  } = useKeywordAlbums({
    keyword: `Ramadan Tafseer ${year}`,
    page,
  });

  // Extract unique languages and count lectures per language
  const languageStats = useMemo(() => {
    if (!albums?.length) return [];

    const stats = albums.reduce((acc, album) => {
      const lang = album.lang || "Unknown";
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(stats)
      .map(([lang, count]) => ({
        lang,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [albums]);

  // Filter albums by selected language
  const filteredAlbums = useMemo(() => {
    if (selectedLanguage === "all") return albums;
    return albums?.filter((album) => album.lang === selectedLanguage);
  }, [albums, selectedLanguage]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
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

        {/* Language filter */}
        {languageStats.length > 0 && (
          <div className="overflow-x-auto scrollbar-hide py-4 border-b border-border sticky top-16 z-40 bg-background/80 backdrop-blur-lg">
            <div className="flex gap-2 min-w-max px-2">
              <button
                onClick={() => setSelectedLanguage("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedLanguage === "all"
                      ? "bg-primary text-white"
                      : "bg-accent hover:bg-accent/80 text-foreground"
                  }`}
              >
                All ({albums?.length || 0})
              </button>
              {languageStats.map(({ lang, count }) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedLanguage === lang
                        ? "bg-primary text-white"
                        : "bg-accent hover:bg-accent/80 text-foreground"
                    }`}
                >
                  {lang} ({count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="py-8 pb-32 md:pb-8">
          {/* Error state */}
          {error && (
            <div className="text-center text-red-500 py-4">
              Error loading lectures. Please try again.
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredAlbums?.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No lectures found for this year
              {selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}.
            </div>
          )}

          {/* data grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            {filteredAlbums?.map((album) => (
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

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          )}

          {/* Load more button */}
          {!isLoading && hasMore && (
            <div className="flex justify-center mt-4 mb-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
