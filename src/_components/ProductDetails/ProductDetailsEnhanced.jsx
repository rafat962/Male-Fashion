/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShareIcon from "@mui/icons-material/Share";
import productsData from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCurrency } from "../../context/CurrencyContext";
import Breadcrumb from "../../_shared/ui/Breadcrumb";
import ProductCard from "../HomePage/utils/ProductCard";

const ProductDetailsEnhanced = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { formatPrice } = useCurrency();
    const [qty, setQty] = useState(1);
    const [selectedColor, setSelectedColor] = useState("Black");
    const [selectedSize, setSelectedSize] = useState("M");
    const [activeTab, setActiveTab] = useState("description");
    const [imageIndex, setImageIndex] = useState(0);

    const product = useMemo(() => {
        return productsData.find((p) => p.id === parseInt(id));
    }, [id]);

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return productsData
            .filter(
                (p) => p.category === product.category && p.id !== product.id,
            )
            .slice(0, 4);
    }, [product]);

    // Sample images for gallery (using the main image and variations)
    const productImages = useMemo(() => {
        if (!product) return [];
        return [product.image, product.image, product.image, product.image];
    }, [product]);

    const colors = ["Black", "Navy", "Gray", "Brown"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    if (!product) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white min-h-screen"
            >
                <Breadcrumb pageName="Product Not Found" />
                <div className="container-main py-24 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-black text-dark mt-6 mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-sm text-muted mb-8">
                        The product you are looking for does not exist.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </motion.div>
        );
    }

    const handleQty = (val) => {
        const n = parseInt(val);
        if (!isNaN(n) && n >= 1) setQty(n);
    };

    const wished = isWishlisted(product.id);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb pageName={product.name} />

            <div className="container-main py-12 lg:py-20">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-16">
                    {/* Image Gallery Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-4"
                    >
                        {/* Main Image */}
                        <div className="relative bg-bg-light flex items-center justify-center p-8 lg:p-12 overflow-hidden group">
                            <motion.img
                                key={imageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={productImages[imageIndex]}
                                alt={product.name}
                                className="max-w-full max-h-[500px] object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.badge && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white z-10 ${
                                        product.badge === "new"
                                            ? "bg-primary"
                                            : "bg-dark"
                                    }`}
                                >
                                    {product.badge}
                                </motion.div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {productImages.length > 1 && (
                            <div className="flex gap-3">
                                {productImages.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setImageIndex(idx)}
                                        className={`w-20 h-20 border-2 transition-all ${
                                            imageIndex === idx
                                                ? "border-primary"
                                                : "border-border-light hover:border-border"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Product view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Category & Title */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs font-bold uppercase tracking-[2px] text-primary mb-2"
                        >
                            {product.category}
                        </motion.p>
                        <h1 className="text-3xl lg:text-4xl font-black text-dark mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border-light">
                            <Rating
                                value={product.rating.stars}
                                readOnly
                                size="small"
                                sx={{ color: "var(--color-primary)" }}
                            />
                            <span className="text-xs text-muted font-medium">
                                {product.rating.stars} out of 5
                            </span>
                            <span className="text-xs text-text-dim">
                                ({product.rating.count} customer reviews)
                            </span>
                        </div>

                        {/* Price Section */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-primary">
                                    {formatPrice(product.price)}
                                </span>
                                {product.oldPrice && (
                                    <>
                                        <span className="text-lg text-dim line-through font-medium">
                                            {formatPrice(product.oldPrice)}
                                        </span>
                                        <span className="text-sm font-bold text-black bg-primary bg-opacity-10 px-2 py-1">
                                            {Math.round(
                                                ((product.oldPrice -
                                                    product.price) /
                                                    product.oldPrice) *
                                                    100,
                                            )}
                                            % OFF
                                        </span>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* Description */}
                        <p className="text-text-dim leading-relaxed mb-8 text-sm">
                            {product.description ||
                                "No description available for this product."}
                        </p>

                        {/* Color & Size Selectors */}
                        <div className="space-y-6 mb-8">
                            {/* Color Selector */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-[1px] text-dark mb-3 block">
                                    Color:{" "}
                                    <span className="text-primary">
                                        {selectedColor}
                                    </span>
                                </label>
                                <div className="flex gap-3">
                                    {colors.map((color) => (
                                        <motion.button
                                            key={color}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setSelectedColor(color)
                                            }
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                                                selectedColor === color
                                                    ? "border-primary scale-110"
                                                    : "border-border-light hover:border-primary"
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    color === "Black"
                                                        ? "#111111"
                                                        : color === "Navy"
                                                          ? "#001f3f"
                                                          : color === "Gray"
                                                            ? "#999999"
                                                            : "#8B4513",
                                            }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-[1px] text-dark mb-3 block">
                                    Size:{" "}
                                    <span className="text-primary">
                                        {selectedSize}
                                    </span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <motion.button
                                            key={size}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                            className={`px-4 py-2 border-2 text-xs font-bold uppercase tracking-[0.5px] transition-all ${
                                                selectedSize === size
                                                    ? "bg-primary text-white border-primary"
                                                    : "border-border-light text-dark hover:border-primary"
                                            }`}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-col gap-4 mb-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border h-12">
                                    <button
                                        onClick={() => handleQty(qty - 1)}
                                        className="w-12 flex items-center justify-center text-dark hover:text-primary transition-colors cursor-pointer text-xl font-bold"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        value={qty}
                                        onChange={(e) =>
                                            handleQty(e.target.value)
                                        }
                                        className="w-12 text-center text-sm font-bold text-dark border-x border-border outline-none bg-transparent"
                                    />
                                    <button
                                        onClick={() => handleQty(qty + 1)}
                                        className="w-12 flex items-center justify-center text-dark hover:text-primary transition-colors cursor-pointer text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart & Wishlist */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => addToCart(product, qty)}
                                    className="flex-1 h-12 bg-dark text-white text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-primary transition-colors cursor-pointer"
                                >
                                    <AddShoppingCartIcon
                                        sx={{ fontSize: 18 }}
                                    />
                                    Add to Cart
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => toggleWishlist(product)}
                                    className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={wished ? "active" : "inactive"}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                        >
                                            {wished ? (
                                                <FavoriteIcon
                                                    sx={{
                                                        fontSize: 20,
                                                        color: "#e53637",
                                                    }}
                                                />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    sx={{ fontSize: 20 }}
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={handleShare}
                                    className="w-12 h-12 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer"
                                    title="Share Product"
                                >
                                    <ShareIcon sx={{ fontSize: 20 }} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border-light">
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <LocalShippingIcon
                                    sx={{
                                        fontSize: 28,
                                        color: "var(--color-primary)",
                                        mb: 1,
                                    }}
                                />
                                <p className="text-xs font-bold uppercase tracking-[0.5px] text-dark">
                                    Free Shipping
                                </p>
                                <p className="text-xs text-muted">
                                    On orders over $100
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <AssignmentReturnIcon
                                    sx={{
                                        fontSize: 28,
                                        color: "var(--color-primary)",
                                        mb: 1,
                                    }}
                                />
                                <p className="text-xs font-bold uppercase tracking-[0.5px] text-dark">
                                    Easy Returns
                                </p>
                                <p className="text-xs text-muted">
                                    30-day return policy
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <VerifiedUserIcon
                                    sx={{
                                        fontSize: 28,
                                        color: "var(--color-primary)",
                                        mb: 1,
                                    }}
                                />
                                <p className="text-xs font-bold uppercase tracking-[0.5px] text-dark">
                                    Secure Payment
                                </p>
                                <p className="text-xs text-muted">
                                    100% protected
                                </p>
                            </motion.div>
                        </div>

                        {/* Product Info Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-10 pt-10 border-t border-border-light"
                        >
                            {/* Tab Navigation */}
                            <div className="flex gap-6 mb-6 border-b border-border-light">
                                {["description", "reviews", "details"].map(
                                    (tab) => (
                                        <motion.button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-3 text-xs font-bold uppercase tracking-[1px] transition-colors relative ${
                                                activeTab === tab
                                                    ? "text-primary"
                                                    : "text-muted hover:text-dark"
                                            }`}
                                        >
                                            {tab.charAt(0).toUpperCase() +
                                                tab.slice(1)}
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="underline"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                                />
                                            )}
                                        </motion.button>
                                    ),
                                )}
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {activeTab === "description" && (
                                    <motion.div
                                        key="description"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <p className="text-sm text-text-dim leading-relaxed">
                                            {product.description}
                                        </p>
                                        <ul className="text-sm text-text-dim space-y-2 list-disc list-inside">
                                            <li>Premium quality materials</li>
                                            <li>
                                                Comfortable fit for all-day wear
                                            </li>
                                            <li>
                                                Versatile design for any
                                                occasion
                                            </li>
                                            <li>Easy care and maintenance</li>
                                        </ul>
                                    </motion.div>
                                )}

                                {activeTab === "reviews" && (
                                    <motion.div
                                        key="reviews"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <p className="text-sm font-bold text-dark mb-4">
                                            Customer Reviews (
                                            {product.rating.count})
                                        </p>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="pb-4 border-b border-border-light"
                                                >
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Rating
                                                            value={5}
                                                            readOnly
                                                            size="small"
                                                            sx={{
                                                                color: "var(--color-primary)",
                                                            }}
                                                        />
                                                        <span className="text-xs font-bold text-dark">
                                                            Verified Purchase
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-text-dim">
                                                        Great product! Excellent
                                                        quality and fast
                                                        shipping.
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "details" && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-dark">
                                                SKU:
                                            </span>
                                            <span className="text-text-dim">
                                                BE-0012{product.id}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-dark">
                                                Category:
                                            </span>
                                            <span className="text-text-dim">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-dark">
                                                Tags:
                                            </span>
                                            <span className="text-text-dim">
                                                {product.tabs?.join(", ")}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-dark">
                                                Availability:
                                            </span>
                                            <span className="text-primary font-bold">
                                                In Stock
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-border-light">
                        <div className="text-center mb-12">
                            <span className="section-subtitle">
                                You May Also Like
                            </span>
                            <h2 className="text-3xl font-black text-dark uppercase tracking-tight">
                                Related Products
                            </h2>
                        </div>
                        <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide snap-x">
                            {relatedProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="min-w-[280px] sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1.5rem)] snap-start"
                                >
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsEnhanced;
