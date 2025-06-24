# Venture - Premium Travel Platform 🏠✈️

A modern, full-featured travel and accommodation booking platform built with Next.js, designed for executive and business travelers. Features a sleek, responsive interface with dark/light theme support, advanced property management, and comprehensive booking functionality.

## 👀 Demo
https://vacation-rental-app-2867.vercel.app/

## ✨ Features

### 🏡 Property Management

- **Property Listings** - Browse premium accommodations with detailed information
- **Advanced Search & Filters** - Search by location, category, and amenities
- **Category Browsing** - Beach, Mountain, City, Lake, and Tropical properties
- **Detailed Property Views** - High-quality images, amenities, host information

### 👤 User Experience

- **User Dashboard** - Manage bookings, view trip history
- **Host Dashboard** - Property management, earnings tracking, booking overview
- **Real-time Notifications** - Stay updated on booking status and opportunities
- **Responsive Design** - Optimized for desktop, tablet, and mobile

### 🎨 Modern Interface

- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Smooth Animations** - Framer Motion powered transitions and interactions
- **Loading States** - Elegant loading spinners and progressive content loading
- **Alert System** - Contextual notifications and feedback

### 📊 Business Features

- **Market Insights** - Industry news, trends, and investment opportunities
- **Revenue Tracking** - Detailed analytics for property hosts
- **Booking Management** - Complete reservation lifecycle management
- **Executive Focus** - Tailored for business and corporate travel

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Development**: [ESLint](https://eslint.org/), [PostCSS](https://postcss.org/)

## 📁 Project Structure

```
airbnb/
├── app/                    # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Main application (2552 lines)
├── standalone/            # Refactored component structure
│   ├── components/        # Modular React components
│   │   ├── Alert.tsx      # Notification system
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Header.tsx     # Navigation & user menu
│   │   ├── ListingCard.tsx # Property card component
│   │   ├── ListingsGrid.tsx # Property grid layout
│   │   ├── LoadingSpinner.tsx # Loading states
│   │   └── SearchAndFilters.tsx # Search interface
│   ├── data/
│   │   └── mockData.tsx   # Sample data and constants
│   ├── types/
│   │   └── index.ts       # TypeScript definitions
│   ├── page.tsx           # Original monolithic component
│   ├── page-refactored.tsx # Clean component composition
│   └── README.md          # Component documentation
├── public/                # Static assets
└── Configuration files    # Next.js, TypeScript, ESLint, etc.
```


