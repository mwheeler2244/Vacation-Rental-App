import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../data/mockData";

interface SearchAndFiltersProps {
  theme: string;
  searchQuery: string;
  activeCategory: string;
  isSignedIn: boolean;
  userName?: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}

export default function SearchAndFilters({
  theme,
  searchQuery,
  activeCategory,
  isSignedIn,
  userName,
  setSearchQuery,
  setActiveCategory,
}: SearchAndFiltersProps) {
  return (
    <>
      {/* Hero Section with Search */}
      <motion.div
        className="relative overflow-hidden mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Exceptional Properties for Discerning Travelers
          </motion.h1>

          <motion.p
            className="text-lg max-w-2xl mb-8 text-gray-100 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {isSignedIn
              ? `Welcome back, ${userName}! Discover your next premium destination`
              : "Premium accommodations and exclusive insights for corporate and executive travelers"}
          </motion.p>

          <motion.div
            className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-md overflow-hidden flex items-center p-2 shadow-lg"
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
            <motion.button
              className="cursor-pointer bg-white text-black px-6 py-3 rounded-md font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Search
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Property Categories</h2>
          <div className="flex space-x-2">
            <motion.button
              className={`cursor-pointer p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              className={`cursor-pointer p-2 rounded-md ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map((category) => (
            <motion.button
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
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
