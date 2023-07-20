const pageNotFound = (req, res) => {
    res.json({
        message: "Oops! You wandered off too far! Let's go home now."
    })
};

// Module Export
module.exports = { pageNotFound };