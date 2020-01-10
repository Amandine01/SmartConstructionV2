var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require("cors");

//Nom de ma bdd : SmartConstruction, login : pfe_smartconstruction, psswd : pfe1961 ; je suis pas sûr pour le port
mongoose.connect('mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net/', {dbName: 'SmartConstruction'});
//'mongodb+srv://pfe_smartconstruction:pfe1961@cluster.mongodb.net/', {dbName: 'SmartConstruction'});
var db = mongoose.connection;

//mongodb+srv://pfe_smartconstruction:pfe1961@smartconstruction-vkl5p.mongodb.net/test


db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//la collection que j'aimerais afficher = gaz
var gazRouter = require('./routes/gaz');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/gaz', gazRouter);  



//j'imagine que le port est faux ?
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
   console.log('Listening at ${PORT}/');
});

module.exports = app;
