var express = require('express');
const Particules = require('../models/particules.model.js');

const router = express.Router();

/* GET particules listing. */
router.get('/', (req, res) => {
  Particules.find()
    .then(function (particules) {
      res.send(particules);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving particules.'
      });
    });
});

module.exports = router;
