import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeManager = () => {
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    console.log("Current theme:", theme);

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      console.log("Dark class added:", root.classList.contains("dark"));
    } else {
      root.classList.remove("dark");
      console.log("Dark class removed");
    }
  }, [theme]);

  return null;
};

export default ThemeManager;
