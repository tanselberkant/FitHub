const router = require('express').Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController')
const User = require('../models/User');

// localhost:3000/users/

router.route('/signup').post([
    body('name').not().isEmpty().withMessage('Please Enter Your FullName'),
    body('password').not().isEmpty().withMessage('Please Enter A Password'),
    body('email').isEmail().withMessage('Please Enter Valid Email')
    .custom((userEmail) => {
        return User.findOne({email: userEmail}).then(user => {
            if(user) {
                return Promise.reject('Email is already exists!');
            }
        })
    })
], authController.createUser);


module.exports = router;