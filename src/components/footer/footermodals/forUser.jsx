import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import ComingSoon from "../../comingsoon/comingSoon";
import "./footerColumn.scss";

const ForUser = () => {
  const [isShow, setshow] = useState(false);
  const [comingSoon, setcomingSoon] = useState(false);

  const links = [
    { text: "Download", onClick: () => setcomingSoon(true) },
    { text: "Help Centre", onClick: () => setcomingSoon(true) },
    { text: "Login/Signup", to: "/auth/login" },
    { text: "Playlist", to: "/playlist" },
  ];

  return (
    <>
      <div className="dn-footer-column">
        <div className="dn-footer-column-header">
          <h2 className="dn-footer-column-title">For Users</h2>
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
                <Link
                  to={link.to}
                  className="dn-footer-column-link"
                >
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

export default ForUser;
