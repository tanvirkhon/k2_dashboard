import React from "react";
import {
  FiHome,
  FiDollarSign,
  FiSettings,
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  { icon: FiHome, text: "Dashboard", href: "/" },
  { icon: FiDollarSign, text: "Accounting", href: "/accounting" },
  { icon: FiCpu, text: "Bot Manager", href: "/bot-manager" },
  { icon: FiSettings, text: "Settings", href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-800 text-gray-100 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
          TradingBot
        </h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => {
            const isActive = router.pathname === item.href;
            return (
              <li key={index} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 ${
                    !isOpen ? "justify-center" : ""
                  } ${isActive ? "bg-indigo-600 text-white" : ""}`}>
                  <item.icon className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                    {item.text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 bg-indigo-600 text-white p-2 rounded-full shadow-lg transition-transform duration-200 hover:bg-indigo-700 focus:outline-none">
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </button>
    </div>
  );
};

export default Sidebar;
