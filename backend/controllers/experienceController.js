const Experience = require('../models/Experience');
const User = require('../models/User');
const TourPackage = require('../models/TourPackage');
const Booking = require('../models/Booking');
const { getUser } = require('../middlewares/auth');

// Add User Experience
const shareExperience_post = async (req, res) => {
    try {
        // Get userId
        const userId = await getUser(req.headers.authorization).id;
        let user = await User.findById(userId);

        // Request Body
        const {
            tourPackageId,
            message,
            rating
        } = req.body;

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
            success: 'New experience added!',
            experience: newExperience,
            'userXp ID': userXp,
            'tourPackageXp ID': tourPackageXp
        })
    } catch (err) {
        res.status(400).json({
            message: 'It seems like there is a problem posting your new experience. Please try again later.',
            error: err.message
        });
    }
};

// Module Export
module.exports = { shareExperience_post };