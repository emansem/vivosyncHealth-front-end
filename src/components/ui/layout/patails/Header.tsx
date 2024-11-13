"use client";
import React from "react";
import { inter } from "@/app/lib/fonts";
import { Bell, LogOut, MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useGeneralHook from "@/src/hooks/useGeneralHook";

const profileDropDownMenuStyle = {
  profileDropDownItem: `-bottom-[130px] rounded-md shadow-shadow4 w-full bg-white left-0 py-4 absolute`,
  profileDropDownListItem: `px-6 flex item-center gap-3 text-[18px] text-text_color1 font-medium cursor-pointer hover:bg-stone-100 py-2 transition-all duration-200 ease-linear`
};
interface OpensideBar {
  handleToggleOPenMenu: React.MouseEventHandler<HTMLDivElement>;
}

//Profile drop down menu
const ProfileDropDownMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`${profileDropDownMenuStyle.profileDropDownItem} ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <ul className="flex flex-col ">
        <Link href="/">
          <li className={`${profileDropDownMenuStyle.profileDropDownListItem}`}>
            <User size={22} />
            <span>Profile</span>
          </li>
        </Link>

        <li className={`${profileDropDownMenuStyle.profileDropDownListItem}`}>
          <LogOut />
          <span>logout</span>
        </li>
      </ul>
    </div>
  );
};

//User profile avata image
const UserAvater = () => {
  const { elementRef, handleDropDownToggle, openProfileMenu } =
    useGeneralHook();
  return (
    <div
      ref={elementRef}
      className="flex items-center cursor-pointer gap-2 relative"
      onClick={handleDropDownToggle}
    >
      <div className="relative cursor-pointer w-8 h-8 min-w-12 min-h-12  md:w-12 md:h-12 rounded-full overflow-hidden">
        <Image
          src="https://i.postimg.cc/026P6nxK/image.jpg"
          alt="Dr eman sem"
          fill
          sizes="70px"
          className="object-cover"
        />
      </div>

      <span className="text-base text-text_color1 hover:text-stone-600  font-medium">
        Dr.Eman sem
      </span>
      {/*drop down menu*/}
      <ProfileDropDownMenu isOpen={openProfileMenu} />
    </div>
  );
};

function Header({ handleToggleOPenMenu }: OpensideBar) {
  return (
    <div
      suppressHydrationWarning
      className={`px-8 py-4 left-0 md:left-[300px] z-30 fixed right-0 top-0 bg-white ${inter.className}`}
    >
      <div className="flex justify-between items-center h-full ">
        <div
          onClick={handleToggleOPenMenu}
          className="cursor-pointer md:hidden"
        >
          <MenuIcon size={30} color="#44403e" />
        </div>
        <h1 className=" hidden md:block   md:text-3xl font-semibold text-stone-700">
          Dashboard
        </h1>
        <div className="flex items-center  gap-10">
          <li className="cursor-pointer relative hover:bg-light_color p-1.5 rounded-full transition-all duration-300 ease-linear">
            <Bell size={28} color="#78716c" />
            <p className="absolute bg-red-500 rounded-full flex items-center justify-center  min-h-6  h-6 w-6 min-w-6 -top-1 right-0">
              <span className="text-[12px] text-white font-medium p-1">20</span>
            </p>
          </li>
          <UserAvater />
        </div>
      </div>
    </div>
  );
}

export default Header;
