import React, { useState, useEffect } from "react";
import "./genres.scss";
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import GenreWidget from "./genreWidget";
import { CATEGORIES } from "../../utils/routes/constants";

import { genresApi } from "../../services";
import { useQueryGetRequest } from "../../hooks/getqueries";

import HeadMeta from "../../components/head-meta";


const Genres = () => {
  const navigate = useNavigate();
  const queryParam = {}
  const { querieddata, isLoading } = useQueryGetRequest(
    "genres",
    queryParam,
    genresApi.getCategories
  );

  const showMore = (id) => {
    navigate(`${CATEGORIES}/${id}`);
  };

  return (
    <Container>
      <HeadMeta title={`Categories of islamic resources on Dawah Nigeria `} />
      <div className="genre_wrapper">
        <div className="genre_header_link bg-background max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Categories"} />
        </div>

        {isLoading && (
          <div className="load_x">
            <div className="load_y">
              <Loader />
            </div>
          </div>
        )}

        <div className="genre_lists">
          {!isLoading &&
            Array.isArray(querieddata) &&
            querieddata.map(({ img, name, id }, idx) => {
              return (
                <div
                  onClick={() => {
                    showMore(id);
                  }}
                  key={idx + 1}
                  className=""
                >
                  <GenreWidget img={img} name={name} />
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default Genres;
