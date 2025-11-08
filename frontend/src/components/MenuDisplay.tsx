import { useState } from "react";
import { categoryItem, product } from "../assets/assets.js";
import {
  ChefHat,
  Utensils,
  Pizza,
  Coffee,
  Soup,
  ShoppingCart,
  Clock,
} from "lucide-react";

interface MenuCategory {
  category_title:
    | "All"
    | "Spaghetti"
    | "Pizza"
    | "Rice"
    | "Noodles"
    | "Chicken"
    | "Drinks";
}

interface ProductItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: MenuCategory["category_title"];
}

const MenuDisplay = () => {
  const [active, setActive] = useState<MenuCategory["category_title"]>("All");

  const getCategoryIcon = (category: MenuCategory["category_title"]) => {
    switch (category) {
      case "All":
        return <ChefHat className="w-5 h-5" />;
      case "Spaghetti":
      case "Noodles":
        return <Soup className="w-5 h-5" />;
      case "Pizza":
        return <Pizza className="w-5 h-5" />;
      case "Rice":
      case "Chicken":
        return <Utensils className="w-5 h-5" />;
      case "Drinks":
        return <Coffee className="w-5 h-5" />;
      default:
        return <ChefHat className="w-5 h-5" />;
    }
  };

  return (
    <section id="menu" className="bg-background text-foreground py-20">
      {/* Hero Title with Icon */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="w-8 h-8 text-primary" />
          <h2 className="text-5xl font-bold text-primary">Our Menu</h2>
          <ChefHat className="w-8 h-8 text-primary" />
        </div>
        <p className="text-center text-white text-lg max-w-2xl mx-auto">
          Discover our carefully crafted dishes made with the finest ingredients
        </p>
      </div>

      {/* Menu Categories */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categoryItem.map((item: MenuCategory, index: number) => {
            const isActive = active === item.category_title;
            return (
              <button
                key={index}
                onClick={() => setActive(item.category_title)}
                className={`group relative flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium
                  ${
                    isActive
                      ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-transparent border-border text-secondary hover:border-primary hover:text-primary hover:shadow-md"
                  }`}
              >
                {getCategoryIcon(item.category_title)}
                <span className="whitespace-nowrap">{item.category_title}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {(active === "All"
            ? product
            : product.filter((item: ProductItem) => item.category === active)
          ).map((item: ProductItem) => (
            <div
              key={item._id}
              className="group bg-black/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-60 h-60 object-cover transition-transform duration-500 group-hover:scale-110 mx-auto"
                />
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full"></div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs text-white">15-20 min</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-secondary-foreground/70 text-sm">
                    Delicious {item.category.toLowerCase()} made with premium
                    ingredients
                  </p>
                </div>

                {/* Price & Add Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    €{item.price}
                  </div>
                  <button className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span className="font-medium">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(active === "All"
          ? product
          : product.filter((item: ProductItem) => item.category === active)
        ).length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              No dishes found
            </h3>
            <p className="text-secondary-foreground/70">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuDisplay;
