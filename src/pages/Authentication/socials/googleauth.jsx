import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleCustomButton from "../../../utils/googleCustomButton";

function GetGoogleOAuth() {
  //const [socialData, setsocialData] = useState()

  ////console.log(socialData)
  return (
    <div className="w-full relative">
      <GoogleOAuthProvider clientId="498332584921-nghgkmqicq5ijukvrhjljfilsl8mg4n8.apps.googleusercontent.com">
        <GoogleCustomButton />
        {/**
         <GoogleLogin
          
          onSuccess={(credentialResponse) => {
            //console.log(credentialResponse);
            const details = jwt_decode(credentialResponse.credential);
            const { name, email } = details;
            //console.log(details);
            const payload = {
              action: "register_user",
              is_social: true,
              type: "google",
              google_access_token: credentialResponse.credential,
              name,
              email,
            };

            if (pathname === "/auth/login") {
              const isSocial = true;

              // //console.log(payload);
              dispatch(LoginAction(payload, isSocial, navigate, setLoading));
            } else {
              navigate("/auth/selectlanguage", {
                state: {
                  payload,
                },
              });
            }

            ////console.log(credentialResponse);
          }}
          onError={() => {
            //console.log("Login Failed");
          }}
        />
        */}
      </GoogleOAuthProvider>
    </div>
  );
}

export default GetGoogleOAuth;
