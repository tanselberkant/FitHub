// Its my controll middleware that is controlling session for if there is user or not.
// My aim is that if there is no user, it should block router to go in 'dashboard' page

const User = require('../models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    next();
  });
};
