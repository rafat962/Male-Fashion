import { CATEGORIES, PRICE_RANGES, SIZES, TAGS } from "./Shoppage.utils";
import SearchIcon from "@mui/icons-material/Search";

const SidebarTitle = ({ children }) => (
    <h6 className="text-xs font-black uppercase tracking-[0.2em] text-dark mb-4 pb-2 border-b border-border">
        {children}
    </h6>
);

const ShopSidebar = ({ filters, onFilterChange }) => {
    const { category, priceRange, size, tag, searchTerm } = filters;

    return (
        <aside className="flex flex-col gap-8">
            {/* ── Search Bar ──────────────────────────────── */}
            <div className="relative border border-border group focus-within:border-primary transition-colors">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-3 pr-10 text-sm focus:outline-none bg-transparent"
                    value={searchTerm || ""}
                    onChange={(e) =>
                        onFilterChange("searchTerm", e.target.value)
                    }
                    className="w-full px-4 py-3 pr-10 text-sm focus:outline-none bg-transparent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <SearchIcon
                        sx={{ fontSize: 20 }}
                        className="text-sub group-focus-within:text-primary transition-colors"
                    />
                </div>
            </div>

            {/* ── Categories ──────────────────────────────── */}
            <div>
                <SidebarTitle>Categories</SidebarTitle>
                <ul className="flex flex-col gap-2">
                    <li>
                        <button
                            onClick={() => onFilterChange("category", null)}
                            className={`text-sm w-full text-left transition-colors duration-200 cursor-pointer
                          ${!category ? "text-primary font-bold" : "text-sub hover:text-primary"}`}
                        >
                            All Products
                        </button>
                    </li>
                    {CATEGORIES.map((cat) => (
                        <li key={cat.label}>
                            <button
                                onClick={() =>
                                    onFilterChange(
                                        "category",
                                        category === cat.label
                                            ? null
                                            : cat.label,
                                    )
                                }
                                className={`text-sm w-full text-left flex justify-between transition-colors duration-200 cursor-pointer
                            ${category === cat.label ? "text-primary font-bold" : "text-sub hover:text-primary"}`}
                            >
                                <span>{cat.label}</span>
                                <span className="text-[10px] opacity-60">
                                    ({cat.count})
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Price Filter ────────────────────────────── */}
            <div>
                <SidebarTitle>Filter Price</SidebarTitle>
                <ul className="flex flex-col gap-2">
                    {PRICE_RANGES.map((range) => (
                        <li key={range.label}>
                            <button
                                onClick={() =>
                                    onFilterChange(
                                        "priceRange",
                                        priceRange?.label === range.label
                                            ? null
                                            : range,
                                    )
                                }
                                className={`text-sm w-full text-left transition-colors duration-200 cursor-pointer
                              ${priceRange?.label === range.label ? "text-primary font-bold" : "text-sub hover:text-primary"}`}
                            >
                                {range.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ── Size ────────────────────────────────────── */}
            <div>
                <SidebarTitle>Size</SidebarTitle>
                <div className="flex flex-wrap gap-2">
                    {SIZES.map((s) => (
                        <button
                            key={s}
                            onClick={() =>
                                onFilterChange("size", s === size ? null : s)
                            }
                            className={`w-10 h-10 text-xs font-bold uppercase border transition-all duration-200 cursor-pointer
                          ${size === s ? "bg-primary text-white border-primary" : "border-border text-sub hover:border-primary hover:text-primary"}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Tags ────────────────────────────────────── */}
            <div>
                <SidebarTitle>Tags</SidebarTitle>
                <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                        <button
                            key={t}
                            onClick={() =>
                                onFilterChange("tag", t === tag ? null : t)
                            }
                            className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border transition-all duration-200 cursor-pointer
                          ${tag === t ? "bg-primary text-white border-primary" : "border-border text-sub hover:border-primary hover:text-primary"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ShopSidebar;
