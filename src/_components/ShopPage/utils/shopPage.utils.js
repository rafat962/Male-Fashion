import products from "../../../data/products.json";

// ── Dynamic categories from actual JSON data ──────────────
export const CATEGORIES = Object.entries(
    products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {}),
)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));

// ── Dynamic tags from actual categories ───────────────────
export const TAGS = [...new Set(products.map((p) => p.category))].sort();

// ── Static options ────────────────────────────────────────
export const PRICE_RANGES = [
    { label: "$0.00  –  $30.00", min: 0, max: 30 },
    { label: "$30.00 –  $60.00", min: 30, max: 60 },
    { label: "$60.00 –  $100.00", min: 60, max: 100 },
    { label: "$100.00 – $150.00", min: 100, max: 150 },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const SORT_OPTIONS = [
    { label: "Default", value: "default" },
    { label: "Price: Low → High", value: "price_asc" },
    { label: "Price: High → Low", value: "price_desc" },
    { label: "Name: A → Z", value: "name_asc" },
];

export const PRODUCTS_PER_PAGE = 9;

// ── Filter + Sort + Paginate ──────────────────────────────
export function filterProducts({
    category,
    priceRange,
    tag,
    sort,
    page,
    searchTerm,
}) {
    let result = [...products];

    if (searchTerm?.trim()) {
        const q = searchTerm.toLowerCase().trim();
        result = result.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q),
        );
    }

    if (category) result = result.filter((p) => p.category === category);

    if (priceRange)
        result = result.filter(
            (p) => p.price >= priceRange.min && p.price <= priceRange.max,
        );

    if (tag && !category) result = result.filter((p) => p.category === tag);

    switch (sort) {
        case "price_asc":
            result.sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            result.sort((a, b) => b.price - a.price);
            break;
        case "name_asc":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }

    const total = result.length;
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const paginated = result.slice(start, start + PRODUCTS_PER_PAGE);

    return { products: paginated, total, totalPages };
}
