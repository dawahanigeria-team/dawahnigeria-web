import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import ComingSoon from "../../comingsoon/comingSoon";
const ForRp = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-4 h-fit max-[450px]:py-3 max-[450px]:border-b border-zinc-700">
        <div className="flex justify-between items-center w-full    ">
          <h2 className="font-medium text-text-foreground max-[450px]:text-lg text-xl">For Rp</h2>
          <div
            onClick={() => {
              setshow(!isShow);
            }}
          >
            {" "}
            <MdNavigateNext
              className={`text-text-foreground min-[450px]:hidden text-[25px] ${
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
            {" "}
            RP Portal
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            RP CR
          </div>
          <div
            onClick={() => {
              setcomingSoon(!comingSoon);
            }}
            className="block cursor-pointer"
          >
            RP FAQ
          </div>
        </div>
      </div>
      {comingSoon && (
        <ComingSoon comingSoon={comingSoon} setcomingSoon={setcomingSoon} />
      )}
    </>
  );
};

export default ForRp;
