const User = require('../models/User');
const Booking = require('../models/Booking');
const TourPackage = require('../models/TourPackage');
const {getUser, getUsername} = require('../middlewares/auth');
const { dateFormat } = require('../middlewares/dateFormat');
const { sendNotification } = require('../middlewares/notifications');
const {
  calculateWithGuests,
  calculateWithFriends
} = require('../middlewares/tourPrice');

// [WITH-GUESTS]
// Go to Page
const bookingWithGuests_get = async (req, res) => {
  try {
    // Verify isAdmin
    const isAdmin = await getUser(req.headers.authorization).isAdmin;

    if (isAdmin) {
      res.status(200).json(isAdmin)
    } else {
      let allActiveTourPackages = await TourPackage.find({isActive: true});
      res.status(200).json(allActiveTourPackages)
    }

  } catch (err) {
    res.status.json({
      message: 'There seems to be a problem retrieving all Tour Packages at the moment. Please try again later.',
      error: err.message
    });
  }
};
// Create Booking
const bookingWithGuests_post = async (req, res) => {
    try {
      // Get userId
      const userId = await getUser(req.headers.authorization).id;

      // Get userData
      const {
        username,
        firstName,
        lastName
      } = await User.findById(userId); 
  
      // Request Body
      const {
        tourPackageId,
        buddies,
        paymentMethod
      } = req.body;
  
      // Get packageDuration and basePrice
      const tourPackage = await TourPackage.findById(tourPackageId);

      // If tourPackage Id does not exist
      if (tourPackage === null) {
        throw Error('Sorry, but the Tour Package that you are trying to book is not available.')
      }

      const {
        destination,
        packageDuration,
        travelPlan,
        basePrice,
        bookings,
        tourStarts,
        tourEnds,
        availableSlots
      } = tourPackage;

      let pax;
      // Get pax
      if (buddies[0].fullName === "") {
        pax = 1;
      } else {
        pax = buddies.length + 1;
      }
      
      
      // Get tourPrice  
      let tourPrice = calculateWithGuests(pax, basePrice, packageDuration);
      
      // Get totalPrice  
      const totalPrice = tourPrice * pax;

      // Calculate Total Tourists
      const users = bookings.bookingId.length;
      let joiners = 0;
      if (bookings.bookingId !== 0) {

        for (let id of bookings.bookingId) {
          let booking = await Booking.findById(id);

          if (booking.buddies.fullName) {
            joiners += booking.buddies.length;
          } 

        }
      }
      const totalTourists = users + joiners;
      

      // Create New Booking 
      let newBookingWithGuests;
      if (availableSlots >= pax) {
        newBookingWithGuests = await Booking.create({
          userId,
          username,
          firstName,
          lastName,
          tourPackageId,
          destination,
          travelPlan,
          buddies,
          pax,
          tourPrice,
          totalPrice,
          paymentMethod,
          tourStarts,
          tourEnds
        });
      } else {
        throw Error(`Sorry, your total pax is ${pax}, and the available slot is only ${availableSlots}`)
      }

      // Calculate Slots Left
      let slotsLeft = availableSlots - totalTourists

      // Update tourPackage.bookings
      await TourPackage.findByIdAndUpdate(
        tourPackageId,
        {
          $push: {
            'bookings.bookingId': newBookingWithGuests._id
          },
          $set: { availableSlots: slotsLeft }
        },
        { new: true });

      // Update user.bookings
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            bookings: {
              bookingId: newBookingWithGuests._id,
              destination: newBookingWithGuests.destination,
              pax: newBookingWithGuests.pax,
              travelPlan: newBookingWithGuests.travelPlan,
              buddies: newBookingWithGuests.buddies,
              tourPrice: newBookingWithGuests.tourPrice,
              totalPrice: newBookingWithGuests.totalPrice,
              paymentMethod: newBookingWithGuests.paymentMethod,
              tourStarts: newBookingWithGuests.tourStarts,
              tourEnds: newBookingWithGuests.tourEnds
            }
          }
        },
        { new: true }
      );
      
   
      // Updated Booking Data
      newAvailableSlots = availableSlots - pax

      // Update available slots
      await TourPackage.findByIdAndUpdate(
        tourPackageId,
        {
          $set: { availableSlots: newAvailableSlots }
        },
        { new: true });

      if (newAvailableSlots === 0) {
        // Update tourPackage Active Status
        await TourPackage.findByIdAndUpdate(
          tourPackageId,
          {$set: {'isActive': false}},
          { new: true });
      }

      // Send Notification
      const date = dateFormat(tourStarts, tourEnds);
      let notification;
      if (pax > 1) {
        notification = {
            title: 'Booking With Guests',
            content: {
                message: `Congratulations, @${user.username}, you have just successfully booked a tour to ${destination}!`,
                booking: {
                  destination,
                  packageDuration,
                  date,
                  travelPlan,
                  pax,
                  buddies,
                  tourPrice,
                  totalPrice,
                  paymentMethod
                }
            }
        }
      } else {
        notification = {
            title: 'Booking With Guests',
            content: {
                message: `Congratulations, @${user.username}, you have just successfully booked a tour to ${destination}!`,
                booking: {
                  destination,
                  packageDuration,
                  date,
                  travelPlan,
                  pax,
                  tourPrice,
                  totalPrice,
                  paymentMethod
                }
            }
        }
      }
      await sendNotification(userId, notification);

      res.status(201).json({
        username: user.username,
        remarks: `${pax} pax has been added.`,
        destination: destination,
        'slots': newAvailableSlots,
      });
      
      
    } catch (err) {
      res.status(400).json({
        error: `There seems to be a problem. 😥`,
        line2: `Please try again later.`,
        message: err.message,
        location: err.stack
      });
    }
};
  
