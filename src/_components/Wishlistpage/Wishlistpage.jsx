import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const WishlistPage = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlistItems.length === 0)
        return (
            <div className="bg-white min-h-screen">
                <div className="bg-dim border-b border-border-light py-4">
                    <div
                        className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted"
                    >
                        <Link
                            to="/"
                            className="hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-dark">Wishlist</span>
                    </div>
                </div>
                <div className="container-main py-24 flex flex-col items-center text-center">
                    <FavoriteIcon sx={{ fontSize: 64, className: "text-dim" }} />
                    <h2 className="text-2xl font-black text-dark mt-6 mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-sm text-muted mb-8">
                        Save items you love to your wishlist and come back
                        later.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-dim border-b border-border-light py-4">
                <div
                    className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted"
                >
                    <Link
                        to="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <span className="text-dark">Wishlist</span>
                </div>
            </div>

            <div className="container-main py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="section-subtitle text-left mb-1">
                            Saved Items
                        </p>
                        <h1 className="text-2xl font-black text-dark">
                            My Wishlist
                            <span className="text-base font-normal text-text-dim ml-2">
                                ({wishlistItems.length} items)
                            </span>
                        </h1>
                    </div>
                    <Link
                        to="/shop"
                        className="btn-outline text-xs hidden sm:inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {wishlistItems.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white border border-border-dim
                                       hover:border-light-muted hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]
                                       transition-all duration-300"
                        >
                            {/* Remove */}
                            <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center
                                           justify-center bg-white border border-border-dim
                                           text-light-muted hover:text-primary hover:border-primary
                                           transition-all duration-200 opacity-0 group-hover:opacity-100"
                            >
                                <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                            </button>

                            {/* Badge */}
                            {product.badge === "new" && (
                                <span
                                    className="absolute top-3 left-3 z-10 bg-dark text-white
                                                 text-[0.6rem] font-bold uppercase tracking-[2px]
                                                 px-2 py-0.5"
                                >
                                    New
                                </span>
                            )}
                            {product.badge === "sale" && (
                                <span
                                    className="absolute top-3 left-3 z-10 bg-primary text-white
                                                 text-[0.6rem] font-bold uppercase tracking-[2px]
                                                 px-2 py-0.5"
                                >
                                    Sale
                                </span>
                            )}

                            {/* Image */}
                            <Link
                                to={`/product/${product.id}`}
                                className="block aspect-square bg-dim overflow-hidden p-4"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105
                                               transition-transform duration-500"
                                />
                            </Link>

                            {/* Info */}
                            <div className="p-4">
                                <p
                                    className="text-[10px] font-bold uppercase tracking-[2px]
                                              text-text-dim mb-1"
                                >
                                    {product.category}
                                </p>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="block text-sm font-bold text-dark line-clamp-1 mb-1 hover:text-primary transition-colors"
                                >
                                    {product.name}
                                </Link>
                                <p className="text-base font-black text-primary mb-3">
                                    ${product.price.toFixed(2)}
                                </p>

                                <button
                                    onClick={() => addToCart(product, 1)}
                                    className="w-full h-8 bg-dark text-white text-[0.6rem]
                                               font-bold uppercase tracking-[1.5px]
                                               flex items-center justify-center gap-1.5
                                               hover:bg-primary transition-colors duration-200"
                                >
                                    <AddShoppingCartIcon
                                        sx={{ fontSize: 13 }}
                                    />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
