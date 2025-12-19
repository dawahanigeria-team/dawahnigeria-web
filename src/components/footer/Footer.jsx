import React, { useState } from "react";
import "./footer.scss";
import apple from "../../assets/svg/apple.svg";
import googleplay from "../../assets/svg/googleplay.svg";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Explore from "./footermodals/explore";
import {
  AiOutlineCopyrightCircle,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import ForUser from "./footermodals/forUser";
import ForRp from "./footermodals/forRps";
import Company from "./footermodals/company";
import ComingSoon from "../comingsoon/comingSoon";

const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <footer className="footer_wrapper text-color bg-footer px-6 sm:px-8 pt-12 max-[500px]:pb-[9rem] pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid w-full max-[450px]:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
            <Explore />
            <ForUser />
            <ForRp />
            <Company />

            <div className="flex space-y-6 sm:col-span-2 flex-col justify-start items-start">
              {/* App Store Links */}
              <div className="w-full flex items-center space-x-4">
                <button
                  type="button"
                  aria-label="Download app on Applestore"
                  onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    setShowComingSoon(true);
                  }}
                  className="transition-transform hover:scale-105"
                >
                  <img
                    className="h-[40px]"
                    src={apple}
                    alt="Download on App Store"
                  />
                </button>
                <button
                  type="button"
                  aria-label="Download app on Google play"
                  onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    setShowComingSoon(true);
                  }}
                  className="transition-transform hover:scale-105"
                >
                  <img
                    className="h-[40px]"
                    src={googleplay}
                    alt="Get it on Google Play"
                  />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 py-3 w-full">
                <SocialLink
                  href="https://web.facebook.com/dawahnigeria"
                  icon={<FaFacebook />}
                />
                <SocialLink
                  href="https://twitter.com/dawahnigeria"
                  icon={<AiOutlineTwitter />}
                />
                <SocialLink
                  href="https://www.instagram.com/dawahnigeria/"
                  icon={<AiFillInstagram />}
                />
                <SocialLink
                  href="https://www.youtube.com/@DawahNigeria"
                  icon={<FaYoutube />}
                />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-6 mt-8 border-t border-zinc-700/50">
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <AiOutlineCopyrightCircle className="text-lg" />
              <span>{new Date().getFullYear()}</span>
              <span>Dawah Nigeria. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {showComingSoon && (
        <ComingSoon
          comingSoon={showComingSoon}
          setcomingSoon={setShowComingSoon}
        />
      )}
    </>
  );
};

// Social Link Component
const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300"
  >
    <div className="text-2xl text-zinc-400 group-hover:text-[#ddff2b] transition-colors duration-300">
      {icon}
    </div>
  </a>
);

export default Footer;
