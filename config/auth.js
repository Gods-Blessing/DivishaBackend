const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.verifyToken = async function(req,res,next){
    
    let authHeader = req.headers.authorization.split(" ")[1];
    console.log(authHeader);
    if(authHeader){
                const userfromtoken = jwt.verify(req.headers.authorization.split(" ")[1], 'gameison');
                console.log("user id",userfromtoken);
                
                req.user = userfromtoken.id;
                
                next();
    }else
    {
        return res.status(401).json({error:"youa are not authorized"})
    }
}