// [WITH-FRIENDS]
// Got to Page
const bookingWithFriends_get = async (req, res) => {


  try {
      
    let allTourPackages = await TourPackage.find({});
    res.status(200).json(allTourPackages)

  } catch (err) {
    res.status(400).json({
      message: 'There seems to be a problem retrieving all Tour Packages at the moment. Please try again later.',
      error: err.message
    });
  }
};
// Create Booking
const bookingWithFriends_post = async (req, res) => {
    try{
        // [CREATE CUSTOM TRAVEL PACKAGE]
        // Get userId
        const userId = await getUser(req.headers.authorization).id;

        // Get userData
        const {
          username,
          firstName,
          lastName
        } = await User.findById(userId); 

        // Request Body
        const {
            destination,
            packageDuration,
            tourStarts,
            buddies,
            paymentMethod
        } = req.body;

        // Get tourPackageId for chosen destination and packageDuration
        let tourPackageId = await TourPackage.findOne({destination, packageDuration})

        // If tourPackageId does not exist
        if (tourPackageId === null) {
          throw Error('Sorry, but the Tour Package that you are trying to book is not available.')
        }
        // Assign queried tourPackageId
        tourPackageId = tourPackageId._id;

        // Get basePrice, itinerary, inclusions, exclusions
        const tourPackageData = await TourPackage.findById(tourPackageId)
        const { basePrice, itinerary, inclusions, exclusions } = tourPackageData;

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

        // Create new custom tourPackage
        let newCustomTourPackage = await TourPackage.create({
            destination, packageDuration, tourStarts, tourEnds,
            basePrice, itinerary, inclusions, exclusions, availableSlots: (30 - (buddies.length + 1))
        })

        // new tourPackageId from Custom tourPackage
        tourPackageId = newCustomTourPackage._id;

        // Update tourPackage.travelPlan
        newCustomTourPackage = await TourPackage.findByIdAndUpdate(
          tourPackageId,
          {
            $set: {
              travelPlan: 'with-friends',
              isActive: false
            }
          },
          { new: true }
        );

        const travelPlan = newCustomTourPackage.travelPlan;

        // [CREATE BOOKING]
        // Get pax
        const pax = buddies.length + 1;
        
        // Get tourPrice  
        let tourPrice = calculateWithFriends(pax, basePrice, packageDuration);
        
        // Get totalPrice  
        const totalPrice = tourPrice * pax;
        
        // Create New Booking  
        let newBookingWithFriends;
        if (pax <= 1) {
          throw Error('You need to book at least 2pax in this Tour Plan')
        } else if (pax > 30) {
          throw Error(`Sorry, but we can only accommodate a maximum of 30pax and your total pax is ${pax}.`)
        } else {
          newBookingWithFriends = await Booking.create({
            userId,
            tourPackageId,
            username,
            firstName,
            lastName,
            destination,
            travelPlan,
            buddies,
            pax,
            tourPrice,
            totalPrice,
            paymentMethod,
            tourStarts,
            tourEnds
          });
        }

        // Update tourPackage.bookings
        newCustomTourPackage = await TourPackage.findByIdAndUpdate(
          tourPackageId,
          {$push: {'bookings.bookingId': newBookingWithFriends._id}},
          { new: true });

        // Update user.bookings
        const user = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              bookings: {
                bookingId: newBookingWithFriends._id,
                destination: newBookingWithFriends.destination,
                travelPlan: newBookingWithFriends.travelPlan,
                pax: newBookingWithFriends.pax,
                buddies: newBookingWithFriends.buddies,
                tourPrice: newBookingWithFriends.tourPrice,
                totalPrice: newBookingWithFriends.totalPrice,
                paymentMethod: newBookingWithFriends.paymentMethod,
                tourStarts: newBookingWithFriends.tourStarts,
                tourEnds: newBookingWithFriends.tourEnds
              }
            }
          },
          { new: true }
        );

        // Send Notification
        const date = dateFormat(tourStarts, tourEnds);
        let notification = {
            title: 'Booking With Friends',
            content: {
                message: `Congratulations, @${user.username}, you have just successfully booked a tour to ${destination}!`,
                booking: {
                  destination,
                  packageDuration,
                  date,
                  travelPlan,
                  pax,
                  buddies,
                  tourPrice,
                  totalPrice,
                  paymentMethod
                }
            }
        }
        await sendNotification(userId, notification);

        res.status(201).json({
          username: user.username,
          remarks: `${pax} pax has been booked.`,
          destination: destination
        });

    } catch (err) {
      res.status(400).json({
        error: 'There seems to be a problem booking a tour. Please try again later.',
        message: err.message
      });
    }
};

