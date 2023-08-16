import React, { useEffect, useState, useRef, useCallback } from "react";
import "./trending.scss";
import Container from "../../components/container/Container";
import List from "../../components/list/list";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import infiniteScroll from "../../components/UI/infiniteScroll";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";


import _ from "lodash"
const Trending = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const observerMobile = useRef()
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    if (page > 1) {
      setNextPageLoad(true);
    }
    axios
      .get(`/popular_lec_api.php?langid=6&page=${page}`)
      .then((res) => {
        console.log(res.data);
        if (page === 1) {
          setLoading(false);
        }
        setNextPageLoad(false);
        if (res.data.length === 0) {
          setIsEmpty(true);
          return;
        }
       //console.log(_.uniqBy([...res.data], 'nid'))
        setData((prev) => _.uniqBy([...prev,...res.data], 'nid'));
      })
      .catch((err) => {
        console.log(err);
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  
  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;
      infiniteScroll(node, observer, page, setPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const lastElementMobile = useCallback(
    (node) => {
      if (isEmpty) return;
      infiniteScroll(node, observerMobile, page, setPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );




      //play all audio files
      const playAll = () => {
    

        navigate(`/l/${data[0]?.nid}`, {
          state: {
            endpoint_url: `/popular_lec_api.php?langid=6&page=`,
            currentPage: 1,
            idx: 0,
            nid: data[0].nid,
            nav1: { title: "playAll", link: "/new" },
          },
        });
      };
  

  return (
    <Container>
      <div className="trend_wrapper">
        <div className="trend_header_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Trending"} />
        </div>

        <div className="trend_title_wrap">
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
        {loading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        {!loading && (
          <div className="table">
            {data.map(
              ({ Title, rpname, img, cats, nid, views,favorites,rp_id, duration }, idx) => {
               
               if (data.length === idx + 1) {
                return (
                  <div
                  ref={lastElement}
                  key={idx} className="">
                    <List
                   
                      key={idx}
                      id={idx}
                      image={img}
                      favorites={favorites}
                      duration={duration}
                      title={Title}
                      lecturer={rpname}
                      rpid={rp_id}
                      url={`/l/${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      views={views}

                      navName={"Trending"}
                      navLink={"/trending"}
                      controlData={data}
                    />
                  </div>
                );

               }
               else {
                return (
                  <div key={idx} className="">
                    <List
                      key={idx}
                      id={idx}
                      image={img}
                      duration={duration}
                      favorites={favorites}
                      title={Title}
                      lecturer={rpname}
                      rpid={rp_id}
                      url={`/l/${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"Trending"}
                      navLink={"/trending"}
                      controlData={data}
                      views={views}
                    />
                  </div>
                );

               }
            
              }
            )}
            

          </div>
        )}
         {nextPageLoad && (
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
          className="header pb-2 border-b border-zinc-500 w-full">
           <div className="w-fit h-fit border p-1 rounded-full items-center flex justify-center">
           <div className="w-3 h-3  ">
              <img className="w-full h-full" src={pmobile}  alt="" />
            </div>
           </div>
           
            <p className="">Play All</p>
          </div>
          <div className="bg-none h-1 w-1"></div>
          {loading && (
            <div className="load_mobile">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}
          {!loading &&
            data.map(({ Title, rpname, img, cats, rp_id, favorites, nid,views,comments, duration, share }, idx) => {
              
              if (data.length === idx + 1) {
                return (
                  <div
                  ref={lastElementMobile}
                  key={idx} className="each_mobile_list">
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
                      url={`/l/${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"Trending"}
                      navLink={"/trending"}
                      controlData={data}
                      views={views}
                      share={share}
                    />
                  </div>
                );

              }
              else {
                return (
                  <div key={idx} className="each_mobile_list">
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
                      url={`/l/${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/popular_lec_api.php?langid=6&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"Trending"}
                      navLink={"/trending"}
                      controlData={data}
                      views={views}
                      share={share}
                    />
                  </div>
                );

              }
        
            })}
               {nextPageLoad && (
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
