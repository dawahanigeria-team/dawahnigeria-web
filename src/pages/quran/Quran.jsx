import React, { useState } from "react";
import "./quran.scss";
import Container from "../../components/container/Container";
import List from "../../components/list/list";
import { Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import Loader from "../../components/UI/loader/loader";
import { LECTURE, QURAN } from "../../utils/routes/constants";
import _ from "lodash";
import { useInfiniteScrollPagination, useQurans } from "../../hooks";

const Quran = () => {
  const [page, setPage] = useState(1);

  const { cummulatedData: data, isLoading, isRefetching } = useQurans(page);

  const { ref: lastElementRef } = useInfiniteScrollPagination(
    data?.length,
    page,
    setPage
  );

  return (
    <Container>
      <div className="trend_wrapper">
        <div className="trend_header_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Quran"} />
        </div>

        <div className="trend_title_wrap">
          <div className="tend_title1">
            <p className="tend_hash">#</p>
            <p>Title</p>
          </div>
          <p className="tend_title2">
            <span>Reciter</span>
          </p>

          <p className="tend_title4">
            <span>Time</span>
          </p>
        </div>
        {isLoading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="table">
            {data.map(
              (
                {
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
                    ref={data.length === idx + 1 ? lastElementRef : null}
                    key={idx}
                    className=""
                  >
                    <List
                      key={idx}
                      id={idx}
                      image={img}
                      favorites={favorites}
                      duration={duration}
                      title={Title}
                      lecturer={rpname}
                      rpid={rp_id}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname}
                      // endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      views={views}
                      navName={"Quran"}
                      navLink={QURAN}
                      controlData={data}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}
        {isRefetching && (
          <div className="load_m">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        {/*************** mobile **********/}
        <div className="mobile_lists">
          <Link
            to={`${LECTURE}${data[0]?.nid}`}
            className="header pb-2 border-b border-zinc-500 w-full"
          >
            <div className="w-fit h-fit border p-1 rounded-full items-center flex justify-center">
              <div className="w-3 h-3  ">
                <img className="w-full h-full" src={pmobile} alt="" />
              </div>
            </div>

            <p className="">Play All</p>
          </Link>

          <div className="bg-none h-1 w-1"></div>
          {isLoading && (
            <div className="load_mobile">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}
          {!isLoading &&
            data.map(
              (
                {
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
                    ref={data.length === idx + 1 ? lastElementRef : null}
                    key={idx}
                    className="each_mobile_list"
                  >
                    <List
                      key={idx}
                      id={idx}
                      duration={duration}
                      image={img}
                      title={Title}
                      lecturer={rpname}
                      favorites={favorites}
                      comments={comments}
                      rpid={rp_id}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname}
                      // endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"Quran"}
                      navLink={Quran}
                      controlData={data}
                      views={views}
                      share={share}
                    />
                  </div>
                );
              }
            )}
          {isRefetching && (
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

export default Quran;
