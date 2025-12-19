import React, { useState } from "react";
import "./trending.scss";
import Container from "../../components/container/Container";
import List from "../../components/list/list";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { BsFillPlayFill } from "react-icons/bs";
import Loader from "../../components/UI/loader/loader";
import { LECTURE, TRENDING } from "../../utils/routes/constants";
import { useInfiniteScrollPagination } from "../../hooks";
import uniqBy from "lodash/uniqBy";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { trendingApi } from "../../services/trending.service";
import HeadMeta from "../../components/head-meta";

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

  //play all audio files
  const playAll = () => {
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
  return (
    <Container>
      <HeadMeta
        title={`Trending resources on Dawah Nigeria - Home of islamic contents`}
      />
      <div className="trend_wrapper">
        <div className="trend_header_link bg-background max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Trending"} />
        </div>

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
        {isLoading && !isLoadingNextPage && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        {
          <div className="table">
            {uniqBy(querieddata, "nid")?.map(
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
                return (
                  <div
                    ref={
                      idx === querieddata.length - 1 && !isLastPage
                        ? infiniteScrollRef
                        : null
                    }
                    key={idx}
                    className=""
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
        }
        {isLoadingNextPage && (
          <div className="load_m">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        {/*************** moobile **********/}
        <div className="mobile_lists">
          <div
            onClick={playAll}
            className="header pb-2 border-b border-color-primary  w-full"
          >
            <div className="w-fit h-fit border border-color-primary p-[2px] rounded-full">
              <BsFillPlayFill className="text-[22px] text-color-primary" />
            </div>

            <p className="text-color-primary font-medium">Play All</p>
          </div>
          <div className="bg-none h-1 w-1"></div>
          {isLoading && !isLoadingNextPage && (
            <div className="load_mobile">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}
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
              return (
                <div
                  ref={
                    idx === querieddata.length - 1 && !isLastPage
                      ? infiniteScrollRefMobile
                      : null
                  }
                  key={idx}
                  className="each_mobile_list"
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
