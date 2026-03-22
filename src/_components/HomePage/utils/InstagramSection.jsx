import { motion } from "framer-motion";

const INSTA_IMAGES = [
    "/instagram/instagram-1.jpg",
    "/instagram/instagram-2.jpg",
    "/instagram/instagram-3.jpg",
    "/instagram/instagram-4.jpg",
    "/instagram/instagram-5.jpg",
    "/instagram/instagram-6.jpg",
];

const InstagramSection = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container-main flex flex-col lg:flex-row items-center gap-16">
                {/* Left Side: Images Grid */}
                <div className="w-full lg:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-0">
                    {INSTA_IMAGES.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square overflow-hidden group"
                        >
                            <img
                                src={img}
                                alt={`Instagram ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <i className="fa-brands fa-instagram text-white text-3xl"></i>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-[35%] flex flex-col items-start px-4">
                    <h2 className="text-4xl lg:text-5xl font-black text-[#111] mb-6">
                        Instagram
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <span className="text-red-600 font-bold text-2xl tracking-tight">
                        #Male_Fashion
                    </span>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
