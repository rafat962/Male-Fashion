/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Importing the data from your JSON file
import productsData from "../../../data/products.json";
import ProductCard from "./ProductCard.jsx";
const TABS = [
    { id: "bestSellers", label: "Best Sellers" },
    { id: "newArrivals", label: "New Arrivals" },
    { id: "hotSales", label: "Hot Sales" },
];

const ProductSection = () => {
    const [activeTab, setActiveTab] = useState("bestSellers");

    // Filter products based on the activeTab from the JSON data
    const filteredProducts = productsData.filter((product) =>
        product.tabs.includes(activeTab),
    );

    return (
        <section className="py-24 bg-white dark:bg-dark-bg">
            <div className="max-w-[1170px] mx-auto px-4">
                {/* Tabs Navigation */}
                <div className="flex justify-center items-center gap-6 md:gap-12 mb-16">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative text-lg md:text-2xl font-bold tracking-tight transition-all cursor-pointer duration-300 ${
                                activeTab === tab.id
                                    ? "text-dark dark:text-white"
                                    : "text-light-muted dark:text-dark-muted hover:text-dark dark:hover:text-white"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabUnderline"
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary w-full mx-auto"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Products Grid with Layout Animation */}
                {/* Products Grid / Slider */}
                <motion.div
                    layout
                    className="
        flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory 
        md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 md:gap-y-10 md:pb-0
    "
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="min-w-[280px] sm:min-w-0 snap-start px-2 md:px-0"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductSection;
