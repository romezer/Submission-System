const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const Product = mongoose.model('products');

module.exports = app => {
    app.get('/api/products', requireLogin, async (req, res, next) => {
        try{
            const products = await Product.find({});

            res.send(products);
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.post('/api/product', requireLogin, requireAdmin, async (req, res, next) => {
        const { serialNumber, description, category } = req.body;
        const product = new Product({
            serialNumber,
            category,
            description
        });
        try{
            const savedProduct = await product.save();
            res.send(product);
            next();
        }catch(error){
            next(error);
        }
       
    });

    app.get('/api/product', requireLogin, requireAdmin, async (req, res, next) => {
        try{
            const product = await Product.findById(req.query.id);

            res.send(product);
            next();
        }catch(error){
            next(error);
        }
        
    });

    app.put('/api/product', requireLogin, requireAdmin, async (req, res, next) => {
        try{
            const { id, serialNumber, category, description } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(id, {serialNumber,category, description});
        
            res.send(updatedProduct);
            next();
        }catch(error){
            next(error);
        }
        
        
    });

    app.delete('/api/product', requireLogin, requireAdmin, async (req, res, next) =>{
        try{
            const response = await Product.findByIdAndRemove(req.body.id);
            res.send(response);
            next();
        }catch(error){
            next(error);
        }
        
    });

}