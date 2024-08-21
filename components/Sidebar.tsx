import React, { useState } from 'react';
import { FiHome, FiDollarSign, FiSettings, FiCpu, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const menuItems = [
  { icon: FiHome, text: 'Dashboard', href: '/' },
  { icon: FiDollarSign, text: 'Accounting', href: '/accounting' },
  { icon: FiCpu, text: 'Bot Manager', href: '/bot-manager' },
  { icon: FiSettings, text: 'Settings', href: '/settings' },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>TradingBot</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link href={item.href} className={`flex items-center p-2 hover:bg-gray-800 rounded transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
                <item.icon className="w-6 h-6" />
                <span className={`ml-4 ${isCollapsed ? 'hidden' : 'block'}`}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 bg-blue-800 text-white p-2 rounded-full shadow-lg transition-transform duration-200 hover:bg-blue-600 focus:outline-none"
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
    </div>
  );
};

export default Sidebar;