// [SOLO]
// Got to Page
const bookingSolo_get = async (req, res) => {
    try {
      
      let allTourPackages = await TourPackage.find({});
      res.status(200).json(allTourPackages)

  } catch (err) {
      res.status(400).json({
        message: 'There seems to be a problem retrieving all Tour Packages at the moment. Please try again later.',
        error: err.message
      });
  }
};
// Create Booking
const bookingSolo_post = async (req, res) => {
    try {
      // [CREATE CUSTOM TRAVEL PACKAGE]
      // Get userId
      const userId = await getUser(req.headers.authorization).id;

      // Get userData
      const {
        username,
        firstName,
        lastName
      } = await User.findById(userId); 

      // Request Body
      const {
          destination,
          packageDuration,
          tourStarts,
          paymentMethod
      } = req.body;

      // Get tourPackageId for chosen destination and packageDuration
      let tourPackageId = await TourPackage.findOne({destination, packageDuration})

      // If tourPackageId does not exist
      if (tourPackageId === null) {
        throw Error('Sorry, but the Tour Package that you are trying to book is not available.')
      }
      // Assign tourPackageId
      tourPackageId = tourPackageId._id;

      // Get basePrice, itinerary, inclusions, exclusions
      let tourPackageData = await TourPackage.findById(tourPackageId)
      const {basePrice, itinerary, inclusions, exclusions} = tourPackageData;

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

      // Create new custom tourPackage
      let newCustomTourPackage = await TourPackage.create({
          destination, packageDuration, tourStarts, tourEnds,
          basePrice, itinerary, inclusions, exclusions, availableSlots: 0
      })

      // new tourPackageId from Custom tourPackage
      tourPackageId = newCustomTourPackage._id;
      
      // Update tourPackage.travelPlan
      newCustomTourPackage = await TourPackage.findByIdAndUpdate(
        tourPackageId,
        {
          $set: {
            travelPlan: 'solo',
            isActive: false
          } 
        },
        { new: true }
      );

      const travelPlan = newCustomTourPackage.travelPlan;

      // [CREATE BOOKING]
      // Get pax
      const pax = 1;
      
      // Get tourPrice and totalPrice  
      let tourPrice, totalPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.3);
      
      // Create New Booking  
      const newBookingSolo = await Booking.create({
        userId,
        tourPackageId,
        username,
        firstName,
        lastName,
        destination,
        travelPlan,
        pax,
        tourPrice,
        totalPrice,
        paymentMethod,
        tourStarts,
        tourEnds
      });

      // Update tourPackage.bookings
      newCustomTourPackage = await TourPackage.findByIdAndUpdate(
        tourPackageId,
        {$push: {'bookings.bookingId': newBookingSolo._id}},
        { new: true });

      // Update user.bookings
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            bookings: {
              bookingId: newBookingSolo._id,
              destination: newBookingSolo.destination,
              travelPlan: newBookingSolo.travelPlan,
              pax: newBookingSolo.pax,
              buddies: newBookingSolo.buddies,
              tourPrice: newBookingSolo.tourPrice,
              totalPrice: newBookingSolo.totalPrice,
              paymentMethod: newBookingSolo.paymentMethod,
              tourStarts: newBookingSolo.tourStarts,
              tourEnds: newBookingSolo.tourEnds
            }
          }
        },
        { new: true }
      );

      // Send Notification
      const date = dateFormat(tourStarts, tourEnds);
      let notification = {
          title: 'Booking Solo',
          content: {
              message: `Congratulations, @${user.username}, you have just successfully booked a tour to ${destination}!`,
              booking: {
                destination,
                packageDuration,
                date,
                travelPlan,
                pax,
                tourPrice,
                totalPrice,
                paymentMethod
              }
          }
      }
      await sendNotification(userId, notification);

      res.status(201).json({
        username: user.username,
        destination: destination
      });
      
    } catch (err) {
      res.status(400).json({
        error: 'There seems to be a problem booking a tour. Please try again later.',
        message: err.message
      });
    }
};

