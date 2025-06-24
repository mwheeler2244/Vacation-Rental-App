/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  User,
  X,
  Minus,
  Check,
  Briefcase,
  Map,
} from "lucide-react";

// Dynamic import for framer-motion with fallback
const Motion = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => <div />,
  }
);

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  {
    ssr: false,
    // Loading function doesn't need to provide children as it's handled internally by dynamic
    loading: () => null,
  }
);

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

interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  host: string;
  hostImage: string;
  description: string;
  amenities: string[];
  available: boolean;
}

interface Booking {
  id: number;
  listingId: number;
  dates: string;
  status: string;
  totalPrice: number;
}

interface HostListing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  bookings: number;
  earnings: number;
  image: string;
}

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

interface AlertConfig {
  message: string;
  type: "success" | "info" | "warning";
  icon?: React.ReactNode;
}

export default function EnterpriseTravel() {
  const [theme, setTheme] = useState("light");
  // Check if motion components are loaded
  const [motionLoaded, setMotionLoaded] = useState(false);

  useEffect(() => {
    // Mark motion as loaded once component mounts on client
    setMotionLoaded(true);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showHostDashboard, setShowHostDashboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookingDates, setBookingDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuests] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    message: "",
    type: "success",
    icon: undefined,
  });

  const headerRef = useRef(null);

  const listings: Listing[] = [
    {
      id: 1,
      title: "Waterfront Modern Villa",
      location: "Malibu, California",
      price: 350,
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3174&auto=format&fit=crop",
      category: "beach",
      host: "Sarah Johnson",
      hostImage: "/images/host1.jpg",
      description:
        "Experience luxury living with this stunning beachfront villa. Wake up to panoramic ocean views and fall asleep to the sound of waves.",
      amenities: ["Pool", "Wifi", "Kitchen", "Parking", "Air conditioning"],
      available: true,
    },
    {
      id: 2,
      title: "Urban Executive Loft",
      location: "New York City, NY",
      price: 200,
      rating: 4.7,
      reviews: 95,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2070&q=80",
      category: "city",
      host: "Michael Chen",
      hostImage: "/images/host2.jpg",
      description:
        "Stylish loft in the heart of NYC. Walking distance to major attractions, restaurants, and shopping.",
      amenities: ["Wifi", "Kitchen", "Gym", "Workspace", "Air conditioning"],
      available: true,
    },
    {
      id: 3,
      title: "Alpine Retreat Cabin",
      location: "Aspen, Colorado",
      price: 180,
      rating: 4.8,
      reviews: 112,
      image:
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2940&auto=format&fit=crop",
      category: "mountain",
      host: "Robert Williams",
      hostImage: "/images/host3.jpg",
      description:
        "Escape to this charming cabin nestled in the mountains. Perfect for hiking, skiing, and enjoying nature.",
      amenities: ["Fireplace", "Hot tub", "Wifi", "Kitchen", "Heating"],
      available: true,
    },
    {
      id: 4,
      title: "Historic Luxury Townhouse",
      location: "Boston, Massachusetts",
      price: 230,
      rating: 4.6,
      reviews: 87,
      image:
        "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=2070&q=80",
      category: "city",
      host: "Emma Davis",
      hostImage: "/images/host4.jpg",
      description:
        "Step back in time with this beautifully preserved historic townhouse. Modern amenities with classic charm.",
      amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Heating"],
      available: true,
    },
    {
      id: 5,
      title: "Bali Garden Villa",
      location: "Bali, Indonesia",
      price: 280,
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1974&q=80",
      category: "tropical",
      host: "David Wilson",
      hostImage: "/images/host5.jpg",
      description:
        "Immerse yourself in Balinese culture with this authentic villa. Private pool and lush garden included.",
      amenities: ["Pool", "Wifi", "Kitchen", "Air conditioning", "Garden"],
      available: true,
    },
    {
      id: 6,
      title: "Lakeside Retreat",
      location: "Lake Tahoe, California",
      price: 220,
      rating: 4.8,
      reviews: 103,
      image:
        "https://images.unsplash.com/photo-1724196986351-0aa3834ecf4b?q=80&w=3087&auto=format&fit=crop",
      category: "lake",
      host: "Jennifer Brown",
      hostImage: "/images/host6.jpg",
      description:
        "Peaceful cottage with stunning lake views. Perfect for fishing, boating, and relaxing by the water.",
      amenities: ["Dock", "Wifi", "Kitchen", "Fireplace", "Heating"],
      available: true,
    },
  ];

  const categories = [
    { id: "all", name: "All", icon: <Globe className="w-5 h-5" /> },
    { id: "beach", name: "Beach", icon: <Map className="w-5 h-5" /> },
    { id: "mountain", name: "Mountain", icon: <Map className="w-5 h-5" /> },
    { id: "city", name: "City", icon: <Briefcase className="w-5 h-5" /> },
    { id: "lake", name: "Lake", icon: <Map className="w-5 h-5" /> },
    { id: "tropical", name: "Tropical", icon: <Map className="w-5 h-5" /> },
  ];

  const userBookings: Booking[] = [
    {
      id: 101,
      listingId: 1,
      dates: "Jun 15 - Jun 20, 2025",
      status: "Completed",
      totalPrice: 1750,
    },
    {
      id: 102,
      listingId: 3,
      dates: "Aug 10 - Aug 15, 2025",
      status: "Upcoming",
      totalPrice: 900,
    },
  ];

  const hostListings: HostListing[] = [
    {
      id: 201,
      title: "Your Downtown Apartment",
      location: "Seattle, Washington",
      price: 150,
      rating: 4.7,
      reviews: 65,
      bookings: 12,
      earnings: 1800,
      image:
        "https://plus.unsplash.com/premium_photo-1661963579906-f146cde83bf4?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 202,
      title: "Your Countryside Cottage",
      location: "Vermont",
      price: 120,
      rating: 4.8,
      reviews: 42,
      bookings: 8,
      earnings: 960,
      image:
        "https://images.unsplash.com/photo-1604601638406-edc29b54dcf7?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const newsArticles: NewsArticle[] = [
    {
      id: 301,
      title: "Top Travel Destinations for Business Leaders in 2025",
      excerpt:
        "Discover the most exciting places to visit this year, combining business opportunities with leisure experiences.",
      date: "May 1, 2025",
      category: "Business Travel",
      image:
        "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 302,
      title: "Maximizing Property Investment Returns",
      excerpt:
        "Expert tips and strategies to optimize your property portfolio and increase rental earnings.",
      date: "April 28, 2025",
      category: "Investment",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1473&auto=format&fit=crop",
    },
    {
      id: 303,
      title: "Premium Travel: The Executive Experience",
      excerpt:
        "Learn how to elevate your travel experience without compromising on efficiency or productivity.",
      date: "April 24, 2025",
      category: "Executive",
      image:
        "https://images.unsplash.com/photo-1551845728-6820a30c64e2?q=80&w=1528&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
    setShowBookingModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const showCustomAlert = (config: AlertConfig) => {
    setAlertConfig(config);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredListings = listings.filter(
    (listing) =>
      (activeCategory === "all" || listing.category === activeCategory) &&
      (searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12">
            {motionLoaded ? (
              <Motion
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent"
                style={{
                  borderTopColor: theme === "dark" ? "#fff" : "#000",
                  borderRightColor: theme === "dark" ? "#fff" : "#000",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ) : (
              <div
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent animate-spin"
                style={{
                  borderTopColor: theme === "dark" ? "#fff" : "#000",
                  borderRightColor: theme === "dark" ? "#fff" : "#000",
                }}
              />
            )}
          </div>
          {motionLoaded ? (
            <Motion
              className={`mt-4 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </Motion>
          ) : (
            <p
              className={`mt-4 text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Loading...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={` min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Add global styles */}
      <style jsx global>
        {inlineStyles}
      </style>

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
            {motionLoaded ? (
              <Motion
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
              </Motion>
            ) : (
              <div className="flex items-center">
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
              </div>
            )}

            <div className="hidden md:flex items-center space-x-6">
              {motionLoaded ? (
                <Motion
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
                </Motion>
              ) : (
                <button
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
                >
                  Explore
                </button>
              )}
              <Motion
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
              </Motion>
              <Motion
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
              </Motion>
              <Motion
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
              </Motion>
            </div>

            <div className="flex items-center space-x-4">
              <Motion
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
              </Motion>

              <Motion className="relative" whileHover={{ scale: 1.05 }}>
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
                  <Motion
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
                  </Motion>
                )}
              </Motion>

              <Motion className="relative" whileHover={{ scale: 1.05 }}>
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
                  <Motion
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-200"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div
                        onClick={() =>
                          showCustomAlert({
                            message: "Log out",
                            type: "info",
                          })
                        }
                        className="flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                      </div>
                    </button>
                  </Motion>
                )}
              </Motion>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeTab === "explore" &&
          !showUserDashboard &&
          !showHostDashboard && (
            <Motion
              className={`relative rounded-xl overflow-hidden mb-12`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661962958462-9e52fda9954d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Travel destinations"
                  width={1920}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative py-20 px-6 md:px-12 flex flex-col items-center text-center text-white">
                <Motion
                  className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Exceptional Properties for Discerning Travelers
                </Motion>

                <Motion
                  className="text-lg max-w-2xl mb-8 text-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Premium accommodations and exclusive insights for corporate
                  and executive travelers
                </Motion>

                <Motion
                  className={`w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-md overflow-hidden flex items-center p-2 shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="flex-1 flex items-center px-4">
                    <Search className="w-5 h-5 mr-2 text-white" />
                    <input
                      type="text"
                      placeholder="Search for destinations, properties, or experiences"
                      className="w-full py-2 outline-none bg-transparent text-white placeholder-white/70"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Motion
                    className="cursor-pointer bg-white text-black px-6 py-3 rounded-md font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Search
                  </Motion>
                </Motion>
              </div>
            </Motion>
          )}

        {activeTab === "explore" &&
          !showUserDashboard &&
          !showHostDashboard && (
            <Motion
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Property Categories</h2>
                <div className="flex space-x-2">
                  <Motion
                    className={`cursor-pointer p-2 rounded-md ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Motion>
                  <Motion
                    className={`cursor-pointer p-2 rounded-md ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Motion>
                </div>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                {categories.map((category) => (
                  <Motion
                    key={category.id}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                      activeCategory === category.id
                        ? `${
                            theme === "dark"
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`
                        : `${
                            theme === "dark"
                              ? "bg-gray-800 text-white hover:bg-gray-700"
                              : "bg-gray-100 text-black hover:bg-gray-200"
                          }`
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </Motion>
                ))}
              </div>
            </Motion>
          )}

        {activeTab === "explore" &&
          !showUserDashboard &&
          !showHostDashboard && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Featured Properties</h2>
                <Motion
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  } flex items-center`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Motion>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing, index) => (
                  <Motion
                    key={listing.id}
                    className={`rounded-lg overflow-hidden ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    } shadow-md hover:shadow-lg transition-shadow`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleListingClick(listing)}
                  >
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        width={400}
                        height={300}
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <button className="cursor-pointer absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors">
                        <Heart className="w-5 h-5 text-red-500" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-medium line-clamp-1">
                          {listing.title}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">
                            {listing.rating}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {listing.location}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <span className="font-medium">${listing.price}</span>
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {" "}
                            / night
                          </span>
                        </div>
                        <Motion
                          className={`cursor-pointer px-3 py-1 text-sm rounded-md ${
                            theme === "dark"
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          } font-medium`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Book
                        </Motion>
                      </div>
                    </div>
                  </Motion>
                ))}
              </div>
            </div>
          )}

        {activeTab === "news" && !showUserDashboard && !showHostDashboard && (
          <Motion
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium mb-6">Market Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsArticles.map((article, index) => (
                <Motion
                  key={article.id}
                  className={`rounded-lg overflow-hidden ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } shadow-md`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black text-white text-xs font-medium">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {article.date}
                    </div>
                    <h3 className="text-base font-medium mb-2">
                      {article.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {article.excerpt}
                    </p>
                    <Motion
                      className={`cursor-pointer text-sm font-medium ${
                        theme === "dark"
                          ? "text-white hover:text-gray-300"
                          : "text-black hover:text-gray-700"
                      } flex items-center`}
                      whileHover={{ x: 5 }}
                    >
                      Read more <ChevronRight className="w-4 h-4 ml-1" />
                    </Motion>
                  </div>
                </Motion>
              ))}
            </div>
          </Motion>
        )}

        {showUserDashboard && (
          <Motion
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium">My Travel Portfolio</h2>
              <Motion
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                } flex items-center`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  showCustomAlert({
                    message: "Starting new booking process...",
                    type: "info",
                    icon: <Plus className="w-4 h-4" />,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1" /> New Booking
              </Motion>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {userBookings.map((booking, index) => {
                const listing = listings.find(
                  (l) => l.id === booking.listingId
                );
                if (!listing) return null;

                return (
                  <Motion
                    key={booking.id}
                    className={`rounded-lg overflow-hidden ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    } shadow-md`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium mb-1">
                              {listing.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {listing.location}
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              showCustomAlert({
                                message: `Booking ${booking.status.toLowerCase()}`,
                                type:
                                  booking.status === "Upcoming"
                                    ? "warning"
                                    : "info",
                                icon:
                                  booking.status === "Upcoming" ? (
                                    <Calendar className="w-4 h-4" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  ),
                              })
                            }
                            className={`px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                              booking.status === "Upcoming"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}
                          >
                            {booking.status}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div
                            className={`flex items-center ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {booking.dates}
                          </div>
                          <div
                            className={`flex items-center ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            <User className="w-4 h-4 mr-2" />2 guests
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Total
                            </span>
                            <div className="font-medium text-lg">
                              ${booking.totalPrice}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Motion
                              className={`cursor-pointer px-4 py-2 rounded-md ${
                                theme === "dark"
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-100 hover:bg-gray-200"
                              } text-sm font-medium`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                showCustomAlert({
                                  message: "Opening message center...",
                                  type: "info",
                                  icon: <MessageSquare className="w-4 h-4" />,
                                })
                              }
                            >
                              <MessageSquare className="w-4 h-4 mr-1 inline-block" />{" "}
                              Message
                            </Motion>
                            <Motion
                              className={`px-4 py-2 rounded-md ${
                                theme === "dark"
                                  ? "bg-white text-black"
                                  : "bg-black text-white"
                              } text-sm font-medium`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                showCustomAlert({
                                  message: "Loading booking details...",
                                  type: "info",
                                  icon: <Search className="w-4 h-4" />,
                                })
                              }
                            >
                              Details
                            </Motion>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Motion>
                );
              })}
            </div>
          </Motion>
        )}

        {showHostDashboard && (
          <Motion
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium">Property Management</h2>
              <Motion
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                } flex items-center`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  showCustomAlert({
                    message: "Opening new property listing form...",
                    type: "info",
                    icon: <Plus className="w-4 h-4" />,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1" /> Add Property
              </Motion>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <Motion
                className={`rounded-lg p-6 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-md cursor-pointer`}
                whileHover={{ y: -5 }}
                onClick={() =>
                  showCustomAlert({
                    message: "Viewing revenue details...",
                    type: "info",
                    icon: <Briefcase className="w-4 h-4" />,
                  })
                }
              >
                <h3 className="text-base font-medium mb-1">Total Revenue</h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Last 30 days
                </p>
                <div className="text-2xl font-medium">$2,760</div>
                <div className="flex items-center mt-2 text-green-500">
                  <span className="text-sm">+12% from last month</span>
                </div>
              </Motion>

              <Motion
                className={`rounded-lg p-6 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-md cursor-pointer`}
                whileHover={{ y: -5 }}
                onClick={() =>
                  showCustomAlert({
                    message: "Opening bookings overview...",
                    type: "info",
                    icon: <Calendar className="w-4 h-4" />,
                  })
                }
              >
                <h3 className="text-base font-medium mb-1">Bookings</h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Last 30 days
                </p>
                <div className="text-2xl font-medium">20</div>
                <div className="flex items-center mt-2 text-green-500">
                  <span className="text-sm">+5% from last month</span>
                </div>
              </Motion>

              <Motion
                className={`rounded-lg p-6 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-md cursor-pointer`}
                whileHover={{ y: -5 }}
                onClick={() =>
                  showCustomAlert({
                    message: "Viewing detailed ratings and reviews...",
                    type: "info",
                    icon: <Star className="w-4 h-4" />,
                  })
                }
              >
                <h3 className="text-base font-medium mb-1">Average Rating</h3>
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  All time
                </p>
                <div className="text-2xl font-medium flex items-center">
                  4.8
                  <div className="flex ml-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-green-500">
                  <span className="text-sm">107 reviews</span>
                </div>
              </Motion>
            </div>

            <h3 className="text-lg font-medium mb-4">Your Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hostListings.map((listing, index) => (
                <Motion
                  key={listing.id}
                  className={`rounded-lg overflow-hidden ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } shadow-md cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    showCustomAlert({
                      message: `Viewing details for ${listing.title}...`,
                      type: "info",
                      icon: <Home className="w-4 h-4" />,
                    })
                  }
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto">
                      <div className="w-full h-full aspect-ratio-1 overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                          style={{
                            aspectRatio: "4/3",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-4 md:w-3/5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-base font-medium">
                          {listing.title}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">
                            {listing.rating}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm mb-3 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {listing.location}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-3">
                        <div
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <span className="font-medium">${listing.price}</span>{" "}
                          / night
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <span className="font-medium">
                            {listing.bookings}
                          </span>{" "}
                          bookings
                        </div>
                        <div
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <span className="font-medium">
                            ${listing.earnings}
                          </span>{" "}
                          earned
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-3">
                        <Motion
                          className={`cursor-pointer px-3 py-1 rounded-md ${
                            theme === "dark"
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          } text-sm`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            showCustomAlert({
                              message: `Opening editor for ${listing.title}...`,
                              type: "info",
                              icon: <Settings className="w-4 h-4" />,
                            });
                          }}
                        >
                          Edit
                        </Motion>
                        <Motion
                          className={`cursor-pointer px-3 py-1 rounded-md ${
                            theme === "dark"
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          } text-sm`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            showCustomAlert({
                              message: `Opening calendar for ${listing.title}...`,
                              type: "info",
                              icon: <Calendar className="w-4 h-4" />,
                            });
                          }}
                        >
                          Calendar
                        </Motion>
                        <Motion
                          className={`cursor-pointer px-3 py-1 rounded-md ${
                            theme === "dark"
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          } text-sm`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            showCustomAlert({
                              message: `Opening detailed view for ${listing.title}...`,
                              type: "info",
                              icon: <Search className="w-4 h-4" />,
                            });
                          }}
                        >
                          View
                        </Motion>
                      </div>
                    </div>
                  </div>
                </Motion>
              ))}
            </div>
          </Motion>
        )}
      </main>

      {/* Update the AnimatePresence usage for the booking modal */}
      <AnimatePresence>
        {showBookingModal && selectedListing && (
          <Motion
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
            />

            <Motion
              className={`relative w-full max-w-3xl rounded-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } shadow-xl my-8 max-h-[90vh] overflow-y-auto hide-scrollbar`}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <button
                  className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  onClick={() => setShowBookingModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-medium mb-1">
                      {selectedListing.title}
                    </h2>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {selectedListing.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-medium">
                      {selectedListing.rating}
                    </span>
                    <span
                      className={`mx-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ·
                    </span>
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {selectedListing.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <div className="mb-6">
                      <h3 className="text-base font-medium mb-2">
                        About this property
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {selectedListing.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-base font-medium mb-2">Amenities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedListing.amenities.map(
                          (amenity: string, index: number) => (
                            <div key={index} className="flex items-center">
                              <div
                                className={`w-6 h-6 rounded-full ${
                                  theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-100"
                                } flex items-center justify-center mr-2`}
                              >
                                <Check className="w-3 h-3 text-green-500" />
                              </div>
                              <span className="text-sm">{amenity}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2">Host</h3>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                          <div className="w-full h-full bg-gray-400"></div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {selectedListing.host}
                          </div>
                          <div
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Superhost · 4 years hosting
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/3">
                    <div
                      className={`rounded-lg p-4 ${
                        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xl font-medium">
                            ${selectedListing.price}
                          </span>
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {" "}
                            / night
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">
                            {selectedListing.rating}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div
                          className={`rounded-lg overflow-hidden border ${
                            theme === "dark"
                              ? "border-gray-700"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="grid grid-cols-2">
                            <div className="p-3">
                              <div
                                className={`text-xs font-medium mb-1 ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                CHECK-IN
                              </div>
                              <input
                                type="date"
                                className={`w-full bg-transparent outline-none text-sm ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                                value={bookingDates.checkIn}
                                onChange={(e) =>
                                  setBookingDates({
                                    ...bookingDates,
                                    checkIn: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div
                              className={`p-3 border-l ${
                                theme === "dark"
                                  ? "border-gray-700"
                                  : "border-gray-300"
                              }`}
                            >
                              <div
                                className={`text-xs font-medium mb-1 ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                CHECKOUT
                              </div>
                              <input
                                type="date"
                                className={`w-full bg-transparent outline-none text-sm ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                                value={bookingDates.checkOut}
                                onChange={(e) =>
                                  setBookingDates({
                                    ...bookingDates,
                                    checkOut: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div
                            className={`p-3 border-t ${
                              theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-300"
                            }`}
                          >
                            <div
                              className={`text-xs font-medium mb-1 ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              GUESTS
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                {guests} guest{guests !== 1 ? "s" : ""}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  className={`cursor-pointer w-6 h-6 rounded-full flex items-center justify-center ${
                                    theme === "dark"
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  } ${
                                    guests <= 1
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setGuests((prev) => Math.max(1, prev - 1))
                                  }
                                  disabled={guests <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <button
                                  className={`cursor-pointer w-6 h-6 rounded-full flex items-center justify-center ${
                                    theme === "dark"
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-200 hover:bg-gray-300"
                                  }`}
                                  onClick={() => setGuests((prev) => prev + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Motion
                        className={`cursor-pointer w-full py-3 rounded-md ${
                          theme === "dark"
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        } font-medium`}
                        onClick={handleBookNow}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Reserve
                      </Motion>

                      <div className="mt-4">
                        <div className="flex justify-between mb-2">
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            ${selectedListing.price} x 5 nights
                          </span>
                          <span className="text-sm">
                            ${selectedListing.price * 5}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            Cleaning fee
                          </span>
                          <span className="text-sm">$60</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            Service fee
                          </span>
                          <span className="text-sm">$85</span>
                        </div>
                        <div
                          className={`border-t ${
                            theme === "dark"
                              ? "border-gray-700"
                              : "border-gray-300"
                          } my-2 pt-2`}
                        >
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${selectedListing.price * 5 + 60 + 85}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Motion>
          </Motion>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAlert && (
          <Motion
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white text-black"
              } rounded-lg shadow-lg p-4 flex items-center space-x-3 border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  alertConfig.type === "success"
                    ? "bg-green-500"
                    : alertConfig.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              >
                {alertConfig.icon || (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } font-medium`}
              >
                Successfully completed
              </p>
              <Motion
                className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowAlert(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </Motion>
            </div>
          </Motion>
        )}
      </AnimatePresence>

      <footer
        className={`py-12 border-t ${
          theme === "dark"
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <h3 className="text-lg font-medium mb-6">Support</h3>
              <ul
                className={`space-y-4 text-sm flex flex-col items-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Help Center...",
                        type: "info",
                        icon: <MessageSquare className="w-4 h-4" />,
                      });
                    }}
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Safety Information...",
                        type: "info",
                        icon: <Star className="w-4 h-4" />,
                      });
                    }}
                  >
                    Safety Information
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Cancellation Options...",
                        type: "info",
                        icon: <X className="w-4 h-4" />,
                      });
                    }}
                  >
                    Cancellation Options
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening COVID-19 Response Information...",
                        type: "info",
                        icon: <Briefcase className="w-4 h-4" />,
                      });
                    }}
                  >
                    COVID-19 Response
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Report Form...",
                        type: "warning",
                        icon: <MessageSquare className="w-4 h-4" />,
                      });
                    }}
                  >
                    Report a Concern
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-6">Community</h3>
              <ul
                className={`space-y-4 text-sm flex flex-col items-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Business Forum...",
                        type: "info",
                        icon: <Briefcase className="w-4 h-4" />,
                      });
                    }}
                  >
                    Business Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Accessing Host Resources...",
                        type: "info",
                        icon: <Home className="w-4 h-4" />,
                      });
                    }}
                  >
                    Host Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Travel Insights...",
                        type: "info",
                        icon: <Globe className="w-4 h-4" />,
                      });
                    }}
                  >
                    Travel Insights
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Upcoming Events...",
                        type: "info",
                        icon: <Calendar className="w-4 h-4" />,
                      });
                    }}
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Accessibility Information...",
                        type: "info",
                        icon: <User className="w-4 h-4" />,
                      });
                    }}
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-6">Hosting</h3>
              <ul
                className={`space-y-4 text-sm flex flex-col items-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Starting Property Listing Process...",
                        type: "info",
                        icon: <Plus className="w-4 h-4" />,
                      });
                    }}
                  >
                    List Your Property
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Insurance Options...",
                        type: "info",
                        icon: <Star className="w-4 h-4" />,
                      });
                    }}
                  >
                    Host Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Accessing Host Resources...",
                        type: "info",
                        icon: <Home className="w-4 h-4" />,
                      });
                    }}
                  >
                    Host Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Community Forum...",
                        type: "info",
                        icon: <MessageSquare className="w-4 h-4" />,
                      });
                    }}
                  >
                    Community Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Hosting Guidelines...",
                        type: "info",
                        icon: <Briefcase className="w-4 h-4" />,
                      });
                    }}
                  >
                    Responsible Hosting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-6">Venture</h3>
              <ul
                className={`space-y-4 text-sm flex flex-col items-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Newsroom...",
                        type: "info",
                        icon: <Globe className="w-4 h-4" />,
                      });
                    }}
                  >
                    Newsroom
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Career Opportunities...",
                        type: "info",
                        icon: <Briefcase className="w-4 h-4" />,
                      });
                    }}
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Investor Relations...",
                        type: "info",
                        icon: <Star className="w-4 h-4" />,
                      });
                    }}
                  >
                    Investors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Opening Gift Cards Store...",
                        type: "info",
                        icon: <Heart className="w-4 h-4" />,
                      });
                    }}
                  >
                    Gift Cards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:underline cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      showCustomAlert({
                        message: "Viewing Terms & Privacy Policy...",
                        type: "info",
                        icon: <Settings className="w-4 h-4" />,
                      });
                    }}
                  >
                    Terms & Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`border-t ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            } mt-12 pt-8 flex flex-col items-center justify-center space-y-4`}
          >
            <div
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2025 Venture, Inc. All rights reserved.
            </div>
            <div className="flex items-center justify-center space-x-8">
              <a
                href="#"
                className={`text-sm cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  showCustomAlert({
                    message: "Viewing Privacy Policy...",
                    type: "info",
                    icon: <Settings className="w-4 h-4" />,
                  });
                }}
              >
                Privacy
              </a>
              <a
                href="#"
                className={`text-sm cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  showCustomAlert({
                    message: "Viewing Terms of Service...",
                    type: "info",
                    icon: <Settings className="w-4 h-4" />,
                  });
                }}
              >
                Terms
              </a>
              <a
                href="#"
                className={`text-sm cursor-pointer ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  showCustomAlert({
                    message: "Opening Sitemap...",
                    type: "info",
                    icon: <Map className="w-4 h-4" />,
                  });
                }}
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
