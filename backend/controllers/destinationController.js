const { adminPrivilege } = require('../middlewares/auth');
const TourPackage = require('../models/TourPackage');

// Retrieve All Destination
const allDestinations_get = async (req, res) => {
    try {
        // Check Admin Privilege
        let isAdmin = await adminPrivilege(req.cookies.jwt);

        if (isAdmin) {
            let allDestinations = await TourPackage.aggregate([
                {
                  $match: {} 
                },
                {
                  $group: {
                    _id: null,
                    Total: { $sum: 1 },
                    TourPackages: {
                      $push: {
                        id: "$_id",
                        destination: "$destination",
                        packageDuration: "$packageDuration",
                        tourStarts: "$tourStarts",
                        tourEnds: "$tourEnds",
                        isTopDestination: "$isTopDestination",
                        isActive: "$isActive"
                      }
                    },
                  }
                },
                {
                  $project: {
                    _id: 0,
                    Total: 1,
                    "Tour Packages": "$TourPackages"
                  }
                }
              ]);
              
            res.status(200).json({
                message: 'Here are all the Tour Packages!',
                'Tour Packages': allDestinations
            })
        } else {
            let allActiveDestinations = await TourPackage.aggregate([
                {
                  $match: {isActive: true} 
                },
                {
                  $group: {
                    _id: null,
                    Total: { $sum: 1 },
                    TourPackages: {
                      $push: {
                        id: "$_id",
                        destination: "$destination",
                        packageDuration: "$packageDuration",
                        tourStarts: "$tourStarts",
                        tourEnds: "$tourEnds",
                        isTopDestination: "$isTopDestination",
                        isActive: "$isActive"
                      }
                    },
                  }
                },
                {
                  $project: {
                    _id: 0,
                    Total: 1,
                    "Tour Packages": "$TourPackages"
                  }
                }
              ]);
            res.status(200).json({
                message: 'Here are all the available Tour Packages!',
                'Tour Packages': allActiveDestinations
            })
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