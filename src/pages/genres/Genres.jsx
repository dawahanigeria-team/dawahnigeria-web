import React, { useState, useEffect } from "react";
import "./genres.scss";
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import axios from "../../utils/useAxios";
import Loader from "../../components/UI/loader/loader";
import GenreWidget from "./genreWidget";


const Genres = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    function getCategories() {
      axios
        .get(`https://dawahnigeria.com/dawahcast/dboxapi/catjson2`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.rp);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

   
    }
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const showMore  = ( id,) => {
      
      navigate(`/genres/${id}`)
  }

  return (
    <Container>
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
                    
                    showMore(id)
                    
                  }}
                  key={idx + 1}
                  className=""
                >
                 <GenreWidget
                 img={img}
                 name={name}
                 />
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default Genres;

