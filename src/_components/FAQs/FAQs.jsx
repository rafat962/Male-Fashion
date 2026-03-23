import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Breadcrumb from "../../_shared/ui/Breadcrumb";
import FAQ_DATA from "../../data/FAQ_DATA.json";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border-light">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group cursor-pointer outline-none"
            >
                <span
                    className={`text-lg font-bold transition-colors duration-300 ${isOpen ? "text-primary" : "text-dark group-hover:text-primary"}`}
                >
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={isOpen ? "text-primary" : "text-text-dim"}
                >
                    <KeyboardArrowDownIcon />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-muted leading-relaxed pb-6">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQs = () => {
    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb pageName="FAQs" />

            <div className="container-main py-16 lg:py-24">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <p className="section-subtitle">Information</p>
                        <h1 className="text-3xl lg:text-4xl font-black text-dark mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-muted text-sm">
                            Everything you need to know about our service and
                            products.
                        </p>
                    </motion.div>

                    <motion.div layout className="flex flex-col">
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} {...item} />
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 bg-bg-light text-center"
                    >
                        <h3 className="text-xl font-bold text-dark mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-muted text-sm mb-6">
                            Can't find the answer you're looking for? Please
                            chat to our friendly team.
                        </p>
                        <button className="btn-primary">Contact Support</button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
