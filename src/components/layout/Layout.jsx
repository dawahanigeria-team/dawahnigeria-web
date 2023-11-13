import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import SideNav from "../../components/sideNav/SideNav";
import { BiShareAlt } from "react-icons/bi";
import ShareAudio from "../shareaudio/shareAudio";
import { FaHome, FaPlay } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { SiApplemusic } from "react-icons/si";
import { GiPauseButton } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AudioContext } from "../../App.jsx";
import AudioActionDesktop from "../audio/audioActionDesktop";
import { setPlaying } from "../../Redux/Actions/ActionCreators";
import { FAVOURITE, LECTURE, LIBRARY } from "../../utils/routes/constants";

export const NavContext = createContext();

const Layout = () => {
  const { currentAudioInfo, playing, audioId, value } = useSelector(
    (state) => state.user
  );
  // const { image, title, name, audio } = currentAudioInfo;
  const navigate = useNavigate();
  const rangeRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setisOpen] = useState(false);
  const { audioRef, setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const islayout = true;
  const [res, setRes] = useState(() => {
    return (
      Number(localStorage.getItem("navControl")) ||
      (window.innerWidth > 890 ? 2 : 1)
    );
  });

  useEffect(() => {
    localStorage.setItem("navControl", JSON.stringify(res));
    const handleResize = () => {
      if (window.innerWidth <= 890) {
        setRes(1);
      } else {
        setRes(2);
      }
    };
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [res]);

  return (
    <div className="layout_wrapper">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisOpen(false);
        }}
        className={`layout_sidenav ${
          res === 2
            ? "layout_sidenav_open"
            : `layout_sidenav_close let swipeInLeft ${isOpen ? "show" : "hide"}`
        }`}
      >
        <div className="layout_mini" onClick={(e) => e.stopPropagation()}>
          <SideNav res={res} setisOpen={setisOpen} />
        </div>
      </div>

      <div className={`layout_outlet bg-primary`}>
        <NavContext.Provider value={{ res, setRes, setisOpen, isOpen }}>
          <Outlet />
        </NavContext.Provider>
      </div>
      {/**aud desktop   <AudioActionDesktop/>*/}

      {/* ----------------Mobile Buttom menue------------------- */}
      <div className="layout_buttom_menue bg-background">
        <div className="layout_buttom_menue1">
          <div className="range_progress">
            <div
              style={{
                width: `${(value * 100) / audioRef?.current?.duration}%`,
              }}
              className="audio_mob_bar dark:bg-[#ddff2b] bg-muted"
            ></div>
            <input
              ref={rangeRef}
              type="range"
              min={"0"}
              onChange={(e) => {
                e.target.value
              }}
              max={Math.floor(audioRef?.current?.duration || 0)}
              value={value}
              className=""
            />
          </div>

          <div
            onClick={() => {
              navigate(`${LECTURE}${audioId}`, {
                state: {
                  layout: islayout,
                },
              });
            }}
            className="curr_lect_img"
          >
            <img
              className="curr_lect_img_sz"
              src={
                currentAudioInfo?.img ||
                "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"
              }
              alt="disk"
            />
          </div>

          <marquee
            direction="left"
            loop="5"
            className="layout_buttom_text_wrap"
          >
            <p className="layout_buttom_text1 text-color">
              {currentAudioInfo?.title || currentAudioInfo?.Title}
            </p>
            <p className="layout_buttom_text2 text-color">
              {currentAudioInfo?.rpname}
            </p>
          </marquee>
          <div
            onClick={() => {
              setisShare(!isShare);
            }}
          >
            <BiShareAlt className="layout_buttom_share text-color" />
          </div>
          <div
            onClick={() => {
              if (playing) {
                dispatch(setPlaying(!playing));
              } else {
                dispatch(setPlaying(!playing));
                setinitial(false);
              }
            }}
            className="layout_buttom_play_wrap dark:bg-[#ddff2b] bg-gray-500"
          >
            {!playing ? (
              <FaPlay className="layout_buttom_play_icon dark:text-black text-gray-100" />
            ) : (
              <GiPauseButton className="layout_play_icon dark:text-black text-gray-100" />
            )}
          </div>
        </div>

        <div className="layout_buttom_menue2 px-6 py-2">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="layout_buttom_menue2_home"
          >
            <FaHome
              className={
                location.pathname === "/"
                  ? "layout_buttom_menue2_homeIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_homeIcon text-color"
              }
            />
            <p
              className={
                location.pathname === "/"
                  ? "layout_buttom_menue2_homeText_active font-semibold dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_homeText text-color"
              }
            >
              Home
            </p>
          </div>
          <div
            onClick={() => {
              navigate(LIBRARY);
            }}
            className="layout_buttom_menue2_library"
          >
            <SiApplemusic
              className={
                location.pathname === LIBRARY
                  ? "layout_buttom_menue2_libraryIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_libraryIcon text-color"
              }
            />
            <p
              className={
                location.pathname === LIBRARY
                  ? "layout_buttom_menue2_libraryText_active dark:text-[#ddff2b] text-color-foreground font-semibold"
                  : "layout_buttom_menue2_libraryText text-color"
              }
            >
              Library
            </p>
          </div>
          <div
            onClick={() => {
              navigate(FAVOURITE);
            }}
            className="layout_buttom_menue2_favourite"
          >
            <MdFavorite
              className={
                location.pathname === FAVOURITE
                  ? "layout_buttom_menue2_favouriteIcon_active dark:text-[#ddff2b] text-color-foreground"
                  : "layout_buttom_menue2_favouriteIcon text-color"
              }
            />
            <p
              className={
                location.pathname === FAVOURITE
                  ? "layout_buttom_menue2_favouriteText_active dark:text-[#ddff2b] text-color-foreground font-semibold"
                  : "layout_buttom_menue2_favouriteText text-color"
              }
            >
              Favorites
            </p>
          </div>
        </div>
      </div>
      <AudioActionDesktop />
      {isShare && (
        <ShareAudio
          isShare={isShare}
          setisShare={setisShare}
          nid={audioId}
          type={"audio"}
        />
      )}
      {/* ----------------Mobile Buttom menue ends------------------- */}
    </div>
  );
};

export default Layout;
