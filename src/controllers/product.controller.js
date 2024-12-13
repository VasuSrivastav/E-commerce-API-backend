import { validationResult } from 'express-validator';
import Product from '../models/product.model.js';

export const addProduct = async (req, res) => {
        const { name, price, stock } = req.body;
      
        if (!name || price == null || stock == null) {
          return res.status(400).json({ message: 'All fields are required' });
        }
      
        try {
          const product = new Product({
            name,
            price,
            stock,
            vendor: req.user.id,
          });
          await product.save();
          res.status(201).json(product);
        } catch (err) {
            console.error('Error in Add Product:', err); 
          res.status(500).json({ error: err.message });
        }
      };

export const getProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    try {
        const products = await Product.find({ vendor: req.user.id })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        res.json(products);
    } catch (err) {
      console.error('Error in Get Product:', err); 
        res.status(500).json({ error: err.message });
    }
    };

export const updateProduct = async (req, res) =>{
  
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.user.id },
      { name, price, stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error in Update Product:', err); 
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ _id: id, vendor: req.user.id });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('error in Deleting Product',err)
    res.status(500).json({ error: err.message });
  }
};

