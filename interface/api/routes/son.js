var express = require('express');
const Son = require('../models/son.model.js');

const router = express.Router();

/* GET son listing. */
router.get('/', (req, res) => {
  Son.find()
    .then(function (son) {
      res.send(son);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving son.'
      });
    });
});

module.exports = router;
