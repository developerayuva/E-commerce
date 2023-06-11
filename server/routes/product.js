const express = require('express');
const Product = require('../modals/Product');
const router = express.Router();

// ROUTE 1: Get all items from products: POST "/api/product/getallproducts". No login required
router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find({}).select('-__v');
        res.json(products);
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router;