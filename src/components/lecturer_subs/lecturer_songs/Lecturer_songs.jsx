import React, { useEffect, useState } from "react";
import axios from "../../../utils/useAxios";
import MobileList from "../../../components/list/mobileList";
import "./lecturer_song.scss";
import { SlEmotsmile } from "react-icons/sl";
import Loader from "../../UI/loader/loader";
import _ from "lodash";
import { useSelector } from "react-redux";
import MusicList from "../../miscList/musicList";
import { LECTURE } from "../../../utils/routes/constants";
import { useQueryGetRequest } from "../../../hooks/getqueries";
import { lecturerDetailApi } from "../../../services";
import CommentBox from "../../comment/comment";

const Lecturer_songs = ({ id, totalData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState();
  const [audioComment, setaudioComment] = useState();
  const queryParam = { page, id: parseInt(id) };

  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useQueryGetRequest(
      "lecturer-songs",
      queryParam,
      lecturerDetailApi.getLecturerSongs
    );

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
    
        setaudioComment(res.data.reverse());
      })
      .catch((err) => {
   
      });
  }, []);

 

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
      {isLoading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      <div className="lecsong_content">
        {Array.isArray(querieddata) &&
          querieddata.map(
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
                      controlData={querieddata}
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
                      controlData={querieddata}
                      views={views}
                      duration={duration}
                    />
                  </div>
                </div>
              );
            }
          )}
      </div>

       {(isLoading && page === 1) ||
        (totalData !== querieddata?.length && (
          <div className="flex h-fit w-full min-[615px]:text-[16px] text-sm  min-[615px]:mt-6 mt-3 items-center justify-center">
            {" "}
            <button
            disabled={isLoadingNextPage}
              onClick={() => {
             
                setPage(page + 1);
              }}
              className={
                 !isLastPage
                ? "w-[40%] min-[615px]:w-[200px] min-[615px]:py-3  flex justify-center items-center py-2 border text-color border-color rounded-2xl"
                : "hidden"
              }
            >
              {isLoadingNextPage ? (
                <span className="rounded-full w-4 h-4 border-l border-r border-color animate-spin"></span>
              ) : (
                <span>Show more</span>
              )}
            </button>
          </div>
        ))}
      <CommentBox audioComment={audioComment} type={"rp"} id={id} />
    </div>
  );
};

export default Lecturer_songs;
