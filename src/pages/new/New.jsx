import React, { useEffect, useState, useRef, useCallback } from "react";
import "./new.scss";
import Container from "../../components/container/Container";
import MusicList from "../../components/miscList/musicList"
//import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import pmobile from "../../../src/assets/svg/playmobile.svg";
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import infiniteScroll from "../../components/UI/infiniteScroll";
import _ from "lodash"
import { LECTURE } from "../../utils/routes/constants";
import { useNavigate } from "react-router-dom";
const New = () => {
  const [data, setData] = useState([]);
  const [drop, setDrop] = useState("");
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const observerMobile = useRef()
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (page > 1) {
      setNextPageLoad(true);
    }
    //https://www.dawahbox.com/mongo/api
    axios
      .get(`/leclistingapi.php?sort=desc&page=${page}`)
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

        setData((prev) => _.uniqBy([...prev,...res.data], 'nid'));
      })
      .catch((err) => {
        console.log(err);
      });
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
    

      navigate(`${LECTURE}${data[0?.nid]}`, {
        state: {
          endpoint_url: `/popular_lec_api.php?langid=6&page=`,
          currentPage: 1,
          idx: 0,
          nid: data[0].nid,
          nav1: { title: "playAll", link: "/new" },
        },
      });
    };

  //const newData = data.filter((a) => a.duration !== "0");
  return (
    <Container>
      <div className="new_wrapper">
        <div className="new_header_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"New"} />
        </div>

        <div className="new_title_wrap">
          <div className="new_title1">
            <p className="new_hash">#</p>
            <p>Title</p>
          </div>
          <p className="new_title2">
            <span>Lecturer</span>
          </p>

          <p className="new_title4">
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
              ({ Title, rpname, img, cats, nid,  comments,favorites, rp_id, duration, share, views }, idx) => {
               
               if (data.length === idx + 1) {
                return (
                  <div
                  ref={lastElement}
                  key={idx} className="">
                    <MusicList
                   
                      key={idx}
                      id={idx}
                      image={img}
                      comments={comments}
                      favorites={favorites}
                      duration={duration}
                      title={Title}
                      lecturer={rpname}
                      drop={drop}
                      setDrop={setDrop}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpid={rp_id}
                      rpname={rpname}
                      endpoint_url={"/leclistingapi.php?sort=desc&page="}
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
                  <div key={idx} className="">
                    <MusicList
                      key={idx}
                      id={idx}
                      image={img}
                      comments={comments}
                      duration={duration}
                      title={Title}
                      lecturer={rpname}
                      favorites={favorites}
                     
                      rpid={rp_id}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/leclistingapi.php?sort=desc&page="}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"New"}
                      navLink={"/new"}
                      controlData={data}
                      views={views}
                      share={share}
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
          className="header  pb-2 border-b border-zinc-500 w-full">
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
            data.map(({ Title, rpname, img,   comments, rp_id, cats,favorites, nid,views, duration }, idx) => {
              
              if (data.length === idx + 1) {
                return (
                  <div
                  ref={lastElementMobile}
                  key={idx} className="each_mobile_list">
                    <MusicList
                      key={idx}
                      id={idx}
                      duration={duration}
                      image={img}
                      title={Title}
                      lecturer={rpname}
                      favorites={favorites}
                      comments={comments}
                     
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      rpname={rpname}
                      endpoint_url={"/leclistingapi.php?sort=desc&page="}
                      currentPage={page}
                      cats={cats}
                      rpid={rp_id}
                      nid={nid}
                      navName={"Trending"}
                      navLink={"/trending"}
                      controlData={data}
                      views={views}
                    />
                  </div>
                );

              }
              else {
                return (
                  <div key={idx} className="each_mobile_list">
                    <MusicList
                      key={idx}
                      id={idx}
                      duration={duration}
                      image={img}
                      title={Title}
                      lecturer={rpname}
                      comments={comments}
                      rpid={rp_id}
                      url={`${LECTURE}${nid}`}
                      Title={Title}
                      favorites={favorites}
                      rpname={rpname}
                      endpoint_url={"/leclistingapi.php?sort=desc&page="}
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

export default New;
