import React, { useEffect, useState, memo } from "react";
import AlbumWidget from "../../../components/albumWidget/AlbumWidget";
import { AlbumSkeletonGrid } from "../../../components/albumWidget/AlbumSkeleton";
import axios from "../../../utils/useAxios";
import "./lecturer_album.scss";
import lazyalbum from "../../../assets/png/album.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentBox from "../../comment/comment";
import { ALBUMS } from "../../../utils/routes/constants";
import { useQueryGetRequest } from "../../../hooks/getqueries";
import { lecturerDetailApi } from "../../../services";
import { IoMusicalNotes, IoAlbumsOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";

const EmptyState = memo(({ rpname }) => (
  <div className="lecalb_empty_state">
    <div className="lecalb_empty_icon_wrapper">
      <IoAlbumsOutline className="lecalb_empty_icon" aria-hidden="true" />
      <div className="lecalb_empty_icon_glow" aria-hidden="true" />
    </div>
    <h3 className="lecalb_empty_title">No Albums Yet</h3>
    <p className="lecalb_empty_text">
      {rpname ? `${rpname} hasn't released any albums yet.` : "No albums available at the moment."}
    </p>
    <p className="lecalb_empty_subtext">
      Check back later for new releases
    </p>
  </div>
));

EmptyState.displayName = "EmptyState";

const LoadMoreButton = memo(({ isLoading, isLastPage, onClick }) => {
  if (isLastPage) return null;

  return (
    <div className="lecalb_load_more_wrapper">
      <button
        disabled={isLoading}
        onClick={onClick}
        className="lecalb_load_more_btn"
        aria-label={isLoading ? "Loading more albums" : "Show more albums"}
      >
        {isLoading ? (
          <span className="lecalb_load_more_spinner" aria-hidden="true" />
        ) : (
          <>
            <HiOutlineSparkles className="lecalb_load_more_icon" aria-hidden="true" />
            <span>Discover More</span>
          </>
        )}
      </button>
    </div>
  );
});

LoadMoreButton.displayName = "LoadMoreButton";

const Lecturer_album = ({ id, totalData, rpname }) => {
  const { currentUser, audioId } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [audioComment, setaudioComment] = useState();
  const queryParam = { id, page };

  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useQueryGetRequest(
      "lecturer-albums",
      queryParam,
      lecturerDetailApi.getLecturerAlbums
    );

  // Fetch comments
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
  }, [currentUser?.id, id]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasAlbums = Array.isArray(querieddata) && querieddata.length > 0;
  const showEmptyState = !isLoading && !hasAlbums;
  const showSkeleton = isLoading && page === 1;
  const showLoadMore = hasAlbums && totalData !== querieddata?.length;

  return (
    <section className="lecalb_section" aria-label="Albums">
      {/* Skeleton Loading State */}
      {showSkeleton && <AlbumSkeletonGrid count={8} />}

      {/* Empty State */}
      {showEmptyState && <EmptyState rpname={rpname} />}

      {/* Albums Grid */}
      {hasAlbums && (
        <div className="lecalb_wrapper" role="list">
          {querieddata.map(
            (
              {
                categories,
                img,
                name,
                rpname: albumRpname,
                cats,
                share,
                nid,
                id: albumId,
                audio,
                Title,
                title,
                lec_no,
                favorites,
                comments,
              },
              idx
            ) => (
              <Link
                to={`${ALBUMS}${nid}`}
                className="lecalb_album_item"
                key={`album-${nid}-${idx}`}
                role="listitem"
              >
                <AlbumWidget
                  index={idx}
                  lec_no={lec_no}
                  categories={name?.split("-")[0] || name}
                  img={img || lazyalbum}
                  rpname={albumRpname}
                  isPlaying={String(audioId) === String(nid)}
                />
              </Link>
            )
          )}
        </div>
      )}

      {/* Load More Button */}
      {showLoadMore && (
        <LoadMoreButton
          isLoading={isLoadingNextPage}
          isLastPage={isLastPage}
          onClick={handleLoadMore}
        />
      )}

      {/* Comments Section */}
      <div className="lecalb_comments">
        <CommentBox audioComment={audioComment} id={id} type={"rp"} />
      </div>
    </section>
  );
};

export default memo(Lecturer_album);
