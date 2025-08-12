import React, { useState, useEffect } from "react";
import "./facebook.scss";
import facebook from "../../../assets/png/social/facebook.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../../Redux/Actions/ActionCreators";
import ClientOnly from "../../../components/ClientOnly";

function GetFacebookAuth() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [LoginSocialFacebook, setLoginSocialFacebook] = useState(null);

  useEffect(() => {
    // Dynamic import to prevent SSR issues
    import("reactjs-social-login")
      .then((module) => {
        setLoginSocialFacebook(() => module.LoginSocialFacebook);
      })
      .catch((err) => {
        console.error("Failed to load social login:", err);
      });
  }, []);

  const handleFacebookLogin = (response) => {
    const { name, email, accessToken } = response.data;
    if (pathname === "/auth/login") {
      const payload = {
        action: "login_user",
        email_or_username: email,
        token: accessToken,
      };
    } else {
      navigate("/auth/selectlanguage", {
        state: {
          name,
          email,
          accessToken,
        },
      });
    }
  };

  return (
    <div>
      <ClientOnly 
        fallback={
          <div className="cursor-pointer size_img">
            <img
              className="ssz"
              src={facebook}
              src-data={facebook}
              alt="facebook"
            />
          </div>
        }
      >
        {LoginSocialFacebook ? (
          <LoginSocialFacebook
            appId="392392739611134"
            onResolve={handleFacebookLogin}
            onReject={(err) => {}}
          >
            <div className="cursor-pointer size_img">
              <img
                className="ssz"
                src={facebook}
                src-data={facebook}
                alt="facebook"
              />
            </div>
          </LoginSocialFacebook>
        ) : (
          <div className="cursor-pointer size_img">
            <img
              className="ssz"
              src={facebook}
              src-data={facebook}
              alt="facebook"
            />
          </div>
        )}
      </ClientOnly>
    </div>
  );
}

export default GetFacebookAuth;
