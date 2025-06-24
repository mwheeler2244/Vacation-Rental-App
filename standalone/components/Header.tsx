"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { AlertConfig } from "../types";

interface HeaderProps {
  theme: string;
  isScrolled: boolean;
  activeTab: string;
  notifications: number;
  showNotifications: boolean;
  isMenuOpen: boolean;
  showCustomAlert: (config: AlertConfig) => void;
  setTheme: (theme: string) => void;
  setActiveTab: (tab: string) => void;
  setNotifications: (count: number) => void;
  setShowNotifications: (show: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  setShowUserDashboard: (show: boolean) => void;
  setShowHostDashboard: (show: boolean) => void;
}

export default function Header({
  theme,
  isScrolled,
  activeTab,
  notifications,
  showNotifications,
  isMenuOpen,
  showCustomAlert,
  setTheme,
  setActiveTab,
  setNotifications,
  setShowNotifications,
  setIsMenuOpen,
  setShowUserDashboard,
  setShowHostDashboard,
}: HeaderProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    firstName: "Guest",
    primaryEmailAddress: { emailAddress: "guest@example.com" },
  });
  const headerRef = useRef(null);

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUser({
      firstName: "Guest",
      primaryEmailAddress: { emailAddress: "guest@example.com" },
    });
    showCustomAlert({
      message: "Successfully signed out!",
      type: "success",
    });
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setUser({
      firstName: "John",
      primaryEmailAddress: { emailAddress: "john@example.com" },
    });
    showCustomAlert({
      message: "Successfully signed in!",
      type: "success",
    });
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${
              theme === "dark"
                ? "bg-gray-900/95 backdrop-blur-md shadow-md shadow-gray-800/10"
                : "bg-white/95 backdrop-blur-md shadow-md shadow-gray-200/20"
            }`
          : `${theme === "dark" ? "bg-gray-900" : "bg-white"}`
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`w-8 h-8 rounded-md ${
                theme === "dark" ? "bg-white" : "bg-black"
              } flex items-center justify-center mr-2`}
            >
              <Home
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-black" : "text-white"
                }`}
              />
            </div>
            <span className="text-xl font-medium">Venture</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                activeTab === "explore"
                  ? `${
                      theme === "dark"
                        ? "bg-gray-800 text-white "
                        : "bg-gray-100 text-gray-900"
                    }`
                  : "text-gray-500 "
              }`}
              onClick={() => (window.location.href = "/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore
            </motion.button>
            <motion.button
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                activeTab === "news"
                  ? `${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`
                  : "text-gray-500 "
              }`}
              onClick={() => {
                setActiveTab("news");
                setShowUserDashboard(false);
                setShowHostDashboard(false);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Insights
            </motion.button>
            <motion.button
              className={`cursor-pointer  px-4 py-2 rounded-md transition-colors ${
                activeTab === "trips"
                  ? `${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`
                  : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("trips");
                setShowUserDashboard(true);
                setShowHostDashboard(false);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              My Trips
            </motion.button>
            <motion.button
              className={`cursor-pointer  px-4 py-2 rounded-md transition-colors ${
                activeTab === "hosting"
                  ? `${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`
                  : "text-gray-500 "
              }`}
              onClick={() => {
                setActiveTab("hosting");
                setShowHostDashboard(true);
                setShowUserDashboard(false);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Properties
            </motion.button>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              className={`cursor-pointer p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <button
                className={`cursor-pointer p-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
              </button>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}

              {showNotifications && (
                <motion.div
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div
                    className={`p-4 border-b ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button
                        className={`cursor-pointer text-xs font-medium ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-black"
                        }`}
                        onClick={() => setNotifications(0)}
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    <div
                      className={`p-4 border-b ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Booking confirmed
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Your booking for Waterfront Modern Villa has been
                            confirmed.
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            } mt-1`}
                          >
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-b ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Premium member offer
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Get 15% off your next executive booking with code
                            EXEC15.
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            } mt-1`}
                          >
                            1 day ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-b ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      } cursor-pointer transition-colors`}
                    >
                      <div className="flex items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            New market analysis
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Check out our latest analysis: &quot;Top Business
                            Travel Destinations for 2025&quot;.
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            } mt-1`}
                          >
                            3 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 text-center ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <button
                      className={`cursor-pointer text-sm font-medium ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                      onClick={() =>
                        showCustomAlert({
                          message: "No more notifications",
                          type: "info",
                        })
                      }
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {isSignedIn ? (
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <button
                  className={`cursor-pointer flex items-center space-x-2 p-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="w-5 h-5" />
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>

                {isMenuOpen && (
                  <motion.div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium">{user?.firstName || "User"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <button
                      className={`cursor-pointer block px-4 py-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setShowUserDashboard(true);
                        setShowHostDashboard(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="cursor-pointer flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </div>
                    </button>
                    <button
                      className={`cursor-pointer block px-4 py-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setShowHostDashboard(true);
                        setShowUserDashboard(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-2" />
                        My Properties
                      </div>
                    </button>
                    <button
                      className={`cursor-pointer block px-4 py-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setNotifications(0);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </div>
                    </button>
                    <button
                      className={`cursor-pointer block px-4 py-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </div>
                    </button>
                    <div
                      className={`border-t ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      } my-1`}
                    ></div>
                    <button
                      className={`cursor-pointer block px-4 py-2 text-sm w-full text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                      </div>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignIn}
                >
                  Log in
                </motion.button>
                <motion.button
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignIn}
                >
                  Sign up
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
