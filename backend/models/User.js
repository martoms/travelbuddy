const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({

    // Personal Info: upon signup
    firstName : {
		type : String,
		required : [true, 'Please fill in with your First Name']
	},
	lastName : {
		type : String,
		required : [true, 'Please fill in with your Last Name.']
	},
    username : {
        type : String,
		required : [true, 'Please fill in with your username.'],
        maxLength : [10, 'The maximum number of characters is 10.'],
        unique : true,
        lowercase : true
    },
	email : {
		type : String,
		required : [true, 'Please fill in with your Email.'],
        unique : true,
        lowercase : true,
        validate : [isEmail, 'Please fill in with a valid email.']
	},
	password : {
		type : String,
		required : [true, 'Please fill in with your Password.']
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	contactNo : {
		type : String, 
		required : [true, 'Please fill in with your mobile number.']
	},
    sex: {
        type : String,
        enum : ['Male', 'Female'],
        required : [true, 'Please fill in with your sex.']
    },
    birthday : {
        type : Date,
        required : [true, 'Please fill in with your birthday.']
    },
    address : {
        region : {
            type : String,
            required : [true, 'Please fill in with your region.']
        },
        province : {
            type : String,
            required : [true, 'Please fill in with your province']
        },
        city : {
            type : String,
            required : [true, 'Please fill in with your city/municipality']
        },
        barangay : {
            type : String,
            required : [true, 'Please fill in with your barangay.']
        }
    },
    signUpDate : {
        type : Date,
        default : Date.now
    },
    // Bookings Info: when user creates a booking
    bookings : [
        {
            bookingId : {
                type : String,
            },
            destination : {
                type : String
            },
            travelPlan : {
                type : String
            },
            pax : {
                type : Number
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
                        type : String,
                        enum : ['Male', 'Female']
                    }
                }
            ],
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
        }
    ],
    // Tours History Info: when a user completes a tour
    toursHistory : {
        count : {
            type : Number,
            default : 0
        },
        tours : [
            {
                bookingId : {
                    type : String
                }
            }
        ]
    },
    // Experience Info: when a user creates a review of finished tour
    experiences : {
        experienceId : {
            type : Array
        }
    },
    // Notifications
    notifications : [
        {
            title : {
                type : String
            },
            content : {
                type : Object
            },
            date : {
                type : Date,
                default : Date.now
            },
            isRead : {
                type : Boolean,
                default : false
            }
        }
    ]
})


// Module Export
module.exports = mongoose.model('User', userSchema);