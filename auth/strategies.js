'use strict';
// retrieves username and pass from req.body and passes them into callback func
const { Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../users/models');
const {JWT_SECRET} = require('../config');

// checkig tos ee if values are stored in the database
const localStrategy = new LocalStrategy((username, password, callback) => {
    let user;
    User.findOne({
        username: username
    })
    .then(_user => {
        user = _user;
        if(!user) {
            return Promise.reject({
                reason: "Login Error",
                message: "Incorrect user or pass"
            });
        }
        return user.validatePassword(password);
    })
    .then(isValid => {
        if(!isValid){
            return Promise.reject({
                reason: 'Login Error',
                message: 'Incorrect user or pass'
            });
        }
        return callback(null, user);
    })
    .catch(err => {
        if(err.reason === 'Login Error'){
            return callback(null, false, err);
        }
        return callback(err ,false);
    });
});

const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
},
    (payload, done) =>{
        done(null, payload.user);  
    }
);

module.exports = {localStrategy, jwtStrategy};

