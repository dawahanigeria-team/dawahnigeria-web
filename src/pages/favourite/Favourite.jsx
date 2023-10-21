import React, { useState } from "react";
import "./favourite.scss";
import Container from "../../components/container/Container";
import Favourite_album from "../../components/favourite_subs/favourite_albums/Favourite_album";
import Favourite_songs from "../../components/favourite_subs/favourite_songs/Favourite_songs";
import Favourite_playlist from "../../components/favourite_subs/favourite_playlist/Favourite_playlist";
import Favourite_lecturers from "../../components/favourite_subs/favourite_lecturers/Favourite_lecturers";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import HeadMeta from "../../components/head-meta";

const Favourite = () => {
  const [tab, setTab] = useState(1);
  const [count2, setCount2] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count3, setCount3] = useState(0);

  return (
    <Container>
      <HeadMeta
        title={`Favorite resources on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="fav_wrapper">
        <div className="fav_header_link bg-background">
          <HeaderRouter title={"Favourites"} />
        </div>
        <div className="fav_tab_wrap">
          <div className="fav_tab">
            <div
              onClick={() => {
                setTab(1);
              }}
              className="fav_tab_song"
            >
              <p
                className={`${
                  tab === 1 ? "fav_tab_song1_active text-foreground " : "fav_tab_song1"
                }`}
              >
                Lectures
              </p>
              <p
                className={`${
                  tab === 1 ? "fav_tab_song2_active text-text" : "fav_tab_song2"
                }`}
              >{`(${count1})`}</p>
            </div>
            <div
              onClick={() => {
                setTab(2);
              }}
              className="fav_tab_album"
            >
              <p
                className={`${
                  tab === 2 ? "fav_tab_album1_active text-foreground" : "fav_tab_album1"
                }`}
              >
                Album
              </p>
              <p
                className={`${
                  tab === 2 ? "fav_tab_album2_active text-text" : "fav_tab_album2"
                }`}
              >{`(${count2})`}</p>
            </div>
            <div
              onClick={() => {
                setTab(3);
              }}
              className="fav_tab_playlist"
            >
              <p
                className={`${
                  tab === 3 ? "fav_tab_playlist1_active text-foreground" : "fav_tab_playlist1"
                }`}
              >
                Playlist
              </p>
              <p
                className={`${
                  tab === 3 ? "fav_tab_playlist2_active text-text" : "fav_tab_playlist2"
                }`}
              >{`(${count3})`}</p>
            </div>
            <div
              onClick={() => {
                setTab(4);
              }}
              className="fav_tab_video"
            >
              <p
                className={`${
                  tab === 4 ? "fav_tab_video1_active text-foreground" : "fav_tab_video1"
                }`}
              >
                Lecturers
              </p>
            </div>
          </div>
        </div>
        {tab === 1 && <Favourite_songs setCount1={setCount1} />}
        {tab === 2 && <Favourite_album setCount2={setCount2} />}
        {tab === 3 && <Favourite_playlist setCount3={setCount3} />}
        {tab === 4 && <Favourite_lecturers />}
      </div>
    </Container>
  );
};

export default Favourite;
