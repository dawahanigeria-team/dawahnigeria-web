import React, { useState, useEffect, useRef, useContext, useCallback, memo, useMemo } from "react";
import "./groupWidget.scss";
import LandingWidget from "../landingWidget/LandingWidget";
import { FiChevronsRight } from "react-icons/fi";
import LecturersWidget from "../lecturersWidget/LecturersWidget";
import { useNavigate, Link } from "react-router-dom";
import back from "../../assets/svg/back.svg";
import foward from "../../assets/svg/foward.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AudioContext } from "../../App";
import { settings3, settings4 } from "./settings";
import {
  getType,
  getaudioData,
  getaudioId,
  getCount,
  getPack,
  getPage,
} from "../../Redux/Actions/ActionCreators";
import { useDispatch } from "react-redux";
import LecturerMobileChart from "./chartUIs/lecturersMobileChart";
import LectureMobileChart from "./chartUIs/lectureMobileChart";
import AlbumMobileChart from "./chartUIs/albumMobileChart";
import GenreMobileLecturer from "../../pages/genredetail/genreMobileLecturer";
import {
  ALBUMS,
  LECTURE,
  PLAYLISTS,
  RESOURCE_PERSON,
  MORE,
  TRENDING,
  RECENTLY_POSTED_MORE,
  RECENTLY_VIEWED_MORE,
  TRENDING_MORE,
  RECOMMENDED_MORE,
} from "../../utils/routes/constants";

