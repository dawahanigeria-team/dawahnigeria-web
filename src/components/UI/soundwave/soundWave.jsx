import React from "react";
import "./soundWave.scss";

export const AudioWave = () => {
  return (
    <div className="sound_wrapper loader">
      <div className="stroke bg-gray-400 dark:bg-[#ddff2b]"></div>
      <div className="stroke bg-gray-400 dark:bg-[#ddff2b]"></div>
      <div className="stroke bg-gray-400 dark:bg-[#ddff2b]"></div>
      <div className="stroke bg-gray-400 dark:bg-[#ddff2b]"></div>
      <div className="stroke bg-gray-400 dark:bg-[#ddff2b]"></div>
    </div>
  );
};
