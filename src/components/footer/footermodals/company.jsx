import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import ComingSoon from "../../comingsoon/comingSoon";

const Company = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);

  const links = [
    { text: "About" },
    { text: "Contact" },
    { text: "Advertising" },
    { text: "News" },
    { text: "Visual Identity" },
  ];

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-xl font-medium text-zinc-100">Company</h2>
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
          className={`space-y-4 min-[450px]:block ${
            isShow ? "block" : "hidden"
          }`}
        >
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => setcomingSoon(true)}
              className="block text-zinc-400 hover:text-[#ddff2b] transition-colors duration-200"
            >
              {link.text}
            </button>
          ))}
        </div>
      </div>

      {comingSoon && (
        <ComingSoon comingSoon={comingSoon} setcomingSoon={setcomingSoon} />
      )}
    </>
  );
};

export default Company;
