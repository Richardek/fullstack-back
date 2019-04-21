'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {User} = require('./models');
const UserService = require('../services/userService');
const router = express.Router();
const jsonParser = bodyParser.json();

// post request to create new user
router.post('/', jsonParser, async (req,res)=>{
    try {
        let UserAvailable = await UserService.isUserAvailable(req.body.username);
        if(!UserAvailable){
           res.status(400).json({
               message: "That username is taken"
           });
           return;
        }
        let User = await UserService.create(req.body);
        res.status(201).json({
            message: "User has been created"
        });
    } catch (err){
        res.status(500).json({
            message: "There was an issue creating yor user."
        });
    }
});
module.exports = {router};