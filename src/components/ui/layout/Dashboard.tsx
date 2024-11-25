"use client";

import React, { useEffect, useMemo } from "react";
import SideBar from "./patails/SideBar";
import Header from "./patails/Header";
import useGeneralHook from "@/src/hooks/useGeneralHook";
import { useGetUser } from "@/src/hooks/serviceHook";
import axios from "axios";
import toast from "react-hot-toast";
interface ErrorApiResponse {
  message: string;
  status: string;
  redirectUrl: string;
}

//Dashboard layout and some inner pages main the user thats protected routes layout

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { handleToggleOPenMenu, isOpen, elementRef, handleCloseSideBarMenu } =
    useGeneralHook();
  const { error, isLoading } = useGetUser();
  useEffect(() => {
    if (axios.isAxiosError(error)) {
      const { message, redirectUrl } = error.response?.data as ErrorApiResponse;
      toast.error(message);
      window.location.href = `${redirectUrl}`;
      return;
    }
  }, [error]);
  if (isLoading) return <div>loading....</div>;
  return (
    <div className="min-h-screen">
      {/* HEADER NAVIGATION*/}
      <Header handleToggleOPenMenu={handleToggleOPenMenu} />
      {/* Sidebar */}
      <SideBar
        modalRef={elementRef}
        isOpen={isOpen}
        handleCloseSideBarMenu={handleCloseSideBarMenu}
      />

      {/* Main content */}
      <main className="pt-24 md:ml-[320px] px-3  md:pl-4 md:pr-8">
        {children}
      </main>
      <footer className=" md:ml-[320px] mt-10 max-w-7xl flex justify-center  text-base text-text_color2 font-medium ">
        <div className="flex items-center flex-col md:flex-row  gap-2 justify-between md:gap-11">
          <p>Copy right {new Date().getUTCFullYear()} All right reserved</p>
          <ul className="flex text-sm md:text-base items-center gap-3 cursor-pointer">
            <li>Terms and conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
