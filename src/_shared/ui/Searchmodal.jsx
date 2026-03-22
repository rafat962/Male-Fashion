/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/products.json";

const SearchModal = ({ open, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();

    // focus input when modal opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setQuery("");
            setResults([]);
        }
    }, [open]);

    // close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // live search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const q = query.toLowerCase();
        setResults(
            products
                .filter(
                    (p) =>
                        p.name.toLowerCase().includes(q) ||
                        p.category.toLowerCase().includes(q),
                )
                .slice(0, 6),
        );
    }, [query]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 right-0 z-[201] bg-white shadow-2xl
                                   max-h-[80vh] overflow-y-auto"
                    >
                        {/* Search Input */}
                        <div
                            className="container-main py-5 flex items-center gap-4
                                        border-b border-[#f0f0f0]"
                        >
                            <SearchIcon sx={{ fontSize: 22, color: "#bbb" }} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="flex-1 text-lg text-[#111] outline-none
                                           placeholder:text-[#bbb] font-medium"
                            />
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center
                                           text-[#bbb] hover:text-[#111] transition-colors"
                            >
                                <CloseIcon sx={{ fontSize: 20 }} />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="container-main py-4">
                            {query.trim() === "" ? (
                                <p className="text-sm text-[#bbb] py-4 text-center">
                                    Start typing to search products...
                                </p>
                            ) : results.length === 0 ? (
                                <p className="text-sm text-[#bbb] py-4 text-center">
                                    No products found for "
                                    <span className="font-bold text-[#111]">
                                        {query}
                                    </span>
                                    "
                                </p>
                            ) : (
                                <>
                                    <p
                                        className="text-[10px] font-bold uppercase tracking-[2px]
                                                  text-[#bbb] mb-4"
                                    >
                                        {results.length} result
                                        {results.length > 1 ? "s" : ""} found
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {results.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex items-center gap-3 p-3 border
                                                           border-[#f0f0f0] hover:border-[#ddd]
                                                           transition-colors duration-200"
                                            >
                                                {/* Image */}
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    onClick={onClose}
                                                    className="w-16 h-16 bg-[#f8f8f8] shrink-0 overflow-hidden"
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain p-1 hover:scale-110 transition-transform"
                                                    />
                                                </Link>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        className="text-[10px] font-bold uppercase
                                                                  tracking-[1px] text-[#bbb]"
                                                    >
                                                        {product.category}
                                                    </p>
                                                    <Link
                                                        to={`/product/${product.id}`}
                                                        onClick={onClose}
                                                        className="block text-sm font-bold text-[#111]
                                                                  truncate hover:text-primary transition-colors"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <p className="text-sm font-black text-primary">
                                                        $
                                                        {product.price.toFixed(
                                                            2,
                                                        )}
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={() =>
                                                            toggleWishlist(
                                                                product,
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center
                                                                   border border-[#f0f0f0] hover:border-primary
                                                                   hover:text-primary transition-all duration-200"
                                                    >
                                                        {isWishlisted(
                                                            product.id,
                                                        ) ? (
                                                            <FavoriteIcon
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "#e53637",
                                                                }}
                                                            />
                                                        ) : (
                                                            <FavoriteBorderIcon
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                            />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            addToCart(
                                                                product,
                                                                1,
                                                            );
                                                            onClose();
                                                        }}
                                                        className="w-7 h-7 flex items-center justify-center
                                                                   bg-[#111] text-white hover:bg-primary
                                                                   transition-colors duration-200"
                                                    >
                                                        <AddShoppingCartIcon
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* View all */}
                                    <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
                                        <Link
                                            to={`/shop`}
                                            onClick={onClose}
                                            className="text-[11px] font-bold uppercase tracking-[2px]
                                                       text-[#111] hover:text-primary transition-colors
                                                       border-b border-[#111] hover:border-primary pb-0.5"
                                        >
                                            View All Results in Shop →
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
