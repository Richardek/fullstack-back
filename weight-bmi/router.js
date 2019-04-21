'use strict';
const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const WeightBmiService = require('../services/weightbmiService.js');
const {WeightBmi} = require('../weight-bmi/models.js');
const passport = require('passport');

router.get('/:id', function(req,res) {
    WeightBmi
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

router.post('/add/weightbmi', jsonParser, async (req,res)=> {
    try{
      let WeightBmi = await WeightBmiService.create(req.body);
      res.status(201).json(WeightBmi);
      res.send('deleted');
    } catch (err){
      res.status(500).json({message: 'There was a problem creating the exercise'});
    }
  });

router.delete('/delete/:id', async(req,res) => {
     try{
        let WeightBmi = await WeightBmiService.remove(req.params.id);
        return res.send('deleted!');
    }catch(err){
        res.status(500).json({message: 'Something went wrong in deletion'});
    }
    
    
});

module.exports = router;
