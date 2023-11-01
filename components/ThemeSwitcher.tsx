"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (theme === "system" && systemTheme) {
      setTheme(systemTheme);
    }
    setMounted(true);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="fixed bottom-3 right-3 p-4 text-white bg-slate-900 rounded-full dark:bg-white dark:text-slate-900"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <HiMoon className="w-5 h-5" />
      ) : (
        <HiSun className="w-5 h-5" />
      )}
    </button>
  );
};
