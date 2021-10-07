const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);  // localhost:3000
router.route('/about').get(pageController.getAboutPage);
router.route('/trainers').get(pageController.getTrainersPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/gallery').get(pageController.getGalleryPage);

module.exports = router;
