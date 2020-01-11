var mongoose = require('mongoose');

const SonSchema = new mongoose.Schema({
     date_son : Date,
     mesure_son : Number,
     nom_capteur : String,
     latitude : Number,
     longitude : Number
	});

module.exports = mongoose.model('Son', SonSchema, 'Son');