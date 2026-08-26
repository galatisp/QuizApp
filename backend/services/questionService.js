const { Question } = require('../models');
const { Subject } = require('../models');
const database = require('../database');
const sequelize = database.sequelize;
const { col } = require('sequelize');

const QuestionService = {};

const all_attributes = [
    'number',
    'title',
    'answer1',
    'answer2',
    'answer3',
    'answer4',
    'correctAnswer',
    [col('subject.name'), 'subjectName']
];

const subject_includes = [
    {
        model: Subject,
        as: 'subject',
        attributes: []
    }
];



QuestionService.create = async (row, res, categoryId, subjectId) => {


    const newQuestion = {
        "categoryId": categoryId,
        "subjectId": subjectId,
        "number": row[0],
        "title": row[1],
        "answer1": row[2],
        "answer2": row[3],
        "answer3": row[4],
        "answer4": row[5],
        "correctAnswer": row[6]
    };


    const question = await Question.findOne({ where: { number: row[0] } });
    if (question === null) {

        const question = Question.create(newQuestion);
    } else {
        console.log("Question updated in Database");
        await question.update(newQuestion);
        await question.save();
    }

    // save account
    // await question.save();


};


QuestionService.getAll = async () => {
    // return await Question.findAll({ include: ["subject"] });

    const questions = await Question.findAll({
        attributes: all_attributes,
        include: subject_includes
    });


    return questions;
};

QuestionService.getRandom = async (myLimit) => {
    // return await Question.findAll({
    //     order: sequelize.random(),
    //     limit: myLimit || 10
    // }, { include: ["subject"] });

    const questions = await Question.findAll(
        {
            order: sequelize.random(),
            limit: myLimit || 10,

            attributes: all_attributes,
            include: subject_includes
        });


    return questions;
};

QuestionService.getSubject = async (subjectId) => {
    return await Question.findAll({
        where: {
            subjectId
        },
        attributes: all_attributes,
        include: subject_includes
    });
};

QuestionService.getRandomSubject = async (subjectId, myLimit) => {
    return await Question.findAll({
        where: {
            subjectId
        },
        order: sequelize.random(),
        limit: myLimit || 10,
        attributes: all_attributes,
        include: subject_includes
    });
};

QuestionService.getRandomCategory = async (categoryId, myLimit) => {
    return await Question.findAll({
        where: {
            categoryId
        },
        order: sequelize.random(),
        limit: myLimit || 10,
        attributes: all_attributes,
        include: subject_includes
    });
};


module.exports = QuestionService;