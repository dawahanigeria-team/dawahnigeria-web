import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
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
import { useState } from "react";
import ComingSoon from "../comingsoon/comingSoon";
const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  return (
    <>
      <div className="footer_wrapper text-color bg-footer text-sm px-8 pt-8 max-[500px]:pb-[9rem] pb-24">
        <div className="grid w-full max-[450px]:grid-cols-1 md:grid-cols-4 lg:grid-cols-6 min-[450px]:gap-6">
          <Explore />

          <ForUser />

          <ForRp />
          <Company />

          <div className="flex space-y-2 sm:col-span-2 flex-col justify-start items-start">
            <div className=" w-full flex items-center space-x-2">
              <Link
                to={process.env.REACT_APP_APPLE_STORE_URL}
                aria-label="Download app on Applestore"
                onClick={(e) => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon((prev) => !prev);
                }}
              >
                <img className="cursor-pointer" src={apple} alt="" />
              </Link>
              <Link
                to={process.env.REACT_APP_GOOGLE_PLAY_URL}
                aria-label="Download app on Google play"
                onClick={(e) => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  setShowComingSoon((prev) => !prev);
                }}
              >
                <img className="cursor-pointer" src={googleplay} alt="" />
              </Link>
            </div>
            <div className="flex items-center space-x-6 py-3 w-full ">
              <div className="group">
                <Link
                  to="https://web.facebook.com/dawahnigeria"
                  className="block p-2 bg-[#333] group-hover:h-[48px] group-hover:w-[48px] h-[44px] w-[44px] bg-opacity-60 rounded-full"
                >
                  <FaFacebook className="text-[28px] transition-all duration-300 dark:text-color text-zinc-300 group-hover:text-[32px]  transform ease-in dark:group-hover:text-[#ddff2b]" />
                </Link>
              </div>
              <div className="group">
                <Link
                  to="https://twitter.com/dawahnigeria"
                  className=" block bg-[#333] bg-opacity-60 p-2 rounded-full group-hover:h-[48px] group-hover:w-[48px] h-[44px] w-[44px]"
                >
                  <AiOutlineTwitter className="text-[28px] transition-all duration-300 dark:text-color text-zinc-300 group-hover:text-[32px] transform ease-in dark:group-hover:text-[#ddff2b]" />
                </Link>
              </div>
              <div className="group">
                <Link
                  to="https://www.instagram.com/dawahnigeria/"
                  className="block bg-[#333] bg-opacity-60 p-2 rounded-full group-hover:h-[48px] group-hover:w-[48px] h-[44px] w-[44px]"
                >
                  <AiFillInstagram className="text-[28px] transition-all duration-300 dark:text-color text-zinc-300 group-hover:text-[32px] transform ease-in dark:group-hover:text-[#ddff2b]" />
                </Link>
              </div>
              <div className="group ">
                <Link
                  to="https://www.youtube.com/@DawahNigeria"
                  className="block bg-[hsl(0,0%,20%)] bg-opacity-60 p-2 rounded-full group-hover:h-[48px] group-hover:w-[48px] h-[44px] w-[44px]"
                >
                  <FaYoutube className="text-[28px] transition-all duration-300 dark:text-color text-zinc-300 group-hover:text-[32px] transform ease-in dark:group-hover:text-[#ddff2b]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 mt-6 border-t border-[#868686]">
          <div className="items-center w-full flex space-x-1  text-[12px]">
            <AiOutlineCopyrightCircle className="" />
            <div>{new Date().getFullYear()}</div>
            <div>Dawah Nigeria</div>
          </div>
        </div>
      </div>
      {showComingSoon && (
        <ComingSoon
          comingSoon={showComingSoon}
          setcomingSoon={setShowComingSoon}
        />
      )}
    </>
  );
};

export default Footer;
