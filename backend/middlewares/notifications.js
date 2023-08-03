const User = require('../models/User');
const { getUser } = require('../middlewares/auth');
const { handleErrs } = require('./handleErrs');


// Retrieve All notifications
const notifications_get = async (req, res) => {
    try {
        // Get userId
        const userId = await getUser(req.headers.authorization).id;

        // Query User
        const user = await User.findById(userId);

        // Extract notifications content
        const id = user.notifications.map(notification => notification._id);
        const title = user.notifications.map(notification => notification.title);
        const date = user.notifications.map(notification => notification.date);
        const isRead = user.notifications.map(notification => notification.isRead);

        // Organize Notification
        let notifications = [];
        for (let i = 0; i < id.length; i++) {
            notifications.push({
                "title": title[i],
                "date": date[i],
                "isRead": isRead[i],
                "id": id[i]
            });
        };

        const latestNotifs = notifications.sort((a, b) =>  new Date(b.date) - new Date(a.date));

        if (latestNotifs.length === 0) {
            res.status(200).json({
                message: 'It appears that there are no notifications at the moment.'
            });
        } else {
            res.status(200).json(latestNotifs);
        }

    } catch (err) {
        res.status(400).json({
            message: 'There seems to be a problem retrieving your notifications at the moment. Try again later.',
            error: err.message
        });
    } 
};

// Retrieve Specific notification
const specificNotification_get = async (req, res) => {
    try {
        // Get userId
        const userId = await getUser(req.headers.authorization).id;
        // Query User
        const user = await User.findById(userId);
        // Filter specific notification
        const notification = user.notifications
            .filter((notification) => {
                return notification._id.toString() === req.params.id
            })
        
        // Extract the content only
        const content = notification.map(notif => notif.content);

        // Update the isRead value of the notification
        await User.findByIdAndUpdate(
            userId,
            { $set: { 'notifications.$[i].isRead': true } },
            {
              arrayFilters: [{ 'i._id': req.params.id }]
            }
          );
        
        res.status(200).json(content);
    } catch (err) {
        const NotifErrs = handleErrs(err);
        res.status(400).json({
            message: 'There seems to be a problem reading your notification. Please try again later.',
            error: NotifErrs
        });
    }
};

// Mark notifications as read
const markRead_patch = async (req, res) => {
    try {
        // Request Body
        const { selection } = req.body;
        // Get userId
        const userId = await getUser(req.headers.authorization).id;

        // Update the isRead value of the notification
        if (selection === undefined) {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[].isRead': true } }
            );
        } else if (selection.length > 0) {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[i].isRead': true } },
                {
                    arrayFilters: [{ 'i._id': { $in: selection } }]
                }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[].isRead': true } }
            );
        }

        // Extract notifications content
        const user = await User.findById(userId);
        const id = user.notifications.map(notification => notification._id);
        const title = user.notifications.map(notification => notification.title);
        const date = user.notifications.map(notification => notification.date);
        const isRead = user.notifications.map(notification => notification.isRead);

        // Organize Notification
        let notifications = [];
        for (let i = 0; i < id.length; i++) {
            notifications.push({
                "title": title[i],
                "date": date[i],
                "isRead": isRead[i],
                "id": id[i]
            });
        };

        const latestNotifs = notifications.sort((a, b) =>  new Date(b.date) - new Date(a.date));

        res.status(200).json(latestNotifs);

    } catch (err) {
        const NotifErrs = handleErrs(err);
        res.status(400).json({
            message: 'There seems to be an error. Please try again later',
            error: NotifErrs
        });
    }
};

// Mark notifications as unread
const markUnread_patch = async (req, res) => {
    try {
        // Request Body
        const { selection } = req.body;
        // Get userId
        const userId = await getUser(req.headers.authorization).id;

        // Update the isRead value of the notification
        if (selection === undefined) {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[].isRead': false } }
            );
        } else if (selection.length > 0) {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[i].isRead': false } },
                {
                    arrayFilters: [{ 'i._id': { $in: selection } }]
                }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                { $set: { 'notifications.$[].isRead': false } }
            );
        }
        

        // Extract notifications content
        const user = await User.findById(userId);
        const id = user.notifications.map(notification => notification._id);
        const title = user.notifications.map(notification => notification.title);
        const date = user.notifications.map(notification => notification.date);
        const isRead = user.notifications.map(notification => notification.isRead);

        // Organize Notification
        let notifications = [];
        for (let i = 0; i < id.length; i++) {
            notifications.push({
                "title": title[i],
                "date": date[i],
                "isRead": isRead[i],
                "id": id[i]
            });
        };

        const latestNotifs = notifications.sort((a, b) =>  new Date(b.date) - new Date(a.date));

        res.status(200).json(latestNotifs);

    } catch (err) {
        const NotifErrs = handleErrs(err);
        res.status(400).json({
            message: 'There seems to be an error. Please try again later',
            error: NotifErrs
        });
    }
};

// Send Notification
const sendNotification = async (id, content) => {
    await User.findByIdAndUpdate(
        id,
        { $push: {notifications: content} }
    );
}

// Module Exports
module.exports = {
    notifications_get,
    markRead_patch,
    markUnread_patch,
    specificNotification_get,
    sendNotification
};