// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const AddProductPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     sku: "",
//     quantity: 0,
//     price: 0,
//     description: "",
//     lowStockThreshold: 0,
//   });
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Check if user is logged in
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (!userInfo) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'quantity' || name === 'price' || name === 'lowStockThreshold'
//         ? parseFloat(value) || 0
//         : value
//     }));
//     // Clear messages when user starts typing
//     if (error) setError("");
//     if (success) setSuccess("");
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Product name is required");
//       return false;
//     }
//     if (!formData.sku.trim()) {
//       setError("SKU is required");
//       return false;
//     }
//     if (formData.quantity < 0) {
//       setError("Quantity cannot be negative");
//       return false;
//     }
//     if (formData.price < 0) {
//       setError("Price cannot be negative");
//       return false;
//     }
//     if (formData.lowStockThreshold < 0) {
//       setError("Low stock threshold cannot be negative");
//       return false;
//     }
//     return true;
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!validateForm()) return;

//     setIsSaving(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       await axios.post(
//         "/api/products",
//         formData,
//         config
//       );

//       setSuccess("Product added successfully!");
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (error) {
//       console.error("Failed to create product", error);
//       setError(error.response?.data?.message || "Failed to create product. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Retro Background Effects */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header */}
//       <motion.header
//         className="relative z-10 p-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex justify-between items-center">
//           <motion.div
//             className="flex items-center space-x-4"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Link
//               to="/"
//               className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
//             >
//               <span className="text-white font-bold text-xl">←</span>
//             </Link>
//             <div>
//               <h1 className="text-3xl font-bold text-white">Add New Retro Product</h1>
//               <p className="text-cyan-300 text-sm">Expand your vintage electronics collection</p>
//             </div>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-4"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <Link
//               to="/"
//               className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               Cancel
//             </Link>
//           </motion.div>
//         </div>
//       </motion.header>

//       {/* Main Form */}
//       <motion.div
//         className="relative z-10 px-6 pb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.6 }}
//       >
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden">
//             <div className="p-6 border-b border-white/20">
//               <h2 className="text-2xl font-bold text-white flex items-center">
//                 <span className="mr-3">🎮</span>
//                 Product Information
//               </h2>
//               <p className="text-cyan-300 mt-1">Fill in the details for your new retro tech item</p>
//             </div>

//             <form onSubmit={submitHandler} className="p-8">
//               {/* Messages */}
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   transition={{ duration: 0.3 }}
//                   className="mb-6 p-4 bg-red-500/20 border border-red-400/30 text-red-300 rounded-lg"
//                 >
//                   <div className="flex items-center">
//                     <span className="mr-2">⚠️</span>
//                     {error}
//                   </div>
//                 </motion.div>
//               )}

//               {success && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   transition={{ duration: 0.3 }}
//                   className="mb-6 p-4 bg-green-500/20 border border-green-400/30 text-green-300 rounded-lg"
//                 >
//                   <div className="flex items-center">
//                     <span className="mr-2">✅</span>
//                     {success}
//                   </div>
//                 </motion.div>
//               )}

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.8 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       Product Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
//                       placeholder="e.g., Vintage Nintendo Game Boy"
//                     />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.9 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       SKU (Stock Keeping Unit) *
//                     </label>
//                     <input
//                       type="text"
//                       name="sku"
//                       value={formData.sku}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
//                       placeholder="e.g., NGB-DMG-001"
//                     />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 1.0 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows={4}
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
//                       placeholder="Describe your retro tech product... (e.g., Original Nintendo Game Boy from 1989, green screen, includes original packaging)"
//                     />
//                   </motion.div>

//                   {/* Quick Fill Examples */}
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 1.1 }}
//                     className="p-4 bg-white/5 rounded-lg border border-white/10"
//                   >
//                     <h4 className="text-white font-medium mb-3 flex items-center">
//                       <span className="mr-2">💡</span>
//                       Quick Fill Examples
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, name: "Vintage Game Boy", sku: "NGB-001", description: "Original Nintendo Game Boy from 1989" }))}
//                         className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded transition-colors duration-200"
//                       >
//                         🎮 Game Boy
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, name: "Retro Walkman", sku: "WM-001", description: "Sony Walkman portable cassette player" }))}
//                         className="p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded transition-colors duration-200"
//                       >
//                         🎵 Walkman
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, name: "Vintage Camera", sku: "CAM-001", description: "Classic 35mm film camera" }))}
//                         className="p-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded transition-colors duration-200"
//                       >
//                         📷 Camera
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, name: "Old Computer", sku: "PC-001", description: "Vintage desktop computer system" }))}
//                         className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded transition-colors duration-200"
//                       >
//                         💻 Computer
//                       </button>
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.8 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       Initial Quantity
//                     </label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
//                     />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.9 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       Price ($)
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       min="0"
//                       step="0.01"
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
//                     />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 1.0 }}
//                   >
//                     <label className="block text-cyan-300 text-sm font-medium mb-2">
//                       Low Stock Threshold
//                     </label>
//                     <input
//                       type="number"
//                       name="lowStockThreshold"
//                       value={formData.lowStockThreshold}
//                       onChange={handleChange}
//                       min="0"
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
//                     />
//                     <p className="text-gray-400 text-xs mt-1">
//                       Alert when quantity falls below this number
//                     </p>
//                   </motion.div>

