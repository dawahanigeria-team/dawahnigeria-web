import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
const ComingSoon = ({ comingSoon, setcomingSoon }) => {
  return (
    <div
      aria-hidden="true"
      onClick={(e) => {
        e.stopPropagation();
        setcomingSoon(!comingSoon);
      }}
      className="w-full h-full z-[300] bg-none inset-0 fixed"
    >
      <div
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute inset-0 m-auto bg-[#1E1E1E] py-6 space-y-6  flex-col text-white rounded-md w-[80%] min-[615px]:w-[350px] h-[250px] flex items-center justify-center"
      >
        <div
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            setcomingSoon(!comingSoon);
          }}
          className="absolute right-[-3px] top-[-3px] rounded-full p-1 bg-[#333]"
        >
          <GrFormClose className="text-[25px] text-gray-300" />
        </div>

        <div className="min-[615px]:text-3xl text-2xl">Coming soon</div>
        <FaLightbulb className="text-[#ddff2b] text-4xl min-[615px]:text-5xl" />
      </div>
    </div>
  );
};

export default ComingSoon;
