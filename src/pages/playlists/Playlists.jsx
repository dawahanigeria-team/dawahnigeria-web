import React, { useState, useEffect } from "react";
import "./playlists.scss";
import Container from "../../components/container/Container";
import { category, language } from "./data";
import FilterButton from "../../components/filterButton/FilterButton";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import axios from "../../utils/useAxios";
import _ from "lodash";
import { PLAYLISTS } from "../../utils/routes/constants";
const Playlists = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [active1, setActive1] = useState("All");
  const [catid, setCatid] = useState("40217");
  const [langid, setLangid] = useState("6");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [page] = useState(1);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [, setTypeName] = useState();
  const [, setIsEmpty] = useState(false);
  useEffect(() => {
    //get all categories
    function getCatAndLang() {
      axios
        .get(`https://dawahnigeria.com/dawahcast/dboxapi/catjson2`)
        .then((res) => {
          ////console.log(res.data);
          setCategories([...category, ...res.data.rp?.slice(0, 15)]);
          // setLoading(false);
        })
        .catch((err) => {
          //console.log(err);
        });

      //get all langyages
      axios
        .get(`https://dawahnigeria.com/dawahcast/dboxapi/langjson`)
        .then((res) => {
          ////console.log(res.data.rp);
          setLanguages([...language, ...res.data.rp]);
        });
    }
    getCatAndLang();
  }, []);

  useEffect(() => {
    setData3(data);
  }, [data]);

  useEffect(() => {
    ////console.log(initialCatid, catid);
    const handleRequest = () => {
      /**
        if (initialLangid !== langid || initialCatid !== catid) {
        setData([]);
        setLoading(true);
      }

      */
      axios
        .get(`/playlistApi.php?action=all_public_playlist_data`)
        .then((res) => {
          //console.log("playlists", res.data);

          setLoading(false);
          /**
 
          setNextPageLoad(false);
          if (res.data.length === 0) {
            setIsEmpty(true);
            return;
          }
 */
          // setinitialLangid(langid);
          // setinitialCatid(catid);
          setData((prev) => _.uniqBy([...prev, ...res.data], "id"));
        })
        .catch((err) => {
          //console.log(err);
        });
    };

    handleRequest();
  }, [catid, langid, page]);
  // //console.log(filter);

  return (
    <Container>
      <div className="playlist_wrapper">
        <div className="play_header_link">
          <HeaderRouter title={"Playlist"} />
        </div>
        <div className="playlist_filter">
          <div className="playlist_filter_categories">
            {categories.map(({ name, id }, idx) => {
              return (
                <FilterButton
                  key={idx}
                  filter={filter}
                  setFilter={setFilter}
                  data1={data1}
                  setData1={setData1}
                  data2={data2}
                  setData2={setData2}
                  data3={data3}
                  setData3={setData3}
                  active={active}
                  setActive={setActive}
                  title={name}
                  action="categories"
                  data={data}
                  id={id}
                  setTypeName={setTypeName}
                  setIsEmpty={setIsEmpty}
                  setCatid={setCatid}
                />
              );
            })}
          </div>
          <div className="playlist_filter_language">
            {languages.map(({ name, id }, idx) => {
              return (
                <FilterButton
                  key={idx}
                  filter={filter}
                  setFilter={setFilter}
                  data1={data1}
                  setData1={setData1}
                  data2={data2}
                  setData2={setData2}
                  data3={data3}
                  setData3={setData3}
                  active={active1}
                  setActive={setActive1}
                  title={name}
                  action="language"
                  data={data}
                  setIsEmpty={setIsEmpty}
                  setTypeName={setTypeName}
                  lid={id}
                  setLangid={setLangid}
                />
              );
            })}
          </div>
        </div>
        {loading && (
          <div className="load_desktop mgt">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        <div className="playlist_widget">
          {!loading &&
            filter.map(({ lec_img, id, name }, idx) => {
              return (
                <div
                  key={idx + 1}
                  onClick={() => {
                    navigate(`${PLAYLISTS}${id}`);
                  }}
                  className="playlist_lists_items"
                >
                  <AlbumWidget
                    key={idx}
                    views={0}
                    categories={name}
                    img={lec_img}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default Playlists;
