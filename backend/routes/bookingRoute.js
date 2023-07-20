const express = require('express');
const { verify } = require('../middlewares/auth');
const {
    bookingWithGuests_get, bookingWithGuests_post,
    bookingWithFriends_get, bookingWithFriends_post,
    bookingSolo_get, bookingSolo_post
} = require('../controllers/bookingController');

const router = express.Router();

// [WITH-GUESTS]
router.get('/with-guests', verify, bookingWithGuests_get);
router.post('/with-guests/create', verify, bookingWithGuests_post);

// [WITH-FRIENDS]
router.get('/with-friends', verify, bookingWithFriends_get);
router.post('/with-friends/create', verify, bookingWithFriends_post);

// [SOLO]
router.get('/solo', verify, bookingSolo_get);
router.post('/solo/create', verify, bookingSolo_post);

// Module export
module.exports = router;