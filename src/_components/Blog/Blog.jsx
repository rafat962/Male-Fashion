import { useState } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import blogPosts from "../../data/blogPosts.json";
import Breadcrumb from "../../_shared/ui/Breadcrumb";

const CATEGORIES = ["All", ...new Set(blogPosts.map((p) => p.category))];
const POSTS_PER_PAGE = 6;

/* ── Single Blog Card ──────────────────────────────────── */
const BlogCard = ({ post, featured = false }) => (
    <article
        className={`group bg-white border border-[#efefef] hover:border-[#ddd]
                         hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]
                         transition-all duration-300 overflow-hidden
                         ${featured ? "lg:col-span-2" : ""}`}
    >
        {/* Image */}
        <div
            className={`overflow-hidden ${featured ? "aspect-[16/7]" : "aspect-video"}`}
        >
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-105"
            />
        </div>

        {/* Content */}
        <div className="p-6">
            {/* Category badge */}
            <span
                className="inline-block text-[10px] font-bold uppercase tracking-[2px]
                             text-primary border border-primary px-2 py-0.5 mb-3"
            >
                {post.category}
            </span>

            {/* Title */}
            <h3
                className={`font-black text-[#111] leading-snug mb-3
                            group-hover:text-primary transition-colors duration-200
                            ${featured ? "text-xl lg:text-2xl" : "text-base"}`}
            >
                {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[#888] leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
            </p>

            {/* Meta */}
            <div
                className="flex items-center gap-4 text-[10px] font-bold uppercase
                            tracking-[1.5px] text-[#bbb] mb-5"
            >
                <span className="flex items-center gap-1">
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 13 }} />
                    {post.author}
                </span>
                <span className="flex items-center gap-1">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 13 }} />
                    {post.date}
                </span>
                <span className="flex items-center gap-1">
                    <AccessTimeOutlinedIcon sx={{ fontSize: 13 }} />
                    {post.readTime}
                </span>
            </div>

            {/* Read more */}
            <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase
                           tracking-[2px] text-[#111] border-b border-[#111] pb-0.5
                           hover:text-primary hover:border-primary transition-colors duration-200"
            >
                Read More
                <ChevronRightIcon sx={{ fontSize: 14 }} />
            </Link>
        </div>
    </article>
);

/* ── Main Blog Page ────────────────────────────────────── */
const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [page, setPage] = useState(1);

    const filtered =
        activeCategory === "All"
            ? blogPosts
            : blogPosts.filter((p) => p.category === activeCategory);

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * POSTS_PER_PAGE,
        page * POSTS_PER_PAGE,
    );

    return (
        <div className="bg-white min-h-screen">
            {/* ── Breadcrumb ────────────────────────────── */}
            <Breadcrumb pageName={"Blog"} />

            <div className="container-main py-14">
                {/* ── Header ────────────────────────────── */}
                <div className="text-center mb-10">
                    <p className="section-subtitle">Our Journal</p>
                    <h1 className="text-3xl lg:text-4xl font-black text-[#111] tracking-tight">
                        Fashion New Trends
                    </h1>
                </div>

                {/* ── Category Filter Tabs ──────────────── */}
                <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setPage(1);
                            }}
                            className={`text-[11px] font-bold uppercase tracking-[2px] px-4 py-2
                                        border transition-all duration-200
                                        ${
                                            activeCategory === cat
                                                ? "bg-[#111] text-white border-[#111]"
                                                : "border-[#e0e0e0] text-[#999] hover:border-[#111] hover:text-[#111]"
                                        }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Posts Grid ────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((post, i) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            featured={
                                i === 0 &&
                                page === 1 &&
                                activeCategory === "All"
                            }
                        />
                    ))}
                </div>

                {/* ── Pagination ────────────────────────── */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                        ).map((p) => (
                            <button
                                key={p}
                                onClick={() => {
                                    setPage(p);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className={`w-9 h-9 text-sm font-bold border transition-all duration-200
                                            ${
                                                page === p
                                                    ? "bg-[#111] text-white border-[#111]"
                                                    : "border-[#e0e0e0] text-[#999] hover:border-[#111] hover:text-[#111]"
                                            }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
