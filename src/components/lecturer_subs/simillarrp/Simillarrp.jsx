import React, { useState } from "react";
import "./simillarrp.scss";

import LecturersWidget from "../../lecturersWidget/LecturersWidget";
import { Link, useNavigate } from "react-router-dom";
import { RESOURCE_PERSON } from "../../../utils/routes/constants";
import Loader from "../../UI/loader/loader";
import _ from "lodash";
import { useInfiniteScrollPagination } from "../../../hooks";
import GenreMobileLecturer from "../../../pages/genredetail/genreMobileLecturer";
import { lecturersApi } from "../../../services";
import { useLecturersHook } from "../../../hooks/lecturers/useLecturers.hook";
const Simillarrp = ({ langid }) => {
  const [page, setPage] = useState(1);

  const issimilarrp = true;
  const queryParam = { page, langid };

  const { isLoading, isLoadingNextPage, isLastPage, querieddata } =
    useLecturersHook(
      "lecturers",
      queryParam,
      lecturersApi.getLecturers,
      setPage
    );

  const { ref: infiniteScrollRef } = useInfiniteScrollPagination(
    querieddata?.length,
    page,
    setPage
  );

  return (
    <div>
      {isLoading && !isLoadingNextPage && (
        <div className="load_desktop">
          <div className="load">
            <Loader />
          </div>
        </div>
      )}
      <div className="simrp_wrapper">
        {Array.isArray(querieddata) &&
          querieddata?.map(({ img, name, views, id }, idx) => {
            return (
              <Link
                ref={
                  idx === querieddata.length - 1 && !isLastPage
                    ? infiniteScrollRef
                    : null
                }
                to={`${RESOURCE_PERSON}${id}`}
                className="lecturers_item"
              >
                <LecturersWidget
                  views={views}
                  img={img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"}
                  rp={name}
                />
                <GenreMobileLecturer
                  views={views}
                  styling={issimilarrp}
                  rp={name}
                  img={img || "https://imagetolink.com/ib/a3qzKSu0SB.jpeg"}
                />
              </Link>
            );
          })}
      </div>
      {isLoadingNextPage && (
        <div className="load_m">
          <div className="loads">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Simillarrp;
