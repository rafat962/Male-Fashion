/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BANNERS = [
    {
        id: 1,
        image: "/banner/banner-1.jpg",
        title: "Clothing Collections 2030",
        subtitle: "New Arrivals",
    },
    {
        id: 2,
        image: "/banner/banner-2.jpg",
        title: "Accessories",
        subtitle: "Luxury Essentials",
    },
    {
        id: 3,
        image: "/banner/banner-3.jpg",
        title: "Shoes Spring 2030",
        subtitle: "Step into Style",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }, // سرعة تتابع ظهور العناصر
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] },
    },
};

const imageVariants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.6, 0.05, -0.01, 0.9] },
    },
};

const BannerSection = () => {
    return (
        <section className="py-16 bg-bg-light dark:bg-dark-paper overflow-hidden">
            {" "}
            {/* تقليل الـ padding الرأسي */}
            <motion.div
                className="max-w-[1100px] mx-auto px-6" // تحديد عرض أنحف للكونتينر لجعله أرقى
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="flex flex-col gap-24 md:gap-32">
                    {" "}
                    {/* تقليل المسافات بين البانرات */}
                    {BANNERS.map((banner, index) => (
                        <motion.div
                            key={banner.id}
                            variants={itemVariants}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                                index % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-[55%] relative group">
                                <div className="aspect-[16/9] overflow-hidden bg-gray-200 rounded-sm shadow-lg">
                                    <motion.img
                                        variants={imageVariants}
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                </div>
                                {/* Decorative Number - Smaller Size */}
                                <motion.span
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 !== 0 ? 30 : -30,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className={`hidden lg:block absolute -top-10 ${
                                        index % 2 !== 0
                                            ? "-right-10"
                                            : "-left-10"
                                    } text-[100px] font-black text-black/[0.03] select-none z-[-1]`}
                                >
                                    0{index + 1}
                                </motion.span>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-[45%] flex flex-col items-start px-2">
                                <motion.span
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-primary font-bold uppercase tracking-[3px] text-[10px] mb-3"
                                >
                                    {banner.subtitle}
                                </motion.span>

                                <h2 className="text-3xl lg:text-4xl font-bold text-dark dark:text-white leading-[1.2] mb-5 uppercase tracking-tight">
                                    {banner.title}
                                </h2>

                                <p className="text-sub dark:text-dark-muted text-sm lg:text-base mb-8 leading-relaxed max-w-sm">
                                    Elevate your wardrobe with our latest{" "}
                                    {banner.title.split(" ")[0]} pieces,
                                    designed for those who appreciate timeless
                                    style and comfort.
                                </p>

                                <Link
                                    to="/shop"
                                    className="group relative flex items-center gap-2 text-[12px] font-bold uppercase tracking-[1px] transition-all dark:text-white"
                                >
                                    <span className="border-b-[1.5px] border-dark dark:border-white pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors">
                                        Discover More
                                    </span>
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.5,
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default BannerSection;
