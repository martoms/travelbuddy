const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const TourPackage = require('../models/TourPackage');

// Go to homepage
const index_get = async (req, res) => {
    
    try {

        let topDestinations = await TourPackage.find({ isTopDestination: true, travelPlan:"with-guests" });

        topDestinations = topDestinations.reduce((acc, tourPackage) => {
            const destination = tourPackage.destination;
            
            // Check if a destination group already exists in the accumulator
            const existingGroup = acc.find(group => group.destination === destination);
            
            if (existingGroup) {
                // If the destination group exists, push the current booking to it
                existingGroup.destinationTourPackages.push(tourPackage);
            } else {
                // If the destination group doesn't exist, create a new one
                acc.push({
                    destination: destination,
                    destinationTourPackages: [tourPackage]
                });
            }

            const toAlphabet = acc.sort((a, b) => a.destination.localeCompare(b.destination));

            return toAlphabet;

        }, []);

        res.status(200).json(topDestinations)

    } catch (err) {

        res.status(400).json(err)
    }
};

// Retrieve All User Experiences
const experience_get = async (req, res) => {
    try {
        // Get All User Experiences
        const experiences = await Experience.find({});
        const tourPackageIds = experiences.map(experience => experience.tourPackageId);
        const messages = experiences.map(experience => experience.message);
        const ratings = experiences.map(experience => experience.rating);

        // Get TourPackage Data
        const tourPackages = await TourPackage.find({_id: {$in: tourPackageIds}});
        const bookingIds = tourPackages.map(tourPackage => tourPackage.bookings.bookingId);
        const destinations = tourPackages.map(tourPackage => tourPackage.destination);
        const packageDurations = tourPackages.map(tourPackage => tourPackage.packageDuration);
        const travelPlans = tourPackages.map(tourPackage => tourPackage.travelPlan);
        const tourStart = tourPackages.map(tourPackage => tourPackage.tourStarts);
        const tourEnd = tourPackages.map(tourPackage => tourPackage.tourEnds);

        // Get usernames
        const bookings = await Booking.find({_id: {$in: bookingIds}});
        const usernames = bookings.map(booking => booking.username);

        // console.log(`usernames: ${usernames}`)


        // Reformat Dates...
        // Compare Dates
        const date1 = new Date(tourStart).getDate();
        const date2 = new Date(tourEnd).getDate();
        let endDates;

        // Start Dates
        const startDates = tourStart.map((startDate) => {
           return new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        })
        // End Dates
        if (date1 < date2) {
            endDates = tourEnd.map((endDate) => {
                return new Date(endDate).toLocaleDateString('en-US', { day: 'numeric' });
            })
        } else {
            endDates = tourEnd.map((endDate) => {
                return new Date(endDate).toLocaleDateString('en-US', {  month: 'short', day: 'numeric' });
            })
        };
        // Year
        const years = tourStart.map((year) => {
            return new Date(year).getFullYear();
         })
        //  New Format
        let dates = [];
        for (let i = 0; i < startDates.length; i++) {
            dates.push(
                `${startDates[i]}-${endDates[i]}, ${years[i]}`
            )
        };

        // Organize Experience Data
        let userExperiences = [];
        for (let i = 0; i < usernames.length; i++) {
            userExperiences.push({
                'username': `@${usernames[i]}`,
                'destination': destinations[i],
                'packageDuration': packageDurations[i],
                'travelPlan': travelPlans[i],
                'date': dates[i],
                'rating': ratings[i],
                'message': messages[i]
            });
        };

        if (userExperiences.length === 0) {
            res.status(200).json({
                message: 'It seems that there are no user experiences yet at the moment. You may come back again next time.'
            });
        }  else {
            res.status(200).json({userExperiences});
        }

    } catch (err) {
        res.status(400).json({
            message: 'There seems to be a problem retrieving all user tour experiences. Please try again later.',
            error: err.message,
            location: err.stack
        });
    }
};

// Module Export
module.exports = { index_get, experience_get };