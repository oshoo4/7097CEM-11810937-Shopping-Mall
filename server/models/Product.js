const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxLength: [1000, 'Product description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image URL is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['T-shirt', 'Jeans'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);