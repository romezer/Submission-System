const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    serialNumber: { type: String, unique: true, required : true},
    description: {type: String}
});

mongoose.model('products', ProductSchema);