import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { toast } from "react-hot-toast";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            toast.success("Welcome back!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "An error occurred during sign in");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin,
                },
            });
            if (error) throw error;
        } catch (error) {
            toast.error(error.message || "An error occurred with Google Sign In");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-gray dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white dark:bg-dark-paper p-10 shadow-sm border border-border dark:border-dark-border"
            >
                <div>
                    <h2 className="text-center text-3xl font-black text-dark dark:text-white uppercase tracking-tight">
                        Sign In
                    </h2>
                    <p className="mt-2 text-center text-sm text-sub dark:text-dark-muted font-medium">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-border dark:border-dark-border text-sm font-bold text-dark dark:text-white hover:bg-bg-gray dark:hover:bg-dark-bg transition-colors duration-200 uppercase tracking-widest"
                    >
                        <FaGoogle className="text-primary" />
                        Sign in with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border dark:border-dark-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-dark-paper px-2 text-sub dark:text-dark-muted font-bold tracking-widest">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignIn}>
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-dark dark:text-white mb-1 block">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub dark:text-dark-muted">
                                        <FaEnvelope size={14} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-border dark:border-dark-border text-dark dark:text-white text-sm placeholder-dim bg-transparent focus:outline-none focus:border-dark dark:focus:border-white transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-[2px] text-dark dark:text-white mb-1 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub dark:text-dark-muted">
                                        <FaLock size={14} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-border dark:border-dark-border text-dark dark:text-white text-sm placeholder-dim bg-transparent focus:outline-none focus:border-dark dark:focus:border-white transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary border-border dark:border-dark-border rounded focus:ring-0"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-xs font-bold text-sub dark:text-dark-muted uppercase tracking-wider"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-xs">
                                <a
                                    href="#"
                                    className="font-bold text-dark dark:text-white hover:text-primary uppercase tracking-wider transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-4 px-4 bg-dark dark:bg-white text-white dark:text-dark text-xs font-black uppercase tracking-[2px] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-300 disabled:bg-sub"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            {!loading && (
                                <span className="absolute right-4 inset-y-0 flex items-center">
                                    <FaArrowRight className="text-white dark:text-dark group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="text-sm text-sub dark:text-dark-muted font-medium">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-black text-dark dark:text-white hover:text-primary transition-colors uppercase tracking-wider underline underline-offset-4 decoration-border dark:decoration-dark-border hover:decoration-primary"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;
