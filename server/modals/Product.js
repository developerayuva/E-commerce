const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title : {type: String},
    image: {type: String},
    price: {
        type: Number,
        default: 999
    }
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;