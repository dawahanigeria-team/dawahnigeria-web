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
                key={idx}
              >
                <LecturersWidget
                  views={views}
                  img={img || "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550294/lazyrps_foahnl.jpg"}
                  rp={name}
                />
                <GenreMobileLecturer
                  views={views}
                  styling={issimilarrp}
                  rp={name}
                  img={img || "https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550294/lazyrps_foahnl.jpg"}
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