// Throttle utility for resize events
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const GroupWidget = ({
  data,
  heading,
  type,
  nav1,
  isrecent,
  styling,
  endpoint_url,
  currentPage,
  previousPlay,
  moreRoute,
  hideMore = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setinitial } = useContext(AudioContext);
  const slide = useRef();

  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  const [size, setSize] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  });
  const [, setSettingsresponsive] = useState(() => {
    return size < 513 ? { ...settings4 } : { ...settings3 };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Throttled resize handler - fires at most once per 150ms
      const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        setSize(newWidth);
        setSettingsresponsive(() => {
          return newWidth < 513 ? { ...settings4 } : { ...settings3 };
        });
      }, 150);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  function prev() {
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  function next() {
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollEl() {
      if (slide.current.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        slide.current.scrollLeft + slide.current.offsetWidth >=
        slide.current.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    slide.current?.addEventListener("scroll", scrollEl);

    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);

  const getMoreRoute = (heading) => {
    if (moreRoute) {
      return moreRoute;
    }

    switch (heading?.toLowerCase()) {
      case "recently posted":
        return RECENTLY_POSTED_MORE;
      case "recently viewed":
        return RECENTLY_VIEWED_MORE;
      case "trending":
        return TRENDING_MORE;
      case "recommended":
        return RECOMMENDED_MORE;
      default:
        return MORE;
    }
  };

  return (
    <div className="groupWidget_wrapper">
      {Array.isArray(data) && data.length > 0 && (
        <div className="groupWidget_top">
          <p className="groupWidget_top_heading text-color-primary">
            {heading}
          </p>
          {!hideMore && (
            <button
              type="button"
              onClick={() => {
                navigate(getMoreRoute(heading) || MORE, {
                  state: {
                    name: "",
                    heading: heading,
                    id: "",
                    img: "",
                    type,
                    currentdata: data,
                    endpoint_url: endpoint_url || "",
                    currentPage: currentPage || "",
                    navtitle: nav1?.title || "",
                  },
                });
              }}
              className={
                styling && endpoint_url
                  ? "flex dark:text-dncolor-500 text-color-primary text-[15px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dncolor-500 rounded"
                  : `flex dark:text-dncolor-500 text-color-primary text-[15px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dncolor-500 rounded ${
                      nav1?.title === "Charts" ? "max-[615px]:hidden" : ""
                    }`
              }
              aria-label={`View more ${heading}`}
            >
              <span>more</span>
              <FiChevronsRight className="text-[20px] pt-1" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {type === "recent" && (
        <div className="overflow_hidden_wrapper">
          <button
            type="button"
            className={isprev ? "prev" : "prev_none"}
            onClick={prev}
            aria-label="Scroll left"
          >
            <img src={back} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={isnext ? "next" : "next_none"}
            onClick={next}
            aria-label="Scroll right"
          >
            <img src={foward} alt="" width={24} height={24} />
          </button>
          <div ref={slide} className="overflow_auto_wrapper">
            <div
              className={`overflow_auto_after ${
                styling ? "min-[615px]:space-x-3" : "space-x-4"
              }`}
            >
              {Array.isArray(data) &&
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
                      audio,
                      views,
                    },
                    idx
                  ) => {
                    return (
                      <Link
                        to={isrecent ? `${ALBUMS}${nid}` : `${LECTURE}${nid}`}
                        id={idx}
                        name={nid}
                        className="groupWidget_album_item"
                        onClick={() => {
                          if (isrecent) {
                            //navigate(`/a/${nid}`);
                            dispatch(getaudioId(previousPlay[idx]));
                            dispatch(getPack(null));
                            dispatch(getCount(idx));
                            dispatch(getPack(data));
                            dispatch(getPage(currentPage));
                            dispatch(
                              getaudioData({
                                nid,
                                id: idx,
                                endpoint_url,
                                currentPage,
                                controlData: data,
                                navName: nav1?.navName || nav1?.title || "Home",
                              })
                            );
                          } else {
                            // navigate(`/l/${nid}`);
                            if (typeof window !== 'undefined' && window.innerWidth <= 615) {
                              dispatch(getPack(null));
                              dispatch(getPage(currentPage));
                              dispatch(getPack(data));
                              dispatch(getCount(idx));
                              setinitial(false);
                            }
                          }
                        }}
                        key={idx + 1}
                      >
                        <LandingWidget
                          categories={title || Title || categories || cats}
                          img={img || lec_img}
                          views={views}
                          nid={nid}
                          styling={styling}
                          rpname={rpname}
                          audio={audio}
                        />
                      </Link>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}

      {type === "lectures" && (
        <div className="overflow_hidden_wrapper">
          <button
            type="button"
            className={isprev ? "prev" : "prev_none"}
            onClick={prev}
            aria-label="Scroll left"
          >
            <img src={back} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={isnext ? "next" : "next_none"}
            onClick={next}
            aria-label="Scroll right"
          >
            <img src={foward} alt="" width={24} height={24} />
          </button>
          <div ref={slide} className={`overflow_auto_wrapper `}>
            <div
              className={`overflow_auto_after  ${
                styling ? "min-[615px]:space-x-3 space-x-3" : ""
              }`}
            >
              {Array.isArray(data) &&
                data.map(
                  (
                    {
                      img,
                      lec_img,
                      categories,
                      cats,
                      id,
                      mp3_title,
                      title,
                      Title,
                      rpname,
                      nid,
                      audio,
                      views,
                    },
                    idx
                  ) => {
                    return (
                      <div key={idx}>
                        <Link
                          to={`${LECTURE}${nid || id}`}
                          id={idx}
                          className={`groupWidget_album_item  ${
                            styling ? "relative max-[615px]:hidden" : ""
                          }`}
                          onClick={() => {
                            // navigate(`/l/${nid || id}`);
                            if (typeof window !== 'undefined' && window.innerWidth <= 615) {
                              dispatch(getPack(null));
                              dispatch(getPage(currentPage));
                              dispatch(getCount(idx));
                              dispatch(getPack(data));
                              dispatch(
                                getaudioData({
                                  endpoint_url,
                                  currentPage,
                                  controlData: data,
                                  navName: nav1?.navName || nav1?.title || "Home",
                                })
                              );
                              setinitial(false);
                            }
                          }}
                          key={idx + 1}
                        >
                          <LandingWidget
                            key={idx}
                            categories={title || Title || mp3_title}
                            img={img || lec_img}
                            views={views || 0}
                            nid={nid || id}
                            styling={styling}
                            rpname={rpname}
                          />
                          <div
                            className={`absolute right-[-14px] bottom-[10px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${
                              idx === 2 ? "bg-[#96734a]" : ""
                            } ${idx === 1 ? "bg-[#76a8d7]" : ""}${
                              idx === 0 ? "bg-[#ffa736]" : ""
                            }
                        ${styling && idx < 3 ? "block" : "hidden"}`}
                          >
                            <span>{idx + 1}</span>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}
      {type === "lectures" && nav1?.title === "Charts" && (
        <div
          className={
            styling
              ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center"
              : "hidden"
          }
        >
          <LectureMobileChart data={data} />
        </div>
      )}

      {type === "album" && nav1?.title === "Charts" && (
        <div
          className={
            styling
              ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center"
              : "hidden"
          }
        >
          <AlbumMobileChart data={data} />
        </div>
      )}

      {type === "lecturer" && nav1?.title === "Charts" && (
        <div
          className={
            styling
              ? "hidden mx-auto w-full max-[615px]:flex flex-col justify-center"
              : "hidden"
          }
        >
          <LecturerMobileChart data={Array.isArray(data) && data} />
        </div>
      )}
      {type === "album" && (
        <div className="overflow_hidden_wrapper">
          <button
            type="button"
            className={isprev ? "prev" : "prev_none"}
            onClick={prev}
            aria-label="Scroll left"
          >
            <img src={back} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={isnext ? "next" : "next_none"}
            onClick={next}
            aria-label="Scroll right"
          >
            <img src={foward} alt="" width={24} height={24} />
          </button>
          <div ref={slide} className="overflow_auto_wrapper">
            <div
              className={`overflow_auto_after  ${
                styling ? "min-[615px]:space-x-3 space-x-3" : ""
              }`}
            >
              {Array.isArray(data) &&
                data.map(
                  (
                    {
                      img,
                      lec_img,
                      categories,
                      cats,
                      title,
                      nid,
                      Title,
                      rpname,
                      name,
                      id,
                      audio,
                      views,
                    },
                    idx
                  ) => {
                    return (
                      <Link
                        to={`${ALBUMS}${id || nid}`}
                        id={idx}
                        className={`groupWidget_album_item  ${
                          styling ? "relative max-[615px]:hidden" : ""
                        }`}
                        onClick={() => {}}
                        key={idx + 1}
                      >
                        <LandingWidget
                          key={idx}
                          categories={name || title || Title}
                          img={img || lec_img}
                          views={views || 0}
                          nid={id || nid}
                          styling={styling}
                        />
                        <div
                          className={`absolute right-[-14px] bottom-[10px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${
                            idx === 2 ? "bg-[#96734a]" : ""
                          } ${idx === 1 ? "bg-[#76a8d7]" : ""}${
                            idx === 0 ? "bg-[#ffa736]" : ""
                          }
                        ${styling && idx < 3 ? "block" : "hidden"}`}
                        >
                          <span>{idx + 1}</span>
                        </div>
                      </Link>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}

      {type === "playlist" && (
        <div className="overflow_hidden_wrapper">
          <button
            type="button"
            className={isprev ? "prev" : "prev_none"}
            onClick={prev}
            aria-label="Scroll left"
          >
            <img src={back} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={isnext ? "next" : "next_none"}
            onClick={next}
            aria-label="Scroll right"
          >
            <img src={foward} alt="" width={24} height={24} />
          </button>
          <div ref={slide} className="overflow_auto_wrapper">
            <div className="overflow_auto_after">
              {Array.isArray(data) &&
                data.map(
                  (
                    {
                      img,
                      lec_img,
                      categories,
                      cats,
                      title,
                      nid,
                      Title,
                      rpname,
                      name,
                      playlist_img,
                      id,
                      audio,
                      views,
                    },
                    idx
                  ) => {
                    return (
                      <Link
                        to={`${PLAYLISTS}${id || nid}`}
                        id={idx}
                        className="groupWidget_album_item"
                        onClick={() => {}}
                        key={idx + 1}
                      >
                        <LandingWidget
                          key={nid}
                          categories={
                            name ||
                            Title ||
                            //  title?.split("-")[0] ||
                            // Title?.split("-")[0] ||
                            title
                          }
                          img={lec_img}
                          views={views || 0}
                          nid={id || nid}
                        />
                      </Link>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}
      {nav1?.title === "Genres" && type === "lecturer" && (
        <div className="w-full h-full overflow-hidden min-[615px]:hidden">
          <div className="w-full overflow-x-auto flex items-center space-x-4 h-full">
            {Array.isArray(data) &&
              data.map(({ img, name, id, nid }, idx) => {
                return (
                  <Link
                    to={`${RESOURCE_PERSON}${id || nid}`}
                    key={name}
                    className=""
                  >
                    <GenreMobileLecturer img={img} rp={name} />
                  </Link>
                );
              })}
          </div>
        </div>
      )}

      {type === "lecturer" && (
        <div className="overflow_hidden_wrapper_lect">
          <button
            type="button"
            className={isprev ? "prev" : "prev_none"}
            onClick={prev}
            aria-label="Scroll left"
          >
            <img src={back} alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={isnext ? "next" : "next_none"}
            onClick={next}
            aria-label="Scroll right"
          >
            <img src={foward} alt="" width={24} height={24} />
          </button>
          <div
            ref={slide}
            className={`overflow_auto_wrapper_lect ${
              nav1?.title === "Genres" ? "hidden" : ""
            } min-[615px]:space-x-20 `}
          >
            {Array.isArray(data) &&
              data.map(
                (
                  {
                    img,
                    lec_img,
                    categories,
                    cats,
                    title,
                    Title,
                    views,
                    name,
                    nid,
                    id,
                    audio,

                    favorites,
                  },
                  idx
                ) => {
                  return (
                    <Link
                      key={idx + 1}
                      to={`${RESOURCE_PERSON}${id || nid}`}
                      className="max-[615px]:hidden relative"
                    >
                      <LecturersWidget
                        views={views}
                        rp={name}
                        img={img}
                        styling={styling}
                      />
                      <div
                        className={`absolute right-[-18px] bottom-[100px] rounded-full h-[38px] w-[38px] flex justify-center items-center text-white text-xl ${
                          idx === 2 ? "bg-[#96734a]" : ""
                        } ${idx === 1 ? "bg-[#76a8d7]" : ""}${
                          idx === 0 ? "bg-[#ffa736]" : ""
                        }
                        ${styling && idx < 3 ? "block" : "hidden"}`}
                      >
                        <span>{idx + 1}</span>
                      </div>
                    </Link>
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
};

GroupWidget.displayName = "GroupWidget";

export default memo(GroupWidget);
