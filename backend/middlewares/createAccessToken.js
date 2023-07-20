const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createAccessToken = (user) => {
    
    const data = {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
    };
    return jwt.sign({data}, process.env.SECRET, {
        expiresIn: maxAge
    });
};

// Module Exports
module.exports = {
    maxAge,
    createAccessToken
};