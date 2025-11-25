import React, { createContext, useState } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme || "light");
  const [daltonismType, setDaltonismType] = useState("normal");

  const baseColors = {
    light: {
      background: "#f9f9f9",
      card: "#fff",
      text: "#1c1c1c",
      muted: "#555",
      primary: "#007bff",
      danger: "#ff4d4f",
    },
    dark: {
      background: "#121212",
      card: "#1e1e1e",
      text: "#fff",
      muted: "#aaa",
      primary: "#0d6efd",
      danger: "#ff4d4f",
    },
  };

  const applyDaltonism = (color) => {
    if (daltonismType === "normal") return color;
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    switch (daltonismType) {
      case "protanopia": r = 0; break;
      case "deuteranopia": g = 0; break;
      case "tritanopia": b = 0; break;
      default: break;
    }

    return `rgb(${r}, ${g}, ${b})`;
  };

  const colors = {
    light: Object.fromEntries(Object.entries(baseColors.light).map(([k, v]) => [k, applyDaltonism(v)])),
    dark: Object.fromEntries(Object.entries(baseColors.dark).map(([k, v]) => [k, applyDaltonism(v)])),
  };

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        daltonismType,
        setDaltonismType,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
