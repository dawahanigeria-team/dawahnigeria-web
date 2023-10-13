import React, { useState, useEffect } from "react";
import "./genres.scss";
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import GenreWidget from "./genreWidget";
import { GENRES } from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";

const Genres = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getCategories() {
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/allcateg_api.php`)
        .then((res) => {
          //console.log(res.data);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
    getCategories();
  }, []);

  const showMore = (id) => {
    navigate(`${GENRES}/${id}`);
  };

  return (
    <Container>
      <HeadMeta title={`Genres of islamic resources on Dawah Nigeria `} />
      <div className="genre_wrapper">
        <div className="genre_header_link max-[615px]:border-b border-zinc-700">
          <HeaderRouter title={"Genres"} />
        </div>

        {loading && (
          <div className="load_x">
            <div className="load_y">
              <Loader />
            </div>
          </div>
        )}

        <div className="genre_lists">
          {!loading &&
            data.map(({ img, name, id }, idx) => {
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
