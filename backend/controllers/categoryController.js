
const CategoryService = require('../services/categoryService');
const utils = require('./utils');
const CategoryController = {};

CategoryController.getAll = async function (req, res) {
    const categories = await CategoryService.getAll();
    utils.parseCategories(categories, req, res);
};

CategoryController.getCategory = async function (req, res) {
    const categories = await CategoryService.getCategory(req.params.id);
    utils.parseCategories(categories, req, res);
};



module.exports = CategoryController;