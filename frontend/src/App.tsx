import BookForm from "./components/BookForm";
import Hero from "./components/Hero";
import MenuDisplay from "./components/MenuDisplay";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import AdminLoginPage from "./admin/adminLoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import CategoryDisplay from "./components/CategoryDisplay";
import CategoriesManagement from "./admin/components/CategoriesManagement";
import AdminLayout from "./admin/adminDashboard";
import DashboardOverview from "./admin/components/DashboardOverview";
import MenuManagement from "./admin/components/MenuManagement";
import ReservationsManagement from "./admin/components/ReservationsManagement";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle redirect from 404 page
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/admin" element={<AdminLoginPage />} />
      {/* Tất cả route trong layout admin */}
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="reservations" element={<ReservationsManagement />} />
        <Route
          path="users"
          element={
            <div className="p-6 text-white">Users Management (coming soon)</div>
          }
        />
        <Route
          path="settings"
          element={<div className="p-6 text-white">Settings (coming soon)</div>}
        />
      </Route>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Hero />
            <CategoryDisplay />
            <MenuDisplay />
            <BookForm />
            <Contact />
          </>
        }
      />
    </Routes>
  );
}

export default App;
