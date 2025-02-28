# Stationery Shop - MERN Stack Application

A full-stack e-commerce platform for stationery products with secure user authentication, role-based access, and seamless product management.

## Features

### User Authentication & Authorization
- **Secure Registration/Login**: Email & password-based auth with JWT
- **Role-Based Access**: 
  - `User` (Default): Browse products, manage cart, place orders
  - `Admin` (Manual assignment): Manage users, products, and orders
- **JWT Authentication**: Token stored in local storage for persistent sessions

### Public Routes
- **Home Page**: 
  - Featured products carousel
  - Product categories showcase
  - About section & testimonials
- **Product Catalog**:
  - Search by title/author/category
  - Price range & availability filters
  - Responsive product cards with quick view
- **Product Details**: 
  - High-resolution images
  - Stock availability indicator
  - Add to cart functionality

### Private Routes
- **Shopping Cart**:
  - Real-time stock validation
  - Order summary with total calculation
  - Stripe/SurjoPay payment integration
- **User Dashboard**:
  - Order history tracking
  - Profile management
  - Address book
- **Admin Dashboard**:
  - CRUD operations for products
  - User management system
  - Order approval workflow (Pending → Shipping)

### UI/UX Highlights
- 📱 Fully responsive design
- 🎨 Clean & intuitive interface
- ⚡ Loading states & smooth transitions
- 🛑 User-friendly error handling
- 💬 Action confirmation toasts

## Technologies Used

### Frontend
- React.js + Vite
- Redux Toolkit (State management)
- React Router (Navigation)
- Axios (API calls)
- Tailwind CSS (Styling)
- Heroicons (Icons)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose (ODM)
- JSON Web Tokens (Authentication)
- Bcrypt.js (Password hashing)
- Stripe/SurjoPay SDK (Payments)

## Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/stationery-shop.git
   cd stationery-shop
   npm install
   npm run dev