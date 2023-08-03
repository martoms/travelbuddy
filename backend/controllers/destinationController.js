const { adminPrivilege } = require('../middlewares/auth');
const TourPackage = require('../models/TourPackage');

// Retrieve All Destination
const allDestinations_get = async (req, res) => {
    try {
        // Check Admin Privilege
        let isAdmin = await adminPrivilege(req.params.id);

        if (isAdmin) {
            let allTourPackages = await TourPackage.find({});

            // Limit tourPackages to each instance of a particular destination
            const allDestinations = allTourPackages.reduce((destinationArray, destinationObj) => {

              const exists = destinationArray.some((item) => item.destination === destinationObj.destination);

              if (!exists) {
                destinationArray.push(destinationObj);
              }

              return destinationArray;
            }, []);

            const allDestinationsAlphabetical = allDestinations.sort((a, b) => a.destination.localeCompare(b.destination));
              
            res.status(200).json(allDestinationsAlphabetical)
        } else {
            let allActiveTourPackages = await TourPackage.find({isActive: true});

            // Limit tourPackages to each instance of a particular destination
            const destinations = allActiveTourPackages.reduce((destinationArray, destinationObj) => {

              const exists = destinationArray.some((item) => item.destination === destinationObj.destination);

              if (!exists) {
                destinationArray.push(destinationObj);
              }

              return destinationArray;
            }, []);

            const destinationsAlphabetical = destinations.sort((a, b) => a.destination.localeCompare(b.destination));

            res.status(200).json(destinationsAlphabetical)
        }

    } catch (err) {
        res.status(400).json({
          message: 'There seems to be a problem retrieving all destinations at the moment. Please try again later.',
          error: err.message
        });
    }
};

// Retrieve Specific Destination
const specificDestination_get = (req, res) => {
    TourPackage.findById(req.params.id).then((destination) => {
            res.status(200).json({
                destination
            })
        }).catch((err) => {
            res.status(400).json({
                message: "Sorry, but we can't find your chosen destination :( Please try again later.",
                error: err.message
            })
        })
}

// Module Export
module.exports = {
    allDestinations_get,
    specificDestination_get
};