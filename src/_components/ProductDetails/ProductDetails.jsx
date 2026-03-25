import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import productsData from "../../data/products.json";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Breadcrumb from "../../_shared/ui/Breadcrumb";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const [qty, setQty] = useState(1);
    const [activeImg, setActiveImg] = useState(null);

    const product = useMemo(() => {
        const found = productsData.find((p) => p.id === parseInt(id));
        if (found) setActiveImg(found.image);
        return found;
    }, [id]);

    if (!product) {
        return (
            <div className="bg-white dark:bg-dark-bg min-h-screen">
                <Breadcrumb pageName="Product Not Found" />
                <div className="container-main py-24 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-black text-dark dark:text-white mt-6 mb-2">
                        Product Not Found
                    </h2>
                    <p className="text-sm text-muted dark:text-dark-muted mb-8">
                        The product you are looking for does not exist.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleQty = (val) => {
        const n = parseInt(val);
        if (!isNaN(n) && n >= 1) setQty(n);
    };

    const wished = isWishlisted(product.id);

    const relatedProducts = useMemo(() => {
        return productsData
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product]);

    return (
        <div className="bg-white dark:bg-dark-bg min-h-screen">
            <Breadcrumb pageName={product.name} />

            <div className="container-main py-12 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    {/* Image Section */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-bg-light dark:bg-dark-paper flex items-center justify-center p-8 lg:p-12 aspect-square overflow-hidden group">
                            <img
                                src={activeImg || product.image}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-4">
                            {[product.image, product.image, product.image, product.image].map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(img)}
                                    className={`aspect-square border-2 shrink-0 cursor-pointer transition-all ${
                                        (activeImg === img && i === 0) || (activeImg === img)
                                            ? "border-primary shadow-sm"
                                            : "border-transparent hover:border-border grayscale hover:grayscale-0"
                                    } bg-bg-light dark:bg-dark-paper p-2 flex items-center justify-center`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[2px] text-primary mb-2">
                            {product.category}
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-black text-dark dark:text-white mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border-light dark:border-dark-border">
                            <Rating
                                value={product.rating.stars}
                                readOnly
                                size="small"
                                sx={{ color: "var(--color-primary)" }}
                            />
                            <span className="text-xs text-muted dark:text-dark-muted">
                                ({product.rating.count} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-black text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && (
                                <span className="text-lg text-dim dark:text-dark-muted line-through font-medium">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="text-[#666] dark:text-dark-text leading-relaxed mb-8">
                            {product.description || "No description available for this product."}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-border dark:border-dark-border h-12">
                                <button
                                    onClick={() => handleQty(qty - 1)}
                                    className="w-12 flex items-center justify-center text-dark dark:text-white hover:text-primary transition-colors cursor-pointer text-xl font-bold"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    value={qty}
                                    onChange={(e) => handleQty(e.target.value)}
                                    className="w-12 text-center text-sm font-bold text-dark dark:text-white border-x border-border dark:border-dark-border outline-none bg-transparent"
                                />
                                <button
                                    onClick={() => handleQty(qty + 1)}
                                    className="w-12 flex items-center justify-center text-dark dark:text-white hover:text-primary transition-colors cursor-pointer text-xl font-bold"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={() => addToCart(product, qty)}
                                className="flex-1 min-w-[200px] h-12 bg-dark dark:bg-white dark:text-dark text-white text-xs font-bold uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors cursor-pointer"
                            >
                                <AddShoppingCartIcon sx={{ fontSize: 18 }} />
                                Add to Cart
                            </button>

                            {/* Wishlist */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="w-12 h-12 border border-border dark:border-dark-border flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer dark:text-white"
                            >
                                {wished ? (
                                    <FavoriteIcon sx={{ fontSize: 20, color: "#e53637" }} />
                                ) : (
                                    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                                )}
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-10 pt-10 border-t border-border-light dark:border-dark-border">
                            <ul className="flex flex-col gap-2">
                                <li className="text-xs uppercase tracking-[1px] text-dark dark:text-white font-bold">
                                    SKU: <span className="text-muted dark:text-dark-muted font-normal">BE-0012{product.id}</span>
                                </li>
                                <li className="text-xs uppercase tracking-[1px] text-dark dark:text-white font-bold">
                                    Categories: <span className="text-muted dark:text-dark-muted font-normal">{product.category}</span>
                                </li>
                                <li className="text-xs uppercase tracking-[1px] text-dark dark:text-white font-bold">
                                    Tags: <span className="text-muted dark:text-dark-muted font-normal">{product.tabs?.join(", ")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20 pt-20 border-t border-border-light dark:border-dark-border">
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-[3px] text-primary mb-2">Check Out</p>
                            <h2 className="text-3xl font-black text-dark dark:text-white">Related Products</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/product/${p.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="group"
                                >
                                    <div className="aspect-square bg-bg-light dark:bg-dark-paper mb-4 overflow-hidden p-6 flex items-center justify-center">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-dark dark:text-white group-hover:text-primary transition-colors truncate">
                                        {p.name}
                                    </h3>
                                    <p className="text-primary font-black mt-1">${p.price.toFixed(2)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
