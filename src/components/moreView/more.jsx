import React, { useContext, useRef, useState, useEffect } from "react";
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
  HiOutlineEye,
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
  const { state, pathname } = useLocation();

  // Default values when state is null
  const defaultState = {
    name: "",
    type: "lectures",
    id: "",
    currentdata: [],
    navtitle: "Home",
    heading: "Recently Posted",
    endpoint_url: "/leclisting_recent.php?&action=get_recent_audio&page=",
    currentPage: 1,
  };

  // Use state values if available, otherwise use defaults
  const {
    name = defaultState.name,
    type = defaultState.type,
    id = defaultState.id,
    currentdata = defaultState.currentdata,
    navtitle = defaultState.navtitle,
    heading = defaultState.heading,
    endpoint_url = defaultState.endpoint_url,
    currentPage = defaultState.currentPage,
  } = state || defaultState;

  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();
  const { setinitial } = useContext(AudioContext);
  const keyParam = { endpoint_url, page };

  // Get the appropriate endpoint based on the pathname
  useEffect(() => {
    if (!state) {
      const path = pathname;
      let newEndpoint = defaultState.endpoint_url;
      let newHeading = defaultState.heading;

      if (path.includes("/more/recently-viewed")) {
        newEndpoint =
          "/leclisting_recent_viewed.php?&action=get_recent_viewed&page=";
        newHeading = "Recently Viewed";
      } else if (path.includes("/more/trending")) {
        newEndpoint = "/leclisting_trending.php?&action=get_trending&page=";
        newHeading = "Trending";
      } else if (path.includes("/more/recommended")) {
        newEndpoint =
          "/leclisting_recommended.php?&action=get_recommended&page=";
        newHeading = "Recommended";
      } else if (path.includes("/more/recent")) {
        newEndpoint = "/leclisting_recent.php?&action=get_recent_audio&page=";
        newHeading = "Recently Posted";
      }

      keyParam.endpoint_url = newEndpoint;
      defaultState.heading = newHeading;
    }
  }, [pathname, state]);

  const { data, isLoading, isLoadingNextPage, isLastPage } = useMoreViewHook(
    keyParam,
    currentdata
  );

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    data?.length,
    page,
    setPage
  );

  const getSectionTitle = () => {
    const path = pathname;
    if (path.includes("/more/recent")) {
      return "Recently Posted";
    } else if (path.includes("/more/recently-viewed")) {
      return "Recently Viewed";
    } else if (path.includes("/more/trending")) {
      return "Trending";
    } else if (path.includes("/more/recommended")) {
      return "Recommended";
    }
    return heading;
  };

  return (
    <Container>
      <HeadMeta
        title={`${getSectionTitle() ?? "Islamic"} resources on Dawah Nigeria `}
      />
      <div className="more_wrapper">
        {/* Header Section */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="more_wrap_link">
            <HeaderRouter title={getSectionTitle()} />
          </div>

          {/* Controls */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-end gap-4 max-w-7xl mx-auto">
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

        {/* Content Section */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="more_widget">
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
                  className="widget_list_items"
                >
                  <div className="widget_img_wrap">
                    <img
                      src={item.img || item.lec_img}
                      alt={item.title || "Lecture"}
                      className="widget_img"
                    />
                    <div className="widget_views">
                      <HiOutlineEye className="widget_views_icon" />
                      <span>{item.views || 0}</span>
                    </div>
                  </div>
                  <div className="widget_text">
                    <h3 className="widget_title">
                      {item.title || item.Title || item.mp3_title}
                    </h3>
                    <p className="widget_lecturer">
                      {item.rpname || "Unknown Lecturer"}
                    </p>
                  </div>
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
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default More;
