import React, { useContext, useEffect, useState } from "react";
import "./nav.scss";
import Search from "../search/Search";
import ClientOnly from "../ClientOnly";
// SVG imports moved to conditional loading to prevent SSR errors
// import apple from "../../assets/svg/apple.svg";
// import googleplay from "../../assets/svg/googleplay.svg";
// PNG import moved to conditional loading to prevent SSR errors
// import Logo from "../../assets/png/dn logo.png";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavContext } from "../layout/Layout";
import ComingSoon from "../comingsoon/comingSoon";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRes, setisOpen } = useContext(NavContext);
  
  // State for conditionally loaded assets to prevent SSR errors
  const [appleSvg, setAppleSvg] = useState(null);
  const [googleplaySvg, setGoogleplaySvg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  
  // Load assets only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../../assets/svg/apple.svg').then(module => {
        setAppleSvg(module.default);
      }).catch(() => {});
      
      import('../../assets/svg/googleplay.svg').then(module => {
        setGoogleplaySvg(module.default);
      }).catch(() => {});
      
      import('../../assets/png/dn logo.png').then(module => {
        setLogoImg(module.default);
      }).catch(() => {});
    }
  }, []);
  const handleSideBar = () => {
    setRes(1);
    /**
    if (res === 1) {
      setRes(2);
    } else {
      setRes(1);
    }
   */
    setisOpen(true);
  };

  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <div className="nav_container bg-search dark:border-b-0 border-b">
        <div className="nav_wrapper">
          <div className="nav_logo">
            <FiMenu
              onClick={() => {
                handleSideBar();
              }}
              className="nav_res_hamburger text-color"
            />
            <div
              onClick={() => {
                navigate("/dawahcast");
              }}
              className="nav_logo"
            >
              <img className="logo_img" src={logoImg} alt="logo" />
            </div>
          </div>

          <div className="hide"></div>
          <div className="nav_search">
            <ClientOnly>
              <Search />
            </ClientOnly>
          </div>
          <div className="hide"></div>
          <div className="nav_download">
            <div className="nav_download1">
              <Link
                to={process.env.REACT_APP_GOOGLE_PLAY_URL}
                aria-label="Download app on Google play"
                onClick={(e) => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon((prev) => !prev);
                }}
              >
                <img src={googleplaySvg} alt="" />
              </Link>
            </div>
            <div className="nav_download2">
              <Link
                to={process.env.REACT_APP_APPLE_STORE_URL}
                aria-label="Download app on Applestore"
                onClick={(e) => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon((prev) => !prev);
                }}
              >
                <img src={appleSvg} alt="" />
              </Link>
            </div>
          </div>

          <div className="nav_res_download_wrapper bg-background text-color border border-border">
            <button
              className="nav_res_download"
              onClick={() => {
                setShowComingSoon((prev) => !prev);
              }}
            >
              Get app
            </button>
          </div>
        </div>
        <div className={"max-[615px]:block hidden mt-2"}>
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>
      </div>
      {showComingSoon && (
        <ComingSoon
          comingSoon={showComingSoon}
          setcomingSoon={setShowComingSoon}
        />
      )}
    </>
  );
};

export default Nav;
