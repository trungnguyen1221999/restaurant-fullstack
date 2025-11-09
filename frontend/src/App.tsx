import BookForm from "./components/BookForm";
import Hero from "./components/Hero";
import MenuDisplay from "./components/MenuDisplay";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import AdminLoginPage from "./admin/adminLoginPage";
import { Route, Routes } from "react-router-dom";
import CategoryDisplay from "./components/CategoryDisplay";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLoginPage />} />
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
