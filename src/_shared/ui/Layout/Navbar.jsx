/* eslint-disable no-unused-vars */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../../context/CartContext";
import SearchModal from "../Searchmodal";
import { useWishlist } from "../../../context/WishlistContext";

const NavLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const { totalItems, totalPrice } = useCart();
    const { totalWishlist } = useWishlist();
    const [isMobileMenuOpen, setMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const menuVariants = {
        closed: { x: "-100%", transition: { type: "tween", duration: 0.3 } },
        open: { x: 0, transition: { type: "tween", duration: 0.3 } },
    };

    return (
        <>
            <header className=" w-full top-0 z-50">
                {/* ── Top Bar ─────────────────────────────── */}
                <div className="bg-[#111111] py-2.5 hidden md:block">
                    <div className="container-main flex justify-between items-center text-white/90">
                        <p className="text-[13px] font-normal">
                            Free shipping, 30-day return or refund guarantee.
                        </p>
                        <div className="flex gap-6 items-center text-[13px] font-bold uppercase tracking-widest">
                            <a
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Sign In
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                FAQs
                            </a>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                USD{" "}
                                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Main Nav ────────────────────────────── */}
                <nav className="bg-white py-5 md:py-6 border-b border-gray-100 shadow-sm">
                    <div className="container-main flex items-center justify-between">
                        {/* Mobile hamburger */}
                        <div className="md:hidden">
                            <IconButton onClick={() => setMobile(true)}>
                                <MenuIcon sx={{ color: "#111" }} />
                            </IconButton>
                        </div>

                        {/* Logo */}
                        <div className="md:w-1/4">
                            <NavLink to="/">
                                <img
                                    src="logo.png"
                                    alt="Logo"
                                    className="h-5 md:h-6"
                                />
                            </NavLink>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex md:w-2/4 justify-center">
                            <ul className="flex items-center gap-6 lg:gap-10">
                                {NavLinks.map(({ label, to }) => (
                                    <li key={to}>
                                        <NavLink
                                            to={to}
                                            end={to === "/"}
                                            className={({ isActive }) =>
                                                `text-[15px] font-bold uppercase tracking-[2px] pb-1
                                                 border-b-2 transition-all duration-300
                                                 ${
                                                     isActive
                                                         ? "border-red-600 text-[#111]"
                                                         : "border-transparent text-[#111] hover:border-red-600"
                                                 }`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Icons */}
                        <div className="md:w-1/4 flex justify-end items-center gap-2 md:gap-3">
                            {/* Search */}
                            <IconButton
                                size="small"
                                onClick={() => setSearchOpen(true)}
                            >
                                <SearchOutlinedIcon
                                    sx={{ fontSize: 22, color: "#111" }}
                                />
                            </IconButton>

                            {/* Wishlist */}
                            <NavLink to="/wishlist">
                                <IconButton size="small">
                                    <Badge
                                        badgeContent={totalWishlist}
                                        color="error"
                                    >
                                        {totalWishlist > 0 ? (
                                            <FavoriteIcon
                                                sx={{
                                                    fontSize: 22,
                                                    color: "#e53637",
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderOutlinedIcon
                                                sx={{
                                                    fontSize: 22,
                                                    color: "#111",
                                                }}
                                            />
                                        )}
                                    </Badge>
                                </IconButton>
                            </NavLink>

                            {/* Cart */}
                            <div className="flex items-center gap-1 md:gap-2">
                                <NavLink to="/cart">
                                    <IconButton size="small">
                                        <Badge
                                            badgeContent={totalItems}
                                            color="error"
                                        >
                                            <ShoppingCartOutlinedIcon
                                                sx={{
                                                    fontSize: 22,
                                                    color: "#111",
                                                }}
                                            />
                                        </Badge>
                                    </IconButton>
                                </NavLink>
                                <span className="text-[14px] font-bold text-[#111] hidden sm:block">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* ── Mobile Sidebar ───────────────────────── */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobile(false)}
                                className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                            />
                            <motion.div
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="fixed top-0 left-0 h-full w-[280px] bg-white z-[101] shadow-2xl p-6"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="h-5"
                                    />
                                    <IconButton
                                        onClick={() => setMobile(false)}
                                    >
                                        <CloseIcon sx={{ color: "#111" }} />
                                    </IconButton>
                                </div>
                                <ul className="flex flex-col gap-5">
                                    {NavLinks.map(({ label, to }) => (
                                        <li
                                            key={to}
                                            onClick={() => setMobile(false)}
                                        >
                                            <NavLink
                                                to={to}
                                                end={to === "/"}
                                                className={({ isActive }) =>
                                                    `text-lg font-bold uppercase tracking-widest block
                                                     transition-colors duration-200
                                                     ${isActive ? "text-primary" : "text-[#111] hover:text-primary"}`
                                                }
                                            >
                                                {label}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li onClick={() => setMobile(false)}>
                                        <NavLink
                                            to="/wishlist"
                                            className={({ isActive }) =>
                                                `text-lg font-bold uppercase tracking-widest block
                                                 flex items-center gap-2 transition-colors duration-200
                                                 ${isActive ? "text-primary" : "text-[#111] hover:text-primary"}`
                                            }
                                        >
                                            Wishlist
                                            {totalWishlist > 0 && (
                                                <span
                                                    className="bg-primary text-white text-xs
                                                                 font-bold px-1.5 py-0.5 rounded-full"
                                                >
                                                    {totalWishlist}
                                                </span>
                                            )}
                                        </NavLink>
                                    </li>
                                </ul>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Search Modal ─────────────────────────────── */}
            <SearchModal
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
};

export default Navbar;
