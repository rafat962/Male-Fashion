import { useState } from "react";

const INITIAL = {
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
};

const Field = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    required,
    multiline,
}) => (
    <div className="relative">
        {multiline ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
                rows={3}
                className="peer w-full bg-transparent border-b border-[#e0e0e0] pt-5 pb-2
                           text-sm text-[#111] placeholder-transparent outline-none
                           focus:border-[#111] transition-colors duration-300 resize-none"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
                required={required}
                className="peer w-full bg-transparent border-b border-[#e0e0e0] pt-5 pb-2
                           text-sm text-[#111] placeholder-transparent outline-none
                           focus:border-[#111] transition-colors duration-300"
            />
        )}
        <label
            className="absolute left-0 top-1 text-[10px] font-bold uppercase tracking-[2px]
                          text-[#bbb] peer-focus:text-[#111]
                          peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm
                          peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
                          peer-placeholder-shown:text-[#bbb] transition-all duration-200 pointer-events-none"
        >
            {label}
            {required && <span className="text-primary ml-0.5">*</span>}
        </label>
    </div>
);

const CheckoutForm = ({ onSubmit, isLoading }) => {
    const [form, setForm] = useState(INITIAL);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!form.full_name.trim()) errs.full_name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        if (!form.address.trim()) errs.address = "Address is required";
        if (!form.city.trim()) errs.city = "City is required";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Section title */}
            <div>
                <h3 className="text-base font-black text-[#111] uppercase tracking-[2px] mb-1">
                    Shipping Information
                </h3>
                <div className="h-px bg-[#f0f0f0]" />
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <Field
                        label="Full Name"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                    />
                    {errors.full_name && (
                        <p className="text-[10px] text-red-500 mt-1">
                            {errors.full_name}
                        </p>
                    )}
                </div>
                <div>
                    <Field
                        label="Email Address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                    {errors.email && (
                        <p className="text-[10px] text-red-500 mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>
            </div>

            {/* Phone */}
            <div>
                <Field
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    required
                />
                {errors.phone && (
                    <p className="text-[10px] text-red-500 mt-1">
                        {errors.phone}
                    </p>
                )}
            </div>

            {/* Address + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <Field
                        label="Street Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && (
                        <p className="text-[10px] text-red-500 mt-1">
                            {errors.address}
                        </p>
                    )}
                </div>
                <div>
                    <Field
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                    {errors.city && (
                        <p className="text-[10px] text-red-500 mt-1">
                            {errors.city}
                        </p>
                    )}
                </div>
            </div>

            {/* Notes */}
            <Field
                label="Order Notes (optional)"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                multiline
            />

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className={`btn-primary w-full sm:w-auto flex items-center justify-center gap-2
                            ${isLoading ? "opacity-70 cursor-wait" : ""}`}
            >
                {isLoading ? (
                    <>
                        <span
                            className="w-3 h-3 border-2 border-white/40 border-t-white
                                         rounded-full animate-spin"
                        />
                        Placing Order...
                    </>
                ) : (
                    "Place Order →"
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
