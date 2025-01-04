"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const NavbarDetailsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update login status
  }, []);

  // Handle logout by removing the token from localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update login status
  };

  // Toggle dark mode

  return (
    <header className={`w-full py-4  bg-[#ededed] z-50 shadow-md`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Ekramul Portfolio</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 hidden md:block">
          {/* Dark Mode Toggle */}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarDetailsPage;
