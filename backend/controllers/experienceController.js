const Experience = require('../models/Experience');
const User = require('../models/User');
const TourPackage = require('../models/TourPackage');
const Booking = require('../models/Booking');
const { getUserId } = require('../middlewares/auth');

// Add User Experience
const shareExperience_post = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        let user = await User.findById(userId);

        // Request Body
        const {
            tourPackageId,
            message,
            rating
        } = req.body;

        // Check if eligible to add experience...
            // Get completed tours
            const completedTours = user.bookings
                .filter((booking => booking.isCompleted));
            
            // Collect bookingIds
            const bookingIds = completedTours.map(userBooking => userBooking.bookingId);
            // Look for corresponding booking data
            const bookings = await Booking.find({_id: {$in: bookingIds}});
            // Collect tourPackageIds
            const tourPackageIds = bookings.map(booking => booking.tourPackageId);
            // Check if any travelPackageIds match
            const isEligible = tourPackageIds.includes(tourPackageId);

        // Check if user has already added an experience to the same tourPackage
            // Get userExperienceIds
            const userXpIds = user.experiences.experienceId;
            // Query corresponding Experiences
            let experiences = await Experience.find({_id: {$in: userXpIds}});
            // Get tourPackageIds with experience added
            const xpTourPackageIds = experiences.map(experience => experience.tourPackageId);
            // If if any travelPackageIds match
            const alreadyAdded = xpTourPackageIds.includes(tourPackageId);

        if (isEligible && !alreadyAdded) {
            const newExperience = await Experience.create({
                userId,
                tourPackageId,
                message,
                rating
            });
    
            // Update tourPackage Experience
            const tourPackage = await TourPackage.findByIdAndUpdate(
                tourPackageId,
                { $push: {'experiences.experienceId': newExperience._id} },
                { new: true }
            );
    
            // Update user Experience
            user = await User.findByIdAndUpdate(
                userId,
                {$push: {'experiences.experienceId': newExperience._id}},
                { new: true }
            );
            
            // User and TourPackage experiences
            const userXp = user.experiences.experienceId;
            const tourPackageXp = tourPackage.experiences.experienceId;
    
    
            res.status(201).json({
                message: 'New experience added!',
                experience: newExperience,
                'userXp ID': userXp,
                'tourPackageXp ID': tourPackageXp
            })
        } else if (isEligible && alreadyAdded) {
            res.status(400).json({
                message: 'Sorry, but users are allowed to add ONLY ONE experience to every tour.'
            });
        } else {
            res.status(400).json({
                message: 'Sorry, but users are allowed to add experiences to completed tours only.'
            });
        }
    } catch (err) {
        res.status(400).json({
            message: 'It seems like there is a problem posting your new experience. Please try again later.',
            error: err.message
        });
    }
};

// Module Export
module.exports = { shareExperience_post };