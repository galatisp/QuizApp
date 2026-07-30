const { Question} = require('../models');
const { Category} = require('../models');
const database = require('../database');
const sequelize = database.sequelize;

const CategoryService = {};

CategoryService.getAll = async () => {
    return await Category.findAll();
};


CategoryService.getCategory = async (id) => {
    return await Category.findByPk(id);
};





module.exports = CategoryService;