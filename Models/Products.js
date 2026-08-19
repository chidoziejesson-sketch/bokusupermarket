const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false
    }
    
},
{timestamps: true} //Date created and updated at
);
// create model from schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product; //export the Product model for use in other parts of the application