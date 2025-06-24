import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AlertConfig } from "../types";

interface AlertProps {
  showAlert: boolean;
  alertConfig: AlertConfig;
  theme: string;
  onClose: () => void;
}

export default function Alert({
  showAlert,
  alertConfig,
  theme,
  onClose,
}: AlertProps) {
  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div
            className={`rounded-lg shadow-lg overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } border ${
              alertConfig.type === "success"
                ? "border-green-500"
                : alertConfig.type === "warning"
                ? "border-yellow-500"
                : "border-blue-500"
            }`}
          >
            <div className="p-4 pr-12 relative">
              <div className="flex items-center">
                {alertConfig.icon && (
                  <div
                    className={`mr-3 ${
                      alertConfig.type === "success"
                        ? "text-green-500"
                        : alertConfig.type === "warning"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  >
                    {alertConfig.icon}
                  </div>
                )}
                <p className="text-sm font-medium">{alertConfig.message}</p>
              </div>
              <button
                className={`absolute top-2 right-2 p-1 rounded ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
