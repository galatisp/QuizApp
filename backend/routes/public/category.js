const router = require('express').Router();

const CategoryController = require('../../controllers/categoryController');
//const { validateInput, INPUT_TYPES, VALIDATORS } = require('../../lib/validateInput');

//-----------------------------------------------------------------------------

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getCategory);


module.exports = router;