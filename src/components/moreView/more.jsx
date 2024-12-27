import React, { useContext, useRef, useState } from "react";
import "./more.scss";
import Container from "../../components/container/Container";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { getPack, getPage } from "../../Redux/Actions/ActionCreators";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
  HiMiniSquares2X2,
  HiOutlineBars3,
  HiMagnifyingGlass,
  HiOutlineFunnel,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { AudioContext } from "../../App";
import { useInfiniteScrollPagination } from "../../hooks";
import LecturersWidget from "../lecturersWidget/LecturersWidget";
import {
  LECTURE,
  ALBUMS,
  RESOURCE_PERSON,
  PLAYLISTS,
  MORE,
} from "../../utils/routes/constants";
import { useMoreViewHook } from "../../hooks";
import HeadMeta from "../head-meta";
import Loader from "../UI/loader/loader";

function More() {
  const dispatch = useDispatch();
  const observer = useRef();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state, pathname } = useLocation();
  const {
    name,
    type,
    id,
    currentdata,
    navtitle,
    heading,
    endpoint_url,
    currentPage,
  } = state;
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();
  const { setinitial } = useContext(AudioContext);
  const keyParam = { endpoint_url, page };

  const { data, isLoading, isLoadingNextPage, isLastPage } = useMoreViewHook(
    keyParam,
    currentdata
  );

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    data?.length,
    page,
    setPage
  );

  // Filter panel component
  const FilterPanel = () => (
    <div className="filter-panel">
      <div className="p-4 space-y-4 bg-background border border-border rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Filters</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Categories</label>
            <select className="w-full p-2 rounded-md border border-border bg-background">
              <option>All Categories</option>
              <option>Fiqh</option>
              <option>Aqeedah</option>
              <option>Tafseer</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <select className="w-full p-2 rounded-md border border-border bg-background">
              <option>All Languages</option>
              <option>Arabic</option>
              <option>English</option>
              <option>Hausa</option>
              <option>Yoruba</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 p-2 rounded-md border border-border bg-background"
              />
              <input
                type="date"
                className="flex-1 p-2 rounded-md border border-border bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <select className="w-full p-2 rounded-md border border-border bg-background">
              <option>Most Recent</option>
              <option>Most Viewed</option>
              <option>Alphabetical</option>
            </select>
          </div>

          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <HeadMeta title={`${heading ?? "Islamic"} resources on Dawah Nigeria `} />
      <div className="more_wrapper">
        {/* Header Section */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="more_wrap_link">
            <HeaderRouter title={heading} />
          </div>

          {/* Search and Controls */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-4 max-w-7xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search lectures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                  aria-label="Grid view"
                >
                  <HiMiniSquares2X2 className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                  aria-label="List view"
                >
                  <HiOutlineBars3 className="text-xl" />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <HiOutlineFunnel />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          <nav className="desktop_heading px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Go back"
              >
                <HiOutlineArrowLongLeft className="text-2xl text-foreground" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">{navtitle}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{heading}</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Filter Panel */}
        {showFilters && <FilterPanel />}

        {/* Content Section */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div
            className={`more_widget fade-in ${
              viewMode === "list" ? "list-view" : ""
            }`}
          >
            {type === "lectures" &&
              Array.isArray(data) &&
              data?.map((item, idx) => (
                <Link
                  to={`${LECTURE}${item.nid || item.id}`}
                  onClick={() => {
                    if (window.innerWidth <= 615) {
                      dispatch(getPack(null));
                      dispatch(getPage(currentPage));
                      dispatch(getPack(data));
                      setinitial(false);
                    }
                  }}
                  ref={
                    idx === data?.length - 1 && !isLastPage
                      ? infiniteScrollRef
                      : null
                  }
                  key={idx + 1}
                  className="widget_list_items group fade-in-item"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <AlbumWidget
                    key={idx}
                    categories={
                      item.title?.split("-")[0] ||
                      item.Title?.split("-")[0] ||
                      item.title ||
                      item.Title ||
                      item.mp3_title
                    }
                    img={item.img || item.lec_img}
                    lec_no={item.lec_no}
                    nid={item.nid}
                    rpname={item.rpname}
                    views={item.views}
                    duration={item.duration}
                    date={item.date}
                    viewMode={viewMode}
                  />
                </Link>
              ))}

            {type === "album" &&
              Array.isArray(data) &&
              data?.map((item, idx) => (
                <Link
                  to={`${ALBUMS}${item.nid || item.id}`}
                  key={idx + 1}
                  className="widget_list_items group fade-in-item"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <AlbumWidget
                    key={idx}
                    categories={
                      item.name?.split("-")[0] ||
                      item.Title?.split("-")[0] ||
                      item.title ||
                      item.Title
                    }
                    img={item.img || item.lec_img}
                    lec_no={item.lec_no}
                    nid={item.nid}
                    rpname={item.rpname}
                  />
                </Link>
              ))}

            {type === "playlist" &&
              Array.isArray(data) &&
              data.map((item, idx) => (
                <Link
                  to={`${PLAYLISTS}${item.nid || item.id}`}
                  key={idx + 1}
                  ref={
                    idx === data?.length - 1 && !isLastPage
                      ? infiniteScrollRef
                      : null
                  }
                  className="widget_list_items group fade-in-item"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <AlbumWidget
                    key={idx}
                    categories={
                      item.title?.split("-")[0] ||
                      item.Title?.split("-")[0] ||
                      item.title ||
                      item.Title ||
                      item.name
                    }
                    img={item.img || item.lec_img}
                    lec_no={item.lec_no || 0}
                    nid={item.nid}
                    rpname={item.rpname}
                  />
                </Link>
              ))}

            {type === "lecturers" &&
              Array.isArray(data) &&
              data?.map((item, idx) => (
                <Link
                  to={`${RESOURCE_PERSON}${item.nid || item.id}`}
                  key={idx + 1}
                  ref={
                    idx === data?.length - 1 && !isLastPage
                      ? infiniteScrollRef
                      : null
                  }
                  className="lecturers_item fade-in-item"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <LecturersWidget
                    key={idx}
                    img={item.img}
                    name={item.name}
                    lec_no={item.lec_no}
                  />
                </Link>
              ))}
          </div>
        )}

        {/* Loading More Indicator */}
        {isLoadingNextPage && (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && data?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-xl font-medium text-foreground mb-2">
              No content found
            </p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default More;
