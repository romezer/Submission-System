const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Product = mongoose.model('products');

module.exports = app => {
    app.get('/api/products', requireLogin, async (req, res) => {
        const products = await Product.find({});

        res.send(products);
    });

    app.post('/api/product', requireLogin, requireAdmin, async (req, res) => {
        const { serialNumber, description } = req.body;
        const product = new Product({
            serialNumber,
            description
        });

        const savedProduct = await product.save();
        res.send(product);
    });

    app.get('/api/product', requireLogin, async (req, res) => {
        const product = await Product.findById(req.query.id);

        res.send(product);
    });

    app.put('/api/product', requireLogin, requireAdmin, async (req, res) => {
        const { id, serialNumber, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {serialNumber, description});
        
        res.send(updatedProduct);
        
    });

    app.delete('/api/product', requireLogin, requireAdmin, async (req, res) =>{
        const response = await Product.findByIdAndRemove(req.body.id);
        res.send(response);
    });

}