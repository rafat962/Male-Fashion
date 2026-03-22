/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // استيراد موشن
import {
    FaFacebookF,
    FaTwitter,
    FaPinterestP,
    FaInstagram,
} from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const SOCIAL_LINKS = [
    { id: 1, icon: <FaFacebookF />, link: "#", name: "Facebook" },
    { id: 2, icon: <FaTwitter />, link: "#", name: "Twitter" },
    { id: 3, icon: <FaPinterestP />, link: "#", name: "Pinterest" },
    { id: 4, icon: <FaInstagram />, link: "#", name: "Instagram" },
];

const SLIDES = [
    {
        id: 1,
        subtitle: "Summer Collection",
        title: "Fall - Winter Collections 2030",
        description:
            "A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.",
        image: "/hero/hero-1.jpg",
    },
    {
        id: 2,
        subtitle: "Exclusive Offer",
        title: "Modern Minimalist Aesthetics",
        description:
            "Discover the new standard of contemporary fashion. Designed for those who appreciate the finer details in life.",
        image: "/hero/hero-2.jpg",
    },
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () =>
        setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

    // إعدادات الأنيميشن للنص
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.2, duration: 0.3, ease: "easeOut" },
        }),
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    return (
        <section className="relative bg-[#f3f2ee] h-screen min-h-[40rem] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                            src={SLIDES[current].image}
                            alt="Hero"
                            className="w-full h-full object-cover object-[75%_center] md:object-center"
                        />
                        <div className="absolute inset-0 bg-white/40 sm:bg-transparent" />
                    </div>

                    {/* Content Layer */}
                    <div className="container-main relative z-10 w-full px-[5%] lg:pt-28">
                        <div className="max-w-[90%] sm:max-w-[28rem] md:max-w-[32rem]">
                            <motion.h6
                                custom={1}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-primary font-bold uppercase tracking-[0.2em] text-[0.7rem] md:text-[0.85rem] mb-4"
                            >
                                {SLIDES[current].subtitle}
                            </motion.h6>

                            <motion.h1
                                custom={2}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-dark font-black text-[1.8rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[2.9rem] lg:text-[3rem] leading-[1.1] mb-6"
                            >
                                {SLIDES[current].title.split("Collections")[0]}{" "}
                                <br className="hidden xs:block" />
                                Collections{" "}
                                {SLIDES[current].title.split("Collections")[1]}
                            </motion.h1>

                            <motion.p
                                custom={3}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-black lg:text-sub text-[0.9rem] md:text-[1rem] leading-relaxed mb-8 max-w-[25rem]"
                            >
                                {SLIDES[current].description}
                            </motion.p>

                            <motion.div
                                custom={4}
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Link
                                    to="/shop"
                                    className="btn-primary inline-flex items-center gap-3 px-8 py-4 !bg-[#e53637] hover:!bg-black transition-all text-[0.8rem] font-bold uppercase tracking-widest shadow-lg group"
                                >
                                    Shop Now
                                    <span className="text-[1.2rem] transition-transform group-hover:translate-x-1">
                                        <HiOutlineChevronRight />
                                    </span>
                                </Link>
                            </motion.div>

                            {/* Socials */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-12 md:mt-20 flex items-center gap-6"
                            >
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.link}
                                        className="text-dark text-[1.1rem] md:text-[1.2rem] hover:text-primary transition-colors duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-[2%] top-1/2 -translate-y-1/2 z-20 text-[1.5rem] md:text-[2rem] text-dark/30 hover:text-dark transition-all p-2 hover:scale-110"
            >
                <HiOutlineChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-[2%] top-1/2 -translate-y-1/2 z-20 text-[1.5rem] md:text-[2rem] text-dark/30 hover:text-dark transition-all p-2 hover:scale-110"
            >
                <HiOutlineChevronRight />
            </button>
        </section>
    );
};

export default HeroSlider;
