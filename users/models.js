'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// user schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    firstName:{
        type:String,
        required: true
    },
    height:{
        type: String
    }
});

UserSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        id: this._id || '',
        lastName: this.lastName || '',
        firstName: this.firstName || '',
        height: this.height || ''

    };
};
// check if password is correct
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
// encrypt the password
UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};