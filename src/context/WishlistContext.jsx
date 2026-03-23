/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    // Initialize wishlist from localStorage
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Persist wishlist to localStorage on every change
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = useCallback((product) => {
        setWishlistItems((prev) => {
            if (prev.find((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        setWishlistItems((prev) =>
            prev.filter((item) => item.id !== productId),
        );
    }, []);

    const toggleWishlist = useCallback((product) => {
        setWishlistItems((prev) =>
            prev.find((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product],
        );
    }, []);

    const isWishlisted = useCallback(
        (productId) => wishlistItems.some((item) => item.id === productId),
        [wishlistItems],
    );

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isWishlisted,
                totalWishlist: wishlistItems.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx)
        throw new Error("useWishlist must be used within WishlistProvider");
    return ctx;
};

export default WishlistContext;
