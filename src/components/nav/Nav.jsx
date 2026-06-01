import React, { useContext, useState } from "react";
import "./nav.scss";
import Search from "../search/Search";
import ClientOnly from "../ClientOnly";
import apple from "../../assets/svg/apple.svg";
import googleplay from "../../assets/svg/googleplay.svg";
import Logo from "../../assets/png/dn-logo.png";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavContext } from "../layout/Layout";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRes, setisOpen } = useContext(NavContext);
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
              <img className="logo_img" src={Logo} alt="DN Dawahcast logo" />
            </div>
          </div>

          <div className="nav_search">
            <ClientOnly>
              <Search />
            </ClientOnly>
          </div>
          <div className="nav_search_inline_mobile">
            <ClientOnly>
              <Search />
            </ClientOnly>
          </div>

          <div className="nav_download">
            <div className="nav_download1">
              <a
                href="https://play.google.com/store/apps/details?id=com.dawahnigeria.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download app on Google play"
              >
                <img src={googleplay} alt="Get it on Google Play" />
              </a>
            </div>
            <div className="nav_download2">
              <a
                href="https://apps.apple.com/ng/app/dawahnigeria-app/id6759193375"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download app on App Store"
              >
                <img src={apple} alt="Download on the App Store" />
              </a>
            </div>
          </div>

          <div className="nav_res_download_wrapper bg-background text-color border border-border">
            <a
              href="https://play.google.com/store/apps/details?id=com.dawahnigeria.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="nav_res_download flex items-center justify-center"
            >
              Get app
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
