import { rgb } from "pdf-lib";

export const baseStyles = {
  font: "Helvetica",
  fontSize: {
    name: 24,
    heading: 12,
    body: 10,
  },
  colors: {
    primary: rgb(0.2, 0.2, 0.2), // hop pink
    textLight: rgb(0.2, 0.2, 0.2),
    textDark: rgb(1, 1, 1),
    backgroundLight: rgb(1, 1, 1),
    backgroundDark: rgb(0.1, 0.1, 0.1),
  },
  spacing: {
    sectionGap: 30,
    lineGap: 12,
  },
};

export type ThemeMode = "light" | "dark";

export const getTheme = (mode: ThemeMode) => ({
  ...baseStyles,
  currentText: mode === "light" ? baseStyles.colors.textLight : baseStyles.colors.textDark,
  currentBg: mode === "light" ? baseStyles.colors.backgroundLight : baseStyles.colors.backgroundDark,
});
