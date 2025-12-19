import React, { useEffect, useState } from "react";
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
  const {theme} = useSelector((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="auth_wrapper bg-background">
      {/* Geometric Pattern Background */}
      <div className="auth_geometric_bg">
        <svg className="geometric_pattern" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geometric-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
              <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.2"/>
            </pattern>
            <linearGradient id="lime-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ddff2b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8faa00" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <rect width="800" height="800" fill="url(#geometric-pattern)"/>
          <circle className="floating_orb orb_1" cx="150" cy="150" r="100" fill="url(#lime-glow)" />
          <circle className="floating_orb orb_2" cx="650" cy="600" r="120" fill="url(#lime-glow)" />
          <circle className="floating_orb orb_3" cx="700" cy="200" r="80" fill="url(#lime-glow)" />
        </svg>
      </div>

      <div className={`auth_container min-[690px]:bg-auth shadow-lg ${mounted ? 'auth_mounted' : ''}`}>
        {/* Hero Section */}
        <div className="auth_hero_section">
          <div className="auth_hero_content">
            <img
              className="auth_hero_image"
              src={loginHero}
              alt="Dawah Nigeria"
            />
            <div className={`auth_hero_overlay ${theme === "dark" ? "gradientauth" : "gradientauth_light"}`}></div>
            {/* Animated geometric accent */}
            <div className="hero_geometric_accent">
              <div className="geometric_line line_1"></div>
              <div className="geometric_line line_2"></div>
              <div className="geometric_line line_3"></div>
            </div>
          </div>
        </div>

        {/* Close Button */}
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
            className="close_button"
          >
            <IoCloseOutline className="text-foreground text-2xl min-[690px]:text-5xl"/>
          </button>
        </div>

        {/* Form Section */}
        <div className="sl_wrapper">
          <div
            className={
              pathname === "/auth/selectlanguage"
                ? "auth_links_none"
                : "auth_links"
            }
          >
            <Link to={"/auth/login"}>
              <div className="auth_link_wrapper">
                <p
                  className={` text-foreground ${
                    pathname === "/auth/login"
                      ? "auth_login_link_active"
                      : "auth_login_link"
                  }`}
                >
                  Log in
                </p>
                {pathname === "/auth/login" && (
                  <div className="auth_link_indicator"></div>
                )}
              </div>
            </Link>
            <Link to={"/auth/signup"}>
              <div className="auth_link_wrapper">
                <p
                  className={` text-foreground  ${
                    pathname === "/auth/signup"
                      ? "auth_signup_link_active"
                      : "auth_signup_link"
                  }`}
                >
                  Sign up
                </p>
                {pathname === "/auth/signup" && (
                  <div className="auth_link_indicator"></div>
                )}
              </div>
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
