import React from "react";
import { FaHome, FaQuran } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import { CgUserList } from "react-icons/cg";
import { MdPerson, MdFavorite } from "react-icons/md";
import { TiChartBar } from "react-icons/ti";
import { BsMoonStarsFill } from "react-icons/bs";
import {
  BsYoutube,
  BsMusicNoteList,
  BsFileEarmarkMusicFill,
  BsFillDiscFill,
} from "react-icons/bs";
import {
  CHARTS,
  CATEGORIES,
  FAVOURITE,
  LIBRARY,
  LECTURERS,
  MYPLAYLIIST,
  NEW,
  PLAY,
  TRENDING,
  VIDEO,
  QURAN,
  RAMADAN,
} from "../../utils/routes/constants";

export const lectures = [
  {
    name: "Home",
    icon: <FaHome className="icon0 icon" />,
    link: "/dawahcast",
  },
  {
    name: "Trending",
    icon: <AiOutlineLineChart className="icon1 icon" />,
    link: TRENDING,
  },
  {
    name: "New",
    icon: <ImMusic className="icon2 icon" />,
    link: NEW,
  },
  {
    name: "Ramadan",
    icon: <BsMoonStarsFill className="icon3 icon" />,
    link: RAMADAN,
  },
  {
    name: "Lecturers",
    icon: <MdPerson className="icon3 icon" />,
    link: LECTURERS,
  },
  {
    name: "Quran",
    icon: <FaQuran className="icon" aria-hidden="true" />,
    link: QURAN,
  },
  {
    name: "Videos",
    icon: <BsYoutube className="icon4 icon" />,
    link: VIDEO,
  },
  {
    name: "Playlists",
    icon: <BsMusicNoteList className="icon5 icon" />,
    link: PLAY,
  },
  {
    name: "Charts",
    icon: <TiChartBar className="icon6 icon" />,
    link: CHARTS,
  },
  {
    name: "Categories",
    icon: <BsFileEarmarkMusicFill className="icon7 icon" />,
    link: CATEGORIES,
  },
];
export const library = [
  {
    name: "Add Playlist",
    icon: <BsFillDiscFill className="icon0 icon" />,
    link: LIBRARY,
  },
  {
    name: "Favourites",
    icon: <MdFavorite className="icon1 icon" />,
    link: FAVOURITE,
  },
  {
    name: "My Playlist",
    icon: <CgUserList className="icon2 icon" />,
    link: MYPLAYLIIST,
  },
];
