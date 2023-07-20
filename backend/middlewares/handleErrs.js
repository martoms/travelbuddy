const handleErrs = (err) => {
    let validationErrs = {};

    // incorrect email
    if (err.message.includes('Incorrect username')) {
        validationErrs.username = 'That username is not registered';
    }

    // incorrect password
    if (err.message.includes('Incorrect password')) {
        validationErrs.password = 'That password is incorrect';
    }


    // For Duplicate Errors
    if (err.code === 11000) {
        const keyValue = Object.keys(err.keyValue)[0]; 
        if (keyValue === 'email') {
            validationErrs.email = 'This email has already been registered.';
        };
        if (keyValue === 'username') {
            validationErrs.username = 'This username has already been taken.';
        };
      }
    //   For other validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          validationErrs[properties.path] = properties.message;
        });
      }

    // For notifications
    if (err.message.includes('Cast to ObjectId failed')) {
        validationErrs.selection = 'Invalid ObjectId: Please input the right ObjectId, Okay? Great!'
      };


    return validationErrs;
};

// Module Export
module.exports = { handleErrs };