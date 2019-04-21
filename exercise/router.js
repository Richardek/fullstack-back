'use strict';

const router = require('express').Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const {Exercise} = require('../exercise/models.js');
const ExerciseService = require('../services/exerciseService');
const passport = require('passport');

router.post('/add/exercise', jsonParser, async (req,res)=> {
    try{
      let Exercise = await ExerciseService.create(req.body);
      res.status(201).json(Exercise);
    } catch (err){
      res.status(500).json({message: 'There was a problem creating the exercise'});
    }
  });

router.route('/').get(function(req, res){
    Exercise.find(function(err, exer){
        if(err){
            console.log(err);
        }
        else {
            res.json(exer);
        }
    });
});


router.get('/singleExercise/:id', function(req,res) {
    Exercise
    .find({_id: req.params.id})
    .exec()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong getting specified id events'});
    });
});
router.get('/:id', function(req,res) {
    Exercise
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

router.put('/edit/:id', jsonParser, async (req, res) => {
    try{
        let Exercise = await ExerciseService.update(req.params.id, req.body);
        res.status(204).json(Exercise);
    } catch (err) {
        res.status(500).json({message: 'There was a problem updating.'});
      }
});
router.delete('/delete/:id', async (req,res) => {
   try{
       let Exercise = await ExerciseService.remove(req.params.id);
       res.status(204).json(req.params.id);
    }catch(err){
        res.status(500).json({message: 'Something went wrong in deletion'});
    }
});

module.exports = router;