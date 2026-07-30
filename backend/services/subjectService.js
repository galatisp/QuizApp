const { Question} = require('../models');
const { Subject} = require('../models');
const database = require('../database');
const sequelize = database.sequelize;

const SubjectService = {};

SubjectService.getAll = async () => {
    return await Subject.findAll();
};


SubjectService.getSubject = async (id) => {
    //return await Subject.findByPk(id, { include: ["questions"]} );
    return await Subject.findByPk(id);
};

SubjectService.getCategorySubjects = async (categoryId) => {
    return await Subject.findAll({
        where:{
            categoryId
        }
    });
};



module.exports = SubjectService;