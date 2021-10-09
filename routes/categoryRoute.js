const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// localhost:3000/category

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);

module.exports = router;
