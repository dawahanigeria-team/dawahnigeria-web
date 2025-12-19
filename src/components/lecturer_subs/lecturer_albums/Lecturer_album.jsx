import React, { useEffect, useState } from "react";
import AlbumWidget from "../../../components/albumWidget/AlbumWidget";
import axios from "../../../utils/useAxios";
import "./lecturer_album.scss";
import lazyalbum from "../../../assets/png/album.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../UI/loader/loader";
import CommentBox from "../../comment/comment";
import { ALBUMS } from "../../../utils/routes/constants";
import { useQueryGetRequest } from "../../../hooks/getqueries";
import { lecturerDetailApi } from "../../../services";

const Lecturer_album = ({ id, totalData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [audioComment, setaudioComment] = useState();
  const queryParam = { id, page };

  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useQueryGetRequest(
      "lecturer-albums",
      queryParam,
      lecturerDetailApi.getLecturerAlbums
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
      {isLoading && !isLastPage && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      <div className="lecalb_wrapper">
        {Array.isArray(querieddata) &&
          querieddata?.map(
            (
              {
                categories,
                img,
                name,
                rpname,
                cats,
                share,
                nid,
                id,
                audio,
                Title,
                title,
                lec_no,
                favorites,
                comments,
              },
              idx
            ) => {
              return (
                <Link
                  to={`${ALBUMS}${nid}`}
                  className="lecalb_album_item"
                  key={idx + 1}
                >
                  <AlbumWidget
                    key={idx}
                    lec_no={lec_no}
                    categories={name.split("-")[0]}
                    img={img || lazyalbum}
                  />
                </Link>
              );
            }
          )}
      </div>

      {(isLoading && page === 1) ||
        (totalData !== querieddata?.length && (
          <div className="flex w-full min-[615px]:mt-6 mt-3 items-center h-fit justify-center  min-[615px]:text-[16px] text-sm">
            {" "}
            <button
              disabled={isLoadingNextPage}
              onClick={() => {
                setPage(page + 1);
              }}
              className={
                !isLastPage
                  ? "w-[40%] min-[615px]:w-[200px] min-[615px]:py-3  text-color border-color flex justify-center items-center py-2 border rounded-2xl"
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

      <div className="lecalb_comments">
        <CommentBox audioComment={audioComment} id={id} type={"rp"} />
      </div>
    </>
  );
};

export default Lecturer_album;
