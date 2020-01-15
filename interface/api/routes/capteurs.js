var express = require('express');
const Capteurs = require('../models/capteurs.model.js');

const router = express.Router();

/* GET son listing. */
router.get('/', (req, res) => {
  Capteurs.find()
    .then(function (capteurs) {
      res.send(capteurs);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving capteurs.'
      });
    });
});

module.exports = router;
