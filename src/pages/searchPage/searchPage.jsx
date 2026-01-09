import React, { useEffect, useState, useContext, useCallback } from "react";
import Container from "../../components/container/Container";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import { NavContext } from "../../components/layout/Layout";
import { FaFilter } from "react-icons/fa";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import SearchDataWidget from "./searchDataWidget/searchDataWidget";
import {
  getSearchData,
  getSearchOptions,
  getSearchRecord,
} from "../../Redux/Actions/ActionCreators";
import { SEARCH } from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import { trackSearch } from "../../utils/posthog";

const SearchPage = () => {
  const searchContext = useContext(SearchContext) || {};
  const {
    setText = () => {},
    languageId = [],
    lecturerId = [],
    categoryId = [],
    albumId = []
  } = searchContext;
  const { searchData } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const { setRes, setisOpen } = useContext(NavContext);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSideBar = () => {
    setRes(1);
    setisOpen(true);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return languageId.length + lecturerId.length + categoryId.length + albumId.length;
  };

  // Get filter labels for display
  const getFilterLabel = (type, id) => {
    const { searchOptions } = useSelector((state) => state.search);
    if (!searchOptions) return null;

    let items = [];
    switch (type) {
      case 'language':
        items = searchOptions.lang || [];
        break;
      case 'lecturer':
        items = searchOptions.rp || [];
        break;
      case 'category':
        items = searchOptions.cat || [];
        break;
      case 'album':
        items = searchOptions.alb || [];
        break;
    }

    const item = items.find(i => i.id?.toString() === id?.toString());
    return item?.name;
  };

  // Clear all filters
  const clearAllFilters = () => {
    const { setLanguageId, setLecturerId, setCategoryId, setAlbumId } = searchContext;
    setLanguageId([]);
    setLecturerId([]);
    setCategoryId([]);
    setAlbumId([]);
  };

  // Remove individual filter
  const removeFilter = (type, id) => {
    const { setLanguageId, setLecturerId, setCategoryId, setAlbumId } = searchContext;

    switch (type) {
      case 'language':
        setLanguageId(prev => prev.filter(item => item !== id));
        break;
      case 'lecturer':
        setLecturerId(prev => prev.filter(item => item !== id));
        break;
      case 'category':
        setCategoryId(prev => prev.filter(item => item !== id));
        break;
      case 'album':
        setAlbumId(prev => prev.filter(item => item !== id));
        break;
    }
  };

  // Extract filter options from search results
  useEffect(() => {
    if (!searchData || searchData.length === 0) return;

    console.log("Sample search result item:", searchData[0]);

    const languages = new Map();
    const lecturers = new Map();
    const categories = new Map();
    const albums = new Map();

    searchData.forEach(item => {
      // Extract language
      if (item.language_name && item.lang_id) {
        const key = item.lang_id.toString();
        if (languages.has(key)) {
          languages.get(key).count++;
        } else {
          languages.set(key, {
            id: item.lang_id,
            name: item.language_name,
            count: 1
          });
        }
      }

      // Extract lecturer
      if (item.lecturer_name && item.rp_id) {
        const key = item.rp_id.toString();
        if (lecturers.has(key)) {
          lecturers.get(key).count++;
        } else {
          lecturers.set(key, {
            id: item.rp_id,
            name: item.lecturer_name,
            count: 1
          });
        }
      }

      // Extract category/type
      if (item.type) {
        const key = item.type.toLowerCase();
        if (categories.has(key)) {
          categories.get(key).count++;
        } else {
          categories.set(key, {
            id: key,
            name: item.type,
            count: 1
          });
        }
      }

      // Extract album
      if (item.album_id) {
        const key = item.album_id.toString();
        const albumName = item.album_name || item.mp3_title || `Album ${item.album_id}`;
        if (albums.has(key)) {
          albums.get(key).count++;
        } else {
          albums.set(key, {
            id: item.album_id,
            name: albumName,
            count: 1
          });
        }
      }
    });

    const filterOptions = {
      lang: Array.from(languages.values()).sort((a, b) => b.count - a.count),
      rp: Array.from(lecturers.values()).sort((a, b) => b.count - a.count),
      cat: Array.from(categories.values()).sort((a, b) => b.count - a.count),
      alb: Array.from(albums.values()).sort((a, b) => b.count - a.count).slice(0, 20) // Limit albums to top 20
    };

    console.log("Extracted filter options:", filterOptions);
    dispatch(getSearchOptions(filterOptions));
  }, [searchData, dispatch]);

  function fetchData(page = 1) {
    const searchValue = searchParams.get("query");
    if (!searchValue) {
      navigate("/dawahcast");
      return;
    }

    setLoading(true);
    setText(searchValue);

    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/searchApi.php`;
    const params = new URLSearchParams({
      type: "all",
      value: searchValue,
      page: page.toString(),
      limit: "20",
      // Add timestamp to prevent caching issues
      _t: Date.now().toString(),
    });

    // Add filters if any are selected
    if (languageId.length > 0) {
      params.append("lang_id", languageId.join(","));
    }
    if (lecturerId.length > 0) {
      params.append("rp_id", lecturerId.join(","));
    }
    if (categoryId.length > 0) {
      params.append("cat_id", categoryId.join(","));
    }
    if (albumId.length > 0) {
      params.append("album_id", albumId.join(","));
    }

    const requestUrl = `${baseUrl}?${params.toString()}`;
    console.log("Fetching search data - Page:", page, "URL:", requestUrl);

    axios
      .get(requestUrl, {
        // Prevent caching to ensure fresh data on each page change
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      .then((res) => {
        console.log("API Response:", res.data);
        console.log("Requested Page:", page);
        setLoading(false);
        if (res.data.success === true || res.data.status === "success") {
          const results = res.data.data || res.data.results || [];
          const total = res.data.total || 0;
          // Use the page parameter passed to fetchData, not from API response
          const responsePage = res.data.page || page;

          console.log("Results count:", results.length);
          console.log("Total results:", total);
          console.log("Setting current page to:", responsePage);

          dispatch(getSearchData(results));
          dispatch(getSearchRecord(total));
          setTotalResults(total);
          setCurrentPage(parseInt(responsePage));

          // Track search event
          trackSearch(searchValue, {
            lecturerId: lecturerId,
            albumId: albumId,
            languageId: languageId,
            categoryId: categoryId,
            searchType: 'all',
            results_count: total,
            page: page,
          });
        } else {
          console.log("API returned non-success status:", res.data);
          dispatch(getSearchData([]));
          dispatch(getSearchRecord(0));
          setTotalResults(0);
        }
      })
      .catch((err) => {
        console.error("Search error:", err);
        console.error("Error response:", err.response?.data);
        setLoading(false);
        dispatch(getSearchData([]));
        dispatch(getSearchRecord(0));
        setTotalResults(0);
      });
  }

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const query = searchParams.get("query");
    
    // Only fetch if we have a query
    if (query) {
      console.log("useEffect triggered - Page:", page, "Query:", query);
      fetchData(page);
    }
  }, [fetchData, searchParams]);

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    navigate(`${pathname}?${newSearchParams.toString()}`);
  };

  const totalPages = Math.ceil(totalResults / 20);
  const searchValue = searchParams.get("query");

  return (
    <Container>
      <div className="w-full h-full max-[615px]:pt-[6px] text-sm min-[615px]:text-[16px] font-thin text-black dark:text-gray-200">
        <div className="w-full fixed inset-x-0 z-[10] bg-primary-foreground p-0 max-[615px]:border-b border-zinc-700">
          <HeadMeta
            title={`Search for ${
              searchValue || "islamic"
            } resources on Dawah Nigeria`}
          />
          <HeaderRouter title={"Search"} />
        </div>
        <div className="pt-2 pl-2 flex items-center space-x-1 max-[615px]:hidden">
          <HiOutlineArrowLongLeft
            onClick={() => navigate(-1)}
            className={
              pathname === SEARCH
                ? "text-[30px] text-color"
                : "text-[30px] text-gray-400"
            }
          />
          <HiOutlineArrowLongRight
            className={
              pathname === "/"
                ? "text-[30px] text-color"
                : "text-[30px] text-zinc-400"
            }
          />
          <span className="mr-1">{"Search"}</span>/ <span></span>
          {`Search for ${searchValue || ""}`}
        </div>
        <div className="flex text-color text-sm font-normal flex-col px-2 py-12 min-[615px]:px-6 min-[615px]:py-6 w-full">
          {/* Enhanced Filter Button for Mobile */}
          <div
            onClick={handleSideBar}
            className="my-3 w-fit space-x-2 border px-3 py-2 rounded-lg min-[890px]:hidden flex items-center border-border hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FaFilter className="text-[18px]" />
            <div className="font-medium">Filters</div>
            {getActiveFilterCount() > 0 && (
              <span className="bg-[#ddff2b] text-black rounded-full px-2 py-0.5 text-xs font-bold">
                {getActiveFilterCount()}
              </span>
            )}
          </div>

          {/* Results Count */}
          <div className="text-lg text-foreground mb-3 min-[615px]:text-xl">
            {getActiveFilterCount() > 0 ? (
              <>
                Showing {searchData?.length || 0} of {totalResults?.toLocaleString() || 0} results for '{searchValue || ""}'
              </>
            ) : (
              <>
                {totalResults?.toLocaleString() || 0} results for '{searchValue || ""}'
              </>
            )}
          </div>

          {/* Active Filter Chips */}
          {getActiveFilterCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {languageId.map(id => {
                const label = getFilterLabel('language', id);
                return label ? (
                  <div
                    key={`lang-${id}`}
                    className="flex items-center gap-1.5 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm border border-gray-700"
                  >
                    <span>{label}</span>
                    <button
                      onClick={() => removeFilter('language', id)}
                      className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label} filter`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}

              {lecturerId.map(id => {
                const label = getFilterLabel('lecturer', id);
                return label ? (
                  <div
                    key={`lec-${id}`}
                    className="flex items-center gap-1.5 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm border border-gray-700"
                  >
                    <span>{label}</span>
                    <button
                      onClick={() => removeFilter('lecturer', id)}
                      className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label} filter`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}

              {categoryId.map(id => {
                const label = getFilterLabel('category', id);
                return label ? (
                  <div
                    key={`cat-${id}`}
                    className="flex items-center gap-1.5 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm border border-gray-700"
                  >
                    <span className="capitalize">{label}</span>
                    <button
                      onClick={() => removeFilter('category', id)}
                      className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label} filter`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}

              {albumId.map(id => {
                const label = getFilterLabel('album', id);
                return label ? (
                  <div
                    key={`alb-${id}`}
                    className="flex items-center gap-1.5 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm border border-gray-700"
                  >
                    <span className="truncate max-w-[200px]">{label}</span>
                    <button
                      onClick={() => removeFilter('album', id)}
                      className="hover:bg-gray-700 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove ${label} filter`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}

              {/* Clear All Button */}
              <button
                onClick={clearAllFilters}
                className="text-[#ddff2b] hover:text-[#c5e625] text-sm font-medium underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}


          {loading && (
            <div className="w-full h-[300px] flex items-center justify-center">
              <div className="animate-spin w-6 h-6 min-[615px]:w-8 min-[615px]:h-8 rounded-full border-r-2 border-b-2 border-zinc-400"></div>
            </div>
          )}

          {!loading && (!searchData || searchData.length === 0) && (
            <div className="w-full flex items-center justify-center h-[300px]">
              <h1 className="text-3xl min-[615px]:text-4xl text-color tracking-wider">
                No search results found
              </h1>
            </div>
          )}

          {!loading && searchData && searchData.length > 0 && (
            <>
              <div className="space-y-0">
                {searchData.map((item, idx) => (
                  <SearchDataWidget
                    key={item._id.$oid || idx}
                    lec_img={item.lecturer_image}
                    cat_name={item.type}
                    mp3_title={item.mp3_title || item.title || item.name}
                    mp3_description={item.mp3_description || item.description}
                    lecturer_name={item.lecturer_name}
                    id={item.id}
                    duration={item.mp3_duration || item.duration}
                    views={item.views}
                    language={item.language_name}
                    uploadDate={item.upload_date || item.created_at}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
