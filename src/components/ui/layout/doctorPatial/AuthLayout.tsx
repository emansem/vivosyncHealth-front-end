"use client";
import React from "react";
//Layout for public pages like home, about, and contact us page
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between h-14 bg-light_darkbg">
        <h1> LOGO</h1>
        <p>ITem</p>
      </div>
      <main className="w-full mx-auto py-4 md:px-0">{children}</main>
    </div>
  );
}
