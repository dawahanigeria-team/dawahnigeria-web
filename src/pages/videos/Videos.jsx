import React, { useState } from "react";
import "./videos.scss";
import Container from "../../components/container/Container";
import { categories } from "./data";
import FilterButton from "../../components/filterButton/FilterButton";
import VideoWidget from "../../components/videoWidget/VideoWidget";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { useInfiniteScrollPagination } from "../../hooks";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { VIDEOS } from "../../utils/routes/constants";

import { videoApis } from "../../services";

import HeadMeta from "../../components/head-meta";

const Videos = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [, setTypeName] = useState();
  const [page, setPage] = useState(1);
  const [, setIsEmpty] = useState(false);

  const queryParam = { page };

  const { isLoading, querieddata, isLastPage, isLoadingNextPage, isFetching } =
    useQueryGetRequest("videos", queryParam, videoApis.getVideos);

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    querieddata?.length,
    page,
    setPage,
    isFetching
  );

  return (
    <Container>
      <HeadMeta title={`Videos - Get islamic resources on Dawah Nigeria`} />
      <div className="video_wrapper">
        <div className="vid_header_link bg-background max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Videos"} />
        </div>
        <div className="video_filter">
          <div className="video_filter_categories">
            {categories.map(({ categories, id }, idx) => {
              return (
                <FilterButton
                  key={idx}
                  filter={filter}
                  setFilter={setFilter}
                  data1={data1}
                  setData1={setData1}
                  data2={data2}
                  setData2={setData2}
                  data3={data3}
                  setData3={setData3}
                  active={active}
                  setActive={setActive}
                  title={categories}
                  setTypeName={setTypeName}
                  setIsEmpty={setIsEmpty}
                  action="categories"
                  data={querieddata}
                />
              );
            })}
          </div>
        </div>
        {isLoading && !isLoadingNextPage && (
          <div className="w-full flex items-center justify-center h-[300px]">
            <Loader />
          </div>
        )}
        {
          <div className="video_widget">

            {Array.isArray(querieddata) &&
              querieddata?.map(
                (
                  { images, id, favourites, author, views, title, duration },
                  idx
                ) => {

                  return (
                    <div
                      ref={
                        idx === querieddata.length - 1 && !isLastPage
                          ? infiniteScrollRef
                          : null
                      }
                      onClick={() => {
                        navigate(`${VIDEOS}${id}`);
                      }}
                    >
                      <VideoWidget
                        key={idx}
                        title={title}
                        lecturer={author}
                        views={views}
                        img={images}
                        favourites={favourites}
                        duration={duration}
                      />
                    </div>
                  );
                }
              )}
          </div>
        }
        {isLoadingNextPage && (
          <div className="w-full flex items-center h-[100px] justify-center ">
            <Loader />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Videos;
