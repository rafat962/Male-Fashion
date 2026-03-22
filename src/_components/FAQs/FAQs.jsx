import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Breadcrumb from "../../_shared/ui/Breadcrumb";

const FAQ_DATA = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unworn and unwashed items. Simply contact our support team to initiate a return.",
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the country. International shipping may take 7-14 business days depending on the location.",
    },
    {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $9.99 applies.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.",
    },
    {
        question: "How can I track my order?",
        answer: "Once your order has shipped, you will receive an email with a tracking number and a link to track your package.",
    },
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#eee]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-[#111] group-hover:text-primary'}`}>
                    {question}
                </span>
                <KeyboardArrowDownIcon
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-[#bbb]'}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}
            >
                <p className="text-[#666] leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQs = () => {
    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb pageName="FAQs" />

            <div className="container-main py-16 lg:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="section-subtitle">Information</p>
                        <h1 className="text-3xl lg:text-4xl font-black text-[#111] mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-[#999] text-sm">
                            Everything you need to know about our service and products.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {FAQ_DATA.map((item, index) => (
                            <FAQItem key={index} {...item} />
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-[#f8f8f8] text-center">
                        <h3 className="text-xl font-bold text-[#111] mb-2">
                            Still have questions?
                        </h3>
                        <p className="text-[#666] text-sm mb-6">
                            Can't find the answer you're looking for? Please chat to our friendly team.
                        </p>
                        <button className="btn-primary">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
