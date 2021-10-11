const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Proficiency = require('../models/Proficiency');
const Program = require('../models/Program');

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

exports.loginUser = (req, res) => {
  try {
    const { email, password} = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, success) => {
          if (success) {
            req.session.userID = user._id;
            res.status(200).redirect('/');
          }
          else {
            req.flash('error','Your password is not correct')
            res.status(400).redirect('/login')    
          }
        });
      } else {
        req.flash('error', 'User is Not Exist!')
        res.status(400).redirect('/login')
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logOutUser = (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

exports.getDashboardPage = async (req,res) => {

  try {    
    const user = await User.findOne({_id : req.session.userID}).populate('proficiency').populate('enrolledPrograms');
    const categories = await Category.find();
    const proficiencies = await Proficiency.find();
    const programs = await Program.find({user: req.session.userID}).populate('category');    
    const page = req.query.page || 1;
    const userPerPage = 5;
    const totalUsers = await User.find().countDocuments();

    const users = await User.find().sort('-createdAt').skip((page - 1) * userPerPage).limit(userPerPage)

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      proficiencies,
      programs,
      users,
      current: page,
      pages: Math.ceil(totalUsers / userPerPage)
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.updateUserProfile = async (req,res) => {
  try {    
    const user = await User.findOne({_id: req.params.id})
    user.height = req.body.height
    user.weight = req.body.weight
    user.phone = req.body.phone
    user.healtProblem = req.body.healtProblem
    user.role = req.body.role
    user.proficiency = req.body.proficiency
    user.save();
    req.flash('success','You updated your profile successfully')
    res.status(200).redirect('/users/dashboard')
  } catch (error) {
    req.flash('error','Something went wrong!')
    console.log(error);
  }  
}

exports.deleteUser = async (req,res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    await Program.deleteMany({ user : req.params.id});
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}