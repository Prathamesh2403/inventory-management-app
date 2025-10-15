// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const DashboardPage = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   const fetchProducts = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/products", config);
//       setProducts(data);
//     } catch (error) {
//       console.error("Could not fetch products", error);
//     }
//   };

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     } else {
//       fetchProducts();
//     }
//   }, [userInfo, navigate]);

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };
//         await axios.delete(`/api/products/${id}`, config);
//         fetchProducts();
//       } catch (error) {
//         console.error("Failed to delete product", error);
//       }
//     }
//   };

//   // Calculate dashboard stats
//   const totalProducts = products.length;
//   const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
//   const lowStockProducts = products.filter(product => product.quantity <= product.lowStockThreshold).length;
//   const outOfStockProducts = products.filter(product => product.quantity === 0).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Retro Gadgets Background */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
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
//             <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-xl">📱</span>
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-white">RetroTech Inventory</h1>
//               <p className="text-cyan-300 text-sm">Welcome back, {userInfo?.name}!</p>
//             </div>
//           </motion.div>

//           <motion.div
//             className="flex items-center space-x-4"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <Link
//               to="/add-product"
//               className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               + Add Product
//             </Link>
//             <button
//               onClick={logoutHandler}
//               className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               Logout
//             </button>
//           </motion.div>
//         </div>
//       </motion.header>

//       {/* Stats Cards */}
//       <motion.div
//         className="relative z-10 px-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.6 }}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <motion.div
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//             whileHover={{ scale: 1.05, rotateY: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-cyan-300 text-sm font-medium">Total Products</p>
//                 <p className="text-3xl font-bold text-white">{totalProducts}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-xl">📦</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//             whileHover={{ scale: 1.05, rotateY: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-300 text-sm font-medium">Total Value</p>
//                 <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-xl">💰</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//             whileHover={{ scale: 1.05, rotateY: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-yellow-300 text-sm font-medium">Low Stock</p>
//                 <p className="text-3xl font-bold text-white">{lowStockProducts}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-xl">⚠️</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
//             whileHover={{ scale: 1.05, rotateY: 5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-red-300 text-sm font-medium">Out of Stock</p>
//                 <p className="text-3xl font-bold text-white">{outOfStockProducts}</p>
//               </div>
//               <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-xl">🚫</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Products Section */}
//       <motion.div
//         className="relative z-10 px-6 pb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.8 }}
//       >
//         <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden">
//           <div className="p-6 border-b border-white/20">
//             <h2 className="text-2xl font-bold text-white flex items-center">
//               <span className="mr-3">🎮</span>
//               Your Retro Collection
//             </h2>
//             <p className="text-cyan-300 mt-1">Manage your vintage electronics inventory</p>
//           </div>

//           <div className="p-6">
//             {products.length === 0 ? (
//               <motion.div
//                 className="text-center py-12"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 1 }}
//               >
//                 <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-4xl">📱</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-2">No Products Yet</h3>
//                 <p className="text-cyan-300 mb-6">Start building your retro tech collection!</p>
//                 <Link
//                   to="/add-product"
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                 >
//                   <span className="mr-2">+</span>
//                   Add Your First Product
//                 </Link>
//               </motion.div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map((product, index) => (
//                   <motion.div
//                     key={product._id}
//                     className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     whileHover={{ scale: 1.02, rotateY: 2 }}
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
//                           <span className="text-white text-lg">🎮</span>
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-white text-lg">{product.name}</h3>
//                           <p className="text-cyan-300 text-sm">SKU: {product.sku}</p>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/product/${product._id}/edit`}
//                           className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center transition-colors duration-200"
//                         >
//                           <span className="text-blue-300 text-sm">✏️</span>
//                         </Link>
//                         <button
//                           onClick={() => deleteHandler(product._id)}
//                           className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center transition-colors duration-200"
//                         >
//                           <span className="text-red-300 text-sm">🗑️</span>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-300 text-sm">Quantity:</span>
//                         <span className={`font-semibold ${
//                           product.quantity === 0 ? 'text-red-400' :
//                           product.quantity <= product.lowStockThreshold ? 'text-yellow-400' :
//                           'text-green-400'
//                         }`}>
//                           {product.quantity}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-300 text-sm">Low Stock Threshold:</span>
//                         <span className="text-cyan-300 font-medium">{product.lowStockThreshold}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-300 text-sm">Price:</span>
//                         <span className="text-white font-bold">${product.price}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-300 text-sm">Total Value:</span>
//                         <span className="text-emerald-400 font-bold">${(product.price * product.quantity).toLocaleString()}</span>
//                       </div>
//                     </div>

//                     {product.quantity <= product.lowStockThreshold && (
//                       <motion.div
//                         className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <p className="text-yellow-300 text-sm font-medium text-center">
//                           {product.quantity === 0 ? '🚫 Out of Stock!' : '⚠️ Low Stock Alert!'}
//                         </p>
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Floating particles effect */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -100, 0],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../utils/api";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get("/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Could not fetch products", error);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await apiClient.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  // Calculate dashboard stats
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.quantity <= product.lowStockThreshold
  ).length;
  const outOfStockProducts = products.filter(
    (product) => product.quantity === 0
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Retro Gadgets Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
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
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">📱</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                RetroTech Inventory
              </h1>
              <p className="text-cyan-300 text-sm">
                Welcome back, {userInfo?.name}!
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
              to="/add-product"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              + Add Product
            </Link>
            <button
              onClick={logoutHandler}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Logout
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        className="relative z-10 px-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-white">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📦</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">
                  Total Value
                </p>
                <p className="text-3xl font-bold text-white">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-white">
                  {lowStockProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚠️</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Out of Stock</p>
                <p className="text-3xl font-bold text-white">
                  {outOfStockProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚫</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Products Section */}
      <motion.div
        className="relative z-10 px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-3">🎮</span>
              Your Retro Collection
            </h2>
            <p className="text-cyan-300 mt-1">
              Manage your vintage electronics inventory
            </p>
          </div>

          <div className="p-6">
            {products.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Products Yet
                </h3>
                <p className="text-cyan-300 mb-6">
                  Start building your retro tech collection!
                </p>
                <Link
                  to="/add-product"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">+</span>
                  Add Your First Product
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, rotateY: 2 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-lg">🎮</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">
                            {product.name}
                          </h3>
                          <p className="text-cyan-300 text-sm">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/product/${product._id}/edit`}
                          className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center transition-colors duration-200"
                        >
                          <span className="text-blue-300 text-sm">✏️</span>
                        </Link>
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center transition-colors duration-200"
                        >
                          <span className="text-red-300 text-sm">🗑️</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Quantity:</span>
                        <span
                          className={`font-semibold ${
                            product.quantity === 0
                              ? "text-red-400"
                              : product.quantity <= product.lowStockThreshold
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Low Stock Threshold:
                        </span>
                        <span className="text-cyan-300 font-medium">
                          {product.lowStockThreshold}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Price:</span>
                        <span className="text-white font-bold">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">
                          Total Value:
                        </span>
                        <span className="text-emerald-400 font-bold">
                          ${(product.price * product.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {product.quantity <= product.lowStockThreshold && (
                      <motion.div
                        className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-yellow-300 text-sm font-medium text-center">
                          {product.quantity === 0
                            ? "🚫 Out of Stock!"
                            : "⚠️ Low Stock Alert!"}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
