const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../modals/User');
const Product = require('../modals/Product');
const router = express.Router();

// ROUTE 1: Get all items from cart of a user: GET "/api/cart/getcartitems". Login required
router.get('/getcartitems', fetchuser, async(req, res) => {
    try {
        //fetchuser middleware will be returning the id of the user using token
        const user = await User.findById(req.user.id);
        let cartProducts = user.cart.map(async (id) => await Product.findById(id));
        
        //cartProducts will be an array of pending Promises so waiting for it to resolve
        Promise.allSettled(cartProducts)
            .then(pro => {
                //pro will be an array of fulfilled Promises with status and value
                let cartProducts = pro.map((elem) => elem.value);
                res.json(cartProducts);
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).send("Internal server error occured");
            })
        
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// ROUTE 2: Add an item to the cart of a user: PUT "/api/cart/additem". Login required
router.put('/additem/:id', fetchuser, async(req, res) => {
    try {
        //fetchuser middleware will be returning the id of the user using token
        const user = await User.findById(req.user.id);
        let success = false;
        //We will be adding the item inside the cart only if it is not present
        if(!user.cart.includes(req.params.id)){
            const updatedUser = await User.findByIdAndUpdate(user._id, {cart: [...user.cart, req.params.id]}, {returnDocument: 'after'});
            success = true;
            res.json({success, result: updatedUser});
        } else {
            res.json({success, result: 'Item already exists in cart'});
        }
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// ROUTE 3: Removing an item from the cart of a user: DELETE "/api/cart/deleteitem". Login required
router.delete('/deleteitem/:id', fetchuser, async(req, res) => {
    try {
        //fetchuser middleware will be returning the id of the user using token
        const user = await User.findById(req.user.id);
        let success = false;
        //We will be deleting the item inside the cart only if it is present
        if(user.cart.includes(req.params.id)){
            const updatedUser = await User.findByIdAndUpdate(user._id, {cart: user.cart.filter((product_id) => product_id.toString()!==req.params.id)}, {returnDocument: 'after'});
            success = true;
            res.json({success, result: updatedUser});
        } else {
            res.json({success, result: 'Item doesn\'t exists in cart'});
        }
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})


module.exports = router;