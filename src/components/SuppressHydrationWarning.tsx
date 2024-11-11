"use client";
import { useEffect } from "react";

export function SuppressHydrationWarning() {
  useEffect(() => {
    const originalError = console.error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error = (...args: any[]) => {
      if (args[0].includes("Hydration")) return;
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
