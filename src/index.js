import express from "express";
import dotenv from "dotenv";
import {connectDB }from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || "vasusri_jwt_secret";
const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later."
});
app.use(apiLimiter);

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse url encoded data in request body
app.use(express.urlencoded({ extended: true }));

// Middleware to log all incoming requests to the console work as morgan logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});


app.use('/api/vendors', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
