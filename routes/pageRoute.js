const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);  // localhost:3000
router.route('/about').get(pageController.getAboutPage);
router.route('/trainers').get(pageController.getTrainersPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEMail);
router.route('/gallery').get(pageController.getGalleryPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);

module.exports = router;
