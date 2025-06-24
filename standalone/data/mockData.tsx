import { Globe, Map, Briefcase } from "lucide-react";
import { Listing, Booking, HostListing, NewsArticle } from "../types";

export const listings: Listing[] = [
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

export const categories = [
  { id: "all", name: "All", icon: <Globe className="w-5 h-5" /> },
  { id: "beach", name: "Beach", icon: <Map className="w-5 h-5" /> },
  { id: "mountain", name: "Mountain", icon: <Map className="w-5 h-5" /> },
  { id: "city", name: "City", icon: <Briefcase className="w-5 h-5" /> },
  { id: "lake", name: "Lake", icon: <Map className="w-5 h-5" /> },
  { id: "tropical", name: "Tropical", icon: <Map className="w-5 h-5" /> },
];

export const userBookings: Booking[] = [
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

export const hostListings: HostListing[] = [
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

export const newsArticles: NewsArticle[] = [
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
