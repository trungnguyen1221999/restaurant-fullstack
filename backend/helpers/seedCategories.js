import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";
import { connectDB } from "../config/database.js";

dotenv.config();

const categoryData = [
  {
    name: "All",
    description: "View all available menu items",
    icon: "grid",
    color: "#6366f1",
    sortOrder: 0,
  },
  {
    name: "Pizza",
    description: "Delicious wood-fired pizzas with fresh ingredients",
    icon: "pizza",
    color: "#ef4444",
    sortOrder: 1,
  },
  {
    name: "Spaghetti",
    description: "Traditional and modern pasta dishes",
    icon: "utensils",
    color: "#f59e0b",
    sortOrder: 2,
  },
  {
    name: "Rice",
    description: "Flavorful rice dishes from around the world",
    icon: "bowl",
    color: "#10b981",
    sortOrder: 3,
  },
  {
    name: "Noodles",
    description: "Asian-inspired noodle soups and stir-fries",
    icon: "soup",
    color: "#f97316",
    sortOrder: 4,
  },
  {
    name: "Chicken",
    description: "Succulent chicken dishes prepared to perfection",
    icon: "drumstick",
    color: "#8b5cf6",
    sortOrder: 5,
  },
  {
    name: "Drinks",
    description: "Refreshing beverages and specialty cocktails",
    icon: "coffee",
    color: "#06b6d4",
    sortOrder: 6,
  },
];

const seedCategories = async () => {
  try {
    console.log("🌱 Starting category seeding...");

    await connectDB();

    // Clear existing categories
    await Category.deleteMany({});
    console.log("🗑️  Cleared existing categories");

    // Insert new categories
    const createdCategories = await Category.insertMany(categoryData);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Update menu items to reference the categories
    console.log("🔗 Linking menu items to categories...");

    for (const category of createdCategories) {
      if (category.name !== "All") {
        await MenuItem.updateMany(
          { categoryName: category.name },
          { category: category._id }
        );
        console.log(`   ✓ Linked ${category.name} items to category`);
      }
    }

    console.log("🎉 Category seeding completed successfully!");
  } catch (error) {
    console.error("❌ Category seeding failed:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

// Run seeder
seedCategories();
