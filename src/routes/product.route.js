import express from "express";
import authenticateJWT from "../middlewares/auth.middleware.js";
import { body, validationResult } from "express-validator";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.post(
  "/",
  [
    body("name", "Enter a Valid product name, min Length is 3").isLength({
      min: 3,
    }),
    body("price", "Enter a Valid price").notEmpty(),
    body("stock", "Enter a Valid Quantity").notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authenticateJWT,
  addProduct
);

router.get("/", authenticateJWT, getProducts);

router.put("/:id", authenticateJWT, updateProduct);

router.delete("/:id", authenticateJWT, deleteProduct);




export default router;
