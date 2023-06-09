const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

console.log(ExtractJWT);

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"taskboard"
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id).then(function(user){
        if(user){
            return done(null, user);
        }else{
            return done(null,false)
        }
    })
}))


module.exports = passport;
