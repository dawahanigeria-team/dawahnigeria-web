import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { CHARTS, LECTURERS, NEW, TRENDING, VIDEO } from "../../../utils/routes/constants";
import "./footerColumn.scss";

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
    <div className="dn-footer-column">
      <div className="dn-footer-column-header">
        <h2 className="dn-footer-column-title">Explore</h2>
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
        {links.map(({ to, text }) => (
          <Link
            key={to}
            to={to}
            className="dn-footer-column-link"
          >
            <span className="dn-footer-column-link-text">{text}</span>
            <span className="dn-footer-column-link-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
