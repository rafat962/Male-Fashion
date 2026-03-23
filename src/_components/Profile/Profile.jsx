import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";
import Breadcrumb from "../../_shared/ui/Breadcrumb";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const MOCK_ORDERS = [
    {
        id: "ORD-7721",
        date: "2024-02-15",
        status: "Delivered",
        total: 124.99,
        items: [
            { name: "Piqué Biker Jacket", qty: 1, price: 67.24 },
            { name: "Multi-pocket Chest Bag", qty: 1, price: 57.75 },
        ],
    },
    {
        id: "ORD-8812",
        date: "2024-01-20",
        status: "Processing",
        total: 89.50,
        items: [
            { name: "Contrast Patch T-Shirt", qty: 2, price: 44.75 },
        ],
    },
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/signin");
            } else {
                setUser(session.user);
            }
            setLoading(false);
        };
        getProfile();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb pageName="My Profile" />

            <div className="container-main py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* ── Sidebar: User Info ────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-bg-gray border border-border p-8 rounded-sm sticky top-24">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm">
                                    <PersonOutlineIcon sx={{ fontSize: 48, color: "var(--color-dim)" }} />
                                </div>
                                <h2 className="text-xl font-black text-dark uppercase tracking-tight">
                                    {user?.user_metadata?.full_name || "Valued Customer"}
                                </h2>
                                <p className="text-sm text-sub font-medium">{user?.email}</p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 bg-dark text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                                    Order History
                                </button>
                                <button className="w-full text-left px-4 py-3 text-dark hover:bg-white border border-transparent hover:border-border text-xs font-bold uppercase tracking-widest rounded-sm transition-all">
                                    Account Settings
                                </button>
                                <button className="w-full text-left px-4 py-3 text-dark hover:bg-white border border-transparent hover:border-border text-xs font-bold uppercase tracking-widest rounded-sm transition-all">
                                    Shipping Addresses
                                </button>
                                <button
                                    onClick={async () => {
                                        await supabase.auth.signOut();
                                        navigate("/");
                                    }}
                                    className="w-full text-left px-4 py-3 text-primary hover:bg-primary-light text-xs font-bold uppercase tracking-widest rounded-sm transition-all mt-4"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Main Content: Orders ──────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Inventory2OutlinedIcon sx={{ color: "var(--color-dark)" }} />
                            <h3 className="text-2xl font-black text-dark uppercase tracking-tight">Recent Orders</h3>
                        </div>

                        <div className="space-y-6">
                            {MOCK_ORDERS.map((order) => (
                                <div key={order.id} className="border border-border rounded-sm overflow-hidden bg-white hover:shadow-card transition-shadow">
                                    {/* Order Header */}
                                    <div className="bg-bg-gray px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-border">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-sub mb-1">Order ID</p>
                                                <p className="text-sm font-bold text-dark">{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-sub mb-1">Date</p>
                                                <div className="flex items-center gap-1.5 text-sm font-bold text-dark">
                                                    <EventAvailableOutlinedIcon sx={{ fontSize: 16, color: "var(--color-sub)" }} />
                                                    {order.date}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-sub mb-1">Total</p>
                                                <p className="text-sm font-black text-primary">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <ul className="divide-y divide-border-light">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="py-3 flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-bold text-dark">{item.name}</p>
                                                        <p className="text-xs text-sub">Qty: {item.qty}</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-dark">${item.price.toFixed(2)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex justify-end gap-3">
                                            <button className="px-6 py-2 border border-dark text-xs font-bold uppercase tracking-widest hover:bg-dark hover:text-white transition-all">
                                                Order Details
                                            </button>
                                            <button className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-all">
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 border border-dashed border-border rounded-sm bg-bg-light text-center">
                            <LocalShippingOutlinedIcon sx={{ fontSize: 40, color: "var(--color-dim)", mb: 2 }} />
                            <h4 className="text-lg font-bold text-dark mb-2">Free shipping on your next order!</h4>
                            <p className="text-sm text-sub">As a valued customer, you get free shipping on all orders over $50.</p>
                            <button
                                onClick={() => navigate("/shop")}
                                className="mt-6 btn-primary"
                            >
                                Shop Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
