const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order data: items are required.' });
        }

        const orderItems = [];
        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            if (product.stock < item.quantity) {
              return res.status(400).json({ message: `Not enough stock for: ${product.name}`});
            }

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            totalPrice += product.price * item.quantity;
        }

        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalPrice: totalPrice
        });

        await order.save();

         for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;