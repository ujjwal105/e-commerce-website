const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get All Products
router.get('/allproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All Products fetched");
        res.send(products);
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong " + error.message });
    }
});

// Add a Product
router.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    try {
        await product.save();
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong " + error.message });
    }
});

// Remove a Product
router.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong " + error.message });
    }
});

module.exports = router;
