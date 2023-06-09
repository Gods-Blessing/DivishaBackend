const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/divishafullstack");

const db = mongoose.connection;

db.on('error', function(err){
    console.log("error while connecting to db");
    return;
})

db.once('open', function(){
    console.log("connected to db");
})

module.exports = db;