import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Scrolltotop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default Scrolltotop;
