import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingOptions.scss";

const LandingOptions = ({ icon, img, text, link }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate(link);
      }}
      className="landop_wrapper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dncolor-500 focus-visible:ring-offset-2 rounded-md"
      aria-label={`Go to ${text}`}
    >
      <div className="landop_widget">
        {icon ? (
          icon
        ) : (
          <div className="landop_pics">
            <img
              className="w-full h-full"
              src={img}
              alt={`${text} icon`}
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
      <div className="landop_text text-color">{text}</div>
    </button>
  );
};

export default LandingOptions;
