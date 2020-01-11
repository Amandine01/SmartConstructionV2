var mongoose = require('mongoose');

const ParticulesSchema = new mongoose.Schema({
     date_particules : Date,
     mesure_particules : Number,
     nom_particules :{type: String,enum: ['PM2,5','PM1,0']},
     nom_capteur : String,
     latitude : Number,
     longitude : Number
	});

module.exports = mongoose.model('Particules_fines', ParticulesSchema, 'Particules_fines');