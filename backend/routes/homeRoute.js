const express = require('express');
const { index_get, experience_get } = require('../controllers/homeController');

const router = express.Router();

// Go to Home Page
router.get('/', index_get);
// View all experiences
router.get('/experiences', experience_get);

// Module Export
module.exports = router;