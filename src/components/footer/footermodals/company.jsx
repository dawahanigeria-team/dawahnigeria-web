import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import ComingSoon from "../../comingsoon/comingSoon";
import { PRIVACY } from "../../../utils/routes/constants";
import "./footerColumn.scss";

const Company = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);

  const links = [
    { text: "About", onClick: () => setcomingSoon(true) },
    { text: "Contact", onClick: () => setcomingSoon(true) },
    { text: "Advertising", onClick: () => setcomingSoon(true) },
    { text: "News", onClick: () => setcomingSoon(true) },
    { text: "Visual Identity", onClick: () => setcomingSoon(true) },
    { text: "Privacy Policy", to: PRIVACY },
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
            <div key={index}>
              {link.to ? (
                <Link to={link.to} className="dn-footer-column-link">
                  <span className="dn-footer-column-link-text">{link.text}</span>
                  <span className="dn-footer-column-link-arrow">→</span>
                </Link>
              ) : (
                <button
                  onClick={link.onClick}
                  className="dn-footer-column-link dn-footer-column-link--button"
                >
                  <span className="dn-footer-column-link-text">{link.text}</span>
                  <span className="dn-footer-column-link-arrow">→</span>
                </button>
              )}
            </div>
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