//                   {/* Stock Status Preview */}
//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 1.1 }}
//                     className="p-4 bg-white/5 rounded-lg border border-white/10"
//                   >
//                     <h4 className="text-white font-medium mb-3 flex items-center">
//                       <span className="mr-2">📊</span>
//                       Inventory Preview
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-300">Initial Stock:</span>
//                         <span className={`font-semibold ${
//                           formData.quantity === 0 ? 'text-red-400' :
//                           formData.quantity <= formData.lowStockThreshold ? 'text-yellow-400' :
//                           'text-green-400'
//                         }`}>
//                           {formData.quantity}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-300">Total Value:</span>
//                         <span className="text-emerald-400 font-semibold">
//                           ${(formData.price * formData.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-300">Status:</span>
//                         <span className={`font-medium ${
//                           formData.quantity === 0 ? 'text-red-400' :
//                           formData.quantity <= formData.lowStockThreshold ? 'text-yellow-400' :
//                           'text-green-400'
//                         }`}>
//                           {formData.quantity === 0 ? '🚫 Out of Stock' :
//                            formData.quantity <= formData.lowStockThreshold ? '⚠️ Low Stock' :
//                            '✅ In Stock'}
//                         </span>
//                       </div>
//                       {formData.name && formData.sku && (
//                         <div className="mt-3 pt-3 border-t border-white/10">
//                           <div className="flex justify-between">
//                             <span className="text-gray-300">Product ID:</span>
//                             <span className="text-cyan-300 font-mono text-xs">
//                               {formData.sku.toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <motion.div
//                 className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/20"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 1.2 }}
//               >
//                 <Link
//                   to="/"
//                   className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                 >
//                   Cancel
//                 </Link>
//                 <button
//                   type="submit"
//                   disabled={isSaving}
//                   className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                 >
//                   {isSaving ? (
//                     <>
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                       />
//                       Adding...
//                     </>
//                   ) : (
//                     <>
//                       <span className="mr-2">➕</span>
//                       Add to Collection
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             </form>
//           </div>
//         </div>
//       </motion.div>

//       {/* Floating particles effect */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -80, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 4 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 3,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../utils/api";
import { motion } from "framer-motion";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
    description: "",
    lowStockThreshold: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check if user is logged in
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price" || name === "lowStockThreshold"
          ? parseFloat(value) || 0
          : value,
    }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Product name is required");
      return false;
    }
    if (!formData.sku.trim()) {
      setError("SKU is required");
      return false;
    }
    if (formData.quantity < 0) {
      setError("Quantity cannot be negative");
      return false;
    }
    if (formData.price < 0) {
      setError("Price cannot be negative");
      return false;
    }
    if (formData.lowStockThreshold < 0) {
      setError("Low stock threshold cannot be negative");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsSaving(true);
    try {
      await apiClient.post("/api/products", formData);

      setSuccess("Product added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Failed to create product", error);
      setError(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Retro Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/"
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <span className="text-white font-bold text-xl">←</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Add New Retro Product
              </h1>
              <p className="text-cyan-300 text-sm">
                Expand your vintage electronics collection
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Cancel
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Form */}
      <motion.div
        className="relative z-10 px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3">🎮</span>
                Product Information
              </h2>
              <p className="text-cyan-300 mt-1">
                Fill in the details for your new retro tech item
              </p>
            </div>

            <form onSubmit={submitHandler} className="p-8">
              {/* Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-400/30 text-red-300 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-400/30 text-green-300 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    {success}
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="e.g., Vintage Nintendo Game Boy"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      SKU (Stock Keeping Unit) *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="e.g., NGB-DMG-001"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
                      placeholder="Describe your retro tech product... (e.g., Original Nintendo Game Boy from 1989, green screen, includes original packaging)"
                    />
                  </motion.div>

                  {/* Quick Fill Examples */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="mr-2">💡</span>
                      Quick Fill Examples
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            name: "Vintage Game Boy",
                            sku: "NGB-001",
                            description: "Original Nintendo Game Boy from 1989",
                          }))
                        }
                        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded transition-colors duration-200"
                      >
                        🎮 Game Boy
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            name: "Retro Walkman",
                            sku: "WM-001",
                            description:
                              "Sony Walkman portable cassette player",
                          }))
                        }
                        className="p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded transition-colors duration-200"
                      >
                        🎵 Walkman
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            name: "Vintage Camera",
                            sku: "CAM-001",
                            description: "Classic 35mm film camera",
                          }))
                        }
                        className="p-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded transition-colors duration-200"
                      >
                        📷 Camera
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            name: "Old Computer",
                            sku: "PC-001",
                            description: "Vintage desktop computer system",
                          }))
                        }
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded transition-colors duration-200"
                      >
                        💻 Computer
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      Initial Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    <label className="block text-cyan-300 text-sm font-medium mb-2">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      name="lowStockThreshold"
                      value={formData.lowStockThreshold}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    />
                    <p className="text-gray-400 text-xs mt-1">
                      Alert when quantity falls below this number
                    </p>
                  </motion.div>

                  {/* Stock Status Preview */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="mr-2">📊</span>
                      Inventory Preview
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Initial Stock:</span>
                        <span
                          className={`font-semibold ${
                            formData.quantity === 0
                              ? "text-red-400"
                              : formData.quantity <= formData.lowStockThreshold
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {formData.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Value:</span>
                        <span className="text-emerald-400 font-semibold">
                          $
                          {(
                            formData.price * formData.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Status:</span>
                        <span
                          className={`font-medium ${
                            formData.quantity === 0
                              ? "text-red-400"
                              : formData.quantity <= formData.lowStockThreshold
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {formData.quantity === 0
                            ? "🚫 Out of Stock"
                            : formData.quantity <= formData.lowStockThreshold
                            ? "⚠️ Low Stock"
                            : "✅ In Stock"}
                        </span>
                      </div>
                      {formData.name && formData.sku && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Product ID:</span>
                            <span className="text-cyan-300 font-mono text-xs">
                              {formData.sku.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <Link
                  to="/"
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Adding...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">➕</span>
                      Add to Collection
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AddProductPage;
