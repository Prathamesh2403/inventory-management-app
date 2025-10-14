import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {/* Top right sign up button - Vercel style */}
      <div className="absolute top-0 right-0 p-4">
        <Link
          to="/register"
          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>

      <motion.div
        className="w-full max-w-sm p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-6">
          {/* Placeholder for a logo/icon if you had one */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
            A
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Log in to Inventory App</h1>
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

          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200 text-sm"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-500 hover:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
