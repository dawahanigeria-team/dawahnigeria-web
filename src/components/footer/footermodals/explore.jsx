import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { CHARTS, LECTURERS, NEW, TRENDING, VIDEO } from "../../../utils/routes/constants";
const Explore = () => {
  const [isShow, setshow] = useState(false);
  return (
    <div className="flex flex-col justify-start items-start space-y-4 h-fit max-[450px]:py-3 max-[450px]:border-b border-zinc-700">
      <div className="flex justify-between items-center w-full    ">
        <h2 className="text-text-foreground font-medium max-[450px]:text-lg text-xl">Explore</h2>
        <div
          onClick={() => {
            setshow(!isShow);
          }}
        >
          {" "}
          <MdNavigateNext
            className={` text-text-foreground min-[450px]:hidden text-[25px] ${
              isShow ? "-rotate-90" : "rotate-90"
            }`}
          />
        </div>
      </div>
      <div className={`min-[450px]:block space-y-4 ${isShow ? "max-[450px]:block" : "max-[450px]:hidden"}`}>
        <Link className="block" to={LECTURERS}>Rp</Link>
        
        <Link className="block" to={TRENDING}>Trendings Lectures</Link>
        <Link className="block" to={NEW}>New Lectures</Link>
        <Link className="block" to={CHARTS}>Charts</Link>
        <Link className="block" to={VIDEO}>Videos</Link>
      </div>
    </div>
  );
};

export default Explore;