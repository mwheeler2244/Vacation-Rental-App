import {
  MessageSquare,
  Star,
  X,
  Briefcase,
  Home,
  Globe,
  Calendar,
  User,
  Plus,
  Heart,
  Settings,
  Map,
} from "lucide-react";
import { AlertConfig } from "../types";

interface FooterProps {
  theme: string;
  showCustomAlert: (config: AlertConfig) => void;
}

export default function Footer({ theme, showCustomAlert }: FooterProps) {
  return (
    <footer
      className={`border-t py-16 ${
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
  );
}
