var mongoose = require('mongoose');

const GazSchema = new mongoose.Schema({
     date_gaz : Date,
     mesure_gaz : Number,
     nom_gaz :{type: String,enum: ['NO2','CO','H2','NH3','CH4']},
     nom_capteur : String,
     latitude : Number,
     longitude : Number
	});

module.exports = mongoose.model('Gaz', GazSchema, 'Gaz');