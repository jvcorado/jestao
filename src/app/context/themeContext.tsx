"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    cardBackground: string;
    divideCard: string;
    expenseCard: string;
    friendsCard: string;
    historyCard: string;
    logoutButton: string;
    saveButton: string;
    moonIcon: string;
    divideIcon: string;
    expenseIcon: string;
    friendsIcon: string;
    historyIcon: string;
    divideText: string;
    expenseText: string;
    friendsText: string;
    historyText: string;
    buttonBackground: string;
  };
}

const lightColors = {
  background: "#ffffff",
  surface: "#f9f9f9",
  text: "#000000",
  textSecondary: "#666666",
  border: "#e0e0e0",
  primary: "#C8F05B",
  cardBackground: "#ffffff",
  divideCard: "#DEF3FA",
  expenseCard: "#f0afab",
  friendsCard: "#E1F7DD",
  historyCard: "#FFF5C0",
  logoutButton: "#FA483A",
  saveButton: "#4CAF50",
  moonIcon: "#DADADA",
  divideIcon: "#000000",
  expenseIcon: "#000000",
  friendsIcon: "#000000",
  historyIcon: "#000000",
  divideText: "#000000",
  expenseText: "#000000",
  friendsText: "#000000",
  historyText: "#000000",
  buttonBackground: "#ffffff",
};

const darkColors = {
  background: "#1E1E1E",
  surface: "#2A2A2A",
  text: "#FFFFFF",
  textSecondary: "#CCCCCC",
  border: "#404040",
  primary: "#C8F05B",
  cardBackground: "#2A2A2A",
  divideCard: "#2A2A2A",
  expenseCard: "#2A2A2A",
  friendsCard: "#2A2A2A",
  historyCard: "#2A2A2A",
  logoutButton: "#FA483A",
  saveButton: "#4CAF50",
  moonIcon: "#FFD700",
  divideIcon: "#DEF3FA",
  expenseIcon: "#f0afab",
  friendsIcon: "#E1F7DD",
  historyIcon: "#FFF5C0",
  divideText: "#DEF3FA",
  expenseText: "#f0afab",
  friendsText: "#E1F7DD",
  historyText: "#FFF5C0",
  buttonBackground: "rgba(255, 255, 255, 0.1)",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadThemePreference = () => {
      try {
        const savedTheme = localStorage.getItem("themePreference");
        if (savedTheme) {
          setIsDark(savedTheme === "dark");
        } else {
          // Se não há preferência salva, usa o tema do sistema
          setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
        setIsDark(false);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      localStorage.setItem("themePreference", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
