import React, { useState, useEffect, useRef, useContext } from "react";
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
} from "../../utils/routes/constants";

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
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setinitial } = useContext(AudioContext);
  const slide = useRef();

  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);
  const [size, setSize] = useState(window.innerWidth);
  const [, setSettingsresponsive] = useState(() => {
    return size < 513 ? { ...settings4 } : { ...settings3 };
  });
  //const data=[]
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
      setSettingsresponsive(() => {
        return window.innerWidth < 513 ? { ...settings4 } : { ...settings3 };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

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
    const currentSlide = slide.current;
    function scrollEl() {
      if (currentSlide?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        currentSlide?.scrollLeft + currentSlide?.offsetWidth >=
        currentSlide?.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    if (currentSlide) {
      currentSlide?.addEventListener("scroll", scrollEl);
    }

    return () => {
      if (currentSlide) currentSlide.removeEventListener("scroll", scrollEl);
    };
  }, [slide.current?.scrollLeft]);

  return (
    <div className="groupWidget_wrapper">
      {Array.isArray(data) && data.length > 0 && (
        <div className="groupWidget_top">
          <p className="groupWidget_top_heading text-color-primary">
            {heading}
          </p>
          <div
            onClick={() => {
              if (heading === "Trending") {
                navigate(TRENDING);
              } else {
                navigate(MORE, {
                  state: {
                    name: "",
                    heading: heading,
                    id: "",
                    img: "",
                    type,
                    currentdata: data,
                    endpoint_url: endpoint_url || "",
                    currentPage: currentPage || "",
                    navtitle: nav1.title || "",
                  },
                });
              }

              dispatch(getType(heading));
            }}
            className={
              styling && endpoint_url
                ? "flex dark:text-[#d6ff00] text-color-primary text-[15px] items-center"
                : `flex dark:text-[#d6ff00] text-color-primary text-[15px] items-center ${
                    nav1.title === "Charts" ? "max-[615px]:hidden" : ""
                  }  `
            }
          >
            <p className="cursor-pointer">more</p>
            <FiChevronsRight className=" cursor-pointer text-[20px] pt-1" />
          </div>
        </div>
      )}

      {type === "recent" && (
        <div className="overflow_hidden_wrapper">
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} alt="foward" />
          </div>
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
                                navName: nav1.navName,
                              })
                            );
                          } else {
                            // navigate(`/l/${nid}`);
                            if (window.innerWidth <= 615) {
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
                          key={idx}
                          categories={
                            // title?.split("-")[0] ||
                            // Title?.split("-")[0] ||
                            title || Title
                          }
                          img={img || lec_img}
                          views={views || 0}
                          nid={nid}
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
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} alt="foward" />
          </div>
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

                      id,
                      _id,
                      mp3_title,
                      title,
                      Title,

                      nid,

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
                            if (window.innerWidth <= 615) {
                              dispatch(getPack(null));
                              dispatch(getPage(currentPage));
                              dispatch(getCount(idx));
                              dispatch(getPack(data));
                              setinitial(false);
                            }
                          }}
                          key={_id?.$oid}
                        >
                          <LandingWidget
                            key={idx}
                            categories={title || Title || mp3_title}
                            img={img || lec_img}
                            views={views || 0}
                            nid={nid || id}
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
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      )}
      {type === "lectures" && nav1.title === "Charts" && (
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

      {type === "album" && nav1.title === "Charts" && (
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

      {type === "lecturer" && nav1.title === "Charts" && (
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
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} alt="foward" />
          </div>
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
                      _id,
                      title,
                      nid,
                      Title,

                      name,
                      id,

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
                        key={_id?.$oid}
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
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} alt="foward" />
          </div>
          <div ref={slide} className="overflow_auto_wrapper">
            <div className="overflow_auto_after">
              {Array.isArray(data) &&
                data.map(
                  (
                    {
                      lec_img,

                      title,
                      nid,
                      Title,

                      _id,
                      name,

                      id,

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
                        key={_id?.$oid}
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
      {nav1.title === "Genres" && type === "lecturer" && (
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
          <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
            <img src={back} alt="back" />
          </div>
          <div className={isnext ? "next" : "next_none"} onClick={next}>
            <img src={foward} alt="foward" />
          </div>
          <div
            ref={slide}
            className={`overflow_auto_wrapper_lect ${
              nav1.title === "Genres" ? "hidden" : ""
            } min-[615px]:space-x-20 `}
          >
            {Array.isArray(data) &&
              data.map(
                (
                  {
                    img,

                    views,
                    name,
                    nid,
                    id,
                    _id,
                  },
                  idx
                ) => {
                  return (
                    <>
                      <Link
                        to={`${RESOURCE_PERSON}${id || nid}`}
                        className="max-[615px]:hidden relative"
                        onClick={() => {
                          // navigate(`${RESOURCE_PERSON}${id || nid}`);
                        }}
                        key={_id?.$oid}
                      >
                        <LecturersWidget
                          views={views}
                          key={idx}
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
                    </>
                  );
                }
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupWidget;
