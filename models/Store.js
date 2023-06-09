const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller"
    },
    address:{
        type:String,
        required:true
    },
    gst:{
        type:Number,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    category:[{
        type:String,
    }],
    subcategory:[{
        type:String,
    }],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
    
}, {
    timestamps:true
})

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;