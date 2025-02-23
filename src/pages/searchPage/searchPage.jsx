import React, { useEffect, useState, useContext } from "react";
import Container from "../../components/container/Container";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../App";
import { NavContext } from "../../components/layout/Layout";
import { FaFilter } from "react-icons/fa";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
import HeadMeta from "../../components/head-meta";

const SearchPage = () => {
  const { setText } = useContext(SearchContext);
  const { searchData } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const { setRes, setisOpen } = useContext(NavContext);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSideBar = () => {
    setRes(1);
    setisOpen(true);
  };

  function fetchData(page = 1) {
    const searchValue = searchParams.get("query");
    if (!searchValue) {
      navigate("/");
      return;
    }

    setLoading(true);
    setText(searchValue); // Now setText is properly defined from SearchContext

    const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/searchApi.php`;
    const params = new URLSearchParams({
      type: "global",
      value: searchValue,
      page: page.toString(),
      limit: "20",
    });

    axios
      .get(`${baseUrl}?${params.toString()}`)
      .then((res) => {
        setLoading(false);
        if (res.data.status === "success") {
          dispatch(getSearchData(res.data.results || []));
          dispatch(getSearchRecord(res.data.total || 0));
          setTotalResults(res.data.total || 0);
          setCurrentPage(parseInt(res.data.page) || 1);
        } else {
          dispatch(getSearchData([]));
          dispatch(getSearchRecord(0));
          setTotalResults(0);
        }
      })
      .catch((err) => {
        console.error("Search error:", err);
        setLoading(false);
        dispatch(getSearchData([]));
        dispatch(getSearchRecord(0));
        setTotalResults(0);
      });
  }

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    fetchData(page);
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    navigate(`${pathname}?${newSearchParams.toString()}`);
  };

  const totalPages = Math.ceil(totalResults / 20);
  const searchValue = searchParams.get("query");

  return (
    <Container>
      <div className="w-full h-full max-[615px]:pt-[6px] text-sm min-[615px]:text-[16px] font-thin text-black dark:text-gray-200">
        <div className="w-full fixed inset-x-0 z-[10] bg-primary-foreground p-0 max-[615px]:border-b border-zinc-700">
          <HeadMeta
            title={`Search for ${
              searchValue || "islamic"
            } resources on Dawah Nigeria`}
          />
          <HeaderRouter title={"Search"} />
        </div>
        <div className="pt-2 pl-2 flex items-center space-x-1 max-[615px]:hidden">
          <HiOutlineArrowLongLeft
            onClick={() => navigate(-1)}
            className={
              pathname === SEARCH
                ? "text-[30px] text-color"
                : "text-[30px] text-gray-400"
            }
          />
          <HiOutlineArrowLongRight
            className={
              pathname === "/"
                ? "text-[30px] text-color"
                : "text-[30px] text-zinc-400"
            }
          />
          <span className="mr-1">{"Search"}</span>/ <span></span>
          {`Search for ${searchValue || ""}`}
        </div>
        <div className="flex text-color text-sm font-normal flex-col px-2 py-12 min-[615px]:px-6 min-[615px]:py-6 w-full">
          <div
            onClick={handleSideBar}
            className="my-3 w-fit space-x-2 border px-2 py-1 rounded-md min-[890px]:hidden flex items-center border-border"
          >
            <FaFilter className="text-[22px]" />
            <div>Filter</div>
          </div>
          <div className="text-lg text-foreground mb-3 min-[615px]:text-xl">
            {`${totalResults?.toLocaleString() || 0} results for '${
              searchValue || ""
            }'`}
          </div>

          {loading && (
            <div className="w-full h-[300px] flex items-center justify-center">
              <div className="animate-spin w-6 h-6 min-[615px]:w-8 min-[615px]:h-8 rounded-full border-r-2 border-b-2 border-zinc-400"></div>
            </div>
          )}

          {!loading && (!searchData || searchData.length === 0) && (
            <div className="w-full flex items-center justify-center h-[300px]">
              <h1 className="text-3xl min-[615px]:text-4xl text-color tracking-wider">
                No search results found
              </h1>
            </div>
          )}

          {!loading && searchData && searchData.length > 0 && (
            <>
              <div className="space-y-2">
                {searchData.map((item, idx) => (
                  <SearchDataWidget
                    key={item._id.$oid || idx}
                    lec_img={item.lecturer_image}
                    cat_name={item.type}
                    mp3_title={item.title}
                    mp3_description={item.description}
                    lecturer_name={item.lecturer_name}
                    id={item.id}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
