/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useUserOrders } from "../../_shared/hooks/useUserOrders";
import { useCurrency } from "../../context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OrderItem = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { formatPrice } = useCurrency();

    return (
        <div className="border border-[#e0e0e0] mb-4 transition-all hover:border-dark">
            <div
                className="p-4 md:p-6 cursor-pointer flex flex-wrap items-center justify-between gap-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f5f5f5] flex items-center justify-center rounded-sm">
                        <InventoryIcon className="text-dark opacity-30" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[2px] text-dark">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-sub mt-0.5">
                            {new Date(order.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                },
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-[2px] text-sub">
                            Status
                        </p>
                        <p className="text-xs font-bold text-dark uppercase mt-0.5">
                            {order.status}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[2px] text-sub">
                            Total
                        </p>
                        <p className="text-sm font-black text-primary mt-0.5">
                            {formatPrice(order.total)}
                        </p>
                    </div>
                    {isOpen ? (
                        <KeyboardArrowUpIcon className="text-dark" />
                    ) : (
                        <KeyboardArrowDownIcon className="text-dark" />
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-[#f5f5f5] bg-[#fafafa]"
                    >
                        <div className="p-4 md:p-6">
                            <div className="space-y-4">
                                {order.order_items?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white border border-[#eee] p-1">
                                                <img
                                                    src={item.product_image}
                                                    alt={item.product_name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-dark">
                                                    {item.product_name}
                                                </p>
                                                <p className="text-xs text-sub mt-0.5">
                                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-dark">
                                            $
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-[#eee] grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[2px] text-dark mb-3">
                                        Shipping Address
                                    </h4>
                                    <p className="text-xs text-sub leading-relaxed">
                                        {order.full_name}
                                        <br />
                                        {order.address}
                                        <br />
                                        {order.city}
                                        <br />
                                        {order.phone}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-[2px] text-dark mb-3">
                                        Order Summary
                                    </h4>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-sub">Subtotal</span>
                                        <span className="font-bold text-dark">{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-sub">
                                            Shipping
                                        </span>
                                        <span className="font-bold text-dark">
                                            {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-[#eee]">
                                        <span className="font-black uppercase tracking-[1px] text-dark">Total</span>
                                        <span className="font-black text-primary">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate("/signin");
            } else {
                setUser(session.user);
            }
            setLoadingAuth(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate("/signin");
            } else {
                setUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const { data: orders, isLoading: loadingOrders } = useUserOrders(user?.id);

    if (loadingAuth) return <div className="min-h-screen" />;

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-[#f5f5f5] border-b border-[#e0e0e0] py-4">
                <div className="container-main flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-sub">
                    <Link
                        to="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRightIcon sx={{ fontSize: 13 }} />
                    <span className="text-dark">My Profile</span>
                </div>
            </div>

            <div className="container-main py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                    {/* Sidebar */}
                    <aside>
                        <div className="border border-[#e0e0e0] p-8">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-dark text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                                    {user?.email?.[0]?.toUpperCase() || "U"}
                                </div>
                                <h3 className="text-base font-black text-dark truncate">
                                    {user?.email}
                                </h3>
                                <p className="text-[10px] font-bold uppercase tracking-[2px] text-sub mt-1">
                                    Customer
                                </p>
                            </div>

                            <nav className="space-y-1">
                                <button className="w-full text-left px-4 py-3 bg-dark text-white text-[10px] font-black uppercase tracking-[2px]">
                                    My Orders
                                </button>
                                <button
                                    onClick={() => supabase.auth.signOut()}
                                    className="w-full text-left px-4 py-3 text-dark hover:bg-[#f5f5f5] text-[10px] font-black uppercase tracking-[2px] transition-colors"
                                >
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-dark uppercase tracking-tight mb-2">
                                Order History
                            </h2>
                            <div className="h-1 w-20 bg-primary" />
                        </div>

                        {loadingOrders ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-24 bg-[#f5f5f5] animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : orders?.length > 0 ? (
                            <div>
                                {orders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 border border-dashed border-[#e0e0e0]">
                                <InventoryIcon
                                    sx={{ fontSize: 48 }}
                                    className="text-sub mb-4 opacity-20"
                                />
                                <p className="text-sm font-bold text-dark uppercase tracking-[1px] mb-4">
                                    You haven't placed any orders yet.
                                </p>
                                <Link
                                    to="/shop"
                                    className="btn-primary inline-block"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
