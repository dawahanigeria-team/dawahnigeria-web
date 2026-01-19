import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ALBUMS, RAMADAN } from "../../../utils/routes/constants";
import { useKeywordAlbums } from "../../../hooks/albums";
import { IMAGE_PLACEHOLDERS } from "../../../utils/imagePlaceholders";
import { HiOutlinePlay, HiMagnifyingGlass, HiWifi, HiArrowPath, HiBookOpen } from "react-icons/hi2";
import { FiChevronLeft, FiPlay } from "react-icons/fi";
import ErrorBoundary from "../../UI/ErrorBoundary";
import Container from "../../container/Container";
import HeadMeta from "../../head-meta";
import "./ramadanYearTafseer.scss";

export const RamadanYearTafseer = () => {
  return (
    <ErrorBoundary>
      <Container>
        <RamadanYearTafseerContent />
      </Container>
    </ErrorBoundary>
  );
};

const RamadanYearTafseerContent = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle media errors
  useEffect(() => {
    const handleMediaError = (event) => {
      if (event.target.tagName === "IMG") {
        event.target.src = IMAGE_PLACEHOLDERS.album;
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

  // Extract unique languages with counts
  const languageStats = useMemo(() => {
    if (!albums?.length) return [];
    const stats = albums.reduce((acc, album) => {
      const lang = album.lang || "Unknown";
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(stats)
      .map(([lang, count]) => ({ lang, count }))
      .sort((a, b) => b.count - a.count);
  }, [albums]);

  // Filter albums by language
  const filteredAlbums = useMemo(() => {
    if (!albums) return [];
    if (selectedLanguage === "all") return albums;
    return albums.filter((album) => album.lang === selectedLanguage);
  }, [albums, selectedLanguage]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && !debouncedSearch) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore, debouncedSearch]);

  const totalLectures = useMemo(() => {
    if (!albums?.length) return 0;
    return albums.reduce((sum, album) => sum + (parseInt(album.lec_no) || 0), 0);
  }, [albums]);

  const parseAlbumTitle = useCallback((title = "") => {
    const trimmed = title.trim();
    if (!trimmed) return { displayTitle: "Untitled Album", lecturerName: "" };
    const parts = trimmed.split(" - ");
    if (parts.length < 2) {
      return { displayTitle: trimmed, lecturerName: "" };
    }
    const lecturerName = parts.pop().trim();
    const displayTitle = parts.join(" - ").trim();
    return { displayTitle, lecturerName };
  }, []);

  return (
    <div className="ramadan-tafseer-page">
      <HeadMeta title={`Ramadan Tafseer ${year} - Dawah Nigeria`} />
      
      {/* Geometric Background */}
      <div className="ramadan-tafseer-geometric-bg" aria-hidden="true" />

      <div className="ramadan-tafseer-container">
        {/* Header */}
        <header className="ramadan-tafseer-header">
          <div className="ramadan-tafseer-header-inner">
            <button
              onClick={() => navigate(RAMADAN)}
              className="ramadan-tafseer-back-btn"
              aria-label="Back to Ramadan"
            >
              <FiChevronLeft />
            </button>
            <div className="ramadan-tafseer-title-group">
              <h1 className="ramadan-tafseer-title">
                Ramadan Tafseer{" "}
                <span className="ramadan-tafseer-year">{year}</span>
                <span className="ramadan-tafseer-year-suffix">AH</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="ramadan-tafseer-hero">
          <div className="ramadan-tafseer-hero-badge">
            <HiBookOpen />
            <span>Tafseer Collection</span>
          </div>
          <h2 className="ramadan-tafseer-hero-title">
            Ramadan {year}
          </h2>
          <p className="ramadan-tafseer-hero-subtitle">
            Explore the blessed month's teachings and reflections
          </p>
        </section>

        {/* Stats */}
        {!isLoading && !error && albums?.length > 0 && (
          <div className="ramadan-tafseer-stats">
            <div className="ramadan-tafseer-stat">
              <span className="ramadan-tafseer-stat-value">{total || albums.length}</span>
              <span className="ramadan-tafseer-stat-label">Albums</span>
            </div>
            <div className="ramadan-tafseer-stat">
              <span className="ramadan-tafseer-stat-value">{totalLectures}</span>
              <span className="ramadan-tafseer-stat-label">Lectures</span>
            </div>
            <div className="ramadan-tafseer-stat">
              <span className="ramadan-tafseer-stat-value">{languageStats.length}</span>
              <span className="ramadan-tafseer-stat-label">Languages</span>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="ramadan-tafseer-search-section">
          <div className="ramadan-tafseer-search-wrapper">
            <HiMagnifyingGlass className="ramadan-tafseer-search-icon" />
            <input
              type="text"
              placeholder="Search by title or lecturer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ramadan-tafseer-search-input"
            />
            {debouncedSearch && !isLoading && (
              <span className="ramadan-tafseer-search-results">
                {total} found
              </span>
            )}
          </div>

          {/* Language Pills */}
          {languageStats.length > 0 && (
            <div className="ramadan-tafseer-languages">
              <button
                onClick={() => setSelectedLanguage("all")}
                className={`ramadan-tafseer-language-pill ${selectedLanguage === "all" ? "active" : ""}`}
              >
                All
                <span className="ramadan-tafseer-language-count">
                  ({albums?.length || 0})
                </span>
              </button>
              {languageStats.map(({ lang, count }) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`ramadan-tafseer-language-pill ${selectedLanguage === lang ? "active" : ""}`}
                >
                  {lang}
                  <span className="ramadan-tafseer-language-count">({count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <main className="ramadan-tafseer-content">
          {/* Error State */}
          {error && (
            <div className="ramadan-tafseer-error">
              <div className="ramadan-tafseer-error-card">
                <div className="ramadan-tafseer-error-icon">
                  <HiWifi />
                </div>
                <h3 className="ramadan-tafseer-error-title">Connection Error</h3>
                <p className="ramadan-tafseer-error-text">
                  {error?.message || "Unable to load content. Please check your connection."}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="ramadan-tafseer-retry-btn"
                >
                  <HiArrowPath />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredAlbums?.length === 0 && (
            <div className="ramadan-tafseer-empty">
              <div className="ramadan-tafseer-empty-icon">
                <HiBookOpen />
              </div>
              <h3 className="ramadan-tafseer-empty-title">No Albums Found</h3>
              <p className="ramadan-tafseer-empty-text">
                {debouncedSearch
                  ? `No results for "${debouncedSearch}"${selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}`
                  : `No Tafseer albums available${selectedLanguage !== "all" ? ` in ${selectedLanguage}` : ""}`}
              </p>
            </div>
          )}

          {/* Results Summary */}
          {debouncedSearch && !error && filteredAlbums?.length > 0 && (
            <p className="ramadan-tafseer-results-summary">
              Showing <span className="ramadan-tafseer-results-highlight">{filteredAlbums.length}</span> of{" "}
              <span className="ramadan-tafseer-results-highlight">{total}</span> results
              {selectedLanguage !== "all" && ` in ${selectedLanguage}`}
            </p>
          )}

          {/* Albums Grid */}
          {!error && filteredAlbums?.length > 0 && (
            <div className="ramadan-tafseer-grid">
              {filteredAlbums.map((album) => {
                const rawTitle = album.title || album.name || "";
                const parsed = parseAlbumTitle(rawTitle);
                const lecturerName =
                  album.rpname ||
                  album.rp_name ||
                  album.lecturer ||
                  album.rp ||
                  parsed.lecturerName;

                return (
                  <Link
                    key={album.nid}
                    to={`${ALBUMS}${album.nid}`}
                    className="ramadan-tafseer-album-card"
                  >
                    <div className="ramadan-tafseer-album-image-wrapper">
                      <img
                        src={album.img || IMAGE_PLACEHOLDERS.album}
                        alt={rawTitle || "Ramadan Tafseer album"}
                        className="ramadan-tafseer-album-image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = IMAGE_PLACEHOLDERS.album;
                        }}
                      />
                      <div className="ramadan-tafseer-album-overlay" />
                      <div className="ramadan-tafseer-album-play">
                        <FiPlay />
                      </div>
                    </div>
                    <div className="ramadan-tafseer-album-content">
                      <h3 className="ramadan-tafseer-album-title" title={rawTitle}>
                        {parsed.displayTitle || rawTitle}
                      </h3>
                      {lecturerName && (
                        <p className="ramadan-tafseer-album-lecturer" title={lecturerName}>
                          {lecturerName}
                        </p>
                      )}
                      <div className="ramadan-tafseer-album-meta">
                        <span className="ramadan-tafseer-album-lectures">
                          <HiOutlinePlay />
                          {album.lec_no} lectures
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="ramadan-tafseer-loading">
              <div className="ramadan-tafseer-loader" />
              <p className="ramadan-tafseer-loading-text">Loading Tafseer albums...</p>
            </div>
          )}

          {/* Load More */}
          {!isLoading && !error && hasMore && !debouncedSearch && selectedLanguage === "all" && (
            <div className="ramadan-tafseer-load-more">
              <button onClick={loadMore} className="ramadan-tafseer-load-more-btn">
                Load More Albums
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RamadanYearTafseer;
