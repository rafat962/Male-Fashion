/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useCurrency } from "../../../context/CurrencyContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group cursor-pointer w-full"
        >
            {/* Image Container */}
            <Link
                to={`/product/${product.id}`}
                className="relative block aspect-[1/1.15] bg-bg-light mb-4 overflow-hidden"
            >
                {product.badge && (
                    <span
                        className={`absolute top-5 left-0 px-4 py-1 text-[11px] font-bold uppercase tracking-widest z-10 ${
                            product.badge === "new"
                                ? "bg-white text-black"
                                : "bg-black text-white"
                        }`}
                    >
                        {product.badge}
                    </span>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Content Area */}
            <div className="text-left">
                {/* 1. Name & Add to Cart Swap Container */}
                <div className="relative h-6 overflow-hidden mb-1">
                    {/* Product Name (Visible by Default) */}
                    <div className="absolute inset-0 transition-all duration-300 transform group-hover:-translate-y-full group-hover:opacity-0">
                        <Link
                            to={`/product/${product.id}`}
                            className="text-[15px] font-bold text-dark truncate hover:text-primary transition-colors"
                        >
                            {product.name}
                        </Link>
                    </div>

                    {/* Add to Cart Button (Visible on Hover) */}
                    <div className="absolute inset-0 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <button
                            onClick={() => addToCart(product, 1)}
                            className="text-red-600 font-bold text-[15px] uppercase tracking-normal transition-all cursor-pointer"
                        >
                            + Add To Cart
                        </button>
                    </div>
                </div>

                {/* 2. Rating Stars (Fixed Position) */}
                <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <i
                            key={i}
                            className={`text-[10px] ${
                                i < product.rating.stars
                                    ? "fa-solid fa-star text-[#f7941d]"
                                    : "fa-regular fa-star text-gray-300"
                            }`}
                        ></i>
                    ))}
                </div>

                {/* 3. Price (Fixed Position) */}
                <div className="flex items-center gap-3">
                    <span className="text-[18px] font-black text-dark">
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-[14px] text-muted line-through font-medium">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
