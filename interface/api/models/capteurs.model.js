var mongoose = require('mongoose');

//Model du capteur
const CapteursSchema = new mongoose.Schema({
     nom_capteur : String,
     date : Date,
     CO : Number,
     NO2 : Number,
     PM10 : Number,
     PM25 : Number,
     Son : Number,
     Latitude : Number,
     Longitude : Number
	});

module.exports = mongoose.model('Capteurs', CapteursSchema, 'Capteurs');