import React, { useEffect, useState, useRef, useCallback } from "react";
import "./new.scss";
import Container from "../../components/container/Container";
import MusicList from "../../components/miscList/musicList";
//import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import _ from "lodash";
import { BsFillPlayFill } from "react-icons/bs";
import { LECTURE, TRENDING, NEW } from "../../utils/routes/constants";
import { useNavigate } from "react-router-dom";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { newApi } from "../../services";

import HeadMeta from "../../components/head-meta";

const New = () => {
  const [page] = useState(1);
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();
  const queryParam = { page };
  const { isLoading, querieddata } = useQueryGetRequest(
    "new",
    queryParam,
    newApi.getNewLectures
  );

  //play all audio filesF
  const playAll = () => {
    navigate(`${LECTURE}${querieddata[0?.nid]}`, {
      state: {
        idx: 0,
        nid: querieddata[0].nid,
        nav1: { title: "playAll", link: NEW },
      },
    });
  };

  //const newData = data.filter((a) => a.duration !== "0");
  return (
    <Container>
      <HeadMeta
        title={`New resources on Dawah Nigeria - Home of islamic contents`}
      />
      <div className="new_wrapper">
        <div className="new_header_link bg-background max-[615px]:border-b border-zinc-700">
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
        {isLoading && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="table">
            {querieddata.map(
              (
                {
                  Title,
                  rpname,
                  cats,
                  nid,
                  lec_thumbnail,
                  comments,
                  favorites,
                  rp_id,
                  duration,
                  mp3_duration,
                  mp3_title,
                  share,
                  views,
                },
                idx
              ) => {
                return (
                  <div key={idx} className="">
                    <MusicList
                      key={idx}
                      id={idx}
                      image={lec_thumbnail}
                      comments={comments}
                      favorites={favorites}
                      duration={mp3_duration || duration}
                      title={mp3_title || Title}
                      lecturer={rpname}
                      drop={drop}
                      setDrop={setDrop}
                      url={`${LECTURE}${nid}`}
                      Title={mp3_title || Title}
                      rpid={rp_id}
                      rpname={rpname}
                      currentPage={page}
                      cats={cats}
                      nid={nid}
                      navName={"Trending"}
                      navLink={TRENDING}
                      controlData={querieddata}
                      views={views}
                      share={share}
                    />
                  </div>
                );
              }
            )}
          </div>
        )}

        {/*************** moobile **********/}
        <div className="mobile_lists">
          <div
            onClick={playAll}
            className="header pb-2 border-b border-color-primary  w-full"
          >
            <div className="w-fit h-fit border border-color-primary p-[2px] rounded-full">
              <BsFillPlayFill className="text-[22px] text-color-primary" />
            </div>

            <p className="text-color-primary font-medium">Play All</p>
          </div>
          <div className="bg-none h-1 w-1"></div>
          {isLoading && (
            <div className="load_mobile">
              <div className="loads">
                <Loader />
              </div>
            </div>
          )}
          {!isLoading &&
            querieddata.map(
              (
                {
                  Title,
                  rpname,
                  img,
                  mp3_thumbnail,
                  comments,
                  rp_id,
                  mp3_title,
                  cats,
                  favorites,
                  nid,
                  views,
                  duration,
                },
                idx
              ) => {
                return (
                  <div key={idx} className="each_mobile_list">
                    <MusicList
                      key={idx}
                      id={idx}
                      duration={duration}
                      image={mp3_thumbnail || img}
                      title={mp3_title || Title}
                      lecturer={rpname}
                      favorites={favorites}
                      comments={comments}
                      url={`${LECTURE}${nid}`}
                      Title={mp3_title || Title}
                      rpname={rpname}
                      currentPage={page}
                      cats={cats}
                      rpid={rp_id}
                      nid={nid}
                      navName={"Trending"}
                      navLink={TRENDING}
                      controlData={querieddata}
                      views={views}
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

export default New;
