# 🛒 FreshCart — Full-Stack E-Commerce Grocery Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **FreshCart** is a production-ready, full-stack online grocery ordering and store management web application built with the MERN stack (MongoDB, Express, React 19, Node.js) and styled with Tailwind CSS.

---

## ✨ Features

- **🛒 Interactive Grocery Storefront**: Browse categories, search items with live debounced filtering, and view product details.
- **⚡ Modern Cart & Checkout**: Slide-out cart drawer, dynamic subtotal calculation, and multi-step delivery address management.
- **🔐 User & Seller Authentication**: Secure JWT-based auth with protected user routes and dedicated seller portal.
- **📦 Seller & Admin Dashboard**: Product creation with Cloudinary image upload, inventory management, and live order tracking.
- **💳 Payment Gateway Ready**: Integrated with Stripe payment processing.
- **📱 Responsive UI**: Optimized mobile and desktop user experiences with modern animations and micro-interactions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4
- **State & Routing**: React Context API, React Router DOM v7
- **UI Notifications**: React Hot Toast

### Backend
- **Server Framework**: Express 5 (Node.js)
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS
- **File Storage**: Cloudinary & Multer
- **Payments**: Stripe API

---

## 📁 Repository Architecture

```
FreshCart/
├── client/              # React 19 Frontend App
│   ├── src/
│   │   ├── components/  # Navbar, Footer, Hero, Product Cards, Seller UI
│   │   ├── context/     # App State Management & API Services
│   │   ├── pages/       # Home, Cart, Products, Orders, Auth, Seller Admin
│   │   └── assets/      # Media & Design Assets
│   ├── index.html
│   └── package.json
│
└── server/              # Node.js + Express Backend API
    ├── config/          # Database connection & Cloudinary setup
    ├── controllers/     # Auth, Product, Cart, Order logic
    ├── middlewares/     # Auth checks & file upload middleware
    ├── models/          # Mongoose Schema Definitions
    ├── routes/          # Express API Endpoints
    └── index.js         # Entry Point
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FreshCart.git
   cd FreshCart
   ```

2. **Setup Server (Backend)**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
   Start backend development server:
   ```bash
   npm run dev
   ```

3. **Setup Client (Frontend)**
   ```bash
   cd ../client
   npm install
   ```
   Start frontend dev server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📈 30-Day Contribution Strategy

This project is actively maintained with daily modular contributions to continuously expand feature sets, refine UI aesthetics, and enhance performance. 

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.
