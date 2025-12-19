import React from "react";
import "./auth.scss";
import loginHero from "../../../assets/png/loginheroimg.png";
import {IoCloseOutline} from "react-icons/io5"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const {theme} = useSelector((state) => state.user)

  return (
    <div className="auth_wrapper bg-background">
      <div className="auth_container min-[690px]:bg-auth shadow-lg">
        <img
          className="auth_hero_image"
          src={loginHero}
          src-data={loginHero}
          alt="loginhero"
        />
        <div className={`min-[690px]:hidden ${theme === "dark" ? "gradientauth" : "gradientauth_light"}`}></div>
        <div
          className={
            pathname === "/auth/selectlanguage"
              ? "auth_header_logo_none"
              : "auth_header_logo"
          }
        >
          <button
            onClick={() => {
              navigate("/dawahcast");
            }}
          >

            <IoCloseOutline className="text-foreground text-2xl min-[690px]:text-5xl"/>
          </button>
        </div>
        <div className="sl_wrapper">
          <div
            className={
              pathname === "/auth/selectlanguage"
                ? "auth_links_none"
                : "auth_links"
            }
          >
            <Link to={"/auth/login"}>
              <p
                className={` text-foreground ${
                  pathname === "/auth/login"
                    ? "auth_login_link_active"
                    : "auth_login_link"
                }`}
              >
                Log in
              </p>
            </Link>
            <Link to={"/auth/signup"}>
              <p
                className={` text-foreground  ${
                  pathname === "/auth/signup"
                    ? "auth_signup_link_active"
                    : "auth_signup_link"
                }`}
              >
                Sign up
              </p>
            </Link>
          </div>
          <div className="auth_outlet text-foreground">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
