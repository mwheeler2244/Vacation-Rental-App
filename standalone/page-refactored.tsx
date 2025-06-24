"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Listing, AlertConfig, BookingDates } from "./types";
import { listings as mockListings } from "./data/mockData";

// Component imports
import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import SearchAndFilters from "./components/SearchAndFilters";
import ListingsGrid from "./components/ListingsGrid";
import Alert from "./components/Alert";
import Footer from "./components/Footer";

const inlineStyles = `
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground-rgb: 255, 255, 255;
      --background-start-rgb: 0, 0, 0;
      --background-end-rgb: 0, 0, 0;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

export default function EnterpriseTravel() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [theme, setTheme] = useState("light");

  // UI State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showHostDashboard, setShowHostDashboard] = useState(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Booking State
  const [bookingDates, setBookingDates] = useState<BookingDates>({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuests] = useState(1);

  // App State
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  // Alert State
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    message: "",
    type: "success",
    icon: undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setShowBookingModal(true);
  };

  const handleBookNow = () => {
    showCustomAlert({
      message: `Booking confirmed for ${selectedListing?.title}!`,
      type: "success",
      icon: undefined,
    });
    setShowBookingModal(false);
    setSelectedListing(null);
  };

  const showCustomAlert = (config: AlertConfig) => {
    setAlertConfig(config);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Filter listings based on search and category
  const filteredListings = mockListings.filter(
    (listing) =>
      (activeCategory === "all" || listing.category === activeCategory) &&
      (searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading || !isLoaded) {
    return <LoadingSpinner theme={theme} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <style jsx global>
        {inlineStyles}
      </style>

      <Header
        theme={theme}
        isScrolled={isScrolled}
        activeTab={activeTab}
        notifications={notifications}
        showNotifications={showNotifications}
        isMenuOpen={isMenuOpen}
        showCustomAlert={showCustomAlert}
        setTheme={setTheme}
        setActiveTab={setActiveTab}
        setNotifications={setNotifications}
        setShowNotifications={setShowNotifications}
        setIsMenuOpen={setIsMenuOpen}
        setShowUserDashboard={setShowUserDashboard}
        setShowHostDashboard={setShowHostDashboard}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === "explore" &&
          !showUserDashboard &&
          !showHostDashboard && (
            <>
              <SearchAndFilters
                theme={theme}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                isSignedIn={isSignedIn}
                userName={user?.firstName || undefined}
                setSearchQuery={setSearchQuery}
                setActiveCategory={setActiveCategory}
              />

              <ListingsGrid
                theme={theme}
                listings={filteredListings}
                onListingClick={handleListingClick}
              />
            </>
          )}

        {activeTab === "news" && !showUserDashboard && !showHostDashboard && (
          <div className="mb-16">
            <h2 className="text-xl font-medium mb-6">Market Insights</h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              News section component would go here...
            </p>
          </div>
        )}

        {showUserDashboard && (
          <div className="mb-16">
            <h2 className="text-xl font-medium mb-6">My Trips</h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              User dashboard component would go here...
            </p>
          </div>
        )}

        {showHostDashboard && (
          <div className="mb-16">
            <h2 className="text-xl font-medium mb-6">My Properties</h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Host dashboard component would go here...
            </p>
          </div>
        )}
      </main>

      <Footer theme={theme} showCustomAlert={showCustomAlert} />

      <Alert
        showAlert={showAlert}
        alertConfig={alertConfig}
        theme={theme}
        onClose={() => setShowAlert(false)}
      />

      {/* Booking Modal would go here - extracted as separate component */}
      {showBookingModal && selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-8">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          />
          <div
            className={`relative w-full max-w-md rounded-lg p-6 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            } shadow-xl`}
          >
            <h3 className="text-lg font-medium mb-4">
              {selectedListing.title}
            </h3>
            <p
              className={`text-sm mb-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              This is a simplified booking modal. In the full implementation,
              this would be extracted as a separate BookingModal component.
            </p>
            <div className="flex space-x-3">
              <button
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
