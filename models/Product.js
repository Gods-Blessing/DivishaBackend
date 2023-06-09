const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },
    productname:{
        type:String,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    sp:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    image:[]
    
    
}, {
    timestamps:true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;