// [RETRIEVE BOOKINGS]
// View User's Bookings
const userBookings_get = async (req, res) => {
  try {
    // Get userId
    const userId = await getUser(req.headers.authorization).id;
    const user = await User.findById(userId);

    // Update the isCompleted field based on tourEnds date
    for (const booking of user.bookings) {
      try {
        if (booking.tourEnds <= new Date() && booking.isCompleted === false) {
          booking.isCompleted = true;
          await user.save();

          // Also update the Bookings Collection
          await Booking.findByIdAndUpdate(booking.bookingId, { isCompleted: true });

          // Send Notification
          const notification = {
            title: 'Completed Tour',
            content: {
                message: `@${user.username}, you just finished a tour in ${noUserExperience[0].destination}! Kindly go to the Tours History and share your experience.`
            } 
          }
          
          await sendNotification(userId, notification);
          
        }
      } catch (err) {
        return res.status(400).json({
          message: 'There seems to be a problem updating the Bookings Collection. Please try again later.',
          error: err
        });
      }
    }

    // Filter out completed Tours
    const upcomingTours = user.bookings
      .filter((booking) => !booking.isCompleted)
      .sort((a, b) => new Date(a.tourStarts) - new Date(b.tourStarts));

    if (upcomingTours.length === 0) {
      return res.status(200).json({
        message: 'It seems that you do not have any upcoming tours yet. Book a tour now!',
      });
    }

    // Get Days Left before the Tour Starts
    const today = new Date();
    const daysLeftArray = upcomingTours.map((booking) => {
      const tourStarts = new Date(booking.tourEnds);
      const timeDiff = tourStarts.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return daysLeft;
    });

    res.status(200).json({
      daysLeft: daysLeftArray[0],
      tours: upcomingTours,
    });
  } catch (err) {
    res.status(400).json({
      message: 'There seems to be a problem retrieving your bookings at the moment. Please try again later.',
      error: err,

    });
  }
};
// View User's Tours History
const toursHistory_get = async (req, res) => {
  try {
    // Get userId
    const userId = await getUser(req.headers.authorization).id;
    const user = await User.findById(userId);

    // Filter in completed tours only
    const completedTours = user.bookings
    .filter(booking => booking.isCompleted)
    .sort((a, b) => new Date(a.tourStarts) - new Date(b.tourStarts));

    // Get bookingIds
    const bookingIds = await completedTours.map(tours => tours.bookingId);
    // Query Bookings
    const bookings = await Booking.find({_id: {$in: bookingIds}});
    // Get tourPackageIds
    const tourPackageIds = await bookings.map(booking => booking.tourPackageId);
    // Query tourPackages
    const tourPackages = await TourPackage.find({_id: {$in: tourPackageIds}});
    // Organize toursHistory Data
    const toursHistory = [];

    for (const tourPackage of tourPackages) {
      const { _id, destination, tourStarts, tourEnds, packageDuration, travelPlan } = tourPackage;

      const date = dateFormat(tourStarts, tourEnds);

      const toursHistoryData = {
        _id,
        destination,
        date,
        packageDuration,
        travelPlan
      };

      toursHistory.push(toursHistoryData);
    };

    // Check if eligible to add experience...
        // Get userXpIds
        const userXpIds = user.experiences.experienceId
        
        // Get tourPackages with no user experiences added
        let noUserExperience = tourPackages.filter(package => {
          return !package.experiences.experienceId.some(id => userXpIds.includes(id));
        });

    if (toursHistory.length === 0) {
      res.status(200).json({
        message: 'It looks empty at the moment. All your completed tours will be shown here.'
      })
    } else if (noUserExperience.length > 0) {

        res.status(200).json({
        details: toursHistory,
        addExperience: `You just finished a new tour in ${noUserExperience[0].destination}!`,
        noUserExperience: noUserExperience
      });
    } else {
      res.status(200).json({
        details: toursHistory
      });
    }


  } catch (err) {
    res.status(400).json({
      message: 'It seems like there is a problem retrieving your tours history. Please try again later.',
      error: err.message,
      location: err.stack
    })
  }
};
// All Upcoming Bookings
const allBookings_get = async (req, res) => {
    try {
      // RequestBody
      const requestBody = req.body;
      const bookings = await Booking.find(requestBody);

      for (const booking of bookings) {
        if (booking.tourEnds <= new Date() && booking.isCompleted === false) {
          booking.isCompleted = true;
          await booking.save();
        }
      }

      // Filter out completed Tours
      const upcomingTours = bookings
        .filter(booking => !booking.isCompleted)
        .sort((a, b) => new Date(a.tourStarts) - new Date(b.tourStarts));

      if (bookings.length === 0) {
          res.status(200).json({
            error: 'It looks like no user has booked any tours yet at the moment.'
          });
      } else {
          // Query Tour Packages Assigned to each booking
          const tourPackagesId = upcomingTours.map(booking => booking.tourPackageId)
          const tourPackages = await TourPackage.find(
                  {_id: {$in: tourPackagesId}},
                  {_id:1, destination:1, packageDuration:1, travelPlan:1, tourStarts:1, tourEnds:1}
                );
          if (tourPackages.length === 0) {
            res.status(200).json({
              error: 'It appears that there are no upcoming bookings yet at the moment.'
            });
          } else {
            res.status(200).json(tourPackages);
          }
      }
    } catch (err) {
      res.status(400).json({
        error: 'It seems like we are having a problem retrieving all bookings at the moment. Please try again later'
      })
    }
};
// All Completed Bookings
const allCompletedBookings_get = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    for (const booking of bookings) {
      if (booking.tourEnds <= new Date()) {
        booking.isCompleted = true;
        await booking.save();
      }
    }

    // Filter out upcoming Tours
    const completedTours = bookings
      .filter(booking => booking.isCompleted)
      .sort((a, b) => new Date(a.tourStarts) - new Date(b.tourStarts));

    if (bookings.length === 0) {
        res.status(200).json({
          message: 'It looks like there are no completed tours yet.'
        });
    } else {
        // Query Tour Packages Assigned to each booking
        const tourPackagesId = completedTours.map(booking => booking.tourPackageId)
        const tourPackages = await TourPackage.find(
                {_id: {$in: tourPackagesId}},
                {_id:1, packageDuration:1, travelPlan:1, tourStarts:1, tourEnds:1}
              );
        if (tourPackages.length === 0) {
          res.status(200).json({
            message: 'It appears that there are no completed tours yet at the moment.'
          });
        } else {
          res.status(200).json(tourPackages);
        }
    }
  } catch (err) {
    res.status(400).json({
      message: 'It seems like we are having a problem retrieving all completed tours at the moment. Please try again later.',
      error: err.message
    })
  }
};
// Specific Booking
const specificBooking_get = async (req, res) => {
    try {
      // Query selected tour package
      const tourPackage = await TourPackage.findById(req.params.id);
      // Get booking IDs
      let bookingIds = tourPackage.bookings.bookingId
      // Query username, firstName, lastName, and buddies
      const bookings = await Booking.find({_id: {$in: bookingIds}}, {
        _id:0,
        username: 1,
        firstName: 1,
        lastName: 1,
        "buddies.fullName": 1 
      });

      // Separate Users Data
      const usernames = bookings.map(booking => booking.username);
      const firstNames = bookings.map(booking => booking.firstName);
      const lastNames = bookings.map(booking => booking.lastName);

      // Get buddies fullNames
      const userBuddies = bookings.map(booking => {
        const { buddies } = booking;
        const fullNameArray = buddies.map(buddy => buddy.fullName);
        return { buddies: fullNameArray };
      });

      // Concatinate Tourists Data
      let tourists = [];
      for (let i = 0; i < usernames.length; i++) {
        if (userBuddies[i].buddies.length === 0) {
          tourists.push({
            'username': `@${[usernames[i]]}`,
            'fullname': `${[firstNames[i]]} ${[lastNames[i]]}`
          });
        } else {
          tourists.push({
            'username': `@${[usernames[i]]}`,
            'fullname': `${[firstNames[i]]} ${[lastNames[i]]}`,
             'buddies': userBuddies[i].buddies
          });
        }
      }

      res.status(200).json(tourists)

      // const tourists
    } catch (err) {
        res.status(400).json({
          message: 'It seems like there is a problem retrieving the booking data. Please try again later.',
          error: err.message
        })
    };
};


// Module Exports
module.exports = {
    bookingWithGuests_get,
    bookingWithGuests_post,
    bookingWithFriends_get,
    bookingWithFriends_post,
    bookingSolo_get,
    bookingSolo_post,
    userBookings_get,
    toursHistory_get,
    allBookings_get,
    allCompletedBookings_get,
    specificBooking_get
};