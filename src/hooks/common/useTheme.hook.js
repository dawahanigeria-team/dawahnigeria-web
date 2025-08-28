import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../Redux/Actions/ActionCreators";

export function useThemeHook() {
  const { theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Guard against SSR: window is undefined on the server
  const darkQuery =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : { matches: false };
 

  function onWindowMatch() {
    if (theme === "dark" || darkQuery.matches) {
      dispatch(setTheme("dark"));
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add("dark");
      }
    } else {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove("dark");
      }
      dispatch(setTheme("light"));
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      switch (theme) {
        case "dark":
          document.documentElement.classList.add("dark");
          break;
        case "light":
          document.documentElement.classList.remove("dark");
          break;
        default:
          onWindowMatch();
          break;
      }
    }
  }, [theme]);

  return { darkQuery: darkQuery.matches };
}
