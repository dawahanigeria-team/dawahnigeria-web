import React, { useState, useMemo } from "react";
import "./trending.scss";
import Container from "../../components/container/Container";
import List from "../../components/list/list";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { BsFillPlayFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { HiFire } from "react-icons/hi";
import Loader from "../../components/UI/loader/loader";
import { LECTURE, TRENDING } from "../../utils/routes/constants";
import { useInfiniteScrollPagination } from "../../hooks";
import uniqBy from "lodash/uniqBy";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { trendingApi } from "../../services/trending.service";
import HeadMeta from "../../components/head-meta";
import { formatNumber } from "../../components/UI/formatter";

const Trending = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const queryParam = { page };
  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useQueryGetRequest("trending", queryParam, trendingApi.getTrendings);

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    querieddata?.length,
    page,
    setPage
  );

  const { ref: infiniteScrollRefMobile } = useInfiniteScrollPagination(
    querieddata?.length,
    page,
    setPage
  );

  // Calculate trending statistics
  const trendingStats = useMemo(() => {
    if (!querieddata || querieddata.length === 0) return null;
    
    const uniqueData = uniqBy(querieddata, "nid");
    const totalViews = uniqueData.reduce((sum, item) => sum + (parseInt(item.views) || 0), 0);
    const totalFavorites = uniqueData.reduce((sum, item) => sum + (parseInt(item.favorites) || 0), 0);
    const topItem = uniqueData[0];
    
    return {
      totalItems: uniqueData.length,
      totalViews,
      totalFavorites,
      topItem
    };
  }, [querieddata]);

  //play all audio files
  const playAll = () => {
    if (!querieddata || querieddata.length === 0) return;
    navigate(`${LECTURE}${querieddata[0]?.nid}`, {
      state: {
        endpoint_url: `/popular_lec_api.php?langid=6&page=`,
        currentPage: 1,
        idx: 0,
        nid: querieddata[0].nid,
        nav1: { title: "playAll", link: TRENDING },
      },
    });
  };

  const uniqueData = useMemo(() => uniqBy(querieddata, "nid"), [querieddata]);

  return (
    <Container>
      <HeadMeta
        title={`Trending resources on Dawah Nigeria - Home of islamic contents`}
      />
      <div className="trend_wrapper">
        <div className="trend_header_link bg-background max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Trending"} />
        </div>

        {/* Enhanced Trending Hero Section */}
        {!isLoading && trendingStats && uniqueData.length > 0 && (
          <div className="trending_hero_section">
            <div className="trending_hero_content">
              <div className="trending_hero_icon">
                <HiFire className="trending_fire_icon" />
              </div>
              <div className="trending_hero_text">
                <h2 className="trending_hero_title">Trending Now</h2>
                <p className="trending_hero_subtitle">
                  Discover what's capturing hearts and minds
                </p>
              </div>
            </div>
            <div className="trending_stats_grid">
              <div className="trending_stat_card">
                <div className="trending_stat_icon">
                  <FiTrendingUp />
                </div>
                <div className="trending_stat_content">
                  <p className="trending_stat_value">{formatNumber(trendingStats.totalItems)}</p>
                  <p className="trending_stat_label">Trending Items</p>
                </div>
              </div>
              <div className="trending_stat_card">
                <div className="trending_stat_icon">
                  <HiFire />
                </div>
                <div className="trending_stat_content">
                  <p className="trending_stat_value">{formatNumber(trendingStats.totalViews)}</p>
                  <p className="trending_stat_label">Total Views</p>
                </div>
              </div>
              <div className="trending_stat_card">
                <div className="trending_stat_icon">
                  <HiFire />
                </div>
                <div className="trending_stat_content">
                  <p className="trending_stat_value">{formatNumber(trendingStats.totalFavorites)}</p>
                  <p className="trending_stat_label">Total Favorites</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Table Header */}
        <div className="trend_title_wrap text-color">
          <div className="tend_title1">
            <p className="tend_hash">#</p>
            <p>Title</p>
          </div>
          <p className="tend_title2">
            <span>Lecturer</span>
          </p>
          <p className="tend_title4">
            <span>Time</span>
          </p>
        </div>

        {/* Desktop Loading State */}
        {isLoading && !isLoadingNextPage && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}

        {/* Desktop Content */}
        {!isLoading && uniqueData.length === 0 && (
          <div className="trending_empty_state">
            <div className="trending_empty_icon">
              <FiTrendingUp />
            </div>
            <h3 className="trending_empty_title">No Trending Content Yet</h3>
            <p className="trending_empty_text">
              Check back soon to see what's trending in the community
            </p>
          </div>
        )}

        {uniqueData.length > 0 && (
          <div className="table">
            {uniqueData.map(
              (
                {
                  mp3_thumbnail,
                  Title,
                  rpname,
                  img,
                  cats,
                  nid,
                  views,
                  favorites,
                  rp_id,
                  duration,
                },
                idx
              ) => {
                const isTopTrending = idx < 3;
                return (
                  <div
                    ref={
                      idx === uniqueData.length - 1 && !isLastPage
                        ? infiniteScrollRef
                        : null
                    }
                    key={`${nid}-${idx}`}
                    className={`trending_item_wrapper ${isTopTrending ? 'top_trending' : ''}`}
                  >
                    <List
                      key={idx}
                      id={idx}
                      image={mp3_thumbnail || img}
                      favorites={favorites}
                      duration={duration}
                      title={Title}
                      lecturer={rpname}
                      rpid={rp_id}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      views={views}
                      navName={"Trending"}
                      navLink={TRENDING}
                      controlData={querieddata}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Desktop Next Page Loading */}
        {isLoadingNextPage && (
          <div className="load_m">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}

        {/*************** Mobile Section **********/}
        <div className="mobile_lists">
          {/* Mobile Play All Button */}
          {!isLoading && querieddata && querieddata.length > 0 && (
            <div
              onClick={playAll}
              className="header pb-2 border-b border-color-primary w-full trending_play_all"
            >
              <div className="w-fit h-fit border border-color-primary p-[2px] rounded-full trending_play_icon">
                <BsFillPlayFill className="text-[22px] text-color-primary" />
              </div>
              <div className="trending_play_all_content">
                <p className="text-color-primary font-medium">Play All</p>
                <p className="trending_play_all_subtitle">
                  {formatNumber(querieddata.length)} trending items
                </p>
              </div>
            </div>
          )}

          <div className="bg-none h-1 w-1"></div>

          {/* Mobile Loading State */}
          {isLoading && !isLoadingNextPage && (
            <div className="load_mobile">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}

          {/* Mobile Empty State */}
          {!isLoading && querieddata && querieddata.length === 0 && (
            <div className="trending_empty_state_mobile">
              <div className="trending_empty_icon">
                <FiTrendingUp />
              </div>
              <h3 className="trending_empty_title">No Trending Content</h3>
              <p className="trending_empty_text">
                Check back soon for trending content
              </p>
            </div>
          )}

          {/* Mobile Content */}
          {querieddata?.map(
            (
              {
                mp3_thumbnail,
                Title,
                rpname,
                img,
                cats,
                rp_id,
                favorites,
                nid,
                views,
                comments,
                duration,
                share,
              },
              idx
            ) => {
              const isTopTrending = idx < 3;
              return (
                <div
                  ref={
                    idx === querieddata.length - 1 && !isLastPage
                      ? infiniteScrollRefMobile
                      : null
                  }
                  key={`mobile-${nid}-${idx}`}
                  className={`each_mobile_list ${isTopTrending ? 'mobile_top_trending' : ''}`}
                >
                  <List
                    key={idx}
                    id={idx}
                    duration={duration}
                    image={mp3_thumbnail || img}
                    title={Title}
                    lecturer={rpname}
                    favorites={favorites}
                    comments={comments}
                    rpid={rp_id}
                    url={`${LECTURE}${nid}`}
                    Title={Title}
                    rpname={rpname}
                    endpoint_url={"/popular_lec_api.php?langid=6&page="}
                    currentPage={page}
                    cats={cats}
                    nid={nid}
                    navName={"Trending"}
                    navLink={TRENDING}
                    controlData={querieddata}
                    views={views}
                    share={share}
                  />
                </div>
              );
            }
          )}

          {/* Mobile Next Page Loading */}
          {isLoadingNextPage && (
            <div className="load_m">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Trending;
