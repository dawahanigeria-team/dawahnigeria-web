import React, { useState } from "react";
import "./footer.scss";
import apple from "../../assets/svg/apple.svg";
import googleplay from "../../assets/svg/googleplay.svg";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import Explore from "./footermodals/explore";
import {
  AiOutlineCopyrightCircle,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import ForUser from "./footermodals/forUser";
import ForRp from "./footermodals/forRps";
import Company from "./footermodals/company";
import ComingSoon from "../comingsoon/comingSoon";

const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <footer className="dn-footer">
        <div className="dn-footer-pattern" aria-hidden="true"></div>
        <div className="dn-footer-gradient" aria-hidden="true"></div>

        <div className="dn-footer-container">
          <div className="dn-footer-content">
            {/* Main Footer Grid */}
            <div className="dn-footer-grid">
              <Explore />
              <ForUser />
              <ForRp />
              <Company />

              {/* App Downloads & Social */}
              <div className="dn-footer-apps-social">
                <div className="dn-footer-apps">
                  <h3 className="dn-footer-apps-title">Download Our App</h3>
                  <div className="dn-footer-app-buttons">
                    <button
                      type="button"
                      aria-label="Download app on App Store"
                      onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        setShowComingSoon(true);
                      }}
                      className="dn-footer-app-button"
                    >
                      <img
                        className="dn-footer-app-img"
                        src={apple}
                        alt="Download on App Store"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="Download app on Google Play"
                      onClick={(e) => {
                        e.nativeEvent.stopImmediatePropagation();
                        setShowComingSoon(true);
                      }}
                      className="dn-footer-app-button"
                    >
                      <img
                        className="dn-footer-app-img"
                        src={googleplay}
                        alt="Get it on Google Play"
                      />
                    </button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="dn-footer-social">
                  <h3 className="dn-footer-social-title">Connect With Us</h3>
                  <div className="dn-footer-social-links">
                    <SocialLink
                      href="https://web.facebook.com/dawahnigeria"
                      icon={<FaFacebook />}
                      label="Facebook"
                    />
                    <SocialLink
                      href="https://twitter.com/dawahnigeria"
                      icon={<AiOutlineTwitter />}
                      label="Twitter"
                    />
                    <SocialLink
                      href="https://www.instagram.com/dawahnigeria/"
                      icon={<AiFillInstagram />}
                      label="Instagram"
                    />
                    <SocialLink
                      href="https://www.youtube.com/@DawahNigeria"
                      icon={<FaYoutube />}
                      label="YouTube"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="dn-footer-divider" aria-hidden="true">
              <div className="dn-footer-divider-line"></div>
              <div className="dn-footer-divider-accent"></div>
            </div>

            {/* Copyright */}
            <div className="dn-footer-copyright">
              <div className="dn-footer-copyright-content">
                <AiOutlineCopyrightCircle className="dn-footer-copyright-icon" />
                <span className="dn-footer-copyright-year">
                  {new Date().getFullYear()}
                </span>
                <span className="dn-footer-copyright-text">
                  Dawah Nigeria. All rights reserved.
                </span>
              </div>
              <div className="dn-footer-copyright-tagline">
                Empowering minds through Islamic knowledge
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showComingSoon && (
        <ComingSoon
          comingSoon={showComingSoon}
          setcomingSoon={setShowComingSoon}
        />
      )}
    </>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="dn-footer-social-link"
    aria-label={label}
  >
    <div className="dn-footer-social-icon-bg"></div>
    <div className="dn-footer-social-icon">
      {icon}
    </div>
  </a>
);

export default Footer;
