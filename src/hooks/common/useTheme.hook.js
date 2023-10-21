import { useEffect } from "react";
import { useSelector } from "react-redux";

export function useThemeHook() {
  const { theme } = useSelector((state) => state.user);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
}
