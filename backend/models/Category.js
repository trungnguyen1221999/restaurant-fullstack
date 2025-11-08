import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
      enum: [
        "Spaghetti",
        "Pizza",
        "Rice",
        "Noodles",
        "Chicken",
        "Drinks",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    
  },
  {
    timestamps: true,
  }
);


const Category = mongoose.model("Category", categorySchema);

export default Category;
