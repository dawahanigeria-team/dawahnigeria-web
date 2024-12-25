import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import "./search.scss";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import {
  SEARCH,
  LECTURERS,
  VIDEOS,
  PLAYLISTS,
  QURAN,
} from "../../utils/routes/constants";
import SearchDropdown from "./SearchDropdown";
import axios from "axios";
import debounce from "lodash/debounce";

const Search = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setText, setSearchType, searchType } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const [dropdownResults, setDropdownResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (searchText, currentSearchType) => {
      if (!searchText.trim()) {
        setDropdownResults([]);
        setLoading(false);
        return;
      }

      try {
        const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/searchApi.php`;
        const encodedValue = encodeURIComponent(searchText);
        const response = await axios.get(
          `${baseUrl}?type=${currentSearchType}&value=${encodedValue}`
        );

        if (response.data.success) {
          setDropdownResults(response.data.data.slice(0, 5)); // Limit to 5 results
        } else {
          setDropdownResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setDropdownResults([]);
      }
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    // Set search type based on current route
    const determineSearchType = () => {
      switch (pathname) {
        case LECTURERS:
          return "lecturers";
        case VIDEOS:
          return "videos";
        case PLAYLISTS:
          return "playlists";
        case QURAN:
          return "recitations";
        case "/dawahcast":
        case "/":
          return "lectures";
        default:
          return "lectures";
      }
    };

    setSearchType(determineSearchType());
  }, [pathname, setSearchType]);

  useEffect(() => {
    if (pathname !== SEARCH) {
      setInputValue("");
      setDropdownResults([]);
    }
  }, [pathname]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setLoading(true);
    setShowDropdown(true);
    debouncedSearch(value, searchType);
  };

  const handleItemSelect = (item) => {
    console.log("Selected item:", item);
    console.log("Current pathname:", pathname);
    console.log("Current searchType:", searchType);

    // Get the ID from either id field or _id.$oid
    const lectureId = item.id || (item._id && item._id.$oid);

    // For lectures or when on root page, just navigate directly
    if (
      pathname === "/dawahcast" ||
      pathname === "/" ||
      searchType === "lectures"
    ) {
      if (lectureId) {
        console.log("Navigating to:", `/dawahcast/l/${lectureId}`);
        navigate(`/dawahcast/l/${lectureId}`);
        setShowDropdown(false);
        return;
      }
    }

    // For other cases, update input and navigate
    setInputValue(item.name || item.mp3_title || item.title);
    setShowDropdown(false);
    setText(item.name || item.mp3_title || item.title);

    // Handle specific types
    if (searchType === "lecturers" && item.name) {
      navigate(`/dawahcast/rp/${lectureId}`);
    } else if (searchType === "videos" && lectureId) {
      navigate(`/dawahcast/videos/${lectureId}`);
    } else if (searchType === "playlists" && lectureId) {
      navigate(`/dawahcast/playlists/${lectureId}`);
    } else if (searchType === "recitations" && lectureId) {
      navigate(`/dawahcast/quran/${lectureId}`);
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setShowDropdown(false);

    if (dropdownResults.length > 0) {
      const firstResult = dropdownResults[0];
      const lectureId =
        firstResult.id || (firstResult._id && firstResult._id.$oid);

      if (lectureId) {
        if (
          pathname === "/dawahcast" ||
          pathname === "/" ||
          searchType === "lectures"
        ) {
          // For lectures or root page, just navigate
          navigate(`/dawahcast/l/${lectureId}`);
        } else {
          // For other cases, update text and navigate
          setText(inputValue);
          navigate(`/dawahcast/l/${lectureId}`);
        }
      }
    }
  };

  useEffect(() => {
    // Clean up when component unmounts or route changes
    return () => {
      setDropdownResults([]);
      setShowDropdown(false);
      setLoading(false);
    };
  }, [pathname]);

  return (
    <div ref={searchRef} className="search_wrapper bg-input relative">
      <FiSearch className="search_icon" />
      <input
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onFocus={() => setShowDropdown(true)}
        value={inputValue}
        type="search"
        className="search_input text-color"
        placeholder="Search"
      />
      {showDropdown && (
        <SearchDropdown
          results={dropdownResults}
          loading={loading}
          onSelect={handleItemSelect}
        />
      )}
    </div>
  );
};

export default Search;
