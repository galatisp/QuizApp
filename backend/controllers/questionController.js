//const { UserIDError } = require('../errors/authErrors');
const QuestionService = require('../services/questionService');

const QuestionController = {};

QuestionController.getAll = async function (req, res) {
	
    const questions = await QuestionService.getAll();
    const result = {
        questions: []
    };
    for (let question of questions){
        console.log(question.dataValues);
        
        const q = {
            questionText: question.dataValues.title,
            subjectId: question.dataValues.subjectId,
            subjectName: question.dataValues.subjectName,
            options:[
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
            ]
        };
        q.options[question.dataValues.correctAnswer-1].correct = true;
        q.explanation = "";
        result.questions.push(q);
    }
    //console.log(result.questions[0]);
    //console.log(result);
    res.status(200).send(result);
};

QuestionController.getRandom = async function (req, res) {

   
	
    const questions = await QuestionService.getRandom(parseInt(req.params.limit,10));
    const result = {
        questions: []
    };
     console.log("Data Values ", questions[0].dataValues);
    for (let question of questions){
       
        const q = {
            questionText: question.dataValues.title,
            //subjectName: question.dataValues.subject.name,
            subjectId: question.dataValues.subjectId,
            subjectName: question.dataValues.subjectName,
            options:[
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
            ]
        };
        q.options[question.dataValues.correctAnswer-1].correct = true;
        q.explanation = "";
        result.questions.push(q);
    }
    //console.log(result.questions[0]);
    //console.log(result);
    res.status(200).send(result);
};

QuestionController.getSubject = async function (req,res) {
    const questions = await QuestionService.getSubject(req.params.id);
    const result = {
        questions: []
    };
    for (let question of questions){
        //console.log(question.dataValues);
        const q = {
            questionText: question.dataValues.title,
            subjectId: question.dataValues.subjectId,
            options:[
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
            ]
        };
        q.options[question.dataValues.correctAnswer-1].correct = true;
        q.explanation = "";
        result.questions.push(q);
    }
    //console.log(result.questions[0]);
    //console.log(result);
    res.status(200).send(result);
};


QuestionController.getRandomSubject = async function (req,res) {
    const questions = await QuestionService.getRandomSubject(req.params.id, parseInt(req.params.limit,10));
    const result = {
        questions: []
    };
    for (let question of questions){
        console.log(question.dataValues);
        const q = {
            questionText: question.dataValues.title,
            subjectId: question.dataValues.subjectId,
            options:[
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
            ]
        };
        q.options[question.dataValues.correctAnswer-1].correct = true;
        q.explanation = "";
        result.questions.push(q);
    }
    //console.log(result.questions[0]);
    //console.log(result);
    res.status(200).send(result);
};

QuestionController.getRandomCategory = async function (req,res) {
    const questions = await QuestionService.getRandomCategory(req.params.id, parseInt(req.params.limit,10));
    const result = {
        questions: []
    };
    for (let question of questions){
        
        const q = {
            questionText: question.dataValues.title,
            subject: name,
            subjectId: question.dataValues.subjectId,
            options:[
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
            ]
        };
        q.options[question.dataValues.correctAnswer-1].correct = true;
        q.explanation = "";
        result.questions.push(q);
    }
    //console.log(result.questions[0]);
    //console.log(result);
    res.status(200).send(result);
};




module.exports = QuestionController;