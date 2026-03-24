/* eslint-disable no-unused-vars */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
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
import { useTheme } from "../../../context/ThemeContext";
import { supabase } from "../../../supabaseClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const NavLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const navigate = useNavigate();
    const { totalItems, totalPrice } = useCart();
    const { totalWishlist } = useWishlist();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        handleMenuClose();
    };

    const menuVariants = {
        closed: { x: "-100%", transition: { type: "tween", duration: 0.3 } },
        open: { x: 0, transition: { type: "tween", duration: 0.3 } },
    };

    return (
        <>
            <header className=" w-full top-0 z-50">
                {/* ── Top Bar ─────────────────────────────── */}
                <div className="bg-dark py-2.5 hidden md:block">
                    <div className="container-main flex justify-between items-center text-white/90">
                        <p className="text-[13px] font-normal">
                            Free shipping, 30-day return or refund guarantee.
                        </p>
                        <div className="flex gap-6 items-center text-[13px] font-bold uppercase tracking-widest">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-primary normal-case font-medium">
                                        {user.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <NavLink
                                        to="/signin"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Sign In
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            )}
                            <NavLink
                                to="/faqs"
                                className="hover:text-primary transition-colors"
                            >
                                FAQs
                            </NavLink>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                USD{" "}
                                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Main Nav ────────────────────────────── */}
                <nav className="bg-white dark:bg-dark-paper py-5 md:py-6 border-b border-border dark:border-dark-border shadow-sm">
                    <div className="container-main flex items-center justify-between">
                        {/* Mobile hamburger */}
                        <div className="md:hidden flex items-center gap-2">
                            <IconButton onClick={() => setMobile(true)}>
                                <MenuIcon className="text-dark dark:text-white" />
                            </IconButton>
                            <IconButton onClick={toggleTheme} size="small">
                                {isDarkMode ? (
                                    <LightModeIcon
                                        sx={{ fontSize: 20, color: "white" }}
                                    />
                                ) : (
                                    <DarkModeIcon
                                        sx={{ fontSize: 20, color: "var(--color-dark)" }}
                                    />
                                )}
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
                                                         ? "border-primary text-dark dark:text-white"
                                                         : "border-transparent text-dark dark:text-white hover:border-primary"
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
                            {/* Theme Toggle Desktop */}
                            <div className="hidden md:block">
                                <IconButton onClick={toggleTheme} size="small">
                                    {isDarkMode ? (
                                        <LightModeIcon
                                            sx={{ fontSize: 22, color: "white" }}
                                        />
                                    ) : (
                                        <DarkModeIcon
                                            sx={{
                                                fontSize: 22,
                                                color: "var(--color-dark)",
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </div>

                            {/* User Account Mobile/Desktop Icon */}
                            <div className="md:hidden">
                                {user ? (
                                    <IconButton
                                        size="small"
                                        onClick={handleMenuOpen}
                                    >
                                        <AccountCircleOutlinedIcon
                                            sx={{
                                                fontSize: 22,
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                    </IconButton>
                                ) : (
                                    <NavLink to="/signin">
                                        <IconButton size="small">
                                            <AccountCircleOutlinedIcon
                                                sx={{
                                                    fontSize: 22,
                                                    color: "var(--color-dark)",
                                                }}
                                            />
                                        </IconButton>
                                    </NavLink>
                                )}
                            </div>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{
                                    "& .MuiPaper-root": {
                                        borderRadius: 0,
                                        mt: 1,
                                        minWidth: 150,
                                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                <MenuItem disabled sx={{ fontSize: "12px", fontWeight: 700 }}>
                                    {user?.email}
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        navigate("/profile");
                                    }}
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        gap: 1,
                                    }}
                                >
                                    <AccountCircleOutlinedIcon sx={{ fontSize: 16 }} /> My Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        gap: 1,
                                    }}
                                >
                                    <LogoutIcon sx={{ fontSize: 16 }} /> Logout
                                </MenuItem>
                            </Menu>

                            {/* Search */}
                            <IconButton
                                size="small"
                                onClick={() => setSearchOpen(true)}
                            >
                                <SearchOutlinedIcon
                                    className="text-dark dark:text-white"
                                    sx={{ fontSize: 22 }}
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
                                                    color: "var(--color-primary)",
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderOutlinedIcon
                                                className="text-dark dark:text-white"
                                                sx={{ fontSize: 22 }}
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
                                                className="text-dark dark:text-white"
                                                sx={{ fontSize: 22 }}
                                            />
                                        </Badge>
                                    </IconButton>
                                </NavLink>
                                <span className="text-[14px] font-bold text-dark dark:text-white hidden sm:block">
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
                                className="fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-dark-paper z-[101] shadow-2xl p-6"
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
                                        <CloseIcon className="text-dark dark:text-white" />
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
                                                     ${isActive ? "text-primary" : "text-dark dark:text-white hover:text-primary"}`
                                                }
                                            >
                                                {label}
                                            </NavLink>
                                        </li>
                                    ))}
                                    {!user && (
                                        <>
                                            <li onClick={() => setMobile(false)}>
                                                <NavLink
                                                    to="/signin"
                                                    className="text-lg font-bold uppercase tracking-widest block text-dark dark:text-white hover:text-primary"
                                                >
                                                    Sign In
                                                </NavLink>
                                            </li>
                                            <li onClick={() => setMobile(false)}>
                                                <NavLink
                                                    to="/signup"
                                                    className="text-lg font-bold uppercase tracking-widest block text-dark dark:text-white hover:text-primary"
                                                >
                                                    Sign Up
                                                </NavLink>
                                            </li>
                                        </>
                                    )}
                                    <li onClick={() => setMobile(false)}>
                                        <NavLink
                                            to="/wishlist"
                                            className={({ isActive }) =>
                                                `text-lg font-bold uppercase tracking-widest block
                                                 flex items-center gap-2 transition-colors duration-200
                                                     ${isActive ? "text-primary" : "text-dark dark:text-white hover:text-primary"}`
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
