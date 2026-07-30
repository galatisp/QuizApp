const router = require('express').Router();

const SubjectController = require('../../controllers/subjectController');
//const { validateInput, INPUT_TYPES, VALIDATORS } = require('../../lib/validateInput');

//-----------------------------------------------------------------------------

router.get('/', SubjectController.getAll);
router.get('/:id', SubjectController.getSubject);
router.get('/category/:id', SubjectController.getCategorySubjects);

module.exports = router;