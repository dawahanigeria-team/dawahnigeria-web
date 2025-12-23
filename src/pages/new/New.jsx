// ═══════════════════════════════════════════════════════════════════════════
// NEW PAGE — Contemporary Editorial Design
// Fresh audio uploads with sophisticated magazine-inspired presentation
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState } from "react";
import "./new.scss";
import Container from "../../components/container/Container";
import MusicList from "../../components/miscList/musicList";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { LECTURE, NEW } from "../../utils/routes/constants";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { newApi } from "../../services";
import HeadMeta from "../../components/head-meta";

const New = () => {
  const [page] = useState(1);
  const [drop, setDrop] = useState(false);
  const queryParam = { page };
  const { isLoading, querieddata } = useQueryGetRequest(
    "new",
    queryParam,
    newApi.getNewLectures
  );

  const totalTracks = querieddata?.length || 0;

  return (
    <Container>
      <HeadMeta
        title="New Releases — Dawah Nigeria | Fresh Islamic Content"
      />
      <div className="new_wrapper">
        <div className="new_header_link">
          <HeaderRouter title="New" />
        </div>

        <section className="new_hero">
          <div className="new_hero_content">
            <div className="new_hero_header">
              <div className="new_hero_text">
                <div className="new_hero_badge">
                  <span className="badge_dot" />
                  <span className="badge_text">Latest Uploads</span>
                </div>
                <h1 className="new_hero_title">
                  <span className="new_hero_title_inner">New Releases</span>
                </h1>
              </div>
              {!isLoading && totalTracks > 0 && (
                <div className="new_hero_meta">
                  <span className="new_meta_count">{totalTracks} lectures</span>
                  <span className="new_meta_divider">•</span>
                  <span className="new_meta_updated">Updated today</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="new_content_section">
          <div className="new_title_wrap">
            <div className="new_title1">
              <span className="new_hash">#</span>
              <span>Title</span>
            </div>
            <p className="new_title2">Lecturer</p>
            <p className="new_title4">Duration</p>
          </div>

          {isLoading && (
            <div className="new_loading_state">
              <Loader />
              <p className="new_loading_text">Loading latest lectures...</p>
            </div>
          )}

          {!isLoading && querieddata?.length === 0 && (
            <div className="new_empty">
              <div className="new_empty_icon_wrapper">
                <IoMusicalNotesOutline className="new_empty_icon" />
              </div>
              <p className="new_empty_title">No new releases yet</p>
              <p className="new_empty_subtitle">
                New lectures are uploaded regularly. Check back soon for fresh content.
              </p>
            </div>
          )}

          {!isLoading && querieddata?.length > 0 && (
            <div className="new_list">
              {querieddata.map((item, idx) => {
                const nid = item?.nid;
                const title = item?.mp3_title || item?.Title;
                const lecturer = item?.rpname;
                const duration = item?.mp3_duration || item?.duration;
                const image = item?.lec_thumbnail || item?.mp3_thumbnail || item?.img;
                const rpId = item?.rp_id;

                return (
                  <MusicList
                    key={nid ?? idx}
                    id={idx}
                    image={image}
                    comments={item?.comments}
                    favorites={item?.favorites}
                    duration={duration}
                    title={title}
                    lecturer={lecturer}
                    drop={drop}
                    setDrop={setDrop}
                    url={`${LECTURE}${nid}`}
                    Title={title}
                    rpid={rpId}
                    rpname={lecturer}
                    currentPage={page}
                    cats={item?.cats}
                    nid={nid}
                    navName="New"
                    navLink={NEW}
                    controlData={querieddata}
                    views={item?.views}
                    share={item?.share}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default New;
