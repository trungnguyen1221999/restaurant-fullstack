import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import { connectDB } from "../config/database.js";

dotenv.config();

const menuData = [
  {
    name: "Special Fried Rice With Chicken",
    description:
      "Aromatic fried rice with tender chicken pieces, mixed vegetables, and our special seasoning blend",
    price: 120,
    category: "Rice",
    image: "rice2.png",
    ingredients: [
      "Rice",
      "Chicken",
      "Eggs",
      "Mixed Vegetables",
      "Soy Sauce",
      "Garlic",
    ],
    preparationTime: 15,
    isAvailable: true,
    popularity: 95,
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh tomatoes, mozzarella cheese, and basil",
    price: 180,
    category: "Pizza",
    image: "pizza3.png",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Mozzarella",
      "Fresh Basil",
      "Olive Oil",
    ],
    preparationTime: 20,
    isVegetarian: true,
    isAvailable: true,
    popularity: 90,
  },
  {
    name: "Spicy Beef Noodles",
    description:
      "Hand-pulled noodles in rich beef broth with tender beef slices and vegetables",
    price: 150,
    category: "Noodles",
    image: "noodles1.png",
    ingredients: [
      "Noodles",
      "Beef",
      "Beef Broth",
      "Bok Choy",
      "Chili Oil",
      "Green Onions",
    ],
    preparationTime: 25,
    spiceLevel: "medium",
    isAvailable: true,
    popularity: 85,
  },
  {
    name: "Fresh Mango Smoothie",
    description: "Refreshing blend of ripe mangoes, yogurt, and honey",
    price: 80,
    category: "Drinks",
    image: "drink1.jpg",
    ingredients: ["Fresh Mango", "Greek Yogurt", "Honey", "Ice", "Mint"],
    preparationTime: 5,
    isVegetarian: true,
    isVegan: false,
    isAvailable: true,
    popularity: 75,
  },
  {
    name: "Crispy Fried Chicken",
    description:
      "Golden crispy chicken pieces marinated in our secret spice blend",
    price: 160,
    category: "Chicken",
    image: "chiken2.png",
    ingredients: ["Chicken", "Flour", "Spices", "Buttermilk", "Oil"],
    preparationTime: 20,
    isAvailable: true,
    popularity: 88,
  },
  {
    name: "Creamy Carbonara Pasta",
    description:
      "Rich and creamy pasta with bacon, eggs, parmesan cheese, and black pepper",
    price: 170,
    category: "Spaghetti",
    image: "pasta1.png",
    ingredients: [
      "Spaghetti",
      "Bacon",
      "Eggs",
      "Parmesan",
      "Cream",
      "Black Pepper",
    ],
    preparationTime: 18,
    isAvailable: true,
    popularity: 82,
  },
  {
    name: "Supreme Pizza",
    description:
      "Loaded pizza with pepperoni, sausage, bell peppers, onions, and mushrooms",
    price: 220,
    category: "Pizza",
    image: "pizza2.png",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Cheese",
      "Pepperoni",
      "Sausage",
      "Vegetables",
    ],
    preparationTime: 25,
    isAvailable: true,
    popularity: 78,
  },
  {
    name: "Seafood Ramen",
    description:
      "Rich tonkotsu broth with fresh seafood, soft-boiled egg, and nori",
    price: 190,
    category: "Noodles",
    image: "noodles2.png",
    ingredients: [
      "Ramen Noodles",
      "Tonkotsu Broth",
      "Shrimp",
      "Scallops",
      "Soft-boiled Egg",
      "Nori",
    ],
    preparationTime: 22,
    isAvailable: true,
    popularity: 80,
  },
  {
    name: "Thai Basil Fried Rice",
    description:
      "Fragrant jasmine rice stir-fried with thai basil, chili, and your choice of protein",
    price: 130,
    category: "Rice",
    image: "rice3.png",
    ingredients: [
      "Jasmine Rice",
      "Thai Basil",
      "Chili",
      "Garlic",
      "Fish Sauce",
      "Soy Sauce",
    ],
    preparationTime: 12,
    spiceLevel: "mild",
    isAvailable: true,
    popularity: 70,
  },
  {
    name: "Mojito Cocktail",
    description:
      "Refreshing cocktail with white rum, lime juice, mint leaves, and soda water",
    price: 120,
    category: "Drinks",
    image: "drink2.png",
    ingredients: [
      "White Rum",
      "Lime Juice",
      "Fresh Mint",
      "Sugar",
      "Soda Water",
      "Ice",
    ],
    preparationTime: 3,
    isVegetarian: true,
    isVegan: true,
    isAvailable: true,
    popularity: 65,
  },
];

const seedMenu = async () => {
  try {
    console.log("🌱 Starting menu seeding...");

    await connectDB();

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log("🗑️  Cleared existing menu items");

    // Insert new menu items
    const createdItems = await MenuItem.insertMany(menuData);
    console.log(`✅ Created ${createdItems.length} menu items`);

    // Add some ratings
    for (const item of createdItems) {
      item.rating = {
        average: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
        count: Math.floor(Math.random() * 50) + 10, // Random count between 10 and 59
      };
      await item.save();
    }

    console.log("⭐ Added ratings to menu items");
    console.log("🎉 Menu seeding completed successfully!");
  } catch (error) {
    console.error("❌ Menu seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

// Run seeder
seedMenu();
