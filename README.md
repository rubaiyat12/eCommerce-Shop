# 🛒 eCommerce Shop

A modern and responsive eCommerce web application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**. It provides a smooth product browsing experience using the [DummyJSON API](https://dummyjson.com/), with features like product listing, favorites, search, CRUD operations, dark/light mode, and more.

🔗 **Live Demo:** [https://e-commerce-shop-54zl.vercel.app/](https://e-commerce-shop-54zl.vercel.app/)

---

## 🔧 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** Redux Toolkit
- **API:** [DummyJSON](https://dummyjson.com/)
- **HTTP Client:** Axios

---

## ✨ Features

### 🏠 Homepage (`/`)
- **Responsive Navbar** with:
  - Link to **Favorites** page
  - Link to **Create Product**
  - **Dark/Light Mode** toggle
- **Search Bar** to filter products in real-time
- **Product Listing** with:
  - On-scroll Pagination (`?limit=10&skip=10`)
  - Product Card view
  - Favorite/Unfavorite toggle with heart icon
  - Clickable cards to view detailed product info

### 💖 Favorites (`/favourite`)
- View a list of all favorited products
- Easily unfavorite any product

### 🔍 Product Details (`/product/[id]`)
- Each product opens in a **dynamic route**
- View complete product details
- **Edit** product using a modal dialog
- **Delete** product with a confirmation popup
- **Toast notifications** for feedback

### ➕ Create Product (`/create-product`)
- Add a new product through a form
- Toast notification upon successful creation



