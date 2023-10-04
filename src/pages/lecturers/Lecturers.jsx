import React, { useState, useEffect, useRef, useCallback } from "react";
import "./lecturers.scss";
import Container from "../../components/container/Container";
import FilterButton from "../../components/filterButton/FilterButton";
import { lecturers, language, alphabet } from "./data";
import LecturersWidget from "../../components/lecturersWidget/LecturersWidget";
import axios from "../../utils/useAxios"
import LecturerMobileWidget from "../../components/lecturersWidget/LecturerMobileWidget";
import { Link, useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import infiniteScroll from "../../components/UI/infiniteScroll";
import { RESOURCE_PERSON } from "../../utils/routes/constants";
import _ from "lodash";
const Lecturers = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [active1, setActive1] = useState("All");
  const [active2, setActive2] = useState("Hot");
  const [langid, setLangid] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [initialLangid, setinitialLangid] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [typeName, setTypeName] = useState("");
  const [alpha, setAlphabet] = useState("");
  const [initialAlpha, setinitialAlpha] = useState();
  const [lectId, setlectId] = useState();

  //console.log(langid);
  //console.log(typeName);
  //console.log("this is alpha team, over", alpha);
  useEffect(() => {
    function getLang() {
      //get all langyages
      axios
        .get(`/all_lang_api.php`)
        .then((res) => {
          if (res.data) setLanguages([...language, ...res.data]);
        });
    }
    getLang();
  }, []);
  console.log({ languages });
  useEffect(() => {
    setData3(data);
    //console.log(data);
  }, [data]);

  useEffect(() => {
    if (typeName === "name" && active !== "All") {
      return;
    }
    if (isEmpty) return;
    const handleRequest = () => {
      if (initialLangid !== langid || initialAlpha !== alpha) {
        setData([]);
        setLoading(true);
        setPage(1);
        //console.log("reset page", page);
      }
      //console.log("current page", page);
      if (page > 1) setNextPageLoad(true);

      axios
        .get(
          `/all_rps_api.php?offset=30&lim=10&page=${page}${`${
            langid ? `&langid=${langid}` : ""
          }`}${`${alpha && alpha !== "Hot" ? `&alpha=${alpha}` : ""}`}`
        )
        .then((res) => {
          //console.log(res.data);
          if (res.data.length === 0) return;
          const data = res.data.filter((a) => a.name !== null || !!a.name);
          setLoading(false);

          setNextPageLoad(false);
          if (res.data.length === 0) {
            setIsEmpty(true);
            return;
          }
          setinitialLangid(langid);
          setinitialAlpha(alpha);

          if (alpha && alpha !== "Hot") {
            //console.log("this is alpha team, over", alpha);
            const filterByAlpha = data.filter(
              (value) => value?.name[0]?.toLocaleUpperCase() === alpha
            );
            setData((prev) => _.uniqBy([...prev, ...filterByAlpha], "id"));

            if (filterByAlpha.length === 0) {
              setIsEmpty(true);
              return;
            }
          } else {
            setData((prev) => _.uniqBy([...prev, ...data], "id"));
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
  }, [page, langid, alpha]);
  //console.log(data);

  useEffect(() => {
    if (typeName !== "name" && active === "All") {
      return;
    }
    axios
      .get(
        `/rplisting_multi_nid_api.php?id=${lectId}`
      )
      .then((res) => {
        //console.log(res.data[0])
      });
  }, [lectId]);

  const lastElement = useCallback(
    (node) => {
      //console.log(typeName);

      if (isEmpty) {
        //setIsEmpty(false);
        //setData([]);
        //setPage(1);
        //setLoading(true)
        return;
      }
      infiniteScroll(node, observer, page, setPage);

      if (typeName !== "language") return;
    },

    [page]
  );

  return (
    <Container>
      <div className="lecturers_wrapper">
        <div className="lecturers_head_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Lecturer"} />
        </div>
        <div className="lecturers_filter">
          <div className="lecturers_filter_name">
            {lecturers.map(({ name, id }, idx) => {
              return (
                <div key={idx}>
                  <FilterButton
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
                    title={name}
                    setlectId={setlectId}
                    lecid={id}
                    setIsEmpty={setIsEmpty}
                    setTypeName={setTypeName}
                    action="name"
                    data={data}
                  />
                </div>
              );
            })}
          </div>
          <div className="lecturers_filter_language">
            {languages.map(({ name, id }, idx) => {
              return (
                <div key={idx}>
                  <FilterButton
                    filter={filter}
                    setFilter={setFilter}
                    data1={data1}
                    setData1={setData1}
                    data2={data2}
                    setData2={setData2}
                    data3={data3}
                    setData3={setData3}
                    active={active1}
                    setActive={setActive1}
                    title={name}
                    action="language"
                    data={data}
                    setIsEmpty={setIsEmpty}
                    setTypeName={setTypeName}
                    lid={id}
                    setLangid={setLangid}
                  />
                </div>
              );
            })}
          </div>
          <div className="lecturers_filter_alphabet">
            {alphabet.map(({ alphabet, id }, idx) => {
              return (
                <div key={idx}>
                  <FilterButton
                    key={idx}
                    filter={filter}
                    setFilter={setFilter}
                    data1={data1}
                    setData1={setData1}
                    data2={data2}
                    setData2={setData2}
                    data3={data3}
                    aid={id}
                    setData3={setData3}
                    active={active2}
                    setActive={setActive2}
                    setTypeName={setTypeName}
                    title={alphabet}
                    setAlphabet={setAlphabet}
                    action="alphabet"
                    data={data}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {loading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        <div className="lecturers_widget">
          {!loading &&
            filter.map(
              (
                {
                  img,
                  rp,
                  name,
                  rpname,
                  comments,
                  views,
                  favorites,
                  share,
                  catsname,
                  id,
                },
                idx
              ) => {
                if (filter.length === idx + 1) {
                  return (
                    <Link
                      to={`${RESOURCE_PERSON}${id}`}
                      key={idx}
                      className="lecturers_item"
                      ref={lastElement}
                    >
                      <LecturersWidget
                        key={idx}
                        img={img}
                        views={views}
                        favorites={favorites}
                        rp={rp || name || rpname}
                      />
                      <LecturerMobileWidget
                        views={views}
                        key={idx}
                        rp={name}
                        img={img}
                      />
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      to={`${RESOURCE_PERSON}${id}`}
                      key={idx}
                      className="lecturers_item"
                    >
                      <LecturersWidget
                        key={idx}
                        img={img}
                        views={views}
                        rp={rp || name || rpname}
                      />
                      <LecturerMobileWidget
                        views={views}
                        key={idx}
                        rp={name}
                        img={img}
                      />
                    </Link>
                  );
                }
              }
            )}
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

export default Lecturers;
