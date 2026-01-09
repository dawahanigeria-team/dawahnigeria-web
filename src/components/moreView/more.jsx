import React from "react";
import "./more.scss";
import Container from "../../components/container/Container";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import {
  HiOutlineArrowLongLeft,
  HiMiniSquares2X2,
  HiOutlineEye,
} from "react-icons/hi2";
import {
  LECTURE,
} from "../../utils/routes/constants";
import HeadMeta from "../head-meta";
import Loader from "../UI/loader/loader";
import { useRecentlyViewed } from "../../hooks/moreview/useRecentlyViewed";
import { useTrending } from "../../hooks/moreview/useTrending";
import { useRecentlyPosted } from "../../hooks/moreview/useRecentlyPosted";
import { useRecommended } from "../../hooks/moreview/useRecommended";

const useMoreData = (pathname) => {
  if (pathname.includes("/more/recently-viewed")) {
    return useRecentlyViewed();
  } else if (pathname.includes("/more/trending")) {
    return useTrending();
  } else if (pathname.includes("/more/recent")) {
    return useRecentlyPosted();
  } else if (pathname.includes("/more/recommended")) {
    return useRecommended();
  }
  return {};
};

function More() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMoreData(pathname);

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
    return "More";
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
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
                  className={`p-2 rounded-md transition-colors bg-accent text-accent-foreground`}
                  aria-label="Grid view"
                >
                  <HiMiniSquares2X2 className="text-xl" />
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
                <span className="text-muted-foreground">Home</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{getSectionTitle()}</span>
              </div>
            </div>
          </nav>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-xl font-medium text-foreground mb-2">
              Error loading content
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-accent-foreground hover:bg-accent/80 px-4 py-2 rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="more_widget">
            {data?.pages.map((pageData, pageIndex) => {
              // Ensure pageData is an array
              const pageItems = Array.isArray(pageData) ? pageData : [];
              return (
                <React.Fragment key={pageIndex}>
                  {pageItems.map((item, idx) => (
                  <Link
                    to={`${LECTURE}${item.nid || item.id}`}
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
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Loading More Button */}
        {hasNextPage && (
          <div className="flex justify-center py-8">
            <button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="bg-accent text-accent-foreground hover:bg-accent/80 px-6 py-3 rounded-md disabled:opacity-50"
            >
              {isFetchingNextPage ? <Loader /> : "Load More"}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!data?.pages || data.pages.length === 0 || (Array.isArray(data.pages[0]) && data.pages[0].length === 0)) && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-xl font-medium text-foreground mb-2">
              No content found
            </p>
            <p className="text-muted-foreground">There are no recently viewed lectures.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default More;