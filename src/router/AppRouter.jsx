import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../_shared/ui/Layout/Layout";
import HomePage from "../_components/HomePage/HomePage";
import ShopPage from "../_components/ShopPage/ShopPage";
import CartPage from "../_components/CartPage/CartPage";
import ContactPage from "../_components/Contact/Contactpage";
import BlogPage from "../_components/Blog/Blog";
import WishlistPage from "../_components/Wishlistpage/Wishlistpage";
import ProductDetails from "../_components/ProductDetails/ProductDetails";
import FAQs from "../_components/FAQs/FAQs";
import SignIn from "../_components/Auth/SignIn";
import SignUp from "../_components/Auth/SignUp";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="faqs" element={<FAQs />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
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
