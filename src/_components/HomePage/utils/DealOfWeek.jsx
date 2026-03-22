/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Clothings Hot", "Shoe Collection", "Accessories"];

const DealSection = () => {
    const [activeTab, setActiveTab] = useState("Shoe Collection");

    // Initial Time State
    const [timeLeft, setTimeLeft] = useState({
        days: 30,
        hours: 4,
        minutes: 42,
        seconds: 5,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        } else {
                            if (days > 0) {
                                days--;
                                hours = 23;
                                minutes = 59;
                                seconds = 59;
                            } else {
                                // Time is up!
                                clearInterval(timer);
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-[#f3f2ee] py-20 overflow-hidden">
            <div className="container-main flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Side: Tabs Selection */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6 order-2 lg:order-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`text-left text-2xl lg:text-3xl font-bold transition-all duration-300 ${
                                activeTab === cat
                                    ? "text-black"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Center: Image & Sale Badge */}
                <div className="w-full lg:w-2/4 relative flex justify-center order-1 lg:order-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <img
                                src="/product-sale.png"
                                alt="Deal of the week"
                                className="max-w-full h-auto"
                            />

                            <div className="absolute -top-4 -right-4 bg-[#111] text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl">
                                <span className="text-[11px] opacity-80">
                                    Sale Of
                                </span>
                                <span className="text-sm font-bold">
                                    $29.99
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Deal Info & Timer */}
                <div className="w-full lg:w-1/4 flex flex-col items-start order-3">
                    <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-4">
                        Deal Of The Week
                    </span>
                    <h2 className="text-3xl font-bold text-[#111] mb-8 leading-tight">
                        Multi-pocket Chest Bag Black
                    </h2>

                    {/* Timer Display */}
                    <div className="flex gap-6 mb-10">
                        {Object.entries(timeLeft).map(([label, value]) => (
                            <div
                                key={label}
                                className="flex flex-col items-center"
                            >
                                <span className="text-3xl font-bold text-[#111]">
                                    {value.toString().padStart(2, "0")}
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[2px] hover:bg-red-600 transition-all">
                        Shop Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DealSection;
