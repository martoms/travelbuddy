const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const TourPackage = require('../models/TourPackage');

// Go to homepage
const index_get = (req, res) => {
    const aboutTheApp = {
        'e-commerce name': 'TravelBuds',
        creator: 'Marjohn Tomatao',
        description: 'This is a travel and tours e-commerce app, where you can look and book for available tour packages.',
        features: {
            experiences: '("/experiences") This route enables you to retreive all the user experiences from their tours.',
            destinations: '("/destinations") This route enables you to retreive all avalable tour packages. Open for authenticated or non-authenticated users.',
            'specific destination': '("/destinations/:id") This route enables your to view more about a particular tour package retrieved from the previous route. Just place the selected "ObjectID" at the end of the url.',
            signup: '("/signup") Using a GET method: an indication will appear that you are already in the signup page. Using a POST method: you can enter your user details in order to signup. These are the following necessary fields for the request body: {"firstName", "lastName", "username", "email", "password", "confirmPassword", "contactNo", "sex", "birthday", "address":{"region", "province", "city", "barangay"}}',
            login: '("/login") Using a GET method: an indication will appear that you are already in the login page. Using a POST method: you can enter your user credentials. These are the following necessary fields for the request body:{"username", "password"}',
            profile: '("/profile") Using a GET method: an indication will appear that you are already in the profile page. This page is only avaiable to non-admin authenticated users.',
            admin: '("/admin") Using a GET method: an indication will appear that you are already in the admin page. This page is only avaiable to authenticated admin users.',
            notifications: '("/profile/notifications") and ("/admin/notifications") using a GET method: respective users can retrieve all their notifications based on their activities.',
            'specific notification': '("/profile/notifications/:id") and ("/admin/notifications/:id") using a GET method and adding the "ObjectID" of their selected notification retrieved from the previous route: respective users can read the content of their notification.',
            'mark as read': '("/profile/notifications/mark-read") and ("/admin/notifications/mark-read") using a PATCH method: if the request body is left blank, all notifications will be marked as read (isRead: true). The user has the option to add an array of "ObjectID" of their selected notifications. This is the required field in the request body: {"selection": ["..."]}',
            'mark as unread': '("/profile/notifications/mark-unread") and ("/admin/notifications/mark-unread") using a PATCH method: if the request body is left blank, all notifications will be marked as unread (isRead: false). The user has the option to add an array of "ObjectID" of their selected notifications. This is the required field in the request body: {"selection": ["..."]}',
            'change password': '("/profile/change-password") Using a POST method, an authenticated user can change his/her current password. The following fields are required for the request body: {"currentPassword", "newPassword", "confirmNewPassword"}.',
            'create tour package': '("/admin/create") Using the POST method: an authenticated admin can create a new tour package with the following fields for the request body: {"destination", "packageDuration", "tourStarts", "basePrice", "itinerary": [{"day1", "day2", "day3", "day4", "day5"}], "inclusions", "exclusions"}',
            bookings: '("/bookings/with-guests"), ("/bookings/with-friends"), or ("/bookings/solo") These are the three types of travel plans and their bookings. Using a GET method, an indication will tell the authenticated user that they are already at their chosen bookings page.',
            'with-guests': '("/bookings/with-guests/create") Using a POST method, an authenticated user can create a new booking according to this chosen travel plan with the following required fields for the request body: {"tourPackageId", "buddies": [{"fullName", "age", "sex"}], "paymentMethod"}. Here, the objects in the "buddies" field are optional and can be left as an empty array',
            'with-friends': '("/bookings/with-friends/create") Using a POST method, an authenticated user can create a new booking with his/her own custom travel package with the following required fields for the request body: {"destination", "tourStarts", "packageDuration", "buddies": [{"fullName", "age", "sex"}], "paymentMethod"}. Here, the "buddies" field is required',
            'solo': '("/bookings/solo/create") Using a POST method, an authenticated user can create a new booking with his/her own custom travel package with the following required fields for the request body: {"destination", "tourStarts", "packageDuration", "paymentMethod"}.',
            'retrieve bookings': '("/profile/bookings"), ("/admin/bookings") Using a GET method, authenticated users can retrieve all his/her bookings and upcoming tour, while the admin can also retrieve all the bookings made by the users.',
            'tours-history': '("/profile/tours-history") Using a GET method, users can retrieve all their completed tours',
            'share experience': '("/profile/tours-history/share-experience") Using a POST method, if there are already completed tours, a user can add his/her own experience from the tour.',
            'completed-bookings': '("/admin/completed-bookings") Using a GET method, an admin can retrieve all completed tours of the users',
            'tourists': '("/admin/bookings/:id") Using a GET method and placing the "ObjectID" of a selected booking at the end of the url, an admin can view whoever are included in the tour, such as users and their buddies',
            'top-destination': '("/admin/set-top-destination") Using a PATCH method, an admin can set particular destinations as "top-destinations" ("isTopDestination": true). The following are required in the request body: {"destinations":["..."]}',
            'update tour package': '("/admin/:id/update-tour-package") Using a PATCH method, an admin can update any fields in the existing travel package. The "ObjectID" of the tour package to be updated must be inserted in the url as well as include in the request body only whatever the admin wishes to update.',
            archive: '("/admin/:id/archive") Using a PATCH method, an admin can deactivate a particular tour package ("isActive: false"). The "ObjectID" of the tour package to be archived must be inserted in the url.',
            activate: '("/admin/:id/activate") Using a PATCH method, an admin can reactivate a particular tour package ("isActive: true"). The "ObjectID" of the tour package to be reactivated must be inserted in the url.',
            'retrieve all users': '("/admin/all-users") Using a GET method, an admin can retrieve all registered users.',
            'specific user': '("/admin/all-users/:id") Using a GET method, an admin can view the complete details of a selected user by adding the "ObjectID" of the user at the end of the url',
            'make-admin': '("/admin/all-users/:id/make-admin") Using a PATCH method, an admin can promote a regular user to admin by inserting the "ObjectID" of the user in the url',
            'demote-admin': '("/admin/all-users/:id/demote-admin") Using a PATCH method, an admin can demote another admin back to a regular user by inserting the "ObjectID" of the user in the url',
            logout: '("/logout") Using a GET method, all access tokens shall be removed and the user/admin is logged out.',
            'page not found': 'This app also handles invalid routes by providing a 404 page.'
        }
    };

    res.status(200).json({
        message : 'Welcome! You are now in the homepage.',
        'about the app': aboutTheApp
    })
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