import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import "./search.scss";
import { FiSearch, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import { SEARCH } from "../../utils/routes/constants";
import axios from "../../utils/useAxios";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const SUGGEST_DEBOUNCE_MS = 300;
const SUGGEST_LIMIT = 6;

const Search = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const searchCtx = useContext(SearchContext) || {};
  const { setText = () => {} } = searchCtx;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggLoading, setSuggLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (pathname !== SEARCH) {
      setInputValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const fetchSuggestions = (query) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSuggLoading(true);
    axios
      .get(
        `/searchApi.php?type=all&value=${encodeURIComponent(query)}&page=1&limit=${SUGGEST_LIMIT}&offset=0`,
        { signal: controller.signal }
      )
      .then((res) => {
        const items =
          (res?.data?.success === true || res?.data?.status === "success")
            ? (res?.data?.data || res?.data?.results || [])
            : [];
        setSuggestions(items.slice(0, SUGGEST_LIMIT));
        setShowSuggestions(true);
        setSuggLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setSuggestions([]);
        setSuggLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim() || value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value.trim());
    }, SUGGEST_DEBOUNCE_MS);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setShowSuggestions(false);
    setText(inputValue);
    navigate(`/dawahcast/search?query=${encodeURIComponent(inputValue)}`);
  };

  const handleSelectSuggestion = (item) => {
    const term = item.mp3_title || item.title || item.name || item.lecturer_name || "";
    setInputValue(term);
    setShowSuggestions(false);
    setText(term);
    navigate(`/dawahcast/search?query=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelectSuggestion(suggestions[activeIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  if (!isClient) {
    return (
      <div className="search_wrapper bg-input relative">
        <FiSearch className="search_icon" />
        <input
          type="search"
          className="search_input text-color"
          placeholder="Search lectures, lecturers..."
          value=""
          disabled
        />
      </div>
    );
  }

  return (
    <div className="search_root" ref={wrapperRef}>
      <div className="search_wrapper bg-input relative">
        <FiSearch className="search_icon" />
        <input
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          value={inputValue}
          type="search"
          className="search_input text-color"
          placeholder="Search lectures, lecturers..."
          aria-label="Search"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
        />
        {inputValue && (
          <button
            type="button"
            className="search_clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
        <button
          type="button"
          className="search_submit"
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
          aria-label="Search"
        >
          <FiSearch className="search_submit_icon" />
          <span className="search_submit_label">Search</span>
        </button>
      </div>

      {showSuggestions && (
        <div
          id="search-suggestions"
          role="listbox"
          className="search_suggestions bg-background text-color"
        >
          {suggLoading && (
            <div className="search_suggestion_status">Searching…</div>
          )}
          {!suggLoading && suggestions.length === 0 && inputValue.trim().length >= 2 && (
            <div className="search_suggestion_status">No matches</div>
          )}
          {!suggLoading && suggestions.length > 0 && (
            <>
              {suggestions.map((item, idx) => {
                const title = item.mp3_title || item.title || item.name || "Untitled";
                const subtitle = item.lecturer_name || item.album_name || "";
                const img = item.lecturer_image || item.img || IMAGE_PLACEHOLDERS.lecture;
                return (
                  <button
                    key={item.id || `${title}-${idx}`}
                    role="option"
                    aria-selected={idx === activeIndex}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelectSuggestion(item)}
                    className={`search_suggestion ${idx === activeIndex ? "is-active" : ""}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="search_suggestion_img"
                      onError={(e) => {
                        e.currentTarget.src = IMAGE_PLACEHOLDERS.lecture;
                      }}
                    />
                    <span className="search_suggestion_text">
                      <span className="search_suggestion_title">{title}</span>
                      {subtitle && (
                        <span className="search_suggestion_sub">{subtitle}</span>
                      )}
                    </span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={handleSubmit}
                className="search_suggestion_see_all"
              >
                See all results for "{inputValue}"
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
