import React, { useEffect, useState } from "react";
import AlbumWidget from "../../../components/albumWidget/AlbumWidget";
import axios from "../../../utils/useAxios";
import "./lecturerplaylist.scss";

import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import CommentBox from "../../comment/comment";
import { useSelector } from "react-redux";
import { PLAYLISTS } from "../../../utils/routes/constants";
import { lecturersApi } from "../../../services";
import { useQueryGetRequest } from "../../../hooks/getqueries";
const Lecturer_playlist = ({ id }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [audioComment, setaudioComment] = useState();
  const queryParam = { id };

  const { isLoading, querieddata } = useQueryGetRequest(
    "lecturer-playlist",
    queryParam,
    lecturersApi.getLecturerPlaylist
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
      .catch((err) => {});
  }, []);

  return (
    <>
      {isLoading && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && querieddata?.length === 0 && (
        <div className="text-gray-200 no_playlist flex items-center justify-center w-full h-[200px]">
          <span>-- no playlist --</span>
        </div>
      )}
      <div className="lecplaylist_wrapper">
        {!isLoading &&
          Array.isArray(querieddata) &&
          querieddata?.map(({ name, id, nid, lec_no, lec_img }, idx) => {
            return (
              <Link
                to={`${PLAYLISTS}${nid}`}
                className="lecplaylist_item "
                key={idx + 1}
              >
                <AlbumWidget
                  key={idx}
                  categories={name}
                  lec_no={lec_no || 0}
                  img={lec_img}
                />
              </Link>
            );
          })}
      </div>

      <div className="lecplaylist_comments">
        <CommentBox audioComment={audioComment} id={id} type={"rp"} />
      </div>
    </>
  );
};

export default Lecturer_playlist;
