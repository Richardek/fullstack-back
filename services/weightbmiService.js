const {WeightBmi} = require('../weight-bmi/models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
function WeightBmiService(){
    this.create = function(weightBmiObj){
        return new Promise(async(resolve,reject)=>{
            try{
                let{
                    weight,
                    bmi,
                    creator,
                    month
                } = weightBmiObj;
                let newWeightBmi = await WeightBmi
                .create({
                    weight,
                    bmi,
                    creator, 
                    month
                });
                resolve(newWeightBmi);

            } catch(err) {
                console.log('Error');
                reject('Mongoose error');
            }
        });
    }
    this.remove = function(id){
        return new Promise(async(resolve, reject)=>{
            let deleteWeightBmi = await WeightBmi
                .findByIdAndRemove(id);
                resolve(deleteWeightBmi);
        });
    }
}
module.exports = new WeightBmiService();