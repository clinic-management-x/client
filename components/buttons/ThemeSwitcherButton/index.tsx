import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitcherButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    ></button>
  );
};

export default ThemeSwitcherButton;
