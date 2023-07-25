const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    userId : {
        type : String
    },
    username : {
        type : String,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    tourPackageId : {
        type : String
    },
    destination : {
        type : String
    },
    travelPlan : {
        type : String
    },
    buddies : [
        {
            fullName : {
                type : String
            },
            age : {
                type : Number
            },
            sex : {
                type : String
            }
        }
    ],
    pax : {
        type : Number
    },
    tourPrice : {
        type : Number
    },
    totalPrice : {
        type : Number
    },
    paymentMethod : {
        type : String,
        enum : ['Gcash', 'Maya', 'Paypal', 'Mastercard', 'Visa', 'Palawan']
    },
    isPaid : {
        type : Boolean,
        default : true
    },
    bookingDate : {
        type : Date,
        default : Date.now
    },
    tourStarts : {
        type : Date
    },
    tourEnds : {
        type : Date
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
});


// Module Export
module.exports = mongoose.model('Booking', bookingSchema);