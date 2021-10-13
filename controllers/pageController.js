const logger = require('../logger')
const User = require('../models/User');

exports.getIndexPage = (req, res) => {
  logger.info(req.session.userID);
  res.status(200).render('index', { 
    page_name:'index'
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name:'about'
  });
};

exports.getGalleryPage = (req, res) => {
  res.status(200).render('gallery', {
    page_name:'gallery'
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name:'contact'
  });
};

exports.getServicesPage = (req, res) => {
  res.status(200).render('services', {
    page_name:'services'
  });
};

exports.getTrainersPage = async (req, res) => {
  const trainers = await User.find({role : 'trainer'}).populate('proficiency')

  res.status(200).render('trainer', {
    page_name : 'trainer',
    trainers
  })
};

exports.getLoginPage = (req,res) => {
  res.status(200).render('login');
}

exports.getRegisterPage = (req,res) => {
  res.status(200).render('register');
}
