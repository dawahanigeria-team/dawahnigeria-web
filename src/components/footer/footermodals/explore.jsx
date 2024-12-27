import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { CHARTS, LECTURERS, NEW, TRENDING, VIDEO } from "../../../utils/routes/constants";

const Explore = () => {
  const [isShow, setshow] = useState(false);

  const links = [
    { to: LECTURERS, text: "Rp" },
    { to: TRENDING, text: "Trending Lectures" },
    { to: NEW, text: "New Lectures" },
    { to: CHARTS, text: "Charts" },
    { to: VIDEO, text: "Videos" },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-medium text-zinc-100">Explore</h2>
        <button
          onClick={() => setshow(!isShow)}
          className="min-[450px]:hidden"
          aria-label={isShow ? "Collapse menu" : "Expand menu"}
        >
          <MdNavigateNext
            className={`text-zinc-100 text-2xl transition-transform duration-200 ${
              isShow ? "-rotate-90" : "rotate-90"
            }`}
          />
        </button>
      </div>

      <div
        className={`space-y-4 min-[450px]:block ${isShow ? "block" : "hidden"}`}
      >
        {links.map(({ to, text }) => (
          <Link
            key={to}
            to={to}
            className="block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200"
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;