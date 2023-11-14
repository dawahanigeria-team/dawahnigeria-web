import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import ComingSoon from "../../comingsoon/comingSoon";
const Company = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-4 h-fit mb-8 max-[450px]:py-3 max-[450px]:border-b border-zinc-700">
        <div className="flex justify-between items-center w-full    ">
          <h2 className="text-color-foreground font-medium max-[450px]:text-lg text-xl">Company</h2>

          <div
            onClick={() => {
              setshow(!isShow);
            }}
          >
            {" "}
            <MdNavigateNext
              className={`text-color-foreground min-[450px]:hidden text-[25px] ${
                isShow ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
        </div>
        <div
          className={`space-y-4  ${
            isShow ? "max-[450px]:block" : " max-[450px]:hidden"
          }`}
        >
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            {" "}
            About
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            {" "}
            Contact
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            {" "}
            Advertising
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            {" "}
            News
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            {" "}
            Visual Identity
          </div>
        </div>
      </div>
      {comingSoon && (
        <ComingSoon comingSoon={comingSoon} setcomingSoon={setcomingSoon} />
      )}
    </>
  );
};

export default Company;
