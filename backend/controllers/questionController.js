//const { UserIDError } = require('../errors/authErrors');
const QuestionService = require('../services/questionService');

const QuestionController = {};

function create_query_response(question) {

    const q = {
        number: question.dataValues.number,
        questionText: question.dataValues.title,
        subjectId: question.dataValues.subjectId,
        subjectName: question.dataValues.subjectName,
        options: [
            {
                text: question.dataValues.answer1
            },
            {
                text: question.dataValues.answer2
            },
            {
                text: question.dataValues.answer3
            },
            {
                text: question.dataValues.answer4
            }
        ],
        
    };
    q.correctAnswer =  q.options[question.dataValues.correctAnswer - 1].text;
    q.options[question.dataValues.correctAnswer - 1].correct = true;
    q.explanation = "";
    return q;
}

QuestionController.getAll = async function (req, res) {

    const questions = await QuestionService.getAll();
    const result = {
        questions: []
    };
    for (let question of questions) {
        const q = create_query_response(question);
        result.questions.push(q);
    }
   
    res.status(200).send(result);
};

QuestionController.getRandom = async function (req, res) {



    const questions = await QuestionService.getRandom(parseInt(req.params.limit, 10));
    const result = {
        questions: []
    };
    
    for (let question of questions) {
        const q = create_query_response(question);
        result.questions.push(q);
    }
   
    res.status(200).send(result);
};

QuestionController.getSubject = async function (req, res) {
    const questions = await QuestionService.getSubject(req.params.id);
    const result = {
        questions: []
    };
    for (let question of questions) {
        const q = create_query_response(question);
        result.questions.push(q);
    }
    
    res.status(200).send(result);
};


QuestionController.getRandomSubject = async function (req, res) {
    const questions = await QuestionService.getRandomSubject(req.params.id, parseInt(req.params.limit, 10));
    const result = {
        questions: []
    };
    for (let question of questions) {
        const q = create_query_response(question);
        result.questions.push(q);
    }
   
    res.status(200).send(result);
};

QuestionController.getRandomCategory = async function (req, res) {
    const questions = await QuestionService.getRandomCategory(req.params.id, parseInt(req.params.limit, 10));
    const result = {
        questions: []
    };
    for (let question of questions) {
        const q = create_query_response(question);
        result.questions.push(q);
    }
    
    res.status(200).send(result);
};




module.exports = QuestionController;