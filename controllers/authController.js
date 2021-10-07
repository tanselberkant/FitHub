const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);    
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
  }
};
