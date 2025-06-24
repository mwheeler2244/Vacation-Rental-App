export interface Listing {
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

export interface Booking {
  id: number;
  listingId: number;
  dates: string;
  status: string;
  totalPrice: number;
}

export interface HostListing {
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

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface AlertConfig {
  message: string;
  type: "success" | "info" | "warning";
  icon?: React.ReactNode;
}

export interface BookingDates {
  checkIn: string;
  checkOut: string;
}
