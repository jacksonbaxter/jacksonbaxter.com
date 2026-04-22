"use client";

import { ThemeProvider, useTheme } from "next-themes";
import React, { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <ThemeColorUpdater />
      {children}
    </ThemeProvider>
  );
}

function ThemeColorUpdater() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const timerId = setTimeout(() => {
      const bodyStyles = window.getComputedStyle(document.body);
      const backgroundColor = bodyStyles.backgroundColor;

      let metaThemeColor = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]',
      );

      if (metaThemeColor) {
        metaThemeColor.content = backgroundColor;
      } else {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.name = "theme-color";
        metaThemeColor.content = backgroundColor;
        document.head.appendChild(metaThemeColor);
      }
    }, 0);

    return () => clearTimeout(timerId);
  }, [resolvedTheme]);

  return null;
}
