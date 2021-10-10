const router = require('express').Router();
const programController = require('../controllers/programController');

router.route('/').post(programController.createProgram);

module.exports = router;
