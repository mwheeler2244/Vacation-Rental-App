import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Listing } from "../types";

interface ListingCardProps {
  listing: Listing;
  theme: string;
  index: number;
  onListingClick: (listing: Listing) => void;
}

export default function ListingCard({
  listing,
  theme,
  index,
  onListingClick,
}: ListingCardProps) {
  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-md cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => onListingClick(listing)}
    >
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium">{listing.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{listing.rating}</span>
          </div>
        </div>
        <p
          className={`text-sm mb-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {listing.location}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-medium">${listing.price}</span>
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {" "}
              / night
            </span>
          </div>
          <span
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {listing.reviews} reviews
          </span>
        </div>
      </div>
    </motion.div>
  );
}
