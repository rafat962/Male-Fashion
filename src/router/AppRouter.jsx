import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../_shared/ui/Layout/Layout";
import HomePage from "../_components/HomePage/HomePage";
import ShopPage from "../_components/ShopPage/ShopPage";
import CartPage from "../_components/CartPage/CartPage";
import ContactPage from "../_components/Contact/Contactpage";
import BlogPage from "../_components/Blog/Blog";
import WishlistPage from "../_components/Wishlistpage/Wishlistpage";
import ProductDetails from "../_components/ProductDetails/ProductDetails";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="blog" element={<BlogPage />} />
                    <Route path="wishlist" element={<WishlistPage />} />
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
