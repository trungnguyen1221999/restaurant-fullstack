import React, { useEffect, useState } from "react";
import { ChefHat, Utensils, Pizza, Coffee, Soup, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllMenus } from "@/api/menu.api";
import { getAllCategories } from "@/api/category.api";
import ProductDetailPopup from "./ProductDetailPopup";
import MenuSearch from "../admin/components/MenuSearch";

interface MenuImage {
  url: string;
  public_id: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  categoryName: string;
  price: number;
  images: MenuImage[];
  ingredients: string[];
}

const MenuDisplay: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [active, setActive] = useState<string>("All");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Popup state
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy danh sách category
        const categoryRes = await getAllCategories();
        const fetchedCategories = categoryRes.data.categories.map(
          (cat: { name: string }) => cat.name
        );
        setCategories(["All", ...fetchedCategories]);

        // Lấy danh sách menu
        const menuRes = await getAllMenus();
        const fetchedMenuItems: MenuItem[] = menuRes.data.menuItems || [];
        setMenuItems(fetchedMenuItems);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "all":
        return <ChefHat className="w-5 h-5" />;
      case "spaghetti":
      case "noodles":
        return <Soup className="w-5 h-5" />;
      case "pizza":
        return <Pizza className="w-5 h-5" />;
      case "rice":
      case "chicken":
      case "beef":
      case "seafood":
        return <Utensils className="w-5 h-5" />;
      case "drinks":
      case "coffee":
      case "tea":
        return <Coffee className="w-5 h-5" />;
      default:
        return <ChefHat className="w-5 h-5" />;
    }
  };

  // Filter items by category and search
  const filteredItems = React.useMemo(() => {
    let filtered = menuItems;

    // Filter by category
    if (active !== "All") {
      filtered = filtered.filter((item) => item.categoryName === active);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [menuItems, active, searchTerm]);

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Reset to first page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to menu section
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="bg-background text-foreground py-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="w-8 h-8 text-primary" />
          <h2 className="text-5xl font-bold text-primary">Our Menu</h2>
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <p className="text-center text-white text-lg max-w-2xl mx-auto">
          Discover our carefully crafted dishes made with the finest ingredients
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 mb-8 flex justify-center">
        <MenuSearch 
          onSearch={handleSearch}
          placeholder="Search dishes, ingredients, categories..."
        />
      </div>

      {/* Category Buttons */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => {
            const isActive = active === category;
            return (
              <button
                key={index}
                onClick={() => setActive(category)}
                className={`group relative flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium
                  ${
                    isActive
                      ? "bg-primary border-primary text-black shadow-lg scale-105"
                      : "bg-transparent border-border text-secondary hover:border-primary hover:text-primary hover:shadow-md"
                  }
                `}
              >
                {getCategoryIcon(category)}
                <span className="whitespace-nowrap">{category}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rotate-45"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-6">
        {loading ? (
          <div className="text-center text-white/70 py-16">Loading menu...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              No dishes found
            </h3>
            <p className="text-secondary-foreground/70">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedProduct(item)}
                className="cursor-pointer group bg-black/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={item.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-60 h-60 object-cover transition-transform duration-500 group-hover:scale-110 mx-auto"
                  />
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-white">15–20 min</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-white text-sm line-clamp-2">
                      {item.description || "Delicious meal made with love"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      €{item.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredItems.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center mt-12 gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 font-medium
                ${
                  currentPage === 1
                    ? "bg-transparent border-border/30 text-secondary/50 cursor-not-allowed"
                    : "bg-transparent border-border text-secondary hover:border-primary hover:text-primary hover:shadow-md"
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isCurrentPage = page === currentPage;
                const shouldShow = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                if (!shouldShow && page !== currentPage - 2 && page !== currentPage + 2) {
                  return null;
                }
                
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 py-2 text-secondary/50">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 font-semibold
                      ${
                        isCurrentPage
                          ? "bg-primary border-primary text-black shadow-lg scale-105"
                          : "bg-transparent border-border text-secondary hover:border-primary hover:text-primary hover:shadow-md"
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 font-medium
                ${
                  currentPage === totalPages
                    ? "bg-transparent border-border/30 text-secondary/50 cursor-not-allowed"
                    : "bg-transparent border-border text-secondary hover:border-primary hover:text-primary hover:shadow-md"
                }
              `}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Popup hiển thị chi tiết */}
      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default MenuDisplay;
