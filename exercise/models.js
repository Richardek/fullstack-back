var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exerciseSchema = mongoose.Schema({
    title: {type: String},
    time: {type: String},
    start:{type: Date, required: true},
    end:{type:Date, required:true},
    strengthExercise: [Schema.Types.Mixed],
    creator: {type: mongoose.Schema.ObjectId}},

    {
    collection: 'exercises'

});
exerciseSchema.methods.serialize = function(){
    return{
        title: this.name,
        time: this.time,
        creator: this.creator,
        strengthExercise: this.strengthExercise,
        start: this.start,
        end: this.end
    }
}
const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = {Exercise};