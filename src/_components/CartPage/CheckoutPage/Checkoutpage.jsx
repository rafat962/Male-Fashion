/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckoutForm from "./Checkoutform";
import { useCreateOrder } from "../../../_shared/hooks/useCreateOrder";
import { useCart } from "../../../context/CartContext";
import { useCurrency } from "../../../context/CurrencyContext";
import { supabase } from "../../../supabaseClient";
import toast from "react-hot-toast";

// ── Order Summary Item ──────────────────────────────────
const SummaryItem = ({ item }) => {
    const { formatPrice } = useCurrency();
    return (
        <div className="flex items-center gap-3 py-3 border-b border-[#f5f5f5] last:border-0">
            <div className="relative w-14 h-14 bg-[#f8f8f8] border border-[#efefef] shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                />
                {/* qty badge */}
                <span
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#111] text-white
                                 text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                    {item.quantity}
                </span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#111] line-clamp-1">
                    {item.name}
                </p>
                <p className="text-[10px] text-[#bbb] uppercase tracking-[1px]">
                    {item.category}
                </p>
            </div>
            <span className="text-sm font-black text-[#111] shrink-0">
                {formatPrice(item.price * item.quantity)}
            </span>
        </div>
    );
};

// ── Success State ───────────────────────────────────────
const OrderSuccess = ({ orderId }) => (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
            <CheckCircleOutlineIcon sx={{ fontSize: 72, color: "#22c55e" }} />
            <h2 className="text-2xl font-black text-[#111] mt-4 mb-2">
                Order Placed Successfully!
            </h2>
            <p className="text-sm text-[#999] mb-2">
                Thank you for your order. We'll send a confirmation to your
                email.
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#bbb] mb-8">
                Order ID:{" "}
                <span className="text-[#111]">
                    {orderId?.slice(0, 8).toUpperCase()}
                </span>
            </p>
            <div className="flex gap-3 justify-center">
                <Link to="/" className="btn-outline text-xs">
                    Back to Home
                </Link>
                <Link to="/shop" className="btn-primary text-xs">
                    Continue Shopping
                </Link>
            </div>
        </div>
    </div>
);

// ── Main Checkout Page ──────────────────────────────────
const CheckoutPage = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
    }, []);

    const shipping = totalPrice > 100 ? 0 : 9.99;
    const total = totalPrice + shipping;

    // redirect if cart empty
    if (cartItems.length === 0 && !orderId) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <p className="text-lg font-black text-[#111]">
                    Your cart is empty
                </p>
                <Link to="/shop" className="btn-primary">
                    Go to Shop
                </Link>
            </div>
        );
    }

    // React Query mutation
    const { mutate: placeOrder, isPending } = useCreateOrder({
        onSuccess: (order) => {
            clearCart();
            setOrderId(order.id);
        },
        onError: (err) => {
            toast.error("Something went wrong: " + err.message);
        },
    });

    const handleFormSubmit = (formData) => {
        placeOrder({
            orderData: {
                ...formData,
                user_id: user?.id || null,
                subtotal: totalPrice,
                shipping,
                total,
                discount: 0,
                status: "pending",
            },
            cartItems,
        });
    };

    // ── Success screen
    if (orderId) return <OrderSuccess orderId={orderId} />;

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-[#f5f5f5] border-b border-[#e0e0e0] py-4">
                <div
                    className="container-main flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-[2px] text-[#999]"
                >
                    <Link
                        to="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <Link
                        to="/cart"
                        className="hover:text-primary transition-colors"
                    >
                        Cart
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <span className="text-[#111]">Checkout</span>
                </div>
            </div>

            <div className="container-main py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                    {/* ── Left: Form ──────────────────────── */}
                    <div>
                        <CheckoutForm
                            onSubmit={handleFormSubmit}
                            isLoading={isPending}
                        />
                    </div>

                    {/* ── Right: Order Summary ─────────────── */}
                    <div className="lg:sticky lg:top-28 h-fit">
                        <div className="border border-[#e0e0e0] p-6">
                            <h3
                                className="text-[10px] font-black uppercase tracking-[2px]
                                           text-[#111] mb-4"
                            >
                                Order Summary
                                <span className="font-normal text-[#bbb] ml-1">
                                    ({cartItems.length} items)
                                </span>
                            </h3>

                            {/* Items */}
                            <div className="max-h-64 overflow-y-auto mb-4">
                                {cartItems.map((item) => (
                                    <SummaryItem key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="flex flex-col gap-2.5 pt-4 border-t border-[#f0f0f0]">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#888]">
                                        Subtotal
                                    </span>
                                    <span className="font-bold text-[#111]">
                                        {formatPrice(totalPrice)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#888]">
                                        Shipping
                                    </span>
                                    <span className="font-bold text-[#111]">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">
                                                Free
                                            </span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-[#f0f0f0]">
                                    <span className="text-sm font-black text-[#111] uppercase tracking-[1px]">
                                        Total
                                    </span>
                                    <span className="text-xl font-black text-primary">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            {/* Security note */}
                            <p className="text-[10px] text-[#bbb] text-center mt-4">
                                🔒 Secure checkout — your data is protected
                            </p>
                        </div>

                        <Link
                            to="/cart"
                            className="block text-center text-[11px] font-bold uppercase
                                         tracking-[2px] text-[#999] hover:text-primary
                                         transition-colors mt-3"
                        >
                            ← Back to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
