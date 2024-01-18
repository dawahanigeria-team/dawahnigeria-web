import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleCustomButton from "../../../utils/googleCustomButton";

function GetGoogleOAuth() {
  return (
    <div className="w-full relative">
      <GoogleOAuthProvider clientId="498332584921-nghgkmqicq5ijukvrhjljfilsl8mg4n8.apps.googleusercontent.com">
        <GoogleCustomButton />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GetGoogleOAuth;
