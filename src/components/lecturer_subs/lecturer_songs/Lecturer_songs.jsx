import React, { useEffect, useState } from "react";
import axios from "../../../utils/useAxios";
import MobileList from "../../../components/list/mobileList";
import "./lecturer_song.scss";
import { SlEmotsmile } from "react-icons/sl";
import Loader from "../../UI/loader/loader";
import logo from "../../../assets/png/dn logo.png";
import _ from "lodash";
import { useSelector } from "react-redux";
import MusicList from "../../miscList/musicList";
import { LECTURE } from "../../../utils/routes/constants";
const Lecturer_songs = ({ id, setCount1 }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const [comment, setComment] = useState();
  const [audioComment, setaudioComment] = useState();

  //console.log("rp id", id);
  useEffect(() => {
    setCount1(data.length);
  }, [data]);

  useEffect(() => {
    const handleRequest = () => {
      if (page > 1) {
        setNextPageLoad(true);
      }
      axios
        .get(`/leclisting_rp.php?page=${page}&rpid=${parseInt(id)}`)
        .then((res) => {
          //console.log(res.data);
          if (page === 1) {
            setLoading(false);
          }
          setNextPageLoad(false);
          if (res.data.length === 0) {
            setIsEmpty(true);
            return;
          }

          setData((prev) => _.uniqBy([...prev, ...res.data], "nid"));
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
  }, [page]);

  //////*************handling comment**************** */

  useEffect(() => {
    if (!currentUser?.id) return;

    axios
      .get(`/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=rp`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        //console.log("comment result", res);
        setaudioComment(res.data.reverse());
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const postComment = () => {
    if (!currentUser?.id) return;
    if (comment === "") return;
    //console.log(comment);
    const payload = {
      user_id: currentUser?.id,
      item_id: id,
      type: "rp",
      comment: comment,
    };
    axios
      .post(`/commentApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        //console.log(res);
        setComment("");
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <div className="lecsong_wrapper">
      <div className="lect_title_wrap">
        <div className="lect_title1">
          <p className="lect_hash">#</p>
          <p>Title</p>
        </div>
        <p className="lect_title2">
          <span>Lecturer</span>
        </p>

        <p className="lect_title4">
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
      <div className="lecsong_content">
        {!loading &&
          data.map(
            (
              {
                title,
                Title,
                rp,
                duration,
                rpname,
                views,
                rp_id,
                img,
                favorites,
                cats,
                nid,
              },
              idx
            ) => {
              return (
                <div key={idx} className="lecsong_content_item">
                  <div className="desktops_item">
                    <MusicList
                      key={idx}
                      id={idx}
                      title={title}
                      lecturer={rpname || rp}
                      rpid={rp_id}
                      image={img}
                      url={`${LECTURE}${nid}`}
                      Title={Title || title}
                      rpname={rpname}
                      cats={cats}
                      favorites={favorites}
                      nid={nid}
                      endpoint_url={`/leclisting_rp.php?lim=10&&rpid=${id}page=`}
                      currentPage={page}
                      navName={"Back"}
                      navLink={-1}
                      controlData={data}
                      views={views}
                      duration={duration}
                    />
                  </div>
                  <div className="mobile_item">
                    <MobileList
                      key={idx}
                      id={idx}
                      title={title}
                      lecturer={rpname || rp}
                      rpid={rp_id}
                      image={img}
                      url={`${LECTURE}${nid}`}
                      Title={Title || title}
                      rpname={rpname}
                      cats={cats}
                      nid={nid}
                      favorites={favorites}
                      navName={"Back"}
                      navLink={-1}
                      endpoint_url={`/leclisting_rp.php?lim=10&&rpid=${id}page=`}
                      currentPage={page}
                      controlData={data}
                      views={views}
                      duration={duration}
                    />
                  </div>
                </div>
              );
            }
          )}
      </div>

      {!loading && (
        <div className="flex h-fit w-full min-[615px]:text-[16px] text-sm  min-[615px]:mt-6 mt-3 items-center justify-center">
          {" "}
          <button
            onClick={() => {
              if (isEmpty) return;
              setPage(page + 1);
            }}
            className={
              !isEmpty
                ? "w-[40%] min-[615px]:w-[200px] min-[615px]:py-3  flex justify-center items-center py-2 border border-gray-400 text-gray-400 rounded-2xl"
                : "hidden"
            }
          >
            {nextPageLoad ? (
              <span className="rounded-full w-4 h-4 border-l border-r border-gray-400 animate-spin"></span>
            ) : (
              <span>Show more</span>
            )}
          </button>
        </div>
      )}

      <div className="lecsong_comments">
        <div className="lecsong_comments_header">Comments</div>
        <textarea
          className="lecsong_comment_input"
          placeholder="Pls share your thoughts"
          name=""
          id=""
          cols="30"
          value={comment}
          rows="5"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          maxLength="500"
        ></textarea>
        <div className="lecsong_comment_action">
          <SlEmotsmile className="lecsong_comment_moji" />
          <button onClick={postComment} className="lecsong_comment_button">
            Comment
          </button>
        </div>

        <div className="aud_comment_texts">
          {audioComment?.map(({ user, date, content }, idx) => {
            return (
              <div className="com_wrap">
                <div className="com_date">
                  <span className="logo_img">
                    <img className="logo_img_sz" src={logo} alt="" />
                  </span>
                  <span className="commentor">{user}</span>
                  <span className="comment_date">{date}</span>
                </div>
                <div className="comment_content">{content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lecturer_songs;
