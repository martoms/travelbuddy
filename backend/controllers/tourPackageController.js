const TourPackage = require('../models/TourPackage');
const User = require('../models/User');
const { getUserId } = require('../middlewares/auth');
const { sendNotification } = require('../middlewares/notifications');

// Create Tour Package
const addTourPackage_post = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        // Query user
        const user = await User.findById(userId);

         // Request Body
        let {
            destination,
            packageDuration,
            tourStarts,
            basePrice,
            itinerary: [{
                day1, day2, day3, day4, day5
            }],
            inclusions,
            exclusions
        } = req.body;
        
        // Convert Date String to Date Data Type
        tourStarts = new Date(tourStarts);

        // Set tourEnds:
        let tourEnds = new Date(tourStarts);
        switch (packageDuration) {
            case '5D4N':
                tourEnds = tourEnds.setDate(
                        tourEnds.getDate() + 5);
            break;
            case '4D3N':
                tourEnds = tourEnds.setDate(
                        tourEnds.getDate() + 4);
            break;
            case '3D2N':
                tourEnds = tourEnds.setDate(
                        tourEnds.getDate() + 3);
            break;
        };
        
        // Create Tour Package
        const createdTourPackage = await TourPackage.create({
            destination,
            packageDuration,
            tourStarts,
            tourEnds,
            basePrice,
            itinerary: [{
                day1, day2, day3, day4, day5
            }],
            inclusions,
            exclusions
        });

        // Send Notification
        const notification = {
            title: 'Created Tour Package',
            content: {
                message: `@${user.username}, you have just successfully added a new Tour Package!`,
                'Tour Package': {
                    id: createdTourPackage._id,
                    destination,
                    packageDuration,
                    tourStarts,
                    tourEnds: createdTourPackage.tourEnds,
                    basePrice,
                    itinerary: [{
                        day1, day2, day3, day4, day5
                    }],
                    inclusions,
                    exclusions
                }
            }
        }
        await sendNotification(userId, notification);
        
        res.status(201).json({
            message : 'Tour Package creation successful!',
            'Tour Package': createdTourPackage
        });

    } catch (err) {
        res.status(400).json({ 
            message: 'There seems to be a problem creating a new Tour Package. Please try again later',
            message: err.message
        });
    }
}

// Set Top Destinations among Tour Packages
const setTopDestination_patch = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        // Query user
        const user = await User.findById(userId);

        const {destinations} = req.body;
        await TourPackage.updateMany(
            { destination: { $in: destinations } },
            { $set: { isTopDestination: true } },
            { new: true }
        );
      
        const topDestinations = await TourPackage.find(
            {destination: { $in: destinations }},
            { _id: 1, destination: 1, packageDuration: 1, isTopDestination: 1 }
        );

        // Send Notification
        const notification = {
            title: 'Set Top Destination',
            content: {
                message: `@${user.username}, you have just successfully set new Top Destination!`,
                'Top Destinations': topDestinations
            }
        }
        await sendNotification(userId, notification);

        res.status(200).json({
            message: 'You have successfully set new Top Destinations!',
            result: topDestinations
        })
    } catch (err) {
        res.status(400).json({
            message: 'There seems to be a problem setting new top destinations. Please try again later.',
            error: err.message
        })
    }
}

// Archive Tour Package
const archiveTourPackage_patch = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        // Query user
        const user = await User.findById(userId);

        await TourPackage.updateOne(
            { _id: req.params.id },
            { $set: { isActive: false } }
        );
      
        const archivedTourPackage = await TourPackage.find(
            { _id: req.params.id },
            { _id: 1, destination: 1, packageDuration: 1, isActive: 1 }
        );

        // Send Notification
        const notification = {
            title: 'Archive Tour Package',
            content: {
                message: `@${user.username}, you have just successfully archived Tour Package!`,
                'Archived Tour Package': archivedTourPackage
            }
        }
        await sendNotification(userId, notification);

        res.status(200).json({
            message: 'You have successfully archived a Tour Package!',
            result: archivedTourPackage
        })
    } catch (err) {
        res.status(400).json({
            message: 'There seems to be a problem archiving Tour Package. Please try again later.',
            error: err.message
        })
    }
}

// Activate Tour Package
const activateTourPackage_patch = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        // Query user
        const user = await User.findById(userId);

        await TourPackage.updateOne(
            { _id: req.params.id },
            { $set: { isActive: true } }
        );
      
        const activateTourPackage = await TourPackage.find(
            { _id: req.params.id },
            { _id: 1, destination: 1, packageDuration: 1, isActive: 1 }
        );

        // Send Notification
        const notification = {
            title: 'Activate Tour Package',
            content: {
                message: `@${user.username}, you have just successfully activated Tour Package!`,
                'Activated Tour Package': activateTourPackage
            }
        }
        await sendNotification(userId, notification);

        res.status(200).json({
            message: 'You have successfully activated a Tour Package!',
            result: activateTourPackage
        })
    } catch (err) {
        res.status(400).json({
            message: 'There seems to be a problem activating Tour Package. Please try again later.',
            error: err.message
        })
    }
}

// Update Tour Package Details
const updateTourPackage_patch = async (req, res) => {
    try {
        // Get userId
        const userId = await getUserId(req.cookies.jwt);
        // Query user
        const user = await User.findById(userId);

        // Request Body
        const requestBody = req.body;

        await TourPackage.updateMany(
            {
                _id: req.params.id 
            },
            {
                $set: requestBody
            }
        );

        const updatedTourPackage = await TourPackage.findById(req.params.id);
        
        // Send Notification
        const notification = {
            title: 'Update Tour Package',
            content: {
                message: `@${user.username}, you have just made a Tour Package Update!`,
                'Updated Tour Package': updatedTourPackage
            }
        }
        await sendNotification(userId, notification);

        res.status(200).json({
            message: 'Update Successful!',
            result: updatedTourPackage
        });

    } catch (err) {
        res.status(400).json({
            message: 'An error occured upon updating. Please try again Later',
            error: err.message
        })
    }
}

// Module Exports
module.exports = {
    addTourPackage_post,
    setTopDestination_patch,
    updateTourPackage_patch,
    archiveTourPackage_patch,
    activateTourPackage_patch
};