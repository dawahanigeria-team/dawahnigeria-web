import React from "react";
import ClientOnly from "../../../components/ClientOnly";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleCustomButton from "../../../utils/googleCustomButton";

function GetGoogleOAuth() {
  return (
    <div className="w-full relative">
      <ClientOnly fallback={<div>Loading Google Auth...</div>}>
        <GoogleOAuthProvider clientId="498332584921-nghgkmqicq5ijukvrhjljfilsl8mg4n8.apps.googleusercontent.com">
          <GoogleCustomButton />
        </GoogleOAuthProvider>
      </ClientOnly>
    </div>
  );
}

export default GetGoogleOAuth;
