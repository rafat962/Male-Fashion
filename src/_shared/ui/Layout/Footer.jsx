import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
// Assuming you have these images in your assets folder

const SHOP_LINKS = ["Clothing Store", "Trending Shoes", "Accessories", "Sale"];
const HELP_LINKS = [
    "Contact Us",
    "Payment Methods",
    "Delivery",
    "Return & Exchanges",
];

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white pt-16 pb-8">
            <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* 1. Brand & Description */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold tracking-tight">
                            Male fashion
                            <span className="text-red-600 ml-0.5">.</span>
                        </span>
                    </div>
                    <p className="text-[#b7b7b7] text-[15px] leading-relaxed pr-4">
                        The customer is at the heart of our unique business
                        model, which includes design.
                    </p>
                    {/* Payment Methods Images */}
                    <div className="mt-2">
                        <img
                            src="/payment.png"
                            alt="Payment Methods"
                            className="h-auto w-auto"
                        />
                    </div>
                </div>

                {/* 2. Shopping Links */}
                <div className="lg:pl-10">
                    <h6 className="text-[15px] font-bold uppercase tracking-widest mb-8">
                        Shopping
                    </h6>
                    <ul className="flex flex-col gap-3">
                        {SHOP_LINKS.map((link) => (
                            <li key={link}>
                                <a
                                    href="#"
                                    className="text-[#b7b7b7] text-[15px] hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Help Links */}
                <div className="lg:pl-5">
                    <h6 className="text-[15px] font-bold uppercase tracking-widest mb-8">
                        Shopping
                    </h6>
                    <ul className="flex flex-col gap-3">
                        {HELP_LINKS.map((link) => (
                            <li key={link}>
                                <a
                                    href="#"
                                    className="text-[#b7b7b7] text-[15px] hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. Newsletter */}
                <div>
                    <h6 className="text-[15px] font-bold uppercase tracking-widest mb-8">
                        Newsletter
                    </h6>
                    <p className="text-[#b7b7b7] text-[15px] mb-8 leading-relaxed">
                        Be the first to know about new arrivals, look books,
                        sales & promos!
                    </p>
                    <div className="relative border-b border-[#333333] pb-3 flex items-center">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent text-[#b7b7b7] text-[15px] w-full outline-none placeholder:text-[#b7b7b7]"
                        />
                        <button className="text-white hover:text-red-600 transition-colors">
                            <span className="material-icons-outlined text-xl cursor-pointer">
                                mail_outline
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-main">
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

                <a
                    href="https://raafatkamel.netlify.app/"
                    target="_blank"
                    className="text-center text-[#b7b7b7] text-[15px] pt-4"
                >
                    <p>
                        Copyright © {new Date().getFullYear()} All rights
                        reserved
                        <span className="text-red-600 mx-1">❤</span> by{" "}
                        <span className="text-red-600 cursor-pointer">
                            Raafat Kamel
                        </span>
                    </p>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
