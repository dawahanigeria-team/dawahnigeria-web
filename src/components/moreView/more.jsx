import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import "./more.scss";
import Container from "../../components/container/Container";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import {
  getaudioData,
  getaudioId,
  getCount,
  getPack,
  getPage,
} from "../../Redux/Actions/ActionCreators";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import axios from "../../utils/useAxios";
import Loader from "../UI/loader/loader";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import infiniteScroll from "../UI/infiniteScroll";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AudioContext } from "../../App";
import LecturersWidget from "../lecturersWidget/LecturersWidget";
import GenreMobileLecturer from "../../pages/genredetail/genreMobileLecturer";
import { LECTURE, ALBUMS, RESOURCE_PERSON,PLAYLISTS, MORE } from "../../utils/routes/constants";
function More() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const observer = useRef();
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const { state, pathname } = useLocation();
  const islect = true;
  const {
    name,
    type,
    id,
    currentdata,
    navtitle,
    heading,
    endpoint_url,
    currentPage,
  } = state;
  const [url, setUrl] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { setinitial } = useContext(AudioContext);

  //console.log(type);

  //console.log(id);

  useEffect(() => {
    if (!endpoint_url) {
      //console.log("No endpoint");
      setData(currentdata);
      setLoading(false);
      return;
    }
    async function fetchData() {
      if (page > 1) {
        setNextPageLoad(true);
      }
      if (type === "playlist" && navtitle === "Charts") {
        axios
          .get(endpoint_url)
          .then((res) => {
            const { data } = res.data;
            setData(data);
            setLoading(false);
          })
          .catch((err) => {
            //console.log(err);
          });
        return;
      } else {
        axios
          .get(`${endpoint_url}${currentPage}`)
          .then((res) => {
            //console.log(res);
            if (page === 1) {
              setLoading(false);
            }
            setNextPageLoad(false);
            if (res.data === 0) {
              setIsEmpty(true);
              return;
            }
            setData((prev) => _.uniqBy([...prev, ...res.data], "nid"));
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    }
    fetchData();
  }, [page]);

  //console.log(data);

  const lastElement = useCallback(
    (node) => {
      if (isEmpty || !endpoint_url || navtitle === "Charts") return;
      infiniteScroll(node, observer, page, setPage);
    },

    [page]
  );
  return (
    <Container>
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

        {loading && (
          <div className="flex w-full items-center h-[300px] justify-center">
            <Loader />
          </div>
        )}
        <div className="more_widget">
          {type === "lectures" &&
            !loading && Array.isArray(data) &&
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
                  views,
                },
                idx
              ) => {
                if (data.length === idx + 1) {
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
                      ref={lastElement}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          mp3_title
                        }
                        img={img || lec_img}
                        views={views}
                        nid={nid}
                      />
                    </Link>
                  );
                } else {
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
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          mp3_title
                        }
                        img={img || lec_img}
                        views={views}
                        nid={nid}
                      />
                    </Link>
                  );
                }
              }
            )}
          {type === "album" &&
            !loading && Array.isArray(data) &&
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
                },
                idx
              ) => {
                if (data.length === idx + 1) {
                  return (
                    <Link
                      to={`${ALBUMS}${nid || id}`}
                      ref={lastElement}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // name?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                         name || title ||
                          Title
                        }
                        img={img || lec_img}
                        views={views}
                        nid={nid}
                      />
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      to={`${ALBUMS}${nid || id}`}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // name?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                         name || title ||
                          Title
                        }
                        img={img || lec_img}
                        views={views}
                        nid={nid}
                      />
                    </Link>
                  );
                }
              }
            )}
          {type === "playlist" &&
            !loading && Array.isArray(data) &&
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
                },
                idx
              ) => {
                if (data.length === idx + 1) {
                  return (
                    <Link
                      to={`${PLAYLISTS}${nid || id}`}
                      ref={lastElement}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          name
                        }
                        img={img || lec_img}
                        views={views || 0}
                        nid={nid}
                      />
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      to={`${PLAYLISTS}${nid || id}`}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          name
                        }
                        img={img || lec_img}
                        views={views || 0}
                        nid={nid}
                      />
                    </Link>
                  );
                }
              }
            )}

          {type === "recent" &&
            !loading && Array.isArray(data) &&
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
                },
                idx
              ) => {
                if (data.length === idx + 1) {
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
                      ref={lastElement}
                      key={idx + 1}
                      className="widget_list_items"
                    >
                      <AlbumWidget
                        key={idx}
                        categories={
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          name
                        }
                        img={img || lec_img}
                        views={views || 0}
                        nid={nid}
                      />
                    </Link>
                  );
                } else {
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
                         // title?.split("-")[0] ||
                         // Title?.split("-")[0] ||
                          title ||
                          Title ||
                          name
                        }
                        img={img || lec_img}
                        views={views || 0}
                        nid={nid}
                      />
                    </Link>
                  );
                }
              }
            )}
        </div>
        <div className="lecturers_widget">
          {type === "lecturer" &&
            !loading && Array.isArray(data) &&
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
                if (data.length === idx + 1) {
                  return (
                    <Link
                      to={`${RESOURCE_PERSON}${id}`}
                      key={idx}
                      className="lecturers_item"
                      ref={lastElement}
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
                } else {
                  return (
                    <Link
                      to={`${RESOURCE_PERSON}${id}`}
                      key={idx}
                      className="lecturers_item"
                    >
                      <LecturersWidget
                        img={img}
                        views={views}
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
              }
            )}
        </div>
        {nextPageLoad && (
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
