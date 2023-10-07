import React from "react";
import { FaHome, FaQuran } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import { CgUserList } from "react-icons/cg";
import { MdPerson, MdFavorite } from "react-icons/md";
import { TiChartBar } from "react-icons/ti";
import {
  BsYoutube,
  BsMusicNoteList,
  BsFileEarmarkMusicFill,
  BsFillDiscFill,
} from "react-icons/bs";
import {
  CHARTS,
  FAVOURITE,
  GENRES,
  LECTURERS,
  MYPLAYLIIST,
  NEW,
  PLAY,
  TRENDING,
  VIDEO,
  QURAN,
} from "../../utils/routes/constants";

export const lectures = [
  {
    id: 0,
    name: "Home",
    icon: <FaHome className="icon0 icon" />,
    link: "/dawahcast",
  },
  {
    id: 1,
    name: "Trending",
    icon: <AiOutlineLineChart className="icon1 icon" />,
    link: TRENDING,
  },
  {
    id: 2,
    name: "New",
    icon: <ImMusic className="icon2 icon" />,
    link: NEW,
  },
  {
    id: 3,
    name: "Lecturers",
    icon: <MdPerson className="icon3 icon" />,
    link: LECTURERS,
  },
  {
    id: 4,
    name: "Quran",
    icon: <FaQuran className="icon" aria-hidden="true" />,
    link: QURAN,
  },
  {
    id: 4,
    name: "Videos",
    icon: <BsYoutube className="icon4 icon" />,
    link: VIDEO,
  },
  {
    id: 5,
    name: "Playlists",
    icon: <BsMusicNoteList className="icon5 icon" />,
    link: PLAY,
  },
  {
    id: 6,
    name: "Charts",
    icon: <TiChartBar className="icon6 icon" />,
    link: CHARTS,
  },
  {
    id: 7,
    name: "Genres",
    icon: <BsFileEarmarkMusicFill className="icon7 icon" />,
    link: GENRES,
  },
];
export const library = [
  {
    id: 8,
    name: "Add Playlist",
    icon: <BsFillDiscFill className="icon0 icon" />,
    //link:,
  },
  {
    id: 9,
    name: "Favourites",
    icon: <MdFavorite className="icon1 icon" />,
    link: FAVOURITE,
  },
  {
    id: 10,
    name: "My Playlist",
    icon: <CgUserList className="icon2 icon" />,
    link: MYPLAYLIIST,
  },
];
