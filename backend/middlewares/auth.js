const jwt = require('jsonwebtoken');

// Regular Users Profile Verification
const verify = (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization.split(' ')[1]
  if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
          if (err) {
              res.status(403).json({
                  message : 'Authentication failed!',
                  location : 'Redirecting you now to the login page...'
              });
          } else {
              if (decodedToken.data.isAdmin) {
                  res.status(403).json({
                      message : 'It seems that you are an admin!',
                      location : 'Redirecting you now to the admin dashboard...'
                  });
              } else {
                  next();
              }
          }
      });
  } else {
      res.status(403).json({
          message : 'Authentication failed!',
          location : 'Redirecting you now to the login page...'
      });
  }
};

// Admin Dashboard Verification
const verifyAdmin = (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization.split(' ')[1]

  if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
          if (err) {
              console.log(err.message);
              res.status(403).json({
                      message : 'It seems that you are NOT an admin!',
                      location : 'Redirecting you now to the login page...'
                  });
          } else {
              if (decodedToken.data.isAdmin) {
                  next();
              } else {
                  res.status(403).json({
                      message : 'It seems that you are NOT an admin!',
                      location : 'Redirecting you now to the login page...'
                  });
              }
          }
      });
  }
};

// Get userID
const getUserId = (token) => {
  if(token){

		token = token.split(' ')[1];

		return jwt.verify(token, process.env.SECRET, (err, data) => {

			if (err) {

				return null;

			} else {

				return jwt.decode(token, {complete:true}).payload.data.id;
			};

		})

	} else {

		return null;

	};
};


// Admin Privilege Authentication
const adminPrivilege = async (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken.data.isAdmin);
        }
      });
    } else {
      resolve(false);
    }
  });
};

// Get username
const getUsername = async (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken.data.username);
        }
      });
    } else {
      resolve(false);
    }
  });
};
  


// Module Exports
module.exports = {
    verify,
    verifyAdmin,
    getUserId,
    adminPrivilege,
    getUsername
};