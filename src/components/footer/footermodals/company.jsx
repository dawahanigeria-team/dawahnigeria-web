import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import ComingSoon from "../../comingsoon/comingSoon";
import "./footerColumn.scss";

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
      <div className="dn-footer-column">
        <div className="dn-footer-column-header">
          <h2 className="dn-footer-column-title">Company</h2>
          <button
            onClick={() => setshow(!isShow)}
            className="dn-footer-column-toggle"
            aria-label={isShow ? "Collapse menu" : "Expand menu"}
            aria-expanded={isShow}
          >
            <MdNavigateNext
              className={`dn-footer-column-toggle-icon ${
                isShow ? "dn-footer-column-toggle-icon--open" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`dn-footer-column-links ${
            isShow ? "dn-footer-column-links--open" : ""
          }`}
        >
          {links.map((link, index) => (
            <button
              key={index}
              onClick={() => setcomingSoon(true)}
              className="dn-footer-column-link dn-footer-column-link--button"
            >
              <span className="dn-footer-column-link-text">{link.text}</span>
              <span className="dn-footer-column-link-arrow">→</span>
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
