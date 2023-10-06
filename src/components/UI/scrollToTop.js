import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Scrolltotop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
   if (typeof window !== 'undefined' && window.scrollTo) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  }, [pathname]);
}

  return null;
};

export default Scrolltotop;
