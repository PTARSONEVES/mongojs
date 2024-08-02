const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
   codUf: { type: Number, required: true},
   nameUf: { type: String, required: true} 
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;