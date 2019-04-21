var mongoose = require('mongoose');
var weightBmiSchema = mongoose.Schema({
    weight: {type: Number, required: true},
    bmi:{type: Number, required: true},
    month: {type: String, required: true},
    creator: {type: mongoose.Schema.ObjectId}},
    {
    collection: 'weight-bmi'
});
weightBmiSchema.methods.serialize = function(){
    return{
        weight: this.weight,
        bmi: this.bmi,
        creator: this.creater,
        month: this.month
    }
};

const WeightBmi = mongoose.model('WeightBmi', weightBmiSchema);
module.exports = {WeightBmi};