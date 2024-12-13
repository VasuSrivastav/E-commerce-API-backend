import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create indexes to optimize product searches

// const Product = mongoose.model("Product", productSchema);
// Product.createIndexes( {name:1, vendor:1});
productSchema.index({ name: 1 });
productSchema.index({ vendor: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
