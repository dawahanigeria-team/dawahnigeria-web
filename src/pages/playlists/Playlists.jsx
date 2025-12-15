import React, { useState } from "react";
import "./playlists.scss";
import Container from "../../components/container/Container";
import FilterButton from "../../components/filterButton/FilterButton";
import AlbumWidget from "../../components/albumWidget/AlbumWidget";
import { useNavigate } from "react-router-dom";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import Loader from "../../components/UI/loader/loader";
import { PLAYLISTS } from "../../utils/routes/constants";

import { useCategoriesHook, useLanguagesHook } from "../../hooks/lecturers";
import { useAllPlaylistHook } from "../../hooks/playlists";

import HeadMeta from "../../components/head-meta";

const Playlists = () => {
  const [filter, setFilter] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [active, setActive] = useState("All");
  const [active1, setActive1] = useState("All");
  const [catid, setCatid] = useState("40217");
  const [langid, setLangid] = useState("6");
  const navigate = useNavigate();
  const [, setTypeName] = useState();
  const [, setIsEmpty] = useState(false);

  const { data: categories } = useCategoriesHook();
  const { data: languages } = useLanguagesHook();
  const { data: allPlaylists, isLoading } = useAllPlaylistHook();

  return (
    <Container>
      <HeadMeta title={`Playlists - Get islamic resources on Dawah Nigeria`} />
      <div className="playlist_wrapper">
        <div className="play_header_link bg-background">
          <HeaderRouter title={"Playlist"} />
        </div>
        <div className="playlist_filter">
          <div className="playlist_filter_categories">
            {Array.isArray(categories) &&
              categories?.map(({ name, id }, idx) => {
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
                    data={allPlaylists}
                    id={id}
                    setTypeName={setTypeName}
                    setIsEmpty={setIsEmpty}
                    setCatid={setCatid}
                  />
                );
              })}
          </div>
          <div className="playlist_filter_language">
            {Array.isArray(languages) &&
              languages?.map(({ name, id }, idx) => {
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
                    data={allPlaylists}
                    setIsEmpty={setIsEmpty}
                    setTypeName={setTypeName}
                    lid={id}
                    setLangid={setLangid}
                  />
                );
              })}
          </div>
        </div>
        {isLoading && (
          <div className="load_desktop mgt">
            <div className="loads">
              <Loader />
            </div>
          </div>
        )}
        <div className="playlist_widget">
          {!isLoading &&
            Array.isArray(allPlaylists) &&
            allPlaylists.map(({ img, id, name, lec_no }, idx) => {
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
                    lec_no={lec_no || 0}
                    categories={name}
                    img={img}
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
