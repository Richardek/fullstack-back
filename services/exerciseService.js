const {Exercise} = require('../exercise/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function ExerciseService(){
    this.create = function(exerciseObj){
        return new Promise(async(resolve,reject)=>{
            try{
                let{
                    title,
                    time,
                    creator,
                    start,
                    end,
                    strengthExercise
                } = exerciseObj;
                let newExercise = await Exercise
                .create({
                    title,
                    time,
                    creator,
                    start,
                    end,
                    strengthExercise
                });
                resolve(newExercise);

            } catch(err) {
                console.log('Error');
                reject('Mongoose error');
            }
        });
    }
    this.get = function(id){
        return new Promise(async (resolve, reject)=>{
            let list = Exercise
            .find({creator: id})
            .exec();
            resolve(list);
        });

    },
    this.update = function(id, exercise){
        return new Promise(async (resolve, reject)=>{
            const updated = {};
            const updateableFields = ['title', 'start', 'time', 'end', 'strengthExercise'];
            updateableFields.forEach(field => {
                if (field in exercise) {
                    updated[field] = exercise[field];
                }
            });
            let updatedExercise = Exercise
            .findByIdAndUpdate(id, {
                $set: updated},
                {
                    new: true
                });
                resolve(updatedExercise);
        });
    },
    this.remove = function(id){
        return new Promise(async(resolve, reject)=> {
            let deleteExercise = await Exercise
                .findByIdAndRemove(id);
                resolve(deleteExercise)
        });
    }
   
}

module.exports = new ExerciseService();