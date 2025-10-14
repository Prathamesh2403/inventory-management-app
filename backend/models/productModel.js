import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    // this links to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    lowStockThreshold: {
      type: Number,
      required: [true, "Please add a low stock threshold"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
