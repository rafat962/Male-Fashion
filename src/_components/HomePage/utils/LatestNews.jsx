import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const NEWS = [
    {
        id: 1,
        date: "16 February 2024",
        title: "What Curling Irons Are The Best Ones",
        image: "/img/blog/blog-1.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
        id: 2,
        date: "21 February 2024",
        title: "Eternity Bands Do Last Forever",
        image: "/img/blog/blog-2.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
    {
        id: 3,
        date: "28 February 2024",
        title: "The Health Benefits Of Sunglasses",
        image: "/img/blog/blog-3.jpg",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    },
];

const LatestNews = () => {
    return (
        <section className="section-padding bg-bg-light">
            <div className="container-main">
                <p className="section-subtitle">Latest News</p>
                <h2 className="section-title">Fashion New Trends</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {NEWS.map((post) => (
                        <article
                            key={post.id}
                            className="group bg-white border border-border hover:shadow-card
                         transition-all duration-300 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="overflow-hidden aspect-video">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sub text-xs mb-3">
                                    <CalendarTodayIcon sx={{ fontSize: 13 }} />
                                    <span>{post.date}</span>
                                </div>
                                <h5
                                    className="text-sm font-black text-dark leading-snug mb-3
                               group-hover:text-primary transition-colors duration-200"
                                >
                                    {post.title}
                                </h5>
                                <p className="text-xs text-sub leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>
                                <span
                                    className="text-xs font-bold uppercase tracking-widest text-primary
                                 border-b border-primary pb-0.5 hover:text-primary-dark
                                 transition-colors duration-200"
                                >
                                    Read More
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
