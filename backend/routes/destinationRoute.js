const express = require('express');
const {
    allDestinations_get,
    specificDestination_get
} = require('../controllers/destinationController');

const router = express.Router();

// Got to All-Destinations Route
router.get('/destinations', allDestinations_get);
router.get('/destinations/:id', specificDestination_get);

// Module Export
module.exports = router;