import React, { useState, useEffect, useCallback, useRef } from "react";
import "./videos.scss";
import Container from "../../components/container/Container";
import { categories } from "./data";
import FilterButton from "../../components/filterButton/FilterButton";
import VideoWidget from "../../components/videoWidget/VideoWidget";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import infiniteScroll from "../../components/UI/infiniteScroll";
import _ from "lodash";
import { VIDEOS } from "../../utils/routes/constants";
const Videos = () => {
  const navigate = useNavigate();
  const observer = useRef();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [, setTypeName] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);

  useEffect(() => {
    const handleRequest = () => {
      if (page > 1) {
        setNextPageLoad(true);
      }
      axios
        .get(`/video_listingApi.php?page=${page}&action=allVideo`)
        .then((res) => {
          //console.log(res.data);
          if (page === 1) {
            setLoading(false);
          }
          setNextPageLoad(false);
          if (res.data.length === 0) {
            setIsEmpty(true);
            return;
          }

          setData((prev) => _.uniqBy([...prev, ...res.data], "id"));
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
  }, [page]);
  //console.log(page)

  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;

      infiniteScroll(node, observer, page, setPage);
    },

    [page]
  );
  return (
    <Container>
      <div className="video_wrapper">
        <div className="vid_header_link  max-[615px]:border-b border-zinc-700">
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
                  data={data}
                />
              );
            })}
          </div>
        </div>
        {loading && (
          <div className="w-full flex items-center justify-center h-[300px]">
            <Loader />
          </div>
        )}
        {!loading && (
          <div className="video_widget">
            {data.map(
              (
                { images, id, favourites, author, views, title, duration },
                idx
              ) => {
                if (data.length === idx + 1) {
                  return (
                    <div
                      ref={lastElement}
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
                } else {
                  return (
                    <div
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
              }
            )}
          </div>
        )}
        {nextPageLoad && (
          <div className="w-full flex items-center h-[100px] justify-center ">
            <Loader />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Videos;
