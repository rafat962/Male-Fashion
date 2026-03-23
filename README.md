# Male-Fashion E-commerce

A modern, full-featured e-commerce web application for men's fashion, built with **React**, **Vite**, **Supabase**, and **Tailwind CSS**.

## ✨ Features

-   **User Authentication**: Secure Sign In and Sign Up with Supabase (Email/Password & Google OAuth).
-   **Product Catalog**: Dynamic shop page with filtering, search, and detailed product views.
-   **Shopping Cart**: Persistent cart management with real-time price calculation.
-   **Wishlist**: Save favorite products for later viewing.
-   **Checkout Process**: Seamless checkout flow with shipping information and order summary.
-   **User Profile & Order History**: Dedicated profile page to track previous orders and their status.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS.
-   **Modern UI/UX**: Interactive elements and smooth animations powered by Framer Motion.
-   **Global State Management**: Efficient data fetching and caching with React Query.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
-   **UI Components**: Material UI (MUI)
-   **Backend/Database**: Supabase (PostgreSQL & Auth)
-   **State Management**: React Query, React Context API
-   **Routing**: React Router 7
-   **Notifications**: React Hot Toast

## 📂 Project Structure

```text
src/
├── _components/            # Feature-specific components
│   ├── Auth/               # SignIn and SignUp pages
│   ├── Blog/               # Blog and articles page
│   ├── CartPage/           # Cart and Checkout flow
│   ├── Contact/            # Contact information and form
│   ├── FAQs/               # Frequently Asked Questions
│   ├── HomePage/           # Hero section and featured products
│   ├── ProductDetails/     # Single product detailed view
│   ├── Profile/            # User profile and order history
│   ├── ShopPage/           # Product listing and filtering
│   └── Wishlistpage/       # Saved items view
│
├── _shared/                # Reusable cross-feature assets
│   ├── hooks/              # Custom React Query and utility hooks
│   ├── services/           # Backend API services (Supabase queries)
│   └── ui/                 # Layout (Navbar, Footer) and UI components
│
├── context/                # Global state providers (Cart, Wishlist, Query)
├── data/                   # Static JSON data (Products, Blogs, FAQs)
├── lib/                    # Library configurations (Supabase client)
├── router/                 # App routing configuration (AppRouter)
├── theme/                  # MUI theme customization
│
├── App.jsx                 # Root application component
├── main.jsx                # Application entry point
└── supabaseClient.js       # Supabase initialization
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Supabase account and project

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/male-fashion.git
    cd male-fashion
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run development server**:
    ```bash
    npm run dev
    ```

5.  **Build for production**:
    ```bash
    npm run build
    ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
