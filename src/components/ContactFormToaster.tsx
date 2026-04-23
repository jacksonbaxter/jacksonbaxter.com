"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ContactFormToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      className="mt-12"
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
