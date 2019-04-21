'use strict';

const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const {Water} = require('../water/models.js');
const passport = require('passport');
const WaterService = require('../services/waterService');


router.post('/add', jsonParser, async (req,res)=> {
    try{
      let Water = await WaterService.create(req.body);
      res.status(201).json(Water);
    } catch (err){
      res.status(500).json({message: 'There was a problem creating Water intake post.'});
    }
  });
router.get('/waterintake/all/:id', function(req,res) {
    Water
    .find({creator: req.params.id})
    .exec()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong getting specified id events'});
    });
});

router.get('/waterintake/:id', function(req,res) {
    Water
    .find({id: req.params.id})
    .exec()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong getting specified id events'});
    });
});
router.put('/waterintake/edit/:id', jsonParser, async (req,res)=> {
    try{
        let Water = await WaterService.update(req.params.id, req.body);
        res.status(204).json(Water);
     
       } catch (err) {
         res.status(500).json({message: 'There was a problem updating.'});
       }
    });

module.exports = router;