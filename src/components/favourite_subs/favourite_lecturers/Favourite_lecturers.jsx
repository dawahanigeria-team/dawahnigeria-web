import React, { useState, useEffect, useRef, useCallback } from "react";
import "./favourite_lecturers.scss";
import empty from "../../../assets/png/musicEmptyState.png";
import { useSelector } from "react-redux";
import Loader from "../../../components/UI/loader/loader";
import uniqBy from "lodash/uniqBy";
import axios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import infinitePlayFavScroll from "../../UI/infinitePlayFavScroll";
import LecturersWidget from "../../lecturersWidget/LecturersWidget";
import { LECTURERS, RESOURCE_PERSON } from "../../../utils/routes/constants";
const Favourite_lecturers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const [data, setdata] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [myRp, setmyRp] = useState();
  const [myFavlecturer, setMyFavLecturer] = useState([]);

  useEffect(() => {
    if (!currentUser?.id) return;
    if (page < 1) {
      setLoading(true);
    }
    axios
      .get(`/leclisting_favorites.php?user_id=${currentUser?.id}&type=rp`)
      .then((res) => {
        if (res.data.length === 0) {
          setmyRp([]);
          setLoading(false);
          return;
        }
        const { rp } = res.data;
        setmyRp(rp);

        axios
          .get(`/rplisting_multi_nid_api.php?id=${rp.toString()}`)

          .then((res) => {
            setMyFavLecturer(res.data);
            setLoading(false);
            setdata(uniqBy(res.data?.slice(0, 10), "nid"));
          })
          .catch((err) => {});
      });
  }, []);

  useEffect(() => {
    if (page > 0) {
      setNextPageLoad(true);
    }
    const additionalData = myFavlecturer?.slice(page, page + 10);

    if (additionalData.length === 0) {
      setIsEmpty(true);
    }
    setNextPageLoad(false);
    setdata((prev) => uniqBy([...prev, ...additionalData], "nid"));
  }, [page]);

  const lastElement = useCallback(
    (node) => {
      if (isEmpty) return;
      infinitePlayFavScroll(node, observer, page, setPage);
    },

    [page]
  );

  return (
    <div className="favlec_wrapper">
      {(!currentUser?.id || myRp?.length === 0) && (
        <div className="favlec_img_wrap">
          <img src={empty} alt="empty" />
          <p className="favlec_text text-foreground">
            You haven’t any lecturer. Add lecturers here.
          </p>
          <button
            onClick={() => {
              if (currentUser?.id) {
                navigate(LECTURERS);
              } else {
                navigate("/auth/login");
              }
            }}
            className="favlec_button"
          >
            Discover more Lecturers
          </button>
        </div>
      )}
      {loading && (
        <div className="loadd w-full flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      )}
      <div className="favlecturers_widget">
        {myRp?.length !== 0 &&
          !loading &&
          data.map(
            (
              { img, rp, name, rpname, views, favorites, catsname, id },
              idx
            ) => {
              if (data.length === idx + 1) {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`${RESOURCE_PERSON}${id}`);
                    }}
                    className="lecturers_item"
                    ref={lastElement}
                  >
                    <LecturersWidget
                      key={idx}
                      img={img}
                      views={views}
                      favorites={favorites}
                      rp={rp || name || rpname}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(`${RESOURCE_PERSON}${id}`);
                    }}
                    className="lecturers_item"
                  >
                    <LecturersWidget
                      key={idx}
                      img={img}
                      rp={rp || name || rpname}
                    />
                  </div>
                );
              }
            }
          )}
      </div>

      {nextPageLoad && (
        <div className="loadd w-full flex justify-center items-center h-[200px]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Favourite_lecturers;
