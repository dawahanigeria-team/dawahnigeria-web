import React, { useEffect, useState, memo, useCallback } from "react";
import axios from "../../../utils/useAxios";
import "./lecturer_song.scss";
import Loader from "../../UI/loader/loader";
import { useSelector } from "react-redux";
import MusicList from "../../miscList/musicList";
import { LECTURE } from "../../../utils/routes/constants";
import { useQueryGetRequest } from "../../../hooks/getqueries";
import { lecturerDetailApi } from "../../../services";
import CommentBox from "../../comment/comment";
import { AudioListSkeleton } from "./AudioListSkeleton";
import AudioEmptyState from "./AudioEmptyState";
import { HiOutlineSparkles } from "react-icons/hi2";
import SortToggle from "../../UI/sortToggle/SortToggle";
import { useSortParam } from "../../../hooks/common/useSortParam.hook";

/**
 * Load More Button Component
 * Premium button with hover effects and loading state
 */
const LoadMoreButton = memo(({ isLoading, isLastPage, onClick, disabled }) => {
  if (isLastPage) return null;

  return (
    <div className="lecsong_load_more_wrapper">
      <button
        disabled={disabled || isLoading}
        onClick={onClick}
        className="lecsong_load_more_btn"
        aria-label={isLoading ? "Loading more audio" : "Show more audio"}
      >
        {isLoading ? (
          <span className="lecsong_load_more_spinner" aria-hidden="true" />
        ) : (
          <>
            <HiOutlineSparkles className="lecsong_load_more_icon" aria-hidden="true" />
            <span>Load More</span>
          </>
        )}
      </button>
    </div>
  );
});

LoadMoreButton.displayName = "LoadMoreButton";

/**
 * Audio List Header Component
 * Table header for desktop view
 */
const AudioListHeader = memo(() => (
  <div className="lecsong_header" role="row" aria-hidden="true">
    <div className="lecsong_header_left">
      <span className="lecsong_header_hash">#</span>
      <span className="lecsong_header_title">Title</span>
    </div>
    <span className="lecsong_header_lecturer">Lecturer</span>
    <span className="lecsong_header_time">Time</span>
  </div>
));

AudioListHeader.displayName = "AudioListHeader";

/**
 * Audio Item Component
 * Wrapper for individual audio items with animation support
 */
const AudioItem = memo(({ item, index, id, page, querieddata }) => {
  const {
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
  } = item;

  return (
    <div
      className="lecsong_item"
      style={{ animationDelay: `${index * 0.03}s` }}
      role="listitem"
    >
      <MusicList
        key={nid}
        id={index}
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
        updatedDate={item.updated_date}
      />
    </div>
  );
});

AudioItem.displayName = "AudioItem";

/**
 * Lecturer Songs Tab Component
 * Main component for displaying audio content on lecturer detail page
 */
const Lecturer_songs = ({ id, totalData, rpname }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [audioComment, setaudioComment] = useState();
  const [sort, setSort] = useSortParam();
  const queryParam = { page, id: parseInt(id), sort };

  // Changing sort restarts the list, so reset pagination back to page 1.
  const handleSortChange = useCallback(
    (next) => {
      setPage(1);
      setSort(next);
    },
    [setSort]
  );

  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useQueryGetRequest(
      "lecturer-songs",
      queryParam,
      lecturerDetailApi.getLecturerSongs
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

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Derived state for cleaner conditionals
  const hasAudio = Array.isArray(querieddata) && querieddata.length > 0;
  const showSkeleton = isLoading && page === 1;
  const showEmptyState = !isLoading && !hasAudio;
  const showLoadMore = hasAudio && totalData !== querieddata?.length;

  return (
    <section className="lecsong_section" aria-label="Audio content">
      {/* Skeleton Loading State */}
      {showSkeleton && <AudioListSkeleton count={8} />}

      {/* Empty State */}
      {showEmptyState && <AudioEmptyState rpname={rpname} />}

      {/* Audio Content */}
      {hasAudio && (
        <>
          <div className="lecsong_toolbar flex justify-end mb-2">
            <SortToggle sort={sort} onChange={handleSortChange} />
          </div>
          <AudioListHeader />
          <div
            className="lecsong_content"
            role="list"
            aria-label={`${querieddata.length} audio items`}
          >
            {querieddata.map((item, idx) => (
              <AudioItem
                key={item.nid || idx}
                item={item}
                index={idx}
                id={id}
                page={page}
                querieddata={querieddata}
              />
            ))}
          </div>
        </>
      )}

      {/* Load More Button */}
      {showLoadMore && (
        <LoadMoreButton
          isLoading={isLoadingNextPage}
          isLastPage={isLastPage}
          onClick={handleLoadMore}
          disabled={isLoadingNextPage}
        />
      )}

      {/* Comments Section */}
      <div className="lecsong_comments_section">
        <CommentBox audioComment={audioComment} type={"rp"} id={id} />
      </div>
    </section>
  );
};

export default memo(Lecturer_songs);
