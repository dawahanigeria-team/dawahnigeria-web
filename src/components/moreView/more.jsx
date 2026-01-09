import React, { useMemo } from "react";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { moreViewApi } from "../../services/more.service";
import { extractArrayData } from "../../utils/dataHelpers";

function More() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { queryKey, apiFn, title } = useMemo(() => {
    if (pathname.includes("/more/recently-viewed")) {
      return { 
        queryKey: "recently-viewed", 
        apiFn: moreViewApi.getRecentlyViewed,
        title: "Recently Viewed"
      };
    } else if (pathname.includes("/more/trending")) {
      return { 
        queryKey: "trending", 
        apiFn: moreViewApi.getTrending,
        title: "Trending"
      };
    } else if (pathname.includes("/more/recent")) {
      return { 
        queryKey: "recently-posted", 
        apiFn: moreViewApi.getRecentlyPosted,
        title: "Recently Posted"
      };
    } else if (pathname.includes("/more/recommended")) {
      return { 
        queryKey: "recommended", 
        apiFn: moreViewApi.getRecommended,
        title: "Recommended"
      };
    }
    return { 
      queryKey: "more", 
      apiFn: async () => [], 
      title: "More" 
    };
  }, [pathname]);

  const langid = 6; // Default language ID from original hooks

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey, langid],
    queryFn: async ({ pageParam = 1 }) => {
      if (!apiFn) return [];
      const response = await apiFn({ page: pageParam, langid });
      return extractArrayData(response);
    },
    getNextPageParam: (lastPage, pages) => {
      const pageData = Array.isArray(lastPage) ? lastPage : [];
      if (pageData.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
    enabled: !!apiFn
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isEmpty = useMemo(() => {
    if (isLoading || isError || !data?.pages) return false;
    return data.pages.every(page => !Array.isArray(page) || page.length === 0);
  }, [data, isLoading, isError]);

  return (
    <Container>
      <HeadMeta
        title={`${title} resources on Dawah Nigeria `}
      />
      <div className="more_wrapper">
        {/* Header Section */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="more_wrap_link">
            <HeaderRouter title={title} />
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
                <span className="text-foreground font-medium">{title}</span>
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
                    key={item.nid || item.id || `${pageIndex}-${idx}`}
                    className="widget_list_items"
                  >
                    <div className="widget_img_wrap">
                      <img
                        src={item.img_url || item.img || item.lec_img}
                        alt={item.title || "Lecture"}
                        className="widget_img"
                        loading="lazy"
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
                        {item.rpname || item.lecturer || "Unknown Lecturer"}
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
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-xl font-medium text-foreground mb-2">
              No content found
            </p>
            <p className="text-muted-foreground">There are no {title.toLowerCase()} lectures.</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default More;