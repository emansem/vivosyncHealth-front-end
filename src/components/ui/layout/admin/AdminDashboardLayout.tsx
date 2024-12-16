"use client";
import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  UsersRound,
  X,
  Bell,
  MenuIcon,
  BarChart2,
  Shield,
  Calendar,
  DollarSign,
  Activity,
  Mail,
  CheckCircle,
  ChevronRight,
  ChevronDown
} from "lucide-react";

// Hook for general functionality
const useGeneralHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const elementRef = useRef(null);

  const handleToggleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSideBarMenu = () => {
    setIsOpen(false);
  };

  const handleDropDownToggle = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const toggleSubmenu = (menuId: string) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !(elementRef.current as any).contains(event.target)
      ) {
        setOpenProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    isOpen,
    openProfileMenu,
    activeSubmenu,
    elementRef,
    handleToggleOpenMenu,
    handleCloseSideBarMenu,
    handleDropDownToggle,
    toggleSubmenu
  };
};

// Navigation Menu Structure
const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    link: "/admin/dashboard",
    subItems: [
      {
        title: "Active appointments today",
        link: "/admin/dashboard/appointments"
      },
      { title: "New registrations", link: "/admin/dashboard/registrations" },
      { title: "Revenue metrics", link: "/admin/dashboard/revenue" },
      { title: "System health", link: "/admin/dashboard/health" }
    ]
  },
  {
    id: "users",
    title: "User Management",
    icon: UsersRound,
    link: "/admin/users",
    subItems: [
      { title: "Doctors List", link: "/admin/users/doctors" },
      { title: "Patients List", link: "/admin/users/patients" },
      { title: "User Roles & Permissions", link: "/admin/users/roles" },
      { title: "Subscriptions", link: "/admin/users/subscriptions" }
    ]
  },
  {
    id: "billing",
    title: "Billing & Payments",
    icon: CreditCard,
    link: "/admin/billing",
    subItems: [
      { title: "Transaction History", link: "/admin/billing/transactions" },
      { title: "Payment Processing", link: "/admin/billing/processing" },
      { title: "Refund Management", link: "/admin/billing/refunds" },
      { title: "Financial Reports", link: "/admin/billing/reports" }
    ]
  },
  {
    id: "communication",
    title: "Communication Center",
    icon: MessageSquare,
    link: "/admin/communication",
    subItems: [
      {
        title: "Notifications Management",
        link: "/admin/communication/notifications"
      },
      { title: "Email Templates", link: "/admin/communication/email" },
      { title: "SMS Gateway", link: "/admin/communication/sms" },
      { title: "Support Tickets", link: "/admin/communication/tickets" }
    ]
  },
  {
    id: "doctors",
    title: "Doctor Management",
    icon: UserPlus,
    link: "/admin/doctors",
    subItems: [
      { title: "Verification Queue", link: "/admin/doctors/verification" },
      {
        title: "Specialization Management",
        link: "/admin/doctors/specializations"
      },
      { title: "Schedule Management", link: "/admin/doctors/schedule" },
      { title: "Reviews & Ratings", link: "/admin/doctors/reviews" }
    ]
  },
  {
    id: "settings",
    title: "Settings & Configuration",
    icon: Settings,
    link: "/admin/settings",
    subItems: [
      { title: "System Settings", link: "/admin/settings/system" },
      { title: "Payment Gateway Setup", link: "/admin/settings/payment" },
      {
        title: "Email/SMS Configuration",
        link: "/admin/settings/communication"
      },
      { title: "Backup Management", link: "/admin/settings/backup" }
    ]
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    icon: BarChart2,
    link: "/admin/reports",
    subItems: [
      { title: "User Analytics", link: "/admin/reports/users" },
      { title: "Revenue Reports", link: "/admin/reports/revenue" },
      { title: "Appointment Statistics", link: "/admin/reports/appointments" },
      { title: "Custom Report Generator", link: "/admin/reports/custom" }
    ]
  },
  {
    id: "compliance",
    title: "Compliance & Audit",
    icon: Shield,
    link: "/admin/compliance",
    subItems: [
      { title: "HIPAA Compliance", link: "/admin/compliance/hipaa" },
      { title: "System Access Logs", link: "/admin/compliance/logs" },
      { title: "Data Privacy Settings", link: "/admin/compliance/privacy" },
      { title: "Regulatory Reports", link: "/admin/compliance/reports" }
    ]
  }
];

