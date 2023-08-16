import React from "react";
import "./auth.scss";
import loginHero from "../../../assets/png/loginheroimg.png";
import Logo from "../../../assets/svg/close.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img className="auth_hero_image" src={loginHero} src-data={loginHero} alt="loginhero" />
        <div 
        
        className={pathname === "/auth/selectlanguage"? "auth_header_logo_none":"auth_header_logo"}>
          <img
            onClick={() => {
              navigate("/");
            }}
            src={Logo}
            alt="Logo"
            src-data={Logo}
          />
        </div>
        <div className="sl_wrapper">
        <div className={pathname === "/auth/selectlanguage" ?"auth_links_none":"auth_links"}>
          <Link to={"/auth/login"}>
            <p
              className={`${
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
              className={`${
                pathname === "/auth/signup"
                  ? "auth_signup_link_active"
                  : "auth_signup_link"
              }`}
            >
              Sign up
            </p>
          </Link>
        </div>
        <div className="auth_outlet">
          <Outlet />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
