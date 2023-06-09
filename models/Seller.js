const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    businessname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    }
}, {
    timestamps:true
})

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;