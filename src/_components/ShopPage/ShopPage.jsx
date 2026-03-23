/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { Select, MenuItem } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion"; // استيراد framer-motion
import ProductCard from "./utils/ProductCard";
import ShopSidebar from "./utils/Shopsidebar";
import {
    filterProducts,
    SORT_OPTIONS,
    PRODUCTS_PER_PAGE,
} from "./utils/Shoppage.utils";
import Breadcrumb from "../../_shared/ui/Breadcrumb";

const INITIAL_FILTERS = {
    category: null,
    priceRange: null,
    size: null,
    tag: null,
    searchTerm: "",
};

// إعدادات الـ Animation للـ Grid
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // ظهور المنتجات واحد ورا التاني
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const ShopPage = () => {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [sort, setSort] = useState("default");
    const [page, setPage] = useState(1);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const { products, total, totalPages } = useMemo(
        () => filterProducts({ ...filters, sort, page }),
        [filters, sort, page],
    );

    const start = (page - 1) * PRODUCTS_PER_PAGE + 1;
    const end = Math.min(page * PRODUCTS_PER_PAGE, total);

    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb pageName={"Shop"} />

            <div className="container-main py-12">
                <div className="flex gap-10">
                    {/* Sidebar مع دخول تدريجي من الشمال */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="hidden lg:block w-60 shrink-0"
                    >
                        <ShopSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                            <p className="text-sm text-sub">
                                Showing{" "}
                                <span className="font-bold text-dark">
                                    {start}–{end}
                                </span>{" "}
                                of{" "}
                                <span className="font-bold text-dark">
                                    {total}
                                </span>{" "}
                                results
                            </p>
                            <Select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                size="small"
                                sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    borderRadius: 0,
                                    minWidth: 180,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "var(--color-border)",
                                    },
                                }}
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <MenuItem
                                        key={opt.value}
                                        value={opt.value}
                                        sx={{ fontSize: "0.75rem" }}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        {/* Products Grid مع AnimatePresence عشان لما الفلاتر تتغير */}
                        <AnimatePresence mode="wait">
                            {products.length > 0 ? (
                                <motion.div
                                    key={JSON.stringify(filters) + sort + page} // كود فريد عشان يعيد الـ animation عند التغيير
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="grid grid-cols-2 md:grid-cols-3 gap-5"
                                >
                                    {products.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            variants={itemVariants}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-sub text-center"
                                >
                                    <p className="text-2xl font-black text-dark mb-2">
                                        No products found
                                    </p>
                                    <p className="text-sm">
                                        Try adjusting your filters
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFilters(INITIAL_FILTERS);
                                            setPage(1);
                                        }}
                                        className="btn-primary mt-6 cursor-pointer"
                                    >
                                        Clear Filters
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                layout // انتقال ناعم لما عدد الصفحات يتغير
                                className="flex items-center justify-center gap-2 mt-10"
                            >
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1,
                                ).map((p) => (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-9 h-9 text-sm font-bold border transition-all duration-200 cursor-pointer
                                        ${page === p ? "bg-primary text-white border-primary" : "border-border text-sub hover:border-primary hover:text-primary"}`}
                                    >
                                        {p}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
