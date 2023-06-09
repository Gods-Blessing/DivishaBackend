const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT||8000;
const db = require('./config/mongoose');




app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/', require('./routes/index'))


app.listen(port, function(err){
    if(err){
        console.log("error while connexting to server");
        return;
    }

    console.log("connected to server on port:", port);
})