import React, { useState, useEffect} from "react";
import "./lecturers.scss";
import Container from "../../components/container/Container";
import FilterButton from "../../components/filterButton/FilterButton";
import { lecturers,  alphabet } from "./data";
import LecturersWidget from "../../components/lecturersWidget/LecturersWidget";
import LecturerMobileWidget from "../../components/lecturersWidget/LecturerMobileWidget";
import { Link, useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import { RESOURCE_PERSON } from "../../utils/routes/constants";
import { useInfiniteScrollPagination } from "../../hooks";
import { useLecturersHook } from "../../hooks/lecturers/useLecturers.hook";
import { lecturersApi } from "../../services";
import { useLanguagesHook } from "../../hooks/lecturers/useLanguage.hook";
import HeadMeta from "../../components/head-meta";

const Lecturers = () => {
  //const [data, setData] = useState([]);
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
  const [typeName, setTypeName] = useState("");
  const [alpha, setAlphabet] = useState("");
  const [lectId, setlectId] = useState('')
  const queryParam = { lectId, langid, alpha, page, typeName, active };
 
  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
  useLecturersHook(
    "lecturers",
    queryParam,
    lecturersApi.getLecturers,
    setPage
  );
//console.log("lectureres query", querieddata);


  const {data} = useLanguagesHook()
  useEffect(() => {

    setData3(querieddata);
   
  }, [querieddata]);



  //console.log(data);
  //console.log(lectId)
  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    filter?.length,
    page,
    setPage
  );

  return (
    <Container>
      <HeadMeta title={`Lecturers - Get islamic resources on Dawah Nigeria`} />
      <div className="lecturers_wrapper">
        <div className="lecturers_head_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Lecturer"} />
        </div>
        <div className="lecturers_filter">
          <div className="lecturers_filter_name">
            {lecturers.map(({ name, id }, idx) => {
              return (
                <div key={name}>
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
                    //setIsEmpty={setIsEmpty}
                    setTypeName={setTypeName}
                    action="name"
                    data={querieddata}
                  />
                </div>
              );
            })}
          </div>
          <div className="lecturers_filter_language">
            {Array.isArray(data) && data?.map(({ name, id }, idx) => {
              return (
                <div key={name}>
                  <FilterButton
                    filter={filter}
                    setFilter={setFilter}
                    data1={data1}
                    setData1={setData1}
                    data2={data2}
                    setData2={setData2}
                    data3={data3}
                    setActiveId={setActive}
                    setData3={setData3}
                    active={active1}
                    setlectId={setlectId}
                    setActive={setActive1}
                    title={name}
                    action="language"
                    data={querieddata}
                   // setIsEmpty={setIsEmpty}
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
                <div key={alphabet}>
                  <FilterButton
                    filter={filter}
                    setFilter={setFilter}
                    data1={data1}
                    setData1={setData1}
                    data2={data2}
                    setData2={setData2}
                    data3={data3}
                    aid={id}
                    setData3={setData3}
                    setActiveId={setActive}
                    active={active2}
                    setlectId={setlectId}
                    setActive={setActive2}
                    setTypeName={setTypeName}
                    title={alphabet}
                    setAlphabet={setAlphabet}
                    action="alphabet"
                    data={querieddata}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {isLoading  && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        <div className="lecturers_widget">
          {Array.isArray(filter) && filter.map(
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
              return (
                <Link
                  to={`${RESOURCE_PERSON}${id}`}
                  key={name}
                  className="lecturers_item"
                  ref={
                    idx === filter.length - 1 && !isLastPage
                      ? infiniteScrollRef
                      : null
                  }
                >
                  <LecturersWidget
                    img={img}
                    views={views}
                    favorites={favorites}
                    rp={rp || name || rpname}
                  />
                  <LecturerMobileWidget views={views} rp={name} img={img} />
                </Link>
              );
            }
          )}
        </div>

        {isLoadingNextPage && (
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
