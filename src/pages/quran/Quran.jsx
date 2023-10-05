import React, { useState } from "react";
import "./quran.scss";
import Container from "../../components/container/Container";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import { Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import _ from "lodash";
import { ALBUMS } from "../../utils/routes/constants";
import { useInfiniteScrollPagination, useQuranAlbums } from "../../hooks";

const Playlists = () => {
  const [page, setPage] = useState(1);

  const {
    cummulatedData: albums,
    isLoading: isLoadingAlbums,
    isLoadingNextPage,
    isLastPage,
  } = useQuranAlbums(page);

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    albums?.length,
    page,
    setPage
  );

  return (
    <Container>
      <div className="playlist_wrapper">
        <div className="play_header_link">
          <HeaderRouter title={"Playlist"} />
        </div>

        {/* show loader for first page  */}
        {isLoadingAlbums && !isLoadingNextPage && (
          <div className="load_desktop mgt">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        <div className="playlist_widget">
          {albums?.map(({ alb_thumbnail, id, name, views }, idx) => {
            return (
              <Link
                key={idx + 1}
                to={`${ALBUMS}${id}`}
                className="playlist_lists_items"
                ref={
                  albums?.length === idx + 1 && !isLastPage
                    ? infiniteScrollRef
                    : null
                }
              >
                <AlbumWidget
                  key={idx}
                  views={views}
                  categories={name}
                  img={alb_thumbnail}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* show loader for other pages  */}
      {isLoadingNextPage && (
        <div className="load_m">
          <div className="loads">
            <Loader />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Playlists;
