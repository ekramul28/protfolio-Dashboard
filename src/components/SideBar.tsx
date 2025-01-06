"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items array
  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "AddBlog", href: "/dashboard/addBlog" },
    { name: "AddSkill", href: "/dashboard/addSkill" },
    { name: "AddProject", href: "/dashboard/addProject" },
    { name: "Delete&UpdateSkill", href: "/dashboard/deleteUpdateSkill" },
    { name: "Delete&UpdateProject", href: "/dashboard/deleteUpdateProject" },
    { name: "BlogUpdateAndDelete", href: "/dashboard/BlogUpdateAndDelete" },
  ];

  return (
    <div>
      {/* Mobile Sidebar Toggle Button */}
      <div className="sm:hidden">
        <div className="top-4 right-4 z-50 fixed">
          <button onClick={toggleSidebar} className="p-2 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar Content */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 transform bg-white transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 sm:flex sm:h-screen sm:flex-col sm:justify-between border-e`}
      >
        <div className="px-4 py-6">
          {/* Sidebar Header */}
          <span className="block h-10 w-32 place-content-center rounded-lg text-xs text-gray-600">
            <div className="h-12 mt-4 ml-3">
              <h1 className="h-12 w-12 font-bold text-2xl">
                <Link href={"/"}>Ekramul</Link>
              </h1>
            </div>
          </span>

          {/* Navigation Links */}
          <ul className="mt-6 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-blue-500 block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                      : "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SideBar;
