import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
const Explore = () => {
  const [isShow, setshow] = useState(false);
  return (
    <div className="flex flex-col justify-start items-start space-y-4 h-fit max-[450px]:py-3 max-[450px]:border-b border-zinc-700">
      <div className="flex justify-between items-center w-full    ">
        <h2 className="text-gray-100 max-[450px]:text-lg text-xl">Explore</h2>
        <div
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
        className={`min-[450px]:block space-y-4 ${
          isShow ? "max-[450px]:block" : "max-[450px]:hidden"
        }`}
      >
        <Link className="block" to="/lecturers">
          Rp
        </Link>

        <Link className="block" to="/trending">
          Trendings Lectures
        </Link>
        <Link className="block" to="/new">
          New Lectures
        </Link>
        <Link className="block" to="/chart">
          Charts
        </Link>
        <Link className="block" to="/videos">
          Videos
        </Link>
      </div>
    </div>
  );
};

export default Explore;
