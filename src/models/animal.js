const mongoose = require('../database/index.js');

const AnimalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    years:{
        type: Number
    }
});

const Animal = mongoose.model('Animal', AnimalSchema);
module.exports = Animal;