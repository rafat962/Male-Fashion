import { useState } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "../../context/CartContext";

/* ── Quantity Selector ─────────────────────────────────── */
const QtySelector = ({ value, onChange }) => (
    <div className="flex items-center border border-border dark:border-dark-border w-fit">
        <button
            onClick={() => onChange(value - 1)}
            className="w-8 h-8 text-muted dark:text-dark-muted hover:text-primary hover:bg-primary-light
                       transition-colors duration-200 text-base"
        >
            −
        </button>
        <input
            type="number"
            min={1}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-10 h-8 text-center text-sm font-bold text-dark dark:text-white
                       border-x border-border dark:border-dark-border outline-none bg-white dark:bg-dark-paper
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
            onClick={() => onChange(value + 1)}
            className="w-8 h-8 text-muted dark:text-dark-muted hover:text-primary hover:bg-primary-light
                       transition-colors duration-200 text-base"
        >
            +
        </button>
    </div>
);

/* ── Main Cart Page ────────────────────────────────────── */
const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } =
        useCart();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState("");

    const shipping = totalPrice > 100 ? 0 : 9.99;
    const subtotal = totalPrice;
    const total = subtotal - discount + (subtotal > 0 ? shipping : 0);

    const applyCoupon = () => {
        if (coupon.toUpperCase() === "MALE10") {
            setDiscount(+(subtotal * 0.1).toFixed(2));
            setCouponMsg("✓ 10% discount applied!");
        } else {
            setDiscount(0);
            setCouponMsg("✗ Invalid coupon code.");
        }
    };

    /* ── Empty cart ──────────────────────────────────── */
    if (cartItems.length === 0)
        return (
            <div className="bg-white dark:bg-dark-bg min-h-screen">
                <div className="bg-bg-gray dark:bg-dark-paper border-b border-border dark:border-dark-border py-4">
                    <div
                        className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted dark:text-dark-muted"
                    >
                        <Link
                            to="/"
                            className="hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <Link
                            to="/shop"
                            className="hover:text-primary transition-colors"
                        >
                            Shop
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-dark dark:text-white">Shopping Cart</span>
                    </div>
                </div>
                <div className="container-main py-24 flex flex-col items-center text-center">
                    <ShoppingBagOutlinedIcon
                        sx={{ fontSize: 64, color: "var(--color-border)" }}
                    />
                    <h2 className="text-2xl font-black text-dark dark:text-white mt-6 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-sm text-muted dark:text-dark-muted mb-8">
                        Looks like you haven't added anything yet.
                    </p>
                    <Link to="/shop" className="btn-primary">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="bg-white dark:bg-dark-bg min-h-screen">
            {/* ── Breadcrumb ────────────────────────────── */}
            <div className="bg-bg-gray dark:bg-dark-paper border-b border-border dark:border-dark-border py-4">
                <div
                    className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-muted dark:text-dark-muted"
                >
                    <Link
                        to="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <Link
                        to="/shop"
                        className="hover:text-primary transition-colors"
                    >
                        Shop
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <span className="text-dark dark:text-white">Shopping Cart</span>
                </div>
            </div>

            <div className="container-main py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* ── Left: Cart Table ──────────────── */}
                    <div className="flex-1 min-w-0">
                        {/* Table Header */}
                        <div
                            className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4
                                        border-b border-border dark:border-dark-border pb-3 mb-2"
                        >
                            {["Product", "Quantity", "Total", ""].map((h) => (
                                <span
                                    key={h}
                                    className="text-[10px] font-black uppercase
                                                         tracking-[2px] text-dim dark:text-dark-muted"
                                >
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Cart Items */}
                        <div className="flex flex-col divide-y divide-border-light dark:divide-dark-border">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto]
                                               gap-4 items-center py-5"
                                >
                                    {/* Product info */}
                                    <div className="flex items-center gap-4">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="w-20 h-20 bg-bg-light dark:bg-dark-paper border
                                                        border-border-light dark:border-dark-border shrink-0 overflow-hidden"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform"
                                            />
                                        </Link>
                                        <div>
                                            <p
                                                className="text-[10px] font-bold uppercase
                                                          tracking-[2px] text-dim mb-0.5"
                                            >
                                                {item.category}
                                            </p>
                                            <Link
                                                to={`/product/${item.id}`}
                                                className="text-sm font-bold text-dark dark:text-white leading-snug hover:text-primary transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-sm font-black text-primary mt-1">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <QtySelector
                                            value={item.quantity}
                                            onChange={(v) =>
                                                updateQuantity(item.id, v)
                                            }
                                        />
                                    </div>

                                    {/* Total */}
                                    <div>
                                        <span className="text-base font-black text-dark dark:text-white">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-8 h-8 flex items-center justify-center
                                                   text-dim hover:text-primary hover:bg-primary-light
                                                   transition-all duration-200"
                                    >
                                        <DeleteOutlineIcon
                                            sx={{ fontSize: 18 }}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="flex items-center justify-between mt-6 pt-6
                                        border-t border-border dark:border-dark-border flex-wrap gap-3"
                        >
                            <Link to="/shop" className="btn-outline text-xs">
                                ← Continue Shopping
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-[11px] font-bold uppercase tracking-[2px]
                                           text-muted dark:text-dark-muted hover:text-primary transition-colors duration-200"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Summary ────────────────── */}
                    <div className="lg:w-80 shrink-0 flex flex-col gap-5">
                        {/* Coupon */}
                        <div className="border border-border dark:border-dark-border p-5">
                            <h6
                                className="text-[10px] font-black uppercase tracking-[2px]
                                           text-dark dark:text-white mb-4"
                            >
                                Discount Code
                            </h6>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="flex-1 border border-border dark:border-dark-border border-r-0 px-3
                                               text-sm outline-none focus:border-dark dark:focus:border-white dark:bg-dark-paper dark:text-white
                                               transition-colors duration-200 h-10"
                                />
                                <button
                                    onClick={applyCoupon}
                                    className="h-10 px-4 bg-dark text-white text-[10px]
                                               font-bold uppercase tracking-[2px]
                                               hover:bg-primary transition-colors duration-200"
                                >
                                    Apply
                                </button>
                            </div>
                            {couponMsg && (
                                <p
                                    className={`text-xs mt-2 font-medium
                                              ${couponMsg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}
                                >
                                    {couponMsg}
                                </p>
                            )}
                            <p className="text-[10px] text-dim mt-2">
                                Try: <span className="font-bold">MALE10</span>
                            </p>
                        </div>

                        {/* Cart Total */}
                        <div className="border border-border dark:border-dark-border p-5">
                            <h6
                                className="text-[10px] font-black uppercase tracking-[2px]
                                           text-dark dark:text-white mb-4"
                            >
                                Cart Total
                            </h6>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-sub dark:text-dark-muted">
                                        Subtotal
                                    </span>
                                    <span className="font-bold text-dark dark:text-white">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">
                                            Discount
                                        </span>
                                        <span className="font-bold text-green-600">
                                            −${discount.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-sub dark:text-dark-muted">
                                        Shipping
                                    </span>
                                    <span className="font-bold text-dark dark:text-white">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">
                                                Free
                                            </span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                {shipping > 0 && (
                                    <p className="text-[10px] text-dim">
                                        Free shipping on orders over $100
                                    </p>
                                )}

                                <div className="border-t border-border dark:border-dark-border pt-3 flex justify-between">
                                    <span
                                        className="text-sm font-black text-dark dark:text-white uppercase
                                                     tracking-[1px]"
                                    >
                                        Total
                                    </span>
                                    <span className="text-lg font-black text-primary">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-5 text-center">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
