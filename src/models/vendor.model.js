import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchema);

Vendor.createIndexes( {name:1, email:1});

export default Vendor;
