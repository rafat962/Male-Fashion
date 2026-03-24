/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // استيراد framer-motion
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Breadcrumb from "../../_shared/ui/Breadcrumb";
import Field from "./utils/Field";
import InfoCard from "./utils/InfoCard";

// ── Animation Variants ──────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }, // العناصر تظهر ورا بعضها
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1200);
    };

    return (
        <div className="bg-white dark:bg-dark-bg min-h-screen transition-colors">
            <Breadcrumb pageName={"Contact"} />

            <div className="container-main py-16 lg:py-20">
                {/* ── Header Animation ────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="section-subtitle">Get In Touch</p>
                    <h2 className="text-3xl lg:text-4xl font-black text-dark dark:text-white tracking-tight">
                        We'd love to hear from you
                    </h2>
                    <p className="text-sm text-muted dark:text-dark-muted mt-3 max-w-md mx-auto leading-relaxed">
                        Have a question about an order, sizing, or just want to
                        say hello? Our team is here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left — Info Cards with Stagger ────────── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {[
                            {
                                icon: LocationOnOutlinedIcon,
                                title: "Our Store",
                                lines: ["123 Fashion Street", "Cairo, Egypt"],
                            },
                            {
                                icon: PhoneOutlinedIcon,
                                title: "Phone",
                                lines: ["+20 102 682 0685", "+20 102 682 0685"],
                            },
                            {
                                icon: EmailOutlinedIcon,
                                title: "Email",
                                lines: [
                                    "rafatkamel96@gmail.com",
                                    "rafatkamel5@gmail.com",
                                ],
                            },
                            {
                                icon: AccessTimeOutlinedIcon,
                                title: "Working Hours",
                                lines: [
                                    "Mon – Fri: 9am – 6pm",
                                    "Sat: 10am – 4pm",
                                ],
                            },
                        ].map((card, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <InfoCard {...card} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right — Form Animation ────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-16 border border-border-dim dark:border-dark-border"
                                >
                                    <motion.div
                                        initial={{ rotate: -45, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        className="w-14 h-14 bg-dark dark:bg-white flex items-center justify-center mb-5"
                                    >
                                        <span className="text-white dark:text-dark text-2xl">
                                            ✓
                                        </span>
                                    </motion.div>
                                    <h3 className="text-lg font-black text-dark dark:text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-sm text-muted dark:text-dark-muted mb-6">
                                        Thanks for reaching out. We'll get back
                                        to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSent(false);
                                            setForm({
                                                name: "",
                                                email: "",
                                                subject: "",
                                                message: "",
                                            });
                                        }}
                                        className="btn-outline text-xs cursor-pointer"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <Field
                                            label="Your Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                        <Field
                                            label="Your Email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            type="email"
                                        />
                                    </div>
                                    <Field
                                        label="Subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        label="Your Message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        multiline
                                    />

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`btn-primary min-w-[160px] flex items-center justify-center gap-2 cursor-pointer
                                                        ${loading ? "opacity-70 cursor-wait" : ""}`}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send Message"
                                            )}
                                        </button>
                                    </motion.div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* ── Map Placeholder with Fade-in ─────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 w-full h-64 bg-dim dark:bg-dark-paper border border-border-light dark:border-dark-border flex items-center justify-center overflow-hidden"
                >
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v123456789"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
