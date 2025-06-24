import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  theme: string;
}

export default function LoadingSpinner({ theme }: LoadingSpinnerProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12">
          <motion.div
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
        </div>
        <motion.p
          className={`mt-4 text-lg font-medium ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}
