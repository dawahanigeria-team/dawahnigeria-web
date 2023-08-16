import React, { useContext, useEffect, useState } from "react";
import "./nav.scss";
import Search from "../search/Search";
import apple from "../../assets/svg/apple.svg";
import googleplay from "../../assets/svg/googleplay.svg";
import Logo from "../../assets/png/dn logo.png";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavContext } from "../layout/Layout";

const Nav = () => {
  const navigate = useNavigate;
  const location = useLocation();
  const {setRes, setisOpen } = useContext(NavContext);
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
    <div className="nav_container ">
      <div className="nav_wrapper">
        <div className="nav_logo">
          <FiMenu
            onClick={() => {
              handleSideBar();
            }}
            className="nav_res_hamburger"
          />
          <div
            onClick={() => {
              navigate("/");
            }}
            className="nav_logo"
          >
            <img className="logo_img" src={Logo} alt="logo" />
          </div>
        </div>

        <div className="hide"></div>
        <div className="nav_search">
          <Search />
        </div>
        <div className="hide"></div>
        <div className="nav_download">
          <div className="nav_download1">
            <img src={googleplay}  alt="apple" />
          </div>
          <div className="nav_download2">
            {" "}
            <img src={apple} alt="apple" />
          </div>
        </div>

        <div className="nav_res_download_wrapper">
          <button className="nav_res_download">Get app</button>
        </div>
      </div>
      <div
        className={
          location.pathname !== "/" ? "nav_search2_hide" : "nav_search2"
        }
      >
        <Search />
      </div>
    </div>
  );
};

export default Nav;
