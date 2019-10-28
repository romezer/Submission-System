const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    serialNumber: { type: String, unique: true, required : true},
    category: {type: String},
    description: {type: String}
});

mongoose.model('products', ProductSchema);