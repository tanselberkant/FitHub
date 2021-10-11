const router = require('express').Router();
const programController = require('../controllers/programController');

router.route('/').post(programController.createProgram);
router.route('/:slug').delete(programController.deleteProgram);

module.exports = router;