const styles = {
  menuList:
    "pl-3 py-3 rounded-lg hover:bg-gray-700/50 transition-colors ease-linear duration-200 group",
  menuItem: "flex items-center justify-between",
  menuContent: "flex items-center gap-4",
  menuText: "text-gray-300 font-medium text-[16px]",
  submenuText:
    "text-gray-400 font-medium text-[14px] hover:text-gray-200 transition-colors duration-200",
  activeLink: "bg-gray-700",
  submenuList: "ml-8 mt-2 space-y-1",
  submenuItem:
    "group flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700/30 transition-all duration-200",
  chevron:
    "transition-transform duration-200 text-gray-400 group-hover:text-gray-300"
} as const;

// NavLink Component with Enhanced Submenu Support
interface NavlinkProps {
  item: {
    id: string;
    title: string;
    icon: React.ElementType;
    link: string;
    subItems?: Array<{ title: string; link: string }>;
  };
  activeSubmenu: string | null;
  toggleSubmenu: (menuId: string) => void;
}

const Navlink = ({ item, activeSubmenu, toggleSubmenu }: NavlinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === item.link;
  const isSubmenuOpen = activeSubmenu === item.id;

  return (
    <li className="mb-1">
      <div
        className={`${styles.menuList} ${
          isActive ? styles.activeLink : ""
        } cursor-pointer group`}
        onClick={() => toggleSubmenu(item.id)}
      >
        <div className={styles.menuItem}>
          <div className={styles.menuContent}>
            <item.icon
              size={20}
              className="text-gray-400 group-hover:text-gray-300"
            />
            <span className={styles.menuText}>{item.title}</span>
          </div>
          {item.subItems && (
            <div
              className={`${styles.chevron} ${
                isSubmenuOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={18} />
            </div>
          )}
        </div>
      </div>
      {item.subItems && isSubmenuOpen && (
        <ul className={`${styles.submenuList} animate-slideDown`}>
          {item.subItems.map((subItem, index) => (
            <li key={index}>
              <a href={subItem.link} className={styles.submenuItem}>
                <ChevronRight size={16} className="text-gray-500" />
                <span className={styles.submenuText}>{subItem.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// SideBar Component with Enhanced Styling
const SideBar = ({ isOpen, handleCloseSideBarMenu, modalRef }: any) => {
  const { activeSubmenu, toggleSubmenu } = useGeneralHook();

  return (
    <div
      ref={modalRef}
      className={`bg-[#242634] ${
        isOpen ? "flex" : "hidden"
      } p-4 h-full fixed bottom-0 z-40 top-0 w-[280px] md:flex left-0 flex-col overflow-y-auto border-r border-gray-800`}
    >
      <div className="flex items-center justify-between py-4">
        <div className="text-white font-bold text-xl">Your Logo</div>
        <div
          onClick={handleCloseSideBarMenu}
          className="md:hidden cursor-pointer p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-400" />
        </div>
      </div>
      <div className="flex-1 mt-4">
        <ul className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Navlink
              key={item.id}
              item={item}
              activeSubmenu={activeSubmenu}
              toggleSubmenu={toggleSubmenu}
            />
          ))}
        </ul>
        <div className="mt-8 pt-4 border-t border-gray-800">
          <li className={`cursor-pointer ${styles.menuList}`}>
            <div className={styles.menuContent}>
              <LogOut
                size={20}
                className="text-gray-400 group-hover:text-gray-300"
              />
              <span className={styles.menuText}>Log out</span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

// Enhanced Header Component
const Header = ({
  handleToggleOpenMenu
}: {
  handleToggleOpenMenu: () => void;
}) => {
  const { elementRef, handleDropDownToggle, openProfileMenu } =
    useGeneralHook();

  return (
    <div className="px-6 py-3 left-0 md:left-[280px] z-30 fixed right-0 top-0 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleOpenMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MenuIcon size={24} className="text-gray-600" />
          </button>
          <h1 className="hidden md:block text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
              20
            </span>
          </button>
          <div
            ref={elementRef}
            className="flex items-center gap-3 cursor-pointer relative group"
            onClick={handleDropDownToggle}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/api/placeholder/40/40"
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Admin User
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-500 transition-transform duration-200 ${
                  openProfileMenu ? "rotate-180" : ""
                }`}
              />
            </div>
            {openProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </a>
                <div className="h-px bg-gray-200 my-1"></div>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Layout
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, elementRef, handleToggleOpenMenu, handleCloseSideBarMenu } =
    useGeneralHook();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header handleToggleOpenMenu={handleToggleOpenMenu} />
      <SideBar
        modalRef={elementRef}
        isOpen={isOpen}
        handleCloseSideBarMenu={handleCloseSideBarMenu}
      />
      <main className=" md:ml-[280px] px-4 md:px-6 pb-8">{children}</main>
      <footer className="md:ml-[280px] py-6 px-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} All rights reserved
          </p>
          <ul className="flex items-center gap-6">
            <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              Terms and conditions
            </li>
            <li className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
