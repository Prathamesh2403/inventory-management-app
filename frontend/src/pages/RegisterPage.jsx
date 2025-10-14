import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../utils/api";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { data } = await apiClient.post("/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {/* Top left sign in button */}
      <div className="absolute top-0 left-0 p-4">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        >
          Sign In
        </Link>
      </div>

      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
            A
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-gray-400 text-sm mt-2">
            Join our inventory management platform
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-red-500/20 text-red-300 rounded-md text-center text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">or</span>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-200"
          >
            Sign In
          </Link>
        </p>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:text-blue-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:text-blue-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
