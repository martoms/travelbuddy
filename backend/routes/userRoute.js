const express = require('express');
const { verify, verifyAdmin } = require('../middlewares/auth');
const { validatePassword } = require('../middlewares/validatePassword');
const { validateChangedPassword } = require('../middlewares/validateChangedPassword');
const {
    signup_get,
    signup_post,
    login_get,
    login_post,
    profile_get,
    changePassword_post,
    admin_get,
    allUsers_get,
    specificUser_get,
    makeAdmin_patch,
    demoteAdmin_patch,
    logout_get
} = require('../controllers/userController');
const {
    adminTourPackages_get,
    addTourPackage_post,
    setTopDestination_patch,
    unsetTopDestination_patch,
    updateTourPackage_patch,
    archiveTourPackage_patch,
    activateTourPackage_patch
} = require('../controllers/tourPackageController');
const {
    userBookings_get,
    toursHistory_get,
    allBookings_get,
    allCompletedBookings_get,
    specificBooking_get
} = require('../controllers/bookingController');
const {
    notifications_get,
    specificNotification_get,
    markRead_patch,
    markUnread_patch,
} = require('../middlewares/notifications');
const { shareExperience_post } = require('../controllers/experienceController');

const router = express.Router();

// [Signup Page]
router.get('/signup', signup_get);
router.post('/signup', validatePassword, signup_post);

// [Login Page]
router.get('/login', login_get);
router.post('/login', login_post);

// [User Profile]
router.get('/profile', verify, profile_get);
// Notifications
router.get('/profile/notifications', verify, notifications_get);
router.get('/profile/notifications/:id', verify, specificNotification_get);
router.patch('/profile/notifications/mark-read', verify, markRead_patch);
router.patch('/profile/notifications/mark-unread', verify, markUnread_patch);
// Change Password
router.post('/profile/change-password', verify, validateChangedPassword, changePassword_post);
// Bookings and Tours History
router.get('/profile/bookings', verify, userBookings_get);
router.get('/profile/tours-history', verify, toursHistory_get);
router.post('/profile/tours-history/share-experience', verify, shareExperience_post);

// [Admin Dashboard]
router.get('/admin', verify, admin_get);
router.get('/admin/tourpackages', verifyAdmin, adminTourPackages_get);
router.post('/admin/tourpackages/create', verifyAdmin, addTourPackage_post);
// Change Password
router.post('/admin/change-password', verifyAdmin, validateChangedPassword, changePassword_post);
// Notifications
router.get('/admin/notifications', verifyAdmin, notifications_get);
router.get('/admin/notifications/:id', verifyAdmin, specificNotification_get);
router.patch('/admin/notifications/mark-read', verifyAdmin, markRead_patch);
router.patch('/admin/notifications/mark-unread', verifyAdmin, markUnread_patch);
// Get Bookings
router.get('/admin/bookings', verifyAdmin, allBookings_get);
router.get('/admin/completed-bookings', verifyAdmin, allCompletedBookings_get);
router.get('/admin/bookings/:id', verifyAdmin, specificBooking_get);
// Modify TourPackages
router.patch('/admin/set-top-destination', verifyAdmin, setTopDestination_patch);
router.patch('/admin/unset-top-destination', verifyAdmin, unsetTopDestination_patch);
router.patch('/admin/:id/update-tour-package', verifyAdmin, updateTourPackage_patch);
router.patch('/admin/:id/archive', verifyAdmin, archiveTourPackage_patch);
router.patch('/admin/:id/activate', verifyAdmin, activateTourPackage_patch);
// Manage Users
router.get('/admin/all-users', verifyAdmin, allUsers_get);
router.get('/admin/all-users/:id', verifyAdmin, specificUser_get);
router.patch('/admin/all-users/:id/make-admin', verifyAdmin, makeAdmin_patch);
router.patch('/admin/all-users/:id/demote-admin', verifyAdmin, demoteAdmin_patch);

// [Logout]
router.get('/logout', logout_get);

// Module export
module.exports = router;