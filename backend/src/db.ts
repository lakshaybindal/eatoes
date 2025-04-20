import mongoose from "mongoose";
import { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || "");

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Appetizers, Main Course
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", MenuItemSchema);

export { Item };
