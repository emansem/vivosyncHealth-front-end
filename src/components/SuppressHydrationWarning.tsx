"use client";

import { useEffect } from "react";

export function SuppressHydrationWarning() {
  useEffect(() => {
    const originalError = console.error;

    const isHydrationError = (arg: unknown): boolean => {
      if (typeof arg === "string") {
        return arg.includes("Hydration");
      }

      if (arg instanceof Error) {
        return arg.message.includes("Hydration");
      }

      // Check for object with message property
      if (arg && typeof arg === "object" && "message" in arg) {
        const message = (arg as { message: unknown }).message;
        return typeof message === "string" && message.includes("Hydration");
      }

      return false;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error = (...args: any[]) => {
      if (args.length > 0 && isHydrationError(args[0])) {
        return;
      }

      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
