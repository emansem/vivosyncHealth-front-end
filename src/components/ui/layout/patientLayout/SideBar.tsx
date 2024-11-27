"use client";
import Logo from "@/src/components/CompanyLogo";
import Link from "next/link";
import {
  LayoutDashboard,
  UserPlus,
  MessageSquare,
  WalletCards,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  UsersRound,
  X,
  Bot
} from "lucide-react";

import React from "react";
import { usePathname } from "next/navigation";
import { NavlinkProps, OpensideBar } from "@/src/types/sideBartypes";
//Navbar css styles
// At the top of your file
const styles = {
  menuList:
    "pl-3 py-3 rounded-lg hover:bg-light_darkbg transition-colors ease-linear duration-200 group",
  menuItem: "flex items-center gap-4",
  menuText: "text-white_color1 font-medium text-[18px]",
  activeLink: "bg-light_darkbg"
} as const;

//Navbar menus styles and text , icons
const Navlink = ({ link, Icon, children }: NavlinkProps) => {
  //Check if the pathname is equal to the link and give it a active link class
  const pathName = usePathname();
  const isActive = pathName === link;
  return (
    <li className={`${styles.menuList} ${isActive ? styles.activeLink : ""}`}>
      <a href={link}>
        <p className={styles.menuItem}>
          <Icon size={24} color={"#a8a29e"} />
          <span className={styles.menuText}>{children}</span>
        </p>
      </a>
    </li>
  );
};

//Navbar links
const SideBarMenus = () => {
  return (
    <ul className={`flex flex-col py-5 h-full  justify-between`}>
      <div className="flex flex-col gap-2">
        <Navlink Icon={LayoutDashboard} link="/patient/find-doctor">
          Overview
        </Navlink>
        <Navlink Icon={UsersRound} link="/patient/subscription">
          Subscriptions
        </Navlink>
        <Navlink Icon={UserPlus} link="/patient/referral">
          Referral
        </Navlink>
        <Navlink Icon={MessageSquare} link="/doctor/messages">
          Messages
        </Navlink>
        <Navlink Icon={Bot} link="/patient/ai-chat">
          Ai Assistant
        </Navlink>
        <Navlink Icon={CreditCard} link="/doctor/transaction">
          Transactions
        </Navlink>
        <Navlink Icon={WalletCards} link="/doctor/withdrawal">
          Withdrawal
        </Navlink>
        <Navlink Icon={Settings} link="/doctor/update-profile">
          Settings
        </Navlink>
        <Navlink Icon={HelpCircle} link="/hello">
          Help
        </Navlink>
      </div>
      <div className="">
        <li className={` cursor-pointer ${styles.menuList}`}>
          <p className={styles.menuItem}>
            <LogOut size={24} color={"#a8a29e"} />
            <span className={styles.menuText}> Log out</span>
          </p>
        </li>
      </div>
    </ul>
  );
};

function SideBar({ isOpen, handleCloseSideBarMenu, modalRef }: OpensideBar) {
  return (
    <div
      ref={modalRef}
      className={`  bg-darrk_color ${
        isOpen ? "flex" : "hidden"
      } p-4 h-full fixed bottom-0  z-40 top-0 w-[300px] md:flex  left-0  flex-col overflow-y-auto`}
    >
      <div className="w-[250px]  gap-3 flex items-center">
        <Logo />
        <div
          onClick={handleCloseSideBarMenu}
          className="md:hidden cursor-pointer"
        >
          <X size={30} color="#269c65" fontWeight={600} />
        </div>
      </div>
      {/* Main menu */}
      <div className="flex-1">
        <SideBarMenus />
      </div>
    </div>
  );
}

export default SideBar;
