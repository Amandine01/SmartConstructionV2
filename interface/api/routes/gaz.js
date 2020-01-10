var express = require('express');
const Gaz = require('../models/gaz.model.js');

const router = express.Router();

/* GET gaz listing. */
router.get('/', (req, res) => {
  Gaz.find()
    .then(function (gaz) {
      res.send(gaz);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving gaz.'
      });
    });
});

module.exports = router;
