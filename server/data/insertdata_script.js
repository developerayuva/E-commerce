const products = require('./products');
const connectToMongo = require('../database');
const Product = require('../modals/Product');

connectToMongo();

Product.deleteMany({});
//Inserting all the products in data to MongoDB database
Product.insertMany(products);
