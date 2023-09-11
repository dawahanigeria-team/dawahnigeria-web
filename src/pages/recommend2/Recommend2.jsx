import React, { useEffect, useState } from "react";
import "./recommend2.scss";
import Container from "../../components/container/Container";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import { recommended2Data } from "./data";
import axios from "axios";
import { LECTURE } from "../../utils/routes/constants";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useSelector } from "react-redux";
const Recommend2 = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/albumlisting_page_api.php?lim=10&langid=7&page=1")
      .then((res) => {
        ////console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // //console.log(r)
  return (
    <Container>
      <div className="recommend2_header_link">
        <HeaderRouter title={"Podcast"} />
      </div>
      <div className="recommend2_wrapper">
        {recommended2Data.map(
          ({ cats, img, title, rpname, nid, cats_name, views }, idx) => {
            return (
              <div
                onClick={() => {
                  navigate(`${LECTURE}${nid}`, {
                    state: {
                      title: title,
                      rpname,
                      img,
                      cats,
                      currentUser,
                      nid,
                      controlData: recommended2Data,
                      nav1: { title: "Podcast", link: "/recommend2" },
                    },
                  });
                }}
                key={idx}
                className="recommended2_album_wrap"
              >
                <AlbumWidget
                  key={idx}
                  views={views}
                  categories={cats_name}
                  img={img}
                />
              </div>
            );
          }
        )}
      </div>
    </Container>
  );
};

export default Recommend2;
