import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { LoginAction } from "../Redux/Actions/ActionCreators";
const GoogleCustomButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //console.log(tokenResponse);
      //console.log(tokenResponse.access_token);
      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: "Bearer " + tokenResponse.access_token,
          },
        })
        .then((res) => {
          //console.log(res.data);
          const { email, name } = res.data;
          const payload = {
            action: "register_user",
            is_social: true,
            type: "google",
            google_access_token: tokenResponse.access_token,
            name,
            email,
          };

          if (pathname === "/auth/login") {
            const isSocial = true;

            // //console.log(payload);
            dispatch(
              LoginAction(
                { languageId: 6, ...payload },
                isSocial,
                navigate,
                setLoading
              )
            );
          } else {
            navigate("/auth/selectlanguage", {
              state: {
                payload,
              },
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  });
  return (
    <button
      onClick={() => {
        login();
      }}
      className=" text-gray-200 hover:text-[#070707] space-x-3 hover:bg-gray-200 hover:border-0 w-full flex justify-center items-center rounded-[5px] h-[47px] border-[#ddff2b] min-[615px]:text-[#070707] border bg-none min-[615px]:bg-gray-100 min-[615px]:border-0"
    >
      <FcGoogle className="text-[25px] text-color" />
      <div className="font-medium ">Sign in with google</div>
    </button>
  );
};

export default GoogleCustomButton;
