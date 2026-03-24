import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const [qty, setQty] = useState(1);

    // ← حذفنا useState للـ wished واستبدلناه بـ isWishlisted من الـ context
    const wished = isWishlisted(product.id);

    const handleQty = (val) => {
        const n = parseInt(val);
        if (!isNaN(n) && n >= 1) setQty(n);
    };

    return (
        <div className="group relative bg-white dark:bg-dark-paper border border-border dark:border-dark-border transition-all duration-300 flex flex-col h-full">
            {/* ── Badge ─────────────────────────────────────── */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.badge === "new" && (
                    <span className="bg-primary text-white text-[10px] font-bold uppercase px-2 py-0.5">
                        New
                    </span>
                )}
                {product.badge === "sale" && (
                    <span className="bg-dark text-white text-[10px] font-bold uppercase px-2 py-0.5">
                        Sale
                    </span>
                )}
            </div>

            {/* ── Image Section ──────────────────────────────── */}
            <Link
                to={`/product/${product.id}`}
                className="relative block overflow-hidden aspect-square bg-bg-light dark:bg-dark-bg p-2 sm:p-4 shrink-0"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Wishlist button */}
            <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                               bg-white dark:bg-dark-paper border border-border dark:border-dark-border md:opacity-0 md:group-hover:opacity-100
                               transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white"
                >
                    {wished ? (
                        <FavoriteIcon
                            sx={{
                                fontSize: { xs: 14, sm: 16 },
                                color: "var(--color-primary)",
                            }}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            sx={{ fontSize: { xs: 14, sm: 16 } }}
                        />
                    )}
                </button>
            </div>

            {/* ── Info Section ───────────────────────────────── */}
            <div className="p-3 sm:p-4 flex flex-col flex-1">
                <p className="text-[10px] sm:text-[0.65rem] font-bold uppercase tracking-widest text-sub dark:text-dark-muted mb-1">
                    {product.category}
                </p>

                <Link
                    to={`/product/${product.id}`}
                    className="text-xs sm:text-sm font-bold text-dark dark:text-white leading-tight mb-1 line-clamp-2 h-8 sm:h-10 hover:text-primary transition-colors"
                >
                    {product.name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <Rating
                        value={product.rating.stars}
                        readOnly
                        size="small"
                        sx={{ fontSize: { xs: 11, sm: 13 }, color: "var(--color-primary)" }}
                    />
                    <span className="text-[9px] sm:text-[0.65rem] text-sub dark:text-dark-muted">
                        ({product.rating.count})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3 mt-auto">
                    <span className="text-sm sm:text-base font-black text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-[10px] sm:text-xs text-sub dark:text-dark-muted line-through">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* ── Actions ────────────────────────────────── */}
                <div className="flex flex-col xl:flex-row items-stretch gap-2 mt-auto">
                    {/* Quantity */}
                    <div className="flex items-center border border-border dark:border-dark-border h-8">
                        <button
                            onClick={() => handleQty(qty - 1)}
                            className="flex-1 sm:w-8 flex items-center justify-center text-dark dark:text-white
                                       hover:bg-primary hover:text-white transition-colors cursor-pointer text-lg font-bold"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            min={1}
                            value={qty}
                            onChange={(e) => handleQty(e.target.value)}
                            className="w-8 sm:w-10 text-center text-xs sm:text-sm font-bold text-dark dark:text-white
                                       border-x border-border dark:border-dark-border outline-none bg-transparent"
                        />
                        <button
                            onClick={() => handleQty(qty + 1)}
                            className="flex-1 sm:w-8 flex items-center justify-center text-dark dark:text-white
                                       hover:bg-primary hover:text-white transition-colors cursor-pointer text-lg font-bold"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={() => addToCart(product, qty)}
                        className="flex-[2] h-8 bg-dark dark:bg-white dark:text-dark text-white text-[10px] sm:text-[0.65rem] font-bold
                                   uppercase tracking-widest flex items-center justify-center gap-1
                                   hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors cursor-pointer"
                    >
                        <AddShoppingCartIcon
                            sx={{ fontSize: { xs: 12, sm: 14 } }}
                        />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
