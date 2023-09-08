import React, { useEffect, useState, useCallback, useRef } from "react";
import "./recommend1.scss";
import Container from "../../components/container/Container";
import { categories } from "./data";
import FilterButton from "../../components/filterButton/FilterButton";
import Recommend_widget from "../../components/recommend_widget/Recommend_widget";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import infiniteScroll from "../../components/UI/infiniteScroll";
import Loader from "../../components/UI/loader/loader";
import axios from "../../utils/useAxios"
import { useSelector } from "react-redux";
import { LECTURE } from "../../utils/routes/constants";
const Recommend1 = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [catid, setCatid] = useState("26");
  const navigate = useNavigate();
  const [typeName, setTypeName] = useState();
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const {currentUser} = useSelector((state)=> state.user)
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  useEffect(() => {
    setData3(data);
  }, [data]);

  useEffect(() => {
    const handleRequest = () => {
      axios
        .get(`/leclisting_cat_api.php?langid=6&catid=${catid}&page=${page}`)
        .then((res) => {
          console.log(res.data)
          if (page === 1) {
            setLoading(false);
          }

          if (res.data.length === 0 || undefined) {
            setIsEmpty(true);
            return;
          }

          setData((prev) => [...prev, ...res.data]);
          setNextPageLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });

    };
    // console.log("hold line 40", hold);

    // console.log("data line 42: ", data);

    handleRequest();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catid, page]);

  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;
      infiniteScroll(node, observer, page, setPage);
    },
 // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  return (
    <Container>
      <div className="recommend1_wrapper">
        <div className="rec_header_link">
          <HeaderRouter title={"Buzz"} />
        </div>
        <div className="recommend1_filter_categories">
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
                action="categories"
                setTypeName={setTypeName}
                setIsEmpty={setIsEmpty}
                data={data}
                id={id}
                setCatid={setCatid}
              />
            );
          })}
        </div>

        {loading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        <div className="recommend1_content">
          {" "}
          {filter.map((value, idx) => {
            const { img, rpname, title, categories, nid, audio } = value;
            const catsname = Object.values(value)[3];
            if (filter.length === idx + 1) {
              return (
                <div
                  ref={lastElement}
                  onClick={() => {
                    navigate(`${LECTURE}${nid}`, {
                      state: {
                        title: title,
                        rpname,
                        img,
                        cats: catsname,
                        nid,
                        audio,
                        currentUser,
                        enpoint_url: `/leclisting_cat_api.php?langid=6&catid=${catid}&page=`,
                        currentPage: page,
                        controlData: filter,
                        nav1: { title: "Buzz", link: "/recommend1" },
                      },
                    });
                  }}
                  key={idx}
                  className="recommend1_item_listing"
                >
                  <Recommend_widget
                    key={idx}
                    img={img}
                    title={title}
                    rpname={rpname}
                    catsname={catsname}
                  />
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => {
                    navigate(`${LECTURE}${nid}`, {
                      state: {
                        title: title,
                        rpname,
                        img,
                        cats: catsname,
                        nid,
                        audio,
                        idx,
                        currentUser,
                        endpoint_url: `/leclisting_cat_api.php?langid=6&catid=${catid}&page=`,
                        currentPage: page,
                        controlData: filter,
                        nav1: { title: "Buzz", link: "/recommend1" },
                      },
                    });
                  }}
                  key={idx}
                  className="recommend1_item_listing"
                >
                  <Recommend_widget
                    key={idx}
                    img={img}
                    title={title}
                    rpname={rpname}
                    catsname={catsname}
                  />
                </div>
              );
            }
          })}
        </div>
        {nextPageLoad && (
        <div className="load_m">
          <div className="loads">
            <Loader />
          </div>
        </div>
      )}
      </div>
    </Container>
  );
};

export default Recommend1;
