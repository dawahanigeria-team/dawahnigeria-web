import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import { ALBUMS, RAMADAN } from "../../../utils/routes/constants";
import { useKeywordAlbums } from "../../../hooks/albums";
import arrow from "../../../assets/svg/arrowleft.svg";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";
import { HiOutlinePlay } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiWifi, HiArrowPath } from "react-icons/hi2";
import HeaderRouter from "../../headerRouter/HeaderRouter";
import ErrorBoundary from "../../UI/ErrorBoundary";

export const RamadanYearTafseer = () => {
  return (
    <ErrorBoundary>
      <RamadanYearTafseerContent />
    </ErrorBoundary>
  );
};

// Separate the main component content for error boundary wrapping
const RamadanYearTafseerContent = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Add error handling for media errors
  useEffect(() => {
    const handleMediaError = (event) => {
      if (event.target.tagName === "IMG" || event.target.tagName === "AUDIO") {
        console.warn("Media error caught:", event);
        // Replace with placeholder if it's an image
        if (event.target.tagName === "IMG") {
          event.target.src = IMAGE_PLACEHOLDERS.album;
        }
      }
    };

    document.addEventListener("error", handleMediaError, true);
    return () => document.removeEventListener("error", handleMediaError, true);
  }, []);

  const {
    data: albums,
    isLoading,
    hasMore,
    error,
    total,
  } = useKeywordAlbums({
    keyword: `Ramadan Tafseer ${year}`,
    page,
    search: debouncedSearch,
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

  // Filter albums only by language since search is now handled by the server
  const filteredAlbums = useMemo(() => {
    if (!albums) return [];

    // Filter by language
    if (selectedLanguage !== "all") {
      return albums.filter((album) => album.lang === selectedLanguage);
    }

    return albums;
  }, [albums, selectedLanguage]);

  const loadMore = () => {
    if (!isLoading && hasMore && !debouncedSearch) {
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

        {/* Search and Filter Section */}
        <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          {/* Search Input */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or lecturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-accent rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg" />
              {debouncedSearch && !isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  {total} results
                </div>
              )}
            </div>
          </div>

          {/* Language filter */}
          {languageStats.length > 0 && (
            <div className="overflow-x-auto scrollbar-hide py-2 px-4">
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => setSelectedLanguage("all")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedLanguage === "all"
                        ? "bg-primary text-white"
                        : "bg-accent hover:bg-accent/80 text-foreground"
                    }`}
                >
                  All ({albums?.length || 0}/{total})
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
        </div>

        {/* Main content */}
        <div className="py-8 pb-32 md:pb-8">
          {/* Error state */}
          {error && (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full">
                <HiWifi className="text-red-500 text-4xl mx-auto mb-4" />
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Connection Error
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {error?.message ||
                    "Unable to establish connection to server. Please check your internet connection and try again."}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <HiArrowPath className="text-lg" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && filteredAlbums?.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              {debouncedSearch
                ? `No Ramadan Tafseer ${year} found matching "${debouncedSearch}"${
                    selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""
                  }`
                : `No lectures found${
                    selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""
                  }`}
            </div>
          )}

          {/* Results summary when searching */}
          {debouncedSearch && !error && filteredAlbums?.length > 0 && (
            <div className="text-sm text-muted-foreground mb-4">
              Showing {filteredAlbums.length} of {total} results
              {selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}
            </div>
          )}

          {/* data grid */}
          {!error && (
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
                    <div className="flex flex-col text-xs text-color gap-0.5">
                      <div className="flex items-center gap-1">
                        <span>Lectures:</span>
                        <span>{album.lec_no}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Loading state */}
          {isLoading && !error && (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          )}

          {/* Load more button - only show if there are no active filters */}
          {!isLoading &&
            !error &&
            hasMore &&
            !debouncedSearch &&
            selectedLanguage === "all" && (
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
