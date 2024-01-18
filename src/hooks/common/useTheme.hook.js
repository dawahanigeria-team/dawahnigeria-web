import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../Redux/Actions/ActionCreators";

export function useThemeHook() {
  const { theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
 

  function onWindowMatch() {
    if (theme === "dark" || darkQuery.matches) {
      dispatch(setTheme("dark"));
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      dispatch(setTheme("light"));
    }
  }

  useEffect(() => {
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
  }, [theme]);

  return { darkQuery: darkQuery.matches };
}
