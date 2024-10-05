import { useState } from "react";
import Container from "../../components/container/Container";
import QuranAlbum from "../../components/quranAlbum/QuranAlbum";
import { Link } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import { ALBUMS } from "../../utils/routes/constants";
import {
  useInfiniteScrollPagination,
  useQuranAlbumInfiniteQuery,
  useQuranAlbums,
} from "../../hooks";
import "./quran.scss";
import HeadMeta from "../../components/head-meta";
import { useInfiniteQuery } from "@tanstack/react-query";

const Playlists = () => {
  const [page, setPage] = useState(1);
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useQuranAlbumInfiniteQuery();
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

  // console.log({ data });
  return (
    <Container>
      <HeadMeta
        title={`Quran recitations on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="playlist_wrapper">
        <div className="play_header_link bg-background">
          <HeaderRouter title={"Quran"} />
        </div>

        {/* show loader for first page  */}
        {isLoadingAlbums && !isLoadingNextPage && (
          <div className="load_desktop mgt">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 md:mt-0">
          {albums?.map(({ img, alb_thumbnail, id, name, views }, idx) => {
            return (
              <Link
                key={idx + 1}
                to={`${ALBUMS}${id}`}
                ref={
                  idx === albums.length - 1 && !isLastPage
                    ? infiniteScrollRef
                    : null
                }
              >
                <QuranAlbum
                  key={idx}
                  views={views}
                  categories={name}
                  img={img || alb_thumbnail}
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
