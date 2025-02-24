import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/loader";
import AlbumWidget from "../../albumWidget/AlbumWidget";
import { ALBUMS, RAMADAN } from "../../../utils/routes/constants";
import { useKeywordAlbums } from "../../../hooks/albums";
import Container from "../../container/Container";
import arrow from "../../../assets/svg/arrowleft.svg";

export const RamadanYearTafseer = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const {
    data: albums,
    isLoading,
    hasMore,
  } = useKeywordAlbums({
    keyword: decodeURIComponent(year), // The year param is already the full keyword
    page,
  });

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Container>
      <div className="pt-20">
        {/* Breadcrumb navigation */}
        <div className="lecdet_breadcrumb mb-6">
          <button
            onClick={() => navigate(RAMADAN)}
            className="lecdet_breadcrumb_first"
          >
            Back /
          </button>
          <p className="lecdet_breadcrumb_second text-foreground">
            {decodeURIComponent(year)}
          </p>
        </div>

        {/* Mobile back button */}
        <div className="mobile_lecdet_tab_wrap md:hidden">
          <div className="rank_and_black_wrap">
            <div className="pb-7">
              <button
                onClick={() => navigate(RAMADAN)}
                aria-label="Go back"
                className="fixed_mob_arrow"
              >
                <img className="fixed_mob_arrow_sz" src={arrow} alt="back" />
              </button>
            </div>
          </div>
        </div>

        {/* loading state for initial load */}
        {isLoading && page === 1 && (
          <div className="load_desktop">
            <div className="load">
              <Loader />
            </div>
          </div>
        )}

        {/* data grid */}
        <div className="lecalb_wrapper">
          {albums?.map(({ img, title, nid, lec_no }) => (
            <Link
              to={`${ALBUMS}${nid}`}
              className="lecalb_album_item"
              key={nid}
            >
              <AlbumWidget
                nid={nid}
                lec_no={lec_no}
                categories={title}
                img={img}
              />
            </Link>
          ))}
        </div>

        {/* load more button */}
        {hasMore && (
          <div className="flex justify-center mt-4 mb-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-primary text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};
