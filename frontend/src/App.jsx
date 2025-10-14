import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import AddProductPage from "./pages/AddProductPage"; // Import the new page
import EditProductPage from "./pages/EditProductPage"; // 1. Import the new page

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/product/:id/edit" element={<EditProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
