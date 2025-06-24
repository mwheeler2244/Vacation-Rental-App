import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Listing } from "../types";
import ListingCard from "./ListingCard";

interface ListingsGridProps {
  theme: string;
  listings: Listing[];
  onListingClick: (listing: Listing) => void;
}

export default function ListingsGrid({
  theme,
  listings,
  onListingClick,
}: ListingsGridProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Featured Properties</h2>
        <motion.button
          className={`cursor-pointer px-4 py-2 rounded-md ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-gray-100 hover:bg-gray-200"
          } flex items-center`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View all <ChevronRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            theme={theme}
            index={index}
            onListingClick={onListingClick}
          />
        ))}
      </div>
    </div>
  );
}
