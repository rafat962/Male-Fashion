/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast"; // Import toast

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            return [...prev, { ...product, quantity }];
        });

        // Trigger success toast
        toast.success(
            <div className="flex flex-col">
                <span className="font-bold">Added to cart!</span>
                <span className="text-[14px] opacity-90">
                    {product.name}{" "}
                    <span className="text-primary font-bold">
                        (x{quantity})
                    </span>
                </span>
            </div>,
            {
                duration: 3000,
                style: {
                    border: "1px solid #e2e8f0", // Light border
                    padding: "12px 16px",
                    color: "#1a202c",
                    borderRadius: "4px", // Slightly rounded for a modern look
                    background: "#ffffff",
                },
                iconTheme: {
                    primary: "#10b981", // Emerald Green color for the checkmark
                    secondary: "#ffffff",
                },
            },
        );
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
        toast.error("Item removed from cart");
    }, []);

    const updateQuantity = useCallback(
        (productId, quantity) => {
            if (quantity <= 0) {
                removeFromCart(productId);
                return;
            }
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === productId ? { ...item, quantity } : item,
                ),
            );
        },
        [removeFromCart],
    );

    const clearCart = useCallback(() => {
        setCartItems([]);
        toast("Cart cleared", { icon: "🗑️" });
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export default CartContext;
