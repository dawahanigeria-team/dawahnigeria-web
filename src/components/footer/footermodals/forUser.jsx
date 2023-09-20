import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import ComingSoon from "../../comingsoon/comingSoon";
const ForUser = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-4 h-fit max-[450px]:py-3 max-[450px]:border-b border-zinc-700">
        <div className="flex justify-between items-center w-full    ">
          <h2 className="text-gray-100 max-[450px]:text-lg text-xl">
            For Users
          </h2>
          <div
            aria-hidden="true"
            onClick={() => {
              setshow(!isShow);
            }}
          >
            {" "}
            <MdNavigateNext
              className={`text-gray-100 min-[450px]:hidden text-[25px] ${
                isShow ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
        </div>
        <div
          className={` space-y-4 ${
            isShow ? "max-[450px]:block" : "max-[450px]:hidden"
          }`}
        >
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            Download
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            Help Centre
          </div>
          <Link className="block" to="/auth/login">
            Login/Signup
          </Link>
          <Link className="block" to="/playlist">
            Playlist
          </Link>
        </div>
      </div>
      {comingSoon && (
        <ComingSoon comingSoon={comingSoon} setcomingSoon={setcomingSoon} />
      )}
    </>
  );
};

export default ForUser;
