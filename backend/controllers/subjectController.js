
const SubjectService = require('../services/subjectService');
const utils = require('./utils');

const SubjectController = {}



SubjectController.getAll = async function (req, res) {
    const subjects = await SubjectService.getAll();
    console.log(subjects);
    utils.parseSubjects(subjects, req, res);
};

SubjectController.getSubject = async function (req, res) {
    const subjects = await SubjectService.getSubject(req.params.id);
    console.log(subjects);
    utils.parseSubjects(subjects, req, res);
};

SubjectController.getCategorySubjects = async function (req, res) {
    const subjects = await SubjectService.getCategorySubjects(req.params.id);
    console.log(subjects);
    utils.parseSubjects(subjects, req, res);
};


module.exports = SubjectController;