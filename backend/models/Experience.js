const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({

    userId : {
        type : String
    },
    tourPackageId : {
        type : String
    },
    message : {
        type : String,
        required : [true, 'Please share your experience.'],
        maxLength : [500, 'Please write only a maximum of 500 characters.']
    },
    rating : {
        type : String,
        enum : ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        required : [true, 'Please rate your experience.']
    }
});


// Module Export
module.exports = mongoose.model('Experience', experienceSchema);