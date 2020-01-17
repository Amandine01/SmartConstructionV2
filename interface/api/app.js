var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require("cors");


mongoose.connect('mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net/', {dbName: 'SmartConstruction'});

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var capteursRouter = require('./routes/capteurs');


var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

 
app.use('/capteurs', capteursRouter); 


const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
   console.log('Listening at ${PORT}/');
});

module.exports = app;
