const {Water} = require('../water/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
function WaterService(){
    this.create = function(waterObj){
        return new Promise(async(resolve,reject)=>{
            try{
                let{
                    waterIntake,
                    waterDate,
                    creator,
                    id,
                    date

                } = waterObj;
                let newWater = await Water
                .create({
                    waterIntake,
                    waterDate,
                    creator,
                    id,
                    date
                });
                resolve(newWater);

            } catch(err) {
                console.log('Error');
                reject('Mongoose error');
            }
        });
    },
    this.get = function(id){
        return new Promise(async (resolve, reject)=>{
            let list = Water
            .find({id: id})
            .exec();
            resolve(list);
        });

    },
    this.update = function(id, water) {
        return new Promise(async (resolve, reject) => {
            const updated = {};
            const updatableFields = ['waterIntake'];
            updatableFields.forEach(field => {
                if (field in water) {
                    updated[field] = water[field];
                }
            });

            let updatedWater = Water
                .findOneAndUpdate(id, {
                    $set: updated
                }, {
                    new: true
                });
            resolve(updatedWater);

        });
    }
   
}
module.exports = new WaterService();