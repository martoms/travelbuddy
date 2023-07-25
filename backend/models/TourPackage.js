const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
    destination : {
        type : String,
        required : [true, 'Please enter tour destination.']
    },
    packageDuration : {
        type : String,
        enum : ['3D2N', '4D3N', '5D4N'],
        required : [true, 'Please enter package type.']
    },
    tourStarts : {
        type : Date,
        required : [true, 'Please enter starting date.']
    },
    tourEnds : {
        type : Date
    },
    basePrice : {
        type : Number,
        required : [true, 'Please enter base-price']
    },
    itinerary : [
        {
            day1 : {
                type : String,
                required : [true, 'Please enter itinerary description.']
            },
            day2 : {
                type : String,
                required : [true, 'Please enter itinerary description.']
            },
            day3 : {
                type : String,
                required : [true, 'Please enter itinerary description.']
            },
            day4 : {
                type : String
            },
            day5 : {
                type : String
            }
        }
    ],
    inclusions : {
        type : String,
        required : [true, 'Please enter inclusion items.']
    },
    exclusions : {
        type : String
    },
    isActive : {
        type : Boolean,
        default : true
    },
    travelPlan : {
        type : String,
        default : 'with-guests'
    },
    isTopDestination : {
        type : Boolean,
        default : false
    },
    availableSlots : {
        type : Number,
        default : 15
    },
    bookings : {
        bookingId: {
            type : Array
        }
    },
    experiences : {
        experienceId: {
            type : Array
        }
    }
});


// Module Export
module.exports = mongoose.model("TourPackage", tourPackageSchema);