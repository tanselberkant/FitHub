const router = require('express').Router();
const programController = require('../controllers/programController');

// localhost:3000/programs

router.route('/').post(programController.createProgram);
router.route('/:slug').delete(programController.deleteProgram);
router.route('/').get(programController.getAllPrograms);
router.route('/:slug').get(programController.getProgram);
router.route('/enroll').post(programController.enrollProgram);


module.exports = router;
