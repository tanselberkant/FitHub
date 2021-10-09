const router = require('express').Router();
const profController = require('../controllers/proficiencyController');

//localhost:3000/proficiency

router.route('/').post(profController.createProficiency);
router.route('/:id').delete(profController.deleteProficiency);

module.exports = router;
