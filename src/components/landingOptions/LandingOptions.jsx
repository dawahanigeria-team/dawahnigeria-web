import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingOptions.scss";

const LandingOptions = ({ icon, img, text, link }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(link);
      }}
      className="landop_wrapper "
    >
      <div className="landop_widget">
        {icon ? (
          icon
        ) : (
          <div className="landop_pics ">
            <img className="w-full h-full" src={img} alt="" />
          </div>
        )}
      </div>
      <div className="landop_text">{text}</div>
    </div>
  );
};

export default LandingOptions;
