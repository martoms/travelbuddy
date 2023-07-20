const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getUserId } = require('../middlewares/auth');
const { handleErrs } = require('../middlewares/handleErrs');
const { maxAge, createAccessToken } = require('../middlewares/createAccessToken');
const { sendNotification } = require('../middlewares/notifications');


// [SIGNUP PAGE STARTS]
// Go to Signup Page
const signup_get = (req, res) => {
    res.json({ message: 'You are now in the signup page.' })
};
// Signup New User
const signup_post = (req, res) => {
    // Request Body
    const {
        firstName, lastName, birthday, sex, contactNo,
        address: {region, province, city, barangay},
        username, email, password
    } = req.body;

    // bcrypt password hashing middleware
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create notification
    let notifications = [
        {
            title: 'New User Registration',
            content: {
                message: `Congratulations @${username}! You have just successfully signed up to TravelBuds, your ultimate travel companion! You may now start booking for tours either "with-guests", "with-friends", or "solo". Just go to the destinations page, choose your destination, and then book your desired tour package. It's that simple. Book now!`
            }
        }
    ]

    // Create new user
    User.create({
        firstName, lastName, birthday, sex, contactNo,
        address: {region, province, city, barangay},
        username, email, password: hashedPassword, notifications
    }).then((user) => {
        
        // Create Access Token
        const token = createAccessToken(user);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({
            message : `Congratulations @${user.username}! You are now officially registered.`,
            access : createAccessToken(user)
        });
        
    }).catch((err) => {
        const validationErrs = handleErrs(err);
        res.status(400).json({
            message : 'Signup Failed!',
            errors : validationErrs
        });
        
    });
};
// [SIGNUP PAGE ENDS]


// [LOGIN PAGE STARTS]
// Go to login page
const login_get = (req, res) => {
    res.json({ message: 'You are now in the login page.' });
};
// New login
const login_post = (req, res) => {

  // Request Body
  const { username, password } = req.body;

  // Check database
  User.findOne({ username })
    .then((user) => {
      if (user) {
        // Compare client password with database hashed password
        return bcrypt.compare(password, user.password)
          .then((auth) => {
            if (auth) {
              // Create access token
              const token = createAccessToken(user);
              res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
              });
              res.status(200).json({
                 mesage : `Login Successful! Welcome back @${user.username}!`,
                 access : createAccessToken(user)
              });
            } else {
              throw Error('Incorrect password.');
            }
          });
      } else {
        throw Error('Incorrect username.');
      }
    })
    .catch(err => {
      const loginErrs = handleErrs(err);
      res.status(400).json({
        message : 'Login failed!',
        errors : loginErrs
      });
    });
};
// [LOGIN PAGE ENDS]


// [USER PROFILE STARTS]
// Go to User Profile
const profile_get = async (req, res) => {
    try {
        // Get userId
        let userId = await getUserId(req.cookies.jwt);
        let user = await User.findById(userId);

        // Check for booking status in the background


        res.json({
            message : `Welcome back @${user.username}!`,
            location : 'User Profile Dashboard',
            'User Details': user
        });
    } catch (err) {
        res.status(400).json({
            message : 'Decoding user failed!',
            errors : err.message
          });
    }
};
// Change Password
const changePassword_post = async (req, res) => {
    // Request Body
    const {
        currentPassword,
        newPassword,
        confirmNewPassword
    } = req.body;

    // Get userId
    const userId = await getUserId(req.cookies.jwt);

    try {
        // Retrieve the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        // Verify the current password
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                error: 'Invalid current password.'
            });
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                error: 'Seems like your new password is not confirmed properly.'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hashSync(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Send Notification
        const notification = {
            title: 'Change Password',
            content: {
                message: `@${user.username}, you have just successfully changed your password!`
            }
        }
        await sendNotification(userId, notification);

        res.status(200).json({
            message: 'Password changed successfully!'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message,
            location: err.stack
        });
    }
};
// [USER PROFILE ENDS]


