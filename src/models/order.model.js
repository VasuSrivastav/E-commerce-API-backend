import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
// const Order = mongoose.model("Order", orderSchema);
// Order.createIndexes( {product:1, status:1});
// Create indexes to optimize order queries
orderSchema.index({ product: 1 });
orderSchema.index({ status: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
