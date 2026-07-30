const router = require('express').Router();

const QuestionController = require('../../controllers/questionController');
//const { validateInput, INPUT_TYPES, VALIDATORS } = require('../../lib/validateInput');

//-----------------------------------------------------------------------------

router.get('/', QuestionController.getAll);
router.get('/subject/:id', QuestionController.getSubject);
router.get('/random/', QuestionController.getRandom);
router.get('/random/subject/:id', QuestionController.getRandomSubject);
router.get('/random/category/:id', QuestionController.getRandomCategory);

router.get('/random/:limit', QuestionController.getRandom);
router.get('/random/subject/:id/:limit', QuestionController.getRandomSubject);
router.get('/random/category/:id/:limit', QuestionController.getRandomCategory);

module.exports = router;