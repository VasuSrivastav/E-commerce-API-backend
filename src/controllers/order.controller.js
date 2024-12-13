import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const addOrder = async (req, res) => {
    const { productId, quantity } = req.body;
  
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock available' });
      }
  
      const order = new Order({
        product: productId,
        quantity,
      });
  
      product.stock -= quantity; // Deduct stock for live update
      await product.save();
      await order.save();
  
      res.status(201).json(order);
    } catch (err) {
        console.error('Error in add Order:', err)
      res.status(500).json({ error: err.message });
    }
  };


export const viewOrder = async (req, res) => {
    try {
        // populate to join the table and req.user.id as by jwt 
      const orders = await Order.find({}).populate({
        path: 'product',
        match: { vendor: req.user.id },
      });
  
      const filteredOrders = orders.filter(order => order.product !== null);
      res.json(filteredOrders);
    } catch (err) {
        console.error('Error in View Order:', err);
      res.status(500).json({ error: err.message });
    }
  };

  export const updateOrder = async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await Order.findById(id).populate('product');
  
      if (!order || order.product.vendor.toString() !== req.user.id) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = 'shipped';
      await order.save();
      res.json(order);
    } catch (err) {
        console.log('Error in Update Order:'.err)
      res.status(500).json({ error: err.message });
    }
  };