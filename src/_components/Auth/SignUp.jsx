import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { toast } from "react-hot-toast";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });
            if (error) throw error;

            // If email confirmation is disabled, session is returned immediately
            if (data?.session) {
                toast.success(`Welcome, ${fullName}! Account created and signed in.`);
                navigate("/");
            } else {
                toast.success("Registration successful! Please check your email for confirmation.");
                navigate("/signin");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin,
                },
            });
            if (error) throw error;
        } catch (error) {
            toast.error(error.message || "An error occurred with Google Sign Up");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-gray py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm border border-border"
            >
                <div>
                    <h2 className="text-center text-3xl font-black text-dark uppercase tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-sub font-medium">
                        Join us and enjoy a better experience.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-border text-sm font-bold text-dark hover:bg-bg-gray transition-colors duration-200 uppercase tracking-widest"
                    >
                        <FaGoogle className="text-primary" />
                        Sign up with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-sub font-bold tracking-widest">
                                Or create with email
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-dark mb-1 block">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub">
                                        <FaUser size={14} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-border text-dark text-sm placeholder-dim focus:outline-none focus:border-dark transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-dark mb-1 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub">
                                        <FaEnvelope size={14} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-border text-dark text-sm placeholder-dim focus:outline-none focus:border-dark transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-dark mb-1 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub">
                                        <FaLock size={14} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-border text-dark text-sm placeholder-dim focus:outline-none focus:border-dark transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-[10px] text-sub font-medium leading-relaxed">
                            By clicking Sign Up, you agree to our{" "}
                            <a href="#" className="font-bold text-dark hover:text-primary underline">Terms</a> and{" "}
                            <a href="#" className="font-bold text-dark hover:text-primary underline">Privacy Policy</a>.
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-4 px-4 bg-dark text-white text-xs font-black uppercase tracking-[2px] hover:bg-primary transition-all duration-300 disabled:bg-sub"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                            {!loading && (
                                <span className="absolute right-4 inset-y-0 flex items-center">
                                    <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-sm text-sub font-medium">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="font-black text-dark hover:text-primary transition-colors uppercase tracking-wider underline underline-offset-4 decoration-border hover:decoration-primary"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