// [ADMIN DASHBOARD STARTS]
// Go to Admin Dashboard
const admin_get = async (req, res) => {
    try {
        // Get userId
        let userId = await getUserId(req.cookies.jwt);
        let user = await User.findById(userId);

        res.json({
            message : `Welcome back @${user.username}(admin)!`,
            location : 'User Admin Profile Dashboard'
        });
    } catch (err) {
        res.status(400).json({
            message : 'Decoding user failed!',
            errors : err.message
          });
    }
};
// Get All Registered Users
const allUsers_get = (req, res) => {
    User.aggregate([
        {
            $match : {}
        },
        {
            $group : {
                _id : null,
                total : {$sum:1},
                Users : {
                    $push : {
                        _id: "$_id",
                        username : "$username",
                        firstname : "$firstName",
                        lastname : "$lastName",
                        isAdmin : "$isAdmin",
                        signUpDate: "$signUpDate"
                    }
                }
            }
        },
        {
            $project : {
                _id: 0,
                "Total Users": "$total",
                Users: 1
            }
        }
    ]).then((allUsers) => {
        res.status(200).json({
            message: 'All users retreived.',
            result: allUsers
        })
    }).catch((err) => {
        res.status(400).json({
            message: 'It seems like we are having a problem retrieving all users at this moment',
            error: err.message
        })
    })
};
// Get Specific User
const specificUser_get = (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.status(200).json({
            message: "Retrieving user data successful!",
            result: user
        })
    }).catch((err) => {
        res.status(400).json({
            message: "It seems we are having a problem retrieving the user's data at the moment",
            error: err.message
        })
    })
};
// Change Regular User to Admin
const makeAdmin_patch = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {isAdmin: true}},
            {new: true}
        );
        let newAdmin = {
            username: user.username,
            isAdmin: user.isAdmin
        }

        // Send Notification
        const AdminUserId = await getUserId(req.cookies.jwt);
        const admin = await User.findById(AdminUserId);
        // For Admin
        const adminNotification = {
            title: 'Change to Admin',
            content: {
                message: `You have just promoted @${user.username} to admin!`
            }
        }
        // For User
        const userNotification = {
            title: 'Change to Admin',
            content: {
                message: `@${user.username}, you have just been promoted to admin by @${admin.username}!`
            }
        }
        await sendNotification(AdminUserId, adminNotification);
        await sendNotification(user._id, userNotification);

        res.status(200).json({
            message: `Success! @${user.username} is now an Admin!`,
            result: newAdmin
        });

    } catch (err) {
        res.status(400).json({
            message: 'Changing user to admin failed.',
            error: err.message,
            location: err.stack
        })
    }

};
// Demote Admin to Regular User
const demoteAdmin_patch = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {isAdmin: false}},
            {new: true}
        );
        let demotedAdmin = {
            username: user.username,
            isAdmin: user.isAdmin
        }

        // Send Notification
        const AdminUserId = await getUserId(req.cookies.jwt);
        const admin = await User.findById(AdminUserId);
        // For Admin
        const adminNotification = {
            title: 'Demote Admin',
            content: {
                message: `You have just demoted @${user.username} to a regular user!`
            }
        }
        // For User
        const userNotification = {
            title: 'Demote Admin',
            content: {
                message: `@${user.username}, you have just been to a regular user by @${admin.username}!`
            }
        }
        await sendNotification(AdminUserId, adminNotification);
        await sendNotification(user._id, userNotification);

        res.status(200).json({
            message: `Success! @${user.username} is now back to being a regular user!`,
            result: demotedAdmin
        });
    } catch (err) {
        res.status(400).json({
            message: 'Admin demotion failed.',
            error: err.message
        })
    }

};
// [ADMIN DASHBOARD ENDS]


// [LOGOUT]
const logout_get = (req, res) => {
    res.json({
        message : 'You are now logged out!',
        location : 'Redirecting to the homepage...'
    });
};

// Module Exports
module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    profile_get,
    changePassword_post,
    admin_get,
    allUsers_get,
    specificUser_get,
    makeAdmin_patch,
    demoteAdmin_patch,
    logout_get
};