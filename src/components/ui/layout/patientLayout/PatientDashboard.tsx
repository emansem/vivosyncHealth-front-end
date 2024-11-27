"use client";

import useGeneralHook from "@/src/hooks/useGeneralHook";
import Header from "./Header";
import SideBar from "./SideBar";

export default function PatientDashboard({
  children
}: {
  children: React.ReactNode;
}) {
  const { handleToggleOPenMenu, isOpen, elementRef, handleCloseSideBarMenu } =
    useGeneralHook();

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
      <main className="pt-16 md:ml-[320px] px-3  md:pl-4 md:pr-8">
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
