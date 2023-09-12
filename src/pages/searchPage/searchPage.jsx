import React from "react";
import Container from "../../components/container/Container";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import { NavContext } from "../../components/layout/Layout";
import { useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import SearchDataWidget from "./searchDataWidget/searchDataWidget";
import {
  getSearchData,
  getSearchOptions,
  getSearchRecord,
} from "../../Redux/Actions/ActionCreators";
import { SEARCH } from "../../utils/routes/constants";
const SearchPage = () => {
  const { albumId, lecturerId, text, languageId, categoryId } =
    useContext(SearchContext);
  const { searchData, searchRecord } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const { setRes, setisOpen } = useContext(NavContext);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSideBar = () => {
    setRes(1);
    /**
    if (res === 1) {
      setRes(2);
    } else {
      setRes(1);
    }
   */
    setisOpen(true);
  };
  useEffect(() => {
    if (!text) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  function fetchData(languageId, categoryId, lecturerId, albumId) {
    //e.preventDefault();

    if (text === "") return;
    setLoading(true);
    axios
      .get(
        `https://www.dawahbox.com/scripts/py_srch_exec.php?srch_str=${text}${
          languageId?.length !== 0 ? `&lang_id=${languageId.toString()}` : ""
        }${lecturerId?.length !== 0 ? `&rp_id=${lecturerId.toString()}` : ""}${
          categoryId?.length !== 0 ? `&cat_id=${categoryId.toString()}` : ""
        }${albumId?.length !== 0 ? `&album_id=${albumId.toString()}` : ""}`
      )
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
        const { display_data, section_data, total_rec_by_section } = res.data;
        dispatch(getSearchData(display_data.mini_result));
        dispatch(getSearchOptions(section_data));
        dispatch(getSearchRecord(total_rec_by_section));

        // //console.log(display_data.mini_result)

        //onchange("");
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
        dispatch(getSearchData([]));
        dispatch(getSearchOptions({}));
      });
  }

  ////console.log(languageId, categoryId, lecturerId, albumId);

  useEffect(() => {
    if (text) {
      fetchData(languageId, categoryId, lecturerId, albumId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageId, categoryId, lecturerId, albumId, text]);

  return (
    <Container>
      <div className=" w-full h-full max-[615px]:pt-[6px] text-sm min-[615px]:text-[16px] font-thin text-gray-200">
        <div className="w-full fixed inset-x-0 z-[10] bg-[#090909] p-0 max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Search"} />
        </div>
        <div className="pt-2 pl-2 flex items-center space-x-1 max-[615px]:hidden text-gray-200">
          <HiOutlineArrowLongLeft
            onClick={() => {
              navigate(-1);
            }}
            className={
              pathname === SEARCH
                ? "text-[30px] text-white"
                : "text-[30px] text-gray-400"
            }
          />
          <HiOutlineArrowLongRight
            className={
              pathname === "/"
                ? "text-[30px] text-white"
                : "text-[30px] text-gray-400"
            }
          />
          <span className="mr-1">{"Search"}</span>/ <span></span>
          {`Search for ${text}`}
        </div>
        <div className="flex text-zinc-400 text-sm font-normal flex-col px-2 py-12  min-[615px]:px-6 min-[615px]:py-6 w-full">
          <div
            onClick={() => {
              handleSideBar();
            }}
            className="my-3 w-fit space-x-2 border px-2 py-1 rounded-md min-[890px]:hidden flex items-center border-zinc-400"
          >
            <FaFilter className="text-[22px]" />
            <div>Filter</div>
          </div>
          <div className="text-lg mb-3 min-[615px]:text-xl">{`${
            searchRecord?.toLocaleString() || 0
          } result for '${text}'`}</div>
          {loading && (
            <div className="w-full h-[300px] flex items-center justify-center">
              <div className="animate-spin w-6 h-6 min-[615px]:w-8 min-[615px]:h-8 rounded-full border-r-2 border-b-2 border-zinc-400"></div>
            </div>
          )}
          {!loading && searchData.length === 0 && (
            <div className="w-full flex items-center justify-center h-[300px]">
              <h1 className="text-3xl min-[615px]:text-4xl tracking-wider ">
                No search result found
              </h1>
            </div>
          )}
          {!loading &&
            searchData.length !== 0 &&
            searchData?.map(
              (
                {
                  lec_img,
                  cat_name,
                  mp3_title,
                  mp3_description,
                  mp3_duration,
                  id,
                },
                idx
              ) => {
                return (
                  <div key={idx}>
                    <SearchDataWidget
                      id={id}
                      lec_img={lec_img}
                      cat_name={cat_name}
                      mp3_title={mp3_title}
                      mp3_description={mp3_description}
                      mp3_duration={mp3_duration}
                    />
                  </div>
                );
              }
            )}
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
