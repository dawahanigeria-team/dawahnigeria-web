import React, {
  useState,
  useRef,
  useContext,
} from "react";
import "./more.scss";
import Container from "../../components/container/Container";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import {
  getPack,
  getPage,
} from "../../Redux/Actions/ActionCreators";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";

import Loader from "../UI/loader/loader";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AudioContext } from "../../App";
import { useInfiniteScrollPagination } from "../../hooks";
import LecturersWidget from "../lecturersWidget/LecturersWidget";
import GenreMobileLecturer from "../../pages/genredetail/genreMobileLecturer";
import {
  LECTURE,
  ALBUMS,
  RESOURCE_PERSON,
  PLAYLISTS,
  MORE,
} from "../../utils/routes/constants";

import { useMoreViewHook } from "../../hooks";

import HeadMeta from "../head-meta";

function More() {
  const dispatch = useDispatch();

  ///const [data, setData] = useState([]);
  const { state, pathname } = useLocation();
  const islect = true;
  const {
    type,
    currentdata,
    navtitle,
    heading,
    endpoint_url,
    currentPage,
  } = state;
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();
  const { setinitial } = useContext(AudioContext);
  const keyParam = { endpoint_url, page };

  const { data, isLoading, isLoadingNextPage, isLastPage } = useMoreViewHook(
    keyParam,
    currentdata
  );

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    data?.length,
    page,
    setPage
  );

  return (
    <Container>
      <HeadMeta title={`${heading ?? "Islamic"} resources on Dawah Nigeria `} />
      <div className="more_wrapper">
        <div className="more_wrap_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={heading} />
        </div>
        <div className="desktop_heading">
          <HiOutlineArrowLongLeft
            onClick={() => {
              navigate(-1);
            }}
            className={pathname === MORE ? "arrows white" : "arrows grey"}
          />
          <HiOutlineArrowLongRight
            className={pathname === "/" ? "arrows white" : "arrows grey"}
          />
          <span className="grey">{navtitle}</span>/ <span></span>
          {heading}
        </div>

        {/*
          <div className="flex w-full items-center h-[300px] justify-center">
            <Loader />
          </div>
          */}
        <div className="more_widget">
          {type === "lectures" &&
            Array.isArray(data) &&
            data?.map(
              (
                {
                  img,
                  lec_img,
                  categories,
                  cats,
                  title,
                  mp3_title,
                  Title,
                  id,
                  rpname,
                  nid,
                  audio,
                  lec_no,
                },
                idx
              ) => {
                return (
                  <Link
                    to={`${LECTURE}${nid || id}`}
                    onClick={() => {
                      if (window.innerWidth <= 615) {
                        dispatch(getPack(null));
                        dispatch(getPage(currentPage));
                        dispatch(getPack(data));
                        setinitial(false);
                      }
                    }}
                    ref={
                      idx === data?.length - 1 && !isLastPage
                        ? infiniteScrollRef
                        : null
                    }
                    key={idx + 1}
                    className="widget_list_items"
                  >
                    <AlbumWidget
                      key={idx}
                      categories={
                        title?.split("-")[0] ||
                        Title?.split("-")[0] ||
                        title ||
                        Title ||
                        mp3_title
                      }
                      img={img || lec_img}
                      lec_no={lec_no}
                      nid={nid}
                    />
                  </Link>
                );
              }
            )}
          {type === "album" &&
            Array.isArray(data) &&
            data?.map(
              (
                {
                  img,
                  lec_img,
                  categories,
                  cats,
                  title,
                  name,
                  Title,
                  rpname,
                  nid,
                  id,
                  audio,
                  views,
                  lec_no,
                },
                idx
              ) => {
                return (
                  <Link
                    to={`${ALBUMS}${nid || id}`}
                    key={idx + 1}
                    className="widget_list_items"
                  >
                    <AlbumWidget
                      key={idx}
                      categories={
                        name?.split("-")[0] ||
                        Title?.split("-")[0] ||
                        title ||
                        Title
                      }
                      img={img || lec_img}
                      lec_no={lec_no}
                      nid={nid}
                    />
                  </Link>
                );
              }
            )}
          {type === "playlist" &&
            Array.isArray(data) &&
            data.map(
              (
                {
                  img,
                  lec_img,
                  categories,
                  cats,
                  title,
                  Title,
                  rpname,
                  nid,
                  id,
                  audio,
                  name,
                  lec_no,
                },
                idx
              ) => {
                return (
                  <Link
                    to={`${PLAYLISTS}${nid || id}`}
                    key={idx + 1}
                    ref={
                      idx === data?.length - 1 && !isLastPage
                        ? infiniteScrollRef
                        : null
                    }
                    className="widget_list_items"
                  >
                    <AlbumWidget
                      key={idx}
                      categories={
                        title?.split("-")[0] ||
                        Title?.split("-")[0] ||
                        title ||
                        Title ||
                        name
                      }
                      img={img || lec_img}
                      lec_no={lec_no || 0}
                      nid={nid}
                    />
                  </Link>
                );
              }
            )}

          {type === "recent" &&
            Array.isArray(data) &&
            data.map(
              (
                {
                  img,
                  lec_img,
                  categories,
                  cats,
                  title,
                  Title,
                  rpname,
                  nid,
                  id,
                  audio,
                  name,
                  views,
                  lec_no,
                },
                idx
              ) => {
                return (
                  <Link
                    to={
                      endpoint_url
                        ? `${LECTURE}${nid || id}`
                        : `${ALBUMS}${nid || id}`
                    }
                    onClick={() => {
                      if (endpoint_url && window.innerWidth <= 615) {
                        dispatch(getPack(null));
                        dispatch(getPage(currentPage));
                        dispatch(getPack(data));
                        setinitial(false);
                      }
                    }}
                    key={idx + 1}
                    className="widget_list_items"
                  >
                    <AlbumWidget
                      key={idx}
                      categories={
                        title?.split("-")[0] ||
                        Title?.split("-")[0] ||
                        title ||
                        Title ||
                        name
                      }
                      img={img || lec_img}
                      lec_no={lec_no || 0}
                      nid={nid}
                    />
                  </Link>
                );
              }
            )}
        </div>
        <div className="lecturers_widget">
          {type === "lecturer" &&
            Array.isArray(data) &&
            data?.map(
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
                    key={idx}
                    className="lecturers_item"
                    ref={
                      idx === data?.length - 1 && !isLastPage
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
                    <GenreMobileLecturer
                      styling={islect}
                      views={views}
                      rp={name}
                      img={img}
                    />
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
}

export default More;
