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
  //console.log(playing);
  //console.log(currentAudioInfo);
  useEffect(() => {
    localStorage.setItem("navControl", JSON.stringify(res));
    const handleResize = () => {
      if (window.innerWidth <= 890) {
        setRes(1);
        ////console.log(window.innerWidth)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <SideNav res={res} />
        </div>
      </div>

      <div className={`layout_outlet`}>
        <NavContext.Provider value={{ res, setRes, setisOpen, isOpen }}>
          <Outlet />
        </NavContext.Provider>
      </div>
      {/**aud desktop   <AudioActionDesktop/>*/}

      {/* ----------------Mobile Buttom menue------------------- */}
      <div className="layout_buttom_menue">
        <div className="layout_buttom_menue1">
          <div className="range_progress">
            <div
              style={{
                width: `${(value * 100) / audioRef?.current?.duration}%`,
              }}
              className="audio_mob_bar"
            ></div>
            <input
              ref={rangeRef}
              type="range"
              min={"0"}
              max={Math.floor(audioRef?.current?.duration)}
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
            <p className="layout_buttom_text1">
              {currentAudioInfo?.title || currentAudioInfo?.Title}
            </p>
            <p className="layout_buttom_text2">{currentAudioInfo?.rpname}</p>
          </marquee>
          <div
            onClick={() => {
              setisShare(!isShare);
            }}
          >
            <BiShareAlt className="layout_buttom_share" />
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
            className="layout_buttom_play_wrap"
          >
            {!playing ? (
              <FaPlay className="layout_buttom_play_icon" />
            ) : (
              <GiPauseButton className="layout_play_icon" />
            )}
          </div>
        </div>

        <div className="layout_buttom_menue2">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="layout_buttom_menue2_home"
          >
            <FaHome
              className={
                location.pathname === "/"
                  ? "layout_buttom_menue2_homeIcon_active"
                  : "layout_buttom_menue2_homeIcon"
              }
            />
            <p
              className={
                location.pathname === "/"
                  ? "layout_buttom_menue2_homeText_active"
                  : "layout_buttom_menue2_homeText"
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
                  ? "layout_buttom_menue2_libraryIcon_active"
                  : "layout_buttom_menue2_libraryIcon"
              }
            />
            <p
              className={
                location.pathname === LIBRARY
                  ? "layout_buttom_menue2_libraryText_active"
                  : "layout_buttom_menue2_libraryText"
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
                  ? "layout_buttom_menue2_favouriteIcon_active"
                  : "layout_buttom_menue2_favouriteIcon"
              }
            />
            <p
              className={
                location.pathname === FAVOURITE
                  ? "layout_buttom_menue2_favouriteText_active"
                  : "layout_buttom_menue2_favouriteText"
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
